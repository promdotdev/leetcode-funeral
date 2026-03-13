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
    <div className="pt-4">
      <div className="glass-card">
        <div className="glass-header">
          <span className="glass-header-text">Active Sessions</span>
        </div>

        {loading ? (
          <div className="glass-body text-center text-[12px] text-glass-muted">
            Querying database...
          </div>
        ) : players.length === 0 ? (
          <div className="glass-body text-center text-[12px] text-glass-muted">
            No active sessions found.
          </div>
        ) : (
          <div className="p-0">
            <div className="flex items-center border-b border-glass-border bg-[#f0f0f0] px-4 py-2 text-[10px] uppercase text-glass-muted" style={{ fontFamily: 'var(--font-mono)' }}>
              <span className="w-5">#</span>
              <span className="flex-1">Session</span>
              <span className="w-16 text-right">Evidence</span>
            </div>

            {players.map((player, i) => {
              const isYou = player.name === playerName;
              return (
                <div
                  key={player.id}
                  className={`flex items-center border-b border-glass-border px-4 py-2.5 last:border-b-0 ${
                    i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'
                  } ${isYou ? 'bg-glass-accent/5' : ''}`}
                >
                  <span className="w-5 text-[11px] text-glass-muted">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <span className={`text-[12px] font-medium ${isYou ? 'text-glass-yes' : 'text-black'}`}>
                      {player.name}
                      {isYou && (
                        <span className="ml-1 text-[10px] font-normal text-glass-muted">(you)</span>
                      )}
                    </span>
                    {player.solved && (
                      <span className="ml-2 rounded-full bg-glass-accent/20 px-2 py-0.5 text-[9px] font-bold uppercase text-glass-yes">
                        Solved
                      </span>
                    )}
                  </div>
                  <div className="flex w-16 items-center justify-end gap-1">
                    <span className="text-[10px] text-glass-muted">
                      {player.clue_count}/24
                    </span>
                    <div className="glass-progress h-[6px] w-8">
                      <div
                        className="glass-progress-fill"
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

      <p className="mt-3 text-center text-[10px] uppercase text-white/30" style={{ fontFamily: 'var(--font-mono)' }}>
        Live — refreshing every 5s
      </p>
    </div>
  );
}
