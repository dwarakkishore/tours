"use client";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getOfferByPackageId,
  getPackageWithAllReferences,
} from "@/utils/firebase";
import { useRegion } from "../regions";

export function usePackage(slugOrId, options = {}) {
  const { bySlug = true } = options;
  const queryClient = useQueryClient();

  const {
    data: packageData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["package", slugOrId, bySlug ? "slug" : "id"],
    queryFn: async () => {
      // Fetch from Firebase using unified function - removing manual cache lookup for immediate updates
      return await getPackageWithAllReferences(slugOrId, { bySlug });
    },
    enabled: !!slugOrId, // Only run when slugOrId is provided
    staleTime: 0, // Truly immediate updates
    gcTime: 1000, // Minimal garbage collection time for extreme freshness
    refetchOnWindowFocus: true, // Refetch when switching back to the tab
    refetchOnMount: 'always', // Always refetch on mount
  });

  const {
    regionData,
    isLoading: regionLoading,
    error: regionError,
  } = useRegion(packageData?.region);

  const {
    data: offerData,
    isLoading: offerLoading,
    error: offerError,
  } = useQuery({
    queryKey: ["offer", packageData?.id],
    queryFn: () => getOfferByPackageId(packageData?.id),
    enabled: !!packageData?.id,
  });

  const enrichedPackageData = React.useMemo(() => {
    if (!packageData) return null;

    let enriched = { ...packageData };

    if (regionData?.faq) {
      enriched = {
        ...enriched,
        faq: regionData.faq,
      };
    }

    if (offerData) {
      const offerPrice =
        offerData.discountType === "fixed"
          ? Math.round(enriched.basePrice - offerData.discountValue)
          : Math.round(
              enriched.basePrice -
                enriched.basePrice * (offerData.discountValue / 100)
            );

      const savingsAmount = enriched.basePrice - offerPrice;

      enriched = {
        ...enriched,
        offer: {
          offerPrice,
          savingsAmount,
        },
      };
    }

    return enriched;
  }, [packageData, regionData?.faq, offerData]);

  return {
    packageData: enrichedPackageData,
    isLoading: isLoading || regionLoading || offerLoading,
    error: error || regionError || offerError,
    refetch,
  };
}
