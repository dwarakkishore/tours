import React, { useState } from "react";
import Image from "next/image";
import { splitCityStr } from "@/lib/utils";
import { Download, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import useModal from "@/hooks/useModal";
import { toast } from "sonner";

const ItinerarySection = ({ packageData }) => {
  const { user } = useAuth();
  const { openAuthModal } = useModal();
  const [expandedDays, setExpandedDays] = useState([0]);
  const cities = splitCityStr(packageData?.citiesList);

  const toggleDay = (index) => {
    setExpandedDays(prev => 
      prev.includes(index) 
        ? prev.filter(id => id !== index)
        : [...prev, index]
    );
  };

  const toggleAllDays = () => {
    if (expandedDays.length === packageData?.itineraries?.length) {
      setExpandedDays([]);
    } else {
      setExpandedDays(packageData?.itineraries?.map((_, i) => i));
    }
  };

  const handleDownloadItinerary = () => {
    if (!user) {
      toast.error("Authentication Required", {
        description: "Please sign in to download the itinerary PDF.",
        action: {
          label: "Sign In",
          onClick: () => openAuthModal(),
        },
      });
      openAuthModal();
      return;
    }
    // TODO: Implement PDF generation or download logic
    // For now, we'll just trigger a print dialog
    window.print();
  };

  return (
    <div id="itinerary" className="md:bg-white md:rounded-[2rem] p-0 md:p-8 md:px-6 scroll-mt-48 md:border md:border-slate-100 md:shadow-sm">
      {/* Standard Header Block - Above Split Layout */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-6 md:mb-8">
        <div className="flex-1 max-w-3xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-2 md:mb-4 leading-tight">
            Your <span className="text-brand-blue">Daily Itinerary</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-xl font-medium">
            A carefully curated day-wise plan for your perfect adventure
          </p>
        </div>
        
        <div className="flex w-full lg:w-auto gap-2 md:gap-3 mt-4 lg:mt-0 lg:flex-shrink-0">
          <button
            onClick={handleDownloadItinerary}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-3 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white rounded-xl md:rounded-2xl font-bold text-[10px] md:text-[11px] uppercase tracking-wider transition-all shadow-lg shadow-brand-blue/20 hover:shadow-xl hover:shadow-brand-blue/30 active:scale-95"
          >
            <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Download Itinerary PDF</span>
            <span className="sm:hidden">ITENARY PDF</span>
          </button>
          <button
            onClick={toggleAllDays}
            className="flex-1 lg:flex-none px-3 md:px-6 py-2.5 md:py-3 bg-white border-2 border-slate-100 hover:border-brand-blue/30 rounded-xl md:rounded-2xl text-brand-blue font-bold text-[10px] md:text-[11px] uppercase tracking-wider transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <span className="hidden sm:inline">{expandedDays.length === packageData?.itineraries?.length ? "Collapse All Days" : "Expand All Days"}</span>
            <span className="sm:hidden">{expandedDays.length === packageData?.itineraries?.length ? "COLLAPSE" : "EXPAND"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Timeline List */}
        <div className="lg:col-span-12 space-y-6">

        <div className="relative">
          {/* Timeline connector line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-blue/20 via-brand-blue/40 to-brand-blue/20 opacity-30" />
          
          {packageData?.itineraries?.map((day, index) => (
            <div
              key={index}
              className="relative pl-0 md:pl-20 pb-4 last:pb-0"
            >
              {/* Timeline Node - Desktop Only */}
              <div className="hidden md:block absolute left-0 top-0">
                <div className="relative">
                  {/* Day badge */}
                  <div className="relative w-16 h-16 gradient-btn rounded-2xl flex flex-col items-center justify-center shadow-md border border-white/20">
                    <span className="text-xs font-bold text-white/70 uppercase tracking-widest">Day</span>
                    <span className="text-2xl font-bold text-white leading-none">{(index + 1).toString().padStart(2, "0")}</span>
                  </div>
                </div>
              </div>
              
              {/* Content Card - Accordion Style */}
              <div className="group relative">
                <div className={`relative bg-white/80 backdrop-blur-xl border rounded-3xl overflow-hidden transition-all duration-500 ${expandedDays.includes(index) ? 'border-brand-blue/30' : 'border-slate-200 hover:border-slate-300'}`}>
                  {/* Clickable Card Header */}
                  <button 
                    onClick={() => toggleDay(index)}
                    className="w-full text-left relative p-[15px] md:p-6 flex items-center justify-between gap-3 md:gap-4 transition-colors hover:bg-white/5"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        {/* Mobile Day Indicator */}
                        <div className="md:hidden flex items-center gap-1.5 px-2 py-0.5 bg-brand-blue rounded-md text-[10px] font-bold text-white uppercase tracking-tighter">
                          Day {(index + 1).toString().padStart(2, "0")}
                        </div>
                        
                        {/* Title */}
                        <h5 className={`text-[15px] md:text-xl font-bold transition-colors leading-tight ${expandedDays.includes(index) ? 'text-brand-blue' : 'text-slate-900'}`}>
                          {day.title.includes(":") ? day.title.split(":").slice(1).join(":").trim() : day.title}
                        </h5>
                      </div>
                    </div>
                    
                    {/* Expand/Collapse Icon */}
                    <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-300 ${expandedDays.includes(index) ? 'bg-brand-blue rotate-180' : 'bg-slate-100'}`}>
                      <svg 
                        className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${expandedDays.includes(index) ? 'text-white' : 'text-slate-400'}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {/* Expandable Content Area */}
                  {expandedDays.includes(index) && (
                    <div className="overflow-hidden">
                      {/* Decorative line */}
                      <div className="mx-6 h-px bg-slate-100" />
                        
                        <div className="px-3 md:px-6 py-4 md:py-6">
                          {/* Description or Activities with enhanced formatting */}
                          <div className="space-y-4 mb-6">
                            {day.activities ? (
                              <ul className="space-y-4 list-none">
                                {day.activities.map((act, actIdx) => (
                                  <li key={actIdx} className="relative pl-6 md:pl-8 text-slate-700 text-sm md:text-base leading-relaxed group/item">
                                    {/* Vertical Connecting Line */}
                                    {actIdx !== day.activities.length - 1 && (
                                      <div className="absolute left-[3px] md:left-[11px] top-4 bottom-[-16px] w-0.5 bg-gradient-to-b from-brand-blue/40 to-transparent" />
                                    )}

                                    {/* Unique Icon Indicator */}
                                    <div className="absolute left-0 top-[7px] md:top-1.5 w-1.5 h-1.5 md:w-6 md:h-6 rounded-full md:rounded-lg md:bg-brand-blue/10 flex items-center justify-center transition-all duration-300 md:group-hover/item:bg-brand-blue md:group-hover/item:scale-110 md:shadow-sm md:border md:border-brand-blue/20">
                                      <div className="w-1.5 h-1.5 md:w-1.5 md:h-1.5 rounded-full bg-brand-blue" />
                                    </div>
                                    
                                    <p className="flex flex-col gap-0.5">
                                      <span className="font-bold text-brand-blue tracking-tight text-sm md:text-base">
                                        {act.activity?.replace(/\\/g, "").replace(/^["'\s]+|["'\s]+,?$/g, "").trim()}
                                      </span>
                                      <span className="text-slate-500 font-medium text-sm md:text-base">
                                        {act.description?.replace(/\\/g, "").replace(/^["'\s]+|["'\s]+,?$/g, "").trim()}
                                      </span>
                                    </p>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              day.description?.split("\n").map((line, lineIndex) => {
                                if (!line.trim()) return null;
                                
                                const formatLine = (content) => {
                                  const colonIndex = content.indexOf(":");
                                  if (colonIndex !== -1) {
                                    const beforeColon = content.substring(0, colonIndex);
                                    const afterColon = content.substring(colonIndex);
                                    return (
                                      <>
                                        <span className="font-bold text-brand-blue text-sm md:text-base">
                                          {beforeColon}
                                        </span>
                                        <span className="text-slate-600">{afterColon}</span>
                                      </>
                                    );
                                  }
                                  return content;
                                };

                                // Handle bullet points with icons
                                if (line.startsWith("•")) {
                                  const content = line.substring(1).trim();
                                  return (
                                    <div 
                                      key={lineIndex} 
                                      className="bg-slate-50 rounded-2xl p-3 md:p-4 flex items-start gap-3 md:gap-4 mb-3 last:mb-0"
                                    >
                                      <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-blue-100/50 flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 text-blue-600 fill-blue-600" />
                                      </div>
                                      <div className="text-slate-700 text-sm md:text-base leading-relaxed pt-1">
                                         {formatLine(content)}
                                      </div>
                                    </div>
                                  );
                                } else if (line.trim()) {
                                  return (
                                    <div key={lineIndex} className="text-slate-600 text-sm md:text-base leading-relaxed pl-1">
                                      {formatLine(line.trim())}
                                    </div>
                                  );
                                }
                                return null;
                              })
                            )}
                          </div>

                          {/* night Stay Footer */}
                          {day.overnight && (
                            <div className="mb-6 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                  <span className="text-xl">🏨</span>
                                </div>
                                <div>
                                  <span className="block text-[10px] font-bold text-blue-400 uppercase tracking-widest">Overnight Stay</span>
                                  <span className="block text-sm font-bold text-slate-900">{day.overnight}</span>
                                </div>
                              </div>
                              {day.meals && day.meals.length > 0 && (
                                <div className="hidden sm:flex items-center gap-2">
                                  {day.meals.map((meal, mIdx) => (
                                    <span key={mIdx} className="px-2 py-1 bg-white rounded-lg text-[9px] font-bold text-slate-500 border border-slate-100 uppercase tracking-wider">
                                      {meal}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Image Gallery - Premium Masonry Style */}
                          {(() => {
                            const validImages = (day.imageRefs || []).filter(img => img && typeof img.url === 'string' && img.url.trim() !== "");
                            
                            if (validImages.length === 0) return null;

                            return (
                              <div className="mt-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center">
                                    <span className="text-xs">📸</span>
                                  </div>
                                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Photo Gallery</span>
                                </div>
                                
                                {validImages.length === 1 ? (
                                  <div className="relative aspect-video rounded-2xl overflow-hidden group/img cursor-pointer">
                                    <div className="relative h-full rounded-2xl overflow-hidden border border-slate-200">
                                      <Image
                                        src={validImages[0].url}
                                        alt={validImages[0].title || `Day ${index + 1} Image`}
                                        fill
                                        className="object-cover transform group-hover/img:scale-105 transition-transform duration-700"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                      {validImages[0].title && (
                                        <div className="absolute bottom-0 left-0 right-0 p-5">
                                          <p className="text-white font-semibold text-lg">{validImages[0].title}</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  <div className={`grid gap-2 ${validImages.length === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'}`}>
                                    {validImages.slice(0, 6).map((image, imgIndex) => (
                                      <div
                                        key={imgIndex}
                                        className={`relative rounded-xl overflow-hidden group/img cursor-pointer ${imgIndex === 0 && validImages.length > 3 ? 'row-span-2 aspect-[3/4]' : 'aspect-[4/3]'}`}
                                      >
                                        <div className="relative h-full rounded-xl overflow-hidden border border-slate-200">
                                          <Image
                                            src={image.url}
                                            alt={image.title || `Image ${imgIndex + 1}`}
                                            fill
                                            className="object-cover transform group-hover/img:scale-105 transition-transform duration-500"
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover/img:opacity-100 transition-opacity" />
                                          <div className="absolute inset-0 flex items-end p-3">
                                            <div>
                                              <p className="text-white text-xs font-medium line-clamp-2">
                                                {image.title || "Experience"}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                        
                        {/* Footer decoration */}
                        <div className="h-1 bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Journey End Marker */}
          <div className="relative pl-0 md:pl-20 pt-4">
            <div className="hidden md:block absolute left-0 top-4">
              <div className="relative w-12 h-12 md:w-16 md:h-16 bg-emerald-50 rounded-2xl flex items-center justify-center shadow-sm border border-emerald-100">
                <span className="text-2xl">🏁</span>
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
              <p className="text-emerald-700 font-medium">End of Journey</p>
              <p className="text-slate-500 text-sm">Your adventure awaits!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ItinerarySection;
