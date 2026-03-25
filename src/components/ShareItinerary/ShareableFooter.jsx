'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MessageCircle, AlertTriangle, Globe, Instagram, Facebook, MapPin } from 'lucide-react';

const ShareableFooter = ({ contactInfo }) => {
  if (!contactInfo) return null;

  const { 
    companyName = "Bayard Vacations", 
    phone = "Contact our expert", 
    whatsapp = "", 
    email = "", 
    website = "bayardvacations.com", 
    emergencyContact,
    destinationExpert,
    bankDetails
  } = contactInfo || {};

  return (
    <footer className="bg-brand-blue text-white pt-20 pb-12 border-t border-white/10 font-poppins relative overflow-hidden">
      {/* Decorative Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-[-15deg] translate-x-1/4 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          
          {/* 1. Brand & Network (3 cols) */}
          <div className="lg:col-span-3 space-y-10">
            <div className="space-y-6">
              <div className="h-10 w-52 relative">
                <Image
                  src="/Bayard_white_logo.svg"
                  alt={companyName}
                  fill
                  className="object-contain object-left brightness-0 invert"
                />
              </div>
              <p className="text-blue-100/70 text-sm leading-relaxed font-medium">
                Designing extraordinary journeys that transform your travel dreams into lasting memories.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-200/50">Connectivity</h4>
              <div className="flex gap-3">
                {[
                  { icon: Globe, link: `https://${website}`, label: "Visit our website" },
                  { icon: Instagram, link: "https://instagram.com/bayardvacations", label: "Visit our Instagram profile" },
                  { icon: Facebook, link: "https://facebook.com/bayardvacations", label: "Visit our Facebook page" }
                ].map((item, i) => (
                  <a 
                    key={i} 
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand-blue transition-all duration-300"
                  >
                    <item.icon className="w-4.5 h-4.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Destination Expert & Inquiries (3 cols) */}
          <div className="lg:col-span-3 space-y-10">
            <div className="space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.4em] text-blue-200/50 flex items-center gap-3">
                <span className="w-4 h-[1px] bg-blue-200/30"></span>
                Travel Expert
              </h4>
              {destinationExpert && (
                <div className="space-y-3">
                  <p className="text-lg font-bold text-white leading-none">{destinationExpert.name}</p>
                  <p className="text-[10px] font-bold text-blue-300/80 uppercase tracking-widest">{destinationExpert.designation}</p>
                  <div className="space-y-2 pt-2">
                    <a href={`mailto:${destinationExpert.email}`} className="flex items-center gap-2 text-sm text-blue-100/70 hover:text-white transition-colors">
                      <Mail className="w-3.5 h-3.5" /> {destinationExpert.email}
                    </a>
                    <a href={`tel:${destinationExpert.phone}`} className="flex items-center gap-2 text-sm text-blue-100/70 hover:text-white transition-colors">
                      <Phone className="w-3.5 h-3.5" /> {destinationExpert.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/5 space-y-4">
              <a href={`tel:${phone}`} className="group block">
                <p className="text-[10px] font-bold text-blue-300/80 uppercase tracking-widest mb-1 group-hover:text-white transition-colors">General Inquiries</p>
                <p className="text-base font-bold text-white tracking-tight">{phone}</p>
              </a>
              <a href={`mailto:${email}`} className="group block">
                <p className="text-sm text-blue-100/70 hover:text-white transition-colors break-all">{email}</p>
              </a>
            </div>
          </div>

          {/* 3. Office & Bank Details (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-10">
            {/* Office */}
            <div className="space-y-6">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.4em] text-blue-200/50 flex items-center gap-3">
                <span className="w-4 h-[1px] bg-blue-200/30"></span>
                Our Office
              </h4>
              <div className="space-y-4">
                <p className="text-sm font-medium text-blue-100/80 leading-relaxed max-w-[240px]">
                  {contactInfo.officeAddress || "Nandini Layout, Bengaluru, Karnataka 560096, India"}
                </p>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-[0.2em]">Live Support</span>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="space-y-6">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.4em] text-blue-200/50 flex items-center gap-3">
                <span className="w-4 h-[1px] bg-blue-200/30"></span>
                Bank Details
              </h4>
              {bankDetails ? (
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10 space-y-4">
                  <div>
                    <p className="text-[9px] font-bold text-blue-300/50 uppercase tracking-widest mb-1">Beneficiary Name</p>
                    <p className="text-xs font-bold text-white uppercase">{bankDetails.accountName}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <p className="text-[9px] font-bold text-blue-300/50 uppercase tracking-widest mb-1">Account Number</p>
                      <p className="text-sm font-bold text-white tracking-wider">{bankDetails.accountNumber}</p>
                    </div>
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="text-[9px] font-bold text-blue-300/50 uppercase tracking-widest mb-1">IFSC Code</p>
                        <p className="text-xs font-bold text-white">{bankDetails.ifscCode}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-blue-300/50 uppercase tracking-widest mb-1">Type</p>
                        <p className="text-xs font-bold text-white">{bankDetails.accountType}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center">
                  <p className="text-xs italic text-blue-200/50 font-medium">Please contact our team for bank details.</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Global Footer Bottom */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-[11px] font-bold text-blue-100/50 uppercase tracking-[0.3em] text-center md:text-left">
            © 2026 {companyName} <span className="mx-4 opacity-20 hidden md:inline">|</span> <span className="block md:inline mt-2 md:mt-0">Premium World Tours</span>
          </div>
          
          <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-blue-100/60">
            <Link href="/privacy-policy" className="hover:text-white transition-colors relative group">
              Privacy Policy
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors relative group">
              Terms of Use
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ShareableFooter;
