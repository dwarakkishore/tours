import * as React from "react";
import { useState } from "react";
import { Search } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import cityData from "../../data/cityData";

// Sample city data - you can replace this with your actual data import

const RenderDistricts = ({ item, searchQuery }) => {
  const filteredDistricts = item.districts.filter((district) =>
    district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredDistricts.length === 0) return null;

  return filteredDistricts.map((district) => (
    <SelectItem
      className="rounded-xl py-4 text-[#616161] hover:bg-white"
      key={district}
      value={district}
    >
      {district}
    </SelectItem>
  ));
};

const CitySelector = ({
  data = cityData,
  onSelect,
  selectedCity,
  placeholder = "Departure City *",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  const handleSearch = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    e.stopPropagation(); // Prevent select component from handling keyboard events
  };

  const handleValueChange = (value) => {
    onSelect(value);
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      value={selectedCity}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="rounded-2xl border border-solid border-[#B0B0B0] px-4 py-7 text-base text-[#616161]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="rounded-2xl border border-solid border-[#B0B0B0]">
        <div
          className="flex items-center space-x-2 px-3 py-2"
          onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling to select
        >
          <Search className="size-4 text-gray-500" />
          <Input
            placeholder="Search cities..."
            value={searchQuery}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()} // Prevent losing focus on click
            className="h-8 border-none bg-transparent focus:ring-0"
            autoComplete="off" // Prevent browser autocomplete from interfering
          />
        </div>
        <div className="max-h-60 overflow-y-auto">
          {data.map((item) => {
            const hasMatchingDistricts = item.districts.some((district) =>
              district.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (!hasMatchingDistricts) return null;

            return (
              <SelectGroup key={item.state}>
                <SelectLabel>{item.state}</SelectLabel>
                <RenderDistricts item={item} searchQuery={searchQuery} />
              </SelectGroup>
            );
          })}
        </div>
      </SelectContent>
    </Select>
  );
};

export default CitySelector;
