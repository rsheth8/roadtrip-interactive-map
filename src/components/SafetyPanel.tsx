import { hospitalMapsUrl, safetyRegions, universalSafety } from "../data/safety";

export default function SafetyPanel() {
  return (
    <section id="safety" className="scroll-mt-24 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.25em] text-sage">
          Emergency &amp; safety
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Just in case
        </h2>
        <p className="mt-2 max-w-xl text-white/50">
          Nearest ERs, park alerts, and the hazards worth respecting — organized
          by region so you can find help fast, even off the grid.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`tel:${universalSafety.emergency}`}
            className="rounded-xl bg-red-500/90 px-5 py-3 font-display font-semibold text-white transition-shadow hover:shadow-[0_0_24px_rgba(239,68,68,0.4)]"
          >
            🚨 Call {universalSafety.emergency}
          </a>
          <a
            href={`tel:${universalSafety.poisonControl.replace(/[^0-9]/g, "")}`}
            className="rounded-xl border border-white/15 px-5 py-3 font-medium text-white/80 hover:border-sandstone/40 hover:text-sandstone"
          >
            Poison Control · {universalSafety.poisonControl}
          </a>
        </div>

        <div className="mt-6 rounded-2xl border border-sandstone/20 bg-sandstone/5 px-5 py-4">
          <p className="text-xs uppercase tracking-wider text-sandstone/80">
            Rules of the road
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-white/70">
            {universalSafety.tips.map((tip) => (
              <li key={tip} className="flex gap-2">
                <span className="text-sandstone" aria-hidden>
                  •
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 space-y-4">
          {safetyRegions.map((region) => (
            <details
              key={region.id}
              className="group rounded-2xl border border-white/8 bg-dusk/50 px-5 py-4 open:bg-dusk/70"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between">
                <span className="font-display text-lg font-semibold">
                  {region.name}
                </span>
                <span className="text-xs text-white/40">
                  Days {region.days.join("–")}
                  <span className="ml-2 inline-block transition-transform group-open:rotate-180">
                    ▾
                  </span>
                </span>
              </summary>

              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/35">
                    Medical
                  </p>
                  <ul className="mt-2 space-y-2">
                    {region.facilities.map((f) => (
                      <li
                        key={f.name}
                        className="flex items-start justify-between gap-3 text-sm"
                      >
                        <div className="min-w-0">
                          <a
                            href={hospitalMapsUrl(f.mapsQuery)}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-white/85 hover:text-sage"
                          >
                            {f.name}
                          </a>
                          <span className="ml-2 rounded bg-white/8 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-white/50">
                            {f.type}
                          </span>
                        </div>
                        {f.phone && (
                          <a
                            href={`tel:${f.phone.replace(/[^0-9+]/g, "")}`}
                            className="shrink-0 text-sage hover:underline"
                          >
                            {f.phone}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-white/35">
                    Watch out for
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-white/70">
                    {region.hazards.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="text-red-300/80" aria-hidden>
                          ⚠
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {region.links.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {region.links.map((l) => (
                      <a
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-sage hover:underline"
                      >
                        {l.label} →
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
