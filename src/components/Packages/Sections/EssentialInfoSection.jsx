import React from "react";
import { 
  ShieldCheck, 
  Sun, 
  Umbrella, 
  Waves, 
  MapPin, 
  AlertTriangle, 
  Wallet, 
  Briefcase, 
  Plane,
  Camera,
  HeartPulse,
  Info,
  Thermometer,
  CloudRain,
  PhoneCall,
  UserCheck
} from "lucide-react";
import Container from "@/components/ui/Container";

const EssentialInfoSection = ({ packageData }) => {
  const isThailand = packageData?.region?.toLowerCase().includes('thailand') || true; // Defaulting to Thailand info as per reference

  return (
    <div id="essential-info" className="hidden md:block relative bg-white py-12 md:py-16 overflow-hidden rounded-3xl border border-slate-100 shadow-sm mt-6 mb-6">
      {/* Decorative Blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] -ml-64 -mb-64"></div>

      <Container className="relative z-10">
        <div className="space-y-8 md:space-y-12">
      

      {/* 2. Packing Checklist */}
      <div className="bg-white rounded-[32px] p-4 md:p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 border border-slate-200 mb-4 uppercase tracking-widest">
                <Briefcase className="w-3 h-3" /> Smart Packing
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">Traveler's <span className="text-brand-blue">Checklist</span></h3>
            </div>
            <p className="text-slate-500 text-sm max-w-md font-medium">Essentials to ensure you're prepared for the tropical climate and cultural visits.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Essentials */}
            <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 hover:bg-slate-50 transition-colors">
              <h4 className="text-slate-900 font-bold text-sm mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-blue" /> Essentials
              </h4>
              <ul className="space-y-3">
                {['Passport & Visas', 'Travel Insurance', 'Local SIM/E-sim', 'Power Bank'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-slate-600 text-xs font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/30" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Clothing */}
            <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 hover:bg-slate-50 transition-colors">
              <h4 className="text-slate-900 font-bold text-sm mb-4 flex items-center gap-2">
                <Umbrella className="w-4 h-4 text-emerald-500" /> Clothing
              </h4>
              <ul className="space-y-3">
                {['Breathable Linens', 'Comfortable Sneakers', 'Modest Temple Wear', 'Swimwear'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-slate-600 text-xs font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/30" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Tech & Health */}
            <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 hover:bg-slate-50 transition-colors">
              <h4 className="text-slate-900 font-bold text-sm mb-4 flex items-center gap-2">
                <Camera className="w-4 h-4 text-blue-500" /> Extras
              </h4>
              <ul className="space-y-3">
                {['High SPF Sunscreen', 'Insect Repellent', 'Universal Adapter', 'Dry Bag'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-slate-600 text-xs font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Logistics & Money */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logistics & Safety */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-orange-500" /> Logistics & Safety
          </h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                <Waves className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Water & Dining</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">Drink bottled water only. Street food is generally safe in busy areas but choose freshly cooked meals.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                <MapPin className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Temple Etiquette</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">Remove shoes before entry. Dress modestly (knees and shoulders covered). Never touch Buddha images.</p>
              </div>
            </div>
            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
               <div className="flex items-center gap-3 text-orange-700 font-bold text-xs mb-2">
                 <PhoneCall className="w-4 h-4" /> Help Is Close
               </div>
               <p className="text-[10px] text-orange-600 font-semibold leading-relaxed">Tourist Police: 1155. Save your hotel's contact details and keep a digital copy of your passport.</p>
            </div>
          </div>
        </div>

        {/* Money & Expenses */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Wallet className="w-6 h-6 text-emerald-600" /> Money & Expenses
          </h3>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Wallet className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Local Currency</h4>
                  <p className="text-xs text-slate-500 font-medium">1 USD ≈ 33-36 THB</p>
                </div>
              </div>
              <span className="text-lg font-bold text-emerald-900">Thai Baht (฿ THB)</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                  <Briefcase className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Daily Budget</h4>
                  <p className="text-xs text-slate-500 font-medium">Per person estimate</p>
                </div>
              </div>
              <span className="text-lg font-bold text-slate-900">$50-100 <span className="text-xs font-medium text-slate-500">/day</span></span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                  <HeartPulse className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Tipping</h4>
                  <p className="text-xs text-slate-500 font-medium">Service gratuity</p>
                </div>
              </div>
              <span className="text-lg font-bold text-slate-900">10% <span className="text-xs font-medium text-slate-500">Appreciated</span></span>
            </div>
          </div>
        </div>
      </div>

        </div>
      </Container>
    </div>
  );
};

export default EssentialInfoSection;
