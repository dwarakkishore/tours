"use client";
import { ChevronLeftIcon, ChevronRightIcon, MapPin, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useHotel } from "@/contexts/HotelContext";
import Link from "next/link";

export default function HotelCard() {
  const { allHotels } = useHotel();
  const [places, setPlaces] = useState([]);
  const [hotelsByPlace, setHotelsByPlace] = useState({});
  const [activeHotels, setActiveHotels] = useState({});
  const prevIndexRef = useRef({});
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (allHotels?.length > 0) {
      // Extract unique places (full objects, not just IDs)
      const uniquePlaces = allHotels.reduce((acc, hotel) => {
        const existingPlace = acc.find((place) => place.id === hotel.place.id);
        if (!existingPlace) {
          acc.push(hotel.place);
        }
        return acc;
      }, []);

      setPlaces(uniquePlaces);

      // Group hotels by place and then by star category
      const hotelsByPlace = uniquePlaces.reduce((acc, place) => {
        const placeHotels = allHotels.filter(
          (hotel) => hotel.place.id === place.id
        );

        // Group by star category
        const byStarCategory = {
          "3_STAR": placeHotels.filter((hotel) => hotel.type === "3_STAR"),
          "4_STAR": placeHotels.filter((hotel) => hotel.type === "4_STAR"),
          "5_STAR": placeHotels.filter((hotel) => hotel.type === "5_STAR"),
        };

        acc[place.id] = byStarCategory;
        return acc;
      }, {});

      setHotelsByPlace(hotelsByPlace);

      // Add a slight delay for the initial animation
      setTimeout(() => {
        setIsInitialRender(false);
      }, 300);
    }
  }, [allHotels]);

  const getStarRating = (type) => {
    const stars = parseInt(type.split("_")[0]);
    return Array.from({ length: stars }, (_, index) => (
      <Star key={index} className="size-3 fill-current text-white" />
    ));
  };

  return (
    <div
      className={`m-4 mt-12 max-h-[75vh] overflow-y-auto px-6 transition-opacity duration-500 ${isInitialRender ? "opacity-0" : "opacity-100"}`}
    >
      {places.map((place, placeIndex) => (
        <div
          key={`place-${placeIndex}-${place.id}`}
          className={`mb-10 transition-all duration-500 ease-out${
            isInitialRender
              ? "translate-y-10 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
          style={{ transitionDelay: `${placeIndex * 150}ms` }}
        >
          <h2 className="mb-4 text-2xl font-bold capitalize text-[#6A7282]">
            {place.name}
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {Object.entries(hotelsByPlace[place.id]).map(
              ([starCategory, hotels], categoryIndex) =>
                hotels.length > 0 && (
                  <div
                    key={starCategory}
                    className={`relative overflow-hidden transition-all duration-500 ease-out${
                      isInitialRender
                        ? "translate-y-10 opacity-0"
                        : "translate-y-0 opacity-100"
                    }`}
                    style={{
                      transitionDelay: `${(placeIndex * 3 + categoryIndex + 1) * 150}ms`,
                    }}
                  >
                    <Swiper
                      className="group h-44 w-full"
                      modules={[Navigation, Pagination, EffectFade, Autoplay]}
                      navigation={{
                        nextEl: `.next-${place.id}-${starCategory}`,
                        prevEl: `.prev-${place.id}-${starCategory}`,
                      }}
                      pagination={{
                        clickable: true,
                        el: `.pagination-${place.id}-${starCategory}`,
                        bulletClass:
                          "swiper-pagination-bullet custom-bullet !w-1.5 !h-1.5 !rounded-full !mx-0.5",
                        bulletActiveClass:
                          "swiper-pagination-bullet-active custom-bullet-active",
                      }}
                      effect="fade"
                      fadeEffect={{ crossFade: true }}
                      speed={400}
                      onSlideChange={(swiper) => {
                        const activeSlideIndex = swiper.activeIndex;
                        const activeHotel = hotels[activeSlideIndex];

                        prevIndexRef.current[`${place.id}-${starCategory}`] =
                          activeSlideIndex;

                        if (activeHotel) {
                          // First set current hotel name to slide out upward
                          setActiveHotels((prev) => {
                            const current = prev[`${place.id}-${starCategory}`];
                            if (!current) return prev;

                            return {
                              ...prev,
                              [`${place.id}-${starCategory}`]: {
                                ...current,
                                animating: true,
                                direction: "out",
                              },
                            };
                          });

                          // Then after a short delay, update to the new hotel
                          setTimeout(() => {
                            setActiveHotels((prev) => ({
                              ...prev,
                              [`${place.id}-${starCategory}`]: {
                                name: activeHotel.name,
                                type: `${starCategory.replace("_", " ")} hotel`,
                                animating: true,
                                direction: "in",
                              },
                            }));

                            // Finally remove animation state
                            setTimeout(() => {
                              setActiveHotels((prev) => ({
                                ...prev,
                                [`${place.id}-${starCategory}`]: {
                                  ...prev[`${place.id}-${starCategory}`],
                                  animating: false,
                                },
                              }));
                            }, 300);
                          }, 200);
                        }
                      }}
                      onInit={(swiper) => {
                        // Initialize with first hotel
                        if (hotels.length > 0) {
                          setActiveHotels((prev) => ({
                            ...prev,
                            [`${place.id}-${starCategory}`]: {
                              name: hotels[0].name,
                              type: `${starCategory.replace("_", " ")} hotel`,
                              animating: false,
                            },
                          }));
                        }
                      }}
                    >
                      {hotels.map((hotel) => (
                        <SwiperSlide key={hotel.id}>
                          <Link
                            href={hotel?.googleUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative size-full"
                          >
                            {hotel.images && hotel.images[0] && (
                              <Image
                                alt={hotel.name || "Hotel"}
                                src={hotel.images[0]}
                                width={400}
                                height={500}
                                className="size-full rounded-lg object-cover"
                              />
                            )}
                            <div className="absolute left-2 top-2">
                              <div className="flex gap-0.5 rounded border-white bg-brand-blue px-2 py-0.5 text-xs text-white">
                                {getStarRating(hotel.type)}
                              </div>
                            </div>
                            <div className="absolute right-2 top-2">
                              <div className="rounded-full bg-brand-blue p-1">
                                <MapPin className="size-4 rounded-full text-white" />
                              </div>
                            </div>
                          </Link>
                        </SwiperSlide>
                      ))}
                      <div
                        className={`swiper-button-prev !h-6 !w-6 !rounded-full !bg-white !text-black !shadow-md after:!text-xs`}
                      >
                        <ChevronLeftIcon className="!size-3" />
                      </div>
                      <div
                        className={`swiper-button-next !h-6 !w-6 !rounded-full !bg-white !text-black !shadow-md after:!text-xs`}
                      >
                        <ChevronRightIcon className="!size-3" />
                      </div>
                      <div
                        className={`swiper-pagination !bottom-2 !left-1/2 flex !w-auto !-translate-x-1/2 !transform items-center justify-center !rounded-full !bg-white/70 !py-1 px-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                      ></div>
                    </Swiper>

                    <div>
                      <div className="relative h-7 overflow-hidden">
                        <h3
                          className={`absolute w-full text-lg font-medium transition-all duration-300 ${
                            activeHotels[`${place.id}-${starCategory}`]
                              ?.animating
                              ? activeHotels[`${place.id}-${starCategory}`]
                                  ?.direction === "out" &&
                                "-translate-y-full opacity-0"
                              : isInitialRender
                                ? "translate-y-full opacity-0"
                                : "translate-y-0 opacity-100"
                          }`}
                        >
                          {activeHotels[`${place.id}-${starCategory}`]?.name ||
                            (hotels.length > 0 ? hotels[0].name : "Hotel Name")}
                        </h3>
                      </div>
                      <p
                        className={`text-xs text-gray-500 transition-opacity duration-300 ${
                          activeHotels[`${place.id}-${starCategory}`]?.animating
                            ? "opacity-0"
                            : "opacity-100"
                        }`}
                      >
                        {activeHotels[`${place.id}-${starCategory}`]?.type ||
                          `${starCategory.replace("_", " ")} hotel`}
                      </p>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
