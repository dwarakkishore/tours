"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Flower, Sparkles, Waves, MapPin, Calendar, Users, Star, Heart, ChevronRight, Leaf, Sun, Wind, Cloud, Moon, Globe, PlayCircle, Compass } from "lucide-react";
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

// Floating Zen Elements (Lotus Petals)
const FloatingZenElements = () => {
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
            opacity: [0, 0.4, 0], 
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
          <Flower 
            className="w-8 h-8 text-stone-300/40 fill-stone-100/20" 
          />
        </motion.div>
      ))}
    </div>
  );
};

export default function RelaxRejuvenateClient() {
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
  } = usePackagesByTheme("relax-rejuvenate");

  const wellnessPackages = useMemo(() => {
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

  const currentPackages = wellnessPackages[selectedTab] || [];
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

  // if (!mounted) return null; // Removed check

  return (
    <div className="min-h-screen bg-[#fdfaf6] text-[#2c3e50] font-sans selection:bg-[#7fb3d5] selection:text-white overflow-x-hidden">
      <VideoReelModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        videoUrl={VIDEO_MAP["relax-rejuvenate"]} 
      />

      {/* Immersive Serenity Hero - Redesigned Grid Layout */}
      <section className="relative min-h-[85vh] pt-20 overflow-hidden flex items-center bg-[#fdfaf6]">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(#8fb39c 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Decorative Background Accents */}
        <div className="absolute top-20 right-20 w-80 h-80 bg-stone-200/40 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-sage-50 rounded-full blur-[120px]"></div>
        
        {mounted && <FloatingZenElements />}

        <Container className="relative z-20 w-full">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-16 items-center py-8 md:py-12">
            
            {/* Left Content - Zen & Bold */}
            <motion.div 
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="lg:col-span-12 xl:col-span-5 space-y-8 text-center lg:text-left"
            >
              <Breadcrumbs 
                items={[
                  { label: "Home", href: "/" },
                  { label: "Themes", href: "/themes" },
                  { label: "Relax & Rejuvenate", href: "/themes/relax-rejuvenate", active: true }
                ]} 
                className="bg-transparent border-transparent p-0 mb-4 justify-center lg:justify-start"
                omitContainer
                colorClasses="text-stone-400"
                activeColorClasses="text-stone-900 font-bold"
              />
              
              <div className="space-y-4">
                <span className="inline-block text-sage-600 font-serif italic text-lg md:text-2xl opacity-80">
                  Inner peace starts here
                </span>
                <h1 className="text-5xl md:text-7xl xl:text-8xl font-serif text-stone-900 leading-[0.85] tracking-tight lowercase">
                  relax &<br />
                  <span className="text-sage-600 font-light italic lg:translate-x-12 block mt-2">rejuvenate</span>
                  <span className="block text-stone-400 text-2xl md:text-3xl lg:text-4xl mt-6 font-light not-italic font-sans tracking-normal">at your own pace.</span>
                </h1>
              </div>
              
              <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                Shed the weight of the world. Rediscover stillness in earth’s most tranquil sanctuaries, 
                curated for the modern soul seeking absolute restoration.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6">
                <Link href="#packages" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-16 px-12 rounded-full bg-stone-900 hover:bg-stone-800 text-white shadow-xl hover:shadow-stone-900/20 border-none font-medium text-lg tracking-wide transition-all duration-500">
                    Find Your Peace
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="ghost" 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="h-16 px-8 text-stone-800 hover:bg-stone-100/50 font-medium text-lg tracking-wide flex items-center gap-3 group"
                >
                  <PlayCircle className="w-7 h-7 text-sage-600 group-hover:scale-110 transition-transform" />
                  <span>Watch Story</span>
                </Button>
              </div>
              
              {/* Zen Stats */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 pt-6 max-w-lg mx-auto lg:mx-0">
                <div className="p-5 bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl font-serif italic text-sage-600">98%</div>
                  <div className="text-[10px] text-stone-400 font-semibold uppercase tracking-widest mt-1">Stress Reduction</div>
                </div>
                <div className="p-5 bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl font-serif italic text-stone-900">24/7</div>
                  <div className="text-[10px] text-stone-400 font-semibold uppercase tracking-widest mt-1">Holistic Support</div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Content - Asymmetric Image Collage */}
            <div className="lg:col-span-12 xl:col-span-7 relative h-[450px] md:h-[600px] mt-12 lg:mt-0">
              {/* Main Immersive Image */}
              <motion.div 
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                className="absolute top-0 right-0 w-full lg:w-11/12 h-[350px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white z-0"
              >
                <Image 
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=90" 
                  alt="Luxury Wellness Destination" 
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
                
                {/* Overlay Badge - Adjusted for less overlay */}
                <div className="absolute top-6 right-6">
                  <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md">
                      <Globe className="w-5 h-5 text-sage-600" />
                    </div>
                    <div>
                      <h3 className="text-white font-serif italic text-lg leading-tight">Global Sanctuaries</h3>
                      <p className="text-white/70 text-[10px] font-light uppercase tracking-wider">Restoration Awaits</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating Aesthetic Cards */}
              <div className="absolute -bottom-6 left-0 lg:left-12 flex gap-4 md:gap-6 z-10 scale-90 md:scale-100">
                <motion.div 
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="w-36 h-36 md:w-48 md:h-48 bg-white rounded-[2.5rem] shadow-2xl p-6 flex flex-col items-center justify-center text-center border border-stone-50"
                >
                  <div className="w-12 h-12 rounded-full bg-sage-50 flex items-center justify-center mb-3">
                    <Compass className="w-6 h-6 text-sage-600" />
                  </div>
                  <div className="text-sm font-medium text-stone-800 uppercase tracking-wider">Explore</div>
                  <div className="text-[10px] text-stone-400 mt-1 uppercase font-semibold tracking-widest leading-tight">Your Stillness</div>
                </motion.div>
                
                <motion.div 
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="w-36 h-36 md:w-48 md:h-48 bg-stone-900 rounded-[2.5rem] shadow-2xl p-6 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3">
                    <MapPin className="w-6 h-6 text-sage-400" />
                  </div>
                  <div className="text-sm font-medium text-white uppercase tracking-wider">Locate</div>
                  <div className="text-[10px] text-stone-300 mt-1 uppercase font-semibold tracking-widest leading-tight">Pure Revival</div>
                </motion.div>
              </div>

              {/* Decorative Scroll Hint */}
              <div className="absolute -right-8 bottom-24 hidden xl:flex flex-col items-center gap-4 opacity-30 origin-right rotate-90 translate-x-12">
                 <div className="w-12 h-[1px] bg-stone-900" />
                 <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-stone-900">Scroll to Explore</span>
              </div>
            </div>
          </div>
        </Container>
      </section>



      {/* The Three Pillars Section */}
      <section className="section-padding bg-white">
         <Container>
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16 space-y-4">
              <div className="w-16 h-[2px] bg-sage-400 mx-auto" />
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-stone-900 lowercase italic leading-tight md:leading-normal">The Three Pillars of Serenity</h2>
              <p className="text-lg md:text-xl text-stone-500 font-light leading-relaxed">
                 We believe true rejuvenation occurs at the intersection of mind, body, and spirit. Each of our sanctuaries is vetted for these three core experiences.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
              {[
                { icon: Sun, title: "Mind", desc: "Digital detox, guided meditation, and neurological rest in silence-first environments." },
                { icon: Leaf, title: "Body", desc: "Organic nutrition, ancient holistic treatments, and low-impact movement for physical restoration." },
                { icon: Heart, title: "Spirit", desc: "Communion with nature, spiritual discovery, and soulful connections that transcend the mundane." }
              ].map((pillar, idx) => (
                <motion.div
                  key={idx}
                  transition={{ delay: idx * 0.2 }}
                  className="text-center space-y-8 group"
                >
                   <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                      <div className="absolute inset-0 bg-sage-50 rounded-full group-hover:scale-110 transition-transform duration-700" />
                      <pillar.icon className="w-10 h-10 text-sage-600 relative z-10" />
                   </div>
                   <div className="space-y-4">
                      <h3 className="text-2xl font-serif italic text-stone-900 lowercase">{pillar.title}</h3>
                      <p className="text-stone-500 font-light leading-relaxed">{pillar.desc}</p>
                   </div>
                </motion.div>
              ))}
           </div>
        </Container>
      </section>

      {/* Sanctuary Units (Packages Grid) */}
      <section id="packages" className="section-padding bg-[#F9F7F5]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
            <div className="space-y-4 max-w-xl">
              <span className="text-sage-600 font-bold text-xs uppercase tracking-[0.3em]">Curation</span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-stone-900 leading-tight">Handpicked <br />Sanctuaries</h2>
            </div>
            
            <div className="flex bg-stone-200/50 p-1.5 rounded-full border border-stone-200">
              <button
                onClick={() => handleTabChange("international")}
                className={cn(
                  "px-8 py-3 rounded-full font-medium text-sm transition-all duration-500",
                  selectedTab === "international"
                    ? "bg-white text-stone-900 shadow-lg"
                    : "text-stone-500 hover:text-stone-700"
                )}
              >
                Global Safaris
              </button>
              <button
                onClick={() => handleTabChange("domestic")}
                className={cn(
                  "px-8 py-3 rounded-full font-medium text-sm transition-all duration-500",
                  selectedTab === "domestic"
                    ? "bg-white text-stone-900 shadow-lg"
                    : "text-stone-500 hover:text-stone-700"
                )}
              >
                Local Zen
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10" ref={packagesRef}>
            {isLoading ? (
              <div className="col-span-full flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-600"></div>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {paginatedPackages.map((pkg, index) => (
                  <ThemedPackageCard 
                    key={`${selectedTab}-${pkg.id}`} 
                    theme="relax"
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
                        "cursor-pointer rounded-full h-12 w-12 bg-white border-stone-200 text-stone-900 hover:bg-stone-900 hover:text-white transition-all shadow-lg",
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
                        <PaginationEllipsis className="text-stone-400" />
                      ) : (
                        <PaginationLink
                          className={cn(
                            "cursor-pointer rounded-full h-12 w-12 bg-white font-medium transition-all border-stone-200 shadow-md",
                            currentPage === page 
                              ? "bg-sage-600 text-white border-transparent shadow-xl" 
                              : "text-stone-700 hover:bg-sage-50"
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
                        "cursor-pointer rounded-full h-12 w-12 bg-white border-stone-200 text-stone-900 hover:bg-stone-900 hover:text-white transition-all shadow-lg",
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

      {/* The Sanctuary Experience CTA */}
      <section className="section-padding bg-[#E5E1DA] overflow-hidden relative">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
         <Container className="relative">
            <div className="max-w-4xl mx-auto text-center space-y-12">
               <motion.div
                 className="space-y-6"
               >
                   <Flower className="w-12 h-12 text-sage-600 mx-auto" />
                   <h2 className="text-4xl sm:text-6xl md:text-8xl font-serif text-stone-900 tracking-tight leading-loose md:leading-none lowercase italic">
                      Ready to begin your <br />
                      <span className="text-sage-600 not-italic font-light block mt-4">transformation?</span>
                   </h2>
               </motion.div>
               <p className="text-xl md:text-2xl text-stone-600 font-light max-w-2xl mx-auto leading-relaxed italic">
                  "Your journey to tranquility isn't a destination, it's a decision. Let us find your stillness."
               </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full h-16 px-14 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-xl shadow-2xl transition-all duration-500 hover:scale-105">
                       Book Your Sanctuary
                    </Button>
                  </Link>
                  <div className="flex items-center gap-6">
                    <div className="flex -space-x-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-12 h-12 rounded-full border-4 border-[#E5E1DA] overflow-hidden bg-white">
                          <Image src={`https://i.pravatar.cc/150?u=${i + 130}`} alt="Wellness Architect" width={48} height={48} />
                        </div>
                      ))}
                      <div className="w-12 h-12 rounded-full border-4 border-[#E5E1DA] bg-sage-600 flex items-center justify-center text-white text-xs font-bold">
                        +12
                      </div>
                    </div>
                    <Link href="/contact" className="text-stone-900 font-bold uppercase tracking-[0.3em] text-[10px] border-b-2 border-stone-900/20 pb-1 hover:border-sage-600 transition-colors hidden sm:block">
                       Consult a Wellness Architect
                    </Link>
                  </div>
                </div>
            </div>
         </Container>
      </section>

      <section>
        <InspirationSection theme="relax" />
      </section>
    </div>
  );
}
