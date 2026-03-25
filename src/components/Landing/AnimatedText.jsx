"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimatedText } from "@/hooks/useAnimatedText";

export default function AnimatedText({ items = [] }) {
  const text = useAnimatedText(items);

  if (items.length === 0) return null;

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={text}
        variants={textVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="text-lg font-poppins text-[#8C8C8C] over"
      >
        &quot;{text}&quot;
      </motion.div>
    </AnimatePresence>
  );
}
