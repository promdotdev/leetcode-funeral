"use client";

import { useEffect, useRef, useState, useMemo } from 'react';
import { Emotion, CHAR_POOL } from '@/config/emotions';

// Character dimensions for 12px Courier New
const CHAR_W = 7.2;
const CHAR_H = 13;

// Max hash table size — allocate once, slice as needed
const MAX_CELLS = 400 * 200;
const CELL_HASH = Float32Array.from({ length: MAX_CELLS }, (_, i) => {
  const v = Math.sin(i * 127.1 + 43758.5) * 43758.5453;
  return v - Math.floor(v);
});

function calcGrid() {
  if (typeof window === 'undefined') return { cols: 200, rows: 65 };
  const cols = Math.ceil(window.innerWidth / CHAR_W) + 1;
  const rows = Math.ceil(window.innerHeight / CHAR_H) + 1;
  return { cols, rows };
}

// Eye center positions and sizes are defined as offsets from grid center.
type EyeDef = {
  cyOff: number; cxOff: number; a: number; b: number;
  angle?: number; upper?: number; lower?: number;
};
type EyeDefPair = [EyeDef, EyeDef];

const EYES_DEF: Record<string, EyeDefPair> = {
  neutral: [
    { cyOff: -1, cxOff: -23, a: 15, b: 4.5, angle:  0.0, upper: 1.0, lower: 1.0 },
    { cyOff: -1, cxOff:  23, a: 15, b: 4.5, angle:  0.0, upper: 1.0, lower: 1.0 },
  ],
  exhausted: [
    { cyOff:  1,  cxOff: -23, a: 16, b: 1.6, angle:  0.06, upper: 0.4, lower: 1.2 },
    { cyOff:  1,  cxOff:  23, a: 16, b: 1.6, angle: -0.06, upper: 0.4, lower: 1.2 },
  ],
  alert: [
    { cyOff: -2, cxOff: -24, a: 15, b: 7.0, angle:  0.08, upper: 1.3, lower: 1.2 },
    { cyOff: -2, cxOff:  24, a: 15, b: 7.0, angle: -0.08, upper: 1.3, lower: 1.2 },
  ],
  anxious: [
    { cyOff: -1, cxOff: -23, a: 15, b: 5.0, angle: -0.05, upper: 1.1, lower: 0.9 },
    { cyOff:  0, cxOff:  24, a: 14, b: 4.2, angle:  0.04, upper: 1.0, lower: 0.9 },
  ],
  hostile: [
    { cyOff:  0, cxOff: -22, a: 18, b: 3.5, angle:  0.38, upper: 0.3, lower: 1.8 },
    { cyOff:  0, cxOff:  22, a: 18, b: 3.5, angle: -0.38, upper: 0.3, lower: 1.8 },
  ],
  melancholy: [
    { cyOff: -2, cxOff: -23, a: 15, b: 5.5, angle: -0.08, upper: 1.0, lower: 1.1 },
    { cyOff: -2, cxOff:  23, a: 15, b: 5.5, angle:  0.08, upper: 1.0, lower: 1.1 },
  ],
};

type Eye = {
  cy: number; cx: number; a: number; b: number;
  angle?: number; upper?: number; lower?: number;
};
type PreparedEye = Eye & { cos: number; sin: number };
type EyePair = [Eye, Eye];

function resolveEyes(def: EyeDefPair, cols: number, rows: number): EyePair {
  const cx = cols / 2;
  const cy = rows / 2;
  return def.map(d => ({
    cy: cy + d.cyOff,
    cx: cx + d.cxOff,
    a: d.a,
    b: d.b,
    angle: d.angle,
    upper: d.upper,
    lower: d.lower,
  })) as EyePair;
}

function prepareEye(eye: Eye): PreparedEye {
  const a = eye.angle ?? 0;
  return { ...eye, cos: Math.cos(a), sin: Math.sin(a) };
}

function posNoise(row: number, col: number, seed: number): number {
  return (
    Math.sin(col * 1.7  + row * 2.3  + seed) +
    Math.sin(col * 0.9  - row * 3.1  + seed * 0.7) +
    Math.sin(col * 3.1  + row * 0.7  - seed * 1.2)
  ) * 0.13;
}

