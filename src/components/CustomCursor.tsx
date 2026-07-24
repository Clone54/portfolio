import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { NeonTheme } from '../types';

interface CustomCursorProps {
  theme: NeonTheme;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ theme }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    // Check if device supports fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    if (mediaQuery.matches) {
      setIsTouchDevice(true);
      return;
    }

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!hasMoved) setHasMoved(true);
    };

    const handleHoverCheck = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('a, button, input, textarea, select, [data-cursor], .interactive');
      if (interactive) {
        setIsHovered(true);
        const cursorLabel = interactive.getAttribute('data-cursor-label');
        setHoverText(cursorLabel || null);
      } else {
        setIsHovered(false);
        setHoverText(null);
      }
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mouseover', handleHoverCheck);

    // Apply custom cursor class to body
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseover', handleHoverCheck);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [hasMoved]);

  if (isTouchDevice || !hasMoved) return null;

  const getThemeColors = () => {
    switch (theme) {
      case 'green':
        return {
          dot: 'bg-emerald-400',
          ring: 'border-emerald-400/60 bg-emerald-500/10 shadow-neon-green',
          text: 'text-emerald-300'
        };
      case 'purple':
        return {
          dot: 'bg-purple-400',
          ring: 'border-purple-400/60 bg-purple-500/10 shadow-neon-purple',
          text: 'text-purple-300'
        };
      case 'cyan':
      default:
        return {
          dot: 'bg-cyan-400',
          ring: 'border-cyan-400/60 bg-cyan-500/10 shadow-neon-cyan',
          text: 'text-cyan-300'
        };
    }
  };

  const colors = getThemeColors();

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* Sharp Center Pointer Dot */}
      <motion.div
        className={`fixed top-0 left-0 w-2 h-2 rounded-full ${colors.dot} pointer-events-none z-[99999]`}
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovered ? 1.5 : 1
        }}
        transition={{ type: 'spring', damping: 35, stiffness: 450, mass: 0.1 }}
      />

      {/* Outer Expanding Crosshair Ring */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full border ${colors.ring} pointer-events-none z-[99998] backdrop-blur-[1px] flex items-center justify-center`}
        animate={{
          x: position.x - (isHovered ? 28 : 16),
          y: position.y - (isHovered ? 28 : 16),
          width: isHovered ? 56 : 32,
          height: isHovered ? 56 : 32,
          rotate: isHovered ? 45 : 0
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 280, mass: 0.2 }}
      >
        {/* Crosshair Tech Markers */}
        <div className="absolute -top-1 w-1 h-1 bg-current opacity-60" />
        <div className="absolute -bottom-1 w-1 h-1 bg-current opacity-60" />
        <div className="absolute -left-1 w-1 h-1 bg-current opacity-60" />
        <div className="absolute -right-1 w-1 h-1 bg-current opacity-60" />

        {hoverText && (
          <span className={`text-[9px] font-mono font-bold tracking-widest uppercase ${colors.text} animate-pulse px-1`}>
            {hoverText}
          </span>
        )}
      </motion.div>
    </div>
  );
};
