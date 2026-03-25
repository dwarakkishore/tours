"use client";

import { useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { 
  Compass,
  ChevronRight,
  ChevronLeft as ChevronLeftIcon,
  Loader2
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { cn } from "@/lib/utils";
import ActivityCard from "@/components/ui/ActivityCard";
import { useActivitiesData } from "@/hooks/activities/useActivitiesData";
import { formatCategoryName } from "@/utils/activityUtils";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const RegionActivities = ({ regionName = "this destination", regionData = null }) => {
  const router = useRouter();
  const { region: regionSlug } = useParams();
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch activities using the hook
  const { activities: allActivities, loading: activitiesLoading } = useActivitiesData(
    regionSlug,
    regionData?.id
  );
  
  // Get unique categories
  const categories = useMemo(() => {
    if (!allActivities.length) return [];
    return [...new Set(allActivities.map(a => a.category))];
  }, [allActivities]);
  
  // Filter activities based on selected category
  const displayActivities = useMemo(() => {
    if (selectedCategory === "all") return allActivities;
    return allActivities.filter(a => a.category === selectedCategory);
  }, [allActivities, selectedCategory]);

  // Don't render if no activities
  if (!activitiesLoading && allActivities.length === 0) {
    return null;
  }

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section className="bg-white py-4 md:py-6">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-6">
            {/* Left: Title Section */}
            <div className="flex-1 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 mb-4">
                <Compass className="w-4 h-4 text-brand-blue" />
                <span className="text-sm font-bold text-brand-blue uppercase tracking-wider">
                  Things To Do
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                <span className="hidden sm:inline">Top Activities in </span>
                <span className="inline sm:hidden">Activities in </span>
                <span className="text-brand-blue capitalize">{regionName}</span>
              </h2>
              <p className="hidden sm:block text-xl text-slate-600 truncate md:whitespace-normal">
                Adventure awaits! Discover exciting activities and unforgettable experiences
              </p>
            </div>
            
            {/* Right: Explore Button */}
            <Link href={`/activities/${regionName?.toLowerCase()}`}>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-300 whitespace-nowrap">
                Explore More
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
          
          {/* Category Filter Pills - Horizontal Scroll on Mobile */}
          <div className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-2 pb-2 -mb-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-yellow-400 text-slate-900 shadow-sm"
                  : "bg-white text-blue-600 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              All Activities
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-yellow-400 text-slate-900 shadow-sm"
                    : "bg-white text-blue-600 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                {formatCategoryName(category)}
              </button>
            ))}
          </div>
        </div>

        {/* Activities Carousel */}
        <div className="relative group/nav mt-8">
          {/* Overlay Navigation Buttons */}
          <button className="activities-prev-btn absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white/90 md:bg-white/95 shadow-lg md:shadow-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 md:opacity-0 group-hover/nav:opacity-100">
            <ChevronLeftIcon className="w-5 md:w-6 h-5 md:h-6" />
          </button>
          <button className="activities-next-btn absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white/90 md:bg-white/95 shadow-lg md:shadow-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 md:opacity-0 group-hover/nav:opacity-100">
            <ChevronRight className="w-5 md:w-6 h-5 md:h-6" />
          </button>

          <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={12}
          slidesPerView={1.15}
          navigation={{
            prevEl: ".activities-prev-btn",
            nextEl: ".activities-next-btn",
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="pb-8"
        >
          {displayActivities.map((activity) => (
            <SwiperSlide key={activity.id}>
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
                hoverGradient="from-brand-blue/95 to-emerald-900"
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
}

export default RegionActivities;
