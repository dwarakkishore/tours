"use server";
import { unstable_cache as unstableCache } from "next/cache";
import { cache } from "react";
import {
  DEFAULT_URL,
  COLLECTIONS,
  REVIEWS_CACHE_DURATION,
  REVIEWS_DOC_ID,
  EXCLUDED_INTERNATIONAL_REGIONS,
  EXCLUDED_DOMESTIC_REGIONS,
} from "@/config";
import {
  getCollectionQuery,
  getPackagesByTheme,
  getAllDocuments,
  sanitizeDocumentData,
  getCuratedPackages,
  batchResolveCardReferences,
} from "@/utils/firebase";
import { doc, getDocFromServer, getDocsFromServer, limit, collection, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { minimizePackageData, minimizeRegionData, minimizeReviewData } from "@/utils/dataMinimizers";

// Safe serialization with depth and circularity safeguards
const serializeData = (obj, depth = 0, seen = new WeakSet()) => {
  if (obj === null || obj === undefined || depth > 8) return obj;
  if (typeof obj !== 'object') return obj;
  if (seen.has(obj)) return "[Circular]";
  if (typeof obj.toDate === 'function') return obj.toDate().toISOString();
  if (obj instanceof Date) return obj.toISOString();
  seen.add(obj);

  if (Array.isArray(obj)) {
    return obj.map(item => serializeData(item, depth + 1, seen));
  }

  const result = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = serializeData(obj[key], depth + 1, seen);
    }
  }
  return result;
};

export const fetchReviews = unstableCache(
  async () => {
    try {
      const cacheRef = doc(db, COLLECTIONS.CACHED_REVIEWS, REVIEWS_DOC_ID);
      const cacheDoc = await getDocFromServer(cacheRef);

      if (cacheDoc.exists()) {
        const cachedData = cacheDoc.data();
        const reviews = (cachedData.reviews || []).slice(0, 10).map(minimizeReviewData);
        return serializeData(reviews);
      }

      console.warn(`[fetchReviews] Cache document ${REVIEWS_DOC_ID} not found in collection ${COLLECTIONS.CACHED_REVIEWS}`);
      return [];
    } catch (err) {
      console.error("[fetchReviews] Error fetching reviews from Firestore:", err.message, {
        collection: COLLECTIONS.CACHED_REVIEWS,
        docId: REVIEWS_DOC_ID
      });
      return [];
    }
  },
  ["reviews"],
  {
    revalidate: 60, // 1 minute
  }
);

export const fetchRegions = unstableCache(
  async () => {
    try {
      const regionsQuery = getCollectionQuery(COLLECTIONS.REGIONS);
      const regions = await getDocsFromServer(regionsQuery).then((res) =>
        res.docs.map(sanitizeDocumentData)
      );

      const domestic = regions
          .filter((region) => region.isDomestic)
          .filter((region) => !EXCLUDED_DOMESTIC_REGIONS.includes(region.slug))
          .filter((region) => region.visible !== false)
          .sort((a, b) => a.slug.localeCompare(b.slug))
          .map(minimizeRegionData);

      const international = regions
          .filter((region) => !region.isDomestic)
          .filter((region) => !EXCLUDED_INTERNATIONAL_REGIONS.includes(region.slug))
          .filter((region) => region.visible !== false)
          .sort((a, b) => a.slug.localeCompare(b.slug))
          .map(minimizeRegionData);

      return serializeData({
        domesticRegions: domestic,
        internationalRegions: international,
      });
    } catch (error) {
      console.error("Error fetching regions:", error);
      return {
        domesticRegions: [],
        internationalRegions: [],
      };
    }
  },
  ["regions"],
  {
    revalidate: 60, // 1 minute
  }
);

