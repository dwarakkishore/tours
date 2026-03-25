"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRegionDocumentBySlug } from "@/utils/firebase";

export function useRegion(regionSlug, initialData) {
  const queryClient = useQueryClient();

  const {
    data: regionData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["region", regionSlug],
    queryFn: async () => {
      // Fetch directly from Firebase to ensure we get the latest document
      // especially when cache is stale or updates are expected.
      return getRegionDocumentBySlug(regionSlug);
    },
    initialData: initialData,
    enabled: !!regionSlug, // Only run when regionSlug is provided
    staleTime: 60000, // 1 minute
    gcTime: 300000, // 5 minutes
    refetchOnWindowFocus: false, // Refetch when window is focused
    refetchOnMount: false, // Always refetch on mount to get latest data
  });

  return {
    regionData,
    isLoading,
    error,
    refetch,
  };
}
