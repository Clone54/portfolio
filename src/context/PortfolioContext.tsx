import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  DeveloperBio, 
  Project, 
  Skill, 
  TimelineItem, 
  SocialLink 
} from '../types';
import { 
  developerBio as initialBio, 
  projectsData as initialProjects, 
  skillsData as initialSkills, 
  timelineData as initialTimeline, 
  socialLinks as initialSocialLinks 
} from '../data/portfolioData';

import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

interface AdminCredentials {
  username: string;
  passwordHash: string; // Deprecated, keeping type for backwards compatibility in UI state temporarily
}

const DEFAULT_ADMIN: AdminCredentials = {
  username: 'firozahmedskt1@gmail.com',
  passwordHash: 'ShOyKoT3'
};

interface PortfolioContextType {
  isLoading: boolean;
  developerBio: DeveloperBio;
  projects: Project[];
  skills: Skill[];
  timeline: TimelineItem[];
  socialLinks: SocialLink[];
  isAdminLoggedIn: boolean;
  adminCredentials: AdminCredentials;
  
  // Actions
  loginAdmin: (user: string, pass: string) => Promise<boolean>;
  logoutAdmin: () => Promise<void>;
  updateAdminCredentials: (user: string, pass: string) => Promise<void>;
  updateDeveloperBio: (bio: DeveloperBio) => Promise<void>;
  
  // Projects CRUD
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  
  // Skills CRUD
  addSkill: (skill: Omit<Skill, 'id'>) => Promise<void>;
  updateSkill: (id: string, skill: Partial<Skill>) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;
  
  // Timeline CRUD
  addTimelineItem: (item: Omit<TimelineItem, 'id'>) => Promise<void>;
  updateTimelineItem: (id: string, item: Partial<TimelineItem>) => Promise<void>;
  deleteTimelineItem: (id: string) => Promise<void>;
  
  // Social Links
  updateSocialLinks: (links: SocialLink[]) => Promise<void>;
  
  // Sound
  isSoundEnabled: boolean;
  toggleSound: () => void;
  playSound: (type: 'click' | 'hover' | 'success' | 'error') => void;
  
  // Reset
  resetToDefaults: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEYS = {
  BIO: 'cyber_portfolio_bio_v1',
  PROJECTS: 'cyber_portfolio_projects_v1',
  SKILLS: 'cyber_portfolio_skills_v1',
  TIMELINE: 'cyber_portfolio_timeline_v1',
  SOCIAL: 'cyber_portfolio_social_v1',
  ADMIN_CREDS: 'cyber_portfolio_admin_creds_v1',
  ADMIN_SESSION: 'cyber_portfolio_admin_session_v1',
  SOUND: 'cyber_portfolio_sound_v1',
};

// Web Audio API helper
let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

const playTone = (frequency: number, type: OscillatorType, duration: number, volume: number = 0.1) => {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
  } catch (e) {
    // Ignore audio errors
  }
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Developer Bio State
  const [developerBio, setDeveloperBio] = useState<DeveloperBio>(initialBio);

  // 2. Projects State
  const [projects, setProjects] = useState<Project[]>([]);

  // 3. Skills State
  const [skills, setSkills] = useState<Skill[]>([]);

