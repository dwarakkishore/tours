import { useState, useCallback, useEffect } from "react";

// Global state to ensure only one card can be expanded across the entire app
let globalExpandedCardId = null;
const globalListeners = new Set();

const useExpandedCard = () => {
  const [expandedCardId, setExpandedCardId] = useState(globalExpandedCardId);

  // Function to update global state and notify all listeners
  const updateGlobalState = useCallback((newId) => {
    globalExpandedCardId = newId;
    globalListeners.forEach((listener) => listener(newId));
  }, []);

  // Function to reset expanded card
  const resetExpandedCard = useCallback(() => {
    updateGlobalState(null);
  }, [updateGlobalState]);

  // Function to toggle card expansion
  const toggleCardExpansion = useCallback(
    (id) => {
      const newId = globalExpandedCardId === id ? null : id;
      updateGlobalState(newId);
    },
    [updateGlobalState]
  );

  // Function to check if a specific card is expanded
  const isCardExpanded = useCallback((id) => {
    return globalExpandedCardId === id;
  }, []);

  // Subscribe to global state changes
  useEffect(() => {
    const listener = (newId) => {
      setExpandedCardId(newId);
    };

    globalListeners.add(listener);

    // Cleanup on unmount
    return () => {
      globalListeners.delete(listener);
    };
  }, []);

  return {
    expandedCardId,
    toggleCardExpansion,
    resetExpandedCard,
    isCardExpanded,
  };
};

export default useExpandedCard;
