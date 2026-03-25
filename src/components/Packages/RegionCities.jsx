"use client";

import { useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import Container from "@/components/ui/Container";
import { 
  NavigationIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import ActivityCard from "@/components/ui/ActivityCard";
import { useActivitiesData } from "@/hooks/activities/useActivitiesData";
import { formatCategoryName } from "@/utils/activityUtils";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const RegionCities = ({ regionName = "this destination", regionData = null }) => {
  const router = useRouter();
  const { region: regionSlug } = useParams();
  const [selectedCity, setSelectedCity] = useState("all");

  // Fetch activities for this region
  const { activities: allActivities, loading: activitiesLoading } = useActivitiesData(
    regionSlug, 
    regionData?.id
  );

  // Group activities by city
  const citiesWithActivities = useMemo(() => {
    if (!allActivities.length) return [];

    // Group activities by city
    const cityMap = new Map();
    
    allActivities.forEach(activity => {
      if (activity.cityName && activity.citySlug) {
        if (!cityMap.has(activity.citySlug)) {
          cityMap.set(activity.citySlug, {
            id: activity.citySlug,
            slug: activity.citySlug,
            name: activity.cityName,
            activities: []
          });
        }
        cityMap.get(activity.citySlug).activities.push(activity);
      }
    });

    return Array.from(cityMap.values());
  }, [allActivities]);

  // Get city names for filter buttons
  const cityNames = useMemo(() => {
    // Use Set to ensure unique names for keys
    const names = ["all", ...citiesWithActivities.map(c => c.name)];
    return Array.from(new Set(names));
  }, [citiesWithActivities]);

  // Filter cities based on selection
  const displayCities = useMemo(() => {
    if (selectedCity === "all") return citiesWithActivities;
    return citiesWithActivities.filter(c => c.name === selectedCity);
  }, [citiesWithActivities, selectedCity]);

  // Get activities to display (one representative activity per city)
  const displayActivities = useMemo(() => {
    return displayCities.map(city => {
      // Get the first (or most popular) activity for this city
      const representativeActivity = city.activities.find(a => a.isPopular) || city.activities[0];
      
      return {
        ...representativeActivity,
        cityActivityCount: city.activities.length,
        cityName: city.name,
        citySlug: city.slug
      };
    });
  }, [displayCities]);

  // Don't render if no activities or still loading
  if (activitiesLoading || citiesWithActivities.length === 0) {
    return activitiesLoading ? (
      <section className="bg-slate-50 py-6 md:py-8">
        <Container>
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-lg text-slate-600 font-medium">Loading cities...</p>
            </div>
          </div>
        </Container>
      </section>
    ) : null;
  }

  return (
    <section className="bg-slate-50 py-6 md:py-8 relative overflow-hidden">
      {/* Decorative Textural Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <Container>
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 mb-4">
                <NavigationIcon className="w-4 h-4 text-brand-blue" />
                <span className="text-sm font-bold text-brand-blue uppercase tracking-wider">
                  Cities to Explore
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                <span className="hidden sm:inline">Iconic Cities in </span>
                <span className="inline sm:hidden">Cities in </span>
                <span className="text-brand-blue capitalize">{regionName}</span>
              </h2>
              <p className="hidden sm:block text-xl text-slate-600 truncate md:whitespace-normal">
                Adventure awaits! Discover exciting cities and unforgettable experiences
              </p>
            </div>
            
            {/* Explore More Button */}
            <Link href="/packages">
              <motion.button

                initial={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-300 whitespace-nowrap"
              >
                Explore More
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
          
          {/* City Filter Buttons - Horizontal Scroll on Mobile */}
          <div className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-2 pb-2 -mb-2">
            {cityNames.map((cityName) => (
              <button
                key={cityName}
                onClick={() => setSelectedCity(cityName)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCity === cityName
                    ? "bg-yellow-400 text-slate-900 shadow-sm"
                    : "bg-white text-blue-600 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                {cityName === "all" ? "All Cities" : cityName}
              </button>
            ))}
          </div>
        </div>

        {/* Cities Carousel */}
        <div className="relative group/nav mt-8">
          {/* Overlay Navigation Buttons */}
          <button className="cities-prev-btn absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white/90 md:bg-white/95 shadow-lg md:shadow-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 md:opacity-0 group-hover/nav:opacity-100">
            <ChevronLeftIcon className="w-5 md:w-6 h-5 md:h-6" />
          </button>
          <button className="cities-next-btn absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white/90 md:bg-white/95 shadow-lg md:shadow-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 md:opacity-0 group-hover/nav:opacity-100">
            <ChevronRight className="w-5 md:w-6 h-5 md:h-6" />
          </button>

          <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={12}
          slidesPerView={1.15}
          navigation={{
            prevEl: ".cities-prev-btn",
            nextEl: ".cities-next-btn",
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="pb-12"
        >
          {displayActivities.map((activity) => (
            <SwiperSlide key={activity.id}>
              <ActivityCard 
                data={{
                  name: activity.cityName,
                  badge: `${activity.cityActivityCount} ${activity.cityActivityCount === 1 ? 'Activity' : 'Activities'}`,
                  title: activity.title,
                  description: activity.description,
                  image: activity.image,
                  icon: activity.icon,
                  isPopular: activity.isPopular,
                  highlightsTitle: "Featured Activity:",
                  highlights: activity.highlights?.slice(0, 2) || [
                    "Explore this amazing destination",
                    "Unforgettable experiences await"
                  ],
                  cityName: activity.cityName,
                  regionName: activity.regionName
                }}
                hoverGradient="from-brand-blue/95 to-brand-blue"
                ctaLabel="Learn More"
                onCtaClick={() => router.push(`/activities/${regionSlug}/${activity.slug}`)}
                onCardClick={() => router.push(`/activities/${regionSlug}/${activity.slug}`)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default RegionCities;
