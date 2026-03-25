import React from "react";
import Image from "next/image";

const ServicesCard = ({ item }) => {
  return (
    <article className="max-w-[280px] text-center">
      <Image
        width={80}
        height={80}
        src={item.icon}
        alt={item.alt}
        className="mx-auto mb-4"
      />
      <h4 className="mb-2 text-lg font-bold uppercase text-brand-blue">
        {item.title}
      </h4>
      <p className="text-sm">{item.description}</p>
    </article>
  );
};

export default ServicesCard;
