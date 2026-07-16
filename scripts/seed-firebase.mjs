// One-time seed: push real booking details into Firebase so they live ONLY in
// your database — never in the committed source or the deployed client bundle.
//
// Usage:
//   1. Fill .env with your VITE_FIREBASE_* values (same ones the app uses).
//   2. Put real data in scripts/bookings.private.json (gitignored). Start from
//      scripts/bookings.private.example.json.
//   3. Run:  node scripts/seed-firebase.mjs
//
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

function loadEnv() {
  let text = "";
  try {
    text = readFileSync(join(root, ".env"), "utf8");
  } catch {
    console.error("✗ No .env found. Copy .env.example → .env and fill in the Firebase values.");
    process.exit(1);
  }
  const env = {};
  for (const line of text.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}

const env = loadEnv();
const config = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: env.VITE_FIREBASE_DATABASE_URL,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
};
if (!config.databaseURL || !config.apiKey || config.apiKey.startsWith("your_")) {
  console.error("✗ Firebase not configured in .env — fill in the VITE_FIREBASE_* values first.");
  process.exit(1);
}

let bookings;
try {
  bookings = JSON.parse(readFileSync(join(here, "bookings.private.json"), "utf8"));
} catch {
  console.error(
    "✗ Missing scripts/bookings.private.json. Copy bookings.private.example.json → bookings.private.json and fill it in.",
  );
  process.exit(1);
}

const app = initializeApp(config);
const db = getDatabase(app);
const now = Date.now();

let count = 0;
for (const [id, detail] of Object.entries(bookings)) {
  await set(ref(db, `roadtrip2026/bookings/${id}`), {
    ...detail,
    updatedBy: "seed",
    updatedAt: now,
  });
  console.log(`  ✓ ${id}`);
  count++;
}

console.log(`\nSeeded ${count} bookings to Firebase. Open the site → Vault to confirm.`);
process.exit(0);
