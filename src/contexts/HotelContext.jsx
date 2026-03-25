"use client";
import { createContext, useContext, useState } from "react";

const HotelContext = createContext();

export function HotelProvider({ hotels, children }) {
  const [allHotels, setAllHotels] = useState(hotels || []);
  const [isLoading, setIsLoading] = useState(true);

  const getHotel = (id) => {
    const hotel = allHotels.find((hotel) => hotel.id === id);
    return hotel;
  };

  const updateHotel = (id, hotel) => {
    setIsLoading(true);
    const updatedHotels = allHotels.map((h) => (h.id === id ? hotel : h));
    setAllHotels(updatedHotels);
    setIsLoading(false);
  };

  return (
    <HotelContext.Provider
      value={{
        allHotels,
        hotelIsLoading: isLoading,
        getHotel,
        updateHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export function useHotel() {
  const context = useContext(HotelContext);
  if (context === undefined) {
    throw new Error("useHotel must be used within a HotelProvider");
  }
  return context;
}
