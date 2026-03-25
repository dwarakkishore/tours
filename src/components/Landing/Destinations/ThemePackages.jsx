"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Compass, ArrowRight, MapPin, Users, Heart, Star } from "lucide-react";

const THEME_PACKAGES = [
  {
    title: "Romantic Getaways",
    tagline: "All things love",
    slug: "romantic-getaways",
    image: "/img/category-img/romantic-getaways.png",
    icon: Heart,
    color: "from-rose-500 to-pink-500",
    description: "Intimate escapes designed for two",
  },
  {
    title: "Group Departure",
    tagline: "All things fun",
    slug: "group-adventures?group=true",
    image: "/img/category-img/group-adventures.png",
    icon: Users,
    color: "from-orange-500 to-amber-500",
    description: "Shared adventures with fellow travelers",
  },
  {
    title: "Family Funventure",
    tagline: "All things togetherness",
    slug: "family-funventure",
    image: "/img/category-img/family-funventure.png",
    icon: Users,
    color: "from-emerald-500 to-teal-500",
    description: "Creating memories across generations",
  },
  {
    title: "Educational",
    tagline: "All things new",
    slug: "educational",
    image: "/img/category-img/educational.png",
    icon: Star,
    color: "from-blue-500 to-cyan-500",
    description: "Learn while you explore the world",
  },
  {
    title: "Religious Retreat",
    tagline: "All things spiritual",
    slug: "religious-retreat",
    image: "/img/category-img/religious-retreat.png",
    icon: Compass,
    color: "from-violet-500 to-purple-500",
    description: "Find peace on sacred journeys",
  },
  {
    title: "Solo Expedition",
    tagline: "All things you",
    slug: "solo-expedition",
    image: "/img/category-img/solo-expedition.png",
    icon: Compass,
    color: "from-sky-500 to-blue-500",
    description: "Discover yourself through travel",
  },
  {
    title: "Exploration Bundle",
    tagline: "All things adventure",
    slug: "exploration-bundle",
    image: "/img/category-img/exploration-bundle.png",
    icon: MapPin,
    color: "from-red-500 to-orange-500",
    description: "For the thrill-seeking wanderer",
  },
  {
    title: "Relax and Rejuvenate",
    tagline: "All things leisure",
    slug: "relax-rejuvenate",
    image: "/img/category-img/relax-and-rejuvanate.png",
    icon: Heart,
    color: "from-teal-500 to-emerald-500",
    description: "Unwind in paradise destinations",
  },
  {
    title: "Elite Escape",
    tagline: "All things luxury",
    slug: "elite-escape",
    image: "/img/category-img/elite-escape.png",
    icon: Star,
    color: "from-amber-500 to-yellow-500",
    description: "Experience travel at its finest",
  },
];

