import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as MapLibreMap } from "maplibre-gl";
import Map, { Marker, NavigationControl, type MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useLiveLocation } from "../hooks/useLiveLocation";
import { useCrewIdentity } from "../hooks/useCrewIdentity";
import type { MemberLocation } from "../types/live";

const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY as string | undefined;

const CREW_COLORS: Record<string, string> = {
  Rahil: "#e8a87c",
  Sriram: "#8fbc8f",
  Rishabh: "#6b9fd4",
  Nilay: "#c9a0dc",
};

function isValidMaptilerKey(key: string | undefined): key is string {
  if (!key) return false;
  if (key === "your_maptiler_key_here") return false;
  return key.length >= 8;
}

function maptilerUrl(path: string, key: string): string {
  const separator = path.includes("?") ? "&" : "?";
  return `https://api.maptiler.com/${path}${separator}key=${key}`;
}

function formatAgo(updatedAt: number): string {
  const mins = Math.round((Date.now() - updatedAt) / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  return `${Math.round(mins / 60)}h ago`;
}

function isStale(updatedAt: number): boolean {
  return Date.now() - updatedAt > 10 * 60 * 1000;
}

type LiveLocationPanelProps = {
  className?: string;
};

export default function LiveLocationPanel({ className = "" }: LiveLocationPanelProps) {
  const { configured, sharing, setSharing, locations, geoError } = useLiveLocation();
  const { me, isGuest } = useCrewIdentity();

  const mapRef = useRef<MapRef>(null);
  const [mapReady, setMapReady] = useState(false);

  const mapStyle = useMemo(
    () =>
      isValidMaptilerKey(MAPTILER_KEY)
        ? maptilerUrl("maps/dataviz-dark/style.json", MAPTILER_KEY)
        : undefined,
    [],
  );

  const fitLocations = (map: MapLibreMap, locs: MemberLocation[]) => {
    if (locs.length === 0) return;
    if (locs.length === 1) {
      map.flyTo({
        center: [locs[0].lng, locs[0].lat],
        zoom: 10,
        duration: 1000,
      });
      return;
    }
    let minLng = locs[0].lng;
    let maxLng = locs[0].lng;
    let minLat = locs[0].lat;
    let maxLat = locs[0].lat;
    for (const loc of locs) {
      minLng = Math.min(minLng, loc.lng);
      maxLng = Math.max(maxLng, loc.lng);
      minLat = Math.min(minLat, loc.lat);
      maxLat = Math.max(maxLat, loc.lat);
    }
    map.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 40, duration: 1000 },
    );
  };

  const handleMapLoad = () => {
    setMapReady(true);
    const map = mapRef.current?.getMap();
    if (map && locations.length > 0) fitLocations(map, locations);
  };

  useEffect(() => {
    if (!mapReady) return;
    const map = mapRef.current?.getMap();
    if (map && locations.length > 0) fitLocations(map, locations);
  }, [locations, mapReady]);

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs uppercase tracking-wider text-white/40">Crew locations</p>
        {sharing && (
          <span className="flex items-center gap-1.5 text-xs text-sage">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sage" />
            Sharing live
          </span>
        )}
      </div>

      {isGuest ? (
        <p className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/45">
          Viewing only — ask the crew to share their location to show up here.
        </p>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-white/40">Sharing as {me}</span>
          <button
            type="button"
            onClick={() => setSharing(!sharing)}
            disabled={!configured}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              sharing
                ? "bg-sage/20 text-sage"
                : "border border-white/10 bg-midnight/80 text-white/70 hover:text-white"
            } disabled:cursor-not-allowed disabled:opacity-40`}
          >
            {sharing ? "Stop sharing" : "Share my location"}
          </button>
        </div>
      )}

      {!configured && (
        <p className="rounded-lg border border-sandstone/20 bg-sandstone/5 px-3 py-2 text-xs text-white/50">
          Add Firebase env vars to enable live crew tracking. See{" "}
          <code className="text-sage">.env.example</code>.
        </p>
      )}

      {geoError && (
        <p className="text-xs text-red-300/80">{geoError}</p>
      )}

      {isValidMaptilerKey(MAPTILER_KEY) && mapStyle ? (
        <div className="relative h-48 overflow-hidden rounded-xl border border-white/10">
          <Map
            ref={mapRef}
            initialViewState={{ longitude: -105, latitude: 39.5, zoom: 4 }}
            style={{ width: "100%", height: "100%" }}
            mapStyle={mapStyle}
            interactive
            attributionControl={false}
            onLoad={handleMapLoad}
          >
            <NavigationControl position="top-right" showCompass={false} />
            {locations.map((loc) => (
              <Marker
                key={loc.name}
                longitude={loc.lng}
                latitude={loc.lat}
                anchor="center"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`h-4 w-4 rounded-full border-2 border-white shadow-lg ${
                      isStale(loc.updatedAt) ? "opacity-50" : ""
                    }`}
                    style={{
                      backgroundColor: CREW_COLORS[loc.name] ?? "#e8a87c",
                    }}
                  />
                  <span className="mt-0.5 rounded bg-midnight/90 px-1.5 py-0.5 text-[10px] font-medium text-white">
                    {loc.name}
                  </span>
                </div>
              </Marker>
            ))}
          </Map>
        </div>
      ) : null}

      {locations.length > 0 ? (
        <ul className="space-y-1.5">
          {locations.map((loc) => (
            <li
              key={loc.name}
              className="flex items-center justify-between text-xs text-white/50"
            >
              <span className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: CREW_COLORS[loc.name] ?? "#e8a87c" }}
                />
                {loc.name}
              </span>
              <span className={isStale(loc.updatedAt) ? "text-white/25" : ""}>
                {formatAgo(loc.updatedAt)}
              </span>
            </li>
          ))}
        </ul>
      ) : configured ? (
        <p className="text-xs text-white/35">
          No one is sharing yet. Tap &ldquo;Share my location&rdquo; to show up on the map.
        </p>
      ) : null}
    </div>
  );
}
