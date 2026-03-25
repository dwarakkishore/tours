"use client";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedImageByRegion } from "@/utils/firebase";
import { COLLECTIONS } from "@/config";

/**
 * Hook to fetch a random image by region name
 * @param {string} regionName - The region name to filter images by
 * @param {Object} options - Additional options for the query
 * @returns {Object} Query result with image data, loading state, and error
 */
export function useDestinationImage(regionName, options = {}) {
  const {
    data: image = null,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [COLLECTIONS.IMAGES, "featured", regionName],
    queryFn: () => getFeaturedImageByRegion(regionName),
    enabled: !!regionName,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  });

  return {
    image,
    isLoading,
    error,
    refetch,
  };
}
