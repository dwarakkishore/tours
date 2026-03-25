"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimatedText } from "@/hooks/useAnimatedText";
import { Input } from "./input";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function AnimatedInput({
  placeholderItems = [],
  interval = 3000,
  className = "",
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const animatedPlaceholder = useAnimatedText(placeholderItems, interval);

  const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <Input
        {...props}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={isFocused ? "Start typing..." : ""}
        className={cn(
          "bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none text-base rounded-xl cursor-pointer",
          className
        )}
      />

      {/* Animated Placeholder */}
      {!isFocused && !value && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={animatedPlaceholder}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="whitespace-nowrap text-ellipsis "
            >
              {animatedPlaceholder}
            </motion.div>

            {/* <motion.div
              key={animatedPlaceholder}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-muted-foreground whitespace-nowrap text-ellipsis"
            >
              {animatedPlaceholder}
            </motion.div> */}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
