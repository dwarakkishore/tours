import { getAllDocuments } from "@/utils/firebase";
import { COLLECTIONS } from "@/config";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bayardvacations.com';

  // 1. Static Public Routes - ONLY pages that actually exist
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/faq',
    '/explore',
    '/blogs',
    '/activities',
    '/themes',
    '/reviews',
    '/group-departure',
    '/cancellation-policy',
    '/privacy-policy',
    '/refund-policy',
    '/terms-and-conditions',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // Fetch all dynamic data in parallel
    const [blogs, packages, regions, regionActivities] = await Promise.all([
      getAllDocuments(COLLECTIONS.BLOGS),
      getAllDocuments(COLLECTIONS.PACKAGES),
      getAllDocuments(COLLECTIONS.REGIONS),
      getAllDocuments(COLLECTIONS.REGION_ACTIVITY),
    ]);

    // Create a map for region names to slugs for accurate package URL generation
    const regionMap = {};
    regions.forEach(r => {
      if (r.name) regionMap[r.name.toLowerCase().trim()] = r.slug;
    });

    // 2. Blog Post Routes
    const blogRoutes = blogs
      .filter((blog) => blog.status === 'published' && blog.slug)
      .map((blog) => ({
        url: `${baseUrl}/blogs/${blog.slug}`,
        lastModified: blog.updatedAt || blog.createdAt || new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      }));

    // 3. Package Detail Routes
    const packageRoutes = packages
      .filter((pkg) => pkg.status === 'published' && pkg.packageSlug)
      .map((pkg) => {
        // Try to get a clean region slug from our map, fallback to slugified region string
        const regionKey = pkg.region?.toLowerCase().trim();
        const regionSlug = regionMap[regionKey] || pkg.regionSlug || regionKey?.replace(/\s+/g, '-') || 'escape';
        
        return {
          url: `${baseUrl}/packages/${regionSlug}/${pkg.packageSlug}`,
          lastModified: pkg.updatedAt || pkg.createdAt || new Date(),
          changeFrequency: 'weekly',
          priority: 0.9,
        };
      });

    // 4. Region Landing Routes (Multiple pages per region)
    const regionLandingRoutes = [];
    regions.forEach((region) => {
      if (!region.slug) return;

      const formats = [
        { path: `/packages/${region.slug}`, priority: 0.8, freq: 'daily' },
        { path: `/activities/${region.slug}`, priority: 0.7, freq: 'weekly' },
        { path: `/factsheet/${region.slug}`, priority: 0.5, freq: 'monthly' },
        { path: `/why-choose/${region.slug}`, priority: 0.5, freq: 'monthly' },
      ];

      formats.forEach(f => {
        regionLandingRoutes.push({
          url: `${baseUrl}${f.path}`,
          lastModified: new Date(),
          changeFrequency: f.freq,
          priority: f.priority,
        });
      });
    });

    // 5. Individual Activity Routes
    const activityDetailRoutes = [];
    regionActivities.forEach((doc) => {
      const effectiveRegionSlug = doc.regionSlug || doc.slug || (doc.regionName?.toLowerCase().trim().replace(/\s+/g, "-"));
      
      if (effectiveRegionSlug && doc.activities && Array.isArray(doc.activities)) {
        doc.activities.forEach(activity => {
          if (activity.slug) {
            activityDetailRoutes.push({
              url: `${baseUrl}/activities/${effectiveRegionSlug}/${activity.slug}`,
              lastModified: new Date(),
              changeFrequency: 'weekly',
              priority: 0.6,
            });
          }
        });
      }
    });

    // 6. Theme Specific Routes - Matching actual folders in src/app/themes
    const themeSlugs = [
      'educational',
      'elite-escape',
      'exploration-bundle',
      'family-funventure',
      'group-adventures',
      'group-departure',
      'relax-rejuvenate',
      'religious-retreat',
      'romantic-getaways',
      'solo-expedition'
    ];
    const themeRoutes = themeSlugs.map((slug) => ({
      url: `${baseUrl}/themes/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    return [
      ...staticRoutes,
      ...blogRoutes,
      ...packageRoutes,
      ...regionLandingRoutes,
      ...activityDetailRoutes,
      ...themeRoutes,
    ];
  } catch (error) {
    console.error('Error generating universal sitemap:', error);
    return staticRoutes;
  }
}
