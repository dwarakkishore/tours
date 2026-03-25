import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

const ShareableItineraryTimeline = ({ itineraries, isPrintMode = false }) => {
  const [expandedDays, setExpandedDays] = useState(isPrintMode ? itineraries.map((_, i) => i) : [0]);

  const toggleDay = (index) => {
    if (isPrintMode) return; // Don't allow toggling in print mode
    
    setExpandedDays(prev => 
      prev.includes(index) 
        ? prev.filter(id => id !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 print:py-6">
      {/* Section Header */}
      <div className="mb-6 md:mb-10 print:mb-4">
        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
          Your <span className="text-brand-blue">Day-by-Day</span> Itinerary
        </h2>
        <p className="text-slate-600 text-sm md:text-lg font-medium">
          A carefully crafted journey designed just for you
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline connector line - Desktop only */}
        <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-blue/20 via-brand-blue/40 to-brand-blue/20 opacity-30 print:hidden" />
        
        {itineraries.map((day, index) => {
          const isExpanded = expandedDays.includes(index) || isPrintMode;
          
          return (
            <div
              key={index}
              className="relative pl-0 md:pl-20 pb-6 md:pb-8 last:pb-0 print:pb-4 print:break-inside-avoid"
            >
              {/* Timeline Node - Desktop Only */}
              <div className="hidden md:block absolute left-0 top-0 print:block">
                <div className="relative w-16 h-16 gradient-btn rounded-2xl flex flex-col items-center justify-center shadow-md border border-white/20 print:w-12 print:h-12 print:rounded-xl print:shadow-none">
                  <span className="text-xs font-bold text-white/70 uppercase tracking-widest print:text-[10px]">Day</span>
                  <span className="text-2xl font-bold text-white leading-none print:text-xl">{day.day.toString().padStart(2, '0')}</span>
                </div>
              </div>
              
              {/* Content Card */}
              <div className="group relative">
                <div className={`relative bg-white border rounded-3xl overflow-hidden transition-all duration-500 print:rounded-2xl print:shadow-none ${isExpanded ? 'border-brand-blue/30 shadow-lg shadow-brand-blue/5' : 'border-slate-200'}`}>
                  {/* Clickable Card Header */}
                  <button 
                    onClick={() => toggleDay(index)}
                    disabled={isPrintMode}
                    className="w-full text-left relative p-4 md:p-6 flex items-center justify-between gap-4 transition-colors hover:bg-slate-50/50 print:p-4 print:cursor-default print:hover:bg-white"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        {/* Mobile Day Indicator */}
                        <div className="md:hidden flex items-center gap-1.5 px-3 py-1 bg-white border border-brand-blue/30 rounded-lg text-[10px] font-bold text-brand-blue uppercase tracking-wider print:flex">
                          Day {day.day.toString().padStart(2, '0')}
                        </div>
                        
                        {/* Title */}
                        <h5 className={`text-base md:text-xl font-bold transition-colors leading-tight print:text-lg ${isExpanded ? 'text-brand-blue' : 'text-slate-900'}`}>
                          {day.title}
                        </h5>
                      </div>
                    </div>
                    
                    {/* Expand/Collapse Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 print:hidden ${isExpanded ? 'bg-brand-blue rotate-180' : 'bg-slate-100'}`}>
                      <svg 
                        className={`w-5 h-5 transition-colors ${isExpanded ? 'text-white' : 'text-slate-400'}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {/* Expandable Content Area */}
                  {isExpanded && (
                    <div className="overflow-hidden print:block">
                      {/* Decorative line */}
                      <div className="mx-6 h-px bg-slate-100 print:mx-4" />
                        
                      <div className="px-4 md:px-6 py-4 md:py-6 print:px-4 print:py-4">
                        {/* Activities */}
                        {day.activities && day.activities.length > 0 && (
                          <div className="space-y-4 mb-6 print:mb-4 print:space-y-3">
                            <ul className="space-y-4 list-none print:space-y-3">
                              {day.activities.map((act, actIdx) => (
                                <li key={actIdx} className="relative pl-8 text-slate-700 text-sm md:text-base leading-relaxed group/item print:pl-6 print:text-sm">
                                  {/* Vertical Connecting Line */}
                                  {actIdx !== day.activities.length - 1 && (
                                    <div className="absolute left-[11px] top-4 bottom-[-16px] w-0.5 bg-gradient-to-b from-brand-blue/40 to-transparent print:hidden" />
                                  )}

                                  {/* Icon Indicator */}
                                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-lg bg-brand-blue/10 flex items-center justify-center transition-all duration-300 group-hover/item:bg-brand-blue group-hover/item:scale-110 shadow-sm border border-brand-blue/20 print:w-5 print:h-5 print:rounded-md print:top-0.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                  </div>
                                  
                                  <p className="flex flex-col gap-0.5">
                                    <span className="font-bold text-brand-blue tracking-tight text-sm md:text-base print:text-sm">
                                      {act.activity}
                                    </span>
                                    <span className="text-slate-600 font-medium text-sm md:text-base print:text-sm">
                                      {act.description}
                                    </span>
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Overnight Stay & Meals */}
                        {day.overnight && (
                          <div className="mb-6 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center justify-between print:mb-4 print:rounded-xl print:p-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm print:w-8 print:h-8 print:shadow-none">
                                <span className="text-xl print:text-lg">🏨</span>
                              </div>
                              <div>
                                <span className="block text-[10px] font-bold text-blue-400 uppercase tracking-widest">Overnight Stay</span>
                                <span className="block text-sm font-bold text-slate-900 print:text-xs">{day.overnight}</span>
                              </div>
                            </div>
                            {day.meals && day.meals.length > 0 && (
                              <div className="flex items-center gap-2 print:hidden sm:flex">
                                {day.meals.map((meal, mIdx) => (
                                  <span key={mIdx} className="px-2 py-1 bg-white rounded-lg text-[9px] font-bold text-slate-500 border border-slate-100 uppercase tracking-wider">
                                    {meal}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Image Gallery */}
                        {day.imageRefs && day.imageRefs.length > 0 && (
                          <div className="mt-4 print:hidden">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center">
                                <span className="text-xs">📸</span>
                              </div>
                              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Photo Gallery</span>
                            </div>
                            
                            {day.imageRefs.length === 1 ? (
                              <div className="relative aspect-video rounded-2xl overflow-hidden">
                                <Image
                                  src={day.imageRefs[0].url}
                                  alt={day.imageRefs[0].title || `Day ${day.day} Image`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className={`grid gap-2 ${day.imageRefs.length === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'}`}>
                                {day.imageRefs.slice(0, 6).map((image, imgIndex) => (
                                  <div
                                    key={imgIndex}
                                    className="relative rounded-xl overflow-hidden aspect-[4/3]"
                                  >
                                    <Image
                                      src={image.url}
                                      alt={image.title || `Image ${imgIndex + 1}`}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Journey End Marker */}
        <div className="relative pl-0 md:pl-20 pt-4 print:pl-20 print:pt-2 print:break-inside-avoid">
          <div className="hidden md:block absolute left-0 top-4 print:block print:top-2">
            <div className="relative w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center shadow-sm border border-emerald-100 print:w-12 print:h-12 print:rounded-xl print:shadow-none">
              <span className="text-2xl print:text-xl">🏁</span>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 print:rounded-xl print:p-3">
            <p className="text-emerald-700 font-bold text-sm md:text-base">End of Journey</p>
            <p className="text-slate-500 text-xs md:text-sm">Your adventure awaits!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareableItineraryTimeline;
