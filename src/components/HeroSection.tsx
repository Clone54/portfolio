import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Terminal, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MessageSquare, 
  Code2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Cpu
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { NeonTheme } from '../types';

interface HeroSectionProps {
  theme: NeonTheme;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ theme, onOpenResume }) => {
  const { developerBio, socialLinks } = usePortfolio();

  // Typing Effect state
  const [typedIndex, setTypedIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = developerBio.typedTitles;

  useEffect(() => {
    const targetTitle = titles[typedIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === targetTitle) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setTypedIndex((prev) => (prev + 1) % titles.length);
      } else {
        setCurrentText(
          isDeleting
            ? targetTitle.substring(0, currentText.length - 1)
            : targetTitle.substring(0, currentText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, typedIndex, titles]);

  const getThemeTextClass = (t: NeonTheme) => {
    switch (t) {
      case 'green': return 'text-[#00FF41] shadow-neon-green';
      case 'purple': return 'text-purple-400 shadow-neon-purple';
      case 'cyan': default: return 'text-[#00E5FF] shadow-neon-cyan';
    }
  };

  const getButtonClass = (t: NeonTheme) => {
    switch (t) {
      case 'green':
        return 'bg-[#00FF41] text-black hover:brightness-110 border border-[#00FF41] shadow-neon-green';
      case 'purple':
        return 'bg-purple-500/10 border-purple-500/40 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 shadow-neon-purple';
      case 'cyan':
      default:
        return 'bg-[#00E5FF] text-black hover:brightness-110 border border-[#00E5FF] shadow-neon-cyan';
    }
  };

  const renderSocialIcon = (name: string) => {
    switch (name) {
      case 'GitHub': return <Github className="w-5 h-5" />;
      case 'LinkedIn': return <Linkedin className="w-5 h-5" />;
      case 'Twitter': return <Twitter className="w-5 h-5" />;
      case 'WhatsApp': return <MessageSquare className="w-5 h-5" />;
      case 'Email': default: return <Mail className="w-5 h-5" />;
    }
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-[92vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Designation, Typing Animation, Intro & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* System Initiated Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-slate-300 tracking-wider">
                SYSTEM INITIATED // OPEN FOR OPPORTUNITIES
              </span>
            </motion.div>

            {/* Developer Greeting & Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <h2 className="text-sm sm:text-base font-mono text-cyan-400 tracking-widest uppercase">
                Hello World, I'm
              </h2>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100">
                {developerBio.name}
              </h1>
            </motion.div>

            {/* Typing Designation Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-14 sm:h-16 flex items-center bg-slate-900/70 p-3 sm:p-4 rounded-xl border border-slate-800/90 font-mono text-lg sm:text-2xl lg:text-3xl font-bold backdrop-blur-md"
            >
              <span className="text-cyan-500 mr-2">&gt;</span>
              <span className={`bg-gradient-to-r from-slate-100 via-slate-200 to-cyan-300 bg-clip-text text-transparent ${getThemeTextClass(theme)}`}>
                {currentText}
              </span>
              <span className="w-3 h-6 sm:h-8 ml-1 bg-cyan-400 animate-pulse inline-block" />
            </motion.div>

            {/* Bio Brief Summary */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-sans"
            >
              {developerBio.bioSummary}
            </motion.p>

            {/* Call To Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {/* Glowing Download Resume Button */}
              <button
                onClick={onOpenResume}
                className={`px-6 py-3.5 rounded-xl font-mono font-bold text-sm tracking-wide border transition-all duration-300 flex items-center gap-2.5 group ${getButtonClass(theme)}`}
                data-cursor-label="DOWNLOAD"
              >
                <FileText className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>DOWNLOAD RESUME (PDF)</span>
              </button>

              {/* View Projects CTA */}
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl font-mono text-sm font-semibold text-slate-300 bg-slate-900/90 border border-slate-800 hover:border-slate-700 hover:text-cyan-400 hover:bg-slate-800/80 transition-all flex items-center gap-2 group"
                data-cursor-label="PROJECTS"
              >
                <span>EXPLORE PROJECTS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-cyan-400" />
              </a>
            </motion.div>

            {/* Social Media Neon Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="pt-4 flex flex-col gap-2"
            >
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                Connect Across Networks:
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800/90 hover:scale-105 transition-all shadow-md group relative"
                    title={`${social.name} (${social.username})`}
                    data-cursor-label={social.name.toUpperCase()}
                  >
                    {renderSocialIcon(social.name)}
                    <span className="sr-only">{social.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Column: Stylized Developer Holographic Profile Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-sm sm:max-w-md"
            >
              {/* Holographic Glowing Outer Box Frame */}
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-3 border border-slate-800 shadow-2xl backdrop-blur-xl">
                
                {/* Top Terminal Bar Header */}
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800 font-mono text-xs text-slate-400 px-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] text-cyan-400/90 tracking-wider">
                    PROFILE_AVATAR.RAW
                  </span>
                  <Terminal className="w-3.5 h-3.5 text-slate-500" />
                </div>

                {/* Stylized Developer Image Container */}
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-slate-950 border border-slate-800/90 group">
                  <img
                    src={developerBio.profilePicture || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"}
                    alt={`${developerBio.name} - Full Stack Developer`}
                    className="w-full h-full object-cover object-center filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  
                  {/* Neon Color Tint Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <div className="absolute inset-0 scanlines opacity-50 pointer-events-none" />

                  {/* Corner Tech Reticle Markers */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

                  {/* Floating Live Telemetry Chip */}
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-3 rounded-xl border border-cyan-500/30 font-mono text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-200">
                      <span className="text-cyan-400 font-bold flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-amber-400" /> STACK_READY
                      </span>
                      <span className="text-emerald-400 text-[10px]">99.9% UPTIME</span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">
                      MERN • WebGL • TypeScript • GraphQL
                    </p>
                  </div>
                </div>

                {/* Floating Orbit Tech Badges */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 shadow-xl font-mono text-xs flex items-center gap-2 backdrop-blur-md"
                >
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-200 font-bold">4+ Yrs Exp</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 shadow-xl font-mono text-xs flex items-center gap-2 backdrop-blur-md"
                >
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-200 font-bold">Remote Ready</span>
                </motion.div>

              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
