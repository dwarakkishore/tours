import React from "react";
import Image from "next/image";
import ThemeGrid from "@/components/Themes/ThemeGrid";
import Container from "@/components/ui/Container";
import InspirationSection from "@/components/Landing/InspirationSection";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata = {
  title: "Explore Travel Themes | Bayard Vacations | Curated Holiday Collections",
  description: "Discover our curated collection of travel themes. From romantic getaways and family funventures to elite escapes and solo expeditions, find your perfect travel style.",
  alternates: {
    canonical: "/themes",
  },
};

const ThemesPage = () => {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Immersive Hero Section with Banner Image */}
      <section className="relative h-[60vh] lg:h-[70vh] flex items-center overflow-hidden">
        {/* Banner Image */}
        <Image
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2070" 
          alt="Travel Themes Banner"
          fill
          priority
          className="object-cover"
        />
        
        {/* High-quality Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/20 z-10" />

        <Container className="relative z-20">
          <div className="max-w-4xl text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
              <span className="text-white text-[10px] lg:text-xs font-bold tracking-[0.3em] uppercase">
                Curated Collections
              </span>
            </div>
            
            <h1 className="text-6xl lg:text-9xl font-bold text-white mb-8 leading-[0.85] tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-1000">
              TRAVEL <br />
              <span className="text-brand-blue">THEMES</span>
            </h1>
            
            <p className="text-lg lg:text-2xl text-white/90 font-medium leading-relaxed max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
              Discover hand-crafted journeys designed to match your specific style. 
              From high-adventure expeditions to serene romantic escapes.
            </p>
          </div>
        </Container>
      </section>

      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "Themes", href: "/themes", active: true }
        ]} 
      />

      {/* Grid Section - Now with White Background */}
      <section className="relative bg-white pt-12 lg:pt-24 pb-24">
        <ThemeGrid />
      </section>

      <section className="pb-12 bg-white">
        <InspirationSection />
      </section>
    </main>
  );
};

export default ThemesPage;
