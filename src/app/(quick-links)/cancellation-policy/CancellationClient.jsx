"use client";

import React, { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";
import { ChevronRight, ShieldAlert, Calendar, Clock, HelpCircle } from "lucide-react";

const CancellationPolicy = () => {
  const [activeTab, setActiveTab] = useState("");

  const sections = [
    { id: "after-booking", title: "AFTER BOOKING" },
    { id: "30-days", title: "30+ DAYS PRIOR" },
    { id: "30-15-days", title: "30-15 DAYS PRIOR" },
    { id: "15-days", title: "15 DAYS OR LESS" },
    { id: "last-minute", title: "LAST MINUTE" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveTab(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* 1. PREMIUM HERO SECTION */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-brand-blue" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-accent/20 rounded-full blur-[120px] pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6 animate-fadeIn">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-widest leading-none">Booking Flexibility</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              Cancellation <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 italic">Policy</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 max-w-2xl font-medium leading-relaxed mb-8">
              We understand that plans change. Our cancellation policy is designed to be fair and transparent for all our travelers.
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-white/50 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Updated: January 15, 2024
              </div>
              <div className="h-4 w-px bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-2">
                Standard Global Policy
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Cancellation Policy", href: "/cancellation-policy", active: true },
        ]}
      />

      {/* 2. MAIN CONTENT AREA */}
      <Container className="mt-8 md:-mt-12">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
          
          {/* STICKY SIDEBAR */}
          <aside className="hidden lg:block sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 px-2">Cancellation Tiers</h3>
            <nav className="flex flex-col gap-1">
              {sections.map((section) => (
                <button
                   key={section.id}
                   onClick={() => scrollToSection(section.id)}
                   className={cn(
                     "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left",
                     activeTab === section.id
                       ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                       : "text-slate-500 hover:bg-slate-50 hover:text-brand-blue"
                   )}
                 >
                   <ChevronRight className={cn("w-3 h-3 transition-transform", activeTab === section.id ? "rotate-90 text-white" : "text-slate-300")} />
                   {section.title}
                 </button>
              ))}
            </nav>
            
            <div className="mt-8 pt-8 border-t border-slate-100 px-2">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-4">Need help?</p>
              <button className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-2xl group hover:bg-brand-blue/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <HelpCircle className="w-4 h-4 text-brand-blue" />
                  </div>
                  <span className="text-xs font-bold text-slate-900">Support Center</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-300 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </aside>

          {/* DOCUMENT CONTENT */}
          <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 md:p-16 shadow-2xl shadow-slate-200/50 border border-slate-100">
            
            {/* Quick Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-16 px-2 sm:px-0">
               <div className="bg-amber-50 rounded-3xl p-6 flex items-start gap-4 border border-amber-100">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm shadow-amber-200">
                    <Calendar className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">Advance Notice</h4>
                    <p className="text-xs text-amber-900 font-medium leading-relaxed">
                      Cancellations made well in advance incur lower fees, allowing us to re-book the space.
                    </p>
                  </div>
               </div>
               <div className="bg-sky-50 rounded-3xl p-6 flex items-start gap-4 border border-sky-100">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm shadow-sky-200">
                    <Clock className="w-6 h-6 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">Processing Time</h4>
                    <p className="text-xs text-sky-900 font-medium leading-relaxed">
                      Once confirmed, any applicable refunds are processed within 10-15 working days.
                    </p>
                  </div>
               </div>
            </div>

            {/* THE CONTENT */}
            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600 prose-strong:text-slate-900 prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline prose-h2:text-3xl prose-h2:pt-8 prose-h2:mb-6 prose-h2:border-t prose-h2:border-slate-100 first:prose-h2:border-0 first:prose-h2:pt-0">
              
              <section id="after-booking">
                <h2>After Booking</h2>
                <p>
                  If a cancellation is made after booking, there will be a charge of <strong>10% of the total cost</strong>. This fee is applicable regardless of the timing of the cancellation and covers administrative costs.
                </p>
              </section>

              <section id="30-days">
                <h2>30 Days or More Prior to Arrival</h2>
                <p>
                  If a cancellation is made 30 days or more before the scheduled arrival date, there will be a charge of <strong>25% of the total cost</strong>. This fee applies to cancellations made well in advance of the arrival date.
                </p>
              </section>

              <section id="30-15-days">
                <h2>30 to 15 Days Prior to Arrival</h2>
                <p>
                  If a cancellation is made between 30 to 15 days before the scheduled arrival date, there will be a charge of <strong>50% of the total cost</strong>. This fee applies to cancellations made within a moderately advanced notice period.
                </p>
              </section>

              <section id="15-days">
                <h2>15 Days or Less Prior to Arrival</h2>
                <p>
                  If a cancellation is made 15 days or less before the scheduled arrival date, there will be a charge of <strong>75% of the total cost</strong>. This fee applies to cancellations made within a short notice period.
                </p>
              </section>

              <section id="last-minute">
                <h2>3 to 1 Day Prior to Arrival, Same Day, or No Show</h2>
                <p>
                  If a cancellation is made 3 to 1 day prior to the scheduled arrival date, on the same day as arrival, or if the customer fails to show up for the reservation (No Show), there will be a charge of <strong>100% of the total cost</strong>.
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-3xl my-8">
                  <h4 className="text-red-900 font-bold mb-2">Important Note</h4>
                  <p className="text-red-800 text-sm font-medium mb-0">
                    Last-minute cancellations or failure to arrive without prior notice result in full forfeiture of the booking amount.
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CancellationPolicy;

