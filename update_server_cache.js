const fs = require('fs');
const file = 'src/lib/server.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  'import { minimizePackageData, minimizeRegionData, minimizeReviewData } from "@/utils/dataMinimizers";',
  'import { minimizePackageData, minimizeRegionData, minimizeReviewData } from "@/utils/dataMinimizers";\nimport { withRedisCache } from "@/lib/cache";'
);

content = content.replace(
  /export const fetchReviews = unstableCache\(\s*async \(\) => {/g,
  'export const fetchReviews = unstableCache(async () => { return withRedisCache("cachedReviews", "reviews", async () => {'
);
content = content.replace(
  /        console\.warn\(\`\[fetchReviews\] Cache document \$\{REVIEWS_DOC_ID\} not found in collection \$\{COLLECTIONS\.CACHED_REVIEWS\}\`\);\n        return \[\];\n      \} catch \(err\) \{\n        console\.error\("\[fetchReviews\] Error fetching reviews from Firestore:", err.message, \{\n          collection: COLLECTIONS\.CACHED_REVIEWS,\n          docId: REVIEWS_DOC_ID\n        \}\);\n        return \[\];\n      \}\n    \},\n    \["reviews"\],\n    \{\n      revalidate: 60, \/\/ 1 minute\n    \}\n\);/g,
  '        console.warn(`[fetchReviews] Cache document ${REVIEWS_DOC_ID} not found in collection ${COLLECTIONS.CACHED_REVIEWS}`);\n        return [];\n      } catch (err) {\n        console.error("[fetchReviews] Error fetching reviews from Firestore:", err.message, {\n          collection: COLLECTIONS.CACHED_REVIEWS,\n          docId: REVIEWS_DOC_ID\n        });\n        return [];\n      }\n    }, 86400);\n  },\n  ["reviews"],\n  {\n    revalidate: 86400,\n  }\n);'
);

content = content.replace(
  /export const fetchRegions = unstableCache\(\s*async \(\) => \{/g,
  'export const fetchRegions = unstableCache(async () => { return withRedisCache("regions", "fetchRegions", async () => {'
);
content = content.replace(
  /      return \{\n        domesticRegions: \[\],\n        internationalRegions: \[\],\n      \};\n    \}\n  \},\n  \["regions"\],\n  \{\n    revalidate: 60, \/\/ 1 minute\n  \}\n\);/g,
  '      return {\n        domesticRegions: [],\n        internationalRegions: [],\n      };\n    }\n  }, 86400);\n  },\n  ["regions"],\n  {\n    revalidate: 86400,\n  }\n);'
);

content = content.replace(
  /export const getRegionsForHome = cache\(unstableCache\(\s*async \(\) => \{/g,
  'export const getRegionsForHome = cache(unstableCache(async () => { return withRedisCache("regions", "getRegionsForHome", async () => {'
);
content = content.replace(
  /      return \[\];\n    \}\n  \},\n  \["regions-home"\],\n  \{ revalidate: 60 \}\n\)\);/g,
  '      return [];\n    }\n  }, 86400);\n  },\n  ["regions-home"],\n  { revalidate: 86400 }\n));'
);

content = content.replace(
  /export const getMarketingBanners = cache\(unstableCache\(\s*async \(\) => \{/g,
  'export const getMarketingBanners = cache(unstableCache(async () => { return withRedisCache("marketing_banners", "all", async () => {'
);
content = content.replace(
  /      return null;\n    \}\n  \},\n  \["marketing-banners"\],\n  \{ revalidate: 60 \}\n\)\);/g,
  '      return null;\n    }\n  }, 3600);\n  },\n  ["marketing-banners"],\n  { revalidate: 3600 }\n));'
);

content = content.replace(
  /export const getCuratedPackagesForHome = cache\(unstableCache\(\s*async \(packageType\) => \{/g,
  'export const getCuratedPackagesForHome = cache(unstableCache(async (packageType) => { return withRedisCache("published_packages", `curated_${packageType}`, async () => {'
);
content = content.replace(
  /      return \[\];\n    \}\n  \},\n  \["curated-packages-home-v2"\],\n  \{ revalidate: 60 \}\n\)\);/g,
  '      return [];\n    }\n  }, 3600);\n  },\n  ["curated-packages-home-v2"],\n  { revalidate: 3600 }\n));'
);

content = content.replace(
  /export const getGroupDeparturePackagesForHome = unstableCache\(\s*async \(\) => \{/g,
  'export const getGroupDeparturePackagesForHome = unstableCache(async () => { return withRedisCache("published_packages", "group", async () => {'
);
content = content.replace(
  /      return \[\];\n    \}\n  \},\n  \["group-departure-home-v2"\],\n  \{ revalidate: 60 \}\n\);/g,
  '      return [];\n    }\n  }, 3600);\n  },\n  ["group-departure-home-v2"],\n  { revalidate: 3600 }\n);'
);

content = content.replace(
  /export const getThemePackagesForHome = cache\(unstableCache\(\s*async \(\) => \{/g,
  'export const getThemePackagesForHome = cache(unstableCache(async () => { return withRedisCache("published_packages", "themes", async () => {'
);
content = content.replace(
  /      return \{\};\n    \}\n  \},\n  \["theme-packages-home-v2"\],\n  \{ revalidate: 60 \}\n\)\);/g,
  '      return {};\n    }\n  }, 3600);\n  },\n  ["theme-packages-home-v2"],\n  { revalidate: 3600 }\n));'
);

content = content.replace(
  /export const getElitePackages = unstableCache\(\s*async \(\) => \{/g,
  'export const getElitePackages = unstableCache(async () => { return withRedisCache("published_packages", "elite", async () => {'
);
content = content.replace(
  /      return \[\];\n    \}\n  \},\n  \["elite-packages"\],\n  \{ revalidate: 60 \}\n\);/g,
  '      return [];\n    }\n  }, 3600);\n  },\n  ["elite-packages"],\n  { revalidate: 3600 }\n);'
);

content = content.replace(
  /export const getRomanticPackages = unstableCache\(\s*async \(\) => \{/g,
  'export const getRomanticPackages = unstableCache(async () => { return withRedisCache("published_packages", "romantic", async () => {'
);
content = content.replace(
  /      return \[\];\n    \}\n  \},\n  \["romantic-packages"\],\n  \{ revalidate: 60 \}\n\);/g,
  '      return [];\n    }\n  }, 3600);\n  },\n  ["romantic-packages"],\n  { revalidate: 3600 }\n);'
);

content = content.replace(
  /export const getWhyChooseRegionData = unstableCache\(\s*async \(regionId\) => \{/g,
  'export const getWhyChooseRegionData = unstableCache(async (regionId) => { return withRedisCache("why_choose_region", regionId, async () => {'
);
content = content.replace(
  /      return null;\n    \}\n  \},\n  \["why-choose-region"\],\n  \{ revalidate: 60 \}\n\);/g,
  '      return null;\n    }\n  }, 86400);\n  },\n  ["why-choose-region"],\n  { revalidate: 86400 }\n);'
);

fs.writeFileSync(file, content);
