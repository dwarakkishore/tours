"use client";

import React from "react";
import { Input } from "../ui/input";
import { CircleHelp } from "lucide-react";
import CitySelector from "../ui/CitySelector";
import { useCheckout } from "@/contexts/CheckoutContext";

const BookingDetails = () => {
  const { bookingDetails, setBookingDetails, departureCity, setDepartureCity } =
    useCheckout();
  const { fullname, contact, email } = bookingDetails;

  const handleInputChange = (field, value) => {
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  return (
    <div className="relative grid min-h-10 content-start gap-4 rounded-2xl border border-solid border-[#D9D9D9] p-6 pt-10">
      <h5 className="absolute left-6 top-0 inline-block -translate-y-1/2 bg-white px-3 font-bold uppercase text-brand-blue">
        booking details
      </h5>

      <div className="relative">
        <Input
          className="rounded-2xl border border-solid border-[#B0B0B0] bg-[#F2F2F2] p-4 pr-20 text-[#616161]"
          type="text"
          value={fullname}
          onChange={(e) => handleInputChange("fullname", e.target.value)}
        />
        <CircleHelp
          className="absolute right-6 top-1/2 -translate-y-1/2"
          stroke="#616161"
          strokeWidth={1.5}
        />
      </div>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A7A7A7]">
          +91
        </span>
        <Input
          className="rounded-2xl border border-solid border-[#B0B0B0] bg-[#F2F2F2] py-4 pl-14 pr-20 text-[#616161]"
          type="text"
          value={contact}
          onChange={(e) => handleInputChange("contact", e.target.value)}
        />
        <CircleHelp
          className="absolute right-6 top-1/2 -translate-y-1/2"
          stroke="#616161"
          strokeWidth={1.5}
        />
      </div>
      <div className="relative">
        <Input
          className="rounded-2xl border border-solid border-[#B0B0B0] bg-[#F2F2F2] p-4 pr-20 text-[#616161]"
          type="email"
          value={email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
        <CircleHelp
          className="absolute right-6 top-1/2 -translate-y-1/2"
          stroke="#616161"
          strokeWidth={1.5}
        />
      </div>
      <div className="relative">
        <CitySelector
          onSelect={setDepartureCity}
          selectedCity={departureCity}
        />
      </div>
    </div>
  );
};

export default BookingDetails;
