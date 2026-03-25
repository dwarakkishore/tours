"use client";

import React, { useState } from "react";
import Container from "@/components/ui/Container";
import ExplorationList from "@/components/ui/ExplorationList";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const ThemePageClient = ({ theme }) => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("domestic") === "true" ? "domestic" : "international"
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams);
    if (tab === "domestic") {
      params.set("domestic", "true");
    } else {
      params.delete("domestic");
    }
    // Update URL without reload
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);
  };

  return (
    <main className="bg-white">

      {/* Hero Section */}
      <section className="relative bg-brand-blue overflow-hidden">
        {/* Animated Background Circles */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-blue/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
        
        <Container className="relative z-10">
          <div className="py-10 lg:py-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            {/* Text Content */}
            <div className="flex-1 max-w-2xl">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-brand-blue text-xs font-bold tracking-[0.2em] uppercase mb-6">
                Travel Theme
              </div>
              <h1 className="mb-6 text-4xl font-bold text-white lg:text-7xl leading-tight">
                {theme.title}
              </h1>
              <p className="text-lg lg:text-2xl text-white/80 font-semibold leading-relaxed">
                {theme.subtitle === "All things " ? `Experience the best of ${theme.title}` : theme.subtitle}
                . Discover our handpicked domestic and international arrivals curated specifically for this theme.
              </p>
            </div>

            {/* Theme Image/Icon */}
            <div className="relative w-full lg:w-1/3 aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl group">
               <Image
                  src={theme.img}
                  alt={theme.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-3 shadow-xl">
                        <Image src={theme.icon} alt="Icon" width={40} height={40} className="object-contain" />
                    </div>
                </div>
            </div>
          </div>
        </Container>
      </section>

      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "Themes", href: "/themes" },
          { label: theme.title, href: `/themes/${theme.slug}`, active: true }
        ]} 
        className="bg-transparent border-transparent"
      />

      {/* Tabs Section */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <Container>
          <div className="flex items-center justify-center gap-4 py-4">
            <button
              onClick={() => handleTabChange("international")}
              className={`rounded-full px-10 py-3 text-base lg:text-lg font-bold transition-all transform hover:scale-105 ${
                activeTab === "international"
                  ? "gradient-btn text-white shadow-lg"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              International
            </button>
            <button
              onClick={() => handleTabChange("domestic")}
              className={`rounded-full px-10 py-3 text-base lg:text-lg font-bold transition-all transform hover:scale-105 ${
                activeTab === "domestic"
                  ? "gradient-btn text-white shadow-lg"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Domestic
            </button>
          </div>
        </Container>
      </section>

      {/* Packages Section */}
      <section className="py-12 bg-slate-50 min-h-[600px]">
        <Container>
           {/* Custom sorting or filtering info could go here */}
          <ExplorationList theme={theme.slug.split("?")[0]} />
        </Container>
      </section>
    </main>
  );
};

export default ThemePageClient;
