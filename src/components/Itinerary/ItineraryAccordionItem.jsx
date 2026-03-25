import React, { useEffect, useRef } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TracingBeamDemo } from "@/components/TracingBeamDemo";
import { H5 } from "../Typography";
import ItinerarySlot from "./ItinerarySlot";

const ItineraryAccordionItem = ({ itinerary, index, value }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    if (value === `item-${index}`) {
      const yOffset = -100; // 100px from the top
      const element = itemRef.current;
      if (element) {
        const y =
          element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }
    }
  }, [value, index]);

  return (
    <AccordionItem
      ref={itemRef}
      className="itinerary-accordion relative rounded border border-solid border-[#cfcfcf] bg-white px-4 text-xl data-[state=open]:rounded-bl c-xl:ml-32 c-xl:rounded-bl c-xl:rounded-tl-[50px] c-xl:pl-9 c-xl:pr-6"
      value={`item-${index}`}
    >
      <div className="absolute left-0 z-30 flex -translate-y-1/2 items-center rounded bg-brand-blue px-4 py-1 c-xl:left-[-128px] c-xl:top-0 c-xl:z-[-1] c-xl:h-[60px] c-xl:w-full c-xl:translate-y-0 c-xl:px-8">
        <H5 className="text-sm font-normal text-white c-xl:text-xl c-xl:font-bold">
          Day {(index + 1).toString().padStart(2, "0")}
        </H5>
      </div>
      <AccordionTrigger className="text-left text-base mt-2 sm:mt-0 c-lg:text-lg">
        {itinerary.title}
      </AccordionTrigger>
      <AccordionContent>
        <div className="itinerary-content">
          <div className="relative space-y-8 pl-2 text-base antialiased">
            <ItinerarySlot itinerary={itinerary} />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ItineraryAccordionItem;
