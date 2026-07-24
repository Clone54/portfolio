# Developer Portfolio & Admin Portal

A high-performance, interactive, and fully responsive developer portfolio built with the modern MERN stack ecosystem (React 19, TypeScript, Firebase) and WebGL (Three.js). It features a cyberpunk-inspired hacker aesthetic, a real-time admin portal for content management, and immersive 3D particle backgrounds.

## 🚀 Key Features

- **Interactive 3D WebGL Background**: Custom particle systems and visual effects powered by Three.js.
- **Dynamic Content Management (Admin Panel)**: Secure, authenticated portal to manage bio, skills, projects, and timeline events in real-time using Firebase Firestore & Auth.
- **Theming**: Toggleable neon accent themes (Green, Cyan, Purple).
- **Custom Cursor & Animations**: Highly polished motion layout transitions using Framer Motion and a custom glowing crosshair cursor.
- **Terminal IDE Aesthetic**: Hacker-style UI with monospace typography, status bars, and glassmorphic panels.
- **Resume Generation**: Clean modal interface to view and print developer history and skills.
- **Responsive Layout**: Fluid design that works beautifully across mobile devices, tablets, and wide desktop screens.

## 🛠️ Tech Stack

### Frontend
- **React 19**: Modern functional components and hooks.
- **TypeScript**: Strict type safety and autocompletion.
- **Tailwind CSS v4**: Utility-first styling for pixel-perfect designs.
- **Framer Motion**: Fluid, layout-based animations.
- **Three.js**: WebGL 3D graphics and particle rendering.
- **Lucide React**: Clean, consistent icon set.

### Backend & Database
- **Firebase Firestore**: Real-time NoSQL database for portfolio content.
- **Firebase Authentication**: Secure admin login and session management.

## 📂 Project Structure

```text
src/
├── components/       # Reusable UI components (Navbar, Sections, Modals)
├── context/          # React Context (Portfolio state & Firebase bindings)
├── data/             # Default initialization data for the portfolio
├── pages/            # Application routes (Home, Admin, Project details)
├── types.ts          # Global TypeScript interfaces
├── firebase.ts       # Firebase client initialization
├── index.css         # Global Tailwind CSS entry
├── main.tsx          # Application entry point
└── App.tsx           # Main application shell and routing
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/Clone54/portfolio.git
cd your-portfolio-repo
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Firebase
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Firestore Database** and **Authentication** (Email/Password).
3. Create a `.env` file in the root directory and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
VITE_FIREBASE_APP_ID="your-app-id"
```

### 4. Run the development server
```bash
npm run dev
```

The application will be available at `firozahmed.vercel.app` (or the port specified in your Vite config).

## 🔒 Admin Panel Access

1. Navigate to `/admin` in your browser.
2. Sign in with the Firebase Authentication credentials you set up.
3. Manage your Developer Bio, Social Links, Projects, Skills, and Timeline experiences.
4. Changes are instantly synchronized across the live portfolio.

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
