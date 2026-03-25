const fs = require('fs');
const file = 'src/lib/server.js';
let content = fs.readFileSync(file, 'utf8');

// Undo the opening of withRedisCache if the closing failed
// OR fix the closing of withRedisCache

content = content.replace(
  /export const fetchReviews = unstableCache\(async \(\) => \{ return withRedisCache\("cachedReviews", "reviews", async \(\) => \{/g,
  'export const fetchReviews = unstableCache(async () => {'
);
content = content.replace(
  /export const fetchRegions = unstableCache\(async \(\) => \{ return withRedisCache\("regions", "fetchRegions", async \(\) => \{/g,
  'export const fetchRegions = unstableCache(async () => {'
);
content = content.replace(
  /export const getRegionsForHome = cache\(unstableCache\(async \(\) => \{ return withRedisCache\("regions", "getRegionsForHome", async \(\) => \{/g,
  'export const getRegionsForHome = cache(unstableCache(async () => {'
);
content = content.replace(
  /export const getMarketingBanners = cache\(unstableCache\(async \(\) => \{ return withRedisCache\("marketing_banners", "all", async \(\) => \{/g,
  'export const getMarketingBanners = cache(unstableCache(async () => {'
);
content = content.replace(
  /export const getCuratedPackagesForHome = cache\(unstableCache\(async \(packageType\) => \{ return withRedisCache\("published_packages", `curated_\$\{packageType\}`, async \(\) => \{/g,
  'export const getCuratedPackagesForHome = cache(unstableCache(async (packageType) => {'
);
content = content.replace(
  /export const getGroupDeparturePackagesForHome = unstableCache\(async \(\) => \{ return withRedisCache\("published_packages", "group", async \(\) => \{/g,
  'export const getGroupDeparturePackagesForHome = unstableCache(async () => {'
);
content = content.replace(
  /export const getThemePackagesForHome = cache\(unstableCache\(async \(\) => \{ return withRedisCache\("published_packages", "themes", async \(\) => \{/g,
  'export const getThemePackagesForHome = cache(unstableCache(async () => {'
);
content = content.replace(
  /export const getElitePackages = unstableCache\(async \(\) => \{ return withRedisCache\("published_packages", "elite", async \(\) => \{/g,
  'export const getElitePackages = unstableCache(async () => {'
);
content = content.replace(
  /export const getRomanticPackages = unstableCache\(async \(\) => \{ return withRedisCache\("published_packages", "romantic", async \(\) => \{/g,
  'export const getRomanticPackages = unstableCache(async () => {'
);
content = content.replace(
  /export const getWhyChooseRegionData = unstableCache\(async \(regionId\) => \{ return withRedisCache\("why_choose_region", regionId, async \(\) => \{/g,
  'export const getWhyChooseRegionData = unstableCache(async (regionId) => {'
);


// Undo closing where it did match
content = content.replace(/  \}, 86400\);\n  \},\n  \["regions"\],\n  \{\n    revalidate: 86400,\n  \}\n\);/g, 
  '  },\n  ["regions"],\n  {\n    revalidate: 60, // 1 minute\n  }\n);');
content = content.replace(/  \}, 86400\);\n  \},\n  \["regions-home"\],\n  \{ revalidate: 86400 \}\n\)\);/g,
  '  },\n  ["regions-home"],\n  { revalidate: 60 }\n));');
content = content.replace(/  \}, 3600\);\n  \},\n  \["marketing-banners"\],\n  \{ revalidate: 3600 \}\n\)\);/g,
  '  },\n  ["marketing-banners"],\n  { revalidate: 60 }\n));');
content = content.replace(/  \}, 3600\);\n  \},\n  \["curated-packages-home-v2"\],\n  \{ revalidate: 3600 \}\n\)\);/g,
  '  },\n  ["curated-packages-home-v2"],\n  { revalidate: 60 }\n));');
content = content.replace(/  \}, 3600\);\n  \},\n  \["group-departure-home-v2"\],\n  \{ revalidate: 3600 \}\n\);/g,
  '  },\n  ["group-departure-home-v2"],\n  { revalidate: 60 }\n);');
content = content.replace(/  \}, 3600\);\n  \},\n  \["theme-packages-home-v2"\],\n  \{ revalidate: 3600 \}\n\)\);/g,
  '  },\n  ["theme-packages-home-v2"],\n  { revalidate: 60 }\n));');
content = content.replace(/  \}, 3600\);\n  \},\n  \["elite-packages"\],\n  \{ revalidate: 3600 \}\n\);/g,
  '  },\n  ["elite-packages"],\n  { revalidate: 60 }\n);');
content = content.replace(/  \}, 3600\);\n  \},\n  \["romantic-packages"\],\n  \{ revalidate: 3600 \}\n\);/g,
  '  },\n  ["romantic-packages"],\n  { revalidate: 60 }\n);');
content = content.replace(/  \}, 86400\);\n  \},\n  \["why-choose-region"\],\n  \{ revalidate: 86400 \}\n\);/g,
  '  },\n  ["why-choose-region"],\n  { revalidate: 60 }\n);');


fs.writeFileSync(file, content);
