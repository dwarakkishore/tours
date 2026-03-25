"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Plane, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

const GlobalTravelLoader = ({ className, text = "Curating your experience..." }) => {
  useEffect(() => {
    // Smoothly remove the static HTML splash screen once React takes over
    const splash = document.getElementById("bayard-splash-screen");
    if (splash) {
      splash.style.opacity = "0";
      splash.style.visibility = "hidden";
    }
  }, []);

  return (
    <div className={cn("fixed inset-0 z-[9999] flex flex-col items-center justify-center w-full h-full bg-white", className)}>
      
      {/* 1. Global Loader CSS Styles (Embedded for self-containment) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gt-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes gt-float { 
          0%, 100% { transform: translateY(0); } 
          50% { transform: translateY(-10px); } 
        }
        @keyframes gt-text-fade {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .gt-globe {
          will-change: transform;
          animation: gt-float 6s ease-in-out infinite;
        }
        .gt-orbit {
          will-change: transform;
          animation: gt-spin 20s linear infinite;
        }
        .gt-plane-path {
          will-change: transform;
          animation: gt-spin 8s linear infinite;
        }
      `}} />

      {/* 2. The Faux-3D Globe Container */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
         
         {/* Globe Shadow (Ground) */}
         <div className="absolute bottom-4 w-40 h-4 bg-black/10 blur-xl rounded-[100%]" />

         {/* THE GLOBE SPHERE */}
         <div 
            className="gt-globe relative w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.4),0_20px_50px_rgba(1,70,179,0.3)] bg-gradient-to-br from-[#0146b3] to-[#003488]"
         >
            {/* Glossy Reflection (Top Left) */}
            <div className="absolute top-4 left-4 w-20 h-10 bg-white/20 rounded-full blur-md transform -rotate-45" />

            {/* Simulated Continents (Static but styled to match CSS splash) */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-[20%] left-[20%] w-16 h-12 bg-white rounded-full blur-[4px]" />
                <div className="absolute top-[50%] left-[60%] w-24 h-24 bg-white rounded-full blur-[8px]" />
                <div className="absolute bottom-[20%] left-[10%] w-12 h-10 bg-white rounded-full blur-[4px]" />
            </div>
         </div>

         {/* ORBITAL RING */}
         <div 
            className="gt-orbit absolute w-[120%] h-[120%] rounded-full border border-dashed border-[#BF9106]/40"
         />

         {/* GOLDEN PLANE */}
         <div className="gt-plane-path absolute w-[140%] h-[140%]">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                 <div className="relative hover:scale-110 transition-transform">
                     {/* Plane Icon */}
                     <div className="p-3 bg-white rounded-full shadow-lg border-2 border-[#BF9106]">
                         <Plane className="w-8 h-8 md:w-10 md:h-10 text-[#BF9106] fill-[#BF9106]" />
                     </div>
                     {/* Contrail */}
                     <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-white to-transparent blur-[2px]" />
                 </div>
             </div>
         </div>

         {/* Floating Clouds (Foreground - Light Framer Motion) */}
         <motion.div
             className="absolute top-[20%] -left-[20%]"
             animate={{ x: ["500%", "-200%"] }}
             transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 1 }}
         >
             <Cloud className="w-12 h-12 text-[#0146b3]/10 fill-white drop-shadow-md" />
         </motion.div>
         <motion.div
             className="absolute bottom-[20%] -right-[20%]"
             animate={{ x: ["-500%", "200%"] }}
             transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 0 }}
         >
             <Cloud className="w-16 h-16 text-[#0146b3]/10 fill-white drop-shadow-md" />
         </motion.div>

      </div>

      {/* TYPOGRAPHY */}
      <div className="mt-8 flex flex-col items-center">
        <span className="text-[#0146b3] font-serif text-2xl md:text-3xl font-bold tracking-widest uppercase">
            Bayard Vacations
        </span>
        <div className="flex items-center gap-2 mt-3" style={{ animation: 'gt-text-fade 2s ease-in-out infinite' }}>
             <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#BF9106]" />
             <p className="text-[#BF9106] text-xs md:text-sm font-sans font-bold tracking-[0.2em] uppercase">
                 {text}
             </p>
             <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#BF9106]" />
        </div>
      </div>

    </div>
  );
};

export default GlobalTravelLoader;
