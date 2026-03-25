"use client";
import { useQuery } from "@tanstack/react-query";
import { getRegions } from "@/utils/firebase";

export function useRegions(initialRegions = []) {
  const hasInitialData = initialRegions?.length > 0;
  
  const {
    data: regions = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["regions"],
    queryFn: () => getRegions(),
    gcTime: 5 * 60 * 1000, 
    staleTime: 60 * 1000, // 1 minute
    initialData: hasInitialData ? initialRegions : undefined,
    enabled: true, // Always enabled
    retry: 3, // Retry failed requests 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  return { regions, isLoading, error, refetch };
}
