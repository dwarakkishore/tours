import { getGroupDeparturePackages } from "@/lib/server";
import Container from "@/components/ui/Container";
import GroupPackageCard from "@/components/Landing/GroupPackageCard";
import RegionStats from "@/components/Packages/RegionStats";
import InspirationSection from "@/components/Landing/InspirationSection";
import GroupDepartureSlider from "@/components/ui/sliders/GroupDepartureSlider";
import { Compass, Users, Star, Crown, Headphones, Leaf, ArrowRight } from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata = {
  title: "Group Departures",
  description: "Join our curated group departures and explore the world with like-minded travelers. Expert-led tours, seamless planning, and unforgettable memories.",
  alternates: {
    canonical: "/themes/group-departure",
  },
};

const GroupDeparturePage = async () => {
  const groupDeparturePackages = await getGroupDeparturePackages();

  return (
    <main className="bg-white min-h-screen text-slate-900 overflow-hidden selection:bg-brand-blue/10">
      {/* Dynamic Background Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
        >
          <source src="https://cdn.bayardvacations.com/videos/Group_Departure.webm" type="video/webm" />
        </video>
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,8,22,0.4)_100%)] z-10" />

        <Container className="relative z-20 text-center pt-40 pb-24 lg:pt-64 lg:pb-40">
          <div className="max-w-4xl mx-auto space-y-6">
            <Breadcrumbs 
              items={[
                { label: "Home", href: "/" },
                { label: "Themes", href: "/themes" },
                { label: "Group Departures", href: "/themes/group-departure", active: true }
              ]} 
              className="bg-transparent border-transparent p-0 mb-8 flex justify-center"
              omitContainer
              colorClasses="text-slate-300"
              activeColorClasses="text-white"
            />
            
            <h1 className="text-4xl lg:text-7xl font-bold tracking-tight leading-tight text-white animate-in fade-in slide-in-from-bottom-8 duration-1000">
               <span className="block opacity-90">EXPLORE</span>
               <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-cyan-400 to-brand-blue animate-gradientFlow bg-[length:200%_auto]">TOGETHER.</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed px-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
              Hand-crafted itineraries designed for explorers who believe that the best stories are written together. Fixed dates, expert guides, and curated experiences.
            </p>
          </div>
        </Container>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
           <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-brand-blue to-transparent animate-pulse" />
           <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/40 rotate-90 translate-y-8">Scroll</span>
        </div>
      </section>

      {/* Brand Section / Stats */}
      <section className="section-padding relative">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[120px] -z-10" />
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] -z-10" />
         
         <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
               <div className="space-y-8">
                  <div className="space-y-3">
                     <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                        Crafting <span className="text-brand-blue">Legacies</span> <br />
                        Through <span className="text-brand-blue">Shared Discovery</span>
                     </h2>
                     <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-xl">
                        Since 2010, Bayard Vacations has been the gold standard for premium group travel. We don't just book trips; we architect experiences that foster connection, discovery, and absolute luxury.
                     </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="p-8 rounded-[2rem] bg-white border border-slate-200 hover:border-brand-blue/50 shadow-xl shadow-slate-200/50 transition-all duration-500 group/card">
                        <div className="w-12 h-12 rounded-2xl bg-brand-blue/5 flex items-center justify-center mb-6 group-hover/card:scale-110 transition-transform">
                          <Crown className="w-6 h-6 text-brand-blue" />
                        </div>
                        <h4 className="font-nord font-bold text-xl mb-3 text-slate-900 line-clamp-1">Exclusive Access</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">Curated experiences reserved exclusively for Bayard members and discerning travelers.</p>
                     </div>
                     <div className="p-8 rounded-[2rem] bg-white border border-slate-200 hover:border-brand-blue/50 shadow-xl shadow-slate-200/50 transition-all duration-500 group/card text-brand-blue">
                        <div className="w-12 h-12 rounded-2xl bg-brand-blue/5 flex items-center justify-center mb-6 group-hover/card:scale-110 transition-transform text-brand-blue">
                          <Headphones className="w-6 h-6" />
                        </div>
                        <h4 className="font-nord font-bold text-xl mb-3 text-slate-900 line-clamp-1">24/7 Concierge</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">Dedicated travel artisans supporting every step of your journey with meticulous care.</p>
                     </div>
                  </div>
               </div>

               <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-brand-blue/40 to-cyan-400/40 rounded-[4rem] opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-700" />
                  <div className="relative rounded-[3.5rem] overflow-hidden border border-slate-200 shadow-2xl aspect-[4/3]">
                     <img 
                        src="https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                        alt="Group Adventure" 
                        className="w-full h-full object-cover transition-all duration-1000 scale-110 group-hover:scale-100"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                     <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between">
                        <div className="space-y-4">
                           <div className="flex -space-x-3">
                              {[1,2,3,4,5].map(i => (
                                 <img 
                                    key={i}
                                    src={`https://i.pravatar.cc/100?u=${i+50}`} 
                                    className="w-12 h-12 rounded-full border-2 border-slate-950 ring-1 ring-white/20"
                                    alt="User"
                                 />
                              ))}
                           </div>
                           <p className="text-xs font-bold tracking-[0.3em] uppercase text-white/80">1.2k+ Global Explorers</p>
                        </div>
                        <div className="w-14 h-14 rounded-full glass-premium flex items-center justify-center group-hover:bg-brand-blue transition-colors">
                           <ArrowRight className="w-6 h-6" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </Container>
      </section>

      {/* Experience Magic Section: The Packages Grid */}
      <section className="section-padding bg-slate-50 relative overflow-hidden">
         <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
         
         <Container>
            <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-8">
               <div className="space-y-4">
                  <div className="inline-flex items-center gap-3">
                    <div className="h-px w-10 bg-brand-blue" />
                    <div className="text-brand-blue font-bold tracking-[0.4em] uppercase text-[10px]">Curated Selection</div>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-900">Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-emerald-600 italic">Magic</span></h2>
               </div>
               <p className="text-slate-600 max-w-sm md:text-right font-medium leading-relaxed text-sm md:text-base">
                  Each departure is a masterpiece of precision and luxury, featuring hand-picked sanctuaries and exclusive itineraries.
               </p>
            </div>

            {groupDeparturePackages && groupDeparturePackages.length > 0 ? (
               <>
                  {/* Mobile Carousel */}
                  <div className="md:hidden">
                     <GroupDepartureSlider groupDeparturePackages={groupDeparturePackages} />
                  </div>
                  
                  {/* Desktop/Tablet Grid */}
                  <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
                     {groupDeparturePackages.map((pkg) => (
                        <div key={pkg.id} className="h-[550px]">
                           <GroupPackageCard item={pkg} />
                        </div>
                     ))}
                  </div>
               </>
            ) : (
               <div className="py-32 text-center rounded-[3rem] border border-dashed border-white/10 bg-white/[0.01]">
                  <Compass className="w-16 h-16 text-slate-800 mx-auto mb-6 animate-pulse" />
                  <h3 className="text-2xl font-bold text-slate-400">Discovering Signature Journeys...</h3>
                  <p className="text-slate-600 mt-2">Check back soon for upcoming fixed departures.</p>
               </div>
            )}
         </Container>
      </section>

      {/* Features Grid */}
      <section className="section-padding relative bg-white">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-brand-blue/5 blur-[120px] -z-10" />
         <Container>
            <div className="grid md:grid-cols-3 gap-6">
               <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white group-hover:scale-110 transition-all duration-500 mb-6 shadow-lg shadow-brand-blue/10">
                     <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight text-slate-900">Like-Minded Community</h3>
                  <p className="text-slate-600 leading-relaxed font-medium text-sm">
                     Travel with people who share your passion for discovery. Our groups are small enough for intimacy and large enough for lifelong friendships.
                  </p>
               </div>
               
               <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white group-hover:scale-110 transition-all duration-500 mb-6 shadow-lg shadow-brand-blue/10">
                     <Leaf className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight text-slate-900">Expert Curation</h3>
                  <p className="text-slate-600 leading-relaxed font-medium text-sm">
                     Every hotel, restaurant, and activity is scouted and vetted by our travel artisans to ensure it meets the Bayard standard of excellence.
                  </p>
               </div>
               
               <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white group-hover:scale-110 transition-all duration-500 mb-6 shadow-lg shadow-amber-500/10">
                     <Star className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight text-slate-900">Zero-Stress Planning</h3>
                  <p className="text-slate-600 leading-relaxed font-medium text-sm">
                     From visa assistance to internal flights, we handle the logistics so you can focus on what matters: the journey.
                  </p>
               </div>
            </div>
         </Container>
      </section>

      <section className="section-padding pt-0">
         <InspirationSection />
      </section>
    </main>
  );
};

export default GroupDeparturePage;
