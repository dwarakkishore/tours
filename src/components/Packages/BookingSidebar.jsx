import React from "react";
import { Star, Share2 } from "lucide-react";
import EnquiryFormFields from "@/components/Forms/EnquiryForm/EnquiryFormFields";
import ConfirmationDialog from "@/components/Forms/EnquiryForm/ConfirmationDialog";
import useToggleState from "@/hooks/useToggleState";
import { cn, formatPrice } from "@/lib/utils";

const BookingSidebar = ({
  packageData,
  selectedHotel,
  setSelectedHotel,
  hotelTiers,
  finalPrice,
  copyCurrentUrl
}) => {
  const confirmationDialogControls = useToggleState();
  return (
    <div className="hidden c-lg:block w-[25%]" id="booking-sidebar">
      <ConfirmationDialog 
        controls={confirmationDialogControls}
        closeModal={() => confirmationDialogControls.close()}
      />
      <div className="sticky top-[80px] md:top-[100px] space-y-3 z-30 pb-4">
        {/* Pricing Card */}
        <div className="gradient-btn rounded-3xl shadow-xl overflow-hidden p-4 border border-white/20">
          <h3 className="text-lg font-bold text-white mb-4">Select Hotel Type</h3>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {hotelTiers.map((tier) => {
              const isActive = selectedHotel?.type === tier.type;
              const starRatingNames = {
                twostar: "2 Star",
                threestar: "3 Star",
                fourstar: "4 Star",
                fivestar: "5 Star",
              };
              const starRatingCount = {
                twostar: 2,
                threestar: 3,
                fourstar: 4,
                fivestar: 5,
              };
              const label = starRatingNames[tier.type] || "Hotel";
              const stars = starRatingCount[tier.type] || 5;
              
              return (
                <button
                  key={tier.type}
                  onClick={() => setSelectedHotel(tier)}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-500",
                    isActive 
                      ? "bg-white/10 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.2)] scale-105" 
                      : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10"
                  )}
                >
                  <span className={cn(
                    "text-[9px] font-bold uppercase tracking-wider mb-1.5 transition-colors",
                    isActive ? "text-yellow-400" : "text-white/40"
                  )}>
                    {label}
                  </span>
                  <div className="flex gap-0.5 items-center justify-center">
                    {[...Array(stars)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={10} 
                        className={cn(
                          "transition-all duration-500",
                          isActive ? "fill-yellow-400 text-yellow-400 scale-110" : "fill-white/20 text-white/20"
                        )} 
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mb-6 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-baseline gap-1">
                <span className={cn("text-2xl font-bold", finalPrice > 0 ? "text-white" : "text-yellow-400")}>
                   {finalPrice > 0 ? `₹ ${formatPrice(finalPrice)}` : formatPrice(finalPrice)}
                </span>
              </div>
              {packageData?.offer?.discountPercentage && finalPrice > 0 && (
                <span className="px-2 py-1 bg-yellow-400 text-slate-900 font-bold rounded-lg text-[9px] uppercase tracking-wider">
                  {packageData.offer.discountPercentage}% Off
                </span>
              )}
            </div>
            {finalPrice > 0 && (
              <p className="text-white/60 text-[10px] font-semibold">Per Person (taxes excluded)</p>
            )}
          </div>

          <div className="space-y-2">
            <button
              onClick={() => {
                const hotelParam = selectedHotel?.type ? `?hotel=${selectedHotel.type}` : "";
                window.location.href = `/checkout/${packageData.packageSlug}${hotelParam}`;
              }}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-5 py-3 rounded-2xl shadow-lg transition-all text-sm font-bold uppercase tracking-widest active:scale-95 hover:opacity-90"
            >
              Book Now
            </button>
          </div>
        </div>

        <div className="gradient-btn rounded-3xl shadow-xl overflow-hidden p-4 border border-white/20">
          <h3 className="text-lg font-bold text-white mb-4">Quick Enquiry</h3>
          <EnquiryFormFields 
            variant="inline" 
            formType="potential"
            hideFields={["destination"]}
            initialData={{ destination: packageData?.region }}
            onSuccess={() => confirmationDialogControls.open()}
            buttonText="Send Enquiry"
            whiteLabels={true}
            brandYellow={true}
          />
        </div>

        <div className="mt-6 flex flex-col items-center">
          <button 
            onClick={copyCurrentUrl}
            className="flex items-center gap-3 text-slate-500 hover:text-brand-blue transition-colors text-sm font-medium group"
          >
            <span>Share or copy package link</span>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-brand-blue/10">
              <Share2 className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSidebar;
