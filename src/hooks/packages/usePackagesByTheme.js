"use client";
import { useQuery } from "@tanstack/react-query";
import { getPackagesByTheme } from "@/utils/firebase";
import { limit } from "firebase/firestore";
import { COLLECTIONS } from "@/config";

export function usePackagesByTheme(theme, initialPackages = [], limitCount) {
  const {
    data: packages = [],
    isLoading: isQueryLoading,
    error,
  } = useQuery({
    // Use initialData only if provided and non-empty
    initialData: initialPackages && initialPackages.length > 0 ? initialPackages : undefined,
    queryKey: [COLLECTIONS.PACKAGES, "theme", theme, limitCount],
    queryFn: () => getPackagesByTheme(theme, [], limitCount ? [limit(limitCount)] : []),
    enabled: !!theme,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });

  return {
    packages,
    isLoading: isQueryLoading,
    error,
  };
}
