import React, { useState } from "react";
import { Info, ChevronDown, ChevronUp } from "lucide-react";

const ImportantNotesSection = ({ packageData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Robust data fetching for notes (handles both array and object structures)
  let notes = [];
  
  if (packageData?.sections) {
    if (Array.isArray(packageData.sections)) {
      const section = packageData.sections.find(s => s.id === "important_notes" || s.id === "notes");
      if (section?.items) notes = section.items;
    } else {
      notes = packageData.sections.important_notes || packageData.sections.notes || [];
    }
  }

  // Fallback to top-level fields
  if (notes.length === 0) {
    notes = packageData?.important_notes || 
            packageData?.importantNotes || 
            packageData?.notes || [];
  }

  // If no dynamic data, don't show this section
  if (!notes || notes.length === 0) return null;

  const displayNotes = isExpanded ? notes : notes.slice(0, 6);

  return (
    <div id="notes-section" className="scroll-mt-32">
      {/* Standard Header - Moved Outside of Card */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-2 md:mb-4 tracking-tight leading-tight">
          Important <span className="text-brand-blue">Notes</span>
        </h2>
        <p className="text-slate-500 text-sm md:text-xl font-medium">Key guidelines to ensure a smooth travel experience</p>
      </div>
      
      {/* Card Container for Content only */}
      <div className="md:bg-white md:rounded-[2rem] p-0 md:p-10 md:border md:border-slate-100 md:shadow-sm overflow-hidden">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {displayNotes.map((note, idx) => (
              <div key={idx} className="flex items-start gap-3 group">
                <div className="flex-shrink-0 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-brand-blue transition-colors" />
                </div>
                <div className="min-w-0 flex-1 text-sm md:text-base leading-relaxed font-bold text-slate-900">
                  <span className="transition-colors font-medium text-slate-700">
                    {note.replace(/^["'\s]+|["'\s]+,?$/g, "").trim()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Minimal Read More / Show Less Button */}
          {notes.length > 6 && (
            <div className="pt-4 border-t border-slate-50">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="group flex justify-end items-center gap-1 text-brand-blue font-bold text-[10px] md:text-xs uppercase tracking-widest w-full"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    <span>Collapse Notes</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    <span>Expand {notes.length - 6} More Notes</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportantNotesSection;
