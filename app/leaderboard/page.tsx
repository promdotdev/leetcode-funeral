'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchLeaderboard, type MysteryPlayer } from '@/lib/supabase';
import { useGameState } from '@/lib/store';
import CardDecorations from '@/components/CardDecorations';

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
      <CardDecorations>
        <div className="glass-card">
          <div className="flex items-center border-b border-white/10 bg-white/8 px-4 py-2 text-[10px] uppercase text-white/50" style={{ fontFamily: 'var(--font-mono)' }}>
            <span className="w-5">#</span>
            <span className="flex-1">Session</span>
            <span className="w-16 text-right">Evidence</span>
          </div>

          {loading ? (
            <div className="p-6 text-center text-[12px] text-white/50" style={{ fontFamily: 'var(--font-mono)' }}>
              Querying database...
            </div>
          ) : players.length === 0 ? (
            <div className="p-6 text-center text-[12px] text-white/50" style={{ fontFamily: 'var(--font-mono)' }}>
              No active sessions found.
            </div>
          ) : (
            <>
              {players.map((player, i) => {
                const isYou = player.name === playerName;
                return (
                  <div
                    key={player.id}
                    className={`flex items-center px-4 py-3 ${i < players.length - 1 ? 'border-b border-white/8' : ''}`}
                  >
                    <span className="w-5 text-[11px] text-white/40" style={{ fontFamily: 'var(--font-mono)' }}>{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <span className={`text-[13px] font-medium ${isYou ? 'text-glass-yes' : 'text-white'}`}>
                        {player.name}
                        {isYou && (
                          <span className="ml-1 text-[10px] font-normal text-white/40" style={{ fontFamily: 'var(--font-mono)' }}>(you)</span>
                        )}
                      </span>
                      {player.solved && (
                        <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-bold uppercase text-white/60" style={{ fontFamily: 'var(--font-mono)' }}>
                          Solved
                        </span>
                      )}
                    </div>
                    <div className="flex w-16 items-center justify-end gap-1">
                      <span className="text-[10px] text-white/40" style={{ fontFamily: 'var(--font-mono)' }}>
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
            </>
          )}
        </div>
      </CardDecorations>
    </div>
  );
}
