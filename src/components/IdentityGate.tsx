import { motion } from "framer-motion";
import { useIdentity } from "../context/IdentityContext";

const CREW_COLORS: Record<string, string> = {
  Rahil: "#e8a87c",
  Sriram: "#8fbc8f",
  Rishabh: "#6b9fd4",
  Nilay: "#c9a0dc",
};

export default function IdentityGate() {
  const { crew, setMe, setGuest, lastHint } = useIdentity();

  const lastLabel =
    lastHint?.kind === "member" ? lastHint.name : lastHint?.kind === "guest" ? "Guest" : null;

  return (
    <div className="grain fixed inset-0 z-[100] flex min-h-dvh flex-col items-center justify-center overflow-y-auto bg-midnight px-4 py-12 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(232,168,124,0.15),transparent_60%)]" />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-sm font-medium uppercase tracking-[0.3em] text-sage"
      >
        Western Roadtrip 2026
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-3 font-display text-3xl font-bold sm:text-4xl"
      >
        Who's this?
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mt-2 max-w-sm text-sm text-white/50"
      >
        So this session shows the right name on the checklist, notes, live
        map, and gas log. Asked fresh each time you open the app.
      </motion.p>

      {lastLabel && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onClick={() =>
            lastHint?.kind === "member" ? setMe(lastHint.name) : setGuest()
          }
          className="mt-8 rounded-full bg-sandstone px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-midnight transition-shadow hover:shadow-[0_0_30px_rgba(232,168,124,0.35)]"
        >
          Continue as {lastLabel}
        </motion.button>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-xs uppercase tracking-widest text-white/30"
      >
        {lastLabel ? "or pick someone else" : "pick one"}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-4 grid grid-cols-2 gap-3 sm:gap-4"
      >
        {crew.map((member) => (
          <button
            key={member.name}
            type="button"
            onClick={() => setMe(member.name)}
            className="group flex w-32 flex-col items-center gap-3 rounded-2xl border border-white/10 bg-dusk/60 px-4 py-6 transition-colors hover:border-sage/40 hover:bg-dusk-light/80 sm:w-36"
          >
            <span
              className="flex h-14 w-14 items-center justify-center rounded-full font-display text-xl font-bold text-midnight transition-transform group-hover:scale-105"
              style={{ backgroundColor: CREW_COLORS[member.name] ?? "#e8a87c" }}
            >
              {member.name.charAt(0)}
            </span>
            <span className="font-display text-base font-semibold text-white/90">
              {member.name}
            </span>
          </button>
        ))}
      </motion.div>

      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        onClick={setGuest}
        className="mt-10 flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-white/60 transition-colors hover:border-white/25 hover:text-white/85"
      >
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[11px] font-bold"
          aria-hidden
        >
          👋
        </span>
        I'm just visiting — view as a guest
      </motion.button>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="mt-2 max-w-xs text-xs text-white/30"
      >
        For family & friends following along — see everything, edit nothing.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75 }}
        className="mt-8 text-xs text-white/25"
      >
        You can switch this anytime from the profile chip in the top bar.
      </motion.p>
    </div>
  );
}
