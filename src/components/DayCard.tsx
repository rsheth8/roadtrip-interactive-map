import type { Day, Stop } from "../types/trip";
import { isPhotoStop } from "../data/photospots";

const typeIcons: Record<Stop["type"], string> = {
  city: "🏙️",
  park: "🏞️",
  hike: "🥾",
  viewpoint: "👀",
  food: "🍽️",
  hotel: "🏨",
  drive: "🚗",
};

type DayCardProps = {
  day: Day;
  isActive?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
};

function StopRow({ stop }: { stop: Stop }) {
  return (
    <li className="flex gap-3 border-l border-white/10 py-3 pl-4">
      <span className="mt-0.5 text-base" aria-hidden>
        {typeIcons[stop.type]}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-medium text-white/90">{stop.name}</span>
          {isPhotoStop(stop.id) && (
            <span
              className="rounded-full bg-sage/15 px-1.5 py-0.5 text-[10px] font-medium text-sage"
              title="Great photo spot"
            >
              📸 photo
            </span>
          )}
          {stop.time && (
            <span className="text-xs text-sandstone">{stop.time}</span>
          )}
        </div>
        {stop.notes && (
          <p className="mt-0.5 text-sm text-white/45">{stop.notes}</p>
        )}
        {stop.links && (
          <div className="mt-1.5 flex flex-wrap gap-2">
            {stop.links.maps && (
              <a
                href={stop.links.maps}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-sage hover:underline"
              >
                Maps
              </a>
            )}
            {stop.links.trail && (
              <a
                href={stop.links.trail}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-sage hover:underline"
              >
                Trail
              </a>
            )}
            {stop.links.info && (
              <a
                href={stop.links.info}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-sage hover:underline"
              >
                Info
              </a>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

export default function DayCard({
  day,
  isActive,
  expanded = false,
  onToggle,
}: DayCardProps) {
  const date = new Date(day.date + "T00:00:00");
  const dateLabel = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <article
      id={`day-${day.dayNumber}`}
      className={`rounded-2xl border transition-colors ${
        isActive
          ? "border-sandstone/40 bg-dusk-light/80 shadow-[0_0_30px_rgba(232,168,124,0.08)]"
          : "border-white/8 bg-dusk/60"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full cursor-pointer items-start gap-3 p-4 text-left sm:gap-4 sm:p-6"
      >
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-display text-lg font-bold ${
            isActive
              ? "bg-sandstone text-midnight"
              : "bg-white/8 text-white/70"
          }`}
        >
          {day.dayNumber}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
              {day.title}
            </h3>
            <span className="text-xs text-white/40">{dateLabel}</span>
          </div>
          <p className="mt-0.5 text-sm text-white/50">{day.route}</p>
          {day.highlight && (
            <p className="mt-2 text-sm italic text-sage/80">{day.highlight}</p>
          )}
          <div className="mt-2 flex flex-wrap gap-3 text-xs text-white/35">
            {day.driveHours != null && day.driveHours > 0 && (
              <span>🚗 ~{day.driveHours}h driving</span>
            )}
            {day.lodging && (
              <span>
                🏨 {day.lodging.name}
                {day.lodging.cost > 0 && ` · $${day.lodging.cost}`}
                {day.lodging.notes && ` — ${day.lodging.notes}`}
              </span>
            )}
          </div>
        </div>
        <span className="mt-1 text-white/30">{expanded ? "−" : "+"}</span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="border-t border-white/8 px-5 pb-5 sm:px-6 sm:pb-6">
            {day.stops.map((stop) => (
              <StopRow key={stop.id} stop={stop} />
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
