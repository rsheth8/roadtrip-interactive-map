import { useEffect, useState } from "react";
import { trip } from "../data/itinerary";

type CountdownProps = {
  compact?: boolean;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Countdown({ compact }: CountdownProps) {
  const [y, m, d] = trip.startDate.split("-").map(Number);
  const target = new Date(y, m - 1, d);
  const [time, setTime] = useState<TimeLeft>(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hrs", value: time.hours },
    { label: "Min", value: time.minutes },
    { label: "Sec", value: time.seconds },
  ];

  if (compact) {
    return (
      <span className="font-mono text-sandstone tabular-nums">
        {time.days}d {pad(time.hours)}:{pad(time.minutes)}:{pad(time.seconds)}
      </span>
    );
  }

  return (
    <div className="flex w-full max-w-full justify-center gap-2 sm:gap-4">
      {units.map(({ label, value }) => (
        <div
          key={label}
          className="flex min-w-0 flex-1 max-w-[5rem] flex-col items-center rounded-xl border border-white/10 bg-white/5 px-2 py-2.5 backdrop-blur-sm sm:max-w-none sm:min-w-[5rem] sm:px-4 sm:py-4"
        >
          <span className="font-display text-xl font-bold text-sandstone sm:text-3xl tabular-nums">
            {pad(value)}
          </span>
          <span className="mt-1 text-xs uppercase tracking-widest text-white/50">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
