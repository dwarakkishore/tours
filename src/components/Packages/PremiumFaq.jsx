"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { parseFaqContent } from "@/lib/utils";
import FaqRenderer from "@/components/FaqRenderer";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

// Sub-component for individual FAQ items to maintain clean two-column logic
const FaqItem = ({ item, index, openIndex, toggleItem }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    className="group"
  >
    <div className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
      openIndex === index 
        ? 'bg-gradient-to-br from-brand-blue/5 to-white border border-brand-blue/20 shadow-md' 
        : 'bg-white border border-slate-100 hover:border-slate-200 shadow-sm'
    }`}>
      {/* Question Button */}
      <button
        onClick={() => toggleItem(index)}
        className="w-full px-4 md:px-6 py-5 flex items-center justify-between gap-4 text-left"
      >
        <div className="flex items-center gap-4">
          <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
            openIndex === index 
              ? 'bg-brand-blue shadow-lg shadow-brand-blue/20' 
              : 'bg-slate-50 group-hover:bg-slate-100'
          }`}>
            <span className={`font-bold text-sm ${openIndex === index ? 'text-white' : 'text-slate-500'}`}>
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <h3 className={`font-bold text-sm md:text-base transition-colors duration-300 ${
            openIndex === index ? 'text-slate-900' : 'text-slate-700 group-hover:text-brand-blue'
          }`}>
            {item.question}
          </h3>
        </div>
        
        <motion.div
          animate={{ rotate: openIndex === index ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            openIndex === index 
              ? 'bg-brand-blue/10 text-brand-blue' 
              : 'bg-slate-50 text-slate-400 group-hover:text-slate-600'
          }`}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      {/* Answer Content */}
      <AnimatePresence>
        {openIndex === index && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-6 pb-6">
              {/* Divider */}
              <div className="h-px bg-slate-100 mb-4 ml-14" />
              
              {/* Answer text */}
              <div className="pl-14 prose prose-slate max-w-none">
                <div className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                  <FaqRenderer
                    content={item.answer}
                    onError={() => (
                      <p className="text-rose-500 font-medium text-xs">
                        Error displaying answer content
                      </p>
                    )}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
);

const PremiumFaq = ({ faqs, regionName, content }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const displayName = regionName?.split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ") || regionName || "this region";

  // Default FAQs for fallback
  const fallbackFaqs = [
    {
      question: `What is the best time to visit ${displayName}?`,
      answer: `The best time to visit ${displayName} generally depends on your preferences, but most travelers find that spring (March to May) and autumn (September to November) offer the most pleasant weather for exploring cities and nature alike.`
    },
    {
      question: "Do I need a visa to travel here?",
      answer: "Visa requirements vary by nationality. Many travelers can obtain an e-visa or visa on arrival for this region. We recommend checking the official government portal or consulting with our visa experts at least 2-3 weeks before your departure."
    },
    {
      question: "Can I customize the existing tour packages?",
      answer: "Absolutely! At Bayard Vacations, we believe every traveler is unique. All our packages are 100% customizable. You can add extra days, upgrade your hotels, or include specific activities that interest you."
    },
    {
      question: "What is included in the package price?",
      answer: "Typically, our packages include premium accommodation, daily breakfast, private airport transfers, and guided sightseeing. Specific inclusions like flights or specialty meals will be clearly listed on each individual package page."
    },
    {
      question: "How do I book a trip with Bayard Vacations?",
      answer: "Booking is simple! You can click the 'Inquire Now' button on any package to speak with a travel expert, or use our interactive booking system to secure your spot with a small deposit."
    },
    {
      question: "What is the cancellation policy?",
      answer: "We offer flexible cancellation terms for your peace of mind. Cancellations made more than 30 days before departure usually receive a full refund, minus a small processing fee. Detailed terms are provided at the time of booking."
    }
  ];

  // Parse FAQs based on format (string HTML or array)
  let parsedFaqs = [];
  
  if (content && typeof content === 'string') {
    parsedFaqs = parseFaqContent(content);
  }
  else if (typeof faqs === 'string') {
    parsedFaqs = parseFaqContent(faqs);
  } else if (Array.isArray(faqs) && faqs.length > 0) {
    parsedFaqs = faqs;
  }

  // Use fallback if no FAQs found
  if (parsedFaqs.length === 0) {
    parsedFaqs = fallbackFaqs;
  }

  // If not mounted, don't render to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-8 md:py-10 bg-transparent overflow-hidden scroll-mt-24 rounded-3xl border border-slate-100 shadow-sm">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-blue/5 border border-brand-blue/10 rounded-full mb-4 uppercase tracking-widest text-[10px]">
            <MessageCircle className="w-3.5 h-3.5 text-brand-blue" />
            <span className="text-brand-blue font-bold">Got Questions?</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-0 tracking-tight leading-tight px-4">
            Frequently Asked <span className="text-brand-blue">Questions</span>
          </h2>
        </motion.div>

        {/* FAQ Items - 2 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-8 md:gap-y-4 items-start">
          {/* First Column */}
          <div className="space-y-4">
            {parsedFaqs.filter((_, i) => i % 2 === 0).map((item, index) => {
              const actualIndex = index * 2;
              return (
                <FaqItem 
                  key={actualIndex}
                  item={item}
                  index={actualIndex}
                  openIndex={openIndex}
                  toggleItem={toggleItem}
                />
              );
            })}
          </div>

          {/* Second Column */}
          <div className="space-y-4">
            {parsedFaqs.filter((_, i) => i % 2 !== 0).map((item, index) => {
              const actualIndex = index * 2 + 1;
              return (
                <FaqItem 
                  key={actualIndex}
                  item={item}
                  index={actualIndex}
                  openIndex={openIndex}
                  toggleItem={toggleItem}
                />
              );
            })}
          </div>
        </div>

        {/* Help Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-4 md:mt-8"
        >
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-brand-blue/5 backdrop-blur-sm" />
            <div className="relative bg-transparent border border-brand-blue/10 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="flex-shrink-0 w-16 h-16 bg-brand-blue rounded-2xl flex items-center justify-center shadow-lg shadow-brand-blue/30">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-slate-900 font-bold text-xl mb-2">Still have questions?</h4>
                <p className="text-slate-500 text-base font-medium">
                  Our travel experts are ready to help you craft the perfect itinerary. 
                  Reach out for personalized recommendations and support.
                </p>
              </div>
              <a 
                href="tel:+919876543210"
                className="flex-shrink-0 px-8 py-4 gradient-btn text-white font-bold rounded-2xl transition-all duration-300 shadow-xl uppercase tracking-widest text-xs active:scale-95"
              >
                Connect Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumFaq;
