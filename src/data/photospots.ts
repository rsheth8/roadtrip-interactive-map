/**
 * Photo spots — the designated / famous photography stops along the route,
 * with the best time to shoot and what to point the camera at. Each links back
 * to an itinerary stop id so the day-by-day view can flag it with a 📸 badge.
 */

export type PhotoSpot = {
  name: string;
  day: number;
  /** Matching itinerary stop id (drives the 📸 badge). */
  stopId: string;
  bestTime: string;
  tip: string;
  mapsQuery: string;
};

export const photoSpots: PhotoSpot[] = [
  {
    name: "Mount Rushmore",
    day: 1,
    stopId: "d1-rushmore",
    bestTime: "Late afternoon",
    tip: "The faces catch warm light in the afternoon. Frame from the Grand View Terrace or straight down the Avenue of Flags.",
    mapsQuery: "Mount Rushmore",
  },
  {
    name: "Iron Mountain Road tunnels",
    day: 1,
    stopId: "d1-iron-mtn",
    bestTime: "Daytime",
    tip: "The classic shot: Mt. Rushmore framed inside the rock tunnels. Pull over at the pigtail bridges.",
    mapsQuery: "Iron Mountain Road South Dakota",
  },
  {
    name: "Sylvan Lake",
    day: 1,
    stopId: "d1-sylvan",
    bestTime: "Golden hour",
    tip: "Still-water reflections of the granite spires — walk the shoreline loop for angles.",
    mapsQuery: "Sylvan Lake Custer State Park",
  },
  {
    name: "Devils Tower",
    day: 2,
    stopId: "d2-devils-tower",
    bestTime: "Late afternoon",
    tip: "Shoot wide from the base Tower Trail; side-light late in the day defines the columns. Prairie dogs + wildflowers make good foreground.",
    mapsQuery: "Devils Tower National Monument",
  },
  {
    name: "Forest Canyon Overlook (Trail Ridge)",
    day: 3,
    stopId: "d3-rock-cut",
    bestTime: "Morning (clear skies)",
    tip: "Alpine tundra above the treeline — get there early before afternoon clouds build.",
    mapsQuery: "Forest Canyon Overlook Rocky Mountain National Park",
  },
  {
    name: "Delicate Arch",
    day: 5,
    stopId: "d5-delicate",
    bestTime: "Sunrise / late afternoon",
    tip: "THE iconic arch. Dawn = golden light + far fewer people; frame it with the La Sal Mountains behind.",
    mapsQuery: "Delicate Arch Arches National Park",
  },
  {
    name: "Mesa Arch",
    day: 5,
    stopId: "d5-mesa-arch",
    bestTime: "Sunrise ONLY",
    tip: "At sunrise the underside glows fiery orange as light bounces up — the famous shot. You're scheduled midday, so this is a 'swing it if you can do dawn' bonus.",
    mapsQuery: "Mesa Arch Canyonlands",
  },
  {
    name: "Dead Horse Point",
    day: 5,
    stopId: "d5-dead-horse",
    bestTime: "Sunset",
    tip: "The gooseneck bend of the Colorado River far below; sunset lights the canyon walls. Wide lens.",
    mapsQuery: "Dead Horse Point State Park",
  },
  {
    name: "Bryce Point / Inspiration Point",
    day: 6,
    stopId: "d6-bryce-point",
    bestTime: "Sunrise (best) or sunset",
    tip: "The hoodoo amphitheater glows orange at first light — shoot down into the maze of spires.",
    mapsQuery: "Bryce Point Bryce Canyon",
  },
  {
    name: "Lower Antelope Canyon",
    day: 8,
    stopId: "d8-antelope",
    bestTime: "Midday (your 11:45 tour is prime)",
    tip: "Light beams + swirling sandstone. Turn off auto-brightness/HDR; your guide points out the best angles. No tripods/bags allowed.",
    mapsQuery: "Lower Antelope Canyon Page AZ",
  },
  {
    name: "Horseshoe Bend",
    day: 8,
    stopId: "d8-horseshoe",
    bestTime: "Midday or sunset",
    tip: "The full 270° river bend needs an ultra-wide lens (or pano mode). Mind the unfenced edge.",
    mapsQuery: "Horseshoe Bend Page AZ",
  },
  {
    name: "Seven Magic Mountains",
    day: 10,
    stopId: "d10-seven-magic",
    bestTime: "Morning",
    tip: "Neon totem stacks against open desert — early light is softer and the crowds are thinner.",
    mapsQuery: "Seven Magic Mountains",
  },
  {
    name: "Santa Monica Pier",
    day: 10,
    stopId: "d10-santa-monica",
    bestTime: "Sunset",
    tip: "The pier sign + Ferris wheel light up at dusk — shoot from the beach looking back toward the pier.",
    mapsQuery: "Santa Monica Pier",
  },
  {
    name: "Griffith Observatory",
    day: 11,
    stopId: "d11-griffith",
    bestTime: "Sunset → blue hour",
    tip: "Hollywood sign by day; the observatory dome with the LA skyline lighting up at blue hour is the money shot.",
    mapsQuery: "Griffith Observatory",
  },
];

export const photoStopIds = new Set(photoSpots.map((s) => s.stopId));

export function isPhotoStop(id: string): boolean {
  return photoStopIds.has(id);
}

export function photoMapsUrl(query: string): string {
  return `https://maps.google.com/?q=${encodeURIComponent(query)}`;
}
