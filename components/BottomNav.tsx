'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGameState } from '@/lib/store';

export default function BottomNav() {
  const pathname = usePathname();
  const { progress, hydrated } = useGameState();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background">
      <div className="mx-auto flex max-w-[375px] items-stretch">
        <Link
          href="/grid"
          className={`flex flex-1 flex-col items-center gap-0.5 py-3 text-xs font-medium transition-colors ${
            pathname === '/grid' ? 'text-accent' : 'text-secondary'
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="2" width="6" height="6" rx="1" />
            <rect x="12" y="2" width="6" height="6" rx="1" />
            <rect x="2" y="12" width="6" height="6" rx="1" />
            <rect x="12" y="12" width="6" height="6" rx="1" />
          </svg>
          <span>Grid</span>
          {hydrated && (
            <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-white">
              {progress.clues}/24
            </span>
          )}
        </Link>
        <Link
          href="/suspects"
          className={`flex flex-1 flex-col items-center gap-0.5 py-3 text-xs font-medium transition-colors ${
            pathname === '/suspects' ? 'text-accent' : 'text-secondary'
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="10" cy="7" r="4" />
            <path d="M3 18c0-3.5 3.1-6 7-6s7 2.5 7 6" />
          </svg>
          <span>Suspects</span>
          {hydrated && (
            <span className="rounded-full bg-accent/20 px-1.5 py-0.5 text-[10px] font-bold text-accent">
              {progress.suspects}/8
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
