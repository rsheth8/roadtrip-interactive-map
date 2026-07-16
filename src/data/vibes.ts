/**
 * Drives & Vibes — playlists, podcasts, and long-drive games.
 * Swap the placeholder Spotify/Apple links for your crew's real shared
 * playlists (right-click a playlist → Share → Copy link).
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
    title: "Big Sky Country",
    vibe: "I-90 & the Black Hills — open-road country/rock",
    url: "https://open.spotify.com/search/road%20trip%20country",
  },
  {
    title: "Desert Drive",
    vibe: "Moab → Zion red-rock cruising",
    url: "https://open.spotify.com/search/desert%20drive",
  },
  {
    title: "Neon Nights",
    vibe: "Rolling into Vegas",
    url: "https://open.spotify.com/search/vegas%20party",
  },
  {
    title: "Golden Hour / West Coast",
    vibe: "Mojave → Santa Monica sunset",
    url: "https://open.spotify.com/search/west%20coast%20chill",
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
  {
    title: "99% Invisible",
    vibe: "Design & places — good for the scenic byways",
    url: "https://open.spotify.com/search/99%25%20Invisible",
  },
];

export const driveGames: DriveGame[] = [
  {
    name: "License plate bingo",
    how: "Spot plates from different states. First to 15 states wins; all 50 = legendary.",
  },
  {
    name: "The Alphabet Game",
    how: "Find A–Z in order on signs/plates. No backtracking. Q and Z are killers.",
  },
  {
    name: "20 Questions",
    how: "One person thinks of a person/place/thing; 20 yes-or-no questions to guess it.",
  },
  {
    name: "Would You Rather",
    how: "Trade impossible choices. Loser (no answer in 10s) picks gas-station snacks for everyone.",
  },
  {
    name: "The Movie Game",
    how: "Name an actor → a movie they're in → another actor in it → ... Break the chain, you're out.",
  },
  {
    name: "Punch buggy (soft)",
    how: "Call out VW Beetles. Honor system on the punching.",
  },
];
