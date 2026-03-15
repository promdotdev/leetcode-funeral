'use client';

import CardDecorations from '@/components/CardDecorations';
import ScanGlowBorder from '@/components/ScanGlowBorder';
import { useGameState } from '@/lib/store';

export default function ScanPage() {
  const { collectedClues } = useGameState();
  const isFirstScan = collectedClues.length === 0;

  return (
    <CardDecorations>
      <ScanGlowBorder />
      <div className="flex min-h-[calc(100svh-8rem)] flex-col items-center justify-center gap-4">
        {isFirstScan && (
          <div className="glass-card w-full">
            <div className="white-card-header bg-green-500 text-black">
              The hunt has begun
            </div>
            <div className="glass-body py-4 text-center text-[13px] text-[var(--color-glass-muted)]">
              Look for NFC stickers on random items that seem out of place. Scan them to collect clues.
            </div>
          </div>
        )}
        <div className="glass-card w-full">
          <div className="glass-body text-[13px] leading-[1.5]">
            <p className="font-medium">How to scan a tag</p>

            <ol className="mt-4 list-decimal space-y-3 pl-5">
              <li>Find an NFC sticker on an object at the party.</li>
              <li>Unlock your phone.</li>
              <li>Hold the back of your phone to the sticker.</li>
              <li>Tap the banner that appears.</li>
              <li>Tap &ldquo;Add to Session&rdquo; to save the clues.</li>
            </ol>

            <div className="mt-5 rounded-lg bg-black/10 px-4 py-3 text-[12px]">
              <p className="font-medium">Tip</p>
              <p className="mt-1">
                iPhone: NFC is on by default. Android: enable NFC in Settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </CardDecorations>
  );
}
