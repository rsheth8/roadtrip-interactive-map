import { useCallback, useEffect, useMemo, useState } from "react";
import { trip } from "../data/itinerary";
import type { Day, Stop } from "../types/trip";
import WeatherWidget from "./WeatherWidget";
import LiveLocationPanel from "./LiveLocationPanel";
import GasLog from "./GasLog";
import SplitwisePanel from "./SplitwisePanel";
import { getRegionForDay, hospitalMapsUrl } from "../data/safety";
import { eatsMapsUrl, getEatsForDay } from "../data/eats";

const PROGRESS_KEY = "roadtrip-day-progress";

function loadProgress(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, boolean>;
  } catch {
    return {};
  }
}

type TodayViewProps = {
  currentDay: number;
  preview?: boolean;
};

function getMapsLink(stop: Stop): string {
  if (stop.links?.maps) return stop.links.maps;
  return `https://maps.google.com/?q=${encodeURIComponent(stop.name)}`;
}

export default function TodayView({ currentDay, preview }: TodayViewProps) {
  const day: Day | undefined = trip.days.find((d) => d.dayNumber === currentDay);
  const [progress, setProgress] = useState<Record<string, boolean>>(loadProgress);

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }, [progress]);

  const toggleStop = useCallback((id: string) => {
    setProgress((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const weatherStop = useMemo(() => {
    if (!day) return undefined;
    const cityOrPark = day.stops.find(
      (s) => s.type === "city" || s.type === "park" || s.type === "hotel",
    );
    return cityOrPark ?? day.stops[0];
  }, [day]);

  if (!day) return null;

  const date = new Date(day.date + "T00:00:00");
  const dateLabel = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const completed = day.stops.filter((s) => progress[s.id]).length;
  const nextStop = day.stops.find((s) => !progress[s.id]);
  const region = getRegionForDay(day.dayNumber);
  const eats = getEatsForDay(day.dayNumber);

  return (
    <section id="top" className="min-h-dvh px-4 pb-mobile-nav pt-24 sm:px-6">
      <div className="mx-auto max-w-lg">
        <p className="text-sm uppercase tracking-[0.25em] text-sage">
          {preview ? "Live trip preview" : "Live trip"}
        </p>
        {preview && (
          <p className="mt-1 text-xs text-white/35">
            Previewing Day {currentDay} — switches automatically when the trip starts.
          </p>
        )}
        <h1 className="mt-2 font-display text-3xl font-bold">
          Day {day.dayNumber}
        </h1>
        <p className="text-white/50">{dateLabel}</p>
        <p className="mt-1 font-display text-lg text-sandstone">{day.title}</p>

        {day.highlight && (
          <p className="mt-3 rounded-xl border border-white/8 bg-dusk/60 px-4 py-3 text-sm italic text-white/60">
            {day.highlight}
          </p>
        )}

        {weatherStop && (
          <div className="mt-4">
            <WeatherWidget
              lat={weatherStop.lat}
              lng={weatherStop.lng}
              locationName={weatherStop.name}
            />
          </div>
        )}

        <div className="mt-4">
          <LiveLocationPanel />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-sage transition-all"
              style={{
                width: `${day.stops.length ? (completed / day.stops.length) * 100 : 0}%`,
              }}
            />
          </div>
          <span className="text-xs text-white/40">
            {completed}/{day.stops.length}
          </span>
        </div>

        {nextStop && (
          <a
            href={getMapsLink(nextStop)}
            target="_blank"
            rel="noreferrer"
            className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-sandstone px-4 py-4 text-center font-display text-sm font-semibold uppercase tracking-wider text-midnight transition-shadow hover:shadow-[0_0_30px_rgba(232,168,124,0.35)]"
          >
            Navigate to next — {nextStop.name}
          </a>
        )}

        {day.lodging && (
          <div className="mt-4 rounded-xl border border-white/8 bg-dusk/60 px-4 py-3">
            <p className="text-xs uppercase tracking-wider text-white/40">
              Tonight&apos;s stay
            </p>
            <p className="mt-1 font-medium">{day.lodging.name}</p>
            {day.lodging.notes && (
              <p className="text-sm text-white/45">{day.lodging.notes}</p>
            )}
          </div>
        )}

        <ul className="mt-8 space-y-2">
          {day.stops.map((stop) => {
            const done = !!progress[stop.id];
            return (
              <li key={stop.id}>
                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-4 transition-colors ${
                    done
                      ? "border-sage/20 bg-sage/5"
                      : "border-white/8 bg-dusk/40"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={done}
                    onChange={() => toggleStop(stop.id)}
                    className="mt-1 h-5 w-5 shrink-0 accent-sage"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span
                        className={`font-medium ${done ? "text-white/40 line-through" : "text-white/90"}`}
                      >
                        {stop.name}
                      </span>
                      {stop.time && (
                        <span className="text-xs text-sandstone">{stop.time}</span>
                      )}
                    </div>
                    {stop.notes && !done && (
                      <p className="mt-0.5 text-sm text-white/45">{stop.notes}</p>
                    )}
                    {!done && (
                      <a
                        href={getMapsLink(stop)}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-2 inline-block text-xs text-sage hover:underline"
                      >
                        Open in Maps →
                      </a>
                    )}
                  </div>
                </label>
              </li>
            );
          })}
        </ul>

        {eats && (
          <div id="today-eats" className="mt-10 scroll-mt-24">
            <p className="text-sm font-medium text-white/90">
              🍽 Eats around {eats.place}
            </p>
            <ul className="mt-3 space-y-2">
              {eats.picks.map((pick) => (
                <li
                  key={pick.name}
                  className="rounded-xl border border-white/8 bg-dusk/40 px-4 py-3"
                >
                  <a
                    href={eatsMapsUrl(pick.mapsQuery)}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-white/90 hover:text-sage"
                  >
                    {pick.name}
                  </a>
                  <p className="text-sm text-white/50">{pick.what}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {region && (
          <div
            id="today-safety"
            className="mt-10 scroll-mt-24 rounded-2xl border border-red-400/20 bg-red-500/5 px-4 py-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white/90">
                🚨 Safety near {region.name}
              </p>
              <a href="tel:911" className="text-xs font-semibold text-red-300">
                Call 911
              </a>
            </div>
            <ul className="mt-3 space-y-2">
              {region.facilities.map((f) => (
                <li
                  key={f.name}
                  className="flex items-start justify-between gap-3 text-sm"
                >
                  <a
                    href={hospitalMapsUrl(f.mapsQuery)}
                    target="_blank"
                    rel="noreferrer"
                    className="min-w-0 font-medium text-white/85 hover:text-sage"
                  >
                    {f.name}
                    <span className="ml-2 rounded bg-white/8 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-white/50">
                      {f.type}
                    </span>
                  </a>
                  {f.phone && (
                    <a
                      href={`tel:${f.phone.replace(/[^0-9+]/g, "")}`}
                      className="shrink-0 text-sage hover:underline"
                    >
                      {f.phone}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            {region.hazards.length > 0 && (
              <ul className="mt-3 space-y-1 text-xs text-white/60">
                {region.hazards.map((h) => (
                  <li key={h} className="flex gap-1.5">
                    <span className="text-red-300/80" aria-hidden>
                      ⚠
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div id="gas-log" className="mt-10 scroll-mt-24">
          <GasLog />
        </div>

        <div id="splitwise" className="mt-6 scroll-mt-24">
          <SplitwisePanel />
        </div>
      </div>
    </section>
  );
}
