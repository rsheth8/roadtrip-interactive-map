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

function isFilled(d?: BookingDetail): boolean {
  return !!(d && (d.confirmation || d.address || d.checkIn || d.phone));
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
  const [address, setAddress] = useState(detail?.address ?? "");
  const [checkIn, setCheckIn] = useState(detail?.checkIn ?? "");
  const [phone, setPhone] = useState(detail?.phone ?? "");
  const meta = bookingKindMeta[slot.kind];
  const filled = isFilled(detail);

  const save = () => {
    onSave(slot.id, {
      confirmation: confirmation.trim() || undefined,
      address: address.trim() || undefined,
      checkIn: checkIn.trim() || undefined,
      phone: phone.trim() || undefined,
      updatedBy: me,
      updatedAt: Date.now(),
    });
    setOpen(false);
  };

  return (
    <li className="rounded-xl border border-white/8 bg-dusk/40 px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-2 font-medium text-white/90">
            <span aria-hidden>{meta.icon}</span>
            <span className="truncate">{slot.label}</span>
          </p>
          {slot.hint && (
            <p className="text-xs text-white/35">{slot.hint}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="shrink-0 text-xs text-sage hover:underline"
        >
          {open ? "Cancel" : filled ? "Edit" : "+ Add"}
        </button>
      </div>

      {!open && filled && (
        <dl className="mt-2 space-y-1 text-sm">
          {detail?.confirmation && (
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-white/35">Confirm #</dt>
              <dd className="font-mono text-sandstone">{detail.confirmation}</dd>
            </div>
          )}
          {detail?.address && (
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-white/35">Address</dt>
              <dd className="min-w-0 flex-1">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(detail.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sage hover:underline"
                >
                  {detail.address}
                </a>
              </dd>
            </div>
          )}
          {detail?.checkIn && (
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-white/35">Check-in</dt>
              <dd className="text-white/70">{detail.checkIn}</dd>
            </div>
          )}
          {detail?.phone && (
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-white/35">Phone</dt>
              <dd>
                <a href={`tel:${detail.phone.replace(/[^0-9+]/g, "")}`} className="text-sage hover:underline">
                  {detail.phone}
                </a>
              </dd>
            </div>
          )}
        </dl>
      )}

      {open && (
        <div className="mt-3 space-y-2">
          <input
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            placeholder="Confirmation #"
            className="w-full rounded-lg border border-white/10 bg-midnight px-3 py-2 text-sm text-white"
          />
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="w-full rounded-lg border border-white/10 bg-midnight px-3 py-2 text-sm text-white"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              placeholder="Check-in (e.g. 3 PM)"
              className="w-full rounded-lg border border-white/10 bg-midnight px-3 py-2 text-sm text-white"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              inputMode="tel"
              className="w-full rounded-lg border border-white/10 bg-midnight px-3 py-2 text-sm text-white"
            />
          </div>
          <button
            type="button"
            onClick={save}
            className="w-full rounded-lg bg-sage py-2.5 text-sm font-semibold text-midnight"
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
    // Details live in Firebase only (kept out of the public bundle for safety).
    const map: Record<string, BookingDetail> = {};
    for (const item of items) map[item.id] = item;
    return map;
  }, [items]);

  const filledCount = bookingSlots.filter((s) =>
    isFilled(detailById[s.id]),
  ).length;

  return (
    <section id="vault" className="scroll-mt-24 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.25em] text-sage">Trip vault</p>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Everything in one place
        </h2>
        <p className="mt-2 max-w-xl text-white/50">
          The stuff you scramble for on the road — emergency numbers, the park
          pass, and every booking confirmation.{" "}
          {shared
            ? "Confirmations sync live to all four phones."
            : "Confirmations save on this device (connect Firebase to share live)."}
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

        <div className="mt-10 flex items-baseline justify-between">
          <h3 className="font-display text-xl font-semibold">
            Bookings &amp; confirmations
          </h3>
          <span className="text-sm text-white/40">
            {filledCount}/{bookingSlots.length} filled
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
