"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import categoryData from "@/data/categoryData";

const ThemeGridItem = ({ item, index }) => {
  // Normalize slug for internal linking
  const baseSlug = item.slug.split("?")[0];
  
  return (
    <motion.div
      transition={{ 
        duration: 0.8, 
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      <Link 
        href={`/themes/${baseSlug}`} 
        className="group relative block aspect-[4/5] overflow-hidden rounded-[24px] bg-slate-100 transition-all duration-500 hover:shadow-2xl"
      >
        {/* Background Image */}
        <Image
          src={item.img}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Simple Content Area */}
        <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 z-20">
          <div className="space-y-1">
            {/* Title - Clean & Elegant */}
            <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight font-klausen">
              {item.title}
            </h3>
            
            {/* Subtitle - Very Subtle */}
            <p className="text-xs lg:text-sm text-white/70 font-medium tracking-wide">
              {item.subtitle}
            </p>
          </div>
        </div>

        {/* Subtle Border Glow on Hover */}
        <div className="absolute inset-0 border border-white/5 group-hover:border-white/20 rounded-[24px] transition-all duration-500 pointer-events-none" />
      </Link>
    </motion.div>
  );
};

const ThemeGrid = () => {
  return (
    <section className="relative z-10 py-8 lg:py-12 bg-white">
      <Container>
        {/* Simple Header */}
        <div className="mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Curated <span className="text-brand-blue">Travel Themes</span>
          </h2>
          <p className="text-slate-500 text-base lg:text-lg font-medium">
            Explore our hand-crafted themes designed to match your specific style and desire for adventure.
          </p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categoryData.map((item, index) => (
            <ThemeGridItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ThemeGrid;
