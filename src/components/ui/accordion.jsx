"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
// import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = ({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = ({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>div>span]:rotate-0 [data-state=open]:text-red-500 gap-3",
        className
      )}
      {...props}
    >
      {children}

      <div className="relative aspect-square h-[16px]">
        <span className="absolute left-1/2 top-1/2 block h-[2px] w-full -translate-x-1/2 -translate-y-1/2 rounded bg-[#1C1B1F]"></span>

        <span className="absolute left-1/2 top-1/2 block h-[2px] w-full -translate-x-1/2 -translate-y-1/2 rotate-90 rounded bg-[#1C1B1F] transition-all duration-300"></span>
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = ({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
);

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
