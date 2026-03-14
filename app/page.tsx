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
    <>
      <CardDecorations>
        {page === 1 ? (
          <div className="flex flex-col gap-4">
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
                <ol className="list-decimal space-y-3 pl-5 text-[13px] leading-[1.5]">
                  <li>Find the 8 tagged items around the party</li>
                  <li>Tap each one to open a suspect&apos;s dossier</li>
                  <li>Each dossier contains 3 clues — they&apos;re automatically saved to your tracker</li>
                  <li>Use your tracker to eliminate suspects</li>
                  <li>
                    When you&apos;ve collected all the evidence, submit your accusation
                  </li>
                </ol>
              </div>
            </div>

            <button className="glass-btn-primary w-full" onClick={() => router.push('/scan')}>
              <span>Begin Scanning</span>
              <span>→</span>
            </button>
            <button className="glass-btn w-full" onClick={() => setPage(1)}>
              ← Back
            </button>
          </div>
        )}
      </CardDecorations>
    </>
  );
}
