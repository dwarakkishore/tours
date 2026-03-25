import CancellationClient from "./CancellationClient";

export const metadata = {
  title: "Cancellation Policy | Bayard Vacations | Flexible Booking Terms",
  description:
    "Review our cancellation policy to understand the terms for cancelling your travel bookings. We offer clear guidelines based on the timing of your cancellation request.",
  keywords: "cancellation policy, travel cancellation, booking cancellation, Bayard Vacations cancellation terms",
  alternates: {
    canonical: "/cancellation-policy",
  },
  openGraph: {
    title: "Cancellation Policy | Bayard Vacations",
    description: "Our policy on travel booking cancellations.",
    type: "website",
    url: "/cancellation-policy",
  },
};

export default function CancellationPage() {
  return <CancellationClient />;
}
