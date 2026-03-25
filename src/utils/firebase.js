import { db as firestoreDb } from "@/firebase/firebaseConfig";
export const db = firestoreDb;
import { minimizePackageData, minimizeRegionData, minimizeReviewData } from "@/utils/dataMinimizers";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getDocFromServer,
  getDocsFromServer,
  query,
  where,
  addDoc,
  serverTimestamp,
  limit,
  orderBy,
  Timestamp,
  documentId,
} from "firebase/firestore";
import { COLLECTIONS, PACKAGE_STATUS } from "@/config";

// Helper function to sanitize document references
const sanitizeDocRef = (item) => {
  if (!item) return item;
  
  // For imageRefs which have a nested ref structure
  if (item.ref) {
    const path = item.ref._key?.path || item.ref._path;
    if (path && path.segments) {
      const segments = path.segments;
      return {
        id: segments[segments.length - 1],
        collection: segments[segments.length - 2],
      };
    }
  }
  
  // For direct document references
  if (item._key && item._key.path) {
    const segments = item._key.path.segments;
    return {
      id: segments[segments.length - 1],
      collection: segments[segments.length - 2],
    };
  }
  
  return item;
};

// Helper to recursively sanitize nested objects/arrays with depth safeguard
const sanitizeRecursively = (item, depth = 0) => {
  if (!item || typeof item !== "object" || depth > 8) return item;
  
  if (item instanceof Timestamp) {
    return item.toDate();
  }
  
  if (Array.isArray(item)) {
    return item.map(i => sanitizeRecursively(i, depth + 1));
  }
  
  // Safeguard: Check if it's a Firestore internal object
  if (item._key || item.firestore || item.converter || typeof item.withConverter === 'function') {
    return sanitizeDocRef(item);
  }

  // Only recurse into plain objects
  if (Object.prototype.toString.call(item) !== '[object Object]') {
    return item;
  }

  const newItem = {};
  Object.keys(item).forEach((key) => {
    newItem[key] = sanitizeRecursively(item[key], depth + 1);
  });
  
  return newItem;
};

// Helper function to sanitize document data
export const sanitizeDocumentData = (doc) => {
  const data = doc.data();

  Object.keys(data).forEach((key) => {
    if (data[key] instanceof Timestamp) {
      data[key] = data[key].toDate();
    } else if (Array.isArray(data[key])) {
      // Check if this is an array of document references or objects containing references
      if (key === "itineraries") {
        data[key] = data[key].map((itinerary) => ({
          ...itinerary,
          imageRefs: itinerary.imageRefs?.map(sanitizeDocRef) || [],
        }));
      }
      // Handle all other array fields (includes, etc.)
      else {
        data[key] = data[key].map(sanitizeDocRef);
      }
    } else if (data[key] && typeof data[key] === "object") {
      // Recursively sanitize nested objects
      data[key] = sanitizeRecursively(data[key]);
    }
  });

  return {
    id: doc.id,
    ...data,
  };
};

// Helper function to fetch referenced document data
const getReferencedData = async (docRef) => {
  if (!docRef) return null;

  try {
    // If it's already an object with data (not a Firestore ref), return as is
    if (docRef.url || docRef.image || docRef.label || docRef.description || docRef.urlRef || docRef.title || docRef.displayName) {
      return docRef;
    }

    // Handle both sanitized references and direct Firestore references
    let collectionName, documentId;

    if (docRef.collection && docRef.id) {
      // This is a sanitized reference from sanitizeDocRef
      collectionName = docRef.collection;
      documentId = docRef.id;
    } else if (docRef._key && docRef._key.path) {
      // This is a direct Firestore document reference
      const segments = docRef._key.path.segments;
      documentId = segments.pop();
      collectionName = segments.pop();
    } else if (typeof docRef === "string" && (docRef.startsWith("http") || docRef.startsWith("/"))) {
      // handle direct URL strings by wrapping them in an object
      return { url: docRef };
    } else {
      // If we don't recognize it as a reference and it's not a known data object,
      // return it as is if it's an object, otherwise null
      return typeof docRef === "object" ? docRef : null;
    }
    const docSnap = await getDocFromServer(doc(db, collectionName, documentId));

    if (docSnap.exists()) {
      return sanitizeDocumentData(docSnap);
    }
    return null;
  } catch (error) {
    return null;
  }
};