export const getGroupDeparturePackages = async () => {
  try {
    const groupAdventuresPackages =
      await getPackagesByTheme("group-adventures");

    const offers = await getAllDocuments("offers");

    // Use all published group adventure packages
    const groupDeparturePackages = groupAdventuresPackages
      .filter((item) => {
        // const images = Array.isArray(item.cardImages) ? item.cardImages : [];
        // return images.length > 0;
        return true;
      })
      .map((pkg) => {
        const filteredPkg = {
          ...pkg,
          cardImages: pkg.cardImages.filter((image) => image !== null),
        };

        // Find active offer for this package
        const matchingOffer = offers?.find(
          (offer) => offer.packageId === filteredPkg.id && offer.isActive
        );

        if (matchingOffer) {
          // Calculate offer price
          const offerPrice =
            matchingOffer.discountType === "fixed"
              ? Math.round(filteredPkg.basePrice - matchingOffer.discountValue)
              : Math.round(
                  filteredPkg.basePrice -
                    filteredPkg.basePrice * (matchingOffer.discountValue / 100)
                );

          const savingsAmount = filteredPkg.basePrice - offerPrice;

          // Convert Timestamp to ISO string for serialization
          let offerEndDateStr = null;
          if (matchingOffer.endDate) {
            if (matchingOffer.endDate.toDate) {
              offerEndDateStr = matchingOffer.endDate.toDate().toISOString();
            } else if (matchingOffer.endDate instanceof Date) {
              offerEndDateStr = matchingOffer.endDate.toISOString();
            } else {
              offerEndDateStr = matchingOffer.endDate;
            }
          }

          return {
            ...filteredPkg,
            offerPrice,
            savingsAmount,
            offerId: matchingOffer.id,
            offerEndDate: offerEndDateStr,
          };
        }
        return filteredPkg;
      })
      .sort((a, b) => {
        if (a.groupAdventure?.tripDates[0] && b.groupAdventure?.tripDates[0]) {
          return (
            a.groupAdventure.tripDates[0].startDate -
            b.groupAdventure.tripDates[0].startDate
          );
        }
        return 0;
      });

    return serializeData(groupDeparturePackages.map(minimizePackageData));
  } catch (error) {
    console.error("Error getting group departure packages:", error);
    return [];
  }
};

const getAllPackagesByTheme = async () => {
  try {
    const conditions = [limit(8)];
    const [
      eliteEscapePackages,
      soloExpeditionPackages,
      familyFunventurePackages,
      groupAdventuresPackages,
      religiousRetreatPackages,
      romanticGetawaysPackages,
      explorationBundlePackages,
      educationalPackages,
      relaxRejuvenatePackages,
    ] = await Promise.all([
      getPackagesByTheme("elite-escape", [], conditions, false),
      getPackagesByTheme("solo-expedition", [], conditions, false),
      getPackagesByTheme("family-funventure", [], conditions, false),
      getPackagesByTheme("group-adventures", [], conditions, false),
      getPackagesByTheme("religious-retreat", [], conditions, false),
      getPackagesByTheme("romantic-getaways", [], conditions, false),
      getPackagesByTheme("exploration-bundle", [], conditions, false),
      getPackagesByTheme("educational", [], conditions, false),
      getPackagesByTheme("relax-rejuvenate", [], conditions, false),
    ]);

    // Flatten all packages to resolve references in one big batch
    const allPackages = [
      ...eliteEscapePackages,
      ...soloExpeditionPackages,
      ...familyFunventurePackages,
      ...groupAdventuresPackages,
      ...religiousRetreatPackages,
      ...romanticGetawaysPackages,
      ...explorationBundlePackages,
      ...educationalPackages,
      ...relaxRejuvenatePackages,
    ];

    // Optimize: Resolve all unique references across all themes in ONE batch call
    const resolvedPackages = await batchResolveCardReferences(allPackages);
    
    // Helper to find and minimize resolved packages for each theme
    const pickByTheme = (themeType) => {
      return resolvedPackages
        .filter(pkg => pkg.theme?.includes(themeType))
        .map(minimizePackageData);
    };

    return {
      eliteEscapePackages: pickByTheme("elite-escape"),
      soloExpeditionPackages: pickByTheme("solo-expedition"),
      familyFunventurePackages: pickByTheme("family-funventure"),
      groupAdventuresPackages: pickByTheme("group-adventures"),
      religiousRetreatPackages: pickByTheme("religious-retreat"),
      romanticGetawaysPackages: pickByTheme("romantic-getaways"),
      explorationBundlePackages: pickByTheme("exploration-bundle"),
      educationalPackages: pickByTheme("educational"),
      relaxRejuvenatePackages: pickByTheme("relax-rejuvenate"),
    };
  } catch (error) {
    console.error("Error getting all packages by theme:", error);
    return {};
  }
};

