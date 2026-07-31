import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { trip } from "../data/itinerary";

const MEMBER_KEY = "roadtrip-location-member";

function loadStoredIdentity(): string | null {
  try {
    const stored = localStorage.getItem(MEMBER_KEY);
    if (stored && trip.crew.some((m) => m.name === stored)) return stored;
  } catch {}
  return null;
}

type IdentityContextValue = {
  /** null until the crew member has picked who they are on this device. */
  me: string | null;
  setMe: (name: string) => void;
  crew: typeof trip.crew;
};

const IdentityContext = createContext<IdentityContextValue | null>(null);

export function IdentityProvider({ children }: { children: ReactNode }) {
  const [me, setMeState] = useState<string | null>(loadStoredIdentity);

  const setMe = useCallback((name: string) => {
    setMeState(name);
    try {
      localStorage.setItem(MEMBER_KEY, name);
    } catch {}
  }, []);

  const value = useMemo(
    () => ({ me, setMe, crew: trip.crew }),
    [me, setMe],
  );

  return (
    <IdentityContext.Provider value={value}>
      {children}
    </IdentityContext.Provider>
  );
}

/** The single source of truth for "which crew member is this device". */
export function useIdentity(): IdentityContextValue {
  const ctx = useContext(IdentityContext);
  if (!ctx) {
    throw new Error("useIdentity must be used within an IdentityProvider");
  }
  return ctx;
}
