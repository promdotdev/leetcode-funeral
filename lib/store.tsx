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

const GameContext = createContext<GameStore | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(defaultState);
  const [hydrated, setHydrated] = useState(false);
  // Queue mutations that arrive before hydration (e.g. markVisited in useEffect)
  const pendingVisits = useRef<string[]>([]);
  const isHydrated = useRef(false);

  useEffect(() => {
    if (!localStorage.getItem('sessionId')) {
      localStorage.setItem('sessionId', crypto.randomUUID());
    }
    const loaded = loadState();
    // Apply any visits that were queued before hydration
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
        return next;
      });
    },
    []
  );

  const markVisited = useCallback((suspectId: string) => {
    if (!isHydrated.current) {
      // Queue it — will be merged when hydration completes
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
