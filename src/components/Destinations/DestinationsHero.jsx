"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const DestinationsHero = () => {
  return (
    <div className="relative flex flex-col justify-center h-[85vh] min-h-[600px] md:min-h-[700px] w-full bg-slate-900 overflow-hidden">
      {/* Immersive Background */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 h-full w-full"
      >
        <Image
          src="/img/explore-hero.png" // Using the same high-quality asset for consistency
          alt="Explore The World"
          fill
          priority
          className="object-cover object-center brightness-[0.7]"
        />
      </motion.div>
      
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[2px]" />

      {/* Hero Content */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl mb-6 uppercase">
            Explore <span className="text-brand-blue">The World</span>
          </h1>
          <p className="hidden sm:block mt-6 text-lg md:text-xl font-medium tracking-wide max-w-2xl mx-auto leading-relaxed text-slate-100 drop-shadow-md">
            From the peaks of the Himalayas to the pristine beaches of Maldives, 
            discover your next perfect getaway.
          </p>
        </motion.div>
      </div>

        {/* Breadcrumbs - Bottom Left Positioned - Fixed Visibility */}
        <div className="absolute bottom-4 left-0 z-[60] w-full">
            <Container>
                <Breadcrumbs
                    items={[
                    { label: "Home", href: "/" },
                    { label: "Destinations", href: "/destinations", active: true },
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

export default DestinationsHero;
