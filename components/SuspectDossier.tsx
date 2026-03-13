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
        <div className="mb-1 text-xs font-medium uppercase tracking-wider text-accent">
          Suspect Dossier
        </div>
        <h1 className="text-2xl font-bold">{suspect.name}</h1>
        <div className="mt-1 text-sm text-secondary">{suspect.title}</div>
        <div className="mt-0.5 text-xs italic text-secondary">{suspect.role}</div>
      </div>

      <p className="mb-6 text-sm leading-relaxed text-secondary">
        {suspect.bio}
      </p>

      <h2 className="mb-3 text-lg font-semibold">Evidence</h2>
      <div className="space-y-3">
        {clues.map((clue) => (
          <ClueCard key={clue.id} clue={clue} />
        ))}
      </div>
    </div>
  );
}
