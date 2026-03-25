"use client";
import React, { useMemo } from "react";
import { Calendar } from "../ui/calendar";
import { TriangleAlert } from "lucide-react";
import { useCheckout } from "@/contexts/CheckoutContext";

const DepartureDate = () => {
  const { departureDate, setDepartureDate } = useCheckout();

  const dateConstraints = useMemo(() => {
    const today = new Date();

    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 7);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 90);

    return { minDate, maxDate };
  }, []);

  const getErrorMessage = (selectedDate) => {
    if (!selectedDate) return null;

    if (selectedDate < dateConstraints.minDate) {
      return "Earliest you can book is one week from today";
    }

    if (selectedDate > dateConstraints.maxDate) {
      return "You can only book packages up to 90 days in advance";
    }

    return null;
  };

  const handleOnSelect = (selectedDate) => {
    setDepartureDate(selectedDate);
  };

  const formatDate = (date) => {
    if (!date) return null;

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);
    const day = date.getDate();
    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });

    return {
      monthYear: `${month}'${year}`,
      day,
      weekday,
    };
  };

  const formattedDate = departureDate ? formatDate(departureDate) : null;
  const errorMessage = getErrorMessage(departureDate);

  return (
    <div className="relative grid min-h-10 gap-4 rounded-2xl border border-solid border-[#D9D9D9] p-6 pt-10">
      <h5 className="absolute left-6 top-0 inline-block -translate-y-1/2 bg-white px-3 font-bold uppercase text-brand-blue">
        departure date
      </h5>
      <div className="flex gap-5">
        <Calendar
          mode="single"
          selected={departureDate}
          onSelect={handleOnSelect}
          disabled={(date) =>
            date < dateConstraints.minDate || date > dateConstraints.maxDate
          }
          className="w-[250px] rounded-md border shadow"
        />
        {formattedDate && (
          <div className="flex flex-col">
            <span>{formattedDate.monthYear}</span>
            <span className="text-4xl font-bold">{formattedDate.day}</span>
            <span className="text-xs">{formattedDate.weekday}</span>
          </div>
        )}
      </div>
      {errorMessage && (
        <div className="mt-4 flex gap-2 rounded-xl bg-red-100 px-4 py-2 text-xs text-red-500">
          <TriangleAlert className="size-4" />
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default DepartureDate;
