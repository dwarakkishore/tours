"use client";
import { useState } from "react";
import Container from "../ui/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const ItineraryHeroMobile = ({ packageData }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const validBannerImages = packageData?.bannerImages?.filter(
    (image) => image && image?.url !== null
  );

  return (
    <section className="relative z-20 min-h-[40vh] pb-10 pt-24 c-sm:min-h-[60vh] c-xl:hidden">
      <Container>
        <div className="mb-4 flex flex-col items-start gap-2 c-lg:flex-row c-lg:items-center c-lg:justify-between">
          <h1 className="max-w-screen-c-md text-2xl  font-bold leading-[130%] text-white c-xl:text-5xl">
            {packageData?.packageTitle}
          </h1>
          <div className="shrink-0 rounded bg-brand-blue px-4 py-2 text-white">
            <h4 className="font-semibold">
              {packageData?.days} Days & {packageData?.nights} Nights
            </h4>
          </div>
        </div>
        <div className="mt-6 c-lg:mt-12 c-xl:mt-0 rounded border-2 border-solid border-[#A8BFE2] bg-[#A8BFE2]/20 p-1">
          <Swiper
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
              bulletClass:
                "swiper-pagination-bullet custom-bullet !size-1.5 !rounded-full !mx-0.5",
              bulletActiveClass:
                "swiper-pagination-bullet-active custom-bullet-active",
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mb-4"
          >
            <div className="swiper-button-prev !h-4 !w-4 !rounded-full !bg-white !text-black !shadow-md after:!text-sm">
              <ChevronLeftIcon className="!size-4" />
            </div>
            <div className="swiper-button-next !h-4 !w-4 !rounded-full !bg-white !text-black !shadow-md after:!text-sm">
              <ChevronRightIcon className="!size-4" />
            </div>
            {validBannerImages.map((ele) => (
              <SwiperSlide key={uuidv4()}>
                <div className="h-[200px] overflow-hidden rounded">
                  <Image
                    width={1000}
                    height={200}
                    alt={ele?.title || "Banner Image"}
                    className="size-full object-cover"
                    src={ele?.url}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {validBannerImages.map((ele) => (
              <SwiperSlide key={uuidv4()}>
                <div className="aspect-square overflow-hidden rounded">
                  <Image
                    width={1000}
                    height={500}
                    alt={ele?.title || "Banner Image"}
                    className="size-full object-cover"
                    src={ele?.url}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default ItineraryHeroMobile;
