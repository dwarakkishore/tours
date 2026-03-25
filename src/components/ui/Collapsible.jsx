import React, { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

const Collapsible = ({
  title = "Title goes here",
  children = "Content goes here",
  defaultOpen = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef(null);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`rounded-lg ${className}`}>
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between rounded-lg bg-brand-blue p-4 text-left text-white"
      >
        <span className="font-medium">{title}</span>
        <span
          className={`flex size-7 items-center justify-center rounded bg-white text-black transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown />
        </span>
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0",
          overflow: "hidden",
          transition: "max-height 0.2s ease-out",
        }}
      >
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Collapsible;
