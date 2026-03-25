"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";

const RegionWhyChoose = ({ regionName = "this destination", data }) => {
  // Use data from API or fallback to curated set of 8 items for a complete mosaic
  const displayItems = useMemo(() => {
    const apiItems = data?.highlights || data?.["Key Highlights"] || data?.keyHighlights || data?.reasons || [];
    
    // If no items are found in the API, return an empty array
    if (apiItems.length === 0) {
      return [];
    }

    return apiItems.map(item => {
      const hasGallery = Array.isArray(item.gallery) && item.gallery.length > 0;
      return {
        ...item,
        title: hasGallery ? (item.gallery[0].caption || item.gallery[0].title) : item.recommendedPhotoContent,
        image: hasGallery ? (item.gallery[0].url || item.gallery[0].image) : item.recommendedPhotoImage,
        slug: item.slug || item.title?.toLowerCase().replace(/ /g, "-") || "highlight"
      };
    });
  }, [data]);
  


  // Specific grid span configurations for a perfectly balanced 8-image mosaic
  const gridConfigs = [
    "col-span-2 md:col-span-6 md:row-span-2", // 1. Large Feature (Left)
    "col-span-1 md:col-span-3 md:row-span-1", // 2. Top Square 1
    "col-span-1 md:col-span-3 md:row-span-1", // 3. Top Square 2
    "col-span-1 md:col-span-3 md:row-span-1", // 4. Bottom Square 1 (under 2)
    "col-span-1 md:col-span-3 md:row-span-1", // 5. Bottom Square 2 (under 3)
    "col-span-2 md:col-span-6 md:row-span-1", // 6. Wide Base
    "col-span-1 md:col-span-3 md:row-span-1", // 7. Small Base 1
    "col-span-1 md:col-span-3 md:row-span-1", // 8. Small Base 2
  ];

  const regionSlug = regionName?.toLowerCase().replace(/ /g, "-");

  return (
    <section className="pt-2 pb-12 md:pb-14 md:pt-6 bg-white overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            {/* Left: Title Section */}
            <div className="flex-1">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 mb-6"
              >
                <span className="text-sm font-bold text-brand-blue uppercase tracking-[0.2em] flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Why Visit?
                </span>
              </motion.div>
              
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6"
              >
                <span className="hidden sm:inline">Why Choose </span>
                <span className="inline sm:hidden">Why </span>
                <span className="text-brand-blue capitalize">{regionName}</span>?
              </motion.h2>
              
              <motion.p
                className="hidden sm:block text-xl text-slate-500 max-w-2xl font-medium truncate md:whitespace-normal"
              >
                Explore the beauty, culture, and unforgettable signature experiences that await you
              </motion.p>
            </div>
            
            {/* Right: Button */}
            <Link href={`/why-choose/${regionSlug}`}>
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-300 whitespace-nowrap shadow-lg shadow-blue-500/20 active:scale-95"
              >
                Explore More
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Sophisticated Mosaic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[220px]">
          {displayItems.map((item, index) => (
            <Link 
              key={index} 
              href={`/why-choose/${regionSlug}#${item.slug}`}
              className={gridConfigs[index] || "md:col-span-3"}
            >
              <motion.div
                className="relative h-full w-full rounded-[2rem] overflow-hidden group shadow-lg cursor-pointer"
              >
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Premium Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-blue mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Feature {index + 1}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight drop-shadow-md">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-2 text-sm text-white/70 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      {item.description}
                    </p>
                  )}
                  {/* Read More Indicator */}
                  <div className="mt-4 flex items-center gap-2 text-brand-blue text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                    <span>Explore Section</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
                
                {/* Aesthetic Border Glow on Hover */}
                <div className="absolute inset-0 border-2 border-brand-blue/0 group-hover:border-brand-blue/20 transition-colors duration-500 rounded-[2rem]" />
              </motion.div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default RegionWhyChoose;
