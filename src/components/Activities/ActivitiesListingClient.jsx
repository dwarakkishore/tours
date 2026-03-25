"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Compass, 
  ArrowLeft,
  Clock,
  DollarSign,
  Search,
  MapPin,
  Package,
  Star,
  Loader2,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  SlidersHorizontal,
  X
} from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ActivityCard from "@/components/ui/ActivityCard";
import { useRegionsData } from "@/hooks/regions/useRegionsData";
import { useActivitiesData } from "@/hooks/activities/useActivitiesData";
import { themeMapData } from "@/config/themePackages";
import { 
  getUniqueCategories, 
  getUniqueCities, 
  formatCategoryName,
  filterActivities 
} from "@/utils/activityUtils";
import InspirationSection from "@/components/Landing/InspirationSection";

export default function ActivitiesListingClient({ regionSlug, initialRegions = [] }) {
  const router = useRouter();
  const { domesticRegions, internationalRegions, regionIsLoading } = useRegionsData(initialRegions);
  const { activities: allActivities, loading: activitiesLoading } = useActivitiesData(regionSlug);
  
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocationType, setSelectedLocationType] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState(regionSlug || "all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Mobile filters state
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsDesktop(window.innerWidth >= 768);
  }, []);
  
  const regionName = regionSlug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Get unique categories from activities based on selected region and location type
  const categories = useMemo(() => {
    const filteredByBasics = allActivities.filter(a => {
      const regionMatch = selectedRegion === "all" || a.regionSlug === selectedRegion;
      const typeMatch = selectedLocationType === "all" || 
        (selectedLocationType === "International" && a.isInternational) ||
        (selectedLocationType === "Domestic" && !a.isInternational);
      return regionMatch && typeMatch;
    });
    
    const uniqueCategories = getUniqueCategories(filteredByBasics);
    return uniqueCategories.map(cat => ({
      id: cat,
      slug: cat,
      name: formatCategoryName(cat)
    }));
  }, [allActivities, selectedRegion, selectedLocationType]);

  // Get unique cities based on selected region and location type
  const availableCities = useMemo(() => {
    const filteredByBasics = allActivities.filter(a => {
      const regionMatch = selectedRegion === "all" || a.regionSlug === selectedRegion;
      const typeMatch = selectedLocationType === "all" || 
        (selectedLocationType === "International" && a.isInternational) ||
        (selectedLocationType === "Domestic" && !a.isInternational);
      return regionMatch && typeMatch;
    });
    
    return getUniqueCities(filteredByBasics).map(city => ({
      id: city.slug,
      slug: city.slug,
      name: city.name
    }));
  }, [allActivities, selectedRegion, selectedLocationType]);

  // Dynamic Regions from Header
  const flattenedInternationalRegions = useMemo(() => {
    if (!internationalRegions || !Array.isArray(internationalRegions)) return [];
    return internationalRegions.flatMap(continent => continent.regions || []);
  }, [internationalRegions]);

  const availableRegions = useMemo(() => {
    if (selectedLocationType === "International") {
      return flattenedInternationalRegions;
    }
    if (selectedLocationType === "Domestic") {
      return domesticRegions || [];
    }
    // "all" - combine both
    return [...(domesticRegions || []), ...flattenedInternationalRegions];
  }, [selectedLocationType, domesticRegions, flattenedInternationalRegions]);

  // Reset selected region and city when location type changes
  useEffect(() => {
    if (!regionSlug) {
      setSelectedRegion("all");
    }
    setSelectedCity("all");
  }, [selectedLocationType, regionSlug]);

  // Reset city and category when region changes
  useEffect(() => {
    setSelectedCity("all");
    setSelectedCategory("all");
  }, [selectedRegion]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedLocationType, selectedRegion, selectedCity, searchTerm]);

  // Resolve region slug for an activity (to ensure it points to a valid region page)
  const resolveRegionSlug = (activity) => {
    const allRegions = [...domesticRegions, ...flattenedInternationalRegions];
    
    // 1. Try to find a valid region from the activity data
    const foundRegion = allRegions.find(r => 
      r.slug === activity.regionSlug || 
      (activity.regionName && r.name?.toLowerCase() === activity.regionName.toLowerCase())
    );
    if (foundRegion) return foundRegion.slug;

    // 2. If no direct match, check if we are in a valid region context already
    if (regionSlug && regionSlug !== "all") {
      const contextRegion = allRegions.find(r => r.slug === regionSlug);
      if (contextRegion) return contextRegion.slug;
    }

    // 3. Fallback
    return activity.regionSlug;
  };

  // Filter activities
  const filteredActivities = useMemo(() => {
    return filterActivities(allActivities, {
      category: selectedCategory,
      locationType: selectedLocationType,
      region: selectedRegion,
      city: selectedCity,
      searchTerm
    });
  }, [allActivities, selectedCategory, selectedLocationType, selectedRegion, selectedCity, searchTerm]);

  // Paginated activities
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const paginatedActivities = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredActivities.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredActivities, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-brand-blue to-green-900 text-white pt-32 pb-16 lg:pt-48 lg:pb-24 relative overflow-hidden">
        <Container>
          <Link href={regionSlug ? `/packages/${regionSlug}` : "/packages"}>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 backdrop-blur-sm gap-2 mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {regionName || "All"} Packages
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-6">
              <Compass className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-bold uppercase tracking-wider">
                Experience More
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
               {regionName ? `Activities in ${regionName}` : "All Activities"}
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl">
              Explore curated experiences, from luxury escapes to soulful cultural tours synchronized with our global destinations.
            </p>
          </motion.div>
        </Container>

        {/* Breadcrumbs - Bottom Left Positioned - Fixed Visibility */}
        <div className="absolute bottom-4 left-0 z-[60] w-full">
            <Container>
                <Breadcrumbs
                    items={regionSlug ? [
                    { label: "Home", href: "/" },
                    { label: "Activities", href: "/activities" },
                    { label: regionName, href: `/activities/${regionSlug}`, active: true },
                    ] : [
                    { label: "Home", href: "/" },
                    { label: "Activities", href: "/activities", active: true },
                    ]}
                    className="!bg-transparent !border-none !p-0 flex justify-start w-auto"
                    omitContainer
                    colorClasses="text-white/80 drop-shadow-md"
                    activeColorClasses="text-white drop-shadow-md font-bold"
                />
            </Container>
        </div>
      </div>


      {/* Main Content */}
      <Container className="py-8 md:py-12">
        {/* Overview Section - Positioned Above Filters */}
        <div className="mb-8 md:mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            {/* Left Column: Header Area (60% width on desktop) */}
            <div className="lg:col-span-3">
              <div className="relative pl-6 border-l-4 border-brand-blue py-2 mb-6">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                  {selectedRegion !== "all" ? `Experience ${regionName}` : "Curated Experiences"}
                </h2>
                <div className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                  {selectedRegion !== "all" 
                    ? `Discover the soul of ${regionName} through our handpicked collection of activities. Whether you're seeking adrenaline-pumping adventures or deep cultural immersions, our experiences are designed to connect you deeply with the local heritage.`
                    : "Welcome to our global collection of curated activities. At Bayard Vacations, we believe that travel is about more than just visiting a place—it's about the stories you create and the connections you make across international and domestic destinations."
                  }
                </div>
              </div>
            </div>

            {/* Right Column: Highlights Info Grid (40% width on desktop) */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-y-6 gap-x-8">
                {selectedRegion !== "all" ? (
                  // Region-specific Highlights
                  <>
                    <div className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 border border-blue-100 group-hover:scale-110 transition-transform">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.15em] mb-1">{availableCities.length} CITIES EXPLORED</h3>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[180px]">Diverse urban gems and hidden villages awaiting your visit.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100 group-hover:scale-110 transition-transform">
                        <Compass className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.15em] mb-1">{filteredActivities.length} DYNAMIC ACTIVITIES</h3>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[180px]">From high-octane adventures to spiritual retreats.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 shrink-0 border border-amber-100 group-hover:scale-110 transition-transform">
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.15em] mb-1">{categories.length} ACTIVITY THEMES</h3>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[180px]">Hand-vetted categories including Culture and Nature.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 shrink-0 border border-rose-100 group-hover:scale-110 transition-transform">
                        <Star className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.15em] mb-1">PREMIUM SELECTION</h3>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[180px]">Physically verified for safety and quality standards.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0 border border-cyan-100 group-hover:scale-110 transition-transform">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.15em] mb-1">OPTIMAL TRAVEL TIME</h3>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[180px]">Best experienced during seasonal festival peaks.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 shrink-0 border border-slate-100 group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.15em] mb-1">EASY BOOKING PROCESS</h3>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[180px]">Seamless concierge-led service for your peace of mind.</p>
                      </div>
                    </div>
                  </>
                ) : (
                  // Global Highlights
                  <>
                    <div className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 border border-blue-100 group-hover:scale-110 transition-transform">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.15em] mb-1">50+ GLOBAL DESTINATIONS</h3>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[180px]">From the Caucasus peaks to the beaches of Bali.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100 group-hover:scale-110 transition-transform">
                        <Compass className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.15em] mb-1">{allActivities.length} CURATED ACTIVITIES</h3>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[180px]">Our ever-expanding library of luxury experiences.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 shrink-0 border border-amber-100 group-hover:scale-110 transition-transform">
                        <Star className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.15em] mb-1">LUXURY VETTED STANDARDS</h3>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[180px]">Uncompromising standards for service and safety.</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="sticky top-24 md:top-[72px] z-[50] transition-all duration-300 mb-6 md:mb-8">
          <div className="bg-white/90 backdrop-blur-md px-6 py-2.5 md:py-3 rounded-[2.5rem] shadow-xl border border-slate-200/60">
            {/* Filter Toolbar */}
            <div className="bg-transparent">
            {/* Primary Toolbar Wrapper */}
            <div className="flex flex-col gap-4">
              {/* Row 1: Search + Desktop Filters | Mobile Search + Toggle */}
              <div className="flex flex-row gap-2 md:gap-4 items-center">
                {/* Search Bar (Persistent) */}
                <div className="relative flex-1 group">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 md:w-5 md:h-5 group-focus-within:text-brand-blue transition-colors" />
                  <input 
                    type="text"
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#0146b3]/20 focus:border-[#0146b3] transition-all text-sm md:text-base text-slate-700 font-medium"
                  />
                </div>

                {/* Region Dropdown (Desktop Only) */}
                <div className="hidden md:block min-w-[200px] lg:min-w-[250px]">
                  <select 
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full bg-slate-50 text-slate-700 text-sm font-bold px-4 py-[11px] rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0146b3]/20 focus:border-[#0146b3] cursor-pointer transition-all"
                    value={selectedRegion}
                  >
                    <option value="all">Discover All Regions</option>
                    {availableRegions.map(region => (
                      <option key={region.id} value={region.slug}>{region.name}</option>
                    ))}
                  </select>
                </div>

                {/* Destination Type Buttons (Large Desktop Only) */}
                <div className="hidden lg:block">
                  <div className="inline-flex p-1 bg-slate-100 rounded-full h-[46px] items-center">
                    {["all", "International", "Domestic"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedLocationType(type)}
                        className={cn(
                          "px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap",
                          selectedLocationType === type
                            ? "gradient-btn text-white shadow-md"
                            : "text-brand-blue hover:bg-white/50"
                        )}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile/Tablet Filter Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
                  className={cn(
                    "md:hidden flex items-center justify-center w-[40px] h-[40px] p-0 rounded-xl transition-all shrink-0",
                    isFiltersExpanded 
                      ? "bg-slate-900 text-white border-slate-900 shadow-md" 
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  )}
                >
                  {isFiltersExpanded ? <X className="w-5 h-5" /> : <SlidersHorizontal className="w-4 h-4" />}
                </Button>
              </div>

              {/* Collapsible Content Section */}
              <AnimatePresence>
                {(isFiltersExpanded || !isMounted || (isMounted && isDesktop)) && (
                  <motion.div
                    initial={isMounted && !isDesktop ? { height: 0, opacity: 0 } : false}
                    animate={isMounted && !isDesktop ? { height: "auto", opacity: 1 } : false}
                    exit={isMounted && !isDesktop ? { height: 0, opacity: 0 } : false}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={cn(
                      "overflow-hidden",
                      isMounted && !isDesktop && !isFiltersExpanded && "hidden"
                    )}
                  >
                    <div className="flex flex-col gap-4 mt-2 md:mt-0">
                      {/* Mobile-Only Secondary Filters Row */}
                      <div className="flex flex-col md:hidden gap-3 py-2">
                        {/* Mobile Region Select */}
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 pl-1">REGION</label>
                          <select 
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            className="w-full bg-slate-100 text-slate-700 text-sm font-bold px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0146b3]/20 focus:border-[#0146b3] cursor-pointer transition-all"
                            value={selectedRegion}
                          >
                            <option value="all">Discover All Regions</option>
                            {availableRegions.map(region => (
                              <option key={region.id} value={region.slug}>{region.name}</option>
                            ))}
                          </select>
                        </div>

                        {/* Mobile Travel Type */}
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 pl-1">TRAVEL TYPE</label>
                          <div className="inline-flex p-1 bg-gray-100 rounded-full w-full">
                            {["all", "International", "Domestic"].map((type) => (
                              <button
                                key={type}
                                onClick={() => setSelectedLocationType(type)}
                                className={cn(
                                  "flex-1 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap",
                                  selectedLocationType === type
                                    ? "gradient-btn text-white shadow-md"
                                    : "text-brand-blue bg-brand-blue/5"
                                )}
                              >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Tablet Destination Type (Visible on md, hidden on lg+) */}
                      <div className="hidden md:block lg:hidden">
                        <div className="inline-flex p-1 bg-slate-100 rounded-full">
                          {["all", "International", "Domestic"].map((type) => (
                            <button
                              key={type}
                              onClick={() => setSelectedLocationType(type)}
                              className={cn(
                                "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap",
                                selectedLocationType === type
                                  ? "gradient-btn text-white shadow-md"
                                  : "text-brand-blue"
                              )}
                            >
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Pill Filters Grid (Categories + Cities side-by-side on desktop) */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 overflow-hidden">
                        {/* Collections / Activity Themes (All devices) */}
                        <div className="min-w-0">
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 md:hidden pl-1">ACTIVITY THEMES</label>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setSelectedCategory("all")}
                              className={cn(
                                "w-[110px] md:w-[120px] py-2 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap flex-shrink-0 flex items-center justify-center",
                                "bg-slate-900 text-white shadow-sm md:shadow-[4px_0_12px_-2px_rgba(0,0,0,0.15)]",
                                selectedCategory !== "all" && "opacity-90 hover:opacity-100"
                              )}
                            >
                              All Activities
                            </button>
                            
                            <div className="flex gap-3 overflow-x-auto scrollbar-hide flex-1 py-1">
                              {categories.map((category) => (
                                <button
                                  key={category.id}
                                  onClick={() => setSelectedCategory(category.slug)}
                                  className={cn(
                                    "px-4 md:px-5 py-2 rounded-full text-[11px] md:text-sm font-bold transition-all whitespace-nowrap flex-shrink-0",
                                    selectedCategory === category.slug
                                      ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 shadow-md scale-105"
                                      : "bg-white text-slate-600 border border-gray-100 hover:border-yellow-400/50"
                                  )}
                                >
                                  {category.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* City Filter Pills (All devices) */}
                        {availableCities.length > 0 && (
                          <div className="min-w-0 animate-in fade-in slide-in-from-top-2 duration-300">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 md:hidden pl-1">EXPLORE CITIES</label>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => setSelectedCity("all")}
                                className={cn(
                                  "w-[110px] md:w-[120px] py-2 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap flex-shrink-0 flex items-center justify-center",
                                  "bg-slate-900 text-white shadow-sm md:shadow-[4px_0_12px_-2px_rgba(0,0,0,0.15)]",
                                  selectedCity !== "all" && "opacity-90 hover:opacity-100"
                                )}
                              >
                                All Cities
                              </button>
                              
                              <div className="flex gap-3 overflow-x-auto scrollbar-hide flex-1 py-1">
                                {availableCities.map((city) => (
                                  <button
                                    key={city.id}
                                    onClick={() => setSelectedCity(city.slug)}
                                    className={cn(
                                      "px-4 md:px-5 py-2 rounded-full text-[11px] md:text-sm font-bold transition-all whitespace-nowrap flex-shrink-0",
                                      selectedCity === city.slug
                                        ? "bg-gradient-to-r from-brand-blue to-brand-blue-hovered text-white shadow-md scale-105"
                                        : "bg-white text-slate-600 border border-gray-100 hover:border-brand-blue/50"
                                    )}
                                  >
                                    {city.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active Filter Indicator */}
              {(selectedCategory !== "all" || selectedLocationType !== "all" || selectedRegion !== "all" || selectedCity !== "all" || searchTerm) && (
                <div className="flex items-center gap-3 text-sm text-slate-500 font-bold mt-2 md:mt-2 pt-4 md:pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-left-4 duration-300 overflow-x-auto scrollbar-hide">
                  <span className="uppercase text-[9px] md:text-[10px] tracking-widest text-slate-400 whitespace-nowrap">Filtered By:</span>
                  <div className="flex gap-2 flex-nowrap md:flex-wrap">
                    {selectedLocationType !== "all" && (
                      <span className="px-2 py-0.5 md:px-3 md:py-1 bg-[#0146b3]/10 text-[#0146b3] rounded-lg text-[9px] md:text-[10px] font-bold uppercase whitespace-nowrap">{selectedLocationType}</span>
                    )}
                    {selectedCategory !== "all" && (
                      <span className="px-2 py-0.5 md:px-3 md:py-1 bg-brand-blue/10 text-brand-blue rounded-lg text-[9px] md:text-[10px] font-bold uppercase whitespace-nowrap">{selectedCategory}</span>
                    )}
                      <span className="px-2 py-0.5 md:px-3 md:py-1 bg-slate-800 text-white rounded-lg text-[9px] md:text-[10px] font-bold uppercase whitespace-nowrap">{selectedRegion}</span>
                    {selectedCity !== "all" && (
                      <span className="px-2 py-0.5 md:px-3 md:py-1 bg-brand-blue text-white rounded-lg text-[9px] md:text-[10px] font-bold uppercase whitespace-nowrap">{selectedCity}</span>
                    )}
                    {searchTerm && (
                      <span className="px-2 py-0.5 md:px-3 md:py-1 bg-slate-100 text-slate-600 rounded-lg text-[9px] md:text-[10px] font-bold uppercase whitespace-nowrap truncate max-w-[100px]">"{searchTerm}"</span>
                    )}
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedLocationType("all");
                      setSelectedRegion("all");
                      setSelectedCity("all");
                      setSearchTerm("");
                    }}
                    className="text-brand-red hover:underline text-[9px] md:text-[10px] font-bold uppercase px-2 py-1 rounded-md hover:bg-red-50 transition-colors ml-auto md:ml-0"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

        {/* Activities Grid */}
        {activitiesLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-brand-blue animate-spin mx-auto mb-4" />
              <p className="text-lg text-slate-600 font-medium">Loading activities...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ActivityCard 
                  data={{
                    name: activity.title,
                    badge: activity.badge || formatCategoryName(activity.category),
                    title: activity.title,
                    description: activity.description,
                    image: activity.image,
                    icon: activity.icon,
                    isPopular: activity.isPopular,
                    highlightsTitle: "What's Included:",
                    highlights: activity.highlights?.slice(0, 3) || [
                      "Professional guide & equipment",
                      "Safety briefing & insurance",
                      "Transport & refreshments"
                    ],
                    cityName: activity.cityName,
                    regionName: activity.regionName,
                    regionSlug: activity.regionSlug
                  }}
                  hoverGradient="from-brand-blue/95 to-blue-900"
                  ctaLabel="Learn More"
                  onCtaClick={() => {
                    const rSlug = resolveRegionSlug(activity);
                    router.push(`/activities/${rSlug}/${activity.slug}`);
                  }}
                  onCardClick={() => {
                    const rSlug = resolveRegionSlug(activity);
                    router.push(`/activities/${rSlug}/${activity.slug}`);
                  }}
                  secondaryCtaLabel={`Explore ${activity.cityName || activity.regionName}`}
                  onSecondaryCtaClick={() => {
                    const rSlug = resolveRegionSlug(activity);
                    router.push(`/packages/${rSlug}`);
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination UI */}
        {!activitiesLoading && filteredActivities.length > itemsPerPage && (
          <div className="flex flex-col items-center justify-center mt-6 md:mt-8 gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-brand-blue disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => {
                  const pageNumber = i + 1;
                  // Show current page, first, last, and pages around current
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <Button
                        key={pageNumber}
                        variant={currentPage === pageNumber ? "default" : "outline"}
                        onClick={() => handlePageChange(pageNumber)}
                        className={cn(
                          "w-10 h-10 rounded-xl font-bold transition-all duration-200",
                          currentPage === pageNumber 
                            ? "bg-brand-blue hover:bg-brand-blue/90 text-white shadow-md scale-105" 
                            : "border-slate-200 text-slate-500 hover:border-brand-blue/30 hover:text-brand-blue bg-white"
                        )}
                      >
                        {pageNumber}
                      </Button>
                    );
                  } else if (
                    (pageNumber === currentPage - 2 && pageNumber > 1) ||
                    (pageNumber === currentPage + 2 && pageNumber < totalPages)
                  ) {
                    return <span key={pageNumber} className="px-2 text-slate-400">...</span>;
                  }
                  return null;
                })}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-brand-blue disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            
            <p className="text-sm font-medium text-slate-500">
              Showing <span className="text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span> - <span className="text-slate-900">{Math.min(currentPage * itemsPerPage, filteredActivities.length)}</span> of <span className="text-slate-900">{filteredActivities.length}</span> activities
            </p>
          </div>
        )}

        {!activitiesLoading && filteredActivities.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-6">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No activities found</h3>
            <p className="text-slate-500">Try adjusting your search or category filters.</p>
          </div>
        )}
      </Container>
      <section className="pb-8 md:pb-12 bg-white">
        <InspirationSection />
      </section>
    </div>
  );
}
