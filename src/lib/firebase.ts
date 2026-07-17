import { initializeApp, type FirebaseApp } from "firebase/app";
import { getDatabase, type Database } from "firebase/database";

export type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
};

function readConfig(): FirebaseConfig | null {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY as string | undefined;
  const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as
    | string
    | undefined;
  const databaseURL = import.meta.env.VITE_FIREBASE_DATABASE_URL as
    | string
    | undefined;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID as
    | string
    | undefined;

  if (!apiKey || !authDomain || !databaseURL || !projectId) return null;
  if (apiKey === "your_firebase_api_key") return null;

  return { apiKey, authDomain, databaseURL, projectId };
}

let app: FirebaseApp | null = null;
let database: Database | null = null;

export function isFirebaseConfigured(): boolean {
  return readConfig() !== null;
}

export function getFirebaseDatabase(): Database | null {
  const config = readConfig();
  if (!config) return null;

  if (!app) {
    app = initializeApp(config);
    database = getDatabase(app);
  }

  return database;
}

export const LOCATION_PATH = "roadtrip2026/locations";
export const BOOKINGS_PATH = "roadtrip2026/bookings";
export const NOTES_PATH = "roadtrip2026/notes";
export const GAS_PATH = "roadtrip2026/gas";
export const CHECKLIST_PATH = "roadtrip2026/checklist";
