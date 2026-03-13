'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSuspect, getCluesForDossier } from '@/lib/data';
import { useGameState } from '@/lib/store';
import ClueCard from '@/components/ClueCard';

export default function SuspectDossier({ id }: { id: string }) {
  const router = useRouter();
  const suspect = getSuspect(id);
  const clues = getCluesForDossier(id);
  const { markVisited } = useGameState();

  useEffect(() => {
    if (!suspect) {
      router.replace('/suspects');
      return;
    }
    markVisited(id);
  }, [id, suspect, markVisited, router]);

  if (!suspect) return null;

  return (
    <div className="pt-4">
      <div className="glass-card mb-4">
        <div className="glass-header">
          <span className="glass-header-text">Dossier — {suspect.id.toUpperCase()}</span>
        </div>
        <div className="glass-body">
          <h1 className="text-[16px]" style={{ fontFamily: 'var(--font-mono)' }}>{suspect.name}</h1>
          <div className="mt-1 text-[12px] text-glass-muted">
            {suspect.title}
          </div>
          <div className="mt-0.5 text-[11px] italic text-glass-muted">
            {suspect.role}
          </div>
          <p className="mt-3 text-[12px] leading-[1.4] text-black/70">
            {suspect.bio}
          </p>
        </div>
      </div>

      <div className="glass-label mb-3 text-white/60">
        Archived Evidence — {clues.length} clips
      </div>
      <div className="space-y-3">
        {clues.map((clue) => (
          <ClueCard key={clue.id} clue={clue} />
        ))}
      </div>
    </div>
  );
}
