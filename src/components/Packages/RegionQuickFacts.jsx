"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Sparkles } from "lucide-react";
import { useRegionFactSheet } from "@/hooks/regions";
import { getIcon, getColorClass } from "@/utils/iconMapping";

/**
 * RegionQuickFacts Component
 * A "Minimalist Classic" design that focuses on typography and clean information hierarchy.
 * Removes shadows, decorative backgrounds, and complex card containers.
 */
const RegionQuickFacts = ({ regionData, regionName, whyChooseData }) => {
  const [mounted, setMounted] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isDescExpanded, setIsDescExpanded] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { factSheetData, isLoading: factSheetLoading } = useRegionFactSheet(regionData?.id);

  // Helper to get icon config
  const getFactConfig = (label) => {
    const lowerLabel = label.toLowerCase();
    
    if (lowerLabel.includes('visit') || lowerLabel.includes('season') || (lowerLabel.includes('time') && !lowerLabel.includes('zone'))) {
      return { icon: "CalendarClock", label: "Best Season", color: "blue" };
    }
    if (lowerLabel.includes('currency') || lowerLabel.includes('money')) {
      return { icon: "Wallet", label: "Currency", color: "blue" };
    }
    if (lowerLabel.includes('climate') || lowerLabel.includes('weather')) {
      return { icon: "ThermometerSun", label: "Climate", color: "blue" };
    }
    if (lowerLabel.includes('time zone')) {
      return { icon: "Clock4", label: "Time Zone", color: "blue" };
    }
    if (lowerLabel.includes('safety')) {
      return { icon: "FileCheck", label: "Safety", color: "blue" };
    }
    if (lowerLabel.includes('language')) {
      return { icon: "Globe", label: "Language", color: "blue" };
    }
    if (lowerLabel.includes('visa')) {
      return { icon: "FileCheck", label: "Visa", color: "blue" };
    }
    if (lowerLabel.includes('capital')) {
      return { icon: "Building2", label: "Capital", color: "blue" };
    }
    if (lowerLabel.includes('population')) {
      return { icon: "Users", label: "Population", color: "blue" };
    }
    return { icon: "Info", label: label, color: "slate" };
  };

  const processedFacts = React.useMemo(() => {
    // 1. Use dynamic factsheet data if available
    const essentials = factSheetData?.essentials || factSheetData?.details?.essentials;
    if (essentials) {
      return essentials.map(fact => ({
        label: fact.label,
        value: fact.value,
        icon: getIcon(fact.icon),
        color: getColorClass(fact.color)
      }));
    }

    // 2. Use dynamic data from whyChooseData
    const quickFacts = whyChooseData?.quickFacts || whyChooseData?.details?.quickFacts;
    if (quickFacts) {
      return quickFacts.map(fact => {
        const config = getFactConfig(fact.label);
        return {
          ...fact,
          ...config,
          icon: getIcon(config.icon),
          color: getColorClass(config.color)
        };
      });
    }

    // 3. Use regionData quickFacts if available
    if (mounted && regionData?.quickFacts && Array.isArray(regionData.quickFacts)) {
      return regionData.quickFacts
        .filter(fact => !fact.label.toLowerCase().includes('insider'))
        .map(fact => {
          const config = getFactConfig(fact.label);
          return {
            ...fact,
            ...config,
            icon: getIcon(config.icon),
            color: getColorClass(config.color)
          };
        });
    }
    // No data available
    return [];
  }, [mounted, regionData, whyChooseData, factSheetData]);




  // Convert regionName to slug for URLs
  const regionSlug = regionName?.toLowerCase().replace(/\s+/g, '-');

  if (!mounted) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm shadow-slate-100/50 pt-8 pb-6">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left: Overview Section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            <div>
              <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-4">
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-blue-600 whitespace-nowrap">Destination Overview</span>
                <div className="h-[1.5px] md:h-[2px] flex-1 md:w-12 bg-blue-600/20" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-2 md:mb-4">
                About {factSheetData?.hero?.title || factSheetData?.details?.hero?.title || whyChooseData?.whyVisitSection?.mainTitle?.replace('Why Visit ', '') || whyChooseData?.details?.whyVisitSection?.mainTitle?.replace('Why Visit ', '') || regionName}
              </h2>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-slate-400 mb-4 md:mb-8 max-w-sm">
                {factSheetData?.hero?.subtitle || factSheetData?.details?.hero?.subtitle || whyChooseData?.whyVisitSection?.subTitle || whyChooseData?.details?.whyVisitSection?.subTitle || "Exploring the heart of the region"}
              </p>
              
              <div className="relative">
                <p className={cn(
                  "text-slate-600 text-sm lg:text-base leading-relaxed max-w-xl transition-all duration-300",
                  !isDescExpanded && "line-clamp-3"
                )}>
                  {factSheetData?.history?.description || factSheetData?.details?.history?.description || whyChooseData?.overview || whyChooseData?.details?.overview || whyChooseData?.whyVisit || regionData?.overview || "Discover the unique culture and landscapes of this incredible region."}
                </p>
                <button
                  onClick={() => setIsDescExpanded(!isDescExpanded)}
                  className="text-blue-600 text-xs font-bold uppercase tracking-wider mt-2 hover:text-blue-700 transition-colors"
                >
                  {isDescExpanded ? "Read Less" : "Read More"}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right: Facts Grid & Actions */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {processedFacts.map((fact, idx) => (
                <div 
                  key={idx}
                  className="flex flex-col gap-2 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50 hover:bg-white hover:border-blue-100 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-white border border-slate-100 group-hover:border-blue-100 transition-colors shadow-sm shadow-slate-100/50">
                      <fact.icon className={cn("w-5 h-5", fact.color)} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{fact.label}</span>
                  </div>
                  <div className="pl-0.5">
                    <span className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">{fact.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs Repositioned to Right */}
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 sm:gap-6">
              <div className="flex items-center justify-center gap-2 sm:gap-4 w-full sm:w-auto">
                <Link href={`/factsheet/${regionSlug}`}>
                  <div className="flex items-center justify-center gap-2 py-2.5 px-4 sm:py-3 sm:px-8 bg-slate-900 rounded-full group cursor-pointer hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-200/50 transition-all">
                    <span className="text-[9px] sm:text-xs font-bold uppercase tracking-widest text-white whitespace-nowrap">Factsheet</span>
                    <Zap className="w-3 sm:w-4 h-3 sm:h-4 text-amber-400 fill-amber-400 group-hover:scale-110 transition-transform" />
                  </div>
                </Link>
                <Link href={`/why-choose/${regionSlug}`}>
                  <div className="flex items-center justify-center gap-2 py-2.5 px-4 sm:py-3 sm:px-8 bg-amber-400 rounded-full group cursor-pointer hover:bg-amber-500 hover:shadow-lg hover:shadow-amber-200/50 transition-all">
                    <span className="text-[9px] sm:text-xs font-bold uppercase tracking-widest text-slate-900 whitespace-nowrap">Why Visit?</span>
                    <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 text-slate-900 group-hover:rotate-12 transition-transform" />
                  </div>
                </Link>
              </div>

              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-center gap-2 group cursor-pointer py-2.5 sm:py-0 sm:ml-auto"
              >
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">
                  {isExpanded ? "Less" : "Full Guide"}
                </span>
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                  <ArrowRight className={cn("w-3 sm:w-3.5 h-3 sm:h-3.5 text-blue-600 group-hover:translate-x-0.5 transition-transform", isExpanded ? "rotate-90" : "rotate-0")} />
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Section */}
        <motion.div
           initial={false}
           animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
           className="overflow-hidden"
        >
          <div className="mt-8 pt-8 pb-12 border-t border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-serif text-slate-900 mb-8 border-b border-blue-100 pb-3 inline-block">Why Choose {regionName}?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {(() => {
                  // Use dynamic factsheet reasons first, then whyChooseData
                  let reasons = null;
                  
                  if (factSheetData?.history?.cards || factSheetData?.details?.history?.cards) {
                    reasons = factSheetData?.history?.cards || factSheetData?.details?.history?.cards;
                  } else if (whyChooseData?.whyChooseReasons || whyChooseData?.details?.whyChooseReasons) {
                    reasons = whyChooseData?.whyChooseReasons || whyChooseData?.details?.whyChooseReasons;
                  }
                  
                  if (!reasons || reasons.length === 0) {
                    return null; // Don't show section if no data
                  }

                  return reasons.map((item, idx) => {
                    const IconComponent = getIcon(item.icon || 'Info');
                    const title = item.title || item.name;
                    const content = item.text || item.content;
                    
                    return (
                      <div key={idx} className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                          <IconComponent className={cn("w-5 h-5", getColorClass(item.color))} />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-1">{title}</h4>
                          <p className="text-sm text-slate-500 leading-tight line-clamp-3">{content}</p>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-slate-900 mb-8 border-b border-blue-100 pb-3 inline-block">Must-Experience Attractions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(() => {
                  // Use dynamic data from API
                  const attractions = whyChooseData?.mustExperienceAttractions;
                  
                  if (!attractions || attractions.length === 0) {
                    return null; // Don't show section if no data
                  }

                  return attractions.slice(0, 6).map((item, idx) => {
                    const IconComponent = getIcon(item.icon || 'Zap');
                    return (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 border border-slate-100 group hover:bg-white hover:shadow-sm transition-all">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center shrink-0 group-hover:border-blue-100 transition-colors">
                          <IconComponent className={cn("w-4 h-4", item.color || "text-blue-600")} />
                        </div>
                        <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">{item.text}</span>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegionQuickFacts;
