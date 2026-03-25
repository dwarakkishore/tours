import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const ShareableFAQ = ({ faqs = [] }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!faqs || faqs.length === 0) return null;

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-6 md:py-10 bg-gradient-to-br from-slate-50 to-blue-50 print:bg-white print:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-4 md:mb-6 print:mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-purple-600 mb-4 print:w-12 print:h-12">
            <HelpCircle className="w-8 h-8 text-white print:w-6 print:h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 print:text-2xl">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-lg print:text-sm">
            Everything you need to know about this package
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 print:space-y-2">
          {faqs.map((faq, index) => {
            const isExpanded = expandedIndex === index;
            
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300 print:shadow-none print:rounded-lg print:border-slate-300"
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left hover:bg-slate-50 transition-colors print:cursor-default print:hover:bg-white print:py-3"
                >
                  <span className="font-bold text-slate-900 text-base md:text-lg flex-1 print:text-sm">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 text-brand-blue flex-shrink-0 transition-transform duration-300 print:hidden ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 print:max-h-none ${
                    isExpanded ? 'max-h-96' : 'max-h-0 print:max-h-96'
                  }`}
                >
                  <div className="px-6 pb-5 print:pb-3">
                    <div className="pt-2 border-t border-slate-100 print:border-slate-200">
                      <p className="text-slate-700 leading-relaxed print:text-xs whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Help CTA */}
        <div className="mt-10 text-center bg-gradient-to-r from-brand-blue/10 to-purple-600/10 rounded-2xl p-6 print:hidden">
          <p className="text-slate-700 mb-4 font-medium">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:+918069668484`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              📞 Call Us
            </a>
            <a
              href={`https://wa.me/918069668484`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareableFAQ;
