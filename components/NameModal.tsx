'use client';

import { useState } from 'react';
import { useGameState } from '@/lib/store';

export default function NameModal() {
  const { playerName, setPlayerName, hydrated } = useGameState();
  const [input, setInput] = useState('');

  if (!hydrated || playerName) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 px-6">
      <div className="white-card w-full max-w-[340px]">
        <div className="white-card-header">Identify Yourself</div>
        <div className="p-6 space-y-4">
          <p className="text-[12px] text-black/50">
            Enter your name to join the investigation.
          </p>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && input.trim()) {
                setPlayerName(input.trim());
              }
            }}
            placeholder="Your name"
            maxLength={20}
            autoFocus
            className="w-full rounded-lg border border-[#e0e0e0] bg-[#f8f8f8] px-4 py-3 text-[13px] text-black outline-none placeholder:text-black/30 focus:border-green"
          />
          <div className="flex justify-end">
            <button
              onClick={() => {
                if (input.trim()) setPlayerName(input.trim());
              }}
              disabled={!input.trim()}
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
