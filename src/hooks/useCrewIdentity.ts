import { useCallback, useState } from "react";
import { trip } from "../data/itinerary";

// Shared with useLiveLocation so "who are you?" is answered once per device.
const MEMBER_KEY = "roadtrip-location-member";

function load(): string {
  try {
    const stored = localStorage.getItem(MEMBER_KEY);
    if (stored && trip.crew.some((m) => m.name === stored)) return stored;
  } catch {}
  return trip.crew[0]?.name ?? "";
}

/** The current device's crew member, remembered across the app. */
export function useCrewIdentity() {
  const [me, setMeState] = useState(load);

  const setMe = useCallback((name: string) => {
    setMeState(name);
    try {
      localStorage.setItem(MEMBER_KEY, name);
    } catch {}
  }, []);

  return { me, setMe, crew: trip.crew };
}
