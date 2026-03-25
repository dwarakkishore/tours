// components/PackageListing/Filter.tsx
"use client";
import { useState, useEffect } from "react";
import { PriceRangeSlider } from "./PriceRangeSlider";

export const DesktopFilters = ({
  filterData,
  onFilterChange,
  currentFilters,
}) => {
  const [minPrice, setMinPrice] = useState(
    currentFilters.priceRange[0].toString()
  );
  const [maxPrice, setMaxPrice] = useState(
    currentFilters.priceRange[1].toString()
  );
  const [selectedDuration, setSelectedDuration] = useState(
    currentFilters.duration
  );
  const [selectedThemes, setSelectedThemes] = useState(currentFilters.themes);
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    const defaultFilters = {
      priceRange: [1, 50000],
      duration: [],
      themes: [],
    };
    setMinPrice("1");
    setMaxPrice("50000");
    setSelectedDuration([]);
    setSelectedThemes([]);
    setResetKey((prev) => prev + 1);
    onFilterChange(defaultFilters);
  };

  const handlePriceChange = (min, max) => {
    setMinPrice(min.toString());
    setMaxPrice(max.toString());
    onFilterChange({ priceRange: [min, max] });
  };

  const handleMinPriceInput = (value) => {
    const numValue = parseInt(value) || 1;
    const maxValue = parseInt(maxPrice) || 50000;

    if (numValue >= 1) {
      if (numValue < maxValue) {
        setMinPrice(numValue.toString());
        onFilterChange({ priceRange: [numValue, maxValue] });
      } else {
        const newMin = maxValue - 1000;
        setMinPrice(newMin.toString());
        onFilterChange({ priceRange: [newMin, maxValue] });
      }
    } else {
      setMinPrice("1");
      onFilterChange({ priceRange: [1, maxValue] });
    }
  };

  const handleMaxPriceInput = (value) => {
    const numValue = parseInt(value) || 50000;
    const minValue = parseInt(minPrice) || 1;

    if (numValue > minValue) {
      setMaxPrice(numValue.toString());
      onFilterChange({ priceRange: [minValue, numValue] });
    } else {
      const newMax = minValue + 1000;
      setMaxPrice(newMax.toString());
      onFilterChange({ priceRange: [minValue, newMax] });
    }
  };

  const handleDurationChange = (durationId, checked) => {
    const newDuration = checked
      ? [...selectedDuration, durationId]
      : selectedDuration.filter((id) => id !== durationId);
    setSelectedDuration(newDuration);
    onFilterChange({ duration: newDuration });
  };

  const handleThemeChange = (themeId, checked) => {
    const newThemes = checked
      ? [...selectedThemes, themeId]
      : selectedThemes.filter((id) => id !== themeId);
    setSelectedThemes(newThemes);
    onFilterChange({ themes: newThemes });
  };

  useEffect(() => {
    setMinPrice(currentFilters.priceRange[0].toString());
    setMaxPrice(currentFilters.priceRange[1].toString());
    setSelectedDuration(currentFilters.duration);
    setSelectedThemes(currentFilters.themes);
  }, [currentFilters]);

  return (
    <div className="w-full rounded-lg bg-white text-[16px] md:w-[280px]">
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="text-base font-medium">Filter By</h3>
        <button
          onClick={handleReset}
          className="  text-blue-600 hover:text-blue-700"
        >
          Reset All
        </button>
      </div>

      <div className="border-b p-4">
        <h4 className="  mb-4 font-medium">Price Range Per Person</h4>
        <div className="mb-4 flex items-center gap-4">
          <div className="relative">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => handleMinPriceInput(e.target.value)}
              min="1"
              placeholder="Min"
              className="w-full rounded-md border py-2 pl-6 pr-2  "
            />
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
              ₹
            </span>
          </div>
          <div className="relative">
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => handleMaxPriceInput(e.target.value)}
              placeholder="Max"
              className="w-full rounded-md border py-2 pl-6 pr-2  "
            />
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
              ₹
            </span>
          </div>
        </div>
        <PriceRangeSlider
          min={parseInt(minPrice)}
          max={parseInt(maxPrice)}
          onPriceChange={handlePriceChange}
          resetKey={resetKey}
        />
      </div>

      <div className="border-b p-4">
        <h4 className="  mb-4 font-medium">Duration</h4>
        <div className="space-y-3">
          {filterData.duration.map((duration) => (
            <label key={duration.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedDuration.includes(duration.id)}
                onChange={(e) =>
                  handleDurationChange(duration.id, e.target.checked)
                }
                className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-600">{duration.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h4 className="mb-4 font-medium">Theme</h4>
        <div className="space-y-3">
          {filterData.theme.map((theme) => (
            <label key={theme.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedThemes.includes(theme.id)}
                onChange={(e) => handleThemeChange(theme.id, e.target.checked)}
                className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="  text-gray-600">{theme.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
