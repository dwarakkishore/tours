"use client";
import React from "react";
import { Button } from "./button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const Incrementor = ({ initialValue, setCount, condition = true, min = 0 }) => {
  const handleIncrement = () => {
    if (condition) {
      setCount((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (condition && initialValue > min) {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center gap-4 rounded-full border-2 border-solid border-[#80A2D9] p-2">
      <Button
        className={cn(
          "flex !size-6 items-center justify-center rounded-full border-2 border-solid border-[#80A2D9] bg-transparent !p-0 text-[#80A2D9] shadow-none hover:bg-[#80A2D9] hover:text-white",
          {
            "!cursor-not-allowed": !condition,
          }
        )}
        onClick={handleDecrement}
      >
        <Minus />
      </Button>
      <span className="inline-block min-w-6 text-center">{initialValue}</span>
      <Button
        className={cn(
          "flex !size-6 items-center justify-center rounded-full border-2 border-solid border-[#80A2D9] bg-transparent !p-0 text-[#80A2D9] shadow-none hover:bg-[#80A2D9] hover:text-white",
          {
            "!cursor-not-allowed": !condition,
          }
        )}
        onClick={handleIncrement}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default Incrementor;
