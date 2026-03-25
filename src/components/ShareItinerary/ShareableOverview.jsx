import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ShareableOverview = ({ overview, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!overview && !description) return null;

  const content = overview || description;
  const isLongContent = content.length > 500;
  const displayContent = (isExpanded || !isLongContent) ? content : content.substring(0, 500) + '...';

  return (
    <section id="overview" className="py-6 md:py-10 bg-white print:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 md:mb-8 print:mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 print:text-2xl">
            <span className="bg-gradient-to-r from-brand-blue to-purple-600 bg-clip-text text-transparent">
              Package Overview
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-blue to-purple-600 rounded-full" />
        </div>

        {/* Content */}
        <div className="max-w-4xl">
          <div className="prose prose-lg max-w-none print:prose-sm">
            <div 
              className="text-slate-700 leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: displayContent.replace(/\n/g, '<br/>') }}
            />
          </div>

          {/* Expand Button */}
          {isLongContent && !isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-blue to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 print:hidden"
            >
              Read More
              <ChevronDown className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShareableOverview;