export default function ThemePackages() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const scrollToCard = (index) => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const card = track.children[index];
    if (!card) return;

    const isMobileView = window.innerWidth <= 767;
    if (isMobileView) {
      const scrollTop =
        card.offsetTop - (track.offsetHeight - card.offsetHeight) / 2;
      track.scrollTo({ top: scrollTop, behavior: "smooth" });
    } else {
      const scrollLeft =
        card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
      track.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  };

  const goTo = (index) => {
    setActiveIndex(index);
    scrollToCard(index);
    // Pause auto-slide for a moment after user interaction
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000); // Resume after 8 seconds
  };

  const checkActiveIndex = () => {
    if (!trackRef.current) return;
    const track = trackRef.current;

    const isMobile = window.innerWidth <= 767;
    const center = isMobile
      ? track.scrollTop + track.offsetHeight / 2
      : track.scrollLeft + track.offsetWidth / 2;

    const newIndex = Array.from(track.children).findIndex((child) => {
      const element = child;
      if (isMobile) {
        const childTop = element.offsetTop;
        const childBottom = childTop + element.offsetHeight;
        return center >= childTop && center <= childBottom;
      } else {
        const childLeft = element.offsetLeft;
        const childRight = childLeft + element.offsetWidth;
        return center >= childLeft && center <= childRight;
      }
    });

    if (newIndex !== -1 && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const handleScroll = () => {
    if (window.innerWidth <= 767) {
      checkActiveIndex();
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        checkActiveIndex();
      }, 150);
    }
  };

  useEffect(() => {
    if (isMounted) {
      const handleResize = () => scrollToCard(activeIndex);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [activeIndex, isMounted]);

  // Auto-slide effect
  useEffect(() => {
    let interval;
    if (isMounted && !isPaused && !hoveredIndex) {
      interval = setInterval(() => {
        const nextIndex = (activeIndex + 1) % THEME_PACKAGES.length;
        goTo(nextIndex);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [activeIndex, isMounted, isPaused, hoveredIndex]);

  if (!isMounted)
    return (
      <div className="w-full h-[80vh] md:h-[90vh] bg-gradient-to-br from-slate-50 to-slate-100" />
    );

  const activeCard = THEME_PACKAGES[activeIndex];

  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden bg-gradient-to-br from-[#0ea5e9] via-[#0146b3] to-[#1e1b4b]">
      {/* Dynamic Class Safelist - Forces Tailwind to generate these classes */}
      <div className="hidden">
        <div className="from-rose-500 to-pink-500 from-orange-500 to-amber-500 from-emerald-500 to-teal-500 from-blue-500 to-cyan-500 from-violet-500 to-purple-500 from-sky-500 to-blue-500 from-red-500 to-orange-500 from-teal-500 to-emerald-500 from-amber-500 to-yellow-500"></div>
      </div>

      {/* Decorative Background Elements - Removed for better gradient visibility */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Subtle overlay to enhance gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/5 to-purple-900/20" />
      </div>

      {/* Section Header */}
      <div className="relative z-20 pt-8 pb-4 md:pt-12 md:pb-6 px-6 md:px-20">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Compass className="w-6 h-6 md:w-8 md:h-8 text-white" />
          <h2 className="text-3xl md:text-5xl font-bold text-white pb-1">
            Explore by Theme
          </h2>
        </div>
        <p className="text-center text-slate-200 text-sm md:text-base max-w-2xl mx-auto">
          Discover your perfect journey with our curated travel experiences
        </p>
      </div>

      {/* Cards Carousel */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="absolute inset-x-0 top-32 bottom-24 md:top-40 md:bottom-32 flex flex-col overflow-y-auto px-4 py-8 gap-6 snap-y snap-mandatory scrollbar-hide md:flex-row md:overflow-x-auto md:overflow-y-hidden md:items-center md:px-20 md:py-0 md:gap-10 md:snap-x z-10"
      >
        {THEME_PACKAGES.map((card, i) => {
          const IconComponent = card.icon;
          const isActive = activeIndex === i;
          const isHovered = hoveredIndex === i;

          return (
            <div
              key={i}
              onClick={() => goTo(i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative flex-shrink-0 rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-out snap-center bg-slate-200 border border-white/50
                ${isActive ? "scale-100 shadow-2xl" : "scale-90 shadow-lg"}
                h-[50vh] w-full
                md:h-[65vh]
                ${
                  isActive
                    ? "md:w-[650px] md:scale-105 md:z-20"
                    : "md:w-36 md:scale-95"
                }
              `}
            >
              {/* Image with Fallback Background */}
              <div
                className={`absolute inset-0 w-full h-full bg-gradient-to-br ${
                  card.color
                } transition-all duration-700 ${
                  isActive || isHovered
                    ? "scale-110 brightness-90"
                    : "brightness-100"
                }`}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    // Ensure the parent div keeps its background color
                    e.currentTarget.parentElement.classList.add("bg-opacity-100");
                  }}
                />
              </div>

              {/* Gradient overlay - only for active slide */}
              {isActive && (
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"
                />
              )}

              {/* Decorative Corner Badge */}
              {isActive && (
                <div
                  className={`absolute top-4 right-4 px-3 py-1.5 rounded-full bg-gradient-to-r ${card.color} shadow-lg backdrop-blur-sm flex items-center gap-1.5 animate-in fade-in slide-in-from-top-2 duration-500 z-30`}
                >
                  <IconComponent className="w-3.5 h-3.5 text-white" />
                  <span className="text-white text-xs font-semibold">
                    Featured
                  </span>
                </div>
              )}

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 pb-28 md:pb-24 z-20">
                {/* Vertical Text for Inactive Desktop Cards */}
                {!isActive && (
                  <div className="hidden md:flex absolute inset-0 items-center justify-center">
                    <h3 className="text-white font-bold text-2xl tracking-tight [writing-mode:vertical-rl] rotate-180 drop-shadow-md">
                      {card.title}
                    </h3>
                  </div>
                )}

                {/* Mobile Inactive Text */}
                {!isActive && (
                  <div className="md:hidden flex flex-col items-center justify-center absolute inset-0">
                    <IconComponent className="w-8 h-8 text-white/80 mb-2" />
                    <h3 className="text-white font-bold text-2xl tracking-tight text-center drop-shadow-md">
                      {card.title}
                    </h3>
                  </div>
                )}

                {/* Active Card Content */}
                {isActive && (
                  <>
                    {/* Mobile Floating Top Badge (Icon) */}
                    <div className="md:hidden absolute top-4 left-4 z-30 animate-in fade-in zoom-in duration-500">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div className="space-y-2 md:space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
                      {/* Desktop Icon (In Flow) */}
                      <div
                        className={`hidden md:flex w-6 h-6 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br ${card.color} items-center justify-center shadow-lg`}
                      >
                        <IconComponent className="w-3.5 h-3.5 md:w-6 md:h-6 text-white" />
                      </div>

                      {/* Tagline */}
                      <div className="inline-block">
                      <span className="text-xs md:text-sm font-semibold text-cyan-300 uppercase tracking-wider drop-shadow-sm">
                        {card.tagline}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-lg">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/90 text-xs md:text-sm font-medium max-w-md leading-relaxed drop-shadow-md">
                      {card.description}
                    </p>

                    {/* CTA Button */}
                    <div className="pt-2"> 
                      <Link
                        href={`/themes/${card.slug.split("?")[0]}`}
                        className={`inline-flex items-center gap-2 px-5 py-2 md:px-8 md:py-3 rounded-full bg-gradient-to-r ${card.color} text-white font-bold text-sm md:text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group`}
                      >
                        Explore Packages
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                  </>
                )}
              </div>

              {/* Shimmer Effect on Hover */}
              {isHovered && isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>

      {/* Active Card Info Bar - Desktop Only */}
      {/* <div className="hidden md:block absolute bottom-32 left-20 right-20 z-20 pointer-events-none">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 pointer-events-auto border border-white/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeCard.color} flex items-center justify-center`}
                  >
                    <activeCard.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">
                      {activeCard.title}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {activeCard.tagline}
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href={`/categories/${activeCard.slug}`}
                className={`px-8 py-3 rounded-full bg-gradient-to-r ${activeCard.color} text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group`}
              >
                View All Packages
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-6 z-30 pointer-events-none md:bottom-8">
        {/* Dots */}
        <div className="flex gap-2.5 pointer-events-auto bg-white/90 backdrop-blur-xl px-6 py-3 rounded-full shadow-xl border border-white/20">
          {THEME_PACKAGES.map((pkg, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`relative transition-all duration-500 rounded-full ${
                activeIndex === i
                  ? "w-10 h-2.5"
                  : "w-2.5 h-2.5 hover:scale-125"
              }`}
              aria-label={`Go to ${pkg.title}`}
            >
              <div
                className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  activeIndex === i
                    ? `bg-gradient-to-r ${pkg.color} shadow-lg`
                    : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Counter */}
        <div className="text-sm font-semibold text-slate-700 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md">
          {activeIndex + 1} / {THEME_PACKAGES.length}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
