import ActivitiesListingClient from "@/components/Activities/ActivitiesListingClient";
import { getRegions } from "@/utils/firebase";

export const metadata = {
  title: "Explore Activities | Bayard Vacations",
  description: "Discover exciting activities and experiences across all our destinations. From adventure sports to cultural tours, find the perfect activity for your trip.",
  alternates: {
    canonical: "/activities",
  },
};

export default async function GlobalActivitiesPage() {
  // Fetch regions on server to avoid hydration mismatch
  const initialRegions = await getRegions();
  
  // Default to showing all activities without a specific region slug
  return <ActivitiesListingClient regionSlug="" initialRegions={initialRegions} />;
}
