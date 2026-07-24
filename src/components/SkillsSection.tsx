import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Server, 
  Database, 
  Wrench, 
  Search, 
  Sparkles, 
  Cpu, 
  Box, 
  Palette, 
  Zap, 
  Bot, 
  HardDrive, 
  GitBranch, 
  FileCode, 
  CheckCircle2 
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { NeonTheme, Skill } from '../types';

interface SkillsSectionProps {
  theme: NeonTheme;
}

type CategoryFilter = 'All' | 'Frontend' | 'Backend' | 'Database & Cloud' | 'Tools & Architecture';

export const SkillsSection: React.FC<SkillsSectionProps> = ({ theme }) => {
  const { skills: skillsData } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: CategoryFilter[] = ['All', 'Frontend', 'Backend', 'Database & Cloud', 'Tools & Architecture'];

  const filteredSkills = skillsData.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getThemeProgressClass = (t: NeonTheme) => {
    switch (t) {
      case 'green': return 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_12px_#10b981]';
      case 'purple': return 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_12px_#a855f7]';
      case 'cyan': default: return 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_12px_#06b6d4]';
    }
  };

  const getThemeTextClass = (t: NeonTheme) => {
    switch (t) {
      case 'green': return 'text-emerald-400';
      case 'purple': return 'text-purple-400';
      case 'cyan': default: return 'text-cyan-400';
    }
  };

  const renderSkillIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.CheckCircle2;

    let colorClass = "text-cyan-400";
    switch (iconName) {
      case 'FileCode': colorClass = "text-blue-400"; break;
      case 'Box': colorClass = "text-amber-400"; break;
      case 'Palette': colorClass = "text-purple-400"; break;
      case 'Sparkles': colorClass = "text-pink-400"; break;
      case 'Server': colorClass = "text-emerald-400"; break;
      case 'Zap': colorClass = "text-amber-300"; break;
      case 'Cpu': colorClass = "text-indigo-400"; break;
      case 'Database': colorClass = "text-green-400"; break;
      case 'HardDrive': colorClass = "text-rose-400"; break;
      case 'GitBranch': colorClass = "text-orange-400"; break;
      case 'Bot': colorClass = "text-cyan-300"; break;
      case 'CheckCircle2': colorClass = "text-emerald-400"; break;
      case 'Atom': colorClass = "text-cyan-400"; break; // React
      case 'FileJson': colorClass = "text-yellow-400"; break; // JS
      case 'Leaf': colorClass = "text-green-500"; break; // MongoDB
      case 'Flame': colorClass = "text-orange-500"; break; // Firebase
    }

    return <IconComponent className={`w-5 h-5 ${colorClass}`} />;
  };

  return (
    <section id="skills" className="py-24 relative z-10 border-t border-slate-800/80 bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>SECTION_02 // TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100">
            Technical <span className={getThemeTextClass(theme)}>Skills & Stack</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-sans">
            A graphical, performance-indexed matrix of frontend, backend, database, and DevOps tools in my daily workflow.
          </p>
        </div>

        {/* Controls Bar: Category Tabs & Real-Time Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 bg-slate-900/80 p-3 rounded-2xl border border-slate-800 backdrop-blur-xl">
          
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-slate-800 text-slate-100 border border-slate-700 shadow-md font-bold' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
                data-cursor-label="FILTER"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. React, Docker)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-slate-100 outline-none focus:border-cyan-500/50 transition-colors"
              data-cursor-label="SEARCH"
            />
          </div>

        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700/90 transition-all shadow-xl backdrop-blur-xl group hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                      {renderSkillIcon(skill.iconName)}
                    </div>
                    <div>
                      <h3 className="font-mono font-bold text-base text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  {/* Level Badge */}
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border font-bold ${
                    skill.levelLabel === 'Expert' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                  }`}>
                    {skill.levelLabel}
                  </span>
                </div>

                <p className="text-xs text-slate-400 font-sans mb-4 min-h-[36px] line-clamp-2">
                  {skill.description}
                </p>

                {/* Graphical Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500 text-[11px]">Proficiency Meter:</span>
                    <span className="text-slate-200 font-bold">{skill.proficiency}%</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800/90 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={`h-full rounded-full ${getThemeProgressClass(theme)}`}
                    />
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 font-mono text-slate-500 text-sm">
            No matching skills found for "{searchQuery}".
          </div>
        )}

      </div>
    </section>
  );
};
