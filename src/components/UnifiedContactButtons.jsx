"use client";

import { useState, useEffect, useRef } from "react";
import { Bot, X, MessageCircle, MessageSquare } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
const ChatbotPopup = dynamic(() => import("./ChatbotPopup"), { ssr: false });
import WhatsAppIconAsset from "@/assets/whatsapp_icon.svg";
import { cn } from "@/lib/utils";

export default function UnifiedContactButtons() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);
  const [isActuallyDragging, setIsActuallyDragging] = useState(false);
  const isDraggingRef = useRef(false);

  const revealTimerRef = useRef(null);
  const hideTimerRef = useRef(null);

  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

  useEffect(() => {
    // Show tooltip and menu after 2 seconds to educate the user
    revealTimerRef.current = setTimeout(() => {
      if (!isChatOpen) {
        setIsMenuOpen(true);
        setShowTooltip(true);
      }
    }, 2000);

    // Auto-close the menu after 8 seconds if the user hasn't interacted
    hideTimerRef.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 8000);

    const updateConstraints = () => {
      setDragConstraints({
        left: -window.innerWidth + 80,
        right: 0,
        top: -window.innerHeight + 80,
        bottom: 0
      });
    };
    
    updateConstraints();

    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 300; 
      setIsNearFooter(scrollPosition > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateConstraints);
    handleScroll(); 

    return () => {
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateConstraints);
    };
  }, [isChatOpen]);

  const toggleMenu = () => {
    if (isDraggingRef.current) return;
    
    // Clear auto-hide timer if user manually interacts
    if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) setShowTooltip(false);
  };

  const openChat = () => {
    setIsChatOpen(true);
    setIsMenuOpen(false);
    setShowTooltip(false);
  };

  return (
    <>
    <motion.div
      animate={{ 
        opacity: (isNearFooter && !isActuallyDragging) ? 0 : 1,
        y: (isNearFooter && !isActuallyDragging) ? 40 : 0
      }}
      className="fixed bottom-6 right-4 z-[9999] pointer-events-none w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
      style={{ touchAction: "none" }}
    >
      <motion.div
        drag
        onDragStart={() => { 
          isDraggingRef.current = true;
          setIsActuallyDragging(true);
        }}
        onDragEnd={() => {
          setTimeout(() => { 
            isDraggingRef.current = false;
            setIsActuallyDragging(false);
          }, 50);
        }}
        dragConstraints={dragConstraints}
        dragElastic={0}
        dragMomentum={false}
        dragTransition={{ power: 0, timeConstant: 0 }}
        className="pointer-events-auto flex items-center justify-center w-full h-full"
        style={{ willChange: isActuallyDragging ? "transform" : "auto" }}
      >
        {/* Expanded Menu Actions - Circular Fan-out Radiating from Center */}
        <AnimatePresence>
          {isMenuOpen && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* WhatsApp Option */}
              <motion.a
                href="https://wa.me/919187563136"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact us on WhatsApp"
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                animate={{ opacity: 1, x: -75, y: -25, scale: 1 }}
                exit={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                className="pointer-events-auto absolute flex items-center justify-center group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform active:scale-95 border-2 border-white">
                  <Image src={WhatsAppIconAsset} alt="WhatsApp" width={24} height={24} className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <span className="absolute bottom-full mb-3 bg-slate-900 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  WhatsApp
                </span>
              </motion.a>

              {/* Chatbot Option */}
              <motion.button
                onClick={openChat}
                aria-label="Open AI Chatbot"
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                animate={{ opacity: 1, x: -25, y: -75, scale: 1 }}
                exit={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                transition={{ delay: 0.05 }}
                className="pointer-events-auto absolute flex items-center justify-center group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-110 transition-transform active:scale-95 border-2 border-white">
                  <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <span className="absolute bottom-full mb-3 bg-slate-900 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Ask Mira
                </span>
              </motion.button>
            </div>
          )}
        </AnimatePresence>

        {/* Welcome Tooltip */}
        <AnimatePresence>
          {showTooltip && !isMenuOpen && !isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="pointer-events-auto absolute bottom-full right-0 mb-6 cursor-default z-10"
            >
              <div className="bg-white rounded-[1.5rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-blue-50 w-[220px] sm:w-[260px] relative">
                <button 
                  onClick={() => setShowTooltip(false)}
                  aria-label="Close tooltip"
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-lg border border-gray-100 hover:bg-gray-50 transition-colors text-gray-400 hover:text-gray-600 z-20"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="flex gap-3.5 items-center">
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <Bot className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[14px] font-bold text-slate-900 leading-none tracking-tight">I'm Mira!</p>
                    <p className="text-[11px] text-slate-500 leading-tight font-medium">How can I help you today?</p>
                  </div>
                </div>
                {/* Arrow - Aligned to button center */}
                <div className="absolute top-full right-6 sm:right-8 -mt-2 w-4 h-4 bg-white border-r border-b border-blue-50 rotate-45" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Trigger Button */}
        <button
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close contact menu" : "Open contact menu"}
          className="pointer-events-auto group relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center"
        >
          {/* Animated background glow when closed */}
          {!isMenuOpen && (
            <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse" />
          )}
          
          <div className={`relative w-full h-full rounded-full shadow-2xl transition-all duration-500 flex items-center justify-center ${
            isMenuOpen 
              ? "bg-slate-900 rotate-90" 
              : "bg-gradient-to-br from-brand-blue via-blue-600 to-indigo-600 hover:scale-110 active:scale-95"
          }`}>
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>
        </motion.div>
      </motion.div>
      <ChatbotPopup isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
