"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import PackageCard from "@/components/Landing/PackageCard";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import { useCuratedPackages } from "@/hooks/packages";
import AnimatedText from "./AnimatedText";
import { Skeletons } from "../Skeleton";
import { cn } from "@/lib/utils";

const ANIMATED_TEXTS = [
  "Wander the World, One Dream Trip at a Time",
  "Handpicked Holidays Across the Globe",
  "From Europe to the East – Your Journey Starts Here",
  "Where Do You Want to Go Next?",
  "Explore Iconic Destinations, Effortlessly",
  "Tailored Getaways to the World's Most Loved Places",
  "Globetrotting Made Simple, Just for You",
  "Curated Global Escapes, Beyond Borders",
  "From Santorini to Singapore — All Within Reach",
  "Vacations Without Limits. Just Pack and Go.",
];

const GlobalGetaway = ({ initialPackages = [], hideHeader = false }) => {
  const [swiper, setSwiper] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [filterType, setFilterType] = useState("curated");
  const [mounted, setMounted] = useState(false);

  // Get curated international packages
  const { packages: curatedPackages, isLoading: curatedLoading } =
    useCuratedPackages("international", initialPackages);

  // Filter packages based on selected filter type
  const packages = useMemo(() => {
    // Filter for international packages only
    const internationalPackages = curatedPackages.filter(
      (pkg) => pkg.domestic === false
    );

    switch (filterType) {
      case "trending":
        return internationalPackages.filter((pkg) => pkg.trending);
      case "discount":
        return internationalPackages.filter((pkg) => pkg.offerPrice);
      case "bestseller":
        return internationalPackages.filter((pkg) => pkg.bestseller);
      case "curated":
      default:
        return internationalPackages;
    }
  }, [curatedPackages, filterType]);

  const isLoading = curatedLoading;

  // Check if there are any discounted packages to show the discount button
  const hasDiscountedPackages = curatedPackages.some(
    (pkg) => pkg.offerPrice && pkg.domestic === false
  );

  // Check if there are any trending packages to show the trending button
  const hasTrendingPackages = curatedPackages.some(
    (pkg) => pkg.trending && pkg.domestic === false
  );

  // Check if there are any bestseller packages to show the bestseller button
  const hasBestsellerPackages = curatedPackages.some(
    (pkg) => pkg.bestseller && pkg.domestic === false
  );

  // Set mounted state to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleResize = () => {
      setIsMobile(window.innerWidth < 576);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted]);

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  // Show skeleton during initial mount to prevent hydration mismatch
  if (!mounted || isLoading) {
    return (
      <Container className="space-y-4 px-0 sm:px-5">
        <div className="flex items-center  justify-between gap-4">
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
    <Container className="px-0 sm:px-5">
      {!hideHeader && (
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-4 px-8 sm:px-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <h2 className="text-2xl font-semibold">International Holidays</h2>
            <AnimatedText items={ANIMATED_TEXTS} />
          </div>
          <div className="sm:ml-auto flex gap-2">
            <Button
              variant={filterType === "curated" ? "default" : "outline"}
              onClick={() => handleFilterChange("curated")}
              className={cn(
                "rounded-full border border-[#595959] text-[#5D5D5D]",
                filterType === "curated" &&
                  "border-brand-blue bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20"
              )}
            >
              Curated
            </Button>
            {hasTrendingPackages && (
              <Button
                variant={filterType === "trending" ? "default" : "outline"}
                onClick={() => handleFilterChange("trending")}
                className={cn(
                  "rounded-full border border-[#595959] text-[#5D5D5D]",
                  filterType === "trending" &&
                    "border-brand-blue bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20"
                )}
              >
                Trending
              </Button>
            )}
            {hasBestsellerPackages && (
              <Button
                variant={filterType === "bestseller" ? "default" : "outline"}
                onClick={() => handleFilterChange("bestseller")}
                className={cn(
                  "rounded-full border border-[#595959] text-[#5D5D5D]",
                  filterType === "bestseller" &&
                    "border-brand-blue bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20"
                )}
              >
                Bestseller
              </Button>
            )}
            {hasDiscountedPackages && (
              <Button
                variant={filterType === "discount" ? "default" : "outline"}
                onClick={() => handleFilterChange("discount")}
                className={cn(
                  "rounded-full border border-[#595959] text-[#5D5D5D]",
                  filterType === "discount" &&
                    "border-brand-blue bg-brand-blue/10 text-brand-blue"
                )}
              >
                Discount
              </Button>
            )}
          </div>
        </div>
      )}

      <div className="relative flex items-center">
        {packages.length > 0 ? (
          <>
            <button
              className={cn(
                "bg-brand-blue text-white aspect-square rounded-none py-2 pr-1 pl-2 hidden sm:block sm:absolute -left-9",
                packages.length < 4 &&
                  "opacity-50 cursor-not-allowed hover:bg-brand-blue",
                packages.length >= 4 && "hover:bg-brand-blue-hovered"
              )}
              onClick={() => swiper?.slidePrev()}
              disabled={packages.length < 4}
              aria-disabled={packages.length < 4}
              tabIndex={packages.length < 4 ? -1 : 0}
            >
              <MoveLeft />
            </button>
            <Swiper
              key={filterType}
              enabled={packages.length >= 4}
              modules={[Navigation]}
              loop
              centeredSlides={isMobile}
              onSwiper={(swiper) => setSwiper(swiper)}
              slidesPerView={"auto"}
              breakpoints={{
                320: { slidesPerView: 1.2, spaceBetween: 16 },
                640: { slidesPerView: 2, spaceBetween: 16 },
                1024: { slidesPerView: 4, spaceBetween: 20 },
              }}
              className="section-slider"
            >
              {packages.map((item) => (
                <SwiperSlide key={item.id} className="mb-2 w-full">
                  <PackageCard item={item} className="shadow-none" />
                </SwiperSlide>
              ))}
              {/* Pad with empty slides if less than 4 */}
              {packages.length < 4 &&
                Array.from({ length: 4 - packages.length }).map((_, idx) => (
                  <SwiperSlide key={`empty-${idx}`} className="mb-2 w-full">
                    <div className="h-full w-full min-h-[350px] bg-gray-100 rounded-lg border border-dashed border-gray-300 flex items-center justify-center opacity-50">
                      {/* Empty placeholder */}
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
            <button
              className={cn(
                "bg-brand-blue text-white aspect-square rounded-none py-2 pl-1 pr-2 hidden sm:block sm:absolute -right-9",
                packages.length < 4 &&
                  "opacity-50 cursor-not-allowed hover:bg-brand-blue",
                packages.length >= 4 && "hover:bg-brand-blue-hovered"
              )}
              onClick={() => swiper?.slideNext()}
              disabled={packages.length < 4}
              aria-disabled={packages.length < 4}
              tabIndex={packages.length < 4 ? -1 : 0}
            >
              <MoveRight />
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">No packages available</div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default GlobalGetaway;
