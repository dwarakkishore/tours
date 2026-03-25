'use client';

import React, { useState } from 'react';
import { Star, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import "swiper/css";
import "swiper/css/navigation";

const ShareableTestimonials = ({ testimonials = [] }) => {
  const [selectedIdx, setSelectedIdx] = useState(null);
  // Extract all media for the gallery and normalize to { url, type }
  const allMedia = testimonials.reduce((acc, t) => {
    if (t.attachments && t.attachments.length > 0) {
      const normalized = t.attachments.map(att => {
        if (typeof att === 'string') return { url: att, type: att.match(/\.(mp4|webm|mov|ogg)$/i) ? 'video' : 'image' };
        return att;
      });
      return [...acc, ...normalized];
    }
    return acc;
  }, []);

  // Demo media if none exists in data
  const galleryMedia = allMedia.length > 0 ? allMedia : [
    { url: "https://cdn.bayardvacations.com/images/1770431608093-WhatsApp_Video_2026-02-07_at_07.53.19.mp4", type: "video" },
    { url: "https://cdn.bayardvacations.com/images/1770431558286-WhatsApp_Video_2026-02-07_at_07.53.16.mp4", type: "video" },
    { url: "https://cdn.bayardvacations.com/images/1770431512177-WhatsApp_Video_2026-02-07_at_07.53.12.mp4", type: "video" },
    { url: "https://cdn.bayardvacations.com/images/1770431463081-WhatsApp_Video_2026-02-07_at_07.53.07.mp4", type: "video" },
    { url: "https://cdn.bayardvacations.com/images/1770431392630-WhatsApp_Video_2026-02-07_at_07.52.58.mp4", type: "video" },
    { url: "https://cdn.bayardvacations.com/images/1770431339559-WhatsApp_Video_2026-02-07_at_07.52.51.mp4", type: "video" },
    { url: "https://cdn.bayardvacations.com/images/1770431289628-WhatsApp_Video_2026-02-07_at_07.52.45.mp4", type: "video" },
    { url: "https://cdn.bayardvacations.com/images/1770431291373-WhatsApp_Video_2026-02-07_at_07.52.37.mp4", type: "video" },
    { url: "https://cdn.bayardvacations.com/images/1770431059091-WhatsApp_Video_2026-02-07_at_07.52.14.mp4", type: "video" },
    { url: "https://cdn.bayardvacations.com/images/1770430970236-WhatsApp_Video_2026-02-07_at_07.52.08.mp4", type: "video" },
    { url: "https://cdn.bayardvacations.com/images/1770430880516-WhatsApp_Video_2026-02-07_at_07.52.01.mp4", type: "video" },
  ];

  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Simple & Clear Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Traveler <span className="text-brand-blue">Stories</span>
          </h2>
          <p className="text-slate-500 mt-4 text-lg font-medium">Real photos and reviews from our guests.</p>
        </div>

        {/* 1. Photo Gallery - Simple Carousel */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-slate-200"></span>
              Guest Moments
            </h3>
            
            {/* Gallery Navigation */}
            <div className="flex gap-2">
              <button className="gal-prev w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:border-brand-blue transition-all shadow-sm z-10">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="gal-next w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:border-brand-blue transition-all shadow-sm z-10">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={2.2}
            navigation={{
              prevEl: '.gal-prev',
              nextEl: '.gal-next',
            }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 3.2 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
          >
            {galleryMedia.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div 
                  onClick={() => setSelectedIdx(idx)}
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                >
                  {item.type === 'video' ? (
                    <video 
                      key={item.url}
                      src={item.url}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      muted
                      playsInline
                      loop
                      preload="metadata"
                      onMouseOver={(e) => e.target.play()}
                      onMouseOut={(e) => {
                        e.target.pause();
                        e.target.currentTime = 0;
                      }}
                    />
                  ) : (
                    <Image 
                      src={item.url} 
                      alt="Guest moment" 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  )}
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none">
                      <Play className="w-8 h-8 text-white fill-white opacity-80" />
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 2. Written Reviews - Simple Carousel */}
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-slate-200"></span>
              Detailed Feedback
            </h3>
            
            {/* Carousel Navigation - Placed right above the carousel */}
            <div className="flex gap-2">
              <button className="test-prev w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:border-brand-blue transition-all shadow-sm z-10">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="test-next w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:border-brand-blue transition-all shadow-sm z-10">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: '.test-prev',
              nextEl: '.test-next',
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-4"
          >
            {(testimonials && testimonials.length > 0 ? testimonials : [
              {
                name: "Mani R",
                review: "Our Memorable Andaman Adventure with Bayard Vacations!! We recently embarked on a fantastic 5-day Andaman adventure, expertly curated by Mr. Rahul from Bayard Vacations. The itinerary was perfectly planned, allowing us to explore a wide range of attractions. Rahul was incredibly patient and attentive to our specific needs, resulting in a customized trip that exceeded our expectations.",
                rating: 5,
                location: "Andaman"
              },
              {
                name: "Pawan Cheedella",
                review: "Wonderful trip with Bayard vacations. They handled everything with great precision and made our trip hassle free. Ground executives were always available on call and everything was planned smoothly and on time. Their team was present on every point in Andaman, Havelock and Neil Island. Properties planned were excellent. Awesome experience.",
                rating: 5,
                location: "Andaman"
              },
              {
                name: "Mohammad Ibrahim",
                review: "We had a wonderful trip to Thailand. Thanks to Bayard Vacations (special appreciation to Balaji) for taking care of the itinerary. The hotels were great with all the facilities. All the sightseeing was well planned and as per the schedule. There was no delay. Special their telegram support was very helpful and quick in responding.",
                rating: 5,
                location: "Thailand"
              },
              {
                name: "Vishal Balagaon",
                review: "It's a great experience to travel with Bayard vacations, Especially the service while pickup and drop everything was exactly on time. Destination where planned perfectly as per the times. Resorts chosen was best for couples to spend quality time. The best part was to have a candle light dinner at beach side.",
                rating: 5,
                location: "Andaman"
              },
              {
                name: "Darshan D R",
                review: "Will keep it short. Had been to Bali through Balaji. He was help, flexible and friendly. Understood our budget issues and provided us with the best package possible keeping the quantity and service beyond our expectations. Best travel partners if you are looking within limited budget.",
                rating: 5,
                location: "Bali"
              }
            ]).map((testimonial, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 flex flex-col h-full shadow-sm hover:border-brand-blue/20 transition-all group">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`size-3.5 ${i < (testimonial.rating || 5) ? 'fill-brand-blue text-brand-blue' : 'text-slate-100'}`} 
                      />
                    ))}
                  </div>

                  <p className="text-slate-700 leading-relaxed mb-8 flex-1 font-medium italic text-sm line-clamp-6">
                    "{testimonial.review || testimonial.content}"
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                    <div className="size-10 rounded-full bg-slate-50 flex items-center justify-center text-brand-blue font-bold text-xs border border-slate-100 shadow-sm shrink-0">
                      {(testimonial.name || 'G').charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {testimonial.name}
                      </h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {testimonial.location || 'Verified Guest'}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Ultra Simple Lightbox */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 lg:p-12"
            onClick={() => setSelectedIdx(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
              <X className="w-10 h-10" />
            </button>
            <div className="relative w-full h-full max-w-6xl max-h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
              {galleryMedia[selectedIdx].type === 'video' ? (
                <video 
                  key={galleryMedia[selectedIdx].url} 
                  src={galleryMedia[selectedIdx].url}
                  controls 
                  autoPlay 
                  playsInline
                  className="max-h-full rounded-2xl"
                />
              ) : (
                <div className="relative w-full h-full">
                  <Image src={galleryMedia[selectedIdx].url} alt="Gallery" fill className="object-contain" />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ShareableTestimonials;
