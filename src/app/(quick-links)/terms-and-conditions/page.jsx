import TermsClient from "./TermsClient";

export const metadata = {
  title: "Terms and Conditions | Bayard Vacations",
  description:
    "Review the terms and conditions for using Bayard Vacations' website and booking services. We ensure clarity and transparency in all our legal agreements.",
  keywords: "terms and conditions, legal agreement, travel terms, booking agreement, Bayard Vacations policy",
  alternates: {
    canonical: "/terms-and-conditions",
  },
  openGraph: {
    title: "Terms and Conditions | Bayard Vacations",
    description: "Our legal terms and conditions for travel services.",
    type: "website",
    url: "/terms-and-conditions",
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
