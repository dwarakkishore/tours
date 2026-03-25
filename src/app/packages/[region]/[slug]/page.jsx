import PackagesClient from "@/components/Packages/PackagesClient";
import {
  getDocumentBySlug,
  getPackageWithAllReferences,
  getAllDocuments,
} from "@/utils/firebase";
import { COLLECTIONS } from "@/config";

// Enable dynamic params
export const dynamicParams = true;

// Generate static params (limited for faster builds on VPS)
export async function generateStaticParams() {
  // We return an empty array to skip pre-rendering 4500+ pages during build.
  // Because dynamicParams = true (line 10), pages will be generated on first visit.
  return [];
}

const fallbackMetadata = {
  title: "Packages | Bayard Vacations",
  description:
    "Explore our range of packages and find the perfect one for you.",
  keywords: "vacation packages, travel deals, holiday tours",
};

export const generateMetadata = async ({ params }) => {
  const { slug, region } = await params;
  const packageData = await getDocumentBySlug(slug);

  // Construct canonical URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bayardvacations.com';
  const canonicalUrl = `${baseUrl}/packages/${region}/${slug}`;

  if (!packageData) {
    return {
      title: fallbackMetadata.title,
      description: fallbackMetadata.description,
      keywords: fallbackMetadata.keywords,
      alternates: {
        canonical: canonicalUrl,
      },
    };
  }

  const metadata = {
    title: packageData.meta?.title || packageData.packageName,
    description:
      packageData.meta?.description || packageData.footer_description,
    keywords: packageData.meta?.keywords || fallbackMetadata.keywords,
    alternates: {
      canonical: canonicalUrl, // Dynamic canonical URL
    },
    openGraph: {
      title: packageData.meta?.title || packageData.packageName,
      description:
        packageData.meta?.description || packageData.footer_description,
      url: canonicalUrl, // Use canonical URL for OpenGraph
      siteName: 'Bayard Vacations',
      type: "website",
      images: packageData.bannerImages?.[0]?.url ? [
        {
          url: packageData.bannerImages[0].url,
          width: 1200,
          height: 630,
          alt: packageData.packageName,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: packageData.meta?.title || packageData.packageName,
      description: packageData.meta?.description || packageData.footer_description,
      images: packageData.bannerImages?.[0]?.url ? [packageData.bannerImages[0].url] : [],
    },
  };

  // Add custom meta tags if they exist
  if (packageData.meta?.custom && Array.isArray(packageData.meta.custom)) {
    const customMetaTags = {};
    packageData.meta.custom.forEach(({ key, value }) => {
      customMetaTags[key] = value;
    });

    if (Object.keys(customMetaTags).length > 0) {
      metadata.other = customMetaTags;
    }
  }

  return metadata;
};

export default function Page() {
  return <PackagesClient />;
}
