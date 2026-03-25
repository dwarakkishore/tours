"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  BookOpen, 
  Globe, 
  MapPin, 
  Star, 
  Award, 
  ChevronRight, 
  ArrowRight,
  University,
  Quote,
  Microscope,
  Clock,
  Search,
  UserCircle,
  FileText
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

export default function EducationalToursClient() {
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
  } = usePackagesByTheme("educational");

  const educationalPackages = useMemo(() => {
    let pkgSource = [];
    if (Array.isArray(allThemePackages) && allThemePackages.length > 0) {
      pkgSource = allThemePackages;
    }

    // Safeguard: Ensure pkgSource is a valid array
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

  const currentPackages = educationalPackages[selectedTab] || [];
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
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans selection:bg-[#3b82f6] selection:text-white overflow-x-hidden">
      <VideoReelModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        videoUrl={VIDEO_MAP["educational"]} 
      />


      {/* Hero Section */}
      <section className="relative min-h-[70vh] lg:min-h-[85vh] pt-20 overflow-hidden bg-[#f9f7f0]">
        {/* Texture Paper Overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }} />

        {/* Geometric Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(30, 27, 75, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 27, 75, 1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />

        {/* Decorative Circular Elements */}
        <div className="absolute top-20 right-10 w-64 h-64 border border-indigo-900/10 rounded-full animate-spin-slow" />
        <div className="absolute top-40 right-20 w-48 h-48 border border-amber-400/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-32 left-10 w-16 h-16 bg-amber-400/10 rotate-45 animate-float-slow" />
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-indigo-900/5 hexagon-clip animate-float-slower" />
        
        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center min-h-[60vh] py-12">
            
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
                  { label: "Educational Tours", href: "/themes/educational", active: true }
                ]} 
                className="bg-transparent border-transparent p-0 mb-4 flex justify-center md:justify-start"
                omitContainer
              />
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-[0.9]">
                <span className="block text-indigo-900">Scholarly</span>
                <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-950 via-indigo-800 to-amber-600 mt-2">
                  Expeditions
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 max-w-lg leading-relaxed font-light border-l-2 border-amber-400 pl-6">
                Transform the world into your classroom. Curated academic journeys blending historical immersion, 
                cultural studies, and hands-on learning experiences.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="#packages">
                  <Button className="h-14 px-8 rounded-sm bg-gradient-to-br from-indigo-950 to-indigo-800 text-white font-semibold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3 group border-none w-full sm:w-auto">
                    <span>Browse Curricula</span>
                    <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="h-14 px-8 rounded-sm border-2 border-indigo-900/20 text-indigo-900 font-semibold text-lg hover:border-indigo-900 hover:bg-white transition-all duration-300 flex items-center space-x-2 group"
                >
                  <BookOpen className="w-6 h-6 text-amber-600 group-hover:scale-110 transition-transform" />
                  <span>View Syllabus</span>
                </Button>
              </div>
              
              {/* Stats */}
              <div className="flex space-x-12 pt-8 mt-8 border-t border-indigo-900/10">
                <div className="relative pl-6">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-amber-400 rounded-full" />
                  <div className="text-3xl font-serif font-bold text-indigo-900">150+</div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider text-[10px] font-semibold">Institutions</div>
                </div>
                <div className="relative pl-6">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-amber-400 rounded-full" />
                  <div className="text-3xl font-serif font-bold text-amber-600">4.9</div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider text-[10px] font-semibold">Academic Rating</div>
                </div>
                <div className="relative pl-6">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-amber-400 rounded-full" />
                  <div className="text-3xl font-serif font-bold text-indigo-900">12k+</div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider text-[10px] font-semibold">Students Traveled</div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Content - Composition */}
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 architecture-frame p-2 bg-white shadow-2xl border border-indigo-900/10">
                <div className="relative h-[550px] overflow-hidden bg-indigo-900">
                  <Image
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1000"
                    alt="Scholarly Expedition"
                    fill
                    className="object-cover opacity-90 mix-blend-normal hover:scale-105 transition-transform duration-1000"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-950 via-indigo-900/80 to-transparent p-10 pt-24">
                    <div className="flex items-end justify-between">
                      <div className="text-white">
                        <div className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-2">Current Module</div>
                        <div className="text-3xl font-serif">Ancient Civilizations Field Study</div>
                      </div>
                      <div className="w-16 h-16 rounded-full bg-amber-400 flex items-center justify-center text-indigo-950 shadow-xl animate-pulse">
                        <University className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Dashed Border */}
                <div className="absolute -inset-2 border-2 border-dashed border-indigo-900/10 pointer-events-none rounded-sm" />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-28 h-36 bg-white shadow-2xl rounded-sm border-t-4 border-amber-400 p-4 animate-float-slow z-20 flex flex-col justify-between">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Chapter</div>
                <div className="text-4xl font-serif font-bold text-indigo-900">04</div>
                <div className="text-xs text-slate-600 leading-tight font-medium">Architectural Heritage</div>
              </div>
              
              <div className="absolute top-24 -left-12 bg-white/95 backdrop-blur-md rounded-sm p-5 animate-float-slower shadow-2xl z-20 max-w-[220px] border border-indigo-900/5">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-900 mt-1 shrink-0">
                    <Quote className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-700 italic font-serif leading-snug">"The world is a book and those who do not travel read only one page."</p>
                    <div className="text-[10px] text-amber-600 mt-2 font-bold uppercase tracking-widest">— St. Augustine</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 right-12 bg-white shadow-xl rounded-sm px-6 py-4 animate-float-slow z-20 border border-indigo-900/5">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <div className="text-xs font-bold text-indigo-900 tracking-tight">Applications Open for 2026/27</div>
                </div>
              </div>

              {/* Decorative Compass */}
              <div className="absolute -bottom-16 -left-16 w-32 h-32 opacity-10 pointer-events-none">
                <div className="w-full h-full relative animate-spin-slower">
                  <div className="absolute inset-0 border border-indigo-950 rounded-full" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-indigo-950/40" />
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px bg-indigo-950/40" />
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>



      {/* Filter Tabs */}
      <section id="packages" className="section-padding bg-[#f9f7f0] border-b border-indigo-900/10">
        <Container>
          <div className="flex justify-center">
            <div className="bg-white p-1.5 rounded-sm shadow-xl inline-flex border border-indigo-900/10">
              <button
                onClick={() => handleTabChange("international")}
                className={cn(
                  "px-8 py-3 rounded-sm font-bold transition-all duration-300 flex items-center gap-2",
                  selectedTab === "international"
                    ? "bg-indigo-950 text-white shadow-lg"
                    : "text-slate-500 hover:text-indigo-900 hover:bg-slate-50"
                )}
              >
                <Globe className={cn("w-4 h-4", selectedTab === "international" ? "text-amber-400" : "")} />
                <span>International Study</span>
              </button>
              <button
                onClick={() => handleTabChange("domestic")}
                className={cn(
                  "px-8 py-3 rounded-sm font-bold transition-all duration-300 flex items-center gap-2",
                  selectedTab === "domestic"
                    ? "bg-indigo-950 text-white shadow-lg"
                    : "text-slate-500 hover:text-indigo-900 hover:bg-slate-50"
                )}
              >
                <MapPin className={cn("w-4 h-4", selectedTab === "domestic" ? "text-amber-400" : "")} />
                <span>Domestic Programs</span>
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Programs Grid Section */}
      <section className="section-padding bg-[#f9f7f0] relative" ref={packagesRef}>
        {/* Diagonal Stripes Background */}
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(251, 191, 36, 1) 10px, rgba(251, 191, 36, 1) 20px)`
        }} />

        <Container className="relative z-10">
          <motion.div 
            className="text-center mb-8 md:mb-10"
          >
            <div className="inline-block mb-4">
              <span className="text-amber-600 font-bold tracking-widest uppercase text-xs px-4 py-1.5 bg-amber-50 border border-amber-200 rounded-full">Curriculum 2026/27</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-indigo-950 mb-4">Academic Itineraries</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light leading-relaxed">Structured learning experiences designed by educators and historians for maximum intellectual engagement</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {isLoading ? (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[450px] rounded-sm bg-white border border-indigo-900/5 animate-pulse" />
              ))
            ) : (
              <AnimatePresence mode="popLayout">
                {paginatedPackages.length > 0 ? (
                  paginatedPackages.map((pkg, index) => (
                    <motion.div
                      key={`${selectedTab}-${pkg.id}`}
                      layout
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="h-full"
                    >
                      <ThemedPackageCard 
                        theme="educational"
                        item={pkg}
                      />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center bg-white/50 backdrop-blur-sm rounded-sm border border-indigo-900/10">
                    <p className="text-slate-500 text-xl font-serif italic">The curriculum for this region is currently being curated.</p>
                  </div>
                )}
              </AnimatePresence>
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
                        "cursor-pointer rounded-sm h-12 px-6 bg-white border-indigo-900/10 text-indigo-900 hover:bg-indigo-950 hover:text-white transition-all shadow-md",
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
                        <PaginationEllipsis className="text-indigo-400" />
                      ) : (
                        <PaginationLink
                          className={cn(
                            "cursor-pointer rounded-sm h-12 w-12 bg-white font-bold transition-all border-indigo-900/10 shadow-md",
                            currentPage === page 
                              ? "bg-indigo-950 text-white shadow-xl border-transparent" 
                              : "text-indigo-900 hover:bg-slate-50"
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
                        "cursor-pointer rounded-sm h-12 px-6 bg-white border-indigo-900/10 text-indigo-900 hover:bg-indigo-950 hover:text-white transition-all shadow-md",
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
            <Button variant="outline" className="px-10 py-7 border-2 border-indigo-950/20 text-indigo-950 rounded-sm font-bold hover:bg-indigo-950 hover:text-white hover:border-indigo-950 transition-all duration-300 gap-3 group">
              <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Download Academic Catalog</span>
            </Button>
          </div>
        </Container>
      </section>

      {/* Why Choose Section */}
      <section className="section-padding bg-indigo-950 relative overflow-hidden">
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <Container className="relative z-10">
          <div className="grid md:grid-cols-3 gap-6 md:gap-12 text-center">
            <motion.div 
              className="p-10 rounded-sm border border-white/10 hover:border-amber-400/50 transition-all duration-500 bg-white/5 backdrop-blur-md"
            >
              <div className="w-20 h-20 mx-auto mb-8 bg-amber-400/10 rounded-full flex items-center justify-center text-3xl text-amber-400 border border-amber-400/30 shadow-[0_0_30px_rgba(251,191,36,0.1)]">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Accredited Learning</h3>
              <p className="text-indigo-200 font-light leading-relaxed">Earn academic credits through our partnerships with visiting universities and research institutions worldwide.</p>
            </motion.div>
            
            <motion.div 
              transition={{ delay: 0.1 }}
              className="p-10 rounded-sm border border-white/10 hover:border-amber-400/50 transition-all duration-500 bg-white/5 backdrop-blur-md"
            >
              <div className="w-20 h-20 mx-auto mb-8 bg-amber-400/10 rounded-full flex items-center justify-center text-3xl text-amber-400 border border-amber-400/30 shadow-[0_0_30px_rgba(251,191,36,0.1)]">
                <GraduationCap className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Expert Faculty</h3>
              <p className="text-indigo-200 font-light leading-relaxed">Every expedition includes subject matter experts: historians, archaeologists, and specialized educators.</p>
            </motion.div>
            
            <motion.div 
              transition={{ delay: 0.2 }}
              className="p-10 rounded-sm border border-white/10 hover:border-amber-400/50 transition-all duration-500 bg-white/5 backdrop-blur-md"
            >
              <div className="w-20 h-20 mx-auto mb-8 bg-amber-400/10 rounded-full flex items-center justify-center text-3xl text-amber-400 border border-amber-400/30 shadow-[0_0_30px_rgba(251,191,36,0.1)]">
                <Microscope className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Research Focused</h3>
              <p className="text-indigo-200 font-light leading-relaxed">Participate in active field research projects and contribute to ongoing academic knowledge preservation.</p>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="h-full bg-white relative">
        <InspirationSection theme="educational" />
      </section>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(5px); }
        }
        .hexagon-clip {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-slower {
          animation: spin-slow 40s linear infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float 10s ease-in-out infinite;
        }
        .architecture-frame {
          position: relative;
        }
        .architecture-frame::before {
          content: '';
          position: absolute;
          inset: -4px;
          border: 1px solid rgba(30, 27, 75, 0.2);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
