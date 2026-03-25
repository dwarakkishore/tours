import { Redis } from '@upstash/redis';

export const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

export async function withRedisCache(collection, key, fetcher, ttl = 3600) {
  if (ttl === 0 || !redis) {
    return fetcher();
  }

  const cacheKey = `${collection}:${key}`;

  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log(`[Redis HIT] ${cacheKey}`);
      return cachedData;
    }
  } catch (error) {
    console.warn(`[Redis GET ERROR] block:`, error.message);
  }

  const data = await fetcher();

  if (data) {
    try {
      if (ttl > 0) {
        await redis.set(cacheKey, data, { ex: ttl });
        console.log(`[Redis SET] ${cacheKey} (TTL: ${ttl}s)`);
      }
    } catch (error) {
      console.warn(`[Redis SET ERROR] block:`, error.message);
    }
  }

  return data;
}
