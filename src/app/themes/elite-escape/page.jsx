import EliteEscapeClient from "@/components/Themes/EliteEscapeClient";
import { getRegionsForHome, getElitePackages } from "@/lib/server";

export const metadata = {
  title: "Elite Escape",
  description: "All things luxury. Discover premium destinations and exclusive experiences for those who demand the very best in travel.",
  alternates: {
    canonical: "/themes/elite-escape",
  },
};

export default async function EliteEscapePage() {
  const [regions, initialPackages] = await Promise.all([
    getRegionsForHome(),
    getElitePackages()
  ]);

  return <EliteEscapeClient initialRegions={regions} initialPackages={initialPackages} />;
}
