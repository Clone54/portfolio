import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  UserCheck, 
  Terminal, 
  LogOut, 
  ExternalLink, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  Image as ImageIcon, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  Key, 
  RefreshCw, 
  Check, 
  AlertCircle, 
  FileText, 
  Github, 
  Linkedin, 
  Twitter, 
  MessageSquare, 
  Mail,
  Shield,
  Layers,
  Sparkles,
  Upload,
  ArrowLeft,
  X,
  Loader2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { NeonTheme, Project, Skill, TimelineItem, SocialLink, DeveloperBio } from '../types';

interface AdminPageProps {
  theme: NeonTheme;
}

type TabType = 'profile' | 'projects' | 'skills' | 'timeline' | 'security';

const WEB_DEV_ICONS = [
  { label: 'React', value: 'Atom' },
  { label: 'Node.js', value: 'Server' },
  { label: 'TypeScript', value: 'FileCode' },
  { label: 'JavaScript', value: 'FileJson' },
  { label: 'HTML', value: 'LayoutTemplate' },
  { label: 'CSS', value: 'Palette' },
  { label: 'Tailwind CSS', value: 'Wind' },
  { label: 'Next.js', value: 'Globe' },
  { label: 'Database / SQL', value: 'Database' },
  { label: 'MongoDB', value: 'Leaf' },
  { label: 'Firebase', value: 'Flame' },
  { label: 'Cloud / AWS', value: 'Cloud' },
  { label: 'Docker', value: 'Box' },
  { label: 'Git', value: 'GitBranch' },
  { label: 'GitHub', value: 'Github' },
  { label: 'GitLab', value: 'Gitlab' },
  { label: 'Figma', value: 'Figma' },
  { label: 'Framer', value: 'Framer' },
  { label: 'GraphQL', value: 'Network' },
  { label: 'REST API', value: 'Link' },
  { label: 'Python', value: 'Terminal' },
  { label: 'Security', value: 'Shield' },
  { label: 'Performance', value: 'Zap' },
  { label: 'Angular', value: 'Triangle' },
  { label: 'Vue.js', value: 'Triangle' },
  { label: 'Svelte', value: 'Triangle' },
  { label: 'Mobile / App', value: 'Smartphone' },
  { label: 'Desktop / PC', value: 'Monitor' },
  { label: 'AI / Bot', value: 'Bot' },
  { label: 'Generic Code', value: 'Code2' },
  { label: 'Checkmark', value: 'CheckCircle2' },
  { label: 'CPU', value: 'Cpu' },
  { label: 'HardDrive', value: 'HardDrive' },
  { label: 'Layers', value: 'Layers' },
];

