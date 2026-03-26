import { Suspense } from "react";
import {
  fetchReviews,
  getRegionsForHome,
  getCuratedPackagesForHome,
  getGroupDeparturePackagesForHome,
  getThemePackagesForHome,
  getMarketingBanners,
} from "@/lib/server";
import { SITE_DATA } from "@/config";
import JsonLd from "@/components/Seo/JsonLd";
import Hero from "@/components/Landing/Hero";
import dynamic from "next/dynamic";
import LazySection from "@/components/ui/LazySection";

const ExploreDestinations = dynamic(() => import("@/components/Landing/Destinations/ExploreDestinations"));
const Holidays = dynamic(() => import("@/components/Landing/Holidays"));
const TravelStyle = dynamic(() => import("@/components/Landing/TravelStyle"));
const ThemeHighlights = dynamic(() => import("@/components/Landing/ThemeHighlights"));
const DestinationSpotlight = dynamic(() => import("@/components/Landing/Destinations/DestinationSpotlight"));
const GroupDeparture = dynamic(() => import("@/components/Landing/GroupDeparture"));
const WhyBayard = dynamic(() => import("@/components/Landing/WhyBayard"));
const InspirationSection = dynamic(() => import("@/components/Landing/InspirationSection"));
const RegionTestimonials = dynamic(() => import("@/components/Packages/RegionTestimonials"));
const MobileAdBanner = dynamic(() => import("@/components/Landing/MobileAdBanner"));
const AdvertisementBanner = dynamic(() => import("@/components/Landing/AdvertisementBanner"));

// Timeout wrapper to prevent indefinite hanging
const withTimeout = (promise, timeoutMs, fallbackValue, operationName) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`${operationName} timed out after ${timeoutMs}ms`)), timeoutMs)
    ),
  ]).catch((error) => {
    console.error(`${operationName} failed or timed out:`, error);
    return fallbackValue;
  });
};

const TIMEOUT_MS = 10000; // 10 seconds timeout

// --- DATA WRAPPERS (SERVER COMPONENTS) ---

async function ExploreDestinationsSection() {
  const regions = await withTimeout(getRegionsForHome(), TIMEOUT_MS, [], "getRegionsForHome");
  return <ExploreDestinations initialRegions={regions} />;
}

async function HolidaysSection() {
  const [international, domestic] = await Promise.all([
    withTimeout(getCuratedPackagesForHome("international"), TIMEOUT_MS, [], "getCuratedPackagesForHome (intl)"),
    withTimeout(getCuratedPackagesForHome("domestic"), TIMEOUT_MS, [], "getCuratedPackagesForHome (dom)"),
  ]);
  return (
    <>
      <section className="bg-gradient-to-b from-white to-slate-50 section-padding blue-section">
        <Holidays initialInternationalPackages={international} initialDomesticPackages={domestic} />
      </section>
      <section className="bg-white section-padding">
        <TravelStyle initialInternationalPackages={international} initialDomesticPackages={domestic} />
      </section>
    </>
  );
}

async function AdBannerSection() {
  const banner = await withTimeout(getMarketingBanners(), TIMEOUT_MS, null, "getMarketingBanners");
  return (
    <>
      <section className="section-padding px-4 sm:px-6 lg:px-8 hidden md:block">
        <AdvertisementBanner bannerData={banner} />
      </section>
      <section className="block md:hidden">
        <MobileAdBanner bannerData={banner} />
      </section>
    </>
  );
}

