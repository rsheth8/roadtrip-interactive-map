import { useCallback, useState } from "react";
import { getTripDayCount, trip } from "../data/itinerary";
import DayCard from "./DayCard";
import TripMap from "./TripMap";

type DayTimelineProps = {
  activeDay: number;
  onDayChange: (day: number) => void;
};

function DayPicker({
  activeDay,
  onSelect,
}: {
  activeDay: number;
  onSelect: (day: number) => void;
}) {
  return (
    <div
      className="flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="tablist"
      aria-label="Trip days"
    >
      {trip.days.map((day) => {
        const isActive = day.dayNumber === activeDay;
        return (
          <button
            key={day.dayNumber}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(day.dayNumber)}
            className={`shrink-0 rounded-lg px-3 py-2 text-left transition-colors ${
              isActive
                ? "bg-sandstone text-midnight"
                : "bg-white/8 text-white/60 hover:bg-white/12 hover:text-white"
            }`}
          >
            <span className="block font-display text-sm font-bold leading-none">
              {day.dayNumber}
            </span>
            <span
              className={`mt-1 block max-w-[5.5rem] truncate text-[10px] leading-tight ${
                isActive ? "text-midnight/70" : "text-white/40"
              }`}
            >
              {day.title.split("→")[0].trim()}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function DayTimeline({ activeDay, onDayChange }: DayTimelineProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  const selectDay = useCallback(
    (dayNumber: number) => {
      onDayChange(dayNumber);
      setExpandedDay(dayNumber);
    },
    [onDayChange],
  );

  const toggleDay = useCallback(
    (dayNumber: number) => {
      if (dayNumber === activeDay) {
        setExpandedDay((current) => (current === dayNumber ? null : dayNumber));
        return;
      }
      selectDay(dayNumber);
    },
    [activeDay, selectDay],
  );

  return (
    <section id="timeline" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center lg:text-left">
          <p className="text-sm uppercase tracking-[0.25em] text-sage">The Route</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            {getTripDayCount()} days, 2,400+ miles
          </h2>
          <p className="mt-2 text-white/50">
            Pick a day to fly the map, then scroll through every stop below
          </p>
        </div>

        <div className="mb-6 h-[min(40vh,380px)] min-h-[200px] sm:h-[min(45vh,420px)] sm:min-h-[220px]">
          <TripMap
            activeDay={activeDay}
            days={trip.days}
            className="h-full w-full"
          />
        </div>

        <div className="mb-8">
          <DayPicker activeDay={activeDay} onSelect={selectDay} />
        </div>

        <div id="timeline-days" className="mx-auto flex max-w-3xl flex-col gap-4">
          {trip.days.map((day) => (
            <div key={day.dayNumber} id={`timeline-day-${day.dayNumber}`}>
              <DayCard
                day={day}
                isActive={activeDay === day.dayNumber}
                expanded={expandedDay === day.dayNumber}
                onToggle={() => toggleDay(day.dayNumber)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
