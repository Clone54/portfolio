import { DeveloperBio, Project, Skill, TimelineItem, SocialLink } from '../types';

export const developerBio: DeveloperBio = {
  name: "Firoz Ahmed",
  title: "Full Stack MERN & WebGL Engineer",
  typedTitles: [
    "Full Stack MERN Developer",
    "WebGL & 3D Interactive Specialist",
    "Real-Time SaaS Architect",
    "AI & Cloud Native Engineer"
  ],
  location: "Dhaka, Bangladesh // Available Remotely Worldwide",
  email: "firozahmedskt1@gmail.com",
  phone: "+880 1700-123456",
  whatsapp: "+8801700123456",
  github: "https://github.com/firozahmed",
  linkedin: "https://linkedin.com/in/firozahmed",
  twitter: "https://x.com/firozahmed_dev",
  status: "OPEN TO FULL-TIME & HIGH-IMPACT FREELANCE",
  availability: "Available for 40+ hrs/week across UTC/EST/PST timezones",
  bioSummary: "I bridge high-performance full-stack web applications with immersive interactive visual experiences. Specializing in the MERN stack, TypeScript, Three.js, and scalable cloud microservices.",
  journeyText: "My coding odyssey started 4+ years ago when I built my first custom C++ algorithm and fell in love with turning mathematical logic into visual systems. Transitioning into web development, I mastered React, Node.js, and MongoDB before diving deep into WebGL shader art and real-time distributed systems. Today, I build end-to-end web applications that combine pixel-perfect UI with rock-solid server architectures.",
  preferredWorkText: "I thrive when building real-time SaaS platforms, high-throughput microservices, interactive 3D WebGL dashboards, and generative AI workflow tools. I value clean component design, strict TypeScript safety, automated CI/CD pipelines, and high-contrast hacker aesthetics.",
  interestsText: [
    "🏎️ Cyberpunk Aesthetic & Sci-Fi Literature",
    "🎨 3D Shader Art & Generative Graphics",
    "🏀 Competitive Basketball & Trail Running",
    "⌨️ Custom Mechanical Keyboards & Ergonomic Setups",
    "♟️ Classical Chess Tactics"
  ],
  resumePdfUrl: "#resume-modal",
  experienceYears: "4+ Years",
  experienceDescription: "Professional experience building production full-stack MERN & WebGL software.",
  completedProjects: "35+ Full Repos",
  projectsDescription: "High-impact web apps, 3D showcases, AI tools, and scalable REST/GraphQL backend systems.",
  academicRecord: "B.Sc. CSE",
  academicDescription: "Honors Degree in Computer Science with Post-HSC Science Distinction (CGPA 3.85 / 4.00)."
};

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com", icon: "Github", username: "@firozahmed" },
  { name: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin", username: "in/firozahmed" },
  { name: "Twitter", url: "https://x.com", icon: "Twitter", username: "@firozahmed_dev" },
  { name: "WhatsApp", url: "https://wa.me/8801700123456", icon: "MessageSquare", username: "+880 1700-123456" },
  { name: "Email", url: "mailto:firozahmedskt1@gmail.com", icon: "Mail", username: "firozahmedskt1@gmail.com" }
];

