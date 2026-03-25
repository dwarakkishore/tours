"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  History, 
  Sun, 
  Globe, 
  Wallet, 
  ShieldCheck, 
  Users, 
  Car, 
  UtensilsCrossed,
  Map,
  Clock,
  Train,
  Bus,
  MapPin,
  Heart,
  Lightbulb,
  CreditCard,
  ArrowRightLeft,
  Smartphone,
  Compass,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Languages,
  FileText,
  MessageCircle,
  Banknote,
  Plane
} from "lucide-react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { useRegionFactSheet } from "@/hooks/regions/useRegionFactSheet";

const RegionTravelEssentials = ({ regionName: initialRegionName = "", regionData = null }) => {
  const [activeTab, setActiveTab] = useState("history");
  const { region: routeRegionName } = useParams();
  const regionName = initialRegionName || routeRegionName;
  const regionSlug = regionName?.toLowerCase();

  // Fetch dynamic factsheet data - supporting dual-lookup with slug
  const { factSheetData, isLoading } = useRegionFactSheet(regionData?.id || regionSlug);
  
  // Support both nested 'details' and flat structure
  const dynamicData = factSheetData?.details || factSheetData;
  const hasData = !!(factSheetData?.details || factSheetData?.essentials || factSheetData?.history);

  // Console log for debugging


  // Icon mapping for dynamic IDs
  const lucideIconMap = {
    History, Sun, Globe, Wallet, ShieldCheck, Users, Car, UtensilsCrossed,
    Map, Clock, Train, Bus, MapPin, Heart, Lightbulb, CreditCard,
    ArrowRightLeft, Smartphone, Compass, ChevronRight, CheckCircle2,
    XCircle, Languages, FileText, MessageCircle, Banknote, Plane
  };

  const tabs = [
    { id: "history", label: "History", icon: History },
    { id: "time", label: "Time & Climate", icon: Sun },
    { id: "language", label: "Language", icon: Globe },
    { id: "currency", label: "Currency", icon: Wallet },
    { id: "visa", label: "Visa & Entry", icon: ShieldCheck },
    { id: "culture", label: "Culture", icon: Users },
    { id: "transport", label: "Transport", icon: Car },
    { id: "food", label: "Food", icon: UtensilsCrossed },
  ];

  return (
    <section className="py-6 md:py-10 bg-slate-50 overflow-hidden">
      <Container>
        {/* Header Section - Matched to Reference */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            {/* Left: Title Section */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 mb-4">
                <Compass className="w-4 h-4 text-brand-blue" />
                <span className="text-sm font-bold text-brand-blue uppercase tracking-wider">KNOWLEDGE HUB</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                <span className="hidden sm:inline">Things to Know in </span>
                <span className="inline sm:hidden">Tips for </span>
                <span className="text-brand-blue capitalize">{regionName}</span>
              </h2>
              
              <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl truncate md:whitespace-normal">
                Essential travel information and insider tips for your journey
              </p>
            </div>
            
            {/* Right: Explore Button */}
            <Link href={`/factsheet/${regionName?.toLowerCase()}`}>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-300 whitespace-nowrap">
                Explore More
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Floating Pill Tabs - Horizontal Scroll on Mobile */}
          <div className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-2 mb-12 pb-2 -mb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300",
                    isActive 
                      ? "bg-yellow-400 text-slate-900 shadow-sm" 
                      : "bg-white text-blue-600 hover:bg-slate-50 border border-slate-200"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-slate-900" : "text-blue-600")} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-3xl md:rounded-[3rem] shadow-sm overflow-hidden border border-slate-100">

          <div className="p-4 sm:p-6 md:p-10">
            <AnimatePresence mode="wait">
              {activeTab === "history" && (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-6 tracking-tight">
                      {dynamicData?.history?.title || "A Journey Through Time"}
                    </h3>
                    <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed">
                      {dynamicData?.history?.description || dynamicData?.overview || (regionName ? `Discover the rich history and unique culture of ${regionName}.` : "Discover the rich history and unique culture of this region.") }
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {dynamicData?.history?.milestones || dynamicData?.history?.cards ? (dynamicData.history.milestones || dynamicData.history.cards).map((m, i) => (
                      <HistoryCard 
                        key={i}
                        title={m.title || m.label} 
                        content={m.content || m.desc || m.value}
                        color={['amber', 'rose', 'blue', 'emerald'][i % 4]}
                      />
                    )) : (
                      <>
                        <HistoryCard 
                          title="Ancient & Medieval Eras" 
                          content="Steeped in ancient traditions and strategic location at the crossroads of civilizations. Historical records trace back millennia, showing a rich tapestry of cultural exchange and architectural evolution."
                          color="amber"
                        />
                        <HistoryCard 
                          title="Heritage & Culture" 
                          content="A unique blend of local customs and influenced by surrounding empires, creating a distinct identity that persists in local festivals, crafts, and architecture today."
                          color="rose"
                        />
                      </>
                    )}
                  </div>
                  <p className="text-center text-[10px] md:text-xs text-slate-400 font-medium mt-8 md:mt-12 uppercase tracking-wider">Information is current as of January 2026</p>
                </motion.div>
              )}

              {activeTab === "time" && (
                <motion.div
                  key="time"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 tracking-tight">Time Zone & Climate</h3>
                  
                  <div className="space-y-12 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                      {/* Time Zone Left Column */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <Clock className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Time Zone</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Standard Time</p>
                            <p className="text-3xl font-bold text-slate-900">
                              {dynamicData?.climate?.timeZone || "GMT+x"}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Time Difference</p>
                            <p className="text-lg font-bold text-slate-700">
                              {dynamicData?.climate?.difference || "Local Time"}
                            </p>
                          </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-slate-900/5">
                          <p className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em] mb-4">🎯 Best Months to Visit</p>
                          <p className="text-3xl font-bold text-slate-900 leading-tight">
                            {dynamicData?.climate?.bestMonths || dynamicData?.climate?.bestTime || "Varies by region"}
                          </p>
                          <p className="text-base text-slate-500 font-medium mt-2 leading-relaxed">
                            Optimal weather for exploring the diverse landscapes and unique climate zones of {regionName}.
                          </p>
                        </div>
                      </div>

                      {/* Climate Right Column */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <Sun className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Climate & Seasons</h4>
                        </div>
                        <div className="space-y-6">
                          <p className="text-base text-slate-700 font-medium leading-relaxed">
                            {regionName} offers a variety of weather conditions, ranging from pleasant coastal areas to crisp mountain air.
                          </p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 mt-4">
                            {(dynamicData?.climate?.seasons || [
                              { name: "Spring", emoji: "🌸", months: "Varies", temp: "Mild", highlight: "Pleasant temperatures and fresh scenery." },
                              { name: "Autumn", emoji: "🍂", months: "Varies", temp: "Cool", highlight: "Ideal for sightseeing and outdoor activities." }
                            ]).map((s) => (
                              <div key={s.name || s.season} className="space-y-2">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                                  <h5 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                    <span className="text-lg">{s.emoji}</span> {s.name || s.season}
                                  </h5>
                                  <span className="text-sm font-bold text-slate-900">{s.temp}</span>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{s.months}</p>
                                  <p className="text-[13px] text-slate-600 font-medium leading-relaxed">{s.highlight}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "language" && (
                <motion.div
                  key="language"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-12 w-full"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 tracking-tight">Language Guide</h3>
                  
                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Left Column: Context */}
                    <div className="space-y-10">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <Languages className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Official Language</h4>
                        </div>
                        <div className="space-y-2">
                          <p className="text-2xl font-bold text-slate-900 italic">
                            {dynamicData?.language?.official || "Local Language"}
                          </p>
                          <p className="text-base text-slate-600 font-medium leading-relaxed max-w-md">
                            {dynamicData?.language?.context || `The primary language spoken in ${regionName}.`}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {(dynamicData?.language?.tags || ['Official', 'Cultural']).map(tag => (
                            <span key={tag} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <Globe className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Common Languages</h4>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                           {(dynamicData?.language?.others || [
                             { label: "English", desc: "Commonly spoken in tourist areas." }
                           ]).map((lang, i) => (
                             <LanguageItem key={i} label={lang.label || lang.name} desc={lang.desc || lang.value} />
                           ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Phrases */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                        <MessageCircle className="w-5 h-5 text-slate-900" />
                        <h4 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Essential Phrases</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                        {(dynamicData?.language?.phrases || []).map((p, i) => (
                          <PhraseItem key={i} label={p.label} phrase={p.phrase} />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "currency" && (
                <motion.div
                  key="currency"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-12 w-full"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 tracking-tight">Currency & Money</h3>
                  
                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Left Column: Currency Info */}
                    <div className="space-y-10">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <Wallet className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Official Currency</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Currency Name</p>
                            <p className="text-2xl font-bold text-slate-900">
                              {dynamicData?.essentials?.find(e => e.label.toLowerCase().includes('currency'))?.value || "Local Currency"}
                            </p>
                          </div>
                          <div className="space-y-4">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">Exchange Rates</p>
                            <div className="space-y-3">
                              {(dynamicData?.currency?.exchangeRates || [
                                { label: "1 USD", value: "Check Local Rate" }
                              ]).map((ex, i) => (
                                <ExchangeItem key={i} label={ex.label} value={ex.value} color={i === 0 ? "emerald" : "slate"} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <CreditCard className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Denominations</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Banknotes</p>
                            <p className="text-sm font-bold text-slate-700 leading-relaxed italic">
                              {dynamicData?.currency?.banknotes || "Standard denominations available."}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Coins</p>
                            <p className="text-sm font-bold text-slate-700 leading-relaxed italic">
                              {dynamicData?.currency?.coins || "Standard coins available."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Payment Methods */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                        <Banknote className="w-5 h-5 text-slate-900" />
                        <h4 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Payment Methods</h4>
                      </div>
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 gap-6">
                           {(dynamicData?.currency?.paymentMethods || [
                             { title: "ATMs & Withdrawal", desc: "Available in major cities and tourist hubs." },
                             { title: "Cards", desc: "Widely accepted; cash recommended for small purchases." }
                           ]).map((pm, i) => (
                             <div key={i} className="space-y-1">
                               <h5 className="text-sm font-bold text-slate-900 uppercase tracking-widest">{pm.title || pm.label}</h5>
                               <p className="text-[13px] text-slate-600 font-medium leading-relaxed">{pm.desc || pm.value}</p>
                             </div>
                           ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "transport" && (
                <motion.div
                  key="transport"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-12 w-full"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 tracking-tight">Transportation</h3>
                  
                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Left Column: Airport & Local */}
                    <div className="space-y-10">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <Plane className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Arrival Information</h4>
                        </div>
                        <div className="space-y-4">
                          <p className="text-base text-slate-600 font-medium leading-relaxed">
                            {dynamicData?.transport?.arrival || `Principal international gateway serving ${regionName}.`}
                          </p>
                          <div className="grid grid-cols-1 gap-3">
                             {(dynamicData?.transport?.options || dynamicData?.transport?.stats || [
                               { label: "Official Taxi", value: "Available 24/7" }
                             ]).map((opt, i) => (
                               <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100">
                                 <span className="text-sm font-bold text-slate-900">{opt.label}</span>
                                 <span className="text-sm font-bold text-brand-blue">{opt.value}</span>
                               </div>
                             ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <Train className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Public Transport</h4>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                            <div className="flex items-center justify-between">
                              <h5 className="text-lg font-bold text-slate-900">
                                {dynamicData?.transport?.mainSystem || "City Pass"}
                              </h5>
                            </div>
                            <p className="text-sm text-slate-600 font-medium leading-relaxed">
                              {dynamicData?.transport?.mainSystemDesc || "Universal pass for your local commutes."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Apps & Intercity */}
                    <div className="space-y-10">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <Smartphone className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Ride-Sharing Apps</h4>
                        </div>
                        <div className="space-y-4">
                          <p className="text-base text-slate-600 font-medium leading-relaxed">
                            {dynamicData?.transport?.appsContext || "Digital transport solutions for easy navigation."}
                          </p>
                          <div className="flex flex-wrap gap-4">
                            {(dynamicData?.transport?.apps || ["Local Apps"]).map((app, i) => (
                              <span key={i} className="text-sm font-bold text-slate-900 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl">
                                {app}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <Car className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Intercity Travel</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                           {(dynamicData?.transport?.intercity || [
                             { title: "Trains", desc: "Connecting major cities." },
                             { title: "Buses", desc: "Extensive regional network." }
                           ]).map((ic, i) => (
                             <div key={i} className="space-y-1">
                               <h5 className="text-sm font-bold text-slate-900">{ic.title || ic.label}</h5>
                               <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{ic.desc || ic.value}</p>
                             </div>
                           ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "visa" && (
                <motion.div
                  key="visa"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-12 w-full"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 tracking-tight">Visa & Entry Requirements</h3>
                  
                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Left Column: E-Visa */}
                    <div className="space-y-10">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <ShieldCheck className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-bold text-slate-900 uppercase tracking-wider">
                            {dynamicData?.visa?.title || "Visa System"}
                          </h4>
                        </div>
                        <div className="space-y-4">
                          <p className="text-base text-slate-700 font-medium leading-relaxed">
                            {dynamicData?.visa?.description || "Essential visa and entry information for your trip."}
                          </p>
                          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                            <div className="grid grid-cols-2 gap-6">
                               {(dynamicData?.visa?.stats || dynamicData?.visa?.process || [
                                 { label: "Processing Time", value: "3-5 Business Days" }
                               ]).map((stat, i) => (
                                 <div key={i} className="space-y-1">
                                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                   <p className="text-sm font-bold text-slate-900">{stat.value}</p>
                                 </div>
                               ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Entry & Registration */}
                    <div className="space-y-10">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <CheckCircle2 className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Mandatory Info</h4>
                        </div>
                        <div className="space-y-4">
                          <div className="flex gap-4">
                             <div className="min-w-max">
                               <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">!</span>
                             </div>
                             <div className="space-y-2">
                               <h5 className="text-lg font-bold text-slate-900 italic leading-tight">
                                 {dynamicData?.visa?.mandatoryNote || "Registration may be required for longer stays."}
                               </h5>
                               <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                 {dynamicData?.visa?.mandatoryDesc || "Always check the latest migration rules before travel."}
                               </p>
                             </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6 pt-10 border-t border-slate-900/5">
                        <div className="flex items-center gap-2 mb-4">
                           <FileText className="w-4 h-4 text-slate-900" />
                           <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Arrival Checklist</h5>
                        </div>
                        <ul className="space-y-2">
                           {(dynamicData?.visa?.checklist || [
                             "Valid Passport",
                             "Visa Copy",
                             "Return Ticket"
                           ]).map((item, i) => (
                             <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                               <div className="w-1 h-1 rounded-full bg-brand-blue"></div>
                               {item}
                             </li>
                           ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "culture" && (
                <motion.div
                  key="culture"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-12 w-full"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 tracking-tight">Culture & Customs</h3>

                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Left Column: Overview & Etiquette */}
                    <div className="space-y-10">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <Compass className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Social Etiquette</h4>
                        </div>
                        <div className="space-y-8">
                          <p className="text-base text-slate-600 font-medium leading-relaxed">
                            {dynamicData?.culture?.description || `${regionName} features a unique blend of traditions and modern lifestyle.`}
                          </p>
                          <div className="grid grid-cols-1 gap-6">
                             {(dynamicData?.culture?.rules || [
                               { label: "Greetings", desc: "Local customs apply; handshakes are standard in business." }
                             ]).map((rule, i) => (
                               <CultureEtiquette key={i} icon={rule.icon || "🤝"} label={rule.label} desc={rule.desc} />
                             ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <Heart className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Local Traditions</h4>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-8">
                           {(dynamicData?.culture?.traditions || [
                             { title: "Hospitality", desc: "Guests are warmly welcomed." }
                           ]).map((tr, i) => (
                             <div key={i} className="space-y-2">
                               <h5 className="text-sm font-bold text-slate-900 uppercase tracking-widest">{tr.title}</h5>
                               <p className="text-[13px] text-slate-600 font-medium leading-relaxed italic">{tr.desc}</p>
                             </div>
                           ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Do's and Don'ts */}
                    <div className="space-y-10">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <CheckCircle2 className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Essential Dos</h4>
                        </div>
                        <ul className="space-y-4">
                           {(dynamicData?.culture?.dos || ["Follow local guidelines"]).map((item, i) => (
                             <DoItem key={i} text={item} />
                           ))}
                        </ul>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <XCircle className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Essential Don'ts</h4>
                        </div>
                        <ul className="space-y-4">
                           {(dynamicData?.culture?.donts || ["Avoid sensitive topics"]).map((item, i) => (
                             <DontItem key={i} text={item} />
                           ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "food" && (
                <motion.div
                  key="food"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                    {/* Local Food Column */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <UtensilsCrossed className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
                        <h4 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">Local Delicacies</h4>
                      </div>
                      <div className="grid grid-cols-2 c-md:grid-cols-3 gap-3 md:gap-4">
                        {(dynamicData?.food?.items || [])
                          .filter((food) => !!(food.image || food.featuredImage))
                          .map((food, i) => (
                            <FoodItem
                              key={i}
                              name={food.name}
                              desc={food.desc}
                              image={food.image || food.featuredImage}
                            />
                          ))}
                      </div>
                    </div>

                    {/* Popular Beverages Column */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-xl md:text-2xl">☕</span>
                        <h4 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">Popular Beverages</h4>
                      </div>
                      <div className="grid grid-cols-2 c-md:grid-cols-3 gap-3 md:gap-4">
                        {(dynamicData?.food?.drinks || dynamicData?.food?.beverages || [])
                          .filter((drink) => !!drink.image)
                          .map((drink, i) => (
                            <FoodItem
                              key={i}
                              name={drink.name}
                              desc={drink.desc || drink.value}
                              image={drink.image}
                            />
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mt-8">
                    {(dynamicData?.food?.features || [
                      { title: "Local Flavors", desc: "Experience the unique culinary heritage of this region." },
                    ]).map((feature, i) => (
                      <div
                        key={i}
                        className={cn(
                          "p-6 rounded-3xl border space-y-4",
                          i === 0
                            ? "bg-emerald-50/50 border-emerald-100"
                            : i === 1
                            ? "bg-rose-50/50 border-rose-100"
                            : "bg-white border-slate-100 shadow-sm"
                        )}
                      >
                        <h4
                          className={cn(
                            "text-xl font-bold tracking-tight",
                            i === 0 ? "text-emerald-900" : i === 1 ? "text-rose-900" : "text-slate-900"
                          )}
                        >
                          {feature.title}
                        </h4>
                        <p className="text-sm text-slate-700 font-medium leading-relaxed">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
};

// Helper Components for Cleaner Tabs
const HistoryCard = ({ title, content, color }) => {
  const colors = {
    amber: "bg-amber-50/50 border-amber-100 text-amber-900 accent-amber-500",
    rose: "bg-rose-50/50 border-rose-100 text-rose-900 accent-rose-500",
    blue: "bg-blue-50/50 border-blue-100 text-blue-900 accent-blue-500",
    emerald: "bg-emerald-50/50 border-emerald-100 text-emerald-900 accent-emerald-500",
  };
  
  const activeColor = colors[color] || colors.blue;
  const accentColor = activeColor.split(" ").pop().replace("accent-", "bg-");

  return (
    <div className={cn("p-5 md:p-4 md:p-6 rounded-2xl md:rounded-3xl border flex flex-col gap-2 md:gap-4 relative overflow-hidden", activeColor.split(" ").slice(0, 2).join(" "))}>
      <div className={cn("absolute left-0 top-0 bottom-0 w-1", accentColor)} />
      <h4 className={cn("text-lg md:text-xl font-bold", activeColor.split(" ")[2])}>| {title}</h4>
      <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">{content}</p>
    </div>
  );
};

const LanguageItem = ({ label, desc }) => (
  <li className="flex items-start gap-3">
    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 flex-shrink-0" />
    <p className="text-sm md:text-base text-slate-600 font-medium">
      <span className="font-bold text-slate-900">{label}</span> - {desc}
    </p>
  </li>
);

const PhraseItem = ({ label, phrase }) => (
  <div>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
    <p className="text-base md:text-lg font-bold text-slate-900">{phrase}</p>
  </div>
);

const ExchangeItem = ({ label, value, color }) => {
  const colors = {
    blue: "bg-blue-50 border-blue-100 text-blue-600",
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-600",
    purple: "bg-purple-50 border-purple-100 text-purple-600",
  };
  return (
    <div className={cn("p-3 rounded-2xl border text-center", colors[color])}>
      <p className="text-[10px] font-bold uppercase tracking-tighter mb-1 opacity-70">{label}</p>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
};

const TransportItem = ({ icon: Icon, label, desc, extra, color }) => {
  const colors = {
    orange: "bg-orange-100 text-orange-600",
    blue: "bg-blue-100 text-blue-600",
    yellow: "bg-yellow-100 text-yellow-600",
    emerald: "bg-emerald-100 text-emerald-600",
    amber: "bg-amber-100 text-amber-600",
    purple: "bg-purple-100 text-purple-600",
  };
  return (
    <div className="flex gap-3 md:gap-4 items-center justify-between">
      <div className="flex gap-3 items-center flex-1 min-w-0">
        <div className={cn("w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0", colors[color])}>
          <Icon className="w-4 h-4 md:w-5 md:h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h5 className="font-bold text-slate-900 text-xs md:text-sm">{label}</h5>
          <p className="text-[11px] md:text-xs text-slate-500 font-medium leading-tight truncate">{desc}</p>
        </div>
      </div>
      {extra && (
        <span className="text-[10px] md:text-xs font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded-lg shrink-0 border border-slate-100">
          {extra}
        </span>
      )}
    </div>
  );
};

const VisaItem = ({ type, validity }) => (
  <div className="p-3 md:p-4 bg-slate-50 rounded-2xl border border-slate-100">
    <p className="font-bold text-slate-900 text-xs md:text-sm">{type}</p>
    <p className="text-[11px] md:text-xs text-slate-500 font-medium mt-1 italic">{validity}</p>
  </div>
);

const CultureEtiquette = ({ icon, label, desc }) => (
  <div className="flex gap-3 md:gap-4 items-start">
    <span className="text-xl md:text-2xl shrink-0">{icon}</span>
    <div>
      <h5 className="font-bold text-slate-900 text-[11px] md:text-sm">{label}</h5>
      <p className="text-[10px] md:text-sm text-slate-500 font-medium leading-tight md:leading-relaxed">{desc}</p>
    </div>
  </div>
);

const CultureFeature = ({ icon, title, desc, color }) => {
  const colors = {
    purple: "bg-purple-50/50 border-purple-100 text-purple-600",
    blue: "bg-blue-50/50 border-blue-100 text-blue-600",
    emerald: "bg-emerald-50/50 border-emerald-100 text-emerald-600",
  };
  return (
    <div className={cn("p-4 md:p-4 md:p-6 rounded-2xl md:rounded-[2.5rem] border space-y-2 md:space-y-3", colors[color])}>
      <span className="text-xl md:text-2xl">{icon}</span>
      <h5 className="font-bold text-slate-900 text-xs md:text-base">{title}</h5>
      <p className="text-[10px] md:text-sm text-slate-600 font-medium leading-tight md:leading-relaxed">{desc}</p>
    </div>
  );
};

const FoodItem = ({ name, desc, image }) => (
  <div className="relative aspect-square rounded-2xl md:rounded-[2rem] overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/10">
    <Image 
      src={image} 
      alt={name} 
      fill 
      sizes="(max-width: 768px) 33vw, 20vw"
      className="object-cover group-hover:scale-110 transition-transform duration-700" 
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-100 transition-opacity duration-300" />
    <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 transform transition-transform duration-300 group-hover:-translate-y-1">
      <h5 className="font-bold text-white text-[11px] md:text-xs mb-0.5 uppercase tracking-tight leading-tight drop-shadow-md">
        {name}
      </h5>
      <p className="text-[10px] md:text-[11px] text-white/90 font-medium leading-tight line-clamp-2 drop-shadow-sm">
        {desc}
      </p>
    </div>
  </div>
);

const TipItem = ({ text }) => (
  <li className="flex gap-2">
    <span className="text-yellow-600 font-bold">•</span>
    <p className="text-xs md:text-sm text-slate-700 font-medium leading-tight">{text}</p>
  </li>
);

const NoteItem = ({ text }) => (
  <li className="flex gap-2">
    <span className="text-blue-500 font-bold">•</span>
    <p className="text-xs md:text-sm text-slate-700 font-medium leading-tight">{text}</p>
  </li>
);

const BeverageItem = ({ name, desc, icon }) => (
  <div className="flex flex-col items-center gap-1 md:gap-2 text-center">
    <span className="text-xl md:text-2xl">{icon}</span>
    <h5 className="font-bold text-slate-900 text-[10px] md:text-xs uppercase tracking-tighter">{name}</h5>
    <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest">{desc}</p>
  </div>
);

// Do's and Don'ts Helper Components
const DoItem = ({ text }) => (
  <li className="flex gap-2 md:gap-3 items-start">
    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
    <p className="text-xs md:text-sm text-slate-700 font-medium leading-tight md:leading-relaxed">{text}</p>
  </li>
);

const DontItem = ({ text }) => (
  <li className="flex gap-2 md:gap-3 items-start">
    <XCircle className="w-4 h-4 md:w-5 md:h-5 text-rose-500 flex-shrink-0 mt-0.5" />
    <p className="text-xs md:text-sm text-slate-700 font-medium leading-tight md:leading-relaxed">{text}</p>
  </li>
);

export default RegionTravelEssentials;
