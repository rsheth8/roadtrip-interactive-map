import { motion } from "framer-motion";
import { trip } from "../data/itinerary";
import Countdown from "./Countdown";

type HeroProps = {
  onExplore: () => void;
};

export default function Hero({ onExplore }: HeroProps) {
  const start = new Date(trip.startDate + "T00:00:00");
  const end = new Date(trip.endDate + "T00:00:00");
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(232,168,124,0.15),transparent_60%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-midnight to-transparent" />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-sage"
      >
        Summer 2026
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-display text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl"
      >
        <span className="bg-gradient-to-br from-white via-sandstone-light to-sandstone bg-clip-text text-transparent">
          {trip.title}
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-4 max-w-xl text-lg text-white/60 sm:text-xl"
      >
        {trip.subtitle}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-2 text-sm text-white/40"
      >
        {fmt(start)} — {fmt(end)} · 4 of us, then 3 to LA
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-10"
      >
        <Countdown />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="mt-10 flex flex-wrap justify-center gap-2"
      >
        {trip.crew.map((member) => (
          <span
            key={member.name}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70"
          >
            {member.name}
            {member.lastDay && (
              <span className="ml-1.5 text-xs text-sandstone/80">· through Denver</span>
            )}
          </span>
        ))}
      </motion.div>

      <motion.button
        type="button"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={onExplore}
        className="mt-12 cursor-pointer rounded-full bg-sandstone px-8 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-midnight transition-shadow hover:shadow-[0_0_30px_rgba(232,168,124,0.4)]"
      >
        Explore the route
      </motion.button>
    </section>
  );
}
