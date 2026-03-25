import React from "react";
import { Phone, X, ChevronUp } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

const StickyBottomBar = ({
  packageData,
  showStickyBar,
  showFullForm,
  setShowFullForm,
  isNavAtTop,
  EnquiryFormComponent
}) => {
  return (
    <div 
      className={cn(
        "c-lg:hidden fixed left-0 right-0 bottom-0 z-50 transition-all duration-500",
        showStickyBar ? "translate-y-0" : "translate-y-full"
      )}
    >
      {/* Expanded Form Overlay */}
      {showFullForm && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setShowFullForm(false)}
        />
      )}
      
      {/* Expanded Form Panel */}
      <div 
        className={`absolute bottom-full left-0 right-0 bg-white border-t border-brand-blue/20 shadow-2xl transition-all duration-300 z-50 ${
          showFullForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="max-w-md mx-auto p-6">
          <button 
            onClick={() => setShowFullForm(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
          {EnquiryFormComponent}
        </div>
      </div>

      {/* Compact Bottom Bar */}
      <div className="bg-gradient-to-r from-brand-blue via-[#0046b8] to-brand-blue border-t border-white/20 shadow-[0_-10px_40px_rgba(0,70,184,0.3)] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Price Info */}
            <div className="flex items-center gap-4">
              <div>
                <p className="text-white/60 text-[10px] font-medium">Starting from</p>
                <div className="flex items-baseline gap-1">
                  {(packageData?.basePrice > 0 || packageData?.price > 0 || packageData?.startingPrice > 0) && (
                    <span className="text-brand-accent text-sm font-bold">₹</span>
                  )}
                  <span className={cn("font-bold text-[22px] drop-shadow-sm", formatPrice(packageData?.basePrice || packageData?.price || packageData?.startingPrice || 0) === "On Request" ? "text-yellow-400" : "text-white")}>
                    {formatPrice(packageData?.basePrice || packageData?.price || packageData?.startingPrice || 0)}
                  </span>
                  {(packageData?.basePrice > 0 || packageData?.price > 0 || packageData?.startingPrice > 0) && (
                    <span className="text-white/40 text-xs">/person</span>
                  )}
                </div>
              </div>
              
              {/* Hotel Category Badge */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-inner">
                <span className="text-brand-accent text-xs">
                  {"⭐".repeat(
                    packageData?.hotelCategory?.toLowerCase() === "fivestar" ? 5 :
                    packageData?.hotelCategory?.toLowerCase() === "fourstar" ? 4 :
                    packageData?.hotelCategory?.toLowerCase() === "threestar" ? 3 : 4
                  )}
                </span>
                <span className="text-white text-xs font-semibold">
                  {packageData?.hotelCategory ? (
                    packageData.hotelCategory.toLowerCase() === "threestar" ? "3-Star" :
                    packageData.hotelCategory.toLowerCase() === "fourstar" ? "4-Star" :
                    packageData.hotelCategory.toLowerCase() === "fivestar" ? "5-Star" :
                    packageData.hotelCategory
                  ) : "Deluxe"} Hotels
                </span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* View Details / Expand */}
              <button
                onClick={() => setShowFullForm(!showFullForm)}
                className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl transition-all text-sm font-semibold backdrop-blur-md"
              >
                <ChevronUp className={`w-4 h-4 transition-transform ${showFullForm ? 'rotate-180' : ''}`} />
                View Options
              </button>
              
              {/* Call Button */}
              <a 
                href="tel:+919876543210"
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl transition-all backdrop-blur-md"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-semibold">Call Us</span>
              </a>
              
              <button
                onClick={() => {
                  setShowFullForm(true);
                }}
                className="px-6 py-2.5 bg-[#facc15] text-[#1e293b] font-bold rounded-xl shadow-lg transition-all text-sm uppercase tracking-wider active:scale-95"
              >
                Enquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyBottomBar;
