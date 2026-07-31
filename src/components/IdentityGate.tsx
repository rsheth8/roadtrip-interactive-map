import { motion } from "framer-motion";
import { useIdentity } from "../context/IdentityContext";

const CREW_COLORS: Record<string, string> = {
  Rahil: "#e8a87c",
  Sriram: "#8fbc8f",
  Rishabh: "#6b9fd4",
  Nilay: "#c9a0dc",
};

export default function IdentityGate() {
  const { crew, setMe } = useIdentity();

  return (
    <div className="grain fixed inset-0 z-[100] flex min-h-dvh flex-col items-center justify-center bg-midnight px-4 text-center">
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
        Which one of you is this?
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mt-2 max-w-sm text-sm text-white/50"
      >
        So this device shows the right name on the checklist, notes, live map,
        and gas log.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-10 grid grid-cols-2 gap-3 sm:gap-4"
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

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 text-xs text-white/25"
      >
        You can switch this anytime from the profile chip in the top bar.
      </motion.p>
    </div>
  );
}
