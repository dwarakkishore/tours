"use client";

import Image from "next/image";
import Container from "../ui/Container";
import { InfiniteMovingCardsDemo } from "../InfiniteMovingCardsDemo";
import { Sparkles, MapPin } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

export default function Testimonials({ reviews }) {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Stunning background image
  const bgImage = "/img/package-img/swiss-alps.jpg";

  const handleMouseMove = (event) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
  };

  // Create dynamic mask image template based on motion values
  const maskImage = useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, black, transparent 100%)`;
  
  // Create dynamic glow background template
  const glowCheck = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(34, 211, 238, 0.08), transparent 80%)`;

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-[#020617] py-24 lg:py-40"
    >
      {/* 1. Base Background: Deeply Blurred & Darkened */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={bgImage}
          alt="Background Muted"
          fill
          className="object-cover scale-110 blur-[40px] opacity-40 grayscale-[0.5]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
      </div>

      {/* 2. Reveal Background: Sharp & Vibrant (Masked by Spotlight) */}
      {/* 2. Reveal Background: Sharp & Vibrant (Masked by Spotlight) - DESKTOP ONLY */}
      <motion.div 
        className="hidden lg:block absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000"
        style={{
          maskImage: maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        <Image
          src={bgImage}
          alt="Background Focus"
          fill
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-brand-blue/10 backdrop-brightness-110" />
      </motion.div>

      {/* 2b. Static Background for Mobile - Optimized to avoid mask composite cost */}
      <div className="block lg:hidden absolute inset-0 z-10 pointer-events-none">
        <Image
          src={bgImage}
          alt="Background Focus"
          fill
          className="object-cover scale-105 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
      </div>

      {/* 3. Ambient Light Glow following mouse */}
      <motion.div 
        className="hidden lg:block absolute inset-0 z-20 pointer-events-none"
        style={{
          background: glowCheck
        }}
      />

      {/* CONTENT LAYER */}
      <Container className="relative z-30">
        <div className="flex flex-col items-center justify-center text-center gap-10 mb-24">
          
          {/* Elegant Badge */}
          {/* Elegant Badge */}
          <div 
            className="flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl"
          >
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-cyan-50/80">
              Global Explorer Stories
            </span>
          </div>

          <div className="space-y-6">
            <h2 
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.9] flex flex-col items-center"
            >
              <span className="opacity-50 text-3xl md:text-4xl lg:text-5xl font-medium tracking-normal mb-2">Trusted and</span>
              <span className="relative">
                Loved Worldwide
                <div 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                />
              </span>
            </h2>
            
            <p 
              className="text-white/50 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light font-poppins"
            >
              Discover why thousands of adventurers trust us to craft their perfect journey.
            </p>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
           {/* Decorative corner accents */}
           <div className="absolute -top-12 -left-12 w-24 h-24 border-t-2 border-l-2 border-cyan-500/20 rounded-tl-3xl pointer-events-none" />
           <div className="absolute -bottom-12 -right-12 w-24 h-24 border-b-2 border-r-2 border-cyan-500/20 rounded-br-3xl pointer-events-none" />
           
           <InfiniteMovingCardsDemo reviews={reviews} />
        </div>
      </Container>

      {/* Floating Background Sparkles - Removed for performance and instant reveal */}
    </section>
  );
}
