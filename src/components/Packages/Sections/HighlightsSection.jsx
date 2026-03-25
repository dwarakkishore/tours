import React, { useState, useEffect } from "react";
import { MapPin, Sparkles, ChevronDown, ChevronUp } from "lucide-react";

const HighlightsSection = ({ packageData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  if (!isMounted) return null;
  
  
  let highlightItems = [];
  
  // 1. Check sections (can be array or object in different database versions)
  if (packageData?.sections) {
    if (Array.isArray(packageData.sections)) {
      const section = packageData.sections.find(s => 
        s.id === "major_activities" || s.id === "package_highlights" || s.id === "highlights" || s.id === "major_highlights"
      );
      if (section?.items) highlightItems = section.items;
    } else {
      highlightItems = packageData.sections.major_activities || 
                       packageData.sections.package_highlights || 
                       packageData.sections.highlights || 
                       packageData.sections.major_highlights || [];
    }
  }

  // 2. Fallback to top-level fields if sections didn't provide anything
  if (highlightItems.length === 0) {
    highlightItems = packageData?.highlights || packageData?.major_highlights || [];
  }

  // 3. Filter out empty items
  const cleanedHighlights = highlightItems
    .map(item => item
      .replace(/^\\item\s*/, "")
      .replace(/\\/g, "")
      .replace(/^["'\s]+|["'\s]+,?$/g, "")
      .replace(/\*+/g, "")
      .trim()
    )
    .filter(item => item.length > 0);

  if (cleanedHighlights.length === 0) {
    return null;
  }

  const limit = isMobile ? 4 : 6;
  const visibleItems = isExpanded ? cleanedHighlights : cleanedHighlights.slice(0, limit);


  return (
    <div id="highlights-section" className="md:bg-white md:rounded-[2rem] p-0 md:p-8 md:border md:border-slate-100 md:shadow-sm scroll-mt-32">
      {/* Standard Header */}
      <div className="mb-6 md:mb-8 md:px-0">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-2 md:mb-4 leading-tight">
          Major <span className="text-brand-blue">Highlights</span>
        </h2>
        <p className="text-slate-500 text-sm md:text-xl font-medium">Key experiences crafted for your journey</p>
      </div>
      
      {/* Simple List of Highlights - No Boxes */}
      <div className="space-y-4 md:px-0">
        <div className="relative">
          {/* Stylish Gradient Vertical Divider - Mobile Only */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-brand-blue/80 to-transparent -translate-x-1/2 md:hidden" />

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-0 lg:gap-x-12 gap-y-1 lg:gap-y-8">
          {visibleItems.map((item, index) => (
            <div 
              key={index} 
              className={`relative flex items-start gap-2 group pb-0 md:pb-0 
                ${(index % 2 === 0) ? 'pr-4 md:pr-0' : 'pl-4 md:pl-0'}`}
            >
              <div className="flex-shrink-0 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 transition-colors"></div>
              </div>
              <div className="min-w-0 flex-1 text-sm md:text-base leading-snug font-bold text-slate-900">
                <span className="transition-colors">
                  {item}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* Minimal Read More / Show Less Button */}
        {highlightItems.length > limit && (
          <div className="pt-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group flex justify-end items-center gap-1 text-brand-blue font-bold text-[10px] md:text-xs uppercase tracking-widest w-full pt-4 border-t border-slate-50"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span>Collapse Highlights</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span>Expand {highlightItems.length - limit} More Highlights</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HighlightsSection;
