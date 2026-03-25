
"use client";

import React, { useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { 
  Heart, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Utensils, 
  Camera, 
  Music,
  Sparkles,
  ChevronLeft
} from "lucide-react";
import { motion } from "framer-motion";

import { cn, normalizeImageUrl } from "@/lib/utils";
import { formatPrice } from "@/utils/offerUtils";
import BadgeSection from "@/components/BadgeSection";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Pagination as SwiperPagination } from "swiper/modules";

const PackageCard = ({ item, className, isGroup = false, variant = "blue" }) => {
  const cardRef = useRef(null);

  // Theme configuration
  const themes = {
    blue: {
      primary: "brand-blue",
      primaryHover: "hover:bg-brand-blue-hovered",
      text: "text-brand-blue",
      textHover: "group-hover:text-brand-blue",
      bgLight: "bg-blue-50",
      bgLightHover: "group-hover:bg-blue-100",
      borderHover: "hover:border-blue-200",
      badge: "bg-brand-blue",
      accentText: "text-brand-blue",
      icon: "text-brand-blue",
      shadow: "hover:shadow-[0_40px_80px_rgba(1,70,179,0.1)]"
    },
    rose: {
      primary: "rose-500",
      primaryHover: "hover:bg-rose-600",
      text: "text-rose-600",
      textHover: "group-hover:text-rose-600",
      bgLight: "bg-rose-50",
      bgLightHover: "group-hover:bg-rose-100",
      borderHover: "hover:border-rose-200",
      badge: "bg-rose-500",
      accentText: "text-rose-600",
      icon: "text-rose-400",
      shadow: "hover:shadow-[0_40px_80px_rgba(244,63,94,0.1)]"
    },
    amber: {
      primary: "amber-500",
      primaryHover: "hover:bg-amber-600",
      text: "text-amber-600",
      textHover: "group-hover:text-amber-600",
      bgLight: "bg-amber-50",
      bgLightHover: "group-hover:bg-amber-100",
      borderHover: "hover:border-amber-200",
      badge: "bg-amber-500",
      accentText: "text-amber-600",
      icon: "text-amber-400",
      shadow: "hover:shadow-[0_40px_80px_rgba(245,158,11,0.1)]"
    }
  };

  const theme = themes[variant] || themes.blue;

  // Enhanced Multi-Source Image Scavenger
  const { validImages, hasImages } = useMemo(() => {
    const scavenger = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      return [val];
    };

    const rawImages = [
      ...scavenger(item.cardImages),
      ...(item.cardImage ? [item.cardImage] : []),
      ...(item.cardImageRef ? [item.cardImageRef] : []),
    ];

    // Normalize and filter unique valid images
    const seen = new Set();
    const result = rawImages
      .map(img => {
        if (!img) return null;
        const url = typeof img === "string" ? img : img.url;
        return url ? { url } : null;
      })
      .filter(img => {
        if (!img?.url || seen.has(img.url)) return false;
        seen.add(img.url);
        return true;
      });
    
    return { validImages: result, hasImages: result.length > 0 };
  }, [item.cardImages, item.cardImage, item.cardImageRef]);

  // Diagnostic logging for missing images

  // Robust Slug Generation
  const regionSlug = useMemo(() => {
    if (item.regionSlug) return item.regionSlug;
    if (!item.region) return "unknown";
    // Convert "Proper Name" to slug if it's not already
    return item.region.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }, [item.region, item.regionSlug]);

  const href = isGroup
    ? `/packages/${regionSlug}/${item.packageSlug}?group=true`
    : `/packages/${regionSlug}/${item.packageSlug}`;

  // Process highlights: replace first two with destinations if available
  const baseHighlights = useMemo(() => {
    // Check for length > 0 because minimizer returns [] which is truthy
    const rawHighlights = (item.highlights && item.highlights.length > 0) 
      ? item.highlights 
      : ["Premium Accommodation", "Curated Experiences", "Seamless Travel"];
    
    // Formatting helper for region fallback
    const formatRegion = (slug) => {
      if (!slug) return "";
      return slug
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    const destinations = item.citiesList || item.location || formatRegion(item.region) || "";
    
    if (destinations) {
      return [
        `Covering: ${destinations}`,
        // If we pulled from default highlights (length 3), we only want the last 2 to make total 3
        // If we have real highlights, we just prepend (or take appropriate slice)
        ...(item.highlights && item.highlights.length > 0 ? item.highlights.slice(0, 2) : rawHighlights.slice(1))
      ].slice(0, 3);
    }
    return rawHighlights;
  }, [item.highlights, item.citiesList, item.location, item.region]);


  return (
    <motion.div
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link href={href} className="block h-auto sm:h-full">
        <div className={cn(
          "relative bg-white rounded-[1rem] sm:rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 h-full flex flex-col border border-slate-100",
          theme.shadow,
          theme.borderHover,
          className
        )}>
          {/* Image Container */}
          <div className="relative h-[240px] sm:h-[320px] overflow-hidden">
            <Swiper
              modules={[Navigation, Autoplay, SwiperPagination]}
              loop={validImages.length > 1}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: `.swiper-button-next-${item.id}`,
                prevEl: `.swiper-button-prev-${item.id}`,
              }}
              pagination={{
                clickable: true,
                el: `.swiper-pagination-${item.id}`,
                bulletClass: "swiper-pagination-bullet !size-1.5 !bg-white !opacity-50",
                bulletActiveClass: "!opacity-100 !w-4 !rounded-full transition-all",
              }}
              preventClicks={false}
              preventClicksPropagation={false}
              className="h-full w-full"
            >
              {validImages.length > 0 ? (
                validImages.map((img, i) => (
                  <SwiperSlide key={i}>
                    <Image
                      src={normalizeImageUrl(img.url)}
                      alt={item.packageTitle || "Package Image"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <div className="w-full h-full bg-slate-200 animate-pulse flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-slate-400" />
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
            
            {/* Carousel Navigation */}
            {validImages.length > 1 && (
              <>
                <button 
                  aria-label="Previous image"
                  className={cn(
                    `swiper-button-prev-${item.id} absolute left-3 top-1/2 -translate-y-1/2 z-20`,
                    "w-8 h-8 rounded-full bg-white/20 backdrop-blur-md hidden sm:flex items-center justify-center text-white",
                    "opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white",
                    variant === "rose" ? "hover:text-rose-500" : 
                    variant === "amber" ? "hover:text-amber-500" : 
                    "hover:text-brand-blue"
                  )}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  aria-label="Next image"
                  className={cn(
                    `swiper-button-next-${item.id} absolute right-3 top-1/2 -translate-y-1/2 z-20`,
                    "w-8 h-8 rounded-full bg-white/20 backdrop-blur-md hidden sm:flex items-center justify-center text-white",
                    "opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white",
                    variant === "rose" ? "hover:text-rose-500" : 
                    variant === "amber" ? "hover:text-amber-500" : 
                    "hover:text-brand-blue"
                  )}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className={cn(
                  `swiper-pagination-${item.id} !bottom-4 !left-1/2 !-translate-x-1/2 !w-fit px-2 py-1 bg-black/20 backdrop-blur-sm rounded-full z-20`,
                  "opacity-0 group-hover:opacity-100 transition-all duration-300"
                )} />
              </>
            )}
            
            {/* Premium Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none z-10" />
            
            {/* Dynamic Tags Badge */}
            <div className="absolute top-4 left-4 z-20">
              <BadgeSection item={item} />
            </div>

            {/* Rating Tag - Enhanced prominence */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl transform group-hover:rotate-6 transition-transform border border-white/50">
              <Heart className={cn("w-4 h-4 fill-current", theme.text)} />
              <span className={cn("text-xs font-bold", theme.text)}>4.9</span>
            </div>

            {/* Location + Duration Overlay - Enhanced highlighting */}
            <div className="absolute bottom-5 left-4 right-4 z-20 flex items-center justify-between text-white">
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-lg px-3 py-1.5 rounded-full border border-white/10 group-hover:bg-black/50 transition-all">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="text-[13px] font-bold tracking-tight capitalize drop-shadow-md">
                  {item.location || regionSlug.split("-").join(" ")}
                </span>
              </div>
              
              <div className={cn(
                "flex items-center gap-2 backdrop-blur-lg px-4 py-2 rounded-full border border-white/30 shadow-xl",
                theme.badge,
                "bg-opacity-95 transform group-hover:scale-105 transition-transform"
              )}>
                <Clock className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {item.days}D / {item.nights}N
                </span>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="pt-1.5 sm:pt-2 px-5 sm:px-8 pb-3 sm:pb-5 flex-none sm:flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
            <div className="space-y-2 sm:space-y-2">
              <div className="min-h-[3rem] sm:min-h-[3.75rem]">
                <h3 className={cn(
                  "text-xl sm:text-2xl font-bold text-slate-900 transition-colors leading-tight tracking-tight line-clamp-2",
                  theme.textHover
                )}>
                  {item.packageTitle?.replace(/^["']|["']$/g, '')}
                </h3>
              </div>
              
              {/* Highlights Section */}
              <div className="space-y-1.5 sm:space-y-2 min-h-[3rem] sm:min-h-[3.5rem]">
                {baseHighlights.slice(0, 3).map((highlight, idx) => {
                  const isCovering = highlight.startsWith("Covering:");
                  return (
                    <div key={idx} className="flex items-center gap-2 sm:gap-3 group/hl">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.4)] group-hover/hl:scale-125 transition-transform",
                        isCovering ? theme.badge : "bg-yellow-400"
                      )} />
                      <p className={cn(
                        "text-sm sm:text-xs leading-tight tracking-tight line-clamp-1",
                        isCovering ? "" : "text-slate-600 font-medium"
                      )}>
                        {isCovering ? (
                          <>
                            <span className={cn("font-bold mr-1", theme.accentText)}>Covering:</span>
                            <span className="text-slate-600 font-medium">
                              {highlight.replace("Covering:", "").trim()}
                            </span>
                          </>
                        ) : (
                          highlight
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Premium Footer */}
            <div className="pt-2 sm:pt-3 border-t border-slate-100 flex items-end justify-between">
              <div className="space-y-1 sm:space-y-1">
                <p className="text-[8px] sm:text-[9px] text-slate-400 font-semibold uppercase tracking-[0.2em]">Curated Price</p>
                <div className="flex flex-col">
                  {(item.offerPrice > 0 || item.basePrice > 0) ? (
                    <>
                      <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tighter">
                        ₹{formatPrice(item.offerPrice > 0 ? item.offerPrice : item.basePrice)}
                      </p>
                      {item.offerPrice > 0 && (
                        <p className="text-[8px] sm:text-[10px] text-slate-400 line-through">
                          ₹{formatPrice(item.basePrice)}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className={cn("text-xs sm:text-lg font-bold tracking-tight", theme.text)}>
                      On Request
                    </p>
                  )}
                </div>
              </div>
              <button 
                aria-label="View package details"
                className={cn(
                  "w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl text-white flex items-center justify-center transition-all duration-500 shadow-xl group-hover:rotate-12",
                  variant === "rose" ? "bg-rose-600 hover:bg-rose-700" : 
                  variant === "amber" ? "bg-amber-600 hover:bg-amber-700" : 
                  "bg-slate-900 hover:bg-brand-blue"
                )}
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PackageCard;

/* PREVIOUS IMPLEMENTATION COMMENTED OUT
const OldPackageCard = ({ item, className, isGroup = false }) => {
  const cities = splitCityStr(item.citiesList || "");
  const visibleCities = useMemo(() => cities.slice(0, 3), [cities]);

  const { openModal, setRegion } = useModal();
  const { isCardExpanded } = useExpandedCard();
  const cardRef = useRef(null);

  const Slot = Link;
  const href = isGroup
    ? `/packages/${item.region}/${item.packageSlug}?group=true`
    : `/packages/${item.region}/${item.packageSlug}`;

  const handleContactExpert = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setRegion(item.region);
    openModal();
  };

  return (
    <Slot
      ref={cardRef}
      href={href}
      className={cn(
        "block relative overflow-hidden rounded-2xl md:rounded-3xl group h-[350px] sm:h-[500px]",
        className
      )}
    >
      <div
        className="
          absolute inset-0 overflow-hidden
          rounded-2xl md:rounded-3xl
          bg-black
        "
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: `.swiper-btn-next-${item.id}`,
            prevEl: `.swiper-btn-prev-${item.id}`,
          }}
          pagination={{ clickable: true }}
          className="h-full"
        >
          {(item.cardImages || []).map(
            (img, i) =>
              img?.url && (
                <SwiperSlide key={i}>
                  <Image
                    src={img.url}
                    alt={img?.title || "Package Image"}
                    fill
                    priority={i === 0}
                    className="
                      object-cover
                      transition-transform duration-700
                      swiper-slide-active:scale-105
                    "
                  />
                </SwiperSlide>
              )
          )}

          {item.cardImages?.length > 1 && (
            <>
              <button 
                className={`swiper-btn-prev-${item.id} hidden sm:flex absolute left-3 top-1/2 z-50 -translate-y-1/2 
                  p-2 rounded-full bg-white/20 backdrop-blur-xl text-white shadow-2xl
                  opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-125 hover:bg-white/40 cursor-pointer`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <button 
                className={`swiper-btn-next-${item.id} hidden sm:flex absolute right-3 top-1/2 z-50 -translate-y-1/2 
                  p-2 rounded-full bg-white/20 backdrop-blur-xl text-white shadow-2xl
                  opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-125 hover:bg-white/40 cursor-pointer`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </>
          )}
        </Swiper>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-20 flex gap-2">
        <BadgeSection item={item} />
      </div>

      <div
        className="
          absolute inset-x-0 bottom-0 z-30
          bg-gradient-to-t from-black/95 via-black/80 to-transparent
          backdrop-blur-lg
          border-t-2 border-brand-blue/30
          rounded-b-2xl md:rounded-b-3xl
        "
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-blue via-yellow-400 to-brand-blue rounded-bl-2xl md:rounded-bl-3xl"></div>
        
        <div className="relative px-4 sm:px-6 pb-2 sm:pb-4 pt-4 sm:pt-6">
          <div className="mb-2 flex items-center justify-between gap-1">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r from-brand-blue/90 to-brand-blue/70 backdrop-blur-sm">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white drop-shadow-lg">
                {item.region}
              </span>
            </div>
            <span className="rounded-full bg-white/20 backdrop-blur-sm px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-bold text-white border border-white/30">
              {item.days}D/{item.nights}N
            </span>
          </div>

          <h3 className="mb-2 sm:mb-3 line-clamp-2 text-[14px] sm:text-base font-bold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {item.packageTitle}
          </h3>

          <div className="flex items-center justify-between gap-1.5 sm:gap-2">
            {(item.offerPrice === 0 || !item.offerPrice) && (item.basePrice === 0 || !item.basePrice) ? (
              <div className="w-full sm:flex-shrink-0 sm:flex-1">
                <div className="inline-block px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-white shadow-lg">
                  <p className="text-[9px] sm:text-sm font-bold leading-tight text-brand-blue">
                    Contact an Expert
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap">
                <div className="flex-shrink-0">
                  <p className="text-lg sm:text-xl font-bold leading-none text-yellow-400 drop-shadow-lg">
                    ₹{formatPrice(item.offerPrice > 0 ? item.offerPrice : item.basePrice)}
                  </p>
                  {item.offerPrice > 0 && (
                    <p className="mt-0.5 text-[9px] sm:text-[11px] text-white/60 line-through">
                      ₹{formatPrice(item.basePrice)}
                    </p>
                  )}
                </div>

                {item.offerPrice > 0 && item.basePrice > 0 && (
                  <span className="flex-shrink-0 rounded-full bg-gradient-to-r from-brand-accent to-yellow-400 px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[11px] font-bold text-black shadow-lg">
                    {Math.round(((item.basePrice - item.offerPrice) / item.basePrice) * 100)}%
                  </span>
                )}
              </div>
            )}

            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <div className="rounded-xl bg-brand-blue hover:bg-brand-blue-hovered px-3 sm:px-3 py-2 sm:py-2 text-center text-[11px] sm:text-[11px] font-bold text-white cursor-pointer transition-all shadow-lg">
                View
              </div>

              {!isGroup && (
                <button
                  onClick={handleContactExpert}
                  className="flex-shrink-0 rounded-xl bg-brand-blue hover:bg-brand-blue/90 px-3 sm:px-3 py-2 sm:py-2 text-[11px] sm:text-[11px] font-bold text-white transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] transform hover:scale-105"
                >
                  Call
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Slot>
  );
};
*/

