import { Project, Skill, Experience, Education } from './types';

export const TECH_MAP: Record<string, string> = {
  'React': 'react',
  'TypeScript': 'ts',
  'Tailwind CSS': 'tailwind',
  'Tailwind': 'tailwind',
  'Next.js': 'nextjs',
  'Node.js': 'nodejs',
  'Express': 'express',
  'PostgreSQL': 'postgres',
  'MongoDB': 'mongodb',
  'Git': 'git',
  'Git & GitHub': 'git',
  'Docker': 'docker',
  'Figma': 'figma',
  'Firebase': 'firebase',
  'Redux': 'redux',
  'Stripe': 'stripe',
  'Recharts': 'recharts',
  'Socket.io': 'socketio',
  'Dnd-kit': 'react',
  'HTML': 'html',
  'CSS': 'css',
  'JavaScript': 'js',
  'Vite': 'vite',
  'WebRTC': 'react',
  'Local Storage': 'js',
  'Motion': 'react',
};

export const PERSONAL_INFO = {
  name: 'Firoz Ahmed',
  designation: 'Full Stack Web Developer',
  email: 'firozahmedshoykot44@gmail.com',
  phone: '+880 1871-528249',
  location: 'Rajshahi, Bangladesh',
  bio: 'I am a passionate Full Stack Developer with a focus on building scalable, user-centric web applications. My journey into programming started with curiosity and evolved into a career dedicated to solving complex problems through clean code and efficient architecture.',
  journey: 'My programming journey began during my college days when I first discovered the power of HTML and CSS. Since then, I have continuously expanded my horizons, mastering modern frameworks like JavaScript, React and Node.js. I love the creative process of turning an idea into a functional, beautiful application.',
  hobbies: 'Outside of coding, I am an avid fan of football and enjoy competitive sports. I also have a keen interest in repairing electronic devices and exploring new technologies that push the boundaries of what is possible on the web.',
  socials: {
    github: 'https://github.com/Clone54',
    linkedin: 'https://linkedin.com/in/firoz-ahmed88',
    x: 'https://x.com/FirozShoyk24050',
    facebook: 'https://facebook.com/firoz.ahmed5678',
  },
  resumeUrl: '/resume.pdf'
};

export const SKILLS: Skill[] = [
  { name: 'React', level: 90, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 95, category: 'Frontend' },
  { name: 'Next.js', level: 80, category: 'Frontend' },
  { name: 'Node.js', level: 85, category: 'Backend' },
  { name: 'Express', level: 80, category: 'Backend' },
  { name: 'PostgreSQL', level: 75, category: 'Backend' },
  { name: 'MongoDB', level: 82, category: 'Backend' },
  { name: 'Git & GitHub', level: 90, category: 'Tools' },
  { name: 'Figma', level: 25, category: 'Tools' },
];

