"use client";
import { useMemo } from "react";
import { useRegions } from "./useRegions";
import { 
  CONTINENTS, 
  EXCLUDED_INTERNATIONAL_REGIONS, 
  EXCLUDED_DOMESTIC_REGIONS 
} from "@/config";

export function useRegionsData(initialRegions = []) {
  const { regions: rawRegions, isLoading, error, refetch } = useRegions(initialRegions);

  // Ensure Bali is always treated as international
  const regions = useMemo(() => {
    return rawRegions?.map(item => 
      item.slug === 'bali' ? { ...item, isDomestic: false } : item
    ) || [];
  }, [rawRegions]);

  // Filter domestic regions
  const domesticRegions = useMemo(() => {
    
    if (!regions || regions.length === 0) {
      return [];
    }
    
    const filtered = regions
      .filter((item) => item.isDomestic)
      .filter((item) => !EXCLUDED_DOMESTIC_REGIONS.includes(item.slug))
      .filter((item) => item.visible !== false) // Show if visible is true or undefined
      .sort((a, b) => {
        const nameA = a.name || "";
        const nameB = b.name || "";
        return nameA.localeCompare(nameB, 'en', { sensitivity: 'base', numeric: true });
      });
    
    return filtered;
  }, [regions]);

  // Group international regions by continent
  const internationalRegions = useMemo(() => {
    // Fallback continent mapping for regions missing continent field
    const CONTINENT_MAPPING = {
      // Asia
      'bali': 'asia', 'bhutan': 'asia', 'cambodia': 'asia', 'china': 'asia',
      'hongkong': 'asia', 'hong-kong': 'asia', 'japan': 'asia', 'laos': 'asia',
      'malaysia': 'asia', 'maldives': 'asia', 'nepal': 'asia', 'philippines': 'asia',
      'singapore': 'asia', 'south-korea': 'asia', 'srilanka': 'asia', 'sri-lanka': 'asia',
      'thailand': 'asia', 'vietnam': 'asia', 'azerbaijan': 'asia', 'georgia': 'asia',
      'kazakhstan': 'asia', 'uzbekistan': 'asia',
      
      // Europe  
      'austria': 'europe', 'belgium': 'europe', 'czech-republic': 'europe',
      'denmark': 'europe', 'england': 'europe', 'finland': 'europe', 'france': 'europe',
      'germany': 'europe', 'greece': 'europe', 'hungary': 'europe', 'iceland': 'europe',
      'ice-land': 'europe', 'italy': 'europe', 'netherland': 'europe', 'netherlands': 'europe',
      'norway': 'europe', 'scotland': 'europe', 'spain': 'europe', 'sweden': 'europe',
      'switzerland': 'europe', 'turkey': 'europe', 'united-kingdom': 'europe', 'uk': 'europe',
      'wales': 'europe', 'northern-ireland': 'europe', 'scandinavian-countrie': 'europe',
      
      // Africa
      'egypt': 'africa', 'kenya': 'africa', 'mauritius': 'africa', 'seychelles': 'africa',
      'south-africa': 'africa', 'tanzania': 'africa', 'kenya-tanzania': 'africa',
      
      // Oceania
      'australia': 'oceania', 'new-zealand': 'oceania',
      
      // Middle East (part of Asia)
      'dubai': 'asia', 'uae': 'asia',
    };
    
    // Start with a fresh clone of CONTINENTS
    const acc = JSON.parse(JSON.stringify(CONTINENTS));

    if (!regions || regions.length === 0) {
      return acc;
    }

    const intlRegions = regions
      .filter((item) => !item.isDomestic)
      .filter((item) => !EXCLUDED_INTERNATIONAL_REGIONS.includes(item.slug))
      .filter((item) => item.visible !== false)
      .sort((a, b) => {
        const nameA = a.name || "";
        const nameB = b.name || "";
        return nameA.localeCompare(nameB, 'en', { sensitivity: 'base', numeric: true });
      });
    
    
    const grouped = intlRegions.reduce((prev, region) => {
        // Use existing continent field, or fallback to mapping by slug
        let continentKey = region.continent?.toString().toLowerCase().trim();
        
        // If no continent field, try to map from slug
        if (!continentKey || continentKey === 'undefined') {
          const slug = region.slug?.toLowerCase().trim();
          continentKey = CONTINENT_MAPPING[slug];
          
          if (!continentKey) {
            return prev;
          }
        }
        
        // Find the corresponding continent
        const continentIndex = prev.findIndex(
          (continent) => continent.feKey.toLowerCase() === continentKey
        );

        if (continentIndex !== -1) {
          prev[continentIndex].regions.push(region);
        } else {
        }

        return prev;
      }, acc);
    
    const totalGrouped = grouped.reduce((sum, continent) => sum + continent.regions.length, 0);
    
    return grouped;
  }, [regions]);

  return {
    regions,
    domesticRegions,
    internationalRegions,
    regionIsLoading: isLoading,
    error,
    refetch,
  };
}
