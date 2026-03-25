"use client";
import React from "react";
import ExploreHero from "@/components/Explore/ExploreHero";
import ExploreListing from "@/components/Explore/ExploreListing";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import InspirationSection from "@/components/Landing/InspirationSection";

const ExplorePage = () => {
  return (
    <main className="min-h-screen">
      <ExploreHero />
      <ExploreListing />
      <section className="pb-8 bg-white">
        <InspirationSection />
      </section>
    </main>
  );
};

export default ExplorePage;
