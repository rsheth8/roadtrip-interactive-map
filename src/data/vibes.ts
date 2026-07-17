/**
 * Drives & Vibes — playlists, podcasts, long-drive games, and Vegas nightlife.
 * Playlist links point to Spotify searches so they always resolve; swap in your
 * own playlist links anytime (right-click a playlist → Share → Copy link).
 */

export type MediaLink = {
  title: string;
  by?: string;
  /** Where it shines — pair to a leg of the trip. */
  vibe?: string;
  url: string;
};

export type DriveGame = {
  name: string;
  how: string;
};

export const playlists: MediaLink[] = [
  {
    title: "Western Roadtrip 2026 (shared)",
    by: "The crew",
    vibe: "The main one — everyone adds tracks.",
    url: "https://open.spotify.com/playlist/4P2eFt4ECQbAfrSKBYErL4",
  },
  {
    title: "Bollywood Road Trip (Hindi)",
    vibe: "Hindi hits old + new for the long stretches",
    url: "https://open.spotify.com/search/bollywood%20road%20trip",
  },
  {
    title: "Punjabi Bangers",
    vibe: "Windows-down, bass-up desi energy",
    url: "https://open.spotify.com/search/punjabi%20hits%202024",
  },
  {
    title: "Telugu Hits",
    vibe: "Tollywood bangers + melodies",
    url: "https://open.spotify.com/search/telugu%20hits",
  },
  {
    title: "Tamil Hits",
    vibe: "Kollywood + Anirudh energy",
    url: "https://open.spotify.com/search/tamil%20hits",
  },
  {
    title: "Desi Hip-Hop / Fusion",
    vibe: "Divine, Seedhe Maut, AP Dhillon-type vibes",
    url: "https://open.spotify.com/search/desi%20hip%20hop",
  },
  {
    title: "Desert Drive",
    vibe: "Moab → Zion red-rock cruising (English mix)",
    url: "https://open.spotify.com/search/desert%20drive",
  },
  {
    title: "Neon Nights",
    vibe: "Rolling into Vegas",
    url: "https://open.spotify.com/search/vegas%20party",
  },
];

export const podcasts: MediaLink[] = [
  {
    title: "National Park After Dark",
    vibe: "Eerie true stories — perfect before a park day",
    url: "https://open.spotify.com/search/National%20Park%20After%20Dark",
  },
  {
    title: "Stuff You Should Know",
    vibe: "Bite-size episodes for filling miles",
    url: "https://open.spotify.com/search/Stuff%20You%20Should%20Know",
  },
];

export const driveGames: DriveGame[] = [
  {
    name: "License plate bingo",
    how: "Spot plates from different states. First to 15 wins; all 50 = legendary.",
  },
  {
    name: "The Alphabet Game",
    how: "Find A–Z in order on signs/plates. No backtracking. Q and Z are killers.",
  },
  {
    name: "Antakshari",
    how: "Desi road-trip classic — someone sings a line, next person starts a song with the last letter/syllable. Bollywood only, no repeats.",
  },
  {
    name: "The Movie Game",
    how: "Name an actor → a movie they're in → another actor in it → ... Break the chain, you're out.",
  },
  {
    name: "Would You Rather",
    how: "Trade impossible choices. Loser (no answer in 10s) buys the next gas-station snacks.",
  },
];

// --- Vegas nights ---------------------------------------------------------

export type VegasPick = {
  name: string;
  detail: string;
  /** Rough price per person — always verify current pricing. */
  price?: string;
  url?: string;
};

export type VegasCategory = {
  id: string;
  title: string;
  icon: string;
  note?: string;
  picks: VegasPick[];
};

export const vegasNights: VegasCategory[] = [
  {
    id: "free",
    title: "Free & cheap",
    icon: "🆓",
    picks: [
      {
        name: "Bellagio Fountains",
        detail: "The iconic water show — every 15–30 min after dark, totally free",
        price: "Free",
        url: "https://maps.google.com/?q=Bellagio+Fountains",
      },
      {
        name: "Fremont Street — Viva Vision",
        detail: "Giant overhead LED light show + street performers, old-school Vegas",
        price: "Free",
        url: "https://maps.google.com/?q=Fremont+Street+Experience",
      },
      {
        name: "The Chandelier Bar (Cosmopolitan)",
        detail: "Three-story bar inside a giant chandelier — nurse one cocktail, great vibe",
        price: "~$18 a drink",
        url: "https://maps.google.com/?q=The+Chandelier+Cosmopolitan+Las+Vegas",
      },
      {
        name: "The LINQ Promenade",
        detail: "Open-air strip of bars with live music; High Roller wheel if you splurge",
        price: "Free to walk",
        url: "https://maps.google.com/?q=The+LINQ+Promenade",
      },
    ],
  },
  {
    id: "show",
    title: "One 'worth it' show",
    icon: "🎭",
    note: "Prices are approximate — grab same-day half-price seats at a Tix4Tonight booth on the Strip.",
    picks: [
      {
        name: "Mystère — Cirque du Soleil (Treasure Island)",
        detail: "The best-value Cirque show — acrobatics, no bad seats",
        price: "~$70–95",
        url: "https://maps.google.com/?q=Mystere+Treasure+Island",
      },
      {
        name: "Mat Franco — Magic Reinvented (LINQ)",
        detail: "AGT-winner magician, consistently top-rated & crowd-friendly",
        price: "~$60–90",
        url: "https://maps.google.com/?q=Mat+Franco+LINQ",
      },
      {
        name: "Piff the Magic Dragon (Flamingo)",
        detail: "Comedy magic, very fun for a group",
        price: "~$50–75",
        url: "https://maps.google.com/?q=Piff+the+Magic+Dragon+Flamingo",
      },
    ],
  },
  {
    id: "clubs",
    title: "Clubs & dayclubs",
    icon: "🎧",
    note: "Heads-up: as a group of guys you'll pay cover ($30–75). Get on a promoter guest list (free/discounted) via the Discotech app, arrive before 11 PM, and skip bottle service. Pool parties (dayclubs) are often better value + vibe.",
    picks: [
      {
        name: "Zouk (Resorts World)",
        detail: "Newest big club, good guest-list deals",
        url: "https://maps.google.com/?q=Zouk+Nightclub+Resorts+World",
      },
      {
        name: "XS (Encore)",
        detail: "Legendary room; XS pool parties (Sun/Mon nights) are elite",
        url: "https://maps.google.com/?q=XS+Nightclub+Encore",
      },
      {
        name: "Encore Beach Club (dayclub)",
        detail: "Daytime pool party — big DJs, more chill entry than night clubs",
        url: "https://maps.google.com/?q=Encore+Beach+Club",
      },
    ],
  },
];
