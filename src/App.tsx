import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { ThreeBackground } from './components/ThreeBackground';
import { CustomCursor } from './components/CustomCursor';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { HomePage } from './pages/HomePage';
import { ProjectDetail } from './pages/ProjectDetail';
import { AdminPage } from './pages/AdminPage';
import { NeonTheme } from './types';
import { Terminal } from 'lucide-react';

function AppLayout() {
  const [theme, setTheme] = useState<NeonTheme>('green');
  const [resumeOpen, setResumeOpen] = useState(false);
  const location = useLocation();
  const { isLoading } = usePortfolio();

  const isAdminRoute = location.pathname === '/admin';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#00FF41] flex flex-col items-center justify-center font-mono space-y-4">
        <Terminal className="w-12 h-12 animate-pulse" />
        <div className="text-xl animate-pulse tracking-widest">INITIALIZING_SYSTEM...</div>
        <div className="text-xs text-[#00FF41]/50">ESTABLISHING SECURE CONNECTION TO FIREBASE</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#050505] text-slate-100 overflow-x-hidden selection:bg-[#00FF41]/30 selection:text-[#00FF41]">
      {/* Custom WebGL 3D Interactive Particle Background */}
      <ThreeBackground theme={theme} />

      {/* Custom Glowing Crosshair Cursor */}
      <CustomCursor theme={theme} />

      {/* Sticky Translucent Navbar (Hidden on Admin Panel for clean interface) */}
      {!isAdminRoute && (
        <Navbar
          theme={theme}
          setTheme={setTheme}
          onOpenResume={() => setResumeOpen(true)}
        />
      )}

      {/* Dynamic Route Pages */}
      <Routes>
        <Route
          path="/"
          element={<HomePage theme={theme} onOpenResume={() => setResumeOpen(true)} />}
        />
        <Route
          path="/project/:id"
          element={<ProjectDetail theme={theme} />}
        />
        {/* Hidden Admin Authentication & Control Panel Path */}
        <Route
          path="/admin"
          element={<AdminPage theme={theme} />}
        />
        {/* Fallback to Home */}
        <Route
          path="*"
          element={<HomePage theme={theme} onOpenResume={() => setResumeOpen(true)} />}
        />
      </Routes>

      {/* Footer (Hidden on Admin Panel) */}
      {!isAdminRoute && <Footer theme={theme} />}

      {/* IDE Bottom Status Bar */}
      <div className="sticky bottom-0 z-40 bg-[#00FF41] text-black h-6 flex items-center justify-between px-3 text-[10px] font-mono font-bold select-none border-t border-[#1a1a1a]">
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" /> BRANCH: main*
          </span>
          <span className="hidden sm:inline">ENV: production</span>
          <span className="hidden md:inline text-black/70">
            {isAdminRoute ? 'MODE: ADMIN_CONTROL' : 'IDE_MODE: active'}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline">UTF-8</span>
          <span>Ln 124, Col 32</span>
          <span className="bg-black text-[#00FF41] px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider">
            {isAdminRoute ? '-- SECURE PORTAL --' : '-- TERMINAL READY --'}
          </span>
        </div>
      </div>

      {/* Download Resume Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </PortfolioProvider>
  );
}
