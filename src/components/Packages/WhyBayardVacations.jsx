"use client";

import Container from "@/components/ui/Container";
import { 
  Shield, 
  Award, 
  Users,
  Headphones,
  Zap,
  Tag,
  MapPin,
  Sparkles
} from "lucide-react";

const WhyBayardVacations = () => {
  const stats = [
    {
      icon: Shield,
      value: "100%",
      label: "Secure Booking",
    },
    {
      icon: Award,
      value: "10+",
      label: "Years Experience",
    },
    {
      icon: Users,
      value: "25K+",
      label: "Happy Travelers",
    },
    {
      icon: Headphones,
      value: "24/7",
      label: "Support Available",
    },
    {
      icon: Tag,
      value: "Best Price",
      label: "Guaranteed",
    },
    {
      icon: Sparkles,
      value: "Personalized",
      label: "Customized Trips",
    },
    {
      icon: MapPin,
      value: "Expert",
      label: "Local Guides",
    }
  ];

  return (
    <section className="bg-white py-6 md:py-10 relative overflow-hidden rounded-3xl border border-slate-100 shadow-sm ">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] -ml-64 -mb-64"></div>

      <Container>
        <div className="flex flex-col items-center gap-6 md:gap-12 relative z-10">
          {/* Title - Centered */}
          <div className="text-center px-4">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              Why Choose <span className="text-brand-blue">Bayard Vacations</span>?
            </h3>
            <div className="h-1.5 w-16 md:w-24 bg-brand-blue rounded-full mx-auto" />
          </div>

          {/* Stats Grid - Centered */}
          <div className="w-full max-w-6xl px-2 md:px-0">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 items-start gap-x-3 gap-y-6 md:gap-x-12 md:gap-y-12 justify-items-center">
              {stats.slice(0, 8).map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex flex-col sm:flex-row items-center sm:gap-5 gap-3 group w-full">
                    {/* Icon Container */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-amber-50/50 border border-amber-200/50 flex items-center justify-center transition-all duration-500 group-hover:bg-amber-50 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-amber-200/20 shadow-sm shrink-0">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-amber-600" />
                    </div>
                    
                    <div className="flex flex-col min-w-0 text-center sm:text-left">
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 leading-none mb-1.5 tracking-tight group-hover:text-brand-blue transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-[9px] sm:text-[10px] md:text-[11px] text-slate-500 uppercase font-bold tracking-wider sm:tracking-widest leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyBayardVacations;
