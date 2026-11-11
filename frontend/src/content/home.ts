// Text and photos for the home page. To change a heading or swap a photo,
// edit this file only.
//
// The photos are free Unsplash pictures used as placeholders. Replace them
// with the client's own photos (any image link works). If a link is broken,
// a blue gradient shows instead of the picture.

const photo = (id: string, width: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=70`;

export const HERO_IMAGE = photo("photo-1476514525535-07fb3b4ae5f1", 1800);
export const CTA_IMAGE = photo("photo-1469854523086-cc02fe5d8800", 1800);

// "search" is the word sent to the tour search when a card is clicked.
export const DESTINATIONS = [
  {
    name: "Paris",
    search: "Paris",
    image: photo("photo-1502602898657-3e91760cbb34", 800),
  },
  {
    name: "Australia",
    search: "Australia",
    image: photo("photo-1523482580672-f109ba8cb9be", 800),
  },
  {
    name: "New York",
    search: "New York",
    image: photo("photo-1496442226666-8d4d0e62e6e9", 800),
  },
  {
    name: "Spain",
    search: "Spain",
    image: photo("photo-1543783207-ec64e4d95325", 800),
  },
];

// A real sequence, so the cards are numbered.
export const STEPS = [
  {
    title: "Choose your date",
    text: "Every tour page lists its start dates and how many places are left on each one.",
  },
  {
    title: "Send your booking",
    text: "Pick the number of guests and book. Your request is saved as pending straight away.",
  },
  {
    title: "Get confirmed",
    text: "We confirm your booking. Change of plans? Cancel from your account up to 48 hours before the start.",
  },
];

export const REASONS = [
  {
    title: "Seats shown live",
    text: "No guessing and no waiting for an email. The places left on each date are on the tour page.",
  },
  {
    title: "Cancel up to 48 hours before",
    text: "Cancel any pending or confirmed booking yourself from your account, as long as the tour is more than two days away.",
  },
  {
    title: "Reviews from real guests",
    text: "Only people who completed a tour can review it, so every rating comes from someone who went.",
  },
];

// The big picture at the top changes by itself. Add or remove lines here.
export const HERO_SLIDES = [
  photo("photo-1476514525535-07fb3b4ae5f1", 1920),
  photo("photo-1507525428034-b723cf961d3e", 1920),
  photo("photo-1506905925346-21bda4d32df4", 1920),
  photo("photo-1469854523086-cc02fe5d8800", 1920),
];

// Pictures for the sections below the hero
export const INTRO_IMAGES = [
  photo("photo-1507525428034-b723cf961d3e", 800),
  photo("photo-1502602898657-3e91760cbb34", 800),
  photo("photo-1523482580672-f109ba8cb9be", 800),
  photo("photo-1543783207-ec64e4d95325", 800),
];
export const DISCOVER_IMAGES = [
  photo("photo-1501785888041-af3ef285b470", 1000),
  photo("photo-1476514525535-07fb3b4ae5f1", 700),
];
export const BANNER_IMAGE = photo("photo-1506905925346-21bda4d32df4", 1200);
export const PARALLAX_IMAGE = photo("photo-1507525428034-b723cf961d3e", 2000);

// Links to the tour list, each with a different filter.
export const IDEAS = [
  {
    tag: "Beginners",
    title: "Easy tours for first-timers",
    text: "Relaxed days, short walks and plenty of time to take it all in.",
    href: "/tours?difficulty=easy",
    image: photo("photo-1501785888041-af3ef285b470", 1000),
  },
  {
    tag: "Budget",
    title: "Best value tours, lowest price first",
    text: "Great places that do not cost a fortune.",
    href: "/tours?sort=price",
    image: photo("photo-1523482580672-f109ba8cb9be", 700),
  },
  {
    tag: "Popular",
    title: "Top rated by our guests",
    text: "The tours people liked the most.",
    href: "/tours?sort=-ratingsAverage",
    image: photo("photo-1502602898657-3e91760cbb34", 700),
  },
];