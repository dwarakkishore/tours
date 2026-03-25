"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PackageCard from "@/components/ui/PackageCard";
import Container from "@/components/ui/Container";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const RelatedPackages = ({ relatedPackages }) => {
  // Defensive deduplication to guarantee uniqueness
  const uniquePackages = React.useMemo(() => {
    if (!relatedPackages) return [];
    const seen = new Set();
    return relatedPackages.filter(pkg => {
      const duplicate = seen.has(pkg.id);
      seen.add(pkg.id);
      return !duplicate;
    });
  }, [relatedPackages]);

  if (!uniquePackages || uniquePackages.length === 0) return null;

  return (
    <section className="bg-white py-1 md:py-8 border border-slate-100 shadow-sm rounded-3xl relative overflow-hidden mt-2 md:mt-6" id="related-packages">
      {/* Decorative Blur similar to WhyBayardVacations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] -ml-64 -mb-64"></div>
      <Container>
        <div className="mb-2 md:mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-1 md:mb-2 tracking-tight">
            More <span className="text-brand-blue">Adventures</span>
          </h2>
          <p className="text-xs md:text-base text-slate-600 font-medium max-w-2xl">
            Explore other handpicked signatures and top-rated escapes in this region.
          </p>
        </div>

        <div className="relative group/nav">
          {/* Overlay Navigation Buttons */}
          <button className="swiper-button-prev-pkg absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white/90 md:bg-white/95 shadow-lg md:shadow-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-300 md:opacity-0 group-hover/nav:opacity-100">
            <ChevronLeft className="w-5 md:w-6 h-5 md:h-6" />
          </button>
          <button className="swiper-button-next-pkg absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white/90 md:bg-white/95 shadow-lg md:shadow-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-300 md:opacity-0 group-hover/nav:opacity-100">
            <ChevronRight className="w-5 md:w-6 h-5 md:h-6" />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={12}
            slidesPerView={1.2}
            centeredSlides={false}
            navigation={{
              prevEl: ".swiper-button-prev-pkg",
              nextEl: ".swiper-button-next-pkg",
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24, centeredSlides: false },
              1024: { slidesPerView: 3, spaceBetween: 24, centeredSlides: false },
              1440: { slidesPerView: 4, spaceBetween: 24, centeredSlides: false },
            }}
            className="pb-8 md:pb-16"
          >
            {uniquePackages.map((item) => (
              <SwiperSlide key={item.id}>
                <PackageCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default RelatedPackages;
