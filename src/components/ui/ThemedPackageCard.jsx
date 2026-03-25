"use client";

import React, { useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import {
  Heart,
  MapPin,
  Clock,
  ChevronRight,
  Star,
  Users,
  Compass,
  Crown,
  Smile,
  Church,
  University,
  Mountain,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/offerUtils";
import BadgeSection from "@/components/BadgeSection";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ThemedPackageCard = ({ item, theme = "romantic", className, isGroup = false }) => {
  const cardRef = useRef(null);

  const themeStyles = {
    romantic: {
      // Elegant pink overlap – Poppins + soft gradients
      card: "bg-gradient-to-br from-[#fff5f7] to-[#ffe8ec] rounded-[30px] shadow-[0_20px_60px_rgba(255,105,135,0.25)] hover:-translate-y-2 transition-transform duration-400",
      imageOverlay: "bg-gradient-to-b from-black/20 to-transparent",
      ratingBadge: "bg-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-[#333] font-semibold text-xs",
      heart: "text-[#ff6b9d] text-base",
      locationBadge: "bg-[#3c3c3c]/85 backdrop-blur-lg text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-[13px] font-medium bottom-5 left-5",
      durationBadge: "bg-[#ff6b9d] text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold bottom-5 right-5",
      title: "font-poppins text-xl sm:text-2xl text-[#2d1b1b] font-bold leading-tight mb-2",
      highlightBullet: "text-[#ff6b9d] text-lg leading-none",
      highlightText: "text-[#666] italic text-sm sm:text-xs",
      priceLabel: "text-[10px] sm:text-[11px] text-[#999] uppercase tracking-widest mb-0.5 font-bold",
      price: "font-poppins text-2xl sm:text-3xl text-[#c44569] font-bold",
      cta: "bg-gradient-to-br from-[#ff6b9d] to-[#c44569] text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-[0_8px_20px_rgba(255,107,157,0.3)] hover:shadow-[0_12px_30px_rgba(255,107,157,0.4)] hover:-translate-y-0.5 transition-all text-lg",
    },

    group: {
      // Bold geometric – Poppins + orange energy
      card: "bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:scale-[1.02] transition-transform duration-400 overflow-hidden",
      imageOverlay: "bg-gradient-to-b from-black/20 to-transparent",
      ratingBadge: "bg-white px-3 py-1.5 rounded-lg shadow-[4px_4px_0_rgba(0,0,0,0.1)] flex items-center gap-1.5 text-xs",
      locationBadge: "bg-[#2d3142]/90 backdrop-blur-lg text-white px-3 py-1.5 rounded-lg font-poppins text-sm tracking-wide bottom-5 left-5",
      durationBadge: "bg-[#FF6B35] text-white px-3 py-1.5 rounded-lg font-poppins text-sm tracking-wide bottom-5 right-5",
      title: "font-poppins text-2xl sm:text-3xl text-[#2D3142] leading-none mb-2 tracking-wide",
      highlightBullet: "text-[#FF6B35] text-lg leading-none",
      highlightText: "text-[#666] text-sm sm:text-xs",
      priceLabel: "font-poppins text-[10px] sm:text-[11px] text-[#999] tracking-widest mb-0.5 font-bold",
      price: "font-poppins text-2xl sm:text-3xl text-[#2D3142] tracking-wide font-bold",
      cta: "bg-[#FF6B35] text-white rounded-[10px] w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-[4px_4px_0_rgba(0,0,0,0.1)] hover:shadow-[6px_6px_0_rgba(0,0,0,0.15)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-lg",
    },

    family: {
      // Playful asymmetric – Poppins + bright colors
      card: "bg-gradient-to-br from-[#FEF9E7] to-[#FCF3CF] rounded-[40px_10px_40px_10px] border-4 border-[#F39C12] shadow-[0_15px_50px_rgba(243,156,18,0.2)] hover:rotate-[-1deg] hover:scale-[1.02] transition-transform duration-400",
      imageOverlay: "bg-gradient-to-b from-black/20 to-transparent",
      ratingBadge: "bg-white px-3 py-1.5 rounded-[20px_5px_20px_5px] border-2 border-[#F39C12] shadow-lg flex items-center gap-1.5 text-xs",
      locationBadge: "bg-[#27ae60]/90 backdrop-blur-lg text-white px-3 py-1.5 rounded-[25px_5px_25px_5px] font-poppins text-[13px] -rotate-2 bottom-5 left-5",
      durationBadge: "bg-[#E74C3C] text-white px-3 py-1.5 rounded-[5px_25px_5px_25px] font-poppins text-xs rotate-2 bottom-5 right-5",
      title: "font-poppins text-xl sm:text-2xl text-[#2C3E50] mb-2 leading-tight drop-shadow-[1px_1px_0_rgba(243,156,18,0.2)]",
      highlightBullet: "text-[#F39C12] text-lg leading-none",
      highlightText: "text-[#666] text-sm sm:text-xs",
      priceLabel: "font-poppins text-[10px] sm:text-[11px] text-[#999] mb-0.5 font-bold",
      price: "font-poppins text-2xl sm:text-3xl text-[#27AE60] font-bold",
      cta: "bg-gradient-to-br from-[#E74C3C] to-[#C0392B] text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-[0_6px_20px_rgba(231,76,60,0.3)] hover:shadow-[0_10px_30px_rgba(231,76,60,0.4)] hover:rotate-90 hover:-translate-y-1 transition-all text-lg",
    },

    educational: {
      // Clean academic look
      card: "bg-white rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.08)] border-l-8 border-[#3498DB] hover:translate-x-1 transition-transform duration-400",
      imageOverlay: "bg-gradient-to-b from-black/20 to-transparent",
      ratingBadge: "bg-white px-3 py-1.5 rounded flex items-center gap-1.5 text-xs",
      locationBadge: "bg-[#2c3e50]/90 backdrop-blur-lg text-white px-4 py-2 rounded font-poppins uppercase tracking-wide text-[11px] bottom-5 left-5",
      durationBadge: "bg-[#3498DB] text-white px-4 py-2 rounded font-poppins text-[11px] bottom-5 right-5",
      title: "font-poppins text-xl sm:text-2xl text-[#2C3E50] mb-2 leading-tight",
      highlightBullet: "text-[#3498DB] text-lg leading-none",
      highlightText: "text-[#666] text-sm sm:text-xs",
      priceLabel: "font-poppins text-[10px] sm:text-[11px] text-[#95A5A6] uppercase tracking-wide mb-0.5",
      price: "font-poppins text-2xl sm:text-3xl text-[#2C3E50] font-bold",
      cta: "bg-[#3498DB] text-white rounded w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-[#2980B9] hover:shadow-[0_6px_20px_rgba(52,152,219,0.3)] hover:-translate-y-0.5 transition-all text-lg",
    },

    religious: {
      // Serene spiritual – Poppins + gold-brown
      card: "bg-gradient-to-b from-[#F8F9FA] to-[#E9ECEF] rounded shadow-[0_20px_60px_rgba(0,0,0,0.12)] border-t-8 border-[#8B7355] hover:-translate-y-1 transition-transform duration-400",
      imageOverlay: "bg-gradient-to-b from-black/20 to-transparent",
      ratingBadge: "bg-white px-3 py-1.5 rounded flex items-center gap-1.5 text-xs",
      locationBadge: "bg-[#3e2723]/85 backdrop-blur-lg text-[#D7CCC8] px-4 py-2 rounded font-poppins uppercase tracking-wider text-[11px] bottom-5 left-5",
      durationBadge: "bg-[#8B7355] text-white px-4 py-2 rounded font-poppins uppercase tracking-wider text-[11px] bottom-5 right-5",
      title: "font-poppins text-2xl sm:text-3xl text-[#3E2723] mb-3 text-center leading-tight font-bold",
      highlightBullet: "text-[#8B7355] text-lg leading-none",
      highlightText: "text-[#666] text-sm sm:text-xs",
      priceLabel: "font-poppins text-[10px] sm:text-[11px] text-[#999] uppercase tracking-widest mb-0.5",
      price: "font-poppins text-2xl sm:text-3xl text-[#3E2723] font-bold",
      cta: "bg-[#8B7355] text-white rounded w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-[#6D4C41] hover:shadow-[0_8px_25px_rgba(139,115,85,0.3)] transition-all text-lg",
    },


    exploration: {
      items: "bg-white border-2 border-transparent hover:border-terra-500/20 hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden",
      card: "bg-white border-2 border-transparent hover:border-[#E07A5F]/20 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden",
      imageOverlay: "bg-gradient-to-b from-black/20 to-transparent",
      ratingBadge: "bg-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-xs",
      locationBadge: "bg-[#3D405B]/90 backdrop-blur-sm text-[#F4F1DE] px-4 py-2 rounded-lg font-poppins uppercase tracking-wider text-[11px] bottom-5 left-5",
      durationBadge: "bg-[#E07A5F] text-white px-4 py-2 rounded-lg font-poppins uppercase tracking-wider text-[11px] bottom-5 right-5",
      title: "font-poppins text-xl sm:text-2xl text-[#3D405B] font-bold tracking-tight mb-2",
      highlightBullet: "text-[#E07A5F] text-lg leading-none",
      highlightText: "text-[#666] font-medium text-sm sm:text-xs",
      priceLabel: "font-poppins text-[10px] sm:text-[11px] text-[#81B29A] font-bold uppercase tracking-widest mb-0.5",
      price: "font-poppins text-2xl sm:text-3xl text-[#E07A5F] font-bold",
      cta: "bg-[#3D405B] text-white hover:bg-[#E07A5F] transition-colors rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center p-0 text-lg",
    },

    // Add solo, elite, relax, exploration... similarly following the reference
    // (shortened here for brevity — follow same pattern: font family, colors, badge shape, cta style)

    solo: {
      card: "bg-[#1A1A1A] rounded-none shadow-[0_25px_70px_rgba(0,0,0,0.4)] hover:scale-[1.03] transition-transform duration-400 relative",
      verticalAccent: <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-[#FFD700] to-[#FFA500] z-10" />,
      imageOverlay: "bg-gradient-to-b from-black/30 to-transparent",
      ratingBadge: "bg-white px-3 py-1.5 rounded flex items-center gap-2 text-xs",
      locationBadge: "bg-[#1a1a1a]/90 backdrop-blur-lg text-[#FFD700] px-4 py-2 rounded font-poppins uppercase tracking-wider text-[11px] bottom-5 left-5",
      durationBadge: "bg-[#FFD700] text-[#1A1A1A] px-4 py-2 rounded font-poppins uppercase tracking-wider text-[11px] bottom-5 right-5",
      title: "font-poppins text-2xl sm:text-3xl text-white mb-2 tracking-[-1px] leading-none",
      highlightBullet: "text-[#FFD700] text-lg leading-none",
      highlightText: "text-white/80 text-sm font-light",
      priceLabel: "font-poppins text-[10px] sm:text-[11px] text-white/60 uppercase tracking-widest mb-0.5",
      price: "font-poppins text-2xl sm:text-3xl text-white tracking-[-1px] font-bold",
      cta: "bg-[#FFD700] text-[#1A1A1A] rounded w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-white hover:translate-x-1 transition-all text-lg",
    },

    // ... continue for elite, relax, exploration with matching fonts/colors/shapes from reference
    elite: {
      card: "bg-gradient-to-br from-[#faf9f7] to-[#f5f3f0] rounded-xl shadow-[0_20px_60px_rgba(212,175,55,0.15)] hover:-translate-y-2 transition-transform duration-500 border border-[#d4af37]/20",
      imageOverlay: "bg-gradient-to-b from-black/20 to-transparent",
      ratingBadge: "bg-[#1a1a1a] px-3 py-1.5 rounded-none border border-[#d4af37] shadow-lg flex items-center gap-1.5 text-white font-serif text-xs",
      locationBadge: "bg-[#faf9f7]/90 backdrop-blur-lg text-[#1a1a1a] px-4 py-2 rounded-none border-l-2 border-[#d4af37] font-poppins uppercase tracking-widest text-[10px] bottom-5 left-5",
      durationBadge: "bg-[#d4af37] text-white px-4 py-2 rounded-none font-poppins uppercase tracking-widest text-[10px] bottom-5 right-5",
      title: "font-poppins text-xl sm:text-2xl text-[#1a1a1a] font-medium leading-tight mb-2 italic",
      highlightBullet: "text-[#d4af37] text-lg leading-none",
      highlightText: "text-[#5a5a5a] font-serif text-sm italic",
      priceLabel: "font-poppins text-[10px] sm:text-[11px] text-[#8b7355] uppercase tracking-[0.2em] mb-0.5",
      price: "font-poppins text-2xl sm:text-3xl text-[#1a1a1a] font-bold",
      cta: "bg-[#1a1a1a] text-[#d4af37] border border-[#d4af37] rounded-none w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-[#d4af37] hover:text-[#1a1a1a] transition-all duration-500 text-lg",
    },

    relax: {
      card: "bg-[#fdfaf6] rounded-[2rem] shadow-[0_15px_40px_rgba(120,113,108,0.1)] hover:shadow-[0_20px_50px_rgba(120,113,108,0.15)] hover:-translate-y-1 transition-all duration-700",
      imageOverlay: "bg-gradient-to-b from-black/20 to-transparent",
      ratingBadge: "bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[#57534e] flex items-center gap-1.5 text-xs shadow-sm",
      locationBadge: "bg-[#e7e5e4]/80 backdrop-blur-md text-[#44403c] px-4 py-2 rounded-full font-sans text-[11px] tracking-wide bottom-5 left-5",
      durationBadge: "bg-[#78716c] text-[#f5f5f4] px-4 py-2 rounded-full font-sans text-[11px] tracking-wide bottom-5 right-5",
      title: "font-poppins text-xl sm:text-2xl text-[#292524] mb-2 leading-relaxed tracking-tight",
      highlightBullet: "text-[#a8a29e] text-lg leading-none",
      highlightText: "text-[#78716c] font-light text-sm",
      priceLabel: "font-poppins text-[10px] sm:text-[11px] text-[#a8a29e] uppercase tracking-widest mb-0.5",
      price: "font-poppins text-2xl sm:text-3xl text-[#44403c] font-bold",
      cta: "bg-[#e7e5e4] text-[#44403c] rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-[#d6d3d1] transition-colors duration-500 text-lg",
    },
  };

  const style = themeStyles[theme] || themeStyles.romantic;

  // ────────────────────────────────────────────────
  // Image logic (unchanged)
  const validImages = useMemo(() => {
    const scavenger = (val) => (!val ? [] : Array.isArray(val) ? val : [val]);
    const raw = [...scavenger(item.cardImages), item.cardImage, item.cardImageRef].filter(Boolean);
    const seen = new Set();
    return raw
      .map((img) => (typeof img === "string" ? img : img?.url))
      .filter((url) => url && !seen.has(url) && seen.add(url));
  }, [item.cardImages, item.cardImage, item.cardImageRef]);

  const regionSlug = useMemo(() => {
    if (item.regionSlug) return item.regionSlug;
    if (!item.region) return "unknown";
    return item.region.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
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
        // If we have real highlights, we just prepend
        ...(item.highlights && item.highlights.length > 0 ? item.highlights.slice(0, 2) : rawHighlights.slice(1))
      ].slice(0, 3);
    }
    return rawHighlights;
  }, [item.highlights, item.citiesList, item.location, item.region]);

  return (
    <motion.div
      transition={{ duration: 0.6 }}
      className="h-full"
    >
      <Link href={href} className="block h-full group">
        <div className={cn("relative overflow-hidden h-full flex flex-col", style.card, className)}>
          {/* Image Area */}
          <div className="relative h-[340px] overflow-hidden">
            {style.verticalAccent}

            <Swiper
              modules={[Navigation, Autoplay, Pagination]}
              loop={validImages.length > 1}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              navigation={{
                nextEl: `.next-${item.id}`,
                prevEl: `.prev-${item.id}`,
              }}
              className="h-full"
            >
              {validImages.length > 0 ? (
                validImages.map((url, i) => (
                  <SwiperSlide key={i}>
                    <Image
                      src={url}
                      alt={item.packageTitle}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </SwiperSlide>
                ))
              ) : (
                <div className="h-full bg-slate-100 flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-slate-300" />
                </div>
              )}
            </Swiper>

            <div className={cn("absolute inset-0 z-10 pointer-events-none", style.imageOverlay)} />

            {/* Badges & Controls */}
            <div className="absolute top-5 right-5 z-20">
              <div className={style.ratingBadge}>
                {theme === "romantic" ? (
                  <Heart className={style.heart || "w-6 h-6 fill-current"} />
                ) : (
                  <Star className="w-5 h-5" fill="currentColor" />
                )}
                <span>4.9</span>
              </div>
            </div>

            <div className={cn("absolute z-20 flex justify-between w-full px-5", style.locationBadge?.includes("bottom") ? "bottom-5" : "")}>
              <div className={cn("flex items-center gap-3", style.locationBadge)}>
                <MapPin className="w-5 h-5" />
                <span className="capitalize">{item.location || regionSlug.replace(/-/g, " ")}</span>
              </div>

              <div className={cn("flex items-center gap-3", style.durationBadge)}>
                <Clock className="w-5 h-5" />
                <span>
                  {item.days}D / {item.nights}N
                </span>
              </div>
            </div>

            {validImages.length > 1 && (
              <>
                <button
                  aria-label="Previous image"
                  className={`prev-${item.id} absolute left-4 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white transition-all`}
                >
                  ←
                </button>
                <button
                  aria-label="Next image"
                  className={`next-${item.id} absolute right-4 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white transition-all`}
                >
                  →
                </button>
              </>
            )}
          </div>

          {/* Content */}
          <div className="pt-1.5 sm:pt-2 px-5 sm:px-8 pb-3 sm:pb-5 flex-1 flex flex-col">
            <h3 
              className={cn(style.title, "line-clamp-2")} 
              title={item.packageTitle}
            >
              {item.packageTitle?.replace(/^["']|["']$/g, '')}
            </h3>

            <div className="space-y-3 mb-8">
              {baseHighlights.slice(0, 3).map((hl, i) => {
                const isCovering = hl.startsWith("Covering:");
                return (
                  <div key={i} className="flex items-start gap-3">
                    <span className={style.highlightBullet}>●</span>
                    <span className={cn(
                      style.highlightText,
                      "not-italic"
                    )}>
                      {isCovering ? (
                        <>
                          <span className={cn("font-bold mr-1", style.highlightBullet.includes("text-") ? style.highlightBullet : "")}>Covering:</span>
                          <span className={style.highlightText}>
                            {hl.replace("Covering:", "").trim()}
                          </span>
                        </>
                      ) : (
                        hl
                      )}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-auto pt-6 border-t flex items-center justify-between border-opacity-20">
              <div>
                <p className={style.priceLabel}>CURATED PRICE</p>
                <p className={style.price}>
                  {item.offerPrice > 0 || item.basePrice > 0 
                    ? `₹${formatPrice(item.offerPrice > 0 ? item.offerPrice : item.basePrice)}` 
                    : "On Request"}
                </p>
              </div>

              <button className={cn("transform group-hover:scale-110 transition-transform", style.cta)}>
                <ChevronRight className="w-8 h-8 stroke-[3px]" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ThemedPackageCard;