async function ThemeHighlightsSection() {
  const [themePackages, regions] = await Promise.all([
    withTimeout(getThemePackagesForHome(), TIMEOUT_MS, {}, "getThemePackagesForHome"),
    withTimeout(getRegionsForHome(), TIMEOUT_MS, [], "getRegionsForHome")
  ]);
  
  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white blue-section">
        <ThemeHighlights
          initialEliteEscapePackages={themePackages.eliteEscapePackages}
          initialSoloExpeditionPackages={themePackages.soloExpeditionPackages}
          initialFamilyFunventurePackages={themePackages.familyFunventurePackages}
          initialGroupAdventuresPackages={themePackages.groupAdventuresPackages}
          initialReligiousRetreatPackages={themePackages.religiousRetreatPackages}
          initialRelaxRejuvenatePackages={themePackages.relaxRejuvenatePackages}
          initialExplorationBundlePackages={themePackages.explorationBundlePackages}
          initialEducationalPackages={themePackages.educationalPackages}
          initialRomanticGetawaysPackages={themePackages.romanticGetawaysPackages}
        />
      </section>
      <section className="bg-white overflow-hidden relative py-4 md:py-6 pb-2 md:pb-3 px-4 sm:px-6 lg:px-8">
        <DestinationSpotlight initialRegions={regions} eliteEscapePackages={themePackages.eliteEscapePackages} />
      </section>
    </>
  );
}

async function GroupDepartureSection() {
  const packages = await withTimeout(getGroupDeparturePackagesForHome(), TIMEOUT_MS, [], "getGroupDeparturePackagesForHome");
  return (
    <section className="bg-white relative overflow-hidden section-padding">
      <GroupDeparture groupDeparturePackages={packages} />
    </section>
  );
}

async function TestimonialsSection() {
  const reviews = await withTimeout(fetchReviews(), TIMEOUT_MS, [], "fetchReviews");
  return (
    <section className="relative overflow-hidden">
      <RegionTestimonials regionName="Our Travelers" initialReviews={reviews} />
    </section>
  );
}

async function InspirationSectionSection() {
  const regions = await withTimeout(getRegionsForHome(), TIMEOUT_MS, [], "getRegionsForHome");
  return <InspirationSection initialDestinations={regions} />;
}

// --- MAIN PAGE ---

const HomePage = () => {
  return (
    <>
      {/* LCP Preload */}
      <link 
        rel="preload" 
        as="image" 
        href="https://cdn.bayardvacations.com/images/1770397299555-Screenshot_2026-02-06_195709_copy.jpg" 
        fetchPriority="high" 
      />
      <section>
        <Hero />
      </section>

      <Suspense fallback={<div className="h-96 bg-slate-50 animate-pulse" />}>
      <LazySection rootMargin="400px" className="blue-section">
        <section className="bg-white section-padding">
          <ExploreDestinationsSection />
        </section>
        <HolidaysSection />
      </LazySection>
      </Suspense>

      <Suspense fallback={<div className="h-64 bg-slate-50 animate-pulse m-8 rounded-3xl" />}>
        <LazySection rootMargin="300px">
          <AdBannerSection />
        </LazySection>
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-slate-50 animate-pulse" />}>
        <LazySection rootMargin="300px">
          <ThemeHighlightsSection />
        </LazySection>
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
        <LazySection rootMargin="300px">
          <GroupDepartureSection />
        </LazySection>
      </Suspense>
      
      <section className="bg-gradient-to-br from-[#0146b3] to-[#020617] section-padding text-white relative overflow-hidden">
        <LazySection rootMargin="300px">
          <WhyBayard />
        </LazySection>
      </section>
      
      <Suspense fallback={<div className="h-96 bg-slate-50 animate-pulse" />}>
        <LazySection rootMargin="300px">
          <InspirationSectionSection />
        </LazySection>
        <LazySection rootMargin="300px">
          <TestimonialsSection />
        </LazySection>
      </Suspense>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_DATA.name,
          url: SITE_DATA.url,
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${SITE_DATA.url}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE_DATA.name,
          url: SITE_DATA.url,
          logo: `${SITE_DATA.url}${SITE_DATA.image}`,
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-9187563136",
            contactType: "customer service",
            areaServed: "IN",
            availableLanguage: "en",
          },
          sameAs: [
            "https://www.instagram.com/bayardvacations",
            "https://www.facebook.com/bayardvacations",
            "https://www.linkedin.com/company/bayard-vacations",
          ],
        }}
      />
    </>
  );
};

export default HomePage;
