'use client';

import { useGameState } from '@/lib/store';

export default function EvidenceBar() {
  const { progress, hydrated } = useGameState();

  return (
    <div className="mb-4">
      <div className="mb-1.5 flex items-center justify-between text-[11px] uppercase text-black/50" style={{ fontFamily: 'var(--font-mono)' }}>
        <span>Evidence: {progress.clues}/24</span>
        <span>{Math.round((progress.clues / 24) * 100)}%</span>
      </div>
      <div className="glass-progress">
        <div
          className="glass-progress-fill"
          style={{ width: hydrated ? `${(progress.clues / 24) * 100}%` : '0%' }}
        />
      </div>
    </div>
  );
}
