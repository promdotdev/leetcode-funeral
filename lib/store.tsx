'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { upsertPlayer, updatePlayerProgress } from '@/lib/supabase';

interface GameState {
  collectedClues: string[];
  gridState: Record<string, boolean>;
  visitedSuspects: string[];
  unlockedSuspects: string[];
  playerName: string | null;
  solved: boolean;
}

interface GameStore {
  hydrated: boolean;
  collectedClues: string[];
  gridState: Record<string, boolean>;
  visitedSuspects: string[];
  unlockedSuspects: string[];
  playerName: string | null;
  collectClue: (clueId: string, aboutSuspectId: string, dimension: string, value: boolean) => void;
  markVisited: (suspectId: string) => void;
  unlockSuspect: (suspectId: string) => void;
  isSuspectUnlocked: (suspectId: string) => boolean;
  setPlayerName: (name: string) => void;
  markSolved: () => void;
  isClueCollected: (clueId: string) => boolean;
  isComplete: boolean;
  progress: { clues: number; suspects: number };
}

const STORAGE_KEY = 'murder-mystery-state';

const defaultState: GameState = {
  collectedClues: [],
  gridState: {},
  visitedSuspects: [],
  unlockedSuspects: [],
  playerName: null,
  solved: false,
};

function loadState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return { ...defaultState, ...parsed };
  } catch {
    return defaultState;
  }
}

function saveState(state: GameState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getSessionId(): string {
  let id = localStorage.getItem('sessionId');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('sessionId', id);
  }
  return id;
}

const GameContext = createContext<GameStore | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(defaultState);
  const [hydrated, setHydrated] = useState(false);
  const pendingVisits = useRef<string[]>([]);
  const isHydrated = useRef(false);

  // Sync to Supabase whenever progress changes (debounced)
  const syncTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const syncToSupabase = useCallback((s: GameState) => {
    if (!s.playerName) return;
    clearTimeout(syncTimeout.current);
    syncTimeout.current = setTimeout(() => {
      const sessionId = getSessionId();
      updatePlayerProgress(sessionId, s.collectedClues.length, s.visitedSuspects.length, s.solved);
    }, 500);
  }, []);

  useEffect(() => {
    getSessionId();
    const loaded = loadState();
    let merged = loaded;
    for (const id of pendingVisits.current) {
      if (!merged.visitedSuspects.includes(id)) {
        merged = { ...merged, visitedSuspects: [...merged.visitedSuspects, id] };
      }
    }
    pendingVisits.current = [];
    if (merged !== loaded) saveState(merged);
    setState(merged);
    isHydrated.current = true;
    setHydrated(true);
  }, []);

  const collectClue = useCallback(
    (clueId: string, aboutSuspectId: string, dimension: string, value: boolean) => {
      setState((prev) => {
        if (prev.collectedClues.includes(clueId)) return prev;
        const next: GameState = {
          ...prev,
          collectedClues: [...prev.collectedClues, clueId],
          gridState: {
            ...prev.gridState,
            [`${aboutSuspectId}-${dimension}`]: value,
          },
        };
        saveState(next);
        syncToSupabase(next);
        return next;
      });
    },
    [syncToSupabase]
  );

  const markVisited = useCallback((suspectId: string) => {
    if (!isHydrated.current) {
      if (!pendingVisits.current.includes(suspectId)) {
        pendingVisits.current.push(suspectId);
      }
      return;
    }
    setState((prev) => {
      if (prev.visitedSuspects.includes(suspectId)) return prev;
      const next: GameState = {
        ...prev,
        visitedSuspects: [...prev.visitedSuspects, suspectId],
      };
      saveState(next);
      syncToSupabase(next);
      return next;
    });
  }, [syncToSupabase]);

  const unlockSuspect = useCallback((suspectId: string) => {
    setState((prev) => {
      if (prev.unlockedSuspects.includes(suspectId)) return prev;
      const next: GameState = {
        ...prev,
        unlockedSuspects: [...prev.unlockedSuspects, suspectId],
      };
      saveState(next);
      return next;
    });
  }, []);

  const isSuspectUnlocked = useCallback(
    (suspectId: string) => state.unlockedSuspects.includes(suspectId),
    [state.unlockedSuspects]
  );

  const setPlayerName = useCallback((name: string) => {
    const sessionId = getSessionId();
    setState((prev) => {
      const next = { ...prev, playerName: name };
      saveState(next);
      return next;
    });
    // Create/update player in Supabase
    upsertPlayer(sessionId, name).then(() => {
      // Sync current progress immediately
      const current = loadState();
      updatePlayerProgress(sessionId, current.collectedClues.length, current.visitedSuspects.length, current.solved);
    });
  }, []);

  const markSolved = useCallback(() => {
    setState((prev) => {
      if (prev.solved) return prev;
      const next = { ...prev, solved: true };
      saveState(next);
      syncToSupabase(next);
      return next;
    });
  }, [syncToSupabase]);

  const isClueCollected = useCallback(
    (clueId: string) => state.collectedClues.includes(clueId),
    [state.collectedClues]
  );

  const value: GameStore = {
    hydrated,
    collectedClues: state.collectedClues,
    gridState: state.gridState,
    visitedSuspects: state.visitedSuspects,
    unlockedSuspects: state.unlockedSuspects,
    playerName: state.playerName,
    collectClue,
    markVisited,
    unlockSuspect,
    isSuspectUnlocked,
    setPlayerName,
    markSolved,
    isClueCollected,
    isComplete: state.collectedClues.length >= 24,
    progress: {
      clues: state.collectedClues.length,
      suspects: state.visitedSuspects.length,
    },
  };

  return <GameContext value={value}>{children}</GameContext>;
}

export function useGameState(): GameStore {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGameState must be used within a GameProvider');
  return ctx;
}
