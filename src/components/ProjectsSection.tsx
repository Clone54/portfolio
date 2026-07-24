import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  ArrowRight, 
  Star, 
  GitFork, 
  Clock, 
  Layers,
  Sparkles,
  Eye
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { NeonTheme, Project } from '../types';

interface ProjectsSectionProps {
  theme: NeonTheme;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ theme }) => {
  const { projects: projectsData } = usePortfolio();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Full-Stack', 'Frontend / 3D', 'AI Integration'];

  const filteredProjects = projectsData.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  const getThemeTextClass = (t: NeonTheme) => {
    switch (t) {
      case 'green': return 'text-emerald-400';
      case 'purple': return 'text-purple-400';
      case 'cyan': default: return 'text-cyan-400';
    }
  };

  const getThemeButtonClass = (t: NeonTheme) => {
    switch (t) {
      case 'green':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-400 shadow-neon-green';
      case 'purple':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-400 shadow-neon-purple';
      case 'cyan':
      default:
        return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400 shadow-neon-cyan';
    }
  };

  return (
    <section id="projects" className="py-24 relative z-10 border-t border-slate-800/80 bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-400">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>SECTION_04 // FEATURED REPOSITORIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100">
            Featured <span className={getThemeTextClass(theme)}>Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-sans">
            A showcase of enterprise web apps, WebGL 3D visualizations, real-time SaaS platforms, and AI tools.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12 font-mono text-xs overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 gap-1 backdrop-blur-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-slate-800 text-slate-100 border border-slate-700 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                data-cursor-label="FILTER"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700/90 transition-all shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col group hover:-translate-y-1.5"
              >
                
                {/* Project Image Viewport Frame */}
                <div className="relative aspect-[16/9] bg-slate-950 overflow-hidden border-b border-slate-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Category Tag Overlay */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 font-mono text-[10px]">
                    <span className="px-2.5 py-1 rounded-full bg-slate-950/90 border border-slate-800 text-cyan-400 font-bold backdrop-blur-md">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold flex items-center gap-1 backdrop-blur-md">
                        <Sparkles className="w-3 h-3 text-amber-400" /> FEATURED
                      </span>
                    )}
                  </div>

                  {/* Quick Stat Counter */}
                  <div className="absolute top-3 right-3 flex items-center gap-2 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-slate-950/90 border border-slate-800 text-slate-300 flex items-center gap-1 backdrop-blur-md">
                      <Star className="w-3 h-3 text-amber-400" /> {project.starsCount}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-950/90 border border-slate-800 text-slate-300 flex items-center gap-1 backdrop-blur-md">
                      <GitFork className="w-3 h-3 text-cyan-400" /> {project.forksCount}
                    </span>
                  </div>

                  {/* Quick Overlay Action on Hover */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <button
                      onClick={() => navigate(`/project/${project.id}`)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold border transition-all flex items-center gap-2 ${getThemeButtonClass(theme)}`}
                      data-cursor-label="DETAILS"
                    >
                      <Eye className="w-4 h-4" />
                      <span>VIEW FULL DETAILS</span>
                    </button>
                  </div>
                </div>

                {/* Project Details Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-mono text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400/90 mt-1">
                      {project.subtitle}
                    </p>
                    <p className="text-sm text-slate-300 font-sans mt-3 line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Main Tech Stack Badges */}
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                      {project.techStack.frontend.slice(0, 3).map((tech, i) => (
                        <span key={`frontend-${tech}-${i}`} className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-300">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.backend.slice(0, 2).map((tech, i) => (
                        <span key={`backend-${tech}-${i}`} className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-emerald-400/90">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.database.slice(0, 1).map((tech, i) => (
                        <span key={`database-${tech}-${i}`} className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-purple-400/90">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
                      
                      {/* View Details Route Button */}
                      <button
                        onClick={() => navigate(`/project/${project.id}`)}
                        className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1.5 transition-colors group/btn"
                        data-cursor-label="DETAILS"
                      >
                        <span>VIEW DETAILS</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>

                      {/* Links */}
                      <div className="flex items-center gap-2">
                        <a
                          href={project.githubClient}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-colors"
                          title="GitHub Client Repository"
                          data-cursor-label="GITHUB"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                          title="Live Demo Link"
                          data-cursor-label="DEMO"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>

                    </div>
                  </div>

                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
