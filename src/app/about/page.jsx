import AboutClient from "./AboutClient";

export const metadata = {
  title: "About Us | Bayard Vacations | Our Story & Mission",
  description:
    "Learn about Bayard Vacations, our 15+ years of experience in crafting dream journeys, our mission, and the passionate team dedicated to making your travel memories last forever.",
  keywords: "About Bayard Vacations, travel agency history, travel mission, experienced travel planners, Indian travel company",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | Bayard Vacations",
    description: "Discover our journey, mission, and the team behind Bayard Vacations.",
    type: "website",
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