const IconSelect = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  const filtered = WEB_DEV_ICONS.filter(i => 
    i.label.toLowerCase().includes(search.toLowerCase()) || 
    i.value.toLowerCase().includes(search.toLowerCase())
  );
  
  const selectedLabel = WEB_DEV_ICONS.find(i => i.value === value)?.label || value;

  return (
    <div className="relative">
      <div 
        className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedLabel}</span>
        <span className="text-gray-500 text-xs">▼</span>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-[#1A1A1A] border border-gray-700 rounded-md shadow-xl max-h-60 overflow-y-auto">
          <div className="p-2 sticky top-0 bg-[#1A1A1A] border-b border-gray-700">
            <input 
              type="text" 
              className="w-full px-2 py-1.5 bg-[#121212] border border-gray-700 rounded text-sm text-white focus:outline-none focus:border-[#00FF41]"
              placeholder="Search e.g. React or type custom icon..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onClick={e => e.stopPropagation()}
              autoFocus
            />
          </div>
          <div className="p-1">
            {filtered.map(icon => (
              <div 
                key={icon.label + icon.value}
                className="px-2 py-1.5 hover:bg-gray-800 rounded cursor-pointer text-sm text-gray-200 flex justify-between"
                onClick={() => {
                  onChange(icon.value);
                  setIsOpen(false);
                  setSearch('');
                }}
              >
                <span>{icon.label}</span>
                <span className="text-gray-500 text-xs">{icon.value}</span>
              </div>
            ))}
            {search && !WEB_DEV_ICONS.some(i => i.value === search) && (
              <div 
                className="px-2 py-1.5 hover:bg-gray-800 rounded cursor-pointer text-sm text-[#00FF41] flex justify-between"
                onClick={() => {
                  onChange(search);
                  setIsOpen(false);
                  setSearch('');
                }}
              >
                <span>Use custom icon:</span>
                <span className="font-bold">{search}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const AdminPage: React.FC<AdminPageProps> = ({ theme }) => {
  const navigate = useNavigate();
  const { 
    developerBio, 
    projects, 
    skills, 
    timeline, 
    socialLinks, 
    isAdminLoggedIn, 
    adminCredentials, 
    loginAdmin, 
    logoutAdmin, 
    updateAdminCredentials, 
    updateDeveloperBio, 
    addProject, 
    updateProject, 
    deleteProject, 
    addSkill, 
    updateSkill, 
    deleteSkill, 
    addTimelineItem, 
    updateTimelineItem, 
    deleteTimelineItem, 
    updateSocialLinks,
    resetToDefaults 
  } = usePortfolio();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Admin active tab
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Uploading States
  const [isUploadingProfileImage, setIsUploadingProfileImage] = useState(false);
  const [isUploadingProjectImages, setIsUploadingProjectImages] = useState(false);

  // Profile Form state
  const [bioForm, setBioForm] = useState<DeveloperBio>({ ...developerBio });
  const [socialForm, setSocialForm] = useState<SocialLink[]>([...socialLinks]);

  useEffect(() => {
    setBioForm({ ...developerBio });
  }, [developerBio]);

  useEffect(() => {
    setSocialForm([...socialLinks]);
  }, [socialLinks]);

  // Project Edit Modal / Form State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectForm, setProjectForm] = useState<Omit<Project, 'id'>>({
    title: '',
    subtitle: '',
    category: 'Full-Stack',
    summary: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    techStack: { frontend: ['React', 'TypeScript'], backend: ['Node.js'], database: ['MongoDB'], tools: ['Vite'] },
    features: ['Feature 1', 'Feature 2'],
    architectureOverview: '',
    challenges: [{ title: 'Challenge 1', description: 'Problem description', solution: 'Solution explanation' }],
    futurePlans: ['Future enhancement 1'],
    liveUrl: 'https://example.com',
    githubClient: 'https://github.com',
    githubServer: 'https://github.com',
    featured: true,
    starsCount: 10,
    forksCount: 2,
    duration: '2 Months'
  });

  // Skill Form State
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [skillForm, setSkillForm] = useState<Omit<Skill, 'id'>>({
    name: '',
    category: 'Frontend',
    proficiency: 85,
    levelLabel: 'Advanced',
    iconName: 'Code2',
    description: '',
    yearsOfExperience: 2
  });

  // Timeline Form State
  const [editingTimeline, setEditingTimeline] = useState<TimelineItem | null>(null);
  const [isAddingTimeline, setIsAddingTimeline] = useState(false);
  const [timelineForm, setTimelineForm] = useState<Omit<TimelineItem, 'id'>>({
    type: 'experience',
    period: '2024 — PRESENT',
    title: '',
    organization: '',
    location: '',
    description: '',
    highlights: ['Key responsibility 1'],
    tags: ['React', 'TypeScript']
  });

  // Security Credentials Form State
  const [newAdminUser, setNewAdminUser] = useState(adminCredentials.username);
  const [currentPasswordConfirm, setCurrentPasswordConfirm] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const success = await loginAdmin(loginEmail, loginPassword);
      if (!success) {
        setLoginError('Invalid Administrator credentials. Please try again.');
      } else {
        showToast('Authentication Successful. Welcome to Admin Portal.');
      }
    } catch (err: any) {
      setLoginError(err.message || 'An error occurred during authentication.');
    }
  };

  // Profile Image Upload Helper (ImgBB)
  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        showToast('Image size exceeds 3MB. Please select a smaller file.', 'error');
        return;
      }
      
      const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
      if (!apiKey) {
         const reader = new FileReader();
         reader.onloadend = () => {
           setBioForm(prev => ({ ...prev, profilePicture: reader.result as string }));
           showToast('VITE_IMGBB_API_KEY not found. Fallback to base64 applied.');
         };
         reader.readAsDataURL(file);
         return;
      }

      setIsUploadingProfileImage(true);
      showToast('Uploading image to ImgBB...');
      const formData = new FormData();
      formData.append('image', file);
      try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        if (data.success) {
          setBioForm(prev => ({ ...prev, profilePicture: data.data.url }));
          showToast('Profile image uploaded to ImgBB successfully!');
        } else {
          showToast('ImgBB upload failed.', 'error');
        }
      } catch (e) {
        showToast('Network error during image upload.', 'error');
      } finally {
        setIsUploadingProfileImage(false);
      }
    }
  };

  // Project Image Upload Helper (ImgBB)
  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
      if (!apiKey) {
         const reader = new FileReader();
         reader.onloadend = () => {
           setProjectForm(prev => ({ ...prev, image: reader.result as string }));
           showToast('VITE_IMGBB_API_KEY not found. Fallback to base64 applied.');
         };
         reader.readAsDataURL(file);
         return;
      }

      setIsUploadingProjectImages(true);
      showToast('Uploading project image to ImgBB...');
      const formData = new FormData();
      formData.append('image', file);
      try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        if (data.success) {
          setProjectForm(prev => ({ ...prev, image: data.data.url }));
          showToast('Project image uploaded to ImgBB successfully!');
        } else {
          showToast('ImgBB upload failed.', 'error');
        }
      } catch (e) {
        showToast('Network error during image upload.', 'error');
      } finally {
        setIsUploadingProjectImages(false);
      }
    }
  };

  // Project Gallery Upload Helper (ImgBB)
  const handleProjectGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
      if (!apiKey) {
         showToast('VITE_IMGBB_API_KEY not found.', 'error');
         return;
      }

      setIsUploadingProjectImages(true);
      showToast(`Uploading ${files.length} images to ImgBB...`);
      const newImages: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('image', file);
        try {
          const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: 'POST',
            body: formData
          });
          const data = await response.json();
          if (data.success) {
            newImages.push(data.data.url);
          }
        } catch (e) {
          console.error('Upload failed for one image');
        }
      }
      
      if (newImages.length > 0) {
        setProjectForm(prev => ({ 
          ...prev, 
          images: [...(prev.images || []), ...newImages] 
        }));
        showToast(`Successfully uploaded ${newImages.length} images!`);
      } else {
        showToast('Failed to upload images.', 'error');
      }
      setIsUploadingProjectImages(false);
    }
  };

  // Save Profile Changes
  const handleSaveBio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateDeveloperBio(bioForm);
      await updateSocialLinks(socialForm);
      showToast('Developer Profile & Contact Info updated successfully!');
    } catch (error: any) {
      console.error('Error saving profile:', error);
      showToast(error.message || 'Error saving profile', 'error');
    }
  };

  // Save Project Handler
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await updateProject(editingProject.id, projectForm);
        showToast(`Project "${projectForm.title}" updated.`);
        setEditingProject(null);
      } else if (isAddingProject) {
        await addProject(projectForm);
        showToast(`New project "${projectForm.title}" added successfully!`);
        setIsAddingProject(false);
      }
    } catch (error: any) {
      console.error('Error saving project:', error);
      showToast(error.message || 'Error saving project', 'error');
    }
  };

  // Save Skill Handler
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSkill) {
      await updateSkill(editingSkill.id, skillForm);
      showToast(`Skill "${skillForm.name}" updated.`);
      setEditingSkill(null);
    } else if (isAddingSkill) {
      await addSkill(skillForm);
      showToast(`New skill "${skillForm.name}" added.`);
      setIsAddingSkill(false);
    }
  };

  // Save Timeline Handler
  const handleSaveTimeline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTimeline) {
      await updateTimelineItem(editingTimeline.id, timelineForm);
      showToast(`Timeline record "${timelineForm.title}" updated.`);
      setEditingTimeline(null);
    } else if (isAddingTimeline) {
      await addTimelineItem(timelineForm);
      showToast(`New timeline record "${timelineForm.title}" added.`);
      setIsAddingTimeline(false);
    }
  };

  // Handle Security Credentials Save
  const handleSaveSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminPassword.trim()) {
      showToast('New password cannot be empty.', 'error');
      return;
    }
    await updateAdminCredentials(newAdminUser, newAdminPassword);
    showToast('Admin password updated successfully!');
    setCurrentPasswordConfirm('');
    setNewAdminPassword('');
  };

  // Reset Data Confirm
  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all portfolio data to factory defaults? This action cannot be undone.')) {
      resetToDefaults();
      setBioForm({ ...developerBio });
      showToast('Portfolio restored to factory defaults.');
    }
  };

  // -------------------------------------------------------------
  // UNAUTHENTICATED: LOGIN VIEW
  // -------------------------------------------------------------
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#050505] text-slate-100 flex items-center justify-center p-4 relative font-mono">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl shadow-2xl p-6 sm:p-8 relative z-10 space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-2 border-b border-[#1A1A1A] pb-5">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#121212] border border-[#1A1A1A] text-[#00FF41] mb-1">
              <Lock className="w-6 h-6 animate-pulse" />
            </div>
            <h1 className="text-lg font-extrabold text-slate-100 tracking-wider">
              ADMIN_AUTHENTICATION
            </h1>
            <p className="text-xs text-gray-500">
              Enter Administrator Credentials to Access Control Panel
            </p>
          </div>

          {/* Error Alert */}
          {loginError && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-gray-400 uppercase tracking-widest block font-bold">
                Admin Username / Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:outline-none focus:border-[#00FF41] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-400 uppercase tracking-widest block font-bold">
                Security Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:outline-none focus:border-[#00FF41] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#00FF41] text-black font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-neon-green"
            >
              <Shield className="w-4 h-4" />
              <span>AUTHENTICATE & LOG IN</span>
            </button>
          </form>

          {/* Back to Client Site */}
          <div className="pt-2 text-center border-t border-[#1A1A1A]">
            <Link
              to="/"
              className="text-xs text-gray-500 hover:text-[#00FF41] transition-colors inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Portfolio View</span>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED: ADMIN DASHBOARD CONTROL CENTER
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-mono relative pb-16">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl border text-xs font-bold shadow-2xl flex items-center gap-2 ${
              notification.type === 'error'
                ? 'bg-rose-950/90 border-rose-500/50 text-rose-300'
                : 'bg-[#121212] border-[#00FF41] text-[#00FF41] shadow-neon-green'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Top Header Bar */}
      <header className="sticky top-0 z-30 bg-[#0A0A0A] border-b border-[#1A1A1A] py-3 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-[#00FF41]">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-extrabold text-slate-100 flex items-center gap-2">
              ADMIN_CONTROL_CENTER <span className="text-xs px-2 py-0.5 rounded bg-[#00FF41]/20 text-[#00FF41] border border-[#00FF41]/40">LIVE</span>
            </h1>
            <p className="text-[11px] text-gray-500">
              Authenticated Session: <span className="text-slate-300">{adminCredentials.username}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            className="px-3 py-1.5 rounded-lg bg-[#121212] border border-[#1A1A1A] text-gray-300 hover:text-[#00E5FF] hover:border-[#00E5FF]/40 text-xs flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Client Site</span>
          </Link>

          <button
            onClick={logoutAdmin}
            className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-xs flex items-center gap-1.5 transition-colors font-bold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>LOGOUT</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Module Nav Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#1A1A1A] pb-3 text-xs">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 rounded-xl border transition-all flex items-center gap-2 font-bold ${
              activeTab === 'profile'
                ? 'bg-[#00FF41] text-black border-[#00FF41] shadow-neon-green'
                : 'bg-[#0A0A0A] border-[#1A1A1A] text-gray-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>1. Profile & Avatar</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2.5 rounded-xl border transition-all flex items-center gap-2 font-bold ${
              activeTab === 'projects'
                ? 'bg-[#00FF41] text-black border-[#00FF41] shadow-neon-green'
                : 'bg-[#0A0A0A] border-[#1A1A1A] text-gray-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>2. Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2.5 rounded-xl border transition-all flex items-center gap-2 font-bold ${
              activeTab === 'skills'
                ? 'bg-[#00FF41] text-black border-[#00FF41] shadow-neon-green'
                : 'bg-[#0A0A0A] border-[#1A1A1A] text-gray-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>3. Skills ({skills.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2.5 rounded-xl border transition-all flex items-center gap-2 font-bold ${
              activeTab === 'timeline'
                ? 'bg-[#00FF41] text-black border-[#00FF41] shadow-neon-green'
                : 'bg-[#0A0A0A] border-[#1A1A1A] text-gray-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>4. Timeline / Experience ({timeline.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2.5 rounded-xl border transition-all flex items-center gap-2 font-bold ${
              activeTab === 'security'
                ? 'bg-[#00FF41] text-black border-[#00FF41] shadow-neon-green'
                : 'bg-[#0A0A0A] border-[#1A1A1A] text-gray-400 hover:text-slate-200'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>5. Account & Security</span>
          </button>
        </div>

        {/* TAB 1: PROFILE & AVATAR EDITOR */}
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <form onSubmit={handleSaveBio} className="space-y-6 bg-[#0A0A0A] border border-[#1A1A1A] p-6 rounded-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]">
                <h2 className="text-base font-bold text-[#00FF41] flex items-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  DEVELOPER PROFILE & AVATAR EDITOR
                </h2>
                <button
                  type="submit"
                  disabled={isUploadingProfileImage}
                  className={`px-5 py-2.5 rounded-xl bg-[#00FF41] text-black font-bold text-xs transition-all flex items-center gap-2 shadow-neon-green ${isUploadingProfileImage ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110'}`}
                >
                  <Save className="w-4 h-4" />
                  <span>SAVE PROFILE CHANGES</span>
                </button>
              </div>

              {/* Avatar Picture Upload Section */}
              <div className="p-4 rounded-xl bg-[#121212] border border-[#1A1A1A] space-y-4">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#00E5FF]" /> Profile Picture / Avatar
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Avatar Preview */}
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#00FF41] bg-black flex-shrink-0 relative">
                    <img
                      src={bioForm.profilePicture || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover filter contrast-125"
                    />
                  </div>

                  <div className="space-y-2 flex-1 w-full text-xs">
                    <div className="flex flex-wrap gap-2">
                      <label className={`px-4 py-2 rounded-lg bg-[#00E5FF]/20 border border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF]/30 font-bold cursor-pointer transition-colors flex items-center gap-2 ${isUploadingProfileImage ? 'opacity-50 pointer-events-none' : ''}`}>
                        {isUploadingProfileImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        <span>{isUploadingProfileImage ? 'Uploading...' : 'Upload Image File'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfileImageUpload}
                          className="hidden"
                          disabled={isUploadingProfileImage}
                        />
                      </label>

                      {bioForm.profilePicture && (
                        <button
                          type="button"
                          onClick={() => setBioForm(prev => ({ ...prev, profilePicture: undefined }))}
                          className="px-3 py-2 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs"
                        >
                          Reset Image
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-500">
                      Or paste a direct image URL below:
                    </p>
                    <input
                      type="text"
                      value={bioForm.profilePicture || ''}
                      onChange={(e) => setBioForm(prev => ({ ...prev, profilePicture: e.target.value }))}
                      placeholder="https://example.com/my-photo.jpg"
                      className="w-full px-3 py-2 rounded-lg bg-[#080808] border border-[#1A1A1A] text-slate-200 text-xs focus:border-[#00FF41] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Bio Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Full Name</label>
                  <input
                    type="text"
                    value={bioForm.name}
                    onChange={(e) => setBioForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Primary Designation / Title</label>
                  <input
                    type="text"
                    value={bioForm.title}
                    onChange={(e) => setBioForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Location</label>
                  <input
                    type="text"
                    value={bioForm.location}
                    onChange={(e) => setBioForm(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Email Address</label>
                  <input
                    type="email"
                    value={bioForm.email}
                    onChange={(e) => setBioForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Phone Number</label>
                  <input
                    type="text"
                    value={bioForm.phone}
                    onChange={(e) => setBioForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">WhatsApp Number</label>
                  <input
                    type="text"
                    value={bioForm.whatsapp}
                    onChange={(e) => setBioForm(prev => ({ ...prev, whatsapp: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Portfolio URL (Resume)</label>
                  <input
                    type="text"
                    value={bioForm.portfolio || ''}
                    onChange={(e) => setBioForm(prev => ({ ...prev, portfolio: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">LinkedIn URL (Resume)</label>
                  <input
                    type="text"
                    value={bioForm.linkedin || ''}
                    onChange={(e) => setBioForm(prev => ({ ...prev, linkedin: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">GitHub URL (Resume)</label>
                  <input
                    type="text"
                    value={bioForm.github || ''}
                    onChange={(e) => setBioForm(prev => ({ ...prev, github: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">System Status Badge</label>
                  <input
                    type="text"
                    value={bioForm.status}
                    onChange={(e) => setBioForm(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Availability Notice</label>
                  <input
                    type="text"
                    value={bioForm.availability}
                    onChange={(e) => setBioForm(prev => ({ ...prev, availability: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>
              </div>

              {/* Animated Typed Titles */}
              <div className="space-y-1 text-xs">
                <label className="text-gray-400 font-bold">Typed Titles (Comma separated for typewriter animation)</label>
                <input
                  type="text"
                  value={bioForm.typedTitles.join(', ')}
                  onChange={(e) => setBioForm(prev => ({ ...prev, typedTitles: e.target.value.split(',').map(s => s.trim()) }))}
                  className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                />
              </div>

              {/* Bio Summaries */}
              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Short Bio Summary</label>
                  <textarea
                    rows={2}
                    value={bioForm.bioSummary}
                    onChange={(e) => setBioForm(prev => ({ ...prev, bioSummary: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Journey Story (About Section)</label>
                  <textarea
                    rows={3}
                    value={bioForm.journeyText}
                    onChange={(e) => setBioForm(prev => ({ ...prev, journeyText: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Preferred Stack & Work Philosophy</label>
                  <textarea
                    rows={3}
                    value={bioForm.preferredWorkText}
                    onChange={(e) => setBioForm(prev => ({ ...prev, preferredWorkText: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>
              </div>

              {/* Highlight Cards Configuration */}
              <div className="space-y-4 text-xs pt-4 border-t border-[#1A1A1A]">
                <h3 className="text-xs font-bold text-[#00E5FF]">Highlight Cards (About Section)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Production Experience (e.g. 4+ Years)</label>
                    <input
                      type="text"
                      value={bioForm.experienceYears || ''}
                      onChange={(e) => setBioForm(prev => ({ ...prev, experienceYears: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Experience Description</label>
                    <input
                      type="text"
                      value={bioForm.experienceDescription || ''}
                      onChange={(e) => setBioForm(prev => ({ ...prev, experienceDescription: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Completed Projects (e.g. 35+ Repos)</label>
                    <input
                      type="text"
                      value={bioForm.completedProjects || ''}
                      onChange={(e) => setBioForm(prev => ({ ...prev, completedProjects: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Projects Description</label>
                    <input
                      type="text"
                      value={bioForm.projectsDescription || ''}
                      onChange={(e) => setBioForm(prev => ({ ...prev, projectsDescription: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Academic Record (e.g. B.Sc. CSE)</label>
                    <input
                      type="text"
                      value={bioForm.academicRecord || ''}
                      onChange={(e) => setBioForm(prev => ({ ...prev, academicRecord: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Academic Description</label>
                    <input
                      type="text"
                      value={bioForm.academicDescription || ''}
                      onChange={(e) => setBioForm(prev => ({ ...prev, academicDescription: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Resume Generator Configuration */}
              <div className="space-y-4 text-xs pt-4 border-t border-[#1A1A1A]">
                <h3 className="text-xs font-bold text-[#00E5FF]">Resume Document Generator Settings</h3>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Career Objective</label>
                    <textarea
                      rows={3}
                      value={bioForm.careerObjective || ''}
                      onChange={(e) => setBioForm(prev => ({ ...prev, careerObjective: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Technical Skills</label>
                    <textarea
                      rows={2}
                      value={bioForm.technicalSkills || ''}
                      onChange={(e) => setBioForm(prev => ({ ...prev, technicalSkills: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Interpersonal Skills</label>
                    <input
                      type="text"
                      value={bioForm.interpersonalSkills || ''}
                      onChange={(e) => setBioForm(prev => ({ ...prev, interpersonalSkills: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Education Record (Markdown / Multiline format)</label>
                    <textarea
                      rows={3}
                      value={bioForm.educationRecord || ''}
                      onChange={(e) => setBioForm(prev => ({ ...prev, educationRecord: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Language Proficiency (Bullet points separated by newline)</label>
                    <textarea
                      rows={3}
                      value={bioForm.languageProficiency || ''}
                      onChange={(e) => setBioForm(prev => ({ ...prev, languageProficiency: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Social Links Editor */}
              <div className="space-y-3 pt-4 border-t border-[#1A1A1A]">
                <h3 className="text-xs font-bold text-[#00E5FF]">Social Links Configuration</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  {socialForm.map((soc, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-[#121212] border border-[#1A1A1A] space-y-2">
                      <div className="font-bold text-gray-300">{soc.name}</div>
                      <input
                        type="text"
                        placeholder="URL"
                        value={soc.url}
                        onChange={(e) => {
                          const updated = [...socialForm];
                          updated[idx].url = e.target.value;
                          setSocialForm(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-[#080808] border border-[#1A1A1A] text-slate-200 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Username tag"
                        value={soc.username}
                        onChange={(e) => {
                          const updated = [...socialForm];
                          updated[idx].username = e.target.value;
                          setSocialForm(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-[#080808] border border-[#1A1A1A] text-slate-200 text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isUploadingProfileImage}
                  className={`px-6 py-3 rounded-xl bg-[#00FF41] text-black font-bold text-xs transition-all flex items-center gap-2 shadow-neon-green ${isUploadingProfileImage ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110'}`}
                >
                  <Save className="w-4 h-4" />
                  <span>SAVE PROFILE CHANGES</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* TAB 2: PROJECTS MANAGER */}
        {activeTab === 'projects' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0A0A0A] border border-[#1A1A1A] p-4 rounded-2xl">
              <div>
                <h2 className="text-sm font-bold text-[#00FF41] flex items-center gap-2">
                  <Layers className="w-4 h-4" /> ACTIVE DEPLOYMENTS MANAGER ({projects.length})
                </h2>
                <p className="text-xs text-gray-500">
                  Add, edit or feature live projects on the client portfolio.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsAddingProject(true);
                  setEditingProject(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#00FF41] text-black font-bold text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-neon-green"
              >
                <Plus className="w-4 h-4" />
                <span>ADD NEW PROJECT</span>
              </button>
            </div>

            {/* ADD OR EDIT PROJECT FORM MODAL */}
            {(isAddingProject || editingProject) && (
              <form onSubmit={handleSaveProject} className="bg-[#0A0A0A] border-2 border-[#00FF41] p-6 rounded-2xl space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]">
                  <h3 className="font-bold text-slate-100 text-sm">
                    {editingProject ? `Edit Project: ${editingProject.title}` : 'Create New Project Deployment'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => { setIsAddingProject(false); setEditingProject(null); }}
                    className="text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Project Title</label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Subtitle</label>
                    <input
                      type="text"
                      required
                      value={projectForm.subtitle}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, subtitle: e.target.value }))}
                      className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Category</label>
                    <select
                      value={projectForm.category}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    >
                      <option value="Full-Stack">Full-Stack</option>
                      <option value="Frontend / 3D">Frontend / 3D</option>
                      <option value="AI Integration">AI Integration</option>
                      <option value="Mobile / API">Mobile / API</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Duration</label>
                    <input
                      type="text"
                      value={projectForm.duration}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, duration: e.target.value }))}
                      className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    />
                  </div>
                </div>

                {/* Project Image Handler */}
                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Project Image URL or Upload (Home Page)</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={projectForm.image}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, image: e.target.value }))}
                      className="flex-1 px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    />
                    <label className={`px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-[#00FF41] cursor-pointer flex items-center gap-1.5 font-bold ${isUploadingProjectImages ? 'opacity-50 pointer-events-none' : 'hover:border-[#00FF41]'}`}>
                      {isUploadingProjectImages ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      <span>{isUploadingProjectImages ? 'Uploading...' : 'Upload'}</span>
                      <input type="file" accept="image/*" onChange={handleProjectImageUpload} className="hidden" disabled={isUploadingProjectImages} />
                    </label>
                  </div>
                </div>
                
                {/* Project Details Gallery Handler */}
                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Project Details Gallery Images</label>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <label className={`px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-[#00FF41] cursor-pointer flex items-center gap-1.5 font-bold ${isUploadingProjectImages ? 'opacity-50 pointer-events-none' : 'hover:border-[#00FF41]'}`}>
                        {isUploadingProjectImages ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        <span>{isUploadingProjectImages ? 'Uploading...' : 'Upload Multiple Images'}</span>
                        <input type="file" accept="image/*" multiple onChange={handleProjectGalleryUpload} className="hidden" disabled={isUploadingProjectImages} />
                      </label>
                    </div>
                    {projectForm.images && projectForm.images.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {projectForm.images.map((imgUrl, i) => (
                          <div key={i} className="relative group w-16 h-16 rounded overflow-hidden border border-[#1A1A1A]">
                            <img src={imgUrl} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setProjectForm(prev => ({ ...prev, images: prev.images?.filter((_, index) => index !== i) }))}
                              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-500 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Card Summary</label>
                  <textarea
                    rows={2}
                    value={projectForm.summary}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, summary: e.target.value }))}
                    className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Detailed Description</label>
                  <textarea
                    rows={3}
                    value={projectForm.description}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>

                {/* URLs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Live URL</label>
                    <input
                      type="text"
                      value={projectForm.liveUrl}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, liveUrl: e.target.value }))}
                      className="w-full px-2.5 py-1.5 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">GitHub Client URL</label>
                    <input
                      type="text"
                      value={projectForm.githubClient}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, githubClient: e.target.value }))}
                      className="w-full px-2.5 py-1.5 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">GitHub Server URL (Optional)</label>
                    <input
                      type="text"
                      value={projectForm.githubServer || ''}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, githubServer: e.target.value }))}
                      className="w-full px-2.5 py-1.5 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 text-xs"
                    />
                  </div>
                </div>

                {/* Tech Stack Arrays */}
                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Frontend Technologies (Comma separated)</label>
                  <input
                    type="text"
                    value={projectForm.techStack.frontend.join(', ')}
                    onChange={(e) => setProjectForm(prev => ({
                      ...prev,
                      techStack: { ...prev.techStack, frontend: e.target.value.split(',').map(s => s.trim()) }
                    }))}
                    className="w-full px-3 py-1.5 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Backend Technologies (Comma separated)</label>
                  <input
                    type="text"
                    value={projectForm.techStack.backend.join(', ')}
                    onChange={(e) => setProjectForm(prev => ({
                      ...prev,
                      techStack: { ...prev.techStack, backend: e.target.value.split(',').map(s => s.trim()) }
                    }))}
                    className="w-full px-3 py-1.5 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Database Technologies (Comma separated)</label>
                  <input
                    type="text"
                    value={projectForm.techStack.database.join(', ')}
                    onChange={(e) => setProjectForm(prev => ({
                      ...prev,
                      techStack: { ...prev.techStack, database: e.target.value.split(',').map(s => s.trim()) }
                    }))}
                    className="w-full px-3 py-1.5 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Authentication (Comma separated)</label>
                  <input
                    type="text"
                    value={projectForm.techStack.auth?.join(', ') || ''}
                    onChange={(e) => setProjectForm(prev => ({
                      ...prev,
                      techStack: { ...prev.techStack, auth: e.target.value.split(',').map(s => s.trim()) }
                    }))}
                    className="w-full px-3 py-1.5 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Tools / DevOps (Comma separated)</label>
                  <input
                    type="text"
                    value={projectForm.techStack.tools.join(', ')}
                    onChange={(e) => setProjectForm(prev => ({
                      ...prev,
                      techStack: { ...prev.techStack, tools: e.target.value.split(',').map(s => s.trim()) }
                    }))}
                    className="w-full px-3 py-1.5 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Stars Count</label>
                    <input
                      type="number"
                      value={projectForm.starsCount}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, starsCount: Number(e.target.value) }))}
                      className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Forks Count</label>
                    <input
                      type="number"
                      value={projectForm.forksCount}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, forksCount: Number(e.target.value) }))}
                      className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Key System Features (Newline separated)</label>
                  <textarea
                    rows={4}
                    value={projectForm.features.join('\n')}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, features: e.target.value.split('\n').filter(Boolean) }))}
                    className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">System Architecture and Workflow</label>
                  <textarea
                    rows={4}
                    value={projectForm.architectureOverview}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, architectureOverview: e.target.value }))}
                    className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Challenges Faced (Format: Title|Description|Solution separated by newlines)</label>
                  <textarea
                    rows={4}
                    value={projectForm.challenges.map(c => `${c.title}|${c.description}|${c.solution}`).join('\n')}
                    onChange={(e) => {
                      const parsed = e.target.value.split('\n').filter(Boolean).map(line => {
                        const [title = '', description = '', solution = ''] = line.split('|');
                        return { title, description, solution };
                      });
                      setProjectForm(prev => ({ ...prev, challenges: parsed }));
                    }}
                    placeholder="Example Challenge|It was hard|I solved it"
                    className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Potential Improvements and Future Roadmap (Newline separated)</label>
                  <textarea
                    rows={4}
                    value={projectForm.futurePlans.join('\n')}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, futurePlans: e.target.value.split('\n').filter(Boolean) }))}
                    className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-200">
                    <input
                      type="checkbox"
                      checked={projectForm.featured}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, featured: e.target.checked }))}
                      className="w-4 h-4 accent-[#00FF41]"
                    />
                    <span>Mark as Featured Project on Home Page</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-200">
                    <input
                      type="checkbox"
                      checked={projectForm.showInResume}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, showInResume: e.target.checked }))}
                      className="w-4 h-4 accent-[#00FF41]"
                    />
                    <span>Show on Auto-Generated Resume</span>
                  </label>
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => { setIsAddingProject(false); setEditingProject(null); }}
                    className="px-4 py-2 rounded bg-gray-800 text-gray-300 hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploadingProjectImages}
                    className={`px-6 py-2 rounded bg-[#00FF41] text-black font-bold shadow-neon-green ${isUploadingProjectImages ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110'}`}
                  >
                    Save Project
                  </button>
                </div>
              </form>
            )}

            {/* Projects List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-[#0A0A0A] border border-[#1A1A1A] space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                          {proj.title}
                          {proj.featured && (
                            <span className="px-2 py-0.5 rounded bg-[#00FF41]/20 text-[#00FF41] text-[10px] font-bold">FEATURED</span>
                          )}
                        </h3>
                        <p className="text-xs text-gray-500">{proj.subtitle}</p>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#121212] border border-[#1A1A1A] text-[#00E5FF]">
                        {proj.category}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 line-clamp-2">{proj.summary}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#1A1A1A] text-xs">
                    <span className="text-gray-500 text-[11px]">ID: {proj.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingProject(proj);
                          setProjectForm({ ...proj });
                          setIsAddingProject(false);
                        }}
                        className="p-1.5 rounded bg-[#121212] border border-[#1A1A1A] text-gray-300 hover:text-[#00E5FF] hover:border-[#00E5FF]"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete project "${proj.title}"?`)) {
                            deleteProject(proj.id);
                            showToast(`Project deleted.`);
                          }
                        }}
                        className="p-1.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 3: SKILLS MANAGER */}
        {activeTab === 'skills' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0A0A0A] border border-[#1A1A1A] p-4 rounded-2xl">
              <div>
                <h2 className="text-sm font-bold text-[#00FF41] flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> TECHNICAL SKILLS INVENTORY ({skills.length})
                </h2>
                <p className="text-xs text-gray-500">
                  Add new technologies, update proficiency ratings and years of experience.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsAddingSkill(true);
                  setEditingSkill(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#00FF41] text-black font-bold text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-neon-green"
              >
                <Plus className="w-4 h-4" />
                <span>ADD NEW SKILL</span>
              </button>
            </div>

            {/* ADD OR EDIT SKILL FORM */}
            {(isAddingSkill || editingSkill) && (
              <form onSubmit={handleSaveSkill} className="bg-[#0A0A0A] border-2 border-[#00FF41] p-6 rounded-2xl space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]">
                  <h3 className="font-bold text-slate-100 text-sm">
                    {editingSkill ? `Edit Skill: ${editingSkill.name}` : 'Add New Technical Skill'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => { setIsAddingSkill(false); setEditingSkill(null); }}
                    className="text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Skill Name</label>
                    <input
                      type="text"
                      required
                      value={skillForm.name}
                      onChange={(e) => setSkillForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. React 19, Go, Kubernetes"
                      className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Category</label>
                    <select
                      value={skillForm.category}
                      onChange={(e) => setSkillForm(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    >
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Database & Cloud">Database & Cloud</option>
                      <option value="Tools & Architecture">Tools & Architecture</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Proficiency Rating ({skillForm.proficiency}%)</label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={skillForm.proficiency}
                      onChange={(e) => setSkillForm(prev => ({ ...prev, proficiency: parseInt(e.target.value) }))}
                      className="w-full accent-[#00FF41]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Level Label</label>
                    <select
                      value={skillForm.levelLabel}
                      onChange={(e) => setSkillForm(prev => ({ ...prev, levelLabel: e.target.value as any }))}
                      className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    >
                      <option value="Expert">Expert</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Proficient">Proficient</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Years of Experience</label>
                    <input
                      type="number"
                      step="0.5"
                      value={skillForm.yearsOfExperience}
                      onChange={(e) => setSkillForm(prev => ({ ...prev, yearsOfExperience: parseFloat(e.target.value) || 1 }))}
                      className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Lucide Icon Name</label>
                    <IconSelect 
                      value={skillForm.iconName} 
                      onChange={(val) => setSkillForm(prev => ({ ...prev, iconName: val }))} 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Description / Highlights</label>
                  <textarea
                    rows={2}
                    value={skillForm.description}
                    onChange={(e) => setSkillForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => { setIsAddingSkill(false); setEditingSkill(null); }}
                    className="px-4 py-2 rounded bg-gray-800 text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded bg-[#00FF41] text-black font-bold hover:brightness-110 shadow-neon-green"
                  >
                    Save Skill
                  </button>
                </div>
              </form>
            )}

            {/* Skills List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {skills.map((s) => (
                <div key={s.id} className="p-3.5 rounded-xl bg-[#0A0A0A] border border-[#1A1A1A] space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-slate-100 text-xs">{s.name}</h3>
                      <span className="text-[10px] text-[#00FF41] font-bold">{s.proficiency}%</span>
                    </div>
                    <p className="text-[11px] text-gray-500">{s.category} • {s.levelLabel}</p>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{s.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#1A1A1A] text-xs">
                    <span className="text-gray-500 text-[10px]">{s.yearsOfExperience} yrs exp</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingSkill(s);
                          setSkillForm({ ...s });
                          setIsAddingSkill(false);
                        }}
                        className="p-1 rounded bg-[#121212] text-gray-300 hover:text-[#00E5FF]"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete skill "${s.name}"?`)) {
                            deleteSkill(s.id);
                            showToast(`Skill deleted.`);
                          }
                        }}
                        className="p-1 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 4: TIMELINE MANAGER */}
        {activeTab === 'timeline' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0A0A0A] border border-[#1A1A1A] p-4 rounded-2xl">
              <div>
                <h2 className="text-sm font-bold text-[#00FF41] flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> EXPERIENCE & EDUCATION TIMELINE ({timeline.length})
                </h2>
                <p className="text-xs text-gray-500">
                  Manage work experience and educational qualifications.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsAddingTimeline(true);
                  setEditingTimeline(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#00FF41] text-black font-bold text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-neon-green"
              >
                <Plus className="w-4 h-4" />
                <span>ADD TIMELINE RECORD</span>
              </button>
            </div>

            {/* ADD OR EDIT TIMELINE FORM */}
            {(isAddingTimeline || editingTimeline) && (
              <form onSubmit={handleSaveTimeline} className="bg-[#0A0A0A] border-2 border-[#00FF41] p-6 rounded-2xl space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]">
                  <h3 className="font-bold text-slate-100 text-sm">
                    {editingTimeline ? `Edit Record: ${editingTimeline.title}` : 'Add Timeline Item'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => { setIsAddingTimeline(false); setEditingTimeline(null); }}
                    className="text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Type</label>
                    <select
                      value={timelineForm.type}
                      onChange={(e) => setTimelineForm(prev => ({ ...prev, type: e.target.value as any }))}
                      className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    >
                      <option value="experience">Work Experience</option>
                      <option value="education">Education</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Time Period</label>
                    <input
                      type="text"
                      required
                      value={timelineForm.period}
                      onChange={(e) => setTimelineForm(prev => ({ ...prev, period: e.target.value }))}
                      placeholder="e.g. 2024 — PRESENT"
                      className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Title / Degree</label>
                    <input
                      type="text"
                      required
                      value={timelineForm.title}
                      onChange={(e) => setTimelineForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">Organization / Company / University</label>
                    <input
                      type="text"
                      required
                      value={timelineForm.organization}
                      onChange={(e) => setTimelineForm(prev => ({ ...prev, organization: e.target.value }))}
                      className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Location</label>
                  <input
                    type="text"
                    value={timelineForm.location}
                    onChange={(e) => setTimelineForm(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Description</label>
                  <textarea
                    rows={2}
                    value={timelineForm.description}
                    onChange={(e) => setTimelineForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Key Highlights (One per line)</label>
                  <textarea
                    rows={3}
                    value={timelineForm.highlights.join('\n')}
                    onChange={(e) => setTimelineForm(prev => ({ ...prev, highlights: e.target.value.split('\n').filter(Boolean) }))}
                    className="w-full px-3 py-2 rounded bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => { setIsAddingTimeline(false); setEditingTimeline(null); }}
                    className="px-4 py-2 rounded bg-gray-800 text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded bg-[#00FF41] text-black font-bold hover:brightness-110 shadow-neon-green"
                  >
                    Save Timeline Record
                  </button>
                </div>
              </form>
            )}

            {/* Timeline List */}
            <div className="space-y-3">
              {timeline.map((t) => (
                <div key={t.id} className="p-4 rounded-xl bg-[#0A0A0A] border border-[#1A1A1A] flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        t.type === 'experience' ? 'bg-[#00FF41]/20 text-[#00FF41]' : 'bg-[#00E5FF]/20 text-[#00E5FF]'
                      }`}>
                        {t.type}
                      </span>
                      <span className="text-xs text-gray-400">{t.period}</span>
                    </div>
                    <h3 className="font-bold text-slate-100 text-sm">{t.title} — {t.organization}</h3>
                    <p className="text-xs text-gray-400">{t.description}</p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => {
                        setEditingTimeline(t);
                        setTimelineForm({ ...t });
                        setIsAddingTimeline(false);
                      }}
                      className="p-1.5 rounded bg-[#121212] text-gray-300 hover:text-[#00E5FF]"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete record "${t.title}"?`)) {
                          deleteTimelineItem(t.id);
                          showToast(`Timeline record deleted.`);
                        }
                      }}
                      className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 5: SECURITY & ACCOUNT CREDENTIALS */}
        {activeTab === 'security' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <form onSubmit={handleSaveSecurity} className="bg-[#0A0A0A] border border-[#1A1A1A] p-6 rounded-2xl space-y-6 max-w-2xl">
              <div className="pb-4 border-b border-[#1A1A1A]">
                <h2 className="text-base font-bold text-[#00FF41] flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  ADMIN SECURITY CREDENTIALS
                </h2>
                <p className="text-xs text-gray-500">
                  Update Administrator email/username and login password.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Admin Username / Email</label>
                  <input
                    type="text"
                    required
                    value={newAdminUser}
                    onChange={(e) => setNewAdminUser(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">New Security Password</label>
                  <input
                    type="password"
                    required
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>

                <div className="space-y-1 pt-2">
                  <label className="text-amber-400 font-bold">Confirm Current Password (Required to apply changes)</label>
                  <input
                    type="password"
                    required
                    value={currentPasswordConfirm}
                    onChange={(e) => setCurrentPasswordConfirm(e.target.value)}
                    placeholder="Current password"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#121212] border border-[#1A1A1A] text-slate-100 focus:border-[#00FF41] outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#00FF41] text-black font-bold text-xs hover:brightness-110 shadow-neon-green flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>UPDATE ADMIN CREDENTIALS</span>
                </button>
              </div>
            </form>

            {/* Danger Zone */}
            <div className="bg-rose-950/20 border border-rose-500/30 p-6 rounded-2xl space-y-3 max-w-2xl text-xs">
              <h3 className="font-bold text-rose-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> DANGER ZONE: RESTORE FACTORY DEFAULTS
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Resetting will erase all custom profile data, projects, skills, and admin password updates, restoring the original initial dataset.
              </p>
              <button
                type="button"
                onClick={handleResetData}
                className="px-4 py-2.5 rounded-xl bg-rose-500 text-white font-bold hover:bg-rose-600 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>RESET ALL PORTFOLIO DATA TO DEFAULTS</span>
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};
