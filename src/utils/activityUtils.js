import { 
  Waves, 
  Mountain, 
  TreePine, 
  Bike,
  Compass,
  Sailboat,
  Tent,
  Utensils,
  Palette,
  Music,
  Building,
  Flame,
  Snowflake,
  Cable,
  Users
} from "lucide-react";

/**
 * Map icon name strings to Lucide React components
 */
const iconMap = {
  "Waves": Waves,
  "Mountain": Mountain,
  "Cable": Cable,
  "Building": Building,
  "Flame": Flame,
  "Snowflake": Snowflake,
  "TreePine": TreePine,
  "Bike": Bike,
  "Compass": Compass,
  "Sailboat": Sailboat,
  "Tent": Tent,
  "Utensils": Utensils,
  "Palette": Palette,
  "Music": Music,
  "Users": Users,
};

/**
 * Get Lucide icon component based on icon name or activity category
 */
export function getActivityIcon(iconName, category) {
  // First try to map by icon name if provided
  if (iconName && iconMap[iconName]) {
    return iconMap[iconName];
  }

  // Fallback to category-based mapping
  const categoryLower = category?.toLowerCase() || "";
  
  if (categoryLower.includes("water") || categoryLower.includes("diving") || categoryLower.includes("snorkeling")) return Waves;
  if (categoryLower.includes("mountain") || categoryLower.includes("trek") || categoryLower.includes("hiking")) return Mountain;
  if (categoryLower.includes("nature") || categoryLower.includes("forest") || categoryLower.includes("safari") || categoryLower.includes("leisure")) return TreePine;
  if (categoryLower.includes("bike") || categoryLower.includes("cycling")) return Bike;
  if (categoryLower.includes("cultural") || categoryLower.includes("culture") || categoryLower.includes("heritage") || categoryLower.includes("archaeological") || categoryLower.includes("historical")) return Building;
  if (categoryLower.includes("music") || categoryLower.includes("dance") || categoryLower.includes("entertainment") || categoryLower.includes("family")) return Music;
  if (categoryLower.includes("food") || categoryLower.includes("cooking") || categoryLower.includes("culinary")) return Utensils;
  if (categoryLower.includes("camping") || categoryLower.includes("overnight")) return Tent;
  if (categoryLower.includes("sailing") || categoryLower.includes("boat")) return Sailboat;
  if (categoryLower.includes("cable") || categoryLower.includes("activities")) return Cable;
  if (categoryLower.includes("winter") || categoryLower.includes("ski") || categoryLower.includes("snow")) return Snowflake;
  if (categoryLower.includes("fire") || categoryLower.includes("temple")) return Flame;
  
  return Compass; // Default icon
}

/**
 * Transform API activity data to component format
 */
export function transformActivity(apiActivity) {
  if (!apiActivity) return null;

  return {
    id: apiActivity.id,
    slug: apiActivity.slug,
    title: apiActivity.card?.title || "Untitled Activity",
    category: apiActivity.activityCategory || "general",
    themeCategory: apiActivity.themeCategory || "",
    badge: apiActivity.card?.badge || "",
    description: apiActivity.card?.shortDescription || "",
    longDescription: apiActivity.details?.longDescription || "",
    duration: apiActivity.details?.duration || "Duration varies",
    priceRange: apiActivity.details?.priceRange || "Contact for pricing",
    groupSize: apiActivity.details?.groupSize || "Varies",
    difficulty: apiActivity.details?.difficulty || "Moderate",
    image: apiActivity.card?.image || "",
    bannerImage: apiActivity.details?.bannerImage || apiActivity.card?.image || "",
    gallery: apiActivity.details?.gallery || [],
    icon: getActivityIcon(apiActivity.card?.icon, apiActivity.activityCategory),
    isPopular: apiActivity.card?.isPopular || false,
    isInternational: apiActivity.isInternational || false,
    regionName: apiActivity.docRegionName || apiActivity.regionName || "",
    regionSlug: apiActivity.docRegionSlug || apiActivity.regionSlug || "",
    cityName: apiActivity.docCityName || apiActivity.cityName || "",
    citySlug: apiActivity.docCitySlug || apiActivity.citySlug || "",
    highlights: apiActivity.details?.highlights || [],
    included: apiActivity.details?.included || [],
    excluded: apiActivity.details?.excluded || [],
    itinerary: apiActivity.details?.itinerary || [],
    faqs: apiActivity.details?.faqs || [],
  };
}

/**
 * Get unique categories from activities array
 */
export function getUniqueCategories(activities) {
  if (!Array.isArray(activities)) return [];
  
  const categories = activities
    .map(activity => activity.category || activity.activityCategory)
    .filter(Boolean);
  
  return [...new Set(categories)];
}

/**
 * Get unique cities from activities array
 */
