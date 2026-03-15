'use client';

import Link from 'next/link';
import { SUSPECTS } from '@/lib/data';
import { useGameState } from '@/lib/store';
import CardDecorations from '@/components/CardDecorations';

const DIMENSIONS = ['motive', 'means', 'opportunity'] as const;

function DimensionPill({ label, value }: { label: string; value: boolean | undefined }) {
  if (value === true) {
    return (
      <span className="rounded-full px-2.5 py-1 text-[10px] uppercase bg-glass-yes/20 text-glass-yes font-medium" style={{ fontFamily: 'var(--font-mono)' }}>
        {label}
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="rounded-full px-2.5 py-1 text-[10px] uppercase bg-glass-no/20 text-glass-no font-medium" style={{ fontFamily: 'var(--font-mono)' }}>
        {label}
      </span>
    );
  }
  return (
    <span className="rounded-full px-2.5 py-1 text-[10px] uppercase bg-white/8 text-white/30" style={{ fontFamily: 'var(--font-mono)' }}>
      {label}
    </span>
  );
}

function LockBadge({ suspectId }: { suspectId: string }) {
  const { isSuspectUnlocked, visitedSuspects, hydrated } = useGameState();
  if (!hydrated) return null;

  const unlocked = isSuspectUnlocked(suspectId);
  const visited = visitedSuspects.includes(suspectId);

  if (visited) {
    return (
      <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] bg-teal-900/50 text-teal-300 border border-teal-700" style={{ fontFamily: 'var(--font-mono)' }}>
        Accessed
      </span>
    );
  }
  if (unlocked) {
    return (
      <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] bg-green-900/50 text-green-300 border border-green-700" style={{ fontFamily: 'var(--font-mono)' }}>
        Unlocked
      </span>
    );
  }
  return (
    <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] bg-amber-900/50 text-amber-300 border border-amber-700" style={{ fontFamily: 'var(--font-mono)' }}>
      Locked
    </span>
  );
}

export default function Grid() {
  const { gridState, accusation, hydrated } = useGameState();

  return (
    <div>
      <CardDecorations>
        <div className="glass-card mb-4">
          {SUSPECTS.map((suspect, i) => (
            <Link
              key={suspect.id}
              href={`/suspect/${suspect.id}`}
              className={`block px-4 py-3 ${i < SUSPECTS.length - 1 ? 'border-b border-white/8' : ''}`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-[13px] font-medium text-white">{suspect.name}</div>
                    <LockBadge suspectId={suspect.id} />
                  </div>
                  <div className="text-[11px] text-white/50 truncate">{suspect.title}</div>
                </div>
                <span className="text-white/40 text-xl shrink-0">›</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {DIMENSIONS.map((dim) => {
                  const val = hydrated ? gridState[`${suspect.id}-${dim}`] : undefined;
                  return <DimensionPill key={dim} label={dim} value={val} />;
                })}
              </div>
            </Link>
          ))}
        </div>

        {accusation ? (
          <div className="glass-card">
            <div className="glass-body text-center text-[12px] text-white/50" style={{ fontFamily: 'var(--font-mono)' }}>
              Accusation submitted
            </div>
          </div>
        ) : (
          <Link href="/accuse" className="glass-btn-primary w-full">
            <span>Accuse Someone</span>
            <span>→</span>
          </Link>
        )}
      </CardDecorations>
    </div>
  );
}
