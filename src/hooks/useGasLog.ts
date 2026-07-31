import { useMemo } from "react";
import { useSharedCollection } from "./useSharedCollection";
import { GAS_PATH } from "../lib/firebase";
import type { GasEntry } from "../types/live";

const GAS_LOG_KEY = "roadtrip-gas-log";

export function useGasLog() {
  const { items, add, remove, shared } = useSharedCollection<GasEntry>(
    GAS_PATH,
    GAS_LOG_KEY,
  );

  const entries = useMemo(
    () => [...items].sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0)),
    [items],
  );

  const addEntry = (entry: Omit<GasEntry, "id" | "createdAt">) =>
    add({ ...entry, createdAt: Date.now() });
  const removeEntry = (id: string) => remove(id);

  const totalSpent = useMemo(
    () => entries.reduce((sum, e) => sum + e.cost, 0),
    [entries],
  );

  const totalGallons = useMemo(
    () => entries.reduce((sum, e) => sum + (e.gallons ?? 0), 0) || null,
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

  return {
    entries,
    addEntry,
    removeEntry,
    totalSpent,
    totalGallons,
    mpg,
    shared,
  };
}
