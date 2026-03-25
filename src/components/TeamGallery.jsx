"use client";
import { useState } from 'react';
import Container from "@/components/ui/Container";

export default function TeamGallery() {
  const [hoveredMember, setHoveredMember] = useState(null);

  // 30 team members organized by department
  const teamMembers = [
    // Leadership
    { name: 'John Bayard', role: 'Founder & CEO', dept: 'Leadership', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80', color: 'blue', row: 0 },
    { name: 'Sarah Mitchell', role: 'COO', dept: 'Leadership', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80', color: 'blue', row: 0 },
    
    // Sales Team (8 people)
    { name: 'Michael Chen', role: 'Sales Director', dept: 'Sales', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80', color: 'green', row: 0 },
    { name: 'Emily Parker', role: 'Senior Consultant', dept: 'Sales', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80', color: 'green', row: 0 },
    { name: 'David Kumar', role: 'Travel Consultant', dept: 'Sales', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80', color: 'green', row: 1 },
    { name: 'Lisa Anderson', role: 'Sales Associate', dept: 'Sales', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&q=80', color: 'green', row: 1 },
    { name: 'James Wilson', role: 'Account Manager', dept: 'Sales', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80', color: 'green', row: 1 },
    { name: 'Sophia Lee', role: 'Client Relations', dept: 'Sales', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80', color: 'green', row: 1 },
    { name: 'Robert Taylor', role: 'Sales Coordinator', dept: 'Sales', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80', color: 'green', row: 2 },
    { name: 'Olivia Brown', role: 'Customer Success', dept: 'Sales', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80', color: 'green', row: 2 },
    
    // Tech Team (8 people)
    { name: 'Priya Patel', role: 'CTO', dept: 'Technology', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80', color: 'purple', row: 1 },
    { name: 'Alex Martinez', role: 'Lead Developer', dept: 'Technology', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&q=80', color: 'purple', row: 1 },
    { name: 'Nina Zhang', role: 'Full Stack Dev', dept: 'Technology', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80', color: 'purple', row: 2 },
    { name: 'Tom Harris', role: 'Backend Engineer', dept: 'Technology', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&q=80', color: 'purple', row: 2 },
    { name: 'Mia Johnson', role: 'Frontend Dev', dept: 'Technology', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&q=80', color: 'purple', row: 2 },
    { name: 'Kevin White', role: 'DevOps Engineer', dept: 'Technology', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&q=80', color: 'purple', row: 2 },
    { name: 'Rachel Green', role: 'QA Engineer', dept: 'Technology', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80', color: 'purple', row: 3 },
    { name: 'Chris Evans', role: 'UI/UX Designer', dept: 'Technology', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=300&q=80', color: 'purple', row: 3 },
    
    // Marketing Team (6 people)
    { name: 'Emma Rodriguez', role: 'Marketing Director', dept: 'Marketing', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&q=80', color: 'orange', row: 0 },
    { name: 'Daniel Kim', role: 'Content Lead', dept: 'Marketing', image: 'https://images.unsplash.com/photo-1520409364224-63400afe26e5?w=300&q=80', color: 'orange', row: 2 },
    { name: 'Sophie Turner', role: 'Social Media Manager', dept: 'Marketing', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&q=80', color: 'orange', row: 3 },
    { name: 'Marcus Bell', role: 'SEO Specialist', dept: 'Marketing', image: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=300&q=80', color: 'orange', row: 3 },
    { name: 'Isabella Cruz', role: 'Brand Manager', dept: 'Marketing', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&q=80', color: 'orange', row: 3 },
    { name: 'Ryan Moore', role: 'Graphic Designer', dept: 'Marketing', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80', color: 'orange', row: 3 },
    
    // Operations (6 people)
    { name: 'Amanda Singh', role: 'Operations Manager', dept: 'Operations', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&q=80', color: 'teal', row: 0 },
    { name: 'Lucas Gray', role: 'Logistics Coordinator', dept: 'Operations', image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=300&q=80', color: 'teal', row: 1 },
    { name: 'Zoe Adams', role: 'HR Manager', dept: 'Operations', image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=300&q=80', color: 'teal', row: 2 },
    { name: 'Nathan Scott', role: 'Financial Analyst', dept: 'Operations', image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=300&q=80', color: 'teal', row: 3 },
    { name: 'Grace Miller', role: 'Admin Coordinator', dept: 'Operations', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&q=80', color: 'teal', row: 3 },
    { name: 'Ethan Brooks', role: 'Office Manager', dept: 'Operations', image: 'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=300&q=80', color: 'teal', row: 3 }
  ];

  // Group by rows for different scroll speeds
  const rows = [
    teamMembers.filter(m => m.row === 0),
    teamMembers.filter(m => m.row === 1),
    teamMembers.filter(m => m.row === 2),
    teamMembers.filter(m => m.row === 3)
  ];

  const colorMap = {
    blue: { bg: 'from-brand-blue to-blue-700', text: 'text-brand-blue', ring: 'ring-brand-blue' },
    green: { bg: 'from-emerald-500 to-teal-600', text: 'text-emerald-600', ring: 'ring-emerald-500' },
    purple: { bg: 'from-purple-500 to-indigo-600', text: 'text-purple-600', ring: 'ring-purple-500' },
    orange: { bg: 'from-orange-500 to-pink-600', text: 'text-orange-600', ring: 'ring-orange-500' },
    teal: { bg: 'from-teal-500 to-cyan-600', text: 'text-teal-600', ring: 'ring-teal-500' }
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTEwIDBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] " />
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 text-sm font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/20 rounded-full mb-4">
            Our Amazing Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">30 People, One Dream</h2>
          <p className="text-lg text-white/80">Hover over anyone to pause and learn more</p>
        </div>
      </Container>

      {/* Multi-Row Scrolling Gallery */}
      <div className="relative space-y-6">
        {rows.map((rowMembers, rowIndex) => {
          const scrollSpeed = 30 + (rowIndex * 10); // Different speeds: 30s, 40s, 50s, 60s
          const direction = rowIndex % 2 === 0 ? 'scroll-left' : 'scroll-right';
          
          return (
            <div key={rowIndex} className="overflow-hidden relative">
              <div
                className={`flex gap-6 ${direction}`}
                style={{
                  animation: `${direction} ${scrollSpeed}s linear infinite`,
                  animationPlayState: hoveredMember?.row === rowIndex ? 'paused' : 'running'
                }}
              >
                {/* Duplicate items for seamless loop */}
                {[...rowMembers, ...rowMembers].map((member, idx) => (
                  <div
                    key={`${member.name}-${idx}`}
                    className="flex-shrink-0 w-72 group cursor-pointer"
                    onMouseEnter={() => setHoveredMember(member)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    <div className={`relative bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-500 ${
                      hoveredMember?.name === member.name ? 'scale-110 shadow-2xl ring-4 ' + colorMap[member.color].ring : ''
                    }`}>
                      {/* Image */}
                      <div className="relative h-80 overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${colorMap[member.color].bg} opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                        
                        {/* Department Badge */}
                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r ${colorMap[member.color].bg} text-white text-xs font-bold uppercase tracking-wider`}>
                          {member.dept}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-6 bg-white">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                        <p className={`font-semibold ${colorMap[member.color].text}`}>{member.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .scroll-left {
          animation-name: scroll-left;
        }

        .scroll-right {
          animation-name: scroll-right;
        }
      `}</style>
    </section>
  );
}
