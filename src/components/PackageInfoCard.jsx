import React from "react";

const PackageInfoCard = ({ icon, title, description }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white px-6 transition-all duration-300">
      {/* Left half-circle decoration */}
      <div className="absolute -left-9 top-1/2 z-10 size-16 -translate-y-1/2 rounded-full bg-brand-blue transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-700 group-hover:to-blue-500" />

      <div className="relative z-40 flex items-center gap-4">
        <div className="-ml-6 flex size-16 items-center justify-center rounded-full text-blue-600">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-brand-blue">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PackageInfoCard;
