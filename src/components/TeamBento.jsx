"use client";
import { useState, useEffect } from 'react';
import Container from "@/components/ui/Container";
import { Users } from 'lucide-react';
import { getEmployees } from "@/utils/firebase";

export default function TeamBento() {
  const [filter, setFilter] = useState('All');
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await getEmployees();
        // If data exists, use it. Otherwise loop/fallback or just show empty.
        // Assuming the collection has documents with: name, role, dept, image, size (optional), quote (optional)
        if (data && data.length > 0) {
            setTeamMembers(data);
        } else {
            // Fallback content if needed, or leave empty
            setTeamMembers([]);
        }
      } catch (error) {
        console.error("Failed to fetch team members", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  // Compute departments dynamically from data
  // Using a Set to get unique departments, always including 'All'
  const departments = ['All', ...new Set(teamMembers.map(m => m.dept).filter(Boolean))];
  
  const filteredMembers = filter === 'All' 
    ? teamMembers 
    : teamMembers.filter(m => m.dept === filter);

  if (loading) {
    return (
        <section className="py-20 bg-slate-50 min-h-[500px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
        </section>
    );
  }

  if (teamMembers.length === 0) {
      return null; // Or return a "We are hiring" block
  }

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-white via-slate-50 to-white relative overflow-hidden">
      <Container>
        {/* Header with Filters */}
        <div className="mb-6 md:mb-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-brand-blue" />
              <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-brand-blue">
                Meet Our Team
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-3">
              Meet The Dream Team
            </h2>
            <p className="text-sm md:text-lg text-slate-600">Click a department to filter, or view all</p>
          </div>

          {/* Department Filters - Responsive */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setFilter(dept)}
                className={`px-3 py-2 md:px-6 md:py-3 rounded-full font-bold text-xs md:text-sm uppercase tracking-wider transition-all duration-300 ${
                  filter === dept
                    ? 'bg-gradient-to-r from-brand-blue to-purple-600 text-white shadow-lg scale-105 md:scale-110'
                    : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-brand-blue hover:text-brand-blue'
                }`}
              >
                <span className="hidden sm:inline">{dept}</span>
                <span className="sm:hidden">{dept === 'All' ? 'All' : dept.slice(0, 4)}</span>
                {dept !== 'All' && <span className="ml-1">({teamMembers.filter(m => m.dept === dept).length})</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid - Responsive */}
        <div className="grid grid-cols-6 md:grid-cols-12 gap-2 md:gap-4 auto-rows-[160px] md:auto-rows-[300px]">
          {filteredMembers.map((member, idx) => {
            // Define unique grid spans for bento grid effect - Mobile responsive
            const gridClass = member.size === 'large' 
              ? 'col-span-6 md:col-span-6 row-span-2' 
              : member.size === 'medium'
              ? 'col-span-3 sm:col-span-6 md:col-span-4 row-span-1'
              : 'col-span-3 sm:col-span-3 md:col-span-3 row-span-1';

            // Identify special roles if needed, or rely on data field e.g. member.isFounder
            const isFounder = member.role?.toLowerCase().includes('ceo') || member.role?.toLowerCase().includes('founder');

            return (
              <div
                key={member.id || idx}
                className={`group relative ${gridClass} rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:z-10 ${
                  isFounder ? 'ring-2 md:ring-4 ring-amber-400 ring-offset-2 md:ring-offset-4' : ''
                }`}
              >
                {/* Image Background */}
                <div className="absolute inset-0">
                  {member.image ? (
                    <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                        <Users className="w-12 h-12" />
                    </div>
                  )}
                  {/* Dark overlay instead of gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-3 md:p-6 flex flex-col justify-end text-white">
                  {/* Department Badge */}
                  {member.dept && (
                    <div className={`absolute top-2 md:top-4 left-2 md:left-4 px-2 md:px-3 py-1 rounded-full backdrop-blur-sm text-xs font-bold uppercase tracking-wider ${
                        isFounder ? 'bg-amber-500 text-white' : 'bg-white/20'
                    }`}>
                        <span className="hidden sm:inline">{member.dept}</span>
                        <span className="sm:hidden">{member.dept.slice(0, 3)}</span>
                    </div>
                  )}

                  {/* Founder Crown Icon */}
                  {isFounder && (
                    <div className="absolute top-2 md:top-4 right-2 md:right-4 text-2xl md:text-4xl">👑</div>
                  )}

                  {/* Name & Role */}
                  <div className="transform group-hover:-translate-y-2 transition-transform">
                    <h3 className={`font-bold mb-0.5 md:mb-1 ${member.size === 'large' ? 'text-lg sm:text-2xl md:text-4xl' : 'text-sm sm:text-base md:text-xl'}`}>
                      {member.name}
                    </h3>
                    <p className={`font-semibold opacity-90 ${member.size === 'large' ? 'text-xs sm:text-sm md:text-lg' : 'text-xs sm:text-sm'}`}>
                      {member.role}
                    </p>
                    {member.quote && (
                      <p className="text-xs md:text-sm mt-1 md:mt-2 italic opacity-80 hidden md:block">&quot;{member.quote}&quot;</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

