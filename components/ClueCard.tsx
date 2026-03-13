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
    <div className={`db-inset p-3 ${collected ? 'opacity-50' : ''}`}>
      <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-terminal-hot glow-hot">
        RE: {clue.aboutSuspectName}
      </div>
      <div className="mb-2 text-[9px] font-bold uppercase tracking-widest text-terminal-text-dim">
        [{dimensionLabel[clue.dimension]}]
      </div>
      <p className="mb-3 text-[11px] leading-relaxed text-terminal-text">
        {clue.evidence}
      </p>
      <div className="flex justify-end">
        {collected ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-terminal-glow glow-text">
            [Archived]
          </span>
        ) : (
          <button
            onClick={() =>
              collectClue(clue.id, clue.aboutSuspectId, clue.dimension, clue.value)
            }
            className="db-button db-button-primary text-[10px]"
          >
            Add to Session
          </button>
        )}
      </div>
    </div>
  );
}
