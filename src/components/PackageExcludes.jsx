import PackageIncludeIcon from "@/components/PackageIncludeIcon";
import { H3 } from "@/components/Typography";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

const PackageIncludes = ({ excludes, className }) => {
  return (
    <div className={cn("", className)}>
      <H3 className="mb-5 text-brand-blue">Package Excludes:</H3>
      <ul className="space-y-4">
        {excludes.map((item) => (
          <li key={uuidv4()} className="flex items-start gap-4">
            <PackageIncludeIcon className="mt-[2px]" icon="minus" />

            <p className="text-sm sm:text-base">
              {typeof item === "string" ? item : item.title}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackageIncludes;
