'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';

const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%&*+=~;:.,/-';
const CHAR_W = 7.2;
const CHAR_H = 13;
const CYCLE_MS = 6000; // time per receipt

function AsciiBackground() {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const cols = Math.ceil(window.innerWidth / CHAR_W) + 1;
    const rows = Math.ceil(window.innerHeight / CHAR_H) + 1;
    const total = cols * rows;
    const chars = new Array(total);
    for (let i = 0; i < total; i++) {
      chars[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    const render = () => {
      const swaps = Math.floor(total * 0.02);
      for (let s = 0; s < swaps; s++) {
        const idx = Math.floor(Math.random() * total);
        chars[idx] = CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      const lines: string[] = [];
      for (let r = 0; r < rows; r++) {
        lines.push(chars.slice(r * cols, (r + 1) * cols).join(''));
      }
      if (preRef.current) preRef.current.textContent = lines.join('\n');
    };

    render();
    const id = setInterval(render, 150);
    return () => clearInterval(id);
  }, []);

  return (
    <pre
      ref={preRef}
      style={{
        position: 'fixed',
        inset: 0,
        margin: 0,
        padding: 0,
        fontFamily: '"Courier New", monospace',
        fontSize: 19,
        lineHeight: `${CHAR_H}px`,
        letterSpacing: 0,
        color: '#5555',
        opacity: 0.70,
        textShadow: '0 0 8px rgba(204, 34, 34, 0.3)',
        overflow: 'hidden',
        whiteSpace: 'pre',
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

interface Penance {
  id: string;
  name: string;
  sins: string[];
  severity: string;
  penance: string;
  closing: string;
  created_at: string;
}

const SEVERITY_COLORS: Record<string, string> = {
  VENIAL: '#22c55e',
  MORTAL: '#f59e0b',
  CARDINAL: '#ef4444',
  UNFORGIVABLE: '#e11d8f',
};

export default function PenancesDisplayPage() {
  const [penances, setPenances] = useState<Penance[]>([]);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from('penances')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (!error && data) {
      setPenances(data as Penance[]);
    }
    setLoading(false);
  }, []);

  // Initial load + periodic refresh
  useEffect(() => {
    load();
    const interval = setInterval(load, 15000);
    return () => clearInterval(interval);
  }, [load]);

  // Auto-cycle through penances
  useEffect(() => {
    if (penances.length === 0) return;

    const interval = setInterval(() => {
      // Fade out
      setFade(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % penances.length);
        setFade(true);
      }, 400);
    }, CYCLE_MS);

    return () => clearInterval(interval);
  }, [penances.length]);

  const current = penances[index];

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#0a0a0a]" style={{ zIndex: 9999 }}>
      <AsciiBackground />
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: 32,
      }}>
        {/* Title */}
        <div style={{
          fontFamily: '"Space Mono", "Courier New", monospace',
          color: '#cc2222',
          fontSize: 16,
          letterSpacing: 6,
          textTransform: 'uppercase',
          marginBottom: 24,
          opacity: 0.8,
        }}>
          Confession Receipts
        </div>

        {loading ? (
          <div style={{ color: '#cc2222', opacity: 0.5, fontSize: 13, fontFamily: '"Space Mono", monospace' }}>
            Loading confessions...
          </div>
        ) : !current ? (
          <div style={{ color: '#cc2222', opacity: 0.5, fontSize: 13, fontFamily: '"Space Mono", monospace' }}>
            No sinners have confessed yet.
          </div>
        ) : (
          <>
            <div style={{
              transition: 'opacity 0.4s ease, transform 0.4s ease',
              opacity: fade ? 1 : 0,
              transform: fade ? 'translateY(0)' : 'translateY(12px)',
              width: '100%',
              maxWidth: 640,
            }}>
              <Receipt penance={current} />
            </div>

            {/* Counter */}
            <div style={{
              fontFamily: '"Space Mono", monospace',
              color: '#cc2222',
              fontSize: 11,
              letterSpacing: 2,
              marginTop: 20,
              opacity: 0.4,
            }}>
              {index + 1} / {penances.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Receipt({ penance }: { penance: Penance }) {
  const date = new Date(penance.created_at);
  const dateStr = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const severityColor = SEVERITY_COLORS[penance.severity] || '#888';

  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.92)',
        border: '1px solid rgba(255,255,255,0.3)',
        borderRadius: 2,
        fontFamily: 'var(--font-body), "Inter", system-ui, sans-serif',
        fontSize: 18,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: '#222',
        padding: '36px 32px',
        position: 'relative',
        boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
      }}
    >
      {/* Torn edge top */}
      <div style={{
        position: 'absolute',
        top: -1,
        left: 0,
        right: 0,
        height: 4,
        background: 'linear-gradient(135deg, transparent 33.33%, #fefefe 33.33%, #fefefe 66.66%, transparent 66.66%), linear-gradient(225deg, transparent 33.33%, #fefefe 33.33%, #fefefe 66.66%, transparent 66.66%)',
        backgroundSize: '8px 8px',
      }} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <pre style={{ fontFamily: '"Courier New", monospace', fontSize: 8, lineHeight: 1.1, margin: '0 auto 8px', color: '#222', fontWeight: 700 }}>{` _____   _____    ____   __  __
|  __ \\ |  __ \\  / __ \\ |  \\/  |
| |__) || |__) || |  | || \\  / |
|  ___/ |  _  / | |  | || |\\/| |
| |     | | \\ \\ | |__| || |  | |
|_|     |_|  \\_\\ \\____/ |_|  |_|`}</pre>
        <div style={{ fontSize: 13, color: '#888', letterSpacing: 4 }}>THE GHOST OF LEETCODE</div>
        <div style={{ fontSize: 13, color: '#888', letterSpacing: 4 }}>CONFESSION RECEIPT</div>
      </div>

      <div style={{ borderTop: '1px dashed #ccc', margin: '10px 0' }} />

      {/* Sinner info */}
      <div style={{ marginBottom: 4 }}>
        <span style={{ color: '#888', fontWeight: 400, fontSize: 14 }}>SINNER: </span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>{(penance.name || 'UNKNOWN').toUpperCase()}</span>
      </div>
      <div style={{ fontSize: 13, color: '#888', fontWeight: 400, marginBottom: 12 }}>
        {dateStr} &nbsp; {timeStr}
      </div>

      <div style={{ borderTop: '1px dashed #ccc', margin: '10px 0' }} />

      {/* Sins */}
      <div style={{ textAlign: 'center', fontSize: 13, color: '#888', letterSpacing: 4, marginBottom: 10, fontWeight: 400 }}>
        --- SINS COMMITTED ---
      </div>
      <div style={{ marginBottom: 10 }}>
        {penance.sins.map((sin, i) => (
          <div key={i} style={{ marginBottom: 3, paddingLeft: 6 }}>
            {i + 1}. {sin}
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px dashed #ccc', margin: '10px 0' }} />

      {/* Severity */}
      <div style={{ textAlign: 'center', marginBottom: 10 }}>
        <span style={{
          display: 'inline-block',
          padding: '5px 16px',
          border: `2px solid ${severityColor}`,
          color: severityColor,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 3,
          borderRadius: 2,
        }}>
          {penance.severity}
        </span>
      </div>

      <div style={{ borderTop: '1px dashed #ccc', margin: '10px 0' }} />

      {/* Penance */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: '#888', marginBottom: 4, fontWeight: 400 }}>PENANCE PRESCRIBED:</div>
        <div>{penance.penance}</div>
      </div>

      <div style={{ borderTop: '1px dashed #ccc', margin: '10px 0' }} />

      {/* Closing */}
      <div style={{ fontStyle: 'italic', color: '#555', marginBottom: 10 }}>
        &ldquo;{penance.closing}&rdquo;
      </div>

      <div style={{ borderTop: '1px solid #ccc', margin: '10px 0' }} />

      <div style={{ textAlign: 'center', fontSize: 11, letterSpacing: 4, color: '#888', fontWeight: 400 }}>
        MAY YOUR CODE COMPILE.
      </div>

      {/* Torn edge bottom */}
      <div style={{
        position: 'absolute',
        bottom: -1,
        left: 0,
        right: 0,
        height: 4,
        background: 'linear-gradient(315deg, transparent 33.33%, #fefefe 33.33%, #fefefe 66.66%, transparent 66.66%), linear-gradient(45deg, transparent 33.33%, #fefefe 33.33%, #fefefe 66.66%, transparent 66.66%)',
        backgroundSize: '8px 8px',
      }} />
    </div>
  );
}
