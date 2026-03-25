"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => null, // No loading state needed for this component
});

const WaveAnimation = ({ packageData }) => {
  const [isClient, setIsClient] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    setIsClient(true);
    // Dynamically import the animation data on the client side
    import("@/animations/wave-animation-new.json").then((data) => {
      setAnimationData(data.default);
    });
  }, []);

  return (
    <div className="relative rounded bg-gradient-to-r from-[#0146B3] via-[#01317E] to-[#0146B3] p-6 c-xl:p-12">
      <div className="relative z-20">
        <h3 className="mb-4 text-base font-medium uppercase text-white sm:text-lg">
          Book Your <span>{packageData.region}</span> Adventure Today!
        </h3>
        {packageData?.footer_description && (
          <p className="text-white opacity-70">
            {packageData?.footer_description}
          </p>
        )}
      </div>
      {isClient && animationData && (
        <div className="absolute left-0 top-0 z-10 hidden size-full items-center justify-center c-lg:flex">
          <Lottie animationData={animationData} loop />
        </div>
      )}
    </div>
  );
};

export default WaveAnimation;
