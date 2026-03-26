"use client";
import React, { useState, useRef } from "react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import EnquiryFormFields from "@/components/Forms/EnquiryForm/EnquiryFormFields";
import ConfirmationDialog from "@/components/Forms/EnquiryForm/ConfirmationDialog";
import useToggleState from "@/hooks/useToggleState";

const FALLBACK_DESTINATIONS = [
  {
    id: "fallback-1",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
    title: "Bali",
    subtitle: "Island of Gods",
    tag: "Tropical",
    link: "/packages/bali"
  },
  {
    id: "fallback-2",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800",
    title: "Vietnam",
    subtitle: "Timeless Charm",
    tag: "Culture",
    link: "/packages/vietnam"
  }
];

function SwipeCard({ card, onSwipe, isTop, index, exitDirection }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (_, info) => {
    const threshold = 80;
    const { offset } = info;
    
    if (Math.abs(offset.x) > Math.abs(offset.y)) {
      // Horizontal swipe
      if (Math.abs(offset.x) > threshold) {
        onSwipe(offset.x > 0 ? "right" : "left");
      }
    } else {
      // Vertical swipe
      if (Math.abs(offset.y) > threshold) {
        onSwipe(offset.y > 0 ? "down" : "up");
      }
    }
  };

  // Calculate stacking offset and rotation for back cards - more crossed/fanned
  const stackOffset = index * 12; // Vertical offset
  const stackOffsetX = index * 15; // Horizontal offset for crossed look
  const stackScale = 1 - index * 0.04; // Scale down back cards
  const stackRotate = index * -8; // More tilt for crossed effect

  // Exit animation based on direction
  const getExitAnimation = () => {
    const base = { opacity: 0, transition: { duration: 0.4 } };
    switch (exitDirection) {
      case "left": return { ...base, x: -500, y: 0, rotate: -45 };
      case "right": return { ...base, x: 500, y: 0, rotate: 45 };
      case "up": return { ...base, x: 0, y: -500, rotate: -10, scale: 0.8 };
      case "down": return { ...base, x: 0, y: 500, rotate: 10, scale: 0.8 };
      default: return { ...base, x: -500 };
    }
  };

  return (
    <motion.div
      className={`absolute w-full h-full ${isTop ? "cursor-grab active:cursor-grabbing" : ""}`}
      style={isTop ? { x, y, rotate, opacity } : {}}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      initial={false}
      animate={{ 
        scale: stackScale, 
        x: isTop ? 0 : stackOffsetX,
        y: isTop ? 0 : stackOffset, 
        rotate: isTop ? 0 : stackRotate,
        zIndex: 10 - index 
      }}
      exit={getExitAnimation()}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
        {/* Background Image */}
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        

        
        {/* Tag Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold">
            {card.tag}
          </span>
        </div>
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-3xl font-bold text-white mb-1">{card.title}</h3>
              <p className="text-white/80 flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {card.subtitle}
              </p>
            </div>
            <Link href={card.link || '#'} prefetch={false} className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md flex items-center gap-2 hover:bg-white/30 transition-all text-white text-sm font-semibold group">
              <span>View Deal</span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-brand-blue transition-colors">
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function InspirationSection({ theme = "default", initialDestinations = [] }) {
  const mappedCards = React.useMemo(() => {
    if (!initialDestinations || initialDestinations.length === 0) return FALLBACK_DESTINATIONS;
    
    return initialDestinations.map(region => ({
      id: region.id,
      image: region.featuredImage?.url || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
      title: region.name,
      subtitle: region.isDomestic ? "Domestic Gateway" : "International Escape",
      tag: region.isDomestic ? "Domestic" : "International",
      link: `/packages/${region.slug}`
    }));
  }, [initialDestinations]);

  const [cards, setCards] = useState(mappedCards);
  const [exitDirection, setExitDirection] = useState("left");
  const confirmationDialogControls = useToggleState();

  // Update cards when initialDestinations change (e.g. hydration)
  React.useEffect(() => {
    setCards(mappedCards);
  }, [mappedCards]);

  // Theme color configurations
  const themeColors = {
    default: {
      bg: "bg-gradient-to-br from-brand-blue/5 via-slate-50 to-white",
      orb: "bg-brand-blue/10",
      button: "gradient-btn",
      title: "text-brand-blue"
    },
    solo: {
      bg: "bg-[#0a0a0a] border-t border-[#222]",
      orb: "bg-[#FFD700]/10",
      button: "bg-[#FFD700] text-black hover:bg-white",
      title: "text-white"
    },
    romantic: {
      bg: "bg-gradient-to-br from-rose-50 to-white",
      orb: "bg-rose-500/10",
      button: "bg-gradient-to-r from-rose-400 to-rose-700",
      title: "text-rose-600"
    },
    elite: {
      bg: "bg-gradient-to-br from-slate-900 to-black",
      orb: "bg-amber-500/10",
      button: "bg-amber-500",
      title: "text-amber-500"
    },
    family: {
      bg: "bg-gradient-to-br from-orange-50 to-white",
      orb: "bg-orange-500/10",
      button: "bg-gradient-to-r from-orange-500 to-pink-500",
      title: "text-orange-600"
    },
    relax: {
      bg: "bg-gradient-to-br from-sage-50 to-white",
      orb: "bg-sage-400/10",
      button: "bg-stone-900 text-white hover:bg-stone-800",
      title: "text-stone-900",
      icon: "text-sage-600"
    },
    explore: {
      bg: "bg-gradient-to-br from-orange-50 to-white",
      orb: "bg-orange-500/10",
      button: "bg-gradient-to-r from-orange-400 to-orange-800",
      title: "text-orange-900"
    },
    exploration: {
      bg: "bg-gradient-to-br from-sand-50 to-white",
      orb: "bg-terra-500/10",
      button: "bg-charcoal",
      title: "text-terra-600"
    },
    religious: {
      bg: "bg-gradient-to-br from-burgundy-50 to-white",
      orb: "bg-gold-400/10",
      button: "bg-burgundy-600",
      title: "text-burgundy-700"
    },
    educational: {
      bg: "bg-gradient-to-br from-indigo-50 to-white",
      orb: "bg-amber-400/10",
      button: "bg-gradient-to-r from-indigo-950 to-indigo-800",
      title: "text-indigo-950"
    }
  };

  const colors = themeColors[theme] || themeColors.default;

  const handleSwipe = (direction) => {
    setExitDirection(direction);
    setTimeout(() => {
      setCards((prev) => {
        const newCards = [...prev];
        const swipedCard = newCards.shift();
        // Add the swiped card back to the end for infinite loop
        newCards.push(swipedCard);
        return newCards;
      });
    }, 50);
  };

  return (
    <section className={`relative ${colors.bg} overflow-hidden py-8 sm:py-10 lg:py-12`}>
      <ConfirmationDialog 
        controls={confirmationDialogControls}
        closeModal={() => confirmationDialogControls.close()}
      />
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-10 right-10 w-72 h-72 ${colors.orb} rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-10 left-10 w-72 h-72 ${colors.orb} rounded-full blur-3xl`}></div>
      </div>

      <Container className="relative z-10">
        {/* Mobile Header - Only visible on small screens */}
        <div className="lg:hidden text-center mb-8">
           <div className="section-badge-light mb-4 w-fit mx-auto">
            <Mail className="size-4" />
            <span>Get in Touch</span>
          </div>
          <h2 className="section-title-light">
            <span className={colors.title}>Let Us Inspire You</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          
          {/* Left - Swipable Cards */}
          <div className="flex flex-col items-center">
            <div className="relative w-72 h-96 sm:w-80 sm:h-[450px]">
              <AnimatePresence mode="popLayout">
                {cards.slice(0, 3).map((card, index) => (
                  <SwipeCard
                    key={card.id}
                    card={card}
                    index={index}
                    onSwipe={handleSwipe}
                    isTop={index === 0}
                    exitDirection={exitDirection}
                  />
                ))}
              </AnimatePresence>
            </div>
            
            {/* Desktop Control Buttons */}
            <div className="hidden sm:flex items-center gap-8 mt-8">
              {/* Skip Button */}
              <button 
                onClick={() => handleSwipe("left")}
                className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-all hover:scale-105 active:scale-95"
                title="Skip"
              >
                <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              
              {/* Like Button */}
              <button 
                onClick={() => handleSwipe("right")}
                className={`w-14 h-14 rounded-full ${colors.button} flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg text-white`}
                title="Like"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            
            {/* Mobile Swipe Hint */}
            <div className="sm:hidden mt-8 text-sm text-slate-500 flex items-center gap-2">
              <span>← Swipe to explore →</span>
            </div>
          </div>

          {/* Right - Newsletter Form */}
          <div className="text-center lg:text-left">
            {/* Desktop Badge - Hidden on Mobile Header */}
            <div className="hidden lg:inline-flex section-badge-light mb-6 w-fit">
              <Mail className="size-4" />
              <span>Get in Touch</span>
            </div>

            {/* Desktop Heading - Hidden on Mobile Header */}
            <h2 className="hidden lg:block section-title-light mb-4">
              <span className={colors.title}>Let Us Inspire You</span>
            </h2>

            {/* Description */}
            <p className="section-subtitle-light mb-8 max-w-md mx-auto lg:mx-0 hidden md:block">
              Share your contact details and our travel experts will help you plan your dream vacation.
            </p>

            {/* Form */}
            <div className="max-w-md mx-auto lg:mx-0 mb-4">
              <EnquiryFormFields 
                formType="potential"
                variant="inspiration"
                hideFields={["destination"]}
                onSuccess={() => confirmationDialogControls.open()}
                buttonColor={colors.button}
              />
            </div>

            {/* Trust Text */}
            <p className="text-sm text-slate-500 flex items-center gap-1.5 justify-center lg:justify-start">
              <svg className={cn("w-4 h-4", colors.icon || "text-green-500")} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
