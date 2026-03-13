'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react';

interface GameState {
  collectedClues: string[];
  gridState: Record<string, boolean>;
  visitedSuspects: string[];
}

interface GameStore {
  hydrated: boolean;
  collectedClues: string[];
  gridState: Record<string, boolean>;
  visitedSuspects: string[];
  collectClue: (clueId: string, aboutSuspectId: string, dimension: string, value: boolean) => void;
  markVisited: (suspectId: string) => void;
  isClueCollected: (clueId: string) => boolean;
  isComplete: boolean;
  progress: { clues: number; suspects: number };
}

const STORAGE_KEY = 'murder-mystery-state';

const defaultState: GameState = {
  collectedClues: [],
  gridState: {},
  visitedSuspects: [],
};

function loadState(): GameState {
  if (typeof window === 'undefined') return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return JSON.parse(raw) as GameState;
  } catch {
    return defaultState;
  }
}

function saveState(state: GameState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function ensureSession() {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem('sessionId')) {
    localStorage.setItem('sessionId', crypto.randomUUID());
  }
}

const GameContext = createContext<GameStore | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  // Use lazy initializer so state is correct from the very first client render.
  // On the server this returns defaultState; on the client it reads localStorage.
  const [state, setState] = useState<GameState>(() => loadState());
  const [hydrated, setHydrated] = useState(false);
  const hydratedRef = useRef(false);

  useEffect(() => {
    ensureSession();
    hydratedRef.current = true;
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
        return next;
      });
    },
    []
  );

  const markVisited = useCallback((suspectId: string) => {
    setState((prev) => {
      if (prev.visitedSuspects.includes(suspectId)) return prev;
      const next: GameState = {
        ...prev,
        visitedSuspects: [...prev.visitedSuspects, suspectId],
      };
      saveState(next);
      return next;
    });
  }, []);

  const isClueCollected = useCallback(
    (clueId: string) => state.collectedClues.includes(clueId),
    [state.collectedClues]
  );

  const value: GameStore = {
    hydrated,
    collectedClues: state.collectedClues,
    gridState: state.gridState,
    visitedSuspects: state.visitedSuspects,
    collectClue,
    markVisited,
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
