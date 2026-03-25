"use client";
import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Map } from "lucide-react";

export default function StartJourney() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* Background - Consistent with other light sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50 z-0" />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div className="section-badge-light mb-6">
              <Map className="size-3" />
              <span>Start Your Journey</span>
            </div>
            
            <h2 className="section-title-light mb-6">
              Not sure where to <br />
              <span className="text-brand-blue">go next?</span>
            </h2>
            
            <p className="section-subtitle-light hidden sm:block mb-8 max-w-lg">
             Your journey starts with trust and ends with unforgettable experiences. Let us plan your perfect trip while you enjoy every moment.
            </p>
            
            <div className="flex gap-4">
              <Button asChild size="lg" className="gradient-btn rounded-full px-8 py-6 hover:scale-105 transition-transform shadow-xl">
                <Link href="/explore">
                  Explore Packages <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-brand-blue text-brand-blue hover:bg-brand-blue/5 px-8">
                <Link href="/contact">
                  Plan Your Trip
                </Link>
              </Button>
            </div>
          </div>

          {/* Image Content */}
          <div className="order-1 lg:order-2 relative">
             <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
               <Image 
                 src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" 
                 alt="Travel Planning" 
                 fill 
                 className="object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
             </div>
             {/* Decorative Element */}
             <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg max-w-[200px] hidden sm:block">
                <div className="flex items-center gap-2 mb-2">
                   <div className="size-3 rounded-full bg-red-400" />
                   <div className="size-3 rounded-full bg-yellow-400" />
                   <div className="size-3 rounded-full bg-green-400" />
                </div>
                <p className="text-xs text-slate-500 font-mono">
                  "The trip was absolutely magical! Thank you Bayard."
                </p>
             </div>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
