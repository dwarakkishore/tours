'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Star, MapPin, Bed, Wifi, Utensils, Wind, Building2, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const ShareableHotelInfo = ({ hotelDetails }) => {
  const hotels = hotelDetails ? (Array.isArray(hotelDetails) ? hotelDetails : [hotelDetails]) : [];

  if (!hotels || hotels.length === 0) return null;

  const getAmenityIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('wifi')) return <Wifi size={14} className="text-blue-600" />;
    if (n.includes('breakfast') || n.includes('meal') || n.includes('dining')) return <Utensils size={14} className="text-blue-600" />;
    if (n.includes('ac') || n.includes('air conditioning')) return <Wind size={14} className="text-blue-600" />;
    if (n.includes('pool')) return <Building2 size={14} className="text-blue-600" />;
    if (n.includes('spa') || n.includes('gym')) return <Building2 size={14} className="text-blue-600" />;
    return <CheckCircle2 size={14} className="text-blue-600" />;
  };

  const renderHotelCard = (hotel, idx) => (
    <div className="flex flex-col bg-white rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl border border-slate-100 transition-all duration-500 h-full">
      {/* Image Section */}
      <div className="relative w-full h-[160px] md:h-[220px] overflow-hidden">
        <Image
          src={hotel.images?.[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"}
          alt={hotel.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        {/* Rating Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm border border-white/20 flex items-center gap-0.5">
            {[...Array(hotel.rating || 5)].map((_, i) => (
              <Star key={i} size={10} className="fill-yellow-500 text-yellow-500" />
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3 md:p-5 flex-1 flex flex-col">
        {/* Hotel Name & Rating Link */}
        <div className="mb-2 md:mb-4">
          <h3 className="text-base md:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight line-clamp-1 mb-1">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 rounded-md border border-blue-100">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                {hotel.category || "Premium Hotel"} • {hotel.location || hotel.city || "Top Location"}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-50 rounded-md border border-slate-100">
              <Bed className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-600 truncate max-w-[120px]">
                {hotel.roomType || "Premium Room"}
              </span>
            </div>
          </div>
        </div>

        {/* Check-in/Check-out - Clean Layout */}
        <div className="relative mb-2 md:mb-4">
          <div className="grid grid-cols-2 gap-2 md:gap-3 relative z-10">
            <div className="bg-slate-50/10 p-1.5 md:p-2.5 rounded-xl hover:bg-slate-50 transition-all duration-300">
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-0.5">Check-in</p>
              <p className="text-[10px] font-bold text-slate-900">{hotel.checkIn || "Standard"}</p>
            </div>
            <div className="bg-slate-50/10 p-1.5 md:p-2.5 rounded-xl hover:bg-slate-50 transition-all duration-300 text-right">
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-0.5">Check-out</p>
              <p className="text-[10px] font-bold text-slate-900">{hotel.checkOut || "Standard"}</p>
            </div>
          </div>
        </div>

        {/* Amenities/Highlights - Structured 2-Column Grid */}
        <div className="pt-1 md:pt-2">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1.5 md:mb-3">In-Stay Highlights</p>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 md:gap-x-4 md:gap-y-3">
            {(hotel.amenities || []).slice(0, 4).map((amenity, i) => (
              <div 
                key={i} 
                className="flex items-center gap-2.5 group/item overflow-hidden"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-50/50 flex items-center justify-center group-hover/item:bg-blue-50 transition-colors shrink-0">
                  {getAmenityIcon(amenity)}
                </div>
                <span className="text-[10px] font-bold text-slate-600 group-hover/item:text-slate-900 transition-colors truncate">
                  {amenity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="accommodation" className="py-6 md:py-10 bg-slate-50/30 scroll-mt-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-3">
            Your <span className="text-blue-600">Accommodation</span>
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-5"></div>
          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Stay in our carefully selected premium hotels and resorts
          </p>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={32}
            slidesPerView={1.2}
            navigation={{
              prevEl: '.hotel-swiper-button-prev',
              nextEl: '.hotel-swiper-button-next',
            }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-6"
          >
            {hotels.map((hotel, idx) => (
              <SwiperSlide key={idx} className="h-auto">
                {renderHotelCard(hotel, idx)}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="hotel-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="hotel-swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>


    </section>
  );
};

export default ShareableHotelInfo;
