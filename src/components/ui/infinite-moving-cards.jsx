"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Star, Quote, X } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

const Card = React.memo(({ item }) => {
  const [showFullText, setShowFullText] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 });

  const rectRef = useRef(null);

  function handleMouseEnter({ currentTarget }) {
    rectRef.current = currentTarget.getBoundingClientRect();
  }

  function handleMouseMove({ clientX, clientY }) {
    if (!rectRef.current) return;
    const { left, top, width, height } = rectRef.current;
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    x.set(clientX - centerX);
    y.set(clientY - centerY);

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleMouseLeave() {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  }

  return (
    <>
      <motion.li
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative w-[280px] sm:w-[320px] md:w-[380px] min-h-[200px] flex-shrink-0 cursor-default"
      >
        {/* Dynamic Border Spotlight */}
        <motion.div
          className="hidden md:block pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100 z-10"
          style={{
            background: useTransform(
                [mouseX, mouseY],
                ([mx, my]) => `radial-gradient(400px circle at ${mx}px ${my}px, rgba(34, 211, 238, 0.4), transparent 80%)`
            ),
          }}
        />

        {/* Main Card Content */}
        <div 
          style={{ transform: "translateZ(30px)" }}
          className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-2xl transition-all duration-500 group-hover:bg-slate-900 group-hover:border-white/20"
        >
          {/* Animated background glow - Desktop Only */}
          <div className="hidden md:block absolute -top-16 -right-16 w-32 h-32 bg-cyan-500/10 blur-[40px] group-hover:bg-cyan-500/20 transition-colors duration-700" />

          <div className="relative flex flex-col h-full justify-between gap-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                 <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="size-3.5 fill-cyan-400 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                    />
                  ))}
                </div>
                <Quote className="size-6 text-white/5" />
              </div>

              {/* Testimonial Text - TRUNCATED TO 3 LINES */}
              <div className="relative space-y-2">
                <p className="text-base text-white/90 font-medium leading-relaxed italic font-poppins line-clamp-3">
                  &quot;{item.text}&quot;
                </p>
                {item.text.length > 100 && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFullText(true);
                    }}
                    className="text-cyan-400 text-xs font-bold hover:underline underline-offset-4 tracking-wider uppercase transition-all"
                  >
                    Read More
                  </button>
                )}
              </div>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <div className="relative size-12 rounded-full overflow-hidden border-2 border-cyan-500/20 group-hover:border-cyan-400 transition-all duration-500">
                <Image
                  fill
                  alt={item.author_name || "Traveler"}
                  src={item.profile_photo_url}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm tracking-tight">
                  {item.author_name}
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-cyan-400 font-bold">
                   Verified Explorer
                 </span>
              </div>
            </div>
          </div>
        </div>
      </motion.li>

      {/* FULL TEXT MODAL */}
      <AnimatePresence>
        {showFullText && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/90 md:bg-slate-950/80 backdrop-blur-none md:backdrop-blur-md"
            onClick={() => setShowFullText(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-lg w-full bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowFullText(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <X className="size-5 text-white" />
              </button>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative size-14 rounded-full overflow-hidden border-2 border-cyan-400">
                    <Image
                      fill
                      alt={item.author_name || "Traveler"}
                      src={item.profile_photo_url}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-lg">{item.author_name}</span>
                    <span className="text-xs uppercase tracking-widest text-cyan-400">Verified Explorer</span>
                  </div>
                </div>

                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-4 fill-cyan-400 text-cyan-400" />
                  ))}
                </div>

                <p className="text-white/80 text-lg leading-relaxed italic font-poppins">
                  &quot;{item.text}&quot;
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}) => {
  const [start, setStart] = useState(false);
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  useEffect(() => {
    setStart(true);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
      
      const duration = speed === "fast" ? "40s" : speed === "normal" ? "80s" : "160s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  }, [direction, speed]);

  const duplicatedItems = React.useMemo(() => {
    if (!items || items.length === 0) return [];
    const minItems = 8; 
    let result = [...items];
    while (result.length < minItems) {
       result = [...result, ...items];
    }
    return [...result, ...result];
  }, [items]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)] py-10",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-8 md:gap-12 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {duplicatedItems.map((item, idx) => (
          <Card key={`${item.author_name}-${idx}`} item={item} />
        ))}
      </ul>
    </div>
  );
};

