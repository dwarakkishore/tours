// components/PackageListing/PriceRangeSlider.tsx
"use client";

import { useEffect, useState } from "react";
import * as Slider from "@radix-ui/react-slider";

export const PriceRangeSlider = ({ min, max, onPriceChange, resetKey }) => {
  const [range, setRange] = useState([min, max]);

  // Reset the slider when resetKey changes
  useEffect(() => {
    setRange([min, max]);
  }, [resetKey, min, max]);

  // Ensure min is never less than 1 and max is never less than min
  const handleChange = (newRange) => {
    const adjustedMin = Math.max(1, Math.min(newRange[0], newRange[1] - 1000));
    const adjustedMax = Math.max(adjustedMin + 1000, newRange[1]);
    setRange([adjustedMin, adjustedMax]);
    onPriceChange(adjustedMin, adjustedMax);
  };

  return (
    <div className="pb-2 pt-4">
      <Slider.Root
        className="relative flex h-5 w-full touch-none select-none items-center"
        value={range}
        max={100000}
        min={1}
        step={1000}
        minStepsBetweenThumbs={1}
        onValueChange={handleChange}
      >
        <Slider.Track className="relative h-[3px] grow rounded-full bg-gray-200">
          <Slider.Range className="absolute h-full rounded-full bg-blue-600" />
        </Slider.Track>

        <Slider.Thumb
           
          className="block size-5 rounded-full border-2 border-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
          aria-label="Min price"
        />
        <Slider.Thumb
           
          className="block size-5 rounded-full border-2 border-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
          aria-label="Max price"
        />
      </Slider.Root>
    </div>
  );
};
