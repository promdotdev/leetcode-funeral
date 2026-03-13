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
    <div className="flex flex-col gap-4 pt-6">
      {/* Badge */}
      <div className="glass-badge">
        <span className="glass-badge-text">[DB344-A]</span>
      </div>

      {/* Case File */}
      <div className="glass-card">
        <div className="glass-header">
          <span className="glass-header-text">Lee T. Code-Deceased</span>
        </div>
        <div className="glass-body text-[12px] leading-[1.4]">
          <p>
            Lee T. Code is dead. Founder of CodeScreen, the technical hiring
            platform that became the gatekeeping ritual of software engineering.
            Poisoned at the CodeScreen Enterprise launch event.
          </p>
          <p className="mt-3">
            He picked up a phone at a confession booth backstage, and the contact
            poison did the rest. The platform was destroyed from the inside at
            the same moment. Eight suspects were at the launch. One of them did it.
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="glass-card">
        <div className="glass-header">
          <span className="glass-header-text">Readme.txt</span>
        </div>
        <div className="glass-body">
          <ol className="list-decimal space-y-3 pl-5 text-[12px] leading-[1.4]">
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

      {/* CTA */}
      <Link href="/grid" className="glass-btn-primary w-full">
        <span>Begin investigation</span>
        <span>▶</span>
      </Link>
    </div>
  );
}
