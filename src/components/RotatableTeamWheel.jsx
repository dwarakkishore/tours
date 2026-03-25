"use client";
import { useState, useRef, useEffect } from 'react';
import Container from "@/components/ui/Container";
import { ChevronDown } from 'lucide-react';

export default function RotatableTeamWheel() {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startAngle, setStartAngle] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const wheelRef = useRef(null);

  const allTeamMembers = [
    { name: 'John Bayard', role: 'Founder & CEO', dept: 'Leadership', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80', color: 'blue' },
    { name: 'Sarah Mitchell', role: 'COO', dept: 'Leadership', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80', color: 'blue' },
    { name: 'Michael Chen', role: 'Sales Director', dept: 'Sales', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80', color: 'green' },
    { name: 'Emily Parker', role: 'Senior Consultant', dept: 'Sales', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80', color: 'green' },
    { name: 'David Kumar', role: 'Travel Consultant', dept: 'Sales', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80', color: 'green' },
    { name: 'Lisa Anderson', role: 'Sales Associate', dept: 'Sales', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&q=80', color: 'green' },
    { name: 'James Wilson', role: 'Account Manager', dept: 'Sales', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80', color: 'green' },
    { name: 'Sophia Lee', role: 'Client Relations', dept: 'Sales', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80', color: 'green' },
    { name: 'Robert Taylor', role: 'Sales Coordinator', dept: 'Sales', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80', color: 'green' },
    { name: 'Olivia Brown', role: 'Customer Success', dept: 'Sales', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80', color: 'green' },
    { name: 'Priya Patel', role: 'CTO', dept: 'Technology', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80', color: 'purple' },
    { name: 'Alex Martinez', role: 'Lead Developer', dept: 'Technology', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&q=80', color: 'purple' },
    { name: 'Nina Zhang', role: 'Full Stack Dev', dept: 'Technology', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80', color: 'purple' },
    { name: 'Tom Harris', role: 'Backend Engineer', dept: 'Technology', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&q=80', color: 'purple' },
    { name: 'Mia Johnson', role: 'Frontend Dev', dept: 'Technology', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&q=80', color: 'purple' },
    { name: 'Kevin White', role: 'DevOps Engineer', dept: 'Technology', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&q=80', color: 'purple' },
    { name: 'Rachel Green', role: 'QA Engineer', dept: 'Technology', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80', color: 'purple' },
    { name: 'Chris Evans', role: 'UI/UX Designer', dept: 'Technology', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=300&q=80', color: 'purple' },
    { name: 'Emma Rodriguez', role: 'Marketing Director', dept: 'Marketing', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&q=80', color: 'orange' },
    { name: 'Daniel Kim', role: 'Content Lead', dept: 'Marketing', image: 'https://images.unsplash.com/photo-1520409364224-63400afe26e5?w=300&q=80', color: 'orange' },
    { name: 'Sophie Turner', role: 'Social Media Manager', dept: 'Marketing', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&q=80', color: 'orange' },
    { name: 'Marcus Bell', role: 'SEO Specialist', dept: 'Marketing', image: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=300&q=80', color: 'orange' },
    { name: 'Isabella Cruz', role: 'Brand Manager', dept: 'Marketing', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&q=80', color: 'orange' },
    { name: 'Ryan Moore', role: 'Graphic Designer', dept: 'Marketing', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80', color: 'orange' },
    { name: 'Amanda Singh', role: 'Operations Manager', dept: 'Operations', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&q=80', color: 'teal' },
    { name: 'Lucas Gray', role: 'Logistics Coordinator', dept: 'Operations', image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=300&q=80', color: 'teal' },
    { name: 'Zoe Adams', role: 'HR Manager', dept: 'Operations', image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=300&q=80', color: 'teal' },
    { name: 'Nathan Scott', role: 'Financial Analyst', dept: 'Operations', image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=300&q=80', color: 'teal' },
    { name: 'Grace Miller', role: 'Admin Coordinator', dept: 'Operations', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&q=80', color: 'teal' },
    { name: 'Ethan Brooks', role: 'Office Manager', dept: 'Operations', image: 'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=300&q=80', color: 'teal' }
  ];

  // Filter team members by category
  const teamMembers = selectedCategory === 'All' 
    ? allTeamMembers 
    : allTeamMembers.filter(m => m.dept === selectedCategory);

  const angleStep = 360 / teamMembers.length;
  const selectedIndex = Math.round(-rotation / angleStep) % teamMembers.length;
  const normalizedIndex = selectedIndex < 0 ? selectedIndex + teamMembers.length : selectedIndex;
  const selectedMember = teamMembers[normalizedIndex];

  const dragRectRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = wheelRef.current.getBoundingClientRect();
    dragRectRef.current = rect;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    setStartAngle(angle - rotation);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragRectRef.current) return;
    const rect = dragRectRef.current;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    setRotation(angle - startAngle);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, startAngle]);

  const colorMap = {
    blue: { ring: 'ring-brand-blue', bg: 'from-brand-blue to-blue-700' },
    green: { ring: 'ring-emerald-500', bg: 'from-emerald-500 to-teal-600' },
    purple: { ring: 'ring-purple-500', bg: 'from-purple-500 to-indigo-600' },
    orange: { ring: 'ring-orange-500', bg: 'from-orange-500 to-pink-600' },
    teal: { ring: 'ring-teal-500', bg: 'from-teal-500 to-cyan-600' }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      <Container>
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">Our 30-Member Team</h2>
          <p className="text-lg text-slate-600 mb-6">Select a category or drag the wheel to explore</p>
          
          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {['All', 'Leadership', 'Sales', 'Technology', 'Marketing', 'Operations'].map((category) => {
              const counts = {
                All: allTeamMembers.length,
                Leadership: allTeamMembers.filter(m => m.dept === 'Leadership').length,
                Sales: allTeamMembers.filter(m => m.dept === 'Sales').length,
                Technology: allTeamMembers.filter(m => m.dept === 'Technology').length,
                Marketing: allTeamMembers.filter(m => m.dept === 'Marketing').length,
                Operations: allTeamMembers.filter(m => m.dept === 'Operations').length
              };
              
              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setRotation(0); // Reset rotation when changing category
                  }}
                  className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-brand-blue to-purple-600 text-white shadow-lg scale-110'
                      : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-brand-blue hover:text-brand-blue'
                  }`}
                >
                  {category} ({counts[category]})
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Rotatable Wheel - BIGGER */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full max-w-3xl mx-auto aspect-square">
              {/* Pointer at top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-30">
                <ChevronDown className="w-16 h-16 text-brand-blue drop-shadow-lg" />
              </div>

              {/* Wheel */}
              <div
                ref={wheelRef}
                className={`relative w-full h-full rounded-full bg-gradient-to-br from-slate-100 to-slate-200 shadow-2xl ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                onMouseDown={handleMouseDown}
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                }}
              >
                {teamMembers.map((member, i) => {
                  const angle = i * angleStep;
                  const isSelected = i === normalizedIndex;

                  return (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-280px) rotate(-${angle}deg)`,
                      }}
                    >
                      <div
                        className={`transition-all duration-300 ${isSelected ? 'scale-150' : 'scale-100'}`}
                        style={{ transform: `rotate(-${rotation}deg)` }}
                      >
                        <div className={`w-32 h-32 rounded-full overflow-hidden shadow-xl border-4 border-white ring-4 ${colorMap[member.color].ring} ${isSelected ? 'ring-8' : ''}`}>
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover pointer-events-none"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Center circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-brand-blue to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-2xl">
                  <div className="text-center">
                    <div className="text-4xl mb-1">{teamMembers.length}</div>
                    <div className="text-xs">{selectedCategory}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Member Details */}
          <div className="w-full lg:w-1/2">
            <div className={`bg-gradient-to-br ${colorMap[selectedMember.color].bg} rounded-3xl overflow-hidden shadow-2xl`}>
              <div className="relative h-96">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="text-sm font-bold uppercase tracking-wider mb-2 opacity-90">
                    {selectedMember.dept}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-2">{selectedMember.name}</h3>
                  <p className="text-xl font-semibold opacity-90">{selectedMember.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mt-12">
          <p className="text-slate-500">🖱️ Click and drag the wheel to rotate and explore team members</p>
        </div>
      </Container>
    </section>
  );
}
