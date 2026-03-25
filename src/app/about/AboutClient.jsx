"use client";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Container from "@/components/ui/Container";
import { Globe, Heart, Shield, Award, Users, TrendingUp, Check, Sparkles, Compass, Star, MapPin, Plane } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import TeamBento from "@/components/TeamBento";
import { cn } from "@/lib/utils";

export default function AboutPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-brand-blue via-purple-500 to-brand-blue transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section - Immersive & Dark */}
      <section className="relative h-screen flex items-center overflow-hidden bg-slate-950">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-3xl" />
        </div>

        {/* Large Decorative Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <h1 className="text-[20rem] font-black text-white hidden lg:block">ABOUT</h1>
        </div>

        <Container className="relative z-10 pt-28 md:pt-24 pb-12 md:pb-16 lg:pb-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/20 backdrop-blur-sm border border-brand-blue/30 mb-4 md:mb-6">
                <Sparkles className="w-4 h-4 text-brand-blue" />
                <span className="text-xs md:text-sm font-bold text-brand-blue uppercase tracking-wider">Est. 2017</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
                We Are <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-emerald-400 to-brand-blue">
                  Bayard Vacations
                </span>
              </h1>
              
              <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed max-w-xl">
                Not just another travel company. We're dreamweavers, adventure architects, and memory makers.
              </p>

              {/* Quick Stats - Responsive */}
              <div className="flex flex-wrap gap-3 md:gap-4">
                {[
                  { label: '8+ Years', icon: Star },
                  { label: '100+ Destinations', icon: Globe },
                  { label: '25K+ Travelers', icon: Users }
                ].map((stat, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all group"
                  >
                    <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-brand-blue group-hover:scale-110 transition-transform" />
                    <span className="text-xs md:text-sm font-bold text-white">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Image Collage (Smaller on mobile) */}
            <div className="relative h-56 sm:h-72 lg:h-[500px]">
              <div className="absolute top-0 right-0 w-32 h-40 sm:w-44 sm:h-52 lg:w-64 lg:h-72 rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl rotate-3 lg:rotate-6 hover:rotate-0 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80" alt="Travel" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 w-32 h-40 sm:w-44 sm:h-52 lg:w-64 lg:h-72 rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl -rotate-3 lg:-rotate-6 hover:rotate-0 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80" alt="Adventure" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-32 sm:h-32 lg:w-48 lg:h-48 rounded-full overflow-hidden shadow-2xl border-2 lg:border-4 border-white z-10 hover:scale-110 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=300&q=80" alt="Experience" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </Container>

        {/* Breadcrumbs - Bottom Left Positioned - Fixed Visibility */}
        <div className="absolute bottom-4 left-0 z-[60] w-full">
            <Container>
                <Breadcrumbs
                    items={[
                    { label: "Home", href: "/" },
                    { label: "About Us", href: "/about", active: true },
                    ]}
                    className="!bg-transparent !border-none !p-0 flex justify-start w-auto"
                    omitContainer
                    colorClasses="text-white/80 drop-shadow-md"
                    activeColorClasses="text-white drop-shadow-md font-bold"
                />
            </Container>
        </div>
      </section>


      {/* Journey Timeline - Horizontal Scroll */}
      <section className="py-8 md:py-10 bg-white overflow-hidden">
        <Container>
          <div className="text-center mb-6">
            <span className="inline-block px-4 py-2 text-sm font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/10 rounded-full mb-4">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">Timeline of Excellence</h2>
          </div>

          <div className="relative">
            <div ref={timelineRef} className="overflow-x-auto pb-6 scrollbar-hide">
              <div className="flex gap-6 min-w-max px-4">
                {[
                  { year: '2017', title: 'The Beginning', desc: 'Founded with a dream to transform travel', icon: Compass },
                  { year: '2019', title: '25K+ Travelers', desc: 'Milestone of happy customers reached', icon: Users },
                  { year: '2020', title: 'Going Global', desc: 'Expanded to 50+ destinations worldwide', icon: Globe },
                  { year: '2022', title: 'Tech Innovation', desc: 'Launched AI-powered trip planner', icon: Sparkles },
                  { year: '2026', title: 'AI-First Future', desc: 'Pioneering the next generation of AI-powered travel experiences', icon: Sparkles }
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex-shrink-0 w-72 group">
                      <div className="relative">
                        {/* Year Badge */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-brand-blue to-purple-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <span className={cn(
                            "font-bold text-white text-center px-1",
                            item.year.length > 5 ? "text-base leading-tight" : "text-xl"
                          )}>{item.year}</span>
                        </div>

                        {/* Card */}
                        <div className="mt-14 p-6 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-lg group-hover:shadow-2xl transition-all">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-blue/20 to-brand-blue/20 flex items-center justify-center mb-3">
                            <Icon className="w-6 h-6 text-brand-blue" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                          <p className="text-sm text-slate-600">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Scroll hint */}
            <div className="text-center mt-2 text-sm text-slate-400 flex items-center justify-center gap-2">
              <span>Scroll horizontally</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" />
                <div className="w-1 h-1 rounded-full bg-slate-400 animate-bounce delay-75" />
                <div className="w-1 h-1 rounded-full bg-slate-400 animate-bounce delay-150" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision - Modern Cards */}
      <section className="py-8 md:py-10 bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <Container>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Mission Card */}
            <div className="group relative">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-blue-700 rounded-3xl transform group-hover:scale-105 transition-transform duration-300" />
              
              <div className="relative p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">Our Mission</h2>
                </div>
                
                <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4">
                  To inspire wanderlust and create transformative travel experiences that connect cultures, 
                  broaden horizons, and craft memories that last forever.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {['Connection', 'Transformation', 'Memories'].map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold border border-white/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl transform group-hover:scale-105 transition-transform duration-300" />
              
              <div className="relative p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">Our Vision</h2>
                </div>
                
                <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4">
                  To be the world's most trusted travel partner, pioneering sustainable tourism 
                  and creating journeys that change lives.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {['Trust', 'Sustainability', 'Innovation'].map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold border border-white/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values - Hexagon Grid */}
      <section className="py-8 md:py-10 bg-slate-50">
        <Container>
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 text-sm font-bold uppercase tracking-wider text-purple-600 bg-purple-100 rounded-full mb-4">
              Our DNA
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">Core Values</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: 'Trust & Integrity', desc: 'Transparent, honest relationships built to last', color: 'blue' },
              { icon: Heart, title: 'Passion for Travel', desc: 'Genuine love for exploration drives everything', color: 'red' },
              { icon: Users, title: 'Customer Obsessed', desc: 'Your satisfaction is our only measure of success', color: 'purple' },
              { icon: Award, title: 'Excellence Always', desc: 'Highest standards in every single detail', color: 'yellow' },
              { icon: Globe, title: 'Sustainability First', desc: 'Protecting destinations for future generations', color: 'green' },
              { icon: TrendingUp, title: 'Innovation Mindset', desc: 'Constantly evolving, always improving', color: 'cyan' }
            ].map((value, i) => {
              const Icon = value.icon;
              const gradients = {
                blue: 'from-blue-500 to-blue-600',
                red: 'from-red-500 to-pink-600',
                purple: 'from-purple-500 to-purple-700',
                yellow: 'from-yellow-400 to-orange-500',
                green: 'from-green-500 to-emerald-600',
                cyan: 'from-cyan-500 to-blue-500'
              };
              
              return (
                <div key={i} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-100 rounded-3xl rotate-3 group-hover:rotate-6 transition-transform duration-300" />
                  <div className="relative bg-white rounded-3xl p-6 shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradients[value.color]} flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{value.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Team - Bento Grid */}
      {/* <TeamBento /> */}

      {/* Why Choose Us - Split Design */}
      <section className="py-8 md:py-10 bg-gradient-to-br from-slate-50 to-white">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4">Why Bayard?</h2>
            <p className="text-lg text-slate-600">Because ordinary just isn't our style</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              'Expert consultants with firsthand destination knowledge',
              '24/7 support throughout your entire journey',
              'Transparent pricing with zero hidden fees',
              'Flexible booking and cancellation policies',
              'Curated experiences tailored to you',
              'Trusted local partners worldwide',
              'Comprehensive travel insurance options',
              'Eco-friendly and sustainable choices'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all group">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-blue to-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <p className="text-base text-slate-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section - Redesigned with Light Background */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-brand-blue rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-blue rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <Container className="relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Creative Content */}
            <div className="space-y-8">
              <div>
                <div className="inline-block px-4 py-2 bg-brand-blue/10 rounded-full mb-6 border border-brand-blue/20">
                  <span className="text-brand-blue font-bold uppercase tracking-wider text-sm">Start Your Journey</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
                  Your Next 
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-yellow-400 to-brand-blue bg-size-200 animate-gradient">
                    Adventure Awaits
                  </span>
                </h2>
                <p className="text-xl text-slate-700 leading-relaxed">
                  From dreaming to exploring - we handle every detail so you can focus on making memories.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '25K+', label: 'Happy Travelers' },
                  { value: '50+', label: 'Destinations' },
                  { value: '8+', label: 'Years Experience' }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-2xl md:text-3xl font-bold text-brand-blue mb-1">{stat.value}</div>
                    <div className="text-xs text-slate-600 font-semibold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - CTA Card with Dark Background */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-blue via-purple-600 to-brand-blue rounded-3xl blur-xl opacity-30" />
              <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">✈️</div>
                  <h3 className="text-3xl font-bold text-white mb-3">Let's Plan Together</h3>
                  <p className="text-slate-300">
                    Get personalized packages tailored to your dreams
                  </p>
                </div>

                <div className="space-y-4">
                  <a
                    href="/explore"
                    className="group w-full px-8 py-4 bg-gradient-to-r from-brand-blue to-purple-600 text-white font-bold rounded-full hover:shadow-xl hover:shadow-brand-blue/50 transition-all flex items-center justify-center gap-3"
                  >
                    <Plane className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <span>Explore All Packages</span>
                  </a>
                  <a
                    href="/contact"
                    className="w-full px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-3"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Contact Our Team</span>
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-700 text-center">
                  <p className="text-sm text-slate-400">
                    📞 <span className="font-semibold text-white">063631 17421</span> • Available 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }

        .clip-diagonal-bottom {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes delay-1000 {
          0%, 50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </>
  );
}
