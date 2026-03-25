import { v4 as uuidv4 } from "uuid";

export const filterData = {
  priceRange: {
    min: 0,
    max: 100000,
  },
  duration: [
    { id: "0-3", label: "0-3 Days" },
    { id: "4-5", label: "4-5 Days" },
    { id: "6-9", label: "6-9 Days" },
    { id: "10+", label: "10+ Days" },
  ],
  theme: [
    { id: "romantic-getaways", label: "Romantic Getaways" },
    { id: "group-adventures", label: "Group Adventures" },
    { id: "family-funventure", label: "Family Funventure" },
    { id: "religious-retreat", label: "Religious Retreat" },
    { id: "exploration-bundle", label: "Exploration Bundle" },
    { id: "relax-rejuvenate", label: "Relax and Rejuvenate" },
    { id: "elite-escape", label: "Elite Escape" },
    { id: "educational", label: "Educational" },
    { id: "solo-expedition", label: "Solo Expedition" },
  ],
  sortBy: [
    { id: uuidv4(), label: "Relevance" },
    { id: uuidv4(), label: "Bestseller" },
    { id: uuidv4(), label: "Trending" },
    { id: uuidv4(), label: "Low to High (Price)" },
    { id: uuidv4(), label: "High to Low (Price)" },
    { id: uuidv4(), label: "Low to High (Duration)" },
    { id: uuidv4(), label: "High to Low (Duration)" },
  ],
};
