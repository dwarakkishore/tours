"use client";
import Container from "../../ui/Container";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect, useMemo } from "react";
import { useRegionsData } from "@/hooks/regions";
import { ZONES } from "@/config";
import DestinationCard from "@/components/Landing/Destinations/DestinationCard";

export default function DomesticDestinations({ initialRegions }) {
  const [filterType, setFilterType] = useState(ZONES[0].feKey);
  const { domesticRegions } = useRegionsData(initialRegions);

  const selectedZone = useMemo(
    () =>
      domesticRegions &&
      domesticRegions?.filter((region) => region.zone === filterType),
    [domesticRegions, filterType]
  );

  useEffect(() => {
    // find region with zone
    const regionWithZone =
      domesticRegions && domesticRegions?.filter((region) => region.zone);
    if (regionWithZone.length > 0) {
      setFilterType(regionWithZone[0].zone);
    }
  }, [domesticRegions]);

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  return (
    <Container className="sm:px-5 ">
      <div className="text-2xl mb-4 font-semibold text-brand-blue">Domestic Holidays</div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide sm:overflow-visible sm:pb-0">
        {ZONES.map((zone, index) => (
          <Button
            key={index}
            variant={filterType === zone.feKey ? "default" : "outline"}
            onClick={() => handleFilterChange(zone.feKey)}
            className={cn(
              "rounded-full border border-[#595959] text-[#5D5D5D] hover:bg-gray-100 text-xs px-5 whitespace-nowrap flex-shrink-0",
              filterType === zone.feKey && "gradient-btn shadow-lg text-white border-transparent hover:opacity-90"
            )}
          >
            {zone.displayName}
          </Button>
        ))}
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="mt-8"
      >
        <CarouselContent className="gap-4 ml-0">
          {selectedZone?.length > 0 ? (
            selectedZone.map((region, index) => (
              <DestinationCard
                key={index}
                regionSlug={region.slug}
                inCarousel={true}
              />
            ))
          ) : (
            <div className="w-full text-center text-sm text-gray-500">
              Loading...
            </div>
          )}
        </CarouselContent>
        {selectedZone?.length > 0 && (
          <>
            {/* <CarouselPrevious className="bg-brand-blue text-white aspect-square rounded-none py-2 pr-1 pl-2 hidden sm:block sm:absolute -left-8" />
            <CarouselNext className="bg-brand-blue text-white aspect-square rounded-none py-2 pr-1 pl-2 hidden sm:block sm:absolute -right-8" /> */}
            <CarouselPrevious
              className="
    hidden md:flex
    absolute -left-6 top-1/2 -translate-y-1/2
    z-10
    h-12 w-12
    rounded-full
    bg-white
    shadow-lg
    text-black
    hover:scale-110
    transition
  "
            />

            <CarouselNext
              className="
    hidden md:flex
    absolute -right-6 top-1/2 -translate-y-1/2
    z-10
    h-12 w-12
    rounded-full
    bg-white
    shadow-lg
    text-black
    hover:scale-110
    transition
  "
            />
          </>
        )}
      </Carousel>
    </Container>
  );
}
