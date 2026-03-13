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
      <div className="mb-6">
        <div className="mb-1 font-[family-name:var(--font-terminal)] text-xs uppercase tracking-[3px] text-hot-pink">
          Suspect Dossier
        </div>
        <h1 className="neon-text text-3xl">{suspect.name}</h1>
        <div className="mt-1 font-[family-name:var(--font-terminal)] text-sm uppercase tracking-wider text-secondary">
          {suspect.title}
        </div>
        <div className="mt-0.5 text-xs italic text-muted">
          {suspect.role}
        </div>
      </div>

      <p className="mb-6 text-sm leading-relaxed text-primary/60">
        {suspect.bio}
      </p>

      <h2 className="mb-3 text-lg text-accent">// Evidence</h2>
      <div className="space-y-3">
        {clues.map((clue) => (
          <ClueCard key={clue.id} clue={clue} />
        ))}
      </div>
    </div>
  );
}
