"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Heart, Share2, MapPin, ArrowRight, X, Volume2, VolumeX, Maximize2, SkipForward } from "lucide-react";
import Container from "../ui/Container";
import Image from "next/image";
import Link from "next/link";

const EMPTY_ARRAY = [];

const ExpandableText = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > 150;

  return (
    <div className="flex flex-col items-start gap-1">
      <p className={`text-slate-600 text-sm md:text-base leading-relaxed font-semibold transition-all ${!isExpanded ? "line-clamp-3 md:line-clamp-none" : ""}`}>
        {text}
      </p>
      {shouldTruncate && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="text-blue-500 text-xs font-bold uppercase tracking-wider md:hidden hover:text-blue-600 mt-1"
        >
          {isExpanded ? "READ LESS" : "READ MORE"}
        </button>
      )}
    </div>
  );
};

const ProfilePhoto = ({ src, alt, initials }) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      unoptimized
      onError={() => setHasError(true)}
    />
  );
};

export default function RegionTestimonials({ initialReviews = EMPTY_ARRAY, regionName = "" }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [isLoading, setIsLoading] = useState(initialReviews.length === 0);
  const hasFetched = useRef(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoDuration, setVideoDuration] = useState(15); // Default estimate
  const [selectedReviewImages, setSelectedReviewImages] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.5, once: false });

  // Curated video reviews for the Vlogger Spotlight - Using CDN-hosted videos
  const videoReviews = [
    {
      video: "https://cdn.bayardvacations.com/images/1770431608093-WhatsApp_Video_2026-02-07_at_07.53.19.mp4"
    },
    {
      video: "https://cdn.bayardvacations.com/images/1770431558286-WhatsApp_Video_2026-02-07_at_07.53.16.mp4"
    },
    {
      video: "https://cdn.bayardvacations.com/images/1770431512177-WhatsApp_Video_2026-02-07_at_07.53.12.mp4"
    },
    {
      video: "https://cdn.bayardvacations.com/images/1770431463081-WhatsApp_Video_2026-02-07_at_07.53.07.mp4"
    },
    {
      video: "https://cdn.bayardvacations.com/images/1770431392630-WhatsApp_Video_2026-02-07_at_07.52.58.mp4"
    },
    {
      video: "https://cdn.bayardvacations.com/images/1770431339559-WhatsApp_Video_2026-02-07_at_07.52.51.mp4"
    },
    {
      video: "https://cdn.bayardvacations.com/images/1770431289628-WhatsApp_Video_2026-02-07_at_07.52.45.mp4"
    },
    {
      video: "https://cdn.bayardvacations.com/images/1770431291373-WhatsApp_Video_2026-02-07_at_07.52.37.mp4"
    },
    {
      video: "https://cdn.bayardvacations.com/images/1770431059091-WhatsApp_Video_2026-02-07_at_07.52.14.mp4"
    },
    {
      video: "https://cdn.bayardvacations.com/images/1770430970236-WhatsApp_Video_2026-02-07_at_07.52.08.mp4"
    },
    {
      video: "https://cdn.bayardvacations.com/images/1770430880516-WhatsApp_Video_2026-02-07_at_07.52.01.mp4"
    }
  ];

  const fallbackReviews = [
    {
      author_name: "Sarah Mitchell",
      text: `Our trip ${regionName ? `to ${regionName} ` : ""}was absolutely flawless. The itinerary was perfectly balanced between culture and adventure.`,
      relative_time_description: "2m ago",
      rating: 5,
      images: [
        "https://images.unsplash.com/photo-1523438097204-5447bcad5ce7?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1565024108848-6a3628e83348?q=80&w=400&auto=format&fit=crop"
      ]
    },
    {
      author_name: "James Wilson",
      text: "Bayard Vacations truly understands luxury travel. Every detail was handled with precision and care.",
      relative_time_description: "5m ago",
      rating: 5
    },
    {
      author_name: "Elena Rodriguez",
      text: "Bayard Vacations truly understands luxury travel. Every detail was handled with precision and care.",
      relative_time_description: "12m ago",
      rating: 5,
      images: [
        "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518134454641-523c6c19208a?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1527018601619-a508a2fe0261?q=80&w=400&auto=format&fit=crop"
      ]
    },
    {
      author_name: "David Chen",
      text: "Professional service from start to finish. The booking process was simple, and the support teammate was always available.",
      relative_time_description: "18m ago",
      rating: 5
    },
    {
      author_name: "Aisha Khan",
      text: "A truly immersive cultural experience. The culinary tour in Sheki was a highlight—the Piti and Halva were unforgettable.",
      relative_time_description: "25m ago",
      rating: 5,
      images: [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400&auto=format&fit=crop"
      ]
    },
    {
      author_name: "Robert Taylor",
      text: "Best family vacation ever! Our kids loved the interactive museums in Baku and the cable cars in the mountains.",
      relative_time_description: "40m ago",
      rating: 5
    },
    {
      author_name: "Michael Scott",
      text: "The organization was top-notch. I didn't have to worry about a single thing during the whole 10-day tour.",
      relative_time_description: "1h ago",
      rating: 5
    },
    {
      author_name: "Linda Thompson",
      text: "Incredible views in Shusha. The history is so rich and the locals are the most hospitable people I've met.",
      relative_time_description: "2h ago",
      rating: 5,
      images: [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400&auto=format&fit=crop"
      ]
    }
  ];

  const videoRef = useRef(null);
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => setIsPlaying(false));
        }
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Auto-advance logic - REMOVED fixed timer
  // Now relying on onEnded event on the video element
  // keeping this cleaner
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => setIsPlaying(false));
      }
    }
  }, [activeVideoIndex]);

  // Handle Play/Pause based on viewport visibility and popup state
  useEffect(() => {
    if (videoRef.current) {
      if (isInView && !showVideoPopup) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => setIsPlaying(false));
          setIsPlaying(true);
        }
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isInView, activeVideoIndex, showVideoPopup]); // Trigger when view changes or video changes

  useEffect(() => {
    if (initialReviews.length > 0 || hasFetched.current) return;

    hasFetched.current = true;
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.reviews?.length > 0) {
            setReviews(data.reviews);
          }
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, [initialReviews]);

  const displayReviews = reviews.length > 0 ? reviews : fallbackReviews;
  const scrollingReviews = [...displayReviews, ...displayReviews, ...displayReviews];

  const nextVideo = () => {
    setActiveVideoIndex((prev) => (prev + 1) % videoReviews.length);
  };

  const prevVideo = () => {
    setActiveVideoIndex((prev) => (prev - 1 + videoReviews.length) % videoReviews.length);
  };

  return (
    <section 
      ref={containerRef}
      className="relative bg-gradient-to-br from-[#012a6b] via-[#001b4d] to-[#012a6b] pt-8 pb-8 md:pt-16 md:pb-24 lg:min-h-[750px] overflow-x-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-brand-light-cyan/20 rounded-full blur-[120px]"></div>
      </div>

      <Container className="relative z-10 h-full flex flex-col lg:justify-center">
        {/* Section Header */}
        <div className="mb-4 md:mb-12 text-center lg:text-left">
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Guest <span className="text-blue-400">Stories</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base font-medium mt-2 truncate md:whitespace-normal">Real experiences shared by our globetrotters</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start w-full">
          
          {/* Left Side: Vlogger Spot Review Spotlight (25%) */}
          <div className="lg:w-[25%] w-full relative shrink-0">
            <div 
              className="relative h-[65vh] lg:h-[60vh] max-h-[650px] aspect-[9/16] mx-auto rounded-[2rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] bg-slate-900 border-none group cursor-pointer"
              onClick={togglePlay}
            >
              
              {/* Story Progress Bars */}
              <div className="absolute top-3 inset-x-4 z-50 flex gap-1">
                {videoReviews.map((_, i) => (
                  <div key={i} className="flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                      initial={{ width: "0%" }}
                      animate={{ width: i === activeVideoIndex ? "100%" : i < activeVideoIndex ? "100%" : "0%" }}
                      transition={{ duration: i === activeVideoIndex ? videoDuration : 0, ease: "linear" }}
                    />
                  </div>
                ))}
              </div>

                  <div className="absolute inset-0">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    muted={isMuted}
                    autoPlay
                    playsInline
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={nextVideo}
                    onLoadedMetadata={(e) => setVideoDuration(e.currentTarget.duration)}
                  >
                    <source src={videoReviews[activeVideoIndex].video} type="video/mp4" />
                  </video>
                  
                  {/* Video Controls Overlay */}
                  <div className="absolute bottom-20 right-4 z-50 flex flex-col gap-2 pointer-events-auto">
                    {/* Next Video Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextVideo();
                      }}
                      className="p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 transition-colors"
                      title="Next Video"
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>

                    {/* Full Screen Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowVideoPopup(true);
                      }}
                      className="p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 transition-colors"
                      title="Full Screen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>

                    {/* Mute/Unmute Button */}
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  {/* Play/Pause Indicator Overlay */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] z-20">
                      <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center"
                      >
                        <svg className="w-8 h-8 text-white fill-white translate-x-1" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </motion.div>
                    </div>
                  )}


                  </div>

              {/* Navigation Zones */}
              <div className="absolute inset-y-0 left-0 w-16 z-40 cursor-pointer pointer-events-auto" onClick={(e) => { e.stopPropagation(); prevVideo(); }}></div>
              <div className="absolute inset-y-0 right-0 w-16 z-40 cursor-pointer pointer-events-auto" onClick={(e) => { e.stopPropagation(); nextVideo(); }}></div>
            </div>
          </div>

          {/* Right Side: Scrollable comment stream (75%) */}
          <div className="lg:flex-1 w-full relative">
            <div className="w-full h-[500px] lg:h-[60vh] relative overflow-y-auto overscroll-y-auto simple-scrollbar mt-6 lg:mt-0 px-4">
            


            <div className="flex flex-col gap-6 py-4">
              {displayReviews.map((review, index) => {
                const authorName = review.author || review.author_name || "Guest";
                return (
                <div 
                  key={index}
                  className="group flex gap-3 md:gap-4 items-start bg-white p-4 md:p-5 rounded-[2rem] transition-all duration-300 mx-0 md:mx-4 max-w-full md:max-w-[90%] self-start even:self-end even:flex-row-reverse even:text-right border border-slate-100"
                >
                  <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden shrink-0 border border-slate-200 shadow-lg">
                    <ProfilePhoto 
                      src={review.profile_photo_url} 
                      alt={authorName} 
                      initials={authorName.charAt(0)} 
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 group-even:flex-row-reverse">
                      <h4 className="text-slate-900 text-[11px] font-bold tracking-wider uppercase">{authorName}</h4>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">{review.relative_time_description}</span>
                    </div>
                    
                    <ExpandableText text={review.text} />
                    
                    <div className="flex gap-0.5 group-even:justify-end">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>

                    {/* Optional Review Images */}
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mt-2 overflow-x-auto pb-1 no-scrollbar group-even:flex-row-reverse group-even:justify-start">
                        {review.images.map((img, i) => (
                          <div 
                            key={i} 
                            className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-sm cursor-pointer hover:border-blue-400 transition-colors"
                            onClick={() => {
                              setSelectedReviewImages(review.images);
                              setCurrentImageIndex(i);
                            }}
                          >
                            <Image
                              src={img}
                              alt={`Review image ${i + 1}`}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                );
              })}
            </div>

            </div>
            
            {/* Participation Banner */}
            <div className="w-full mt-6 md:mt-10 lg:mt-12 relative z-30">
              {/* Desktop Banner with Text */}
              <div className="hidden md:flex bg-blue-600/90 backdrop-blur-md rounded-full px-8 py-4 items-center justify-between gap-4 shadow-2xl shadow-blue-900/40 border border-white/10 max-w-4xl mx-auto">
                <div className="text-center md:text-left">
                  <span className="text-white text-[10px] font-bold uppercase tracking-[0.35em] block mb-0.5">Authentic Experiences</span>
                  <p className="text-white/80 text-sm font-medium leading-snug">Join 25,000+ happy travelers who explored {regionName || "the world"} with us.</p>
                </div>
                <Link 
                  href="/reviews"
                  className="bg-white text-blue-600 text-[13px] font-bold px-6 py-3 rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg flex items-center gap-2"
                >
                  Read All Reviews <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Mobile Button Only */}
              <div className="md:hidden px-4">
                <Link 
                  href="/reviews"
                  className="w-full bg-white text-blue-600 text-[13px] font-bold px-6 py-3 rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                >
                  Read All Reviews <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </Container>

      {/* Full Image Preview Modal */}
      <AnimatePresence>
        {selectedReviewImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10"
            onClick={() => setSelectedReviewImages(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute -top-12 right-0 md:top-4 md:right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[110]"
                onClick={() => setSelectedReviewImages(null)}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Arrows */}
              {selectedReviewImages.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-[110]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => (prev === 0 ? selectedReviewImages.length - 1 : prev - 1));
                    }}
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-[110]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => (prev === selectedReviewImages.length - 1 ? 0 : prev + 1));
                    }}
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>

                  {/* Dot Indicators */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedReviewImages.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === currentImageIndex ? "bg-white w-6" : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              <div className="relative w-full h-full">
                <Image
                  src={selectedReviewImages[currentImageIndex]}
                  alt="Review preview"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Video Modal */}
      <AnimatePresence>
        {showVideoPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] flex items-center justify-center bg-black p-0 md:p-10"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full max-w-4xl mx-auto flex items-center justify-center"
            >
              <button
                className="absolute top-4 right-4 z-[120] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
                onClick={() => setShowVideoPopup(false)}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[120] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  prevVideo();
                }}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[120] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  nextVideo();
                }}
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              <video
                key={`popup-${activeVideoIndex}`}
                className="w-full h-full object-contain md:rounded-2xl shadow-2xl"
                autoPlay
                controls
                playsInline
                loop
                muted={false} // Popups are usually meant for listening
              >
                <source src={videoReviews[activeVideoIndex].video} type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
