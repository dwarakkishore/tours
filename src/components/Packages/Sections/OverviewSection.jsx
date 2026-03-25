import React, { useState, useEffect } from "react";
import Image from "next/image";
import { splitCityStr, cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

const OverviewSection = ({ packageData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHighlightsExpanded, setIsHighlightsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cities = splitCityStr(packageData?.citiesList) || [];
  
  const highlights = Array.isArray(packageData?.highlights) && packageData.highlights.length > 0 
    ? packageData.highlights 
    : [];

  if (!isMounted) return null;

  const highlightsItems = (packageData?.sections?.find(s => s.id === "package_highlights")?.items || [])
    .map(item => item
      .replace(/^\\item\s*/, "")
      .replace(/\\/g, "")
      .replace(/^["'\s]+|["'\s]+,?$/g, "")
      .replace(/\*+/g, "")
      .trim()
    )
    .filter(item => item.length > 0);

  const overviewSection = packageData?.sections?.find(s => s.id === "package_overview");
  const paragraphs = (overviewSection?.content || (packageData?.description || "").split(/\n\s*\n|\n/).filter(Boolean))
    .map(p => p.replace(/^["'\s]+|["'\s]+,?$/g, "").trim())
    .filter(p => p.length > 0);

  if (highlightsItems.length === 0 && paragraphs.length === 0) {
    return null;
  }

  const limit = isMobile ? 4 : 6;
  const visibleHighlights = isHighlightsExpanded ? highlightsItems : highlightsItems.slice(0, limit);

  // Read More Logic: Show only if text is long or many paragraphs
  const totalLength = paragraphs.join(" ").length;
  const showReadMore = paragraphs.length > 2 || (paragraphs.length === 1 && totalLength > 300);

  return (
    <div className="space-y-4">

      {/* 2. Quick Facts & About Section */}
      <div className="md:bg-white md:rounded-[2rem] p-0 md:p-8 md:border md:border-slate-100 md:shadow-sm relative overflow-hidden scroll-mt-32">
        <div className="absolute right-0 top-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32" />
        
        {/* 2a. Package Highlights Sub-section */}
        {highlightsItems.length > 0 && (
          <div className={cn("mb-6 pb-[15px]", paragraphs.length > 0 && "border-b border-slate-100")}>
            <div className="mb-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-2 md:mb-4 leading-tight">
                Package <span className="text-brand-blue">Highlights</span>
              </h2>
              <p className="text-slate-500 text-sm md:text-xl font-medium">Quick facts and details about your journey</p>
            </div>
            
            <div className="md:mx-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 md:px-0 md:gap-y-6">
                {visibleHighlights.map((cleanedItem, idx) => {
                  const match = cleanedItem.match(/^(.*?):\s*(.*)/);
                  
                  let label = "";
                  let value = cleanedItem;
                  
                  if (match) {
                    label = match[1].trim();
                    value = match[2].trim();
                  }

                  return (
                    <div key={idx} className="flex items-start gap-3 group">
                      <div className="flex-shrink-0 mt-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 transition-colors"></div>
                      </div>
                      <div className="min-w-0 flex-1 text-sm md:text-base leading-relaxed font-bold text-slate-900">
                        {label ? (
                          <>
                            <span className="transition-colors font-bold">
                              {label}:
                            </span>
                            <span className="ml-1">
                              {value}
                            </span>
                          </>
                        ) : (
                          <span className="transition-colors">
                            {value}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {highlightsItems.length > limit && (
              <div className="pt-1 border-t border-slate-50 w-full mt-2">
                <button
                  onClick={() => setIsHighlightsExpanded(!isHighlightsExpanded)}
                  className="group flex justify-end items-center gap-1 text-brand-blue font-bold text-xs uppercase tracking-widest w-full"
                >
                  {isHighlightsExpanded ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      <span>Show Less</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      <span>View All ({highlightsItems.length - limit} More)</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* 2b. About Sub-section */}
        {paragraphs.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-base md:text-lg font-bold text-slate-900">About {packageData?.packageTitle || "the Package"}:</h3>
            <div className="relative">
              {(() => {
                if (!isExpanded && showReadMore) {
                  const cleanCollapseText = paragraphs.join(" ");
                  return (
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium line-clamp-3">
                      {cleanCollapseText}
                    </p>
                  );
                } else {
                  return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-300">
                      {paragraphs.map((cleanPara, idx) => (
                        <p key={idx} className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                          {cleanPara}
                        </p>
                      ))}
                    </div>
                  );
                }
              })()}

              {showReadMore && (
                <div className="pt-1 border-t border-slate-50 w-full mt-2">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="group flex justify-end items-center gap-1 text-brand-blue font-bold text-xs uppercase tracking-widest w-full"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        <span>Show Less</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        <span>Read More</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewSection;
