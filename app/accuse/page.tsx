'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SUSPECTS, CORRECT_ANSWER, REVEAL_TEXT } from '@/lib/data';
import { useGameState } from '@/lib/store';

export default function AccusePage() {
  const { progress, isComplete, hydrated } = useGameState();
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);

  if (!hydrated) return null;

  if (!isComplete) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="mb-4 text-2xl text-hot-pink">Access Denied</h1>
        <p className="mb-2 font-[family-name:var(--font-terminal)] text-sm uppercase tracking-wider text-secondary">
          Insufficient evidence collected
        </p>
        <p className="mb-6 font-[family-name:var(--font-terminal)] text-lg text-accent">
          {progress.clues}/24 clues found
        </p>
        <Link href="/grid" className="retro-button text-sm">
          &gt; Back to grid
        </Link>
      </div>
    );
  }

  if (result === 'correct') {
    return (
      <div>
        <h1 className="neon-text mb-4 text-3xl">You got it.</h1>
        <div className="space-y-4 text-sm leading-relaxed text-primary/70">
          {REVEAL_TEXT.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    );
  }

  if (result === 'wrong') {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="neon-text-pink mb-4 text-3xl font-[family-name:var(--font-terminal)] uppercase">
          Not quite.
        </h1>
        <p className="mb-6 text-sm text-secondary">
          Look at your grid again. Only one suspect has YES in all three columns.
        </p>
        <button
          onClick={() => {
            setResult(null);
            setSelected(null);
          }}
          className="retro-button text-sm"
        >
          &gt; Try again
        </button>
        <Link
          href="/grid"
          className="mt-3 font-[family-name:var(--font-terminal)] text-sm uppercase tracking-wider text-secondary underline"
        >
          Back to grid
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="neon-text-pink mb-2 text-2xl">
        Who killed Lee T. Code?
      </h1>
      <p className="mb-6 font-[family-name:var(--font-terminal)] text-sm uppercase tracking-wider text-secondary">
        Select your accusation
      </p>

      <div className="space-y-2">
        {SUSPECTS.map((suspect) => (
          <button
            key={suspect.id}
            onClick={() => setSelected(suspect.id)}
            className={`w-full border-2 p-3 text-left font-[family-name:var(--font-terminal)] text-sm uppercase tracking-wider transition-all ${
              selected === suspect.id
                ? 'neon-border border-accent bg-accent/10 text-accent'
                : 'border-accent/10 bg-black text-primary/60 hover:border-accent/30'
            }`}
          >
            {selected === suspect.id ? '> ' : '  '}
            {suspect.name}
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          if (!selected) return;
          setResult(selected === CORRECT_ANSWER ? 'correct' : 'wrong');
        }}
        disabled={!selected}
        className="retro-button mt-6 w-full disabled:opacity-30"
      >
        &gt; Submit accusation
      </button>
    </div>
  );
}
