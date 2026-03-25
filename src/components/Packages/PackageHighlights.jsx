"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { 
  Plane, 
  Landmark, 
  Banknote, 
  Flame, 
  Building2, 
  ShieldCheck,
  Mountain,
  Palmtree,
  Camera,
  Star,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const FeatureCard = ({ icon: Icon, title, description, iconColor, image, index, onClick }) => (
  <div className="group relative transition-all duration-700">
    {/* Foundation Image Container */}
    <div className="relative flex flex-col md:flex-row items-end md:items-center">
      {/* 1. Image Base (Scaled Down) */}
      <div 
        className="relative w-full md:w-[55%] h-64 md:h-80 overflow-hidden cursor-pointer rounded-[2.5rem] shadow-2xl group-hover:shadow-brand-blue/20 transition-all duration-1000"
        onClick={onClick}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/5" />
        
        {/* Number Badge */}
        <div className="absolute top-6 left-6">
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-center group-hover:bg-brand-blue group-hover:border-brand-blue transition-all duration-500">
            <span className="text-base font-bold text-white">{(index || 0) + 1}</span>
          </div>
        </div>
      </div>

      {/* 2. Overlapping Glass Card (Maximum Density) */}
      <div className="relative z-10 w-[94%] -mt-16 md:mt-0 md:-ml-40 bg-white/80 backdrop-blur-[20px] p-5 md:p-8 rounded-[2.5rem] shadow-[0_32px_80px_-20px_rgba(1,70,179,0.15)] border border-white group-hover:shadow-[0_48px_100px_-25px_rgba(1,70,179,0.25)] transition-all duration-700 group-hover:-translate-y-3">
        
        {/* Premium Shine Sweep */}
        <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none">
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-25deg] group-hover:animate-[shine_4s_ease-in-out_infinite]" />
        </div>

        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 relative group/title">
            {/* Glowing Accent 2.0 */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-0 bg-brand-blue rounded-full transition-all duration-500 group-hover/title:h-8 group-hover/title:shadow-[0_0_20px_rgba(1,70,179,0.8)] opacity-0 group-hover/title:opacity-100" />
            
            <h4 className="text-xl md:text-2xl font-bold text-slate-900 leading-[1.1] font-poppins tracking-tight transition-all duration-500 group-hover/title:pl-4 group-hover/title:text-transparent group-hover/title:bg-clip-text group-hover/title:bg-gradient-to-r group-hover/title:from-slate-900 group-hover/title:via-brand-blue group-hover/title:to-slate-900 group-hover/title:bg-[length:200%_auto] group-hover/title:animate-[gradient-x_3s_linear_infinite]">
              {title}
            </h4>
          </div>
          
          {/* Popping Icon Container (Ultra-Compacted) */}
          <div className="relative">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 group-hover:rotate-[15deg] group-hover:scale-105 shadow-lg",
              iconColor.replace('text-', 'bg-').replace('600', '100'),
            )}>
              <Icon className={cn("w-6 h-6 animate-float", iconColor)} />
            </div>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-500 leading-relaxed line-clamp-2 font-medium mb-6">
          {description}
        </p>

        {/* High-End Experience Indicator */}
        <div className="flex items-center gap-3">
          <div className="relative h-1 w-10 bg-slate-100 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-peach to-brand-blue transition-all duration-[1.5s] w-0 group-hover:w-full" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] group-hover:text-brand-blue transition-colors duration-500">
            Signature Experience
          </span>
        </div>
      </div>
    </div>
  </div>
);

const AttractionCard = ({ icon: Icon, title, iconColor }) => (
  <div className="flex items-center gap-4 bg-[#f8fafc]/50 p-4 rounded-2xl border border-slate-100 hover:shadow-md transition-all duration-300">
    <div className={cn("w-10 h-10 shrink-0 rounded-xl flex items-center justify-center bg-white border border-slate-100", iconColor)}>
      <Icon className="w-5 h-5" />
    </div>
    <span className="text-sm md:text-base font-bold text-slate-700 tracking-tight">{title}</span>
  </div>
);

