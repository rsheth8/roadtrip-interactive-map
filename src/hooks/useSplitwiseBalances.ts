import { useEffect, useState } from "react";
import type { SplitwiseBalance } from "../types/live";

type SplitwiseResponse = {
  balances: SplitwiseBalance[];
  groupName?: string;
  error?: string;
};

export function useSplitwiseBalances() {
  const [balances, setBalances] = useState<SplitwiseBalance[]>([]);
  const [groupName, setGroupName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const groupUrl = import.meta.env.VITE_SPLITWISE_GROUP_URL as string | undefined;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/splitwise/balances");
        if (!res.ok) {
          if (res.status === 503) return;
          throw new Error("Splitwise unavailable");
        }
        const data = (await res.json()) as SplitwiseResponse;
        if (cancelled) return;
        if (data.error) {
          setError(data.error);
          return;
        }
        setBalances(data.balances ?? []);
        setGroupName(data.groupName ?? null);
      } catch {
        if (!cancelled) setError(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    const interval = setInterval(() => void load(), 5 * 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { balances, groupName, loading, error, groupUrl };
}
