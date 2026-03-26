"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, MapPin, Star, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDestinationImage } from "@/hooks/useDestinationImage";

function SpotlightImage({ src, name, className }) {
  const { image: fetchedImage } = useDestinationImage(name);
  const displayImage = fetchedImage?.url || src;

  return (
    <img
      src={displayImage}
      alt={name}
      className={className}
      suppressHydrationWarning
    />
  );
}

// Import banner data...
const LUXURY_DATA = [
  { name: "Paris", tagline: "Iconic boulevards, river cruises, and candle‑lit evenings.", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200" },
  { name: "Greece", tagline: "White‑washed islands, blue domes, and Aegean sunsets.", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200" },
  { name: "Bali", tagline: "Private pool villas, rice terraces, and beachside clubs.", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200" },
  { name: "Maldives", tagline: "Overwater villas and barefoot‑luxury island retreats.", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200" },
  { name: "Dubai", tagline: "Skyscrapers, desert safaris, and immersive entertainment.", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200" },
  { name: "Swiss Alps", tagline: "Scenic trains, snow peaks, and storybook villages.", image: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=1200" },
  { name: "Italy", tagline: "Rome, Venice, Tuscany—art, food, and coastal drives.", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200" },
  { name: "Kenya", tagline: "Big Five safaris and golden savannah sunsets.", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200" },
  { name: "Thailand", tagline: "Beaches, islands, and vibrant night markets.", image: "https://images.unsplash.com/photo-1528181304800-2f140819898c?w=1200" },
  { name: "Vietnam", tagline: "Coastal cities, lantern streets, and Ha Long Bay.", image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=1200" },
  { name: "Turkey", tagline: "Bazaars, Bosphorus cruises, and Cappadocia balloons.", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200" },
  { name: "Finland", tagline: "Northern Lights, glass igloos, and Arctic adventures.", image: "https://images.unsplash.com/photo-1531366930477-4fbd0ce512c7?w=1200" },
  { name: "Mauritius", tagline: "Turquoise lagoons, luxury resorts, and golf by the sea.", image: "https://images.unsplash.com/photo-1550951298-5c7b95a66bfc?w=1200" },
  { name: "Sri Lanka", tagline: "Tea hills, heritage forts, and palm‑lined beaches.", image: "https://images.unsplash.com/photo-1529921131273-0498b3687399?w=1200" },
  { name: "Kashmir", tagline: "Houseboats, snow valleys, and shikara rides.", image: "https://images.unsplash.com/photo-1595815771614-ade9d652a45d?w=1200" },
  { name: "Rajasthan", tagline: "Forts, palaces, and desert luxury camps.", image: "https://images.unsplash.com/photo-1599661046289-e31887846e11?w=1200" },
  { name: "Kerala", tagline: "Backwaters, hill stations, and coastal spice trails.", image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200" },
  { name: "Karnataka", tagline: "Heritage, hills, beaches, and coffee estates.", image: "https://images.unsplash.com/photo-1582531093112-9856a908f9f6?w=1200" },
  { name: "North East India", tagline: "Misty hills, living root bridges, and river valleys.", image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1200" },
  { name: "Indian Wildlife", tagline: "Safaris in India’s best tiger and wildlife reserves.", image: "https://images.unsplash.com/photo-1610482299914-874ca9f0464f?w=1200" }
];

export default function DestinationSpotlight({ initialRegions = [], eliteEscapePackages = [] }) {
  const [activeBanner, setActiveBanner] = useState(0);
  const carouselRef = useRef(null);
  const router = useRouter();

  // Combine dynamic region data with static luxury data
  const displays = useMemo(() => {
    // Fallback images for common destinations
    const fallbackImages = {
      "azerbaijan": "https://images.unsplash.com/photo-1565022536102-b5c35c4b8e3f?w=1200",
      "egypt": "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=1200",
      "bali": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200",
      "bhutan": "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=1200",
      "cambodia": "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=1200",
      "maldives": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200",
      "kolkata": "https://images.unsplash.com/photo-1558431382-27e303142255?w=1200",
      "multi-countries": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200",
      "south-africa": "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=1200",
      "dubai": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200",
      "turkey": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200",
      "georgia": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200",
    };

    // If we have initialRegions, use them to show same destinations as Trending Destinations
    if (initialRegions && initialRegions.length > 0) {
      // Flatten all regions from all continents (for international) and domestic regions
      const allRegions = [];
      
      initialRegions.forEach(item => {
        if (item.regions && Array.isArray(item.regions)) {
          // This is a continent with nested regions (international)
          allRegions.push(...item.regions);
        } else if (item.slug && item.name) {
          // This is a direct region (domestic)
          allRegions.push(item);
        }
      });

      return allRegions.map(region => {
        const slug = region.slug?.toLowerCase() || '';
        const fallbackImage = fallbackImages[slug] || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200";
        
        return {
          id: region.id,
          name: region.name,
          image: region.featuredImage?.url || region.image || fallbackImage,
          slug: region.slug,
          isPackage: false,
          days: region.defaultDays || 5,
          price: region.startingPrice ? `₹${region.startingPrice}` : null,
        };
      });
    }

    // Fallback to static data if no regions
    return LUXURY_DATA.map(item => ({
      ...item,
      id: item.name,
      slug: item.name.toLowerCase().replace(/ /g, "-"),
      image: item.image,
      // Use deterministic values based on name length to avoid hydration mismatch
      days: 5 + (item.name.length % 4),
      price: `₹1,${(item.name.length % 9)}9,000`,
      isPackage: false
    }));
  }, [initialRegions]);

  const active = displays[activeBanner] || displays[0];

  const scrollToItem = (index) => {
    if (carouselRef.current && carouselRef.current.children[index]) {
      const container = carouselRef.current;
      const child = container.children[index];
      
      // Calculate center position
      const childLeft = child.offsetLeft;
      const childWidth = child.offsetWidth;
      const containerWidth = container.offsetWidth;
      
      const targetScroll = childLeft - (containerWidth / 2) + (childWidth / 2);
      
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
    }
  };

  // Track initial mount to prevent auto-scroll on page load
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    scrollToItem(activeBanner);
  }, [activeBanner]);


  return (
    <section className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[650px] overflow-hidden bg-gradient-to-br from-[#0146b3] to-[#020617] flex flex-col justify-between py-6 md:py-10 lg:py-16 px-2 sm:px-4 lg:px-8 rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[3rem]">
      {/* Cinematic background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(1,70,179,0.05)_0%,_transparent_50%)] pointer-events-none"></div>

      {/* Top Content Area - Two Column Layout */}
      <div className="relative w-full max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-16">
          
          {/* Left Side - Content */}
          <div className="lg:max-w-xxl text-center lg:text-left">
            <div className="inline-block mb-3 md:mb-4">
              <h2 className="text-brand-peach font-bold tracking-[0.05em] md:tracking-[0.08em] uppercase text-2xl md:text-4xl lg:text-5xl drop-shadow-[0_0_20px_rgba(242,194,136,0.5)]">
                Bayard Luxury Escapes
              </h2>
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-brand-peach/50 to-transparent mt-1 md:mt-2"></div>
            </div>
            <p className="text-sm md:text-lg lg:text-xl font-medium text-white/80 mb-2 md:mb-4 hidden md:block">
               Explore handpicked luxury destinations curated for the discerning traveler.
            </p>
         
          </div>

          {/* Right Side - Buttons */}
          <div className="flex flex-row lg:flex-col items-center lg:items-end gap-2 md:gap-4">
            <Link
              href="/themes/elite-escape"
              prefetch={false}
              className="group flex items-center gap-2 px-4 py-2 md:px-8 md:py-4 bg-brand-peach text-black text-sm md:text-base font-bold rounded-full shadow-xl hover:shadow-brand-peach/30 hover:scale-105 transition-all"
            >
              <span className="hidden sm:inline">Explore </span>
              <span className="sm:hidden">Explore</span>
              <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/explore"
              prefetch={false}
              className="px-4 py-2 md:px-8 md:py-4 bg-brand-peach text-black text-sm md:text-base font-bold rounded-full shadow-xl hover:shadow-brand-peach/30 hover:scale-105 transition-all flex items-center justify-center"
            >
              <span className="hidden sm:inline">Contact Our Expert</span>
              <span className="sm:hidden">View All</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Full-Width Large Carousel Navigation */}
      <div className="relative w-full max-w-[95%] mx-auto pb-8">
        <div className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={() => setActiveBanner((prev) => (prev - 1 + displays.length) % displays.length)}
            aria-label="Previous destination"
            className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-white text-slate-800 rounded-full shadow-xl hover:bg-brand-peach hover:text-black hover:scale-110 transition-all group"
          >
            <ChevronLeft className="w-5 h-5 md:w-7 md:h-7 group-active:scale-90 transition-transform" />
          </button>
        </div>
        
        <div className="absolute right-1 md:right-0 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={() => setActiveBanner((prev) => (prev + 1) % displays.length)}
            aria-label="Next destination"
            className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-white text-slate-800 rounded-full shadow-xl hover:bg-brand-peach hover:text-black hover:scale-110 transition-all group"
          >
            <ChevronRight className="w-5 h-5 md:w-7 md:h-7 group-active:scale-90 transition-transform" />
          </button>
        </div>

        <div
          ref={carouselRef}
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-4 md:py-8 px-10 md:px-16 lg:px-24"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {displays.map((display, index) => (
            <button
              key={display.id}
              onClick={() => {
                setActiveBanner(index);
                router.push(`/packages/${display.slug}`);
              }}
              className={`flex-shrink-0 relative w-40 h-48 sm:w-52 sm:h-60 md:w-64 md:h-72 lg:w-72 lg:h-[350px] rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[3rem] overflow-hidden transition-all duration-700 ${
                activeBanner === index
                  ? 'scale-105 shadow-[0_30px_60px_-12px_rgba(242,194,136,0.3)] z-10'
                  : 'shadow-xl hover:scale-[1.02]'
              }`}
              style={{ scrollSnapAlign: 'center' }}
            >
              <SpotlightImage
                src={display.image}
                name={display.name}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100" />
              <div className="absolute bottom-4 md:bottom-10 left-0 right-0 text-center">
                <p className="text-white text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold tracking-tighter uppercase">{display.name}</p>
              </div>
              
              {activeBanner === index && (
                <div className="absolute top-5 right-5 w-4 h-4 bg-brand-peach rounded-full ring-4 ring-white/20"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
