import { useCallback, useEffect, useState } from "react";
import { trip } from "../data/itinerary";
import type { Day, Stop } from "../types/trip";

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
};

function getMapsLink(stop: Stop): string {
  if (stop.links?.maps) return stop.links.maps;
  return `https://maps.google.com/?q=${encodeURIComponent(stop.name)}`;
}

export default function TodayView({ currentDay }: TodayViewProps) {
  const day: Day | undefined = trip.days.find((d) => d.dayNumber === currentDay);
  const [progress, setProgress] = useState<Record<string, boolean>>(loadProgress);

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }, [progress]);

  const toggleStop = useCallback((id: string) => {
    setProgress((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  if (!day) return null;

  const date = new Date(day.date + "T00:00:00");
  const dateLabel = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const completed = day.stops.filter((s) => progress[s.id]).length;
  const nextStop = day.stops.find((s) => !progress[s.id]);

  return (
    <section className="min-h-dvh px-4 pb-mobile-nav pt-24 sm:px-6">
      <div className="mx-auto max-w-lg">
        <p className="text-sm uppercase tracking-[0.25em] text-sage">Live trip</p>
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
      </div>
    </section>
  );
}
