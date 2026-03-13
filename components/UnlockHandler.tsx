'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSuspect, validateUnlockKey } from '@/lib/data';
import { useGameState } from '@/lib/store';

export default function UnlockHandler({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { unlockSuspect, isSuspectUnlocked, hydrated } = useGameState();
  const [status, setStatus] = useState<'checking' | 'denied'>('checking');

  const suspect = getSuspect(id);
  const key = searchParams.get('key');

  useEffect(() => {
    if (!hydrated) return;
    if (!suspect) {
      router.replace('/suspects');
      return;
    }

    // Already unlocked — skip validation, go straight to dossier
    if (isSuspectUnlocked(id)) {
      router.replace(`/suspect/${id}`);
      return;
    }

    // Validate the key from the NFC sticker URL
    if (key && validateUnlockKey(id, key)) {
      unlockSuspect(id);
      router.replace(`/suspect/${id}`);
    } else {
      setStatus('denied');
    }
  }, [hydrated, id, key, suspect, isSuspectUnlocked, unlockSuspect, router]);

  if (!suspect) return null;

  if (status === 'denied') {
    return (
      <div className="pt-4">
        <div className="glass-card">
          <div className="glass-header">
            <span className="glass-header-text">Access Denied</span>
          </div>
          <div className="glass-body text-center">
            <div className="text-[32px] mb-3">🚫</div>
            <h2 className="text-[14px] mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
              Classified Dossier
            </h2>
            <p className="text-[12px] text-glass-muted leading-[1.4]">
              This suspect&apos;s file requires physical clearance.
              Find and scan the NFC tag to unlock.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-4 text-center text-white/60">
      Verifying clearance...
    </div>
  );
}