function eyeRadial(row: number, col: number, eye: PreparedEye): number {
  if (eye.b <= 0.01) return 0;
  const dx = col - eye.cx;
  const dy = row - eye.cy;
  const nx = (dx * eye.cos + dy * eye.sin) / eye.a;
  const ny = (-dx * eye.sin + dy * eye.cos) / eye.b;
  return Math.pow(Math.max(0, 1 - (nx * nx + ny * ny) * 0.7), 1.4);
}

function eyeWeight(row: number, col: number, eye: PreparedEye, seed: number, time: number): number {
  if (eye.b <= 0.01) return 0;
  const dx = col - eye.cx;
  const dy = row - eye.cy;
  const nx = (dx * eye.cos + dy * eye.sin) / eye.a;
  const ny = (-dx * eye.sin + dy * eye.cos) / eye.b;

  const baseCurve = 1 - nx * nx;
  const noise = posNoise(row, col, seed) * 0.38;

  const halfScale = ny <= 0 ? (eye.upper ?? 1.0) : (eye.lower ?? 0.7);
  const almondLimit = baseCurve * halfScale + noise;
  const innerDist = almondLimit - Math.abs(ny);

  const core = Math.max(0, Math.min(1, innerDist * 2.8 + 0.72));
  const outerDist = -innerDist;
  let scatter = 0;
  if (outerDist > 0 && outerDist < 2.5) {
    const base = Math.pow(1 - outerDist / 2.5, 2.2) * 0.32;
    const upBias = dy < 0 ? 1.8 : 0.6;
    scatter = base * upBias;
  }

  let flame = 0;
  if (dy < -eye.b * 0.3) {
    const rise = -(dy + eye.b * 0.3);
    const maxRise = 22;
    if (rise < maxRise) {
      const flameWidth = eye.a * 0.5 * (1 - rise / maxRise * 0.7);
      const flameNoise = (
        Math.sin(col * 0.8 + time * 3.5 + row * 0.3) +
        Math.sin(col * 1.3 - time * 2.1 + row * 0.7) +
        Math.sin(row * 1.1 + time * 4.0)
      ) * 2.5;
      const xDist = Math.abs(dx + flameNoise);
      if (xDist < flameWidth) {
        const fadeUp = Math.pow(1 - rise / maxRise, 1.6);
        const fadeX = 1 - xDist / flameWidth;
        flame = fadeUp * fadeX * 0.55;
      }
    }
  }

  return core + scatter + flame;
}

function randomChar(): string {
  return CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)];
}

function lerpEye(a: Eye, b: Eye, t: number): Eye {
  return {
    cy:    a.cy    + (b.cy    - a.cy)    * t,
    cx:    a.cx    + (b.cx    - a.cx)    * t,
    a:     a.a     + (b.a     - a.a)     * t,
    b:     a.b     + (b.b     - a.b)     * t,
    angle: (a.angle ?? 0) + ((b.angle ?? 0) - (a.angle ?? 0)) * t,
    upper: (a.upper ?? 1.0) + ((b.upper ?? 1.0) - (a.upper ?? 1.0)) * t,
    lower: (a.lower ?? 0.7) + ((b.lower ?? 0.7) - (a.lower ?? 0.7)) * t,
  };
}

type Tear = { cx: number; row: number };

const OPACITY_BANDS = [1.0, 0.65, 0.35, 0.15] as const;
const RADIAL_THRESHOLDS = [0.7, 0.4, 0.15, 0] as const;

