import { driveGames, playlists, podcasts, type MediaLink } from "../data/vibes";

function MediaRow({ item }: { item: MediaLink }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="block rounded-xl border border-white/8 bg-dusk/40 px-4 py-3 transition-colors hover:border-sage/30 hover:bg-dusk/70"
    >
      <p className="font-medium text-white/90">{item.title}</p>
      {item.by && <p className="text-xs text-white/35">{item.by}</p>}
      {item.vibe && <p className="mt-1 text-sm text-white/50">{item.vibe}</p>}
      <span className="mt-2 inline-block text-xs text-sage">Open →</span>
    </a>
  );
}

export default function VibesPanel() {
  return (
    <section id="vibes" className="scroll-mt-24 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.25em] text-sage">
          Drives &amp; vibes
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Soundtrack the miles
        </h2>
        <p className="mt-2 max-w-xl text-white/50">
          Playlists, podcasts, and games for the long stretches. Swap the links
          for your crew's real shared playlists.
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-display text-xl font-semibold">🎵 Playlists</h3>
            <div className="mt-3 space-y-2">
              {playlists.map((p) => (
                <MediaRow key={p.title} item={p} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold">🎙️ Podcasts</h3>
            <div className="mt-3 space-y-2">
              {podcasts.map((p) => (
                <MediaRow key={p.title} item={p} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="font-display text-xl font-semibold">🎲 Drive games</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {driveGames.map((g) => (
              <div
                key={g.name}
                className="rounded-xl border border-white/8 bg-dusk/40 px-4 py-3"
              >
                <p className="font-medium text-sandstone">{g.name}</p>
                <p className="mt-1 text-sm text-white/55">{g.how}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
