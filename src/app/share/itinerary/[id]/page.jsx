import ShareableItineraryClient from '@/components/ShareItinerary/ShareableItineraryClient';
import { getSavedItineraryById, getHotelsByIds } from '@/utils/firebase';
import { mapSavedItineraryToShareable } from '@/utils/itineraryMapper';
import { headers } from 'next/headers';
import '../../../print.css';

// Generate metadata for SEO and social sharing
export async function generateMetadata({ params, searchParams }) {
  const { id } = await params;
  const { customerName: queryName } = await searchParams;
  
  const rawData = await getSavedItineraryById(id);
  const itineraryData = mapSavedItineraryToShareable(rawData);
  
  if (!itineraryData) {
    return {
      title: 'Itinerary Not Found | Bayard Vacations',
      description: 'The requested itinerary could not be found.'
    };
  }

  // Use name from query param if available, otherwise fallback to stored name
  const displayName = queryName || itineraryData.customerName || 'Our Valued Guest';
  
  // Detect host dynamically to ensure metadata matches the environment (prelive vs production)
  const headersList = await headers();
  const host = headersList.get('host') || 'bayardvacations.com';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const siteUrl = `${protocol}://${host}`;
  const shareUrl = `/share/itinerary/${id}${queryName ? `?customerName=${encodeURIComponent(queryName)}` : ''}`;
  
  // Use a high-quality absolute image URL
  const ogImage = 'https://images.unsplash.com/photo-1542332213-9b5a5a3faa35?w=1200&h=630&fit=crop&q=80';

  return {
    metadataBase: new URL(siteUrl),
    title: `✈️ ${displayName}'s Trip to ${itineraryData.destination}`,
    description: `Check out our ${itineraryData.duration} journey to ${itineraryData.destination}. View daily activities, hotels, and expert-curated highlights.`,
    keywords: [
      itineraryData.destination,
      itineraryData.region,
      'travel itinerary',
      'vacation package',
      'Bayard Vacations',
      displayName
    ],
    authors: [{ name: 'Bayard Vacations' }],
    openGraph: {
      title: `✈️ ${displayName}'s Trip to ${itineraryData.destination}`,
      description: `View the full itinerary for this journey to ${itineraryData.destination}. Discover our handpicked hotels, daily activities, and exclusive inclusions.`,
      url: shareUrl,
      siteName: 'Bayard Vacations',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Travel Itinerary for ${itineraryData.destination}`,
          type: 'image/jpeg',
        }
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Experience ${itineraryData.destination} with Bayard Vacations`,
      description: `Check out this custom-built itinerary for ${itineraryData.destination}. Handpicked experiences and seamless travel at your fingertips.`,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ShareItineraryPage({ params, searchParams }) {
  const { id } = await params;
  const { customerName: queryName } = await searchParams;
  
  let rawData;
  let itineraryData;
  let resolvedHotels = null;
  
  rawData = await getSavedItineraryById(id);
  
  if (!rawData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Itinerary Not Found</h2>
          <p className="text-slate-600 mb-6">Sorry, we couldn't find the itinerary you're looking for. It may have expired or the link is incorrect.</p>
          <a href="/" className="inline-block px-8 py-3 bg-[#0146b3] text-white rounded-full font-semibold hover:bg-[#01358a] transition-colors">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  // Resolve full hotel details if hotelIds exist
  const baseCategory = rawData?.formData?.hotelDetailsData?.baseCategory || 'fourstar';
  const hotelIds = rawData?.formData?.hotelDetailsData?.[baseCategory]?.hotelIds || [];
  
  if (hotelIds && hotelIds.length > 0) {
    resolvedHotels = await getHotelsByIds(hotelIds);
  }

  itineraryData = mapSavedItineraryToShareable(rawData, resolvedHotels);

  // Override customer name if provided in query param
  if (itineraryData && queryName) {
    itineraryData.customerName = queryName;
  }

  return <ShareableItineraryClient itineraryData={itineraryData} />;
}
