import React, { useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCheckout } from "@/contexts/CheckoutContext";
import testPackageData from "../../data/testPackageData";
import WebsiteLoader from "../ui/WebsiteLoader";
import { formatPrice } from "@/utils/offerUtils";

const splitStringAtHyphen = (str) => {
  return str.split("-");
};

const hotelMap = {
  threestar: 3,
  fourstar: 4,
  fivestar: 5,
};

const CheckoutSummary = ({
  packageData = testPackageData,
  onGrandTotalChange,
}) => {
  const searchParams = useSearchParams();
  const hotelType = React.useMemo(
    () => searchParams.get("hotel"),
    [searchParams]
  );

  const { numAdults, numChildren, numToddler } = useCheckout();

  const hotelCost = packageData.hotelCharges[hotelType].additionalCharge;

  const { domestic: packageIsDomestic, pricing } = packageData;

  const gst = packageData?.taxes?.gst || 0;
  const tcs = packageData?.taxes?.tcs || 0;
  const gstCost = packageData.basePrice * (gst / 100);
  const tcsCost = packageData.basePrice * (tcs / 100);
  const totalCost =
    numAdults * packageData.basePrice +
    numAdults * hotelCost +
    (numChildren * pricing.kidsPricing.price || 0) +
    (numToddler * pricing.infantPricing.price || 0);
  const totalCostWithTax = totalCost + gstCost + tcsCost;

  useEffect(() => {
    onGrandTotalChange(Math.ceil(totalCostWithTax));
  }, [totalCostWithTax, onGrandTotalChange]);

  const citiesArr = splitStringAtHyphen(packageData.citiesList);

  if (packageData.packageSlug === "test-package-check") {
    return <WebsiteLoader />;
  }

  return (
    <div>
      <div className="relative h-52 overflow-hidden rounded-2xl bg-black">
        <div className="absolute inset-0 z-10">
          <Image
            src={packageData.bannerImages[0].url}
            alt={packageData.packageName}
            height={208}
            width={400}
            className="size-full object-cover opacity-70"
          />
        </div>
        <div className="relative z-20 flex h-full items-end p-4 font-semibold text-white">
          <h4 className="text-xl">{packageData.packageName}</h4>
        </div>
      </div>

      <div className="p-8">
        <div className="text-white">
          <div>
            <span className="flex flex-wrap items-center gap-2">
              <span className="text-sm">Locations covered:</span>
              {citiesArr.length > 0 &&
                citiesArr.map((item, i) => (
                  <span
                    key={i}
                    className="inline-block rounded-full border-2 border-solid border-[#59DF02] px-4 py-1 text-xs font-semibold capitalize"
                  >
                    {item}
                  </span>
                ))}
            </span>
          </div>
          <div className="py-4 text-sm">
            <hr className="h-px bg-[#D9D9D9]" />
            <div className="grid grid-cols-2 py-4 ">
              <span>Duration:</span>
              <span className="font-semibold">
                {packageData.days} Days / {packageData.nights} Nights
              </span>
            </div>
            <hr className="h-px bg-[#D9D9D9]" />
            <div className="grid grid-cols-2 py-4 ">
              <span>Hotel Type:</span>
              <span className="font-semibold">{hotelMap[hotelType]} Star</span>
            </div>
            <hr className="h-px bg-[#D9D9D9]" />

            <hr className="h-px bg-[#D9D9D9]" />
            <div className="grid grid-cols-2 py-4 ">
              <span>No of Adults:</span>
              <span className="font-semibold">{numAdults} Adults</span>
            </div>
            <hr className="h-px bg-[#D9D9D9]" />
            <div className="grid grid-cols-2 py-4 ">
              <span>No of Children:</span>
              <span className="font-semibold">{numChildren} Children</span>
            </div>
            <hr className="h-px bg-[#D9D9D9]" />
            <div className="grid grid-cols-2 py-4 ">
              <span>Toddlers:</span>
              <span className="font-semibold">{numToddler} Toddlers</span>
            </div>
            <hr className="h-px bg-[#D9D9D9]" />
            <div className="py-8">
              <div className="mb-2 grid grid-cols-2 text-xl">
                <span className="">Total:</span>
                <span className="font-semibold">
                  ₹{formatPrice(Math.ceil(totalCost))}
                </span>
              </div>
              <div className="grid grid-cols-2 text-xl">
                <span className="">GST:</span>
                <span className="font-semibold">{gst}%</span>
              </div>
              {!packageIsDomestic && (
                <div className="grid grid-cols-2 text-xl">
                  <span className="">TCS:</span>
                  <span className="font-semibold">{tcs}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-2xl bg-brand-blue px-8 py-3 text-white">
        <div className="grid items-center gap-4 text-xl c-sm:grid-cols-2">
          <span className="font-semibold">Grand Total:</span>
          <span className="inline-block justify-self-start rounded-full bg-white px-6 py-3 text-2xl font-semibold text-brand-blue">
            ₹{formatPrice(Math.ceil(totalCostWithTax))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
