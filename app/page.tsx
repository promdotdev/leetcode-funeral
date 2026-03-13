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
    <div className="space-y-3 pt-3">
      <div className="db-window">
        <div className="db-titlebar">
          <span className="db-titlebar-text">CornerStone - [DB344-A]</span>
          <div className="db-titlebar-buttons">
            <span className="db-titlebar-btn">–</span>
            <span className="db-titlebar-btn db-titlebar-btn-close">×</span>
          </div>
        </div>
        <div className="db-window-body space-y-3 text-[11px] leading-relaxed">
          <p className="text-[13px] font-bold text-terminal-glow glow-text">
            CASE FILE: Lee T. Code — DECEASED
          </p>
          <p className="text-terminal-text">
            Lee T. Code is dead. Founder of CodeScreen, the technical hiring
            platform that became the gatekeeping ritual of software engineering.
            Poisoned at the CodeScreen Enterprise launch event. He picked up a
            phone at a confession booth backstage, and the contact poison did the
            rest. The platform was destroyed from the inside at the same moment.
            Eight suspects were at the launch. One of them did it.
          </p>
          <p className="font-bold text-terminal-hot glow-hot">
            The killer is the only suspect who had all three: the motive, the
            means, and the opportunity.
          </p>
        </div>
      </div>

      <div className="db-window">
        <div className="db-titlebar">
          <span className="db-titlebar-text">ReadMe.txt</span>
          <div className="db-titlebar-buttons">
            <span className="db-titlebar-btn db-titlebar-btn-close">×</span>
          </div>
        </div>
        <div className="db-window-body">
          <ol className="list-inside list-decimal space-y-1.5 text-[11px] leading-relaxed text-terminal-text">
            <li>Find the 8 tagged items around the party</li>
            <li>Tap each one to open a suspect&apos;s dossier</li>
            <li>
              Each dossier contains 3 clues. Tap &ldquo;Add to Session&rdquo; to
              archive them to your grid
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
        className="db-button db-button-primary block text-center text-[11px]"
      >
        &gt; Begin Investigation_
      </Link>
    </div>
  );
}
