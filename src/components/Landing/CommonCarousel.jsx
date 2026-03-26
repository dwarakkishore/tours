"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveLeft, MoveRight } from "lucide-react";
import { Navigation } from "swiper/modules";

import PackageCard from "@/components/Landing/PackageCard";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const CommonCarousel = ({
  title,
  subtitle,
  packages = [],
  filterOptions = [],
  defaultFilter = "all",
  className,
  viewAllLink,
  viewAllText = "Explore All",
}) => {
  const [swiper, setSwiper] = useState(null);
  const [activeFilter, setActiveFilter] = useState(defaultFilter);

  // Filter logic
  const filteredPackages = useMemo(() => {
    if (activeFilter === "all") return packages;
    
    const filter = filterOptions.find(f => f.value === activeFilter);
    if (filter && typeof filter.filterFn === "function") {
      return packages.filter(filter.filterFn);
    }
    
    return packages;
  }, [packages, activeFilter, filterOptions]);

  // Handle case where active filter has no packages (auto-select first available or stay)
  useEffect(() => {
    if (filteredPackages.length === 0 && packages.length > 0) {
      // Find the first filter that actually has packages
      const firstAvailableFilter = filterOptions.find(f => 
        packages.some(p => typeof f.filterFn === "function" ? f.filterFn(p) : true)
      );
      if (firstAvailableFilter && firstAvailableFilter.value !== activeFilter) {
        setActiveFilter(firstAvailableFilter.value);
      }
    }
  }, [packages, filterOptions, filteredPackages.length, activeFilter]);

  return (
    <div className={cn("relative", className)}>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex-1">
          {title && <h2 className="section-title-light mb-2">{title}</h2>}
          {subtitle && <p className="section-subtitle-light hidden sm:block">{subtitle}</p>}
        </div>

        {viewAllLink && (
          <Button asChild variant="outline" className="rounded-full border-brand-blue text-brand-blue hover:bg-brand-blue/5 font-bold hidden md:flex">
            <Link href={viewAllLink} prefetch={false}>
              {viewAllText} <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        )}
      </div>

      {/* FILTERS */}
      {filterOptions.length > 0 && (
        <div className="mb-4 flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {filterOptions.map((filter) => {
            const hasPackages = packages.some(p => typeof filter.filterFn === "function" ? filter.filterFn(p) : true);
            if (!hasPackages) return null;

            return (
              <Button
                key={filter.value}
                variant={activeFilter === filter.value ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "rounded-full text-sm font-bold px-6 py-2.5 flex-shrink-0 transition-all duration-300",
                  activeFilter === filter.value 
                    ? "gradient-btn text-white shadow-md" 
                    : "text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10"
                )}
              >
                {filter.label}
              </Button>
            );
          })}
        </div>
      )}

      {/* SLIDER */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {filteredPackages.length > 0 ? (
              <div className="relative">
                <button
                  onClick={() => swiper?.slidePrev()}
                  disabled={filteredPackages.length < 4}
                  className={cn(
                    "hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white shadow items-center justify-center",
                    filteredPackages.length < 4 && "opacity-40 cursor-not-allowed"
                  )}
                >
                  <MoveLeft className="w-6 h-6" />
                </button>

                <Swiper
                  onSwiper={setSwiper}
                  modules={[Navigation]}
                  loop={filteredPackages.length > 4}
                  slidesPerView={1.2}
                  spaceBetween={16}
                  breakpoints={{
                    640: { slidesPerView: 2.2, spaceBetween: 16 },
                    1024: { slidesPerView: 4, spaceBetween: 20 },
                  }}
                >
                  {filteredPackages.map((item, index) => (
                    <SwiperSlide key={`${item.id}-${index}`} className="!h-auto">
                      <PackageCard item={item} />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <button
                  onClick={() => swiper?.slideNext()}
                  disabled={filteredPackages.length < 4}
                  className={cn(
                    "hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white shadow items-center justify-center",
                    filteredPackages.length < 4 && "opacity-40 cursor-not-allowed"
                  )}
                >
                  <MoveRight className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-400 font-medium">Coming Soon</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CommonCarousel;
