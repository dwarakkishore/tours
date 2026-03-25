"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Sparkles,
  Camera,
  Users,
  CloudSun,
  Info,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import Container from "@/components/ui/Container";
import GalleryCarousel from "@/components/ui/GalleryCarousel";
import WhyBayardVacations from "@/components/Packages/WhyBayardVacations";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { cn, normalizeImageUrl } from "@/lib/utils";
import { useRegion } from "@/hooks/regions";
import { useWhyChooseRegion } from "@/hooks/regions/useWhyChooseRegion";

export default function WhyChooseRegionClient({ regionSlug }) {
  const router = useRouter();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState({ title: "", images: [] });
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [expandedHighlights, setExpandedHighlights] = useState({});
  const [expandedFacts, setExpandedFacts] = useState({});
  const [expandedReasons, setExpandedReasons] = useState({});

  const regionName = regionSlug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const { regionData, isLoading: regionLoading } = useRegion(regionSlug);
  const { whyChooseData, isLoading: whyChooseLoading } = useWhyChooseRegion(regionData?.id);
  const isLoading = regionLoading || whyChooseLoading;

  const getImageUrl = (img) => {
    if (!img) return null;
    const url = typeof img === 'string' ? img : (img.recommendedPhotoImage || img.url || img.image || img.imageUrl);
    return normalizeImageUrl(url);
  };

  const processRegionData = (data) => {
    if (!data) return null;
    return {
      ...data,
      highlights: data.highlights?.map(highlight => {
        if (!highlight) return null;
        const hasGallery = Array.isArray(highlight.gallery) && highlight.gallery.length > 0;
        const mainImage = hasGallery ? getImageUrl(highlight.gallery[0]) : getImageUrl(highlight.recommendedPhotoImage);
        const mainCaption = hasGallery ? (highlight.gallery[0].caption || highlight.gallery[0].title) : highlight.recommendedPhotoContent;
        return {
          ...highlight,
          gallery: hasGallery ? highlight.gallery.map(img => ({
            url: getImageUrl(img),
            caption: img.caption || img.title || highlight.title
          })) : (highlight.recommendedPhotoImage ? [{
            url: getImageUrl(highlight.recommendedPhotoImage),
            caption: highlight.recommendedPhotoContent
          }] : []),
          recommendedPhotoContent: mainCaption,
          recommendedPhotoImage: mainImage
        };
      }).filter(Boolean),
      activities: data.activities?.map(activity => activity ? ({
        ...activity,
        image: getImageUrl(activity.image || activity.imageUrl || activity.url)
      }) : null).filter(Boolean),
      travelStyles: data.travelStyles?.map(style => style ? ({
        ...style
      }) : null).filter(Boolean),
      secrets: data.secrets?.map(secret => secret ? ({
        ...secret
      }) : null).filter(Boolean),
      whyVisitSection: data.whyVisitSection ? {
        ...data.whyVisitSection,
        reasons: data.whyVisitSection.reasons || []
      } : null
    };
  };

  const rawRegionData = whyChooseData ? {
    ...(whyChooseData.details || {}),
    ...whyChooseData,
    highlights: whyChooseData?.highlights || whyChooseData?.["Key Highlights"] || whyChooseData?.keyHighlights || whyChooseData?.details?.highlights || [],
    activities: whyChooseData?.activities || whyChooseData?.details?.activities || [],
  } : null;
  
  const regionDataProcessed = processRegionData(rawRegionData);
  const highlights = regionDataProcessed?.highlights || [];
  const activities = regionDataProcessed?.activities || [];

  useEffect(() => {
    if (!isLoading && typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        const timer = setTimeout(() => {
          const id = hash.replace("#", "");
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [isLoading]);

  const mobileHeroImageSrc = getImageUrl(whyChooseData?.mobileHeroImage || whyChooseData?.mobileBannerImage);
  const desktopHeroImageSrc = getImageUrl(whyChooseData?.heroImage || whyChooseData?.desktopBannerImage);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
          <div className="text-slate-600 font-bold tracking-widest uppercase text-xs">Loading {regionName}...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <GalleryCarousel
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        images={selectedGallery.images}
        title={selectedGallery.title}
      />

      <div className="min-h-screen bg-slate-50 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative w-full aspect-[4/5] lg:aspect-[21/9] flex items-end lg:items-center">
          <div className="absolute inset-0 w-full h-full">
            <div className={cn("absolute inset-0 z-0", mobileHeroImageSrc ? "hidden lg:block" : "block")}>
              {desktopHeroImageSrc ? (
                <Image
                  src={normalizeImageUrl(desktopHeroImageSrc)}
                  alt={regionName}
                  fill
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-slate-200 animate-pulse" />
              )}
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {mobileHeroImageSrc && (
              <div className="absolute inset-0 z-0 lg:hidden">
                <Image
                  src={normalizeImageUrl(mobileHeroImageSrc)}
                  alt={regionName}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            )}
            
            <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent z-10" />
            <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-slate-900 absolute inset-0 z-10" />
          </div>

          <Container className="relative z-20 pt-20 pb-20 sm:pb-24 lg:pb-0 lg:mt-0">
            <div className="max-w-3xl text-white space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm rounded-full mb-4">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-300 text-xs font-bold uppercase tracking-widest">Why Visit</span>
                </div>
                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-2xl">
                  Why Choose <span className="text-amber-400">{regionName}?</span>
                </h1>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <p className={cn("text-lg md:text-xl text-slate-100 leading-relaxed font-medium border-l-4 border-amber-400 pl-6", !isDescExpanded && "line-clamp-3")}>
                  {regionDataProcessed?.overview}
                </p>
                <button
                  onClick={() => setIsDescExpanded(!isDescExpanded)}
                  className="mt-4 text-amber-400 text-sm font-bold uppercase tracking-widest hover:text-amber-300 transition-colors inline-flex items-center gap-2"
                >
                  {isDescExpanded ? "View Less" : "Read More"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </Container>

          <div className="absolute bottom-6 left-0 right-0 z-30 w-full animate-fade-in lg:block">
            <Container className="flex items-center justify-between">
              <Breadcrumbs 
                items={[
                  { label: "Home", href: "/" },
                  { label: "Region", href: `/destinations/${regionSlug}` },
                  { label: "Why Choose", href: `/why-choose/${regionSlug}`, active: true }
                ]} 
                className="!bg-transparent !border-none !p-0"
                omitContainer
                colorClasses="text-white/80"
                activeColorClasses="text-white font-bold"
              />
              {whyChooseData?.nickname && (
                <div className="hidden sm:block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                  <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">{whyChooseData.nickname}</span>
                </div>
              )}
            </Container>
          </div>
        </section>

        {/* Main Content Sections */}
        <Container className="pt-8 pb-16 md:pt-12 md:pb-24 space-y-16 md:space-y-20">
          
          {/* Why Visit Details */}
          <section>
            <div className="text-center max-w-4xl mx-auto mb-10 md:mb-12">
              <span className="px-4 py-1.5 bg-brand-blue/10 text-brand-blue rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                 {regionDataProcessed?.whyVisitSection?.subTitle || "Immersive Experiences"}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                {regionDataProcessed?.whyVisitSection?.mainTitle}
              </h2>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                {regionDataProcessed?.whyVisitSection?.mainDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {(regionDataProcessed?.whyVisitSection?.reasons || []).map((reason, idx) => (
                <div key={idx} className="flex gap-6 p-6 md:p-8 bg-white border border-slate-100 rounded-[2rem] hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-brand-blue text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">{reason.title}</h3>
                    <p className={cn("text-slate-600 leading-relaxed text-sm md:text-base", !expandedReasons[idx] && "line-clamp-4")}>
                      {reason.description}
                    </p>
                    <button
                      onClick={() => setExpandedReasons(prev => ({ ...prev, [idx]: !prev[idx] }))}
                      className="mt-3 text-brand-blue text-xs font-bold uppercase tracking-widest hover:underline"
                    >
                      {expandedReasons[idx] ? "View Less" : "Read More"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {regionDataProcessed?.whyVisitSection?.quote && (
              <div className="mt-12 md:mt-16 bg-brand-blue rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-14 text-center text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                <blockquote className="text-xl md:text-3xl font-bold italic relative z-10 leading-tight mb-4 md:mb-6">
                  "{regionDataProcessed?.whyVisitSection?.quote}"
                </blockquote>
                {regionDataProcessed?.whyVisitSection?.quoteAuthor && (
                  <cite className="text-blue-200 font-bold not-italic block uppercase tracking-widest text-xs md:text-sm">— {regionDataProcessed?.whyVisitSection?.quoteAuthor}</cite>
                )}
              </div>
            )}
          </section>

          {/* Key Highlights Section */}
          <section id="highlights">
            <div className="text-center mb-10 md:mb-12">
               <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 tracking-tighter">Key Highlights</h2>
               <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto italic">The essential soul of {regionName}.</p>
            </div>

            <div className="space-y-10 md:space-y-16">
              {highlights.map((highlight, index) => (
                <div key={index} id={highlight.slug || highlight.title.toLowerCase().replace(/ /g, "-")} className="scroll-mt-24">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
                    {/* Left Column: Title & Full Description */}
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 text-amber-600 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-500/20">
                        <Sparkles className="w-3.5 h-3.5" />
                        Highlight No. 0{index + 1}
                      </div>
                      <h3 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                        {highlight.recommendedPhotoContent || highlight.title}
                      </h3>
                      <p className="text-xl font-bold text-slate-500 italic">{highlight.description}</p>
                      <div className="h-1.5 w-20 bg-amber-500 rounded-full" />
                      <p className={cn("text-slate-600 text-lg leading-relaxed", !expandedHighlights[index] && "line-clamp-4")}>
                        {highlight.detailedContent}
                      </p>
                      <button
                        onClick={() => setExpandedHighlights(prev => ({ ...prev, [index]: !prev[index] }))}
                        className="text-brand-blue text-sm font-bold uppercase tracking-widest hover:underline"
                      >
                        {expandedHighlights[index] ? "View Less" : "Read More"}
                      </button>
                    </div>

                    {/* Right Column: Facts Grid */}
                    <div className="bg-slate-50 p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-inner space-y-8">
                       {highlight.keyFacts && (
                          <div className="space-y-6">
                            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
                              <Info className="w-5 h-5 text-brand-blue" />
                              Facts & Information
                            </h4>
                            <div className="grid grid-cols-1 gap-4">
                              {(expandedFacts[index] ? highlight.keyFacts : highlight.keyFacts.slice(0, 3)).map((fact, idx) => (
                                <motion.div 
                                  initial={{ opacity: 0, x: 20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  key={idx} 
                                  className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100 group hover:shadow-md transition-all"
                                >
                                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-xs shrink-0">{idx + 1}</div>
                                  <p className="text-[15px] text-slate-600 font-medium leading-relaxed">{fact}</p>
                                </motion.div>
                              ))}
                            </div>
                            {highlight.keyFacts.length > 3 && (
                               <button
                                 onClick={() => setExpandedFacts(prev => ({ ...prev, [index]: !prev[index] }))}
                                 className="text-brand-blue text-xs font-bold uppercase tracking-widest hover:underline mt-2"
                               >
                                 {expandedFacts[index] ? "Show Less" : `See all ${highlight.keyFacts.length} facts`}
                               </button>
                            )}
                          </div>
                       )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Traveler Types and Seasonality */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            <div>
               <h3 className="text-3xl font-bold text-slate-900 uppercase tracking-tighter mb-8 flex items-center gap-4">
                 <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                   <Users className="w-6 h-6 text-emerald-600" />
                 </div>
                 Perfect For...
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {regionDataProcessed?.travelStyles?.map((style, i) => (
                    <div key={i} className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl hover:shadow-xl transition-all">
                      <h4 className="font-bold text-brand-blue text-sm uppercase mb-3 tracking-widest">{style.type}</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{style.desc}</p>
                    </div>
                  ))}
               </div>
            </div>

            <div>
               <h3 className="text-3xl font-bold text-slate-900 uppercase tracking-tighter mb-8 flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                   <CloudSun className="w-6 h-6 text-brand-blue" />
                 </div>
                 Best Time to Visit
               </h3>
               <div className="bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 space-y-6 text-white shadow-2xl">
                  {regionDataProcessed?.seasonalGuide?.map((guide, i) => (
                    <div key={i} className="flex justify-between items-start border-b border-white/10 pb-6 last:border-0 last:pb-0">
                      <div>
                        <p className="text-brand-gold font-bold uppercase text-[10px] tracking-[0.3em] mb-2">{guide.season}</p>
                        <p className="text-slate-300 text-sm font-medium leading-relaxed">{guide.highlight}</p>
                      </div>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-bold uppercase tracking-[0.2em]">{guide.status}</span>
                    </div>
                  ))}
               </div>
            </div>
          </section>
        </Container>

        <WhyBayardVacations />
      </div>
    </>
  );
}
