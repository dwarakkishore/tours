"use client";
import Container from "../../ui/Container";
import DestinationCard from "./DestinationCard";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { Button } from "../../ui/button";
import { CONTINENTS } from "@/config";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRegionsData } from "@/hooks/regions";

export default function InternationalDestinations({ initialRegions }) {
  const [filterType, setFilterType] = useState("asia");
  const { internationalRegions } = useRegionsData(initialRegions);

  const selectedContinent =
    internationalRegions &&
    internationalRegions.find((continent) => continent.feKey === filterType);

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  return (
    <Container className="sm:px-5">
      <div className="text-2xl mb-4 font-semibold text-brand-blue">International Holidays</div>

      <div className="flex gap-2">
        {CONTINENTS.map((continent, index) => (
          <Button
            key={index}
            variant={filterType === continent.feKey ? "default" : "outline"}
            onClick={() => handleFilterChange(continent.feKey)}
            className={cn(
              "rounded-full border border-[#595959] text-[#5D5D5D] hover:bg-gray-100 text-xs px-5",
              filterType === continent.feKey && "gradient-btn shadow-lg text-white border-transparent hover:opacity-90"
            )}
          >
            {continent.displayName}
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
          {selectedContinent && selectedContinent.regions.length > 0 ? (
            selectedContinent.regions.map((region, index) => (
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

        {selectedContinent && selectedContinent.regions.length > 0 && (
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
