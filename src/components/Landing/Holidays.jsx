"use client";

import React, { useState, useEffect, useMemo } from "react";
import PremiumPackageCard from "@/components/Landing/PremiumPackageCard";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { useCuratedPackages } from "@/hooks/packages";
import { Skeletons } from "../Skeleton";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Helper to format tag labels for display
const formatTagLabel = (tag) => {
  if (!tag) return "";
  const labels = {
    visafree: "Visa-Free Escapes",
    trending: "Hot Right Now",
    curated: "Signature Picks",
    value: "Smart Value Trips",
    underrated: "Hidden Gems",
    bestseller: "Best Sellers"
  };
  
  if (labels[tag.toLowerCase()]) return labels[tag.toLowerCase()];
  
  return tag
    .split(/[-_ ]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const Holidays = ({
  initialInternationalPackages = [],
  initialDomesticPackages = [],
}) => {
  // Hide section entirely if no data is available
  if (initialInternationalPackages.length === 0 && initialDomesticPackages.length === 0) {
    return null;
  }

  const [activeTab, setActiveTab] = useState("international");
  const [filterType, setFilterType] = useState("curated");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Data
  const { packages: internationalPackages, isLoading: intlLoading } =
    useCuratedPackages("international", initialInternationalPackages);

  const { packages: domesticPackages, isLoading: domLoading } =
    useCuratedPackages("domestic", initialDomesticPackages);

  const curatedPackages = useMemo(() => {
    return activeTab === "international"
      ? internationalPackages
      : domesticPackages;
  }, [activeTab, internationalPackages, domesticPackages]);

  // Helper to check for tags safely and case-insensitively
  const hasTag = (pkg, tag) => {
    if (!pkg) return false;
    
    // Handle special boolean flags
    if (tag.toLowerCase() === "trending" && pkg.trending) return true;
    if (tag.toLowerCase() === "curated" && pkg.curated) return true;
    if (tag.toLowerCase() === "bestseller" && pkg.bestseller) return true;
    
    // Handle packageTags array/string
    const tags = pkg.packageTags;
    if (!tags) return false;
    if (Array.isArray(tags)) {
      return tags.some(t => typeof t === "string" && t.trim().toLowerCase() === tag.toLowerCase());
    }
    if (typeof tags === "string") {
      return tags.trim().toLowerCase().split(",").map(t => t.trim()).includes(tag.toLowerCase());
    }
    return false;
  };

  // Dynamically extract all available filters
  const availableFilters = useMemo(() => {
    if (!curatedPackages.length) return [];
    
    const tagsFound = new Set();
    
    curatedPackages.forEach(pkg => {
      // Add special flags if they exist
      if (pkg.trending) tagsFound.add("trending");
      if (pkg.curated) tagsFound.add("curated");
      if (pkg.bestseller) tagsFound.add("bestseller");
      
      // Add tags from packageTags
      const tags = pkg.packageTags;
      if (Array.isArray(tags)) {
        tags.forEach(t => { if (typeof t === "string") tagsFound.add(t.trim().toLowerCase()); });
      } else if (typeof tags === "string" && tags) {
        tags.split(",").forEach(t => tagsFound.add(t.trim().toLowerCase()));
      }
    });
    
    // Convert to sorted array with desired priority
    const priority = ["curated", "trending", "visafree", "bestseller", "value", "underrated"];
    const allTags = Array.from(tagsFound);
    
    return allTags.sort((a, b) => {
      const indexA = priority.indexOf(a);
      const indexB = priority.indexOf(b);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b);
    }).map(tag => ({
      id: tag,
      label: formatTagLabel(tag)
    }));
  }, [curatedPackages]);

  // Filters packages based on active filter
  const filteredPackages = useMemo(() => {
    if (!curatedPackages.length) return [];
    return curatedPackages.filter(p => hasTag(p, filterType));
  }, [curatedPackages, filterType]);

  // Auto-select filter when tab or packages change
  useEffect(() => {
    // Logic for auto-selecting filters
    if (!availableFilters.length) return;
    
    // If current filter is not available in new data, switch to first available
    if (!availableFilters.find(f => f.id === filterType)) {
      setFilterType(availableFilters[0].id);
    }
  }, [activeTab, availableFilters, filterType]);

  const currentLoading = intlLoading || domLoading;
  const hasData = curatedPackages.length > 0;

  // Ensure we don't show skeleton if we have initial data
  const showSkeleton = currentLoading && !hasData;

  if (showSkeleton) {
    return (
      <Container className="space-y-4 px-0 sm:px-5">
        <div className="flex justify-between">
          <Skeletons.Text.XL />
          <Skeletons.Button.MD />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeletons.Card.LG />
          <Skeletons.Card.LG />
          <Skeletons.Card.LG />
          <Skeletons.Card.LG />
        </div>
      </Container>
    );
  }

  return (
    <Container className="sm:px-5">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="flex-1">
          <h2 className="section-title-light mb-1 md:mb-2 text-brand-blue">
            Signature Collections
          </h2>
          <p className="section-subtitle-light hidden sm:block text-xs sm:text-sm md:text-base text-gray-600">
            Hand-picked hotspots our travelers are loving right now
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex p-1 bg-gray-100 rounded-full w-fit h-fit">
          <button
            onClick={() => setActiveTab("international")}
            className={cn(
              "px-4 sm:px-7 py-1.5 sm:py-2.5 rounded-full text-[13px] sm:text-base font-bold transition-all duration-300",
              activeTab === "international" 
                ? "gradient-btn text-white shadow-md" 
                : "text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10"
            )}
          >
            International
          </button>
          <button
            onClick={() => setActiveTab("domestic")}
            className={cn(
              "px-4 sm:px-7 py-1.5 sm:py-2.5 rounded-full text-[13px] sm:text-base font-bold transition-all duration-300",
              activeTab === "domestic" 
                ? "gradient-btn text-white shadow-md" 
                : "text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10"
            )}
          >
            Domestic
          </button>
        </div>
      </div>

      {/* DYNAMIC FILTERS */}
      {isMounted && (
        <div className="mb-6 flex flex-wrap sm:flex-nowrap gap-2 sm:overflow-x-auto pb-4 scrollbar-hide relative z-50">
          {availableFilters.map((filter) => (
            <Button
              key={filter.id}
              variant={filterType === filter.id ? "default" : "outline"}
              onClick={() => setFilterType(filter.id)}
              className={cn(
                "rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 text-[11px] sm:text-sm font-bold sm:font-semibold px-3.5 sm:px-6 py-1.5 sm:py-2 flex-shrink-0 transition-all",
                filterType === filter.id && "bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-md sm:shadow-lg text-slate-900 border-transparent hover:opacity-90"
              )}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      )}

      <div className="relative min-h-[400px]">
        <div className="relative w-full">
          {isMounted && filteredPackages.length > 0 ? (
            <Carousel
              opts={{ align: "start" }}
              className="w-full"
              key={`${activeTab}-${filterType}`}
            >
              <CarouselContent className="-ml-4">
                {filteredPackages.map((item, index) => (
                  <CarouselItem 
                    key={`${item.id}-${index}`} 
                    className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/4"
                  >
                    <PremiumPackageCard item={item} index={index} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-lg text-black hover:scale-110 transition border border-gray-100" />
              <CarouselNext className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-lg text-black hover:scale-110 transition border border-gray-100" />
            </Carousel>
          ) : !isMounted && hasData ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Skeletons.Card.LG />
              <Skeletons.Card.LG />
              <Skeletons.Card.LG />
              <Skeletons.Card.LG />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl w-full">
              <p className="text-gray-400 font-medium text-lg">No packages found for this selection</p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Holidays;