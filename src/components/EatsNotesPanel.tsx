import { useState } from "react";
import { eatsMapsUrl, eatsRegions, topRatedUrl } from "../data/eats";
import { useSharedCollection } from "../hooks/useSharedCollection";
import { useCrewIdentity } from "../hooks/useCrewIdentity";
import { NOTES_PATH } from "../lib/firebase";
import type { SharedNote } from "../types/live";

const tagColors: Record<string, string> = {
  breakfast: "bg-sandstone/15 text-sandstone",
  lunch: "bg-sage/15 text-sage",
  dinner: "bg-sage/15 text-sage",
  treat: "bg-sandstone/15 text-sandstone",
  "late night": "bg-sandstone/15 text-sandstone",
};

function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function NotesBoard() {
  const { items, add, remove, shared } = useSharedCollection<SharedNote>(
    NOTES_PATH,
    "roadtrip-notes",
  );
  const { me, isGuest } = useCrewIdentity();
  const [text, setText] = useState("");

  const notes = [...items].sort((a, b) => b.createdAt - a.createdAt);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = text.trim();
    if (!value || !me) return;
    add({ text: value, author: me, createdAt: Date.now() });
    setText("");
  };

  return (
    <div className="mt-12 rounded-2xl border border-white/8 bg-dusk/50 px-5 py-5">
      <h3 className="font-display text-xl font-semibold">📝 Crew notes</h3>
      <p className="mt-1 text-sm text-white/45">
        {isGuest
          ? "Notes from the crew — ideas, reminders, must-dos."
          : shared
            ? "Shared live with the whole crew — ideas, reminders, must-dos."
            : "Saved on this device (connect Firebase to share with the crew)."}
      </p>

      {!isGuest && (
        <form onSubmit={submit} className="mt-4 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a note or idea…"
            className="min-w-0 flex-1 rounded-lg border border-white/10 bg-midnight px-3 py-2.5 text-sm text-white"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-sage px-4 py-2.5 text-sm font-semibold text-midnight"
          >
            Post
          </button>
        </form>
      )}

      {notes.length > 0 && (
        <ul className="mt-4 space-y-2">
          {notes.map((note) => (
            <li
              key={note.id}
              className="flex items-start justify-between gap-3 rounded-lg border border-white/8 bg-dusk/40 px-3 py-2.5"
            >
              <div className="min-w-0">
                <p className="text-sm text-white/85">{note.text}</p>
                <p className="mt-0.5 text-xs text-white/35">
                  {note.author} · {timeAgo(note.createdAt)}
                </p>
              </div>
              {!isGuest && (
                <button
                  type="button"
                  onClick={() => remove(note.id)}
                  className="shrink-0 text-xs text-white/30 hover:text-red-300"
                  aria-label="Delete note"
                >
                  ✕
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function EatsNotesPanel() {
  return (
    <section id="eats" className="scroll-mt-24 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.25em] text-sage">
          Eats &amp; notes
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Where to eat, what to remember
        </h2>
        <p className="mt-2 max-w-xl text-white/50">
          All picks are <span className="text-sage">vegetarian-friendly</span>,
          well-reviewed, and easy on a college budget — plus a live "top-rated"
          link per city so you're never rolling the dice. Shared notes board at
          the bottom.
        </p>

        <div className="mt-8 space-y-4">
          {eatsRegions.map((region) => (
            <div
              key={region.id}
              className="rounded-2xl border border-white/8 bg-dusk/50 px-5 py-4"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-lg font-semibold">
                  {region.place}
                </h3>
                <span className="text-xs text-white/35">
                  Days {region.days.join("–")}
                </span>
              </div>
              <ul className="mt-3 space-y-2">
                {region.picks.map((pick) => (
                  <li
                    key={pick.name}
                    className="flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-2">
                        <a
                          href={eatsMapsUrl(pick.mapsQuery)}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-white/90 hover:text-sage"
                        >
                          {pick.name}
                        </a>
                        <span className="rounded bg-white/8 px-1.5 py-0.5 text-[10px] text-white/55">
                          {pick.cuisine} · {pick.price}
                        </span>
                        {pick.tag && (
                          <span
                            className={`rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide ${
                              tagColors[pick.tag] ?? "bg-white/8 text-white/50"
                            }`}
                          >
                            {pick.tag}
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-white/50">{pick.what}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/8 pt-3">
                <span className="text-[11px] uppercase tracking-wider text-white/30">
                  Live top-rated:
                </span>
                <a
                  href={topRatedUrl(region.area)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-sage/30 px-2.5 py-0.5 text-xs text-sage hover:bg-sage/10"
                >
                  🔎 veg near here
                </a>
                {region.liveCuisines.map((c) => (
                  <a
                    key={c}
                    href={topRatedUrl(region.area, c)}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs text-white/60 hover:border-sage/40 hover:text-sage"
                  >
                    {c}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <NotesBoard />
      </div>
    </section>
  );
}
