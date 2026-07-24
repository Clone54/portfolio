import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { SkillsSection } from '../components/SkillsSection';
import { ExperienceEducationSection } from '../components/ExperienceEducationSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { ContactSection } from '../components/ContactSection';
import { NeonTheme } from '../types';

interface HomePageProps {
  theme: NeonTheme;
  onOpenResume: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ theme, onOpenResume }) => {
  return (
    <main className="relative z-10 space-y-4">
      <HeroSection theme={theme} onOpenResume={onOpenResume} />
      <AboutSection theme={theme} />
      <SkillsSection theme={theme} />
      <ExperienceEducationSection theme={theme} />
      <ProjectsSection theme={theme} />
      <ContactSection theme={theme} />
    </main>
  );
};
