"use client";
import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCheckout } from "@/contexts/CheckoutContext"; // Import the context hook

const SpecialOccasion = () => {
  const { specialOccasion, setSpecialOccasion } = useCheckout(); // Access context state and setter

  // Handlers to update the context directly
  const handleDateChange = (date) => {
    setSpecialOccasion((prev) => ({
      ...prev,
      date, // Update the date in context
    }));
  };

  const handleOccasionChange = (occasion) => {
    setSpecialOccasion((prev) => ({
      ...prev,
      occasion, // Update the occasion in context
    }));
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#0146B3] to-[#0063FF] p-6 text-white">
      <h4 className="mb-4 inline-block border-b border-[#59DF02] font-semibold uppercase">
        special occasion
      </h4>
      <p className="mb-4 text-sm">Let us create something special for you</p>
      <div className="mb-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal w-full bg-white text-[#5C5C5C] rounded-2xl text-base py-7"
              )}
            >
              {specialOccasion.date ? (
                format(new Date(specialOccasion.date), "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto !size-6" strokeWidth={1.5} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="rounded-2xl p-0" align="start">
            <Calendar
              mode="single"
              selected={specialOccasion.date}
              onSelect={handleDateChange} // Update date in context
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Select onValueChange={handleOccasionChange}>
        {" "}
        {/* Update occasion in context */}
        <SelectTrigger className="rounded-2xl py-7 text-base text-[#5C5C5C]">
          <SelectValue placeholder="What's the occasion?" />
        </SelectTrigger>
        <SelectContent className="rounded-2xl p-4">
          <SelectGroup>
            <SelectItem className="rounded-xl py-3" value="birthday">
              Birthday
            </SelectItem>
            <SelectItem className="rounded-xl py-3" value="anniversary">
              Anniversary
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SpecialOccasion;
