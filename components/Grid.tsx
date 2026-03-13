'use client';

import Link from 'next/link';
import { SUSPECTS } from '@/lib/data';
import { useGameState } from '@/lib/store';

const DIMENSIONS = ['motive', 'means', 'opportunity'] as const;
const DIMENSION_LABELS = { motive: 'Motive', means: 'Means', opportunity: 'Opp.' };

export default function Grid() {
  const { gridState, progress, isComplete, hydrated } = useGameState();

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-4">
        <div className="mb-1 flex items-center justify-between text-xs text-secondary">
          <span>{progress.clues}/24 clues collected</span>
          <span>{Math.round((progress.clues / 24) * 100)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: hydrated ? `${(progress.clues / 24) * 100}%` : '0%' }}
          />
        </div>
      </div>

      {isComplete && (
        <Link
          href="/accuse"
          className="mb-4 block rounded-lg border border-accent bg-accent/10 p-3 text-center text-sm font-semibold text-accent transition-colors hover:bg-accent/20"
        >
          Ready to make your accusation?
        </Link>
      )}

      {/* Grid table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="bg-card">
              <th className="border-b border-border p-2 text-left font-semibold text-secondary">
                Suspect
              </th>
              {DIMENSIONS.map((d) => (
                <th
                  key={d}
                  className="border-b border-l border-border p-2 text-center font-semibold text-secondary"
                >
                  {DIMENSION_LABELS[d]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SUSPECTS.map((suspect) => (
              <tr key={suspect.id} className="border-b border-border last:border-b-0">
                <td className="p-2">
                  <Link
                    href={`/suspect/${suspect.id}`}
                    className="font-medium text-primary hover:text-accent"
                  >
                    {suspect.name}
                  </Link>
                </td>
                {DIMENSIONS.map((dim) => {
                  const key = `${suspect.id}-${dim}`;
                  const val = gridState[key];
                  let cellClass = 'bg-border/40';
                  let cellText = '';
                  if (hydrated && val !== undefined) {
                    cellClass = val ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-600';
                    cellText = val ? 'YES' : 'NO';
                  }
                  return (
                    <td
                      key={key}
                      className={`border-l border-border p-2 text-center font-bold ${cellClass}`}
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