// Helper function to resolve only necessary references for a card (e.g. images)
const resolveCardReferences = async (packageData) => {
  if (!packageData.cardImages || !packageData.cardImages.length) return packageData;
  
  const cardImagesData = await Promise.all(
    packageData.cardImages.map(getReferencedData)
  );
  packageData.cardImages = cardImagesData.filter(Boolean);
  return packageData;
};

// Highly optimized batch resolver for card images
export const batchResolveCardReferences = async (packages) => {
  if (!packages || !packages.length) return packages;

  // 1. Collect all unique references grouped by collection
  const collectionRefsMap = new Map(); // key: collectionName, value: Set of ids
  
  packages.forEach(pkg => {
    const refs = pkg.cardImages || pkg.bannerImages || [];
    refs.forEach(ref => {
      let documentId, collectionName;
      
      if (ref && (ref.id && ref.collection)) {
        collectionName = ref.collection;
        documentId = ref.id;
      } else if (ref && ref._key) {
        const segments = ref._key.path.segments;
        documentId = segments[segments.length - 1];
        collectionName = segments[segments.length - 2];
      }

      if (collectionName && documentId) {
        if (!collectionRefsMap.has(collectionName)) {
          collectionRefsMap.set(collectionName, new Set());
        }
        collectionRefsMap.get(collectionName).add(documentId);
      }
    });
  });

  if (collectionRefsMap.size === 0) return packages;

  // 2. Fetch all unique references in batches using 'in' queries
  const dataLookup = new Map(); // key: collection/id, value: data

  const fetchPromises = Array.from(collectionRefsMap.entries()).map(async ([collectionName, idSet]) => {
    const ids = Array.from(idSet);
    const colRef = collection(db, collectionName);
    
    // Firestore 'in' query supports up to 30 elements
    const batchSize = 30;
    for (let i = 0; i < ids.length; i += batchSize) {
      const batchIds = ids.slice(i, i + batchSize);
      const q = query(colRef, where("__name__", "in", batchIds));
      const snapshot = await getDocsFromServer(q);
      snapshot.docs.forEach(docSnap => {
        dataLookup.set(`${collectionName}/${docSnap.id}`, sanitizeDocumentData(docSnap));
      });
    }
  });

  await Promise.all(fetchPromises);
  
  // 3. Map resolved data back to packages
  return packages.map(pkg => {
    const processRefs = (refs) => {
      if (!refs) return null;
      return refs.map(ref => {
        let key = null;
        if (ref.id && ref.collection) {
          key = `${ref.collection}/${ref.id}`;
        } else if (ref._key) {
          const s = ref._key.path.segments;
          key = `${s[s.length - 2]}/${s[s.length - 1]}`;
        }
        return key ? dataLookup.get(key) : ref;
      }).filter(Boolean);
    };

    if (pkg.cardImages) pkg.cardImages = processRefs(pkg.cardImages);
    if (pkg.bannerImages) pkg.bannerImages = processRefs(pkg.bannerImages);
    
    return pkg;
  });
};

