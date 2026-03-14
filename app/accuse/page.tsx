'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SUSPECTS, CORRECT_ANSWER, REVEAL_TEXT } from '@/lib/data';
import { useGameState } from '@/lib/store';

export default function AccusePage() {
  const { progress, accusation, hydrated, submitAccusation } = useGameState();
  const [selected, setSelected] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  if (!hydrated) return null;

  // Already accused — show result
  if (accusation) {
    const correct = accusation === CORRECT_ANSWER;
    if (correct) {
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
    const accusedName = SUSPECTS.find((s) => s.id === accusation)?.name ?? accusation;
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center pt-4">
        <div className="glass-card w-full">
          <div className="glass-body text-center">
            <p className="mb-1 text-[16px] font-bold text-glass-no" style={{ fontFamily: 'var(--font-mono)' }}>
              Incorrect.
            </p>
            <p className="mb-1 text-[12px] text-black/60">
              You accused {accusedName}.
            </p>
            <p className="text-[11px] text-black/40">
              Your one accusation has been used. The killer walks free.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Confirmation screen
  if (confirming && selected) {
    const suspectName = SUSPECTS.find((s) => s.id === selected)?.name;
    return (
      <div className="pt-4">
        <div className="glass-card mb-4">
          <div className="glass-body text-center">
            <p className="text-[11px] uppercase text-black/40 mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
              Final Warning
            </p>
            <p className="text-[15px] font-bold text-black mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
              You only get one chance.
            </p>
            <p className="text-[12px] text-black/60 mb-1">
              You are accusing:
            </p>
            <p className="text-[14px] font-bold text-black mb-4">
              {suspectName}
            </p>
            <p className="text-[11px] text-black/50 mb-5">
              This cannot be undone. Are you certain?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirming(false)}
                className="glass-btn flex-1 text-[11px]"
              >
                Go Back
              </button>
              <button
                onClick={() => submitAccusation(selected)}
                className="glass-btn-primary flex-1 text-[11px]"
              >
                <span>I&apos;m sure</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Selection screen
  return (
    <div className="pt-4">
      {progress.clues < 24 && (
        <div className="glass-card mb-4">
          <div className="glass-body py-3 text-center text-[11px] text-black/50" style={{ fontFamily: 'var(--font-mono)' }}>
            {progress.clues}/24 clues found — you may still accuse
          </div>
        </div>
      )}

      <div className="glass-card mb-4">
        <div className="glass-body pb-2">
          <div className="mb-1 text-[11px] uppercase text-glass-no font-bold text-center" style={{ fontFamily: 'var(--font-mono)' }}>
            ⚠ One accusation only
          </div>
          <p className="text-[11px] text-black/50 text-center">
            Choose carefully. Once submitted, your answer is final.
          </p>
        </div>
      </div>

      <div className="glass-card mb-4">
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
            onClick={() => { if (selected) setConfirming(true); }}
            disabled={!selected}
            className="glass-btn-primary mt-5 w-full disabled:opacity-30"
          >
            <span>Submit Accusation</span>
            <span>→</span>
          </button>
        </div>
      </div>

      <Link href="/grid" className="glass-btn w-full text-center block text-[11px]">
        ← Return to Tracker
      </Link>
    </div>
  );
}
