"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn, normalizeImageUrl } from "@/lib/utils";
import { formatPrice } from "@/utils/offerUtils";
import BadgeSection from "@/components/BadgeSection";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const LandingPackageCard = ({ item, className, isGroup = false }) => {
  const [swiper, setSwiper] = useState(null);

  // Use the robust image scavenging logic
  const validImages = useMemo(() => {
    const scavenger = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      return [val];
    };

    const rawImages = [
      ...scavenger(item.cardImages),
      ...scavenger(item.bannerImages),
      ...scavenger(item.images),
      ...scavenger(item.imageRefs),
      ...scavenger(item.itineraries?.flatMap(it => it.imageRefs || [])),
      ...(item.cardImage ? [{ url: item.cardImage }] : []),
      ...(item.cardImageRef ? [{ url: item.cardImageRef }] : []),
      ...(item.bannerImage ? [{ url: item.bannerImage }] : []),
      ...(item.image ? [{ url: item.image }] : []),
      ...(item.imageUrl ? [{ url: item.imageUrl }] : []),
      ...(item.featuredImage ? [{ url: item.featuredImage }] : []),
    ];

    const seen = new Set();
    return rawImages
      .map(img => {
        const url = typeof img === "string" ? img : img?.url;
        return url ? { url } : null;
      })
      .filter(img => {
        if (!img?.url || seen.has(img.url)) return false;
        seen.add(img.url);
        return true;
      });
  }, [item]);

  const href = isGroup
    ? `/packages/${item.region}/${item.packageSlug}?group=true`
    : `/packages/${item.region}/${item.packageSlug}`;

  return (
    <div className={cn(
      "block relative overflow-hidden rounded-2xl md:rounded-3xl group h-[380px] sm:h-[450px] shadow-lg hover:shadow-2xl transition-all duration-500",
      className
    )}>
      <Link href={href} className="block w-full h-full" prefetch={false}>
        {/* Swiper Background */}
        <div className="absolute inset-0 bg-slate-900">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            onSwiper={setSwiper}
            loop={validImages.length > 1}
            autoplay={false}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !size-1.5 !bg-white !opacity-50",
              bulletActiveClass: "!opacity-100 !w-4 !rounded-full transition-all",
            }}
            className="h-full w-full"
          >
            {validImages.length > 0 ? (
              validImages.map((img, i) => (
                <SwiperSlide key={i}>
                  <Image
                    src={normalizeImageUrl(img.url)}
                    alt={item.packageTitle || "Package"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                  <span className="text-white/20">No Images</span>
                </div>
              </SwiperSlide>
            )}
          </Swiper>

          {/* Custom Navigation */}
          {validImages.length > 1 && (
            <>
              <button 
                className="absolute left-3 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-black/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/40 hidden sm:flex"
                onClick={(e) => { e.preventDefault(); swiper?.slidePrev(); }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                className="absolute right-3 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-black/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/40 hidden sm:flex"
                onClick={(e) => { e.preventDefault(); swiper?.slideNext(); }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
        </div>

        {/* Badges - Top left */}
        <div className="absolute top-3 left-3 z-30">
          <BadgeSection item={item} />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 z-30 p-4 sm:p-6 flex flex-col justify-end">
          {/* Top meta: Region + Duration */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm transition-colors group-hover:bg-white/20">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                {(item.region || "").split("-").join(" ")}
              </span>
            </div>
            <div className="px-3 py-1 rounded-full bg-brand-blue/90 backdrop-blur-sm shadow-md border border-white/10">
              <span className="text-[10px] font-bold text-white whitespace-nowrap">
                {item.days}D / {item.nights}N
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-xl font-bold text-white mb-3 line-clamp-2 leading-tight drop-shadow-md">
            {item.packageTitle}
          </h3>

          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {(item.offerPrice > 0 || item.basePrice > 0) ? (
                <>
                  <span className="text-lg sm:text-2xl font-bold text-white drop-shadow-md">
                    ₹{formatPrice(item.offerPrice > 0 ? item.offerPrice : item.basePrice)}
                  </span>
                  {item.offerPrice > 0 && (
                    <span className="text-[10px] text-white/50 line-through">
                      ₹{formatPrice(item.basePrice)}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-sm font-bold text-white/80 uppercase">On Request</span>
              )}

            </div>
            
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-brand-blue group-hover:border-transparent group-hover:rotate-12 group-hover:scale-110">
              <ChevronRight className="w-6 h-6" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LandingPackageCard;
