import PackageIncludeIcon from "@/components/PackageIncludeIcon";
import { H3 } from "@/components/Typography";
import { v4 as uuidv4 } from "uuid";

const PackageIncludes = ({ includes }) => {
  return (
    <div className="mb-10">
      <H3 className="mb-5 text-brand-blue">Package Includes:</H3>
      <ul className="space-y-4">
        {includes.map((item) => (
          <li key={uuidv4()} className="flex items-center gap-4">
            <PackageIncludeIcon />

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