export const projectsData: Project[] = [
  {
    id: "cyber-nexus-saas",
    title: "CyberNexus AI // DevOps Command Center",
    subtitle: "Real-time AI Cloud Observability & Microservices Mesh Visualizer",
    category: "Full-Stack",
    summary: "An enterprise observability console featuring 3D node topology graphs, real-time WebSockets metric streaming, and AI-driven automated incident triage.",
    description: "CyberNexus AI gives DevOps engineers an interactive 3D topology view of microservice clusters. Built using Node.js, Express, Socket.io, React, and Three.js, it handles millions of log events with sub-20ms latency and automatically detects anomaly spikes using Gemini LLM reasoning.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    techStack: {
      frontend: ["React 19", "Three.js", "Tailwind CSS", "Framer Motion", "Recharts"],
      backend: ["Node.js", "Express", "Socket.io", "Gemini AI API"],
      database: ["MongoDB", "Redis Cloud"],
      tools: ["Docker", "Vite", "TypeScript", "ESBuild"]
    },
    features: [
      "Interactive 3D WebGL node graph visualizing microservices dependency clusters in real-time.",
      "Sub-millisecond WebSocket log stream multiplexer with severity color-coding.",
      "AI Incident Assistant powered by Gemini API to generate instant root-cause diagnostic reports.",
      "Role-Based Access Control (RBAC) with JWT auth and encrypted session tokens.",
      "Exportable incident telemetry reports in PDF and JSON formats."
    ],
    architectureOverview: "The system uses a decoupled event-driven architecture. The Node.js Express server ingests log metrics into Redis pub/sub channels, broadcasting live state to connected React WebGL clients over Socket.io. LLM queries are processed via background worker queues to prevent UI thread blocking.",
    challenges: [
      {
        title: "Rendering 10,000+ Active Nodes in WebGL Without Frame Drops",
        description: "Initial React state re-renders caused severe dropped frames during high log throughput spikes.",
        solution: "Implemented Three.js InstancedMesh with custom GLSL vertex shaders, moving particle coordinate computation directly onto the GPU buffer attributes."
      },
      {
        title: "WebSocket Connection Throttling Under Network Flappiness",
        description: "Mobile clients experienced dropped sockets and duplicate event listeners on reconnect.",
        solution: "Built a resilient client-side exponential backoff reconnect manager with offline message buffering in IndexedDB."
      }
    ],
    futurePlans: [
      "Integrate OpenTelemetry native exporter for automatic Kubernetes pod auto-discovery.",
      "Add voice-controlled natural language query terminal commands.",
      "Deploy distributed edge nodes using Cloudflare Workers for lower global latency."
    ],
    liveUrl: "https://ais-dev-e2zx6fnx6syav3l4mx3kzq-473656623930.asia-southeast1.run.app",
    githubClient: "https://github.com/firozahmed/cybernexus-client",
    githubServer: "https://github.com/firozahmed/cybernexus-server",
    featured: true,
    starsCount: 142,
    forksCount: 28,
    duration: "3 Months (Q1 2026)"
  },
  {
    id: "neural-code-ide",
    title: "NeuralScript // AI Cloud Code Environment",
    subtitle: "Collaborative Web-Based Code Editor with Real-Time Gemini Co-Pilot",
    category: "AI Integration",
    summary: "In-browser cloud IDE supporting live multi-user cursor editing, terminal execution, and intelligent AI code refactoring.",
    description: "NeuralScript provides developers with a lightweight, browser-based coding studio. Integrated with Monaco Editor and WebSockets, users can pair-program live, compile TypeScript snippets directly in isolated sandboxes, and run contextual AI code reviews.",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80",
    techStack: {
      frontend: ["React 19", "Monaco Editor", "Tailwind CSS", "Lucide React"],
      backend: ["Express.js", "Node.js", "Google GenAI SDK", "Docker Containers"],
      database: ["MongoDB Atlas", "Mongoose"],
      tools: ["Vite", "Pnpm", "Git CLI integration"]
    },
    features: [
      "Monaco Editor integration with dark theme syntax highlighting for 20+ languages.",
      "Contextual AI auto-complete and full-file refactoring suggestions.",
      "Live multi-user collaborative editing with color-coded remote cursors.",
      "Embedded virtual terminal output pane showing real-time build and error logs.",
      "One-click snippet sharing with secret link generation and password protection."
    ],
    architectureOverview: "Client editor events are synchronized using Operational Transform (OT) over WebSockets. The backend manages isolated container sandboxes to execute user code securely with cpu/memory resource limits.",
    challenges: [
      {
        title: "Preventing AI Context Overflow in Large Repositories",
        description: "Passing entire repository source code into Gemini API resulted in token limit errors.",
        solution: "Engineered an AST parser chunking engine that sends only relevant file imports and symbol definitions to the AI prompt context."
      }
    ],
    futurePlans: [
      "Add WebAssembly (Wasm) localized code compilation for C++ and Rust.",
      "Implement GitHub Pull Request automated review bot integration."
    ],
    liveUrl: "https://ais-dev-e2zx6fnx6syav3l4mx3kzq-473656623930.asia-southeast1.run.app",
    githubClient: "https://github.com/firozahmed/neural-script-ide",
    githubServer: "https://github.com/firozahmed/neural-script-backend",
    featured: true,
    starsCount: 98,
    forksCount: 19,
    duration: "2 Months (Q4 2025)"
  },
  {
    id: "quantum-3d-metaverse",
    title: "Quantum Realm // Interactive 3D Product Canvas",
    subtitle: "Immersive WebGL E-Commerce & Interactive 3D Showroom",
    category: "Frontend / 3D",
    summary: "A high-performance 3D interactive product showcase with custom PBR lighting, raycasted interaction, and spatial audio effects.",
    description: "Built for futuristic hardware brands, Quantum Realm lets users inspect detailed 3D models with real-time lighting changes, exploded product views, dynamic material customization, and seamless cart state synchronization.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    techStack: {
      frontend: ["Three.js", "React 19", "Tailwind CSS", "Web Audio API", "GSAP"],
      backend: ["Express.js", "Node.js"],
      database: ["PostgreSQL (Drizzle ORM)"],
      tools: ["GLTF/GLB Optimizers", "Draco Compression"]
    },
    features: [
      "Realistic GLTF/GLB 3D model viewer with custom metallic and roughness shader maps.",
      "Exploded view animation toggles showcasing internal mechanical engineering.",
      "Dynamic colorway and material customization with instant texture swapping.",
      "Spatial sound effects synced to 3D camera pan and rotational distance.",
      "Mobile touch-gesture OrbitControls optimized for 60FPS on iOS and Android."
    ],
    architectureOverview: "GLTF models are compressed via Google Draco and served over CDN with aggressive caching. Texture maps are dynamically swapped in memory to keep initial page bundle size under 2.5MB.",
    challenges: [
      {
        title: "Large 3D Model Asset Load Times on Slow Mobile Networks",
        description: "Original uncompressed 3D assets exceeded 45MB, causing long blank screens.",
        solution: "Applied Draco geometry compression and progressive texture mipmapping, reducing total asset footprint by 82% to 4.2MB."
      }
    ],
    futurePlans: [
      "Add Augmented Reality (AR) QuickLook support for iOS USDZ and Android WebXR.",
      "Integrate Stripe 3D checkout flow directly within WebGL viewport."
    ],
    liveUrl: "https://ais-dev-e2zx6fnx6syav3l4mx3kzq-473656623930.asia-southeast1.run.app",
    githubClient: "https://github.com/firozahmed/quantum-3d-showroom",
    featured: true,
    starsCount: 210,
    forksCount: 45,
    duration: "2.5 Months (2025)"
  },
  {
    id: "hyper-task-matrix",
    title: "HyperMatrix // Distributed Team Kanban",
    subtitle: "Real-time Multi-tenant Task Engine with Automated Workflow Pipelines",
    category: "Full-Stack",
    summary: "Ultra-fast MERN stack productivity matrix with drag-and-drop boards, analytics telemetry, and automated Webhook triggers.",
    description: "HyperMatrix redefines task management for modern engineering teams. Featuring keyboard-first navigation, fluid drag-and-drop UI, custom sprint analytics charts, and seamless Slack/Discord webhook notifications.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    techStack: {
      frontend: ["React 19", "Tailwind CSS", "DND Kit", "Recharts", "Motion"],
      backend: ["Node.js", "Express.js", "JWT", "Bcrypt"],
      database: ["MongoDB", "Mongoose Schema"],
      tools: ["Vite", "TypeScript"]
    },
    features: [
      "Smooth fluid drag-and-drop task reordering across sprint columns.",
      "Real-time team presence indicator showing who is viewing which card.",
      "Interactive velocity and burn-down charts generated with Recharts.",
      "Custom task tags, sub-task checklists, attachment uploads, and priority filters.",
      "Keyboard shortcuts modal for power users (CMD+K quick command palette)."
    ],
    architectureOverview: "Built on MERN architecture with optimistic UI updates in React state, providing zero-latency drag updates while async sync calls reconcile with MongoDB in the background.",
    challenges: [
      {
        title: "Race Conditions During Concurrent Drag-and-Drop Task Swaps",
        description: "Two users moving the same card simultaneously produced out-of-order column indexes.",
        solution: "Implemented fractional indexing algorithms for card sorting alongside optimistic locking in MongoDB transactions."
      }
    ],
    futurePlans: [
      "Add AI sprint effort estimation assistant.",
      "Build native desktop app wrapper using Electron / Tauri."
    ],
    liveUrl: "https://ais-dev-e2zx6fnx6syav3l4mx3kzq-473656623930.asia-southeast1.run.app",
    githubClient: "https://github.com/firozahmed/hyper-task-matrix",
    githubServer: "https://github.com/firozahmed/hyper-task-backend",
    featured: false,
    starsCount: 85,
    forksCount: 14,
    duration: "1.5 Months (2025)"
  }
];

