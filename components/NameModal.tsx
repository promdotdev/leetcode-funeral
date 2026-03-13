'use client';

import { useState } from 'react';
import { useGameState } from '@/lib/store';

export default function NameModal() {
  const { playerName, setPlayerName, hydrated } = useGameState();
  const [input, setInput] = useState('');

  if (!hydrated || playerName) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 px-6">
      <div className="glass-card w-full max-w-[340px]">
        <div className="glass-header">
          <span className="glass-header-text">Identify Yourself</span>
        </div>
        <div className="glass-body space-y-4">
          <p className="text-[12px] text-glass-muted">
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
            className="glass-inset w-full px-4 py-3 text-[13px] text-black outline-none placeholder:text-glass-muted/50"
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
