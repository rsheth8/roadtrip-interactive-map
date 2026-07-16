import type { Trip, CrewMember } from "../types/trip";

export const trip: Trip = {
  title: "Western Roadtrip",
  subtitle: "Minneapolis → Mountain West → Los Angeles",
  startDate: "2026-07-31",
  endDate: "2026-08-12",
  travelers: 4,
  crew: [
    { name: "Rahil" },
    { name: "Sriram" },
    { name: "Rishabh" },
    { name: "Nilay", lastDay: 4 },
  ],
  budget: {
    stays: 925,
    food: 1800,
    gas: 400,
    extras: 150,
  },
  checklist: [
    {
      id: "angels-day-before",
      label: "Angels Landing: apply the DAY-BEFORE lottery on Aug 5 (recreation.gov, 12:01 AM–3 PM MT, results ~4 PM)",
      category: "permits",
      urgent: true,
    },
    {
      id: "angels-backup",
      label: "No permit? Plan B: Scout Lookout, Observation Point (East Mesa), or The Narrows",
      category: "permits",
    },
    {
      id: "antelope-timezone",
      label: "Antelope Canyon Aug 7: confirm tour is Navajo time (MDT) & keep phones on Utah time",
      category: "permits",
      urgent: true,
    },
    {
      id: "rmnp-timed",
      label: "Rocky Mountain NP timed entry (~60 days before Aug 2)",
      category: "permits",
      urgent: true,
    },
    {
      id: "arches-timed",
      label: "Arches NP timed entry (if required for Aug 2026)",
      category: "permits",
    },
    {
      id: "zion-shuttle",
      label: "Zion shuttle schedule / parking plan",
      category: "permits",
    },
    {
      id: "la-friend-apt",
      label: "Confirm LA stay — Rahil's friend's apt, now Aug 9–12 (3 nights, free) — check the extra Aug 11 night is OK",
      category: "bookings",
      urgent: true,
    },
    {
      id: "america-beautiful",
      label: "America the Beautiful pass ($80) — RMNP, Arches, Canyonlands, Bryce, Zion",
      category: "bookings",
    },
    {
      id: "lax-flights",
      label: "Book flights home from LAX — Aug 11 (midday+)",
      category: "bookings",
      urgent: true,
    },
    {
      id: "nilay-den-flight",
      label: "Book Nilay's flight home from DEN — morning of Day 4 (Aug 3)",
      category: "bookings",
      urgent: true,
    },
    {
      id: "car-rental",
      label: "Confirm car rental / one-way drop-off at LAX",
      category: "bookings",
    },
    {
      id: "offline-maps",
      label: "Download offline Google Maps for UT/AZ/NV/CA",
      category: "packing",
      urgent: true,
    },
    {
      id: "sunscreen",
      label: "Sunscreen, hats, electrolytes (desert heat)",
      category: "packing",
    },
    {
      id: "hiking-gear",
      label: "Hiking boots, daypacks, 2L+ water bottles each",
      category: "packing",
    },
    {
      id: "layers",
      label: "Warm layers for RMNP mornings + Bryce sunset",
      category: "packing",
    },
    {
      id: "headlamp",
      label: "Headlamps for early Arches / Zion starts",
      category: "packing",
    },
    {
      id: "car-check",
      label: "Oil change, tire check, spare tire & jack",
      category: "packing",
    },
  ],
  days: [
    {
      dayNumber: 1,
      date: "2026-07-31",
      title: "Minneapolis → Black Hills",
      route: "Minneapolis → Needles Hwy → Iron Mountain Rd → Mt. Rushmore → Rapid City",
      driveHours: 9,
      highlight: "Scenic loop first — tunnel views of Rushmore, then the granite faces",
      lodging: {
        name: "Hampton Inn by Hilton — Lead, SD",
        cost: 0,
        notes: "900 Miners Ave, Lead · check-in 3 PM · booking details in the Vault",
      },
      stops: [
        {
          id: "d1-start",
          name: "Minneapolis, MN — depart",
          lat: 44.9778,
          lng: -93.265,
          type: "city",
          time: "6:00 AM",
          notes: "I-90 West → US-16 West into the Black Hills",
        },
        {
          id: "d1-needles",
          name: "Needles Highway",
          lat: 43.8361,
          lng: -103.5564,
          type: "drive",
          time: "2:00 – 3:00 PM",
          notes: "Needles Eye Tunnel — enter Custer State Park from the east",
          links: {
            maps: "https://maps.google.com/?q=Needles+Highway+South+Dakota",
          },
        },
        {
          id: "d1-iron-mtn",
          name: "Iron Mountain Road",
          lat: 43.861,
          lng: -103.541,
          type: "drive",
          time: "3:00 – 3:45 PM",
          notes: "Pigtail bridges + tunnel frames of Mt. Rushmore as you approach",
          links: {
            maps: "https://maps.google.com/?q=Iron+Mountain+Road+South+Dakota",
          },
        },
        {
          id: "d1-rushmore",
          name: "Mount Rushmore National Memorial",
          lat: 43.8791,
          lng: -103.4591,
          type: "park",
          time: "4:00 – 5:30 PM",
          notes: "Presidential Trail loop, Avenue of Flags, visitor center",
          links: {
            maps: "https://maps.google.com/?q=Mount+Rushmore",
            info: "https://www.nps.gov/moru/",
          },
        },
        {
          id: "d1-sylvan",
          name: "Sylvan Lake — Custer State Park (optional)",
          lat: 43.8467,
          lng: -103.5644,
          type: "viewpoint",
          time: "5:30 – 6:30 PM",
          notes: "Golden-hour photos — skip if behind schedule",
          links: {
            maps: "https://maps.google.com/?q=Sylvan+Lake+Custer+State+Park",
          },
        },
        {
          id: "d1-wildlife",
          name: "Wildlife Loop Road (optional)",
          lat: 43.793,
          lng: -103.456,
          type: "drive",
          time: "Alt. if ahead",
          notes: "18-mi loop — bison herds, pronghorn, burros. Only if ahead of schedule",
          links: {
            maps: "https://maps.google.com/?q=Wildlife+Loop+Road+Custer+State+Park",
          },
        },
        {
          id: "d1-lodging",
          name: "Hampton Inn by Hilton — Lead, SD",
          lat: 44.3525,
          lng: -103.7654,
          type: "hotel",
          time: "Night",
          notes: "900 Miners Ave, Lead · check-in 3 PM. ~40 min from Rushmore — skip Sylvan Lake / Wildlife Loop if behind",
        },
      ],
    },
    {
      dayNumber: 2,
      date: "2026-08-01",
      title: "Black Hills → Denver",
      route: "Rapid City → Cheyenne → Denver",
      driveHours: 6.5,
      highlight: "Long haul west — skip sunrise, save energy for the Rockies tomorrow",
      lodging: {
        name: "DoubleTree by Hilton — Denver/Thornton",
        cost: 0,
        notes: "83 E 120th Ave, Thornton · 2 nights · booking details in the Vault",
      },
      stops: [
        {
          id: "d2-depart",
          name: "Depart Rapid City",
          lat: 44.0805,
          lng: -103.231,
          type: "city",
          time: "8:00 AM",
          notes: "No Black Hills sunrise — leave by 8 AM",
        },
        {
          id: "d2-wall-drug",
          name: "Wall Drug (optional)",
          lat: 43.9925,
          lng: -102.2418,
          type: "food",
          time: "10:00 – 10:20 AM",
          notes: "Quick photo stop — 15 min max",
          links: {
            maps: "https://maps.google.com/?q=Wall+Drug",
          },
        },
        {
          id: "d2-cheyenne",
          name: "Cheyenne, WY — lunch & gas",
          lat: 41.14,
          lng: -104.82,
          type: "food",
          time: "12:00 – 1:00 PM",
          links: {
            maps: "https://maps.google.com/?q=Cheyenne+WY",
          },
        },
        {
          id: "d2-denver",
          name: "Denver, CO — check in",
          lat: 39.7392,
          lng: -104.9903,
          type: "city",
          time: "6:00 PM",
          notes: "Easy dinner, short LoDo walk — no big night out (RMNP tomorrow)",
        },
      ],
    },
    {
      dayNumber: 3,
      date: "2026-08-02",
      title: "Rocky Mountain National Park",
      route: "Denver → RMNP day trip → Denver",
      driveHours: 3,
      highlight: "Trail Ridge Road — alpine tundra above the treeline",
      lodging: {
        name: "DoubleTree by Hilton — Denver/Thornton",
        cost: 0,
        notes: "Same as night 2 · booking details in the Vault",
      },
      stops: [
        {
          id: "d3-depart",
          name: "Depart Denver",
          lat: 39.7392,
          lng: -104.9903,
          type: "city",
          time: "5:30 AM",
          notes: "Timed entry reservation required",
        },
        {
          id: "d3-bear",
          name: "Bear Lake Trailhead",
          lat: 40.3128,
          lng: -105.6403,
          type: "hike",
          time: "6:30 – 7:30 AM",
          notes: "Bear Lake loop or Nymph Lake extension — keep it short",
          links: {
            maps: "https://maps.google.com/?q=Bear+Lake+RMNP",
            trail: "https://www.alltrails.com/trail/us/colorado/bear-lake-trail",
          },
        },
        {
          id: "d3-trail-ridge",
          name: "Trail Ridge Road",
          lat: 40.3928,
          lng: -105.7097,
          type: "drive",
          time: "7:30 – 11:00 AM",
          notes: "Must-see — Rock Cut, Forest Canyon Overlook, Alpine Visitor Center",
          links: {
            info: "https://www.nps.gov/romo/planyourvisit/trailridge.htm",
          },
        },
        {
          id: "d3-rock-cut",
          name: "Rock Cut & Forest Canyon Overlook",
          lat: 40.405,
          lng: -105.715,
          type: "viewpoint",
          time: "9:00 – 10:00 AM",
          notes: "Photo stops along Trail Ridge Road",
        },
        {
          id: "d3-lunch",
          name: "Estes Park — lunch",
          lat: 40.3772,
          lng: -105.5217,
          type: "food",
          time: "11:30 AM – 12:30 PM",
        },
        {
          id: "d3-explore",
          name: "RMNP afternoon hike (optional)",
          lat: 40.3428,
          lng: -105.6836,
          type: "hike",
          time: "1:00 – 4:00 PM",
          notes: "Alberta Falls or Sprague Lake — cut short if tired",
        },
        {
          id: "d3-nightlife",
          name: "Denver nightlife — LoDo / RiNo",
          lat: 39.753,
          lng: -104.999,
          type: "food",
          time: "8:00 PM – 12:00 AM",
          notes: "Optional — skip if wiped from Trail Ridge",
        },
      ],
    },
    {
      dayNumber: 4,
      date: "2026-08-03",
      title: "Denver → Moab",
      route: "Denver → I-70 West → Moab, UT",
      driveHours: 6,
      highlight: "Nilay flies home from Denver — the three of us head to Moab",
      lodging: {
        name: "Slackline Moab, Outset Collection by Hilton",
        cost: 0,
        notes: "889 N Main St · check-in 4 PM · 2 nights · booking details in the Vault",
      },
      stops: [
        {
          id: "d4-nilay-den",
          name: "DIA — Nilay flies home",
          lat: 39.8561,
          lng: -104.6737,
          type: "city",
          time: "8:00 AM",
          notes: "Drop at Denver International — Rahil, Sriram & Rishabh continue west. If flight is later, shift brunch and Moab arrival accordingly",
          links: {
            maps: "https://maps.google.com/?q=Denver+International+Airport",
          },
        },
        {
          id: "d4-brunch",
          name: "Brunch in Denver",
          lat: 39.7392,
          lng: -104.9903,
          type: "food",
          time: "9:30 – 11:00 AM",
          notes: "Last meal as a trio before the desert leg",
        },
        {
          id: "d4-i70",
          name: "I-70 West through the Rockies",
          lat: 39.63,
          lng: -106.04,
          type: "drive",
          time: "11:30 AM – 2:00 PM",
          notes: "Eisenhower Tunnel, Glenwood Canyon",
        },
        {
          id: "d4-green-river",
          name: "Green River, UT — gas & snacks",
          lat: 39.0639,
          lng: -108.5506,
          type: "food",
          time: "3:00 – 3:30 PM",
          links: {
            maps: "https://maps.google.com/?q=Green+River+UT",
          },
        },
        {
          id: "d4-moab",
          name: "Moab, UT — check in",
          lat: 38.5733,
          lng: -109.5498,
          type: "hotel",
          time: "6:00 PM",
          notes: "Walk Main Street, pack daypacks — Delicate Arch first thing tomorrow (3L water each). Fallback: gas + check-in only if Day 4 ran late",
        },
      ],
    },
    {
      dayNumber: 5,
      date: "2026-08-04",
      title: "Arches & Canyonlands",
      route: "Arches sunrise → Delicate Arch → Canyonlands → Dead Horse Point",
      driveHours: 2,
      highlight: "Delicate Arch at dawn, then Canyonlands + Dead Horse Point",
      lodging: {
        name: "Slackline Moab, Outset Collection by Hilton",
        cost: 0,
        notes: "Same as night 4 · booking details in the Vault",
      },
      stops: [
        {
          id: "d5-arches-entry",
          name: "Arches National Park — enter",
          lat: 38.68,
          lng: -109.57,
          type: "park",
          time: "5:15 AM",
          notes: "Arrive early — parking fills fast",
          links: {
            info: "https://www.nps.gov/arch/",
          },
        },
        {
          id: "d5-park-ave",
          name: "Park Avenue Viewpoint",
          lat: 38.6292,
          lng: -109.6022,
          type: "viewpoint",
          time: "5:30 – 5:45 AM",
        },
        {
          id: "d5-delicate",
          name: "Delicate Arch Trail",
          lat: 38.7355,
          lng: -109.5205,
          type: "hike",
          time: "5:45 – 8:15 AM",
          notes: "Do this FIRST — 3 mi RT, zero shade, 3L+ water each. THE iconic arch.",
          links: {
            trail: "https://www.alltrails.com/trail/us/utah/delicate-arch-trail",
          },
        },
        {
          id: "d5-lasal",
          name: "La Sal Mountains Viewpoint",
          lat: 38.6175,
          lng: -109.595,
          type: "viewpoint",
          time: "8:15 – 8:30 AM",
        },
        {
          id: "d5-landscape",
          name: "Landscape Arch Trail",
          lat: 38.791,
          lng: -109.606,
          type: "hike",
          time: "8:30 – 10:30 AM",
          notes: "Devils Garden area — ~2 hrs. Skip Double O if tired.",
          links: {
            trail: "https://www.alltrails.com/trail/us/utah/landscape-arch-trail",
          },
        },
        {
          id: "d5-lunch",
          name: "Lunch in Moab",
          lat: 38.5733,
          lng: -109.5498,
          type: "food",
          time: "11:00 AM – 12:00 PM",
        },
        {
          id: "d5-canyonlands",
          name: "Canyonlands NP — Island in the Sky",
          lat: 38.4594,
          lng: -109.8215,
          type: "park",
          time: "12:30 – 4:30 PM",
          links: {
            info: "https://www.nps.gov/cany/planyourvisit/islandinthesky.htm",
          },
        },
        {
          id: "d5-grand-view",
          name: "Grand View Point Overlook",
          lat: 38.424,
          lng: -109.846,
          type: "viewpoint",
          time: "1:30 – 2:15 PM",
        },
        {
          id: "d5-green-river-ol",
          name: "Green River Overlook",
          lat: 38.378,
          lng: -109.885,
          type: "viewpoint",
          time: "2:30 – 3:15 PM",
        },
        {
          id: "d5-mesa-arch",
          name: "Mesa Arch (optional)",
          lat: 38.387,
          lng: -109.866,
          type: "viewpoint",
          time: "3:15 – 4:00 PM",
          notes: "Better at sunrise — skip if running late for Dead Horse Point",
          links: {
            trail: "https://www.alltrails.com/trail/us/utah/mesa-arch-trail",
          },
        },
        {
          id: "d5-dead-horse",
          name: "Dead Horse Point State Park",
          lat: 38.462,
          lng: -109.739,
          type: "viewpoint",
          time: "4:30 – 5:30 PM",
          notes: "Iconic Colorado River bend — $20/vehicle, not covered by NPS pass. On UT-313 drive back to Moab",
          links: {
            maps: "https://maps.google.com/?q=Dead+Horse+Point+State+Park",
            info: "https://stateparks.utah.gov/parks/dead-horse/",
          },
        },
        {
          id: "d5-dinner",
          name: "Dinner in Moab",
          lat: 38.5733,
          lng: -109.5498,
          type: "food",
          time: "6:30 – 8:00 PM",
        },
      ],
    },
    {
      dayNumber: 6,
      date: "2026-08-05",
      title: "Capitol Reef → Hwy 12 → Bryce",
      route: "Moab → Capitol Reef → Utah Hwy 12 → Bryce → Kanab",
      driveHours: 7,
      highlight: "Hwy 12 crown jewel — stay at Bryce for real sunset (~8:35 PM)",
      lodging: {
        name: "Airbnb — Serene Tiny Cabin, Kanab UT",
        cost: 0,
        notes: "Host Daniel · Kanab · check-in after 4 PM · 2 nights · address in the Vault",
      },
      stops: [
        {
          id: "d6-depart",
          name: "Depart Moab",
          lat: 38.5733,
          lng: -109.5498,
          type: "city",
          time: "6:00 AM",
        },
        {
          id: "d6-capitol",
          name: "Capitol Reef National Park",
          lat: 38.2872,
          lng: -111.2479,
          type: "park",
          time: "8:30 – 10:30 AM",
          notes: "Scenic drive through the park",
          links: {
            info: "https://www.nps.gov/care/",
          },
        },
        {
          id: "d6-goosenecks",
          name: "Goosenecks Overlook",
          lat: 38.261,
          lng: -111.228,
          type: "viewpoint",
          time: "10:00 – 10:30 AM",
        },
        {
          id: "d6-petroglyphs",
          name: "Petroglyph Panel",
          lat: 38.264,
          lng: -111.215,
          type: "viewpoint",
          time: "10:30 – 11:00 AM",
          notes: "Fremont culture rock art along Hwy 24",
        },
        {
          id: "d6-fruita",
          name: "Fruita Historic District — Gifford House",
          lat: 38.285,
          lng: -111.248,
          type: "food",
          time: "11:00 AM – 12:00 PM",
          notes: "Famous peach pie — seasonal in August!",
        },
        {
          id: "d6-hwy12",
          name: "Utah Scenic Byway 12",
          lat: 37.875,
          lng: -111.42,
          type: "drive",
          time: "12:00 – 3:00 PM",
          notes: "Boulder → Escalante → Red Canyon. Don't rush — pull over at every overlook.",
          links: {
            info: "https://www.utahscenicbyway12.com/",
          },
        },
        {
          id: "d6-red-canyon",
          name: "Red Canyon — Dixie NF",
          lat: 37.741,
          lng: -112.386,
          type: "viewpoint",
          time: "2:30 – 3:00 PM",
          notes: "Hoodoos right off the highway before Bryce",
        },
        {
          id: "d6-bryce-sunset",
          name: "Bryce Canyon — Sunset Point",
          lat: 37.622,
          lng: -112.167,
          type: "viewpoint",
          time: "4:00 – 4:45 PM",
          links: {
            info: "https://www.nps.gov/brca/",
          },
        },
        {
          id: "d6-bryce-inspiration",
          name: "Bryce Canyon — Inspiration Point",
          lat: 37.619,
          lng: -112.165,
          type: "viewpoint",
          time: "4:45 – 5:30 PM",
        },
        {
          id: "d6-bryce-point",
          name: "Bryce Canyon — Bryce Point (sunset)",
          lat: 37.593,
          lng: -112.1871,
          type: "viewpoint",
          time: "5:30 – 8:35 PM",
          notes: "Sunset ~8:35 PM MDT — stay for golden hour. Late dinner in Springdale (~10 PM arrival)",
        },
        {
          id: "d6-navajo-loop",
          name: "Navajo Loop + Queens Garden (optional)",
          lat: 37.62,
          lng: -112.168,
          type: "hike",
          time: "Alt. afternoon",
          notes: "1–1.5 hr hike INTO the amphitheater — swap for Inspiration Point if you prefer hiking over extra rim time",
          links: {
            trail: "https://www.alltrails.com/trail/us/utah/navajo-loop-and-queens-garden-trail",
          },
        },
        {
          id: "d6-springdale",
          name: "Airbnb — Serene Tiny Cabin, Kanab UT",
          lat: 37.0475,
          lng: -112.5263,
          type: "hotel",
          time: "Night",
          notes: "Kanab (exact address in the Vault) · ~1.5 hr from Bryce, expect ~10 PM arrival. Kanab is ~1 hr E of Zion via the Mt. Carmel tunnel (Hwy 9)",
        },
      ],
    },
    {
      dayNumber: 7,
      date: "2026-08-06",
      title: "Zion National Park",
      route: "Kanab → Zion (east entrance) → full day",
      driveHours: 1,
      highlight: "Angels Landing permit day — lottery hike + canyon floor trails",
      lodging: {
        name: "Airbnb — Serene Tiny Cabin, Kanab UT",
        cost: 0,
        notes: "Same as night 6 · host Daniel · check-out by 10 AM Fri",
      },
      stops: [
        {
          id: "d7-zion-entry",
          name: "Zion National Park — enter",
          lat: 37.2982,
          lng: -113.0263,
          type: "park",
          time: "Leave Kanab ~4:45 AM · at Zion ~5:45 AM",
          notes: "~1 hr drive from Kanab via Hwy 9 / Mt. Carmel tunnel ($35/vehicle tunnel-adjacent, covered by your park pass). Park early at the Visitor Center — lot fills before the shuttle starts (~6–7 AM). Check NPS alerts.",
          links: {
            info: "https://www.nps.gov/zion/",
          },
        },
        {
          id: "d7-angels",
          name: "Angels Landing (permit lottery)",
          lat: 37.2692,
          lng: -112.9478,
          type: "hike",
          time: "6:30 – 11:00 AM (if awarded)",
          notes: "PERMIT NEEDED for the chains. It's a recreation.gov lottery, NOT a walk-up or phone booking. The seasonal lottery is closed, so use the DAY-BEFORE lottery: apply Aug 5 (12:01 AM–3:00 PM MT), results by ~4 PM MT. $6/application + $3/person if awarded. No permit → hike to Scout Lookout (no chains, no permit) instead. Full steps in the Vault.",
          links: {
            trail: "https://www.alltrails.com/trail/us/utah/angels-landing-trail",
            info: "https://www.recreation.gov/permits/4675310",
          },
        },
        {
          id: "d7-observation",
          name: "Observation Point (Plan B)",
          lat: 37.271,
          lng: -112.937,
          type: "hike",
          time: "Alt. morning",
          notes: "If no Angels permit — East Mesa Trail from east trailhead (~45 min drive from Springdale), epic canyon views",
          links: {
            trail: "https://www.alltrails.com/trail/us/utah/observation-point-via-east-mesa-trail",
          },
        },
        {
          id: "d7-lunch",
          name: "Lunch in Springdale",
          lat: 37.1889,
          lng: -112.9986,
          type: "food",
          time: "11:00 AM – 12:30 PM",
        },
        {
          id: "d7-riverside",
          name: "Riverside Walk (Gateway to the Narrows)",
          lat: 37.285,
          lng: -112.94,
          type: "hike",
          time: "12:30 – 2:00 PM",
          notes: "Easy, flat, shady — great afternoon cooldown",
          links: {
            trail: "https://www.alltrails.com/trail/us/utah/riverside-walk-trail",
          },
        },
        {
          id: "d7-emerald",
          name: "Emerald Pools Trail",
          lat: 37.261,
          lng: -112.951,
          type: "hike",
          time: "2:00 – 4:00 PM",
          links: {
            trail: "https://www.alltrails.com/trail/us/utah/emerald-pools-trail",
          },
        },
        {
          id: "d7-narrows",
          name: "The Narrows (optional)",
          lat: 37.286,
          lng: -112.948,
          type: "hike",
          time: "Alt. afternoon",
          notes: "River hike — check flash flood forecast & rent water shoes in Springdale",
          links: {
            trail: "https://www.alltrails.com/trail/us/utah/the-narrows",
            info: "https://www.nps.gov/zion/planyourvisit/the-narrows.htm",
          },
        },
      ],
    },
    {
      dayNumber: 8,
      date: "2026-08-07",
      title: "Antelope Canyon → Las Vegas",
      route: "Kanab → Page (Lower Antelope Canyon) → Las Vegas",
      driveHours: 6,
      highlight: "Slot-canyon morning in Page, then the long push west to the Strip",
      lodging: {
        name: "Polo Towers, A Hilton Vacation Club",
        cost: 0,
        notes: "On the Strip · 2 nights · booking details in the Vault",
      },
      stops: [
        {
          id: "d8-depart",
          name: "Depart Kanab (Utah time)",
          lat: 37.0475,
          lng: -112.5263,
          type: "city",
          time: "8:30 – 9:15 AM",
          notes: "Check out by 10 AM, but leave by ~9:15 AM to make the tour. Page is ~1 hr 15 min via US-89. Grab breakfast to go.",
        },
        {
          id: "d8-antelope",
          name: "Lower Antelope Canyon — Ken's Tours (Page, AZ)",
          lat: 36.9063,
          lng: -111.4116,
          type: "hike",
          time: "11:45 AM tour",
          notes:
            "⏰ TIMEZONE TRAP: the canyon runs on Navajo/Utah time (MDT) — 1 hr AHEAD of Page, AZ. Keep phones on Utah time and confirm with Ken's that 11:45 is Navajo time. Arrive 45 min early. Photo ID required, no bags/tripods/selfie sticks, bring water. 3 people, under Sriram — booking ID in the Vault.",
          links: {
            maps: "https://maps.google.com/?q=Ken's+Tours+Lower+Antelope+Canyon",
            info: "https://lowerantelope.com/",
          },
        },
        {
          id: "d8-horseshoe",
          name: "Horseshoe Bend (optional)",
          lat: 36.8791,
          lng: -111.5104,
          type: "viewpoint",
          time: "1:15 – 2:00 PM",
          notes: "5 min from the canyon · 1.5 mi round-trip to the overlook · $10/vehicle · skip it if you'd rather get a jump on the drive",
          links: {
            maps: "https://maps.google.com/?q=Horseshoe+Bend+Page+AZ",
          },
        },
        {
          id: "d8-drive",
          name: "Drive Page → Las Vegas (~4.5 hr)",
          lat: 36.1699,
          lng: -115.1398,
          type: "drive",
          time: "2:00 – 6:30 PM",
          notes: "Gas up in Page first. Route via US-89 → UT-9 → I-15. You gain an hour crossing into Pacific time — arrive Vegas ~6:30 PM.",
        },
        {
          id: "d8-checkin",
          name: "Polo Towers check-in",
          lat: 36.1055,
          lng: -115.1706,
          type: "hotel",
          time: "6:30 PM",
          notes: "Drop bags, freshen up. Booking details in the Vault.",
        },
        {
          id: "d8-bellagio",
          name: "Bellagio Fountains & Strip walk",
          lat: 36.1129,
          lng: -115.1765,
          type: "viewpoint",
          time: "7:30 – 9:00 PM",
        },
        {
          id: "d8-night",
          name: "Dinner & casinos — if you've got legs left",
          lat: 36.1215,
          lng: -115.1739,
          type: "food",
          time: "9:00 PM+",
          notes: "Big driving day, so don't overbook the night. Set a gambling budget!",
        },
      ],
    },
    {
      dayNumber: 9,
      date: "2026-08-08",
      title: "Las Vegas — full day",
      route: "Vegas pool, explore & night 2",
      driveHours: 0,
      highlight: "Recovery day — pool, optional Red Rock, second night out",
      lodging: {
        name: "Polo Towers, A Hilton Vacation Club",
        cost: 0,
        notes: "Same as night 8 · booking details in the Vault",
      },
      stops: [
        {
          id: "d9-brunch",
          name: "Brunch on the Strip",
          lat: 36.1147,
          lng: -115.1728,
          type: "food",
          time: "10:00 AM – 12:00 PM",
        },
        {
          id: "d9-pool",
          name: "Pool / rest at hotel",
          lat: 36.1147,
          lng: -115.1728,
          type: "hotel",
          time: "12:00 – 3:00 PM",
        },
        {
          id: "d9-red-rock",
          name: "Red Rock Canyon (optional)",
          lat: 36.135,
          lng: -115.428,
          type: "park",
          time: "3:00 – 5:30 PM",
          notes: "13-mile scenic loop, 30 min from the Strip — desert escape. Timed-entry reservation required in season (recreation.gov).",
          links: {
            info: "https://www.redrockcanyonlv.org/",
            maps: "https://maps.google.com/?q=Red+Rock+Canyon+Las+Vegas",
          },
        },
        {
          id: "d9-valley-fire",
          name: "Valley of Fire (optional alt.)",
          lat: 36.4303,
          lng: -114.5319,
          type: "park",
          time: "Alt. day trip",
          notes: "Fire Wave, White Domes, petroglyphs — ~1 hr NE of Vegas, $15/vehicle. Bumped from the Antelope day; do it here instead of Red Rock if you want the redder rock.",
          links: {
            maps: "https://maps.google.com/?q=Valley+of+Fire+State+Park",
            info: "https://stateparks.nv.gov/parks/valley-of-fire",
          },
        },
        {
          id: "d9-strip",
          name: "Explore the Strip",
          lat: 36.1147,
          lng: -115.1728,
          type: "city",
          time: "Afternoon",
          notes: "Caesars, Venetian, High Roller observation wheel",
        },
        {
          id: "d9-night",
          name: "Night 2 out — show or clubs",
          lat: 36.1215,
          lng: -115.1739,
          type: "food",
          time: "7:00 PM – 12:00 AM",
          notes: "Pack for LA drive tomorrow",
        },
      ],
    },
    {
      dayNumber: 10,
      date: "2026-08-09",
      title: "Las Vegas → Los Angeles",
      route: "Vegas → Mojave NP → Santa Monica",
      driveHours: 6,
      highlight: "Kelso Dunes stop, then coast — friend's apt + Santa Monica sunset",
      lodging: {
        name: "Friend's apt (Rahil)",
        cost: 0,
        notes: "Free — Rahil's friend's new place. Same for nights 10–11",
      },
      stops: [
        {
          id: "d10-depart",
          name: "Depart Las Vegas",
          lat: 36.1699,
          lng: -115.1398,
          type: "city",
          time: "9:00 AM",
        },
        {
          id: "d10-seven-magic",
          name: "Seven Magic Mountains (optional)",
          lat: 35.978,
          lng: -115.269,
          type: "viewpoint",
          time: "9:15 – 9:35 AM",
          notes: "Quick photo stop — colorful art install 10 min south of Vegas on I-15",
          links: {
            maps: "https://maps.google.com/?q=Seven+Magic+Mountains",
          },
        },
        {
          id: "d10-mojave",
          name: "Mojave National Preserve",
          lat: 35.128,
          lng: -115.634,
          type: "park",
          time: "11:30 AM – 1:30 PM",
          notes: "Kelso Dunes — climb for vast desert views",
          links: {
            info: "https://www.nps.gov/moja/",
            maps: "https://maps.google.com/?q=Kelso+Dunes",
          },
        },
        {
          id: "d10-kelso",
          name: "Kelso Dunes",
          lat: 34.908,
          lng: -115.717,
          type: "hike",
          time: "12:00 – 1:30 PM",
          notes: "3 mi RT sand hike — bring water",
          links: {
            trail: "https://www.alltrails.com/trail/us/california/kelso-dunes-trail",
          },
        },
        {
          id: "d10-la-checkin",
          name: "Friend's apt — check in",
          lat: 34.0522,
          lng: -118.2437,
          type: "hotel",
          time: "5:30 PM",
          notes: "Rahil's friend's new apt — drop bags, quick refresh before the pier",
        },
        {
          id: "d10-santa-monica",
          name: "Santa Monica Pier & Beach",
          lat: 34.0086,
          lng: -118.4987,
          type: "viewpoint",
          time: "6:00 – 8:30 PM",
          notes: "Pacific Park, pier sunset (~7:45 PM PDT), dinner on the west side",
          links: {
            maps: "https://maps.google.com/?q=Santa+Monica+Pier",
          },
        },
      ],
    },
    {
      dayNumber: 11,
      date: "2026-08-10",
      title: "Los Angeles — iconic day",
      route: "Griffith Observatory → beaches & neighborhoods",
      driveHours: 1,
      highlight: "Iconic LA views + food crawl",
      lodging: {
        name: "Friend's apt (Rahil)",
        cost: 0,
        notes: "Same as night 10 — 3 nights total (Aug 9–12)",
      },
      stops: [
        {
          id: "d11-breakfast",
          name: "Breakfast — Koreatown or Abbot Kinney",
          lat: 34.0578,
          lng: -118.3006,
          type: "food",
          time: "9:00 – 10:30 AM",
          notes: "Koreatown for cafes, or Venice for Abbot Kinney stroll",
        },
        {
          id: "d11-griffith",
          name: "Griffith Observatory",
          lat: 34.1184,
          lng: -118.3004,
          type: "viewpoint",
          time: "11:00 AM – 1:00 PM",
          notes: "Free admission, Hollywood sign views, city panorama",
          links: {
            maps: "https://maps.google.com/?q=Griffith+Observatory",
            info: "https://griffithobservatory.org/",
          },
        },
        {
          id: "d11-lunch",
          name: "Lunch — Los Feliz or Thai Town",
          lat: 34.108,
          lng: -118.29,
          type: "food",
          time: "1:00 – 2:30 PM",
        },
        {
          id: "d11-getty",
          name: "Getty Center (optional)",
          lat: 34.078,
          lng: -118.474,
          type: "park",
          time: "3:00 – 5:00 PM",
          notes: "Free museum, architecture & gardens — reserve timed entry",
          links: {
            info: "https://www.getty.edu/visit/center/",
          },
        },
        {
          id: "d11-venice",
          name: "Venice Beach Boardwalk (optional)",
          lat: 33.985,
          lng: -118.4695,
          type: "viewpoint",
          time: "3:00 – 5:00 PM",
          notes: "Pick Getty OR Venice — not both if time is tight",
          links: {
            maps: "https://maps.google.com/?q=Venice+Beach+Boardwalk",
          },
        },
        {
          id: "d11-dinner",
          name: "Group dinner",
          lat: 34.0522,
          lng: -118.2437,
          type: "food",
          time: "7:00 – 9:30 PM",
          notes: "Somewhere worth dressing up for",
        },
      ],
    },
    {
      dayNumber: 12,
      date: "2026-08-11",
      title: "Los Angeles — beach day",
      route: "Beaches → Hollywood → whatever you missed",
      driveHours: 1,
      highlight: "Bonus LA day — slow it down before the red-eye tomorrow",
      lodging: {
        name: "Friend's apt (Rahil)",
        cost: 0,
        notes: "3rd & final night (Aug 11) — confirm the extra night with your friend",
      },
      stops: [
        {
          id: "d12-brunch",
          name: "Brunch — Venice / Abbot Kinney",
          lat: 33.99,
          lng: -118.4655,
          type: "food",
          time: "10:00 – 11:30 AM",
          notes: "Slow start — you've earned it",
        },
        {
          id: "d12-beach",
          name: "Beach day — Santa Monica / Manhattan Beach",
          lat: 34.0086,
          lng: -118.4987,
          type: "viewpoint",
          time: "12:00 – 4:00 PM",
          notes: "Swim near lifeguards. Manhattan/Hermosa are mellower than Venice.",
          links: {
            maps: "https://maps.google.com/?q=Manhattan+Beach+California",
          },
        },
        {
          id: "d12-explore",
          name: "Hollywood / Getty / Venice (whatever you skipped)",
          lat: 34.1016,
          lng: -118.3406,
          type: "city",
          time: "4:30 – 7:00 PM",
          notes: "Walk of Fame, or the Getty if you missed it yesterday",
        },
        {
          id: "d12-dinner",
          name: "Dinner out",
          lat: 34.0522,
          lng: -118.2437,
          type: "food",
          time: "7:30 – 9:30 PM",
        },
      ],
    },
    {
      dayNumber: 13,
      date: "2026-08-12",
      title: "Last day → red-eye home",
      route: "LA → LAX (late-night departure)",
      driveHours: 1,
      highlight: "Full last day — flight isn't until 11:59 PM, so no rush",
      stops: [
        {
          id: "d13-checkout",
          name: "Pack up & check out of the apt",
          lat: 34.0522,
          lng: -118.2437,
          type: "hotel",
          time: "Morning",
          notes: "Load the car, tidy up, thank Rahil's friend",
        },
        {
          id: "d13-day",
          name: "Final LA time — last beach / brunch / souvenirs",
          lat: 34.0195,
          lng: -118.4912,
          type: "food",
          time: "11:00 AM – 5:00 PM",
          notes: "Flight's late, so use the day. Stash bags in the car.",
        },
        {
          id: "d13-dinner",
          name: "Final group dinner",
          lat: 34.0522,
          lng: -118.2437,
          type: "food",
          time: "6:00 – 8:00 PM",
          notes: "Last meal of the trip before heading to LAX",
        },
        {
          id: "d13-car",
          name: "Return rental car",
          lat: 33.9416,
          lng: -118.4085,
          type: "city",
          time: "~8:30 PM",
          notes: "Confirm your drop-off is open this late (or return earlier & rideshare to LAX). Allow buffer for LAX traffic.",
        },
        {
          id: "d13-lax",
          name: "LAX — Rahil's red-eye home",
          lat: 33.9416,
          lng: -118.4085,
          type: "city",
          time: "11:59 PM",
          notes: "Rahil: Frontier F9 2446, LAX→ORD, 11:59 PM PDT → 6:17 AM CDT (details in Vault). Be at the airport by ~9:30 PM. Sriram & Rishabh — flights not booked yet.",
          links: {
            maps: "https://maps.google.com/?q=LAX",
          },
        },
      ],
    },
  ],
};

