import { useCallback, useEffect, useMemo, useState } from "react";
import type { GasEntry } from "../types/live";

const GAS_LOG_KEY = "roadtrip-gas-log";

function loadGasLog(): GasEntry[] {
  try {
    const raw = localStorage.getItem(GAS_LOG_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as GasEntry[];
  } catch {
    return [];
  }
}

export function useGasLog() {
  const [entries, setEntries] = useState<GasEntry[]>(loadGasLog);

  useEffect(() => {
    localStorage.setItem(GAS_LOG_KEY, JSON.stringify(entries));
  }, [entries]);

  const addEntry = useCallback((entry: Omit<GasEntry, "id">) => {
    setEntries((prev) => [
      {
        ...entry,
        id: crypto.randomUUID(),
      },
      ...prev,
    ]);
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const totalSpent = useMemo(
    () => entries.reduce((sum, e) => sum + e.cost, 0),
    [entries],
  );

  const totalGallons = useMemo(
    () =>
      entries.reduce((sum, e) => sum + (e.gallons ?? 0), 0) || null,
    [entries],
  );

  const mpg = useMemo(() => {
    const withOdometer = entries.filter(
      (e) => e.odometer !== undefined && e.gallons,
    );
    if (withOdometer.length < 2) return null;

    const sorted = [...withOdometer].sort(
      (a, b) => (a.odometer ?? 0) - (b.odometer ?? 0),
    );
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    const miles = (last.odometer ?? 0) - (first.odometer ?? 0);
    const gallons = sorted.slice(1).reduce((s, e) => s + (e.gallons ?? 0), 0);
    if (miles <= 0 || gallons <= 0) return null;
    return Math.round((miles / gallons) * 10) / 10;
  }, [entries]);

  return { entries, addEntry, removeEntry, totalSpent, totalGallons, mpg };
}
