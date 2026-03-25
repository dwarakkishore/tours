import ExploreClient from "./ExploreClient";

export const metadata = {
  title: "Explore Destinations | Bayard Vacations | Discover Your Next Journey",
  description:
    "Discover breathtaking destinations across India and the globe. Plan your next adventure with Bayard Vacations, from mountain retreats to beach paradises.",
  keywords: "explore travel, travel destinations, vacation ideas, holiday destinations India, international tour packages",
  alternates: {
    canonical: "/explore",
  },
  openGraph: {
    title: "Explore Destinations | Bayard Vacations",
    description: "Find your next adventure from our curated list of world-class destinations.",
    type: "website",
    url: "/explore",
  },
};

export default function ExplorePage() {
  return <ExploreClient />;
}
