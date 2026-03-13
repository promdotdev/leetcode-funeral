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
      {/* Progress */}
      <div className="mb-4">
        <div className="mb-1.5 flex items-center justify-between text-[11px] uppercase text-white/60" style={{ fontFamily: 'var(--font-mono)' }}>
          <span>Evidence: {progress.clues}/24</span>
          <span>{Math.round((progress.clues / 24) * 100)}%</span>
        </div>
        <div className="glass-progress">
          <div
            className="glass-progress-fill"
            style={{ width: hydrated ? `${(progress.clues / 24) * 100}%` : '0%' }}
          />
        </div>
      </div>

      {isComplete && (
        <Link href="/accuse" className="glass-btn-primary mb-4 w-full">
          <span>Submit Final Accusation</span>
          <span>▶</span>
        </Link>
      )}

      {/* Grid */}
      <div className="glass-card overflow-hidden">
        <div className="glass-header">
          <span className="glass-header-text">Deduction Matrix</span>
        </div>
        <div className="p-0">
          <table className="w-full border-collapse text-[11px]">
            <thead>
              <tr className="bg-[#f0f0f0]">
                <th className="border-b border-r border-glass-border p-2 text-left uppercase text-glass-muted" style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }}>
                  Suspect
                </th>
                {DIMENSIONS.map((d) => (
                  <th
                    key={d}
                    className="border-b border-r border-glass-border p-2 text-center uppercase text-glass-muted last:border-r-0"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }}
                  >
                    {DIMENSION_LABELS[d]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SUSPECTS.map((suspect, i) => (
                <tr
                  key={suspect.id}
                  className={`${
                    i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'
                  } border-b border-glass-border last:border-b-0`}
                >
                  <td className="border-r border-glass-border p-2">
                    <Link
                      href={`/suspect/${suspect.id}`}
                      className="text-black underline decoration-black/20 hover:text-glass-hot"
                    >
                      {suspect.name}
                    </Link>
                  </td>
                  {DIMENSIONS.map((dim) => {
                    const key = `${suspect.id}-${dim}`;
                    const val = gridState[key];
                    let cellText = '';
                    let textColor = '';
                    if (hydrated && val !== undefined) {
                      textColor = val ? 'text-glass-yes font-bold' : 'text-glass-no font-bold';
                      cellText = val ? 'YES' : 'NO';
                    }
                    return (
                      <td
                        key={key}
                        className={`border-r border-glass-border p-2 text-center last:border-r-0 ${textColor}`}
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
    </div>
  );
}
