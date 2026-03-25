"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { User, Backpack, Compass, MapPin, Calendar, Users, Star, Mountain, ChevronRight, Coffee, Tent, Zap, Wind, Shield, Rocket, Globe, PlayCircle } from "lucide-react";
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
import { useRef } from "react";

import InspirationSection from "@/components/Landing/InspirationSection";
import VideoReelModal from "@/components/ui/VideoReelModal";
import { VIDEO_MAP } from "@/config/themePackages";

// Floating Explorer Elements (Maps, Compasses)
const FloatingExplorerElements = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const newElements = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() * 360 + 360,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 20,
    }));
    setElements(newElements);
  }, []);

  if (elements.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {elements.map((el, i) => (
        <motion.div
          key={el.id}
          initial={{ 
            opacity: 0, 
            y: "100%", 
            x: `${el.x}%`,
            scale: el.scale,
            rotate: el.rotateStart
          }}
          animate={{ 
            opacity: [0, 0.3, 0], 
            y: "-20%",
            rotate: el.rotateEnd
          }}
          transition={{ 
            duration: el.duration, 
            repeat: Infinity,
            delay: el.delay,
            ease: "linear"
          }}
          className="absolute"
        >
          {i % 2 === 0 ? (
            <MapPin className="w-8 h-8 text-teal-200/20 fill-teal-200/20" />
          ) : (
            <Compass className="w-10 h-10 text-cyan-200/20" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default function SoloExpeditionClient() {
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
  } = usePackagesByTheme("solo-expedition");

  const soloPackages = useMemo(() => {
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

  const currentPackages = soloPackages[selectedTab] || [];
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

  // if (!mounted) return null; // Removed to prevent footer flash

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#FFD700] selection:text-black">
      <VideoReelModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        videoUrl={VIDEO_MAP["solo-expedition"]} 
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] pt-20 overflow-hidden flex items-center bg-[#0f0f0f]">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, #FFD700 0, #FFD700 1px, transparent 0, transparent 50%)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#FFA500]/10 rounded-full blur-[120px]"></div>

        <Container className="relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center py-6 md:py-8 lg:py-12">
            
            {/* Left Content */}
            <motion.div 
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 space-y-6"
            >
              <Breadcrumbs 
                items={[
                  { label: "Home", href: "/" },
                  { label: "Themes", href: "/themes" },
                  { label: "Solo Expedition", href: "/themes/solo-expedition", active: true }
                ]} 
                className="bg-transparent border-transparent p-0 mb-4"
                omitContainer
                colorClasses="text-gray-400"
                activeColorClasses="text-[#FFD700] font-bold"
              />
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-bold leading-tight tracking-tight">
                <span className="block text-white">GO</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500] mt-1">ALONE</span>
                <span className="block text-gray-400 text-2xl md:text-3xl lg:text-4xl mt-3 font-light italic font-sans">Together.</span>
              </h1>
              
              <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-lg">
                Solo expeditions built for independent souls. Connect with fellow travelers, 
                stay safe with 24/7 tracking, and discover who you become on the journey.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="#packages">
                  <button className="px-8 py-4 bg-[#FFD700] text-black rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-white transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] flex items-center space-x-2 group w-full sm:w-auto">
                    <span>Start Journey</span>
                    <Rocket className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </Link>
                <button 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="px-8 py-4 bg-transparent border-2 border-[#FFD700] text-[#FFD700] rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-[#FFD700]/10 transition-all flex items-center space-x-2"
                >
                  <PlayCircle className="w-5 h-5" />
                  <span>Watch Reel</span>
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="p-4 bg-[#1a1a1a] rounded-xl border border-[#333]">
                  <div className="text-3xl font-bold text-[#FFD700]">94%</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mt-1 font-bold">Make Friends</div>
                </div>
                <div className="p-4 bg-[#1a1a1a] rounded-xl border border-[#333]">
                  <div className="text-3xl font-bold text-[#FFA500]">24/7</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mt-1 font-bold">Safety Track</div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Content - Asymmetric Image Layout */}
            <div className="lg:col-span-7 relative">
              {/* Main Large Image */}
              <motion.div 
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-[#333]"
              >
                <Image 
                  src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Solo Backpacker" 
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-[#FFD700]/50">
                      <User className="w-6 h-6 text-[#FFD700]" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl uppercase tracking-wide">Solo Adventures</h3>
                      <p className="text-gray-300 text-sm">Your journey, your rules</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Small Overlapping Cards */}
              <div className="absolute -bottom-6 -right-6 flex gap-4 z-10">
                <motion.div 
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="w-40 h-40 bg-[#151515] rounded-2xl shadow-2xl p-4 flex flex-col items-center justify-center text-center border border-[#333]"
                >
                  <Users className="w-8 h-8 text-[#FFD700] mb-2" />
                  <div className="text-sm font-bold text-white uppercase tracking-wider">Connect</div>
                  <div className="text-xs text-gray-500 mt-1">Fellow Travelers</div>
                </motion.div>
                
                <motion.div 
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="w-40 h-40 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-2xl shadow-2xl p-4 flex flex-col items-center justify-center text-center"
                >
                  <Shield className="w-8 h-8 text-black mb-2" />
                  <div className="text-sm font-bold text-black uppercase tracking-wider">Protected</div>
                  <div className="text-xs text-black/70 mt-1">24/7 Safety</div>
                </motion.div>
              </div>
            </div>
          </div>
        </Container>
      </section>



      {/* Filters */}
      <section id="packages" className="section-padding bg-[#0a0a0a] border-y border-[#222]">
        <Container>
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center items-center">
            <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Mission Scope:</span>
            
            <button 
              onClick={() => handleTabChange("international")}
              className={cn(
                "px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2 border-2",
                selectedTab === "international" 
                  ? "bg-[#FFD700] text-black border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.3)]" 
                  : "bg-transparent text-gray-400 border-[#333] hover:border-[#FFD700] hover:text-[#FFD700]"
              )}
            >
              <Globe className="w-4 h-4" />
              Overseas
            </button>
            <button 
              onClick={() => handleTabChange("domestic")}
              className={cn(
                "px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2 border-2",
                selectedTab === "domestic" 
                  ? "bg-[#FFD700] text-black border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.3)]" 
                  : "bg-transparent text-gray-400 border-[#333] hover:border-[#FFD700] hover:text-[#FFD700]"
              )}
            >
              <MapPin className="w-4 h-4" />
              Mainland
            </button>
          </div>
        </Container>
      </section>

      {/* Why Choose Solo Expedition */}
      <section className="relative section-padding overflow-hidden bg-[#0f0f0f]">
        
        {/* Animated Background Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFD700]/5 rounded-full blur-[150px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FFA500]/5 rounded-full blur-[150px] -ml-64 -mb-64" />

        <Container className="relative">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-full">
                  <Compass className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFD700]">Our Solo Philosophy</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9]">
                  Why Trust Us With Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500] italic">Journey?</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 md:gap-10">
                {[
                  { icon: Shield, title: "Safety-First Curation", desc: "We don't just book hotels; we verify every route, vet local guides, and provide 24/7 tracking for complete peace of mind." },
                  { icon: Users, title: "Solo-Friendly Connections", desc: "Optional meetups with fellow travelers, local community events, and digital connectivity when you want it—solitude when you don't." },
                  { icon: Compass, title: "24/7 Solo Concierge", desc: "Need last-minute route changes or emergency support? Our team is always available to ensure your journey stays on track." }
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-8 group"
                  >
                    <div className="w-16 h-16 rounded-[1.5rem] bg-[#1a1a1a] border border-[#333] flex items-center justify-center shrink-0 group-hover:bg-[#FFD700] group-hover:text-black transition-all duration-500">
                      <feature.icon className="w-8 h-8 text-[#FFD700] group-hover:text-black transition-colors" />
                    </div>
                    <div className="space-y-2 pt-2">
                      <h3 className="text-2xl font-bold text-white tracking-tight">{feature.title}</h3>
                      <p className="text-gray-400 font-medium leading-relaxed max-w-xl">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex-1 relative hidden lg:block">
              <motion.div
                className="relative z-10 w-full aspect-square rounded-[4rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-[#333]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1000&q=80"
                  alt="Solo adventure"
                  fill
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-12 left-12 right-12">
                  <div className="p-8 bg-black/40 backdrop-blur-md rounded-[2.5rem] border border-white/10">
                    <p className="text-2xl font-bold text-white italic leading-relaxed">
                      "The journey of a thousand miles begins with a single step."
                    </p>
                  </div>
                </div>
              </motion.div>
              {/* Decorative Card Behind */}
              <div className="absolute top-10 -right-10 w-full aspect-square bg-[#FFD700] rounded-[4rem] -z-10 opacity-5 transform rotate-6 border border-[#FFD700]/20" />
            </div>
          </div>
        </Container>
      </section>

      {/* Packages Exploration */}
      <section className="section-padding bg-[#0a0a0a]" id="assignments">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 uppercase tracking-tight">
              Curated for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500]">One</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-xl italic font-light">
              Destinations optimized for pure, unfiltered exploration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" ref={packagesRef}>
            {isLoading ? (
              <div className="col-span-full flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD700]"></div>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {paginatedPackages.map((pkg, index) => (
                  <ThemedPackageCard 
                    key={`${selectedTab}-${pkg.id}`} 
                    theme="solo"
                    item={pkg}
                  />
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center py-6">
              <Pagination>
                <PaginationContent className="gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      className={cn(
                        "cursor-pointer rounded-xl h-12 w-12 bg-[#FFD700] text-black hover:bg-white hover:text-black transition-all shadow-lg border-none",
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
                        <PaginationEllipsis className="text-[#FFD700]" />
                      ) : (
                        <PaginationLink
                          className={cn(
                            "cursor-pointer rounded-xl h-12 w-12 font-bold transition-all border-none shadow-lg",
                            currentPage === page 
                              ? "bg-[#FFD700] text-black" 
                              : "bg-[#1a1a1a] text-gray-400 hover:bg-[#333] hover:text-white"
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
                        "cursor-pointer rounded-xl h-12 w-12 bg-[#FFD700] text-black hover:bg-white hover:text-black transition-all shadow-lg border-none",
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

      {/* Final Premium CTA */}
      <section className="section-padding bg-[#050505] relative overflow-hidden border-t border-[#111]">
        <Container className="text-center">
            <div className="max-w-3xl mx-auto space-y-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-tight">
                Ready to Start Your<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500]">Solo Adventure?</span>
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/contact">
                  <Button size="lg" className="h-16 px-12 rounded-2xl bg-[#FFD700] hover:bg-white text-black shadow-[0_0_30px_rgba(255,215,0,0.2)] hover:shadow-[0_0_50px_rgba(255,215,0,0.4)] border-none font-bold text-lg uppercase tracking-widest transition-all">
                    Talk to a Specialist
                  </Button>
                </Link>
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-[#111] overflow-hidden bg-slate-100">
                      <Image src={`https://i.pravatar.cc/150?u=${i + 130}`} alt="Agent" width={48} height={48} />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-[#111] bg-[#FFD700] flex items-center justify-center text-black text-xs font-bold">
                    +12
                  </div>
                </div>
              </div>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Join 300+ solo travelers who explored with us last month</p>
            </div>
          </Container>
        </section>

      <section className="h-full bg-[#0a0a0a] relative">
        <InspirationSection theme="solo" />
      </section>
    </div>
  );
}
