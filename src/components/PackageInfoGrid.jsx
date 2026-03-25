import React from "react";
import PackageInfoCard from "./PackageInfoCard";
import Image from "next/image";

const ICON_SIZE = 100;

const PackageInfoGrid = ({
  departureCities = "N/A",
  tripDates = [],
  mealsDetails = "N/A",
  visaDetails = "N/A",
}) => {
  // Format dates for display
  const formatTripDates = () => {
    if (!tripDates || tripDates.length === 0) {
      return "N/A";
    }

    // Sort dates to ensure they're in order
    const sortedDates = [...tripDates].sort(
      (a, b) => new Date(a.startDate) - new Date(b.startDate)
    );

    const upcomingTrip = sortedDates[0];
    const nextTrip = sortedDates[1];

    let dateDescription = `Upcoming Trip: ${upcomingTrip?.startDate || "N/A"}`;
    if (nextTrip) {
      dateDescription += `\nNext Available Trip: ${nextTrip.startDate}`;
    }

    return dateDescription;
  };

  // Calculate group size info
  const getGroupSizeInfo = () => {
    if (!tripDates || tripDates.length === 0) {
      return "N/A";
    }

    // Get the first upcoming trip
    const nextTrip = tripDates[0];
    if (nextTrip) {
      return `${nextTrip.totalSeats - nextTrip.bookedSeats} seats are available out of ${nextTrip.totalSeats} seats`;
    }

    return "N/A";
  };

  const packageInfo = [
    {
      title: "Departure Cities",
      description: departureCities,
      icon: (
        <Image
          src="/3d-icons/flight.svg"
          alt="Flight Icon"
          width={ICON_SIZE}
          height={ICON_SIZE}
          className="object-contain"
        />
      ),
    },
    {
      title: "Group Size",
      description: getGroupSizeInfo(),
      icon: (
        <Image
          src="/3d-icons/ugroup.svg"
          alt="Group Icon"
          width={ICON_SIZE}
          height={ICON_SIZE}
          className="object-contain"
        />
      ),
    },
    {
      title: "Dates",
      description: formatTripDates(),
      icon: (
        <Image
          src="/3d-icons/calender.svg"
          alt="Calendar Icon"
          width={ICON_SIZE}
          height={ICON_SIZE}
          className="object-contain"
        />
      ),
    },
    {
      title: "Meals",
      description: mealsDetails,
      icon: (
        <Image
          src="/3d-icons/meals.svg"
          alt="Meals Icon"
          width={ICON_SIZE}
          height={ICON_SIZE}
          className="object-contain"
        />
      ),
    },
    {
      title: "Visa",
      description: visaDetails,
      icon: (
        <Image
          src="/3d-icons/visa.svg"
          alt="Visa Icon"
          width={ICON_SIZE}
          height={ICON_SIZE}
          className="object-contain"
        />
      ),
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {packageInfo.map(
        (info, index) =>
          info.description !== "N/A" && (
            <PackageInfoCard
              key={index}
              title={info.title}
              description={info.description}
              icon={info.icon}
            />
          )
      )}
    </div>
  );
};

export default PackageInfoGrid;
