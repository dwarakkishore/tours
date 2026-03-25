import { cn } from "@/lib/utils";

const Container = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "px-4 w-full max-w-full mx-auto c-sm:max-w-[calc(100vw-50px)] c-md:max-w-[calc(100vw-80px)] c-lg:max-w-[calc(100vw-100px)] c-xxl:max-w-[1440px] c-xxxl:max-w-[1600px]",
        className
      )}
      suppressHydrationWarning
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
