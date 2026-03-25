import React, { useState } from "react";
import { FileText, ChevronDown, ChevronUp } from "lucide-react";

const TermsSection = () => {
  const termsData = [
    {
      title: "Booking & Payment",
      content: [
        "Booking and payment must be made as per company policy.",
        "All rates are subject to change based on availability, taxes, fuel charges, and currency fluctuations, until full payment is received."
      ]
    },
    {
      title: "Traveller Documentation",
      content: [
        "For domestic travel, travellers must carry a valid government-issued photo ID as required by local regulations.",
        "For international travel, travellers must hold a valid passport (minimum six months' validity from the date of travel) and all required visas and travel documents.",
        "The company may guide on documentation but is not responsible for denial of boarding, visa refusal, or any service denial due to incomplete or incorrect documents."
      ]
    },
    {
      title: "Itinerary & Services",
      content: [
        "The sequence or timing of sightseeing, transfers, or activities may be changed due to weather, traffic, operational, or safety reasons.",
        "If a service, attraction, or activity is unavailable, the company may provide a similar alternative of comparable value where possible."
      ]
    },
    {
      title: "Accommodation",
      content: [
        "Hotel bookings are subject to availability. If the selected hotel is not available, an alternate hotel of a similar category will be arranged.",
        "Check-in and check-out times are as per hotel policy and may vary by destination."
      ]
    },
    {
      title: "Transportation",
      content: [
        "Vehicles (usually air-conditioned, where available) will be provided according to the itinerary and group size.",
        "The company is not liable for delays or interruptions caused by traffic, mechanical issues, strikes, or other circumstances beyond its control."
      ]
    },
    {
      title: "Flights & Airline Policies (where applicable)",
      content: [
        "For packages including flights, tickets are subject to airline rules, fare conditions, and schedule changes.",
        "The company is not responsible for airline delays, rescheduling, or cancellations, but will assist with reasonable support for rebooking where possible."
      ]
    },
    {
      title: "Travel Insurance",
      content: [
        "Comprehensive travel insurance is strongly recommended for all travellers to cover medical expenses, trip cancellations, delays, and loss or damage to baggage."
      ]
    },
    {
      title: "Cancellations & Refunds",
      content: [
        "Cancellations are subject to company policy and may include charges from airlines, hotels, and other service providers.",
        "Refunds, if applicable, will be processed after deducting applicable cancellation fees, service charges, and third-party charges. Processing time may depend on airlines, hotels, and banks."
      ]
    },
    {
      title: "Company's Role & Liability",
      content: [
        "The company acts as a facilitator between travelers and independent service providers such as airlines, hotels, transport operators, and activity organizers.",
        "The company will not be liable for any loss, injury, damage, delay, or expense caused by third parties or events beyond its reasonable control, including natural calamities, strikes, or government actions."
      ]
    },
    {
      title: "Traveller Responsibilities & Conduct",
      content: [
        "Travellers are responsible for providing accurate information at the time of booking and for checking all details in their confirmations and travel documents.",
        "Travellers must follow local laws, respect cultural norms, and cooperate with tour staff and other participants during the trip."
      ]
    }
  ];

  const [isExpanded, setIsExpanded] = useState(false);
  const displayTerms = isExpanded ? termsData : termsData.slice(0, 5);

  return (
    <div id="terms-section" className="scroll-mt-48 pt-4">
      {/* Standard Header */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-2 md:mb-4 leading-tight">
          Terms & <span className="text-brand-blue">Conditions</span>
        </h2>
        <p className="text-slate-500 text-sm md:text-xl font-medium">
          Applicable for both Domestic and International Travel Packages
        </p>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-12 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
        <div className="relative z-10">
          <div className="space-y-6 md:space-y-8">
            {displayTerms.map((section, index) => (
              <div key={index} className="group">
                <h3 className="font-bold text-slate-900 text-base md:text-lg mb-3 flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center text-sm font-bold mt-0.5">
                    {index + 1}
                  </span>
                  <span className="flex-1">{section.title}</span>
                </h3>
                <div className="pl-10 space-y-2">
                  {section.content.map((point, pointIndex) => (
                    <p
                      key={pointIndex}
                      className="text-slate-600 text-sm md:text-base leading-relaxed flex items-start gap-2"
                    >
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-slate-300 mt-2" />
                      <span className="flex-1">{point}</span>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {termsData.length > 5 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 px-8 py-3 bg-slate-50 hover:bg-slate-100 text-brand-blue font-bold text-xs uppercase tracking-[0.2em] rounded-full border border-slate-200 transition-all active:scale-95 group"
              >
                {isExpanded ? (
                  <>
                    Show Less <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                  </>
                ) : (
                  <>
                    Read More <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-slate-500 text-xs md:text-sm text-center italic">
              These terms and conditions apply to all bookings made with Bayard Vacations. 
              By confirming your booking, you acknowledge that you have read, understood, and agreed to these terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsSection;
