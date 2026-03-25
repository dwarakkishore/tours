"use client";
import React, { useMemo } from "react";
import { usePackagesByTheme } from "@/hooks/packages";
import { useSearchParams } from "next/navigation";
import PackageCard from "./PackageCard";
import ThemeLoader from "@/components/ui/ThemeLoader";

// Loading skeleton component
const ExplorationCardSkeleton = () => (
   <div className="rounded-3xl bg-white p-6 animate-pulse flex flex-col h-full shadow-lg border border-slate-100">
    <div className="h-56 bg-slate-50 rounded-2xl mb-4"></div>
    <div className="space-y-3">
      <div className="h-6 bg-slate-50 rounded-lg w-3/4"></div>
      <div className="h-4 bg-slate-50 rounded-lg w-1/2"></div>
    </div>
    <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-end">
       <div className="space-y-2">
          <div className="h-3 bg-slate-100 rounded w-16"></div>
          <div className="h-6 bg-slate-100 rounded w-24"></div>
       </div>
       <div className="h-8 bg-slate-100 rounded-lg w-20"></div>
    </div>
  </div>
);

const ExplorationList = ({ theme }) => {
  const { packages, isLoading, error } = usePackagesByTheme(theme);
  const searchParams = useSearchParams();
  const isDomestic = searchParams.get("domestic") === "true";

  const sortedPackages = useMemo(() => {
    if (!packages) return [];
    
    // Filter by region first
    const filtered = packages.filter((pkg) => pkg.domestic === isDomestic);
    
    // Logic: Non-zero prices first, then 0 prices
    return [...filtered].sort((a, b) => {
      const priceA = (a.offerPrice > 0 ? a.offerPrice : a.basePrice) || 0;
      const priceB = (b.offerPrice > 0 ? b.offerPrice : b.basePrice) || 0;
      
      if (priceA > 0 && priceB === 0) return -1;
      if (priceA === 0 && priceB > 0) return 1;
      return 0; // Maintain relative order if both or neither have prices
    });
  }, [packages, isDomestic]);

  const themePackages = sortedPackages;

  // Map slug to theme loader key
  const getThemeLoaderKey = (slug) => {
    if (slug.includes('romantic')) return 'romantic';
    if (slug.includes('exploration')) return 'exploration';
    if (slug.includes('solo')) return 'solo';
    if (slug.includes('religious')) return 'religious';
    if (slug.includes('relax')) return 'relax';
    if (slug.includes('family')) return 'family';
    if (slug.includes('elite')) return 'elite';
    if (slug.includes('educational')) return 'educational';
    if (slug.includes('group')) return 'group';
    return null;
  };

  if (isLoading) {
    return (
      <ThemeLoader theme={getThemeLoaderKey(theme)} />
    );
  }

  if (error) {
    return <h3>Error fetching packages: {error.message}</h3>;
  }

  if (themePackages.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-bold text-slate-400 font-serif lowercase italic">No packages found for this theme and region.</h3>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {themePackages.map((item) => (
        <PackageCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ExplorationList;
