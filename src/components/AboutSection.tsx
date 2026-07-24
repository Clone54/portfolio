import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, 
  User, 
  Code2, 
  Heart, 
  Compass, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  CornerDownLeft,
  Sparkles,
  Briefcase,
  Award
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { NeonTheme } from '../types';

interface AboutSectionProps {
  theme: NeonTheme;
}

type TabType = 'bio' | 'journey' | 'preferred' | 'hobbies';

export const AboutSection: React.FC<AboutSectionProps> = ({ theme }) => {
  const { developerBio } = usePortfolio();
  const [activeTab, setActiveTab] = useState<TabType>('bio');
  const [terminalInput, setTerminalInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<{ cmd: string; output: React.ReactNode }[]>([
    {
      cmd: 'cat bio.config.json',
      output: (
        <div className="text-emerald-400 font-mono text-xs leading-relaxed space-y-1">
          <p>&#123;</p>
          <p className="pl-4">&quot;name&quot;: &quot;{developerBio.name}&quot;,</p>
          <p className="pl-4">&quot;role&quot;: &quot;{developerBio.title}&quot;,</p>
          <p className="pl-4">&quot;location&quot;: &quot;{developerBio.location}&quot;,</p>
          <p className="pl-4">&quot;status&quot;: &quot;{developerBio.status}&quot;</p>
          <p>&#125;</p>
        </div>
      )
    }
  ]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = null;

    if (cmd === 'clear') {
      setCommandHistory([]);
      setTerminalInput('');
      return;
    } else if (cmd === 'help') {
      output = (
        <div className="text-slate-300 font-mono text-xs space-y-1">
          <p className="text-cyan-400 font-bold">AVAILABLE COMMANDS:</p>
          <p>• <span className="text-amber-300">cat bio</span> - Show core profile JSON</p>
          <p>• <span className="text-amber-300">cat journey</span> - Read programming journey log</p>
          <p>• <span className="text-amber-300">cat preferred</span> - View preferred work environments</p>
          <p>• <span className="text-amber-300">cat hobbies</span> - List personal interests & hobbies</p>
          <p>• <span className="text-amber-300">clear</span> - Clear terminal window</p>
        </div>
      );
    } else if (cmd.includes('bio')) {
      setActiveTab('bio');
      output = <p className="text-cyan-300 font-mono text-xs">{developerBio.bioSummary}</p>;
    } else if (cmd.includes('journey')) {
      setActiveTab('journey');
      output = <p className="text-slate-300 font-mono text-xs">{developerBio.journeyText}</p>;
    } else if (cmd.includes('preferred') || cmd.includes('work')) {
      setActiveTab('preferred');
      output = <p className="text-purple-300 font-mono text-xs">{developerBio.preferredWorkText}</p>;
    } else if (cmd.includes('hobbies') || cmd.includes('interests')) {
      setActiveTab('hobbies');
      output = (
        <div className="text-emerald-300 font-mono text-xs space-y-1">
          {developerBio.interestsText.map((interest, idx) => (
            <p key={idx}>[✓] {interest}</p>
          ))}
        </div>
      );
    } else {
      output = (
        <p className="text-rose-400 font-mono text-xs">
          Command not recognized: '{cmd}'. Type <span className="text-cyan-300 underline font-bold cursor-pointer" onClick={() => setTerminalInput('help')}>help</span> for available options.
        </p>
      );
    }

    setCommandHistory((prev) => [...prev, { cmd, output }]);
    setTerminalInput('');
  };

  const getThemeText = (t: NeonTheme) => {
    switch (t) {
      case 'green': return 'text-emerald-400';
      case 'purple': return 'text-purple-400';
      case 'cyan': default: return 'text-cyan-400';
    }
  };

  return (
    <section id="about" className="py-24 relative z-10 border-t border-slate-800/80 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>SECTION_01 // SYSTEM DIAGNOSTICS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100">
            About <span className={getThemeText(theme)}>Developer</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-sans">
            Explore my engineering journey, work philosophies, and core technical stack via this interactive terminal window.
          </p>
        </div>

        {/* Main Grid: Interactive Terminal Window + Stat Highlight Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Terminal Shell */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl overflow-hidden">
              
              {/* Terminal Window Bar */}
              <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 font-mono text-xs text-slate-400 font-bold">firoz@dev-terminal:~</span>
                </div>
                
                {/* Terminal Navigation Tabs */}
                <div className="hidden sm:flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-mono">
                  <button
                    onClick={() => setActiveTab('bio')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      activeTab === 'bio' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    bio.json
                  </button>
                  <button
                    onClick={() => setActiveTab('journey')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      activeTab === 'journey' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    journey.log
                  </button>
                  <button
                    onClick={() => setActiveTab('preferred')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      activeTab === 'preferred' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    preferred.md
                  </button>
                  <button
                    onClick={() => setActiveTab('hobbies')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      activeTab === 'hobbies' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    interests.txt
                  </button>
                </div>
              </div>

              {/* Terminal Content Body */}
              <div className="p-6 font-mono text-sm space-y-6 min-h-[360px] max-h-[500px] overflow-y-auto">
                
                {/* Tab Content Rendering */}
                {activeTab === 'bio' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <p className="text-cyan-400 text-xs uppercase tracking-widest">// CORE BIOGRAPHY & OVERVIEW</p>
                    <p className="text-slate-200 leading-relaxed font-sans text-base">
                      {developerBio.bioSummary}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 space-y-1">
                        <span className="text-slate-500">Location:</span>
                        <p className="text-slate-200 font-bold">{developerBio.location}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 space-y-1">
                        <span className="text-slate-500">Availability:</span>
                        <p className="text-emerald-400 font-bold">{developerBio.availability}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'journey' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <p className="text-cyan-400 text-xs uppercase tracking-widest">// PROGRAMMING JOURNEY & EVOLUTION</p>
                    <p className="text-slate-300 leading-relaxed font-sans text-base">
                      {developerBio.journeyText}
                    </p>
                  </motion.div>
                )}

                {activeTab === 'preferred' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <p className="text-cyan-400 text-xs uppercase tracking-widest">// PREFERRED WORK & ENGINEERING PHILOSOPHY</p>
                    <p className="text-slate-300 leading-relaxed font-sans text-base">
                      {developerBio.preferredWorkText}
                    </p>
                  </motion.div>
                )}

                {activeTab === 'hobbies' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <p className="text-cyan-400 text-xs uppercase tracking-widest">// PERSONAL INTERESTS & OUTSIDE HOBBIES</p>
                    <p className="text-slate-400 text-xs font-sans">
                      Beyond writing code and tuning WebGL shaders, here is how I reload my creative energy:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {developerBio.interestsText.map((interest, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span>{interest}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Command Output Log */}
                {commandHistory.length > 0 && (
                  <div className="pt-4 border-t border-slate-800/80 space-y-3">
                    <p className="text-[11px] text-slate-500 uppercase tracking-widest">// EXECUTION HISTORY</p>
                    {commandHistory.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="text-cyan-400">&gt;</span>
                          <span>{item.cmd}</span>
                        </div>
                        <div className="pl-4">{item.output}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Interactive Bash Prompt Form */}
                <form onSubmit={handleCommandSubmit} className="pt-3 flex items-center gap-2 border-t border-slate-800/60">
                  <span className="text-emerald-400 font-bold text-xs">$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Type command (e.g. 'help', 'cat bio', 'cat journey', 'clear')..."
                    className="flex-1 bg-transparent text-xs text-slate-100 font-mono outline-none placeholder:text-slate-600 focus:ring-0"
                    data-cursor-label="INPUT"
                  />
                  <button type="submit" className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">
                    <CornerDownLeft className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </form>

              </div>
            </div>
          </div>

          {/* Right Column: Key Engineering Highlight Cards */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 tracking-wider">01 // PRODUCTION EXPERIENCE</span>
                <Briefcase className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100 font-mono">{developerBio.experienceYears || '4+ Years'}</h3>
              <p className="text-xs text-slate-400 font-sans">
                {developerBio.experienceDescription || 'Professional experience building production software.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 tracking-wider">02 // COMPLETED PROJECTS</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100 font-mono">{developerBio.completedProjects || '35+ Full Repos'}</h3>
              <p className="text-xs text-slate-400 font-sans">
                {developerBio.projectsDescription || 'High-impact web apps, 3D showcases, AI tools.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-400 tracking-wider">03 // ACADEMIC RECORD</span>
                <Award className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100 font-mono">{developerBio.academicRecord || 'B.Sc. CSE'}</h3>
              <p className="text-xs text-slate-400 font-sans">
                {developerBio.academicDescription || 'Honors Degree in Computer Science.'}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
