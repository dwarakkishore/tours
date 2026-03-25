"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const SectionNav = ({ sections, activeSection }) => {
  const [showRightIndicator, setShowRightIndicator] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowRightIndicator(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      checkScroll();
      window.addEventListener("resize", checkScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, [sections]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 180; // Account for sticky header + filters + nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative group/nav">
      <div 
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide touch-pan-x w-full"
      >
        <div className="flex items-center gap-3 whitespace-nowrap pr-12 lg:pr-0">
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            return (
              <motion.a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => scrollToSection(e, section.id)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: 0.05 * index }}
                className={cn(
                  "px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer relative",
                  isActive
                    ? "bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/20"
                    : "border-slate-100 bg-slate-50/50 text-slate-500 hover:text-brand-blue hover:border-brand-blue/30 hover:shadow-sm"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-brand-blue rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {section.label}
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* Scroll Indicator - Mobile Only */}
      <AnimatePresence>
        {showRightIndicator && (
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="lg:hidden absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-20 flex items-center justify-end pr-2 pointer-events-none"
          >
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ChevronRight className="w-5 h-5 text-brand-blue" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionNav;
