import { useIdentity } from "../context/IdentityContext";

/**
 * The current device's crew member, remembered across the app.
 * Thin wrapper over IdentityContext — falls back to the first crew member
 * only for display purposes if somehow used before the gate resolves.
 */
export function useCrewIdentity() {
  const { me, setMe, crew } = useIdentity();
  return { me: me ?? crew[0]?.name ?? "", setMe, crew };
}
