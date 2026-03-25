"use client";
import React, { useState, useMemo } from "react";
import Container from "@/components/ui/Container";
import { useRegionsData } from "@/hooks/regions";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import DestinationCard from "@/components/Landing/Destinations/DestinationCard";
import { Loader2 } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function DestinationsListing() {
  const { internationalRegions, domesticRegions, regionIsLoading, error } = useRegionsData();
  const [activeTab, setActiveTab] = useState("international");
  const [selectedContinent, setSelectedContinent] = useState("all");

  const continents = useMemo(() => {
    if (!internationalRegions) return [];
    return internationalRegions.map(c => ({ 
        value: c.feKey.toLowerCase(), 
        label: c.displayName 
    }));
  }, [internationalRegions]);

  // Set default continent when international regions load
  React.useEffect(() => {
    if (activeTab === "international" && selectedContinent === "all" && continents.length > 0) {
      setSelectedContinent(continents[0].value);
    }
  }, [activeTab, continents, selectedContinent]);

  const filteredRegions = useMemo(() => {
    if (activeTab === "domestic") {
      return domesticRegions || [];
    }

    // For international, we strictly filter by the selected continent
    const continent = internationalRegions?.find(
      c => c.feKey.toLowerCase() === selectedContinent
    );
    return continent?.regions || [];
  }, [activeTab, selectedContinent, domesticRegions, internationalRegions]);

  if (regionIsLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-blue animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Loading extraordinary destinations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-red-500">
        Error loading destinations. Please refresh the page.
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50 min-h-screen">
      <div className="pt-6 md:pt-10 pb-12 md:pb-20">
        <Container>
        {/* Main Toggle & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          
          {/* Continent Filter (Left on Desktop, Centered on Mobile) */}
          <div className="order-2 md:order-1 flex-1 flex flex-col items-center md:items-start">
            <AnimatePresence mode="wait">
              {activeTab === "international" && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-wrap justify-center md:justify-start gap-3"
                >
                  {continents.map((continent) => (
                    <button
                      key={continent.value}
                      onClick={() => setSelectedContinent(continent.value)}
                      className={cn(
                        "px-5 py-2 rounded-xl text-xs font-bold border transition-all duration-200 uppercase tracking-wider",
                        selectedContinent === continent.value
                          ? "bg-brand-blue text-white border-brand-blue shadow-md"
                          : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                      )}
                    >
                      {continent.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* International/Domestic Toggle (Right on Desktop, Centered on Mobile) */}
          <div className="order-1 md:order-2 flex flex-col items-center md:items-end">
            <div className="inline-flex p-1 bg-white border border-slate-200 rounded-full shadow-sm">
              {[
                { id: "international", label: "International" },
                { id: "domestic", label: "Domestic" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id === "international" && continents.length > 0) {
                      setSelectedContinent(continents[0].value);
                    }
                  }}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap",
                    activeTab === tab.id
                      ? "bg-brand-blue text-white shadow-lg ring-2 ring-brand-blue/10"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid - Combined for both views, no sidebar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
                {filteredRegions.length > 0 ? (
                    filteredRegions.map((region, index) => (
                        <motion.div
                            layout
                            key={region.slug || index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <DestinationCard regionSlug={region.slug} index={index} />
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-dashed border-slate-200">
                         <p className="text-slate-400 font-medium">No destinations found.</p>
                    </div>
                )}
            </AnimatePresence>
        </div>
      </Container>
      </div>
    </div>
  );
}
