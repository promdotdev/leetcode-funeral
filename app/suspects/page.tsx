'use client';

import Link from 'next/link';
import { SUSPECTS } from '@/lib/data';
import { useGameState } from '@/lib/store';

function SuspectStatus({ suspectId }: { suspectId: string }) {
  const { isSuspectUnlocked, visitedSuspects, hydrated } = useGameState();

  if (!hydrated) return null;

  const unlocked = isSuspectUnlocked(suspectId);
  const visited = visitedSuspects.includes(suspectId);

  if (visited) {
    return (
      <span className="inline-block rounded-full px-2 py-0.5 text-[10px] bg-teal-100 text-teal-700 border border-teal-300" style={{ fontFamily: 'var(--font-mono)' }}>
        Accessed
      </span>
    );
  }
  if (unlocked) {
    return (
      <span className="inline-block rounded-full px-2 py-0.5 text-[10px] bg-green-100 text-green-700 border border-green-300" style={{ fontFamily: 'var(--font-mono)' }}>
        Unlocked
      </span>
    );
  }
  return (
    <span className="inline-block rounded-full px-2 py-0.5 text-[10px] bg-amber-100 text-amber-700 border border-amber-300" style={{ fontFamily: 'var(--font-mono)' }}>
      Locked
    </span>
  );
}

export default function SuspectsPage() {
  return (
    <div className="pt-4">
      <div className="glass-card">
        <div className="glass-header">
          <span className="glass-header-text">Suspects — 8 Records</span>
        </div>
        <div className="p-0">
          {SUSPECTS.map((suspect, i) => (
            <Link
              key={suspect.id}
              href={`/suspect/${suspect.id}`}
              className={`flex items-center gap-3 border-b border-glass-border px-4 py-3 transition-colors last:border-b-0 hover:bg-black/[0.02] ${
                i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-medium text-black">
                  {suspect.name}
                </div>
                <div className="truncate text-[11px] text-glass-muted">
                  {suspect.title}
                </div>
              </div>
              <SuspectStatus suspectId={suspect.id} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
