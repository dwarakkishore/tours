'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import categoryData from "@/data/categoryData";
import quickLinksData from "@/data/quickLinksData";
import Image from "next/image";

import Container from "@/components/ui/Container";
import FooterSection from "./Footer/FooterSection";
import SwipeableContactCard from "./Footer/SwipeableContactCard";

import { usePathname } from 'next/navigation';

export default function FooterClient({ domesticRegions, internationalRegions }) {
  const pathname = usePathname();
  
  // Detect theme from pathname
  const themeSlug = pathname?.startsWith('/themes/') ? pathname.split('/')[2] : 'default';
  
  const THEME_CONFIGS = {
    "romantic-getaways": {
      bgGradient: "from-rose-900 to-rose-950",
      hoverColor: "hover:text-rose-400",
      dividerColor: "bg-rose-500/20",
      borderColor: "border-rose-500/20",
      glowColor: "via-rose-500/30"
    },
    "solo-expedition": {
      bgGradient: "from-[#0a0a0a] to-black",
      hoverColor: "hover:text-[#FFD700]",
      dividerColor: "bg-[#FFD700]/20",
      borderColor: "border-[#FFD700]/20",
      glowColor: "via-[#FFD700]/30"
    },
    "elite-escape": {
      bgGradient: "from-[#2b251e] to-[#1a1a1a]",
      hoverColor: "hover:text-[#c5a059]",
      dividerColor: "bg-[#c5a059]/10",
      borderColor: "border-[#c5a059]/10",
      glowColor: "via-[#c5a059]/20"
    },
    "family-funventure": {
      bgGradient: "from-[#1a1c1e] to-[#0f1113]",
      hoverColor: "hover:text-orange-400",
      dividerColor: "bg-orange-500/20",
      borderColor: "border-orange-500/20",
      glowColor: "via-orange-500/30",
      accentColor: "text-orange-400",
      accentBg: "bg-orange-500"
    },
    "group-departure": {
      bgGradient: "from-emerald-900 to-emerald-950",
      hoverColor: "hover:text-emerald-400",
      dividerColor: "bg-emerald-500/20",
      borderColor: "border-emerald-500/20",
      glowColor: "via-emerald-500/30"
    },
    "group-adventures": {
      bgGradient: "from-emerald-900 to-emerald-950",
      hoverColor: "hover:text-emerald-400",
      dividerColor: "bg-emerald-500/20",
      borderColor: "border-emerald-500/20",
      glowColor: "via-emerald-500/30"
    },
    "religious-retreat": {
      bgGradient: "from-amber-900 to-amber-950",
      hoverColor: "hover:text-amber-400",
      dividerColor: "bg-amber-500/20",
      borderColor: "border-amber-500/20",
      glowColor: "via-amber-500/30"
    },
    "relax-rejuvenate": {
      bgGradient: "from-stone-900 to-black",
      hoverColor: "hover:text-sage-400",
      dividerColor: "bg-sage-500/20",
      borderColor: "border-sage-500/20",
      glowColor: "via-sage-500/30",
      accentColor: "text-sage-400",
      accentBg: "bg-sage-600"
    },
    "exploration-bundle": {
      bgGradient: "from-slate-900 to-slate-950",
      hoverColor: "hover:text-slate-400",
      dividerColor: "bg-slate-500/20",
      borderColor: "border-slate-500/20",
      glowColor: "via-slate-500/30"
    },
    "educational": {
      bgGradient: "from-indigo-950 to-black",
      hoverColor: "hover:text-indigo-400",
      dividerColor: "bg-indigo-500/20",
      borderColor: "border-indigo-500/20",
      glowColor: "via-indigo-500/30"
    },
    "default": {
      bgGradient: "from-brand-blue to-[#020617]",
      hoverColor: "hover:text-brand-blue",
      dividerColor: "bg-white/20",
      borderColor: "border-white/10",
      glowColor: "via-white/30"
    }
  };

  const config = THEME_CONFIGS[themeSlug] || THEME_CONFIGS.default;

  // Contact card data
  const contactCards = [
    {
      href: "tel:+916363117421",
      iconType: "phone",
      title: "Call Us",
      description: "063631 17421",
      subtext: "Available 24/7",
      color: config.accentColor || "text-brand-blue",
      bgColor: config.accentBg || "bg-brand-blue",
      actionLabel: "Call",
      external: false
    },
    {
      href: "https://wa.me/918069668484",
      iconType: "whatsapp",
      title: "WhatsApp",
      description: "Chat with us",
      subtext: "Quick response",
      color: "text-[#25D366]",
      bgColor: "bg-[#25D366]",
      actionLabel: "Chat",
      external: true
    },
    {
      href: "mailto:info@bayardvacations.com",
      iconType: "email",
      title: "Email Us",
      description: "info@bayardvacations.com",
      subtext: "24hr response",
      color: "text-blue-400",
      bgColor: "bg-blue-500",
      actionLabel: "Email",
      external: false
    }
  ];

  return (
    <footer className={cn("relative text-white transition-colors duration-700", "bg-gradient-to-b", config.bgGradient)}>
      {/* subtle top glow */}
      <div className={cn("absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent transition-colors duration-700", config.glowColor)} />

      <Container className="py-12 sm:py-16">
        {/* TOP */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Image
            src="/Bayard_white_logo.svg"
            alt="Bayard Vacations"
            width={420}
            height={90}
            className="w-48 sm:w-64 h-auto"
            priority
          />

          <div className="text-right">
            <p className="mb-4 text-sm font-semibold text-white">Follow us</p>
            <div className="flex gap-3 justify-end">
                <a
                  href="https://www.facebook.com/bayardvacation/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Facebook page"
                  className="w-11 h-11 rounded-xl bg-[#1877F2] flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-[#1877F2]/30 transition-all duration-300"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://www.instagram.com/bayardvacations"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Instagram profile"
                  className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://www.youtube.com/@BayardVacations"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our YouTube channel"
                  className="w-11 h-11 rounded-xl bg-[#FF0000] flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300"
                >
                  <Youtube className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://www.linkedin.com/company/bayard-vacations/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our LinkedIn company page"
                  className="w-11 h-11 rounded-xl bg-[#0A66C2] flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-[#0A66C2]/30 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://wa.me/918069668484"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with us on WhatsApp"
                  style={{ backgroundColor: '#25D366' }}
                  className="w-11 h-11 rounded-xl flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-[#25D366]/30 transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
            </div>
          </div>
        </div>

        {/* LINKS */}
        <div className="mt-12 grid gap-10 md:grid-cols-3 text-sm">
          <FooterSection 
            title="International" 
            links={internationalRegions} 
            basePath="packages" 
            hoverColor={config.hoverColor}
            viewAllLink="/destinations"
          />
          <FooterSection 
            title="Domestic" 
            links={domesticRegions} 
            basePath="packages" 
            hoverColor={config.hoverColor}
            viewAllLink="/destinations"
          />
          <FooterSection 
            title="Themes" 
            links={categoryData} 
            basePath="themes" 
            hoverColor={config.hoverColor}
            viewAllLink="/themes"
          />
        </div>

        {/* Contact Info - Swipeable Cards */}
        <div className={cn("mt-10 pt-8 border-t transition-colors duration-700", config.borderColor)}>
          <div className="flex items-center justify-between mb-6">
            <h5 className="font-bold text-xl text-white">Get In Touch</h5>
            <p className="text-xs text-white/40 md:hidden">← Swipe cards</p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((card, index) => (
              <SwipeableContactCard key={index} {...card} />
            ))}
            
            {/* Office - Non-swipeable info card - Hidden on mobile */}
            <div className="hidden md:block relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-start gap-3">
                <div className="bg-purple-500/20 p-2.5 rounded-lg">
                  <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h6 className="font-semibold text-white text-sm mb-1">Visit Us</h6>
                  <p className="text-white/80 text-sm font-medium leading-snug">144, 9th Main Rd, 4th Block, Kanteerava Nagar,<br/>Nandini Layout, Bengaluru, KA 560096</p>
                  <p className="text-white/50 text-xs mt-0.5">Mon-Sat: 9AM-7PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className={cn("my-10 h-px transition-colors duration-700", config.dividerColor)} />

        {/* BOTTOM */}
        <div className="flex flex-col gap-6 text-sm text-white/90 xl:flex-row xl:items-center xl:justify-between font-medium">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {quickLinksData.map((item, i, arr) => (
              <li key={item.id} className="flex items-center gap-6">
                <Link href={item.href} prefetch={false} className={cn("transition-all underline-offset-4 hover:underline whitespace-nowrap", config.hoverColor)}>
                  {item.title}
                </Link>
                {i !== arr.length - 1 && (
                  <span className="opacity-20 select-none text-xs">|</span>
                )}
              </li>
            ))}
          </ul>

          <p className="opacity-60 text-xs xl:text-sm" suppressHydrationWarning>
            © {new Date().getFullYear()} Bayard Vacations. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
