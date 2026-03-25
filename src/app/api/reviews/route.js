import { NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { COLLECTIONS, REVIEWS_DOC_ID } from "@/config";
import { minimizeReviewData } from "@/utils/dataMinimizers";

export async function GET() {
  try {
    const cacheRef = doc(db, COLLECTIONS.CACHED_REVIEWS, REVIEWS_DOC_ID);
    // Use getDoc instead of getDocFromServer for API routes (optimistic)
    const cacheDoc = await getDoc(cacheRef);

    if (cacheDoc.exists()) {
      const cachedData = cacheDoc.data();
      const reviews = (cachedData.reviews || []).slice(0, 10).map(minimizeReviewData);
      
      return NextResponse.json({
        success: true,
        reviews: reviews
      });
    }

    return NextResponse.json({
      success: false,
      message: "No reviews found in cache",
      reviews: []
    });

  } catch (error) {
    console.error("Error in /api/reviews:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
      reviews: []
    }, { status: 500 });
  }
}
