import RomanticGetawaysClient from "@/components/Themes/RomanticGetawaysClient";

export const metadata = {
  title: "Romantic Getaways",
  description: "Discover handpicked romantic destinations perfect for couples. From beach resorts to mountain retreats, create unforgettable memories together.",
  alternates: {
    canonical: "/themes/romantic-getaways",
  },
};

import { getRomanticPackages } from "@/lib/server";

export default async function RomanticGetawaysPage() {
  const initialPackages = await getRomanticPackages();
  return <RomanticGetawaysClient initialPackages={initialPackages} />;
}
