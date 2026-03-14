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
  const { markVisited, isSuspectUnlocked, collectClue, hydrated } = useGameState();

  const unlocked = hydrated && isSuspectUnlocked(id);

  useEffect(() => {
    if (!suspect) {
      router.replace('/suspects');
      return;
    }
    if (unlocked) {
      markVisited(id);
      for (const clue of clues) {
        collectClue(clue.id, clue.aboutSuspectId, clue.dimension, clue.value);
      }
    }
  }, [id, suspect, unlocked, markVisited, collectClue, clues, router]);

  if (!suspect) return null;

  return (
    <div className="pt-4">
      {/* Dossier header card */}
      <div className="glass-card mb-4">
        <div className="glass-body">
          <div className="text-[10px] uppercase tracking-wider text-black/50 mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
            Dossier — {suspect.id.toUpperCase()}
          </div>
          <h1 className="text-[16px]" style={{ fontFamily: 'var(--font-mono)' }}>{suspect.name}</h1>
          <div className="mt-1 text-[12px] text-black/60">
            {suspect.title}
          </div>
          <div className="mt-0.5 text-[11px] italic text-black/50">
            {suspect.role}
          </div>

          {unlocked ? (
            <p className="mt-3 text-[12px] leading-[1.4] text-black/80">
              {suspect.bio}
            </p>
          ) : (
            <div className="mt-3 rounded-lg bg-black/5 p-3">
              <p className="text-[12px] text-black/50 text-center" style={{ fontFamily: 'var(--font-mono)' }}>
                [ CLASSIFIED ]
              </p>
              <p className="mt-2 text-[11px] text-black/40 text-center">
                Scan the NFC tag to access this dossier
              </p>
            </div>
          )}
        </div>
      </div>

      {unlocked ? (
        <>
          <div className="mb-3 text-[11px] uppercase tracking-wider text-black/40" style={{ fontFamily: 'var(--font-mono)' }}>
            Archived Evidence — {clues.length} clips
          </div>
          <div className="space-y-3">
            {clues.map((clue) => (
              <ClueCard key={clue.id} clue={clue} />
            ))}
          </div>
        </>
      ) : (
        <div className="glass-card">
          <div className="glass-body text-center">
            <div className="text-[24px] mb-2">🔒</div>
            <p className="text-[12px] text-black/50" style={{ fontFamily: 'var(--font-mono)' }}>
              {clues.length} evidence clips locked
            </p>
            <p className="mt-1 text-[11px] text-black/40">
              Find this suspect&apos;s NFC sticker to unlock
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
