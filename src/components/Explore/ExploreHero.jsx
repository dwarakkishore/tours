"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const ExploreHero = () => {
  return (
    <div className="relative flex flex-col justify-center h-[85vh] min-h-[600px] md:min-h-[700px] w-full bg-slate-900 transition-all duration-1000 ease-in-out">
      {/* Immersive Background */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 h-full w-full"
      >
        <Image
          src="/img/explore-hero.png"
          alt="Explore Journeys"
          fill
          priority
          className="object-cover object-center brightness-[0.7]"
        />
      </motion.div>
      
      {/* Overlay matched to Landing Hero */}
      <div className="absolute inset-0 z-10 top-0 left-0 h-full w-full bg-black/60" />

      {/* Hero Content */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] leading-[1.1] sm:leading-[1.1] mb-6">
            EXPLORE EXTRAORDINARY <br className="sm:hidden" />
            <span className="font-great-vibes font-normal text-brand-blue drop-shadow-[0_0_15px_rgba(37,99,235,0.4)] text-5xl md:text-6xl lg:text-8xl">Journeys</span>
          </h1>
          <p className="hidden sm:block mt-3 sm:mt-6 text-[9px] sm:text-base md:text-lg font-medium tracking-wide drop-shadow-sm max-w-fit mx-auto leading-relaxed bg-white/10 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-white/20 shadow-lg text-white">
            Discover handpicked collections and tailored experiences designed for your perfect getaway.
          </p>
        </motion.div>
      </div>

        {/* Breadcrumbs - Bottom Left Positioned - Fixed Visibility */}
        <div className="absolute bottom-4 left-0 z-[60] w-full">
            <Container>
                <Breadcrumbs
                    items={[
                    { label: "Home", href: "/" },
                    { label: "Explore", href: "/explore", active: true },
                    ]}
                    className="!bg-transparent !border-none !p-0 flex justify-start w-auto"
                    omitContainer
                    colorClasses="text-white/80 drop-shadow-md"
                    activeColorClasses="text-white drop-shadow-md font-bold"
                />
            </Container>
        </div>
    </div>
  );
};

export default ExploreHero;
