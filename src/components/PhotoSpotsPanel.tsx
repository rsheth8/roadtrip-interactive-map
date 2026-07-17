import { photoMapsUrl, photoSpots } from "../data/photospots";

export default function PhotoSpotsPanel() {
  return (
    <section id="photos" className="scroll-mt-24 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.25em] text-sage">
          Photo spots
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Where to get the shot
        </h2>
        <p className="mt-2 max-w-xl text-white/50">
          The route's best-known photography spots, with the ideal time of day
          and what to shoot. These are marked with a 📸 on the itinerary too.
        </p>

        <ul className="mt-8 space-y-3">
          {photoSpots.map((spot) => (
            <li
              key={spot.stopId}
              className="rounded-2xl border border-white/8 bg-dusk/50 px-5 py-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <a
                  href={photoMapsUrl(spot.mapsQuery)}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-lg font-semibold text-white/90 hover:text-sage"
                >
                  📸 {spot.name}
                </a>
                <span className="rounded-full bg-sage/15 px-2.5 py-0.5 text-xs font-medium text-sage">
                  {spot.bestTime}
                </span>
              </div>
              <p className="mt-0.5 text-xs uppercase tracking-wider text-white/35">
                Day {spot.day}
              </p>
              <p className="mt-1.5 text-sm text-white/60">{spot.tip}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
