import { useIdentity } from "../context/IdentityContext";

/**
 * The current session's crew member (or guest), remembered for this browser
 * session only. `me` is null for guests — callers must handle that case
 * rather than assuming a name is always present.
 */
export function useCrewIdentity() {
  const { me, isGuest, setMe, crew } = useIdentity();
  return { me, isGuest, setMe, crew };
}