export function CharacterFace({ emotion, isSpeaking = false }: { emotion: Emotion; isSpeaking?: boolean }) {
  const [grid, setGrid] = useState(calcGrid);
  const { cols, rows } = grid;
  const total = cols * rows;

  useEffect(() => {
    const onResize = () => setGrid(calcGrid());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const getEyes = (id: string): EyePair =>
    resolveEyes(EYES_DEF[id] ?? EYES_DEF.melancholy, cols, rows);

  const [chars, setChars] = useState<string[]>(() =>
    Array.from({ length: total }, () => randomChar())
  );

  useEffect(() => {
    setChars(prev => {
      if (prev.length === total) return prev;
      if (prev.length < total) {
        return [...prev, ...Array.from({ length: total - prev.length }, () => randomChar())];
      }
      return prev.slice(0, total);
    });
  }, [total]);

  const [displayEyes, setDisplayEyes] = useState<EyePair>(() => getEyes(emotion.id));
  const displayEyesRef = useRef(displayEyes);
  displayEyesRef.current = displayEyes;

  const physicsRef = useRef({ x: 0, y: 0, vx: 0.4, vy: 0.3 });
  const wanderTargetRef = useRef({ x: 0, y: 0 });
  const isSpeakingRef = useRef(isSpeaking);
  isSpeakingRef.current = isSpeaking;

  const [flameTime, setFlameTime] = useState(0);
  const [eyeOpen, setEyeOpen] = useState(1);
  const [scanDx, setScanDx] = useState(0);
  const [twitchOff, setTwitchOff] = useState({ dx: 0, dy: 0 });
  const [tears, setTears] = useState<Tear[]>([]);

  const emotionRef = useRef(emotion);
  emotionRef.current = emotion;

  const gridRef = useRef(grid);
  gridRef.current = grid;

  const targetEyes = useMemo((): EyePair => {
    const [L, R] = getEyes(emotion.id);
    if (emotion.id === 'exhausted')
      return [{ ...L, b: L.b * eyeOpen }, { ...R, b: R.b * eyeOpen }];
    if (emotion.id === 'alert')
      return [{ ...L, cx: L.cx + scanDx }, { ...R, cx: R.cx + scanDx }];
    if (emotion.id === 'anxious')
      return [
        { ...L, cx: L.cx + twitchOff.dx, cy: L.cy + twitchOff.dy },
        { ...R, cx: R.cx + twitchOff.dx, cy: R.cy + twitchOff.dy },
      ];
    return [L, R];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emotion.id, eyeOpen, scanDx, twitchOff, cols, rows]);

  const targetEyesRef = useRef(targetEyes);
  targetEyesRef.current = targetEyes;

  useEffect(() => {
    const interval = setInterval(() => {
      const t = Date.now() / 1000;

      const driftX = Math.sin(t * 0.21) * 1.5 + Math.sin(t * 0.53) * 0.8 + Math.sin(t * 1.1) * 0.4;
      const driftY = Math.sin(t * 0.29) * 0.8 + Math.sin(t * 0.67) * 0.5;
      const eyeSpread = Math.sin(t * 0.37) * 1.5;
      const breathe = Math.sin(t / 2.2) * 0.20;

      const ph = physicsRef.current;
      const wt = wanderTargetRef.current;
      ph.vx += (wt.x - ph.x) * 0.005;
      ph.vy += (wt.y - ph.y) * 0.005;
      ph.vx *= 0.97;
      ph.vy *= 0.97;
      const spd = Math.hypot(ph.vx, ph.vy);
      if (spd > 1.5) { ph.vx = ph.vx / spd * 1.5; ph.vy = ph.vy / spd * 1.5; }
      ph.x += ph.vx;
      ph.y += ph.vy;

      if (Math.hypot(wt.x - ph.x, wt.y - ph.y) < 3) {
        const g = gridRef.current;
        const range = isSpeakingRef.current ? 0.2 : 0.04;
        wanderTargetRef.current = {
          x: (Math.random() - 0.5) * g.cols * range,
          y: (Math.random() - 0.5) * g.rows * range,
        };
      }

      setDisplayEyes(prev => {
        const tgt = targetEyesRef.current;
        return [
          lerpEye(prev[0], {
            ...tgt[0],
            cx: tgt[0].cx + driftX - eyeSpread + ph.x,
            cy: tgt[0].cy + driftY + ph.y,
            b: tgt[0].b + breathe,
          }, 0.1),
          lerpEye(prev[1], {
            ...tgt[1],
            cx: tgt[1].cx + driftX + eyeSpread + ph.x,
            cy: tgt[1].cy + driftY + ph.y,
            b: tgt[1].b + breathe,
          }, 0.1),
        ];
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlameTime(Date.now() / 1000);
      setChars(prev => {
        const next = [...prev];
        const len = next.length;
        for (let i = 0; i < len; i++) {
          if (Math.random() < 0.12) next[i] = randomChar();
        }
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (emotion.id !== 'exhausted') { setEyeOpen(1); return; }
    let cancelled = false;
    const blink = () => {
      if (cancelled) return;
      setTimeout(() => {
        if (cancelled) return;
        setEyeOpen(0);
        setTimeout(() => { if (!cancelled) { setEyeOpen(1); blink(); } }, 180);
      }, 2500 + Math.random() * 2000);
    };
    blink();
    return () => { cancelled = true; };
  }, [emotion.id]);

  useEffect(() => {
    if (emotion.id !== 'alert') { setScanDx(0); return; }
    let cancelled = false;
    const scan = () => {
      if (cancelled) return;
      setTimeout(() => {
        if (cancelled) return;
        setScanDx(prev => {
          const opts = [-8, -5, -3, 0, 3, 5, 8].filter(v => v !== prev);
          return opts[Math.floor(Math.random() * opts.length)];
        });
        scan();
      }, 700 + Math.random() * 900);
    };
    scan();
    return () => { cancelled = true; };
  }, [emotion.id]);

  useEffect(() => {
    if (emotion.id !== 'anxious') { setTwitchOff({ dx: 0, dy: 0 }); return; }
    const interval = setInterval(() => {
      setTwitchOff({
        dx: Math.floor(Math.random() * 5) - 2,
        dy: Math.random() < 0.35 ? (Math.random() < 0.5 ? -1 : 1) : 0,
      });
    }, 220);
    return () => clearInterval(interval);
  }, [emotion.id]);

  useEffect(() => {
    if (emotion.id !== 'melancholy') { setTears([]); return; }
    const spawn = setInterval(() => {
      const eyes = displayEyesRef.current;
      const eye = Math.random() < 0.5 ? eyes[0] : eyes[1];
      const cx = Math.round(eye.cx);
      const cy = Math.round(eye.cy + (eye.b ?? 4));
      setTears(prev => [...prev, { cx, row: cy }]);
    }, 1400);
    const fall = setInterval(() => {
      setTears(prev =>
        prev.map(t => ({ ...t, row: t.row + 1 })).filter(t => t.row < rows)
      );
    }, 150);
    return () => { clearInterval(spawn); clearInterval(fall); };
  }, [emotion.id, cols, rows]);

  const tearSet = useMemo(() => {
    const s = new Set<number>();
    tears.forEach(({ cx, row }) => {
      s.add(row * cols + cx);
      s.add(row * cols + cx - 1);
    });
    return s;
  }, [tears, cols]);

  const bgLines = useMemo(() =>
    Array.from({ length: rows }, (_, row) =>
      chars.slice(row * cols, (row + 1) * cols).join('')
    ),
  [chars, cols, rows]);

  const eyeBands = useMemo(() => {
    const LP = prepareEye(displayEyes[0]);
    const RP = prepareEye(displayEyes[1]);
    const cellData = new Float32Array(rows * cols);
    const cellOn = new Uint8Array(rows * cols);
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const idx = row * cols + col;
        const w = Math.min(1, eyeWeight(row, col, LP, 0, flameTime) + eyeWeight(row, col, RP, 1, flameTime));
        const isTear = tearSet.has(idx);
        if (isTear || w > CELL_HASH[idx]) {
          cellOn[idx] = 1;
          const rL = eyeRadial(row, col, LP);
          const rR = eyeRadial(row, col, RP);
          cellData[idx] = isTear ? 1 : Math.max(rL, rR);
        }
      }
    }
    return OPACITY_BANDS.map((_: number, bandIdx: number) => {
      const lo = RADIAL_THRESHOLDS[bandIdx];
      const hi = bandIdx === 0 ? Infinity : RADIAL_THRESHOLDS[bandIdx - 1];
      return Array.from({ length: rows }, (__, row) => {
        let line = '';
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col;
          if (cellOn[idx] && cellData[idx] >= lo && cellData[idx] < hi) {
            line += chars[idx];
          } else {
            line += ' ';
          }
        }
        return line;
      });
    });
  }, [displayEyes, tearSet, chars, cols, rows, flameTime]);

  const basePreStyle: React.CSSProperties = {
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '12px',
    lineHeight: '13px',
    letterSpacing: '0',
    margin: 0,
    padding: 0,
    userSelect: 'none',
    whiteSpace: 'pre',
    position: 'fixed',
    inset: 0,
    overflow: 'hidden',
    transition: 'color 0.8s ease, text-shadow 0.8s ease',
  };

  return (
    <>
      <pre suppressHydrationWarning style={{ ...basePreStyle, color: emotion.colors.accent, opacity: 0.10 }}>
        {bgLines.join('\n')}
      </pre>
      {eyeBands.map((bandLines, i) => (
        <pre key={i} suppressHydrationWarning style={{
          ...basePreStyle,
          color: emotion.colors.accent,
          opacity: OPACITY_BANDS[i],
          textShadow: i === 0 ? `0 0 8px ${emotion.colors.glow}` : 'none',
        }}>
          {bandLines.join('\n')}
        </pre>
      ))}
    </>
  );
}
