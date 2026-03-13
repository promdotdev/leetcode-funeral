'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    if (!localStorage.getItem('sessionId')) {
      localStorage.setItem('sessionId', crypto.randomUUID());
    }
  }, []);

  return (
    <div className="flex min-h-[80vh] flex-col justify-between">
      <div>
        <h1 className="neon-text mb-6 text-4xl font-bold leading-tight">
          LeetCode is Dead.
        </h1>

        <div className="space-y-4 text-sm leading-relaxed text-primary/60">
          <p>
            Lee T. Code is dead. Founder of CodeScreen, the technical hiring
            platform that became the gatekeeping ritual of software engineering.
            Poisoned at the CodeScreen Enterprise launch event. He picked up a
            phone at a confession booth backstage, and the contact poison did the
            rest. The platform was destroyed from the inside at the same moment.
            Eight suspects were at the launch. One of them did it.
          </p>

          <p className="font-[family-name:var(--font-terminal)] text-base uppercase tracking-wider text-hot-pink">
            The killer is the only suspect who had all three: the motive, the
            means, and the opportunity.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="mb-3 text-xl text-accent">// How to play</h2>
          <ol className="list-inside list-decimal space-y-2 font-[family-name:var(--font-terminal)] text-base leading-relaxed text-primary/50">
            <li>Find the 8 tagged items around the party</li>
            <li>Tap each one to open a suspect&apos;s dossier</li>
            <li>
              Each dossier contains 3 clues. Tap &ldquo;Collect&rdquo; to add
              them to your grid
            </li>
            <li>Use your grid to eliminate suspects</li>
            <li>
              When you&apos;ve collected all the evidence, submit your accusation
            </li>
          </ol>
        </div>
      </div>

      <Link
        href="/grid"
        className="retro-button mt-10 block text-center"
      >
        &gt; Start investigating
      </Link>
    </div>
  );
}
