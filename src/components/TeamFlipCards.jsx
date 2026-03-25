"use client";
import { useState, useEffect, useRef } from 'react';
import Container from "@/components/ui/Container";

export default function TeamFlipCards() {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardsRef = useRef([]);

  const teamMembers = [
    // 30 team members with beautiful gradient colors
    { name: 'John Bayard', role: 'Founder & CEO', dept: 'Leadership', bio: 'Visionary leader with 15+ years in travel', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80', gradient: 'from-blue-600 via-purple-600 to-pink-600' },
    { name: 'Sarah Mitchell', role: 'COO', dept: 'Leadership', bio: 'Operations expert driving excellence', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', gradient: 'from-purple-600 via-pink-600 to-red-600' },
    { name: 'Michael Chen', role: 'Sales Director', dept: 'Sales', bio: 'Building relationships worldwide', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', gradient: 'from-emerald-500 via-teal-500 to-cyan-500' },
    { name: 'Emily Parker', role: 'Senior Consultant', dept: 'Sales', bio: 'Crafting perfect travel experiences', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80', gradient: 'from-green-500 via-emerald-500 to-teal-500' },
    { name: 'David Kumar', role: 'Travel Consultant', dept: 'Sales', bio: 'Passionate about adventures', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', gradient: 'from-teal-500 via-cyan-500 to-blue-500' },
    { name: 'Lisa Anderson', role: 'Sales Associate', dept: 'Sales', bio: 'Making travel dreams reality', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80', gradient: 'from-cyan-500 via-blue-500 to-indigo-500' },
    { name: 'James Wilson', role: 'Account Manager', dept: 'Sales', bio: 'Client success is my mission', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', gradient: 'from-blue-500 via-indigo-500 to-purple-500' },
    { name: 'Sophia Lee', role: 'Client Relations', dept: 'Sales', bio: 'Building lasting connections', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80', gradient: 'from-indigo-500 via-purple-500 to-pink-500' },
    { name: 'Priya Patel', role: 'CTO', dept: 'Technology', bio: 'Innovating travel technology', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80', gradient: 'from-purple-600 via-violet-600 to-fuchsia-600' },
    { name: 'Alex Martinez', role: 'Lead Developer', dept: 'Technology', bio: 'Code architect and mentor', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80', gradient: 'from-violet-600 via-purple-600 to-indigo-600' },
    { name: 'Nina Zhang', role: 'Full Stack Developer', dept: 'Technology', bio: 'Frontend to backend expert', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', gradient: 'from-fuchsia-500 via-pink-500 to-rose-500' },
    { name: 'Tom Harris', role: 'Backend Engineer', dept: 'Technology', bio: 'Server-side solutions specialist', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80', gradient: 'from-rose-500 via-red-500 to-orange-500' },
    { name: 'Mia Johnson', role: 'Frontend Developer', dept: 'Technology', bio: 'UI/UX perfectionist', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80', gradient: 'from-orange-500 via-amber-500 to-yellow-500' },
    { name: 'Kevin White', role: 'DevOps Engineer', dept: 'Technology', bio: 'Infrastructure automation pro', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80', gradient: 'from-yellow-500 via-lime-500 to-green-500' },
    { name: 'Emma Rodriguez', role: 'Marketing Director', dept: 'Marketing', bio: 'Brand storyteller extraordinaire', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80', gradient: 'from-orange-600 via-red-600 to-pink-600' },
    { name: 'Daniel Kim', role: 'Content Lead', dept: 'Marketing', bio: 'Words that inspire wanderlust', image: 'https://images.unsplash.com/photo-1520409364224-63400afe26e5?w=400&q=80', gradient: 'from-pink-600 via-rose-600 to-red-600' },
    { name: 'Sophie Turner', role: 'Social Media Manager', dept: 'Marketing', bio: 'Digital engagement specialist', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80', gradient: 'from-red-600 via-orange-600 to-amber-600' },
    { name: 'Marcus Bell', role: 'SEO Specialist', dept: 'Marketing', bio: 'Making us discoverable', image: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=400&q=80', gradient: 'from-amber-600 via-yellow-600 to-lime-600' },
    { name: 'Isabella Cruz', role: 'Brand Manager', dept: 'Marketing', bio: 'Crafting our visual identity', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80', gradient: 'from-lime-600 via-green-600 to-emerald-600' },
    { name: 'Ryan Moore', role: 'Graphic Designer', dept: 'Marketing', bio: 'Visual creativity unleashed', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80', gradient: 'from-emerald-600 via-teal-600 to-cyan-600' },
    { name: 'Amanda Singh', role: 'Operations Manager', dept: 'Operations', bio: 'Keeping everything running smoothly', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80', gradient: 'from-cyan-600 via-sky-600 to-blue-600' },
    { name: 'Lucas Gray', role: 'Logistics Coordinator', dept: 'Operations', bio: 'Master of coordination', image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&q=80', gradient: 'from-sky-600 via-blue-600 to-indigo-600' },
    { name: 'Zoe Adams', role: 'HR Manager', dept: 'Operations', bio: 'People are our greatest asset', image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&q=80', gradient: 'from-indigo-600 via-violet-600 to-purple-600' },
    { name: 'Nathan Scott', role: 'Financial Analyst', dept: 'Operations', bio: 'Numbers tell the story', image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&q=80', gradient: 'from-violet-600 via-fuchsia-600 to-pink-600' },
    { name: 'Grace Miller', role: 'Admin Coordinator', dept: 'Operations', bio: 'Organized and efficient', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80', gradient: 'from-pink-500 via-rose-500 to-red-500' },
    { name: 'Ethan Brooks', role: 'Office Manager', dept: 'Operations', bio: 'Creating great workspaces', image: 'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=400&q=80', gradient: 'from-red-500 via-orange-500 to-yellow-500' },
    { name: 'Rachel Green', role: 'QA Engineer', dept: 'Technology', bio: 'Quality is non-negotiable', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80', gradient: 'from-yellow-500 via-green-500 to-teal-500' },
    { name: 'Chris Evans', role: 'UI/UX Designer', dept: 'Technology', bio: 'Designing delightful experiences', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&q=80', gradient: 'from-teal-500 via-cyan-500 to-sky-500' },
    { name: 'Robert Taylor', role: 'Sales Coordinator', dept: 'Sales', bio: 'Coordinating successful sales', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80', gradient: 'from-sky-500 via-indigo-500 to-violet-500' },
    { name: 'Olivia Brown', role: 'Customer Success', dept: 'Sales', bio: 'Your success is our success', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80', gradient: 'from-violet-500 via-purple-500 to-fuchsia-500' }
  ];

  useEffect(() => {
    const observ = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index'));
            setVisibleCards(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    cardsRef.current.forEach((card) => {
      if (card) observ.observe(card);
    });

    return () => observ.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white mb-6 animate-gradient">
            Our Amazing Team
          </h2>
          <p className="text-xl text-white/80">Scroll to reveal each team member</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              data-index={index}
              className={`flip-card h-96 perspective-1000 transition-all duration-1000 ${
                visibleCards.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${(index % 4) * 150}ms` }}
            >
              <div className="flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-3d hover:rotate-y-180">
                {/* Front */}
                <div className={`flip-card-face absolute inset-0 backface-hidden rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${member.gradient}`}>
                  <div className="relative h-full">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                      <p className="text-sm font-semibold opacity-90">{member.role}</p>
                      <div className="mt-3 text-xs opacity-70">Hover to flip →</div>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div className={`flip-card-face absolute inset-0 backface-hidden rounded-3xl overflow-hidden shadow-2xl rotate-y-180 bg-gradient-to-br ${member.gradient} p-8 flex flex-col items-center justify-center text-white`}>
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                    <span className="text-4xl">✨</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-center">{member.name}</h3>
                  <p className="text-sm font-bold mb-1 opacity-90">{member.role}</p>
                  <p className="text-xs px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm mb-4">{member.dept}</p>
                  <p className="text-center text-sm leading-relaxed opacity-90">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .flip-card-inner:hover {
          transform: rotateY(180deg);
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}
