import { useEffect, useState } from "react";
import { trip } from "../data/itinerary";

export type TripDayState = {
  daysUntil: number;
  currentDay: number | null;
  isTripActive: boolean;
  isTripOver: boolean;
  isPreTrip: boolean;
};

function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function useTripDay(): TripDayState {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const start = startOfDay(parseDate(trip.startDate));
  const end = startOfDay(parseDate(trip.endDate));
  const today = startOfDay(now);

  const msPerDay = 86_400_000;
  const daysUntil = Math.ceil((start.getTime() - today.getTime()) / msPerDay);
  const isPreTrip = today < start;
  const isTripOver = today > end;
  const isTripActive = !isPreTrip && !isTripOver;

  let currentDay: number | null = null;
  if (isTripActive) {
    const diff = Math.floor((today.getTime() - start.getTime()) / msPerDay);
    currentDay = Math.min(diff + 1, trip.days.length);
  }

  return { daysUntil, currentDay, isTripActive, isTripOver, isPreTrip };
}
