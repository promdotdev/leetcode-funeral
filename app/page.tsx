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
      {/* Chrome globe icon */}
      <div className="flex justify-end">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="opacity-80">
          <circle cx="24" cy="24" r="20" stroke="#888" strokeWidth="1.5" fill="none" />
          <ellipse cx="24" cy="24" rx="10" ry="20" stroke="#888" strokeWidth="1.5" fill="none" />
          <line x1="4" y1="24" x2="44" y2="24" stroke="#888" strokeWidth="1.5" />
          <line x1="24" y1="4" x2="24" y2="44" stroke="#888" strokeWidth="1.5" />
          <ellipse cx="24" cy="24" rx="20" ry="8" stroke="#888" strokeWidth="1" fill="none" />
        </svg>
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

      {/* Instructions */}
      <div className="glass-card">
        <div className="glass-body">
          <ol className="list-decimal space-y-3 pl-5 text-[13px] leading-[1.5]">
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

      {/* Casket image placeholder — replace with actual asset */}
      <div className="flex justify-center py-2">
        <img
          src="/casket.png"
          alt="Casket with roses"
          className="h-auto w-48 object-contain"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>

      {/* CTA */}
      <Link href="/grid" className="glass-btn-primary w-full mb-4">
        <span>Begin investigation</span>
        <span>▶</span>
      </Link>
    </div>
  );
}
