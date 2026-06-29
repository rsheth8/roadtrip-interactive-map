type MobileNavProps = {
  mode: "hype" | "live";
};

const hypeLinks = [
  { href: "#hero", label: "Home", icon: "⌂" },
  { href: "#timeline", label: "Route", icon: "◎" },
  { href: "#timeline-days", label: "Days", icon: "☰" },
  { href: "#budget", label: "Budget", icon: "$" },
  { href: "#checklist", label: "Prep", icon: "✓" },
];

export default function MobileNav({ mode }: MobileNavProps) {
  if (mode !== "hype") return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-midnight/95 backdrop-blur-md md:hidden">
      <ul className="flex justify-around px-1 py-2">
        {hypeLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="flex min-w-[3.5rem] flex-col items-center gap-0.5 px-2 py-1 text-[10px] text-white/50 active:text-sandstone"
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
