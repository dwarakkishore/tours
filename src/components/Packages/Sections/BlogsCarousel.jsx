"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, ArrowUpRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const CarouselBlogCard = ({ blog }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <article className="group h-full bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={blog.featuredImage || blog.image}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
           <span className="px-3 py-1 rounded-full bg-brand-blue/90 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest">
             Travel Guide
           </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 mb-4">
           <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
             <Calendar className="size-3 text-brand-blue" />
             {formatDate(blog.createdAt)}
           </div>
           <div className="w-1 h-1 rounded-full bg-slate-200" />
           <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
             <Clock className="size-3 text-brand-blue" />
             5 min read
           </div>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-blue transition-colors tracking-tight leading-tight mb-4 line-clamp-2">
          {blog.title}
        </h3>
        
        <p className="text-sm font-medium text-slate-500 mb-6 line-clamp-2 leading-relaxed">
           {blog.metaDescription || "Discover the magic and hidden gems of this incredible destination..."}
        </p>
        
        <Link
          href={`/blogs/${blog.slug}`}
          className="mt-auto inline-flex items-center gap-2 group/link"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue border-b-2 border-transparent group-hover/link:border-brand-blue pb-0.5 transition-all">
            Read Journal
          </span>
          <ArrowUpRight className="size-4 text-brand-blue transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
};

const BlogsCarousel = ({ blogs, regionName }) => {
  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="bg-slate-50/50 py-4 md:py-12 border-y border-slate-100 relative overflow-hidden" id="travel-insights">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[120px] -ml-96 -mt-96" />
      
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 md:mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-2 tracking-tight leading-tight">
              Travel <span className="text-brand-blue">Insights</span>
            </h2>
            <p className="text-slate-500 text-xs md:text-lg font-medium">
              Deep dive into {regionName || "the world"} with our curated stories and expert guides.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
             <button className="swiper-btn-prev-blog w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all shadow-sm active:scale-95">
                <ChevronLeft className="size-6" />
             </button>
             <button className="swiper-btn-next-blog w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all shadow-sm active:scale-95">
                <ChevronRight className="size-6" />
             </button>
          </div>
        </div>

        <div className="overflow-visible">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.3}
            navigation={{
              prevEl: ".swiper-btn-prev-blog",
              nextEl: ".swiper-btn-next-blog",
            }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2.3 },
              1024: { slidesPerView: 3.5 },
              1280: { slidesPerView: 4.5 },
            }}
            className="!overflow-visible"
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog.id} className="h-auto">
                <CarouselBlogCard blog={blog} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default BlogsCarousel;
