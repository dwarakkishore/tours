import PrivacyClient from "./PrivacyClient";

export const metadata = {
  title: "Privacy Policy | Bayard Vacations | Your Data Security",
  description:
    "At Bayard Vacations, your privacy is our priority. Read our privacy policy to understand how we collect, use, and protect your personal information.",
  keywords: "privacy policy, data protection, travel privacy, personal information security, Bayard Vacations privacy",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Bayard Vacations",
    description: "Our policy on protecting your personal data.",
    type: "website",
    url: "/privacy-policy",
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
