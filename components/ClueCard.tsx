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
      className={`border-2 p-4 transition-all ${
        collected
          ? 'border-accent/30 bg-accent/5 opacity-60'
          : 'retro-window'
      }`}
    >
      <div className="mb-1 font-[family-name:var(--font-terminal)] text-sm uppercase tracking-wider text-hot-pink">
        RE: {clue.aboutSuspectName}
      </div>
      <div className="mb-3 font-[family-name:var(--font-terminal)] text-xs uppercase tracking-widest text-accent">
        [{dimensionLabel[clue.dimension]}]
      </div>
      <p className="mb-4 text-sm leading-relaxed text-primary/70">
        {clue.evidence}
      </p>
      <div className="flex justify-end">
        {collected ? (
          <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-terminal)] text-sm uppercase tracking-wider text-accent/60">
            [COLLECTED]
          </span>
        ) : (
          <button
            onClick={() =>
              collectClue(clue.id, clue.aboutSuspectId, clue.dimension, clue.value)
            }
            className="retro-button text-sm"
          >
            Collect
          </button>
        )}
      </div>
    </div>
  );
}
