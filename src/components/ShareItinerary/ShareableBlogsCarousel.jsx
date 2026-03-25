'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, BookOpen, Calendar, MapPin } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const ShareableBlogsCarousel = ({ destination = 'Bali' }) => {
  // Dummy blog data - replace with real blog posts from your backend
  const blogs = [
    {
      id: 1,
      title: `Top 10 Hidden Gems in ${destination}`,
      excerpt: 'Discover secret spots and local favorites away from tourist crowds',
      image: '/images/packages/bali/monkey-forest.jpg',
      category: 'Travel Tips',
      readTime: '5 min read',
      date: 'Jan 2026'
    },
    {
      id: 2,
      title: 'Best Time to Visit Bali: Complete Guide',
      excerpt: 'Plan your perfect trip with our month-by-month weather and festival guide',
      image: '/images/packages/bali/tanah-lot.jpg',
      category: 'Planning',
      readTime: '8 min read',
      date: 'Dec 2025'
    },
    {
      id: 3,
      title: 'Balinese Food Guide: Must-Try Dishes',
      excerpt: 'From Nasi Goreng to Babi Guling, explore authentic Balinese cuisine',
      image: '/images/packages/bali/hero.jpg',
      category: 'Food & Drink',
      readTime: '6 min read',
      date: 'Jan 2026'
    },
    {
      id: 4,
      title: 'Temple Etiquette: Dos and Don\'ts',
      excerpt: 'Respect local customs and make the most of your temple visits',
      image: '/images/packages/bali/tanah-lot.jpg',
      category: 'Culture',
      readTime: '4 min read',
      date: 'Dec 2025'
    },
    {
      id: 5,
      title: 'Adventure Sports in Bali',
      excerpt: 'Surfing, diving, rafting and more thrilling activities await',
      image: '/images/packages/bali/water-sports.jpg',
      category: 'Adventure',
      readTime: '7 min read',
      date: 'Jan 2026'
    }
  ];

  return (
    <section className="py-6 md:py-10 bg-gradient-to-br from-slate-50 to-white print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 rounded-full mb-4">
            <BookOpen className="w-5 h-5 text-brand-blue" />
            <span className="text-sm font-bold text-brand-blue uppercase tracking-wider">Travel Inspiration</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Related <span className="text-brand-blue">Travel Blogs</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Discover insider tips, local insights, and travel guides to enhance your journey
          </p>
        </div>

        {/* Blogs Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1.2}
            navigation={{
              prevEl: '.blogs-swiper-button-prev',
              nextEl: '.blogs-swiper-button-next',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-6"
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog.id}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full border border-slate-100">
                  {/* Blog Image */}
                  <div className="relative h-40 md:h-52 overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-brand-blue text-white text-xs font-bold rounded-full">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div className="p-4 md:p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-1.5 md:mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{blog.date}</span>
                      </div>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>

                    <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1.5 md:mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    
                    <p className="text-sm text-slate-600 line-clamp-2 mb-2 md:mb-4">
                      {blog.excerpt}
                    </p>

                    <button className="text-sm font-bold text-brand-blue hover:text-blue-600 transition-colors flex items-center gap-1">
                      Read More
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="blogs-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="blogs-swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShareableBlogsCarousel;
