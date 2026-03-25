import React, { useState } from "react";
import { Info } from "lucide-react";

/**
 * ShareableImportantNotes Component
 * Displays a list of important travel notes with a read-more toggle.
 * 
 * @param {Object} props
 * @param {string[]} props.notes - Array of note strings
 */
const ShareableImportantNotes = ({ notes }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!notes || notes.length === 0) return null;

  const displayNotes = isExpanded ? notes : notes.slice(0, 6);

  return (
    <section id="important-notes" className="py-6 md:py-10 bg-white print:py-8 overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 border border-brand-blue/20 rounded-full mb-4">
            <Info className="w-4 h-4 text-brand-blue" />
            <span className="text-xs font-bold text-brand-blue uppercase tracking-[0.2em]">Travel Support</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight leading-none">
            Important <span className="text-brand-blue">Notes</span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl">
            Everything you need to know for a seamless and worry-free journey.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-slate-50 rounded-[2.5rem] p-6 md:p-10 border border-slate-100 relative group transition-all duration-700 hover:shadow-2xl hover:shadow-brand-blue/5">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[100px] -mr-48 -mt-48 transition-all duration-700 group-hover:bg-brand-blue/10" />
          
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {displayNotes.map((note, idx) => (
                <div 
                  key={idx} 
                  className="flex gap-5 items-start bg-white/50 backdrop-blur-sm p-5 rounded-2xl border border-white/80 hover:bg-white hover:border-brand-blue/20 transition-all duration-300"
                >
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-brand-blue/30 group-hover:bg-brand-blue transition-colors flex-shrink-0 animate-pulse" />
                  <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed italic">
                    {note}
                  </p>
                </div>
              ))}
            </div>

            {notes.length > 6 && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="group relative px-8 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-[10px] uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 hover:border-brand-blue hover:text-brand-blue hover:shadow-lg active:scale-95"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {isExpanded ? (
                      <>
                        <svg className="w-4 h-4 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                        </svg>
                        Show Less
                      </>
                    ) : (
                      <>
                        Read More ({notes.length - 6} more)
                        <svg className="w-4 h-4 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareableImportantNotes;
