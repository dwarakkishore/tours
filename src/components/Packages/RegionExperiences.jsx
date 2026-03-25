"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import { 
  Utensils, 
  Landmark, 
  Camera, 
  ShoppingBag, 
  Music,
  Sparkles,
  MapPin,
  Users,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const RegionExperiences = ({ regionName = "this destination", regionData }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Transform mustDoExperiences data into gallery format
  const galleryImages = (() => {
    if (regionData?.mustDoExperiences?.categories) {
      const images = [];
      regionData.mustDoExperiences.categories.forEach((categoryGroup) => {
        categoryGroup.items?.forEach((item) => {
          images.push({
            url: item.image,
            title: item.title,
            category: categoryGroup.category,
            description: item.description
          });
        });
      });
      
      // If we have images from data, use them
      if (images.length > 0) {
        return images;
      }
    }
    
    // Fallback to default images if no data
    return [
      {
        url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80&fit=crop",
        title: "Local Cuisine",
        category: "Food & Dining",
        description: "Authentic street food and traditional restaurants"
      },
      {
        url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80&fit=crop",
        title: "Ancient Temples",
        category: "Cultural Sites",
        description: "Historical monuments and religious landmarks"
      },
      {
        url: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=1200&q=80&fit=crop",
        title: "Scenic Views",
        category: "Photography",
        description: "Breathtaking landscapes and photo spots"
      },
      {
        url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80&fit=crop",
        title: "Local Markets",
        category: "Shopping",
        description: "Vibrant bazaars and artisan shops"
      },
      {
        url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80&fit=crop",
        title: "Festivals",
        category: "Events",
        description: "Cultural celebrations and traditional music"
      },
      {
        url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80&fit=crop",
        title: "Local Life",
        category: "Culture",
        description: "Meet friendly locals and experience hospitality"
      }
    ];
  })();

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  return (
    <section className="bg-gradient-to-b from-white via-slate-50 to-white py-8 md:py-12">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 mb-4">
            <Sparkles className="w-4 h-4 text-brand-blue" />
            <span className="text-sm font-bold text-brand-blue uppercase tracking-wider">
              Must-Do Experiences
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            <span className="hidden sm:inline">Experience </span>
            <span className="inline sm:hidden">Highlights of </span>
            <span className="text-brand-blue capitalize">{regionName}</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto truncate md:whitespace-normal">
            Discover unique experiences that make {regionName} unforgettable
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            {/* Slides */}
            <div className="relative h-[400px] md:h-[500px]">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ${
                    index === currentSlide 
                      ? "opacity-100 scale-100" 
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  {/* Image */}
                  <img
                    src={image.url}
                    alt={image.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onClick={() => openLightbox(index)}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                    {/* Category Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-4 w-fit">
                      <MapPin className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-bold uppercase tracking-wider">
                        {image.category}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-2xl mb-3">
                      {image.title}
                    </h3>
                    <p className="text-white/95 text-base md:text-lg leading-relaxed max-w-3xl drop-shadow-lg">
                      {image.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={handlePrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm shadow-xl flex items-center justify-center transition-all hover:scale-110 group z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-slate-900 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm shadow-xl flex items-center justify-center transition-all hover:scale-110 group z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-slate-900 group-hover:scale-110 transition-transform" />
              </button>
            </>
          )}

          {/* Dot Indicators */}
          {galleryImages.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide
                      ? "w-8 h-3 bg-brand-blue"
                      : "w-3 h-3 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Counter */}
          <div className="text-center mt-4">
            <p className="text-sm font-medium text-slate-600">
              {currentSlide + 1} / {galleryImages.length}
            </p>
          </div>
        </div>

        {/* Lightbox Modal */}
        {isLightboxOpen && (
          <div 
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(false);
              }}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all z-10 group"
            >
              <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md z-10">
              <p className="text-white font-bold text-sm">
                {currentLightboxImageIndex + 1} / {galleryImages.length}
              </p>
            </div>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all z-10 group"
            >
              <ChevronLeft className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all z-10 group"
            >
              <ChevronRight className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Main Image */}
            <div 
              className="relative max-w-6xl w-full mx-auto flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container with Overlay */}
              <div className="relative inline-block max-w-full">
                <img
                  key={currentImageIndex}
                  src={galleryImages[currentImageIndex].url}
                  alt={galleryImages[currentImageIndex].title}
                  className="max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl animate-fadeIn"
                />
                
                {/* Info Overlay - Positioned within image bounds */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 md:p-6 rounded-b-lg">
                  <div className="animate-slideUp">
                    {/* Category Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-white" />
                      <span className="text-white text-xs font-bold uppercase tracking-wider">
                        {galleryImages[currentImageIndex].category}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1.5 leading-tight">
                      {galleryImages[currentImageIndex].title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white/95 text-sm md:text-base">
                      {galleryImages[currentImageIndex].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4">
              <div className="overflow-x-auto scrollbar-hide max-w-4xl">
                <div className="flex gap-3 justify-center min-w-max px-2">
                  {galleryImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        index === currentImageIndex 
                          ? "border-white scale-110" 
                          : "border-white/30 hover:border-white/60 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <style jsx>{`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              
              @keyframes slideUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              
              .animate-fadeIn {
                animation: fadeIn 0.3s ease-out;
              }
              
              .animate-slideUp {
                animation: slideUp 0.5s ease-out;
              }
              
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        )}
      </Container>
    </section>
  );
};

export default RegionExperiences;
