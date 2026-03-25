"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Clock, 
  DollarSign, 
  Users, 
  MapPin,
  Calendar,
  Check,
  Star,
  ChevronRight,
  ChevronLeft,
  Compass,
  Loader2,
  ChevronDown,
  X
} from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { useActivityDetail } from "@/hooks/activities/useActivitiesData";
import { formatCategoryName } from "@/utils/activityUtils";

export default function ActivityDetailClient({ regionSlug, activitySlug }) {
  const { activity, loading, error } = useActivityDetail(regionSlug, activitySlug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  const regionName = regionSlug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  
  const activityName = activitySlug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-brand-blue animate-spin mx-auto mb-4" />
          <p className="text-lg text-slate-600 font-medium">Loading activity details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !activity) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Container>
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
              <X className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Activity Not Found</h2>
            <p className="text-lg text-slate-600 mb-8">
              {error || "The activity you're looking for doesn't exist."}
            </p>
            <Link href={`/activities/${regionSlug}`}>
              <Button className="bg-brand-blue hover:bg-green-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Activities
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative pt-40 pb-24 lg:pt-64 lg:pb-40 overflow-hidden">
        <img
          src={activity.bannerImage || activity.image}
          alt={activity.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <Container className="relative z-10">
           <Link href={`/activities/${activity.regionSlug}`} className="inline-block mb-12 animate-in fade-in slide-in-from-left-4 duration-700">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 backdrop-blur-sm gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              All Activities
            </Button>
          </Link>

          <div className="space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/20 backdrop-blur-md rounded-full border border-brand-blue/30 mb-4">
                <Compass className="w-4 h-4 text-brand-blue" />
                <span className="text-sm font-bold text-brand-blue uppercase tracking-wider">
                  {activity.badge || formatCategoryName(activity.category)}
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                 {activity.title}
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 max-w-3xl font-medium leading-relaxed mt-4">
                {activity.description}
              </p>

              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full">
                  <Clock className="w-4 h-4 text-white" />
                  <span className="text-sm font-bold text-white">{activity.duration}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full">
                  <Users className="w-4 h-4 text-white" />
                  <span className="text-sm font-bold text-white">{activity.groupSize}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full">
                  <DollarSign className="w-4 h-4 text-white" />
                  <span className="text-sm font-bold text-white">{activity.priceRange}</span>
                </div>
                {activity.difficulty && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full">
                    <Star className="w-4 h-4 text-white" />
                    <span className="text-sm font-bold text-white">{activity.difficulty}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Activities", href: "/activities" },
          { label: regionName, href: `/activities/${regionSlug}` },
          { label: activity.title, href: `/activities/${regionSlug}/${activity.slug}`, active: true },
        ]}
      />

      {/* Main Content */}
      <Container className="py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <section>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-900 mb-4">About This Activity</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                {activity.longDescription}
              </p>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-900 mb-4">Highlights</h2>
              <ul className="space-y-3">
                {activity.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-brand-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Star className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-lg text-slate-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* What's Included */}
            <section>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-900 mb-4">What's Included</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activity.included.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Image Gallery */}
            <section>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-900 mb-4">Gallery</h2>
              <div className="grid grid-cols-3 gap-4">
                {activity.gallery?.map((img, index) => (
                  <div 
                    key={index} 
                    className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => {
                      setLightboxIndex(index);
                      setLightboxOpen(true);
                    }}
                  >
                    <img
                      src={img}
                      alt={`${activity.title} ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                        <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-3xl p-8 shadow-xl">
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Price From
                  </div>
                  <div className="text-4xl font-bold text-brand-blue">
                    {activity.priceRange.split('-')[0]}
                    <span className="text-lg text-slate-600 font-medium"> /person</span>
                  </div>
                </div>

                <div className="space-y-3 py-6 border-y border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold">Duration</span>
                    </div>
                    <span className="font-bold text-slate-900">{activity.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Users className="w-5 h-5" />
                      <span className="font-semibold">Group Size</span>
                    </div>
                    <span className="font-bold text-slate-900">{activity.groupSize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-5 h-5" />
                      <span className="font-semibold">Location</span>
                    </div>
                    <span className="font-bold text-slate-900">{regionName}</span>
                  </div>
                </div>

                <Button 
                  size="lg"
                  className="w-full bg-brand-blue hover:bg-green-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Book This Activity
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>

                <p className="text-xs text-slate-500 text-center">
                  Free cancellation up to 24 hours before activity
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Lightbox Modal */}
      {lightboxOpen && activity?.gallery && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-[10000] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous Button */}
          {activity.gallery.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev - 1 + activity.gallery.length) % activity.gallery.length);
              }}
              className="absolute left-4 z-[10000] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}

          {/* Image Container */}
          <div 
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              key={lightboxIndex}
              src={activity.gallery[lightboxIndex]}
              alt={`${activity.title} ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white font-medium">
                {lightboxIndex + 1} / {activity.gallery.length}
              </span>
            </div>
          </div>

          {/* Next Button */}
          {activity.gallery.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev + 1) % activity.gallery.length);
              }}
              className="absolute right-4 z-[10000] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
