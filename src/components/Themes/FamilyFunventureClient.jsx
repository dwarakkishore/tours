"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart,
  Users,
  ShieldCheck,
  Check,
  Camera,
  Mountain,
  Compass,
  PlayCircle,
  ArrowRight,
  ChevronRight,
  Star,
  Calendar,
  MapPin,
  Smile
} from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
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
import { cn } from "@/lib/utils";

import InspirationSection from "@/components/Landing/InspirationSection";
import VideoReelModal from "@/components/ui/VideoReelModal";
import { VIDEO_MAP } from "@/config/themePackages";

export default function FamilyFunventureClient() {
  const [selectedTab, setSelectedTab] = useState("international");
  const [currentPage, setCurrentPage] = useState(1);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const itemsPerPage = 8;
  const packagesRef = useRef(null);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setCurrentPage(1);
  };

  const { 
    packages: allThemePackages, 
    isLoading, 
    error 
  } = usePackagesByTheme("family-funventure");

  const familyPackages = useMemo(() => {
    let pkgSource = [];
    if (Array.isArray(allThemePackages) && allThemePackages.length > 0) {
      pkgSource = allThemePackages;
    }

    // Safeguard
    if (!Array.isArray(pkgSource)) return { international: [], domestic: [] };
    
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
    
    // Sorting: Non-zero prices first
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

  const currentPackages = familyPackages[selectedTab] || [];
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

  return (
    <div className="min-h-screen bg-[#fffcf5] text-[#1f2937] font-sans selection:bg-[#ff8a5c] selection:text-white overflow-x-hidden">
      <VideoReelModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        videoUrl={VIDEO_MAP["family-funventure"]} 
      />


      {/* Hero Section */}
      <section className="relative min-h-[75vh] lg:min-h-[85vh] pt-20 overflow-hidden bg-gradient-to-br from-[#fef9f3] to-[#fff8f0]">
        {/* Watercolor Background Effects */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
        </div>

        {/* Pattern Dots */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(#FF6B6B 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-[60vh] py-12">
            {/* Left Content */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <Breadcrumbs 
                items={[
                  { label: "Home", href: "/" },
                  { label: "Themes", href: "/themes" },
                  { label: "Family Funventure", href: "/themes/family-funventure", active: true }
                ]}
                className="bg-transparent border-transparent p-0 mb-4 flex justify-center md:justify-start"
                omitContainer
              />
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="block text-slate-900">Family</span>
                <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-500 mt-2 transform -rotate-1 inline-block">
                  Funventure
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 max-w-lg leading-relaxed font-light">
                Where laughter echoes across mountains and memories sparkle like ocean waves. 
                Discover curated journeys that bring generations together in wonder.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="#packages">
                  <Button className="h-14 px-8 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 border-none w-full sm:w-auto">
                    <span>Start Exploring</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="h-14 px-8 rounded-full border-2 border-slate-200 text-slate-900 font-semibold text-lg hover:border-orange-400 hover:text-orange-500 transition-all duration-300 flex items-center space-x-2 group bg-white/50 backdrop-blur-sm"
                >
                  <PlayCircle className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform" />
                  <span>Watch Stories</span>
                </Button>
              </div>
              
              {/* Stats */}
              <div className="flex space-x-8 pt-8 border-t border-slate-200/50">
                <div>
                  <div className="text-3xl font-bold text-slate-900">500+</div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Family Trips</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500">4.9</div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-500">50+</div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Destinations</div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Content - Artistic Composition */}
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 group">
                {/* Organic Shape Container */}
                <div className="relative w-full h-[500px] overflow-hidden shadow-2xl border-8 border-white/50 transform group-hover:scale-[1.02] transition-transform duration-500"
                  style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=90"
                    alt="Family Funventure"
                    fill
                    className="object-cover"
                    priority
                  />
                  
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-100 animate-bounce-slow opacity-80 -z-10"
                  style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }} />
                
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-teal-50 animate-float opacity-80 z-20 flex items-center justify-center shadow-lg"
                  style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}>
                  <Camera className="w-8 h-8 text-teal-500" />
                </div>
                
                {/* Floating Info Cards */}
                <div className="absolute top-10 -left-8 bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-xl z-20 animate-float-slow transition-transform hover:scale-105">
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative">
                          <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" fill />
                        </div>
                      ))}
                    </div>
                    <div className="text-xs">
                      <div className="font-bold text-slate-900">2k+ families</div>
                      <div className="text-slate-500">joined this month</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-20 -right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl z-20 animate-float-slow delay-1000 transition-transform hover:scale-105">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 shadow-inner">
                      <Check className="w-6 h-6 font-bold" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Best Price</div>
                      <div className="font-bold text-slate-900">Guaranteed</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg className="w-full h-24 fill-[#fef9f3]" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>


      {/* Filter Section */}
      <section id="packages" className="section-padding bg-[#fef9f3]">
        <Container>
          <div className="flex justify-center">
            <div className="bg-white p-2 rounded-full shadow-xl inline-flex border border-orange-100">
              <button
                onClick={() => handleTabChange("international")}
                className={cn(
                  "px-8 py-3 rounded-full font-bold transition-all duration-300",
                  selectedTab === "international"
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md"
                    : "text-slate-500 hover:text-orange-500"
                )}
              >
                International
              </button>
              <button
                onClick={() => handleTabChange("domestic")}
                className={cn(
                  "px-8 py-3 rounded-full font-bold transition-all duration-300",
                  selectedTab === "domestic"
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md"
                    : "text-slate-500 hover:text-orange-500"
                )}
              >
                Domestic
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Packages Grid Section */}
      <section className="section-padding bg-[#fef9f3]" ref={packagesRef}>
        <Container>
          <motion.div 
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Curated Adventures</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Handpicked destinations designed for multi-generational bonding and unforgettable stories</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="h-96 rounded-3xl bg-white shadow-md animate-pulse p-4 flex flex-col gap-4">
                  <div className="h-52 rounded-2xl bg-slate-100 w-full" />
                  <div className="h-6 bg-slate-100 rounded w-3/4" />
                  <div className="h-4 bg-slate-100 rounded w-1/2" />
                  <div className="mt-auto h-12 bg-slate-100 rounded-full w-full" />
                </div>
              ))
            ) : (
              <AnimatePresence mode="popLayout">
                {paginatedPackages.length > 0 ? (
                  paginatedPackages.map((pkg, index) => (
                    <motion.div
                      key={pkg.id}
                      layout
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <ThemedPackageCard 
                        theme="family"
                        item={pkg}
                      />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-slate-500 text-lg">No packages found for this selection.</p>
                  </div>
                )}
              </AnimatePresence>
            )}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center">
              <Pagination>
                <PaginationContent className="gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      className={cn(
                        "cursor-pointer rounded-full h-12 px-6 bg-white border-slate-200 text-slate-700 hover:bg-orange-500 hover:text-white transition-all shadow-md",
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
                        <PaginationEllipsis className="text-orange-400" />
                      ) : (
                        <PaginationLink
                          className={cn(
                            "cursor-pointer rounded-full h-12 w-12 bg-white font-bold transition-all border-slate-200 shadow-md",
                            currentPage === page 
                              ? "bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-lg border-transparent" 
                              : "text-slate-700 hover:bg-orange-50"
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
                        "cursor-pointer rounded-full h-12 px-6 bg-white border-slate-200 text-slate-700 hover:bg-orange-500 hover:text-white transition-all shadow-md",
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

          <div className="text-center mt-8">
            <Button variant="outline" className="px-10 py-6 border-2 border-slate-200 text-slate-700 rounded-full font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300">
              View All Family Packages
            </Button>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Decorative background characters */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none flex items-center justify-between px-10">
          <div className="text-[20rem] font-serif text-orange-500 pointer-events-none">&ldquo;</div>
          <div className="text-[20rem] font-serif text-teal-500 pointer-events-none">&rdquo;</div>
        </div>
        
        <Container className="relative z-10">
          <div className="grid md:grid-cols-3 gap-6 md:gap-12">
            <motion.div 
              className="text-center p-6 md:p-8 lg:p-10 rounded-[2.5rem] bg-[#fef9f3] hover:bg-orange-50 transition-all duration-500 group shadow-sm hover:shadow-xl"
            >
              <div className="w-24 h-24 mx-auto mb-8 bg-white rounded-3xl shadow-lg flex items-center justify-center text-4xl text-orange-500 transform group-hover:rotate-6 transition-transform">
                <ShieldCheck className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Safety First</h3>
              <p className="text-slate-600 leading-relaxed">Verified family-friendly accommodations and 24/7 support during your journey.</p>
            </motion.div>
            
            <motion.div 
              transition={{ delay: 0.1 }}
              className="text-center p-6 md:p-8 lg:p-10 rounded-[2.5rem] bg-[#fef9f3] hover:bg-orange-50 transition-all duration-500 group shadow-sm hover:shadow-xl"
            >
              <div className="w-24 h-24 mx-auto mb-8 bg-white rounded-3xl shadow-lg flex items-center justify-center text-4xl text-teal-500 transform group-hover:-rotate-6 transition-transform">
                <Users className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">All Ages Welcome</h3>
              <p className="text-slate-600 leading-relaxed">Activities designed for toddlers, teens, parents, and grandparents alike.</p>
            </motion.div>
            
            <motion.div 
              transition={{ delay: 0.2 }}
              className="text-center p-10 rounded-[2.5rem] bg-[#fef9f3] hover:bg-orange-50 transition-all duration-500 group shadow-sm hover:shadow-xl"
            >
              <div className="w-24 h-24 mx-auto mb-8 bg-white rounded-3xl shadow-lg flex items-center justify-center text-4xl text-pink-500 transform group-hover:rotate-6 transition-transform">
                <Heart className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Memory Making</h3>
              <p className="text-slate-600 leading-relaxed">Curated experiences that become stories told at family gatherings for years.</p>
            </motion.div>
          </div>
        </Container>
      </section>

      <section>
        <InspirationSection theme="family" />
      </section>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-15px) translateX(10px); }
          66% { transform: translateY(5px) translateX(-10px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
