"use client";

import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { COLLECTIONS } from "@/config";
import { sanitizeDocumentData } from "@/utils/firebase";

/**
 * Custom hook to fetch region factsheet data from Firestore
 * @param {string} regionId - The ID of the region to fetch data for
 * @returns {Object} - { factSheetData, isLoading, error }
 */
export function useRegionFactSheet(regionId) {
  const [factSheetData, setFactSheetData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!regionId) {
      setIsLoading(false);
      return;
    }

    const fetchFactSheetData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        
        // Use the correct collection name from config
        const collectionName = COLLECTIONS.REGION_FACTS_SHEET || "region_facts_sheet";
        const factsSheetRef = collection(db, collectionName);
        
        // Query by regionId field as seen in the JSON data
        const q = query(factsSheetRef, where("regionId", "==", regionId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const data = sanitizeDocumentData(querySnapshot.docs[0]);
          setFactSheetData(data);
        } else {
          setFactSheetData(null);
        }
      } catch (err) {
        setError(err);
        setFactSheetData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFactSheetData();
  }, [regionId]);

  return { factSheetData, isLoading, error };
}