// Helper function to resolve all references for a package
const resolveAllPackageReferences = async (packageData) => {
  // Fetch includes data if exists
  if (packageData.includes) {
    const includesData = await Promise.all(
      packageData.includes.map(async (item) => {
        // Check if item is a DocumentReference (has _key or ref property)
        if (item?.id || item?.collection || typeof item === "object") {
          return await getReferencedData(item);
        }
        // If it's already a text object, return as is
        return item;
      })
    );
    packageData.includes = includesData.filter(Boolean);
  }

  if (packageData.excludes) {
    const excludesData = await Promise.all(
      packageData.excludes.map(async (item) => {
        // Check if item is a DocumentReference (has _key or ref property)
        if (item?.id || item?.collection || typeof item === "object") {
          return await getReferencedData(item);
        }
        // If it's already a text object, return as is
        return item;
      })
    );
    packageData.excludes = excludesData.filter(Boolean);
  }

  if (packageData.bannerImages) {
    const bannerImagesData = await Promise.all(
      packageData.bannerImages.map(getReferencedData)
    );
    packageData.bannerImages = bannerImagesData.filter(Boolean);
  }

  if (packageData.cardImages) {
    const cardImagesData = await Promise.all(
      packageData.cardImages.map(getReferencedData)
    );
    packageData.cardImages = cardImagesData.filter(Boolean);
  }

  if (packageData.imageRefs) {
    const imageRefsData = await Promise.all(
      packageData.imageRefs.map(getReferencedData)
    );
    packageData.imageRefs = imageRefsData.filter(Boolean);
  }

  if (packageData.cardImageRef) {
    packageData.cardImageRef = await getReferencedData(packageData.cardImageRef);
  }

  // Fetch itinerary image data if exists
  if (packageData.itineraries) {
    packageData.itineraries = await Promise.all(
      packageData.itineraries.map(async (itinerary) => {
        if (itinerary.imageRefs) {
          const imageData = await Promise.all(
            itinerary.imageRefs.map(getReferencedData)
          );
          return {
            ...itinerary,
            imageRefs: imageData.filter(Boolean),
          };
        }
        return itinerary;
      })
    );
  }

  return packageData;
};

// Helper function to resolve references for a region
export const resolveRegionReferences = async (regionData) => {
  if (regionData.bannerImages) {
    const bannerImagesData = await Promise.all(
      regionData.bannerImages.map(getReferencedData)
    );
    regionData.bannerImages = bannerImagesData.filter(Boolean);
  }

  if (regionData.bannerImage) {
    regionData.bannerImage = await getReferencedData(regionData.bannerImage);
  }

  return regionData;
};

// Unified function to get package by slug or ID with all references resolved
/**
 * Fetches a package by slug or ID and resolves all references (includes, excludes, bannerImages, cardImages, itineraries)
 * @param {string} slugOrId - The package slug or ID
 * @param {Object} options - Options object
 * @param {boolean} options.bySlug - Whether to search by slug (true) or ID (false). Defaults to true
 * @returns {Promise<Object>} Package data with all references resolved
 * @throws {Error} When package is not found or there's an error fetching data
 */
export const getPackageWithAllReferences = async (slugOrId, options = {}) => {
  try {
    const { bySlug = true } = options;
    let packageData;

    // First get the package document
    if (bySlug) {
      packageData = await getDocumentBySlug(slugOrId);
      if (!packageData) {
        throw new Error("Package not found");
      }
    } else {
      const packageRef = doc(db, COLLECTIONS.PACKAGES, slugOrId);
      const docSnap = await getDocFromServer(packageRef);

      if (!docSnap.exists()) {
        throw new Error("Package not found");
      }

      packageData = sanitizeDocumentData(docSnap);
    }

    // Resolve all references
    return await resolveAllPackageReferences(packageData);
  } catch (error) {
    throw error;
  }
};

// Get package with all referenced data
export const getPackageWithReferences = async (slug) => {
  try {
    // First get the package document
    const packageData = await getDocumentBySlug(slug);
    
    if (!packageData) {
      throw new Error("Package not found");
    }

    // Resolve all references
    return await resolveAllPackageReferences(packageData);
  } catch (error) {
    throw error;
  }
};

// Get a single document by slug
export const getDocumentBySlug = async (slug) => {
  try {
    const packagesRef = collection(db, COLLECTIONS.PACKAGES);
    const q = query(packagesRef, where("packageSlug", "==", slug));
    const querySnapshot = await getDocsFromServer(q);

    if (querySnapshot.empty) {
      return null;
    }

    return sanitizeDocumentData(querySnapshot.docs[0]);
  } catch (error) {
    return null;
  }
};

export const getRegionDocumentBySlug = async (slug) => {
  try {
    const regionsRef = collection(db, COLLECTIONS.REGIONS);
    const q = query(regionsRef, where("slug", "==", slug));
    const querySnapshot = await getDocsFromServer(q);

    if (querySnapshot.empty) {
      throw new Error("Region not found");
    }

    const regionData = sanitizeDocumentData(querySnapshot.docs[0]);
    return await resolveRegionReferences(regionData);
  } catch (error) {
    throw error;
  }
};

