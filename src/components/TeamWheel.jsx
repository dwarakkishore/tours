"use client";
import { useState } from 'react';
import Container from "@/components/ui/Container";
import { ChevronRight } from 'lucide-react';

export default function TeamWheel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const teamMembers = [
    { name: 'Sarah Johnson', role: 'Sales Head', dept: 'Sales Team', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80', color: 'emerald' },
    { name: 'Michael Chen', role: 'Travel Consultant', dept: 'Sales Team', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80', color: 'teal' },
    { name: 'David Williams', role: 'Tech Lead', dept: 'Tech Team', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&q=80', color: 'purple' },
    { name: 'Priya Patel', role: 'Developer', dept: 'Tech Team', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80', color: 'indigo' },
    { name: 'Emma Rodriguez', role: 'Marketing Head', dept: 'Marketing Team', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80', color: 'pink' },
    { name: 'James Lee', role: 'Content Writer', dept: 'Marketing Team', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80', color: 'orange' }
  ];

  const colorClasses = {
    emerald: { ring: 'ring-emerald-500', bg: 'bg-emerald-500', gradient: 'from-emerald-500 to-teal-600' },
    teal: { ring: 'ring-teal-500', bg: 'bg-teal-500', gradient: 'from-teal-500 to-cyan-600' },
    purple: { ring: 'ring-purple-500', bg: 'bg-purple-500', gradient: 'from-purple-500 to-purple-700' },
    indigo: { ring: 'ring-indigo-500', bg: 'bg-indigo-500', gradient: 'from-indigo-500 to-indigo-700' },
    pink: { ring: 'ring-pink-500', bg: 'bg-pink-500', gradient: 'from-pink-500 to-rose-600' },
    orange: { ring: 'ring-orange-500', bg: 'bg-orange-500', gradient: 'from-orange-500 to-red-600' }
  };

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * teamMembers.length);
    
    setTimeout(() => {
      setSelectedIndex(randomIndex);
      setIsSpinning(false);
    }, 2000);
  };

  const selectedMember = teamMembers[selectedIndex];
  const angleStep = 360 / teamMembers.length;

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      <Container>
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 text-sm font-bold uppercase tracking-wider text-purple-600 bg-purple-100 rounded-full mb-4">
            The Dream Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Spin to Meet Our Team</h2>
          <p className="text-lg text-slate-600 mt-4">Click the spin button to discover our amazing people</p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto">
          {/* Arrow Pointer - Left Side */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30">
            <div className="relative">
              <ChevronRight className="w-16 h-16 text-brand-blue drop-shadow-lg" />
              <div className="absolute top-1/2 left-full -translate-y-1/2 whitespace-nowrap ml-2 text-sm font-bold text-brand-blue">
                ← Selected
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Spinning Wheel */}
            <div className="relative w-full md:w-1/2">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Outer Circle Background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 shadow-2xl" />
                
                {/* Team Members in Circle */}
                <div 
                  className={`absolute inset-0 transition-transform duration-2000 ease-out ${isSpinning ? 'animate-spin-slow' : ''}`}
                  style={{ 
                    transform: `rotate(${-selectedIndex * angleStep}deg)`,
                    transitionDuration: isSpinning ? '2000ms' : '800ms'
                  }}
                >
                  {teamMembers.map((member, i) => {
                    const angle = i * angleStep;
                    const isSelected = i === selectedIndex;
                    
                    return (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-180px)`,
                        }}
                      >
                        <div 
                          className={`transition-all duration-500 ${isSelected ? 'scale-110' : ''}`}
                          style={{ transform: `rotate(-${angle}deg)` }}
                        >
                          <div className={`w-20 h-20 rounded-full overflow-hidden shadow-xl border-4 border-white ring-4 ${colorClasses[member.color].ring} transition-all`}>
                            <img 
                              src={member.image} 
                              alt={member.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Center Button */}
                <button
                  onClick={spinWheel}
                  disabled={isSpinning}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-brand-blue to-purple-600 text-white font-bold text-lg shadow-2xl hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed z-20"
                >
                  {isSpinning ? '🎡' : 'SPIN'}
                </button>
              </div>
            </div>

            {/* Selected Member Display - Center Detail */}
            <div className="w-full md:w-1/2">
              <div className="relative">
                {/* Large Center Card */}
                <div className={`bg-gradient-to-br ${colorClasses[selectedMember.color].gradient} rounded-3xl overflow-hidden shadow-2xl transition-all duration-500`}>
                  <div className="relative h-96">
                    <img 
                      src={selectedMember.image} 
                      alt={selectedMember.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <div className="text-sm font-bold uppercase tracking-wider mb-2 opacity-90">
                        {selectedMember.dept}
                      </div>
                      <h3 className="text-4xl font-bold mb-2">{selectedMember.name}</h3>
                      <p className="text-xl font-semibold opacity-90">{selectedMember.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instruction */}
        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm">🎡 Click the SPIN button to randomly select a team member!</p>
        </div>
      </Container>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(1440deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 2s ease-out;
        }
      `}</style>
    </section>
  );
}
