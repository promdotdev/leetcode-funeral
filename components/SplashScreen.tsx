'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function SplashScreen() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<'visible' | 'fading' | 'gone'>('visible');

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase('fading'), 2400);
    const goneTimer = setTimeout(() => setPhase('gone'), 3200);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(goneTimer);
    };
  }, []);

  if (phase === 'gone') return null;
  if (pathname === '/penances' || pathname === '/penances-display') return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-end overflow-hidden"
      style={{
        backgroundColor: '#111111',
        backgroundImage: 'conic-gradient(#1a1a1a 0.25turn, transparent 0.25turn, transparent 0.5turn, #1a1a1a 0.5turn, #1a1a1a 0.75turn, transparent 0.75turn)',
        backgroundSize: '80px 80px',
        transition: 'opacity 0.8s ease-in-out',
        opacity: phase === 'fading' ? 0 : 1,
        pointerEvents: phase === 'fading' ? 'none' : 'auto',
      }}
    >
      {/* Detective image */}
      <img
        src="/detective.png"
        alt="Detective"
        className="absolute bottom-0 left-1/2 object-contain object-bottom"
        style={{ transform: 'translateX(-50%)', height: '90vh', width: 'auto', maxWidth: 'none' }}
      />

      {/* Loading indicator */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2">
        <div className="text-[11px] text-white/40" style={{ fontFamily: 'var(--font-body)' }}>
          Investigating…
        </div>
        <div className="h-[2px] w-24 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-white rounded-full"
            style={{
              animation: 'splash-progress 2.4s linear forwards',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes splash-progress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </div>
  );
}