export const skillsData: Skill[] = [
  // Frontend
  { id: "react", name: "React 19 / Next.js", category: "Frontend", proficiency: 95, levelLabel: "Expert", iconName: "Code2", description: "Hooks, Context, Server Components, Custom Hooks, Performance Profiling", yearsOfExperience: 4 },
  { id: "typescript", name: "TypeScript", category: "Frontend", proficiency: 92, levelLabel: "Expert", iconName: "FileCode", description: "Strict typing, Generics, Utility Types, AST Manipulation", yearsOfExperience: 3.5 },
  { id: "threejs", name: "Three.js / WebGL", category: "Frontend", proficiency: 88, levelLabel: "Advanced", iconName: "Box", description: "3D Particle Systems, Custom Shaders (GLSL), InstancedMesh, Lighting", yearsOfExperience: 2.5 },
  { id: "tailwind", name: "Tailwind CSS v4", category: "Frontend", proficiency: 96, levelLabel: "Expert", iconName: "Palette", description: "Responsive layouts, Custom Design Systems, Cyberpunk Themes, Animations", yearsOfExperience: 4 },
  { id: "motion", name: "Framer Motion", category: "Frontend", proficiency: 90, levelLabel: "Expert", iconName: "Sparkles", description: "Layout transitions, Gestures, Scroll Animations, Micro-interactions", yearsOfExperience: 3 },
  
  // Backend
  { id: "nodejs", name: "Node.js & Express", category: "Backend", proficiency: 94, levelLabel: "Expert", iconName: "Server", description: "REST APIs, Middleware, Event Loop optimization, Stream processing", yearsOfExperience: 4 },
  { id: "websockets", name: "Socket.io / WebSockets", category: "Backend", proficiency: 89, levelLabel: "Advanced", iconName: "Zap", description: "Real-time bi-directional channels, Room multiplexing, Backoff strategy", yearsOfExperience: 3 },
  { id: "graphql", name: "GraphQL & REST Architecture", category: "Backend", proficiency: 84, levelLabel: "Advanced", iconName: "Cpu", description: "Schema design, Resolvers, Query batching, API Security & Rate Limiting", yearsOfExperience: 2.5 },
  
  // Database & Cloud
  { id: "mongodb", name: "MongoDB & Mongoose", category: "Database & Cloud", proficiency: 91, levelLabel: "Expert", iconName: "Database", description: "Aggregation Pipelines, Indexing Strategies, Transactional Queries", yearsOfExperience: 4 },
  { id: "postgresql", name: "PostgreSQL & Redis", category: "Database & Cloud", proficiency: 86, levelLabel: "Advanced", iconName: "HardDrive", description: "Relational Schemas, ORM, Caching strategies, Pub/Sub channels", yearsOfExperience: 3 },
  { id: "docker", name: "Docker & Cloud Run / AWS", category: "Database & Cloud", proficiency: 82, levelLabel: "Proficient", iconName: "Cloud", description: "Containerization, Environment provisioning, Serverless deployment", yearsOfExperience: 2 },

  // Tools & Architecture
  { id: "git", name: "Git & GitHub Workflows", category: "Tools & Architecture", proficiency: 95, levelLabel: "Expert", iconName: "GitBranch", description: "Branching strategies, CI/CD Actions, Rebase, Code Review standards", yearsOfExperience: 4 },
  { id: "ai_integration", name: "Gemini AI SDK & Prompting", category: "Tools & Architecture", proficiency: 90, levelLabel: "Expert", iconName: "Bot", description: "Context window engineering, Structured JSON outputs, Function calling", yearsOfExperience: 2 },
  { id: "testing", name: "Vitest & Playwright", category: "Tools & Architecture", proficiency: 80, levelLabel: "Proficient", iconName: "CheckCircle2", description: "Unit testing, E2E user flow automation, Component isolation testing", yearsOfExperience: 2 }
];

