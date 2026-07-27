export type NeonTheme = 'cyan' | 'green' | 'purple';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack' | 'Frontend / 3D' | 'AI Integration' | 'Mobile / API';
  summary: string;
  description: string;
  image: string;
  images?: string[]; // detail slideshow images
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    tools: string[];
    auth?: string[];
  };
  features: string[];
  architectureOverview: string;
  challenges: {
    title: string;
    description: string;
    solution: string;
  }[];
  futurePlans: string[];
  liveUrl: string;
  githubClient: string;
  githubServer?: string;
  featured: boolean;
  showInResume?: boolean;
  starsCount: number;
  forksCount: number;
  duration: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database & Cloud' | 'Tools & Architecture';
  proficiency: number; // 0 to 100
  levelLabel: 'Expert' | 'Advanced' | 'Proficient';
  iconName: string; // Lucide icon or key
  description: string;
  yearsOfExperience: number;
}

export interface TimelineItem {
  id: string;
  type: 'experience' | 'education';
  period: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  highlights: string[];
  tags: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username: string;
}

export interface DeveloperBio {
  name: string;
  title: string;
  typedTitles: string[];
  location: string;
  email: string;
  phone: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  twitter: string;
  status: string;
  availability: string;
  bioSummary: string;
  journeyText: string;
  preferredWorkText: string;
  interestsText: string[];
  resumePdfUrl: string;
  profilePicture?: string;
  experienceYears?: string;
  experienceDescription?: string;
  completedProjects?: string;
  projectsDescription?: string;
  academicRecord?: string;
  academicDescription?: string;
  careerObjective?: string;
  technicalSkills?: string;
  interpersonalSkills?: string;
  educationRecord?: string;
  languageProficiency?: string;
}
