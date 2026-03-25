"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Compass, 
  Map as LucideMap, 
  Tent, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Mountain, 
  ChevronRight, 
  Backpack, 
  TreePine, 
  Flame, 
  Zap, 
  Wind, 
  Navigation,
  ArrowRight,
  Play,
  Search,
  ShoppingBag,
  CheckCircle,
  Landmark,
  Waves,
  Box,
  Route
} from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";
import { usePackagesByTheme } from "@/hooks/packages";
import ThemedPackageCard from "@/components/ui/ThemedPackageCard";
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

import InspirationSection from "@/components/Landing/InspirationSection";
import VideoReelModal from "@/components/ui/VideoReelModal";
import { VIDEO_MAP } from "@/config/themePackages";

export default function ExplorationBundleClient() {
  const [selectedTab, setSelectedTab] = useState("international");
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const itemsPerPage = 8;
  const packagesRef = useRef(null);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setCurrentPage(1);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const { 
    packages: allThemePackages, 
    isLoading, 
    error 
  } = usePackagesByTheme("exploration-bundle");

  const adventurePackages = useMemo(() => {
    let pkgSource = [];
    if (Array.isArray(allThemePackages) && allThemePackages.length > 0) {
      pkgSource = allThemePackages;
    }

    // Safeguard
    if (!Array.isArray(pkgSource)) return { international: [], domestic: [] };
    
    // Deduplicate by package ID
    const uniqueMap = new Map();
    try {
      pkgSource.forEach(pkg => {
        if (pkg && pkg.id && !uniqueMap.has(pkg.id)) {
          uniqueMap.set(pkg.id, pkg);
        }
      });
    } catch (e) {
      console.error("Error processing packages map:", e);
      return { international: [], domestic: [] };
    }
    const uniquePackages = Array.from(uniqueMap.values());
    
    // Sort: Non-zero prices first
    const sorted = [...uniquePackages].sort((a, b) => {
      const priceA = (a.offerPrice > 0 ? a.offerPrice : a.basePrice) || 0;
      const priceB = (b.offerPrice > 0 ? b.offerPrice : b.basePrice) || 0;
      if (priceA > 0 && priceB === 0) return -1;
      if (priceA === 0 && priceB > 0) return 1;
      return 0;
    });

    return {
      international: sorted.filter(pkg => !pkg.domestic),
      domestic: sorted.filter(pkg => pkg.domestic)
    };
  }, [allThemePackages]);

  const currentPackages = adventurePackages[selectedTab] || [];
  const totalPages = Math.ceil(currentPackages.length / itemsPerPage);
  
  const paginatedPackages = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const paginated = currentPackages.slice(start, start + itemsPerPage);

    // Logic: First page should not show 0 price packages
    if (currentPage === 1) {
      return paginated.filter(pkg => {
        const price = (pkg.offerPrice > 0 ? pkg.offerPrice : pkg.basePrice) || 0;
        return price > 0;
      });
    }
    return paginated;
  }, [currentPackages, currentPage, itemsPerPage]);

  if (!mounted) return null;

  if (isLoading) {
    return <ThemeLoader theme="exploration" fullScreen className="bg-[#f7f5f3]" />;
  }

  return (
    <div className="min-h-screen bg-[#f7f5f3] text-[#1d1d1d] font-sans selection:bg-[#e76f51] selection:text-white overflow-x-hidden">
      <VideoReelModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        videoUrl={VIDEO_MAP["exploration-bundle"]} 
      />
      {/* Hero Section */}
      <section className="relative min-h-[75vh] lg:min-h-[85vh] pt-20 topo-pattern overflow-hidden flex items-center">
        {/* Animated Compass Background */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] compass-rose opacity-10 pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            style={{ willChange: "transform", backfaceVisibility: "hidden" }}
            className="w-full h-full"
          >
            <Compass className="w-full h-full text-[#e76f51]/5" />
          </motion.div>
        </div>
        
        <Container className="relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center py-6 md:py-8 lg:py-12">
            
            {/* Left Content */}
            <motion.div 
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <Breadcrumbs 
                items={[
                  { label: "Home", href: "/" },
                  { label: "Themes", href: "/themes" },
                  { label: "Exploration Bundle", href: "/themes/exploration-bundle", active: true }
                ]} 
                className="bg-transparent border-transparent p-0 mb-4 flex justify-center md:justify-start"
                omitContainer
              />
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] text-shadow-adventure">
                <span className="block text-[#1d1d1d]">ADVENTURE</span>
                <span className="block text-[#e76f51] mt-2">BUNDLES</span>
                <span className="block text-[#2a9d8f] text-4xl md:text-5xl lg:text-6xl mt-4 font-serif italic font-bold">Curated Expeditions</span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed font-medium">
                Multi-destination packages for the modern explorer. Combine treks, wildlife encounters, and cultural immersions into one epic journey.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="#packages">
                  <button className="px-8 py-4 bg-[#e76f51] text-white rounded-lg font-bold text-lg uppercase tracking-wide hover:bg-[#d65a3c] transition-all shadow-xl shadow-[#e76f51]/30 flex items-center space-x-2 group w-full sm:w-auto">
                    <span>Explore Bundles</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <button 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="px-8 py-4 bg-white border-2 border-[#2a9d8f] text-[#21867a] rounded-lg font-bold text-lg uppercase tracking-wide hover:bg-[#2a9d8f]/5 transition-all flex items-center space-x-2"
                >
                  <Play className="w-5 h-5 fill-[#21867a]" />
                  <span>Watch Reel</span>
                </button>
              </div>
              
              {/* Bundle Stats */}
              <div className="flex space-x-8 pt-8 border-t-2 border-[#e76f51]/20">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#e76f51]">12</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Bundle Options</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#2a9d8f]">4-14</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Days Range</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#e9c46a]">3-5</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Activities Per Bundle</div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Content - Adventure Collage */}
            <div className="relative h-[500px] md:h-[600px] perspective-1000">
              {/* Main Image */}
              <motion.div 
                animate={{ opacity: 1, x: 0, rotate: 3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute top-0 right-0 w-4/5 h-4/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-0"
              >
                <Image 
                  src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Hiking Adventure" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
                  <div className="text-white font-bold text-xl">Mountain Treks</div>
                </div>
              </motion.div>
              
              {/* Secondary Image */}
              <motion.div 
                animate={{ opacity: 1, x: 0, rotate: -2 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute bottom-0 left-0 w-3/5 h-3/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10"
              >
                <Image 
                  src="https://images.unsplash.com/photo-1533240332313-0db49b459ad6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Wildlife" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
                  <div className="text-white font-bold text-lg">Wildlife Safaris</div>
                </div>
              </motion.div>
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 z-20"
              >
                <div className="bg-[#2a9d8f] text-white p-5 rounded-2xl shadow-xl transform -rotate-12 border-2 border-white/20">
                  <div className="text-2xl font-bold">Best</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold">Value</div>
                </div>
              </motion.div>
              
              {/* Activity Icons */}
              <div className="absolute bottom-10 right-10 flex space-x-3 z-20">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#e76f51] text-xl border-2 border-[#e76f51] cursor-pointer"
                >
                  <Mountain className="w-6 h-6" />
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  transition={{ delay: 0.1 }}
                  className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#2a9d8f] text-xl border-2 border-[#2a9d8f] cursor-pointer"
                >
                  <Tent className="w-6 h-6" />
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  transition={{ delay: 0.2 }}
                  className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#e9c46a] text-xl border-2 border-[#e9c46a] cursor-pointer"
                >
                  <LucideMap className="w-6 h-6" />
                </motion.div>
              </div>
            </div>
          </div>
        </Container>
      </section>



      {/* Filter Tabs Section */}
      <section id="packages" className="py-4 md:py-6 bg-white border-b-2 border-stone-100 sticky top-24 z-40 shadow-sm gpu-accelerated">
        <Container>
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => handleTabChange("international")}
              className={cn(
                "px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2",
                selectedTab === "international" 
                  ? "bg-[#1d1d1d] text-white shadow-lg shadow-[#1d1d1d]/20" 
                  : "bg-stone-100 text-[#1d1d1d]/60 hover:bg-stone-200"
              )}
            >
              <Navigation className="w-4 h-4" />
              International Bundles
            </button>
            <button 
              onClick={() => handleTabChange("domestic")}
              className={cn(
                "px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2",
                selectedTab === "domestic" 
                  ? "bg-[#1d1d1d] text-white shadow-lg shadow-[#1d1d1d]/20" 
                  : "bg-stone-100 text-[#1d1d1d]/60 hover:bg-stone-200"
              )}
            >
              <MapPin className="w-4 h-4" />
              Domestic Bundles
            </button>
          </div>
        </Container>
      </section>

      {/* Main Content / Grid */}
      <section id="bundles" className="section-padding map-texture overflow-hidden gpu-accelerated" ref={packagesRef}>
        <Container>
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-5xl md:text-7xl font-bold text-[#1d1d1d] mb-6">Ready-Made Adventures</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">Curated combinations of our most popular explorations. Just book and go.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {isLoading ? (
              <div className="col-span-full flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              </div>
            ) : paginatedPackages.length > 0 ? (
              <AnimatePresence>
                {paginatedPackages.map((pkg, idx) => (
                  <motion.div
                    key={pkg.id}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
                  >
                    <ThemedPackageCard
                      theme="exploration"
                      item={pkg}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className="col-span-full py-16 text-center">
                <div className="inline-block p-10 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                  <Wind className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-2xl font-serif italic text-gray-500">The map for this region is currently being drawn.</p>
                </div>
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
                        "cursor-pointer rounded-2xl h-14 w-14 border-2 border-[#1d1d1d]/10 text-[#1d1d1d] hover:bg-[#e76f51] hover:text-white hover:border-[#e76f51] transition-all",
                        currentPage === 1 && "pointer-events-none opacity-30"
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
                        <PaginationEllipsis className="text-[#e76f51]" />
                      ) : (
                        <PaginationLink
                          className={cn(
                            "cursor-pointer rounded-2xl h-14 w-14 font-bold transition-all border-2",
                            currentPage === page 
                              ? "bg-white text-[#e76f51] border-[#e76f51] shadow-xl" 
                              : "border-[#1d1d1d]/10 text-gray-400 hover:bg-stone-50"
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
                        "cursor-pointer rounded-2xl h-14 w-14 border-2 border-[#1d1d1d]/10 text-[#1d1d1d] hover:bg-[#e76f51] hover:text-white hover:border-[#e76f51] transition-all",
                        currentPage === totalPages && "pointer-events-none opacity-30"
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
        </Container>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-[#1d1d1d] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/topography.png')]"></div>
        
        <Container className="relative z-10">
          <div className="grid md:grid-cols-3 gap-8 md:gap-16 text-center">
            <motion.div 
              className="group"
            >
              <div className="w-20 h-20 mx-auto mb-8 bg-[#e76f51] rounded-2xl rotate-3 flex items-center justify-center text-3xl shadow-xl group-hover:rotate-6 transition-transform">
                <Box className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-wider">All-Inclusive</h3>
              <p className="text-gray-400 text-lg leading-relaxed">Gear, guides, permits, and accommodation bundled. Just bring your sense of adventure.</p>
            </motion.div>
            
            <motion.div 
              transition={{ delay: 0.1 }}
              className="group"
            >
              <div className="w-20 h-20 mx-auto mb-8 bg-[#2a9d8f] rounded-2xl -rotate-3 flex items-center justify-center text-3xl shadow-xl group-hover:-rotate-6 transition-transform">
                <Route className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-wider">Curated Routes</h3>
              <p className="text-gray-400 text-lg leading-relaxed">Expert-planned itineraries connecting multiple destinations efficiently.</p>
            </motion.div>
            
            <motion.div 
              transition={{ delay: 0.2 }}
              className="group"
            >
              <div className="w-20 h-20 mx-auto mb-8 bg-[#e9c46a] rounded-2xl rotate-3 flex items-center justify-center text-3xl shadow-xl group-hover:rotate-6 transition-transform">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-wider">Small Groups</h3>
              <p className="text-gray-400 text-lg leading-relaxed">Maximum 12 explorers per bundle for intimate, flexible adventures.</p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Footer CTA */}
      <section className="section-padding bg-stone-50 border-t-4 border-[#e76f51]">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-12">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-[#1d1d1d] mb-4">Ready for Discovery?</h2>
              <p className="text-xl text-gray-500 font-medium">Join the community of modern explorers today.</p>
            </div>
            <button className="px-12 py-5 bg-[#e76f51] text-white rounded-xl font-bold text-xl uppercase tracking-widest hover:bg-[#d65a3c] transition-all shadow-2xl shadow-[#e76f51]/30">
              Start Your Expedition
            </button>
          </div>
        </Container>
      </section>

      <section>
        <InspirationSection theme="exploration" />
      </section>

      <style jsx global>{`
        .topo-pattern {
            background-color: #f7f5f3;
            background-image: 
                linear-gradient(rgba(231, 111, 111, 0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(231, 111, 111, 0.02) 1px, transparent 1px);
            background-size: 40px 40px;
            transform: translateZ(0);
        }
        
        .map-texture {
            background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='11' cy='18' r='7' fill='%23e76f51' fill-opacity='0.03'/%3E%3Ccircle cx='59' cy='43' r='7' fill='%23e76f51' fill-opacity='0.03'/%3E%3C/svg%3E");
            transform: translateZ(0);
        }

        .text-shadow-adventure {
            text-shadow: 2px 2px 0px rgba(231, 111, 111, 0.2);
        }

        .perspective-1000 {
            perspective: 1000px;
            transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}
