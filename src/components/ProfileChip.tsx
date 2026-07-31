import { useState } from "react";
import { useIdentity } from "../context/IdentityContext";

const CREW_COLORS: Record<string, string> = {
  Rahil: "#e8a87c",
  Sriram: "#8fbc8f",
  Rishabh: "#6b9fd4",
  Nilay: "#c9a0dc",
};

export default function ProfileChip() {
  const { me, isGuest, resolved, setMe, setGuest, crew } = useIdentity();
  const [open, setOpen] = useState(false);

  if (!resolved) return null;

  const label = me ?? "Guest";
  const color = me ? (CREW_COLORS[me] ?? "#e8a87c") : "#8a8f9c";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 py-1 pl-1 pr-2.5 text-xs font-medium text-white/70 hover:border-sage/30"
        aria-label={`Viewing as ${label}, tap to switch`}
      >
        <span
          className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-midnight"
          style={{ backgroundColor: color }}
        >
          {isGuest ? "👋" : label.charAt(0)}
        </span>
        {label}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl border border-white/10 bg-dusk shadow-xl">
            <p className="border-b border-white/8 px-3 py-2 text-[10px] uppercase tracking-wider text-white/35">
              Switch to
            </p>
            {crew.map((member) => (
              <button
                key={member.name}
                type="button"
                onClick={() => {
                  setMe(member.name);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-white/5 ${
                  member.name === me ? "text-sage" : "text-white/80"
                }`}
              >
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-midnight"
                  style={{ backgroundColor: CREW_COLORS[member.name] ?? "#e8a87c" }}
                >
                  {member.name.charAt(0)}
                </span>
                {member.name}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setGuest();
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 border-t border-white/8 px-3 py-2 text-left text-sm transition-colors hover:bg-white/5 ${
                isGuest ? "text-sage" : "text-white/80"
              }`}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px]">
                👋
              </span>
              Guest
            </button>
          </div>
        </>
      )}
    </div>
  );
}