export const getOfferByPackageId = async (packageId) => {
  try {
    const offersRef = collection(db, COLLECTIONS.OFFERS);
    const q = query(offersRef, where("packageId", "==", packageId));
    const querySnapshot = await getDocsFromServer(q);

    if (querySnapshot.empty) {
      return null;
    }

    return sanitizeDocumentData(querySnapshot.docs[0]);
  } catch (error) {
    throw error;
  }
};

// Get all documents
export const getAllDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocsFromServer(collection(db, collectionName));
    return querySnapshot.docs.map(sanitizeDocumentData);
  } catch (error) {
    throw error;
  }
};

export const searchPackages = async (searchTerm) => {
  try {
    const searchTermLower = searchTerm.toLowerCase().trim();

    // const PACKAGE_LIMIT = 300;

    // // Get all packages
    // const packagesRef = query(
    //   collection(db, COLLECTIONS.PACKAGES),
    //   where("status", "==", PACKAGE_STATUS.PUBLISHED),
    //   limit(PACKAGE_LIMIT)
    // );
    // const querySnapshot = await getDocsFromServer(packagesRef);
    const packages = [];

    // Get all regions
    // TODO: Add limit to regions
    // Fetchs all regions and filters them in the frontend, not good
    const regionsRef = query(collection(db, COLLECTIONS.REGIONS));
    const regionsSnapshot = await getDocsFromServer(regionsRef);
    const regions = [];

    // Filter regions
    regionsSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.name?.toLowerCase().includes(searchTermLower)) {
        regions.push({
          id: doc.id,
          name: data.name,
          slug: data.slug,
        });
      }
    });

    // // Filter packages
    // for (const doc of querySnapshot.docs) {
    //   const data = doc.data();

    //   if (data.bannerImages) {
    //     for (const bannerImage of data.bannerImages) {
    //       const imageData = await getReferencedData(bannerImage);
    //       if (imageData) {
    //         data.bannerImages = [imageData];
    //         break; // This will break out of the bannerImages loop only
    //       }
    //     }
    //     if (!data.bannerImages[0]) {
    //       data.bannerImages = [];
    //     }
    //   }

    //   if (
    //     doc.id?.toLowerCase().includes(searchTermLower) ||
    //     data.titleSlug?.toLowerCase().includes(searchTermLower) ||
    //     data.packageSlug?.toLowerCase().includes(searchTermLower) ||
    //     data.packageName?.toLowerCase().includes(searchTermLower) ||
    //     data.packageTitle?.toLowerCase().includes(searchTermLower) ||
    //     data.region?.toLowerCase().includes(searchTermLower)
    //   ) {
    //     packages.push({
    //       id: doc.id,
    //       packageName: data.packageTitle || data.packageName,
    //       packageSlug: data.packageSlug,
    //       region: data.region,
    //       bannerImages: data.bannerImages,
    //       image: data.image || "",
    //       imageUrl: data.imageUrl || "",
    //       imageRefs: data.imageRefs || [],
    //       cardImageRef: data.cardImageRef || null,
    //       packageTags: data.packageTags || [],
    //     });
    //   }
    // }

    // // Group packages by region
    // const packagesByRegion = packages.reduce((acc, pkg) => {
    //   if (!acc[pkg.region]) {
    //     acc[pkg.region] = [];
    //   }
    //   acc[pkg.region].push(pkg);
    //   return acc;
    // }, {});

    const data = {
      regions,
      packages: [],
      packagesByRegion: [],
    };

    return data;
  } catch (error) {
    return {
      regions: [],
      packages: [],
      packagesByRegion: [],
    };
  }
};

export const storeLead = async (leadData) => {
  try {
    // Add timestamp to the lead data
    const enrichedLeadData = {
      ...leadData,
      createdAt: serverTimestamp(),
      source: "website-enquiry-form",
      status: "new", // Default status for new leads
    };

    // Reference to leads collection
    const leadsRef = collection(db, COLLECTIONS.LEADS);

    // Add document to Firestore
    const docRef = await addDoc(leadsRef, enrichedLeadData);

    return docRef.id;
  } catch (error) {
    console.error("Error storing lead:", error);
    throw new Error("Failed to store lead data");
  }
};

