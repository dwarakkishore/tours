"use client";

import {
  ShieldCheck,
  LayoutDashboard,
  Gem,
  Flower,
  ArrowRight,
  Crown,
  Headphones,
  Bot,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import Image from "next/image";
import Link from "next/link";
import PeopleReviews from "@/assets/peopleReviews.png";

const WhyItem = ({ title, description, icon: Icon }) => {
  return (
    <div className="group relative p-3 md:p-4 bg-black/30 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-black/40 hover:border-white/40 transition-all duration-300 shadow-xl overflow-hidden">
      {/* Hover Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-start gap-3">
        <div className="bg-white/15 p-2 md:p-2.5 rounded-lg group-hover:bg-white/25 text-white transition-colors duration-300">
          <Icon className="w-6 h-6 md:w-7 md:h-7" />
        </div>
        <div>
          <h3 className="font-bold text-lg mb-1 tracking-tight text-white transition-colors duration-300">{title}</h3>
          <p className="text-xs md:text-[13px] font-medium text-slate-300 group-hover:text-white/90 leading-snug max-w-[260px] opacity-80 group-hover:opacity-100">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const WHY_ITEMS = [
  {
    title: "Reliability",
    icon: ShieldCheck,
    description: "We’re with you every step ensuring a seamless travel experience.",
  },
  {
    title: "Customized",
    icon: LayoutDashboard,
    description: "One size doesn’t fit all, so why should one itinerary?",
  },
  {
    title: "Exclusive",
    icon: Crown,
    description: "Curated experiences and hidden gems reserved for our members.",
  },
  {
    title: "24/7 Support",
    icon: Headphones,
    description: "Dedicated travel artisan support whenever and wherever you need it.",
  },
  {
    title: "Unique",
    icon: Gem,
    description: "We ensure you don't just visit destinations but connect with them.",
  },
  {
    title: "Stress-Free",
    icon: Flower,
    description: "We promise fun & beautiful memories, with zero stress.",
  },
];

export default function WhyBayard() {
  return (
    <Container className="relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* LEFT CONTENT */}
        <div className="flex flex-col items-start gap-4 md:gap-6 max-w-2xl">
          <div className="section-badge-dark mb-2 md:mb-6">
            <span className="text-xs font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent" style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Why Choose Us
            </span>
          </div>
          
          <h2 className="section-title-dark leading-[1.1] mb-4 md:mb-6">
            <span className="md:hidden">Why <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent" style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Bayard</span></span>
            <span className="hidden md:inline">Experience the{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent" style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Bayard Difference</span>
            </span>
          </h2>
          
          <p className="section-subtitle-dark max-w-md hidden md:block">
            Your travel dreams are unique, and We offer customized itineraries, reliable support, and exceptional experiences designed around your needs.
          </p>

          <div className="flex flex-col gap-6 mb-8 mt-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-4 group cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 border border-white/10 shadow-xl">
                <Bot className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-base md:text-lg leading-tight flex items-center gap-2">
                  AI-Powered
                  <span className="inline-block px-2 py-0.5 rounded-full bg-yellow-400 text-brand-blue text-[8px] font-bold uppercase tracking-tighter">New</span>
                </span>
                <span className="text-slate-400 text-xs md:text-sm font-medium">Plan trips by just talking to us</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-4 group cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 border border-white/10 shadow-xl">
                <Users className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-base md:text-lg leading-tight">25,000+ Happy travelers</span>
                <span className="text-slate-400 text-xs md:text-sm font-medium">Worldwide trust in Bayard adventures</span>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-2 md:mt-4 w-auto">
             <Link 
               href="/explore" 
               prefetch={false}
               className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-brand-blue flex items-center justify-center gap-2 px-6 py-3 md:px-10 md:py-4 rounded-full font-bold text-sm md:text-lg transition-all transform hover:scale-105 shadow-[0_10px_30px_rgba(234,179,8,0.4)]"
             >
                Explore Packages
                <ArrowRight className="w-5 h-5 -rotate-45" />
             </Link>
          </div>
        </div>

        {/* RIGHT CONTENT - GRID */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-4">
          {WHY_ITEMS.map((item) => (
            <WhyItem key={item.title} {...item} />
          ))}
        </div>
      </div>
      
      {/* Background Decor Elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-blue rounded-full mix-blend-multiply filter blur-[128px] opacity-40" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-blue rounded-full mix-blend-multiply filter blur-[128px] opacity-40" />
    </Container>
  );
}
