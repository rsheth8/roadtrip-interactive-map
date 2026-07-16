type MobileNavProps = {
  mode: "hype" | "live";
};

const hypeLinks = [
  { href: "#hero", label: "Home", icon: "⌂" },
  { href: "#timeline-days", label: "Days", icon: "☰" },
  { href: "#budget", label: "Budget", icon: "$" },
  { href: "#checklist", label: "Prep", icon: "✓" },
  { href: "#vault", label: "Vault", icon: "🗂" },
  { href: "#safety", label: "Safety", icon: "🚨" },
];

const liveLinks = [
  { href: "#top", label: "Today", icon: "◎" },
  { href: "#today-safety", label: "Safety", icon: "🚨" },
  { href: "#today-eats", label: "Eats", icon: "🍽" },
  { href: "#gas-log", label: "Gas", icon: "⛽" },
  { href: "#splitwise", label: "Split", icon: "💸" },
];

export default function MobileNav({ mode }: MobileNavProps) {
  const links = mode === "live" ? liveLinks : hypeLinks;

  if (mode === "live") {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-midnight/95 pb-safe backdrop-blur-md md:hidden">
        <ul className="flex justify-around px-1 py-1.5">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="flex min-h-11 min-w-[3.25rem] flex-col items-center justify-center gap-0.5 px-1.5 py-1 text-[10px] text-white/50 active:text-sandstone"
              >
                <span className="text-base leading-none">{link.icon}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-midnight/95 pb-safe backdrop-blur-md md:hidden">
      <ul className="flex justify-around px-1 py-1.5">
        {hypeLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="flex min-h-11 min-w-[3.25rem] flex-col items-center justify-center gap-0.5 px-1.5 py-1 text-[10px] text-white/50 active:text-sandstone"
            >
              <span className="text-base leading-none">{link.icon}</span>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
