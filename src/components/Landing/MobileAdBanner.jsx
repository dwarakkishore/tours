"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Map, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, normalizeImageUrl } from "@/lib/utils";

const FALLBACK_DESTINATIONS = [
  {
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200",
    name: "Maldives",
    offer: "",
    bg: "from-brand-blue via-[#003488] to-brand-blue"
  }
];

const FALLBACK_FEATURES = [
  {
    icon: <MessageCircle className="w-5 h-5" />,
    title: "AI Bot Support",
    desc: "24/7 instant assistance for all your travel queries",
    color: "bg-blue-400/20 text-blue-400"
  },
  {
    icon: <Map className="w-5 h-5" />,
    title: "Customized Itineraries",
    desc: "Tailored travel experiences curated just for you",
    color: "bg-emerald-400/20 text-emerald-400"
  }
];

const MobileAdBanner = ({ bannerData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  // Map dynamic data or use fallback
  const destinations = bannerData?.mediaCarousel?.items?.length > 0 
    ? bannerData.mediaCarousel.items.map(item => ({
        image: item.src || item.imageUrl || item.image,
        name: item.featuredText || item.title || "Exclusive Destination",
        offer: item.offer || item.discount || "",
        bg: item.bgColor || "from-[#0d3b7a] via-[#1a5fb4] to-[#0d3b7a]"
      }))
    : FALLBACK_DESTINATIONS;

  const features = bannerData?.promotionSection?.cards?.map((card, idx) => ({
    icon: idx === 0 ? <MessageCircle className="w-5 h-5" /> : <Map className="w-5 h-5" />,
    title: card.title || "Premium Service",
    desc: card.description || card.subtitle || "Tailored travel experiences",
    image: card.image || card.imageUrl,
    color: idx === 0 ? "bg-blue-400/20 text-blue-400" : "bg-emerald-400/20 text-emerald-400"
  })) || FALLBACK_FEATURES;

  const content = bannerData?.contentSection || {
    title: "Dream Vacations Await",
    subtitle: "Exclusive deals on handpicked destinations curated just for you"
  };

  useEffect(() => {
    if (destinations.length <= 1) return;
    const interval = bannerData?.mediaCarousel?.config?.interval || 4000;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % destinations.length);
    }, interval);
    return () => clearInterval(timer);
  }, [destinations.length, bannerData]);

  useEffect(() => {
    if (features.length <= 1) return;
    const interval = setInterval(() => {
      setActiveFeatureIndex((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);

  const activeDestination = destinations?.[activeIndex] || destinations?.[0] || FALLBACK_DESTINATIONS[0];
  const activeFeature = features?.[activeFeatureIndex] || features?.[0] || FALLBACK_FEATURES[0];

  return (
    <div className="relative w-full max-w-md mx-auto min-h-[85vh] pb-24 overflow-hidden md:hidden transition-colors duration-1000">
      
      {/* Dynamic Background */}
      <div className={cn("absolute inset-0 bg-gradient-to-b transition-colors duration-1000", activeDestination?.bg)} />

      {/* Decorative Elements */}
      <div className="absolute w-[200px] h-[200px] border border-white/10 rounded-full -top-[100px] -right-[100px] pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] border border-white/5 rounded-full bottom-[200px] -left-[150px] pointer-events-none" />

      {/* Logo Section */}
      <div className="relative z-10 p-5 flex items-center gap-2.5">
        <Image
          src="/Bayard_white_logo.svg"
          alt="Bayard Vacations"
          width={120}
          height={40}
          className="w-auto h-8"
        />
      </div>

      {/* Hero Image Section */}
      <div className="relative z-10 w-[90%] mx-auto rounded-[20px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.3)] bg-slate-900">
        <div className="relative h-[250px] w-full">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={normalizeImageUrl(activeDestination.image)}
                        alt={activeDestination.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
            </AnimatePresence>
            
            {/* Offer Badge - Floating */}
            {activeDestination.offer && (
              <motion.div 
                  key={`offer-${activeIndex}`}
                  initial={{ scale: 0, rotate: 10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="absolute top-4 right-4 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1"
              >
                  <Sparkles className="w-3 h-3" />
                  {activeDestination.offer}
              </motion.div>
            )}
        </div>

        <div className="absolute bottom-5 left-5 bg-white/20 backdrop-blur-md px-5 py-3 rounded-xl border border-white/30 truncate max-w-[80%]">
          <small className="block text-white/90 text-[10px] uppercase tracking-widest mb-0.5">
            Now Featuring
          </small>
          <AnimatePresence mode="wait">
             <motion.h3 
                key={activeDestination.name}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="text-white text-2xl font-bold shadow-black/10 drop-shadow-md"
             >
                {activeDestination.name}
             </motion.h3>
          </AnimatePresence>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 px-6 py-6 text-center">
        <h2 className="text-white text-3xl font-[800] leading-tight mb-2 drop-shadow-lg">
          {content.title.split(' ').map((word, i) => (
            <React.Fragment key={i}>
              {word === 'Vacations' ? <span className="text-[#fcd34d]">{word}</span> : word}
              {' '}
            </React.Fragment>
          ))}
        </h2>
        <p className="text-white/85 text-[14px] leading-relaxed mb-6 px-2">
          {content.subtitle}
        </p>

        <Link href="/explore" className="bg-white text-[#1a5fb4] border-none px-10 py-3.5 rounded-full text-base font-bold cursor-pointer inline-flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-transform mb-6">
          Explore
          <div className="w-6 h-6 bg-[#1a5fb4] rounded-full flex items-center justify-center text-white text-xs">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-2">
            {destinations.map((_, idx) => (
                <div 
                    key={idx}
                    className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        idx === activeIndex ? "w-6 bg-white" : "w-2 bg-white/30"
                    )} 
                />
            ))}
        </div>
      </div>

      {/* Feature Card - Floating */}
      <AnimatePresence mode="wait">
        <motion.div 
            key={activeFeatureIndex}
            initial={{ y: 20, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: 20, opacity: 0, x: "-50%" }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-[20px] p-5 flex items-center gap-4 shadow-2xl border border-white/10 z-50"
        >
            <div className="w-[50px] h-[50px] rounded-full bg-slate-800 flex items-center justify-center shrink-0 relative overflow-hidden border border-white/10">
                {activeFeature.image ? (
                    <Image 
                        src={normalizeImageUrl(activeFeature.image)}
                        alt={activeFeature.title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <span className="text-2xl relative z-10">
                        {activeFeatureIndex === 0 ? "🤖" : "✨"}
                    </span>
                )}
                <div className={cn("absolute inset-0 rounded-full border-2 animate-pulse z-20", activeFeature.color.split(" ")[1] === "text-blue-400" ? "border-blue-400/50" : "border-emerald-400/50")} />
            </div>
            <div className="flex-1 text-left">
            <h4 className="text-white text-base font-bold mb-0.5">{activeFeature.title}</h4>
            <p className="text-white/70 text-xs leading-snug line-clamp-2">
                {activeFeature.desc}
            </p>
            </div>
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", activeFeature.color)}>
                {activeFeature.icon}
            </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MobileAdBanner;
