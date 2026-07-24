import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Copy, 
  Check, 
  Send, 
  Terminal, 
  Sparkles, 
  Clock, 
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { NeonTheme } from '../types';

interface ContactSectionProps {
  theme: NeonTheme;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ theme }) => {
  const { developerBio } = usePortfolio();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Project Inquiry',
    message: ''
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);

    // Simulate cyber network dispatch log
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: '', email: '', subject: 'Project Inquiry', message: '' });
      }, 5000);
    }, 1200);
  };

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
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/20 hover:border-emerald-400 shadow-neon-green';
      case 'purple':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/40 hover:bg-purple-500/20 hover:border-purple-400 shadow-neon-purple';
      case 'cyan':
      default:
        return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/20 hover:border-cyan-400 shadow-neon-cyan';
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10 border-t border-slate-800/80 bg-slate-950/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-400">
            <Send className="w-3.5 h-3.5" />
            <span>SECTION_05 // TRANSMISSION CONSOLE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100">
            Contact <span className={getThemeTextClass(theme)}>Information</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-sans">
            Ready to build high-performance software? Send a message directly or connect via Email, Phone, or WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-xl backdrop-blur-xl group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/50 transition-colors">
                    <Mail className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">PRIMARY EMAIL</span>
                    <h3 className="font-mono font-bold text-sm sm:text-base text-slate-100">{developerBio.email}</h3>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(developerBio.email, 'email')}
                  className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
                  title="Copy email address"
                  data-cursor-label="COPY"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Phone Card */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all shadow-xl backdrop-blur-xl group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-emerald-500/50 transition-colors">
                    <Phone className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">PHONE NUMBER</span>
                    <h3 className="font-mono font-bold text-sm sm:text-base text-slate-100">{developerBio.phone}</h3>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(developerBio.phone, 'phone')}
                  className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-emerald-400 transition-colors"
                  title="Copy phone number"
                  data-cursor-label="COPY"
                >
                  {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* WhatsApp Link Card */}
            <a
              href={`https://wa.me/${developerBio.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-xl backdrop-blur-xl group flex items-center justify-between block"
              data-cursor-label="WHATSAPP"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-emerald-500/50 transition-colors">
                  <MessageSquare className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">WHATSAPP DIRECT</span>
                  <h3 className="font-mono font-bold text-sm sm:text-base text-slate-100 flex items-center gap-1.5">
                    Start Instant Chat <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                  </h3>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                24/7 ONLINE
              </span>
            </a>

            {/* Availability Box */}
            <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 font-mono text-xs space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>AVAILABILITY NOTICE</span>
              </div>
              <p className="text-slate-400 text-xs font-sans leading-relaxed">
                Currently accepting full-time remote engineering positions, high-throughput freelance contracts, and software architecture consulting. Average response latency &lt; 2 hours.
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Cyber Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              
              <div className="flex items-center justify-between pb-6 border-b border-slate-800 font-mono text-xs text-slate-400">
                <span className="flex items-center gap-2 text-cyan-400 font-bold">
                  <Terminal className="w-4 h-4" /> DISPATCH_MESSAGE.SH
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-500">ENCRYPTED_SSL</span>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center font-mono space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100">MESSAGE DISPATCHED SUCCESSFULLY!</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto font-sans">
                    Thank you for reaching out. I have received your transmission and will review it promptly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 pt-6 font-mono text-xs">
                  
                  {/* Category Selection */}
                  <div className="space-y-2">
                    <label className="text-slate-400 uppercase tracking-wider block">INQUIRY CATEGORY:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Project Inquiry', 'Hire Full-Time', 'Consultation'].map((subj) => (
                        <button
                          type="button"
                          key={subj}
                          onClick={() => setFormState({ ...formState, subject: subj })}
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            formState.subject === subj
                              ? 'bg-slate-800 text-cyan-300 border-cyan-500/50 font-bold'
                              : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                          }`}
                          data-cursor-label="SELECT"
                        >
                          {subj}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name and Email Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-slate-400 uppercase tracking-wider block">YOUR NAME *</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 outline-none focus:border-cyan-500/60 transition-colors"
                        data-cursor-label="INPUT"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-slate-400 uppercase tracking-wider block">EMAIL ADDRESS *</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. alex@company.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 outline-none focus:border-cyan-500/60 transition-colors"
                        data-cursor-label="INPUT"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-slate-400">
                      <label className="uppercase tracking-wider">PROJECT DETAILS / TRANSMISSION *</label>
                      <span>{formState.message.length} / 1000</span>
                    </div>
                    <textarea
                      required
                      rows={5}
                      maxLength={1000}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Describe your project goals, tech stack preferences, or timeline specifications..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 outline-none focus:border-cyan-500/60 transition-colors resize-none"
                      data-cursor-label="INPUT"
                    />
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl font-bold tracking-wide border transition-all flex items-center justify-center gap-2 ${getThemeButtonClass(theme)}`}
                    data-cursor-label="DISPATCH"
                  >
                    {isSubmitting ? (
                      <span>DISPATCHING OVER NETWORK...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>TRANSMIT MESSAGE NOW</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
