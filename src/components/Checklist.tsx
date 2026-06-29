import { useCallback, useEffect, useState } from "react";
import { trip } from "../data/itinerary";
import type { ChecklistItem } from "../types/trip";

const STORAGE_KEY = "roadtrip-checklist";

function loadChecked(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function saveChecked(checked: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...checked]));
}

const categoryLabels: Record<ChecklistItem["category"], string> = {
  permits: "Permits & reservations",
  bookings: "Bookings",
  packing: "Packing & prep",
};

export default function Checklist() {
  const [checked, setChecked] = useState<Set<string>>(loadChecked);

  useEffect(() => {
    saveChecked(checked);
  }, [checked]);

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const categories = (["permits", "bookings", "packing"] as const).map(
    (cat) => ({
      cat,
      items: trip.checklist.filter((i) => i.category === cat),
    }),
  );

  const done = checked.size;
  const total = trip.checklist.length;

  return (
    <section id="checklist" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-sage">Prep</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Checklist
          </h2>
          <p className="mt-2 text-white/50">
            {done}/{total} complete — saved in your browser
          </p>
          <div className="mx-auto mt-4 h-1.5 max-w-xs overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-sage transition-all duration-500"
              style={{ width: `${total ? (done / total) * 100 : 0}%` }}
            />
          </div>
        </div>

        <div className="mt-10 space-y-8">
          {categories.map(({ cat, items }) => (
            <div key={cat}>
              <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-white/60">
                {categoryLabels[cat]}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => {
                  const isChecked = checked.has(item.id);
                  return (
                    <li key={item.id}>
                      <label
                        className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition-colors ${
                          isChecked
                            ? "border-sage/20 bg-sage/5"
                            : item.urgent
                              ? "border-sandstone/30 bg-sandstone/5"
                              : "border-white/8 bg-dusk/40"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggle(item.id)}
                          className="mt-1 h-4 w-4 shrink-0 accent-sage"
                        />
                        <span
                          className={`text-sm ${isChecked ? "text-white/40 line-through" : "text-white/80"}`}
                        >
                          {item.label}
                          {item.urgent && !isChecked && (
                            <span className="ml-2 text-xs text-sandstone">
                              urgent
                            </span>
                          )}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
