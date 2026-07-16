/**
 * Eats — curated food picks along the route, grouped by stop/city.
 * These are starting points; the crew's own finds go in the shared Notes board.
 */

export type FoodPick = {
  name: string;
  what: string;
  tag?: "breakfast" | "lunch" | "dinner" | "coffee" | "treat" | "drinks";
  mapsQuery: string;
};

export type EatsRegion = {
  id: string;
  place: string;
  /** Trip day numbers this covers. */
  days: number[];
  picks: FoodPick[];
};

export const eatsRegions: EatsRegion[] = [
  {
    id: "rapid-city",
    place: "Rapid City / Black Hills",
    days: [1, 2],
    picks: [
      { name: "Tally's Silver Spoon", what: "Solid sit-down breakfast/brunch downtown", tag: "breakfast", mapsQuery: "Tally's Silver Spoon Rapid City" },
      { name: "Wall Drug", what: "Kitschy pit stop — donuts, 5¢ coffee, giant jackalope", tag: "treat", mapsQuery: "Wall Drug" },
    ],
  },
  {
    id: "denver",
    place: "Denver",
    days: [3, 4],
    picks: [
      { name: "Snooze, an A.M. Eatery", what: "Denver-born brunch institution — go early", tag: "breakfast", mapsQuery: "Snooze A.M. Eatery Denver" },
      { name: "RiNo Art District", what: "Breweries, murals, food halls for a chill night", tag: "drinks", mapsQuery: "RiNo Art District Denver" },
      { name: "Denver Milk Market", what: "Food hall — everyone gets what they want", tag: "dinner", mapsQuery: "Denver Milk Market" },
    ],
  },
  {
    id: "moab",
    place: "Moab",
    days: [5, 6],
    picks: [
      { name: "Moab Diner", what: "Classic post-hike breakfast + green chile", tag: "breakfast", mapsQuery: "Moab Diner" },
      { name: "Milt's Stop & Eat", what: "Tiny historic burger + shake joint", tag: "lunch", mapsQuery: "Milt's Stop & Eat Moab" },
      { name: "Moab Brewery", what: "Reliable dinner + local beer after the parks", tag: "dinner", mapsQuery: "Moab Brewery" },
    ],
  },
  {
    id: "capitol-reef",
    place: "Capitol Reef (Hwy 12)",
    days: [6],
    picks: [
      { name: "Gifford Homestead", what: "Famous mini fruit pies — get there before they sell out", tag: "treat", mapsQuery: "Gifford House Capitol Reef" },
      { name: "Hell's Backbone Grill (Boulder)", what: "Farm-to-table gem on Hwy 12 — worth a reservation", tag: "lunch", mapsQuery: "Hell's Backbone Grill Boulder Utah" },
    ],
  },
  {
    id: "springdale",
    place: "Kanab / Springdale / Zion",
    days: [7, 8],
    picks: [
      { name: "Rocking V Café (Kanab)", what: "Kanab dinner favorite — where you're staying", tag: "dinner", mapsQuery: "Rocking V Cafe Kanab Utah" },
      { name: "Sego Restaurant (Kanab)", what: "Small-plates spot at Canyons Lodge", tag: "dinner", mapsQuery: "Sego Restaurant Kanab" },
      { name: "Oscar's Café (Springdale)", what: "Big portions right by the Zion gate", tag: "lunch", mapsQuery: "Oscar's Cafe Springdale" },
      { name: "Deep Creek Coffee Co.", what: "Caffeine before the Zion drive", tag: "coffee", mapsQuery: "Deep Creek Coffee Springdale" },
    ],
  },
  {
    id: "vegas",
    place: "Las Vegas",
    days: [9, 10],
    picks: [
      { name: "Secret Pizza (Cosmopolitan)", what: "Late-night slices, hidden hallway", tag: "lunch", mapsQuery: "Secret Pizza Cosmopolitan Las Vegas" },
      { name: "In-N-Out", what: "The obligatory West-coast burger run", tag: "lunch", mapsQuery: "In-N-Out Burger Las Vegas" },
      { name: "A buffet worth it", what: "Bacchanal (Caesars) or Wicked Spoon — pick one to splurge", tag: "dinner", mapsQuery: "Bacchanal Buffet Las Vegas" },
    ],
  },
  {
    id: "la",
    place: "Los Angeles",
    days: [11, 12, 13],
    picks: [
      { name: "Grand Central Market", what: "Downtown food hall — tacos, eggs, everything", tag: "lunch", mapsQuery: "Grand Central Market Los Angeles" },
      { name: "Guisados", what: "Standout tacos, multiple locations", tag: "lunch", mapsQuery: "Guisados tacos Los Angeles" },
      { name: "Abbot Kinney (Venice)", what: "Trendy cafes + brunch spots", tag: "breakfast", mapsQuery: "Abbot Kinney Boulevard Venice" },
      { name: "Night + Market", what: "Fun, loud Thai for the last group dinner", tag: "dinner", mapsQuery: "Night + Market Los Angeles" },
    ],
  },
];

export function getEatsForDay(dayNumber: number): EatsRegion | undefined {
  return eatsRegions.find((r) => r.days.includes(dayNumber));
}

export function eatsMapsUrl(query: string): string {
  return `https://maps.google.com/?q=${encodeURIComponent(query)}`;
}
