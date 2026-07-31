import { useState } from "react";
import { trip } from "../data/itinerary";
import { useGasLog } from "../hooks/useGasLog";
import { useCrewIdentity } from "../hooks/useCrewIdentity";

export default function GasLog() {
  const { entries, addEntry, removeEntry, totalSpent, totalGallons, mpg, shared } =
    useGasLog();
  const { me, isGuest } = useCrewIdentity();
  const [open, setOpen] = useState(false);
  const [cost, setCost] = useState("");
  const [gallons, setGallons] = useState("");
  const [odometer, setOdometer] = useState("");
  const [location, setLocation] = useState("");
  const [paidBy, setPaidBy] = useState(me || trip.crew[0]?.name || "");

  const budgetGas = trip.budget.gas;
  const remaining = budgetGas - totalSpent;
  const pct = Math.min(100, (totalSpent / budgetGas) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const costNum = parseFloat(cost);
    if (!costNum || costNum <= 0) return;

    addEntry({
      date: new Date().toISOString().slice(0, 10),
      cost: costNum,
      gallons: gallons ? parseFloat(gallons) : undefined,
      odometer: odometer ? parseInt(odometer, 10) : undefined,
      location: location || undefined,
      paidBy,
    });

    setCost("");
    setGallons("");
    setOdometer("");
    setLocation("");
    setOpen(false);
  };

  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-white/90">
          Gas log{" "}
          <span className="text-xs font-normal text-white/30">
            {shared ? "· synced" : "· this device"}
          </span>
        </p>
        {!isGuest && (
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="text-xs text-sage hover:underline"
          >
            {open ? "Cancel" : "+ Log fill-up"}
          </button>
        )}
      </div>

      <div className="rounded-xl border border-white/8 bg-dusk/60 px-4 py-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-white/40">Spent vs budget (${budgetGas})</p>
            <p className="font-display text-2xl font-semibold text-sandstone">
              ${totalSpent}
            </p>
          </div>
          <div className="text-right text-xs text-white/40">
            {totalGallons ? <p>{totalGallons.toFixed(1)} gal total</p> : null}
            {mpg ? <p>{mpg} mpg avg</p> : null}
            <p className={remaining < 0 ? "text-red-300" : ""}>
              ${Math.abs(remaining)} {remaining < 0 ? "over" : "left"}
            </p>
          </div>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full transition-all ${
              pct > 100 ? "bg-red-400" : "bg-sandstone"
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {open && !isGuest && (
        <form
          onSubmit={handleSubmit}
          className="space-y-3 rounded-xl border border-sage/20 bg-sage/5 px-4 py-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-xs text-white/50">
              Cost ($)
              <input
                type="number"
                step="0.01"
                required
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/10 bg-midnight px-3 py-2 text-sm text-white"
              />
            </label>
            <label className="block text-xs text-white/50">
              Gallons
              <input
                type="number"
                step="0.01"
                value={gallons}
                onChange={(e) => setGallons(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/10 bg-midnight px-3 py-2 text-sm text-white"
              />
            </label>
            <label className="block text-xs text-white/50">
              Odometer
              <input
                type="number"
                value={odometer}
                onChange={(e) => setOdometer(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/10 bg-midnight px-3 py-2 text-sm text-white"
              />
            </label>
            <label className="block text-xs text-white/50">
              Paid by
              <select
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/10 bg-midnight px-3 py-2 text-sm text-white"
              >
                {trip.crew.map((m) => (
                  <option key={m.name} value={m.name}>
                    {m.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="block text-xs text-white/50">
            Location (optional)
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Shell, Cheyenne WY"
              className="mt-1 w-full rounded-lg border border-white/10 bg-midnight px-3 py-2 text-sm text-white"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-sage py-2.5 text-sm font-semibold text-midnight"
          >
            Save fill-up
          </button>
        </form>
      )}

      {entries.length > 0 && (
        <ul className="space-y-2">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="flex items-center justify-between rounded-lg border border-white/8 bg-dusk/40 px-3 py-2.5 text-sm"
            >
              <div>
                <span className="font-medium text-white/80">${entry.cost}</span>
                {entry.gallons ? (
                  <span className="text-white/40"> · {entry.gallons} gal</span>
                ) : null}
                <p className="text-xs text-white/35">
                  {entry.date} · {entry.paidBy}
                  {entry.location ? ` · ${entry.location}` : ""}
                </p>
              </div>
              {!isGuest && (
                <button
                  type="button"
                  onClick={() => removeEntry(entry.id)}
                  className="text-xs text-white/30 hover:text-red-300"
                  aria-label="Remove entry"
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
