import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Download, 
  Printer, 
  FileText,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { developerBio, skills: skillsData, timeline: timelineData, projects: projectsData, socialLinks } = usePortfolio();

  if (!isOpen) return null;

  const githubLink = socialLinks.find(s => s.name.toLowerCase() === 'github')?.url || developerBio.github;
  const linkedinLink = socialLinks.find(s => s.name.toLowerCase() === 'linkedin')?.url || developerBio.linkedin;
  const portfolioLink = developerBio.portfolio || window.location.origin;

  const handleDownload = () => {
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });

    // Generate formatted printable resume
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const resumeProjects = projectsData.filter(p => p.showInResume);

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${developerBio.name} - Resume</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
              body { font-family: 'Inter', Arial, sans-serif; padding: 40px 60px; color: #000; line-height: 1.4; max-width: 800px; margin: 0 auto; }
              h1 { font-size: 24px; margin-bottom: 2px; text-transform: uppercase; }
              .role-title { font-size: 16px; font-weight: bold; margin-bottom: 6px; }
              h2 { font-size: 16px; font-weight: bold; margin-top: 16px; margin-bottom: 8px; border-bottom: 1px solid #000; padding-bottom: 2px; }
              .contact-line { font-size: 13px; margin-bottom: 4px; }
              .links-line { font-size: 13px; margin-bottom: 16px; }
              .links-line a { color: #0056b3; text-decoration: none; }
              .links-line a:hover { text-decoration: underline; }
              p { font-size: 13px; margin-top: 0; margin-bottom: 8px; }
              
              .skills-section p { margin-bottom: 4px; }
              
              .project-item { margin-bottom: 12px; }
              .project-title { font-weight: bold; font-size: 14px; margin-bottom: 2px; }
              .project-links { font-size: 12px; color: #0056b3; margin-bottom: 2px; }
              .project-subtitle { font-size: 13px; font-style: italic; margin-bottom: 4px; }
              ul { padding-left: 20px; font-size: 13px; margin-top: 4px; margin-bottom: 8px; }
              li { margin-bottom: 3px; }
              
              .pre-wrap { white-space: pre-wrap; font-family: inherit; }
              
              @media print {
                body { padding: 0; }
              }
            </style>
          </head>
          <body>
            <h1>${developerBio.name}</h1>
            <div class="role-title">${developerBio.title}</div>
            <div class="contact-line">
              ${developerBio.phone} | ${developerBio.email} | ${developerBio.location}
            </div>
            <div class="links-line">
              <a href="${portfolioLink}">Portfolio</a> || 
              <a href="${linkedinLink}">LinkedIn</a> || 
              <a href="${githubLink}">GitHub</a>
            </div>
            
            <h2>Career Objective</h2>
            <p>${developerBio.careerObjective || developerBio.bioSummary}</p>
            
            <h2>Skills</h2>
            <div class="skills-section">
              <p><strong>Technical Skills:</strong> ${developerBio.technicalSkills || skillsData.map(s => s.name).join(', ')}</p>
              ${developerBio.interpersonalSkills ? `<p><strong>Interpersonal Skills:</strong> ${developerBio.interpersonalSkills}</p>` : ''}
            </div>
            
            <h2>Projects</h2>
            ${resumeProjects.map(p => `
              <div class="project-item">
                <div class="project-title">${p.title}</div>
                <div class="project-links">
                  ${p.liveUrl ? `<a href="${p.liveUrl}">Live Link</a>` : ''} 
                  ${p.liveUrl && p.githubClient ? ' | ' : ''} 
                  ${p.githubClient ? `<a href="${p.githubClient}">GitHub Link</a>` : ''}
                </div>
                <div class="project-subtitle">${p.subtitle || p.summary}</div>
                <ul>
                  ${p.features && p.features.length > 0 ? p.features.slice(0, 3).map(f => `<li>${f}</li>`).join('') : ''}
                  <li><strong>Tech Stack:</strong> ${[...(p.techStack.frontend || []), ...(p.techStack.backend || []), ...(p.techStack.database || []), ...(p.techStack.auth || []), ...(p.techStack.tools || [])].filter(Boolean).join(', ')}</li>
                </ul>
              </div>
            `).join('')}
            
            <h2>Education</h2>
            <div class="pre-wrap" style="font-size: 13px;">${developerBio.educationRecord || timelineData.filter(t => t.type === 'education').map(t => `${t.organization}\n${t.title}\n${t.period}`).join('\n\n')}</div>
            
            <h2>Language Proficiency</h2>
            <div class="pre-wrap" style="font-size: 13px;">${developerBio.languageProficiency || '• English: Fluent\n• Bangla: Native'}</div>
            
            <script>
              window.onload = function() { window.print(); };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const resumeProjects = projectsData.filter(p => p.showInResume);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white border border-slate-200 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-8"
        >
          {/* Header Bar */}
          <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 text-slate-800 font-bold">
              <FileText className="w-4 h-4" />
              <span>RESUME PREVIEW (A4 FORMAT)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-bold transition-colors flex items-center gap-1.5"
                data-cursor-label="PRINT"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>DOWNLOAD / PRINT PDF</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-600 transition-colors"
                data-cursor-label="CLOSE"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Resume Body */}
          <div className="p-8 md:p-12 overflow-y-auto bg-white text-black font-sans">
            
            {/* Name Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold uppercase tracking-tight text-slate-900">{developerBio.name}</h1>
              <p className="text-lg font-bold text-slate-800 mb-1">{developerBio.title}</p>
              <div className="text-sm text-slate-600">
                {developerBio.phone} | {developerBio.email} | {developerBio.location}
              </div>
              <div className="text-sm text-blue-600 mt-1 space-x-2">
                <a href={portfolioLink} className="hover:underline">Portfolio</a>
                <span className="text-slate-400">||</span>
                <a href={linkedinLink} className="hover:underline">LinkedIn</a>
                <span className="text-slate-400">||</span>
                <a href={githubLink} className="hover:underline">GitHub</a>
              </div>
            </div>

            {/* Career Objective */}
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b border-slate-900 pb-1 mb-2">Career Objective</h2>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                {developerBio.careerObjective || developerBio.bioSummary}
              </p>
            </div>

            {/* Skills */}
            <div className="mb-6 space-y-1">
              <h2 className="text-lg font-bold border-b border-slate-900 pb-1 mb-2">Skills</h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong className="text-slate-900">Technical Skills:</strong> {developerBio.technicalSkills || skillsData.map(s => s.name).join(', ')}
              </p>
              {developerBio.interpersonalSkills && (
                <p className="text-sm text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Interpersonal Skills:</strong> {developerBio.interpersonalSkills}
                </p>
              )}
            </div>

            {/* Projects */}
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b border-slate-900 pb-1 mb-3">Projects</h2>
              <div className="space-y-4">
                {resumeProjects.map(p => (
                  <div key={p.id}>
                    <h3 className="font-bold text-slate-900 text-base">{p.title}</h3>
                    <div className="text-sm text-blue-600 mb-1 space-x-2">
                      {p.liveUrl && <a href={p.liveUrl} className="hover:underline">Live Link</a>}
                      {p.liveUrl && p.githubClient && <span className="text-slate-400">|</span>}
                      {p.githubClient && <a href={p.githubClient} className="hover:underline">GitHub Link</a>}
                    </div>
                    <p className="text-sm text-slate-700 italic mb-2">{p.subtitle || p.summary}</p>
                    <ul className="list-disc list-inside text-sm text-slate-700 space-y-1 ml-1">
                      {p.features && p.features.slice(0, 3).map((f, i) => <li key={i}>{f}</li>)}
                      <li>
                        <strong className="text-slate-900">Tech Stack:</strong> {[...(p.techStack.frontend || []), ...(p.techStack.backend || []), ...(p.techStack.database || []), ...(p.techStack.auth || []), ...(p.techStack.tools || [])].filter(Boolean).join(', ')}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b border-slate-900 pb-1 mb-2">Education</h2>
              <div className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                {developerBio.educationRecord || timelineData.filter(t => t.type === 'education').map(t => `${t.organization}\n${t.title}\n${t.period}`).join('\n\n')}
              </div>
            </div>

            {/* Language Proficiency */}
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b border-slate-900 pb-1 mb-2">Language Proficiency</h2>
              <div className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                {developerBio.languageProficiency || '• English: Fluent\n• Bangla: Native'}
              </div>
            </div>

          </div>

          {/* Footer Bar */}
          <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
            <button
              onClick={handleDownload}
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" /> GENERATE PDF NOW
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
