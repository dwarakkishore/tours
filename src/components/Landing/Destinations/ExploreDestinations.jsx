"use client";
import Container from "../../ui/Container";
import DestinationCard from "./DestinationCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { Button } from "../../ui/button";
import { CONTINENTS, ZONES } from "@/config";
import { cn } from "@/lib/utils";
import { useState, useEffect, useMemo } from "react";
import { useRegionsData } from "@/hooks/regions";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ExploreDestinations({ initialRegions }) {
  const [activeTab, setActiveTab] = useState("international");
  const [hasMounted, setHasMounted] = useState(false);
  const { internationalRegions, domesticRegions, regionIsLoading, error } = useRegionsData(initialRegions);

  // Track when component has mounted (client-side)
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Process initialRegions for SSR (before React Query hydrates)
  const processedInitialRegions = useMemo(() => {
    if (!initialRegions || initialRegions.length === 0) {
      return { international: [], domestic: [] };
    }

    const intlRegions = initialRegions
      .filter((item) => !item.isDomestic)
      .filter((item) => item.visible !== false);

    const domestic = initialRegions
      .filter((item) => item.isDomestic)
      .filter((item) => item.visible !== false);

    return { international: intlRegions, domestic };
  }, [initialRegions]);

  // Use hook data after mount, initial data before mount (SSR)
  const activeInternationalRegions = hasMounted ? internationalRegions : [{ regions: processedInitialRegions.international }];
  const activeDomesticRegions = hasMounted ? domesticRegions : processedInitialRegions.domestic;

  // Get first 8 international regions
  const displayInternationalRegions = useMemo(() => {
    if (!activeInternationalRegions) return [];
    // Flatten all regions from all continents and take first 8
    const allIntl = activeInternationalRegions.reduce((acc, continent) => {
      return [...acc, ...(continent.regions || [])];
    }, []);
    return allIntl.slice(0, 8);
  }, [activeInternationalRegions]);

  // Get first 8 domestic regions
  const displayDomesticRegions = useMemo(() => {
    if (!activeDomesticRegions) return [];
    return activeDomesticRegions.slice(0, 8);
  }, [activeDomesticRegions]);

  return (
    <Container className="sm:px-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-4 md:mb-8">
        <div className="w-full md:w-auto">
          <h2 className="section-title-light mb-1 md:mb-2">Trending Destinations</h2>
          <p className="section-subtitle-light hidden sm:block text-xs sm:text-sm md:text-base">Hand-picked hotspots our travelers are loving right now</p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex p-1 bg-gray-100 rounded-full w-fit">
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

      <div className="relative min-h-[350px] md:min-h-[450px] pb-4 px-0">
          <div
            key={activeTab}
          >
            {/* Carousel Content */}
            <Carousel
              opts={{ align: "start" }}
              className="mt-4"
            >
              <CarouselContent>
                {activeTab === "international" ? (    
                  displayInternationalRegions.length > 0 ? (
                    displayInternationalRegions.map((region, index) => (
                      <CarouselItem key={region.slug || index} className="basis-[80%] sm:basis-1/2 lg:basis-1/4">
                        <DestinationCard regionSlug={region.slug} index={index} region={region} />
                      </CarouselItem>
                    ))
                  ) : (
                    <div className="w-full h-40 flex items-center justify-center text-sm text-gray-400">
                      {regionIsLoading ? "Loading International Destinations..." : 
                      error ? "Error loading destinations. Please refresh the page." :
                      "No international regions available."}
                    </div>
                  )
                ) : (
                  displayDomesticRegions.length > 0 ? (
                    displayDomesticRegions.map((region, index) => (
                      <CarouselItem key={region.slug || index} className="basis-[80%] sm:basis-1/2 lg:basis-1/4">
                        <DestinationCard regionSlug={region.slug} index={index} region={region} />
                      </CarouselItem>
                    ))
                  ) : (
                    <div className="w-full h-40 flex items-center justify-center text-sm text-gray-400">
                      {regionIsLoading ? "Loading Domestic Destinations..." : 
                      error ? "Error loading destinations. Please refresh the page." :
                      "No domestic regions available."}
                    </div>
                  )
                )}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-lg text-black hover:scale-110 transition" />
              <CarouselNext className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-lg text-black hover:scale-110 transition" />
            </Carousel>
          </div>
      </div>

      <div className="mt-4 md:mt-6 flex justify-center">
        <Link href="/destinations" prefetch={false}>
          <Button className="gradient-btn rounded-full px-10 py-6 text-base font-semibold text-white shadow-xl hover:scale-105 transition-transform">
            Explore Destinations
          </Button>
        </Link>
      </div>
    </Container>
  );
}
