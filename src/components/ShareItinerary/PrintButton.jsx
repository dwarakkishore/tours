'use client';

import React from 'react';
import { Download } from 'lucide-react';

const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white rounded-2xl font-bold text-sm uppercase tracking-wider transition-all shadow-2xl shadow-brand-blue/30 hover:shadow-3xl hover:shadow-brand-blue/40 active:scale-95 print:hidden md:bottom-8 md:right-8 md:px-8 md:py-4"
      aria-label="Print or Download PDF"
    >
      <Download className="w-5 h-5" />
      <span className="hidden sm:inline">Download PDF</span>
      <span className="sm:hidden">PDF</span>
    </button>
  );
};

export default PrintButton;