/** Ordered anchor coordinates for the route polyline */
export function getRouteCoordinates(): [number, number][] {
  return [
    [-93.265, 44.9778],
    [-103.4591, 43.8791],
    [-104.9903, 39.7392],
    [-109.5498, 38.5733],
    [-111.2479, 38.2872],
    [-112.1871, 37.593],
    [-112.9986, 37.1889],
    [-113.0263, 37.2982],
    [-114.5319, 36.4303],
    [-115.1398, 36.1699],
    [-118.4987, 34.0086],
    [-118.2437, 34.0522],
  ];
}

export function getDayCenter(dayNumber: number): {
  lat: number;
  lng: number;
  zoom: number;
} {
  const day = trip.days.find((d) => d.dayNumber === dayNumber);
  if (!day || day.stops.length === 0) {
    return { lat: 39.5, lng: -105, zoom: 4 };
  }
  const lats = day.stops.map((s) => s.lat);
  const lngs = day.stops.map((s) => s.lng);
  const lat = lats.reduce((a, b) => a + b, 0) / lats.length;
  const lng = lngs.reduce((a, b) => a + b, 0) / lngs.length;
  const latSpread = Math.max(...lats) - Math.min(...lats);
  const lngSpread = Math.max(...lngs) - Math.min(...lngs);
  const spread = Math.max(latSpread, lngSpread);
  let zoom = 8;
  if (spread > 3) zoom = 5;
  else if (spread > 1.5) zoom = 6;
  else if (spread > 0.5) zoom = 7;
  else if (spread < 0.1) zoom = 11;
  return { lat, lng, zoom };
}

