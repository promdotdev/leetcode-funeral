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
      <div className="flex min-h-[60vh] flex-col items-center justify-center pt-3">
        <div className="db-window w-full max-w-[340px]">
          <div className="db-titlebar">
            <span className="db-titlebar-text">Access Denied</span>
            <div className="db-titlebar-buttons">
              <span className="db-titlebar-btn db-titlebar-btn-close">×</span>
            </div>
          </div>
          <div className="db-window-body text-center">
            <p className="mb-2 text-[11px] text-terminal-text-dim">
              Insufficient evidence archived.
            </p>
            <p className="mb-4 text-[13px] font-bold text-terminal-warn">
              {progress.clues}/24 clips found
            </p>
            <Link href="/grid" className="db-button text-[10px]">
              &lt; Return to Grid
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (result === 'correct') {
    return (
      <div className="pt-3">
        <div className="db-window">
          <div className="db-titlebar">
            <span className="db-titlebar-text">Case Closed</span>
            <div className="db-titlebar-buttons">
              <span className="db-titlebar-btn db-titlebar-btn-close">×</span>
            </div>
          </div>
          <div className="db-window-body space-y-3 text-[11px] leading-relaxed text-terminal-text">
            <p className="text-[13px] font-bold text-terminal-glow glow-text">CORRECT.</p>
            {REVEAL_TEXT.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (result === 'wrong') {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center pt-3">
        <div className="db-window w-full max-w-[340px]">
          <div className="db-titlebar">
            <span className="db-titlebar-text">Query Failed</span>
            <div className="db-titlebar-buttons">
              <span className="db-titlebar-btn db-titlebar-btn-close">×</span>
            </div>
          </div>
          <div className="db-window-body text-center">
            <p className="mb-1 text-[13px] font-bold text-terminal-no glow-hot">
              Incorrect.
            </p>
            <p className="mb-4 text-[11px] text-terminal-text">
              Review the matrix. Only one suspect has YES in all three columns.
            </p>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => { setResult(null); setSelected(null); }}
                className="db-button db-button-primary text-[10px]"
              >
                Retry
              </button>
              <Link href="/grid" className="db-button text-[10px]">
                &lt; Grid
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-3">
      <div className="db-window">
        <div className="db-titlebar">
          <span className="db-titlebar-text">Final Accusation</span>
          <div className="db-titlebar-buttons">
            <span className="db-titlebar-btn">–</span>
            <span className="db-titlebar-btn db-titlebar-btn-close">×</span>
          </div>
        </div>
        <div className="db-window-body">
          <p className="mb-3 text-[11px] font-bold text-terminal-hot glow-hot">
            Who killed Lee T. Code?
          </p>

          <div className="space-y-0.5">
            {SUSPECTS.map((suspect) => (
              <button
                key={suspect.id}
                onClick={() => setSelected(suspect.id)}
                className={`flex w-full items-center gap-2 px-2 py-1.5 text-left text-[11px] transition-colors ${
                  selected === suspect.id
                    ? 'bg-terminal-glow/15 text-terminal-glow'
                    : 'text-terminal-text hover:bg-terminal-glow/5'
                }`}
              >
                <span className={`db-checkbox ${selected === suspect.id ? 'db-checkbox-checked' : ''}`} />
                {suspect.name}
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
            className="db-button db-button-primary mt-4 w-full text-[11px] disabled:opacity-30"
          >
            &gt; Submit Accusation_
          </button>
        </div>
      </div>
    </div>
  );
}
