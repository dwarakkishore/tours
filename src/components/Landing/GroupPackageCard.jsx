"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  Clock, 
  ChevronRight, 
  Star,
  Compass
} from "lucide-react";
import BadgeSection from "@/components/BadgeSection";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/offerUtils";

const GroupPackageCard = ({ item, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Robust image scavenging logic (consistent with other cards)
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

  const displayImage = validImages[0]?.url || "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&auto=format&fit=crop&q=80";
  const href = `/packages/${item.region}/${item.packageSlug}?group=true`;



  // Split title if it contains "Group" for the blue accent
  const RenderTitle = () => {
    const title = item.packageTitle || "";
    if (title.toLowerCase().includes("group")) {
      const parts = title.split(/(Group)/i);
      return (
        <h2 className="text-xl md:text-2xl font-bold text-white drop-shadow-md leading-tight tracking-tight line-clamp-2">
          {parts[0]}<br className="hidden md:block" />
          <span className="text-blue-400">{parts[1]} {parts.slice(2).join("")}</span>
        </h2>
      );
    }
    return (
      <h2 className="text-xl md:text-2xl font-bold text-white drop-shadow-md leading-tight tracking-tight line-clamp-2">
        {title}
      </h2>
    );
  };

  return (
    <div 
      className={cn(
        "relative w-full h-[420px] md:h-[550px] rounded-[2.5rem] overflow-hidden bg-white shadow-2xl group cursor-pointer transition-all duration-500 hover:translate-y-[-8px]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={href} className="block w-full h-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={displayImage}
            alt={item.packageTitle || "Group Tour"}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />
          {/* Subtle Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 z-0" />
          <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/95 via-black/40 to-transparent z-0" />
        </div>

        {/* Top Badge Section */}
        <div className="absolute top-6 left-6 z-10">
          <BadgeSection item={item} />
        </div>

        {/* Bottom Content Area */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-6 flex flex-col gap-2 md:gap-3">
          {/* Location & Duration Tags */}
          <div className="flex items-center gap-3 mb-1">
            <div className="flex items-center gap-1.5 text-white text-[11px] font-bold uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <MapPin className="w-4 h-4 text-red-500 drop-shadow-sm" />
              <span>{(item.region || "").split("-").join(" ")}</span>
            </div>
            <span className="text-white/30">•</span>
            <div className="flex items-center gap-1.5 text-white text-[11px] font-bold uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <Clock className="w-4 h-4 text-blue-500 drop-shadow-sm" />
              <span>{item.days}D / {item.nights}N</span>
            </div>
          </div>

          {/* Title */}
          <div className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
            <RenderTitle />
          </div>

          {/* Divider */}
          <div className="w-16 h-1 bg-blue-600 rounded-full shadow-lg" />

          {/* Price & CTA Section */}
          <div className="flex items-end justify-between pt-2">
            <div className="flex flex-col">
              {item.offerPrice > 0 || item.basePrice > 0 ? (
                <>
                  <p className="text-white/90 text-[10px] font-bold tracking-[0.3em] uppercase drop-shadow-md">Starting from</p>
                  <div className="flex items-baseline gap-1 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
                    <span className="text-2xl md:text-3xl font-bold text-white tracking-tighter">
                      ₹{formatPrice(item.offerPrice > 0 ? item.offerPrice : item.basePrice)}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex items-baseline gap-1 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
                  <span className="text-xl md:text-2xl font-bold text-white tracking-tighter uppercase whitespace-nowrap">
                    On Request
                  </span>
                </div>
              )}
            </div>
            
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shadow-xl shadow-blue-900/40 hover:scale-110 transition-all">
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>
          

        </div>

        {/* Hover Reveal Extra Info */}
        <div className={cn(
          "absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center z-20 transition-all duration-500",
          item.highlights?.length > 0 ? "" : "hidden",
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
          <div className="w-16 h-16 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-6">
            <Compass className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-white text-xl font-bold mb-4 tracking-tight drop-shadow-md">
            The Journey Includes
          </h3>
          <ul className="space-y-3 mb-8">
            {item.highlights?.slice(0, 4).map((highlight, idx) => (
              <li key={idx} className="text-white/80 text-sm font-medium flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {highlight}
              </li>
            ))}
          </ul>
          <div className="px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-xs uppercase tracking-[0.2em] transform hover:scale-105 transition-all active:scale-95">
             Explore Itinerary
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GroupPackageCard;
