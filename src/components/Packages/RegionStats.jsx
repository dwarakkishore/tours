"use client";
import React from "react";
import { 
  Users, 
  MapPin, 
  History, 
  Mountain,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";

const RegionStats = ({ regionData }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Color palette for stats
  const colors = [
    "text-blue-400",
    "text-amber-400", 
    "text-emerald-400",
    "text-purple-400",
    "text-rose-400",
    "text-cyan-400",
    "text-orange-400"
  ];

  // Use stats from regionData or fallback to defaults
  const stats = regionData?.stats || [
    { label: "Spots", value: "15+", color: "text-blue-400" },
    { label: "History", value: "5k+", color: "text-amber-400" },
    { label: "Climates", value: "09", color: "text-emerald-400" },
    { label: "Rating", value: "4.9", color: "text-purple-400" },
    { label: "Travelers", value: "25K+", color: "text-rose-400" }
  ];

  if (!mounted) {
    return <div className="w-full h-8 sm:h-20" />; // Balanced placeholder to avoid layout shift
  }

  // Add colors to stats if not already present
  const statsWithColors = stats.map((stat, index) => ({
    ...stat,
    color: stat.color || colors[index % colors.length]
  }));

  return (
    <div className="w-full max-w-5xl mx-auto mt-4 md:mt-8 mb-2 px-2">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:gap-x-12 md:gap-y-6">
        {statsWithColors.map((stat, index) => (
          <div key={index} className="flex flex-col items-center group cursor-default">
            <div className={cn(
              "text-2xl md:text-4xl lg:text-5xl font-bold leading-none tracking-tight mb-1 md:mb-2 drop-shadow-lg",
              stat.color
            )}>
              {stat.value}
            </div>
            <div className="text-[9px] md:text-[11px] font-bold text-white/90 uppercase tracking-[0.2em] drop-shadow-md">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionStats;



