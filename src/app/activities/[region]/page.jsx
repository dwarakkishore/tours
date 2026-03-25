import ActivitiesListingClient from "@/components/Activities/ActivitiesListingClient";
import { getRegions } from "@/utils/firebase";

export async function generateMetadata({ params }) {
  const { region } = await params;
  const regionName = region
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `Activities in ${regionName} | Bayard Vacations`,
    description: `Discover exciting activities and experiences in ${regionName}. From adventure sports to cultural tours, find the perfect activity for your trip.`,
  };
}

export default async function ActivitiesListingPage({ params }) {
  const { region } = await params;
  
  // Fetch regions on server to avoid hydration mismatch
  const initialRegions = await getRegions();

  return <ActivitiesListingClient regionSlug={region} initialRegions={initialRegions} />;
}
