import { trip } from "../data/itinerary";

export default function Footer() {
  const names = trip.crew.map((m) => m.name).join(" · ");
  const departing = trip.crew.find((m) => m.lastDay);

  return (
    <footer className="border-t border-white/8 px-4 py-12 pb-mobile-nav text-center sm:px-6 md:pb-12">
      <p className="font-display text-lg font-semibold text-white/80">
        {trip.title} 2026
      </p>
      <p className="mt-1 text-sm text-white/40">{names}</p>
      {departing && (
        <p className="mt-1 text-xs text-sandstone/70">
          {departing.name} flies home from Denver · Rahil, Sriram & Rishabh finish
          the route to LA
        </p>
      )}
      <p className="mt-4 text-xs text-white/25">
        Jul 31 — Aug 12 · Minneapolis to Los Angeles
      </p>
    </footer>
  );
}
