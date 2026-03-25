"use client";
/**
 * @deprecated This loader is too heavy (Lottie animation) and slow to initialize.
 * Use route-level loading.jsx with skeleton screens instead for instant feedback.
 * This component should only be used for legacy compatibility if absolutely necessary.
 */
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => (
    <div className="flex size-96 items-center justify-center">
      <div className="size-16 animate-spin rounded-full border-4 border-gray-300 border-t-brand-blue"></div>
    </div>
  ),
});

const WebsiteLoader = () => {
  const [isClient, setIsClient] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    setIsClient(true);
    // Dynamically import the animation data on the client side
    import("@/animations/BV_Loading.json").then((data) => {
      setAnimationData(data.default);
    });
  }, []);

  if (!isClient || !animationData) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="flex size-96 items-center justify-center">
          <div className="size-16 animate-spin rounded-full border-4 border-gray-300 border-t-brand-blue"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="max-h-96 max-w-96">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};

export default WebsiteLoader;
