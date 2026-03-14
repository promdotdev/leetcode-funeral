import type { Clue } from '@/lib/data';

const dimensionLabel: Record<string, string> = {
  motive: 'Motive',
  means: 'Means',
  opportunity: 'Opportunity',
};

export default function ClueCard({ clue }: { clue: Clue }) {
  return (
    <div className="glass-card">
      <div className="glass-body">
        <div className="mb-1 text-[12px] font-bold uppercase text-glass-hot" style={{ fontFamily: 'var(--font-mono)' }}>
          RE: {clue.aboutSuspectName}
        </div>
        <div className="text-[10px] uppercase text-black/50 mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
          [{dimensionLabel[clue.dimension]}]
        </div>
        <p className="text-[12px] leading-[1.4] text-black/80">
          {clue.evidence}
        </p>
      </div>
    </div>
  );
}
