'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  useEffect(() => {
    if (!localStorage.getItem('sessionId')) {
      localStorage.setItem('sessionId', crypto.randomUUID());
    }
  }, []);

  return (
    <>
      <div>
        <div className="flex flex-col gap-4 pb-8">
          {/* Globe icon */}
          <div className="flex justify-end pt-4">
            <Image
              src="/globe.png"
              alt=""
              width={64}
              height={64}
            />
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

          {/* Roses + Casket composition */}
          <div className="relative mx-auto w-64 py-4" style={{ height: 200 }}>
            <Image
              src="/casket.png"
              alt="Casket"
              width={280}
              height={180}
              className="absolute right-0 bottom-2 w-48 h-auto"
            />
            <Image
              src="/roses.png"
              alt="Pink roses"
              width={140}
              height={80}
              className="absolute left-0 bottom-0 w-28 h-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
}
