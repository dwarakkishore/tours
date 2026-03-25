import axios from "axios";

export const SITE_DATA = {
  name: "Bayard Vacations",
  description: "Your trusted travel partner for unforgettable journeys",
  url: "https://bayardvacations.com",
  image: "/Bayard_white_logo.svg",
  keywords: ["travel", "vacations", "packages", "tours", "india"],
  author: "Bayard Vacations",
};

export const DEFAULT_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : SITE_DATA.url;

const SEARCH_URL = process.env.NEXT_PUBLIC_SEARCH_URL || "/api/search";

export const SEARCH_API = axios.create({
  baseURL: SEARCH_URL,
  timeout: 3500,
});

export const TRENDING_PACKAGES = [
  "vietnam",
  "kerala",
  "thailand",
  "singapore-malaysia",
  "andaman",
];

export const PACKAGE_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
};

export const COLLECTIONS = {
  PACKAGES: "published_packages",
  REGIONS: "regions",
  HOTELS: "hotels",
  USERS: "users",
  BOOKINGS: "bookings",
  PAYMENTS: "payments",
  POTENTIAL_LEADS: "potentialLeads",
  OFFERS: "offers",
  BLOGS: "blogs",
  BLOG_CATEGORIES: "blogCategories",
  CACHED_REVIEWS: "cachedReviews",
  LEADS: "leads",
  PLACES: "places",
  IMAGES: "images",
  WHY_CHOOSE_REGION: "why_choose_region",
  REGION_FACTS_SHEET: "region_facts_sheet",
  REGION_ACTIVITY: "region_activity",
  SAVED_PDFS: "savedPDFs",
  EMPLOYEES: "employee_photos",
};

export const REVIEWS_CACHE_DURATION = 90 * 24 * 60 * 60 * 1000; // 90 days in milliseconds
export const REVIEWS_DOC_ID = "google_reviews_cache";

export const CONTINENTS = [
  { feKey: "asia", displayName: "Asia", regions: [] },
  { feKey: "africa", displayName: "Africa", regions: [] },
  // { feKey: "north_america", displayName: "North America", regions: [] },
  // { feKey: "south_america", displayName: "South America", regions: [] },
  { feKey: "europe", displayName: "Europe", regions: [] },
  { feKey: "oceania", displayName: "Oceania", regions: [] },
];

export const ZONES = [
  { feKey: "north", displayName: "North" },
  { feKey: "south", displayName: "South" },
  { feKey: "east", displayName: "East" },
  { feKey: "west", displayName: "West" },
  { feKey: "central", displayName: "Central" },
];

export const ANIMATED_TEXT = {
  DOMESTIC: [
    "Rediscover India, One State at a Time",
    "From Mountains to Beaches — Explore It All",
    "Your Next Great Escape Is Right Here in India",
    "Incredible India. Unforgettable Holidays.",
    "Crafted Getaways Across India's Hidden Gems",
    "The Best of Bharat — Designed for You",
    "Travel Closer, Feel Deeper",
    "From Kerala Backwaters to Kashmir Peaks",
    "Local Wonders, Luxe Experiences",
    "India's Top Destinations. One Click Away.",
  ],
  INTERNATIONAL: [
    "Wander the World, One Dream Trip at a Time",
    "Handpicked Holidays Across the Globe",
    "From Europe to the East – Your Journey Starts Here",
    "Where Do You Want to Go Next?",
    "Explore Iconic Destinations, Effortlessly",
    "Tailored Getaways to the World's Most Loved Places",
    "Globetrotting Made Simple, Just for You",
    "Curated Global Escapes, Beyond Borders",
    "From Santorini to Singapore — All Within Reach",
    "Vacations Without Limits. Just Pack and Go.",
  ],
};


// Regions to exclude from international holidays section
// To find the correct region slugs:
// 1. Check your Firebase/Firestore database under the 'regions' collection
// 2. Look for the 'slug' field of each region document
// 3. Add the exact slug values here to exclude them
export const EXCLUDED_INTERNATIONAL_REGIONS = [
  "singapore-malaysia",
  "europe",
  "scandinavian-countries",
];

// Regions to exclude from domestic holidays section
export const EXCLUDED_DOMESTIC_REGIONS = [];

export const PACKAGE_TAGS = {
  CURATED: "curated",
  VALUE: "value",
  UNDERRATED: "underrated",
  VISAFREE: "visafree",
};
