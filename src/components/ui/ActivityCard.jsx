"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Star, 
  ChevronUp, 
  X,
  ChevronRight,
  MapPin,
  Navigation as NavigationIcon,
  Camera,
  Package,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ActivityCard - A premium card design used for activities, cities, and more.
 * Features a full-image overlay with badges, title, and flip interaction.
 * 
 * @param {Object} data - Card data (name, title, description, image, badge, etc.)
 * @param {string} hoverGradient - Tailwind class for the hover overlay background (default: green)
 * @param {string} ctaLabel - Label for the action button (default: View Packages)
 * @param {Function} onCtaClick - Optional callback for CTA button click
 */
const ActivityCard = ({ 
  data, 
  hoverGradient = "from-brand-blue/95 to-brand-blue",
  ctaLabel = "View Packages",
  onCtaClick,
  secondaryCtaLabel,
  onSecondaryCtaClick,
  onCardClick
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = data.icon || MapPin;

  const handleCardClick = (e) => {
    // Priority 1: Use onCardClick if provided
    if (onCardClick) {
      onCardClick(data);
      return;
    }
    
    // Priority 2: Use onCtaClick if provided (legacy support for "whole card is link")
    if (onCtaClick && window.innerWidth > 768) {
      onCtaClick(data);
      return;
    }

    setIsExpanded(!isExpanded);
  };

  const handleCtaClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onCtaClick) {
      onCtaClick(data);
    }
  };

  const handleSecondaryCtaClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSecondaryCtaClick) {
      onSecondaryCtaClick(data);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 shadow-2xl h-[400px] md:h-[420px]"
    >
      {/* Background Image - Full Card */}
      <div className="absolute inset-0">
        {data.image ? (
          <img
            src={data.image}
            alt={data.title || data.name}
            className="w-full h-full object-cover transition-transform duration-700 scale-105"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center">
            <Sparkles className="w-16 h-16 text-slate-300" />
          </div>
        )}
      </div>

      {/* Simple Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />

      {/* Front Face Content */}
      <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between">
        {/* Top Badges */}
        <div className="flex items-start justify-between gap-3">
          {/* Primary Badge (City/Location Name) */}
          <div className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm flex items-center gap-1.5 shadow-md">
            <Icon className="w-3.5 h-3.5 text-slate-700" />
            <span className="text-xs font-bold text-slate-900 uppercase">{data.badge || data.name}</span>
          </div>

          {/* Secondary Badge (Region Name) */}
          {data.regionName && (
            <div className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase shadow-md flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>{data.regionName}</span>
            </div>
          )}
        </div>

        {/* Bottom Content */}
        <div className="space-y-3 relative">
          {/* Mobile Expand Toggle */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="md:hidden absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-lg active:scale-95 transition-all z-30 border border-white/30"
          >
            {isExpanded ? (
              <X className="w-5 h-5" />
            ) : (
              <ChevronUp className="w-6 h-6 animate-bounce" />
            )}
          </button>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-lg mb-1 line-clamp-1">
            {data.title || data.name}
          </h3>

          {/* Mobile CTA Buttons (Directly on Card) */}
          <div className="md:hidden flex flex-row gap-2 pt-1">
            <button 
              onClick={handleCtaClick}
              className="flex-1 px-2 py-3 rounded-xl bg-gradient-to-r from-yellow-400/90 to-yellow-500/90 backdrop-blur-md shadow-lg text-slate-900 font-bold uppercase tracking-widest text-[11px] transition-all active:scale-95 whitespace-nowrap"
            >
              {ctaLabel}
            </button>
            {secondaryCtaLabel && (
              <button 
                onClick={handleSecondaryCtaClick}
                className="flex-1 px-2 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold uppercase tracking-widest text-[11px] transition-all active:scale-95 flex items-center justify-center gap-1 whitespace-nowrap"
              >
                <MapPin className="w-3.5 h-3.5" />
                {secondaryCtaLabel}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Flip Overlay (More Info) */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-b transition-all duration-500 z-40",
        hoverGradient,
        isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full md:group-hover:opacity-100 md:group-hover:translate-y-0"
      )}>
        <div className="h-full p-5 md:p-6 flex flex-col">
          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-xl md:text-2xl font-bold text-white leading-tight line-clamp-1">
                  {data.title || data.name}
                </h4>
                <p className="text-xs font-bold text-white/70 uppercase tracking-widest mt-1">
                  {data.badge || "Activity"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Icon className="w-6 h-6 text-white/80 flex-shrink-0" />
                {/* Mobile Close Button */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                  className="md:hidden p-1 rounded-full bg-white/20 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Full Description */}
            {data.description && (
              <p className="text-white/95 text-sm leading-relaxed mb-4">
                {data.description}
              </p>
            )}

            {/* Highlights/Details */}
            <div className="space-y-3">
              <h5 className="text-sm font-bold text-white/90 uppercase tracking-wider">
                {data.highlightsTitle || "Top Attractions:"}
              </h5>
              <ul className="space-y-2 text-white/90 text-sm">
                {data.highlights?.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                )) || (
                  <>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Historical landmarks & architecture</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Local artisan markets</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Related Packages Context */}
            {data.relatedPackages && data.relatedPackages.length > 0 && (
              <div className="mt-6 pt-4 border-t border-white/20">
                <h5 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  Available In Packages:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {data.relatedPackages.map((pkg, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 rounded bg-white/10 border border-white/20 text-[11px] font-bold text-white/90 hover:bg-white/20 transition-colors"
                    >
                      {pkg}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer - CTA */}
          <div className="pt-4 border-t border-white/20 flex flex-col gap-2">
            <button 
              onClick={handleCtaClick}
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg text-slate-900 font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              {ctaLabel}
            </button>
            {secondaryCtaLabel && (
              <button 
                onClick={handleSecondaryCtaClick}
                className="w-full px-6 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:bg-white/20 active:scale-95 flex items-center justify-center gap-2"
              >
                <MapPin className="w-3 h-3" />
                {secondaryCtaLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
