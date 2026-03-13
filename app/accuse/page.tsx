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
        <h1 className="mb-4 text-2xl font-bold">Not yet...</h1>
        <p className="mb-6 text-sm text-secondary">
          You haven&apos;t collected all the evidence yet.
          <br />
          <span className="font-semibold text-accent">
            {progress.clues}/24
          </span>{' '}
          clues found.
        </p>
        <Link
          href="/grid"
          className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white"
        >
          Back to grid
        </Link>
      </div>
    );
  }

  if (result === 'correct') {
    return (
      <div>
        <h1 className="mb-2 text-2xl font-bold text-accent">You got it.</h1>
        <div className="space-y-4 text-sm leading-relaxed text-secondary">
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
        <h1 className="mb-4 text-2xl font-bold">Not quite.</h1>
        <p className="mb-6 text-sm text-secondary">
          Look at your grid again. Only one suspect has YES in all three columns.
        </p>
        <button
          onClick={() => {
            setResult(null);
            setSelected(null);
          }}
          className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white"
        >
          Try again
        </button>
        <Link
          href="/grid"
          className="mt-3 text-sm text-secondary underline"
        >
          Back to grid
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Who killed Lee T. Code?</h1>
      <p className="mb-6 text-sm text-secondary">
        Select the suspect you want to accuse.
      </p>

      <div className="space-y-2">
        {SUSPECTS.map((suspect) => (
          <button
            key={suspect.id}
            onClick={() => setSelected(suspect.id)}
            className={`w-full rounded-lg border p-3 text-left text-sm font-medium transition-all ${
              selected === suspect.id
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-border bg-card text-primary hover:border-accent/30'
            }`}
          >
            {suspect.name}
            <span className="ml-2 text-xs font-normal text-secondary">
              {suspect.title}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          if (!selected) return;
          setResult(selected === CORRECT_ANSWER ? 'correct' : 'wrong');
        }}
        disabled={!selected}
        className="mt-6 w-full rounded-full bg-accent py-3 text-sm font-semibold text-white transition-all disabled:opacity-40"
      >
        Submit accusation
      </button>
    </div>
  );
}
