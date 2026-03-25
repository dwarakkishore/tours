const fs = require('fs');
const file = 'src/lib/server.js';
let content = fs.readFileSync(file, 'utf8');

function wrapFunction(funcName, collectionName, cacheKeyPattern, originalRevalPattern, newReval) {
    // 1. Find the start of the function: `export const funcName = unstableCache(`
    // or `export const funcName = cache(unstableCache(`
    const regexStart1 = new RegExp(`export const ${funcName} = unstableCache\\(\\s*async \\((.*?)\\) => \\{`, 'g');
    const regexStart2 = new RegExp(`export const ${funcName} = cache\\(unstableCache\\(\\s*async \\((.*?)\\) => \\{`, 'g');
    
    // Replace opening
    content = content.replace(regexStart1, (match, args) => {
        let keyStr = cacheKeyPattern;
        if (args) {
             // if it has args, cacheKeyPattern might be a template literal utilizing it
        }
        return `export const ${funcName} = unstableCache(\n  async (${args}) => {\n    return withRedisCache("${collectionName}", ${cacheKeyPattern}, async () => {`;
    });
    content = content.replace(regexStart2, (match, args) => {
        return `export const ${funcName} = cache(unstableCache(\n  async (${args}) => {\n    return withRedisCache("${collectionName}", ${cacheKeyPattern}, async () => {`;
    });

    // 2. Find the closing part of unstableCache for this specific function.
    // It usually looks like:
    //   },
    //   ["some-key"],
    //   { revalidate: 60 } // or something similar
    // We need to inject `}, ttl);` before the array.

    // To be extremely robust, we replace the specific revalidate block if we know its key string.
}

