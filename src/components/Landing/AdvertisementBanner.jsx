"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { normalizeImageUrl } from "@/lib/utils";

// Fallback data in case Firebase fetch fails
const FALLBACK_DESTINATIONS = [
  {
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200",
    name: "Maldives",
    offer: "",
    link: "/explore"
  }
];

const FALLBACK_FEATURES = [
  {
    image: "/img/ai-bot-banner.png",
    title: "AI Bot Support",
  },
  {
    image: "/img/itinerary-banner.png",
    title: "Customized Itineraries",
  }
];

export default function AdvertisementBanner({ bannerData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  // Get media carousel items or fallback to static data
  const mediaItems = bannerData?.mediaCarousel?.items || FALLBACK_DESTINATIONS.map(dest => ({
    src: dest.image,
    featuredText: `Now Featuring ${dest.name}`,
    link: dest.link,
    type: "image"
  }));

  // Get promotion cards or fallback
  const promoCards = bannerData?.promotionSection?.cards || FALLBACK_FEATURES;

  // Get content section or fallback
  const contentSection = bannerData?.contentSection || {
    title: "Dream Vacations Await",
    subtitle: "Exclusive deals on handpicked destinations",
    cta: { text: "Explore", link: "/explore", showIcon: true }
  };

  // Get floating deal or fallback
  const floatingDeal = bannerData?.mediaCarousel?.floatingDeal;

  // Auto-rotation for media carousel
  useEffect(() => {
    if (mediaItems.length === 0) return;
    
    const interval = bannerData?.mediaCarousel?.config?.interval || 4000;
    const autoplay = bannerData?.mediaCarousel?.config?.autoplay !== false;
    
    if (autoplay) {
      const timer = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % mediaItems.length);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [mediaItems.length, bannerData]);

  // Auto-rotation for promotion cards
  useEffect(() => {
    if (promoCards.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveFeatureIndex((prev) => (prev + 1) % promoCards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [promoCards.length]);

  const activeMedia = mediaItems[activeIndex] || mediaItems[0];

  return (
    <section className="relative h-auto lg:h-[50vh] overflow-hidden bg-slate-950 sm:rounded-[80px_12px_80px_12px] rounded-none">
      <div className="flex flex-col lg:flex-row h-full">
        
        {/* LEFT SIDE - Brand Content */}
        <div className="w-full lg:w-[20%] relative bg-gradient-to-br from-brand-blue via-[#003488] to-brand-blue flex items-center justify-center overflow-hidden py-12 lg:py-0 shrink-0">
          
          {/* Animated Pattern Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>

          {/* Floating Geometric Shapes */}
          <motion.div
            className="absolute top-10 left-10 w-20 h-20 border-4 border-white/20 rounded-lg"
            animate={{ 
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Content */}
          <div className="relative z-10 px-4 sm:px-6 text-center">
            
            {/* Logo */}
            <motion.div
              className="inline-flex items-center justify-center mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Image
                src="/Bayard_white_logo.svg"
                alt="Bayard Vacations"
                width={100}
                height={35}
                className="w-20 sm:w-24 h-auto"
              />
            </motion.div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
              {contentSection.title}
            </h2>

            {/* Subtext */}
            <p className="text-white/70 text-xs sm:text-sm mb-4 max-w-[180px] mx-auto">
              {contentSection.subtitle}
            </p>

            {/* CTA Button */}
            <Link
              href={contentSection.cta.link}
              prefetch={false}
              className="group inline-flex items-center gap-2 bg-white text-brand-blue px-5 py-2.5 rounded-full text-sm font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              {contentSection.cta.text}
              {contentSection.cta.showIcon && (
                <div className="w-5 h-5 rounded-full bg-brand-blue flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
              )}
            </Link>
          </div>
        </div>

        {/* MIDDLE SIDE - Image Slider */}
        <div className="w-full lg:w-[60%] relative h-[300px] lg:h-auto shrink-0">
          
          {/* Image Slideshow */}
          {mediaItems.map((media, index) => {
            const mediaLink = media.link || media.slug || '#';
            const isActive = index === activeIndex;
            
            return (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ 
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 1.1
                }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <Link 
                  href={mediaLink}
                  prefetch={false}
                  className="block w-full h-full cursor-pointer group"
                >
                  <img
                    src={normalizeImageUrl(media.src)}
                    alt={media.title || media.featuredText || 'Banner Image'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </Link>
              </motion.div>
            );
          })}

          {/* Small Logo - Top Left */}
          <div className="absolute top-8 left-8 sm:top-12 sm:left-12 z-20">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-3" style={{
              borderTopLeftRadius: '24px',
              borderBottomRightRadius: '24px',
              borderTopRightRadius: '4px',
              borderBottomLeftRadius: '4px'
            }}>
              <Image
                src="/Bayard_white_logo.svg"
                alt="Bayard Vacations"
                width={80}
                height={28}
                className="w-16 sm:w-20 h-auto"
              />
            </div>
          </div>

          {/* Floating Offer Badge */}
          {floatingDeal && floatingDeal.discount && (
            <motion.div
              key={`offer-${activeIndex}`}
              initial={{ opacity: 0, y: 20, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: -5 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute top-8 right-8 sm:top-12 sm:right-12"
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-brand-gold/40 blur-2xl rounded-full scale-150" />
                
                {/* Badge */}
                <div className="relative bg-gradient-to-br from-brand-gold to-yellow-400 text-slate-900 px-8 py-6 rounded-2xl shadow-2xl">
                  {floatingDeal.title && (
                    <div className="flex items-center gap-2 justify-center mb-2">
                      <Sparkles className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase tracking-wider">{floatingDeal.title}</span>
                    </div>
                  )}
                  {floatingDeal.discount && (
                    <div className="text-4xl font-bold text-center leading-none">
                      {floatingDeal.discount}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Destination Name Tag */}
          <motion.div
            key={`name-${activeIndex}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-4 rounded-2xl">
              <p className="text-white/60 text-sm font-medium mb-1">Now Featuring</p>
              <h3 className="text-white text-3xl sm:text-4xl font-bold">
                {activeMedia.featuredText || activeMedia.title || 'Exclusive Destination'}
              </h3>
            </div>
          </motion.div>

          {/* Progress Indicators */}
          <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 flex gap-2">
            {mediaItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="group relative"
              >
                <div className={`w-12 h-1 rounded-full transition-all duration-500 ${
                  index === activeIndex 
                    ? 'bg-white' 
                    : 'bg-white/30 group-hover:bg-white/50'
                }`}>
                  {index === activeIndex && (
                    <motion.div
                      className="absolute inset-0 bg-brand-gold rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: bannerData?.mediaCarousel?.config?.interval ? bannerData.mediaCarousel.config.interval / 1000 : 4, ease: 'linear' }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - Feature Banners */}
        <div 
          className="w-full lg:w-[20%] relative flex items-center justify-center overflow-hidden py-8 lg:py-0 shrink-0 min-h-[400px] lg:min-h-0 rounded-3xl lg:rounded-none px-4 lg:px-0" 
          style={{
            borderTopRightRadius: 'var(--lg-border-radius, 12px)',
            borderBottomRightRadius: 'var(--lg-border-radius, 80px)'
          }}
        >
          
          {/* Content */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            
            {/* Feature Banner Display */}
            <div className="w-full h-full min-h-[350px] flex items-center justify-center relative rounded-3xl lg:rounded-none overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeatureIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 rounded-3xl lg:rounded-none overflow-hidden"
                >
                  <Image
                    src={normalizeImageUrl(promoCards[activeFeatureIndex]?.imageUrl || promoCards[activeFeatureIndex]?.image || '/img/ai-bot-banner.png')}
                    alt={promoCards[activeFeatureIndex]?.title || 'Feature'}
                    fill
                    sizes="(max-width: 1024px) 100vw, 20vw"
                    className="object-contain lg:object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
