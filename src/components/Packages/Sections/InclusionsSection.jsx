import React, { useState, useEffect } from "react";
import { 
  Info, 
  Calendar,
  Plane, 
  CheckCircle2, 
  Lightbulb, 
  ShieldAlert,
  ListChecks,
  AlertCircle,
  FileText,
  ShieldCheck,
  Umbrella,
  Camera,
  AlertTriangle,
  Waves,
  MapPin,
  PhoneCall,
  Wallet,
  Briefcase,
  Building,
  Car,
  FileCheck,
  AlertOctagon,
  Map as MapIcon,
  X,
  UserCheck,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const InclusionsSection = ({ packageData }) => {
  const regionName = packageData?.regionName || packageData?.region || "the destination";
  // Full Static Data from User Request
  // Dynamically derive TRAVEL_GUIDE_DATA from packageData.sections
  const getDynamicTravelGuideData = () => {
    const sections = packageData?.sections || [];
    
    // 1. Important Notes
    const importantNotesSection = sections.find(s => s.id === "important_notes");
    const dynamicImportantNotes = importantNotesSection?.groups?.map(group => ({
      title: group.title,
      icon: group.title.toLowerCase().includes("hotel") ? "Building" :
            group.title.toLowerCase().includes("transfer") || group.title.toLowerCase().includes("transport") ? "Car" :
            group.title.toLowerCase().includes("tour") || group.title.toLowerCase().includes("activity") ? "Map" :
            group.title.toLowerCase().includes("visa") || group.title.toLowerCase().includes("requirement") ? "FileCheck" : "AlertOctagon",
      items: group.items.map(item => item.replace(/^\\item\s*/, '').replace(/\\/g, "").replace(/\*\*(.*?)\*\*/g, '$1').replace(/^["'\s]+|["'\s]+,?$/g, "").trim())
    })) || [
      {
        title: "Hotel Policies",
        icon: "Building",
        items: [
          "Check-in Time: 3:00 PM (Early check-in subject to availability and may incur additional charges)",
          "Check-out Time: 11:00 AM (Late check-out charges apply after this time)",
          "Room Cancellation: Rooms must be cancelled 48 hours prior to check-in date",
          "Damage Policy: Guests are responsible for any damage to hotel property beyond normal wear and tear",
          "Key Policy: Hotel room keys must be returned at checkout; replacement fees apply if lost"
        ]
      },
      {
        title: "Transfer & Transportation",
        icon: "Car",
        items: [
          "Airport Transfer: Complimentary pickup from airport. If missed, additional charges apply",
          "Vehicle: Air-conditioned private vehicle provided; shared transfers not available",
          "Driver & Route: Professional driver and predetermined routes; any deviations incur extra charges",
          "Vehicle Capacity: Capacity limited; larger groups may require multiple vehicles",
          "Luggage: Reasonable luggage allowed; excess baggage may incur surcharge"
        ]
      },
      {
        title: "Tour & Activity Operations",
        icon: "Map",
        items: [
          "Guide Availability: English-speaking guide available for all scheduled tours",
          "Activity Timing: Tours operate on fixed schedules; delays may result in tour modifications",
          "Weather Conditions: Tours subject to cancellation or rescheduling due to severe weather",
          "Museum Hours: Museum visits depend on operational hours; some sites may close on specific days",
          "Photography: Commercial photography not permitted at certain historical sites",
          "Group Size: Tours operate for minimum 2 guests; single travelers may join group tours"
        ]
      },
      {
        title: "Travel Requirements & Restrictions",
        icon: "FileCheck",
        items: [
          "Visa: E-visa required for Indian passport holders (process separately; not included in package)",
          "Passport Validity: Minimum 6 months validity required at time of travel",
          "Vaccination: As per local government requirements at time of travel",
          "Currency: Local currency is preferred; USD also accepted in major establishments",
          "Travel Insurance: Strongly recommended but not mandatory",
          "Show Money: Visitors should carry minimum USD 250-500 equivalent in cash or card"
        ]
      },
      {
        title: "Cancellation & Modification Policy",
        icon: "AlertOctagon",
        items: [
          "Package Cancellation: Subject to company's standard cancellation policy",
          "Refund Timeline: Refunds processed within 15-21 business days of cancellation",
          "Force Majeure: No refunds for cancellations due to natural disasters, political situations, or pandemic",
          "Itinerary Changes: Company reserves right to modify itinerary due to unavoidable circumstances",
          "Price Changes: Prices valid only at time of booking; currency fluctuations may apply"
        ]
      }
    ];

    // 2. Points to Remember
    const pointsSection = sections.find(s => s.id === "points_to_remember");
    const dynamicPointsToRemember = pointsSection?.items?.map(item => item.replace(/\\/g, "").replace(/^["'\s]+|["'\s]+,?$/g, "").trim()) || [
      "Dress Code: Wear comfortable walking shoes; modest clothing recommended for religious sites",
      "Weather Preparation: Pack light clothing for summer (April-October); warm layers for early mornings/evenings in mountain areas",
      `Sun Protection: Carry sunscreen, hat, and sunglasses – UV exposure is high in ${regionName}`,
      "Hydration: Drink bottled water regularly; one bottle provided daily but buy extras for activities",
      "Cash & Cards: Carry cash (Manat or USD) for small purchases; major hotels accept credit cards",
      "Language: English spoken in tourist areas; learn basic phrases for local interactions",
      "Photography: Ask permission before photographing local people; respect cultural sensitivity",
      "Punctuality: Be ready 15 minutes before scheduled pickups; delays impact group schedules",
      "Physical Fitness: Some activities involve walking on uneven terrain; reasonable fitness required",
      "Dietary Restrictions: Inform tour operator in advance for special meal requirements",
      "Mobile Network: Local SIM cards available; international roaming may be expensive",
      "Emergency Contacts: Keep hotel address and guide's phone number with you always",
      "Valuables: Secure passports, money, and jewelry in hotel safe",
      "Bargaining: Accepted at bazaars; haggling is part of local culture but be respectful",
      "Tipping: Not mandatory but appreciated; 5-10% for good service is customary"
    ];

    // 3. Travel Preparation Guide
    const prepSection = sections.find(s => s.id === "travel_preparation_guide");
    const dynamicTravelPrep = prepSection ? {
      beforeDeparture: {
        title: prepSection.subsections[0].title,
        sections: prepSection.subsections[0].groups.map(g => ({ subtitle: g.title, items: g.items.map(item => item.replace(/\\/g, "").replace(/^["'\s]+|["'\s]+,?$/g, "").trim()) }))
      },
      uponArrival: {
        title: prepSection.subsections[1].title,
        sections: prepSection.subsections[1].groups.map(g => ({ subtitle: g.title, items: g.items.map(item => item.replace(/\\/g, "").replace(/^["'\s]+|["'\s]+,?$/g, "").trim()) }))
      },
      duringTravel: {
        title: prepSection.subsections[2].title,
        sections: prepSection.subsections[2].groups.map(g => ({ subtitle: g.title, items: g.items.map(item => item.replace(/\\/g, "").replace(/^["'\s]+|["'\s]+,?$/g, "").trim()) }))
      },
      usefulInfo: {
        title: prepSection.subsections[3].title,
        sections: prepSection.subsections[3].groups.map(g => ({ subtitle: g.title, items: g.items.map(item => item.replace(/\\/g, "").replace(/^["'\s]+|["'\s]+,?$/g, "").trim()) }))
      }
    } : {
      beforeDeparture: {
        title: "Before Departure",
        sections: [
          { subtitle: "Documentation", items: ["Ensure passport validity of minimum 6 months beyond travel dates", "Apply for E-visa or check visa requirements for your nationality", "Make two copies of passport bio-page; keep one separately", "Check email for visa confirmation", "Print flight itinerary and hotel booking confirmation"] },
          { subtitle: "Health & Vaccinations", items: ["Consult doctor 4-6 weeks before travel for recommended vaccinations", "Carry prescription medications in original containers with pharmacy label", "Purchase travel insurance covering medical emergencies and trip cancellations", "Pack small medical kit: pain reliever, cold medicine, antacid, first-aid supplies", `Check if any vaccinations are currently required for ${regionName} entry`] },
          { subtitle: "Packing Essentials", items: ["Comfortable walking shoes (broken in before travel)", "Lightweight, breathable clothing for daytime", "Warm jacket or sweater for evenings and mountains", "Sturdy backpack for day trips", "Sunscreen SPF 50+, sunglasses, wide-brimmed hat", "Toiletries, personal hygiene items, and medications", "Phone charger and universal power adapter", "Small notebook and pen for notes"] },
          { subtitle: "Financial Preparation", items: ["Notify bank of travel dates to avoid card blocks", "Exchange some local currency before departure", "Carry mix of cash (USD/Local) and credit/debit cards", "Keep financial documents in separate secure location", "Budget for meals, shopping, and tips accordingly"] }
        ]
      },
      uponArrival: {
        title: "Upon Arrival",
        sections: [
          { subtitle: "Airport to Hotel", items: ["Collect luggage and proceed to arrivals area", "Look for tour operator representative with signboard", "Share contact number if not yet connected", "Confirm hotel address and check-in time", "Transfer to hotel takes 30-45 minutes from airport"] },
          { subtitle: "Hotel Check-In", items: ["Register at reception with passport", "Collect room key and hotel information card", "Ask for emergency contact numbers", "Locate emergency exits and fire safety information", "Confirm breakfast timings and tour pickup times"] },
          { subtitle: "First Evening", items: ["Rest and acclimatize after travel", "Explore immediate hotel vicinity if time permits", "Have dinner at hotel or nearby restaurant", "Confirm next day's tour departure time", "Set alarm for breakfast and ready documents"] }
        ]
      },
      duringTravel: {
        title: "During Travel",
        sections: [
          { subtitle: "Daily Routine", items: ["Have breakfast by 7:30 AM before tour pickup", "Wear comfortable walking shoes daily", "Carry backpack with water, snacks, and medications", "Apply sunscreen before each outing", "Stay hydrated throughout the day", "Follow guide's instructions for safety at archaeological sites"] },
          { subtitle: "Sightseeing Tips", items: ["Arrive at pickup points 10 minutes early", "Keep entrance tickets safe for museum exits", "Photography is allowed at most sites; check restrictions beforehand", "Remove shoes when entering religious spaces", "Respect \"No Photography\" signs at certain locations", "Wear long pants/skirts and covered shoulders in temples and churches"] },
          { subtitle: "Local Interaction", items: ["Greet locals with \"Salam\" (hello) – shows respect", "Refuse with \"Xeyr\" (no) politely if needed", "Use right hand when giving/receiving items", "Photography of local people requires permission", "Bargaining at bazaars is expected but be fair"] },
          { subtitle: "Health & Safety", items: ["Avoid drinking tap water; use provided bottled water", "Eat at hotel or recommended restaurants", "Keep medications accessible in day bag", "Inform guide immediately if unwell", "Note hotel location and contact details always", "Stay in well-lit areas during evening walks"] }
        ]
      },
      usefulInfo: {
        title: "Useful Information",
        sections: [
          { subtitle: "Currency & Money", items: ["1 USD ≈ 1.7 AZN (rates change; check current rate)", "ATMs widely available; withdraw cash with passport copy", "Credit cards accepted in restaurants, hotels, and shops", "Avoid exchanging money on streets"] },
          { subtitle: "Communication", items: ["Local SIM cards available at airport", "Internet cafes present in major cities", "Hotel provides free Wi-Fi"] },
          { subtitle: "Time & Climate", items: [`Timezone: Check current timezone for ${regionName}`, "Best seasons usually include spring and autumn", "Check local weather forecast before travel"] },
          { subtitle: "Cultural Etiquette", items: [`Respect local traditions and dress codes in ${regionName}`, "Public displays of affection may not be appreciated in some areas", "Loud conversations discouraged in public spaces", "Hospitality highly valued; respect local customs", "Refuse initial offers politely but graciously"] },
          { subtitle: "Emergency Contacts", items: ["Note local police and ambulance numbers", "Tourist Police: Contact local authorities", "Your Embassy Contact: Save in phone immediately after arrival"] }
        ]
      }
    };

    return {
      importantNotes: dynamicImportantNotes,
      pointsToRemember: dynamicPointsToRemember,
      travelPrep: dynamicTravelPrep
    };
  };

  const TRAVEL_GUIDE_DATA = getDynamicTravelGuideData();

  const [isIncludesExpanded, setIsIncludesExpanded] = useState(false);
  const [isExcludesExpanded, setIsExcludesExpanded] = useState(false);
  const [isPointsExpanded, setIsPointsExpanded] = useState(false);
  const [prepTab, setPrepTab] = useState("beforeDeparture");
  const [activePointsTab, setActivePointsTab] = useState('preparation');
  const [expandedPrepSections, setExpandedPrepSections] = useState({ "beforeDeparture-0": true }); // Tracking Travel Prep subsections

  useEffect(() => {
    // Open the first section of a tab by default when switching tabs
    const firstKey = `${prepTab}-0`;
    setExpandedPrepSections(prev => ({ ...prev, [firstKey]: true }));
  }, [prepTab]);

  const togglePrepSection = (tabId, sectionIdx) => {
    const key = `${tabId}-${sectionIdx}`;
    setExpandedPrepSections(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  const shortenNoteTabLabel = (label) => {
    if (label.toLowerCase().includes("hotel")) return "Hotels";
    if (label.toLowerCase().includes("transfer") || label.toLowerCase().includes("transport")) return "Transfers";
    if (label.toLowerCase().includes("tour") || label.toLowerCase().includes("activity")) return "Activities";
    if (label.toLowerCase().includes("visa") || label.toLowerCase().includes("requirement")) return "Requirements";
    if (label.toLowerCase().includes("cancellation") || label.toLowerCase().includes("policy")) return "Policies";
    return label.split(' ')[0];
  };

  const tabs = [
    { id: "notes", label: "Notes", icon: Info },
    { id: "points", label: "Points", icon: ListChecks },
    { id: "checklist", label: "Checklist", icon: Briefcase },
    { id: "logistics", label: "Safety", icon: AlertTriangle },
    { id: "money", label: "Money", icon: Wallet },
    { id: "tip", label: "Pro Tip", icon: Lightbulb },
    { id: "cancellation", label: "Policy", icon: ShieldAlert },
    { id: "terms", label: "Terms", icon: FileText },
  ];


  // const renderPoints = () => {
  //   const points = packageData?.points_to_remember || packageData?.points || [
  //     "Comfortable walking shoes are highly recommended for sightseeing.",
  //     "Carry appropriate clothing for the season and specific region requirements.",
  //     "Respect local customs, traditions, and dress codes at religious sites.",
  //     "Maintain digital and physical copies of all your travel documents."
  //   ];
  //   const displayPoints = isPointsExpanded ? points : points.slice(0, 6);

  //   return (
  //     <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-100 hover:border-brand-blue/20 hover:shadow-md transition-all duration-300 h-full">
  //       <div className="flex items-center gap-3 mb-4">
  //         <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center">
  //           <ListChecks className="w-5 h-5 text-brand-blue" />
  //         </div>
  //         <h4 className="text-lg font-bold text-slate-900 tracking-tight">Points to <span className="text-brand-blue">Remember</span></h4>
  //       </div>
  //       <ul className="space-y-3">
  //         {displayPoints.map((point, idx) => (
  //           <li key={idx} className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/point text-left">
  //             <CheckCircle2 className="w-4 h-4 text-brand-blue/50 mt-0.5 group-hover/point:text-brand-blue transition-colors flex-shrink-0" />
  //             <span>{point}</span>
  //           </li>
  //         ))}
  //       </ul>
  //       {points.length > 6 && (
  //         <button
  //           onClick={() => setIsPointsExpanded(!isPointsExpanded)}
  //           className="w-full mt-4 py-2 text-xs font-bold text-brand-blue hover:text-blue-700 transition-colors flex items-center justify-center gap-1 group/btn"
  //         >
  //           {isPointsExpanded ? 'Show Less' : `Read More (${points.length - 6} more)`}
  //           <svg 
  //             className={`w-3 h-3 transition-transform duration-300 ${isPointsExpanded ? 'rotate-180' : ''}`} 
  //             fill="none" viewBox="0 0 24 24" stroke="currentColor"
  //           >
  //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  //           </svg>
  //         </button>
  //       )}
  //     </div>
  //   );
  // };

  const renderProTip = () => {
    const tips = packageData?.proTips || [
      "Book at least 45 days in advance to secure the best rates and premium room views. Contact our experts for special surprises!"
    ];
    // Show one random tip or the first one
    const tip = tips[Math.floor(Math.random() * tips.length)];

    return (
      <div className="bg-gradient-to-br from-brand-blue/5 to-transparent border border-brand-blue/10 rounded-3xl p-6 relative overflow-hidden group h-full">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-blue/5 rounded-full blur-2xl group-hover:bg-brand-blue/10 transition-all duration-500" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-white shadow-sm border border-brand-blue/10 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-brand-blue" />
            </div>
            <h6 className="text-brand-blue font-bold tracking-tight">Pro Tip</h6>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed font-medium">
            {tip}
          </p>
        </div>
      </div>
    );
  };

  const renderCancellation = () => {
    const policy = packageData?.cancellationPolicy || {
      note: "Cancellation rules may vary by region. Please read full terms at checkout.",
      tiers: [
        { period: "30+ Days Before Departure", refund: "Full refund minus minimal transaction fee." },
        { period: "15-30 Days Before Departure", refund: "50% refund of the total package cost." },
        { period: "Less than 15 Days Before Departure", refund: "No refund possible due to vendor commitments." }
      ]
    };

    return (
      <div className="bg-rose-50/50 border border-rose-100 rounded-3xl p-6 group hover:shadow-md transition-all duration-300 shadow-sm shadow-rose-100/30 h-full">
        <div className="flex items-center gap-3 mb-4">
           <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
             <ShieldAlert className="w-5 h-5 text-rose-500" />
           </div>
           <h4 className="text-lg font-bold text-slate-900 tracking-tight">Cancellation <span className="text-rose-500">Policy</span></h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {policy.tiers?.map((tier, idx) => (
            <div key={idx} className="flex gap-3 p-3 bg-white/60 rounded-2xl border border-rose-50/50">
               <span className="text-rose-500 font-bold text-xs shrink-0 min-w-16">{tier.period}</span>
               <p className="text-[12px] text-slate-600 font-medium">{tier.refund}</p>
            </div>
          ))}
          <div className="flex gap-3 p-3 bg-rose-500 rounded-2xl border border-rose-100 shadow-sm shadow-rose-200/50 sm:col-span-2">
             <AlertCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
             <p className="text-[11px] text-white font-bold leading-tight italic">{policy.note}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderChecklist = () => {
    const packing = packageData?.travelPreparationGuide?.whatToPack || {
      essentials: ['Passport & Visas', 'Travel Insurance', 'Local SIM/E-sim', 'Power Bank'],
      clothing: ['Breathable Linens', 'Comfortable Sneakers', 'Modest Temple Wear', 'Swimwear'],
      extras: ['High SPF Sunscreen', 'Insect Repellent', 'Universal Adapter', 'Dry Bag']
    };

    const timeline = packageData?.travelPreparationGuide?.preDepartureTimeline || [
      { timeframe: "2 Weeks Before", task: "Check Passport Validity" },
      { timeframe: "1 Week Before", task: "Notify Bank of Travel" },
      { timeframe: "3 Days Before", task: "Confirm All Bookings" },
      { timeframe: "1 Day Before", task: "Final Luggage Check" }
    ];

    return (
      <div id="highlights-section" className="md:bg-white md:rounded-3xl p-0 md:p-[15px] md:py-6 md:px-8 border border-slate-100 shadow-sm scroll-mt-32">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="relative z-10">
          <div className="flex flex-col gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 border border-slate-200 w-fit uppercase tracking-widest">
              <Briefcase className="w-3 h-3" /> Smart Packing
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Travel Preparation <span className="text-brand-blue">Guide</span></h3>
            <p className="text-slate-500 text-xs font-medium">Everything you need before departure</p>
          </div>

          {/* Packing Checklist */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-brand-blue" /> What to Pack
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {packing.essentials?.length > 0 && (
                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4">
                  <h5 className="text-slate-900 font-bold text-xs mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" /> Essentials
                  </h5>
                  <ul className="space-y-2">
                    {packing.essentials.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-slate-600 text-[11px] font-semibold text-left">
                        <div className="w-1 h-1 rounded-full bg-brand-blue/30" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {packing.clothing?.length > 0 && (
                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4">
                  <h5 className="text-slate-900 font-bold text-xs mb-3 flex items-center gap-2">
                    <Umbrella className="w-3.5 h-3.5 text-emerald-500" /> Clothing
                  </h5>
                  <ul className="space-y-2">
                    {packing.clothing.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-slate-600 text-[11px] font-semibold text-left">
                        <div className="w-1 h-1 rounded-full bg-emerald-500/30" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {packing.extras?.length > 0 && (
                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4">
                  <h5 className="text-slate-900 font-bold text-xs mb-3 flex items-center gap-2">
                    <Camera className="w-3.5 h-3.5 text-blue-500" /> Extras
                  </h5>
                  <ul className="space-y-2">
                    {packing.extras.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-slate-600 text-[11px] font-semibold text-left">
                        <div className="w-1 h-1 rounded-full bg-blue-500/30" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Pre-Departure Timeline */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-brand-blue" /> Pre-Departure Timeline
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {timeline.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{item.timeframe || item.time}</span>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">{item.task}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderLogistics = () => {
    const logistics = packageData?.logisticsAndSafety || [
      {
        category: "Safety & Ethics",
        description: "Always follow local laws and respect community guidelines. Keep emergency contact numbers and hotel addresses handy at all times."
      }
    ];

    return (
      <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-100 hover:border-orange-500/20 hover:shadow-md transition-all duration-300 h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 tracking-tight">Logistics & <span className="text-orange-500">Safety</span></h4>
        </div>
        <ul className="space-y-3">
          {logistics.map((item, idx) => (
            <li key={idx} className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/note text-left">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/note:bg-orange-500 transition-colors flex-shrink-0" />
              <span><span className="font-bold text-slate-700">{item.category}:</span> {item.description}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const getCurrencyInfo = (region) => {
    const currencies = {
        'thailand': { name: 'Thai Baht', symbol: '฿', rate: '1 USD ≈ 33-36 THB' },
        'vietnam': { name: 'Vietnamese Dong', symbol: '₫', rate: '1 USD ≈ 24,000-25,000 VND' },
        'bali': { name: 'Indonesian Rupiah', symbol: 'Rp', rate: '1 USD ≈ 15,000-16,000 IDR' },
        'dubai': { name: 'UAE Dirham', symbol: 'AED', rate: '1 USD ≈ 3.67 AED' },
        'singapore': { name: 'Singapore Dollar', symbol: 'S$', rate: '1 USD ≈ 1.34 SGD' },
        'malaysia': { name: 'Malaysian Ringgit', symbol: 'RM', rate: '1 USD ≈ 4.70 MYR' }
    };
    return currencies[region?.toLowerCase()] || { name: 'Local Currency', symbol: '', rate: 'Check current exchange rates before travel' };
  };

  const renderMoney = () => {
    const moneyData = packageData?.moneyAndExpenses || {
      localCurrency: { name: 'Local Currency', symbol: '', exchangeRate: 'Check current rates' },
      tips: [
        { label: "Daily Budget", description: "Suggest budgeting for additional meals and personal expenses." },
        { label: "Tipping", description: "Tipping is appreciated for good service." }
      ]
    };

    return (
      <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-100 hover:border-emerald-600/20 hover:shadow-md transition-all duration-300 h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-emerald-600/10 rounded-xl flex items-center justify-center">
            <Wallet className="w-5 h-5 text-emerald-600" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 tracking-tight">Money & <span className="text-emerald-600">Expenses</span></h4>
        </div>
        <ul className="space-y-3">
          <li className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/note text-left">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/note:bg-emerald-600 transition-colors flex-shrink-0" />
            <span><span className="font-bold text-slate-700">Local Currency:</span> {moneyData.localCurrency?.name} ({moneyData.localCurrency?.symbol}). {moneyData.localCurrency?.exchangeRate}</span>
          </li>
          {moneyData.tips?.map((tip, idx) => (
            <li key={idx} className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/note text-left">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/note:bg-emerald-600 transition-colors flex-shrink-0" />
              <span><span className="font-bold text-slate-700">{tip.label}:</span> {tip.description}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };



  const renderTerms = () => {
    const terms = packageData?.termsAndConditions || [
      { category: "Booking & Payment", description: "Payment in full is required at booking confirmation." },
      { category: "Itinerary Changes", description: "Tour operator reserves the right to modify itinerary due to weather." }
    ];

    return (
      <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-100 hover:border-slate-900/20 hover:shadow-md transition-all duration-300 h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-slate-900/10 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-slate-900" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 tracking-tight">Terms & <span className="text-slate-500">Conditions</span></h4>
        </div>
        
        <ul className="space-y-3">
          {terms.map((term, idx) => (
            <li key={idx} className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/note text-left">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/note:bg-slate-900 transition-colors flex-shrink-0" />
              <span><span className="font-bold text-slate-700">{term.category}:</span> {term.description}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div id="inclusions" className="scroll-mt-48 relative">
      {/* Standard Header - Moved Outside of Card */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-2 md:mb-4 leading-tight">
          Package <span className="text-brand-blue">Inclusions</span>
        </h2>
        <p className="text-slate-500 text-sm md:text-xl font-medium">Everything you need for a seamless journey</p>
      </div>
      
      <div className="md:bg-white md:rounded-[2rem] p-0 md:p-8 md:border md:border-slate-100 md:shadow-sm overflow-hidden relative">
        <div className="absolute right-0 top-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Inclusions Card */}
        <div className="border border-blue-100 rounded-3xl overflow-hidden shadow-sm">
          {/* Header */}
          <div className="bg-blue-700 py-3 px-5 flex items-center gap-4">
             <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
               <CheckCircle2 className="w-5 h-5 text-white" />
             </div>
             <div>
               <h5 className="text-lg font-bold text-white tracking-tight leading-tight">What's Included</h5>
               <p className="text-blue-100/80 text-[10px] font-bold uppercase tracking-widest">{packageData?.includes?.length || 0} benefits included</p>
             </div>
          </div>
          
          {/* List */}
          <div className="p-4 space-y-3 bg-white">
            {(isIncludesExpanded ? packageData?.includes : packageData?.includes?.slice(0, 8))?.map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-slate-800 text-sm md:text-base font-bold leading-relaxed">
                  {typeof item === "string" ? item : item.title}
                </span>
              </div>
            ))}

            {packageData?.includes?.length > 8 && (
              <div className="pt-2 px-2">
                <button
                  onClick={() => setIsIncludesExpanded(!isIncludesExpanded)}
                  className="w-full py-3 text-blue-600 font-bold text-xs uppercase tracking-widest hover:bg-blue-50 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {isIncludesExpanded ? 'Collapse' : `View All (${packageData.includes.length})`}
                  <svg className={`w-4 h-4 transition-transform ${isIncludesExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Exclusions Card */}
        <div className="border border-rose-100 rounded-3xl overflow-hidden shadow-sm">
          {/* Header */}
          <div className="bg-rose-500 py-3 px-5 flex items-center gap-4">
             <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
               <X className="w-5 h-5 text-white" />
             </div>
             <div>
               <h5 className="text-lg font-bold text-white tracking-tight leading-tight">Exclusions</h5>
               <p className="text-rose-100/80 text-[10px] font-bold uppercase tracking-widest">Items you'll need to arrange</p>
             </div>
          </div>
          
          {/* List */}
          <div className="p-4 space-y-3 bg-white">
            {(isExcludesExpanded ? packageData.excludes : packageData.excludes.slice(0, 8)).map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 bg-rose-50/30 rounded-2xl border border-rose-100/50"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center mt-0.5">
                  <X className="w-3.5 h-3.5 text-rose-500" />
                </div>
                <span className="text-slate-700 text-sm md:text-base font-bold leading-relaxed">
                  {typeof item === "string" ? item : item.title}
                </span>
              </div>
            ))}

            {packageData.excludes.length > 8 && (
              <div className="pt-2 px-2">
                <button
                  onClick={() => setIsExcludesExpanded(!isExcludesExpanded)}
                  className="w-full py-3 text-rose-500 font-bold text-xs uppercase tracking-widest hover:bg-rose-50 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {isExcludesExpanded ? 'Collapse' : `View All (${packageData.excludes.length})`}
                  <svg className={`w-4 h-4 transition-transform ${isExcludesExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      

      {/* Mobile Tabs Navigation (REMOVED - Using unified vertical layout) */}
      {/* 
      <div className="md:hidden mt-4 mb-3">
        ...
      </div>
      */}
      <div className="mt-8 space-y-8">
        {/* 3. TRAVEL PREPARATION GUIDE - TABS ON MOBILE */}
        {/* <div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6 flex items-center gap-3">
             <span className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
               <Briefcase className="w-5 h-5 text-orange-500" />
             </span>
             Travel Preparation <span className="text-orange-500">Guide</span>
          </h3>

          {/* Mobile Tabs *\/}
          <div className="md:hidden mb-4">
            <div className="flex flex-wrap gap-2 pb-2">
              {[
                { id: 'beforeDeparture', label: 'Before', icon: Calendar },
                { id: 'uponArrival', label: 'Arrival', icon: Plane },
                { id: 'duringTravel', label: 'Stay', icon: MapIcon },
                { id: 'usefulInfo', label: 'Info', icon: Info }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = prepTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setPrepTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
                      isActive
                        ? 'bg-brand-blue text-white shadow-md border-brand-blue'
                        : 'bg-blue-50/50 text-slate-600 border-brand-blue/30 hover:bg-blue-100/50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Active Tab Content - Mobile - Accordion Style *\/}
            <div className="pt-4 border-t border-slate-100">
              <div className="space-y-3">
                {TRAVEL_GUIDE_DATA.travelPrep[prepTab].sections.map((sec, idx) => {
                  const sectionKey = `${prepTab}-${idx}`;
                  const isExpanded = expandedPrepSections[sectionKey];
                  
                  return (
                    <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/50">
                      <button 
                        onClick={() => togglePrepSection(prepTab, idx)}
                        className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-slate-100/50"
                      >
                        <h5 className="font-bold text-slate-900 text-[11px] uppercase tracking-widest flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full transition-colors ${isExpanded ? 'bg-orange-500' : 'bg-slate-300'}`}></div>
                          {sec.subtitle}
                        </h5>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-orange-500' : ''}`} />
                      </button>
                      
                      {isExpanded && (
                        <div className="px-4 pb-4 animate-in fade-in slide-in-from-top-1 duration-300">
                          <ul className="space-y-3 ml-2 border-l-2 border-orange-100 pl-4 py-1">
                            {sec.items.map((item, i) => (
                              <li key={i} className="text-sm text-slate-600 flex items-start gap-3 leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Desktop Tabs *\/}
          <div className="hidden md:block">
            {/* Tabs Header *\/}
            <div className="flex border-b border-slate-200 mb-6 overflow-x-auto no-scrollbar">
               {[
                 { id: 'beforeDeparture', label: 'Before Departure', icon: Calendar },
                 { id: 'uponArrival', label: 'Upon Arrival', icon: Plane },
                 { id: 'duringTravel', label: 'During Your Stay', icon: MapIcon },
                 { id: 'usefulInfo', label: 'Good to Know', icon: AlertOctagon }
               ].map((tab) => (
                 <button
                   key={tab.id}
                   onClick={() => setPrepTab(tab.id)}
                   className={`flex items-center gap-2 px-6 py-4 border-b-2 text-base font-bold whitespace-nowrap transition-colors ${
                     prepTab === tab.id
                       ? "border-brand-blue text-brand-blue"
                       : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                   }`}
                 >
                   <tab.icon className="w-4 h-4" />
                   {tab.label}
                 </button>
               ))}
            </div>

            {/* Tab Content - No Boxes *\/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 animate-in fade-in duration-300">
               {TRAVEL_GUIDE_DATA.travelPrep[prepTab].sections.map((sec, idx) => {
                  const sectionKey = `${prepTab}-${idx}`;
                  const isExpanded = expandedPrepSections[sectionKey];
                  const visibleItems = isExpanded ? sec.items : sec.items.slice(0, 4);

                  return (
                    <div key={idx} className="space-y-4">
                       <h5 className="font-bold text-slate-900 text-base flex items-center gap-3 border-l-4 border-brand-blue pl-4">
                          {sec.subtitle}
                       </h5>
                       <ul className="space-y-4 ml-7">
                          {visibleItems.map((item, i) => (
                             <li key={i} className="text-sm md:text-base text-slate-600 flex items-start gap-4 leading-relaxed hover:text-slate-900 transition-colors">
                                <span className="w-2 h-2 rounded-full bg-slate-200 mt-2 shrink-0" />
                                <span>{item}</span>
                             </li>
                          ))}
                       </ul>
                       {sec.items.length > 4 && (
                          <button
                            onClick={() => togglePrepSection(prepTab, idx)}
                            className="ml-7 mt-2 text-[10px] font-bold uppercase tracking-widest text-brand-blue flex items-center gap-1.5"
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="w-3 h-3" /> <span>Show Less</span>
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-3 h-3" /> <span>Read More ({sec.items.length - 4})</span>
                              </>
                            )}
                          </button>
                       )}
                    </div>
                  );
               })}
            </div>
          </div>
        </div> */}


        {/* 2. POINTS TO REMEMBER - TABS ON MOBILE */}
        {/* <div id="points-to-remember">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6 flex items-center gap-3">
             <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
               <ListChecks className="w-5 h-5 text-brand-blue" />
             </span>
             Points to <span className="text-brand-blue">Remember</span>
          </h3>

          {/* Mobile Tabs *\/}
          <div className="md:hidden mb-4">
            <div className="flex flex-wrap gap-2 pb-2">
              {[
                { id: 'preparation', label: 'Preparation', icon: Briefcase },
                { id: 'safety', label: 'Safety', icon: ShieldCheck },
                { id: 'etiquette', label: 'Etiquette', icon: AlertCircle },
                { id: 'practical', label: 'Practical', icon: Lightbulb }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activePointsTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActivePointsTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
                      isActive
                        ? 'bg-brand-blue text-white shadow-md border-brand-blue'
                        : 'bg-blue-50/50 text-slate-600 border-brand-blue/30 hover:bg-blue-100/50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Active Tab Content - Mobile - No Boxes *\/}
            <div className="pt-4 border-t border-slate-100">
              <div className="space-y-4">
                {TRAVEL_GUIDE_DATA.pointsToRemember
                  .filter(point => {
                    const lowerPoint = point.toLowerCase();
                    if (activePointsTab === 'preparation') {
                      return lowerPoint.includes('dress') || lowerPoint.includes('weather') || 
                             lowerPoint.includes('sun') || lowerPoint.includes('pack') ||
                             lowerPoint.includes('fitness');
                    } else if (activePointsTab === 'safety') {
                      return lowerPoint.includes('hydration') || lowerPoint.includes('valuables') || 
                             lowerPoint.includes('emergency') || lowerPoint.includes('contact');
                    } else if (activePointsTab === 'etiquette') {
                      return lowerPoint.includes('language') || lowerPoint.includes('photography') || 
                             lowerPoint.includes('bargaining') || lowerPoint.includes('tipping');
                    } else {
                      return lowerPoint.includes('cash') || lowerPoint.includes('punctuality') || 
                             lowerPoint.includes('dietary') || lowerPoint.includes('mobile') ||
                             lowerPoint.includes('network');
                    }
                  })
                  .map((point, idx) => {
                    const [title, desc] = point.split(": ");
                    return (
                      <div key={idx} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-brand-blue/50 mt-0.5 flex-shrink-0" />
                        <span>
                          {desc ? (
                            <>
                              <span className="font-bold text-slate-800">{title}:</span> {desc}
                            </>
                          ) : (
                            <span className="font-medium">{point}</span>
                          )}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Desktop Grid - Minimal List *\/}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
            {(isPointsExpanded ? TRAVEL_GUIDE_DATA.pointsToRemember : TRAVEL_GUIDE_DATA.pointsToRemember.slice(0, 6)).map((point, idx) => {
               const [title, desc] = point.split(": ");
               return (
                 <div key={idx} className="flex gap-3 items-start group">
                   <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-blue/10 transition-colors">
                    <CheckCircle2 className="w-3 h-3 text-brand-blue" />
                   </div>
                   <div className="text-base text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors">
                     {desc ? (
                       <>
                         <span className="font-bold text-slate-900">{title}:</span> {desc}
                       </>
                     ) : (
                       <span className="font-medium">{point}</span>
                     )}
                   </div>
                 </div>
               );
            })}
          </div>

          {/* Minimal Read More / Show Less Button *\/}
          {TRAVEL_GUIDE_DATA.pointsToRemember.length > 6 && (
            <div className="pt-6 border-t border-slate-50 mt-6 md:block hidden">
              <button
                onClick={() => setIsPointsExpanded(!isPointsExpanded)}
                className="group flex items-center gap-2 text-brand-blue font-bold text-sm uppercase tracking-widest"
              >
                {isPointsExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    <span>Collapse Points</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    <span>Expand {TRAVEL_GUIDE_DATA.pointsToRemember.length - 6} More Points</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div> */}

      </div>
    </div>
  </div>
);
};

export default InclusionsSection;