export function getUniqueCities(activities) {
  if (!Array.isArray(activities)) return [];
  
  const cities = activities
    .map(activity => ({
      name: activity.cityName,
      slug: activity.citySlug
    }))
    .filter(city => city.name && city.slug);
  
  // Deduplicate by slug
  const uniqueCities = Array.from(
    new Map(cities.map(city => [city.slug, city])).values()
  );
  
  return uniqueCities;
}

/**
 * Format category name for display
 */
export function formatCategoryName(category) {
  if (!category) return "";
  
  return category
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Helper function to check if a search term matches a word boundary in text
 * This prevents partial word matches (e.g., "goa" won't match "goal")
 */
function matchesWordBoundary(text, searchTerm) {
  if (!text || !searchTerm) return false;
  const textLower = text.toLowerCase();
  const searchLower = searchTerm.toLowerCase();
  
  // Check for exact match
  if (textLower === searchLower) return true;
  
  // Check for word boundary match using regex
  const wordBoundaryRegex = new RegExp(`\\b${searchLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
  return wordBoundaryRegex.test(text);
}

/**
 * Filter activities by various criteria with prioritized location matching
 */
export function filterActivities(activities, filters = {}) {
  if (!Array.isArray(activities)) return [];
  
  const {
    category,
    locationType,
    region,
    city,
    searchTerm
  } = filters;

  let filtered = activities.filter(activity => {
    // Category filter
    if (category && category !== "all" && activity.category !== category) {
      return false;
    }

    // Location type filter (International/Domestic)
    if (locationType === "International" && !activity.isInternational) {
      return false;
    }
    if (locationType === "Domestic" && activity.isInternational) {
      return false;
    }

    // Region filter
    if (region && region !== "all" && activity.regionSlug !== region) {
      return false;
    }

    // City filter
    if (city && city !== "all" && activity.citySlug !== city) {
      return false;
    }

    // Enhanced Search term filter with prioritized location matching
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase().trim();
      const keywords = searchLower.split(/\s+/).filter(k => k.length > 1);
      
      if (keywords.length === 0) return true; // Ignore single character searches or just whitespace

      // Priority 1: Check for exact location matches (city or region name)
      // This ensures searching for "goa" prioritizes Goa region/city
      const cityName = activity.cityName || "";
      const regionName = activity.regionName || "";
      
      for (const keyword of keywords) {
        // Exact match on city or region name (highest priority)
        if (matchesWordBoundary(cityName, keyword) || matchesWordBoundary(regionName, keyword)) {
          return true;
        }
      }

      // Priority 2: Check title with word boundaries
      const title = activity.title || "";
      for (const keyword of keywords) {
        if (matchesWordBoundary(title, keyword)) {
          return true;
        }
      }

      // Priority 3: Check category matches
      const category = activity.category || "";
      const themeCategory = activity.themeCategory || "";
      const formattedCategory = formatCategoryName(category);
      
      for (const keyword of keywords) {
        if (matchesWordBoundary(category, keyword) || 
            matchesWordBoundary(themeCategory, keyword) ||
            matchesWordBoundary(formattedCategory, keyword)) {
          return true;
        }
      }

      // Priority 4: Check description and highlights (lower priority, broader match)
      const description = (activity.description || "").toLowerCase();
      const highlights = (activity.highlights || []).map(h => h.toLowerCase()).join(" ");
      const combinedText = `${description} ${highlights}`;
      
      // For description/highlights, require at least one keyword to match
      const hasDescriptionMatch = keywords.some(keyword => 
        combinedText.includes(keyword)
      );
      
      if (hasDescriptionMatch) {
        return true;
      }

      // No matches found
      return false;
    }

    return true;
  });

  // If search term is provided, sort results by relevance
  if (searchTerm && searchTerm.trim()) {
    const searchLower = searchTerm.toLowerCase().trim();
    const keywords = searchLower.split(/\s+/).filter(k => k.length > 1);
    
    filtered = filtered.map(activity => {
      let score = 0;
      
      for (const keyword of keywords) {
        // Exact city/region match = 100 points
        if (matchesWordBoundary(activity.cityName, keyword) || 
            matchesWordBoundary(activity.regionName, keyword)) {
          score += 100;
        }
        
        // Title match = 50 points
        if (matchesWordBoundary(activity.title, keyword)) {
          score += 50;
        }
        
        // Category match = 25 points
        if (matchesWordBoundary(activity.category, keyword) || 
            matchesWordBoundary(activity.themeCategory, keyword)) {
          score += 25;
        }
        
        // Description/highlights match = 10 points
        const description = (activity.description || "").toLowerCase();
        const highlights = (activity.highlights || []).map(h => h.toLowerCase()).join(" ");
        if (description.includes(keyword) || highlights.includes(keyword)) {
          score += 10;
        }
      }
      
      return { ...activity, _searchScore: score };
    }).sort((a, b) => (b._searchScore || 0) - (a._searchScore || 0));
  }

  return filtered;
}
