import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Github, Linkedin, Facebook, Mail, Phone, ExternalLink, Download, ArrowRight, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from './utils';
import { PERSONAL_INFO, PROJECTS, SKILLS, EXPERIENCES, EDUCATION, TECH_MAP } from './data';
import { Project } from './types';

const XIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932Zm-1.294 19.497h2.039L6.486 3.24H4.298l13.31 17.41Z" />
  </svg>
);

// --- Components ---

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Education', href: '/#education' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      scrolled ? "bg-slate-900/80 backdrop-blur-md border-b border-slate-800" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-white">
          FIROZ<span className="text-indigo-500">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-slate-300 hover:text-white"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-slate-600/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="order-2 lg:order-1"
        >
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-indigo-400 uppercase bg-indigo-400/10 rounded-full mb-4">
            Available for new opportunities
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
            Hi, I'm <span className="text-slate-400">{PERSONAL_INFO.name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-medium mb-8">
            {PERSONAL_INFO.designation}
          </p>
          <p className="text-lg text-slate-500 max-w-xl mb-10 leading-relaxed">
            {PERSONAL_INFO.bio}
          </p>
          
          <div className="flex flex-wrap gap-4 mb-12">
            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold flex items-center gap-2 transition-all group">
              Download Resume <Download size={18} className="group-hover:translate-y-1 transition-transform" />
            </button>
            <div className="flex items-center gap-3">
              <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="p-3 text-slate-400 hover:text-white transition-colors bg-slate-800/50 rounded-lg">
                <Github size={20} />
              </a>
              <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 text-slate-400 hover:text-white transition-colors bg-slate-800/50 rounded-lg">
                <Linkedin size={20} />
              </a>
              <a href={PERSONAL_INFO.socials.x} target="_blank" rel="noopener noreferrer" className="p-3 text-slate-400 hover:text-white transition-colors bg-slate-800/50 rounded-lg">
                <XIcon size={20} />
              </a>
              <a href={PERSONAL_INFO.socials.facebook} target="_blank" rel="noopener noreferrer" className="p-3 text-slate-400 hover:text-white transition-colors bg-slate-800/50 rounded-lg">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          <div className="relative group w-full max-w-md">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-slate-800 border-4 border-slate-700/50 shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Decorative frames */}
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-indigo-500/20 rounded-3xl -z-0 translate-x-4 translate-y-4" />
            <div className="absolute inset-0 bg-indigo-500/10 rounded-3xl blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3">
            <h2 className="text-3xl font-bold text-white mb-6">About Me</h2>
            <div className="h-1 w-20 bg-indigo-500 mb-8" />
            <p className="text-slate-400 italic mb-8">
              "Building the future, one line of code at a time."
            </p>
          </div>
          <div className="md:w-2/3 space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">My Journey</h3>
              <p className="text-slate-400 leading-relaxed">
                {PERSONAL_INFO.journey}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">What I Love</h3>
              <p className="text-slate-400 leading-relaxed">
                I thrive in environments that challenge me to think outside the box. I'm particularly interested in performance optimization, accessible UI components, and the growing ecosystem of React and its meta-frameworks.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Interests & Hobbies</h3>
              <p className="text-slate-400 leading-relaxed">
                {PERSONAL_INFO.hobbies}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const getTechIcon = (name: string) => {
  const slug = TECH_MAP[name] || name.toLowerCase();
  return `https://skillicons.dev/icons?i=${slug}`;
};

