"use client";

import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

const LazySection = ({ 
  children, 
  className, 
  threshold = 0.1, 
  rootMargin = "200px", 
  fallback = null 
}) => {
  const [hasIntersected, setHasIntersected] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // If already intersected or no ref, do nothing
    if (hasIntersected || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [hasIntersected, threshold, rootMargin]);

  return (
    <div ref={sectionRef} className={cn("min-h-[100px]", className)}>
      {hasIntersected ? children : fallback}
    </div>
  );
};

export default LazySection;
