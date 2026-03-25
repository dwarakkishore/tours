"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Crown, 
  Diamond, 
  MapPin, 
  Star, 
  Sparkles, 
  ChevronRight, 
  Award, 
  Gem,
  ArrowRight,
  ConciergeBell,
  Plane,
  ShieldCheck,
  PlayCircle,
  Search,
  User,
  Clock
} from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ThemedPackageCard from "@/components/ui/ThemedPackageCard";
import { usePackagesByTheme } from "@/hooks/packages";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { getPaginationPages } from "@/utils/paginationUtils";
import { cn } from "@/lib/utils";

import InspirationSection from "@/components/Landing/InspirationSection";
import VideoReelModal from "@/components/ui/VideoReelModal";
import { VIDEO_MAP } from "@/config/themePackages";

export default function EliteEscapeClient({ initialRegions = [], initialPackages = [] }) {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectionType, setSelectionType] = useState("International");
  const [currentPage, setCurrentPage] = useState(1);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const itemsPerPage = 8;
  const packagesRef = useRef(null);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRegion, selectionType]);

  const { 
    packages: allThemePackages, 
    isLoading, 
    error 
  } = usePackagesByTheme("elite-escape");

  const elitePackages = useMemo(() => {
    let pkgSource = [];
    if (Array.isArray(allThemePackages) && allThemePackages.length > 0) {
      pkgSource = allThemePackages;
    } else if (Array.isArray(initialPackages)) {
      pkgSource = initialPackages;
    }
    
    // Safeguard: Ensure pkgSource is a valid array
    if (!Array.isArray(pkgSource)) return [];

    const uniqueMap = new Map();
    try {
      pkgSource.forEach(pkg => {
        if (pkg && pkg.id && !uniqueMap.has(pkg.id)) {
          uniqueMap.set(pkg.id, pkg);
        }
      });
    } catch (e) {
      console.error("Error processing packages map:", e);
      return pkgSource.slice(0, 50); // Fallback to raw slice if Map fails
    }
    return Array.from(uniqueMap.values());
  }, [allThemePackages, initialPackages]);

  const availableRegions = useMemo(() => 
    Array.from(new Set(elitePackages.map(pkg => pkg.region))).sort()
  , [elitePackages]);

  const domesticRegions = useMemo(() => availableRegions.filter(regionName => {
    const regionData = initialRegions.find(r => r.name === regionName || r.slug === regionName.toLowerCase().replace(/\s+/g, '-'));
    return regionData?.isDomestic;
  }), [availableRegions, initialRegions]);

  const internationalRegions = useMemo(() => availableRegions.filter(regionName => {
    const regionData = initialRegions.find(r => r.name === regionName || r.slug === regionName.toLowerCase().replace(/\s+/g, '-'));
    return !regionData?.isDomestic;
  }), [availableRegions, initialRegions]);

  const displayRegions = selectionType === "Domestic" ? domesticRegions : internationalRegions;

  const filteredPackages = useMemo(() => {
    const filtered = elitePackages.filter(pkg => {
      const isLevelMatch = selectedRegion === "All" || pkg.region === selectedRegion;
      const regionData = initialRegions.find(r => r.name === pkg.region || r.slug === pkg.region.toLowerCase().replace(/\s+/g, '-'));
      const isTypeMatch = selectionType === "Domestic" ? regionData?.isDomestic : !regionData?.isDomestic;
      return isLevelMatch && isTypeMatch;
    });

    // Sort: Non-zero prices first
    return [...filtered].sort((a, b) => {
      const priceA = (a.offerPrice > 0 ? a.offerPrice : a.basePrice) || 0;
      const priceB = (b.offerPrice > 0 ? b.offerPrice : b.basePrice) || 0;
      if (priceA > 0 && priceB === 0) return -1;
      if (priceA === 0 && priceB > 0) return 1;
      return 0;
    });
  }, [elitePackages, selectedRegion, selectionType, initialRegions]);

  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  
  const paginatedPackages = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const paginated = filteredPackages.slice(start, start + itemsPerPage);
    
    // Logic: First page should not show 0 price packages
    if (currentPage === 1) {
      return paginated.filter(pkg => {
        const price = (pkg.offerPrice > 0 ? pkg.offerPrice : pkg.basePrice) || 0;
        return price > 0;
      });
    }
    return paginated;
  }, [filteredPackages, currentPage, itemsPerPage]);

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1a1a] font-sans selection:bg-[#d4af37] selection:text-white">


      <VideoReelModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        videoUrl={VIDEO_MAP["elite-escape"]} 
      />

      {/* Hero Section */}
      <section className="relative min-h-[75vh] lg:min-h-[85vh] pt-20 overflow-hidden flex items-center bg-gradient-to-br from-[#faf9f7] via-[#f5f3f0] to-[#faf9f7]">
        {/* Elegant Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, #d4af37 0, #d4af37 1px, transparent 0, transparent 50%)`,
            backgroundSize: '10px 10px'
          }}></div>
        </div>
        
        {/* Decorative Gold Accents */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#c9a961]/5 rounded-full blur-3xl"></div>


        {/* Hero Content */}
        <Container className="relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center py-6 md:py-8 lg:py-12">
          
          {/* Left Content */}
          <motion.div 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <Breadcrumbs 
              items={[
                { label: "Home", href: "/" },
                { label: "Themes", href: "/themes" },
                { label: "Elite Escape", href: "/themes/elite-escape", active: true }
              ]} 
              className="bg-transparent border-transparent p-0 mb-4 flex justify-center md:justify-start"
              omitContainer
              colorClasses="text-[#8b7355]"
              activeColorClasses="text-[#d4af37] font-bold"
            />
          
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-tight">
              <span className="block text-[#1a1a1a]">ELITE</span>
              <span className="block text-[#d4af37] italic mt-1">Escape</span>
              <span className="block text-[#8b7355] text-2xl md:text-3xl lg:text-4xl mt-3 font-semibold">Curated Luxury</span>
            </h1>
          
            <p className="text-base md:text-lg text-[#5a5a5a] max-w-lg leading-relaxed">
              Beyond the ordinary. A curated selection of the world's most exclusive destinations, 
              reserved for the discerning few.
            </p>
          
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="#packages">
                <button className="px-8 py-4 bg-[#d4af37] text-white rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-[#c9a961] transition-all shadow-lg hover:shadow-xl flex items-center space-x-2 group w-full sm:w-auto">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <button 
                onClick={() => setIsVideoModalOpen(true)}
                className="px-8 py-4 bg-white border-2 border-[#d4af37] text-[#d4af37] rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-[#d4af37]/5 transition-all flex items-center space-x-2"
              >
                <PlayCircle className="w-5 h-5" />
                <span>Watch Reel</span>
              </button>
            </div>

            {/* Stats Row */}
            <div className="flex gap-8 pt-4 border-t border-[#d4af37]/20">
              <div>
                <div className="text-3xl font-bold text-[#d4af37]">50+</div>
                <div className="text-xs text-[#8b7355] uppercase tracking-wider font-bold">Elite Properties</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#8b7355]">24/7</div>
                <div className="text-xs text-[#8b7355] uppercase tracking-wider font-bold">Concierge</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#c9a961]">5★</div>
                <div className="text-xs text-[#8b7355] uppercase tracking-wider font-bold">Luxury Only</div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Content - Elegant Grid Gallery */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Large Featured Image - Top Left */}
              <motion.div 
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="col-span-2 relative h-64 md:h-80 rounded-xl overflow-hidden group"
              >
                <Image 
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Luxury Resort Pool" 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4af37] rounded-full mb-3">
                    <Crown className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Featured</span>
                  </div>
                  <h3 className="text-white font-serif text-2xl">Exclusive Resorts</h3>
                </div>
              </motion.div>
              
              {/* Small Image - Bottom Left */}
              <motion.div 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative h-40 md:h-48 rounded-xl overflow-hidden group"
              >
                <Image 
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Private Villa" 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-white font-semibold text-sm">Private Villas</div>
                </div>
              </motion.div>
              
              {/* Small Image - Bottom Right */}
              <motion.div 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative h-40 md:h-48 rounded-xl overflow-hidden group"
              >
                <Image 
                  src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Luxury Spa" 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-white font-semibold text-sm">Premium Spas</div>
                </div>
              </motion.div>
            </div>
            
            {/* Floating Quality Badge */}
            <motion.div 
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-2xl border-4 border-[#d4af37]/20"
            >
              <div className="text-center">
                <Diamond className="w-8 h-8 text-[#d4af37] mx-auto mb-1" />
                <div className="text-xs font-bold text-[#1a1a1a]">Elite</div>
              </div>
            </motion.div>
          </div>
        </div>
        </Container>

      </section>


      {/* Filter and Selection Section */}
      <section id="packages" className="section-padding bg-white border-b border-[#d4af37]/10" ref={packagesRef}>
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-16 border-b border-[#d4af37]/20 pb-6 md:pb-10">
            <div className="mb-8 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-4">Curated Destinations</h2>
              <p className="text-[#8b7355] font-medium tracking-wide uppercase text-xs">Hand-selected properties and experiences</p>
            </div>
            
            <div className="flex gap-1.5 bg-[#f5f3f0] p-1 rounded-lg border border-[#d4af37]/20">
              <button
                onClick={() => {
                  setSelectionType("International");
                  setSelectedRegion("All");
                }}
                className={cn(
                  "px-8 py-3 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 rounded-md",
                  selectionType === "International" 
                    ? "bg-[#d4af37] text-white shadow-lg" 
                    : "text-[#8b7355] hover:text-[#1a1a1a] hover:bg-white/50"
                )}
              >
                International
              </button>
              <button
                onClick={() => {
                  setSelectionType("Domestic");
                  setSelectedRegion("All");
                }}
                className={cn(
                  "px-8 py-3 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 rounded-md",
                  selectionType === "Domestic" 
                    ? "bg-[#d4af37] text-white shadow-lg" 
                    : "text-[#8b7355] hover:text-[#1a1a1a] hover:bg-white/50"
                )}
              >
                Domestic
              </button>
            </div>
          </div>

          {/* Region Tabs (Secondary Filter) */}
          <div className="flex overflow-x-auto scrollbar-hide gap-4 md:gap-6 mb-8 md:mb-16 pb-4 border-b border-[#d4af37]/10">
            <button
              onClick={() => setSelectedRegion("All")}
              className={cn(
                "whitespace-nowrap pb-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-all border-b-2",
                selectedRegion === "All" 
                  ? "text-[#d4af37] border-[#d4af37]" 
                  : "text-[#8b7355] border-transparent hover:text-[#1a1a1a]"
              )}
            >
              All Regions
            </button>
            {displayRegions.map(region => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={cn(
                  "whitespace-nowrap pb-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-all border-b-2",
                  selectedRegion === region 
                    ? "text-[#d4af37] border-[#d4af37]" 
                    : "text-[#8b7355] border-transparent hover:text-[#1a1a1a]"
                )}
              >
                {region.replace(/-/g, ' ')}
              </button>
            ))}
          </div>

          {/* Package Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 min-h-[400px]">
            {isLoading ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="h-96 bg-[#f5f3f0] border border-[#d4af37]/20 animate-pulse rounded-lg" />
              ))
            ) : paginatedPackages.length > 0 ? (
              <AnimatePresence mode="popLayout">
                {paginatedPackages.map((pkg, idx) => (
                  <motion.div
                    key={pkg.id}
                    layout
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                  >
                    <ThemedPackageCard
                      theme="elite"
                      item={pkg}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className="col-span-full py-16 text-center text-[#8b7355] font-serif italic text-2xl">
                The collection for this selection is currently being curated.
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <Pagination>
                <PaginationContent className="gap-3">
                  <PaginationItem>
                    <PaginationPrevious
                      className={cn(
                        "cursor-pointer rounded-lg h-12 px-6 border-[#d4af37]/30 text-[#8b7355] hover:bg-[#d4af37] hover:text-white hover:border-[#d4af37] transition-all",
                        currentPage === 1 && "pointer-events-none opacity-20"
                      )}
                      onClick={() => {
                        setCurrentPage(currentPage - 1);
                        packagesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    />
                  </PaginationItem>
                  
                  {getPaginationPages(currentPage, totalPages).map((page, i) => (
                    <PaginationItem key={i} className="hidden sm:block">
                      {page === "..." ? (
                        <PaginationEllipsis className="text-[#d4af37]" />
                      ) : (
                        <PaginationLink
                          className={cn(
                            "cursor-pointer rounded-lg h-12 w-12 font-bold transition-all border-[#d4af37]/30",
                            currentPage === page 
                              ? "bg-[#d4af37] text-white border-[#d4af37] shadow-lg" 
                              : "text-[#8b7355] hover:bg-[#d4af37]/10 hover:text-[#1a1a1a]"
                          )}
                          onClick={() => {
                            setCurrentPage(page);
                            packagesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      className={cn(
                        "cursor-pointer rounded-lg h-12 px-6 border-[#d4af37]/30 text-[#8b7355] hover:bg-[#d4af37] hover:text-white hover:border-[#d4af37] transition-all",
                        currentPage === totalPages && "pointer-events-none opacity-20"
                      )}
                      onClick={() => {
                        setCurrentPage(currentPage + 1);
                        packagesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          <div className="mt-12 text-center">
            <button className="px-16 py-5 border-2 border-[#d4af37]/30 text-xs uppercase tracking-[0.4em] text-[#8b7355] font-bold hover:bg-[#d4af37] hover:text-white hover:border-[#d4af37] transition-all duration-500 group rounded-lg">
              <span>View All Elite Properties</span>
            </button>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gradient-to-br from-[#f5f3f0] to-[#faf9f7] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, #d4af37 0, #d4af37 1px, transparent 0, transparent 50%)`,
            backgroundSize: '10px 10px'
          }}></div>
        </div>

        <Container className="relative z-10">
          <div className="grid md:grid-cols-3 gap-8 md:gap-16 text-center">
            <motion.div 
              className="group"
            >
              <div className="w-24 h-24 mx-auto mb-8 border-2 border-[#d4af37]/30 rounded-full flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-white transition-all duration-700 shadow-lg">
                <ConciergeBell className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif text-[#1a1a1a] mb-6">24/7 Concierge</h3>
              <p className="text-[#5a5a5a] font-medium text-base leading-relaxed max-w-[280px] mx-auto">Dedicated lifestyle managers available around the clock to fulfill any request, anywhere.</p>
            </motion.div>

            <motion.div 
              transition={{ delay: 0.1 }}
              className="group"
            >
              <div className="w-24 h-24 mx-auto mb-8 border-2 border-[#d4af37]/30 rounded-full flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-white transition-all duration-700 shadow-lg">
                <Plane className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif text-[#1a1a1a] mb-6">Private Aviation</h3>
              <p className="text-[#5a5a5a] font-medium text-base leading-relaxed max-w-[280px] mx-auto">Access to our fleet of private jets and helicopters ensuring absolute privacy and convenience.</p>
            </motion.div>

            <motion.div 
              transition={{ delay: 0.2 }}
              className="group"
            >
              <div className="w-24 h-24 mx-auto mb-8 border-2 border-[#d4af37]/30 rounded-full flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-white transition-all duration-700 shadow-lg">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif text-[#1a1a1a] mb-6">Discreet Security</h3>
              <p className="text-[#5a5a5a] font-medium text-base leading-relaxed max-w-[280px] mx-auto">Unobtrusive protection services and secure transportation for complete peace of mind.</p>
            </motion.div>
          </div>
        </Container>
      </section>


      <section className="h-full bg-white relative">
        <InspirationSection theme="elite" />
      </section>

      <style jsx>{`
        .text-gold-gradient {
          background: linear-gradient(135deg, #f7e7ce 0%, #d4af37 50%, #b8941f 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .bg-gold-gradient {
          background: linear-gradient(135deg, #f7e7ce 0%, #d4af37 50%, #b8941f 100%);
        }
      `}</style>
    </div>
  );
}
