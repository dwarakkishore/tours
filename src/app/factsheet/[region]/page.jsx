import FactsheetClient from "@/components/Factsheet/FactsheetClient";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { COLLECTIONS } from "@/config";

export async function generateMetadata({ params }) {
  const { region } = await params;
  const regionName = region
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bayardvacations.com';
  const canonicalUrl = `${baseUrl}/factsheet/${region}`;

  try {
    // Fetch region data to get regionId
    const regionsRef = collection(db, COLLECTIONS.REGIONS || "regions");
    const regionQuery = query(regionsRef, where("slug", "==", region));
    const regionSnapshot = await getDocs(regionQuery);

    if (!regionSnapshot.empty) {
      const regionData = regionSnapshot.docs[0].data();
      const regionId = regionSnapshot.docs[0].id;

      // Fetch factsheet data using regionId
      const collectionName = COLLECTIONS.REGION_FACTS_SHEET || "region_facts_sheet";
      const factsSheetRef = collection(db, collectionName);
      const factsheetQuery = query(factsSheetRef, where("regionId", "==", regionId));
      const factsheetSnapshot = await getDocs(factsheetQuery);

      if (!factsheetSnapshot.empty) {
        const data = factsheetSnapshot.docs[0].data();

        // Use dynamic metadata from Firestore
        return {
          title: data?.meta?.title || `${regionName} Factsheet | Climate, Visa, Currency & Essentials | Bayard Vacations`,
          description: data?.meta?.description || `Complete ${regionName} travel factsheet covering climate, visa requirements, currency, culture, food, and transport for travelers.`,
          keywords: data?.meta?.keywords || `${regionName} factsheet, ${regionName} visa, ${regionName} currency, ${regionName} climate, ${regionName} travel essentials`,
          
          // OpenGraph metadata
          openGraph: {
            title: data?.openGraph?.title || `${regionName} Factsheet | Travel Guide | Bayard Vacations`,
            description: data?.openGraph?.description || `Essential travel information for ${regionName}. Complete guide covering climate, visa, currency, culture, and more.`,
            url: canonicalUrl, // Always use factsheet URL, not destination URL
            siteName: 'Bayard Vacations',
            images: data?.openGraph?.image ? [
              {
                url: data.openGraph.image,
                width: 1200,
                height: 630,
                alt: `${regionName} Travel Guide`,
              }
            ] : [],
            locale: 'en_US',
            type: data?.openGraph?.type || 'website',
          },
          
          // Twitter Card metadata
          twitter: {
            card: data?.twitter?.card || 'summary_large_image',
            title: data?.twitter?.title || `${regionName} Factsheet | Travel Guide`,
            description: data?.twitter?.description || `Complete travel factsheet for ${regionName}.`,
            images: data?.twitter?.image ? [data.twitter.image] : [],
          },
          
          // Canonical URL - Always use factsheet path
          alternates: {
            canonical: canonicalUrl, // Use factsheet URL, not the destination URL from database
          },
          
          // Robots
          robots: {
            index: true,
            follow: true,
            'max-snippet': -1,
            'max-image-preview': 'large',
            'max-video-preview': -1,
          },
        };
      }
    }
  } catch (error) {
    console.error('Error fetching factsheet metadata from Firestore:', error);
  }

  // Fallback to static metadata if Firestore fetch fails
  return {
    title: `${regionName} Factsheet | Climate, Visa, Currency & Essentials | Bayard Vacations`,
    description: `Complete ${regionName} travel factsheet covering climate, visa requirements, currency, culture, food, and transport for travelers.`,
    keywords: `${regionName} factsheet, ${regionName} visa, ${regionName} currency, ${regionName} climate, ${regionName} travel essentials`,
    
    // OpenGraph metadata
    openGraph: {
      title: `${regionName} Factsheet | Travel Guide | Bayard Vacations`,
      description: `Essential travel information for ${regionName}. Complete guide covering climate, visa, currency, culture, and more.`,
      url: canonicalUrl,
      siteName: 'Bayard Vacations',
      locale: 'en_US',
      type: 'website',
    },
    
    // Twitter Card metadata
    twitter: {
      card: 'summary_large_image',
      title: `${regionName} Factsheet | Travel Guide`,
      description: `Complete travel factsheet for ${regionName}.`,
    },
    
    // Canonical URL
    alternates: {
      canonical: canonicalUrl,
    },
    
    // Robots
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  };
}

export default async function FactsheetPage({ params }) {
  const { region } = await params;

  return <FactsheetClient regionSlug={region} />;
}
