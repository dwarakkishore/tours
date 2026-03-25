"use client";
import { useState, useEffect, useRef } from "react";

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Only run on client side after mount
    if (typeof window === 'undefined') return;
    
    // Check if splash screen has already been shown in this session
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      // Skip splash screen on subsequent page loads
      setShouldRender(false);
      return;
    }
    
    // Mark that splash screen has been shown
    sessionStorage.setItem('hasSeenSplash', 'true');
    
    // Add no-scroll class to prevent scrolling
    document.body.classList.add('no-scroll');
    document.documentElement.classList.add('no-scroll');
    
    // Ensure video plays when loaded
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        // If autoplay fails, hide splash after 1 second
        setTimeout(handleHideSplash, 1000);
      });
    }

    // If video doesn't load within 2 seconds, skip the splash screen
    const videoLoadTimeout = setTimeout(() => {
      if (!videoLoaded) {
        handleHideSplash();
      }
    }, 2000);

    // Safety timeout: hide splash screen after 6 seconds regardless of video state
    const safetyTimeout = setTimeout(() => {
      handleHideSplash();
    }, 6000);

    return () => {
      // ALWAYS remove no-scroll class when component unmounts
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
      clearTimeout(videoLoadTimeout);
      clearTimeout(safetyTimeout);
    };
  }, [videoLoaded]);

  const handleHideSplash = () => {
    // Remove no-scroll classes to re-enable scrolling
    document.body.classList.remove('no-scroll');
    document.documentElement.classList.remove('no-scroll');
    
    // Start fade out animation
    setIsVisible(false);
    
    // Remove from DOM after animation completes
    setTimeout(() => {
      setShouldRender(false);
    }, 500); // Match transition duration
  };

  if (!shouldRender) {
    // Ensure classes are removed even if component doesn't render
    if (typeof window !== 'undefined') {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    }
    return null;
  }

  return (
    <div 
      className={`fixed left-0 top-0 z-[1000] flex size-full items-center justify-center bg-black transition-opacity duration-500 overflow-hidden ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="relative w-full h-full">
        {/* Video Background - Full Screen */}
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          playsInline
          preload="auto"
          onLoadedData={() => {
            setVideoLoaded(true);
            videoRef.current?.play();
          }}
          onCanPlayThrough={() => {
            setVideoLoaded(true);
          }}
          onEnded={handleHideSplash}
        >
          <source src="/Splash-Screen.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default SplashScreen;
