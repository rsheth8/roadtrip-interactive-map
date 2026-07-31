import { useCallback, useEffect, useState } from "react";
import { onValue, ref, set } from "firebase/database";
import { getFirebaseDatabase, isFirebaseConfigured, LOCATION_PATH } from "../lib/firebase";
import { useIdentity } from "../context/IdentityContext";
import type { MemberLocation } from "../types/live";

const SHARING_KEY = "roadtrip-location-sharing";

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

function loadSharing(): boolean {
  try {
    return localStorage.getItem(SHARING_KEY) === "true";
  } catch {
    return false;
  }
}

function geoErrorMessage(err: GeolocationPositionError): string {
  switch (err.code) {
    case err.PERMISSION_DENIED:
      return "Location permission denied — allow location for this site in browser settings.";
    case err.POSITION_UNAVAILABLE:
      return "Location unavailable — try moving near a window, or enable Location Services in System Settings.";
    case err.TIMEOUT:
      return "Location timed out — retrying with lower accuracy…";
    default:
      return "Could not get location — try Chrome/Safari at localhost (not an embedded preview).";
  }
}

export function useLiveLocation() {
  const { me, setMe } = useIdentity();
  const memberName = me ?? "";
  const [sharing, setSharingState] = useState(loadSharing);
  const [locations, setLocations] = useState<Record<string, MemberLocation>>({});
  const [geoError, setGeoError] = useState<string | null>(null);
  const [configured] = useState(isFirebaseConfigured);

  const setMemberName = setMe;

  const setSharing = useCallback((enabled: boolean) => {
    setSharingState(enabled);
    localStorage.setItem(SHARING_KEY, String(enabled));
  }, []);

  useEffect(() => {
    const db = getFirebaseDatabase();
    if (!db) return;

    const locationsRef = ref(db, LOCATION_PATH);
    return onValue(locationsRef, (snapshot) => {
      const data = snapshot.val() as Record<string, MemberLocation> | null;
      setLocations(data ?? {});
    });
  }, [configured]);

  useEffect(() => {
    if (!sharing || !configured) return;

    const db = getFirebaseDatabase();
    if (!db || !memberName) return;

    if (!navigator.geolocation) {
      setGeoError("Geolocation not supported in this browser");
      return;
    }

    const memberId = slugify(memberName);
    let watchId: number | null = null;
    let cancelled = false;

    const pushPosition = (position: GeolocationPosition) => {
      if (cancelled) return;
      setGeoError(null);
      const payload: MemberLocation = {
        name: memberName,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        updatedAt: Date.now(),
        accuracy: position.coords.accuracy,
      };
      void set(ref(db, `${LOCATION_PATH}/${memberId}`), payload).catch(() => {
        if (!cancelled) {
          setGeoError("Could not save location — check Firebase database rules.");
        }
      });
    };

    const startWatching = (highAccuracy: boolean) => {
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
      watchId = navigator.geolocation.watchPosition(
        pushPosition,
        (err) => {
          if (cancelled) return;
          if (highAccuracy && err.code !== err.PERMISSION_DENIED) {
            setGeoError(geoErrorMessage(err));
            startWatching(false);
            return;
          }
          setGeoError(geoErrorMessage(err));
        },
        {
          enableHighAccuracy: highAccuracy,
          maximumAge: 60_000,
          timeout: 60_000,
        },
      );
    };

    navigator.geolocation.getCurrentPosition(
      pushPosition,
      (err) => {
        if (cancelled) return;
        if (err.code !== err.PERMISSION_DENIED) {
          navigator.geolocation.getCurrentPosition(pushPosition, () => {}, {
            enableHighAccuracy: false,
            maximumAge: 300_000,
            timeout: 60_000,
          });
        }
      },
      { enableHighAccuracy: false, maximumAge: 300_000, timeout: 60_000 },
    );

    startWatching(false);

    return () => {
      cancelled = true;
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    };
  }, [sharing, memberName, configured]);

  const locationList = Object.values(locations).sort(
    (a, b) => b.updatedAt - a.updatedAt,
  );

  return {
    configured,
    memberName,
    setMemberName,
    sharing,
    setSharing,
    locations: locationList,
    geoError,
  };
}
