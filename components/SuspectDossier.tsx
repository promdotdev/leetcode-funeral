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
    <div>
      <div className="db-window mb-3">
        <div className="db-titlebar">
          <span className="db-titlebar-text">Dossier - [{suspect.id.toUpperCase()}]</span>
          <div className="db-titlebar-buttons">
            <span className="db-titlebar-btn">–</span>
            <span className="db-titlebar-btn db-titlebar-btn-close">×</span>
          </div>
        </div>
        <div className="db-window-body">
          <h1 className="text-[14px] font-bold text-terminal-glow glow-text">{suspect.name}</h1>
          <div className="text-[11px] text-terminal-text">
            {suspect.title}
          </div>
          <div className="mt-0.5 text-[10px] italic text-terminal-text-dim">
            {suspect.role}
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-terminal-text/80">
            {suspect.bio}
          </p>
        </div>
      </div>

      <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-terminal-text-dim">
        Archived Evidence — {clues.length} clips
      </div>
      <div className="space-y-2">
        {clues.map((clue) => (
          <ClueCard key={clue.id} clue={clue} />
        ))}
      </div>
    </div>
  );
}
