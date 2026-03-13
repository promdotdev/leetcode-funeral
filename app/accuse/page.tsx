'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SUSPECTS, CORRECT_ANSWER, REVEAL_TEXT } from '@/lib/data';
import { useGameState } from '@/lib/store';

export default function AccusePage() {
  const { progress, isComplete, hydrated, markSolved } = useGameState();
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);

  if (!hydrated) return null;

  if (!isComplete) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center pt-4">
        <div className="glass-card w-full max-w-[340px]">
          <div className="glass-body text-center">
            <p className="mb-2 text-[12px] text-black/60">
              Insufficient evidence archived.
            </p>
            <p className="mb-4 text-[16px] font-bold text-black" style={{ fontFamily: 'var(--font-mono)' }}>
              {progress.clues}/24 clips found
            </p>
            <Link href="/grid" className="glass-btn text-[11px]">
              Return to Grid
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (result === 'correct') {
    return (
      <div className="pt-4">
        <div className="glass-card">
          <div className="glass-body space-y-3 text-[12px] leading-[1.4]">
            <p className="text-[16px] font-bold text-black" style={{ fontFamily: 'var(--font-mono)' }}>CORRECT.</p>
            {REVEAL_TEXT.split('\n\n').map((para, i) => (
              <p key={i} className="text-black/80">{para}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (result === 'wrong') {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center pt-4">
        <div className="glass-card w-full max-w-[340px]">
          <div className="glass-body text-center">
            <p className="mb-1 text-[16px] font-bold text-glass-no" style={{ fontFamily: 'var(--font-mono)' }}>
              Incorrect.
            </p>
            <p className="mb-4 text-[12px] text-black/60">
              Review the matrix. Only one suspect has YES in all three columns.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => { setResult(null); setSelected(null); }}
                className="glass-btn text-[11px]"
              >
                Retry
              </button>
              <Link href="/grid" className="glass-btn text-[11px]">
                Grid
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-4">
      <div className="glass-card">
        <div className="glass-body">
          <p className="mb-4 text-[14px] font-bold text-black" style={{ fontFamily: 'var(--font-mono)' }}>
            Who killed Lee T. Code?
          </p>

          <div className="space-y-1">
            {SUSPECTS.map((suspect) => (
              <button
                key={suspect.id}
                onClick={() => setSelected(suspect.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] transition-colors ${
                  selected === suspect.id
                    ? 'bg-black/10 text-black'
                    : 'text-black/80 hover:bg-black/5'
                }`}
              >
                <span className={`glass-check ${selected === suspect.id ? 'glass-check-checked' : ''}`} />
                <span className="font-medium">{suspect.name}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (!selected) return;
              const isCorrect = selected === CORRECT_ANSWER;
              if (isCorrect) markSolved();
              setResult(isCorrect ? 'correct' : 'wrong');
            }}
            disabled={!selected}
            className="glass-btn-primary mt-5 w-full disabled:opacity-30"
          >
            <span>Submit Accusation</span>
            <span>▶</span>
          </button>
        </div>
      </div>
    </div>
  );
}
