import { useCallback, useEffect, useMemo, useState } from "react";
import { onValue, push, ref, remove, set, update } from "firebase/database";
import { getFirebaseDatabase, isFirebaseConfigured } from "../lib/firebase";

export type WithId = { id: string };

/**
 * A realtime, crew-shared collection of records keyed by id.
 *
 * When Firebase is configured, all crew phones stay in sync live. When it is
 * not (local dev, preview, or before the config is filled in), it transparently
 * falls back to per-device localStorage so the UI still works end to end.
 */
export function useSharedCollection<T extends WithId>(
  firebasePath: string,
  localStorageKey: string,
) {
  const configured = useMemo(isFirebaseConfigured, []);
  const [items, setItems] = useState<T[]>(() => {
    if (configured) return [];
    try {
      const raw = localStorage.getItem(localStorageKey);
      return raw ? (JSON.parse(raw) as T[]) : [];
    } catch {
      return [];
    }
  });

  // Firebase: subscribe to live updates.
  useEffect(() => {
    if (!configured) return;
    const db = getFirebaseDatabase();
    if (!db) return;
    const collectionRef = ref(db, firebasePath);
    return onValue(collectionRef, (snapshot) => {
      const data = snapshot.val() as Record<string, T> | null;
      if (!data) {
        setItems([]);
        return;
      }
      const list = Object.entries(data).map(([id, value]) => ({
        ...value,
        id,
      }));
      setItems(list);
    });
  }, [configured, firebasePath]);

  // localStorage: persist local fallback state.
  useEffect(() => {
    if (configured) return;
    localStorage.setItem(localStorageKey, JSON.stringify(items));
  }, [configured, localStorageKey, items]);

  const add = useCallback(
    (value: Omit<T, "id">): string => {
      if (configured) {
        const db = getFirebaseDatabase();
        if (db) {
          const newRef = push(ref(db, firebasePath));
          void set(newRef, value);
          return newRef.key ?? "";
        }
      }
      const id = crypto.randomUUID();
      setItems((prev) => [{ ...(value as T), id }, ...prev]);
      return id;
    },
    [configured, firebasePath],
  );

  /** Insert or overwrite a record at a caller-chosen stable id. */
  const put = useCallback(
    (id: string, value: Omit<T, "id">) => {
      if (configured) {
        const db = getFirebaseDatabase();
        if (db) {
          void set(ref(db, `${firebasePath}/${id}`), value);
          return;
        }
      }
      setItems((prev) => {
        const next = prev.filter((i) => i.id !== id);
        return [{ ...(value as T), id }, ...next];
      });
    },
    [configured, firebasePath],
  );

  const patch = useCallback(
    (id: string, value: Partial<Omit<T, "id">>) => {
      if (configured) {
        const db = getFirebaseDatabase();
        if (db) {
          void update(ref(db, `${firebasePath}/${id}`), value);
          return;
        }
      }
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, ...value } : i)),
      );
    },
    [configured, firebasePath],
  );

  const removeItem = useCallback(
    (id: string) => {
      if (configured) {
        const db = getFirebaseDatabase();
        if (db) {
          void remove(ref(db, `${firebasePath}/${id}`));
          return;
        }
      }
      setItems((prev) => prev.filter((i) => i.id !== id));
    },
    [configured, firebasePath],
  );

  return { items, add, put, patch, remove: removeItem, shared: configured };
}
