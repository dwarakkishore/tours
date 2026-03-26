"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { ChevronRight, ArrowRight, Heart, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/offerUtils";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PremiumPackageCard = ({ item, className, isGroup = false, index = 0 }) => {
  const [swiper, setSwiper] = useState(null);

  // Robust image scavenging logic (consistent with LandingPackageCard)
  const validImages = useMemo(() => {
    const scavenger = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      return [val];
    };

    const rawImages = [
      ...scavenger(item.cardImages),
      ...(item.cardImage ? [{ url: item.cardImage }] : []),
      ...(item.cardImageRef ? [{ url: item.cardImageRef }] : []),
      ...scavenger(item.images),
      ...scavenger(item.imageRefs),
      ...scavenger(item.itineraries?.flatMap(it => it.imageRefs || [])),
      ...(item.image ? [{ url: item.image }] : []),
      ...(item.imageUrl ? [{ url: item.imageUrl }] : []),
      ...(item.featuredImage ? [{ url: item.featuredImage }] : []),
    ];

    const seen = new Set();
    const filtered = rawImages
      .map(img => {
        const url = typeof img === "string" ? img : img?.url;
        return url ? { url } : null;
      })
      .filter(img => {
        if (!img?.url || seen.has(img.url)) return false;
        seen.add(img.url);
        return true;
      });

    return filtered.length > 0 ? filtered : [{ url: "/img/placeholders/package-placeholder.png" }];
  }, [item]);

  // Process highlights: replace first two with destinations if available
  const baseHighlights = useMemo(() => {
    const rawHighlights = item.highlights || ["Premium Accommodation", "Expert Guided Tours", "Curated Experiences"];
    const destinations = item.citiesList || item.location || "";
    
    if (destinations) {
      return [
        `Covering: ${destinations}`,
        ...rawHighlights.slice(2)
      ];
    }
    return rawHighlights;
  }, [item.highlights, item.citiesList, item.location]);

  const href = isGroup
    ? `/packages/${item.region}/${item.packageSlug}?group=true`
    : `/packages/${item.region}/${item.packageSlug}`;

  // Helper to extract relevant tags for the top section
  const topTags = useMemo(() => {
    const tags = [];
    if (item.trending) tags.push({ label: "Hot Right Now", icon: "✨", type: "trending" });
    if (item.curated) tags.push({ label: "Signature Pick", icon: "🏆", type: "curated" });
    
    // Scavenge for other tags like budget/value
    const hasBudgetTag = (item.packageTags || []).some(t => t.toLowerCase().includes('budget') || t.toLowerCase().includes('value'));
    if (hasBudgetTag) {
      tags.push({ label: "Value Choice", icon: "💰", type: "value" });
    }

    // Add tailored tag
    const tailored = Array.isArray(item.tailored_tag) ? item.tailored_tag[0] : item.tailored_tag;
    if (tailored) {
        tags.push({ 
            label: tailored.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
            icon: "📍",
            type: "tailored"
        });
    }

    return tags.slice(0, 1); // Show max 1 only for clarity
  }, [item]);

  return (
    <div className={cn(
      "travel-card group w-full relative overflow-hidden h-[400px] sm:h-[520px] rounded-[28px] bg-black shadow-xl hover:shadow-2xl transition-all duration-500 gpu-accelerated",
      className
    )}>
      <Link href={href} className="block w-full h-full" prefetch={false}>
        {/* Full Priority Image / Swiper */}
        <div className="absolute inset-0 z-0">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            onSwiper={setSwiper}
            loop={validImages.length > 1}
            autoplay={false}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !size-1.5 !bg-white !opacity-40 !mx-1",
              bulletActiveClass: "!opacity-100 !w-5 !rounded-full transition-all",
            }}
            className="h-full w-full"
          >
            {validImages.length > 0 ? (
              validImages.map((img, i) => (
                <SwiperSlide key={i}>
                  <Image
                    src={img.url}
                    alt={item.packageTitle || "Package"}
                    fill
                    className="object-cover"
                    priority={index < 4 && i === 0}
                  />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                  <span className="text-white/20">No Images</span>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
          
          {/* Edge Vignette */}
          <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_100px_rgba(0,0,0,0.3)]" />
        </div>

        {/* Top Tag - Single badge only for clarity */}
        <div className="absolute top-5 left-5 right-5 z-20 flex gap-2 max-w-[calc(100%-120px)]">
          {topTags.map((tag, idx) => (
            <div 
              key={idx}
              className={cn(
                "tag inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-white backdrop-blur-2xl border transition-all duration-300 hover:translate-y-[-2px] shadow-lg whitespace-nowrap",
                tag.type === "trending" && "bg-orange-500/60 border-orange-400 shadow-orange-500/40",
                tag.type === "curated" && "bg-rose-600/70 border-rose-400 shadow-rose-600/40",
                tag.type === "value" && "bg-blue-600/70 border-blue-400 shadow-blue-600/40",
                tag.type === "tailored" && "bg-violet-600/60 border-violet-400 shadow-violet-600/40"
              )}
            >
              <span className="text-xs filter drop-shadow-md">{tag.icon}</span>
              <span className="drop-shadow-sm">{tag.label}</span>
            </div>
          ))}
        </div>
        
        {/* Rating Badge - Highlighted */}
        <div className="absolute top-6 right-6 z-30 flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl transform hover:rotate-6 transition-transform border border-white/50">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span className="text-sm font-bold text-slate-900">4.9</span>
        </div>

        {/* Floating Middle Badges - Responsive layout to avoid overlap */}
        <div className="absolute bottom-[130px] left-4 right-4 z-30 flex flex-nowrap items-center justify-between gap-1.5 sm:bottom-[160px] sm:left-5 sm:right-5 sm:gap-4">
          <div className="location-badge inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 bg-black/50 backdrop-blur-md border border-white/20 rounded-full text-white font-bold text-[10px] sm:text-xs tracking-wider transition-all hover:bg-black/70 hover:scale-105 overflow-hidden">
            <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white/20 flex items-center justify-center border border-white/30 shrink-0">
              <MapPin className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
            </div>
            <span className="uppercase truncate max-w-[80px] sm:max-w-none">{item.region?.split("-").join(" ")}</span>
          </div>
          <div className="duration-badge px-3 py-1.5 sm:px-5 sm:py-2.5 bg-blue-600/95 backdrop-blur-md border border-white/40 rounded-full text-white font-bold text-[11px] sm:text-[14px] shadow-[0_10px_20px_rgba(37,99,235,0.4)] transition-all hover:scale-105 hover:shadow-blue-600/60 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 sm:w-4 h-4" />
            {item.days}D / {item.nights}N
          </div>
        </div>
        
        {/* Bottom Content Panel - Smooth Gradient for better text visibility */}
        <div 
          className="absolute bottom-0 left-0 right-0 px-7 pb-7 pt-28 z-20 bg-gradient-to-t from-black via-black/80 to-transparent"
        >
          <h2 className="text-lg sm:text-2xl font-bold text-white mb-2 leading-tight drop-shadow-lg line-clamp-1 tracking-tight">
            {item.packageTitle}
          </h2>

          {/* Highlights Section */}
          {/* <div className="space-y-1.5 mt-3">
            {baseHighlights.slice(0, 2).map((highlight, idx) => (
              <div key={idx} className="flex items-center gap-2 group/hl">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)]" />
                <p className="text-[11px] text-white/90 italic font-medium leading-tight tracking-tight line-clamp-1">
                  {highlight}
                </p>
              </div>
            ))}
          </div> */}
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex flex-col">
              {item.offerPrice > 0 || item.basePrice > 0 ? (
                <>
                  <div className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg flex items-baseline gap-1">
                    <span className="text-base sm:text-xl font-bold">₹</span>
                    {formatPrice(item.offerPrice > 0 ? item.offerPrice : item.basePrice)}
                  </div>
                  {item.offerPrice > 0 && (
                    <div className="text-xs text-white/60 line-through font-bold ml-1">
                      ₹{formatPrice(item.basePrice)}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg flex items-baseline gap-1 uppercase tracking-tight">
                   On Request
                </div>
              )}
            </div>
            
            <div className="cta-button w-12 h-12 rounded-2xl bg-white/90 shadow-xl flex items-center justify-center text-slate-900 transition-all duration-300 group-hover:translate-x-1 offset-x-[-4px] hover:scale-110 hover:bg-white">
              <ArrowRight className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Bottom Pagination container (to match reference visual) */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 swiper-pagination !static !w-auto h-1.5" />
      </Link>
    </div>
  );
};

export default PremiumPackageCard;
