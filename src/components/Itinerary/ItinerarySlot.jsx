"use client";
import RichTextRenderer from "../RichTextRenderer";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { cn } from "@/lib/utils";

const processArray = (inputArray) => {
  // Return null if input is not an array
  if (!Array.isArray(inputArray)) {
    return null;
  }

  // Get first three elements
  const firstThree =
    inputArray.length <= 3 ? [...inputArray] : inputArray.slice(0, 3);

  // Check if array length is greater than 3
  const hasMore = inputArray.length > 3;

  // Get remaining elements (empty if length <= 3)
  const remaining = hasMore ? inputArray.slice(3) : [];

  return {
    firstThree,
    hasMore,
    remaining,
  };
};

const ItinerarySlot = ({ itinerary }) => {
  const results = processArray(itinerary.imageRefs);

  return (
    <div className="mb-8">
      <div className="mb-6">
        {<RichTextRenderer text={itinerary.description} />}
      </div>
      <div className="relative h-[240px] max-w-[calc(100vw-106px)] overflow-hidden rounded-xl bg-slate-200 c-sm:h-[260px] c-sm:max-w-[calc(100vw-176px)] c-md:h-[280px] c-md:max-w-[calc(100vw-205px)] c-lg:h-[300px] c-lg:max-w-[calc(100vw-245px)] c-xl:h-[320px] c-xl:max-w-[calc(100vw-401px)] c-xxl:max-w-[calc(1280px-693px)] c-xxxl:max-w-[calc(1400px-694px)]">
        {itinerary.imageRefs.length === 1 && (
          <>
            <Image
              className="size-full object-cover"
              src={itinerary.imageRefs[0].url}
              alt={itinerary.imageRefs[0].title}
              fill
            />

            <div className="absolute left-0 top-0 block size-full bg-black/20"></div>
            <span className="absolute bottom-4 left-4 max-w-[250px] font-semibold text-white sm:text-xl">
              {itinerary.imageRefs[0].title}
            </span>
          </>
        )}
        {itinerary.imageRefs.length > 1 && (
          <Swiper
            className="h-full"
            modules={[Navigation, Pagination]}
            navigation
            loop
            pagination={{ clickable: true }}
            // onSwiper={(swiper) => setTotalSlides(swiper.slides.length)}
            // onSlideChange={(swiper) => setActiveIndex(swiper.realIndex + 1)}
          >
            {itinerary.imageRefs.map((item) => (
              <SwiperSlide key={uuidv4()}>
                <Image
                  className="size-full object-cover"
                  src={item.url}
                  alt={item.title}
                  fill
                />
                <div className="itinarary-gradient absolute left-0 top-0 block size-full"></div>
                <span className="absolute bottom-4 left-4 max-w-[250px] font-semibold text-white sm:text-xl">
                  {item.title}
                </span>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {/* {itinerary.imageRefs.length > 1 && (
          <div className="absolute bottom-4 left-1/2 z-50 grid w-16 -translate-x-1/2 grid-cols-[1fr_min-content_1fr] rounded-full bg-white/50 p-1 text-center text-xs font-semibold text-neutral-900">
            <span>{activeIndex}</span> / <span>{totalSlides}</span>
          </div>
        )} */}
        <div
          className={cn("absolute bottom-4 right-4 z-50 flex", {
            "right-8": !results.hasMore,
          })}
        >
          {itinerary.imageRefs.length > 1 &&
            results.firstThree.map((item) => (
              <span
                key={uuidv4()}
                className="-mr-4 inline-block size-10 overflow-hidden rounded-full border border-solid border-white bg-slate-200"
              >
                <Image
                  src={item.url}
                  alt={item.title}
                  width={40}
                  height={40}
                  className="size-full object-cover"
                />
              </span>
            ))}

          {results.hasMore && (
            <span className="flex size-10 items-center justify-center rounded-full border border-solid border-brand-blue bg-slate-200 font-medium text-brand-blue">
              +{results.remaining.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItinerarySlot;
