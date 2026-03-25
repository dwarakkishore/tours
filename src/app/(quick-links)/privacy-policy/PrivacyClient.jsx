"use client";

import React, { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";
import { ChevronRight, ShieldCheck, Lock, Database, HelpCircle } from "lucide-react";

const PrivacyPolicy = () => {
  const [activeTab, setActiveTab] = useState("");

  const sections = [
    { id: "intro", title: "INTRODUCTION" },
    { id: "definitions", title: "DEFINITIONS" },
    { id: "collecting", title: "COLLECTING DATA" },
    { id: "tracking", title: "TRACKING & COOKIES" },
    { id: "use-data", title: "USE OF DATA" },
    { id: "retention", title: "RETENTION" },
    { id: "transfer", title: "TRANSFER" },
    { id: "deletion", title: "DELETION" },
    { id: "disclosure", title: "DISCLOSURE" },
    { id: "security", title: "SECURITY" },
    { id: "children", title: "CHILDREN'S PRIVACY" },
    { id: "links", title: "EXTERNAL LINKS" },
    { id: "changes", title: "CHANGES" },
    { id: "contact", title: "CONTACT US" },
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
              <span className="text-xs font-bold uppercase tracking-widest leading-none">Trust & Privacy</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              Privacy <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 italic">Policy</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 max-w-2xl font-medium leading-relaxed mb-8">
              Your privacy is our priority. This policy outlines how we collect, use, and protect your personal information when you interact with Bayard Vacations.
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-white/50 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Last Updated: January 15, 2024
              </div>
              <div className="h-4 w-px bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-2">
                Version 1.2.0
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy-policy", active: true },
        ]}
      />

      {/* 2. MAIN CONTENT AREA */}
      <Container className="mt-8 md:-mt-12">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
          
          {/* STICKY SIDEBAR */}
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
                    <Lock className="w-6 h-6 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">Data Protection</h4>
                    <p className="text-xs text-sky-700 font-medium leading-relaxed">
                      We use industry-standard encryption to protect your personal data and ensure secure transactions.
                    </p>
                  </div>
               </div>
               <div className="bg-emerald-50 rounded-3xl p-6 flex items-start gap-4 border border-emerald-100">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-200">
                    <Database className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">Your Rights</h4>
                    <p className="text-xs text-emerald-700 font-medium leading-relaxed">
                      You have the right to access, update, or delete your personal information at any time through your account.
                    </p>
                  </div>
               </div>
            </div>

            {/* THE CONTENT */}
            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600 prose-strong:text-slate-900 prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline prose-h2:text-3xl md:prose-h2:text-4xl lg:prose-h2:text-5xl prose-h2:leading-tight prose-h2:pt-8 prose-h2:mb-6 prose-h2:border-t prose-h2:border-slate-100 first:prose-h2:border-0 first:prose-h2:pt-0">
              
              <section id="intro">
                <h2>Introduction</h2>
                <p>
                  This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                </p>
                <p>
                  We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
                </p>
              </section>

              <section id="definitions">
                <h2>Interpretation and Definitions</h2>
                <h3>Interpretation</h3>
                <p>
                  The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                </p>
                <h3>Definitions</h3>
                <p>For the purposes of this Privacy Policy:</p>
                <ul>
                  <li><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
                  <li><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Bayard Vacations, 144, 9th Main Rd, 4th Block, Kanteerava Nagar, Nandini Layout, Bengaluru, Karnataka 560096.</li>
                  <li><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</li>
                  <li><strong>Country</strong> refers to: Karnataka, India.</li>
                  <li><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</li>
                  <li><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</li>
                  <li><strong>Service</strong> refers to the Website.</li>
                  <li><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company.</li>
                </ul>
              </section>

              <section id="collecting">
                <h2>Collecting and Using Your Personal Data</h2>
                <h3>Types of Data Collected</h3>
                <h4>Personal Data</h4>
                <p>
                  While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                </p>
                <ul>
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Phone number</li>
                  <li>Address, State, Province, ZIP/Postal code, City</li>
                  <li>Usage Data</li>
                </ul>
                <h4>Usage Data</h4>
                <p>Usage Data is collected automatically when using the Service.</p>
                <p>
                  Usage Data may include information such as Your Device&apos;s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                </p>
              </section>

              <section id="tracking">
                <h2>Tracking Technologies and Cookies</h2>
                <p>
                  We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service.
                </p>
                <ul>
                  <li><strong>Cookies or Browser Cookies:</strong> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies.</li>
                  <li><strong>Web Beacons:</strong> Certain sections of our Service and our emails may contain small electronic files known as web beacons.</li>
                </ul>
              </section>

              <section id="use-data">
                <h2>Use of Your Personal Data</h2>
                <p>The Company may use Personal Data for the following purposes:</p>
                <ul>
                  <li><strong>To provide and maintain our Service:</strong> including to monitor the usage of our Service.</li>
                  <li><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service.</li>
                  <li><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract.</li>
                  <li><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication.</li>
                  <li><strong>To provide You with news:</strong> special offers and general information about other goods and services.</li>
                </ul>
              </section>

              <section id="retention">
                <h2>Retention of Your Personal Data</h2>
                <p>
                  The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations.
                </p>
              </section>

              <section id="transfer">
                <h2>Transfer of Your Personal Data</h2>
                <p>
                  Your information, including Personal Data, is processed at the Company&apos;s operating offices and in any other places where the parties involved in the processing are located.
                </p>
              </section>

              <section id="deletion">
                <h2>Delete Your Personal Data</h2>
                <p>
                  You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.
                </p>
              </section>

              <section id="disclosure">
                <h2>Disclosure of Your Personal Data</h2>
                <h3>Business Transactions</h3>
                <p>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred.</p>
                <h3>Law enforcement</h3>
                <p>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law.</p>
              </section>

              <section id="security">
                <h2>Security of Your Personal Data</h2>
                <p>
                  The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure.
                </p>
              </section>

              <section id="children">
                <h2>Children&apos;s Privacy</h2>
                <p>
                  Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13.
                </p>
              </section>

              <section id="links">
                <h2>Links to Other Websites</h2>
                <p>
                  Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party&apos;s site.
                </p>
              </section>

              <section id="changes">
                <h2>Changes to this Privacy Policy</h2>
                <p>
                  We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.
                </p>
              </section>

              <section id="contact">
                <h2>CONTACT US</h2>
                <div className="bg-slate-900 rounded-[2rem] p-8 text-white mt-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-emerald-400/20 transition-colors" />
                  <p className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-4">Privacy Inquiry</p>
                  <address className="not-italic space-y-2">
                    <p className="text-xl font-bold">Bayard Vacations</p>
                    <p className="text-white/70 font-medium">144, 9th Main Rd, 4th Block, Kanteerava Nagar</p>
                    <p className="text-white/70 font-medium">Nandini Layout, Bengaluru</p>
                    <p className="text-white/70 font-medium">Karnataka 560096, India</p>
                    <p className="text-brand-accent font-bold pt-2">support@bayardvacations.com</p>
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

export default PrivacyPolicy;