export const storePotentialLead = async (leadData) => {
  try {
    // Add timestamp to the lead data
    const enrichedLeadData = {
      ...leadData,
      createdAt: serverTimestamp(),
      source: "website-contact-form",
      status: "new", // Default status for new leads
    };

    // Reference to leads collection
    const leadsRef = collection(db, COLLECTIONS.POTENTIAL_LEADS);

    // Add document to Firestore
    const docRef = await addDoc(leadsRef, enrichedLeadData);

    return docRef.id;
  } catch (error) {
    console.error("Error storing potential lead:", error);
    throw new Error("Failed to store lead data");
  }
};

export const storeBookings = async (bookingData) => {
  try {
    // Add timestamp to the lead data
    const enrichedBookingData = {
      ...bookingData,
      createdAt: serverTimestamp(),
    };

    // Reference to leads collection
    const bookingRef = collection(db, COLLECTIONS.BOOKINGS);

    // Add document to Firestore
    const docRef = await addDoc(bookingRef, enrichedBookingData);

    return docRef.id;
  } catch (error) {
    console.error("Error creating Booking:", error);
    throw new Error("Failed to create Booking");
  }
};

export const storePayments = async (paymentData) => {
  try {
    // Add timestamp to the lead data
    const enrichedPaymentData = {
      ...paymentData,
      createdAt: serverTimestamp(),
    };

    // Reference to leads collection
    const bookingRef = collection(db, COLLECTIONS.PAYMENTS);

    // Add document to Firestore
    const docRef = await addDoc(bookingRef, enrichedPaymentData);

    return docRef.id;
  } catch (error) {
    console.error("Error creating Payment:", error);
    throw new Error("Failed to create Payment");
  }
};

export const getCuratedPackages = async (
  packageType,
  conditions = [],
  isHomePage = false
) => {
  try {
    let queryConstraints = [
      where("frontPage", "==", true),
      where("domestic", "==", packageType === "domestic"),
      where("status", "==", PACKAGE_STATUS.PUBLISHED),
    ];

    if (Array.isArray(conditions)) {
      queryConstraints = [...queryConstraints, ...conditions];
    }

    const packagesRef = collection(db, COLLECTIONS.PACKAGES);
    const q = query(
      packagesRef, 
      ...queryConstraints
    );

    const querySnapshot = await getDocsFromServer(q);
    const initialPackages = querySnapshot.docs.map(sanitizeDocumentData);

    if (isHomePage) {
      // Optimize for Homepage: batch resolve card images
      const packages = await batchResolveCardReferences(initialPackages);
      return packages.map(minimizePackageData).sort((a, b) => {
        const priceDiff = a.basePrice - b.basePrice;
        return priceDiff !== 0 ? priceDiff : a.id.localeCompare(b.id);
      });
    }

    // Full resolution for non-homepage calls
    const packages = await Promise.all(
      initialPackages.map(async (packageData) => {
        return await resolveAllPackageReferences(packageData);
      })
    );
    return packages.sort((a, b) => {
      const priceDiff = a.basePrice - b.basePrice;
      return priceDiff !== 0 ? priceDiff : a.id.localeCompare(b.id);
    });
  } catch (error) {
    console.error("Error fetching curated packages:", error);
    throw error;
  }
};

export const getAllPublishedPackages = async (packageType) => {
  try {
    const packagesRef = collection(db, COLLECTIONS.PACKAGES);
    const q = query(
      packagesRef,
      where("domestic", "==", packageType === "domestic"),
      where("status", "==", PACKAGE_STATUS.PUBLISHED)
    );

    const querySnapshot = await getDocsFromServer(q);
    const initialPackages = querySnapshot.docs.map(doc => sanitizeDocumentData(doc));
    
    // Use optimized batch resolver
    const packages = await batchResolveCardReferences(initialPackages);
    return packages.sort((a, b) => {
      const priceDiff = a.basePrice - b.basePrice;
      return priceDiff !== 0 ? priceDiff : a.id.localeCompare(b.id);
    });
  } catch (error) {
    console.error("Error fetching all published packages:", error);
    return [];
  }
};

