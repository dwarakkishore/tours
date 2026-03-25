import { NextResponse } from "next/server";
import { typesenseClient } from "@/lib/typesense";
import { ensureCollectionExists } from "@/lib/typesense-helpers";

export const dynamic = "force-dynamic";

const normalizePackage = (document) => {
  const slug = document.slug || document.packageSlug;
  return {
    ...document,
    // Ensure both keys exist for existing consumers
    packageSlug: document.packageSlug || slug,
    packageName: document.packageName || document.name || document.title,
    bannerImage: document.bannerImage || document.banner_image || null,
    slug,
  };
};

export async function GET(request) {
  const { searchParams: urlSearchParams } = new URL(request.url);
  const q = urlSearchParams.get("q")?.trim();

  if (!q) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  try {
    // We assume the collection exists and is synced via a separate process or initial setup.
    // Syncing on every request causes timeouts.

    const searchParams = {
      q,
      query_by: "name,title,slug,theme,region",
      sort_by: "basePrice:asc",
      per_page: 20,
    };

    const result = await typesenseClient
      .collections("published_packages")
      .documents()
      .search(searchParams);

    const documents =
      result.hits?.map((hit) => normalizePackage(hit.document)) || [];

    // Group packages by region
    const packagesByRegionMap = documents.reduce((acc, pkg) => {
      if (!pkg.region) return acc;
      acc[pkg.region] = acc[pkg.region] || [];
      acc[pkg.region].push(pkg);
      return acc;
    }, {});

    const packagesByRegion = Object.entries(packagesByRegionMap).map(
      ([region, packages]) => ({ region, packages })
    );

    const regions = Array.from(
      documents.reduce((set, pkg) => {
        if (pkg.region) set.add(pkg.region);
        return set;
      }, new Set())
    );

    return NextResponse.json({
      packages: documents,
      packagesByRegion,
      regions,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
