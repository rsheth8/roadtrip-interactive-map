import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Map as MapLibreMap } from "maplibre-gl";
import Map, {
  Layer,
  Marker,
  NavigationControl,
  Source,
  type MapRef,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { getDayCenter, getRouteCoordinates, getTravelerCount } from "../data/itinerary";
import type { Day } from "../types/trip";

const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY as string | undefined;

function isValidMaptilerKey(key: string | undefined): key is string {
  if (!key) return false;
  if (key === "your_maptiler_key_here") return false;
  return key.length >= 8;
}

function maptilerUrl(path: string, key: string): string {
  const separator = path.includes("?") ? "&" : "?";
  return `https://api.maptiler.com/${path}${separator}key=${key}`;
}

type MarkerMode = "day" | "all";

const stopColors: Record<string, string> = {
  city: "#8fbc8f",
  park: "#e8a87c",
  hike: "#f4c9a8",
  viewpoint: "#a8d4b8",
  food: "#c9a0dc",
  hotel: "#6b9fd4",
  drive: "#8899aa",
};

function getAllStops(days: Day[]) {
  return days.flatMap((day) =>
    day.stops.map((stop) => ({ ...stop, dayNumber: day.dayNumber })),
  );
}

function fitAllStops(map: MapLibreMap, days: Day[]) {
  const coords = getAllStops(days).map((s) => [s.lng, s.lat] as [number, number]);
  if (coords.length === 0) return;

  let minLng = coords[0][0];
  let maxLng = coords[0][0];
  let minLat = coords[0][1];
  let maxLat = coords[0][1];

  for (const [lng, lat] of coords) {
    minLng = Math.min(minLng, lng);
    maxLng = Math.max(maxLng, lng);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
  }

  map.fitBounds(
    [
      [minLng, minLat],
      [maxLng, maxLat],
    ],
    { padding: 48, pitch: 30, bearing: -15, duration: 2000 },
  );
}

type TripMapProps = {
  activeDay: number;
  days: Day[];
  className?: string;
  interactive?: boolean;
};

export default function TripMap({
  activeDay,
  days,
  className = "",
  interactive = true,
}: TripMapProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapRef>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [markerMode, setMarkerMode] = useState<MarkerMode>("day");

  const mapStyle = useMemo(
    () =>
      isValidMaptilerKey(MAPTILER_KEY)
        ? maptilerUrl("maps/dataviz-dark/style.json", MAPTILER_KEY)
        : undefined,
    [],
  );

  const routeGeoJson = useMemo(
    () => ({
      type: "Feature" as const,
      properties: {},
      geometry: {
        type: "LineString" as const,
        coordinates: getRouteCoordinates(),
      },
    }),
    [],
  );

  const visibleStops = useMemo(() => {
    if (markerMode === "all") return getAllStops(days);
    const day = days.find((d) => d.dayNumber === activeDay);
    return (day?.stops ?? []).map((stop) => ({ ...stop, dayNumber: activeDay }));
  }, [activeDay, days, markerMode]);

  const flyToDay = useCallback((dayNumber: number) => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    const { lat, lng, zoom } = getDayCenter(dayNumber);
    map.flyTo({
      center: [lng, lat],
      zoom: zoom + 0.5,
      pitch: 45,
      bearing: -15,
      duration: 2000,
      essential: true,
    });
  }, []);

  useEffect(() => {
    if (!mapReady) return;
    const map = mapRef.current?.getMap();
    if (!map) return;

    if (markerMode === "all") {
      fitAllStops(map, days);
    } else {
      flyToDay(activeDay);
    }
  }, [activeDay, days, flyToDay, mapReady, markerMode]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || !mapReady) return;

    const resizeMap = () => {
      mapRef.current?.getMap()?.resize();
    };

    resizeMap();

    const observer = new ResizeObserver(resizeMap);
    observer.observe(shell);

    return () => observer.disconnect();
  }, [mapReady]);

  const activeDayData = days.find((d) => d.dayNumber === activeDay);

  if (!isValidMaptilerKey(MAPTILER_KEY) || !mapStyle) {
    return (
      <div
        className={`flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-dusk p-8 text-center ${className}`}
      >
        <p className="font-display text-lg text-sandstone">Map requires a key</p>
        <p className="mt-2 max-w-sm text-sm text-white/50">
          Add your free MapTiler key to <code className="text-sage">.env</code> as{" "}
          <code className="text-sage">VITE_MAPTILER_KEY=…</code>, then restart{" "}
          <code className="text-sage">npm run dev</code>. Sign up at{" "}
          <a
            href="https://cloud.maptiler.com/account/keys/"
            target="_blank"
            rel="noreferrer"
            className="text-sandstone underline"
          >
            cloud.maptiler.com
          </a>
          .
        </p>
      </div>
    );
  }

  if (mapError) {
    return (
      <div
        className={`flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-dusk p-8 text-center ${className}`}
      >
        <p className="font-display text-lg text-sandstone">Map failed to load</p>
        <p className="mt-2 max-w-sm text-sm text-white/50">{mapError}</p>
      </div>
    );
  }

  return (
    <div
      ref={shellRef}
      className={`trip-map-shell relative isolate min-h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-dusk ${className}`}
    >
      <div className="absolute inset-0 z-0">
        <Map
          ref={mapRef}
          initialViewState={{
            longitude: -105,
            latitude: 39.5,
            zoom: 4,
            pitch: 30,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle={mapStyle}
          interactive={interactive}
          cooperativeGestures
          attributionControl={false}
          onError={(e) => {
            setMapError(e.error?.message ?? "Check your MapTiler key and try again.");
          }}
          onLoad={(e) => {
            e.target.addSource("terrain", {
              type: "raster-dem",
              url: maptilerUrl("tiles/terrain-rgb-v2/tiles.json", MAPTILER_KEY),
              tileSize: 256,
            });
            e.target.setTerrain({ source: "terrain", exaggeration: 1.4 });
            e.target.resize();
            setMapReady(true);
          }}
        >
          <NavigationControl position="top-right" visualizePitch />

          <Source id="route" type="geojson" data={routeGeoJson}>
            <Layer
              id="route-glow"
              type="line"
              paint={{
                "line-color": "#e8a87c",
                "line-width": 6,
                "line-opacity": 0.25,
                "line-blur": 4,
              }}
            />
            <Layer
              id="route-line"
              type="line"
              paint={{
                "line-color": "#e8a87c",
                "line-width": 2.5,
                "line-opacity": 0.9,
              }}
            />
          </Source>

          {visibleStops.map((stop) => {
            const isActiveDay =
              markerMode === "day" || stop.dayNumber === activeDay;

            return (
              <Marker
                key={`${stop.dayNumber}-${stop.id}`}
                longitude={stop.lng}
                latitude={stop.lat}
                anchor="center"
              >
                <div
                  className={`rounded-full border-2 border-white shadow-lg transition-all ${
                    isActiveDay ? "h-3 w-3" : "h-2 w-2 opacity-50"
                  }`}
                  style={{ backgroundColor: stopColors[stop.type] ?? "#e8a87c" }}
                  title={
                    markerMode === "all"
                      ? `Day ${stop.dayNumber}: ${stop.name}`
                      : stop.name
                  }
                />
              </Marker>
            );
          })}
        </Map>
      </div>

      <div className="pointer-events-auto absolute left-2 top-2 z-10 flex rounded-lg border border-white/10 bg-midnight/80 p-0.5 text-[11px] backdrop-blur-sm sm:left-3 sm:top-3 sm:text-xs">
        <button
          type="button"
          onClick={() => setMarkerMode("day")}
          className={`rounded-md px-2 py-2 font-medium transition-colors sm:px-2.5 sm:py-1.5 ${
            markerMode === "day"
              ? "bg-sandstone text-midnight"
              : "text-white/60 hover:text-white"
          }`}
        >
          This day
        </button>
        <button
          type="button"
          onClick={() => setMarkerMode("all")}
          className={`rounded-md px-2 py-2 font-medium transition-colors sm:px-2.5 sm:py-1.5 ${
            markerMode === "all"
              ? "bg-sandstone text-midnight"
              : "text-white/60 hover:text-white"
          }`}
        >
          All stops
        </button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-midnight/90 to-transparent p-3 sm:p-4">
        <p className="font-display text-sm font-semibold text-white line-clamp-2">
          {markerMode === "all"
            ? `Full trip · ${visibleStops.length} stops`
            : `Day ${activeDay}: ${activeDayData?.title}`}
        </p>
        <p className="text-xs text-white/50 line-clamp-2">
          {markerMode === "all"
            ? "Orange line = driving route · hover dots for stop names"
            : `${activeDayData?.route} · ${getTravelerCount(activeDay)} travelers`}
        </p>
      </div>
    </div>
  );
}
