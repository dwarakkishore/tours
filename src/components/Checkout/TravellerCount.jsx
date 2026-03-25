import React from "react";
import Incrementor from "../ui/Incrementor";
import { useCheckout } from "@/contexts/CheckoutContext";
import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const TravellerCount = ({ packageData }) => {
  const {
    numAdults,
    numChildren,
    numToddler,
    setNumAdults,
    setNumChildren,
    setNumToddler,
  } = useCheckout();

  if (!packageData) return;

  const {
    domestic: packageIsDomestic,
    pricing: { kidsAllowed },
  } = packageData;

  const age = {
    adult: { from: packageIsDomestic ? 13 : 11 },
    children: {
      from: packageIsDomestic ? 6 : 4,
      to: packageIsDomestic ? 13 : 11,
    },
    toddler: { from: packageIsDomestic ? 0 : 0, to: packageIsDomestic ? 5 : 3 },
  };

  return (
    <div className="relative col-span-full grid grid-cols-2 gap-5 rounded-2xl border border-solid border-[#D9D9D9] p-6 pt-10 c-xxl:grid-cols-3 c-xxl:items-start">
      <h5 className="absolute left-6 top-0 inline-block -translate-y-1/2 bg-white px-3 font-bold uppercase text-brand-blue">
        Traveller count
      </h5>

      <div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <h5 className="font-medium text-[#474747]">Adults</h5>
            <span className="text-[10px] text-[#656565]">
              Above {age.adult.from} years of age
            </span>
          </div>
          <Incrementor
            initialValue={numAdults}
            setCount={setNumAdults}
            min={1}
          />
        </div>
        {numAdults === 1 && (
          <div className="mt-4 flex gap-2 rounded-xl bg-red-100 px-4 py-2 text-xs text-red-500">
            <TriangleAlert className="size-4" />
            For single person booking prices will vary
          </div>
        )}
      </div>

      <div>
        <div
          className={cn("flex items-center gap-4", {
            "opacity-50": !kidsAllowed,
          })}
        >
          <div className="flex flex-col">
            <h5 className="font-medium text-[#474747]">Children</h5>
            <span className="text-[10px] text-[#656565]">
              Between {age.children.from}-{age.children.to} years of age
            </span>
          </div>
          <Incrementor
            initialValue={numChildren}
            setCount={setNumChildren}
            condition={kidsAllowed}
          />
        </div>
        {!kidsAllowed && (
          <div className="mt-4 flex gap-2 rounded-xl bg-red-100 px-4 py-2 text-xs text-red-500">
            <TriangleAlert className="size-4" />
            Childrens are not allowed
          </div>
        )}
      </div>

      <div>
        <div
          className={cn("flex items-center gap-4", {
            "opacity-50": !kidsAllowed,
          })}
        >
          <div className="flex flex-col">
            <h5 className="font-medium text-[#474747]">Toddlers</h5>
            <span className="text-[10px] text-[#656565]">
              Between {age.toddler.from}-{age.toddler.to} years of age
            </span>
          </div>
          <Incrementor
            initialValue={numToddler}
            setCount={setNumToddler}
            condition={kidsAllowed}
          />
        </div>
        {!kidsAllowed && (
          <div className="mt-4 flex gap-2 rounded-xl bg-red-100 px-4 py-2 text-xs text-red-500">
            <TriangleAlert className="size-4" />
            Toddlers are not allowed
          </div>
        )}
      </div>
    </div>
  );
};

export default TravellerCount;
