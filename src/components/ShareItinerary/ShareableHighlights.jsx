import { useState, useCallback, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogDescription,
  DialogPortal,
  DialogOverlay
} from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Remote fallback image for highlights when no specific URL is provided
const DEFAULT_HIGHLIGHT_IMAGE = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800";

const ShareableHighlights = ({ highlights = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const showNext = useCallback((e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % highlights.length);
  }, [highlights.length]);

  const showPrev = useCallback((e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + highlights.length) % highlights.length);
  }, [highlights.length]);

  // Handle keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;
    
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") closeLightbox();
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, showNext, showPrev]);

  if (!highlights || highlights.length === 0) return null;

  return (
    <section id="highlights" className="py-6 md:py-12 bg-slate-50/50 print:bg-white print:py-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Artistic Section Header */}
        <div className="text-center mb-8 md:mb-12 print:mb-6">
          <p className="font-great-vibes text-4xl md:text-5xl text-brand-blue mb-2 print:text-3xl">
            What Makes This Special
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 print:text-xl">
            Package Highlights
          </h2>
        </div>

        {/* Highlights Grid with Small Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 max-w-7xl mx-auto">
          {highlights.map((highlight, index) => {
            const title = typeof highlight === 'object' ? highlight.title : highlight;
            const imageUrl = (typeof highlight === 'object' && highlight.url) ? highlight.url : DEFAULT_HIGHLIGHT_IMAGE;
            
            return (
              <div
                key={index}
                className="group flex items-center gap-6"
              >
                {/* Small Highlight Image - Clickable for Lightbox */}
                <button
                  onClick={() => openLightbox(index)}
                  className="relative flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden shadow-md border border-slate-200 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                >
                  <img 
                    src={imageUrl} 
                    alt={title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-colors duration-300">
                    <Maximize2 className="text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 w-6 h-6" />
                  </div>
                </button>
                
                {/* Text Content */}
                <div className="flex-1">
                  <p className="text-slate-800 text-base md:text-lg font-bold leading-tight group-hover:text-brand-blue transition-colors duration-300 line-clamp-2">
                    {title}
                  </p>
                  <div className="mt-2 w-8 h-0.5 bg-slate-200 group-hover:w-16 group-hover:bg-brand-blue transition-all duration-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox Gallery Popup */}
        <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && closeLightbox()}>
          <DialogPortal>
            <DialogOverlay className="bg-black/95 backdrop-blur-sm z-[100]" />
            <DialogContent className="fixed left-[50%] top-[50%] z-[101] w-full max-w-[100vw] h-full h-max-[100vh] border-none bg-transparent p-0 flex flex-col translate-x-[-50%] translate-y-[-50%] shadow-none focus-visible:outline-none">
              <DialogTitle className="sr-only">Highlights Gallery</DialogTitle>
              <DialogDescription className="sr-only">View package highlight images in detail.</DialogDescription>
              
              <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-12">
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-md"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Main Content Area */}
                <div className="relative w-full max-w-5xl aspect-video md:aspect-[16/10] flex items-center justify-center">
                  {/* Prev Button */}
                  <button
                    onClick={showPrev}
                    className="absolute -left-4 md:-left-20 z-[110] p-4 rounded-full text-white/40 hover:text-white transition-all hover:scale-110"
                  >
                    <ChevronLeft className="w-10 h-10 md:w-16 md:h-16" />
                  </button>

                  {/* Image Container */}
                  <div className="relative w-full h-full overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-white/10 bg-black/40">
                    <AnimatePresence mode="wait">
                      {selectedIndex !== null && (
                        <motion.div
                          key={selectedIndex}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.05 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-0 flex flex-col"
                        >
                          <img
                            src={highlights[selectedIndex]?.url || DEFAULT_HIGHLIGHT_IMAGE}
                            alt={highlights[selectedIndex]?.title || highlights[selectedIndex]}
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Caption */}
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 md:p-12">
                            <motion.p 
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="text-white text-xl md:text-3xl font-bold tracking-tight"
                            >
                              {highlights[selectedIndex]?.title || highlights[selectedIndex]}
                            </motion.p>
                             <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: "4rem" }}
                              transition={{ delay: 0.3, duration: 0.6 }}
                              className="h-1 bg-brand-blue mt-4" 
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={showNext}
                    className="absolute -right-4 md:-right-20 z-[110] p-4 rounded-full text-white/40 hover:text-white transition-all hover:scale-110"
                  >
                    <ChevronRight className="w-10 h-10 md:w-16 md:h-16" />
                  </button>
                </div>

                {/* Counter */}
                <div className="mt-8 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 font-bold text-sm">
                  {selectedIndex + 1} / {highlights.length}
                </div>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </section>
  );
};

export default ShareableHighlights;