export const getPackagesByRegion = async (regionName) => {
  try {
    const packagesRef = collection(db, COLLECTIONS.PACKAGES);
    
    // Convert slug to proper name format (e.g., "multy-countries" -> "Multy Countries")
    const properName = regionName
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    
    // Try querying by the converted proper name
    let q = query(
      packagesRef,
      where("region", "==", properName),
      where("status", "==", PACKAGE_STATUS.PUBLISHED)
    );
    
    let querySnapshot = await getDocsFromServer(q);
    
    // If no results, try the original slug as-is
    if (querySnapshot.empty) {
      q = query(
        packagesRef,
        where("region", "==", regionName),
        where("status", "==", PACKAGE_STATUS.PUBLISHED)
      );
      querySnapshot = await getDocsFromServer(q);
    }

    const packages = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const packageData = sanitizeDocumentData(doc);
        return await resolveAllPackageReferences(packageData);
      })
    );
    return packages.sort((a, b) => {
      const priceDiff = a.basePrice - b.basePrice;
      return priceDiff !== 0 ? priceDiff : a.id.localeCompare(b.id);
    });
  } catch (error) {
    throw error;
  }
};

export const getPackagesByTheme = async (
  themeType,
  initialPackages = [],
  conditions = [],
  resolveReferences = true
) => {
  try {
    const packagesRef = collection(db, COLLECTIONS.PACKAGES);
    let queryConstraints = [
      where("theme", "array-contains", themeType),
      where("status", "==", PACKAGE_STATUS.PUBLISHED),
      orderBy(documentId()), // Ensure deterministic order without filtering by basePrice
    ];

    if (Array.isArray(conditions)) {
      queryConstraints = [...queryConstraints, ...conditions];
    }

    const q = query(
      packagesRef, 
      ...queryConstraints
    );

    if (initialPackages && initialPackages.length > 0) {
      return initialPackages;
    }

    const querySnapshot = await getDocsFromServer(q);
    const initialPackagesData = querySnapshot.docs.map(sanitizeDocumentData);
    
    // Use batch resolution for themes
    let resolvedPackages = initialPackagesData;
    if (resolveReferences) {
        resolvedPackages = await batchResolveCardReferences(initialPackagesData);
    }
    const packages = resolvedPackages.map(minimizePackageData);
    
    return packages.sort((a, b) => {
      const priceDiff = a.basePrice - b.basePrice;
      return priceDiff !== 0 ? priceDiff : a.id.localeCompare(b.id);
    });
  } catch (error) {
    throw error;
  }
};

export const getHotelsByIds = async (hotelIds) => {
  try {
    const hotelsRef = collection(db, COLLECTIONS.HOTELS);
    const promises = hotelIds.map(async (id) => {
      const docRef = doc(hotelsRef, id);
      const docSnap = await getDocFromServer(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        let placeData = null;

        if (data.place) {
          placeData = await getPlace(data.place);
        }

        const result = {
          id: docSnap.id,
          ...data,
          place: placeData || data.place,
        };
        return result;
      }
      return null;
    });

    const results = await Promise.all(promises);
    return results.filter((hotel) => hotel !== null);
  } catch (error) {
    throw error;
  }
};

export const getPackageHotelDetails = async (hotelCharges) => {
  try {
    // Extract all hotel IDs from the hotel charges
    const allHotelIds = hotelCharges.reduce((ids, hotel) => {
      if (hotel.hotelIds && hotel.hotelIds.length > 0) {
        return [...ids, ...hotel.hotelIds];
      }
      return ids;
    }, []);

    // Fetch all hotels by their IDs
    const hotels = await getHotelsByIds(allHotelIds);

    // Map the hotels back to the hotel charges structure
    return hotelCharges.map((hotelCharge) => ({
      ...hotelCharge,
      hotels: hotelCharge.hotelIds
        .map((id) => hotels.find((hotel) => hotel.id === id))
        .filter(Boolean),
    }));
  } catch (error) {
    throw error;
  }
};

