"use client";
import { useEffect, useState } from "react";
import { useRegionsData } from "@/hooks/regions";
import { cn } from "@/lib/utils";
import Link from "next/link";

const InternationalContent = ({
  setActiveDropdown,
  handleActiveItem,
  handleIsDropdownActive,
  handleMenuActive,
  isHeaderFixed,
}) => {
  const [activeItem, setActiveItem] = useState(null);
  const { internationalRegions, regionIsLoading } = useRegionsData();

  const filteredContinents =
    internationalRegions &&
    internationalRegions?.filter(
      (item) => item.regions && item.regions.length > 0
    );

  useEffect(() => {
    if (filteredContinents && filteredContinents.length > 0 && !activeItem) {
      setActiveItem(filteredContinents[0]);
    }
    
  }, [filteredContinents, activeItem]);

  if (regionIsLoading) {
    return (
      <div className="flex items-center justify-center p-8 text-white">
        Loading Regions...
      </div>
    );
  }

  // If we have internationalRegions (the continent array) but none have regions
  if (!filteredContinents || filteredContinents.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-white opacity-50">
        No international regions currently visible.
      </div>
    );
  }

  const handleClose = () => {
    setActiveDropdown?.(null);
    handleActiveItem?.(null);
    handleIsDropdownActive?.();
    handleMenuActive?.();
  };

  const handleItemHover = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="mx-auto c-lg:p-8">
      <div className="grid c-lg:grid-cols-[200px_1fr]">
        <ul
          className={cn(
            "my-4 flex max-w-[calc(100%-40px)] gap-1 overflow-hidden overflow-x-scroll py-4 c-lg:my-0 c-lg:max-w-full c-lg:flex-col c-lg:items-end c-lg:justify-center c-lg:gap-8 c-lg:overflow-x-hidden c-lg:border-r c-lg:border-solid c-lg:py-12 c-lg:pr-4 c-lg:text-right"
          )}
        >
          {filteredContinents &&
            filteredContinents.map((item) => (
              <li
                className={cn(
                  "cursor-pointer rounded-lg px-4 py-1 flex items-center gap-2 transition-all duration-300 text-white",
                  {
                    "text-brand-blue c-lg:hover:bg-brand-blue c-lg:hover:text-white c-lg:border-brand-blue/30":
                      !isHeaderFixed,
                    "bg-brand-blue text-white":
                      activeItem?.feKey === item.feKey,
                    "c-lg:bg-white c-lg:text-brand-blue c-lg:border-white/30":
                      isHeaderFixed && activeItem?.feKey === item.feKey,
                  }
                )}
                key={item.feKey}
                onMouseEnter={() => handleItemHover(item)}
              >
                {item.displayName}
              </li>
            ))}
        </ul>

        <ul
          className={cn(
            "grid gap-6 c-sm:grid-cols-2 c-md:grid-cols-3 c-lg:grid-cols-4 c-lg:py-6 c-lg:pl-8"
          )}
        >
          {activeItem &&
            activeItem.regions &&
            activeItem.regions.map((region) => (
              <li key={region.id}>
                <Link
                  onClick={handleClose}
                  className="domestic-packages-content rounded-full px-4 py-2 transition-all duration-300 ease-in text-white/80 hover:text-white"
                  href={`/packages/${region.slug}`}
                >
                  {region.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default InternationalContent;
