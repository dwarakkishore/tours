"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Church, Waves, Sun, MapPin, Calendar, Users, Star, Sparkles, ChevronRight, Heart, Cloud, Globe, Sunrise, Moon, BookOpen, Play } from "lucide-react";
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

// Floating Spiritual Elements
const FloatingSpiritualElements = () => {
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
          {i % 2 === 0 ? (
            <Sparkles className="w-8 h-8 text-amber-200/30 fill-amber-200/30" />
          ) : (
            <Star className="w-6 h-6 text-orange-200/20 fill-orange-200/20" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default function ReligiousRetreatClient() {
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
  } = usePackagesByTheme("religious-retreat");

  const religiousPackages = useMemo(() => {
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

  const currentPackages = religiousPackages[selectedTab] || [];
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
    <div className="min-h-screen bg-[#FFFDF9]">
      <VideoReelModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        videoUrl={VIDEO_MAP["religious-retreat"]} 
      />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] lg:min-h-[80vh] pt-20 overflow-hidden divine-light flex items-center">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-64 h-64 bg-gold-400/20 rounded-full blur-3xl" 
          />
          <motion.div 
            animate={{ 
              y: [0, 20, 0],
              opacity: [0.03, 0.1, 0.03]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: -4 }}
            className="absolute bottom-20 right-10 w-80 h-80 bg-burgundy-500/10 rounded-full blur-3xl" 
          />
        </div>

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center py-6 md:py-8 lg:py-12">
            {/* Left Content */}
            <motion.div 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="space-y-8 text-center lg:text-left"
            >
              <Breadcrumbs 
                items={[
                  { label: "Home", href: "/" },
                  { label: "Themes", href: "/themes" },
                  { label: "Religious Retreat", href: "/themes/religious-retreat", active: true }
                ]} 
                className="bg-transparent border-transparent p-0 mb-4 flex justify-center lg:justify-start"
                omitContainer
              />
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-light leading-[1.1]">
                <span className="block text-gray-900">Sacred</span>
                <span className="block text-gradient-gold italic mt-2">Journeys</span>
                <span className="block text-burgundy-700 mt-2 text-4xl md:text-5xl lg:text-6xl">of the Soul</span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed font-light mx-auto lg:mx-0 border-l-2 border-gold-400 pl-6">
                Walk the paths of pilgrimage and devotion. Discover transformative retreats 
                that nourish the spirit and deepen your connection to the divine.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link href="#destinations">
                  <Button 
                    size="lg" 
                    className="px-8 py-7 rounded-full bg-burgundy-600 hover:bg-burgundy-700 text-white font-medium tracking-wide shadow-lg shadow-burgundy-600/20 flex items-center justify-center gap-2 group border-none w-full sm:w-auto"
                  >
                    <span>Explore Retreats</span>
                    <Sparkles className="w-5 h-5 transform group-hover:rotate-12 transition-transform" />
                  </Button>
                </Link>
                <Button 
                  variant="outline"
                  size="lg" 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="px-8 py-7 rounded-full border border-gold-400 text-burgundy-700 font-medium tracking-wide hover:bg-gold-400/10 transition-all flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  View Sacred Sites
                </Button>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8 mt-8 border-t border-gold-400/20">
                <div className="text-center">
                  <div className="text-3xl font-serif text-burgundy-700">100+</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mt-1 font-bold">Holy Sites</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-serif text-gold-600">40+</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mt-1 font-bold">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-serif text-sapphire-600 underline decoration-gold-400 decoration-wavy underline-offset-8">Centuries</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mt-1 font-bold">Of Heritage</div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Content */}
            <motion.div 
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="relative"
            >
              {/* Main Image with Sacred Frame */}
              <div className="relative z-10 p-4 border border-gold-400/30 rounded-[40px] bg-white/50 backdrop-blur-sm">
                <div className="relative rounded-[32px] overflow-hidden shadow-2xl">
                  <Image 
                    src="https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Sacred Temple" 
                    width={1000}
                    height={700}
                    className="w-full h-[550px] object-cover hover:scale-105 transition-transform duration-[2s]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-burgundy-900/40 via-transparent to-transparent"></div>
                  
                  {/* Floating Sacred Badge */}
                  <div className="absolute bottom-8 left-8 right-8 glass-sacred rounded-2xl p-6 border-l-4 border-gold-400">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-burgundy-100 flex items-center justify-center text-burgundy-600">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-serif text-burgundy-900 text-lg">Spiritual Sanctuary</div>
                        <div className="text-sm text-gray-600">Peace for every faith tradition</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Corners */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-gold-400"></div>
              <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-gold-400"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-gold-400"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-gold-400"></div>
              
              {/* Floating Elements */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 right-12 glass-sacred px-4 py-2 rounded-full shadow-lg z-20"
              >
                <span className="text-sm text-burgundy-700 font-medium">✦ Guided Prayers</span>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: -3 }}
                className="absolute bottom-20 -left-8 glass-sacred px-4 py-2 rounded-full shadow-lg z-20"
              >
                <span className="text-sm text-burgundy-700 font-medium">✦ Sacred Meals</span>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>



      {/* Path Selection */}
      <section className="section-padding bg-white border-y border-gold-400/10">
        <Container>
          <div className="flex justify-center gap-4 flex-wrap">
            <button 
              onClick={() => handleTabChange("international")}
              className={cn(
                "px-8 py-3 rounded-full text-sm font-medium tracking-wide transition-all",
                selectedTab === "international" 
                  ? "bg-burgundy-600 text-white shadow-md" 
                  : "border border-gray-200 text-gray-700 hover:border-gold-400 hover:text-burgundy-700"
              )}
            >
              All Traditions
            </button>
            <button 
              onClick={() => handleTabChange("domestic")}
              className={cn(
                "px-8 py-3 rounded-full text-sm font-medium tracking-wide transition-all",
                selectedTab === "domestic" 
                  ? "bg-burgundy-600 text-white shadow-md" 
                  : "border border-gray-200 text-gray-700 hover:border-gold-400 hover:text-burgundy-700"
              )}
            >
              Holy India
            </button>
            <button className="px-8 py-3 rounded-full border border-gray-200 text-gray-700 text-sm font-medium tracking-wide hover:border-gold-400 hover:text-burgundy-700 transition-all opacity-60">
              Christian Pilgrimage
            </button>
            <button className="px-8 py-3 rounded-full border border-gray-200 text-gray-700 text-sm font-medium tracking-wide hover:border-gold-400 hover:text-burgundy-700 transition-all opacity-60">
              Buddhist Retreats
            </button>
          </div>
        </Container>
      </section>

      {/* Sacred Features */}
      <section className="section-padding bg-burgundy-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
        
        <Container className="relative z-10">
          <div className="grid md:grid-cols-3 gap-6 md:gap-12 text-center">
            {[
              { 
                icon: BookOpen, 
                title: "Scriptural Guidance", 
                desc: "Knowledgeable guides versed in the history and theology of each sacred site." 
              },
              { 
                icon: Heart, 
                title: "Ritual Participation", 
                desc: "Join authentic ceremonies, prayers, and meditations with local communities." 
              },
              { 
                icon: Sparkles, 
                title: "Interfaith Respect", 
                desc: "Curated experiences honoring all traditions with reverence and authenticity." 
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
              className="text-center p-6 md:p-8 lg:p-10 rounded-2xl bg-white/40 backdrop-blur-sm border border-gold-400/10 hover:bg-white/60 transition-all duration-500 group shadow-sm hover:shadow-xl"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-8 bg-gold-50 rounded-full flex items-center justify-center text-2xl md:text-3xl text-gold-600 border border-gold-400/20 shadow-[0_0_30px_rgba(212,175,55,0.05)]">
                <Sun className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h3 className="text-xl md:text-2xl font-serif text-burgundy-900 mb-2 md:mb-4 tracking-tight">Divine Architecture</h3>
                <p className="text-gray-600 font-light leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Heritage Units (Packages Grid) */}
      <section id="destinations" className="section-padding bg-[#FBF9F4]">
        <Container>
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-burgundy-700 mb-4">Holy Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-light">Sanctified journeys to the world&apos;s most revered spiritual sites</p>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6" />
          </div>
          
          <div className="flex justify-center mb-6 md:mb-12">
            <div className="flex bg-white p-1 rounded-full border border-gold-400/20 shadow-sm">
              <button
                onClick={() => handleTabChange("international")}
                className={cn(
                  "px-8 py-3 rounded-full text-sm font-medium tracking-wide transition-all",
                  selectedTab === "international" 
                    ? "bg-burgundy-600 text-white shadow-md" 
                    : "text-gray-600 hover:text-burgundy-700"
                )}
              >
                Global Sacred
              </button>
              <button
                onClick={() => handleTabChange("domestic")}
                className={cn(
                  "px-8 py-3 rounded-full text-sm font-medium tracking-wide transition-all",
                  selectedTab === "domestic" 
                    ? "bg-burgundy-600 text-white shadow-md" 
                    : "text-gray-600 hover:text-burgundy-700"
                )}
              >
                Holy India
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7" ref={packagesRef}>
            {isLoading ? (
              <div className="col-span-full flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
              </div>
            ) : (
            <AnimatePresence mode="wait">
                {paginatedPackages.map((pkg, index) => (
                  <ThemedPackageCard 
                    key={`${selectedTab}-${pkg.id}`} 
                    item={pkg}
                    theme="religious"
                  />
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center py-3">
              <Pagination>
                <PaginationContent className="gap-1">
                  <PaginationItem>
                    <PaginationPrevious
                      className={cn(
                        "cursor-pointer rounded-xl h-14 w-14 bg-white border-amber-100 text-amber-900 hover:bg-amber-700 hover:text-white transition-all shadow-xl font-serif",
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
                        <PaginationEllipsis className="text-amber-400" />
                      ) : (
                        <PaginationLink
                          className={cn(
                            "cursor-pointer rounded-xl h-14 w-14 bg-white font-serif font-bold transition-all border-amber-100 shadow-md",
                            currentPage === page 
                              ? "bg-amber-700 text-white border-transparent shadow-xl" 
                              : "text-amber-950 hover:bg-amber-50"
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
                        "cursor-pointer rounded-xl h-14 w-14 bg-white border-amber-100 text-amber-900 hover:bg-amber-700 hover:text-white transition-all shadow-xl font-serif",
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

      {/* Divine Call to Action */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Subtle Mandala Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center z-0">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="w-[800px] h-[800px] rounded-full border-[2px] border-burgundy-900 border-dashed" 
          />
        </div>

        <Container className="relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <motion.div
              className="space-y-6"
            >
              <Church className="w-16 h-16 text-gold-600 mx-auto" />
              <h2 className="text-5xl sm:text-7xl md:text-9xl font-serif text-burgundy-900 tracking-tight leading-none">
                Answer the <br />
                <span className="text-gold-600 italic block mt-4">Sacred Call</span>
              </h2>
            </motion.div>

            <p className="text-xl md:text-2xl text-stone-500 font-serif leading-relaxed max-w-3xl mx-auto font-light border-y border-gold-400/20 py-8">
              &quot;Let your next journey be more than a vacation. Let it be a homecoming for your soul.&quot;
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-4">
              <Link href="#destinations">
                <Button
                  size="lg"
                  className="h-20 px-16 rounded-full bg-burgundy-900 hover:bg-stone-900 text-gold-400 font-serif text-xl tracking-widest shadow-2xl transition-all duration-700 hover:scale-105 active:scale-95 border-none"
                >
                  Book Your Pilgrimage
                </Button>
              </Link>
              <Link href="/contact" className="group flex items-center gap-4 text-burgundy-900 font-serif text-sm tracking-widest uppercase border-b border-gold-400 pb-2 hover:text-gold-600 transition-all">
                Sacred Consultation
                <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="h-full bg-[#fbf9f4] relative">
        <InspirationSection theme="religious" />
      </section>
    </div>
  );
}
