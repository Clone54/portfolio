import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  ArrowUp, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MessageSquare, 
  Code2, 
  Clock 
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { NeonTheme } from '../types';

interface FooterProps {
  theme: NeonTheme;
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const { developerBio, socialLinks } = usePortfolio();
  const [bdTime, setBdTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setBdTime(
        now.toLocaleString('en-US', {
          timeZone: 'Asia/Dhaka',
          dateStyle: 'medium',
          timeStyle: 'medium',
          hour12: true
        }) + ' (BST)'
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSocialIcon = (name: string) => {
    switch (name) {
      case 'GitHub': return <Github className="w-4 h-4" />;
      case 'LinkedIn': return <Linkedin className="w-4 h-4" />;
      case 'Twitter': return <Twitter className="w-4 h-4" />;
      case 'WhatsApp': return <MessageSquare className="w-4 h-4" />;
      case 'Email': default: return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <footer className="relative z-10 border-t border-slate-800 bg-slate-950 pt-12 pb-8 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Logo Brand & Tagline */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <span className="text-slate-100 font-bold text-base flex items-center gap-1">
                &gt; {developerBio.name}<span className="text-cyan-400 animate-pulse">_</span>
              </span>
              <p className="text-slate-500 text-[11px]">
                Full Stack MERN & WebGL Software Architecture
              </p>
            </div>
          </div>

          {/* Social Links Bar */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                title={social.name}
                data-cursor-label={social.name.toUpperCase()}
              >
                {renderSocialIcon(social.name)}
                <span className="sr-only">{social.name}</span>
              </a>
            ))}
          </div>

          {/* Back To Top Action */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors flex items-center gap-2"
            data-cursor-label="TOP"
          >
            <span>RETURN TO TOP</span>
            <ArrowUp className="w-4 h-4 text-cyan-400" />
          </button>

        </div>

        {/* Footer Meta & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} {developerBio.name}. Built with React 19, Three.js & Tailwind CSS v4.</p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-cyan-400" /> {bdTime || 'BD_CLOCK'}
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" /> ALL SYSTEMS OPERATIONAL
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
