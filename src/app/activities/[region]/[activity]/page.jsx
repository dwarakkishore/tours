import ActivityDetailClient from "@/components/Activities/ActivityDetailClient";

export async function generateMetadata({ params }) {
  const { region, activity } = await params;
  const regionName = region
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const activityName = activity
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${activityName} in ${regionName} | Bayard Vacations`,
    description: `Experience ${activityName} in ${regionName}. Book your adventure today with Bayard Vacations.`,
  };
}

export default async function ActivityDetailPage({ params }) {
  const { region, activity } = await params;

  return <ActivityDetailClient regionSlug={region} activitySlug={activity} />;
}
