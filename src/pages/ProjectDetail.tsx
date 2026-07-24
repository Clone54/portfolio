import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Clock, 
  Star, 
  GitFork, 
  Code2, 
  Server, 
  Database, 
  Wrench,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { NeonTheme } from '../types';

interface ProjectDetailProps {
  theme: NeonTheme;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ theme }) => {
  const { projects: projectsData } = usePortfolio();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const projectIndex = projectsData.findIndex((p) => p.id === id);
  const project = projectsData[projectIndex];

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-mono text-slate-300">
        <h1 className="text-3xl font-bold text-rose-400 mb-2">404 // PROJECT NOT FOUND</h1>
        <p className="text-sm text-slate-500 mb-6">The project repository ID '{id}' could not be located.</p>
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 flex items-center gap-2 hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Portfolio
        </button>
      </div>
    );
  }

  const prevProject = projectsData[(projectIndex - 1 + projectsData.length) % projectsData.length];
  const nextProject = projectsData[(projectIndex + 1) % projectsData.length];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = [project.image, ...(project.images || [])];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const getThemeTextClass = (t: NeonTheme) => {
    switch (t) {
      case 'green': return 'text-emerald-400';
      case 'purple': return 'text-purple-400';
      case 'cyan': default: return 'text-cyan-400';
    }
  };

  const getButtonClass = (t: NeonTheme) => {
    switch (t) {
      case 'green':
        return 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-400 shadow-neon-green';
      case 'purple':
        return 'bg-purple-500/10 border-purple-500/40 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 shadow-neon-purple';
      case 'cyan':
      default:
        return 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 shadow-neon-cyan';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative z-10 pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-400 pb-6 border-b border-slate-800">
          <button
            onClick={() => navigate('/#projects')}
            className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors group"
            data-cursor-label="BACK"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-cyan-400" />
            <span>RETURN TO ALL PROJECTS</span>
          </button>

          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>HOME</span>
            <span>/</span>
            <span>PROJECTS</span>
            <span>/</span>
            <span className="text-cyan-400 font-bold">{project.id}</span>
          </div>
        </div>

        {/* Project Title Header Banner */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 font-bold">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {project.duration}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-400 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400" /> {project.starsCount} Stars
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1">
              <GitFork className="w-3.5 h-3.5 text-cyan-400" /> {project.forksCount} Forks
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-mono text-slate-100">
            {project.title}
          </h1>
          <p className="text-base sm:text-xl text-cyan-400/90 font-mono">
            {project.subtitle}
          </p>

          {/* Action Callouts Header */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-3 rounded-xl font-mono text-sm font-bold border transition-all flex items-center gap-2 ${getButtonClass(theme)}`}
              data-cursor-label="LIVE DEMO"
            >
              <ExternalLink className="w-4 h-4" />
              <span>LAUNCH LIVE APP DEMO</span>
            </a>

            <a
              href={project.githubClient}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-mono text-sm font-semibold bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-slate-100 transition-all flex items-center gap-2"
              data-cursor-label="CLIENT REPO"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              <span>CLIENT REPOSITORY</span>
            </a>

            {project.githubServer && (
              <a
                href={project.githubServer}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl font-mono text-sm font-semibold bg-slate-900 border border-slate-800 hover:border-slate-700 text-emerald-400 hover:text-emerald-300 transition-all flex items-center gap-2"
                data-cursor-label="SERVER REPO"
              >
                <Server className="w-4 h-4" />
                <span>BACKEND REPOSITORY</span>
              </a>
            )}
          </div>
        </div>

        {/* Main Featured Image Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[16/9] shadow-2xl group">
          <img
            key={currentImageIndex}
            src={galleryImages[currentImageIndex]}
            alt={`${project.title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover object-center filter contrast-110 animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
          
          {galleryImages.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              {/* Pagination Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === currentImageIndex ? 'bg-cyan-400 w-6' : 'bg-slate-600 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Comprehensive Description & Architecture Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview */}
            <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
              <h2 className="text-xl font-bold font-mono text-cyan-400 flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                01 // PROJECT OVERVIEW
              </h2>
              <p className="text-slate-200 text-base leading-relaxed font-sans">
                {project.description}
              </p>
            </div>

            {/* Key Features */}
            <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
              <h2 className="text-xl font-bold font-mono text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                02 // KEY SYSTEM FEATURES
              </h2>
              <ul className="space-y-3 font-sans text-sm text-slate-300">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* System Architecture */}
            <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
              <h2 className="text-xl font-bold font-mono text-purple-400 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-purple-400" />
                03 // SYSTEM ARCHITECTURE & WORKFLOW
              </h2>
              <p className="text-slate-300 text-sm font-sans leading-relaxed">
                {project.architectureOverview}
              </p>
            </div>

            {/* Challenges Faced Section */}
            <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-6">
              <h2 className="text-xl font-bold font-mono text-amber-400 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                04 // CHALLENGES FACED & SOLUTIONS
              </h2>
              <div className="space-y-4">
                {project.challenges.map((ch, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-sans">
                    <h3 className="font-mono font-bold text-base text-rose-300 flex items-center gap-2">
                      <span className="text-rose-400">[ISSUE_0{idx + 1}]</span> {ch.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      <strong className="text-slate-300 font-mono">Problem:</strong> {ch.description}
                    </p>
                    <div className="p-3 rounded-lg bg-slate-900/90 border border-emerald-500/30 text-xs text-emerald-300">
                      <strong className="font-mono text-emerald-400">Solution Strategy:</strong> {ch.solution}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Future Plans Section */}
            <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
              <h2 className="text-xl font-bold font-mono text-cyan-400 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                05 // POTENTIAL IMPROVEMENTS & FUTURE ROADMAP
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs">
                {project.futurePlans.map((plan, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 flex items-start gap-2.5">
                    <span className="text-cyan-400 font-mono font-bold">0{idx + 1}.</span>
                    <span>{plan}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Technology Stack Breakdown Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-6">
              <h2 className="text-base font-bold font-mono text-slate-100 tracking-wider uppercase border-b border-slate-800 pb-3">
                Tech Stack Categorized
              </h2>

              {/* Frontend Tags */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 font-bold">
                  <Code2 className="w-3.5 h-3.5" /> FRONTEND
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {project.techStack.frontend.map((item, idx) => (
                    <span key={`frontend-${item}-${idx}`} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend Tags */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
                  <Server className="w-3.5 h-3.5" /> BACKEND
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {project.techStack.backend.map((item, idx) => (
                    <span key={`backend-${item}-${idx}`} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Database Tags */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-purple-400 flex items-center gap-1.5 font-bold">
                  <Database className="w-3.5 h-3.5" /> DATABASE & CACHE
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {project.techStack.database.map((item, idx) => (
                    <span key={`database-${item}-${idx}`} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools Tags */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-amber-400 flex items-center gap-1.5 font-bold">
                  <Wrench className="w-3.5 h-3.5" /> DEVOPS & TOOLS
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {project.techStack.tools.map((item, idx) => (
                    <span key={`tools-${item}-${idx}`} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Live Status Container */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl font-mono text-xs space-y-3">
              <div className="flex items-center justify-between text-slate-300">
                <span>DEPLOYMENT STATUS:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> LIVE
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>REPOSITORY:</span>
                <span className="text-cyan-400">PUBLIC / MIT</span>
              </div>
            </div>

          </div>

        </div>

        {/* Project Switcher Footer Navigation */}
        <div className="pt-12 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
          <Link
            to={`/project/${prevProject.id}`}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center gap-4 group"
            data-cursor-label="PREV"
          >
            <ChevronLeft className="w-6 h-6 text-cyan-400 group-hover:-translate-x-1 transition-transform shrink-0" />
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">// PREVIOUS REPO</span>
              <p className="font-bold text-sm text-slate-200 group-hover:text-cyan-300 truncate">{prevProject.title}</p>
            </div>
          </Link>

          <Link
            to={`/project/${nextProject.id}`}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center justify-end gap-4 text-right group"
            data-cursor-label="NEXT"
          >
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">// NEXT REPO</span>
              <p className="font-bold text-sm text-slate-200 group-hover:text-cyan-300 truncate">{nextProject.title}</p>
            </div>
            <ChevronRight className="w-6 h-6 text-cyan-400 group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>
        </div>

      </div>
    </div>
  );
};
