import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { X, Calendar, MapPin, ChevronRight, ChevronLeft, Play, LayoutGrid } from "lucide-react";

const PackageExperiences = ({ packageData }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [showJourney, setShowJourney] = useState(false);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (showJourney) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showJourney]);

  return (
    <section ref={sectionRef} id="experiences-section" className="bg-transparent py-2 md:py-4 overflow-hidden scroll-mt-24 mb-4">
      <Container>
        {/* Simple & Clean Header - Focused version */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 bg-slate-50/50 p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                The <span className="text-brand-blue">Visual Journal</span>
              </h2>
              <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">
                Deep dive into the stunning visuals and daily experiences that await you. Discover the heart of this journey through our curated visual chapters.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              onClick={() => setShowJourney(true)}
              className="flex items-center gap-3 px-6 py-3 md:px-8 md:py-5 bg-brand-blue text-white rounded-xl md:rounded-2xl font-bold text-xs md:text-sm uppercase tracking-[0.2em] shadow-2xl shadow-brand-blue/30 hover:bg-slate-900 transition-all active:scale-95 group whitespace-nowrap"
            >
              <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              Experience the Journey
            </button>
          </motion.div>
        </div>
      </Container>


      {/* Visual Journey Modal */}
      <AnimatePresence>
        {showJourney && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-3xl flex items-center justify-center p-0 md:p-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full h-full max-w-[1600px] bg-white md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-slate-100"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 md:p-8 border-b border-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue flex items-center justify-center text-white shadow-lg shadow-brand-blue/20">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Visual Journey</h3>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{packageData?.itineraries?.length} Chapters of Adventure</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowJourney(false)}
                  className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all active:scale-95"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content - Horizontal Scrollable Journey */}
              <div className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide py-10 px-8">
                <div className="flex gap-8 min-w-max h-full">
                  {packageData?.itineraries?.map((day, idx) => {
                    const dayImages = day.imageRefs || [];
                    const mainImage = dayImages[0]?.url || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800";
                    
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group w-[300px] md:w-[450px] h-full flex flex-col gap-6"
                      >
                        {/* Day Card */}
                        <div className="relative flex-1 rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100">
                          <Image
                            src={mainImage}
                            alt={day.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                          
                          {/* Day Overlay */}
                          <div className="absolute top-6 left-6">
                            <div className="px-5 py-2 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30">
                              <span className="text-white font-bold text-xl tracking-tighter uppercase leading-none">Day {(idx + 1).toString().padStart(2, '0')}</span>
                            </div>
                          </div>

                          <div className="absolute bottom-8 left-8 right-8">
                            <h4 className="text-white text-3xl font-bold tracking-tight leading-none mb-3 drop-shadow-lg">
                              {day.title}
                            </h4>
                            <div className="flex items-center gap-2 text-white/70">
                              <MapPin className="w-4 h-4" />
                              <span className="text-xs font-bold uppercase tracking-wider">Experience Featured</span>
                            </div>
                          </div>
                        </div>

                        {/* Summary Block */}
                        <div className="px-4">
                           <p className="text-slate-600 text-sm leading-relaxed font-medium line-clamp-3">
                             {day.description}
                           </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer - Progress & Navigation */}
              <div className="p-8 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Current Expedition</span>
                    <span className="text-slate-900 font-bold">{packageData?.title || "Signature Tour"}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                   <p className="text-slate-400 text-sm font-bold">Scroll to Explore →</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PackageExperiences;



