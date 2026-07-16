import Countdown from "./Countdown";

type NavProps = {
  mode: "hype" | "live";
  onModeChange: (mode: "hype" | "live") => void;
  showLiveToggle: boolean;
};

const links = [
  { href: "#timeline", label: "Route" },
  { href: "#timeline-days", label: "Days" },
  { href: "#budget", label: "Budget" },
  { href: "#checklist", label: "Prep" },
  { href: "#vault", label: "Vault" },
  { href: "#safety", label: "Safety" },
  { href: "#eats", label: "Eats" },
  { href: "#vibes", label: "Vibes" },
];

export default function Nav({ mode, onModeChange, showLiveToggle }: NavProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-midnight/80 pt-safe backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <a
          href="#hero"
          className="min-w-0 shrink font-display text-sm font-bold tracking-wide text-white sm:text-base"
        >
          Western Roadtrip
        </a>

        <nav className="hidden items-center gap-5 lg:flex">
          {mode === "hype" &&
            links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-white/50 transition-colors hover:text-sandstone"
              >
                {l.label}
              </a>
            ))}
        </nav>

        <div className="flex items-center gap-3">
          {mode === "hype" && (
            <span className="hidden text-xs text-white/40 sm:inline">
              <Countdown compact />
            </span>
          )}
          {showLiveToggle && (
            <button
              type="button"
              onClick={() => onModeChange(mode === "hype" ? "live" : "hype")}
              className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors sm:px-4 ${
                mode === "live"
                  ? "bg-sage text-midnight"
                  : "border border-white/15 text-white/60 hover:border-sandstone/40 hover:text-sandstone"
              }`}
            >
              {mode === "live" ? "Full trip" : "Today"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
