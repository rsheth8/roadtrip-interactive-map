import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { onValue, ref, remove, set } from "firebase/database";
import { getFirebaseDatabase, isFirebaseConfigured } from "../lib/firebase";

/**
 * A crew-shared set of boolean flags keyed by id (e.g. checklist items ticked).
 *
 * Stored in Firebase as `{ id: true }` so every phone sees one synced version.
 * Falls back to per-device localStorage when Firebase isn't configured.
 */
export function useSharedFlags(firebasePath: string, localStorageKey: string) {
  const configured = useMemo(isFirebaseConfigured, []);
  const [flags, setFlags] = useState<Set<string>>(() => {
    if (configured) return new Set();
    try {
      const raw = localStorage.getItem(localStorageKey);
      return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
    } catch {
      return new Set();
    }
  });

  // Keep a ref to the latest set so toggle can read current state without deps.
  const flagsRef = useRef(flags);
  flagsRef.current = flags;

  // Firebase: live subscribe.
  useEffect(() => {
    if (!configured) return;
    const db = getFirebaseDatabase();
    if (!db) return;
    return onValue(ref(db, firebasePath), (snapshot) => {
      const data = snapshot.val() as Record<string, boolean> | null;
      setFlags(new Set(data ? Object.keys(data).filter((k) => data[k]) : []));
    });
  }, [configured, firebasePath]);

  // localStorage: persist fallback.
  useEffect(() => {
    if (configured) return;
    localStorage.setItem(localStorageKey, JSON.stringify([...flags]));
  }, [configured, localStorageKey, flags]);

  const toggle = useCallback(
    (id: string) => {
      const isOn = flagsRef.current.has(id);
      if (configured) {
        const db = getFirebaseDatabase();
        if (db) {
          if (isOn) void remove(ref(db, `${firebasePath}/${id}`));
          else void set(ref(db, `${firebasePath}/${id}`), true);
          return; // onValue will reflect the change for everyone
        }
      }
      setFlags((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    },
    [configured, firebasePath],
  );

  return { flags, toggle, shared: configured };
}
