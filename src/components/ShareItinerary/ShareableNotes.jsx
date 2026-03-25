'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

const ShareableNotes = ({ notes = [] }) => {
  if (!notes || notes.length === 0) return null;

  return (
    <section id="notes" className="bg-white py-12 md:py-20 border-t border-slate-100 print:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Important <span className="text-amber-500">Notes</span>
            </h2>
            <p className="text-slate-500 font-medium">Please review these details for a smooth travel experience</p>
          </div>
        </div>

        <div className={notes.length === 1 ? "max-w-none" : "columns-1 md:columns-2 gap-8"}>
          {notes.map((note, index) => (
            <div 
              key={index}
              className={`group p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-amber-200 hover:bg-white hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 ${notes.length === 1 ? "" : "mb-6 break-inside-avoid-column"}`}
            >
              <div 
                className={`prose prose-slate prose-sm max-w-none text-slate-600 font-medium leading-relaxed
                  prose-p:mb-3 prose-p:last:mb-0
                  prose-ul:my-2 prose-li:my-1
                  prose-strong:text-slate-900 prose-strong:font-bold
                  ${notes.length === 1 ? "md:columns-2 md:gap-12 [column-fill:balance]" : ""}`}
                dangerouslySetInnerHTML={{ __html: note }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShareableNotes;
