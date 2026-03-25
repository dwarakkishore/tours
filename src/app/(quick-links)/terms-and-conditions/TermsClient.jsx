"use client";

import React, { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";
import { ChevronRight, FileText, Scale, ShieldCheck, HelpCircle } from "lucide-react";

const TermsAndConditions = () => {
  const [activeTab, setActiveTab] = useState("");

  const sections = [
    { id: "agreement", title: "1. AGREEMENT TO TERMS" },
    { id: "intellectual", title: "2. INTELLECTUAL PROPERTY" },
    { id: "representations", title: "3. USER REPRESENTATIONS" },
    { id: "registration", title: "4. USER REGISTRATION" },
    { id: "prohibited", title: "5. PROHIBITED ACTIVITIES" },
    { id: "contributions", title: "6. USER CONTRIBUTIONS" },
    { id: "license", title: "7. CONTRIBUTION LICENSE" },
    { id: "reviews", title: "8. REVIEWS GUIDELINES" },
    { id: "submissions", title: "9. SUBMISSIONS" },
    { id: "management", title: "10. SITE MANAGEMENT" },
    { id: "privacy", title: "11. PRIVACY POLICY" },
    { id: "termination", title: "12. TERM & TERMINATION" },
    { id: "modifications", title: "13. MODIFICATIONS" },
    { id: "law", title: "14. GOVERNING LAW" },
    { id: "disputes", title: "15. DISPUTE RESOLUTION" },
    { id: "corrections", title: "16. CORRECTIONS" },
    { id: "disclaimer", title: "17. DISCLAIMER" },
    { id: "liability", title: "18. LIMITATIONS" },
    { id: "indemnification", title: "19. INDEMNIFICATION" },
    { id: "data", title: "20. USER DATA" },
    { id: "electronic", title: "21. ELECTRONIC COMM." },
    { id: "miscellaneous", title: "22. MISCELLANEOUS" },
    { id: "cancellation", title: "23. CANCELLATION" },
    { id: "refund", title: "24. REFUND POLICY" },
    { id: "contact", title: "25. CONTACT US" },
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
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest leading-none">Legal Information</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              Terms and <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 italic">Conditions</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 max-w-2xl font-medium leading-relaxed mb-8">
              Please read these terms carefully before using our services. This agreement governs your use of the Bayard Vacations platform and booking services.
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-white/50 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Last Updated: January 10, 2024
              </div>
              <div className="h-4 w-px bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-2">
                Version 2.4.0
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Terms and Conditions", href: "/terms-and-conditions", active: true },
        ]}
      />

      {/* 2. MAIN CONTENT AREA */}
      <Container className="mt-8 md:-mt-12">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
          
          {/* STICKY SIDEBAR (Large Screens Only) */}
          <aside className="hidden lg:block sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 px-2">On this page</h3>
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
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-4">Have questions?</p>
              <button className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-2xl group hover:bg-brand-blue/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <HelpCircle className="w-4 h-4 text-brand-blue" />
                  </div>
                  <span className="text-xs font-bold text-slate-900">Get Help</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-300 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </aside>

          {/* DOCUMENT CONTENT */}
          <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 md:p-16 shadow-2xl shadow-slate-200/50 border border-slate-100">
            
            {/* Quick Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-16 px-2 sm:px-0">
               <div className="bg-sky-50 rounded-3xl p-6 flex items-start gap-4 border border-sky-100">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm shadow-sky-200">
                    <FileText className="w-6 h-6 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">Scope of Use</h4>
                    <p className="text-xs text-sky-700 font-medium leading-relaxed">
                      Governs your access to and use of Bayard Vacations, including mobile apps and related services.
                    </p>
                  </div>
               </div>
               <div className="bg-emerald-50 rounded-3xl p-6 flex items-start gap-4 border border-emerald-100">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-200">
                    <Scale className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">Legal Binding</h4>
                    <p className="text-xs text-emerald-700 font-medium leading-relaxed">
                      This constitutes a legally binding agreement. Continued use means agreement to all terms.
                    </p>
                  </div>
               </div>
            </div>

            {/* THE CONTENT */}
            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600 prose-strong:text-slate-900 prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline prose-h2:text-3xl prose-h2:pt-8 prose-h2:mb-6 prose-h2:border-t prose-h2:border-slate-100 first:prose-h2:border-0 first:prose-h2:pt-0">
              
              <section id="agreement">
                <h2>1. AGREEMENT TO TERMS</h2>
                <p>
                  These Terms of Use constitute a legally binding agreement made
                  between you, whether personally or on behalf of an entity (“you”)
                  and Bayard Vacations (&quot;Company,&quot; “we,&quot; “us,&quot; or
                  “our”), concerning your access to and use of the{" "}
                  <a href="https://bayardvacations.com/">bayardvacations</a> website
                  as well as any other media form, media channel, mobile website or
                  mobile application related, linked, or otherwise connected thereto
                  (collectively, the “Site”). We are registered in India and have our
                  registered office at 144, 9th Main Rd, 4th Block, Kanteerava Nagar,
                  Nandini Layout, , Bengaluru, Karnataka 560096. You agree that by
                  accessing the Site, you have read, understood, and agreed to be
                  bound by all of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF
                  THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE
                  SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                </p>
                <p>
                  Supplemental terms and conditions or documents that may be posted on
                  the Site from time to time are hereby expressly incorporated herein
                  by reference. We reserve the right, in our sole discretion, to make
                  changes or modifications to these Terms of Use at any time and for
                  any reason. We will alert you about any changes by updating the
                  “Last updated” date of these Terms of Use, and you waive any right
                  to receive specific notice of each such change.
                </p>
              </section>

              <section id="intellectual">
                <h2>2. INTELLECTUAL PROPERTY RIGHTS</h2>
                <p>
                  Unless otherwise indicated, the Site is our proprietary property and
                  all source code, databases, functionality, software, website
                  designs, audio, video, text, photographs, and graphics on the Site
                  (collectively, the “Content”) and the trademarks, service marks, and
                  logos contained therein (the “Marks”) are owned or controlled by us
                  or licensed to us.
                </p>
                <p>
                  Provided that you are eligible to use the Site, you are granted a
                  limited license to access and use the Site and to download or print
                  a copy of any portion of the Content to which you have properly
                  gained access solely for your personal, non-commercial use.
                </p>
              </section>

              <section id="representations">
                <h2>3. USER REPRESENTATIONS</h2>
                <p>
                  By using the Site, you represent and warrant that: (1) all
                  registration information you submit will be true, accurate, current,
                  and complete; (2) you will maintain the accuracy of such information; (3)
                  you have the legal capacity and you agree to comply with these Terms
                  of Use; (4) you are not a minor in the jurisdiction in which you
                  reside; (5) you will not access the Site through automated or
                  non-human means; (6) you will not use the Site for any illegal or unauthorized purpose.
                </p>
              </section>

              <section id="registration">
                <h2>4. USER REGISTRATION</h2>
                <p>
                  You may be required to register with the Site. You agree to keep
                  your password confidential and will be responsible for all use of
                  your account and password. We reserve the right to remove or change a username you select if we determine it's inappropriate.
                </p>
              </section>

              <section id="prohibited">
                <h2>5. PROHIBITED ACTIVITIES</h2>
                <p>As a user of the Site, you agree not to:</p>
                <ul>
                  <li>Systematically retrieve data to create/compile a database.</li>
                  <li>Trick, defraud, or mislead us and other users.</li>
                  <li>Circumvent or disable security-related features.</li>
                  <li>Use the Site in a manner inconsistent with applicable laws.</li>
                  <li>Upload or transmit viruses, Trojan horses, or harmful material.</li>
                  <li>Harass, annoy, or threaten our employees or agents.</li>
                </ul>
              </section>

              <section id="contributions">
                <h2>6. USER-GENERATED CONTRIBUTIONS</h2>
                <p>
                  The Site does not offer users to submit or post content. If we provide such opportunity, your Contributions may be
                  viewable by other users and treated in accordance with the Site Privacy Policy.
                </p>
              </section>

              <section id="license">
                <h2>7. CONTRIBUTION LICENSE</h2>
                <p>
                  You agree that we may access, store, process, and use any
                  information and personal data that you provide following the terms
                  of the Privacy Policy.
                </p>
              </section>

              <section id="reviews">
                <h2>8. GUIDELINES FOR REVIEWS</h2>
                <p>
                  (1) You should have firsthand experience; (2) reviews should not contain offensive
                  profanity; (3) should not contain discriminatory references; (4) should not contain
                  references to illegal activity; (5) you should not be affiliated with competitors.
                </p>
              </section>

              <section id="submissions">
                <h2>9. SUBMISSIONS</h2>
                <p>
                  Any questions, comments, or feedback regarding the Site
                  (&quot;Submissions&quot;) provided by you to us are non-confidential
                  and shall become our sole property.
                </p>
              </section>

              <section id="management">
                <h2>10. SITE MANAGEMENT</h2>
                <p>
                  We reserve the right to monitor the Site for violations, take appropriate legal action,
                  and manage the Site to protect our rights and property.
                </p>
              </section>

              <section id="privacy">
                <h2>11. PRIVACY POLICY</h2>
                <p>
                  We care about data privacy and security. Please review our Privacy
                  Policy: <a href="https://bayardvacations.com/privacy-policy">Privacy Policy</a>.
                </p>
              </section>

              <section id="termination">
                <h2>12. TERM AND TERMINATION</h2>
                <p>
                  These Terms of Use shall remain in full force and effect while you
                  use the Site. We reserve the right to deny access to any person for any reason at our sole discretion.
                </p>
              </section>

              <section id="modifications">
                <h2>13. MODIFICATIONS AND INTERRUPTIONS</h2>
                <p>
                  We reserve the right to change, modify, or remove the contents of
                  the Site at any time. We also reserve the right to modify or
                  discontinue all or part of the Site without notice.
                </p>
              </section>

              <section id="law">
                <h2>14. GOVERNING LAW</h2>
                <p>
                  These Terms shall be governed by and defined following the laws of
                  India. Exclusive jurisdiction to resolve any dispute lies with Indian courts.
                </p>
              </section>

              <section id="disputes">
                <h2>15. DISPUTE RESOLUTION</h2>
                <p>
                  The Parties agree to first attempt to negotiate any
                  Dispute informally for at least thirty (30) days. Any further dispute shall be referred to and finally resolved by binding arbitration in Bangalore, India.
                </p>
              </section>

              <section id="corrections">
                <h2>16. CORRECTIONS</h2>
                <p>
                  We reserve the right to correct any errors, inaccuracies, or omissions and to change or
                  update the information on the Site at any time.
                </p>
              </section>

              <section id="disclaimer">
                <h2>17. DISCLAIMER</h2>
                <p>
                  THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. USE AT YOUR SOLE RISK.
                  TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES.
                </p>
              </section>

              <section id="liability">
                <h2>18. LIMITATIONS OF LIABILITY</h2>
                <p>
                  IN NO EVENT WILL WE BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
                </p>
              </section>

              <section id="indemnification">
                <h2>19. INDEMNIFICATION</h2>
                <p>
                  You agree to defend, indemnify, and hold us harmless from and against any loss, damage, or liability due to your use of the Site or breach of terms.
                </p>
              </section>

              <section id="data">
                <h2>20. USER DATA</h2>
                <p>
                  We will maintain certain data that you transmit to the Site for managing performance. You are solely responsible for data relating to your activities.
                </p>
              </section>

              <section id="electronic">
                <h2>21. ELECTRONIC COMMUNICATIONS</h2>
                <p>
                  Visiting the Site and sending us emails constitute electronic communications. You consent to receive
                  electronic communications and agree to the use of electronic signatures.
                </p>
              </section>

              <section id="miscellaneous">
                <h2>22. MISCELLANEOUS</h2>
                <p>
                  These Terms constitute the entire agreement between you and us. Our failure to
                  enforce any provision shall not operate as a waiver.
                </p>
              </section>

              <section id="cancellation">
                <h2>23. CANCELLATION POLICY</h2>
                <ul>
                  <li>After booking: 10% charge.</li>
                  <li>30+ days to arrival: 25% charge.</li>
                  <li>30 to 15 days to arrival: 50% charge.</li>
                  <li>15 days or less to arrival: 75% charge.</li>
                  <li>3 to 1 Day or No show: 100% charge.</li>
                </ul>
              </section>

              <section id="refund">
                <h2>24. REFUND POLICY</h2>
                <p>After cancellation, refunds are processed within 10 to 15 working days.</p>
              </section>

              <section id="contact">
                <h2>25. CONTACT US</h2>
                <div className="bg-slate-900 rounded-[2rem] p-8 text-white mt-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-amber-400/20 transition-colors" />
                  <p className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-4">Official Inquiry</p>
                  <address className="not-italic space-y-2">
                    <p className="text-xl font-bold">Bayard Vacations</p>
                    <p className="text-white/70 font-medium">144, 9th Main Rd, 4th Block, Kanteerava Nagar</p>
                    <p className="text-white/70 font-medium">Nandini Layout, Bengaluru</p>
                    <p className="text-white/70 font-medium">Karnataka 560096, India</p>
                  </address>
                </div>
              </section>

            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TermsAndConditions;
