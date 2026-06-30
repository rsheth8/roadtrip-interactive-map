import { useEffect, useState } from "react";
import { fetchWeather, type WeatherSnapshot } from "../lib/weather";

type UseWeatherResult = {
  weather: WeatherSnapshot | null;
  loading: boolean;
  error: string | null;
};

export function useWeather(lat: number | undefined, lng: number | undefined): UseWeatherResult {
  const [weather, setWeather] = useState<WeatherSnapshot | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lat === undefined || lng === undefined) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchWeather(lat, lng)
      .then((data) => {
        if (!cancelled) setWeather(data);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load weather");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    const interval = setInterval(() => {
      fetchWeather(lat, lng)
        .then((data) => {
          if (!cancelled) setWeather(data);
        })
        .catch(() => {});
    }, 30 * 60 * 1000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [lat, lng]);

  return { weather, loading, error };
}