function Skills() {
  const categories = ['Frontend', 'Backend', 'Tools'];

  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">My Technical <span className="text-indigo-500">Arsenal</span></h2>
        
        <div className="grid md:grid-cols-3 gap-12">
          {categories.map((category) => (
            <div key={category} className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-8 border-b border-slate-700 pb-4">{category}</h3>
              <div className="space-y-6">
                {SKILLS.filter(s => s.category === category).map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <img src={getTechIcon(skill.name)} alt={skill.name} className="w-6 h-6 grayscale group-hover:grayscale-0 transition-all" />
                        <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                      </div>
                      <span className="text-sm text-slate-500">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-indigo-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const containerRef = (node: HTMLDivElement | null) => {
    if (node !== null) {
      const handleScroll = () => {
        setCanScrollLeft(node.scrollLeft > 10);
        setCanScrollRight(node.scrollLeft < node.scrollWidth - node.clientWidth - 10);
      };
      node.addEventListener('scroll', handleScroll);
      handleScroll();
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('project-slider');
    if (container) {
      const scrollAmount = container.clientWidth;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="projects" className="py-24 bg-slate-900/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-slate-500">A collection of my recent work and open-source contributions.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={cn(
                "p-3 rounded-full border border-slate-700 transition-all",
                canScrollLeft ? "text-white hover:bg-slate-800 border-indigo-500/50" : "text-slate-600 border-slate-800 cursor-not-allowed"
              )}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={cn(
                "p-3 rounded-full border border-slate-700 transition-all",
                canScrollRight ? "text-white hover:bg-slate-800 border-indigo-500/50" : "text-slate-600 border-slate-800 cursor-not-allowed"
              )}
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        <div 
          id="project-slider"
          ref={containerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 -mx-6 px-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              className="w-[85%] md:w-[calc((100%-48px)/3)] flex-shrink-0 snap-start"
            >
              <div className="bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 h-[450px] flex flex-col group">
                <div className="h-48 relative overflow-hidden">
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900 to-transparent p-6 flex gap-2">
                    {project.stack.slice(0, 4).map(tech => (
                      <img key={tech} src={getTechIcon(tech)} alt={tech} className="w-5 h-5 bg-slate-900/50 p-0.5 rounded" title={tech} />
                    ))}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{project.name}</h3>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {project.shortDescription}
                  </p>
                  <div className="mt-auto">
                    <Link 
                      to={`/project/${project.id}`}
                      className="w-full py-3 bg-slate-700 hover:bg-indigo-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
                    >
                      View Details <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceEducation() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div id="experience">
          <h2 className="text-3xl font-bold text-white mb-12">Professional <span className="text-indigo-500">Experience</span></h2>
          <div className="space-y-12 relative">
            <div className="absolute top-0 bottom-0 left-0 w-px bg-slate-800 ml-[10px]" />
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="pl-10 relative">
                <div className="absolute top-1.5 left-0 w-[21px] h-[21px] bg-indigo-500 rounded-full border-4 border-slate-900 z-10" />
                <span className="text-sm font-semibold text-indigo-400 mb-2 block">{exp.period}</span>
                <h3 className="text-xl font-bold text-white mb-1">{exp.position}</h3>
                <h4 className="text-slate-400 font-medium mb-4">{exp.company}</h4>
                <ul className="space-y-2">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="text-slate-500 text-sm flex items-start gap-2">
                      <div className="min-w-[4px] h-1 bg-slate-700 mt-2 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div id="education">
          <h2 className="text-3xl font-bold text-white mb-12">Educational <span className="text-indigo-500">Path</span></h2>
          <div className="space-y-12">
            {EDUCATION.map((edu, i) => (
              <div key={i} className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700/50">
                <span className="text-sm font-semibold text-indigo-400 mb-2 block">{edu.period}</span>
                <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                <h4 className="text-slate-400 font-medium mb-4">{edu.institution}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {edu.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-br from-indigo-900/30 to-slate-800/30 rounded-3xl border border-indigo-500/10 p-12 overflow-hidden relative">
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
          
          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            <div>
              <h2 className="text-4xl font-bold text-white mb-8">Let's Work <span className="text-indigo-500">Together</span></h2>
              <p className="text-slate-400 text-lg mb-12 leading-relaxed max-w-md">
                Have a project in mind or want to discuss a potential partnership? I'm always open to talking about new designs and development challenges.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Email Me</p>
                    <p className="text-white font-medium">{PERSONAL_INFO.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Call Me</p>
                    <p className="text-white font-medium">{PERSONAL_INFO.phone}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
              <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                
                const text = `Name: ${name} \n Email: ${email} \n Message: ${message}`;
                const whatsappUrl = `https://wa.me/8801871528249?text=${encodeURIComponent(text)}`;
                window.open(whatsappUrl, '_blank');
              }}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Your Name</label>
                    <input name="name" type="text" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition-colors" placeholder="Full Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Your Email</label>
                    <input name="email" type="email" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition-colors" placeholder="email@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Message</label>
                  <textarea name="message" rows={4} required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition-colors resize-none" placeholder="Your message here..." />
                </div>
                <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <Link to="/" className="text-xl font-bold tracking-tighter text-white">
          FIROZ<span className="text-indigo-500">.</span>
        </Link>
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Firoz Ahmed. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
            <Github size={20} />
          </a>
          <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
            <Linkedin size={20} />
          </a>
          <a href={PERSONAL_INFO.socials.x} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
            <XIcon size={20} />
          </a>
          <a href={PERSONAL_INFO.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
            <Facebook size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

// --- Pages ---

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ExperienceEducation />
      <Contact />
    </>
  );
}

function ProjectDetailsPage() {
  const { id } = useParams();
  const project = PROJECTS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center text-white p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-slate-400 mb-8">Project not found</p>
        <Link to="/" className="px-6 py-3 bg-indigo-600 rounded-xl font-medium">Back to Home</Link>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24"
    >
      <div className="max-w-5xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-12 transition-colors">
          <ChevronLeft size={20} /> Back to Projects
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">{project.name}</h1>
          <div className="flex flex-wrap gap-4 mb-8">
            {project.stack.map(tech => (
              <div key={tech} className="flex items-center gap-2 px-3 py-2 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">
                <img src={getTechIcon(tech)} alt={tech} className="w-5 h-5" />
                <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="aspect-video w-full rounded-3xl overflow-hidden mb-16 border border-slate-800">
          <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
        </div>

        <div className="grid md:grid-cols-[1fr_300px] gap-16">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Technical Challenges</h2>
              <div className="space-y-4">
                {project.challenges.map((challenge, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/50">
                    <div className="min-w-[24px] h-6 w-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold">!</div>
                    <p className="text-slate-400 text-sm leading-relaxed">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Future Roadmaps</h2>
              <div className="space-y-4">
                {project.futurePlans.map((plan, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/50">
                    <div className="min-w-[24px] h-6 w-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold font-mono">/</div>
                    <p className="text-slate-400 text-sm leading-relaxed">{plan}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 sticky top-32">
              <h3 className="text-xl font-bold text-white mb-6">Project Links</h3>
              <div className="space-y-4">
                <a 
                  href={project.liveLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                >
                  Live Demo <ExternalLink size={18} />
                </a>
                <a 
                  href={project.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                >
                  GitHub Repository <Github size={18} />
                </a>
              </div>
              <p className="text-slate-500 text-xs mt-6 text-center italic">
                Note: Links are for demonstration purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Main App ---

export default function App() {
  return (
    <Router>
      <div className="bg-slate-950 min-h-screen font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:id" element={<ProjectDetailsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