export const timelineData: TimelineItem[] = [
  {
    id: "exp-1",
    type: "experience",
    period: "2024 — PRESENT",
    title: "Senior Full Stack Engineer",
    organization: "Aether Cyber Tech / Remote",
    location: "Global Remote",
    description: "Leading core full-stack web applications and 3D visualization dashboard architectures.",
    highlights: [
      "Engineered real-time SaaS observability platform serving over 50,000 active daily developer telemetry requests.",
      "Reduced WebGL asset bundle load times by 75% using custom shader compression pipelines.",
      "Mentored junior engineers and instituted strict TypeScript & Git PR review guidelines across 4 squad teams."
    ],
    tags: ["React", "Node.js", "Three.js", "Express", "MongoDB", "Docker", "Socket.io"]
  },
  {
    id: "exp-2",
    type: "experience",
    period: "2022 — 2024",
    title: "MERN Stack Developer",
    organization: "NexGen Software Solutions",
    location: "Dhaka, Bangladesh",
    description: "Developed scalable e-commerce, real-time messaging, and admin dashboard systems for enterprise clients.",
    highlights: [
      "Architected RESTful microservice APIs handling 5,000+ RPS with 99.98% uptime.",
      "Built custom drag-and-drop dashboard builder using React, Redux Toolkit, and Tailwind CSS.",
      "Integrated Stripe and SSLCommerz payment gateways with secure webhook event verification."
    ],
    tags: ["MERN Stack", "React", "Redux", "Express.js", "MongoDB", "Tailwind CSS"]
  },
  {
    id: "edu-1",
    type: "education",
    period: "2019 — 2023",
    title: "B.Sc. in Computer Science & Engineering",
    organization: "State University of Technology",
    location: "Dhaka, Bangladesh",
    description: "Graduated with Honors (CGPA 3.85 / 4.00). Specialized in Software Engineering & Computer Graphics.",
    highlights: [
      "Published Senior Thesis on Real-Time WebGL Shader Optimization in Mesh Networks.",
      "President of Computer Club: Organized 3 national hackathons with 500+ participants.",
      "Winner of 1st Place at National Inter-University Web Development Championship 2022."
    ],
    tags: ["Data Structures & Algorithms", "Computer Graphics", "Database Systems", "Software Architecture"]
  },
  {
    id: "edu-2",
    type: "education",
    period: "2017 — 2019",
    title: "Higher Secondary Certificate (HSC) — Science",
    organization: "Dhaka City College",
    location: "Dhaka, Bangladesh",
    description: "Post-HSC Science background with highest distinction (GPA 5.00 / 5.00) in Higher Math & Physics.",
    highlights: [
      "Achieved Top National Tier score in Higher Mathematics and Computer Science.",
      "Built first C++ game engine and ASCII terminal calculator."
    ],
    tags: ["Mathematics", "Physics", "Computer Science", "C++"]
  }
];
