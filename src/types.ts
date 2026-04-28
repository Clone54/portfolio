export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  stack: string[];
  liveLink: string;
  githubLink: string;
  challenges: string[];
  futurePlans: string[];
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'Frontend' | 'Backend' | 'Tools';
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  details: string;
}
