/**
 * Trip Vault — the stuff you scramble for on the road.
 *
 * `essentials` and `bookingSlots` are fixed reference data (edit them here).
 * The editable per-booking details (confirmation #, address, check-in time,
 * phone) are stored live in Firebase and keyed by each slot's stable `id`.
 */

export type EssentialContact = {
  label: string;
  value: string;
  /** tel: number for a tap-to-call button, if applicable. */
  tel?: string;
  href?: string;
  note?: string;
};

export type EssentialGroup = {
  id: string;
  title: string;
  icon: string;
  contacts: EssentialContact[];
};

export type BookingSlot = {
  id: string;
  /** Which trip day(s) this covers, for display. */
  label: string;
  kind: "lodging" | "flight" | "car" | "pass" | "tour";
  /** Approximate/expected cost, for context. */
  hint?: string;
  /**
   * Public, non-sensitive details — safe to ship in the client bundle
   * (business names/addresses/phones are all publicly listed anyway).
   * Confirmation numbers deliberately live in Firebase only.
   */
  place?: string;
  address?: string;
  phone?: string;
  when?: string;
  mapsQuery?: string;
};

export const essentials: EssentialGroup[] = [
  {
    id: "emergency",
    title: "Emergency",
    icon: "🚨",
    contacts: [
      { label: "Emergency (police / fire / medical)", value: "911", tel: "911" },
      {
        label: "Poison Control",
        value: "1-800-222-1222",
        tel: "18002221222",
      },
      {
        label: "Roadside assistance",
        value: "Add rental / AAA number",
        note: "Fill in once the rental is booked — check the glovebox packet too.",
      },
      {
        label: "Non-emergency (nationwide)",
        value: "311",
        note: "For non-urgent local issues in most cities.",
      },
    ],
  },
  {
    id: "vehicle",
    title: "Vehicle & park pass",
    icon: "🚗",
    contacts: [
      {
        label: "America the Beautiful pass",
        value: "$80 — covers RMNP, Arches, Canyonlands, Bryce, Zion",
        href: "https://www.nps.gov/planyourvisit/passes.htm",
        note: "Buy before the trip or at the first park entrance. Keep in the glovebox.",
      },
      {
        label: "Dead Horse Point (UT)",
        value: "$20/vehicle — NOT covered by NPS pass",
      },
      {
        label: "Valley of Fire (NV)",
        value: "$15/vehicle — NOT covered by NPS pass",
      },
      {
        label: "Insurance / policy #",
        value: "Add auto + rental coverage details",
        note: "Photograph your insurance card and rental agreement; store here.",
      },
    ],
  },
  {
    id: "docs",
    title: "Docs & logins",
    icon: "🗂️",
    contacts: [
      {
        label: "Recreation.gov (permits)",
        value: "Angels Landing + timed entries",
        href: "https://www.recreation.gov",
        note: "Everyone knows the shared login? Screenshot confirmed permits offline.",
      },
      {
        label: "Offline maps",
        value: "Download UT / AZ / NV / CA in Google Maps",
        note: "Cell service drops in the parks — do this on Wi-Fi before you go.",
      },
      {
        label: "Shared photo album",
        value: "Add a shared album link",
        note: "Create one iCloud/Google shared album so all 4 phones dump photos in.",
      },
    ],
  },
  {
    id: "angels-landing",
    title: "Angels Landing lottery (Aug 6 hike)",
    icon: "🧗",
    contacts: [
      {
        label: "How you get in",
        value: "recreation.gov day-before lottery",
        href: "https://www.recreation.gov/permits/4675310",
        note: "There is NO walk-up, phone line, or morning-of counter. It's an online lottery only.",
      },
      {
        label: "When to apply",
        value: "Aug 5 — window 12:01 AM–3:00 PM MT, results by ~4 PM MT",
        note: "Apply the DAY BEFORE the hike, not the morning of. Set a phone reminder for Aug 5. Confirm exact times on recreation.gov.",
      },
      {
        label: "Cost",
        value: "$6 per application (non-refundable) + $3/person if awarded",
      },
      {
        label: "How to apply",
        value: "One application for all 3 of you; choose a time slot",
        note: "Only one person needs to submit — don't waste $6 each on duplicate apps.",
      },
      {
        label: "If you don't win",
        value: "Scout Lookout or Observation Point (East Mesa) — no permit, still epic",
      },
      {
        label: "Day of the hike",
        value: "Screenshot the permit + bring photo ID",
        note: "Rangers check permits at Scout Lookout before the chain section.",
      },
    ],
  },
];

