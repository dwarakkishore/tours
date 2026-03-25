"use client";
import Image from "next/image";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./button";
import Link from "next/link";
import { ArrowUpRight, MoveLeft, MoveRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const trendingData = [
  {
    id: uuidv4(),
    destination: "Vietnam",
    description:
      "With its stunning landscapes, vibrant culture, and unforgettable flavours, Vietnam offers an extraordinary blend of beauty, history, and adventure.",
    img: "/img/trending/trending-1.jpg",
    href: "/packages/vietnam",
  },
  {
    id: uuidv4(),
    destination: "Kerala",
    description:
      "Discover Kerala, where tranquil backwaters meet lush landscapes and vibrant culture. It’s the perfect place to unwind, explore, and soak in the natural charm of ‘God’s Own Country’!",
    img: "/img/trending/trending-2.jpg",
    href: "/packages/kerala",
  },
  {
    id: uuidv4(),
    destination: "Thailand",
    description:
      "From bustling cities to serene beaches and ancient temples, Thailand offers a captivating mix of experiences for every traveler.!",
    img: "/img/trending/trending-3.jpg",
    href: "/packages/thailand",
  },
  {
    id: uuidv4(),
    destination: "Singapore & Malaysia",
    description:
      "Experience the perfect blend of vibrant cities, breathtaking landscapes, and rich traditions in Malaysia, where every journey is a new adventure.",
    img: "/img/trending/trending-4.jpg",
    href: "/packages/singapore-malaysia",
  },
  {
    id: uuidv4(),
    destination: "Andaman",
    description:
      "Escape to the Andamans, where turquoise waters kiss white sandy shores and adventures await at every turn. It’s paradise found, with sun, sea, and serenity all in one!",
    img: "/img/trending/trending-5.jpg",
    href: "/packages/andaman",
  },
];

const fadeUpVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// const fadeRightVariants = {
//   initial: { opacity: 0, x: 20 },
//   animate: { opacity: 1, x: 0 },
//   exit: { opacity: 0, x: -20 },
// };

// const fadeLeftVariants = {
//   initial: { opacity: 0, x: -20 },
//   animate: { opacity: 1, x: 0 },
//   exit: { opacity: 0, x: 20 },
// };

const Trending = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const activeItem = trendingData[activeIndex];
  const previousItem = trendingData[previousIndex];

  const handleNext = () => {
    setPreviousIndex(activeIndex);
    setActiveIndex((prev) => (prev === trendingData.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setPreviousIndex(activeIndex);
    setActiveIndex((prev) => (prev === 0 ? trendingData.length - 1 : prev - 1));
  };

  const handleSetActiveItem = (item) => {
    setPreviousIndex(activeIndex);
    const newIndex = trendingData.findIndex(
      (dataItem) => dataItem.id === item.id
    );
    setActiveIndex(newIndex);
  };

  const inactiveItems = trendingData.filter(
    (_, index) => index !== activeIndex
  );

  return (
    <div className="grid gap-4 c-lg:grid-cols-[2fr_1fr] c-lg:gap-8">
      <article className="relative grid overflow-hidden rounded-3xl bg-brand-blue c-lg:h-full c-lg:grid-cols-[55%_1fr]">
        <div className="relative h-[300px] overflow-hidden rounded-3xl rounded-b-none c-lg:h-full c-lg:rounded-b-3xl">
          {/* Previous image that stays static */}
          <div className="absolute inset-0">
            <Image
              src={previousItem.img}
              alt={previousItem.destination}
              width={700}
              height={500}
              className="size-full object-cover"
            />
          </div>

          {/* New image that animates in */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute inset-0 origin-left"
            >
              <Image
                src={activeItem.img}
                alt={activeItem.destination}
                width={700}
                height={500}
                className="size-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex flex-col items-start p-8">
          <div className="flex w-full justify-between text-sm uppercase">
            <AnimatePresence mode="wait">
              <motion.span
                key={activeItem.id + "-trending"}
                variants={fadeUpVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35 }}
                className="text-[#59DF02]"
              >
                #{activeIndex + 1} Trending
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="mb-4 mt-auto text-white">
            <AnimatePresence mode="wait">
              <motion.h4
                key={activeItem.id + "-title"}
                variants={fadeUpVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35 }}
                className="relative mb-4 inline-block text-2xl font-bold uppercase after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-[70%] after:translate-y-1 after:bg-brand-blue after:content-['']"
              >
                {activeItem.destination}
              </motion.h4>
              <motion.p
                key={activeItem.id + "-desc"}
                variants={fadeUpVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                {activeItem.description}
              </motion.p>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id + "-button"}
              variants={fadeUpVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, delay: 0.35 }}
            >
              <Button
                asChild
                className="mb-5 rounded-full bg-brand-blue px-8 py-7 text-white hover:bg-brand-blue-hovered"
              >
                <Link
                  href={activeItem.href}
                  className="flex items-center gap-2"
                >
                  <span>Explore</span>
                  <ArrowUpRight className="size-5" />
                </Link>
              </Button>
            </motion.div>
          </AnimatePresence>
          <div className="flex w-full justify-end gap-4">
            <Button
              className="aspect-square h-[36px] rounded-full border border-white bg-transparent p-0 text-white hover:bg-white hover:text-brand-blue"
              onClick={handlePrev}
            >
              <MoveLeft />
            </Button>
            <Button
              className="aspect-square h-[36px] rounded-full border border-white bg-transparent p-0 text-white hover:bg-white hover:text-brand-blue"
              onClick={handleNext}
            >
              <MoveRight />
            </Button>
          </div>
        </div>
      </article>
      <div className="grid h-full grid-cols-2 gap-4 c-sm:grid-cols-4 c-lg:grid-flow-row c-lg:grid-cols-1 c-lg:grid-rows-4 c-lg:gap-8">
        {inactiveItems.map((item) => (
          <article
            key={item.id}
            className="relative flex h-full min-h-32 cursor-pointer items-center overflow-hidden rounded-2xl bg-gray-400 p-2 c-lg:p-8"
            onClick={() => handleSetActiveItem(item)}
          >
            <div className="absolute left-0 top-0 size-full bg-black">
              <Image
                src={item.img}
                alt={item.destination}
                width={700}
                height={500}
                className="size-full object-cover opacity-60"
              />
            </div>
            <div className="relative z-10 flex h-full flex-1 flex-col-reverse  items-start justify-start c-lg:flex-row c-lg:items-center c-lg:justify-between">
              <span className="text-sm text-white c-md:text-xl">
                {item.destination}
              </span>
              <span className="rounded-full text-[10px] uppercase text-white c-md:bg-white c-md:p-2 c-md:text-xs c-md:text-brand-blue">
                #{trendingData.indexOf(item) + 1} Trending
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Trending;
