import React from 'react';

const ShareablePricing = ({ pricing, travelers }) => {
  if (!pricing) return null;

  const { 
    basePrice, 
    totalPrice, 
    currency, 
    perPerson,
    hotelCategory = "4 STAR",
    adultsRate,
    childrenRate,
    toddlersRate,
    gstRate,
    gstAmount,
    tcsRate,
    tcsAmount
  } = pricing;

  const { adults = 0, children = 0, toddlers = 0 } = travelers || {};

  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(price)) return '0';
    return new Intl.NumberFormat('en-IN').format(price);
  };

  const symbol = currency === 'INR' ? '₹' : (currency || '₹');

  return (
    <section id="pricing" className="pt-4 pb-8 bg-slate-50/50 print:bg-white print:py-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 relative">
          
          {/* Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <img 
              src="/watermark-logo.svg" 
              alt="" 
              className="w-full max-w-[200px] object-contain"
              aria-hidden="true"
            />
          </div>
          <div className="p-6 md:p-8 relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-blue uppercase tracking-tight mb-6">
              Tour Cost
            </h2>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-[1.5fr,0.8fr,1.2fr] border-b border-slate-200 bg-slate-50/50">
                <div className="py-1.5 px-4 md:py-2 md:px-6 border-r border-slate-200">
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-blue">
                    Tourist Type
                  </span>
                </div>
                <div className="py-1.5 px-4 md:py-2 md:px-6 border-r border-slate-200 text-center">
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-blue">
                    Nos
                  </span>
                </div>
                <div className="py-1.5 px-4 md:py-2 md:px-6 text-center">
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-blue">
                    {hotelCategory}
                  </span>
                </div>
              </div>

              {/* Adults Row */}
              <div className="grid grid-cols-[1.5fr,0.8fr,1.2fr] border-b border-slate-200">
                <div className="py-1.5 px-4 md:py-2 md:px-6 border-r border-slate-200">
                  <span className="text-sm md:text-base font-bold text-slate-700 block">Adults</span>
                  <span className="text-[9px] md:text-[10px] font-medium text-slate-400">Above 12 years of age</span>
                </div>
                <div className="py-1.5 px-4 md:py-2 md:px-6 border-r border-slate-200 flex items-center justify-center">
                  <span className="text-sm md:text-base font-bold text-slate-700">{adults}</span>
                </div>
                <div className="py-1.5 px-4 md:py-2 md:px-6 flex flex-col items-center justify-center">
                  {adultsRate > 0 && (
                    <span className="text-[11px] md:text-xs font-semibold text-slate-500 mb-1">
                      ({formatPrice(adultsRate)} per person)
                    </span>
                  )}
                  <span className="text-sm md:text-base font-bold text-slate-800 tracking-tight">
                    {formatPrice(adults * (adultsRate || 0))}
                  </span>
                </div>
              </div>

              {/* Children Row */}
              <div className="grid grid-cols-[1.5fr,0.8fr,1.2fr] border-b border-slate-200">
                <div className="py-1.5 px-4 md:py-2 md:px-6 border-r border-slate-200">
                  <span className="text-sm md:text-base font-bold text-slate-700 block">Children</span>
                  <span className="text-[9px] md:text-[10px] font-medium text-slate-400">Between 5-11 years of age</span>
                </div>
                <div className="py-1.5 px-4 md:py-2 md:px-6 border-r border-slate-200 flex items-center justify-center">
                  <span className="text-sm md:text-base font-bold text-slate-700">{children}</span>
                </div>
                <div className="py-1.5 px-4 md:py-2 md:px-6 flex flex-col items-center justify-center">
                  {childrenRate > 0 && (
                    <span className="text-[11px] md:text-xs font-semibold text-slate-500 mb-1">
                      ({formatPrice(childrenRate)} per person)
                    </span>
                  )}
                  <span className="text-sm md:text-base font-bold text-slate-800 tracking-tight">
                    {formatPrice(children * (childrenRate || 0))}
                  </span>
                </div>
              </div>

              {/* Toddlers Row */}
              <div className="grid grid-cols-[1.5fr,0.8fr,1.2fr] border-b border-slate-200">
                <div className="py-1.5 px-4 md:py-2 md:px-6 border-r border-slate-200">
                  <span className="text-sm md:text-base font-bold text-slate-700 block">Toddlers</span>
                  <span className="text-[9px] md:text-[10px] font-medium text-slate-400">Between 0-4 years of age</span>
                </div>
                <div className="py-1.5 px-4 md:py-2 md:px-6 border-r border-slate-200 flex items-center justify-center">
                  <span className="text-sm md:text-base font-bold text-slate-700">{toddlers}</span>
                </div>
                <div className="py-1.5 px-4 md:py-2 md:px-6 flex flex-col items-center justify-center">
                  {toddlersRate > 0 && (
                    <span className="text-[11px] md:text-xs font-semibold text-slate-500 mb-1">
                      ({formatPrice(toddlersRate)} per person)
                    </span>
                  )}
                  <span className="text-sm md:text-base font-bold text-slate-800 tracking-tight">
                    {formatPrice(toddlers * (toddlersRate || 0))}
                  </span>
                </div>
              </div>

              {/* Total Row (Blue) */}
              <div className="grid grid-cols-[2.3fr,1.2fr] bg-brand-blue text-white">
                <div className="py-2 px-4 md:py-2.5 md:px-6 border-r border-blue-400/30 flex items-center">
                  <span className="text-sm md:text-base font-bold uppercase tracking-widest">Total</span>
                </div>
                <div className="py-2 px-4 md:py-2.5 md:px-6 flex items-center justify-center">
                  <span className="text-base md:text-lg font-bold tracking-tight">{formatPrice(basePrice)}</span>
                </div>
              </div>

              {/* GST Row */}
              {gstAmount > 0 && (
                <div className="grid grid-cols-[2.3fr,1.2fr] border-b border-slate-200">
                  <div className="py-2 px-4 md:py-2.5 md:px-6 border-r border-slate-200 flex items-center">
                    <span className="text-sm font-bold text-slate-700">GST ({gstRate}%)</span>
                  </div>
                  <div className="py-2 px-4 md:py-2.5 md:px-6 flex items-center justify-center">
                    <span className="text-sm md:text-base font-bold text-slate-800">{formatPrice(gstAmount)}</span>
                  </div>
                </div>
              )}

              {/* TCS Row */}
              {tcsAmount > 0 && (
                <div className="grid grid-cols-[2.3fr,1.2fr] border-b border-slate-200">
                  <div className="py-2 px-4 md:py-2.5 md:px-6 border-r border-slate-200 flex items-center">
                    <span className="text-sm font-bold text-slate-700">TCS ({tcsRate}%)</span>
                  </div>
                  <div className="py-2 px-4 md:py-2.5 md:px-6 flex items-center justify-center">
                    <span className="text-sm md:text-base font-bold text-slate-800">{formatPrice(tcsAmount)}</span>
                  </div>
                </div>
              )}

              {/* Grand Total Row (Green) */}
              <div className="grid grid-cols-[2.3fr,1.2fr] bg-green-600 text-white">
                <div className="py-2.5 px-5 md:py-3.5 md:px-7 border-r border-green-500/30 flex items-center">
                  <span className="text-base md:text-lg font-bold uppercase tracking-widest">Grand Total</span>
                </div>
                <div className="py-2.5 px-5 md:py-3.5 md:px-7 flex items-center justify-center">
                  <span className="text-lg md:text-2xl font-bold tracking-tighter">
                    {symbol}{formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing Disclaimer */}
            <div className="flex justify-end mt-6">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-blue-50/50 rounded-full border border-blue-100/50">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse"></div>
                <span className="text-[10px] font-bold text-brand-blue uppercase tracking-[0.2em]">
                  Pricing Subject to Availability
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareablePricing;