export const bookingSlots: BookingSlot[] = [
  {
    id: "stay-rapid-city",
    label: "Night 1 · Lead, SD",
    kind: "lodging",
    hint: "Booked ✓",
    place: "Hampton Inn by Hilton Lead",
    address: "900 Miners Ave, Lead, SD 57754",
    phone: "+1 605-584-1800",
    when: "Fri Jul 31, 3:00 PM → Sat Aug 1, 11:00 AM",
    mapsQuery: "Hampton Inn by Hilton Lead 900 Miners Ave Lead SD",
  },
  {
    id: "stay-denver",
    label: "Nights 2–3 · Denver",
    kind: "lodging",
    hint: "Booked ✓",
    place: "DoubleTree by Hilton Hotel Denver – Thornton",
    address: "83 East 120th Avenue, Thornton, CO 80233",
    phone: "+1 303-920-8000",
    when: "Sat Aug 1, 3:00 PM → Mon Aug 3, 11:00 AM",
    mapsQuery: "DoubleTree by Hilton Denver Thornton 83 East 120th Avenue",
  },
  {
    id: "stay-moab",
    label: "Nights 4–5 · Moab",
    kind: "lodging",
    hint: "Booked ✓",
    place: "Slackline Moab, Outset Collection by Hilton",
    address: "889 N Main St, Moab, UT 84532",
    phone: "+1 435-259-6899",
    when: "Mon Aug 3, 4:00 PM → Wed Aug 5, 11:00 AM",
    mapsQuery: "Slackline Moab Outset Collection by Hilton 889 N Main St Moab UT",
  },
  {
    id: "stay-springdale",
    label: "Nights 6–7 · Kanab, UT",
    kind: "lodging",
    hint: "Booked ✓ · Airbnb",
    place: "Serene Tiny Cabin #3 (Airbnb — host Daniel)",
    address: "4800 Boulder Bluff #3 Blvd, Kanab, UT 84741",
    when: "Wed Aug 5, after 4:00 PM → Fri Aug 7, by 10:00 AM · 3 adults",
    mapsQuery: "4800 Boulder Bluff Kanab UT 84741",
  },
  {
    id: "stay-vegas",
    label: "Nights 8–9 · Las Vegas",
    kind: "lodging",
    hint: "Booked ✓ · 1050 pts",
    place: "Polo Towers, A Hilton Vacation Club",
    address: "3745 Las Vegas Blvd S, Las Vegas, NV 89109",
    when: "Fri Aug 7 → Sun Aug 9",
    mapsQuery: "Polo Towers Las Vegas 3745 Las Vegas Blvd S",
  },
  {
    id: "stay-la",
    label: "Nights 10–12 · LA (friend's apt)",
    kind: "lodging",
    hint: "Free · 3 nights",
    when: "Sun Aug 9 → Wed Aug 12 · confirm the extra Aug 11 night",
  },
  {
    id: "tour-antelope",
    label: "Lower Antelope Canyon tour",
    kind: "tour",
    hint: "Booked ✓ · 3 people",
    place: "Ken's Tours — Lower Antelope Canyon",
    address: "Page, AZ (Navajo Nation)",
    when: "Fri Aug 7, 11:45 AM — arrive 45 min early. ⏰ Navajo/Utah time, 1 hr ahead of Page AZ",
    mapsQuery: "Ken's Tours Lower Antelope Canyon Page AZ",
  },
  {
    id: "flight-lax",
    label: "Rahil — flight home",
    kind: "flight",
    hint: "Booked ✓",
    place: "Frontier F9 2446 · LAX → ORD",
    when: "Wed Aug 12, 11:59 PM PDT → Thu Aug 13, 6:17 AM CDT (4h 18m)",
    mapsQuery: "Los Angeles International Airport",
  },
  {
    id: "car-rental",
    label: "Car rental (one-way → LAX)",
    kind: "car",
    hint: "Not booked yet",
  },
  {
    id: "flight-nilay",
    label: "Nilay — flight home from DEN (Aug 3)",
    kind: "flight",
    hint: "Not booked yet",
  },
  {
    id: "flight-lax-others",
    label: "Sriram & Rishabh — flights home from LAX",
    kind: "flight",
    hint: "Not booked yet",
  },
];

export const bookingKindMeta: Record<BookingSlot["kind"], { icon: string; label: string }> = {
  lodging: { icon: "🏨", label: "Stay" },
  flight: { icon: "✈️", label: "Flight" },
  car: { icon: "🚙", label: "Car" },
  pass: { icon: "🎟️", label: "Pass" },
  tour: { icon: "🎫", label: "Tour" },
};
