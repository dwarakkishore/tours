"use client";
import { useState } from "react";
import Container from "../ui/Container";
import Image from "next/image";
import { ParallaxScrollDemo } from "../ui/ParallaxScroll/ParallaxScrollDemo";
import { cn } from "@/lib/utils";
import BadgeSection from "../BadgeSection";

const ItineraryHeroDesktop = ({ packageData }) => {
  const validBannerImages = packageData?.bannerImages?.filter(
    (image) => image && image?.url !== null
  );

  const [bannerImgUrl, setBannerImgUrl] = useState(validBannerImages[0]?.url);

  return (
    <section
      className={cn(
        "relative z-30 hidden pb-10 pt-28 c-xl:block",
        validBannerImages?.length === 0 && "pb-4"
      )}
    >
      <Container>
        <div className="mb-4 flex flex-col items-start gap-2 c-lg:flex-row c-lg:items-center c-lg:justify-between">
          <h1 className="max-w-screen-c-md text-2xl  font-semibold leading-[130%] text-white c-xl:text-[38px]">
            {packageData?.packageTitle}
          </h1>
          <div className="shrink-0 rounded bg-brand-blue px-4 py-2 text-white">
            <h4 className="text-xl font-semibold ">
              {packageData?.days} Days & <br /> {packageData?.nights} Nights
            </h4>
          </div>
        </div>
        {validBannerImages?.length > 0 ? (
          <div className="grid shadow rounded border border-solid border-[#A8BFE2] bg-white/40 p-[5px] backdrop-blur-sm c-xl:grid-cols-[1fr_280px] c-xl:p-3 c-xxl:grid-cols-[1fr_400px] c-xxxl:grid-cols-[1fr_400px]">
            <div className="h-[50vh] overflow-hidden rounded c-xl:h-[500px]">
              <div className="absolute left-4 top-4 z-10 p-2">
                <div className="animate-fadeIn flex gap-2">
                  {/* Badge Data need to be passed */}
                  <BadgeSection item={packageData} />
                </div>
              </div>
              <Image
                src={bannerImgUrl}
                alt="Nature"
                width={1000}
                height={1000}
                className="size-full object-cover"
              />
            </div>
            <div>
              <ParallaxScrollDemo
                onBannerImgUrl={setBannerImgUrl}
                images={validBannerImages}
              />
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
};

export default ItineraryHeroDesktop;
