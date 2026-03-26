"use client";
import { themeMap, themeMapData, VIDEO_MAP } from "@/config/themePackages";
import { useState, useMemo, useEffect } from "react";
import { usePackagesByTheme } from "@/hooks/packages/usePackagesByTheme";
import { formatPrice } from "@/utils/offerUtils";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "../Skeleton";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";

export default function ThemeHighlights({
  initialEliteEscapePackages,
  initialSoloExpeditionPackages,
  initialFamilyFunventurePackages,
  initialGroupAdventuresPackages,
  initialReligiousRetreatPackages,
  initialRelaxRejuvenatePackages,
  initialExplorationBundlePackages,
  initialEducationalPackages,
  initialRomanticGetawaysPackages,
}) {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    const element = document.getElementById("theme-highlights-section");
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  // Hook Calls ---------------------------------------------------------------
  const eliteEscapeData = usePackagesByTheme("elite-escape", initialEliteEscapePackages, 20);
  const soloExpeditionData = usePackagesByTheme("solo-expedition", initialSoloExpeditionPackages, 20);
  const familyFunventureData = usePackagesByTheme("family-funventure", initialFamilyFunventurePackages, 20);
  const groupAdventuresData = usePackagesByTheme("group-adventures", initialGroupAdventuresPackages, 20);
  const religiousRetreatData = usePackagesByTheme("religious-retreat", initialReligiousRetreatPackages, 20);
  const relaxRejuvenateData = usePackagesByTheme("relax-rejuvenate", initialRelaxRejuvenatePackages, 20);
  const explorationBundleData = usePackagesByTheme("exploration-bundle", initialExplorationBundlePackages, 20);
  const educationalData = usePackagesByTheme("educational", initialEducationalPackages, 20);
  const romanticGetawaysData = usePackagesByTheme("romantic-getaways", initialRomanticGetawaysPackages, 20);

  const themePackagesMap = {
    "elite-escape": eliteEscapeData,
    "solo-expedition": soloExpeditionData,
    "family-funventure": familyFunventureData,
    "group-adventures": groupAdventuresData,
    "religious-retreat": religiousRetreatData,
    "relax-rejuvenate": relaxRejuvenateData,
    "exploration-bundle": explorationBundleData,
    educational: educationalData,
    "romantic-getaways": romanticGetawaysData,
  };
  // --------------------------------------------------------------------------

  // Current State Logic ------------------------------------------------------
  const currentTheme = themeMapData[currentThemeIndex];
  const themeData = themeMap[currentTheme?.themeSlug];
  const currentThemeData = themePackagesMap[currentTheme?.themeSlug] || {};
  const currentThemePackages = currentThemeData.packages || [];
  const currentThemeLoading = currentThemeData.isLoading || false;

  const packages = useMemo(() => {
    if (!currentThemePackages) return [];
    const sortedPackages = [...currentThemePackages].sort((a, b) => {
      const priceDiff = a.basePrice - b.basePrice;
      if (priceDiff !== 0) return priceDiff;
      return (a.id || "").localeCompare(b.id || "");
    });
    const seenRegions = new Set();
    const uniquePackages = sortedPackages.filter((pkg) => {
      if (seenRegions.has(pkg.region)) return false;
      seenRegions.add(pkg.region);
      return true;
    });
    return uniquePackages.slice(0, 4);
  }, [currentThemePackages]);
  // --------------------------------------------------------------------------

  // AutoPlay Logic -----------------------------------------------------------
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentThemeIndex((prev) => (prev + 1) % themeMapData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToPrevious = () => {
    setCurrentThemeIndex((prev) => (prev - 1 + themeMapData.length) % themeMapData.length);
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentThemeIndex((prev) => (prev + 1) % themeMapData.length);
    setIsAutoPlay(false);
  };
  // --------------------------------------------------------------------------

  // Helpers
  const getThemeTagline = (themeSlug) => {
    const taglines = {
      "romantic-getaways": "Where Every Moment Feels Like a Honeymoon",
      "group-adventures": "Adventure Awaits When Friends Unite",
      "family-funventure": "Creating Memories That Last a Lifetime",
      educational: "Learn, Explore, and Discover the World",
      "religious-retreat": "Find Peace and Spiritual Renewal",
      "solo-expedition": "Discover Yourself Through Solo Adventures",
      "exploration-bundle": "Uncover Hidden Gems Around the Globe",
      "relax-rejuvenate": "Unwind and Recharge Your Soul",
      "elite-escape": "Luxury Redefined for the Discerning Traveler",
    };
    return taglines[themeSlug] || "Discover Amazing Destinations";
  };

  return (
    <section id="theme-highlights-section" className="bg-white overflow-hidden section-padding">
      <Container>
        {/* Header */}
        <div className="mb-4 md:mb-8">
          <h2 className="section-title-light mb-2 md:mb-4">
            <span className="md:hidden">Curated Themes</span>
            <span className="hidden md:inline">Explore Curated Themes</span>
          </h2>
          <p className="section-subtitle-light hidden md:block">
            Discover handpicked experiences that define luxury and adventure
          </p>
        </div>

        {/* Theme Filter Buttons */}
        <div className="mb-8 flex flex-wrap sm:flex-nowrap gap-2 sm:overflow-x-auto pb-4 scrollbar-hide">
          {themeMapData.map((theme, index) => (
            <button
              key={theme.themeSlug}
              onClick={() => {
                setCurrentThemeIndex(index);
                setIsAutoPlay(false);
              }}
              className={cn(
                "rounded-full border text-[11px] sm:text-sm font-bold sm:font-bold px-3.5 sm:px-6 py-1.5 sm:py-2.5 flex-shrink-0 transition-all duration-300 whitespace-nowrap",
                currentThemeIndex === index
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-md sm:shadow-lg text-slate-900 border-transparent hover:opacity-90"
                  : "border-gray-100 text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10"
              )}
            >
              {theme.themeText}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN - HERO */}
          <div className="lg:col-span-5">
            <div className="relative h-[450px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden group shadow-2xl">
              {/* Background Media */}
              <div
                key={currentThemeIndex}
                className="absolute inset-0"
              >
                {isVisible && (
                  <video
                    src={VIDEO_MAP[currentTheme?.themeSlug]}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />
              </div>

              {/* Play/Pause Toggle */}
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                aria-label={isAutoPlay ? "Pause autoplay" : "Start autoplay"}
                className="absolute top-6 right-6 z-30 p-3 sm:p-4 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full text-white transition-all shadow-lg hidden group-hover:flex"
              >
                  {isAutoPlay ? <Pause className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" />}
              </button>
              
              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-6 sm:px-8 mt-12">
                  <div
                    key={`text-${currentThemeIndex}`}
                  >
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg leading-tight">
                        {themeData?.title || currentTheme?.themeText}
                    </h3>
                    <p className="text-2xl sm:text-3xl md:text-4xl font-great-vibes text-slate-100 drop-shadow-md mb-6 sm:mb-8">
                        {getThemeTagline(currentTheme?.themeSlug)}
                    </p>
                    
                    <Link
                        href={`/themes/${currentTheme?.themeSlug === 'group-adventures' ? 'group-departure' : currentTheme?.themeSlug}`}
                        prefetch={false}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-xl text-slate-900 inline-block px-8 py-3 sm:px-10 sm:py-4 font-bold rounded-full transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                    >
                        Explore Packages
                    </Link>
                  </div>
              </div>

              {/* Navigation Controls */}
              <button
                onClick={goToPrevious}
                aria-label="Previous theme"
                className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 backdrop-blur-md hover:bg-white text-white hover:text-slate-900 p-2 sm:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={goToNext}
                aria-label="Next theme"
                className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 backdrop-blur-md hover:bg-white text-white hover:text-slate-900 p-2 sm:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
                {themeMapData.slice(0, 5).map((_, index) => ( 
                   <button
                    key={index}
                    onClick={() => {
                        setCurrentThemeIndex(index);
                        setIsAutoPlay(false);
                    }}
                    aria-label={`Go to theme ${index + 1}`}
                    className={`transition-all duration-500 rounded-full h-1.5 ${
                        index === currentThemeIndex
                        ? 'w-6 sm:w-8 bg-white'
                        : 'w-2 bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

             {/* RIGHT COLUMN - GRID */}
          <div className="lg:col-span-7 overflow-hidden">
              <div
                key={currentThemeIndex}
                className="grid grid-cols-2 gap-3 sm:gap-6 h-full content-start"
              >
                {(!isMounted || (currentThemeLoading && packages.length === 0)) ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={`skeleton-${i}`}
                      className="h-48 sm:h-64 rounded-2xl bg-slate-100 animate-pulse"
                    />
                  ))
                ) : packages.length > 0 ? (
                  packages.map((pkg, index) => (
                    <div
                      key={pkg.id || index}
                      className="group cursor-pointer relative h-52 sm:h-64 lg:h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <Link
                        href={`/packages/${pkg.region}/${pkg.packageSlug}`}
                        prefetch={false}
                        className="block w-full h-full"
                      >
                        <div className="absolute inset-0 bg-slate-200">
                          <Image
                            src={
                              pkg.cardImages?.[0]?.url ||
                              pkg.image ||
                              pkg.imageUrl ||
                              "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800"
                            }
                            alt={pkg.packageTitle}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                        <div className="absolute inset-0 p-3 sm:p-6 flex flex-col justify-end">
                          <h3 className="text-sm sm:text-xl font-bold text-white mb-0.5 sm:mb-1 drop-shadow-md capitalize leading-tight">
                            {pkg.region.split("-").join(" ")}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                            <p className="text-white/80 text-[10px] sm:text-sm line-clamp-1">
                              {pkg.packageTitle}
                            </p>
                            <span className="text-white font-bold bg-brand-blue/90 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded backdrop-blur-sm text-[10px] sm:text-sm whitespace-nowrap self-start sm:self-auto uppercase tracking-tighter">
                              {pkg.basePrice > 0 ? `₹${formatPrice(pkg.basePrice)}` : "On Request"}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full h-64 flex items-center justify-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                    <p className="text-slate-400 font-medium">Coming Soon</p>
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-end">
                 <Link 
                    href="/themes"
                    prefetch={false}
                    className="group inline-flex items-center gap-2 text-slate-500 hover:text-brand-blue font-semibold transition-colors text-sm sm:text-base"
                 >
                    View All Categories <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                 </Link>
             </div>
          </div>
        </div>
      </Container>
    </section>
  );
}