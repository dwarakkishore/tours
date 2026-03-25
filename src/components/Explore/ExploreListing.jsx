"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { 
  Search, 
  SlidersVertical, 
  MapPin, 
  Globe, 
  Compass, 
  CircleDollarSign, 
  Filter, 
  Package,
  X,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeletons } from "../Skeleton";
import PackageCard from "@/components/ui/PackageCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { getAllPublishedPackages } from "@/utils/firebase";
import { cn } from "@/lib/utils";
import { getPaginationPages } from "@/utils/paginationUtils";

const ExploreListing = ({ initialPackages = [] }) => {
  const [allPackages, setAllPackages] = useState(initialPackages);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("international"); // Default to international
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedTheme, setSelectedTheme] = useState("all");
  const [range, setRange] = useState([0, 1000000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const listingRef = useRef(null);
  const itemsPerPage = 12;

  useEffect(() => {
    setIsMounted(true);
    if (initialPackages.length === 0 && allPackages.length === 0) {
      const fetchAll = async () => {
        setIsLoading(true);
        try {
          const [intl, dom] = await Promise.all([
            getAllPublishedPackages("international"),
            getAllPublishedPackages("domestic")
          ]);
          setAllPackages([...(intl || []), ...(dom || [])]);
        } catch (error) {
          console.error("Fetch error:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchAll();
    }
  }, [initialPackages.length, allPackages.length]);

  // Derived Data
  const filteredByType = useMemo(() => {
    return allPackages.filter(p => 
      selectedType === "all" || 
      (selectedType === "domestic" && p.domestic) || 
      (selectedType === "international" && !p.domestic)
    );
  }, [allPackages, selectedType]);

  const allThemes = useMemo(() => {
    const themes = new Set();
    filteredByType.forEach(p => {
      if (p.theme) p.theme.forEach(t => themes.add(t));
    });
    return [
      { value: "all", label: "All Themes" },
      ...Array.from(themes).sort().map(t => ({ value: t, label: t }))
    ];
  }, [filteredByType]);

  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(filteredByType.map(p => p.region))].filter(Boolean).sort();
    return [
      { value: "all", label: "All Destinations" },
      ...uniqueRegions.map(r => ({
        value: r,
        label: r.split("-").join(" ").toUpperCase()
      }))
    ];
  }, [filteredByType]);

  const filteredArray = useMemo(() => {
    let result = filteredByType.filter((item) => {
      const price = item.offerPrice || item.price || 0;
      const isPriceInRange = price >= range[0] && price <= range[1];
      const isThemeSelected = selectedTheme === "all" || (item.theme && item.theme.includes(selectedTheme));
      const isRegionSelected = selectedRegion === "all" || item.region === selectedRegion;

      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        (item.packageTitle && item.packageTitle.toLowerCase().includes(searchLower)) ||
        (item.region && item.region.toLowerCase().replace(/-/g, " ").includes(searchLower)) ||
        (item.citiesList && item.citiesList.toLowerCase().includes(searchLower));

      return isPriceInRange && isThemeSelected && isRegionSelected && matchesSearch;
    });

    if (sortOption === "price-low-high") {
      result.sort((a, b) => (a.offerPrice || a.price) - (b.offerPrice || b.price));
    } else if (sortOption === "price-high-low") {
      result.sort((a, b) => (b.offerPrice || b.price) - (a.offerPrice || a.price));
    }

    return result;
  }, [filteredByType, range, selectedTheme, selectedRegion, sortOption, searchTerm]);

  const paginatedArray = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredArray.slice(start, start + itemsPerPage);
  }, [filteredArray, currentPage]);

  const totalPages = Math.ceil(filteredArray.length / itemsPerPage);

  const handleReset = () => {
    setSelectedRegion("all");
    setSelectedTheme("all");
    setRange([0, 1000000]);
    setSearchTerm("");
    setSortOption("all");
    setCurrentPage(1);
  };

  const getThemeKey = (themes) => {
    if (!themes || themes.length === 0) return "explore";
    const primaryTheme = themes[0].toLowerCase();
    if (primaryTheme.includes("romantic")) return "romantic";
    if (primaryTheme.includes("group")) return "group";
    if (primaryTheme.includes("family")) return "family";
    if (primaryTheme.includes("solo")) return "solo";
    if (primaryTheme.includes("elite") || primaryTheme.includes("luxury")) return "elite";
    if (primaryTheme.includes("relax") || primaryTheme.includes("wellness")) return "relax";
    if (primaryTheme.includes("explore") || primaryTheme.includes("adventure") || primaryTheme.includes("wildlife")) return "explore";
    if (primaryTheme.includes("religious") || primaryTheme.includes("pilgrimage")) return "religious";
    if (primaryTheme.includes("educational")) return "educational";
    return "explore";
  };

  if (!isMounted) return null;

  return (
    <div className="bg-white min-h-screen relative" ref={listingRef}>
      {/* 1. CONTROL CENTER - Sticky Navigation */}
      <div className="sticky top-24 md:top-[72px] z-40 transition-all duration-300">
        <Container className="pt-1 pb-3 md:pt-1.5 md:pb-4">
          <div className="bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-[2rem] shadow-lg px-4 py-2 md:px-6 md:py-2.5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Toggles */}
            <div className="inline-flex p-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
              {["international", "domestic"].map((type) => (
                <button
                  key={type}
                  onClick={() => { setSelectedType(type); handleReset(); }}
                  className={cn(
                    "px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 capitalize",
                    selectedType === type
                      ? "bg-brand-blue text-white shadow-lg scale-105 ring-4 ring-brand-blue/10"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Quick Search & Filter Trigger */}
            <div className="flex w-full md:w-auto items-center gap-3">
              <div className="relative group flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-blue transition-colors" />
                <Input
                  placeholder="Seach destinations..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="pl-11 h-12 bg-slate-50/50 border-slate-200/60 rounded-2xl text-[11px] font-bold tracking-wide focus:bg-white focus:ring-4 focus:ring-brand-blue/5 transition-all"
                />
              </div>
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className={cn(
                  "h-12 px-6 rounded-2xl border-slate-200/60 gap-3 text-[10px] font-bold uppercase tracking-widest transition-all",
                  showFilters ? "bg-slate-900 text-white shadow-2xl scale-[1.02]" : "bg-white hover:bg-slate-50"
                )}
              >
                <SlidersVertical className="w-4 h-4" />
                <span>Filters</span>
                <div className={cn("px-2 py-0.5 rounded-full text-[8px] bg-slate-200 text-slate-600 transition-colors", showFilters && "bg-white/20 text-white")}>
                   {filteredArray.length}
                </div>
              </Button>
            </div>
          </div>

          {/* 2. EXPANDABLE GLASS FILTERS */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-6 pb-4 mt-4 border-t border-slate-100">
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                      {/* Destination */}
                      <div className="space-y-3">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-brand-blue" /> Specific Region
                        </label>
                        <Select value={selectedRegion} onValueChange={(v) => { setSelectedRegion(v); setCurrentPage(1); }}>
                          <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-slate-50/50 font-bold text-[11px] hover:bg-white transition-all">
                            <SelectValue placeholder="Global Search" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                             {regions.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Style */}
                      <div className="space-y-3">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <Compass className="w-3.5 h-3.5 text-brand-blue" /> Travel Style
                        </label>
                        <Select value={selectedTheme} onValueChange={(v) => { setSelectedTheme(v); setCurrentPage(1); }}>
                          <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-slate-50/50 font-bold text-[11px] hover:bg-white transition-all">
                            <SelectValue placeholder="All Themes" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            {allThemes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Sorting */}
                      <div className="space-y-3">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <Filter className="w-3.5 h-3.5 text-brand-blue" /> Order By
                        </label>
                        <Select value={sortOption} onValueChange={(v) => { setSortOption(v); setCurrentPage(1); }}>
                          <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-slate-50/50 font-bold text-[11px] hover:bg-white transition-all">
                            <SelectValue placeholder="Recommended" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="all">Recommended</SelectItem>
                            <SelectItem value="price-low-high">Lowest Price</SelectItem>
                            <SelectItem value="price-high-low">Highest Price</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Reset */}
                      <div className="flex gap-2">
                         <Button onClick={handleReset} variant="outline" className="flex-1 h-11 rounded-xl border-slate-200 bg-slate-50/50 text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-red-500 transition-all">
                           Clear All
                         </Button>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </Container>
      </div>

      {/* 3. MAIN LISTING GRID */}
      <div className="py-4 md:py-6">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={`skeleton-${i}`} className="space-y-6">
                    <Skeletons.Card.LG />
                  </div>
                ))
              ) : paginatedArray.length > 0 ? (
                paginatedArray.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    key={item.id}
                  >
                    <PackageCard item={item} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-32 flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-slate-100 shadow-inner">
                    <Package className="w-10 h-10 text-slate-200" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight italic font-serif">A Little Too Unique...</h3>
                  <p className="text-slate-500 max-w-md mx-auto text-sm font-medium">We couldn't find any journeys matching your exact filters. Try broadening your horizon!</p>
                  <Button onClick={handleReset} variant="link" className="mt-4 text-brand-blue font-bold uppercase tracking-widest text-[10px]">Back to Collections</Button>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* 4. PREMIUM PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center py-6 border-t border-slate-100/50">
              <Pagination>
                <PaginationContent className="gap-3">
                  <PaginationItem>
                    <PaginationPrevious
                      className={cn("cursor-pointer rounded-2xl h-12 w-12 border-slate-200 flex items-center justify-center p-0 transition-all hover:bg-slate-900 hover:text-white", currentPage === 1 && "pointer-events-none opacity-30")}
                      onClick={() => { setCurrentPage(currentPage - 1); window.scrollTo({ top: 300, behavior: "smooth" }); }}
                    />
                  </PaginationItem>
                  
                  {getPaginationPages(currentPage, totalPages).map((page, i) => (
                    <PaginationItem key={i} className="hidden sm:block">
                      {page === "..." ? (
                        <PaginationEllipsis className="text-slate-400" />
                      ) : (
                        <PaginationLink
                          className={cn(
                            "cursor-pointer rounded-2xl h-12 w-12 font-bold text-xs transition-all border-slate-200",
                            currentPage === page ? "bg-slate-900 text-white shadow-xl scale-110 border-transparent" : "hover:bg-slate-50"
                          )}
                          onClick={() => { setCurrentPage(page); window.scrollTo({ top: 300, behavior: "smooth" }); }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      className={cn("cursor-pointer rounded-2xl h-12 w-12 border-slate-200 flex items-center justify-center p-0 transition-all hover:bg-slate-900 hover:text-white", currentPage === totalPages && "pointer-events-none opacity-30")}
                      onClick={() => { setCurrentPage(currentPage + 1); window.scrollTo({ top: 300, behavior: "smooth" }); }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default ExploreListing;