export const getCollectionQuery = (collectionName, conditions = []) => {
  const collectionRef = collection(db, collectionName);
  return query(collectionRef, ...conditions);
};

export const getRegions = async () => {
  try {
    const regionsQuery = getCollectionQuery(COLLECTIONS.REGIONS);
    const querySnapshot = await getDocsFromServer(regionsQuery);
    const regions = querySnapshot.docs.map(sanitizeDocumentData);
    
    
    return regions;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches a random image from the images collection filtered by regionName
 * @param {string} regionName - The region name to filter by
 * @returns {Promise<Object|null>} Random image data or null if no images found
 */
export const getFeaturedImageByRegion = async (regionName) => {
  try {
    if (!regionName) {
      throw new Error("Region name is required");
    }

    const imagesRef = collection(db, COLLECTIONS.IMAGES);
    
    // Try multiple query variations to find images
    let querySnapshot;
    
    // First try: exact match with lowercase
    let q = query(
      imagesRef,
      where("region", "==", regionName.toLowerCase()),
      where("type", "==", "card"),
      where("frontPage", "==", true)
    );
    querySnapshot = await getDocsFromServer(q);
    
    // Second try: exact match with original case
    if (querySnapshot.empty) {
      q = query(
        imagesRef,
        where("region", "==", regionName),
        where("type", "==", "card"),
        where("frontPage", "==", true)
      );
      querySnapshot = await getDocsFromServer(q);
    }
    
    // Third try: without frontPage filter
    if (querySnapshot.empty) {
      q = query(
        imagesRef,
        where("region", "==", regionName.toLowerCase()),
        where("type", "==", "card")
      );
      querySnapshot = await getDocsFromServer(q);
    }

    if (querySnapshot.empty) {
      return null;
    }

    // Get random image from available images
    const images = querySnapshot.docs.map(sanitizeDocumentData);
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];
    

    return randomImage;
  } catch (error) {
    throw error;
  }
};

export const getPlace = async (id) => {
  try {
    const placeRef = doc(db, COLLECTIONS.PLACES, id);
    const placeSnap = await getDocFromServer(placeRef);
    return sanitizeDocumentData(placeSnap);
  } catch (error) {
    throw error;
  }
};

export const getSavedItinerary = async (id) => {
  try {

    // 1. Try fetching by Document Key (ID)
    const docRef = doc(db, COLLECTIONS.SAVED_PDFS, id);
    const docSnap = await getDocFromServer(docRef);

    if (docSnap.exists()) {
      return sanitizeDocumentData(docSnap);
    }
    
    // 2. Fallback: Try fetching by field "documentID"
    const q = query(
      collection(db, COLLECTIONS.SAVED_PDFS),
      where("documentID", "==", id)
    );
    const querySnapshot = await getDocsFromServer(q);

    if (!querySnapshot.empty) {
      return sanitizeDocumentData(querySnapshot.docs[0]);
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching saved itinerary:", error);
    return null;
  }
};

export const getSavedItineraryById = async (id) => {
  try {
    const docRef = doc(db, COLLECTIONS.SAVED_PDFS, id);
    const docSnap = await getDocFromServer(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = sanitizeDocumentData(docSnap);
    return data;
  } catch (error) {
    console.error("Error fetching saved itinerary:", error);
    return null;
  }
};

export const getEmployees = async () => {
  try {
    const employeesRef = collection(db, COLLECTIONS.EMPLOYEES);
    const q = query(employeesRef, orderBy("name", "asc"));
    
    const querySnapshot = await getDocsFromServer(q);
    
    const employees = querySnapshot.docs.map(doc => {
      const data = sanitizeDocumentData(doc);
      return {
        id: doc.id,
        name: data.name || "",
        role: data.role || "",
        // Map photoUrl (from DB) to image (expected by UI)
        image: data.photoUrl || data.image || "", 
        // Preserve other potential fields or defaults
        dept: data.department || data.dept || "Team",
        size: data.size || "small",
        quote: data.quote || ""
      };
    });

    return employees;
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};
