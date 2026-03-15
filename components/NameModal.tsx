'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useGameState } from '@/lib/store';

export default function NameModal() {
  const pathname = usePathname();
  const { playerName, setPlayerName, hydrated } = useGameState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (pathname === '/penances' || pathname === '/penances-display') return null;
  if (!hydrated || playerName) return null;

  const canSubmit = name.trim() && email.trim();

  const handleSubmit = () => {
    if (canSubmit) setPlayerName(name.trim(), email.trim());
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 px-6">
      <div className="white-card w-full max-w-[340px]">
        <div className="white-card-header">Identify Yourself</div>
        <div className="p-6 space-y-4">
          <p className="text-[12px] text-white/50">
            Enter your details to join the investigation.
          </p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const emailInput = document.getElementById('email-input');
                emailInput?.focus();
              }
            }}
            placeholder="Your name"
            maxLength={20}
            autoFocus
            className="w-full rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3 text-[13px] text-white outline-none placeholder:text-white/30 focus:border-green"
          />
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && canSubmit) handleSubmit();
            }}
            placeholder="Your email"
            className="w-full rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3 text-[13px] text-white outline-none placeholder:text-white/30 focus:border-green"
          />
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="glass-btn disabled:opacity-30"
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
