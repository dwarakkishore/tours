import { NextResponse } from "next/server";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { COLLECTIONS, REVIEWS_CACHE_DURATION, REVIEWS_DOC_ID } from "@/config";

export async function GET() {
  if (!process.env.GOOGLE_PLACES_API_KEY || !process.env.GOOGLE_PLACE_ID) {
    return NextResponse.json(
      { error: "Missing API key or Place ID" },
      { status: 500 }
    );
  }

  try {
    // Check cache first
    const cacheRef = doc(db, COLLECTIONS.CACHED_REVIEWS, REVIEWS_DOC_ID);
    const cacheDoc = await getDoc(cacheRef);

    if (cacheDoc.exists()) {
      const cachedData = cacheDoc.data();
      const now = Date.now();

      // If cache is still valid, return cached data
      if (now - cachedData.lastFetched < REVIEWS_CACHE_DURATION) {
        return NextResponse.json({
          success: true,
          reviews: cachedData.reviews,
        });
      }
    }

    // Cache expired or doesn't exist, fetch from Google Places API
    const url = new URL(
      "https://maps.googleapis.com/maps/api/place/details/json"
    );
    url.searchParams.append("place_id", process.env.GOOGLE_PLACE_ID);
    url.searchParams.append("key", process.env.GOOGLE_PLACES_API_KEY);
    url.searchParams.append("fields", "name,rating,reviews");

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!data || !data.result) {
      return NextResponse.json(
        {
          error: "Invalid response structure",
          data,
        },
        { status: 500 }
      );
    }

    // Filter and process reviews more efficiently
    const filteredReviews =
      data.result.reviews?.reduce((acc, review) => {
        // Stop processing if we already have 5 reviews
        if (acc.length >= 5) return acc;

        // Only add 5-star reviews
        if (review.rating === 5) {
          acc.push({
            author_name: review.author_name || "Anonymous",
            rating: 5,
            text: review.text || "",
            time: review.time || Date.now(),
            profile_photo_url: review.profile_photo_url || "",
            relative_time_description: review.relative_time_description || "",
          });
        }
        return acc;
      }, []) || [];

    // Update cache
    await setDoc(cacheRef, {
      lastFetched: Date.now(),
      reviews: filteredReviews,
    });

    return NextResponse.json({
      success: true,
      reviews: filteredReviews,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch reviews",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
