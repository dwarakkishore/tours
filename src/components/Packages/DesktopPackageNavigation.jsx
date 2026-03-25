"use client";
import React from "react";
import { cn } from "@/lib/utils";

const DesktopPackageNavigation = ({ activeSection, onScrollToSection, sections = [] }) => {
  return (
    <div className="hidden md:block sticky top-[80px] z-40 py-4 mb-6">
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-full shadow-sm p-1">
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
      </div>
    </div>
  );
};

export default DesktopPackageNavigation;
