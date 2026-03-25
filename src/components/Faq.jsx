"use client";

import { parseFaqContent } from "@/lib/utils";
import FaqRenderer from "./FaqRenderer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/FaqAccordion";
import { AlertCircle } from "lucide-react";

const Faq = ({ content }) => {
  const faqItems = parseFaqContent(content);

  // If there's no content at all, don't render anything
  if (!content) return null;

  // If parsing resulted in no items but content existed, show error
  if (!faqItems.length) {
    return (
      <div className="flex w-full items-center gap-3 rounded-xl bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 px-6 py-4 text-red-800 shadow-sm">
        <AlertCircle className="size-5 flex-shrink-0" />
        <p className="font-medium">Unable to load FAQ content. Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full space-y-4 py-4">
        {faqItems.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="
              group relative overflow-hidden
              rounded-2xl border-2 border-slate-200
              bg-white shadow-sm
              transition-all duration-300
              hover:border-brand-blue hover:shadow-lg
            "
          >
            {/* Accent Bar - Appears on Hover */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-brand-blue via-yellow-400 to-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Question */}
            <AccordionTrigger className="
              px-6 py-5 text-left
              text-base sm:text-lg font-bold text-slate-900
              hover:no-underline
              group-hover:text-brand-blue
              transition-colors duration-300
            ">
              <span className="pr-4">{item.question}</span>
            </AccordionTrigger>
            
            {/* Answer */}
            <AccordionContent className="px-6 pb-6">
              {/* Divider */}
              <div className="mb-4 h-px bg-gradient-to-r from-brand-blue/20 via-brand-blue/40 to-transparent"></div>
              
              {/* Content */}
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                <FaqRenderer
                  content={item.answer}
                  onError={() => (
                    <p className="text-red-600 font-medium">
                      Error displaying answer content
                    </p>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
