import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Download, 
  Printer, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { developerBio, skills: skillsData, timeline: timelineData } = usePortfolio();

  if (!isOpen) return null;

  const handleDownload = () => {
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });

    // Generate formatted printable resume
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Resume - ${developerBio.name}</title>
            <style>
              body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #1e293b; line-height: 1.5; }
              h1 { font-size: 28px; margin-bottom: 4px; color: #0f172a; }
              h2 { font-size: 16px; font-weight: 600; color: #0284c7; margin-top: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 4px; }
              .header { border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 20px; }
              .contact-line { font-size: 12px; color: #64748b; }
              .section-item { margin-bottom: 14px; }
              .item-title { font-weight: bold; font-size: 14px; }
              .item-subtitle { font-size: 12px; color: #475569; font-style: italic; }
              ul { padding-left: 20px; font-size: 12px; margin-top: 4px; }
              li { margin-bottom: 3px; }
              .skill-tag { display: inline-block; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; font-size: 11px; margin-right: 4px; margin-bottom: 4px; font-family: monospace; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${developerBio.name}</h1>
              <div class="contact-line">
                ${developerBio.title} | ${developerBio.email} | ${developerBio.phone} | ${developerBio.location}
              </div>
            </div>
            
            <h2>SUMMARY</h2>
            <p style="font-size: 12px;">${developerBio.bioSummary}</p>

            <h2>PROFESSIONAL EXPERIENCE</h2>
            ${timelineData.filter(t => t.type === 'experience').map(item => `
              <div class="section-item">
                <div class="item-title">${item.title} — ${item.organization}</div>
                <div class="item-subtitle">${item.period} | ${item.location}</div>
                <ul>
                  ${item.highlights.map(hl => `<li>${hl}</li>`).join('')}
                </ul>
              </div>
            `).join('')}

            <h2>EDUCATION QUALIFICATIONS</h2>
            ${timelineData.filter(t => t.type === 'education').map(item => `
              <div class="section-item">
                <div class="item-title">${item.title} — ${item.organization}</div>
                <div class="item-subtitle">${item.period} | ${item.location}</div>
                <p style="font-size: 12px; margin-top: 4px;">${item.description}</p>
              </div>
            `).join('')}

            <h2>TECHNICAL SKILLS</h2>
            <div>
              ${skillsData.map(s => `<span class="skill-tag">${s.name} (${s.proficiency}%)</span>`).join('')}
            </div>

            <script>
              window.onload = function() { window.print(); };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-8"
        >
          {/* Header Bar */}
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <FileText className="w-4 h-4" />
              <span>CURRICULUM_VITAE.PDF // PREVIEW</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 font-bold transition-colors flex items-center gap-1.5"
                data-cursor-label="PRINT"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>DOWNLOAD / PRINT PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                data-cursor-label="CLOSE"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Resume Body */}
          <div className="p-8 overflow-y-auto space-y-8 font-sans text-slate-200">
            
            {/* Name Header */}
            <div className="border-b border-slate-800 pb-6 space-y-2">
              <h1 className="text-3xl font-extrabold font-mono text-slate-100">{developerBio.name}</h1>
              <p className="text-cyan-400 font-mono text-sm font-bold">{developerBio.title}</p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-400 font-mono pt-1">
                <span>📧 {developerBio.email}</span>
                <span>📞 {developerBio.phone}</span>
                <span>📍 {developerBio.location}</span>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">// PROFESSIONAL SUMMARY</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{developerBio.bioSummary}</p>
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">// WORK EXPERIENCE</h2>
              {timelineData.filter(t => t.type === 'experience').map(item => (
                <div key={item.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                  <div className="flex justify-between items-start font-mono text-xs">
                    <h3 className="font-bold text-slate-100 text-sm">{item.title} — {item.organization}</h3>
                    <span className="text-cyan-400">{item.period}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                    {item.highlights.map((hl, i) => (
                      <li key={i}>{hl}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">// EDUCATIONAL QUALIFICATIONS</h2>
              {timelineData.filter(t => t.type === 'education').map(item => (
                <div key={item.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1 font-mono text-xs">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-100 text-sm">{item.title} — {item.organization}</h3>
                    <span className="text-cyan-400">{item.period}</span>
                  </div>
                  <p className="text-slate-400 font-sans text-xs">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Skills Tags */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">// TECHNICAL PROFICIENCIES</h2>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {skillsData.map(s => (
                  <span key={s.id} className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Footer Bar */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
            <button
              onClick={handleDownload}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-mono font-bold text-xs hover:bg-cyan-400 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> DOWNLOAD RESUME NOW
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
