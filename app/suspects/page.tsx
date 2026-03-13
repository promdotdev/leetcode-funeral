'use client';

import Link from 'next/link';
import { SUSPECTS } from '@/lib/data';
import { useGameState } from '@/lib/store';

export default function SuspectsPage() {
  const { visitedSuspects, hydrated } = useGameState();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Suspects</h1>
      <div className="space-y-2">
        {SUSPECTS.map((suspect) => {
          const visited = hydrated && visitedSuspects.includes(suspect.id);
          return (
            <Link
              key={suspect.id}
              href={`/suspect/${suspect.id}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-accent/30"
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                  visited
                    ? 'bg-accent/10 text-accent'
                    : 'bg-border/60 text-secondary'
                }`}
              >
                {visited ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="2,6 5,9 10,3" />
                  </svg>
                ) : (
                  <span className="block h-1.5 w-1.5 rounded-full bg-current" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-primary">
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
