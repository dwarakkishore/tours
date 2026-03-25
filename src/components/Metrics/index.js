import GoogleTag from "./GoogleTag";
import MicrosoftClarity from "./MicrosoftClarity";

export default function Metrics() {
  const googleTagIds = process.env.NEXT_PUBLIC_GOOGLE_TAG_IDS?.split(",") || [];
  
  // Fallback for legacy individual variables
  const legacyIds = [
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_2,
    process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
  ].filter(Boolean);

  const allIds = [...new Set([...googleTagIds, ...legacyIds])];

  return (
    <>
      {allIds.map((id) => (
        <GoogleTag key={id} tagId={id} />
      ))}
      <MicrosoftClarity />
    </>
  );
}
