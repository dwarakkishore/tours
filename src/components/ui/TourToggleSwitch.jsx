"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./button";
import { cn } from "@/lib/utils";

const TourToggleSwitch = () => {
  const searchParams = useSearchParams();
  const isDomestic = searchParams.get("domestic") === "true";
  const router = useRouter();

  const handleToggle = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("domestic", !isDomestic);
    const newPath = `${window.location.pathname}?${newSearchParams.toString()}`;
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleToggle}
        variant={isDomestic ? "default" : "outline"}
        className={cn(
          "rounded-full border border-[#595959] text-[#5D5D5D] text-base px-5",
          isDomestic &&
            "border-brand-blue bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20"
        )}
      >
        Domestic
      </Button>
      <Button
        onClick={handleToggle}
        variant={isDomestic ? "outline" : "default"}
        className={cn(
          "rounded-full border border-[#595959] text-[#5D5D5D] text-base px-5",
          !isDomestic &&
            "border-brand-blue bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20"
        )}
      >
        International
      </Button>
    </div>
  );
};

export default TourToggleSwitch;
