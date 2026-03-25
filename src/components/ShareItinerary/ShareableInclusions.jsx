import React from 'react';

const ShareableInclusions = ({ inclusions = [], exclusions = [] }) => {
  return (
    <section id="inclusions" className="bg-slate-50 py-6 md:py-10 print:py-6 print:bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-3 md:mb-4 print:mb-4">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-1 tracking-tight">
            What's <span className="text-brand-blue">Included</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-lg font-medium">
            Everything you need for a worry-free vacation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 print:gap-4">
          {/* Inclusions */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm print:rounded-2xl print:p-4 print:shadow-none print:break-inside-avoid">
            <div className="flex items-center gap-3 mb-6 print:mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center print:w-8 print:h-8">
                <svg className="w-5 h-5 text-green-600 print:w-4 print:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 print:text-lg">
                Included in Package
              </h3>
            </div>
            
            <ul className="space-y-3 print:space-y-2">
              {inclusions.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-700 print:gap-2">
                  <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-md bg-green-50 flex items-center justify-center print:w-4 print:h-4">
                    <svg className="w-3 h-3 text-green-600 print:w-2.5 print:h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm md:text-base leading-relaxed font-medium print:text-xs print:leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm print:rounded-2xl print:p-4 print:shadow-none print:break-inside-avoid">
            <div className="flex items-center gap-3 mb-6 print:mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center print:w-8 print:h-8">
                <svg className="w-5 h-5 text-red-600 print:w-4 print:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 print:text-lg">
                Not Included
              </h3>
            </div>
            
            <ul className="space-y-3 print:space-y-2">
              {exclusions.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-700 print:gap-2">
                  <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-md bg-red-50 flex items-center justify-center print:w-4 print:h-4">
                    <svg className="w-3 h-3 text-red-600 print:w-2.5 print:h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-sm md:text-base leading-relaxed font-medium print:text-xs print:leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareableInclusions;
