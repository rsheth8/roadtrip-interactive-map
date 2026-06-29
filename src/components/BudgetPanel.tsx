import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import {
  getMemberTripCost,
  getTotalPerPerson,
  getTravelerCount,
  getTripDayCount,
  trip,
} from "../data/itinerary";

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) => `$${Math.round(v)}`);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}

export default function BudgetPanel() {
  const { stays, food, gas, extras } = trip.budget;
  const total = stays + food + gas + extras;
  const perPersonFull = getTotalPerPerson();
  const dayCount = getTripDayCount();
  const splitDay = trip.crew.find((m) => m.lastDay)?.lastDay ?? dayCount;
  const perPersonNilay = getMemberTripCost(splitDay);

  const rows = [
    {
      label: "Lodging",
      amount: stays,
      detail: "11 nights — all TBD (≈ $1,200 total)",
    },
    {
      label: "Food & drinks",
      amount: food,
      detail: `≈ $50/day/person · 4 through Denver, then 3 to LA`,
    },
    {
      label: "Gas",
      amount: gas,
      detail: "~2,400 mi — 4-way split days 1–4, then 3-way",
    },
    {
      label: "Permits & extras",
      amount: extras,
      detail: "Park fees, lottery permits, Vegas buffer",
    },
  ];

  return (
    <section id="budget" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-sage">Budget</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Trip costs
          </h2>
          <p className="mt-2 text-white/50">
            4 travelers days 1–{splitDay}, then 3 through Los Angeles
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between rounded-xl border border-white/8 bg-dusk/60 px-5 py-4"
            >
              <div>
                <p className="font-medium text-white/90">{row.label}</p>
                <p className="text-xs text-white/40">{row.detail}</p>
              </div>
              <span className="font-display text-lg font-semibold text-sandstone">
                ${row.amount}
              </span>
            </div>
          ))}

          <div className="flex items-center justify-between rounded-xl border border-sandstone/30 bg-sandstone/10 px-5 py-5">
            <div>
              <p className="font-display font-semibold text-white">Total trip</p>
              <p className="text-sm text-white/50">${total} all-in (shared)</p>
            </div>
            <span className="font-display text-2xl font-bold text-sandstone">
              ${total}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-sage/30 bg-sage/10 px-5 py-5">
            <div>
              <p className="font-display font-semibold text-white">
                Rahil, Sriram & Rishabh
              </p>
              <p className="text-sm text-white/50">
                ≈ ${perPersonFull} each · full trip to LA (
                {getTravelerCount(splitDay + 1)} travelers after Denver)
              </p>
            </div>
            <span className="font-display text-3xl font-bold text-sage">
              <AnimatedNumber value={perPersonFull} />
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-dusk/60 px-5 py-4">
            <div>
              <p className="font-medium text-white/90">Nilay (Denver only)</p>
              <p className="text-sm text-white/50">
                ≈ ${perPersonNilay} · days 1–{splitDay} ({getTravelerCount(1)} travelers)
              </p>
            </div>
            <span className="font-display text-xl font-semibold text-white/70">
              ${perPersonNilay}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
