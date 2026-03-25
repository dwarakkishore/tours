import RefundClient from "./RefundClient";

export const metadata = {
  title: "Refund Policy | Bayard Vacations | Transparent Refund Process",
  description:
    "Learn about Bayard Vacations' refund policy. We provide clear guidelines and a transparent process for processing refunds on travel bookings.",
  keywords: "refund policy, travel refund, booking cancellation refund, Bayard Vacations refund terms",
  alternates: {
    canonical: "/refund-policy",
  },
  openGraph: {
    title: "Refund Policy | Bayard Vacations",
    description: "Our policy on refunds for cancelled travel bookings.",
    type: "website",
    url: "/refund-policy",
  },
};

export default function RefundPage() {
  return <RefundClient />;
}
