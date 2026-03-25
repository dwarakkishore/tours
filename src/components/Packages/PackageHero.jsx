"use client";
import React, { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Container from "@/components/ui/Container";
import { MapPin, Clock, Calendar, IndianRupee, ChevronRight, Star, ExternalLink, Users } from "lucide-react";
import { cn, normalizeImageUrl, formatPrice } from "@/lib/utils";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const PackageHero = ({ packageData, price }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const swiperRef = useRef(null);

  const dummyBannerImages = [
    { url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=2000" },
    { url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=2000" },
    { url: "https://images.unsplash.com/photo-1512100356956-c1227c331f01?auto=format&fit=crop&q=80&w=2000" }
  ];

  const validBannerImages = useMemo(() => {
    const rawImages = packageData?.bannerImages || [];
    const filtered = rawImages
      .map(img => {
        if (typeof img === 'string') return { url: img };
        const url = img?.url || img?.urlRef;
        if (typeof url === 'string') return { url };
        return img?.url ? img : null;
      })
      .filter(Boolean);
    
    return filtered.length > 0 ? filtered : dummyBannerImages;
  }, [packageData]);

  const title = packageData?.packageTitle || "";
  const location = packageData?.region || "";

  return (
    <section className="relative w-full h-[100dvh] lg:h-screen bg-slate-950 overflow-hidden">
      {/* Immersive Background Swiper */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          loop={validBannerImages.length > 1}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setCurrentImageIndex(swiper.realIndex)}
          className="w-full h-full"
        >
          {validBannerImages.map((image, index) => (
            <SwiperSlide key={index} className="w-full h-full relative overflow-hidden">
              <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: index === currentImageIndex ? 1 : 1.1 }}
                transition={{ duration: 6, ease: "linear" }}
                className="w-full h-full"
              >
                <Image
                  src={normalizeImageUrl(image.url)}
                  alt={title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
              {/* Refined Overlays - Extreme bottom focus for mobile */}
              <div className="absolute inset-0 bg-black/10 z-10" />
              <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10 opacity-90 lg:opacity-60" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Content Container */}
      <div className="relative z-20 h-full w-full">
        <Container className="h-full flex flex-col justify-end lg:justify-center pb-6 lg:pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-8 items-end lg:items-center">
            
            {/* Left Section: Title & Badge */}
            <div className="lg:col-span-12 xl:col-span-8 space-y-2 lg:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-2 lg:space-y-4"
              >
                {/* Location Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl">
                  <MapPin className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400 fill-yellow-400/20" />
                  <span className="text-white font-bold text-[9px] lg:text-xs uppercase tracking-[0.2em]">{location}</span>
                </div>

                {/* Elegant Typography Title */}
                <h1 
                  className="text-white font-bold text-4xl md:text-5xl lg:text-6xl leading-tight lg:leading-[1.1] tracking-tight drop-shadow-2xl max-w-4xl font-poppins"
                >
                  {title.replace(/ - /g, ' — ')}
                </h1>

                {/* Social Proof & Rating Badge - More compact on mobile */}
                <div className="flex items-center gap-3 lg:gap-6 py-1">
                  <div className="flex -space-x-2.5 lg:-space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-7 h-7 lg:w-10 lg:h-10 rounded-full border-2 border-white/20 bg-slate-800 overflow-hidden">
                        <Image 
                          src={normalizeImageUrl(`https://i.pravatar.cc/100?img=${i + 15}`)} 
                          alt="User" 
                          width={40} 
                          height={40} 
                          className="object-cover"
                        />
                      </div>
                    ))}
                    <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-full border-2 border-white/20 bg-brand-blue flex items-center justify-center text-[7px] lg:text-[10px] text-white font-bold">
                      +2k
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
                    <Star className="w-2.5 h-2.5 text-yellow-400 fill-current" />
                    <span className="text-white text-[9px] lg:text-xs font-bold tracking-wide">4.9/5 Rating</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom/Right: Action Cards & Stats */}
            <div className="lg:col-span-12 xl:col-span-4 xl:col-start-9">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col gap-2"
              >
                {/* Desktop Only Stats Card */}
                <div className="hidden xl:block bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-6 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">Starting from</p>
                      <div className="flex items-baseline gap-1">
                        <span className={cn("text-3xl font-bold", formatPrice(price) === "On Request" ? "text-yellow-400" : "text-white")}>
                          {formatPrice(price) === "On Request" ? "On Request" : `₹${formatPrice(price)}`}
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.3)]">
                      <IndianRupee className="w-6 h-6 text-slate-900" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <span className="text-3xl font-bold text-white leading-none">{packageData?.nights || 0}N</span>
                        <p className="text-white/40 text-[9px] uppercase font-bold tracking-wider">Nights</p>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <span className="text-3xl font-bold text-white leading-none">{packageData?.days || 0}D</span>
                        <p className="text-white/40 text-[9px] uppercase font-bold tracking-wider">Days</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile/Tablet Minimal Stats Row */}
                <div className="xl:hidden flex items-center justify-between bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-3 mb-2">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-white/40 text-[8px] uppercase font-bold tracking-widest">Starts from</span>
                      <div className="flex items-baseline gap-1">
                        {(packageData?.basePrice > 0 || packageData?.price > 0 || packageData?.startingPrice > 0) && (
                          <span className="text-brand-accent text-sm font-bold">₹</span>
                        )}
                        <span className={cn("font-bold text-lg drop-shadow-sm", formatPrice(packageData?.basePrice || packageData?.price || packageData?.startingPrice || price || 0) === "On Request" ? "text-yellow-400" : "text-white")}>
                          {formatPrice(packageData?.basePrice || packageData?.price || packageData?.startingPrice || price || 0)}
                        </span>

                        {(packageData?.basePrice > 0 || packageData?.price > 0 || packageData?.startingPrice > 0) && (
                          <span className="text-white/40 text-xs">/person</span>
                        )}
                      </div>
                    </div>
                    <div className="w-[1px] h-6 bg-white/10" />
                    <div className="flex flex-col">
                      <span className="text-white/40 text-[8px] uppercase font-bold tracking-widest">Duration</span>
                      <span className="text-white font-bold text-lg">{packageData?.nights || 0}N / {packageData?.days || 0}D</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                    <IndianRupee className="w-4 h-4 text-slate-900" />
                  </div>
                </div>

                {/* Mobile Gallery "Moving Cards" - The Priority */}
                <div className="xl:hidden flex gap-3 overflow-x-auto py-2 px-1 -mx-1 scrollbar-hide snap-x">
                  {validBannerImages.map((image, index) => (
                    <motion.button
                      key={index}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => swiperRef.current?.slideTo(index)}
                      className={cn(
                        "relative flex-shrink-0 w-28 h-28 rounded-2xl overflow-hidden border-2 transition-all duration-300 snap-center",
                        currentImageIndex === index ? "border-yellow-400 scale-105 shadow-lg" : "border-white/20"
                      )}
                    >
                      <Image 
                        src={normalizeImageUrl(image.url)} 
                        alt={`Gallery ${index}`} 
                        fill 
                        sizes="112px" 
                        className="object-cover" 
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Breadcrumbs - Integrated into Flow at the Bottom */}
          <div className="mt-2 xl:mt-0 xl:absolute xl:bottom-6 xl:left-0 z-[60] w-full">
            <Container>
                <Breadcrumbs
                    items={[
                    { label: "Home", href: "/" },
                    { label: "Packages", href: "/explore" },
                    { label: packageData.region, href: `/packages/${packageData.region}` },
                    { label: packageData.packageName, href: `/packages/${packageData.region}/${packageData.packageSlug}`, active: true }
                    ]}
                    className="!bg-transparent !border-none !p-0 flex justify-start w-auto"
                    omitContainer
                    colorClasses="text-white/80 drop-shadow-md"
                    activeColorClasses="text-white drop-shadow-md font-bold"
                />
            </Container>
            </div>
        </Container>
      </div>

      {/* Desktop Gallery Rail - Fixed Bottom */}
      <div className="hidden xl:flex absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex-row gap-4">
        {validBannerImages.slice(0, 5).map((image, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            onClick={() => swiperRef.current?.slideTo(index)}
            className={cn(
              "relative w-28 h-28 rounded-3xl overflow-hidden border-2 transition-all duration-300 group",
              currentImageIndex === index ? "border-yellow-400 scale-110 shadow-[0_0_20px_rgba(250,204,21,0.3)]" : "border-white/20 hover:border-white/40"
            )}
          >
            <Image 
              src={normalizeImageUrl(image.url)} 
              alt={`Gallery ${index}`} 
              fill 
              sizes="112px" 
              className="object-cover transition-transform duration-500 group-hover:scale-110" 
            />
          </motion.button>
        ))}
      </div>



    </section>
  );
};

export default PackageHero;