const PackageHighlights = ({ packageData }) => {
  const regionName = packageData?.region || "the Destination";
  
  // Carousel state
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Image library for common highlights
  const highlightImages = {
    "burj khalifa": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    "desert safari": "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800&q=80",
    "grand mosque": "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=80",
    "airport transfer": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    "city sightseeing": "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
    "accommodation": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "hotel": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "dubai mall": "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&q=80",
    "marina": "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=80",
    "default": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80"
  };

  // Function to find matching image based on title
  const findImageForTitle = (title) => {
    const lowerTitle = title.toLowerCase();
    for (const [key, image] of Object.entries(highlightImages)) {
      if (lowerTitle.includes(key)) {
        return image;
      }
    }
    return highlightImages.default;
  };

  // 1. Dynamic Highlights - with images
  const highlightsList = Array.isArray(packageData?.highlights) && packageData.highlights.length > 0 
    ? packageData.highlights.slice(0, 6).map((h, i) => {
        const title = (typeof h === 'string' ? h : h.text).split(' - ')[0];
        const description = (typeof h === 'string' ? h : h.text).split(' - ')[1] || "Experience the best of " + regionName;
        
        return {
          icon: [Star, Flame, Landmark, Plane, Building2, ShieldCheck][i % 6],
          title: title,
          description: description,
          image: findImageForTitle(title),
          iconColor: [
            "text-yellow-600", 
            "text-orange-600", 
            "text-amber-600", 
            "text-blue-600", 
            "text-purple-600", 
            "text-green-600"
          ][i % 6]
        };
      })
    : [
        { icon: Star, title: "Burj Khalifa Observation", description: "At the Top viewing experience from the world's tallest building", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80", iconColor: "text-yellow-600" },
        { icon: Flame, title: "Desert Safari & BBQ", description: "Thrilling dune bashing followed by traditional dinner under stars", image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800&q=80", iconColor: "text-orange-600" },
        { icon: Landmark, title: "Grand Mosque Tour", description: "Explore the stunning architecture and spiritual heritage", image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=80", iconColor: "text-amber-600" },
        { icon: Plane, title: "Private Airport Transfers", description: "Seamless and comfortable arrival/departure services", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80", iconColor: "text-blue-600" },
        { icon: Building2, title: "Modern City Sightseeing", description: "Discover the futuristic skyline and panoramic city views", image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80", iconColor: "text-purple-600" },
        { icon: ShieldCheck, title: "Luxury Accommodation", description: "Hand-picked premium stays for maximum comfort", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", iconColor: "text-green-600" },
      ];

  // 2. Dynamic Attractions (Right Side)
  // Extract attraction names from itinerary titles if available
  const attractionsList = Array.isArray(packageData?.itineraries) && packageData.itineraries.length > 0
    ? packageData.itineraries.slice(0, 6).map((day, i) => ({
        icon: [Flame, Building2, Mountain, Landmark, Camera, MapPin][i % 6],
        title: day.title.split(':').pop().split(' - ').shift().trim(), // Clean up day titles like "Day 1: Burj Khalifa"
        iconColor: ["text-orange-500", "text-indigo-500", "text-blue-500", "text-amber-600", "text-purple-500", "text-rose-500"][i % 6]
      }))
    : [
        { icon: Flame, title: "Yanar Dag (Eternal Flame)", iconColor: "text-orange-500" },
        { icon: Building2, title: "Flame Towers & Modern City", iconColor: "text-indigo-500" },
        { icon: Mountain, title: "Scenic Highlands & Adventure Hub", iconColor: "text-blue-500" },
        { icon: Landmark, title: "UNESCO World Heritage Sites", iconColor: "text-amber-600" },
        { icon: Camera, title: "Stunning Photography Spots", iconColor: "text-purple-500" },
        { icon: MapPin, title: "Signature Local Experiences", iconColor: "text-rose-500" },
      ];

  // Carousel navigation functions
  const openCarousel = (index) => {
    setCurrentImageIndex(index);
    setShowCarousel(true);
    document.body.style.overflow = 'hidden';
  };

  const closeCarousel = () => {
    setShowCarousel(false);
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % highlightsList.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + highlightsList.length) % highlightsList.length);
  };

  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-[#FAFAFA]">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-brand-blue/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <Container>
        <div className="relative z-10">
          {/* Header Area (Compacted) */}
          <div className="mb-10 md:mb-14">
            <div className="flex items-center gap-3 mb-3 animate-fadeIn">
              <div className="h-0.5 w-8 bg-brand-blue" />
              <span className="text-brand-blue font-bold text-[10px] uppercase tracking-[0.4em]">Curated Experience</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-poppins tracking-tight">
              Package <span className="text-brand-blue italic border-b-4 border-brand-blue/20">Highlights</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 md:gap-x-10 lg:gap-x-16 xl:gap-x-20">
            {highlightsList.map((item, idx) => (
              <div key={idx} className={cn(idx % 2 !== 0 ? "lg:pt-10" : "")}>
                <FeatureCard
                  {...item}
                  index={idx}
                  onClick={() => openCarousel(idx)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Modal Portal */}
        {mounted && showCarousel && createPortal(
          <div className="fixed inset-0 z-[10000] bg-black/98 backdrop-blur-md flex items-center justify-center">
            {/* Close Button - Enhanced visibility and layout position */}
            <button
              onClick={closeCarousel}
              className="absolute top-8 right-8 z-[10001] w-14 h-14 rounded-full bg-white/10 hover:bg-brand-blue backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all duration-300 group/close"
            >
              <X className="w-8 h-8 text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-8 z-[10001] w-14 h-14 rounded-full bg-white/10 hover:bg-brand-blue backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all duration-300"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-8 z-[10001] w-14 h-14 rounded-full bg-white/10 hover:bg-brand-blue backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all duration-300"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Image Display Wrapper */}
            <div className="relative w-full max-w-6xl h-[85vh] mx-12 flex flex-col justify-center">
              {highlightsList[currentImageIndex]?.image && (
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10">
                  <Image
                    src={highlightsList[currentImageIndex].image}
                    alt={highlightsList[currentImageIndex].title}
                    fill
                    className="object-contain"
                  />
                  {/* Premium Meta Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-0.5 w-10 bg-brand-blue" />
                        <span className="text-brand-blue font-bold text-xs uppercase tracking-widest">Highlight {currentImageIndex + 1}</span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-poppins">
                        {highlightsList[currentImageIndex].title}
                      </h3>
                      <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                        {highlightsList[currentImageIndex].description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
      </Container>
    </section>
  );
};

export default PackageHighlights;
