"use client";

import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import "swiper/css";

const loginSliderData = [
  {
    id: uuidv4(),
    title: "Building the future...",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: uuidv4(),
    title: "Slide 2 title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: uuidv4(),
    title: "Slider 3 title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const LoginSlider = () => {
  return (
    <Swiper
      modules={[Autoplay, A11y]}
      autoplay={{
        delay: 7000,
        disableOnInteraction: false, // This ensures autoplay continues even after user interaction
      }}
      loop
      className="mx-auto w-full max-w-screen-sm"
    >
      {loginSliderData.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="text-white">
            <h4 className="mb-4 text-3xl font-bold uppercase">
              {item.title}
            </h4>
            <p>{item.description}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default LoginSlider;
