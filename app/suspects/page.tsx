'use client';

import Link from 'next/link';
import { SUSPECTS } from '@/lib/data';
import { useGameState } from '@/lib/store';

export default function SuspectsPage() {
  const { visitedSuspects, hydrated } = useGameState();

  return (
    <div className="pt-3">
      <div className="db-window">
        <div className="db-titlebar">
          <span className="db-titlebar-text">Suspects - [8 Records]</span>
          <div className="db-titlebar-buttons">
            <span className="db-titlebar-btn">–</span>
            <span className="db-titlebar-btn db-titlebar-btn-close">×</span>
          </div>
        </div>
        <div className="p-0">
          {SUSPECTS.map((suspect, i) => {
            const visited = hydrated && visitedSuspects.includes(suspect.id);
            return (
              <Link
                key={suspect.id}
                href={`/suspect/${suspect.id}`}
                className={`flex items-center gap-2 border-b border-terminal-border/40 px-3 py-2 transition-colors last:border-b-0 hover:bg-terminal-glow/5 ${
                  i % 2 === 0 ? 'bg-terminal-panel' : 'bg-terminal-dark'
                }`}
              >
                <span className={`db-checkbox ${visited ? 'db-checkbox-checked' : ''}`} />
                <div className="min-w-0 flex-1">
                  <div className={`text-[11px] font-bold ${visited ? 'text-terminal-glow' : 'text-terminal-text'}`}>
                    {suspect.name}
                  </div>
                  <div className="truncate text-[10px] text-terminal-text-dim">
                    {suspect.title}
                  </div>
                </div>
                {visited && (
                  <span className="text-[9px] uppercase tracking-wider text-terminal-glow/50">
                    Accessed
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
