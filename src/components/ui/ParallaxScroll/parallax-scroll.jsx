"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

import Image from "next/image";
import { cn } from "@/lib/utils";

export const ParallaxScroll = ({ images, className, onBannerImgUrl }) => {
  const gridRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false); // State to track hover pause
  const { scrollYProgress } = useScroll({
    container: gridRef, // remove this if your container is not fixed height
    offset: ["start start", "end start"], // remove this if your container is not fixed height
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const second = Math.ceil(images.length / 2);

  const firstPart = images.slice(0, second);
  const secondPart = images.slice(second, -1);

  useEffect(() => {
    const container = gridRef.current;
    if (!container) return;

    let rafId;
    let lastTime = 0;
    const scrollSpeed = 60; // Pixels per second

    // Cache dimensions to avoid forced reflows in the loop
    let clientHeight = container.clientHeight;
    let scrollHeight = container.scrollHeight;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        clientHeight = entry.target.clientHeight;
        scrollHeight = entry.target.scrollHeight;
      }
    });
    resizeObserver.observe(container);

    const step = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = (timestamp - lastTime) / 1000;
      lastTime = timestamp;

      if (!isPaused && container) {
        container.scrollTop += scrollSpeed * deltaTime;

        // Reset scroll position when reaching the bottom
        // Use cached values
        if (container.scrollTop + clientHeight >= scrollHeight) {
          container.scrollTop = 0;
        }
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div
      className={cn(
        "h-[500px] items-start overflow-y-auto w-full parallax-gallery",
        className
      )}
      ref={gridRef}
      onMouseEnter={handleMouseEnter} // Pause on hover
      onMouseLeave={handleMouseLeave} // Resume on leave
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-5 px-5 c-xxl:grid-cols-2">
        <div className="grid gap-5">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{ y: translateFirst, aspectRatio: "1 / 1" }}
              key={"grid-1" + idx}
            >
              <Image
                onClick={() => onBannerImgUrl(el.url)}
                src={el.url}
                className="!m-0 size-full cursor-pointer rounded object-cover !p-0"
                height="400"
                width="400"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-5">
          {secondPart.map((el, idx) => (
            <motion.div
              style={{ y: translateSecond, aspectRatio: "1 / 1" }}
              key={"grid-2" + idx}
            >
              <Image
                onClick={() => onBannerImgUrl(el.url)}
                src={el.url}
                className="!m-0 size-full cursor-pointer rounded object-cover !p-0"
                height="400"
                width="400"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
