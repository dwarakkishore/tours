"use client";

import { useEffect } from "react";

export default function ScrollReset() {
  useEffect(() => {
    // Reset scroll position to top immediately
    if (typeof window !== "undefined") {
      // Store original scroll behavior
      const htmlElement = document.documentElement;
      const originalScrollBehavior = htmlElement.style.scrollBehavior;
      
      // Force scroll-behavior to auto to prevent smooth scrolling
      htmlElement.style.scrollBehavior = 'auto';
      
      // Set scroll restoration to manual
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      
      // Scroll to top immediately  
      window.scrollTo(0, 0);
      
      // Also scroll after a short delay to catch any components that mount late
      const timeout1 = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
      
      // And one more time after components have fully mounted
      const timeout2 = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 300);
      
      // Final scroll after all animations, then restore scroll behavior
      const timeout3 = setTimeout(() => {
        window.scrollTo(0, 0);
        // Restore original scroll behavior after everything has settled
        htmlElement.style.scrollBehavior = originalScrollBehavior;
      }, 800);

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
      };
    }
  }, []);

  return null;
}
