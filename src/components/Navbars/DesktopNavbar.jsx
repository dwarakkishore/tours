"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Container from "../ui/Container";
import {
  ChevronDown,
  CircleUserRound,
  MoveRight,
  Radius,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import navbarData from "./navbarData";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { useDebounce } from "@/hooks/useDebounce";
import { TRENDING_PACKAGES, SEARCH_API } from "@/config";
import { searchPackages } from "@/utils/firebase";

const DesktopNavbar = () => {
  const inputRef = useRef(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [previousDropdown, setPreviousDropdown] = useState(null);
  const [dropdownHeights, setDropdownHeights] = useState({});
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isHoverDisabled, setIsHoverDisabled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    packages: [],
    regions: [],
    packagesByRegion: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 500);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  // Header should be fixed/sticky on all pages for a premium feel
  const [isHeaderFixed, setIsHeaderFixed] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Pages that have a large dark hero banner should start transparent
  const isHeroPage = isHomePage || 
                     pathname === "/explore" ||
                     pathname === "/about" || 
                     pathname === "/faq" || 
                     pathname === "/login" ||
                     pathname?.startsWith("/why-choose") ||
                     pathname?.startsWith("/blogs") ||
                     pathname?.startsWith("/packages/");

  useEffect(() => {
    if (!isHeroPage) {
      setIsScrolled(true); // always solid on pages without heroes
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHeroPage, pathname]);

  const measureRef = useRef(null);

  useEffect(() => {
    const fetchPackages = async () => {
      if (debouncedSearch.trim() && debouncedSearch.length > 1) {
        setIsLoading(true);
        try {
          // Switching to internal search exclusively due to external API timeouts
          const data = await searchPackages(debouncedSearch);
          setSearchResults({
            packages: data.packages || [],
            regions: data.regions || [],
            packagesByRegion: data.packagesByRegion || []
          });
        } catch (error) {
          console.error("Internal Search Error in Header:", error);
          setSearchResults({ packages: [], regions: [], packagesByRegion: [] });
        }
        setIsLoading(false);
      } else {
        setSearchResults({ packages: [], regions: [], packagesByRegion: [] });
      }
    };

    fetchPackages();
  }, [debouncedSearch]);

  const handleIsSearchActive = () => {
    if (isSearchActive) {
      setIsHoverDisabled(true);
      setTimeout(() => {
        setIsHoverDisabled(false);
      }, 2000);
    }
    setIsSearchActive(!isSearchActive);
    if (isSearchActive) {
      setSearchTerm("");
      setSearchResults([]);
    }
    if (activeDropdown) {
      handleMouseLeave();
    }
  };

  const measureHeight = () => {
    if (measureRef.current && activeDropdown) {
      const height = measureRef.current.offsetHeight + 64;
      setDropdownHeights((prev) => ({
        ...prev,
        [activeDropdown.id]: height,
      }));
    }
  };

  useEffect(() => {
    measureHeight();
    // eslint-disable-next-line
  }, [activeDropdown]);

  const handleMouseOver = (item) => {
    if (isHoverDisabled) return;

    if (item.hasDropdown) {
      if (activeDropdown?.id !== item.id) {
        setPreviousDropdown(activeDropdown);
        setActiveDropdown(item);
      }
    } else {
      setPreviousDropdown(activeDropdown);
      setActiveDropdown(null);
    }
  };

  const handleMouseLeave = () => {
    setPreviousDropdown(activeDropdown);
    setActiveDropdown(null);
  };

  const getAnimationDirection = () => {
    if (!activeDropdown) return "none";
    if (!previousDropdown) return "right";

    const prevIndex = navbarData.findIndex(
      (item) => item.id === previousDropdown.id
    );
    const currentIndex = navbarData.findIndex(
      (item) => item.id === activeDropdown.id
    );

    return prevIndex < currentIndex ? "right" : "left";
  };

  const getCurrentHeight = () => {
    if (!activeDropdown) return "64px";
    return `${dropdownHeights[activeDropdown.id] + 20}px` || "64px";
  };

  return (
    <>
      <header
        className={cn(
          "fixed z-[100] hidden w-full py-2 c-lg:block desktop-header",
          {
            absolute: !isHeaderFixed,
          }
        )}
      >
        <Container>
          <style jsx global>{`
            @keyframes slideFromLeft {
              from {
                opacity: 0;
                transform: translateX(-4rem);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }

            @keyframes slideFromRight {
              from {
                opacity: 0;
                transform: translateX(4rem);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }

            .slide-from-left {
              animation: slideFromLeft 0.3s ease-out forwards;
            }

            .slide-from-right {
              animation: slideFromRight 0.3s ease-out forwards;
            }
          `}</style>

          <div
            className="relative mx-auto overflow-hidden rounded px-4 lg:px-4 xl:px-6 2xl:px-8 transition-all duration-300 ease-in-out"
            style={{
              height: getCurrentHeight(),
              maxWidth: isSearchActive ? "800px" : "100%",
              borderRadius: "50px",

              backgroundImage:
                isHomePage && !isScrolled && !isSearchActive
                  ? "none"
                  : "none",
              backgroundColor:
                isHeroPage && !isScrolled && !isSearchActive
                  ? "transparent"
                  : "rgba(0, 0, 0, 0.6)", // Dark Glass
              backdropFilter: "blur(16px)", // Ensure blur is applied
              animation: "none",

              transition: `
    height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    max-width 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    border-radius 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    background-image 0.3s ease
  `,
            }}
            //             style={{
            //               height: getCurrentHeight(),
            //               maxWidth: isSearchActive ? "800px" : "100%",
            //               backgroundColor:
            //                 isHomePage && !isScrolled && !isSearchActive
            //                   ? "transparent"
            //                   : "#0146b3",
            //               borderRadius: "50px",
            //               transition: `
            //   height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
            //   max-width 0.4s cubic-bezier(0.4, 0, 0.2, 1),
            //   background-color 0.3s ease,
            //   border-radius 0.4s cubic-bezier(0.4, 0, 0.2, 1)
            // `,
            //             }}
            onMouseLeave={handleMouseLeave}
          >
            <nav
              className={cn(
                "h-16 flex items-center justify-between gap-2 lg:gap-3 xl:gap-4 text-white transition-all duration-300 ease-in-out",
                {
                  "opacity-0 h-0 scale-95": isSearchActive,
                  "opacity-100 scale-100": !isSearchActive,
                  "text-brand-blue": !isHeaderFixed,
                }
              )}
            >
              <Link href="/" onMouseOver={() => setActiveDropdown(null)} className="flex-shrink-0">
                <Image
                  priority
                  width={180}
                  height={36}
                  alt="Bayard Vacations Logo"
                  src="/Bayard_white_logo.svg"
                  className="w-28 lg:w-32 xl:w-36 2xl:w-40 h-auto transition-all duration-300"
                />
              </Link>
              <ul className="mx-auto flex items-center gap-2 lg:gap-3 xl:gap-5 2xl:gap-8 transition-all duration-300">
                {navbarData.map((item) => (
                  <li key={item.id} onMouseOver={() => handleMouseOver(item)}>
                    <Link
                      href={item?.href || "/"}
                      className="relative flex items-center gap-1 rounded-full text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[16px] font-semibold whitespace-nowrap ease-out after:absolute after:bottom-0 after:left-0 after:inline-block  after:h-px after:w-full after:translate-y-1 after:scale-x-0 after:bg-[#59DF02] after:transition-all after:duration-300 after:content-[''] hover:after:scale-x-100"
                    >
                      <span>{item.title}</span>
                      {item.hasDropdown && <ChevronDown className="size-3 lg:size-3.5 xl:size-4 shrink-0" />}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-1.5 lg:gap-2 xl:gap-3 shrink-0">
                {(!isHomePage || (isHomePage && isScrolled)) && (
                  <Button
                    className={cn(
                      "rounded-full text-white hover:text-brand-blue",
                      {
                        "text-brand-blue": !isHeaderFixed,
                      }
                    )}
                    variant="ghost"
                    size="icon"
                    aria-label="Open search"
                    onClick={handleIsSearchActive}
                    onMouseOver={() => setActiveDropdown(null)}
                  >
                    <Search className="!size-5" />
                  </Button>
                )}
                <Button
                  className={cn("rounded-full text-white hover:bg-white hover:text-brand-blue", {
                    "text-brand-blue": !isHeaderFixed,
                  })}
                  variant="ghost"
                  size="icon"
                  aria-label="User profile or login"
                  onMouseOver={() => setActiveDropdown(null)}
                >
                  <Link
                    href="/login"
                    className="flex items-center justify-center"
                  >
                    <CircleUserRound className="!size-6" strokeWidth={1.5} />
                  </Link>
                </Button>

                <Button
                  onMouseOver={() => setActiveDropdown(null)}
                  className={cn(
                    "border-2 border-solid border-white bg-transparent text-white shadow-none hover:bg-white hover:text-brand-blue rounded px-2 lg:px-3 xl:px-4 2xl:px-5 h-8 lg:h-9 xl:h-10 text-[10px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px] whitespace-nowrap transition-all duration-300",
                    {
                      "border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white":
                        !isHeaderFixed,
                    }
                  )}
                  asChild
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </nav>

            {activeDropdown !== null && (
              <div
                ref={measureRef}
                key={activeDropdown.id}
                className={cn(
                  "relative w-full backdrop-blur-2xl transition-all duration-300",
                  "rounded-2xl",
                  isScrolled
                    ? "bg-black/80 border-white/10"
                    : "bg-white/25 border-white/30",
                  "border-t",
                  getAnimationDirection() === "left"
                    ? "slide-from-left"
                    : getAnimationDirection() === "right"
                      ? "slide-from-right"
                      : "opacity-0"
                )}
              >
                {activeDropdown.dropdownContent({
                  isHeaderFixed,
                  setActiveDropdown,
                })}
              </div>
            )}

            <div
              className={cn(
                "absolute top-0 left-1/2 -translate-x-1/2 h-full transition-all duration-300 ease-in-out flex items-center overflow-hidden",
                {
                  "w-0 opacity-0": !isSearchActive,
                  "w-full opacity-100": isSearchActive,
                }
              )}
            >
              <div
                className={cn(
                  "w-full h-16 bg-white transition-all duration-300 ease-in-out transform rounded-full flex items-center px-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100",
                  {
                    "opacity-0 scale-95": !isSearchActive,
                    "opacity-100 scale-100": isSearchActive,
                  }
                )}
              >
                <div>
                  <Search className="text-brand-blue size-5" />
                </div>
                <div className="h-full flex-1 px-3">
                  <Input
                    ref={inputRef}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-full border-0 text-lg font-medium text-slate-800 shadow-none placeholder:text-slate-400 focus-visible:ring-0 bg-transparent"
                    placeholder="Where would you like to explore?"
                  />
                </div>
                <div>
                  <Button
                    className="size-8 rounded-full bg-slate-100 p-0 text-slate-500 shadow-none hover:bg-brand-blue hover:text-white transition-colors"
                    onClick={handleIsSearchActive}
                    aria-label="Close search"
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </header>
      {/* Search panel content start */}
      <div
        className={cn(
          "bg-white fixed top-[20px] left-1/2 -translate-x-1/2 z-[99] rounded-[32px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top shadow-[0_20px_70px_-15px_rgba(0,0,0,0.15)] border border-slate-100",
          {
            "h-0 opacity-0 pointer-events-none translate-y-[-20px]": !isSearchActive,
            "h-[60vh] opacity-100 pointer-events-auto translate-y-0": isSearchActive,
          }
        )}
        style={{
          maxWidth: "800px",
          width: "95%",
        }}
      >
        <div className="mt-24 h-[calc(100%-100px)] overflow-y-auto px-10 pb-10 scrollbar-hide">
          {isLoading && searchTerm.length > 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 opacity-50">
              <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-slate-500">Curating your adventure...</p>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Regions Section */}
              {searchResults.regions?.length > 0 && (
                <div>
                  <p className="mb-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Regions</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {searchResults.regions.map((region) => (
                      <Link
                        key={region.id}
                        href={`/packages/${region.slug}`}
                        className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-brand-blue hover:text-white transition-all duration-300"
                        onClick={() => {
                          handleIsSearchActive();
                          setSearchTerm("");
                        }}
                      >
                        <span className="font-semibold text-slate-700 group-hover:text-white transition-colors">{region.name}</span>
                        <MoveRight className="size-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Packages Section */}
              {searchResults.packages?.length > 0 ? (
                <div>
                  <p className="mb-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Available Packages</p>
                  <div className="space-y-3">
                    {searchResults.packages.map((pkg) => (
                      <Link
                        key={pkg.id}
                        href={`/packages/${pkg.region}/${pkg.packageSlug}`}
                        className="group flex items-center justify-between p-5 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 border border-transparent hover:border-slate-100"
                        onClick={() => {
                          handleIsSearchActive();
                          setSearchTerm("");
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-200 overflow-hidden flex-shrink-0">
                            {/* Potential image placeholder or icon */}
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                               <Image 
                                  src={pkg.images?.[0] || "/img/placeholder.png"} 
                                  alt={pkg.packageName}
                                  width={48}
                                  height={48}
                                  className="object-cover w-full h-full"
                               />
                            </div>
                          </div>
                          <div>
                            <span className="block font-bold text-slate-800 text-lg group-hover:text-brand-blue transition-colors">{pkg.packageName}</span>
                            <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">{pkg.region}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-brand-blue font-bold">Explore</span>
                          <MoveRight className="size-4 text-brand-blue transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : searchTerm.length > 0 || (isLoading && debouncedSearch.length > 0) ? (
                <div className="flex flex-col items-center justify-center py-10 opacity-60">
                  <Search className="size-10 text-slate-300 mb-4" />
                  <p className="text-lg font-medium text-slate-500">No destinations matched your search</p>
                  <p className="text-sm text-slate-400">Try searching for a different country or theme</p>
                </div>
              ) : (
                <div>
                  <p className="mb-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Trending Explorations</p>
                  <div className="flex flex-wrap gap-3">
                    {TRENDING_PACKAGES.map((pkg) => (
                      <Link
                        key={pkg}
                        href={`/packages/${pkg}`}
                        className="px-6 py-3 rounded-full bg-slate-50 text-slate-700 font-semibold hover:bg-brand-blue hover:text-white transition-all duration-300 border border-slate-100 hover:border-brand-blue hover:shadow-lg hover:shadow-brand-blue/20"
                        onClick={() => {
                          handleIsSearchActive();
                          setSearchTerm("");
                        }}
                      >
                        <span className="capitalize">{pkg}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Search panel content end */}
    </>
  );
};

export default DesktopNavbar;
