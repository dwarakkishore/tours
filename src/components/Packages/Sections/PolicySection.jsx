import React from "react";
import { ShieldAlert } from "lucide-react";

const PolicySection = () => {
  return (
    <div id="policy-section" className="scroll-mt-48 pt-4">
      {/* Standard Header */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-2 md:mb-4 leading-tight">
          Cancellation <span className="text-rose-500">Policy</span>
        </h2>
        <p className="text-slate-500 text-sm md:text-xl font-medium">Clear and transparent cancellation guidelines</p>
      </div>

      <div className="bg-gradient-to-br from-rose-50/50 to-white border border-rose-100 rounded-[2rem] p-6 md:p-12 shadow-sm relative overflow-hidden">
        <div className="relative z-10">

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Domestic Column */}
            <div className="space-y-4">
              <h4 className="text-lg md:text-xl font-bold text-rose-600 mb-4 flex items-center gap-2">
                Domestic Packages
              </h4>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                  <span className="text-rose-500 font-bold text-[10px] uppercase tracking-widest block mb-1">
                    30+ Days Before Departure
                  </span>
                  <p className="text-slate-800 font-bold text-sm leading-relaxed">
                    Deposit only, or 10% of total package cost, whichever is higher. Balance is refundable.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                  <span className="text-rose-500 font-bold text-[10px] uppercase tracking-widest block mb-1">
                    30 to 15 Days Before Departure
                  </span>
                  <p className="text-slate-800 font-bold text-sm leading-relaxed">
                    30% of the total package cost.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                  <span className="text-rose-500 font-bold text-[10px] uppercase tracking-widest block mb-1">
                    15 to 7 Days Before Departure
                  </span>
                  <p className="text-slate-800 font-bold text-sm leading-relaxed">
                    60% of the total package cost.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                  <span className="text-rose-500 font-bold text-[10px] uppercase tracking-widest block mb-1">
                    7 to 3 Days Before Departure
                  </span>
                  <p className="text-slate-800 font-bold text-sm leading-relaxed">
                    90% of the total package cost.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                  <span className="text-rose-500 font-bold text-[10px] uppercase tracking-widest block mb-1">
                    Less Than 3 Days / No Show
                  </span>
                  <p className="text-slate-800 font-bold text-sm leading-relaxed">
                    100% of the total package cost (no refund).
                  </p>
                </div>
              </div>
            </div>

            {/* International Column */}
            <div className="space-y-4">
              <h4 className="text-lg md:text-xl font-bold text-rose-600 mb-4">
                International Packages
              </h4>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                  <span className="text-rose-500 font-bold text-[10px] uppercase tracking-widest block mb-1">
                    45+ Days Before Departure
                  </span>
                  <p className="text-slate-800 font-bold text-sm leading-relaxed">
                    Deposit only, or 10% of total package cost, whichever is higher.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                  <span className="text-rose-500 font-bold text-[10px] uppercase tracking-widest block mb-1">
                    45 to 30 Days Before Departure
                  </span>
                  <p className="text-slate-800 font-bold text-sm leading-relaxed">
                    30% of the total package cost.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                  <span className="text-rose-500 font-bold text-[10px] uppercase tracking-widest block mb-1">
                    30 to 15 Days Before Departure
                  </span>
                  <p className="text-slate-800 font-bold text-sm leading-relaxed">
                    60% of the total package cost.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                  <span className="text-rose-500 font-bold text-[10px] uppercase tracking-widest block mb-1">
                    15 to 3 Days Before Departure
                  </span>
                  <p className="text-slate-800 font-bold text-sm leading-relaxed">
                    90% of the total package cost.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                  <span className="text-rose-500 font-bold text-[10px] uppercase tracking-widest block mb-1">
                    Less Than 3 Days / No Show
                  </span>
                  <p className="text-slate-800 font-bold text-sm leading-relaxed">
                    100% of the total package cost (no refund).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="flex items-start gap-4 p-4 md:p-5 bg-rose-500 rounded-2xl border border-rose-400 shadow-lg shadow-rose-200">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm md:text-base text-white font-bold leading-relaxed italic">
              Cancellation rules vary by region, hotel selection, and time of year. Please verify exact terms during the booking process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicySection;
