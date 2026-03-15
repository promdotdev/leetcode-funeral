"use client";

import { useState, useEffect, useCallback } from 'react';
import { EMOTIONS, EMOTION_ORDER, EmotionId } from '@/config/emotions';
import { CharacterFace } from '@/components/CharacterFace';

function pickRandomEmotion(current: EmotionId): EmotionId {
  const others = EMOTION_ORDER.filter(id => id !== current);
  return others[Math.floor(Math.random() * others.length)];
}

export default function EyesPage() {
  const [emotionId, setEmotionId] = useState<EmotionId>(() =>
    EMOTION_ORDER[Math.floor(Math.random() * EMOTION_ORDER.length)]
  );

  const cycle = useCallback(() => {
    setEmotionId(prev => pickRandomEmotion(prev));
  }, []);

  useEffect(() => {
    const interval = setInterval(cycle, 45_000);
    return () => clearInterval(interval);
  }, [cycle]);

  return (
    <div style={{ background: '#0a0a0a', width: '100vw', height: '100vh' }}>
      <CharacterFace emotion={EMOTIONS[emotionId]} />
      <div style={{
        position: 'fixed',
        bottom: 40,
        left: 0,
        right: 0,
        textAlign: 'center',
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        <pre style={{
          display: 'inline-block',
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: 16,
          lineHeight: 1.2,
          color: '#8ACE00',
          textShadow: '0 0 16px rgba(138, 206, 0, 0.5)',
          opacity: 0.85,
          animation: 'ctaPulse 3s ease-in-out infinite',
        }}>{`
  ____ ___  _   _ _____ _____ ____ ____
 / ___/ _ \\| \\ | |  ___| ____/ ___/ ___|
| |  | | | |  \\| | |_  |  _| \\___ \\___ \\
| |__| |_| | |\\  |  _| | |___ ___) |__) |
 \\____\\___/|_| \\_|_|   |_____|____/____/
__   _____  _   _ ____    ____ ___ _   _ ____
\\ \\ / / _ \\| | | |  _ \\  / ___|_ _| \\ | / ___|
 \\ V / | | | | | | |_) | \\___ \\| ||  \\| \\___ \\
  | || |_| | |_| |  _ <   ___) | || |\\  |___) |
  |_| \\___/ \\___/|_| \\_\\ |____/___|_| \\_|____/`.trim()}</pre>
        <div style={{
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: 17,
          letterSpacing: 3,
          color: '#8ACE00',
          opacity: 0.6,
          marginTop: 12,
        }}>prom.dev</div>
        <style>{`@keyframes ctaPulse { 0%,100% { opacity: 0.5; } 50% { opacity: 0.9; } }`}</style>
      </div>
    </div>
  );
}
