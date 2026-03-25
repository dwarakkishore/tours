import {
  // Existing icons
  CalendarClock,
  Wallet,
  ThermometerSun,
  Clock4,
  Globe,
  Zap,
  Sparkles,
  MapPin,
  ArrowRight,
  FileCheck,
  Building2,
  Users,
  Info,
  Plane,
  Flame,
  Landmark,
  ShieldCheck,
  Banknote,
  Mountain,
  // New icons
  Heart,
  Waves,
  Trees,
  ShoppingBag,
  Ship,
  Camera,
  Compass,
  Leaf,
  Music,
  Smile,
  MessageCircle,
  Wine,
  Crown,
  Gift,
  Snowflake,
  Droplets,
  Star,
  Eye,
  Beer,
  Church,
  Palette,
  Flower2,
  Bike,
  Wind,
  Paintbrush,
  Coffee,
  Utensils,
  Sun,
  Triangle,
  Droplet,
  Anchor,
  TreePine,
  Home,
  Building,
  Palmtree as PalmTree,
  IceCreamCone,
} from "lucide-react";

/**
 * Comprehensive icon mapping for dynamic content
 * Maps icon names (case-insensitive) to Lucide React components
 */
export const iconMap = {
  // Original icons
  CalendarClock,
  Calendar: CalendarClock,
  ThermometerSun,
  Thermometer: ThermometerSun,
  Clock: Clock4,
  Clock4,
  FileCheck,
  Wallet,
  Globe,
  Building2,
  Building: Building2,
  Users,
  Info,
  Plane,
  ShieldCheck,
  Shield: ShieldCheck,
  Banknote,
  Money: Banknote,
  
  // Nature & Landmarks
  Flame,
  Fire: Flame,
  Landmark,
  Mountain,
  Peak: Mountain,
  Theater: Building2, // Using Building2 as alternative
  Theatre: Building2,
  Sparkles,
  Sparkle: Sparkles,
  MapPin,
  Map: MapPin,
  Heart,
  Zap,
  Lightning: Zap,
  
  // Water & Beach
  Waves,
  Beach: Waves,
  Ship,
  Ferry: Ship,
  Droplets,
  Droplet,
  Water: Droplets,
  Lake: Waves,
  River: Waves,
  
  // Nature
  Trees,
  Tree: Trees,
  TreePine,
  Leaf,
  PalmTree,
  Palmtree: PalmTree,
  Palm: PalmTree,
  Flower2,
  Flowers: Flower2,
  Sun,
  Snowflake,
  Snowflakes: Snowflake,
  
  // Activities & Travel
  Camera,
  Compass,
  Binoculars: Camera, // Using Camera as alternative
  Bike,
  Bicycle: Bike,
  
  // Culture & Entertainment
  Music,
  Wine,
  Beer,
  Whisky: Beer,
  Coffee,
  Utensils,
  Food: Utensils,
  IceCreamCone,
  IceCream: IceCreamCone,
  Iceland: IceCreamCone,
  
  // Shopping & Gifts
  ShoppingBag,
  Shopping: ShoppingBag,
  Gift,
  GiftIcon: Gift,
  
  // Architecture
  Church,
  Castle: Home, // Using Home as alternative
  Bridge: Building, // Using Building as alternative
  Crown,
  Crone: Crown,
  Home,
  
  // Art & Design
  Palette,
  Palate: Palette,
  Paintbrush,
  Paint: Paintbrush,
  
  // Misc
  Smile,
  MessageCircle,
  Blogs: MessageCircle,
  Star,
  Stars: Star,
  Eye,
  Triangle,
  Trib: Triangle,
  Wind,
  Windmil: Wind,
  Width: Wind,
  Anchor,
  Rock: Mountain,
  Bear: Users, // placeholder, lucide doesn't have bear
};

/**
 * Get icon component by name (case-insensitive)
 * @param {string} iconName - Name of the icon
 * @returns {React.Component} - Lucide icon component
 */
export const getIcon = (iconName) => {
  if (!iconName) return Info;
  
  // Try exact match first
  if (iconMap[iconName]) return iconMap[iconName];
  
  // Try case-insensitive match
  const normalizedName = iconName.charAt(0).toUpperCase() + iconName.slice(1).toLowerCase();
  if (iconMap[normalizedName]) return iconMap[normalizedName];
  
  // Try all lowercase
  const lowerName = iconName.toLowerCase();
  const matchedKey = Object.keys(iconMap).find(
    key => key.toLowerCase() === lowerName
  );
  
  if (matchedKey) return iconMap[matchedKey];
  
  // Default fallback
  return Info;
};

/**
 * Get color class by color name
 * @param {string} color - Color name
 * @returns {string} - Tailwind color class
 */
export const getColorClass = (color) => {
  if (!color) return "text-blue-600";
  
  const colorMap = {
    blue: "text-blue-600",
    amber: "text-amber-600",
    emerald: "text-emerald-600",
    orange: "text-orange-600",
    indigo: "text-indigo-600",
    teal: "text-teal-600",
    violet: "text-violet-600",
    pink: "text-pink-600",
    rose: "text-rose-600",
    slate: "text-slate-600",
    purple: "text-purple-600",
    green: "text-green-600",
    red: "text-red-600",
    yellow: "text-yellow-600",
    cyan: "text-cyan-600",
  };
  
  const lowerColor = color.toLowerCase();
  return colorMap[lowerColor] || "text-blue-600";
};

export default { iconMap, getIcon, getColorClass };
