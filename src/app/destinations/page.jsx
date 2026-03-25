import DestinationsHero from "@/components/Destinations/DestinationsHero";
import DestinationsListing from "@/components/Destinations/DestinationsListing";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import InspirationSection from "@/components/Landing/InspirationSection";

export const metadata = {
  title: "Explore Destinations | Bayard Vacations",
  description: "Browse our hand-picked luxury destinations across the globe.",
};

export default function DestinationsPage() {
  return (
    <main>
      <DestinationsHero />
      <DestinationsListing />
      <section className="pb-12 bg-white">
        <InspirationSection />
      </section>
    </main>
  );
}
