import PackagesRegionClient from "@/components/Packages/PackagesRegionClient";
import { getAllDocuments, getRegionDocumentBySlug } from "@/utils/firebase";
import { getMarketingBanners } from "@/lib/server";
import { COLLECTIONS } from "@/config";
import { Suspense } from "react";

export const dynamic = 'force-dynamic'; // Bypass server-side cache entirely for this page

// Enable dynamic params
export const dynamicParams = true;

// Generate static params for all regions
export async function generateStaticParams() {
  try {
    const regions = await getAllDocuments(COLLECTIONS.REGIONS);
    return regions.map((region) => ({
      region: region.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for regions:", error);
    return [];
  }
}

// Generate metadata for package region pages
export async function generateMetadata({ params }) {
  const { region } = await params;
  
  // Construct canonical URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bayardvacations.com';
  const canonicalUrl = `${baseUrl}/packages/${region}`;
  
  // Format region name
  const regionName = region
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  try {
    // Fetch region data for better metadata
    const regionDoc = await getRegionDocumentBySlug(region);
    
    if (regionDoc) {
      return {
        title: `${regionName} Packages | Customized Travel Packages | Bayard Vacations`,
        description: `Discover tailored travel packages for ${regionName}. From romantic getaways to family trips and solo expeditions, find the perfect ${regionName} tour package.`,
        keywords: `${regionName} packages, ${regionName} tours, ${regionName} travel packages, ${regionName} vacation packages`,
        alternates: {
          canonical: canonicalUrl,
        },
        openGraph: {
          title: `${regionName} Packages | Bayard Vacations`,
          description: `Explore curated travel packages for ${regionName}. Book your perfect ${regionName} adventure today.`,
          url: canonicalUrl,
          siteName: 'Bayard Vacations',
          type: 'website',
          images: regionDoc.bannerImage ? [
            {
              url: regionDoc.bannerImage,
              width: 1200,
              height: 630,
              alt: `${regionName} Travel Packages`,
            }
          ] : [],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${regionName} Packages | Bayard Vacations`,
          description: `Discover tailored travel packages for ${regionName}.`,
          images: regionDoc.bannerImage ? [regionDoc.bannerImage] : [],
        },
      };
    }
  } catch (error) {
    console.error('Error fetching region data for metadata:', error);
  }

  // Fallback metadata
  return {
    title: `${regionName} Packages | Bayard Vacations`,
    description: `Discover tailored travel experiences for ${regionName}. Explore our curated packages and find your perfect adventure.`,
    keywords: `${regionName} packages, ${regionName} tours, travel packages`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${regionName} Packages | Bayard Vacations`,
      description: `Explore travel packages for ${regionName}.`,
      url: canonicalUrl,
      siteName: 'Bayard Vacations',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${regionName} Packages | Bayard Vacations`,
      description: `Discover travel packages for ${regionName}.`,
    },
  };
}

export default async function PackagesRegionPage({ params }) {
  const { region } = await params;
  let initialRegionData = null;
  let bannerData = null;

  try {
    const [regionData, banners] = await Promise.all([
      getRegionDocumentBySlug(region),
      getMarketingBanners()
    ]);
    initialRegionData = regionData;
    bannerData = banners;
  } catch (error) {
    console.error("Error fetching initial data for region page:", error);
  }

  return (
    <Suspense fallback={<div>Loading packages...</div>}>
      <PackagesRegionClient 
        initialRegionData={initialRegionData} 
        bannerData={bannerData}
      />
    </Suspense>
  );
}