export type StopType =
  | "city"
  | "park"
  | "hike"
  | "viewpoint"
  | "food"
  | "hotel"
  | "drive";

export type Stop = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: StopType;
  time?: string;
  notes?: string;
  links?: { maps?: string; trail?: string; info?: string };
};

export type Day = {
  dayNumber: number;
  date: string;
  title: string;
  route: string;
  stops: Stop[];
  lodging?: { name: string; cost: number; notes?: string };
  driveHours?: number;
  highlight?: string;
};

export type CrewMember = {
  name: string;
  /** Last trip day they travel (inclusive). Omit if staying through LA. */
  lastDay?: number;
};

export type Budget = {
  stays: number;
  food: number;
  gas: number;
  extras: number;
};

export type ChecklistItem = {
  id: string;
  label: string;
  category: "permits" | "bookings" | "packing";
  urgent?: boolean;
};

export type Trip = {
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  /** Travelers at trip start (derived from crew if omitted). */
  travelers: number;
  crew: CrewMember[];
  days: Day[];
  budget: Budget;
  checklist: ChecklistItem[];
};
