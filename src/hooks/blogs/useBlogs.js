"use client";
import { useState, useCallback } from "react";
import {
  collection,
  query,
  where,
  getDocsFromServer,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { COLLECTIONS } from "@/config";
import { sanitizeDocumentData } from "@/utils/firebase";

export const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBlogs = useCallback(async (options = {}) => {
    const { 
      region = null, 
      category = null, 
      featured = null, 
      limitCount = 6, 
      excludeId = null 
    } = options;

    setIsLoading(true);
    setError(null);

    try {
      const blogsRef = collection(db, COLLECTIONS.BLOGS);
      
      let fetchedBlogs = [];

      if (region) {
        // Dual Query Strategy for Region
        // 1. Prepare Capitalized Region for City Array match
        const capitalizedRegion = region
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        // Query A: Check 'city' array (Capitalized)
        const constraintsA = [
          where("status", "==", "published"),
          where("city", "array-contains", capitalizedRegion),
          orderBy("createdAt", "desc"),
          limit(limitCount + (excludeId ? 1 : 0))
        ];
        if (featured !== null) constraintsA.push(where("featured", "==", featured));

        // Query B: Check 'region' field (Original/Lowercase)
        const constraintsB = [
          where("status", "==", "published"),
          where("region", "==", region),
          orderBy("createdAt", "desc"),
          limit(limitCount + (excludeId ? 1 : 0))
        ];
        if (featured !== null) constraintsB.push(where("featured", "==", featured));

        // Execute Parallel Queries
        const [snapshotA, snapshotB] = await Promise.all([
          getDocsFromServer(query(blogsRef, ...constraintsA)),
          getDocsFromServer(query(blogsRef, ...constraintsB))
        ]);

        // Combine and Deduplicate
        const uniqueMap = new Map();
        
        [...snapshotA.docs, ...snapshotB.docs].forEach(doc => {
          const data = sanitizeDocumentData(doc);
          if (excludeId && data.id === excludeId) return;
          if (!uniqueMap.has(data.id)) {
            uniqueMap.set(data.id, data);
          }
        });

        fetchedBlogs = Array.from(uniqueMap.values());
        
        // Re-sort combined results by date
        fetchedBlogs.sort((a, b) => {
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
          return dateB - dateA; // Descending
        });

      } else {
        // Standard Single Query (Category or General)
        const blogsRef = collection(db, COLLECTIONS.BLOGS);
        const constraints = [where("status", "==", "published")];

        if (featured !== null) {
          constraints.push(where("featured", "==", featured));
        }

        if (category) {
          constraints.push(where("categories", "array-contains", category));
        }

        constraints.push(orderBy("createdAt", "desc"));
        constraints.push(limit(limitCount + (excludeId ? 1 : 0)));

        const snapshot = await getDocsFromServer(query(blogsRef, ...constraints));
        
        snapshot.forEach((doc) => {
          const data = sanitizeDocumentData(doc);
          if (excludeId && data.id === excludeId) return;
          fetchedBlogs.push(data);
        });
      }



      setBlogs(fetchedBlogs.slice(0, limitCount));
    } catch (err) {
      console.warn("Firestore query failed, attempting in-memory fallback:", err.message);
      
      // Fallback: If query fails (likely missing index), fetch all published blogs and filter in memory
      try {
        const fallbackQ = query(
          collection(db, COLLECTIONS.BLOGS),
          where("status", "==", "published")
        );
        const fallbackSnapshot = await getDocsFromServer(fallbackQ);
        let allBlogs = [];
        fallbackSnapshot.forEach((doc) => {
          allBlogs.push(sanitizeDocumentData(doc));
        });
        


        // Robust Memory filtering
        let filtered = allBlogs;
        
        if (featured !== null) {
          filtered = filtered.filter(b => b.featured === featured);
        }
        
        if (region) {
          const regionLower = region.toLowerCase().replace(/-/g, ' ');
          const regionCapitalized = region
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');


          
          filtered = filtered.filter(b => {
             // 1. Check city array (Primary)
             if (b.city && Array.isArray(b.city)) {
               if (b.city.includes(regionCapitalized)) return true;
               // Case-insensitive check for city array
               if (b.city.some(c => c.toLowerCase() === regionLower)) return true;
             }

             // 2. Check region field (Legacy/Secondary)
             if (b.region && b.region.toLowerCase() === regionLower) return true;
             
             // 3. Check tags
             if (b.tags && Array.isArray(b.tags)) {
               return b.tags.some(tag => tag.toLowerCase().includes(regionLower));
             }
             
             return false;
          });
          

        } else if (category) {
          filtered = filtered.filter(b => b.categories && b.categories.includes(category));
        }

        // Memory sorting by date
        filtered.sort((a, b) => {
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
          return dateB - dateA;
        });

        if (excludeId) {
          filtered = filtered.filter(b => b.id !== excludeId);
        }

        // Final Global Fallback REMOVED for region queries
        // If strict filtering is active (region is present) and no blogs are found,
        // we deliberately return empty list so the UI section is hidden.
        if (filtered.length === 0 && !region) {
          filtered = allBlogs;
          filtered.sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
            return dateB - dateA;
          });
          if (excludeId) {
            filtered = filtered.filter(b => b.id !== excludeId);
          }
        }
        
        setBlogs(filtered.slice(0, limitCount));
      } catch (fallbackErr) {
        console.error("Critical: Fallback also failed:", fallbackErr);
        setError(fallbackErr);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { blogs, isLoading, error, fetchBlogs };
};
