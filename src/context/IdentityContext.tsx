import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { trip } from "../data/itinerary";

// sessionStorage: resets every fresh session (new tab / reopened PWA), so the
// gate re-asks "who's this?" each time, per the crew's request.
const SESSION_KEY = "roadtrip-session-identity";
// localStorage: just a hint so the gate can offer a fast "continue as X" —
// does NOT skip the prompt, it only pre-fills it.
const LAST_KEY = "roadtrip-last-identity";

export type StoredIdentity = { kind: "member"; name: string } | { kind: "guest" };

function isValid(value: StoredIdentity | null): value is StoredIdentity {
  if (!value) return false;
  if (value.kind === "guest") return true;
  return trip.crew.some((m) => m.name === value.name);
}

function readSession(): StoredIdentity | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredIdentity;
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function readLastHint(): StoredIdentity | null {
  try {
    const raw = localStorage.getItem(LAST_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredIdentity;
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

type IdentityContextValue = {
  /** Crew member name for this session, or null if unresolved / guest. */
  me: string | null;
  isGuest: boolean;
  /** True once a choice (member or guest) has been made this session. */
  resolved: boolean;
  /** Last identity used on this device, for a quick "continue as" option. */
  lastHint: StoredIdentity | null;
  setMe: (name: string) => void;
  setGuest: () => void;
  crew: typeof trip.crew;
};

const IdentityContext = createContext<IdentityContextValue | null>(null);

export function IdentityProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<StoredIdentity | null>(readSession);
  const [lastHint] = useState<StoredIdentity | null>(readLastHint);

  const persist = useCallback((value: StoredIdentity) => {
    setStored(value);
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(value));
      localStorage.setItem(LAST_KEY, JSON.stringify(value));
    } catch {}
  }, []);

  const setMe = useCallback(
    (name: string) => persist({ kind: "member", name }),
    [persist],
  );

  const setGuest = useCallback(() => persist({ kind: "guest" }), [persist]);

  const me = stored?.kind === "member" ? stored.name : null;
  const isGuest = stored?.kind === "guest";
  const resolved = stored !== null;

  const value = useMemo(
    () => ({ me, isGuest, resolved, lastHint, setMe, setGuest, crew: trip.crew }),
    [me, isGuest, resolved, lastHint, setMe, setGuest],
  );

  return (
    <IdentityContext.Provider value={value}>
      {children}
    </IdentityContext.Provider>
  );
}

/** The single source of truth for "which crew member (or guest) this session is". */
export function useIdentity(): IdentityContextValue {
  const ctx = useContext(IdentityContext);
  if (!ctx) {
    throw new Error("useIdentity must be used within an IdentityProvider");
  }
  return ctx;
}
