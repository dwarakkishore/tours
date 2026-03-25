import { useState, useEffect } from "react";
import { H3 } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import RatingLabel from "@/components/RatingLabel";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import useModal from "@/hooks/useModal";
import { Share2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { formatPrice } from "@/utils/offerUtils";
import { convertAndSortHotels } from "@/lib/utils";

const ratingMap = {
  threestar: 3,
  fourstar: 4,
  fivestar: 5,
};

const NewBookNowForm = ({ packageData, offerData }) => {
  const { openModal } = useModal();
  const pathname = usePathname();

  const _hotels = convertAndSortHotels(packageData.hotelDetails);

  const hotels = _hotels.hotelDetails;

  const baseCategory = packageData.hotelDetails.baseCategory;

  const initialHotel = hotels.find((hotel) => hotel.type === baseCategory);

  const [selectedHotel, setSelectedHotel] = useState(initialHotel);

  useEffect(() => {
    localStorage.setItem(
      "selectedPackage",
      `/checkout/${packageData.packageSlug}?hotel=${selectedHotel?.type}`
    );
  }, [packageData.packageSlug, selectedHotel?.type]);

  const handleValueChange = (value) => {
    setSelectedHotel(hotels.filter((hotel) => hotel.type === value)[0]);
  };

  const copyCurrentUrl = async () => {
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}${pathname}`;

    try {
      await navigator.clipboard.writeText(fullUrl);
      // Optional: Add some visual feedback
      // You could set a state to show a tooltip or change button text temporarily

      toast("Success", {
        description: "Link Copied to Clipboard",
      });
    } catch (err) {
    }
  };

  return (
    <>
      {/* Form start */}

      <div className="relative self-start rounded bg-brand-blue p-6 py-8 text-white">
        {offerData && (
          <div className="absolute left-0 top-0 z-0 flex size-full items-center justify-center overflow-hidden">
            <span className="scale-[5] select-none text-9xl opacity-5">%</span>
          </div>
        )}
        <div className="relative z-10">
          {(offerData
            ? offerData.offerPrice + selectedHotel.additionalCharge
            : packageData.basePrice + selectedHotel.additionalCharge) > 0 && (
            <div className="mb-6">
              <p className="mb-4 text-xl">Hotel Type</p>

              <RadioGroup
                onValueChange={handleValueChange}
                defaultValue="3-star"
                className="flex flex-col items-start gap-4 c-lg:flex-row"
              >
                {hotels.map(
                  (hotel) =>
                    hotel.isAvailable && (
                      <div className="flex items-center" key={uuidv4()}>
                        <RadioGroupItem
                          className="hidden"
                          value={hotel.type}
                          id={hotel.type}
                        />
                        <Label
                          htmlFor={hotel.type}
                          className="flex cursor-pointer flex-col gap-2"
                        >
                          <RatingLabel
                            value={hotel.type}
                            rating={ratingMap[hotel.type]}
                            selectedHotel={selectedHotel}
                          />
                          {hotel.additionalCharge > 0 && (
                            <span className="mt-1 text-xs opacity-50">
                              +{formatPrice(hotel.additionalCharge)} INR
                            </span>
                          )}
                        </Label>
                      </div>
                    )
                )}
              </RadioGroup>
            </div>
          )}

          <div className="mb-6">
            <div className="flex flex-col gap-2">
              {offerData ? (
                <div>
                  <div className="flex flex-col gap-3">
                    {offerData.offerPrice + selectedHotel.additionalCharge ===
                    0 ? (
                      <H3 className="text-3xl c-lg:text-4xl">
                        Contact an Expert for Prices
                      </H3>
                    ) : (
                      <H3>
                        <span className="mr-2 font-light">₹</span>
                        <span className="text-3xl c-lg:text-5xl">
                          {formatPrice(
                            offerData.offerPrice +
                              selectedHotel.additionalCharge
                          )}
                        </span>
                      </H3>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-2xl line-through">
                        ₹{" "}
                        {formatPrice(
                          packageData.basePrice + selectedHotel.additionalCharge
                        )}
                      </span>
                      <span className="h-fit rounded-md bg-green-100 px-2 py-0.5 text-xs font-medium text-[#237648]">
                        SAVE INR. {formatPrice(offerData.savingsAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : packageData.basePrice + selectedHotel.additionalCharge ===
                0 ? (
                <H3 className="text-3xl c-lg:text-4xl">
                  Contact an Expert for Prices
                </H3>
              ) : (
                <H3>
                  <span className="mr-2 font-light">₹</span>
                  <span className="text-3xl c-lg:text-4xl">
                    {formatPrice(
                      packageData.basePrice + selectedHotel.additionalCharge
                    )}
                  </span>
                </H3>
              )}
              {(offerData
                ? offerData.offerPrice + selectedHotel.additionalCharge
                : packageData.basePrice + selectedHotel.additionalCharge) >
                0 && (
                <div className="flex gap-2">
                  <span className="text-xs font-thin">
                    {/* Price Per Person | Inclusive of all taxes */}
                    Price Per Person
                  </span>
                </div>
              )}
            </div>
          </div>
          <Button
            onClick={openModal}
            variant="outline"
            className="mb-4 w-full rounded border border-white py-6 text-base hover:bg-white hover:text-brand-blue"
            size="lg"
          >
            Request a Call back
          </Button>
          {(offerData
            ? offerData.offerPrice + selectedHotel.additionalCharge
            : packageData.basePrice + selectedHotel.additionalCharge) > 0 && (
            <Button
              variant="success"
              className="mb-2 w-full rounded bg-brand-blue py-8 text-lg font-bold c-md:text-xl"
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
          {/* <div className="text-center">
          <Link href="#" className="text-sm underline">
            EMI options available
          </Link>
        </div> */}
        </div>
      </div>
      <div className="relative z-20 text-center">
        <Button
          type="button"
          onClick={copyCurrentUrl}
          className="mt-4 bg-transparent !p-0 text-xs text-[#636363] shadow-none transition-all duration-300 hover:bg-transparent hover:text-brand-blue"
        >
          <span> Share or copy package link:</span>
          <span className="flex size-6 items-center justify-center rounded-full bg-[#ededed]">
            <Share2 />
          </span>
        </Button>
      </div>

      {/* Form end */}
    </>
  );
};

export default NewBookNowForm;
