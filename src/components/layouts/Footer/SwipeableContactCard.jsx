"use client";

import { useState, useRef, useEffect } from "react";

const SwipeableContactCard = ({ 
  href, 
  iconType,
  title, 
  description, 
  subtext, 
  color,
  bgColor,
  actionLabel,
  external = false 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  // Detect if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragPosition(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const touchX = touch.clientX - containerRect.left;
    const sliderWidth = 60;
    const maxScroll = containerRect.width - sliderWidth - 20;
    
    let newPosition = Math.max(0, Math.min(touchX - sliderWidth / 2, maxScroll));
    setDragPosition(newPosition);

    if (newPosition > maxScroll * 0.8) {
      setIsCompleted(true);
      setTimeout(() => {
        window.location.href = href;
      }, 200);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (!isCompleted) {
      setDragPosition(0);
    }
  };

  const handleMouseDown = (e) => {
    if (!isMobile) return;
    setIsDragging(true);
    setDragPosition(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isMobile) return;
    
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const mouseX = e.clientX - containerRect.left;
    const sliderWidth = 60;
    const maxScroll = containerRect.width - sliderWidth - 20;
    
    let newPosition = Math.max(0, Math.min(mouseX - sliderWidth / 2, maxScroll));
    setDragPosition(newPosition);

    if (newPosition > maxScroll * 0.8) {
      setIsCompleted(true);
      setTimeout(() => {
        window.location.href = href;
      }, 200);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (!isCompleted) {
      setDragPosition(0);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isCompleted, isMobile]);

  // Render icon based on type
  const renderIcon = (className) => {
    switch (iconType) {
      case 'phone':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'whatsapp':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        );
      case 'email':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const completionPercentage = containerRef.current 
    ? (dragPosition / (containerRef.current.offsetWidth - 80)) * 100 
    : 0;

  // Desktop: Simple button design
  if (!isMobile) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group relative rounded-xl border border-white/10 overflow-hidden bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-white/30 block"
      >
        <div className="p-4 border-b border-white/10">
          <div className="flex items-start gap-3">
            <div className={`${bgColor}/20 p-2.5 rounded-lg flex-shrink-0 group-hover:${bgColor}/30 transition-colors`}>
              {renderIcon(`w-5 h-5 ${color}`)}
            </div>
            <div className="flex-1 min-w-0">
              <h6 className="font-semibold text-white text-sm mb-0.5">{title}</h6>
              <p className="text-white/80 text-xs font-medium truncate">{description}</p>
              {subtext && <p className="text-white/50 text-xs mt-0.5">{subtext}</p>}
            </div>
          </div>
        </div>
        
        <div className={`p-4 ${bgColor}/10 group-hover:${bgColor}/20 transition-colors`}>
          <div className="flex items-center justify-center gap-2 text-white font-semibold text-sm">
            {renderIcon("w-5 h-5")}
            <span>{actionLabel} Now</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </a>
    );
  }

  // Mobile: Slide to call design
  return (
    <div className="relative rounded-xl border border-white/10 overflow-hidden">
      {/* Info Section - Hidden on mobile, shown on desktop */}
      <div className="hidden md:block bg-white/5 p-4 border-b border-white/10">
        <div className="flex items-start gap-3">
          <div className={`${bgColor}/20 p-2.5 rounded-lg flex-shrink-0`}>
            {renderIcon(`w-5 h-5 ${color}`)}
          </div>
          <div className="flex-1 min-w-0">
            <h6 className="font-semibold text-white text-sm mb-0.5">{title}</h6>
            <p className="text-white/80 text-xs font-medium truncate">{description}</p>
            {subtext && <p className="text-white/50 text-xs mt-0.5">{subtext}</p>}
          </div>
        </div>
      </div>

      {/* Slide to Call Section */}
      <div 
        ref={containerRef}
        className="relative bg-white/5 p-3 select-none cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Track */}
        <div className={`relative h-14 ${bgColor}/20 rounded-full overflow-hidden`}>
          {/* Progress Fill */}
          <div 
            className={`absolute inset-y-0 left-0 ${bgColor} transition-all duration-200`}
            style={{ width: `${completionPercentage}%`, opacity: 0.3 }}
          />
          
          {/* Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-white/60 text-sm font-semibold">
              {isCompleted ? `${actionLabel}ing...` : `slide to ${actionLabel.toLowerCase()}`}
            </span>
          </div>

          {/* Slider Button with Animation */}
          <div
            className={`
              absolute top-1 left-1 w-12 h-12 ${bgColor} rounded-full 
              flex items-center justify-center shadow-lg 
              transition-transform duration-200 
              ${isDragging ? 'scale-110' : 'scale-100'}
              ${!isDragging ? 'animate-slide-hint' : ''}
            `}
            style={{ 
              transform: `translateX(${dragPosition}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out'
            }}
            onMouseDown={handleMouseDown}
          >
            {renderIcon("w-6 h-6 text-white")}
            {!isDragging && (
              <div className="absolute -right-1 top-1/2 -translate-y-1/2">
                <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes slide-hint {
          0%, 100% {
            transform: translateX(0px);
          }
          25% {
            transform: translateX(20px);
          }
          50% {
            transform: translateX(0px);
          }
        }
        .animate-slide-hint {
          animation: slide-hint 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SwipeableContactCard;


