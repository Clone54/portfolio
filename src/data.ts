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
    linkedin: 'https://linkedin.com/in/firozahmed',
    x: 'https://x.com/firozahmed',
    facebook: 'https://facebook.com/firoz.ahmed5678',
  }
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
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800',
    stack: ['HTML', 'Tailwind', 'JavaScript', 'Node.js'],
    liveLink: 'https://payoo-mfs.vercel.app',
    githubLink: 'https://github.com/Clone54/Payoo',
    challenges: [
      'Ensuring a highly secure-feeling UI for financial transactions.',
      'Implementing complex form validations for account numbers and amounts.',
      'Optimizing the interface for mobile-first users.'
    ],
    futurePlans: [
      'Integrating a real backend for transaction history.',
      'Adding biometric authentication support (mocked).',
      'Expanding to support international currency formats.'
    ]
  },
  {
    id: 'tutor-lagbe',
    name: 'Tutor Lagbe',
    shortDescription: 'A comprehensive platform connecting students with expert tutors.',
    fullDescription: 'Tutor Lagbe is designed to bridge the gap between students seeking educational help and qualified tutors. It features advanced matching algorithms and a robust profile system for both parties.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    stack: ['React', 'Node.js', 'MongoDB', 'Express'],
    liveLink: 'https://tutor-lagbe-demo.vercel.app',
    githubLink: 'https://github.com/Clone54/tutor-lagbe',
    challenges: [
      'Developing a scalable search and filter system for tutors.',
      'Managing complex real-time interview scheduling.',
      'Securing user data and verifying tutor credentials.'
    ],
    futurePlans: [
      'Adding an integrated video calling feature for sessions.',
      'Implementing an automated review and rating system.',
      'Launching a mobile app version for push notifications.'
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
    fullDescription: 'SID RUET is a centralized database system for maintaining student records, identities, and academic progress for the university community.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800',
    stack: ['React', 'Express', 'PostgreSQL', 'Tailwind'],
    liveLink: 'https://sid-ruet.vercel.app',
    githubLink: 'https://github.com/Clone54/SID_RUET',
    challenges: [
      'Migrating legacy data to a modern relational database.',
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
    id: 'ict-medha',
    name: 'ICT cheet sheet',
    shortDescription: 'Educational cheat sheet for C programming tailored for HSC students.',
    fullDescription: 'ICT Medha is a comprehensive digital cheat sheet designed to help HSC students master C programming. It covers everything from basic structure to complex algorithms in an easy-to-digest format.',
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
    shortDescription: 'A minimalist note-keeping application for focused productivity.',
    fullDescription: 'KeenKeeper provides a clean and distraction-free environment for taking notes. It emphasizes simplicity and speed, allowing users to capture ideas instantly.',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800',
    stack: ['React', 'Vite', 'Tailwind', 'Local Storage'],
    liveLink: 'https://keepkeener.vercel.app',
    githubLink: 'https://github.com/Clone54/website',
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
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaf486e?auto=format&fit=crop&q=80&w=800',
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
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'Tech Solutions Ltd.',
    position: 'Junior Full Stack Developer',
    period: '2023 - Present',
    description: [
      'Developed and maintained client websites using the MERN stack.',
      'Collaborated with designers to implement responsive UI/UX components.',
      'Optimized backend APIs, reducing response times by 20%.'
    ]
  },
  {
    company: 'Freelance',
    position: 'Web Developer',
    period: '2021 - 2023',
    description: [
      'Built custom WordPress and React-based sites for local businesses.',
      'Managed end-to-end project delivery from requirement gathering to deployment.',
      'Provided ongoing maintenance and SEO optimization for client projects.'
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    institution: 'University of Engineering and Technology',
    degree: 'B.Sc. in Computer Science',
    period: '2019 - 2023',
    details: 'Focused on software engineering, data structures, and algorithms. Graduated with Honors.'
  },
  {
    institution: 'Dhaka City College',
    degree: 'Higher Secondary Certificate (HSC)',
    period: '2017 - 2019',
    details: 'Completed Science group with a GPA of 5.0.'
  }
];
