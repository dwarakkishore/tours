import { redis } from "@/lib/cache";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization");
    const secret = process.env.CACHE_REVALIDATION_SECRET;

    if (!authHeader || authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { collection, key } = await request.json();

    if (!collection) {
      return NextResponse.json({ error: "Collection is required" }, { status: 400 });
    }

    // Determine the cache key pattern to invalidate
    let cursor = 0;
    const match = key ? `bayard-cache:${collection}:${key}` : `bayard-cache:${collection}:*`;
    
    // Invalidate keys in Upstash Redis
    if (redis) {
      const keysToDelete = [];
      do {
        const [nextCursor, keys] = await redis.scan(cursor, { match, count: 100 });
        cursor = nextCursor;
        if (keys && keys.length > 0) {
          keysToDelete.push(...keys);
        }
      } while (cursor !== 0 && cursor !== "0");

      if (keysToDelete.length > 0) {
        await redis.del(...keysToDelete);
      }
    }

    // Drop Next.js unstable_cache completely for freshness
    // Typical tags used by Next.js or paths 
    revalidatePath("/", "layout"); // Revalidate all paths layout bounds
    
    return NextResponse.json({ 
      success: true, 
      message: `Invalidated Redis cache for ${match} and Next.js revalidatePath triggered.`
    });
  } catch (error) {
    console.error("Cache invalidation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
