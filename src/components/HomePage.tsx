import React from 'react';
import { motion } from 'motion/react';

export default function HomePage() {
  // Generate a set of decorative ambient glowing particles for background animation
  const particles = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 6) + 3,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 12 + 10,
    delay: Math.random() * 5,
    targetY: Math.random() * -30 - 10,
    opacity: Math.random() * 0.6 + 0.2,
  }));

  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full flex items-center justify-center overflow-hidden bg-[#0D180E] select-none">
      {/* ================= BACKGROUND ANIMATED MESH & ORBS ================= */}
      
      {/* Animated Gradient Background Canvas Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1A3121] via-[#0D180E] to-[#080F09] opacity-90" />

      {/* Floating Glowing Orb 1 - Gold Warmth */}
      <motion.div
        animate={{
          x: [0, 80, -60, 40, 0],
          y: [0, -70, 50, -30, 0],
          scale: [1, 1.25, 0.9, 1.15, 1],
          opacity: [0.3, 0.55, 0.35, 0.5, 0.3],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-[#C5A880]/20 blur-[120px] pointer-events-none"
      />

      {/* Floating Glowing Orb 2 - Deep Emerald */}
      <motion.div
        animate={{
          x: [0, -90, 70, -40, 0],
          y: [0, 60, -80, 50, 0],
          scale: [1, 1.3, 0.85, 1.2, 1],
          opacity: [0.35, 0.6, 0.4, 0.65, 0.35],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#1A3121] blur-[100px] pointer-events-none"
      />

      {/* Floating Glowing Orb 3 - Center Light Core */}
      <motion.div
        animate={{
          scale: [0.8, 1.2, 0.85, 1.1, 0.8],
          opacity: [0.2, 0.45, 0.25, 0.4, 0.2],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(197,168,128,0.25)_0%,_rgba(26,49,33,0.15)_60%,_transparent_100%)] blur-[90px] pointer-events-none"
      />

      {/* Floating Light Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              left: `${p.initialX}%`,
              top: `${p.initialY}%`,
              opacity: p.opacity,
            }}
            animate={{
              y: [0, p.targetY * 5, 0],
              x: [0, p.id % 2 === 0 ? 15 : -15, 0],
              opacity: [p.opacity, p.opacity * 1.5, p.opacity],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            className="absolute rounded-full bg-[#C5A880]/60 shadow-[0_0_10px_#C5A880]"
          />
        ))}
      </div>

      {/* Subtle grid accent with animation */}
      <motion.div 
        animate={{ opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none"
      />

      {/* ================= FOREGROUND: ONLY THE TITLE ================= */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center">
        {/* Main Brand Title with Entrance and Ambient Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <motion.h1 
            animate={{
              textShadow: [
                '0 0 20px rgba(197, 168, 128, 0.2)',
                '0 0 45px rgba(197, 168, 128, 0.45)',
                '0 0 20px rgba(197, 168, 128, 0.2)',
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-6xl sm:text-8xl md:text-9xl font-serif font-normal text-white tracking-widest uppercase select-none drop-shadow-2xl"
          >
            LUMÉA
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#C5A880]/60 to-transparent" />
            <p className="text-xs sm:text-sm md:text-base font-serif italic text-[#C5A880] tracking-[0.3em] uppercase font-light">
              Botanical Skin Sanctuary
            </p>
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#C5A880]/60 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