export const getRegionsForHome = cache(unstableCache(
  async () => {
    try {
      const regionsQuery = getCollectionQuery(COLLECTIONS.REGIONS);
      const regionsSnapshot = await getDocsFromServer(regionsQuery);
      let regions = regionsSnapshot.docs.map(sanitizeDocumentData);

      // Batch fetch frontPage card images to enrich regions that lack featuredImage
      const imagesRef = collection(db, COLLECTIONS.IMAGES);
      const q = query(
        imagesRef,
        where("type", "==", "card"),
        where("frontPage", "==", true)
      );
      const imagesSnapshot = await getDocsFromServer(q);
      const frontPageImages = imagesSnapshot.docs.map(sanitizeDocumentData);

      // Create a map of region -> image for quick lookup
      const imageMap = {};
      frontPageImages.forEach(img => {
        const reg = img.region?.toLowerCase();
        if (reg) {
          if (!imageMap[reg]) imageMap[reg] = [];
          imageMap[reg].push(img);
        }
      });

      // Enrich regions
      const enrichedRegions = regions.map(region => {
        const minimized = minimizeRegionData(region);
        // If image is missing, try to find one from our batch
        if (!minimized.featuredImage) {
          const matchingImages = imageMap[region.slug?.toLowerCase()];
          if (matchingImages?.length > 0) {
            // ✅ Use deterministic selection (first image) instead of random to avoid hydration mismatch
            const selectedImage = matchingImages[0];
            minimized.featuredImage = { 
              url: selectedImage.url || selectedImage.imageUrl,
              title: selectedImage.title || region.name // Ensure title is set for consistent alt tags
            };
          }
        }
        return minimized;
      });

      if (regionsSnapshot.empty) {
        console.warn("[getRegionsForHome] No regions found in Firestore collection:", COLLECTIONS.REGIONS);
      }

      return serializeData(enrichedRegions);
    } catch (error) {
      console.error("[getRegionsForHome] Error fetching regions for home:", error.message, {
        collection: COLLECTIONS.REGIONS,
        imageCollection: COLLECTIONS.IMAGES
      });
      return [];
    }
  },
  ["regions-home"],
  { revalidate: 60 }
));

export const getMarketingBanners = cache(unstableCache(
  async () => {
    try {
      const bannersCollection = collection(db, "marketing_banners");
      const bannersQuery = query(
        bannersCollection,
        where("isActive", "==", true)
      );
      
      const bannersSnapshot = await getDocsFromServer(bannersQuery);
      const banners = bannersSnapshot.docs
        .map(sanitizeDocumentData)
        .filter(data => !data.isExpired);

      // Return the first active banner if available
      return serializeData(banners.length > 0 ? banners[0] : null);
    } catch (error) {
      console.error("Error fetching marketing banners:", error);
      return null;
    }
  },
  ["marketing-banners"],
  { revalidate: 60 }
));

export const getCuratedPackagesForHome = cache(unstableCache(
  async (packageType) => {
    try {
      // Add limit to prevent fetching too many packages for the home page
      const conditions = [limit(12)];
      const packages = await getCuratedPackages(packageType, conditions, true);
      return serializeData(packages);
    } catch (error) {
      console.error(`Error getting curated packages for home (type: ${packageType}):`, error);
      return [];
    }
  },
  ["curated-packages-home-v2"],
  { revalidate: 60 }
));

export const getGroupDeparturePackagesForHome = unstableCache(
  async () => {
    try {
      const packages = await getGroupDeparturePackages();
      return serializeData(packages); 
    } catch (error) {
      console.error("Error getting group departure packages for home:", error);
      return [];
    }
  },
  ["group-departure-home-v2"],
  { revalidate: 60 }
);

export const getThemePackagesForHome = cache(unstableCache(
  async () => {
    try {
      const data = await getAllPackagesByTheme();
      return serializeData(data);
    } catch (error) {
      console.error("Error getting theme packages for home:", error);
      return {};
    }
  },
  ["theme-packages-home-v2"],
  { revalidate: 60 }
));

export const getElitePackages = unstableCache(
  async () => {
    try {
      const packages = await getPackagesByTheme("elite-escape", [], []);
      return serializeData(packages);
    } catch (error) {
      console.error("Error getting elite packages:", error);
      return [];
    }
  },
  ["elite-packages"],
  { revalidate: 60 }
);

export const getRomanticPackages = unstableCache(
  async () => {
    try {
      const packages = await getPackagesByTheme("romantic-getaways", [], []);
      return serializeData(packages);
    } catch (error) {
      console.error("Error getting romantic packages:", error);
      return [];
    }
  },
  ["romantic-packages"],
  { revalidate: 60 }
);

export const getWhyChooseRegionData = unstableCache(
  async (regionId) => {
    try {
      const docRef = doc(db, COLLECTIONS.WHY_CHOOSE_REGION, regionId);
      const docSnap = await getDocFromServer(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return serializeData(data);
      }
      
      return null;
    } catch (error) {
      console.error(`Error getting why choose region data for ${regionId}:`, error);
      return null;
    }
  },
  ["why-choose-region"],
  { revalidate: 60 }
);


