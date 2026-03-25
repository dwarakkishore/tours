import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import useModal from "@/hooks/useModal";
import { Share2, Star, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { formatPrice } from "@/utils/offerUtils";

const ratingMap = {
  twostar: 2,
  threestar: 3,
  fourstar: 4,
  fivestar: 5,
};

const convertAndSortHotels = (hotelCharges) => {
  const desiredOrder = ["twostar", "threestar", "fourstar", "fivestar"];
  const hotelArray = Object.entries(hotelCharges).map(([type, details]) => ({
    type,
    ...details,
  }));
  return hotelArray.sort((a, b) => {
    const indexA = desiredOrder.indexOf(a.type);
    const indexB = desiredOrder.indexOf(b.type);
    return indexA - indexB;
  });
};

const BookNowForm = ({ packageData, offerData }) => {
  const { openModal } = useModal();
  const pathname = usePathname();

  const hotels = convertAndSortHotels(packageData.hotelCharges || {});
  const initialHotel = hotels.find((hotel) => hotel.isBase) || hotels[0];

  const [selectedHotel, setSelectedHotel] = useState(initialHotel);

  useEffect(() => {
    localStorage.setItem(
      "selectedPackage",
      `/checkout/${packageData.packageSlug}?hotel=${selectedHotel?.type}`
    );
  }, [packageData.packageSlug, selectedHotel?.type]);

  const handleValueChange = (value) => {
    setSelectedHotel(hotels.find((hotel) => hotel.type === value));
  };

  const copyCurrentUrl = async () => {
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}${pathname}`;

    try {
      await navigator.clipboard.writeText(fullUrl);
      toast.success("Link Copied to Clipboard");
    } catch (err) {
    }
  };

  const finalPrice = offerData
    ? offerData.offerPrice + (selectedHotel?.additionalCharge || 0)
    : (packageData.basePrice || 0) + (selectedHotel?.additionalCharge || 0);

  return (
    <>
      <div className="bg-[#0046b8] rounded-2xl shadow-2xl overflow-hidden p-6 text-white border border-blue-400/20">
        <h3 className="text-xl font-bold mb-6 text-left">Hotel Type</h3>

        <div className="grid grid-cols-3 gap-2 mb-8">
          {hotels.map((tier) => {
            const isActive = selectedHotel?.type === tier.type;
            const stars = ratingMap[tier.type] || 5;
            
            return (
              <div key={tier.type} className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleValueChange(tier.type)}
                  className={`w-full flex flex-col items-center justify-center p-2 rounded-lg border-2 transition-all duration-300 ${
                    isActive 
                      ? "bg-[#4fb800] border-[#4fb800] shadow-lg scale-105" 
                      : "bg-transparent border-white/30 hover:border-white/60"
                  }`}
                >
                  <div className="flex gap-0.5 items-center justify-center">
                    {[...Array(stars)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={10} 
                        className="fill-white text-white" 
                      />
                    ))}
                  </div>
                </button>
                {tier.additionalCharge > 0 && !isActive && (
                  <span className="text-[10px] text-white/70 font-medium">
                    +{formatPrice(tier.additionalCharge)} INR
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mb-8 text-left">
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-4xl font-bold">₹ {formatPrice(finalPrice)}</span>
          </div>
          <p className="text-white/70 text-sm font-medium">Price Per Person</p>
          
          {offerData && (
            <div className="mt-4">
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                🎉 SAVE ₹{formatPrice(offerData.savingsAmount)}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Button
            type="button"
            onClick={openModal}
            className="w-full bg-transparent hover:bg-white/5 border-2 border-white text-white py-6 text-base font-bold rounded-xl transition-all duration-300"
            size="lg"
          >
            <Phone size={18} className="mr-2" />
            Request a Call back
          </Button>
          
          {finalPrice > 0 && (
            <Button
              className="w-full bg-[#4fb800] hover:bg-[#5cd600] text-white py-7 text-lg font-bold rounded-xl shadow-xl transition-all duration-300 uppercase tracking-widest"
              size="lg"
              asChild
            >
              <Link
                href={`/checkout/${packageData.packageSlug}?hotel=${selectedHotel?.type}`}
              >
                Book Now
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="relative z-20 text-center mt-6">
        <Button
          type="button"
          onClick={copyCurrentUrl}
          className="flex items-center gap-3 text-slate-400 hover:text-brand-blue transition-colors text-sm font-medium group mx-auto p-0"
        >
          <span>Share or copy package link</span>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-brand-blue/10">
            <Share2 className="w-4 h-4" />
          </div>
        </Button>
      </div>
    </>
  );
};

export default BookNowForm;
