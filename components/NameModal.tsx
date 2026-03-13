'use client';

import { useState } from 'react';
import { useGameState } from '@/lib/store';

export default function NameModal() {
  const { playerName, setPlayerName, hydrated } = useGameState();
  const [input, setInput] = useState('');

  if (!hydrated || playerName) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 px-6">
      <div className="db-window w-full max-w-[340px]">
        <div className="db-titlebar">
          <span className="db-titlebar-text">Auth_Guest</span>
          <div className="db-titlebar-buttons">
            <span className="db-titlebar-btn db-titlebar-btn-close">×</span>
          </div>
        </div>
        <div className="db-window-body space-y-3">
          <p className="text-[11px] text-terminal-text-dim">
            You are logged in. <span className="text-terminal-glow">AUTH_GUEST</span>
          </p>
          <p className="text-[11px] text-secondary">
            Enter query name to access archived evidence.
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
            placeholder="name_"
            maxLength={20}
            autoFocus
            className="db-inset w-full px-2 py-1.5 text-[12px] text-terminal-glow caret-terminal-glow outline-none placeholder:text-terminal-text-dim/50"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                if (input.trim()) setPlayerName(input.trim());
              }}
              disabled={!input.trim()}
              className="db-button db-button-primary disabled:opacity-30"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