  // 4. Timeline State
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);

  // 5. Social Links State
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialSocialLinks);

  // 6. Admin Credentials State (Deprecated)
  const [adminCredentials, setAdminCredentials] = useState<AdminCredentials>(DEFAULT_ADMIN);

  // 7. Admin Session State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // 8. Sound State
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SOUND);
      return saved ? JSON.parse(saved) : true; // Default to true
    } catch {
      return true;
    }
  });

  // 9. Loading State
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdminLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  // Firebase Realtime Listeners
  useEffect(() => {
    let projectsLoaded = false;
    let skillsLoaded = false;
    let timelineLoaded = false;
    let globalsLoaded = false;

    const checkLoading = () => {
      if (projectsLoaded && skillsLoaded && timelineLoaded && globalsLoaded) {
        setIsLoading(false);
      }
    };

    const unsubProjects = onSnapshot(collection(db, 'projects'), (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Project)));
      projectsLoaded = true;
      checkLoading();
    });

    const unsubSkills = onSnapshot(collection(db, 'skills'), (snapshot) => {
      setSkills(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Skill)));
      skillsLoaded = true;
      checkLoading();
    });

    const unsubTimeline = onSnapshot(collection(db, 'timeline'), (snapshot) => {
      setTimeline(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as TimelineItem)));
      timelineLoaded = true;
      checkLoading();
    });

    const unsubGlobals = onSnapshot(collection(db, 'globals'), (snapshot) => {
      snapshot.docs.forEach(doc => {
        if (doc.id === 'developerBio') {
          setDeveloperBio(doc.data() as DeveloperBio);
        } else if (doc.id === 'socialLinks') {
          setSocialLinks(doc.data().links as SocialLink[]);
        }
      });
      globalsLoaded = true;
      checkLoading();
    });

    return () => {
      unsubProjects();
      unsubSkills();
      unsubTimeline();
      unsubGlobals();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SOUND, JSON.stringify(isSoundEnabled));
  }, [isSoundEnabled]);

  // Sound Handlers
  const toggleSound = () => setIsSoundEnabled(!isSoundEnabled);

  const playSound = (type: 'click' | 'hover' | 'success' | 'error') => {
    if (!isSoundEnabled) return;
    
    switch (type) {
      case 'click':
        playTone(800, 'sine', 0.1, 0.05);
        break;
      case 'hover':
        playTone(1200, 'sine', 0.05, 0.01);
        break;
      case 'success':
        playTone(400, 'square', 0.1, 0.02);
        setTimeout(() => playTone(600, 'square', 0.1, 0.02), 100);
        setTimeout(() => playTone(800, 'square', 0.2, 0.02), 200);
        break;
      case 'error':
        playTone(300, 'sawtooth', 0.2, 0.05);
        setTimeout(() => playTone(250, 'sawtooth', 0.3, 0.05), 200);
        break;
    }
  };

  // Login / Logout (Firebase Auth)
  const loginAdmin = async (user: string, pass: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, user, pass);
      return true;
    } catch (error: any) {
      if (error.code === 'auth/operation-not-allowed') {
        throw new Error("Email/Password authentication is disabled in your Firebase project. Please go to Firebase Console -> Authentication -> Sign-in method, and enable 'Email/Password'.");
      }
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        try {
           // If the user doesn't exist, allow them to create the first admin account
           // Note: In production you might want to restrict this
           await createUserWithEmailAndPassword(auth, user, pass);
           return true;
        } catch (e: any) {
          if (e.code === 'auth/operation-not-allowed') {
            throw new Error("Email/Password authentication is disabled in your Firebase project. Please go to Firebase Console -> Authentication -> Sign-in method, and enable 'Email/Password'.");
          }
          console.error("Error creating admin account:", e);
          return false;
        }
      }
      console.error("Login error:", error);
      return false;
    }
  };

  const logoutAdmin = async () => {
    await signOut(auth);
  };

  const updateAdminCredentials = async (user: string, pass: string) => {
    if (auth.currentUser && pass.trim()) {
      import('firebase/auth').then(({ updatePassword }) => {
        updatePassword(auth.currentUser!, pass).catch(console.error);
      });
    }
  };

  // Bio Update
  const updateDeveloperBio = async (newBio: DeveloperBio) => {
    await setDoc(doc(db, 'globals', 'developerBio'), newBio);
  };

  // Projects CRUD
  const addProject = async (proj: Omit<Project, 'id'>) => {
    const id = `project-${Date.now()}`;
    await setDoc(doc(db, 'projects', id), proj);
  };

  const updateProject = async (id: string, updatedFields: Partial<Project>) => {
    await updateDoc(doc(db, 'projects', id), updatedFields);
  };

  const deleteProject = async (id: string) => {
    await deleteDoc(doc(db, 'projects', id));
  };

  // Skills CRUD
  const addSkill = async (skill: Omit<Skill, 'id'>) => {
    const id = `skill-${Date.now()}`;
    await setDoc(doc(db, 'skills', id), skill);
  };

  const updateSkill = async (id: string, updatedFields: Partial<Skill>) => {
    await updateDoc(doc(db, 'skills', id), updatedFields);
  };

  const deleteSkill = async (id: string) => {
    await deleteDoc(doc(db, 'skills', id));
  };

  // Timeline CRUD
  const addTimelineItem = async (item: Omit<TimelineItem, 'id'>) => {
    const id = `item-${Date.now()}`;
    await setDoc(doc(db, 'timeline', id), item);
  };

  const updateTimelineItem = async (id: string, updatedFields: Partial<TimelineItem>) => {
    await updateDoc(doc(db, 'timeline', id), updatedFields);
  };

  const deleteTimelineItem = async (id: string) => {
    await deleteDoc(doc(db, 'timeline', id));
  };

  // Social Links
  const updateSocialLinks = async (links: SocialLink[]) => {
    await setDoc(doc(db, 'globals', 'socialLinks'), { links });
  };

  // Reset Data (Populates Firebase with default data if empty or resets it)
  const resetToDefaults = async () => {
    await setDoc(doc(db, 'globals', 'developerBio'), initialBio);
    await setDoc(doc(db, 'globals', 'socialLinks'), { links: initialSocialLinks });
    
    for (const proj of initialProjects) {
      await setDoc(doc(db, 'projects', proj.id), proj);
    }
    for (const skill of initialSkills) {
      await setDoc(doc(db, 'skills', skill.id), skill);
    }
    for (const item of initialTimeline) {
      await setDoc(doc(db, 'timeline', item.id), item);
    }
  };

  return (
    <PortfolioContext.Provider value={{
      isLoading,
      developerBio,
      projects,
      skills,
      timeline,
      socialLinks,
      isAdminLoggedIn,
      adminCredentials,
      isSoundEnabled,
      toggleSound,
      playSound,
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
      resetToDefaults,
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
