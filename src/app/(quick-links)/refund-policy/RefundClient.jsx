"use client";

import React from "react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { ShieldCheck, CreditCard, RefreshCcw } from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* 1. PREMIUM HERO SECTION */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-brand-blue" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-accent/20 rounded-full blur-[120px] pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="max-w-4xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6 animate-fadeIn mx-auto md:mx-0">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest leading-none">Safe Refunds</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              Refund <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 italic">Policy</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 max-w-2xl font-medium leading-relaxed mb-8 mx-auto md:mx-0">
              Our clear and simple refund process ensures that your money is handled securely and returned promptly in case of cancellations.
            </p>
          </div>
        </Container>
      </section>

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Refund Policy", href: "/refund-policy", active: true },
        ]}
      />

      {/* 2. MAIN CONTENT AREA */}
      <Container className="mt-8 md:-mt-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 md:p-16 shadow-2xl shadow-slate-200/50 border border-slate-100">
            
            {/* Quick Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-16 px-2 sm:px-0">
               <div className="bg-emerald-50 rounded-3xl p-6 flex items-start gap-4 border border-emerald-100">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-200">
                    <RefreshCcw className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">Processing Window</h4>
                    <p className="text-xs text-emerald-900 font-medium leading-relaxed">
                      Refunds are typically processed within 10 to 15 working days after successful cancellation.
                    </p>
                  </div>
               </div>
               <div className="bg-sky-50 rounded-3xl p-6 flex items-start gap-4 border border-sky-100">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm shadow-sky-200">
                    <CreditCard className="w-6 h-6 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">Original Payment</h4>
                    <p className="text-xs text-sky-900 font-medium leading-relaxed">
                      All refunds are issued back to the original form of payment used for the booking.
                    </p>
                  </div>
               </div>
            </div>

            {/* THE CONTENT */}
            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-slate-900 prose-a:text-brand-blue prose-h2:text-3xl">
              
              <h2>General Refund Guidelines</h2>
              <p>
                After the cancellation of a reservation, customers can expect to receive their refund within <strong>10 to 15 working days</strong>. This policy ensures that refunds are processed promptly and efficiently, taking into account bank processing times and internal verifications.
              </p>
              
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 mt-10">
                <h3 className="text-xl font-bold text-slate-900 mb-4">How it works</h3>
                <ul className="space-y-4 list-none pl-0">
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-brand-blue text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1">1</div>
                    <p className="text-sm text-slate-600 m-0 leading-relaxed font-medium">Cancellation is confirmed by our support team or through the portal.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-brand-blue text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1">2</div>
                    <p className="text-sm text-slate-600 m-0 leading-relaxed font-medium">Refund is initiated to the <strong>original form of payment</strong> used for the booking.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-brand-blue text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1">3</div>
                    <p className="text-sm text-slate-600 m-0 leading-relaxed font-medium">Confirmation email is sent once the refund has been successfully processed on our end.</p>
                  </li>
                </ul>
              </div>

              <div className="mt-12 p-8 bg-brand-blue rounded-3xl text-white relative overflow-hidden group text-center md:text-left">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-white/20 transition-colors" />
                <h3 className="text-white text-xl font-bold mb-2">Still Have Questions?</h3>
                <p className="text-white/70 text-sm font-medium mb-6">Our billing team is here to help with any refund-related inquiries.</p>
                <a href="mailto:support@bayardvacations.com" className="inline-flex items-center justify-center px-8 py-3 bg-white text-brand-blue rounded-2xl font-bold text-sm hover:bg-slate-50 transition-colors shadow-lg shadow-black/10">
                  Contact Billing Support
                </a>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RefundPolicy;

