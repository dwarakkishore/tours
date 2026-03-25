"use client";
import React from "react";
import Image from "next/image";
import { Pagination, Navigation } from "swiper/modules";
import { v4 as uuidv4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const ExplorationCard = ({ item }) => {
  const searchParams = useSearchParams();
  const isGroupPackage = searchParams.get("group") === "true";

  // Construct the link URL with the group parameter if it exists
  const linkUrl = isGroupPackage
    ? `/packages/${item.region}?group=true`
    : `/packages/${item.region}`;

  return (
    <Link href={linkUrl}>
      <article className="sm:hoverable-card overflow-hidden rounded bg-[#E5ECF7]">
        <div className="h-[420px] w-full overflow-hidden rounded">
          {item.cardImages.filter((ele) => ele?.url).length > 0 ? (
            <Swiper
              className="group h-full"
              modules={[Navigation, Pagination]}
              loop={item.cardImages?.length > 1 && item.cardImages?.length <= 3}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{
                clickable: true,
                el: ".swiper-pagination",
                bulletClass:
                  "swiper-pagination-bullet custom-bullet !size-1.5 !rounded-full !mx-0.5",
                bulletActiveClass:
                  "swiper-pagination-bullet-active custom-bullet-active",
              }}
            >
              {item.cardImages
                .filter((ele) => ele?.url)
                .map((ele) => (
                  <SwiperSlide key={uuidv4()}>
                    <div className="relative h-[420px]">
                      <div className="size-full">
                        <Image
                          alt="Todo"
                          src={ele.url}
                          height={384}
                          width={300}
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

              <div className="swiper-button-prev !h-4 !w-4 !rounded-full !bg-white !text-black !shadow-md after:!text-sm">
                <ChevronLeftIcon className="!size-4" />
              </div>
              <div className="swiper-button-next !h-4 !w-4 !rounded-full !bg-white !text-black !shadow-md after:!text-sm">
                <ChevronRightIcon className="!size-4" />
              </div>

              {/* Custom Pagination Container */}
              <div
                className={cn(
                  "group-hover:opacity-100 opacity-100 sm:opacity-0 transition-opacity duration-300 swiper-pagination whitespace-nowrap !bottom-3 !w-auto !left-1/2 !transform !-translate-x-1/2 max-h-3 flex items-center justify-center px-1 !py-1.5 shadow-xl !bg-white !rounded-full",
                  {
                    "!opacity-0": item.cardImages?.length <= 1,
                  }
                )}
              ></div>
            </Swiper>
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100">
              <p className="text-gray-500">No images available</p>
            </div>
          )}
        </div>
        <div className=" p-6">
          <h4 className="text-lg font-bold text-brand-blue capitalize">
            {item.region}
          </h4>
        </div>
      </article>
    </Link>
  );
};

export default ExplorationCard;
