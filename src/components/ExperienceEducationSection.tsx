import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Award, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { NeonTheme, TimelineItem } from '../types';

interface ExperienceEducationSectionProps {
  theme: NeonTheme;
}

export const ExperienceEducationSection: React.FC<ExperienceEducationSectionProps> = ({ theme }) => {
  const { timeline: timelineData } = usePortfolio();
  const [filter, setFilter] = useState<'all' | 'experience' | 'education'>('all');

  const filteredItems = timelineData.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  const getThemeNodeClass = (t: NeonTheme) => {
    switch (t) {
      case 'green': return 'bg-emerald-500 shadow-[0_0_15px_#10b981] border-emerald-300';
      case 'purple': return 'bg-purple-500 shadow-[0_0_15px_#a855f7] border-purple-300';
      case 'cyan': default: return 'bg-cyan-500 shadow-[0_0_15px_#06b6d4] border-cyan-300';
    }
  };

  const getThemeTextClass = (t: NeonTheme) => {
    switch (t) {
      case 'green': return 'text-emerald-400';
      case 'purple': return 'text-purple-400';
      case 'cyan': default: return 'text-cyan-400';
    }
  };

  return (
    <section id="experience" className="py-24 relative z-10 border-t border-slate-800/80 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-400">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>SECTION_03 // CAREER & ACADEMIC LOG</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100">
            Education & <span className={getThemeTextClass(theme)}>Experience</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-sans">
            A chronological timeline detailing my professional employment, key responsibilities, and Post-HSC higher education.
          </p>
        </div>

        {/* Filter Toggles */}
        <div className="flex justify-center mb-16 font-mono text-xs">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 gap-1 backdrop-blur-xl">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === 'all' ? 'bg-slate-800 text-cyan-400 font-bold border border-slate-700 shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Milestones
            </button>
            <button
              onClick={() => setFilter('experience')}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === 'experience' ? 'bg-slate-800 text-cyan-400 font-bold border border-slate-700 shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Work Experience
            </button>
            <button
              onClick={() => setFilter('education')}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === 'education' ? 'bg-slate-800 text-cyan-400 font-bold border border-slate-700 shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Post-HSC Education
            </button>
          </div>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Central Connecting Laser Beam Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-emerald-500 to-purple-500 opacity-40 -translate-x-1/2" />

          <div className="space-y-12">
            {filteredItems.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Timeline Glowing Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-1 z-20 flex items-center justify-center">
                    <span className={`w-4 h-4 rounded-full border-2 ${getThemeNodeClass(theme)}`} />
                  </div>

                  {/* Timeline Content Card */}
                  <div className={`w-full md:w-[calc(50%-2.5rem)] pl-12 md:pl-0 ${
                    isEven ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                  }`}>
                    
                    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all shadow-xl backdrop-blur-xl group">
                      
                      {/* Period Badge & Type */}
                      <div className={`flex items-center gap-2 mb-3 text-xs font-mono ${
                        isEven ? 'md:justify-end' : 'md:justify-start'
                      }`}>
                        <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-cyan-400 font-bold flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.period}
                        </span>
                        <span className="text-slate-500 uppercase tracking-widest text-[10px]">
                          [{item.type}]
                        </span>
                      </div>

                      {/* Title & Organization */}
                      <h3 className="text-xl font-bold font-mono text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm font-mono text-slate-300 flex items-center gap-1.5 mt-1 text-cyan-400/90 font-semibold">
                        {item.type === 'experience' ? <Briefcase className="w-3.5 h-3.5 inline" /> : <GraduationCap className="w-3.5 h-3.5 inline" />}
                        {item.organization}
                      </p>
                      <p className="text-xs text-slate-500 font-mono mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {item.location}
                      </p>

                      <p className="text-sm text-slate-300 font-sans mt-3 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Bullet Highlights */}
                      <ul className="mt-4 space-y-2 text-xs font-sans text-slate-300 text-left">
                        {item.highlights.map((hl, hlIdx) => (
                          <li key={hlIdx} className="flex items-start gap-2">
                            <ChevronRight className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Tags */}
                      <div className={`flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-800/80 ${
                        isEven ? 'md:justify-end' : 'md:justify-start'
                      }`}>
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                    </div>

                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
