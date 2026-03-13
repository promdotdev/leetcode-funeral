'use client';

import Link from 'next/link';
import { SUSPECTS } from '@/lib/data';
import { useGameState } from '@/lib/store';

const DIMENSIONS = ['motive', 'means', 'opportunity'] as const;
const DIMENSION_LABELS = { motive: 'MOT', means: 'MNS', opportunity: 'OPP' };

export default function Grid() {
  const { gridState, progress, isComplete, hydrated } = useGameState();

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-4">
        <div className="mb-1 flex items-center justify-between font-[family-name:var(--font-terminal)] text-xs uppercase tracking-wider text-secondary">
          <span>{progress.clues}/24 clues</span>
          <span>{Math.round((progress.clues / 24) * 100)}%</span>
        </div>
        <div className="h-1.5 overflow-hidden border border-accent/30 bg-black">
          <div
            className="h-full bg-accent transition-all duration-500"
            style={{ width: hydrated ? `${(progress.clues / 24) * 100}%` : '0%' }}
          />
        </div>
      </div>

      {isComplete && (
        <Link
          href="/accuse"
          className="neon-border mb-4 block border-2 border-hot-pink bg-hot-pink/10 p-3 text-center font-[family-name:var(--font-terminal)] text-sm uppercase tracking-wider text-hot-pink transition-colors hover:bg-hot-pink/20"
        >
          &gt; Ready to make your accusation? &lt;
        </Link>
      )}

      {/* Grid table */}
      <div className="retro-window overflow-hidden">
        <div className="retro-window-header">
          <span className="retro-window-title">Deduction Matrix</span>
          <div className="retro-window-dots">
            <span className="retro-window-dot" style={{ background: '#FF6094' }} />
            <span className="retro-window-dot" style={{ background: '#EB8911' }} />
            <span className="retro-window-dot" style={{ background: '#E4F54D' }} />
          </div>
        </div>
        <table className="w-full border-collapse font-[family-name:var(--font-terminal)] text-xs">
          <thead>
            <tr>
              <th className="border-b border-accent/20 p-2 text-left text-sm uppercase tracking-wider text-accent">
                Suspect
              </th>
              {DIMENSIONS.map((d) => (
                <th
                  key={d}
                  className="border-b border-l border-accent/20 p-2 text-center text-sm uppercase tracking-wider text-accent"
                >
                  {DIMENSION_LABELS[d]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SUSPECTS.map((suspect) => (
              <tr key={suspect.id} className="border-b border-accent/10 last:border-b-0">
                <td className="p-2">
                  <Link
                    href={`/suspect/${suspect.id}`}
                    className="text-sm text-primary/80 transition-colors hover:text-accent"
                  >
                    {suspect.name}
                  </Link>
                </td>
                {DIMENSIONS.map((dim) => {
                  const key = `${suspect.id}-${dim}`;
                  const val = gridState[key];
                  let cellClass = 'bg-empty';
                  let cellText = '';
                  if (hydrated && val !== undefined) {
                    cellClass = val
                      ? 'bg-yes/15 text-yes'
                      : 'bg-no/15 text-no';
                    cellText = val ? 'YES' : 'NO';
                  }
                  return (
                    <td
                      key={key}
                      className={`border-l border-accent/10 p-2 text-center text-sm font-bold ${cellClass}`}
                    >
                      {cellText}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
