import { cn } from "@/lib/utils";

// H1 - Main page headings with brand blue color
export const H1 = ({ className, children }) => {
  return (
    <h1
      className={cn(
        "text-4xl c-lg:text-5xl font-bold font-sans c-lg:leading-[52px] text-brand-blue",
        className
      )}
    >
      {children}
    </h1>
  );
};

// H2 - Section headings with brand blue color
export const H2 = ({ className, children }) => {
  return (
    <h2
      className={cn(
        "text-3xl c-lg:text-4xl font-bold font-sans c-lg:leading-[52px] text-brand-blue",
        className
      )}
    >
      {children}
    </h2>
  );
};

// H3 - Subsection headings with brand blue color
export const H3 = ({ className, children }) => {
  return (
    <h3
      className={cn(
        "text-xl c-lg:text-3xl font-bold font-sans c-lg:leading-8 text-brand-blue",
        className
      )}
    >
      {children}
    </h3>
  );
};

// H4 - Minor headings with brand blue color
export const H4 = ({ className, children }) => {
  return (
    <h4
      className={cn(
        "text-xl c-lg:text-2xl font-bold font-sans c-lg:leading-8 text-brand-blue",
        className
      )}
    >
      {children}
    </h4>
  );
};

// H5 - Small headings with brand blue color
export const H5 = ({ className, children }) => {
  return (
    <h5
      className={cn(
        "text-lg c-lg:text-xl font-bold font-sans c-lg:leading-8 text-brand-blue",
        className
      )}
    >
      {children}
    </h5>
  );
};

// H6 - Smallest headings with brand blue color
export const H6 = ({ className, children }) => {
  return (
    <h6
      className={cn(
        "text-base c-lg:text-lg font-bold font-sans c-lg:leading-8 text-brand-blue",
        className
      )}
    >
      {children}
    </h6>
  );
};

// P - Paragraph text with slate-700 for readability
export const P = ({ className, children }) => {
  return (
    <p
      className={cn(
        "text-base c-lg:text-lg font-normal font-sans leading-relaxed text-slate-700",
        className
      )}
    >
      {children}
    </p>
  );
};

// Span - Inline text with slate-700
export const Span = ({ className, children }) => {
  return (
    <span
      className={cn(
        "text-base font-normal font-sans text-slate-700",
        className
      )}
    >
      {children}
    </span>
  );
};

// Label - Form labels with brand blue color
export const Label = ({ className, children, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-sm c-lg:text-base font-semibold font-sans text-brand-blue",
        className
      )}
    >
      {children}
    </label>
  );
};
