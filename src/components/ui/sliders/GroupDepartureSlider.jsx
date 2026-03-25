"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import GroupPackageCard from "@/components/Landing/GroupPackageCard";

const GroupDepartureSlider = ({ groupDeparturePackages }) => {
  if (!groupDeparturePackages || !Array.isArray(groupDeparturePackages) || groupDeparturePackages.length === 0) {
    return (
      <div className="mb-0 sm:mb-6 h-[400px] w-full flex items-center justify-center bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
         <p className="text-slate-400 font-medium italic">Discovering signature journeys...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={16}
        slidesPerView={1.2}
        loop={groupDeparturePackages.length > 1}
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
            clickable: true,
            el: ".custom-pagination-gd",
            bulletClass: "w-2.5 h-2.5 rounded-full bg-slate-200 mx-1.5 cursor-pointer transition-all duration-500",
            bulletActiveClass: "!w-10 !bg-slate-950",
        }}
        navigation={{
          nextEl: ".swiper-next-group",
          prevEl: ".swiper-prev-group",
        }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 32 },
          1280: { slidesPerView: 4, spaceBetween: 32 },
        }}
        className="pb-4 md:pb-16 h-[460px] md:h-[600px]"
      >
        {groupDeparturePackages.map((item, idx) => (
          <SwiperSlide key={item.id || idx} className="h-full">
             <div className="h-[420px] md:h-[550px] w-full px-1">
                <GroupPackageCard item={item} />
             </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Container */}
      <div className="custom-pagination-gd flex items-center justify-center mt-2 md:mt-4 h-6"></div>
    </div>
  );
};

export default GroupDepartureSlider;
