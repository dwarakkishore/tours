"use client";
import { Search, Star, MoveRight, Phone, Sparkles, Compass, Headphones, Globe, Plane } from "lucide-react";
import React from "react";
import { searchPackages } from "@/utils/firebase";
import { AnimatedInput } from "../ui/AnimatedInput";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../Skeleton";
import Link from "next/link";
import Image from "next/image";
import ReviewCompanies from "@/assets/reviewCompanies.png";
// import heroPoster from "@/assets/hero.jpg"; // Imported hero image for poster
import dynamic from "next/dynamic";
import { SEARCH_API, TRENDING_PACKAGES } from "@/config";
import { normalizeImageUrl } from "@/lib/utils";

const MobileSearch = dynamic(() => import("./MobileSearch"), { ssr: false });

const Hero = () => {
  // Search state
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const inputRef = React.useRef(null);
  const dropdownRef = React.useRef(null);
  const debounceTimeout = React.useRef();

  // Debounced search
  React.useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(async () => {
      try {
        // Switching to internal search exclusively due to external API timeouts
        const data = await searchPackages(searchTerm);
        setSearchResults({
          packages: data.packages || [],
          regions: data.regions || [],
          packagesByRegion: data.packagesByRegion || []
        });
      } catch (e) {
        console.error("Internal Search Error:", e);
        setSearchResults({ packages: [], regions: [], packagesByRegion: [] });
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => clearTimeout(debounceTimeout.current);
  }, [searchTerm]);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClick(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showDropdown]);

  return (
    <>
      <div className="relative flex flex-col justify-center min-h-[90vh] sm:min-h-[100dvh] w-full bg-brand-deep">
        <video
          className="absolute inset-0 z-0 h-full w-full object-cover"
          poster="https://cdn.bayardvacations.com/images/1770397299555-Screenshot_2026-02-06_195709_copy.jpg"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://cdn.bayardvacations.com/images/1770397237699-0206__1__1_.mp4"
            type="video/mp4"
          />
        </video>
        <div
          className="absolute inset-0 z-10 top-0 left-0 h-full w-full bg-black/40"
        />

        <div className="max-w-4xl mx-auto flex flex-col gap-8 sm:gap-16 relative z-40 pb-32 sm:pb-0">
          {/* <div className="text-center font-bold text-xl sm:text-3xl text-white px-10 pt-10 font-nord">
            DISCOVER. EXPLORE. EXPERIENCE.
          </div> */}

          <div className="text-center px-4 sm:px-6">
            <h1
              className="
      mt-2
      text-xl sm:text-3xl md:text-4xl lg:text-5xl
      font-bold
      tracking-tight
      text-white
      drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]
      max-w-6xl mx-auto
      leading-tight sm:leading-[1.1]
      px-2
    "
            >
              Every journey deserves to feel <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">personal</span>.   
            </h1>
            <p 
              style={{ color: '#fbfbfbff' }}
              className="hidden sm:block mt-3 sm:mt-6 text-[9px] sm:text-base md:text-lg font-medium tracking-wide drop-shadow-sm max-w-fit mx-auto leading-relaxed bg-white/10 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-white/20 shadow-lg"
            >
               Thoughtfully designed itineraries, trusted support, and seamless experiences
            </p>
          </div>

          {/* Search Bar */}
          {/* ================= SEARCH BAR ================= */}
          <div className="relative w-4/5 sm:w-3/4 mx-auto z-50 px-2 sm:px-0">
            {/* -------- MOBILE SEARCH -------- */}
            <MobileSearch />

            {/* -------- DESKTOP SEARCH -------- */}
            <div
              className="
    hidden sm:flex items-center
    px-6 py-4
    rounded-[2.2rem]
    bg-black/35
    backdrop-blur-md
    text-white
    shadow-2xl shadow-black/60
    w-full
    gradient-border
    ring-2 ring-white/30
  "
            >
              <Search className="size-8 mr-2 shrink-0" />

              <AnimatedInput
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholderItems={[
                  "Search destinations, packages...",
                  "Explore Bali, Thailand, Europe...",
                  "Find your perfect vacation...",
                ]}
                className="
        bg-transparent
        border-none
        focus-visible:ring-0
        focus-visible:ring-offset-0
        shadow-none
        text-sm sm:text-base
        text-white
        placeholder:text-white/70
        w-full
      "
                autoComplete="off"
              />
            </div>

            {/* ================= DROPDOWN ================= */}
            {showDropdown && searchTerm.length > 0 && (
              <Card
                ref={dropdownRef}
                className="
        absolute left-0 right-0 mt-2 z-50
        border shadow-lg bg-white
        max-h-[250px] overflow-y-auto rounded
        scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
      "
              >
                <CardContent className="p-0">
                  {loading ? (
                    <div className="p-4 flex flex-col gap-2">
                      <Skeleton className="h-6 w-full rounded" />
                      <Skeleton className="h-6 w-2/3 rounded" />
                      <Skeleton className="h-6 w-1/2 rounded" />
                    </div>
                  ) : searchTerm &&
                    searchResults.packages?.length === 0 &&
                    searchResults.regions?.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground text-sm">
                      No packages found for &quot;{searchTerm}&quot;
                    </div>
                  ) : (
                    <div className="p-4">
                      {/* Regions */}
                      {searchResults.regions?.length > 0 && (
                          <>
                            <p className="mb-4 text-sm text-slate-500">
                              Regions
                            </p>
                          <ul className="text-brand-blue mb-4">
                            {searchResults.regions.map((region) => (
                              <li key={region.id || region.slug}>
                                <Link
                                  href={`/packages/${region.slug}`}
                                  className="flex items-center gap-3 hover:bg-brand-blue/10 p-2 rounded"
                                  onClick={() => setShowDropdown(false)}
                                >
                                  <MoveRight className="size-4" />
                                  <span className="capitalize">
                                    {region.name}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <hr className="my-4 border-t border-gray-300" />
                        </>
                      )}

                      {/* Packages */}
                      {searchResults.packages?.length > 0 && (
                          <>
                            <p className="mb-4 text-sm text-slate-500">
                              Available Packages
                            </p>
                          <ul className="text-brand-blue">
                            {searchResults.packages.map((pkg) => (
                              <li key={pkg.id}>
                                <Link
                                  href={`/packages/${pkg.region}/${pkg.packageSlug}`}
                                  className="flex items-center gap-3 hover:bg-brand-blue/10 p-2 rounded"
                                  onClick={() => setShowDropdown(false)}
                                >
                                  {pkg.bannerImage && (
                                    <Image
                                      src={normalizeImageUrl(pkg.bannerImage)}
                                      alt={pkg.name}
                                      width={55}
                                      height={55}
                                      className="rounded object-cover aspect-square bg-gray-200"
                                    />
                                  )}
                                  <div className="flex-1">
                                    <div className="font-medium line-clamp-1">
                                      {pkg.name}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {pkg.region?.split("-").join(" ")}
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      {/* Quick Links */}
                      {!searchResults.packages?.length &&
                        !searchResults.regions?.length && (
                            <>
                              <p className="mb-2 text-sm text-slate-500">
                                Quick Links
                              </p>
                            <ul className="text-brand-blue">
                              {TRENDING_PACKAGES.map((pkg) => (
                                <li key={pkg}>
                                  <Link
                                    href={`/packages/${pkg}`}
                                    className="flex items-center gap-3 hover:bg-brand-blue/10 p-2 rounded"
                                    onClick={() => setShowDropdown(false)}
                                  >
                                    <MoveRight className="size-4" />
                                    <span className="capitalize">{pkg}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>


        </div>
      {/* MODERN OVERLAY FOOTER (Marquee + Stats) */}
      <div className="absolute bottom-0 w-full z-30">
        
        {/* Highlight Marquee - High Visibility Terracotta Ribbon */}
        {/* <div className="relative w-full overflow-hidden bg-brand-blue shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border-b border-brand-dark/5 z-20">
          <div className="flex items-center whitespace-nowrap animate-marquee py-2 sm:py-3">
            <span className="mx-8 sm:mx-10 text-white font-bold tracking-wide text-xs sm:text-sm uppercase flex items-center gap-2">
              <Star className="size-3 fill-brand-accent text-brand-accent" /> Curated Luxury Holidays
            </span>
            <span className="mx-8 sm:mx-10 text-white font-bold tracking-wide text-xs sm:text-sm uppercase flex items-center gap-2">
              <Star className="size-3 fill-brand-accent text-brand-accent" /> Handpicked Destinations Worldwide
            </span>
            <span className="mx-8 sm:mx-10 text-white font-bold tracking-wide text-xs sm:text-sm uppercase flex items-center gap-2">
              <Star className="size-3 fill-brand-accent text-brand-accent" /> Personalized Travel Experiences
            </span>
            <span className="mx-8 sm:mx-10 text-white font-bold tracking-wide text-xs sm:text-sm uppercase flex items-center gap-2">
              <Star className="size-3 fill-brand-accent text-brand-accent" /> Trusted by 25,000+ Happy Travelers
            </span>
             <span className="mx-8 sm:mx-10 text-white font-bold tracking-wide text-xs sm:text-sm uppercase flex items-center gap-2">
              <Star className="size-3 fill-brand-accent text-brand-accent" /> Curated Luxury Holidays
            </span>
            <span className="mx-8 sm:mx-10 text-white font-bold tracking-wide text-xs sm:text-sm uppercase flex items-center gap-2">
              <Star className="size-3 fill-brand-accent text-brand-accent" /> Handpicked Destinations Worldwide
            </span>
          </div>
        </div> */}


        {/* Banner Action Buttons - Hidden on mobile */}
        <div className="hidden sm:flex absolute bottom-20 sm:bottom-16 lg:bottom-20 left-0 right-0 px-6 sm:px-12 z-30 pointer-events-none justify-between items-end">
          {/* Left Side: Explore */}
          <Link 
            href="/explore"
            className="pointer-events-auto group flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-white hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-brand-blue/20 hover:-translate-y-1"
          >
            <div className="bg-brand-blue/80 p-1 sm:p-1.5 rounded-full">
              <Compass className="size-3.5 sm:size-4 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/70 mb-0.5">Adventure Awaits</span>
              <span className="text-xs sm:text-base font-bold">Discover Journeys</span>
            </div>
          </Link>

          {/* Right Side: Contact */}
          <Link 
            href="/contact"
            className="pointer-events-auto group flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-white hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-brand-blue/20 hover:-translate-y-1"
          >
            <div className="flex flex-col items-end leading-none">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/70 mb-0.5">Questions?</span>
              <span className="text-xs sm:text-base font-bold">Consult Expert</span>
            </div>
            <div className="bg-brand-blue/80 p-1 sm:p-1.5 rounded-full">
              <Headphones className="size-3.5 sm:size-4 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </Link>
        </div>

        {/* Mobile Action Buttons - Below Stats */}
        <div className="sm:hidden relative z-40 flex gap-3 w-full px-4 mt-6 pb-4">
          <Link 
            href="/explore"
            className="flex-1 flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2.5 rounded-xl text-white hover:bg-white/20 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.2)] active:scale-95"
          >
            <div className="bg-brand-blue/80 p-1 rounded-full">
              <Compass className="size-3.5" />
            </div>
            <span className="text-xs font-bold tracking-tight">Explore</span>
          </Link>

          <Link 
            href="/contact"
            className="flex-1 flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2.5 rounded-xl text-white hover:bg-white/20 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.2)] active:scale-95"
          >
            <span className="text-xs font-bold tracking-tight">Contact</span>
            <div className="bg-brand-blue/80 p-1 rounded-full">
              <Headphones className="size-3.5" />
            </div>
          </Link>
        </div>

        {/* Quick Stats - Enhanced Design */}
        <div 
          style={{ background: 'linear-gradient(to bottom, #001233CC 0%, #0046b8CC 100%)' }}
          className="text-white shadow-[0_-10px_40px_rgba(0,0,0,0.6)] relative z-30 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto">
            {/* MOBILE LAYOUT */}
            <div className="sm:hidden flex flex-col py-1.5 px-4">
              {/* Top Row: Rating & Stats */}
              <div className="flex items-center justify-between mb-1.5 px-2">
                {/* Google Rating Pill */}
                <div className="flex items-center gap-1.5 bg-[#4285F4]/90 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/20 shadow-lg">
                  <div className="bg-white rounded-full p-0.5">
                    <Image src={ReviewCompanies} alt="G" className="w-2.5 h-2.5 object-contain" />
                  </div>
                  <span className="text-xs font-bold text-white">4.9</span>
                  <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                </div>

                {/* Travelers */}
                <div className="flex flex-col items-end text-right">
                  <span className="text-lg font-bold text-white leading-none">25,000+</span>
                  <span className="text-[8px] font-bold text-white/80 uppercase tracking-widest mt-0.5">TRAVELERS</span>
                </div>

                {/* Itineraries */}
                <div className="flex flex-col items-end text-right">
                  <span className="text-lg font-bold text-white leading-none">1000+</span>
                  <span className="text-[8px] font-bold text-white/80 uppercase tracking-widest mt-0.5">ITINERARIES</span>
                </div>
              </div>



              {/* Bottom Row: Icons */}
              <div className="grid grid-cols-3 gap-1">
                {/* AI Assistant */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-white/10 flex items-center justify-center mb-0.5 shadow-inner">
                    <Plane className="w-3.5 h-3.5 text-blue-300 fill-blue-300/20" />
                  </div>
                  <span className="text-[7px] font-bold text-white uppercase tracking-wider text-center leading-tight">AI ASSISTANT</span>
                </div>

                {/* 24/7 Support */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-white/10 flex items-center justify-center mb-0.5 shadow-inner">
                    <Phone className="w-3.5 h-3.5 text-gray-300 fill-gray-300/20" />
                  </div>
                  <span className="text-[7px] font-bold text-white uppercase tracking-wider text-center leading-tight">24/7 SUPPORT</span>
                </div>

                {/* Global Coverage */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-white/10 flex items-center justify-center mb-0.5 shadow-inner">
                    <Globe className="w-3.5 h-3.5 text-emerald-300 fill-emerald-300/20" />
                  </div>
                  <span className="text-[7px] font-bold text-white uppercase tracking-wider text-center leading-tight">GLOBAL COVERAGE</span>
                </div>
              </div>
            </div>

            {/* DESKTOP LAYOUT (Unchanged) */}
            <div className="hidden sm:flex sm:flex-row sm:items-center sm:justify-between py-2 sm:py-3 px-3 sm:px-12 gap-3 gap-y-4 sm:gap-6">
            
            {/* Review Badge */}
            <a 
              href="https://www.google.com/search?sca_esv=bfc79b9b44160e7b&sxsrf=ANbL-n6D9k58mEqPkUW7KDcYQUSUWWZaFw:1768213761642&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOdIhnvGyPmjx2iWMPrXQmOMDb7y8i0hQYnbD65r7JPZU7-dfoSXAN8GKo3S4xUILSWr5tzKc1Yf8_4j7sf887yPWbseRs4slYUwZZga9TnZ773fENw%3D%3D&q=Bayard+Vacations+Reviews&sa=X&ved=2ahUKEwjX75jJ5YWSAxXKa2wGHdDwF7YQQ0bkNegQIPhAE&biw=1792&bih=913&dpr=2&aic=0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row items-center justify-center gap-1 sm:gap-2.5 shrink-0 bg-white/5 px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group/badge col-span-1 sm:col-auto"
            >
              <Image
                src={ReviewCompanies}
                alt="Google"
                priority
                className="h-4 sm:h-8 w-auto group-hover/badge:scale-105 transition-transform duration-300"
              />
              <div className="flex items-center gap-0.5 sm:gap-1 font-bold group-hover/badge:translate-x-0.5 transition-transform duration-300">
                <span className="text-xs sm:text-xl font-bold text-white leading-none">4.9</span>
                <Star className="size-2 sm:size-4 fill-[#FBBC05] stroke-[#FBBC05]" />
              </div>
            </a>

            {/* Travelers */}
            <div className="flex flex-col items-center justify-center text-center shrink-0 col-span-1 sm:col-auto">
              <span className="text-xs sm:text-lg font-bold text-white leading-none">25,000+</span>
              <span className="text-[7px] sm:text-[10px] font-bold text-white/90 tracking-wider mt-0.5">Travelers</span>
            </div>

            {/* Itineraries */}
            <div className="flex flex-col items-center justify-center text-center shrink-0 col-span-1 sm:col-auto">
              <span className="text-xs sm:text-lg font-bold text-white leading-none">1000+</span>
              <span className="text-[7px] sm:text-[10px] font-bold text-white/90 tracking-wider mt-0.5">Itineraries</span>
            </div>

            {/* AI Assistant */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-2 shrink-0 col-span-1 sm:col-auto">
              <div className="h-5 w-5 sm:h-8 sm:w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 border border-white/10 mx-auto sm:mx-0">
                <Sparkles className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="leading-tight text-center sm:text-left">
                <span className="block text-[7px] sm:text-sm font-bold text-white uppercase tracking-tight whitespace-nowrap">AI Assistant</span>
                <span className="hidden sm:block text-[9px] sm:text-[10px] font-bold text-white/90 tracking-wider mt-0.5">Instant Ideas</span>
              </div>
            </div>

            {/* 24/7 Support */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-2 shrink-0 col-span-1 sm:col-auto">
              <div className="h-5 w-5 sm:h-8 sm:w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 border border-white/10 mx-auto sm:mx-0">
                <Phone className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="leading-tight text-center sm:text-left">
                <span className="block text-[7px] sm:text-sm font-bold text-white uppercase tracking-tight whitespace-nowrap">24/7 Support</span>
                <span className="hidden sm:block text-[9px] sm:text-[10px] font-bold text-white/90 uppercase tracking-tighter mt-0.5 whitespace-nowrap">Assistance</span>
              </div>
            </div>

          </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default Hero;
