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
    <div className={`glass-inset p-4 ${collected ? 'opacity-40' : ''}`}>
      <div className="mb-1 text-[12px] font-bold uppercase text-glass-hot" style={{ fontFamily: 'var(--font-mono)' }}>
        RE: {clue.aboutSuspectName}
      </div>
      <div className="glass-label mb-2 text-[10px]">
        [{dimensionLabel[clue.dimension]}]
      </div>
      <p className="mb-4 text-[12px] leading-[1.4]">
        {clue.evidence}
      </p>
      <div className="flex justify-end">
        {collected ? (
          <span className="glass-label text-glass-yes">
            ✓ Archived
          </span>
        ) : (
          <button
            onClick={() =>
              collectClue(clue.id, clue.aboutSuspectId, clue.dimension, clue.value)
            }
            className="glass-btn text-[11px]"
          >
            Add to Session
          </button>
        )}
      </div>
    </div>
  );
}
