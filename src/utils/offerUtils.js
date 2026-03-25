import { getAllDocuments, getPackageWithAllReferences } from "@/utils/firebase";

/**
 * Formats a price in INR format
 * @param {number} price - The price to format
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN").format(price);
};

/**
 * Applies available offers to packages
 * @param {Array} packages - Array of package objects
 * @returns {Promise<Array>} Array of packages with offer data applied where available
 */
export const applyOffersToPackages = async (packages) => {
  try {
    // Fetch all active offers
    const allOffers = await getAllDocuments("offers");
    const activeOffers = allOffers.filter((offer) => offer.isActive);

    // Create a map of packageId to offer for quick lookup
    const offerMap = {};
    activeOffers.forEach((offer) => {
      offerMap[offer.packageId] = offer;
    });

    // Apply offers to packages
    return packages.map((packageItem) => {
      const matchingOffer = offerMap[packageItem.id];

      if (!matchingOffer) {
        return packageItem; // No offer available
      }

      // Calculate offer price
      const offerPrice =
        matchingOffer.discountType === "fixed"
          ? Math.round(packageItem.basePrice - matchingOffer.discountValue)
          : Math.round(
              packageItem.basePrice -
                packageItem.basePrice * (matchingOffer.discountValue / 100)
            );

      const savingsAmount = packageItem.basePrice - offerPrice;

      // Return package with offer data
      return {
        ...packageItem,
        offerPrice,
        savingsAmount,
        offerId: matchingOffer.id,
        offerEndDate: matchingOffer.endDate,
      };
    });
  } catch (error) {
    console.error("Error applying offers to packages:", error);
    return packages; // Return original packages if there's an error
  }
};

/**
 * Fetches all active offers and processes them with their package data
 * @returns {Promise<Array>} Array of processed offer objects
 */
export const fetchAndProcessOffers = async () => {
  try {
    // Fetch all offers
    const allOffers = await getAllDocuments("offers");

    // Filter active offers
    const activeOffers = allOffers.filter((offer) => offer.isActive);

    // Process each offer with its package data
    const processedOffersData = await Promise.all(
      activeOffers.map(async (offer) => {
        const parentPackage = await getPackageWithAllReferences(
          offer.packageId,
          { bySlug: false }
        );


        const offerPrice =
          offer.discountType === "fixed"
            ? Math.round(parentPackage.basePrice - offer.discountValue)
            : Math.round(
                parentPackage.basePrice -
                  parentPackage.basePrice * (offer.discountValue / 100)
              );

        const savingsAmount = parentPackage.basePrice - offerPrice;

        return {
          ...offer,
          region: parentPackage.region,
          basePrice: parentPackage.basePrice,
          days: parentPackage.days,
          nights: parentPackage.nights,
          packageSlug: parentPackage.packageSlug,
          offerPrice,
          savingsAmount,
        };
      })
    );

    // Filter out any null values from failed package fetches
    const validOffers = processedOffersData.filter((offer) => offer !== null);

    return validOffers;
  } catch (error) {
    console.error("Error fetching and processing offers:", error);
    return [];
  }
};
