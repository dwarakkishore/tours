"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const FooterSection = ({ title, links, basePath = "packages", hoverColor = "hover:text-brand-blue", viewAllLink }) => {
  const contentRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      // Check if content height exceeds 3 lines (5rem = 80px)
      const MAX_HEIGHT = 80;
      setIsOverflowing(contentRef.current.scrollHeight > MAX_HEIGHT);
    }
  }, [links]);

  return (
    <div className="flex flex-col gap-3">
      <h5 className="font-semibold tracking-wide text-white">{title}</h5>
      
      {/* Container with exactly 3 lines height - increased to account for gaps */}
      <div className="overflow-hidden" style={{ maxHeight: "5rem" }}>
        <div 
          ref={contentRef}
          className="flex flex-wrap gap-x-3 gap-y-1 text-white/80 text-sm" 
          style={{ lineHeight: "1.5rem" }}
        >
          {links.map((link, i) => (
            <div key={link.id || link.slug || i} className="flex items-center gap-2">
              <Link
                href={`/${basePath}/${link.slug.split("?")[0]}`}
                className={cn("hover:translate-x-1 transition-all duration-300 whitespace-nowrap", hoverColor)}
              >
                {link.name || link.title}
              </Link>
              {i !== links.length - 1 && (
                <span className="opacity-20 select-none">|</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {isOverflowing && viewAllLink && (
        <Link
          href={viewAllLink}
          className="font-bold text-[#FDB913] hover:text-[#FFD700] transition-all duration-300 whitespace-nowrap text-sm mt-1 inline-block uppercase tracking-wider"
        >
          VIEW MORE
        </Link>
      )}
    </div>
  );
};

export default FooterSection;
