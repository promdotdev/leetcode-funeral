'use client';

import Link from 'next/link';
import { SUSPECTS } from '@/lib/data';
import { useGameState } from '@/lib/store';
import CardDecorations from '@/components/CardDecorations';

const DIMENSIONS = ['motive', 'means', 'opportunity'] as const;

function DimensionPill({ label, value }: { label: string; value: boolean | undefined }) {
  if (value === true) {
    return (
      <span className="rounded-full px-2.5 py-1 text-[10px] uppercase bg-glass-yes/20 text-glass-yes font-medium" style={{ fontFamily: 'var(--font-mono)' }}>
        {label}
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="rounded-full px-2.5 py-1 text-[10px] uppercase bg-glass-no/20 text-glass-no font-medium" style={{ fontFamily: 'var(--font-mono)' }}>
        {label}
      </span>
    );
  }
  return (
    <span className="rounded-full px-2.5 py-1 text-[10px] uppercase bg-black/8 text-black/30" style={{ fontFamily: 'var(--font-mono)' }}>
      {label}
    </span>
  );
}

export default function Grid() {
  const { gridState, accusation, hydrated } = useGameState();

  return (
    <div>
      <CardDecorations>
        <div className="glass-card mb-4">
          {SUSPECTS.map((suspect, i) => (
            <div
              key={suspect.id}
              className={`px-4 py-3 ${i < SUSPECTS.length - 1 ? 'border-b border-black/8' : ''}`}
            >
              <Link
                href={`/suspect/${suspect.id}`}
                className="text-[13px] font-medium text-black hover:text-glass-hot"
              >
                {suspect.name}
              </Link>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {DIMENSIONS.map((dim) => {
                  const val = hydrated ? gridState[`${suspect.id}-${dim}`] : undefined;
                  return <DimensionPill key={dim} label={dim} value={val} />;
                })}
              </div>
            </div>
          ))}
        </div>

        {accusation ? (
          <div className="glass-card">
            <div className="glass-body text-center text-[12px] text-black/50" style={{ fontFamily: 'var(--font-mono)' }}>
              Accusation submitted
            </div>
          </div>
        ) : (
          <Link href="/accuse" className="glass-btn-primary w-full">
            <span>Accuse Someone</span>
            <span>→</span>
          </Link>
        )}
      </CardDecorations>
    </div>
  );
}
