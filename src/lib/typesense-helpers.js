import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  query,
  getDocs,
  where,
  getDoc,
  doc,
  setDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { typesenseClient } from "./typesense";
import { COLLECTIONS, PACKAGE_STATUS } from "@/config";

const TYPESENSE_SYNC_DOC_ID = "typesense_sync_timestamp";
const TYPESENSE_SYNC_COLLECTION = "typesenseSync";
const SYNC_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const packageSchema = {
  name: "published_packages",
  fields: [
    { name: "id", type: "string" },
    { name: "name", type: "string" },
    { name: "title", type: "string" },
    { name: "slug", type: "string" },
    { name: "basePrice", type: "float" },
    { name: "citiesList", type: "string" },
    { name: "titleSlug", type: "string" },
    { name: "theme", type: "string[]" },
    { name: "region", type: "string" },
    { name: "bannerImage", type: "string" },
  ],
  default_sorting_field: "basePrice",
};

const getReferencedData = async (docRef) => {
  try {
    // Handle both sanitized references and direct Firestore references
    let collectionName, documentId;

    if (docRef?.collection && docRef?.id) {
      // This is a sanitized reference from sanitizeDocRef
      collectionName = docRef.collection;
      documentId = docRef.id;
    } else if (docRef?._key && docRef?._key?.path) {
      // This is a direct Firestore document reference
      const segments = docRef._key.path.segments;
      documentId = segments.pop();
      collectionName = segments.pop();
    } else {
      return null;
    }

    const docSnap = await getDoc(doc(db, collectionName, documentId));
    if (docSnap.exists()) {
      const result = {
        id: docSnap.id,
        ...docSnap.data(),
      };
      return result;
    }
    return null;
  } catch (error) {
    return null;
  }
};

const getBannerImage = async (bannerImage) => {
  const data = await getReferencedData(bannerImage);
  if (data) {
    return data?.url;
  }
  return null;
};

const getAllPackages = async () => {
  const packageQuery = query(
    collection(db, COLLECTIONS.PACKAGES),
    where("status", "==", PACKAGE_STATUS.PUBLISHED)
  );
  const packageSnapshot = await getDocs(packageQuery);
  const packages = await Promise.all(
    packageSnapshot.docs.map(async (doc) => {
      const packageData = doc.data();
      const packageId = doc.id;
      const packageName = packageData.packageName;
      const packageTitle = packageData.packageTitle;
      const packageBasePrice = packageData.basePrice || 0;
      const packageSlug = packageData.packageSlug;
      const packageCitiesList = packageData.citiesList;
      const packageTitleSlug = packageData.titleSlug;
      const packageTheme = packageData.theme;
      const packageRegion = packageData.region;

      let packageBannerImage = null;
      if (packageData.bannerImages && packageData.bannerImages.length > 0) {
        const randomBannerImage = Math.floor(
          Math.random() * packageData.bannerImages.length
        );
        packageBannerImage = await getBannerImage(
          packageData.bannerImages[randomBannerImage]
        );
      }


      return {
        id: packageId,
        name: packageName,
        title: packageTitle,
        basePrice: packageBasePrice,
        slug: packageSlug,
        citiesList: packageCitiesList,
        titleSlug: packageTitleSlug,
        theme: packageTheme,
        region: packageRegion,
        bannerImage: packageBannerImage,
      };
    })
  );
  return packages;
};

const createCollection = async (collectionSchema) => {
  try {
    const collectionExists = await typesenseClient
      .collections(collectionSchema.name)
      .exists();
    if (!collectionExists) {
      await typesenseClient.collections().create(collectionSchema);
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

const getLastSyncTimestamp = async () => {
  try {
    const syncDocRef = doc(
      db,
      TYPESENSE_SYNC_COLLECTION,
      TYPESENSE_SYNC_DOC_ID
    );
    const syncDoc = await getDoc(syncDocRef);
    if (syncDoc.exists()) {
      const data = syncDoc.data();
      const lastSynced = data.lastSynced;

      // Handle Firestore Timestamp object
      if (lastSynced instanceof Timestamp) {
        return lastSynced.toMillis();
      }

      // Handle if it's already a number (milliseconds)
      if (typeof lastSynced === "number") {
        return lastSynced;
      }

      // Handle if it's a Date object
      if (lastSynced instanceof Date) {
        return lastSynced.getTime();
      }

      return null;
    }
    return null;
  } catch (error) {
    return null;
  }
};

const updateSyncTimestamp = async () => {
  try {
    const syncDocRef = doc(
      db,
      TYPESENSE_SYNC_COLLECTION,
      TYPESENSE_SYNC_DOC_ID
    );
    await setDoc(
      syncDocRef,
      {
        lastSynced: serverTimestamp(),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    throw error;
  }
};

const shouldRecreateCollection = async () => {
  try {
    const lastSync = await getLastSyncTimestamp();
    if (!lastSync) {
      return true;
    }

    const now = Date.now();
    const timeSinceLastSync = now - lastSync;

    if (timeSinceLastSync >= SYNC_INTERVAL_MS) {
      return true;
    }

    return false;
  } catch (error) {
    // If we can't check timestamp, assume we need to recreate
    return true;
  }
};

const uploadPackages = async (recreateCollection = false) => {
  try {
    const packages = await getAllPackages();

    // Check if packages collection exists, if not create it
    const collectionExists = await typesenseClient
      .collections(packageSchema.name)
      .exists();

    if (recreateCollection && collectionExists) {
      await typesenseClient.collections(packageSchema.name).delete();
      await createCollection(packageSchema);
    } else if (!collectionExists) {
      await createCollection(packageSchema);
    }

    const importResult = await typesenseClient
      .collections(packageSchema.name)
      .documents()
      .import(packages, { action: "upsert" });


    // Update sync timestamp after successful upload
    await updateSyncTimestamp();

    return importResult;
  } catch (error) {
    throw error;
  }
};

const ensureCollectionExists = async () => {
  try {
    const collectionExists = await typesenseClient
      .collections(packageSchema.name)
      .exists();

    if (!collectionExists) {
      await uploadPackages(false);
      return true;
    }

    // Check if we need to recreate based on timestamp (24 hour interval)
    const needsRecreation = await shouldRecreateCollection();
    if (needsRecreation) {
      await uploadPackages(true);
      return true;
    }

    return false;
  } catch (error) {
    throw error;
  }
};

export {
  createCollection,
  uploadPackages,
  ensureCollectionExists,
  packageSchema,
};
