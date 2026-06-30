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
