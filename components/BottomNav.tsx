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
    <nav className="glass-nav fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-[400px] items-stretch justify-center gap-[18px] px-8">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center justify-center gap-[10px] py-3 text-[12px] uppercase transition-colors ${
              pathname === tab.href
                ? 'text-glass-accent'
                : 'text-white/70 hover:text-white'
            }`}
            style={{ fontFamily: 'var(--font-mono)', width: 72 }}
          >
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="text-[10px] text-white/50">
                {tab.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}
