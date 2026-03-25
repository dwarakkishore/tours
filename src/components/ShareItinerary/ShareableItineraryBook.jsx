'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ShareableItineraryBook = ({ itineraries }) => {
  if (!itineraries || itineraries.length === 0) return null;
  const bookRef = useRef(null);
  const state = useRef({});
  const zIndexCounter = useRef(100);

  // PREPARE PAGES
  // We want:
  // Spread 1: [Empty, Cover]
  // Spread 2: [Day 1 Header, Day 1 Points]
  // Spread 3: [Day 2 Header, Day 2 Points]
  // ...
  
  const physicalPages = [];
  
  // 1. Page 0 (Cover & Day 1 Header)
  physicalPages.push({
    front: { type: 'cover', title: 'Your Customized Itinerary' },
    back: { type: 'header', dayData: itineraries[0] }
  });

  // 2. Middle Pages (Points i & Header i+1)
  for (let i = 0; i < itineraries.length - 1; i++) {
    physicalPages.push({
      front: { type: 'points', dayData: itineraries[i] },
      back: { type: 'header', dayData: itineraries[i + 1] }
    });
  }

  // 3. End Page (Points N & End Section)
  physicalPages.push({
    front: { type: 'points', dayData: itineraries[itineraries.length - 1] },
    back: { type: 'end' }
  });

  const [currentDayIdx, setCurrentDayIdx] = useState(-1);

  const goToDay = (targetIdx) => {
    if (window.innerWidth < 768) {
      // Mobile logic: Open the accordion and scroll to it
      if (targetIdx === -1) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentDayIdx(-1);
        return;
      }
      const element = document.getElementById(`mobile-day-${targetIdx}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setCurrentDayIdx(targetIdx);
      return;
    }

    const isMovingForward = targetIdx > currentDayIdx;
    const pagesToProcess = [...physicalPages.keys()];
    if (!isMovingForward) pagesToProcess.reverse();

    pagesToProcess.forEach((i) => {
      const pageEl = bookRef.current.querySelector(`[data-id="${i}"]`);
      if (i <= targetIdx) {
        // Should be flipped to the left
        if (state.current[i] !== 'left') {
          zIndexCounter.current++;
          gsap.to(pageEl, {
            rotationY: -180,
            duration: 1.2,
            ease: 'power2.inOut',
            transformOrigin: 'left center',
            zIndex: zIndexCounter.current,
            boxShadow: '-10px 10px 30px rgba(0,0,0,0.15)',
          });
          state.current[i] = 'left';
        }
      } else {
        // Should be flipped to the right
        if (state.current[i] === 'left') {
          zIndexCounter.current++;
          gsap.to(pageEl, {
            rotationY: 0,
            duration: 1.2,
            ease: 'power2.inOut',
            transformOrigin: 'left center',
            zIndex: zIndexCounter.current,
            boxShadow: '0px 10px 30px rgba(0,0,0,0.1)',
          });
          state.current[i] = 'right';
        }
      }
    });
    setCurrentDayIdx(targetIdx);
  };


  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup 3D for desktop
      gsap.set('.book-container', { perspective: 2500 });
      gsap.set('.page-element', { transformStyle: 'preserve-3d' });
      gsap.set('.page-back', { rotationY: 180 });
      gsap.set(['.page-front', '.page-back'], { backfaceVisibility: 'hidden' });

      // Mobile Animations (Simple Scroll Reveal)
      if (window.innerWidth < 768) {
        gsap.to('.mobile-card', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.mobile-journal-trigger',
            start: 'top 80%',
          }
        });
      }
    }, bookRef);

    return () => ctx.revert();
  }, [itineraries]);

  const flipPage = (e) => {
    const el = e.currentTarget;
    const id = el.dataset.id;
    
    // Toggle state
    if (!state.current[id] || state.current[id] === 'right') {
      zIndexCounter.current++;
      gsap.to(el, {
        rotationY: -180,
        duration: 1.2,
        ease: 'power2.inOut',
        transformOrigin: 'left center',
        zIndex: zIndexCounter.current,
        boxShadow: '-10px 10px 30px rgba(0,0,0,0.15)',
        onStart: () => { el.style.pointerEvents = 'none'; },
        onComplete: () => { el.style.pointerEvents = 'auto'; }
      });
      state.current[id] = 'left';
      setCurrentDayIdx(Number(id));
    } else {
      zIndexCounter.current++;
      gsap.to(el, {
        rotationY: 0,
        duration: 1.2,
        ease: 'power2.inOut',
        transformOrigin: 'left center',
        zIndex: zIndexCounter.current,
        boxShadow: '0px 10px 30px rgba(0,0,0,0.1)',
        onStart: () => { el.style.pointerEvents = 'none'; },
        onComplete: () => { el.style.pointerEvents = 'auto'; }
      });
      state.current[id] = 'right';
      setCurrentDayIdx(Number(id) - 1);
    }
  };

  return (
    <section 
      ref={bookRef}
      className="pt-6 pb-10 md:pt-10 md:pb-16 bg-white print:py-8 mobile-journal-trigger"
    >
      <div className="max-w-full mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-8 md:mb-10 px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tighter mb-3">
            Customized <span className="text-brand-blue uppercase">Itinerary</span>
          </h2>
          <p className="text-slate-500 font-medium italic text-lg md:text-xl">The pages of your journey unfold...</p>
        </div>

        {/* DAY NAVIGATION */}
        <DayNavigation 
          currentDayIdx={currentDayIdx} 
          goToDay={goToDay} 
          itineraries={itineraries} 
        />

        {/* DESKTOP VIEW */}
        <div className="hidden md:flex justify-center book-container">
          <div
            className="relative w-full max-w-[1400px] flex bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] rounded-lg overflow-visible"
            style={{ height: 'min(900px, 85vh)' }}
          >
            <div className="absolute inset-0 flex overflow-hidden">
                {/* BRAND AUTHORITY LEFT: India's Premiere Bespoke */}
                <div className="flex-1 h-full bg-[#fcfaf7] relative overflow-hidden group">
                  {/* Sophisticated Linen/Clay Texture Overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/clay.png")` }} />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 via-transparent to-blue-50/20" />
                  
                  {/* Structural Metallic Spine */}
                  <div className="absolute left-12 lg:left-16 top-20 bottom-20 w-[1px] bg-gradient-to-b from-transparent via-brand-blue/20 to-transparent" />

                  <div className="relative z-10 h-full flex flex-col justify-between py-12 lg:py-16 xl:py-20 px-12 lg:px-20">
                    <div className="space-y-8">
                       <div className="transition-all duration-700 group-hover:translate-x-1">
                          <img src="/Bayard_white_logo.svg" alt="Bayard Vacations" className="h-8 lg:h-10 xl:h-12 w-auto object-contain brightness-95" />
                       </div>
                       
                       <div className="relative pt-8">
                          <span className="block text-[10px] lg:text-xs font-bold text-brand-blue/40 uppercase tracking-[0.5em] mb-4">India's Premiere</span>
                          <h1 className="font-poppins text-4xl lg:text-5xl xl:text-6xl text-slate-900 leading-[1.1] tracking-tight">
                            Bespoke <br/>
                            <span className="font-great-vibes text-brand-blue text-5xl lg:text-6xl xl:text-7x relative -top-3 -left-1">Itinerary</span>
                          </h1>
                       </div>
                    </div>

                    <div className="space-y-12 lg:space-y-16">
                      {[
                        { title: 'Truly Customizable', desc: 'Every detail tailored to your pulse' },
                        { title: 'Zero Compromise', desc: 'Curating excellence without shortcuts' },
                        { title: 'Expertly Curated', desc: "Crafted by India's finest travel architects" }
                      ].map((usp, i) => (
                        <div key={i} className="relative pl-12 group/usp cursor-default">
                          {/* Faint Numeral Marker */}
                          <span className="absolute -left-4 top-0 text-7xl lg:text-8xl font-poppins font-bold text-slate-100/80 -z-10 transition-colors group-hover/usp:text-brand-blue/5">
                            0{i + 1}
                          </span>
                          <h3 className="text-xs lg:text-sm font-bold text-slate-900 uppercase tracking-[0.3em] mb-1 group-hover/usp:text-brand-blue transition-colors">
                            {usp.title}
                          </h3>
                          <p className="text-[10px] lg:text-xs font-medium text-slate-400 italic tracking-wide">
                            {usp.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-8 border-t border-slate-100/50">
                       <p className="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] leading-relaxed max-w-[240px]">
                         NO ONE IN INDIA CUSTOMIZES YOUR JOURNEY <span className="text-brand-blue">LIKE BAYARD</span>.
                       </p>
                    </div>
                  </div>
                </div>
                
                {/* BRAND AUTHORITY RIGHT: Signature Departure */}
                <div className="flex-1 h-full bg-[#fcfaf7] relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/clay.png")` }} />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/20 via-transparent to-orange-50/20" />
                  
                  {/* Structural Metallic Spine (Right Side) */}
                  <div className="absolute right-12 lg:right-16 top-20 bottom-20 w-[1px] bg-gradient-to-b from-transparent via-brand-blue/20 to-transparent" />

                  <div className="relative z-10 h-full flex flex-col justify-between py-12 lg:py-16 xl:py-20 px-12 lg:px-20 text-right">
                    <div className="space-y-8">
                       <div className="transition-all duration-700 group-hover:-translate-x-1 inline-block">
                          <img src="/Bayard_white_logo.svg" alt="Bayard Vacations" className="h-8 lg:h-10 xl:h-12 w-auto object-contain brightness-95" />
                       </div>
                       
                       <div className="relative pt-8">
                          <span className="block text-[10px] lg:text-xs font-poppins font-bold text-brand-blue/40 uppercase tracking-[0.5em] mb-4">Final Chapter</span>
                          <h1 className="font-poppins text-4xl lg:text-5xl xl:text-6xl text-slate-900 leading-[1.1] tracking-tight">
                            A Lifetime <br/>
                            <span className="font-great-vibes text-brand-blue text-5xl lg:text-6xl xl:text-7x relative -top-3 -right-1">Of Memories</span>
                          </h1>
                       </div>
                    </div>

                    <div className="space-y-6 lg:space-y-8">
                       <div className="w-16 h-[1px] bg-brand-blue/30 ml-auto mb-8" />
                       <p className="text-xl lg:text-2xl font-poppins text-slate-800 italic leading-relaxed">
                         "Traveling – it leaves you speechless, then turns you into a storyteller."
                       </p>
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">
                         Ibnu Battuta
                       </p>
                    </div>

                    <div className="pt-8 border-t border-slate-100/50">
                       <p className="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] leading-relaxed max-w-[240px] ml-auto">
                         CURATED EXCLUSIVELY FOR YOUR <span className="text-brand-blue">NEXT ADVENTURE</span>.
                       </p>
                    </div>
                  </div>
                </div>
            </div>

            <div className="absolute left-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-r from-black/15 via-black/5 to-black/15 z-[1000] pointer-events-none transform -translate-x-1/2" />

            <div className="absolute left-1/2 top-0 w-1/2 h-full z-10 transition-transform duration-500">
              {physicalPages.map((page, i) => (
                <div
                  key={i}
                  data-id={i}
                  className="page-element absolute inset-0 cursor-pointer origin-left"
                  onClick={flipPage}
                  style={{ zIndex: physicalPages.length - i }}
                >
                  <div className="page-front absolute inset-0 bg-white shadow-[-10px_0_20px_-10px_rgba(0,0,0,0.1)] border-l border-slate-50">
                     <PageContent data={page.front} side="front" />
                  </div>
                  <div className="page-back absolute inset-0 bg-white shadow-[10px_0_20px_-10px_rgba(0,0,0,0.1)] border-r border-slate-50">
                     <PageContent data={page.back} side="back" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE VIEW */}
        <MobileJournal 
          itineraries={itineraries} 
          currentDayIdx={currentDayIdx} 
          setCurrentDayIdx={setCurrentDayIdx} 
        />



        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #e2e8f0;
            border-radius: 20px;
          }
          
          .page-front, .page-back {
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
          }

          .vertical-text {
            writing-mode: vertical-rl;
            text-orientation: mixed;
          }
        `}</style>
      </div>
    </section>
  );
};

