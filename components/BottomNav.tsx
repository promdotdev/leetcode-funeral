'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGameState } from '@/lib/store';

const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <rect x="2" y="2" width="4" height="4" rx="0.5" />
    <rect x="8" y="2" width="4" height="4" rx="0.5" />
    <rect x="14" y="2" width="4" height="4" rx="0.5" />
    <rect x="2" y="8" width="4" height="4" rx="0.5" />
    <rect x="8" y="8" width="4" height="4" rx="0.5" />
    <rect x="14" y="8" width="4" height="4" rx="0.5" />
    <rect x="2" y="14" width="4" height="4" rx="0.5" />
    <rect x="8" y="14" width="4" height="4" rx="0.5" />
    <rect x="14" y="14" width="4" height="4" rx="0.5" />
  </svg>
);

const LiveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="10" cy="10" r="7" />
  </svg>
);

const SuspectsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="10" cy="7" r="3" />
    <path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" />
  </svg>
);

const icons: Record<string, () => React.ReactNode> = {
  '/grid': GridIcon,
  '/leaderboard': LiveIcon,
  '/suspects': SuspectsIcon,
};

export default function BottomNav() {
  const pathname = usePathname();
  const { progress, hydrated } = useGameState();

  if (pathname === '/penances' || pathname === '/penances-display') return null;

  const tabs = [
    { href: '/grid', label: 'Grid', badge: hydrated ? `${progress.clues}/24` : null },
    { href: '/leaderboard', label: 'Live', badge: null },
    { href: '/suspects', label: 'Suspects', badge: hydrated ? `${progress.suspects}/8` : null },
  ];

  return (
    <nav className="glass-nav fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-[400px] items-stretch justify-around px-4">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center gap-1 py-3 text-[11px] uppercase transition-colors ${
            pathname === '/' ? 'text-black' : 'text-black/40 hover:text-black/70'
          }`}
          style={{ fontFamily: 'var(--font-mono)', width: 72 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 10l7-7 7 7" />
            <path d="M5 8.5V16h4v-4h2v4h4V8.5" />
          </svg>
          <span>Home</span>
        </Link>
        {tabs.map((tab) => {
          const Icon = icons[tab.href];
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-1 py-3 text-[11px] uppercase transition-colors ${
                active ? 'text-black' : 'text-black/40 hover:text-black/70'
              }`}
              style={{ fontFamily: 'var(--font-mono)', width: 72 }}
            >
              <Icon />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
