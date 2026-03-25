import { useState, useEffect, useMemo } from "react";
import { transformActivity } from "@/utils/activityUtils";
import { db } from "@/firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

/**
 * Custom hook to fetch and manage activity data
 * @param {string|null} regionSlug - Optional region slug to filter activities
 * @returns {Object} { activities, loading, error, getActivityBySlug }
 */
export function useActivitiesData(regionSlug = null, regionId = null) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        setLoading(true);
        setError(null);


        // Query Firestore directly - get all documents first
        const regionActivityRef = collection(db, 'region_activity');
        const querySnapshot = await getDocs(regionActivityRef);
        

        if (querySnapshot.empty) {
          setActivities([]);
          setLoading(false);
          return;
        }

        // Extract activities from region documents
        let activitiesData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          
          // Filter by regionId if provided (use document ID or regionId field)
          if (regionId) {
            // Match by regionId field or document ID
            const docRegionId = data.regionId || doc.id;
            if (docRegionId === regionId) {
              if (data.activities && Array.isArray(data.activities)) {
                const effectiveRegionSlug = data.regionSlug || (regionSlug && regionSlug !== "all" ? regionSlug : (data.regionName ? data.regionName.toLowerCase().trim().replace(/\s+/g, "-") : data.slug));
                const activitiesWithCtx = data.activities.map(a => ({
                  ...a,
                  docRegionSlug: effectiveRegionSlug,
                  docRegionName: data.regionName,
                  docCitySlug: data.citySlug,
                  docCityName: data.cityName
                }));
                activitiesData = [...activitiesData, ...activitiesWithCtx];
              }
            }
          } else if (regionSlug && regionSlug !== 'all') {
            // Filter by regionSlug if provided and not 'all'
            const isMatch = 
              data.regionSlug === regionSlug || 
              data.slug === regionSlug || 
              data.regionName?.toLowerCase() === regionSlug?.toLowerCase() ||
              data.regionId === regionSlug ||
              doc.id === regionSlug;

            if (isMatch) {
              if (data.activities && Array.isArray(data.activities)) {
                const effectiveRegionSlug = data.regionSlug || regionSlug || (data.regionName ? data.regionName.toLowerCase().trim().replace(/\s+/g, "-") : data.slug);
                const activitiesWithCtx = data.activities.map(a => ({
                  ...a,
                  docRegionSlug: effectiveRegionSlug,
                  docRegionName: data.regionName,
                  docCitySlug: data.citySlug,
                  docCityName: data.cityName
                }));
                activitiesData = [...activitiesData, ...activitiesWithCtx];
              }
            }
          } else {
            // No filter or 'all' - get all activities
            if (data.activities && Array.isArray(data.activities)) {
              const activitiesWithCtx = data.activities.map(a => {
                const effectiveRegionSlug = data.regionSlug || (data.regionName ? data.regionName.toLowerCase().trim().replace(/\s+/g, "-") : data.slug);
                return {
                  ...a,
                  docRegionSlug: effectiveRegionSlug,
                  docRegionName: data.regionName,
                  docCitySlug: data.citySlug,
                  docCityName: data.cityName
                };
              });
              activitiesData = [...activitiesData, ...activitiesWithCtx];
            }
          }
        });


        // Transform activities to component format
        const transformedActivities = activitiesData
          .map(transformActivity)
          .filter(Boolean); // Remove any null results

        setActivities(transformedActivities);
      } catch (err) {
        setError(err.message || "Failed to fetch activities");
        setActivities([]);
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, [regionSlug, regionId]);

  /**
   * Get a specific activity by its slug
   */
  const getActivityBySlug = useMemo(() => {
    return (slug) => {
      return activities.find(activity => activity.slug === slug);
    };
  }, [activities]);

  /**
   * Get activities by city
   */
  const getActivitiesByCity = useMemo(() => {
    return (citySlug) => {
      return activities.filter(activity => activity.citySlug === citySlug);
    };
  }, [activities]);

  /**
   * Get activities by category
   */
  const getActivitiesByCategory = useMemo(() => {
    return (category) => {
      return activities.filter(activity => activity.category === category);
    };
  }, [activities]);

  return {
    activities,
    loading,
    error,
    getActivityBySlug,
    getActivitiesByCity,
    getActivitiesByCategory,
  };
}

/**
 * Hook to fetch a single activity by slug
 * @param {string} regionSlug - Region slug
 * @param {string} activitySlug - Activity slug
 * @returns {Object} { activity, loading, error }
 */
export function useActivityDetail(regionSlug, activitySlug) {
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchActivity() {
      if (!regionSlug || !activitySlug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);


        // Fetch all documents in region_activity collection
        const regionActivityRef = collection(db, 'region_activity');
        const querySnapshot = await getDocs(regionActivityRef);
        
        if (querySnapshot.empty) {
          setError("Region data not found");
          setActivity(null);
          setLoading(false);
          return;
        }

        // Find the matching region and activity
        let foundActivity = null;
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          
          // Check if this is the right region
          const isMatch = 
            data.regionSlug === regionSlug || 
            data.slug === regionSlug || 
            data.regionName?.toLowerCase() === regionSlug?.toLowerCase() ||
            data.regionId === regionSlug ||
            doc.id === regionSlug;

          if (isMatch && data.activities && Array.isArray(data.activities)) {
            const activity = data.activities.find(a => a.slug === activitySlug);
            if (activity) {
              foundActivity = activity;
            }
          }
        });

        if (!foundActivity) {
          setError("Activity not found");
          setActivity(null);
          return;
        }

        const transformedActivity = transformActivity(foundActivity);
        setActivity(transformedActivity);
      } catch (err) {
        setError(err.message || "Activity not found");
        setActivity(null);
      } finally {
        setLoading(false);
      }
    }

    fetchActivity();
  }, [regionSlug, activitySlug]);

  return {
    activity,
    loading,
    error,
  };
}
