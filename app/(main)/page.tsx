'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CardDecorations from '@/components/CardDecorations';

export default function Home() {
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('sessionId')) {
      localStorage.setItem('sessionId', crypto.randomUUID());
    }
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full items-center">
      <CardDecorations>
        {page === 1 ? (
          <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="rounded-xl px-5 py-4 text-center" style={{ background: '#52fc53' }}>
              <div className="text-[11px] text-black/40" style={{ fontFamily: 'var(--font-body)' }}>A Murder Mystery</div>
              <h1 className="text-[22px] font-medium !text-black leading-snug" style={{ fontFamily: 'var(--font-body)' }}>
                Who Killed Lee T. Code?
              </h1>
            </div>

            {/* Case narrative */}
            <div className="glass-card">
              <div className="glass-body text-[13px] leading-[1.5]">
                <p className="font-medium">Lee T. Code is dead.</p>
                <p className="mt-3">
                  Founder of CodeScreen, the technical hiring platform that became the
                  gatekeeping ritual of software engineering. Poisoned at the CodeScreen
                  Enterprise launch event.
                </p>
                <p className="mt-3">
                  He picked up a phone at a confession booth backstage, and the contact
                  poison did the rest. The platform was destroyed from the inside at the
                  same moment. Eight suspects were at the launch. One of them did it.
                </p>
                <p className="mt-3 font-medium">
                  The killer is the only suspect who had all three: the motive, the means,
                  and the opportunity.
                </p>
              </div>
            </div>

            <button className="glass-btn-primary w-full" onClick={() => setPage(2)}>
              <span>Next</span>
              <span>→</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Instructions */}
            <div className="glass-card">
              <div className="glass-body">
                <p className="font-medium mb-3">How it works</p>
                <p className="text-[12px] text-white/60 mb-4">Every item has an NFC tag — no app required, just tap and go.</p>
                <ol className="list-decimal space-y-3 pl-5 text-[13px] leading-[1.5]">
                  <li>Find the 8 NFC-tagged items around the party</li>
                  <li>Tap each one to open a suspect&apos;s dossier</li>
                  <li>Each dossier contains 3 clues — they&apos;re automatically saved to your tracker</li>
                  <li>Use your tracker to eliminate suspects</li>
                  <li>
                    When you&apos;re ready, submit your accusation — you can accuse at any time, but you only get one chance
                  </li>
                  <li>If you find the killer, tell someone on the prom.dev team to collect your prize</li>
                </ol>
              </div>
            </div>

            <button className="glass-btn-primary w-full" onClick={() => router.push('/scan')}>
              <span>Begin Scanning</span>
              <span>→</span>
            </button>
            <button onClick={() => setPage(1)} className="mt-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-white/30 hover:text-white/60 hover:bg-white/10 active:bg-white/20 transition-colors text-sm mx-auto outline-none focus:outline-none">
              <span>←</span>
              <span>back</span>
            </button>
          </div>
        )}
      </CardDecorations>
    </div>
  );
}