export const PROJECTS: Project[] = [
  {
    id: 'payoo',
    name: 'Payoo',
    shortDescription: 'A Smart Mobile Financial Service (MFS) interface for seamless transactions.',
    fullDescription: 'Payoo is a modern, responsive interface for Mobile Financial Services. It focuses on providing a clean user experience for money transfers, bill payments, and account management, inspired by professional financial applications.',
    image: '/assets/payoo.png',
    stack: ['HTML', 'Tailwind', 'JavaScript', 'Node.js'],
    liveLink: 'https://clone54.github.io/Payoo/',
    githubLink: 'https://github.com/Clone54/Payoo',
    challenges: [
      'Ensuring a highly secure-feeling UI for financial transactions.',
      'Implementing complex form validations for account numbers and amounts.',
      'Optimizing the interface for mobile-first users.'
    ],
    futurePlans: [
      'A frontend demo of MFS ',
      'Credentials: Number -> 01871528249, Password -> 528249',
      'Adding biometric authentication support (mocked).',
      'Expanding to support international currency formats.'
    ]
  },
  {
    id: 'english-moja',
    name: 'English Moja',
    shortDescription: 'Interactive educational platform for English language learners.',
    fullDescription: 'English Moja makes learning English fun and engaging through interactive quizzes, video lessons, and progress tracking tailored for local students.',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800',
    stack: ['React', 'Firebase', 'Tailwind', 'Motion'],
    liveLink: 'https://english-moja.vercel.app',
    githubLink: 'https://github.com/Clone54/english-moja',
    challenges: [
      'Designing engaging animations to keep students motivated.',
      'Managing a large database of lesson materials efficiently.',
      'Optimizing video streaming for varied internet speeds.'
    ],
    futurePlans: [
      'Developing a personalized AI tutor for conversational practice.',
      'Adding support for offline downloads of lessons.',
      'Creating a competitive leaderboard for students.'
    ]
  },
  {
    id: 'sid-ruet',
    name: 'SID RUET',
    shortDescription: 'Student Identity and Database management system for university students.',
    fullDescription: 'SID RUET is a id card making system for maintaining student records and identities for the university community.',
    image: '/assets/sid.png',
    stack: ['React', 'Express', 'PostgreSQL', 'Tailwind'],
    liveLink: 'https://sid-ruet.vercel.app',
    githubLink: 'https://github.com/Clone54/SID_RUET',
    challenges: [
      'Migrating legacy data to a modern designed id card.',
      'Implementing strict security protocols for student records.',
      'Designing a multi-user permission system for faculty and students.'
    ],
    futurePlans: [
      'Integrating with the university library and portal systems.',
      'Adding automated semester-wise report generation.',
      'Supporting digital ID cards with QR codes.'
    ]
  },
  {
    id: 'ict-cheat-sheet',
    name: 'ICT Cheat Sheet',
    shortDescription: 'Educational cheat sheet for C programming tailored for HSC students.',
    fullDescription: 'ICT Cheat Sheet is a comprehensive digital cheat sheet designed to help HSC students master C programming. It covers everything from basic structure to complex algorithms in an easy-to-digest format.',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800',
    stack: ['React', 'Tailwind', 'Motion'],
    liveLink: 'https://ict-medha.vercel.app',
    githubLink: 'https://github.com/Clone54/HSC_ICT',
    challenges: [
      'Summarizing complex programming concepts into concise snippets.',
      'Building a highly responsive and readable educational interface.',
      'Implementing a search feature for quick concept lookup.'
    ],
    futurePlans: [
      'Adding interactive coding exercises.',
      'Including video explanations for difficult topics.',
      'Expanding content to cover other parts of the ICT syllabus.'
    ]
  },
  {
    id: 'keenkeeper',
    name: 'KeenKeeper',
    shortDescription: 'A minimalist contact keeping application for focused productivity.',
    fullDescription: 'KeenKeeper provides a clean and distraction-free environment for taking notes of contacts. It emphasizes simplicity and speed, allowing users to contact someone instantly.',
    image: '/assets/keenkeeper.png',
    stack: ['React', 'Vite', 'Tailwind', 'Local Storage'],
    liveLink: 'https://keepkeener.vercel.app',
    githubLink: 'https://github.com/Clone54/Assignmnet_7',
    challenges: [
      'Implementing an auto-save feature for notes.',
      'Maintaining a clean, minimalist UI without sacrificing functionality.',
      'Optimizing performance for handling hundreds of notes.'
    ],
    futurePlans: [
      'Adding cross-device synchronization.',
      'Implementing Markdown support for rich text notes.',
      'Creating a dark mode option for better nighttime usage.'
    ]
  },
  {
    id: 'assignment-5',
    name: 'GitHub Issues Tracker',
    shortDescription: 'A tool for managing and tracking GitHub repository issues.',
    fullDescription: 'This project is a functional clone of a GitHub issues interface, allowing users to view, sort, and filter repository issues with a professional UI.',
    image: '/assets/github.png',
    stack: ['HTML', 'Tailwind', 'JavaScript'],
    liveLink: 'https://clone54.github.io/Assignment_5/',
    githubLink: 'https://github.com/Clone54/Assignment_5',
    challenges: [
      'Replicating the complex nested layout of GitHub issues.',
      'Implementing efficient client-side filtering.',
      'Ensuring responsiveness across all device sizes.'
    ],
    futurePlans: [
      'Connecting to the live GitHub API.',
      'Adding support for issue creation and editing.',
      'Implementing a collaborative multi-user mode.'
    ]
  },
  {
    id: 'assignment-4',
    name: 'Job Application Tracker',
    shortDescription: 'Dashboard for tracking job applications and interview statuses.',
    fullDescription: 'Job Application Tracker helps users stay on top of their career search by providing a visual dashboard to manage pending, active, and completed job applications.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    stack: ['HTML', 'Tailwind', 'JavaScript'],
    liveLink: 'https://clone54.github.io/Assignment_4/',
    githubLink: 'https://github.com/Clone54/Assignment_4',
    challenges: [
      'Designing a clear information hierarchy for application statuses.',
      'Implementing dynamic status updates without page reloads.',
      'Ensuring data persistence using local storage.'
    ],
    futurePlans: [
      'Adding a calendar view for interviews.',
      'Implementing automated reminders for follow-ups.',
      'Supporting document uploads for resumes and cover letters.'
    ]
  },
  {
    id: 'assignment-2',
    name: 'Modern Business Layout',
    shortDescription: 'A clean and professional static website layout for businesses.',
    fullDescription: 'This project focuses on advanced CSS grid and flexbox techniques to create a modern, high-conversion landing page for a business service.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    stack: ['HTML', 'CSS', 'Tailwind'],
    liveLink: 'https://clone54.github.io/Assignment_2/',
    githubLink: 'https://github.com/Clone54/Assignment_2',
    challenges: [
      'Achieving pixel-perfect accuracy to a professional design spec.',
      'Optimizing images and assets for ultra-fast load times.',
      'Managing complex responsive break points.'
    ],
    futurePlans: [
      'Converting the layout into a dynamic CMS-powered site.',
      'Adding an interactive map for location scouting.',
      'Implementing a multi-step contact form.'
    ]
  },
  {
    id: 'tutor-lagbe',
    name: 'Tutor Lagbe',
    shortDescription: 'A comprehensive platform connecting students with expert tutors.',
    fullDescription: 'Tutor Lagbe is designed to bridge the gap between students seeking educational help and qualified tutors. It features advanced matching algorithms and a robust profile system for both parties.',
    image: '/assets/tutorlagbe.png',
    stack: ['React', 'Node.js', 'MongoDB', 'Express'],
    liveLink: 'https://tutor-lagbe-three.vercel.app/',
    githubLink: 'https://github.com/Clone54/tutor-lagbe',
    challenges: [
      'Developing a scalable search and filter system for tutors.',
      'Managing complex real-time interview scheduling.',
      'Securing user data and verifying tutor credentials.'
    ],
    futurePlans: [
      'Adding an integrated messaging feature for sessions.',
      'Implementing an automated review and rating system.',
      'Launching a mobile app version for push notifications.'
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'null',
    position: 'Junior Full Stack Developer',
    period: '2025 - Present',
    description: [
      'Developed and maintained client websites using the MERN stack.',
      'Collaborated with designers to implement responsive UI/UX components.',
      'Optimized backend APIs, reducing response times by 20%.'
    ]
  },
  {
    company: 'Freelance',
    position: 'Digital Marketer',
    period: '2024 - 2025',
    description: [
      'Managed social media campaigns for local businesses, increasing engagement by 30%.',
      'Created content calendars and designed graphics using Canva.',
      'Analyzed campaign performance and provided actionable insights to clients.'
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    institution: 'Rajshahi University of Engineering and Technology',
    degree: 'B.Sc. in Electrical and Electronic Engineering',
    period: '2024 - 2029',
    details: 'Currently pursuing my undergraduate degree with a focus on software development and web technologies. I have completed coursework in data structures, algorithms, and database management, and have been actively involved in coding projects and hackathons.'
  },
  {
    institution: 'New Govt. Degree College, Rajshahi',
    degree: 'Higher Secondary Certificate (HSC)',
    period: '2021 - 2023',
    details: 'Completed Science group with a GPA of 5.0.'
  }
];
