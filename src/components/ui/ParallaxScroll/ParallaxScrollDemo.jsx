"use client";
import { ParallaxScroll } from "./parallax-scroll";

export function ParallaxScrollDemo({ images, onBannerImgUrl }) {
  return <ParallaxScroll onBannerImgUrl={onBannerImgUrl} images={images} />;
}
