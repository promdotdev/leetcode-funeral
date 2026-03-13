'use client';

import Link from 'next/link';
import { SUSPECTS } from '@/lib/data';
import { useGameState } from '@/lib/store';

export default function SuspectsPage() {
  const { visitedSuspects, hydrated } = useGameState();

  return (
    <div>
      <h1 className="mb-4 text-2xl text-accent">Suspects</h1>
      <div className="space-y-2">
        {SUSPECTS.map((suspect) => {
          const visited = hydrated && visitedSuspects.includes(suspect.id);
          return (
            <Link
              key={suspect.id}
              href={`/suspect/${suspect.id}`}
              className={`flex items-center gap-3 border-2 p-3 transition-all ${
                visited
                  ? 'border-accent/20 bg-accent/5'
                  : 'border-accent/10 bg-black hover:border-accent/40'
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center font-[family-name:var(--font-terminal)] text-xs ${
                  visited ? 'text-accent' : 'text-muted'
                }`}
              >
                {visited ? '[x]' : '[ ]'}
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-[family-name:var(--font-terminal)] text-sm uppercase tracking-wider text-primary">
                  {suspect.name}
                </div>
                <div className="truncate text-xs text-secondary">
                  {suspect.title}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