const replacements = [
    {
        startMarker: 'export const fetchReviews = unstableCache(',
        oldFunc: `export const fetchReviews = unstableCache(
  async () => {`,
        newFunc: `export const fetchReviews = unstableCache(
  async () => {
    return withRedisCache("cachedReviews", "reviews", async () => {`,
        oldClose: `    },
    ["reviews"],
    {
      revalidate: 60, // 1 minute
    }
);`,
        newClose: `    }, 86400);
  },
  ["reviews"],
  {
    revalidate: 86400,
  }
);`
    },
    {
        startMarker: 'export const fetchRegions = unstableCache(',
        oldFunc: `export const fetchRegions = unstableCache(
  async () => {`,
        newFunc: `export const fetchRegions = unstableCache(
  async () => {
    return withRedisCache("regions", "all", async () => {`,
        oldClose: `      };
    }
  },
  ["regions"],
  {
    revalidate: 60, // 1 minute
  }
);`,
        newClose: `      };
    }
    }, 86400);
  },
  ["regions"],
  {
    revalidate: 86400,
  }
);`
    },
    {
        startMarker: 'export const getRegionsForHome = cache(unstableCache(',
        oldFunc: `export const getRegionsForHome = cache(unstableCache(
  async () => {`,
        newFunc: `export const getRegionsForHome = cache(unstableCache(
  async () => {
    return withRedisCache("regions", "home", async () => {`,
        oldClose: `      return [];
    }
  },
  ["regions-home"],
  { revalidate: 60 }
));`,
        newClose: `      return [];
    }
    }, 86400);
  },
  ["regions-home"],
  { revalidate: 86400 }
));`
    },
    {
        startMarker: 'export const getMarketingBanners = cache(unstableCache(',
        oldFunc: `export const getMarketingBanners = cache(unstableCache(
  async () => {`,
        newFunc: `export const getMarketingBanners = cache(unstableCache(
  async () => {
    return withRedisCache("marketing_banners", "all", async () => {`,
        oldClose: `      return null;
    }
  },
  ["marketing-banners"],
  { revalidate: 60 }
));`,
        newClose: `      return null;
    }
    }, 3600);
  },
  ["marketing-banners"],
  { revalidate: 3600 }
));`
    },
    {
        startMarker: 'export const getCuratedPackagesForHome = cache(unstableCache(',
        oldFunc: `export const getCuratedPackagesForHome = cache(unstableCache(
  async (packageType) => {`,
        newFunc: `export const getCuratedPackagesForHome = cache(unstableCache(
  async (packageType) => {
    return withRedisCache("published_packages", "curated_" + packageType, async () => {`,
        oldClose: `      return [];
    }
  },
  ["curated-packages-home-v2"],
  { revalidate: 60 }
));`,
        newClose: `      return [];
    }
    }, 3600);
  },
  ["curated-packages-home-v2"],
  { revalidate: 3600 }
));`
    },
    {
        startMarker: 'export const getGroupDeparturePackagesForHome = unstableCache(',
        oldFunc: `export const getGroupDeparturePackagesForHome = unstableCache(
  async () => {`,
        newFunc: `export const getGroupDeparturePackagesForHome = unstableCache(
  async () => {
    return withRedisCache("published_packages", "group_departure", async () => {`,
        oldClose: `      return [];
    }
  },
  ["group-departure-home-v2"],
  { revalidate: 60 }
);`,
        newClose: `      return [];
    }
    }, 3600);
  },
  ["group-departure-home-v2"],
  { revalidate: 3600 }
);`
    },
    {
        startMarker: 'export const getThemePackagesForHome = cache(unstableCache(',
        oldFunc: `export const getThemePackagesForHome = cache(unstableCache(
  async () => {`,
        newFunc: `export const getThemePackagesForHome = cache(unstableCache(
  async () => {
    return withRedisCache("published_packages", "themes", async () => {`,
        oldClose: `      return {};
    }
  },
  ["theme-packages-home-v2"],
  { revalidate: 60 }
));`,
        newClose: `      return {};
    }
    }, 3600);
  },
  ["theme-packages-home-v2"],
  { revalidate: 3600 }
));`
    },
    {
        startMarker: 'export const getElitePackages = unstableCache(',
        oldFunc: `export const getElitePackages = unstableCache(
  async () => {`,
        newFunc: `export const getElitePackages = unstableCache(
  async () => {
    return withRedisCache("published_packages", "elite", async () => {`,
        oldClose: `      return [];
    }
  },
  ["elite-packages"],
  { revalidate: 60 }
);`,
        newClose: `      return [];
    }
    }, 3600);
  },
  ["elite-packages"],
  { revalidate: 3600 }
);`
    },
    {
        startMarker: 'export const getRomanticPackages = unstableCache(',
        oldFunc: `export const getRomanticPackages = unstableCache(
  async () => {`,
        newFunc: `export const getRomanticPackages = unstableCache(
  async () => {
    return withRedisCache("published_packages", "romantic", async () => {`,
        oldClose: `      return [];
    }
  },
  ["romantic-packages"],
  { revalidate: 60 }
);`,
        newClose: `      return [];
    }
    }, 3600);
  },
  ["romantic-packages"],
  { revalidate: 3600 }
);`
    },
    {
        startMarker: 'export const getWhyChooseRegionData = unstableCache(',
        oldFunc: `export const getWhyChooseRegionData = unstableCache(
  async (regionId) => {`,
        newFunc: `export const getWhyChooseRegionData = unstableCache(
  async (regionId) => {
    return withRedisCache("why_choose_region", regionId, async () => {`,
        oldClose: `      return null;
    }
  },
  ["why-choose-region"],
  { revalidate: 60 }
);`,
        newClose: `      return null;
    }
    }, 86400);
  },
  ["why-choose-region"],
  { revalidate: 86400 }
);`
    }
];

// Instead of string replaces, let's just make sure the find matches exactly.
for (const rep of replacements) {
    content = content.split(rep.oldFunc).join(rep.newFunc);
    content = content.split(rep.oldClose).join(rep.newClose);
}

fs.writeFileSync(file, content);
