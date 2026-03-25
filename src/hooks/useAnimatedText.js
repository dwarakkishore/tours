import { useState, useEffect } from "react";

export function useAnimatedText(items = [], interval = 4000) {
  const [currentText, setCurrentText] = useState(items[0] || "");

  useEffect(() => {
    if (items.length === 0) return;

    let index = 0;
    const timer = setInterval(() => {
      setCurrentText(items[index]);
      index = (index + 1) % items.length;
    }, interval);

    return () => clearInterval(timer);
  }, [items, interval]);

  return currentText;
}
