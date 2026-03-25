"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * GalleryCarousel - A fullscreen image gallery popup with carousel navigation
 * 
 * @param {boolean} isOpen - Whether the gallery is open
 * @param {Function} onClose - Callback to close the gallery
 * @param {Array} images - Array of image objects with { url, caption }
 * @param {number} initialIndex - Starting image index (default: 0)
 * @param {string} title - Gallery title
 */
const GalleryCarousel = ({ 
  isOpen, 
  onClose, 
  images = [], 
  initialIndex = 0,
  title = "Gallery"
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
  };

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
                <p className="text-white/60 text-sm font-medium mt-1">
                  {currentIndex + 1} / {images.length}
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close gallery"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Main Image */}
          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full max-w-6xl max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl"
              >
                {images[currentIndex]?.url ? (
                  <Image
                    src={images[currentIndex].url}
                    alt={images[currentIndex].caption || `Image ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                    <p className="text-slate-400 text-lg font-medium">Image not available</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Caption */}
          {images[currentIndex].caption && (
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="max-w-7xl mx-auto">
                <p className="text-white text-lg font-medium text-center">
                  {images[currentIndex].caption}
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                aria-label="Previous image"
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-xl"
              >
                <ChevronLeft className="w-7 h-7 md:w-8 md:h-8" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-xl"
              >
                <ChevronRight className="w-7 h-7 md:w-8 md:h-8" />
              </button>
            </>
          )}

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="absolute bottom-24 left-0 right-0 z-10">
              <div className="flex gap-2 justify-center overflow-x-auto px-4 pb-2 scrollbar-hide">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`View image ${index + 1}`}
                    className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all ${
                      index === currentIndex
                        ? "ring-4 ring-white scale-110"
                        : "ring-2 ring-white/30 opacity-60 hover:opacity-100"
                    }`}
                  >
                    {image.url ? (
                      <Image
                        src={image.url}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                        <span className="text-slate-400 text-xs">N/A</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Click outside to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={onClose}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryCarousel;
