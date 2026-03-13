'use client';

import { useGameState } from '@/lib/store';
import type { Clue } from '@/lib/data';

const dimensionLabel: Record<string, string> = {
  motive: 'Motive',
  means: 'Means',
  opportunity: 'Opportunity',
};

export default function ClueCard({ clue }: { clue: Clue }) {
  const { collectClue, isClueCollected, hydrated } = useGameState();
  const collected = hydrated && isClueCollected(clue.id);

  return (
    <div
      className={`rounded-lg border p-4 transition-all ${
        collected
          ? 'border-accent/30 bg-accent/5 opacity-75'
          : 'border-border bg-card'
      }`}
    >
      <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-secondary">
        RE: {clue.aboutSuspectName}
      </div>
      <div className="mb-3 text-xs font-medium text-accent">
        {dimensionLabel[clue.dimension]}
      </div>
      <p className="mb-4 text-sm leading-relaxed text-primary">
        {clue.evidence}
      </p>
      <div className="flex justify-end">
        {collected ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="2.5,7.5 5.5,10.5 11.5,4" />
            </svg>
            Collected
          </span>
        ) : (
          <button
            onClick={() =>
              collectClue(clue.id, clue.aboutSuspectId, clue.dimension, clue.value)
            }
            className="rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-white transition-transform active:scale-95"
          >
            Collect
          </button>
        )}
      </div>
    </div>
  );
}