export function getActiveCrew(dayNumber: number): CrewMember[] {
  return trip.crew.filter((m) => !m.lastDay || m.lastDay >= dayNumber);
}

export function getTravelerCount(dayNumber: number): number {
  return getActiveCrew(dayNumber).length;
}

export function getCrewNames(dayNumber?: number): string[] {
  const members = dayNumber === undefined ? trip.crew : getActiveCrew(dayNumber);
  return members.map((m) => m.name);
}

export function getMemberTripCost(lastDay?: number): number {
  const { stays, food, gas, extras } = trip.budget;
  const total = stays + food + gas + extras;
  const dayCount = getTripDayCount();
  const splitAfter = trip.crew.find((m) => m.lastDay)?.lastDay ?? dayCount;
  const legFourDays = splitAfter;
  const legThreeDays = dayCount - splitAfter;

  if (lastDay !== undefined) {
    return Math.round(((legFourDays / dayCount) * total) / getTravelerCount(1));
  }

  const fourWayShare = ((legFourDays / dayCount) * total) / getTravelerCount(1);
  const threeWayShare = ((legThreeDays / dayCount) * total) / getTravelerCount(splitAfter + 1);
  return Math.round(fourWayShare + threeWayShare);
}

export function getTotalPerPerson(): number {
  return getMemberTripCost();
}

export function getTripDayCount(): number {
  return trip.days.length;
}
