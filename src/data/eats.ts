/**
 * Eats — ALL picks below are vegetarian-friendly, well-reviewed, and
 * budget-conscious (mostly $ / $$). Cuisines skew to the crew's favorites:
 * Indian, Thai, Mexican, Mediterranean, Chinese, and classic American diners.
 *
 * Because ratings change, every region also gets a live "top-rated vegetarian
 * near here" link (topRatedUrl) so you can sanity-check against current reviews.
 */

export type Cuisine =
  | "Indian"
  | "Thai"
  | "Mexican"
  | "Mediterranean"
  | "Chinese"
  | "American"
  | "Cafe";

export type FoodPick = {
  name: string;
  what: string;
  cuisine: Cuisine;
  /** Rough price per person. */
  price: "$" | "$$";
  tag?: "breakfast" | "lunch" | "dinner" | "treat" | "late night";
  mapsQuery: string;
};

export type EatsRegion = {
  id: string;
  place: string;
  /** Trip day numbers this covers. */
  days: number[];
  /** Area string used for the live top-rated search. */
  area: string;
  /** Cuisines to offer quick live "top-rated" links for. */
  liveCuisines: Cuisine[];
  picks: FoodPick[];
};

export const eatsRegions: EatsRegion[] = [
  {
    id: "rapid-city",
    place: "Rapid City / Black Hills",
    days: [1, 2],
    area: "Rapid City SD",
    liveCuisines: ["Indian", "Mexican"],
    picks: [
      { name: "Tally's Silver Spoon", what: "Downtown diner with solid veg breakfast/brunch", cuisine: "American", price: "$$", tag: "breakfast", mapsQuery: "Tally's Silver Spoon Rapid City" },
      { name: "Everest Cuisine", what: "Himalayan/Indian — big vegetarian menu", cuisine: "Indian", price: "$$", tag: "dinner", mapsQuery: "Everest Cuisine Rapid City" },
    ],
  },
  {
    id: "denver",
    place: "Denver",
    days: [2, 3, 4],
    area: "Denver CO",
    liveCuisines: ["Indian", "Thai", "Mexican", "Chinese"],
    picks: [
      { name: "Sam's No. 3", what: "Classic cheap diner — huge veg breakfast menu", cuisine: "American", price: "$", tag: "breakfast", mapsQuery: "Sam's No. 3 Denver" },
      { name: "Jerusalem Restaurant", what: "Cheap Mediterranean near DU, falafel, open late", cuisine: "Mediterranean", price: "$", tag: "dinner", mapsQuery: "Jerusalem Restaurant Denver" },
      { name: "Illegal Pete's", what: "Mission-style burritos, veg options, college staple", cuisine: "Mexican", price: "$", tag: "lunch", mapsQuery: "Illegal Pete's Denver" },
      { name: "Little India", what: "Reliable Indian with a deep veg menu", cuisine: "Indian", price: "$$", tag: "dinner", mapsQuery: "Little India Restaurant Denver" },
    ],
  },
  {
    id: "moab",
    place: "Moab",
    days: [4, 5, 6],
    area: "Moab UT",
    liveCuisines: ["Thai", "Mexican"],
    picks: [
      { name: "Moab Diner", what: "Classic post-hike breakfast, veg options + green chile", cuisine: "American", price: "$", tag: "breakfast", mapsQuery: "Moab Diner" },
      { name: "Singha Thai Cuisine", what: "Well-reviewed Thai, plenty of veg curries", cuisine: "Thai", price: "$$", tag: "dinner", mapsQuery: "Singha Thai Cuisine Moab" },
      { name: "Miguel's Baja Grill", what: "Popular Mexican with veg tacos/enchiladas", cuisine: "Mexican", price: "$$", tag: "dinner", mapsQuery: "Miguel's Baja Grill Moab" },
    ],
  },
  {
    id: "capitol-reef",
    place: "Capitol Reef (Hwy 12)",
    days: [6],
    area: "Torrey UT",
    liveCuisines: [],
    picks: [
      { name: "Gifford Homestead", what: "Famous mini fruit pies — get there before they sell out", cuisine: "Cafe", price: "$", tag: "treat", mapsQuery: "Gifford House Capitol Reef" },
      { name: "Hell's Backbone Grill (Boulder)", what: "Farm-to-table gem, veg-forward — worth a reservation (splurge)", cuisine: "American", price: "$$", tag: "lunch", mapsQuery: "Hell's Backbone Grill Boulder Utah" },
    ],
  },
  {
    id: "kanab",
    place: "Kanab (where you're staying)",
    days: [6, 7],
    area: "Kanab UT",
    liveCuisines: ["Thai", "Mexican"],
    picks: [
      { name: "Rocking V Café", what: "Big vegetarian & vegan menu, top-rated in town", cuisine: "American", price: "$$", tag: "dinner", mapsQuery: "Rocking V Cafe Kanab Utah" },
      { name: "Sego Restaurant", what: "Creative small plates at Canyons Lodge, veg options", cuisine: "American", price: "$$", tag: "dinner", mapsQuery: "Sego Restaurant Kanab" },
      { name: "Kanab Creek Bakery", what: "European-style breakfast + pastries", cuisine: "Cafe", price: "$", tag: "breakfast", mapsQuery: "Kanab Creek Bakery" },
    ],
  },
  {
    id: "springdale",
    place: "Springdale / Zion",
    days: [7],
    area: "Springdale UT",
    liveCuisines: ["Mexican"],
    picks: [
      { name: "Oscar's Café", what: "Big portions by the Zion gate, veg options", cuisine: "American", price: "$$", tag: "lunch", mapsQuery: "Oscar's Cafe Springdale" },
      { name: "MeMe's Café", what: "Sweet + savory veg crepes, highly rated", cuisine: "Cafe", price: "$$", tag: "breakfast", mapsQuery: "MeMe's Cafe Springdale" },
      { name: "Zion Pizza & Noodle Co.", what: "Veg pizzas in an old church, casual", cuisine: "American", price: "$$", tag: "dinner", mapsQuery: "Zion Pizza and Noodle Springdale" },
    ],
  },
  {
    id: "page",
    place: "Page, AZ (Antelope day)",
    days: [8],
    area: "Page AZ",
    liveCuisines: ["Indian", "Mexican"],
    picks: [
      { name: "Taste of India", what: "Handy veg-friendly Indian for a post-canyon lunch", cuisine: "Indian", price: "$$", tag: "lunch", mapsQuery: "Taste of India Page AZ" },
    ],
  },
  {
    id: "vegas",
    place: "Las Vegas",
    days: [8, 9],
    area: "Las Vegas NV",
    liveCuisines: ["Indian", "Thai", "Chinese", "Mediterranean", "Mexican"],
    picks: [
      { name: "Lotus of Siam", what: "World-famous Thai — huge veg section, a must", cuisine: "Thai", price: "$$", tag: "dinner", mapsQuery: "Lotus of Siam Las Vegas" },
      { name: "Veggie House (Chinatown)", what: "100% vegetarian Chinese, mock-meat heaven, great value", cuisine: "Chinese", price: "$$", tag: "dinner", mapsQuery: "Veggie House Las Vegas" },
      { name: "Mint Indian Bistro", what: "Top-rated Indian with a big veg menu", cuisine: "Indian", price: "$$", tag: "dinner", mapsQuery: "Mint Indian Bistro Las Vegas" },
      { name: "Paymon's Mediterranean", what: "Falafel/mezze + hookah lounge, college vibe", cuisine: "Mediterranean", price: "$$", tag: "lunch", mapsQuery: "Paymon's Mediterranean Cafe Las Vegas" },
      { name: "Secret Pizza (Cosmopolitan)", what: "Cheap late-night cheese slices, hidden hallway", cuisine: "American", price: "$", tag: "late night", mapsQuery: "Secret Pizza Cosmopolitan Las Vegas" },
    ],
  },
  {
    id: "la",
    place: "Los Angeles",
    days: [10, 11, 12, 13],
    area: "Los Angeles CA",
    liveCuisines: ["Indian", "Thai", "Mexican", "Chinese", "Mediterranean"],
    picks: [
      { name: "Pijja Palace", what: "Indian-Italian sports bar — the trendy LA veg-friendly hang", cuisine: "Indian", price: "$$", tag: "dinner", mapsQuery: "Pijja Palace Los Angeles" },
      { name: "Badmaash (DTLA)", what: "Modern Indian, lots of veg, fun vibe", cuisine: "Indian", price: "$$", tag: "dinner", mapsQuery: "Badmaash Downtown Los Angeles" },
      { name: "Ruen Pair (Thai Town)", what: "Cheap, authentic Thai open late, veg options", cuisine: "Thai", price: "$", tag: "late night", mapsQuery: "Ruen Pair Thai Town Los Angeles" },
      { name: "Dune (Atwater)", what: "Falafel bowls & mezze, highly rated, cheap", cuisine: "Mediterranean", price: "$", tag: "lunch", mapsQuery: "Dune Atwater Village Los Angeles" },
      { name: "Guisados", what: "Standout tacos — get the veggie/tinga options", cuisine: "Mexican", price: "$", tag: "lunch", mapsQuery: "Guisados tacos Los Angeles" },
    ],
  },
];

export function getEatsForDay(dayNumber: number): EatsRegion | undefined {
  return eatsRegions.find((r) => r.days.includes(dayNumber));
}

export function eatsMapsUrl(query: string): string {
  return `https://maps.google.com/?q=${encodeURIComponent(query)}`;
}

/** Live Google Maps search for current top-rated veg spots (optionally by cuisine). */
export function topRatedUrl(area: string, cuisine?: string): string {
  const q = `top rated vegetarian ${cuisine ? cuisine + " " : ""}restaurants ${area}`;
  return `https://www.google.com/maps/search/${encodeURIComponent(q)}`;
}
