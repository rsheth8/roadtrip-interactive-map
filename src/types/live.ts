export type MemberLocation = {
  name: string;
  lat: number;
  lng: number;
  updatedAt: number;
  accuracy?: number;
};

export type GasEntry = {
  id: string;
  date: string;
  cost: number;
  gallons?: number;
  odometer?: number;
  location?: string;
  paidBy: string;
};

export type SplitwiseBalance = {
  member: string;
  balance: number;
};

/** A crew note on the shared board (Firebase-backed). */
export type SharedNote = {
  id: string;
  text: string;
  author: string;
  createdAt: number;
};

/** Editable confirmation details for a booking slot (Firebase-backed). */
export type BookingDetail = {
  id: string;
  confirmation?: string;
  address?: string;
  checkIn?: string;
  phone?: string;
  updatedBy?: string;
  updatedAt?: number;
};
