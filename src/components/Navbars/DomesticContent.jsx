"use client";
import Link from "next/link";
import { useRegionsData } from "@/hooks/regions";

const DomesticContent = ({
  setActiveDropdown,
  handleActiveItem,
  handleIsDropdownActive,
  handleMenuActive,
}) => {
  const { domesticRegions, regionIsLoading } = useRegionsData();

  if (regionIsLoading) {
    return (
      <div className="flex items-center justify-center p-8 text-white">
        Loading Regions...
      </div>
    );
  }

  if (!domesticRegions || domesticRegions.length === 0)
    return (
      <div className="flex items-center justify-center p-8 text-white opacity-50">
        No domestic regions currently visible.
      </div>
    );

  const handleClose = () => {
    setActiveDropdown && setActiveDropdown(null);
    handleActiveItem && handleActiveItem(null);
    handleIsDropdownActive && handleIsDropdownActive();
    handleMenuActive && handleMenuActive();
  };

  return (
    <div className="mx-auto max-w-screen-lg py-8 c-lg:p-8">
      <ul className="grid gap-6 c-sm:grid-cols-2 c-md:grid-cols-3 c-lg:grid-cols-4">
        {domesticRegions.map((region) => (
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
  );
};

export default DomesticContent;
