'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchLeaderboard, type MysteryPlayer } from '@/lib/supabase';
import { useGameState } from '@/lib/store';

export default function LeaderboardPage() {
  const [players, setPlayers] = useState<MysteryPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const { playerName } = useGameState();

  const load = useCallback(async () => {
    const data = await fetchLeaderboard();
    setPlayers(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, [load]);

  return (
    <div className="pt-3">
      <div className="db-window">
        <div className="db-titlebar">
          <span className="db-titlebar-text">Active Sessions</span>
          <div className="db-titlebar-buttons">
            <span className="db-titlebar-btn">–</span>
            <span className="db-titlebar-btn db-titlebar-btn-close">×</span>
          </div>
        </div>

        {loading ? (
          <div className="db-window-body text-center text-[11px] text-terminal-text-dim">
            Querying database...
          </div>
        ) : players.length === 0 ? (
          <div className="db-window-body text-center text-[11px] text-terminal-text-dim">
            No active sessions found.
          </div>
        ) : (
          <div className="p-0">
            {/* Header */}
            <div className="flex items-center border-b border-terminal-border bg-terminal-panel-light px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-terminal-glow">
              <span className="w-5">#</span>
              <span className="flex-1">Session</span>
              <span className="w-16 text-right">Evidence</span>
            </div>

            {players.map((player, i) => {
              const isYou = player.name === playerName;
              return (
                <div
                  key={player.id}
                  className={`flex items-center border-b border-terminal-border/30 px-3 py-1.5 last:border-b-0 ${
                    i % 2 === 0 ? 'bg-terminal-panel' : 'bg-terminal-dark'
                  } ${isYou ? 'bg-terminal-glow/5' : ''}`}
                >
                  <span className="w-5 text-[10px] text-terminal-text-dim">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <span className={`text-[11px] font-bold ${isYou ? 'text-terminal-glow glow-text' : 'text-terminal-text'}`}>
                      {player.name}
                      {isYou && (
                        <span className="ml-1 text-[9px] font-normal text-terminal-text-dim">(you)</span>
                      )}
                    </span>
                    {player.solved && (
                      <span className="ml-1 text-[9px] font-bold uppercase text-terminal-yes glow-text">
                        Solved
                      </span>
                    )}
                  </div>
                  <div className="flex w-16 items-center justify-end gap-1">
                    <span className="text-[10px] text-terminal-text-dim">
                      {player.clue_count}/24
                    </span>
                    <div className="db-progress h-[6px] w-8">
                      <div
                        className="db-progress-fill"
                        style={{ width: `${(player.clue_count / 24) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <p className="mt-2 text-center text-[9px] uppercase tracking-widest text-terminal-text-dim/40">
        Live — refreshing every 5s
      </p>
    </div>
  );
}
