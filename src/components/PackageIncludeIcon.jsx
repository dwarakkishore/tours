import { cn } from "@/lib/utils";

const PackageIncludeIcon = ({ icon = "plus", className }) => {
  if (icon === "plus") {
    return (
      <div
        className={cn(
          "size-4 border-[2px] border-solid border-brand-blue rounded relative rotate-45 flex-shrink-0",
          className
        )}
      >
        <span className="absolute left-1/2 top-1/2 inline-block h-[1.5px] w-2 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-brand-blue"></span>
        <span className="absolute left-1/2 top-1/2 inline-block h-[1.5px] w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-brand-blue"></span>
      </div>
    );
  }

  if (icon === "minus") {
    return (
      <div
        className={cn(
          "size-4 border-[2px] border-solid border-transparent rounded relative rotate-45 flex-shrink-0",
          className
        )}
      >
        <span className="absolute left-1/2 top-1/2 inline-block h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-red-500"></span>
        <span className="absolute left-1/2 top-1/2 inline-block h-[1.5px] w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-transparent"></span>
      </div>
    );
  }
};

export default PackageIncludeIcon;