// --- SUB-COMPONENTS (Defined outside to prevent re-mounting) ---

const PageContent = ({ data, side }) => {
  if (data.type === 'cover') {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-blue to-blue-900 text-white p-8 lg:p-12 text-center overflow-y-auto custom-scrollbar relative">
        <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-xl mb-8 border border-white/30 rotate-3">
           <span className="text-5xl">✈️</span>
        </div>
        <h2 className="text-5xl font-bold text-center mb-4 tracking-tighter leading-tight">
          {data.title}
        </h2>
        <div className="w-16 h-1 bg-white/50 rounded-full mb-8" />
        <p className="text-white/70 font-bold uppercase tracking-[0.3em] text-xs">
          A Journey by Bayard Vacations
        </p>
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-white/10 border-l-[40px] border-l-transparent" />
      </div>
    );
  }

  if (data.type === 'header') {
    const { day, title, overnight } = data.dayData || {};
    const displayDay = day !== undefined && day !== null ? day.toString().padStart(2, '0') : '??';
    return (
      <div className={`h-full w-full flex flex-col items-center justify-start bg-white p-6 lg:p-10 pt-6 lg:pt-12 text-center overflow-y-auto custom-scrollbar ${side === 'back' ? 'border-r border-slate-100' : ''}`}>
         <div className="w-20 h-20 lg:w-24 lg:h-24 bg-brand-blue/5 rounded-2xl lg:rounded-3xl flex flex-col items-center justify-center border border-brand-blue/20 mb-2 lg:mb-4 shadow-inner relative group">
            <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl lg:rounded-3xl" />
            <span className="relative z-10 text-[10px] lg:text-[11px] font-bold text-brand-blue/80 uppercase tracking-[0.3em] mb-0.5 lg:mb-1">Day</span>
            <span className="relative z-10 text-4xl lg:text-5xl font-bold text-brand-blue leading-none tracking-tighter">{displayDay}</span>
         </div>
          <h3 className="text-xl lg:text-3xl font-bold text-slate-900 mb-2 lg:mb-4 px-4 leading-tight tracking-tight">
            {title}
          </h3>

          {/* Day Images (Desktop - Adaptive Magazine Gallery) */}
          {data.dayData.imageRefs && data.dayData.imageRefs.length > 0 && (
            <div className={`relative w-full ${data.dayData.imageRefs.length >= 4 ? 'max-w-4xl' : 'max-w-2xl'} mt-2 mb-4 lg:mb-8 mx-auto`}>
              {data.dayData.imageRefs.length >= 4 ? (
                /* 4+ Images: Horizontal Filmstrip (Buttery Smooth & Big) */
                <div className="flex gap-6 overflow-x-auto pb-10 px-8 no-scrollbar snap-x cursor-grab active:cursor-grabbing">
                  {data.dayData.imageRefs.map((img, imgIdx) => (
                    <div 
                      key={imgIdx} 
                      className="relative min-w-[320px] h-[320px] rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.15)] border-4 border-white flex-shrink-0 snap-center transform hover:scale-[1.03] transition-all duration-500 group"
                    >
                       <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                       <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-xs font-bold uppercase tracking-widest leading-none">{img.title}</p>
                       </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* 1-3 Images: Staggered Fan Layout (Current) */
                <div className="flex justify-center items-center h-[200px] lg:h-[300px]">
                  {data.dayData.imageRefs.slice(0, 3).map((img, imgIdx) => {
                    const total = data.dayData.imageRefs.length;
                    
                    // Calculate dynamic offsets for the "Fan" effect
                    let rotation = 0;
                    let translateX = 0;
                    let zIndex = 10;
                    
                    if (total === 1) { 
                       rotation = -2; translateX = 0; zIndex = 10; 
                    } else if (total === 2) {
                      rotation = imgIdx === 0 ? -6 : 6;
                      translateX = imgIdx === 0 ? 30 : -30;
                      zIndex = 10;
                    } else if (total === 3) {
                      if (imgIdx === 0) { rotation = -12; translateX = 60; zIndex = 5; }
                      else if (imgIdx === 1) { rotation = 0; translateX = 0; zIndex = 15; }
                      else if (imgIdx === 2) { rotation = 12; translateX = -60; zIndex = 5; }
                    }

                    return (
                      <div 
                        key={imgIdx} 
                        className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.12)] border-4 border-white transform transition-all duration-700 hover:scale-110 hover:rotate-0 hover:z-[100] group"
                        style={{
                          transform: `rotate(${rotation}deg) translateX(${translateX}px)`,
                          zIndex: zIndex
                        }}
                      >
                        <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-xs font-bold uppercase tracking-widest leading-none">{img.title}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {overnight && (
           <div className="bg-blue-50/50 px-3 py-2 lg:px-5 lg:py-3 rounded-2xl border border-blue-100 mt-2 lg:mt-4 flex items-center gap-3 shadow-sm">
              <span className="text-2xl">🏨</span>
              <div>
                 <span className="block text-[9px] font-bold text-blue-400 uppercase tracking-widest text-left">Overnight in</span>
                 <span className="block text-sm font-bold text-slate-700 text-left">{overnight}</span>
              </div>
           </div>
         )}
         <div className={`absolute top-0 ${side === 'front' ? 'right-0' : 'left-0'} w-0 h-0 border-t-[30px] border-t-slate-50 border-${side === 'front' ? 'l' : 'r'}-[30px] border-${side === 'front' ? 'l' : 'r'}-transparent`} />
      </div>
    );
  }

  if (data.type === 'points') {
    const { activities } = data.dayData;
    return (
      <div className={`h-full w-full flex flex-col bg-white p-6 lg:p-10 xl:p-12 pt-10 lg:pt-16 relative ${side === 'front' ? 'border-l border-slate-100' : ''}`}>
         <div className="flex items-center gap-3 mb-6 lg:mb-10 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center shadow-lg">
               <span className="text-white text-xs font-bold">✨</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em]">Daily Highlights</h4>
         </div>

         <div className="flex-1 overflow-y-auto space-y-6 lg:space-y-10 pr-2 custom-scrollbar">
            {activities?.map((act, idx) => (
              <div key={idx} className="relative pl-12 group">
                 {idx !== activities.length - 1 && (
                   <div className="absolute left-[15px] top-8 bottom-[-40px] w-0.5 bg-gradient-to-b from-brand-blue/20 to-transparent" />
                 )}
                 <div className="absolute left-0 top-1 w-7 h-7 lg:w-8 lg:h-8 rounded-xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center transition-all group-hover:bg-brand-blue group-hover:scale-110 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-brand-blue group-hover:bg-white" />
                 </div>
                 <p className="text-base font-bold text-slate-900 mb-1 tracking-tight group-hover:text-brand-blue transition-colors">
                    {act.activity}
                 </p>
                 <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
                    {act.description}
                 </p>
              </div>
            ))}
         </div>
      </div>
    );
  }

  if (data.type === 'end') {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F0FDFA] via-white to-[#F0F9FF] p-8 lg:p-12 text-center relative overflow-y-auto custom-scrollbar">
          {/* Subtle Artistic Orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl" />
          
          <div className="relative z-10 w-24 h-24 bg-white/50 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-sm mb-8 border border-emerald-100/50">
             <span className="text-5xl drop-shadow-sm">🏆</span>
          </div>
          <h2 className="relative z-10 text-4xl font-bold text-slate-900 mb-3 tracking-tighter">
             Adventure Completed
          </h2>
          <p className="relative z-10 text-emerald-600 font-bold uppercase tracking-[0.4em] text-[10px] mb-8 opacity-80">Memories to last a lifetime</p>
          <div className="relative z-10 w-16 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent mx-auto" />
      </div>
    );
  }

  if (data.type === 'blank') {
    return <div className="h-full w-full bg-white" />;
  }
};

const DayNavigation = ({ currentDayIdx, goToDay, itineraries }) => (
  <div className="hidden md:flex mb-6 lg:mb-12 flex-wrap justify-center gap-1.5 lg:gap-2 px-4">
    <button
      onClick={() => goToDay(-1)}
      className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
        currentDayIdx === -1 
          ? 'bg-brand-blue text-white border-brand-blue shadow-lg scale-105 lg:scale-110' 
          : 'bg-white text-slate-400 border-slate-100 hover:border-brand-blue hover:text-brand-blue'
      }`}
    >
      Home
    </button>
    {itineraries.map((_, idx) => (
      <button
        key={idx}
        onClick={() => goToDay(idx)}
        className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
          currentDayIdx === idx 
            ? 'bg-brand-blue text-white border-brand-blue shadow-lg scale-105 lg:scale-110' 
            : 'bg-white text-slate-400 border-slate-100 hover:border-brand-blue hover:text-brand-blue'
        }`}
      >
        Day {(idx + 1).toString().padStart(2, '0')}
      </button>
    ))}
  </div>
);

const MobileJournal = ({ itineraries, currentDayIdx, setCurrentDayIdx }) => {
  const [openIndex, setOpenIndex] = useState(0); 

  useEffect(() => {
    setOpenIndex(currentDayIdx);
  }, [currentDayIdx]);

  const toggleDay = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
    setCurrentDayIdx(idx);
  };

  return (
    <div className="md:hidden space-y-3 px-1">
      {itineraries.map((day, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div 
            key={idx} 
            id={`mobile-day-${idx}`}
            className="mobile-card opacity-0 translate-y-8 bg-white rounded-[1.5rem] shadow-[0_8px_25px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden transition-all duration-500"
            style={{
              boxShadow: isOpen ? '0_20px_40px_rgba(0,0,0,0.08)' : '0_4px_12px_rgba(0,0,0,0.03)'
            }}
          >
            <div 
              className="p-4 cursor-pointer transition-all bg-white hover:bg-slate-50"
              onClick={() => toggleDay(idx)}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="px-3 py-0.5 bg-brand-blue/5 border border-brand-blue/20 rounded-full text-[9px] font-bold uppercase tracking-widest text-brand-blue">
                      Day {(day?.day || idx + 1).toString().padStart(2, '0')}
                    </div>
                    {day.overnight && (
                      <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
                        <span>🏨</span>
                        <span className="truncate max-w-[120px]">{day.overnight}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold leading-tight tracking-tight text-brand-blue">
                    {day.title}
                  </h3>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-brand-blue text-white rotate-180' : 'bg-slate-50 text-slate-400 rotate-0'}`}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="p-4 pt-2 pb-6 space-y-5 bg-white">
                <div className="space-y-5 pl-1">
                  {day.imageRefs && day.imageRefs.length > 0 && (
                    <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x">
                      {day.imageRefs.map((img, imgIdx) => (
                        <div key={imgIdx} className="relative min-w-[280px] h-48 rounded-[2rem] overflow-hidden shadow-xl border border-white/20 flex-shrink-0 snap-center transform hover:scale-[1.02] transition-transform duration-500">
                          <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                            <p className="text-[9px] font-bold text-white truncate">{img.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-4">
                    <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue text-[10px]">
                      <span>📝</span>
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">The Plan</span>
                  </div>

                  {day.activities?.map((act, actIdx) => (
                    <div key={actIdx} className="relative pl-8 group">
                      {actIdx !== day.activities.length - 1 && (
                        <div className="absolute left-[11px] top-5 bottom-[-24px] w-0.5 bg-slate-50" />
                      )}
                      <div className="absolute left-0 top-1 w-5 h-5 rounded-lg bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-brand-blue" />
                      </div>
                      <p className="text-sm font-bold text-slate-900 mb-0.5 leading-snug">{act.activity}</p>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed italic">{act.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="mobile-card opacity-0 translate-y-8 bg-emerald-50 rounded-[1.5rem] p-4 flex items-center gap-4 border border-emerald-100 shadow-sm">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
          <span className="text-2xl">🏅</span>
        </div>
        <div>
          <h4 className="text-base font-bold text-slate-900 leading-tight">Adventure Complete</h4>
          <p className="text-emerald-700 text-[10px] font-bold uppercase tracking-widest">Memories for life</p>
        </div>
      </div>
    </div>
  );
};

export default ShareableItineraryBook;
