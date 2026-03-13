'use client';

import { useState, useEffect, useCallback } from 'react';

interface GameState {
  collectedClues: string[];
  gridState: Record<string, boolean>;
  visitedSuspects: string[];
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
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Ensure a session ID exists
function ensureSession() {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem('sessionId')) {
    localStorage.setItem('sessionId', crypto.randomUUID());
  }
}

export function useGameState() {
  const [state, setState] = useState<GameState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    ensureSession();
    setState(loadState());
    setHydrated(true);
  }, []);

  const persist = useCallback((next: GameState) => {
    setState(next);
    saveState(next);
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

  return {
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
}
