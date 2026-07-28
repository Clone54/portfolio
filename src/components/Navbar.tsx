import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Menu, 
  X, 
  Palette, 
  FileText, 
  Sparkles,
  ChevronRight,
  Volume2,
  VolumeX
} from 'lucide-react';
import { NeonTheme } from '../types';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  theme: NeonTheme;
  setTheme: (t: NeonTheme) => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, setTheme, onOpenResume }) => {
  const { isSoundEnabled, toggleSound, playSound } = usePortfolio();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [themeDropdown, setThemeDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    playSound('click');
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/#' + targetId);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', '#' + targetId);
        setActiveSection(targetId);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: 'Home', href: '/#home', id: 'home' },
    { name: 'About', href: '/#about', id: 'about' },
    { name: 'Skills', href: '/#skills', id: 'skills' },
    { name: 'Experience', href: '/#experience', id: 'experience' },
    { name: 'Projects', href: '/#projects', id: 'projects' },
    { name: 'Contact', href: '/#contact', id: 'contact' },
  ];

  const getAccentClass = (t: NeonTheme) => {
    switch (t) {
      case 'green': return 'text-[#00FF41] border-[#00FF41]/40 hover:border-[#00FF41] bg-[#00FF41]/10 shadow-neon-green';
      case 'purple': return 'text-purple-400 border-purple-500/30 hover:border-purple-400 bg-purple-500/10 shadow-neon-purple';
      case 'cyan': default: return 'text-[#00E5FF] border-[#00E5FF]/40 hover:border-[#00E5FF] bg-[#00E5FF]/10 shadow-neon-cyan';
    }
  };

  const getActiveTextClass = (t: NeonTheme) => {
    switch (t) {
      case 'green': return 'text-[#00FF41] font-bold';
      case 'purple': return 'text-purple-400 font-bold';
      case 'cyan': default: return 'text-[#00E5FF] font-bold';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* Top IDE Tabs Bar */}
      <div className="hidden sm:flex items-center justify-between bg-[#0A0A0A] border-b border-[#1A1A1A] h-8 px-4 text-xs font-mono select-none">
        <div className="flex space-x-1 h-full items-end">
          <a href="/#home" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center space-x-1.5 px-3 py-1 bg-[#121212] border-t-2 border-[#00FF41] text-[11px] text-gray-200">
            <span className="text-[#00E5FF] text-[10px]">●</span>
            <span>portfolio.js</span>
          </a>
          <a href="/#skills" onClick={(e) => handleNavClick(e, 'skills')} className="flex items-center space-x-1.5 px-3 py-1 bg-[#080808] border-t border-[#1A1A1A] text-[11px] text-gray-400 hover:text-gray-200">
            <span className="text-amber-400 text-[10px]">●</span>
            <span>skills.json</span>
          </a>
          <a href="/#experience" onClick={(e) => handleNavClick(e, 'experience')} className="flex items-center space-x-1.5 px-3 py-1 bg-[#080808] border-t border-[#1A1A1A] text-[11px] text-gray-400 hover:text-gray-200">
            <span className="text-purple-400 text-[10px]">●</span>
            <span>experience.py</span>
          </a>
          <a href="/#projects" onClick={(e) => handleNavClick(e, 'projects')} className="flex items-center space-x-1.5 px-3 py-1 bg-[#080808] border-t border-[#1A1A1A] text-[11px] text-gray-400 hover:text-gray-200">
            <span className="text-[#00FF41] text-[10px]">●</span>
            <span>projects.ts</span>
          </a>
        </div>
        <div className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-2">
          <span>Status: <span className="text-[#00FF41] font-bold">Production Ready</span></span>
          <span className="text-[#1A1A1A]">|</span>
          <span>Latency: <span className="text-[#00E5FF]">24ms</span></span>
        </div>
      </div>

      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#080808]/90 backdrop-blur-xl border-b border-[#1A1A1A] py-2.5 shadow-2xl' 
          : 'bg-gradient-to-b from-[#080808]/90 to-transparent py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand / Logo */}
          <a 
            href="/#home" 
            onClick={(e) => handleNavClick(e, 'home')}
            className="group flex items-center gap-2.5 font-mono font-bold text-lg tracking-tight text-slate-100 hover:text-[#00FF41] transition-colors"
            data-cursor-label="HOME"
          >
            <div className="relative p-1.5 rounded-md bg-[#121212] border border-[#1A1A1A] group-hover:border-[#00FF41]/50 transition-colors">
              <Terminal className="w-5 h-5 text-[#00FF41] group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FF41]"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="flex items-center gap-1 text-sm sm:text-base font-bold">
                <span className="text-[#00FF41]">&gt;</span> dev_firoz<span className="text-[#00FF41] animate-pulse">_</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-widest font-mono uppercase">
                SYS_ONLINE // ELEGANT_DARK
              </span>
            </div>
          </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-mono tracking-wide transition-all ${
                  isActive ? getActiveTextClass(theme) : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
                data-cursor-label={link.name}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-slate-800/80 rounded-full border border-slate-700/60 -z-10"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
                <span className="text-cyan-500/70 mr-0.5">#</span>
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Actions Right (Theme Switcher & Resume CTA) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Sound Toggle Button */}
          <button
            onClick={() => {
              toggleSound();
              playSound('click');
            }}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-slate-700 transition-all flex items-center justify-center text-xs font-mono"
            title={isSoundEnabled ? "Mute Sound Effects" : "Enable Sound Effects"}
            data-cursor-label="SOUND"
          >
            {isSoundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Theme Palette Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setThemeDropdown(!themeDropdown);
                playSound('click');
              }}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-slate-700 transition-all flex items-center gap-1.5 text-xs font-mono"
              title="Change Neon Accent Color"
              data-cursor-label="THEME"
            >
              <Palette className="w-4 h-4 text-cyan-400" />
              <span className="hidden lg:inline capitalize">{theme}</span>
            </button>

            <AnimatePresence>
              {themeDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-40 bg-slate-900/95 border border-slate-800 rounded-xl p-2 shadow-2xl backdrop-blur-xl z-50"
                >
                  <p className="text-[10px] font-mono text-slate-400 px-2 py-1 uppercase tracking-wider">
                    Select Accent:
                  </p>
                  {(['cyan', 'green', 'purple'] as NeonTheme[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTheme(t);
                        setThemeDropdown(false);
                        playSound('success');
                      }}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-mono capitalize transition-all ${
                        theme === t ? 'bg-slate-800 text-slate-100 border border-slate-700' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full ${
                        t === 'cyan' ? 'bg-cyan-400 shadow-[0_0_8px_#06b6d4]' : t === 'green' ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' : 'bg-purple-400 shadow-[0_0_8px_#a855f7]'
                      }`} />
                      {t} Mode
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Download Resume Button */}
          <button
            onClick={() => {
              onOpenResume();
              playSound('click');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold tracking-wide border transition-all duration-300 flex items-center gap-2 group ${getAccentClass(theme)}`}
            data-cursor-label="RESUME"
          >
            <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>RESUME</span>
          </button>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Theme Button Mobile */}
          <button
            onClick={() => {
              const themes: NeonTheme[] = ['cyan', 'green', 'purple'];
              const next = themes[(themes.indexOf(theme) + 1) % themes.length];
              setTheme(next);
              playSound('success');
            }}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400"
            title="Toggle Neon Color"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              toggleSound();
              playSound('click');
            }}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400"
            title="Toggle Sound"
          >
            {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              playSound('click');
            }}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-cyan-400 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/95 border-b border-slate-800/80 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-3 font-mono">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
                <span>// NAVIGATION DIRECTORY</span>
                <span className="text-cyan-400">SELECT SECTION</span>
              </div>

              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                      isActive 
                        ? 'bg-slate-900 text-cyan-400 border border-cyan-500/30' 
                        : 'text-slate-300 hover:bg-slate-900/60'
                    }`}
                  >
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <span className="text-cyan-500/60">0{navLinks.indexOf(link) + 1}.</span>
                      {link.name}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </a>
                );
              })}

              <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className={`w-full py-3 rounded-xl text-sm font-mono font-bold border transition-all flex items-center justify-center gap-2 ${getAccentClass(theme)}`}
                >
                  <FileText className="w-4 h-4" />
                  <span>DOWNLOAD / VIEW RESUME (PDF)</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
