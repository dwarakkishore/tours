import { fetchRegions } from "@/lib/server";
import FooterClient from "./FooterClient";

export default async function FooterWrapper() {
  try {
    const { domesticRegions, internationalRegions } = await fetchRegions();
    return <FooterClient domesticRegions={domesticRegions} internationalRegions={internationalRegions} />;
  } catch (error) {
    console.error("Error in FooterWrapper:", error);
    return <FooterClient domesticRegions={[]} internationalRegions={[]} />;
  }
}
