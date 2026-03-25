"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MobilePackageNavigation = ({ activeSection, onScrollToSection, sections = [], isBottomBarVisible, isHeaderHidden }) => {
  return (
    <>
      {/* Mobile Sticky Navigation: Thrillophilia-style Pill Navigation */}
      <div className={cn(
        "md:hidden sticky left-0 right-0 z-[40] bg-white border-b border-slate-200 shadow-sm h-[60px] flex items-center w-[calc(100%+2rem)] -mx-4 transition-all duration-300",
        isHeaderHidden ? "top-0" : "top-[96px]"
      )}>
          <div className="flex overflow-x-auto no-scrollbar py-2 px-4 gap-2 items-center w-full">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => onScrollToSection(section.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300 shadow-sm border font-bold text-sm",
                    isActive 
                      ? "bg-brand-blue text-white border-brand-blue scale-105" 
                      : "bg-white text-slate-700 border-slate-200"
                  )}
                >
                  {section.icon && (
                    <section.icon 
                      size={16} 
                      className={cn(
                        "transition-colors",
                        isActive ? "text-white" : "text-slate-500"
                      )} 
                    />
                  )}
                  <span className="tracking-tight leading-none">
                    {section.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

    </>
  );
};

export default MobilePackageNavigation;
