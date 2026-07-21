import { useMemo, useState } from "react";
import {
  bookingKindMeta,
  bookingSlots,
  essentials,
  type BookingSlot,
} from "../data/essentials";
import { useSharedCollection } from "../hooks/useSharedCollection";
import { useCrewIdentity } from "../hooks/useCrewIdentity";
import { BOOKINGS_PATH } from "../lib/firebase";
import type { BookingDetail } from "../types/live";

function mapsUrl(query: string): string {
  return `https://maps.google.com/?q=${encodeURIComponent(query)}`;
}

function BookingCard({
  slot,
  detail,
  onSave,
  me,
}: {
  slot: BookingSlot;
  detail?: BookingDetail;
  onSave: (id: string, value: Omit<BookingDetail, "id">) => void;
  me: string;
}) {
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState(detail?.confirmation ?? "");
  const meta = bookingKindMeta[slot.kind];

  const save = () => {
    onSave(slot.id, {
      confirmation: confirmation.trim() || undefined,
      updatedBy: me,
      updatedAt: Date.now(),
    });
    setOpen(false);
  };

  return (
    <li className="rounded-xl border border-white/8 bg-dusk/40 px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/40">
            <span aria-hidden>{meta.icon}</span>
            <span className="truncate">{slot.label}</span>
          </p>
          {slot.place && (
            <p className="mt-1 font-medium text-white/90">{slot.place}</p>
          )}
          {slot.hint && (
            <p className="text-xs text-sage/80">{slot.hint}</p>
          )}
        </div>
        {slot.mapsQuery && (
          <a
            href={mapsUrl(slot.mapsQuery)}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-lg border border-sage/30 px-2.5 py-1 text-xs text-sage hover:bg-sage/10"
          >
            Maps →
          </a>
        )}
      </div>

      <dl className="mt-2 space-y-1 text-sm">
        {slot.address && (
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 text-white/35">Address</dt>
            <dd className="min-w-0 flex-1 text-white/70">{slot.address}</dd>
          </div>
        )}
        {slot.when && (
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 text-white/35">When</dt>
            <dd className="min-w-0 flex-1 text-white/70">{slot.when}</dd>
          </div>
        )}
        {slot.phone && (
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 text-white/35">Phone</dt>
            <dd>
              <a
                href={`tel:${slot.phone.replace(/[^0-9+]/g, "")}`}
                className="text-sage hover:underline"
              >
                {slot.phone}
              </a>
            </dd>
          </div>
        )}
        <div className="flex items-baseline gap-2">
          <dt className="w-20 shrink-0 text-white/35">Confirm #</dt>
          <dd className="min-w-0 flex-1">
            {detail?.confirmation ? (
              <span className="font-mono text-sandstone">
                {detail.confirmation}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="text-xs text-sage hover:underline"
              >
                {open ? "Cancel" : "+ Add"}
              </button>
            )}
          </dd>
          {detail?.confirmation && (
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="shrink-0 text-xs text-white/30 hover:text-sage"
            >
              {open ? "Cancel" : "Edit"}
            </button>
          )}
        </div>
      </dl>

      {open && (
        <div className="mt-2 flex gap-2">
          <input
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            placeholder="Confirmation #"
            className="min-w-0 flex-1 rounded-lg border border-white/10 bg-midnight px-3 py-2 text-sm text-white"
          />
          <button
            type="button"
            onClick={save}
            className="shrink-0 rounded-lg bg-sage px-4 py-2 text-sm font-semibold text-midnight"
          >
            Save
          </button>
        </div>
      )}
    </li>
  );
}

export default function VaultPanel() {
  const { items, put, shared } = useSharedCollection<BookingDetail>(
    BOOKINGS_PATH,
    "roadtrip-bookings",
  );
  const { me } = useCrewIdentity();

  const detailById = useMemo(() => {
    const map: Record<string, BookingDetail> = {};
    for (const item of items) map[item.id] = item;
    return map;
  }, [items]);

  const withConfirmation = bookingSlots.filter(
    (s) => detailById[s.id]?.confirmation,
  ).length;

  return (
    <section id="vault" className="scroll-mt-24 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.25em] text-sage">Trip vault</p>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Everything in one place
        </h2>
        <p className="mt-2 max-w-xl text-white/50">
          Every booking with its address, phone and a one-tap Maps link — plus
          emergency numbers and the park pass.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {essentials.map((group) => (
            <div
              key={group.id}
              className="rounded-2xl border border-white/8 bg-dusk/50 px-5 py-5"
            >
              <p className="flex items-center gap-2 font-display text-lg font-semibold">
                <span aria-hidden>{group.icon}</span>
                {group.title}
              </p>
              <ul className="mt-3 space-y-3">
                {group.contacts.map((c) => (
                  <li key={c.label}>
                    <p className="text-xs uppercase tracking-wider text-white/35">
                      {c.label}
                    </p>
                    {c.tel ? (
                      <a
                        href={`tel:${c.tel}`}
                        className="font-medium text-sage hover:underline"
                      >
                        {c.value}
                      </a>
                    ) : c.href ? (
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-sage hover:underline"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="font-medium text-white/80">{c.value}</p>
                    )}
                    {c.note && (
                      <p className="mt-0.5 text-xs text-white/40">{c.note}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-display text-xl font-semibold">
            Bookings &amp; confirmations
          </h3>
          <span className="text-sm text-white/40">
            {withConfirmation}/{bookingSlots.length} confirmation #s saved
            {shared ? " · synced" : " · this device"}
          </span>
        </div>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {bookingSlots.map((slot) => (
            <BookingCard
              key={slot.id}
              slot={slot}
              detail={detailById[slot.id]}
              onSave={put}
              me={me}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
