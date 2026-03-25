"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCuratedPackages } from "@/utils/firebase";
import { COLLECTIONS } from "@/config";

export function useCuratedPackages(packageType, initialPackages = []) {
  const queryClient = useQueryClient();
  const hasInitialData = initialPackages && initialPackages.length > 0;
  
  const {
    data: packages = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [COLLECTIONS.PACKAGES, "curated", packageType],
    queryFn: async () => {
      const allPackageQueries = queryClient
        .getQueryCache()
        .findAll({ queryKey: [COLLECTIONS.PACKAGES] });

      const packagesMap = new Map();
      for (const query of allPackageQueries) {
        const queryData = query.state.data;
        if (Array.isArray(queryData)) {
          queryData.forEach((pkg) => {
            if (pkg && pkg.id) {
              packagesMap.set(pkg.id, pkg);
            }
          });
        }
      }
      const cachedPackages = Array.from(packagesMap.values());

      if (cachedPackages.length > 0) {
        // Check if we have packages from multiple regions (indicating more complete data)
        const uniqueRegions = [
          ...new Set(cachedPackages.map((pkg) => pkg.region)),
        ];

        // Only use cache if we have packages from multiple regions (3+ for global queries)
        if (uniqueRegions.length >= 3) {
          const curatedPackages = cachedPackages
            .filter(
              (pkg) =>
                pkg.frontPage === true &&
                pkg.domestic === (packageType === "domestic")
            )
            .sort((a, b) => a.basePrice - b.basePrice);

          if (curatedPackages.length > 0) {
            return curatedPackages.sort((a, b) => {
              const priceDiff = a.basePrice - b.basePrice;
              return priceDiff !== 0 ? priceDiff : a.id.localeCompare(b.id);
            });
          }
        }
      }

      // If not found in cache, fetch from Firebase
      return await getCuratedPackages(packageType);
    },
    enabled: !!packageType,
    // Use longer staleTime if we have initial data to prevent immediate refetch
    staleTime: 60 * 1000, // 1 minute
    gcTime: 60 * 60 * 1000, // 1 hour
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    // Use placeholderData instead of initialData to show content immediately
    placeholderData: hasInitialData ? initialPackages : undefined,
    initialData: hasInitialData ? initialPackages : undefined,
  });

  return {
    packages,
    isLoading,
    error,
    refetch,
  };
}
