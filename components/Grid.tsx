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
      <div className="mb-3">
        <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-wider text-terminal-text-dim">
          <span>Evidence: {progress.clues}/24</span>
          <span>{Math.round((progress.clues / 24) * 100)}%</span>
        </div>
        <div className="db-progress">
          <div
            className="db-progress-fill"
            style={{ width: hydrated ? `${(progress.clues / 24) * 100}%` : '0%' }}
          />
        </div>
      </div>

      {isComplete && (
        <Link
          href="/accuse"
          className="db-button db-button-primary mb-3 block text-center text-[11px]"
        >
          &gt; Submit Final Accusation
        </Link>
      )}

      {/* Grid */}
      <div className="db-window overflow-hidden">
        <div className="db-titlebar">
          <span className="db-titlebar-text">CornerStone - [Deduction Matrix]</span>
          <div className="db-titlebar-buttons">
            <span className="db-titlebar-btn">–</span>
            <span className="db-titlebar-btn db-titlebar-btn-close">×</span>
          </div>
        </div>
        <div className="p-0">
          <table className="w-full border-collapse text-[10px]">
            <thead>
              <tr className="bg-terminal-panel-light">
                <th className="border-b border-r border-terminal-border p-1.5 text-left font-bold uppercase tracking-wider text-terminal-glow">
                  Suspect
                </th>
                {DIMENSIONS.map((d) => (
                  <th
                    key={d}
                    className="border-b border-r border-terminal-border p-1.5 text-center font-bold uppercase tracking-wider text-terminal-glow last:border-r-0"
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
                    i % 2 === 0 ? 'bg-terminal-panel' : 'bg-terminal-dark'
                  } border-b border-terminal-border/50 last:border-b-0`}
                >
                  <td className="border-r border-terminal-border/50 p-1.5">
                    <Link
                      href={`/suspect/${suspect.id}`}
                      className="text-terminal-accent underline decoration-terminal-accent/30 hover:text-terminal-glow"
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
                      textColor = val ? 'text-terminal-yes glow-text' : 'text-terminal-no glow-hot';
                      cellText = val ? 'YES' : 'NO';
                    }
                    return (
                      <td
                        key={key}
                        className={`border-r border-terminal-border/50 p-1.5 text-center font-bold last:border-r-0 ${textColor}`}
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
