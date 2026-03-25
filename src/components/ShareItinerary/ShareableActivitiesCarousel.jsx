'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MapPin, Star, Clock, Users } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const ShareableActivitiesCarousel = ({ activities = [] }) => {
  if (!activities || activities.length === 0) return null;

  return (
    <section className="py-6 md:py-10 bg-white print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 rounded-full mb-4">
            <MapPin className="w-5 h-5 text-brand-blue" />
            <span className="text-sm font-bold text-brand-blue uppercase tracking-wider">Explore More</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Recommended <span className="text-brand-blue">Activities</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Enhance your trip with these hand-picked experiences and adventures
          </p>
        </div>

        {/* Activities Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1.2}
            navigation={{
              prevEl: '.activities-swiper-button-prev',
              nextEl: '.activities-swiper-button-next',
            }}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-6"
          >
            {activities.map((activity) => (
              <SwiperSlide key={activity.id}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full border border-slate-100">
                  {/* Activity Image */}
                  <div className="relative h-44 md:h-56 overflow-hidden">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold text-slate-900">{activity.rating}</span>
                        <span className="text-xs text-slate-500">({activity.reviews})</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-brand-blue text-white text-sm font-bold rounded-full">
                        {activity.price}
                      </span>
                    </div>
                  </div>

                  {/* Activity Content */}
                  <div className="p-4 md:p-6">
                    <div className="flex items-start gap-2 mb-1.5 md:mb-3">
                      <MapPin className="w-4 h-4 text-brand-blue shrink-0 mt-1" />
                      <span className="text-xs text-slate-500 font-medium">{activity.location}</span>
                    </div>

                    <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 md:mb-3 group-hover:text-brand-blue transition-colors line-clamp-2">
                      {activity.title}
                    </h3>

                    {/* Activity Details - 2 Column Grid */}
                    <div className="grid grid-cols-2 gap-2 md:gap-4 mb-2 md:mb-5 pb-2 md:pb-5 border-b border-slate-100/60">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                          <Clock className="w-4 h-4 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Duration</p>
                          <p className="text-xs font-bold text-slate-900 leading-tight">{activity.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                          <Users className="w-4 h-4 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Group Size</p>
                          <p className="text-xs font-bold text-slate-900 leading-tight">{activity.groupSize}</p>
                        </div>
                      </div>
                    </div>

                    {/* Highlights - 2 Column Grid */}
                    <div className="mb-3 md:mb-6">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1.5 md:mb-3">Highlights</p>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 md:gap-x-4 md:gap-y-2.5">
                        {activity.highlights.slice(0, 4).map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 group/item overflow-hidden">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/40 group-hover/item:bg-brand-blue transition-colors shrink-0" />
                            <span className="text-[11px] font-bold text-slate-600 group-hover/item:text-slate-900 transition-colors truncate">
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="hidden md:block w-full px-4 py-2.5 bg-brand-blue/10 hover:bg-brand-blue text-brand-blue hover:text-white rounded-xl font-bold transition-all duration-300 text-sm">
                      Learn More
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="activities-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="activities-swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShareableActivitiesCarousel;
