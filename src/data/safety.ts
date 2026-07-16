/**
 * Emergency & Safety reference, grouped by trip region.
 * Each region maps to the trip days it covers so the live view can surface
 * "today's" safety info automatically.
 */

export type MedicalFacility = {
  name: string;
  type: "ER" | "Urgent care" | "Clinic";
  phone?: string;
  mapsQuery: string;
};

export type SafetyLink = { label: string; url: string };

export type SafetyRegion = {
  id: string;
  name: string;
  /** Trip day numbers this region covers. */
  days: number[];
  facilities: MedicalFacility[];
  hazards: string[];
  links: SafetyLink[];
};

export const universalSafety = {
  emergency: "911",
  poisonControl: "1-800-222-1222",
  tips: [
    "Carry 3–4 L of water per person on desert hikes — Arches, Zion, Delicate Arch have zero shade.",
    "Tell someone your hike + turnaround time. Cell service is spotty to nonexistent in the parks.",
    "Never enter a slot canyon (The Narrows) if rain is in the forecast anywhere upstream — flash floods are deadly.",
    "Watch for altitude sickness on Trail Ridge Road / RMNP (12,000 ft): hydrate, ease up, descend if it gets bad.",
  ],
};

export const safetyRegions: SafetyRegion[] = [
  {
    id: "black-hills",
    name: "Black Hills / Rapid City, SD",
    days: [1, 2],
    facilities: [
      {
        name: "Monument Health Rapid City Hospital (ER)",
        type: "ER",
        phone: "605-755-1000",
        mapsQuery: "Monument Health Rapid City Hospital",
      },
      {
        name: "Custer State Park — park office",
        type: "Clinic",
        phone: "605-255-4515",
        mapsQuery: "Custer State Park Visitor Center",
      },
    ],
    hazards: [
      "Wildlife on scenic roads (bison, burros) — do not approach; bison are fast and dangerous.",
      "Narrow tunnels on Needles Hwy / Iron Mountain Rd — check vehicle clearance.",
    ],
    links: [
      { label: "Mt. Rushmore (NPS) alerts", url: "https://www.nps.gov/moru/planyourvisit/conditions.htm" },
    ],
  },
  {
    id: "denver-rmnp",
    name: "Denver & Rocky Mountain NP, CO",
    days: [3, 4],
    facilities: [
      {
        name: "Estes Park Health (ER, near RMNP)",
        type: "ER",
        phone: "970-586-2317",
        mapsQuery: "Estes Park Health Hospital",
      },
      {
        name: "UCHealth — Denver metro ERs",
        type: "ER",
        mapsQuery: "UCHealth emergency room Denver",
      },
    ],
    hazards: [
      "Altitude: Trail Ridge Rd tops 12,000 ft. Headache/nausea = descend and hydrate.",
      "Afternoon thunderstorms above treeline — be off exposed alpine areas by early afternoon.",
      "Rapidly changing temps — carry warm layers even in August.",
    ],
    links: [
      { label: "RMNP current conditions & timed entry", url: "https://www.nps.gov/romo/planyourvisit/conditions.htm" },
      { label: "RMNP road status", url: "https://www.nps.gov/romo/planyourvisit/road_conditions.htm" },
    ],
  },
  {
    id: "moab",
    name: "Moab / Arches / Canyonlands, UT",
    days: [5, 6],
    facilities: [
      {
        name: "Moab Regional Hospital (ER)",
        type: "ER",
        phone: "435-719-3500",
        mapsQuery: "Moab Regional Hospital",
      },
    ],
    hazards: [
      "Extreme heat + zero shade. Hike Delicate Arch at dawn; carry 3–4 L water each.",
      "Heat exhaustion signs: dizziness, no sweat, confusion — get to shade/AC immediately.",
      "Steep unfenced drop-offs at Dead Horse Point & Grand View — mind your footing.",
    ],
    links: [
      { label: "Arches NP alerts", url: "https://www.nps.gov/arch/planyourvisit/conditions.htm" },
      { label: "Canyonlands NP alerts", url: "https://www.nps.gov/cany/planyourvisit/conditions.htm" },
    ],
  },
  {
    id: "bryce-zion",
    name: "Bryce & Zion / Kanab, UT",
    days: [7, 8],
    facilities: [
      {
        name: "Kane County Hospital (Kanab — where you're staying)",
        type: "ER",
        phone: "435-644-5811",
        mapsQuery: "Kane County Hospital Kanab Utah",
      },
      {
        name: "Banner - Page Hospital (Page AZ — near Antelope Canyon)",
        type: "ER",
        phone: "928-645-2424",
        mapsQuery: "Banner Page Hospital Arizona",
      },
      {
        name: "Zion Canyon Medical Clinic (Springdale)",
        type: "Urgent care",
        phone: "435-772-3226",
        mapsQuery: "Zion Canyon Medical Clinic Springdale",
      },
      {
        name: "St. George Regional Hospital (ER, ~45 min)",
        type: "ER",
        phone: "435-251-1000",
        mapsQuery: "St George Regional Hospital Utah",
      },
    ],
    hazards: [
      "The Narrows = flash-flood risk. Check the NPS flash-flood forecast the morning of; skip if elevated.",
      "Angels Landing chains: exposed drop-offs — skip the chain section if crowded, windy, or wet.",
      "Antelope Canyon is a slot canyon — it floods fast. Tours cancel on rain anywhere upstream; never enter if storms are near.",
      "Bryce sits at 8,000+ ft and gets cold at sunset — bring a layer.",
    ],
    links: [
      { label: "Zion flash flood forecast", url: "https://www.nps.gov/zion/planyourvisit/the-narrows.htm" },
      { label: "Zion NP alerts", url: "https://www.nps.gov/zion/planyourvisit/conditions.htm" },
      { label: "Bryce NP alerts", url: "https://www.nps.gov/brca/planyourvisit/conditions.htm" },
    ],
  },
  {
    id: "vegas",
    name: "Las Vegas, NV",
    days: [9, 10],
    facilities: [
      {
        name: "Sunrise Hospital & Medical Center (ER)",
        type: "ER",
        phone: "702-731-8000",
        mapsQuery: "Sunrise Hospital Las Vegas",
      },
      {
        name: "UMC Trauma / ER",
        type: "ER",
        phone: "702-383-2000",
        mapsQuery: "UMC hospital Las Vegas",
      },
    ],
    hazards: [
      "Desert heat — hydrate, especially around drinking. Pace it.",
      "Set a gambling budget before you walk in. Stick to it.",
    ],
    links: [
      { label: "Red Rock Canyon conditions", url: "https://www.redrockcanyonlv.org/" },
    ],
  },
  {
    id: "la",
    name: "Los Angeles, CA",
    days: [11, 12, 13],
    facilities: [
      {
        name: "Ronald Reagan UCLA Medical Center (ER)",
        type: "ER",
        phone: "310-825-9111",
        mapsQuery: "Ronald Reagan UCLA Medical Center",
      },
      {
        name: "Cedars-Sinai (ER)",
        type: "ER",
        phone: "310-423-3277",
        mapsQuery: "Cedars-Sinai Medical Center Los Angeles",
      },
    ],
    hazards: [
      "Don't leave anything visible in a parked car — smash-and-grabs are common.",
      "Rip currents at the beach — swim near lifeguards.",
    ],
    links: [
      { label: "Getty Center reservations", url: "https://www.getty.edu/visit/center/" },
    ],
  },
];

export function getRegionForDay(dayNumber: number): SafetyRegion | undefined {
  return safetyRegions.find((r) => r.days.includes(dayNumber));
}

export function hospitalMapsUrl(query: string): string {
  return `https://maps.google.com/?q=${encodeURIComponent(query)}`;
}
