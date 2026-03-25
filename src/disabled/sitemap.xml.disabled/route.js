import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getDocs, where, orderBy } from "firebase/firestore";
import { COLLECTIONS, PACKAGE_STATUS, DEFAULT_URL } from "@/config";
import { getCollectionQuery } from "@/utils/firebase";

// List of routes to exclude from sitemap
const EXCLUDED_ROUTES = [
  "/login",
  "/email-verification",
  "/api",
  "/_next",
  "/static",
  "/checkout",
  "/account",
  "/admin",
];

// List of static routes to include
const STATIC_ROUTES = [
  "/",
  "/contact",
  "/packages",
  "/blogs",
  "/privacy-policy",
  "/terms-of-service",
  "/group-departure",
];

// List of category routes
const CATEGORY_ROUTES = [
  "/categories/elite-escape",
  "/categories/solo-expedition",
  "/categories/family-funventure",
  "/categories/group-adventures",
  "/categories/religious-retreat",
  "/categories/relax-rejuvenate",
  "/categories/exploration-bundle",
  "/categories/educational",
  "/categories/romantic-getaways",
];

function generateSitemapXML(routes, baseUrl) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>daily</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return xml;
}

export async function GET() {
  try {
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const baseUrl = DEFAULT_URL || `${protocol}://${host}`;

    // Get all packages from Firebase
    const allPackages = [];

    try {
      const q = getCollectionQuery(COLLECTIONS.PACKAGES, [
        where("status", "==", PACKAGE_STATUS.PUBLISHED),
        orderBy("createdAt", "desc"),
      ]);
      const querySnapshot = await getDocs(q);
      const packages = querySnapshot.docs.map((doc) => doc.data());
      allPackages.push(...packages);
    } catch (error) {
    }

    // Generate package routes
    const packageRoutes = allPackages.map(
      (pkg) => `/packages/${pkg.region}/${pkg.packageSlug}`
    );

    // Combine all routes
    const allRoutes = [...STATIC_ROUTES, ...CATEGORY_ROUTES, ...packageRoutes];

    // Filter out excluded routes
    const filteredRoutes = allRoutes.filter(
      (route) => !EXCLUDED_ROUTES.some((excluded) => route.startsWith(excluded))
    );

    // Generate the sitemap XML
    const sitemap = generateSitemapXML(filteredRoutes, baseUrl);

    // Return the sitemap with appropriate headers
    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate sitemap" },
      { status: 500 }
    );
  }
}
