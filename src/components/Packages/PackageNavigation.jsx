"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PackageNavigation = ({ activeSection, onScrollToSection, sections = [], isBottomBarVisible, isStickyTop = false }) => {

  return (
    <div 
      className={cn(
        "transition-all duration-300",
        isStickyTop 
          ? "fixed top-0 left-0 right-0 h-[60px] z-[999]" 
          : "relative h-auto md:sticky md:top-[100px] md:bottom-auto px-0 md:px-0 md:py-4 md:mb-6 z-40",
      )}
      style={isStickyTop ? { top: 0, marginTop: 0, paddingTop: 0 } : {}}
    >
      <div className="w-full h-full md:max-w-7xl mx-auto px-0 md:px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center h-full">
          {/* Mobile Sticky: Blue bar with yellow underline */}
          {isStickyTop && (
            <div className="relative flex w-full h-full md:hidden bg-brand-blue shadow-lg border-b border-white/10">
              <div className="relative flex items-center justify-around gap-0 p-0 w-full">
                {sections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => onScrollToSection(section.id)}
                      className={cn(
                        "relative flex flex-1 flex-col items-center justify-center gap-1 px-1 py-1 transition-all duration-300 whitespace-nowrap font-bold uppercase tracking-widest",
                        isActive ? "text-[#facc15]" : "text-white/60 hover:text-[#facc15]"
                      )}
                    >
                      {/* Yellow Underline for Active */}
                      {isActive && (
                        <motion.div
                          layoutId="activeSectionUnderline"
                          className="absolute bottom-0 left-2 right-2 h-1 bg-[#facc15] rounded-t-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      
                      <span className="relative z-10 flex flex-col items-center gap-1">
                        {section.icon && (
                          <section.icon 
                            size={18} 
                            className={cn(
                              "transition-all duration-300",
                              isActive ? "scale-110 opacity-100" : "opacity-60"
                            )} 
                          />
                        )}
                        <span className="text-[8px] xs:text-[10px]">{section.label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Desktop: Simple horizontal list with blue pills */}
          <div className={cn(
            "hidden md:flex items-center justify-center gap-3",
            isStickyTop && "hidden"
          )}>
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => onScrollToSection(section.id)}
                  className={cn(
                    "relative flex items-center gap-2 px-6 py-3 transition-all duration-300 rounded-full whitespace-nowrap font-bold text-sm",
                    isActive
                      ? "bg-brand-blue text-white shadow-md"
                      : "bg-transparent text-slate-600 hover:text-brand-blue hover:bg-slate-50"
                  )}
                >
                  {section.icon && (
                    <section.icon 
                      size={18} 
                      className="transition-all duration-300" 
                    />
                  )}
                  <span>{section.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Non-Sticky: Bottom bar */}
          {!isStickyTop && (
            <div className="relative flex w-full md:hidden bg-white border-t border-brand-blue/10">
              <div className="relative flex items-center justify-around gap-0 p-0 w-full">
                {sections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => onScrollToSection(section.id)}
                      className={cn(
                        "relative flex flex-1 flex-col items-center justify-center gap-1 px-1 py-1 transition-all duration-300 whitespace-nowrap font-bold uppercase tracking-widest",
                        isActive ? "text-brand-blue" : "text-slate-500 hover:text-brand-blue"
                      )}
                    >
                      {/* Active Background Tint */}
                      {isActive && (
                        <div className="absolute inset-0 bg-brand-blue/5" />
                      )}
                      
                      {/* Top Indicator Line */}
                      {isActive && (
                        <div className="absolute top-0 left-1/3 right-1/3 h-1 bg-brand-blue rounded-b-full" />
                      )}
                      
                      <span className="relative z-10 flex flex-col items-center gap-1">
                        {section.icon && (
                          <section.icon 
                            size={22} 
                            className={cn(
                              "transition-all duration-300",
                              isActive ? "scale-110 opacity-100" : "opacity-60"
                            )} 
                          />
                        )}
                        <span className="text-[8px] xs:text-[10px]">{section.label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageNavigation;
