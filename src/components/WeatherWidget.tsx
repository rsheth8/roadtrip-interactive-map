import { useWeather } from "../hooks/useWeather";

type WeatherWidgetProps = {
  lat: number;
  lng: number;
  locationName?: string;
};

export default function WeatherWidget({ lat, lng, locationName }: WeatherWidgetProps) {
  const { weather, loading, error } = useWeather(lat, lng);

  if (loading && !weather) {
    return (
      <div className="rounded-xl border border-white/8 bg-dusk/60 px-4 py-3 text-sm text-white/40">
        Loading weather…
      </div>
    );
  }

  if (error || !weather) return null;

  return (
    <div className="rounded-xl border border-white/8 bg-dusk/60 px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-white/40">
            {locationName ? `Weather · ${locationName}` : "Weather"}
          </p>
          <p className="mt-1 flex items-center gap-2 font-display text-2xl font-semibold">
            <span aria-hidden>{weather.icon}</span>
            {weather.temperature}°F
          </p>
          <p className="text-sm text-white/50">{weather.description}</p>
        </div>
        <div className="text-right text-xs text-white/40">
          <p>
            H {weather.high}° · L {weather.low}°
          </p>
          <p className="mt-1">Wind {weather.windSpeed} mph</p>
          <p className="mt-2 text-white/30">Tomorrow: {weather.tomorrowDescription}</p>
        </div>
      </div>
    </div>
  );
}
