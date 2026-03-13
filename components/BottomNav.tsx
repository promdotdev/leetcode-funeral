'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGameState } from '@/lib/store';

export default function BottomNav() {
  const pathname = usePathname();
  const { progress, hydrated } = useGameState();

  const tabs = [
    { href: '/grid', label: 'Grid', badge: hydrated ? `${progress.clues}/24` : null },
    { href: '/leaderboard', label: 'Live', badge: null },
    { href: '/suspects', label: 'Suspects', badge: hydrated ? `${progress.suspects}/8` : null },
  ];

  return (
    <nav className="db-taskbar fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-[375px] items-stretch">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-1 items-center justify-center gap-1.5 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${
              pathname === tab.href
                ? 'bg-terminal-glow/10 text-terminal-glow glow-text'
                : 'text-terminal-text-dim hover:bg-terminal-glow/5 hover:text-terminal-text'
            }`}
          >
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="rounded-sm bg-terminal-glow/15 px-1 py-0.5 text-[9px]">
                {tab.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}
