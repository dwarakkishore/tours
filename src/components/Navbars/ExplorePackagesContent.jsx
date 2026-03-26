"use client";
import { 
  Heart, 
  Users, 
  FerrisWheel, 
  Landmark, 
  Castle, 
  Footprints, 
  Compass, 
  Umbrella, 
  Award,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const themes = [
  {
    title: "Romantic Getaways",
    subtitle: "All things love",
    icon: Heart,
    slug: "romantic-getaways",
  },
  {
    title: "Group Departure",
    subtitle: "All things fun",
    icon: Users,
    slug: "group-departure",
  },
  {
    title: "Family Funventure",
    subtitle: "All things togetherness",
    icon: FerrisWheel,
    slug: "family-funventure",
  },
  {
    title: "Educational",
    subtitle: "All things new",
    icon: Landmark,
    slug: "educational",
  },
  {
    title: "Religious Retreat",
    subtitle: "All things spiritual",
    icon: Castle,
    slug: "religious-retreat",
  },
  {
    title: "Solo Expedition",
    subtitle: "All things you",
    icon: Footprints,
    slug: "solo-expedition",
  },
  {
    title: "Exploration Bundle",
    subtitle: "All things adventure",
    icon: Compass,
    slug: "exploration-bundle",
  },
  {
    title: "Relax and Rejuvenate",
    subtitle: "All things leisure",
    icon: Umbrella,
    slug: "relax-rejuvenate",
  },
  {
    title: "Elite Escape",
    subtitle: "All things luxury",
    icon: Award,
    slug: "elite-escape",
  },
];

const ExplorePackagesContent = ({ setActiveDropdown, handleMenuActive, isHeaderFixed }) => {
  const handleClose = () => {
    if (setActiveDropdown) setActiveDropdown(null);
    if (handleMenuActive) handleMenuActive();
  };

  return (
    <div className="mx-auto max-w-7xl p-8 lg:p-12 overflow-y-auto max-h-[80vh] lg:max-h-none">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {themes.map((theme) => {
          const Icon = theme.icon;
          return (
            <Link
              key={theme.slug}
              href={`/themes/${theme.slug}`}
              onClick={handleClose}
              className="group flex items-center gap-6 p-4 rounded-2xl transition-all duration-300 hover:bg-white/10"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Icon className="w-8 h-8 text-brand-blue" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <h4 className="text-xl font-bold text-white group-hover:text-brand-gold transition-colors">
                  {theme.title}
                </h4>
                <p className="text-white/60 text-sm font-medium">
                  {theme.subtitle}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ExplorePackagesContent;
