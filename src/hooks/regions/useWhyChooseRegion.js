"use client";

import { useState, useEffect } from "react";
import { doc, getDocFromServer } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { COLLECTIONS } from "@/config";
import { sanitizeDocumentData } from "@/utils/firebase";

/**
 * Custom hook to fetch why_choose_region data from Firestore
 * @param {string} regionId - The ID of the region to fetch data for
 * @returns {Object} - { whyChooseData, isLoading, error }
 */
export function useWhyChooseRegion(regionId) {
  const [whyChooseData, setWhyChooseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!regionId) {
      setIsLoading(false);
      return;
    }

    const fetchWhyChooseData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const docRef = doc(db, COLLECTIONS.WHY_CHOOSE_REGION, regionId);
        const docSnap = await getDocFromServer(docRef);

        if (docSnap.exists()) {
          const data = sanitizeDocumentData(docSnap);
          setWhyChooseData(data);
        } else {
          setWhyChooseData(null);
        }
      } catch (err) {
        setError(err);
        setWhyChooseData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWhyChooseData();
  }, [regionId]);

  return { whyChooseData, isLoading, error };
}
