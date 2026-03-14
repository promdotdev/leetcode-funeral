'use client';

import Link from 'next/link';
import { SUSPECTS } from '@/lib/data';
import { useGameState } from '@/lib/store';
import CardDecorations from '@/components/CardDecorations';

const DIMENSIONS = ['motive', 'means', 'opportunity'] as const;
const DIMENSION_LABELS = { motive: 'MOT', means: 'MNS', opportunity: 'OPP' };

export default function Grid() {
  const { gridState, isComplete, hydrated } = useGameState();

  return (
    <div>
      {isComplete && (
        <Link href="/accuse" className="glass-btn-primary mb-4 w-full">
          <span>Submit Final Accusation</span>
          <span>▶</span>
        </Link>
      )}

      {/* Grid */}
      <CardDecorations>
      <div className="white-card">
        <div className="white-card-header">Deduction Matrix</div>
        <div className="p-0">
          <table className="w-full border-collapse text-[11px]">
            <thead>
              <tr className="bg-black/4">
                <th className="border-b border-r border-[#e0e0e0] p-2 text-left uppercase text-black/50" style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }}>
                  Suspect
                </th>
                {DIMENSIONS.map((d) => (
                  <th
                    key={d}
                    className="border-b border-r border-[#e0e0e0] p-2 text-center uppercase text-black/50 last:border-r-0"
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
                    i % 2 === 0 ? 'bg-white' : 'bg-black/2'
                  } border-b border-[#e0e0e0] last:border-b-0`}
                >
                  <td className="border-r border-[#e0e0e0] p-2">
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
                        className={`border-r border-[#e0e0e0] p-2 text-center last:border-r-0 ${textColor}`}
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
      </CardDecorations>
    </div>
  );
}
