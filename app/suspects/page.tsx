'use client';

import Link from 'next/link';
import { SUSPECTS } from '@/lib/data';
import { useGameState } from '@/lib/store';

export default function SuspectsPage() {
  const { visitedSuspects, hydrated } = useGameState();

  return (
    <div className="pt-4">
      <div className="glass-card">
        <div className="glass-header">
          <span className="glass-header-text">Suspects — 8 Records</span>
        </div>
        <div className="p-0">
          {SUSPECTS.map((suspect, i) => {
            const visited = hydrated && visitedSuspects.includes(suspect.id);
            return (
              <Link
                key={suspect.id}
                href={`/suspect/${suspect.id}`}
                className={`flex items-center gap-3 border-b border-glass-border px-4 py-3 transition-colors last:border-b-0 hover:bg-black/[0.02] ${
                  i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'
                }`}
              >
                <span className={`glass-check ${visited ? 'glass-check-checked' : ''}`} />
                <div className="min-w-0 flex-1">
                  <div className={`text-[13px] font-medium ${visited ? 'text-glass-yes' : 'text-black'}`}>
                    {suspect.name}
                  </div>
                  <div className="truncate text-[11px] text-glass-muted">
                    {suspect.title}
                  </div>
                </div>
                {visited && (
                  <span className="glass-label text-[10px] text-glass-yes">
                    Visited
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
