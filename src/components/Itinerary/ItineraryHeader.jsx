import { cn } from "@/lib/utils";

const ItineraryHeader = ({ packageData }) => {
  const validBannerImages = packageData?.bannerImages?.filter(
    (image) => image && image?.url !== null
  );

  return (
    <section
      className={cn(
        "absolute mb-[-150px] min-h-[50vh] w-full bg-brand-blue pb-7 pt-20 text-white c-sm:min-h-[60vh]",
        validBannerImages?.length === 0 && "mb-0 c-sm:min-h-[22vh]"
      )}
    >
      <div className="pattern-bg absolute inset-0 z-10 opacity-5"></div>
    </section>
  );
};

export default ItineraryHeader;
