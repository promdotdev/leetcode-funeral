'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';

const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%&*+=~;:.,/-';
const CHAR_W = 7.2;
const CHAR_H = 13;

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
      // Swap ~5% of chars each frame
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

export default function PenancesPage() {
  const [penances, setPenances] = useState<Penance[]>([]);
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

  useEffect(() => {
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, [load]);

  return (
    <div className="fixed inset-0 overflow-auto bg-[#0a0a0a]" style={{ padding: 16, zIndex: 9999 }}>
      <AsciiBackground />
      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          textAlign: 'center',
          fontFamily: 'var(--font-body), "Inter", system-ui, sans-serif',
          color: '#cc2222',
          fontSize: 14,
          letterSpacing: 4,
          padding: '16px 0 8px',
          textTransform: 'uppercase',
          opacity: 0.8,
        }}>
          Confession Receipts
        </div>

        {loading ? (
          <div className="p-6 text-center text-[12px] text-black/50">
            Loading confessions...
          </div>
        ) : penances.length === 0 ? (
          <div className="p-6 text-center text-[12px] text-black/50">
            No sinners have confessed yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {penances.map((p) => (
              <Receipt key={p.id} penance={p} />
            ))}
          </div>
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
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: '#222',
        padding: '20px 16px',
        position: 'relative',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      {/* Torn edge effect top */}
      <div style={{
        position: 'absolute',
        top: -1,
        left: 0,
        right: 0,
        height: 4,
        background: 'linear-gradient(135deg, transparent 33.33%, #fefefe 33.33%, #fefefe 66.66%, transparent 66.66%), linear-gradient(225deg, transparent 33.33%, #fefefe 33.33%, #fefefe 66.66%, transparent 66.66%)',
        backgroundSize: '8px 8px',
        backgroundPosition: '0 0',
      }} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: 4, marginBottom: 2 }}>PROM</div>
        <div style={{ fontSize: 9, color: '#888', letterSpacing: 2 }}>THE GHOST OF LEETCODE</div>
        <div style={{ fontSize: 9, color: '#888', letterSpacing: 2 }}>CONFESSION RECEIPT</div>
      </div>

      <div style={{ borderTop: '1px dashed #ccc', margin: '8px 0' }} />

      {/* Sinner info */}
      <div style={{ marginBottom: 4 }}>
        <span style={{ color: '#888' }}>SINNER: </span>
        <span style={{ fontWeight: 700 }}>{(penance.name || 'UNKNOWN').toUpperCase()}</span>
      </div>
      <div style={{ fontSize: 10, color: '#888', marginBottom: 8 }}>
        {dateStr} &nbsp; {timeStr}
      </div>

      <div style={{ borderTop: '1px dashed #ccc', margin: '8px 0' }} />

      {/* Sins */}
      <div style={{ textAlign: 'center', fontSize: 10, color: '#888', letterSpacing: 2, marginBottom: 6 }}>
        --- SINS COMMITTED ---
      </div>
      <div style={{ marginBottom: 8 }}>
        {penance.sins.map((sin, i) => (
          <div key={i} style={{ marginBottom: 2, paddingLeft: 4 }}>
            {i + 1}. {sin}
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px dashed #ccc', margin: '8px 0' }} />

      {/* Severity */}
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <span style={{
          display: 'inline-block',
          padding: '4px 12px',
          border: `1px solid ${severityColor}`,
          color: severityColor,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: 2,
          borderRadius: 2,
        }}>
          {penance.severity}
        </span>
      </div>

      <div style={{ borderTop: '1px dashed #ccc', margin: '8px 0' }} />

      {/* Penance */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 10, color: '#888', marginBottom: 4 }}>PENANCE PRESCRIBED:</div>
        <div>{penance.penance}</div>
      </div>

      <div style={{ borderTop: '1px dashed #ccc', margin: '8px 0' }} />

      {/* Closing */}
      <div style={{ fontStyle: 'italic', color: '#555', marginBottom: 8 }}>
        &ldquo;{penance.closing}&rdquo;
      </div>

      <div style={{ borderTop: '1px solid #ccc', margin: '8px 0' }} />

      <div style={{ textAlign: 'center', fontSize: 10, letterSpacing: 3, color: '#888' }}>
        MAY YOUR CODE COMPILE.
      </div>

      {/* Torn edge effect bottom */}
      <div style={{
        position: 'absolute',
        bottom: -1,
        left: 0,
        right: 0,
        height: 4,
        background: 'linear-gradient(315deg, transparent 33.33%, #fefefe 33.33%, #fefefe 66.66%, transparent 66.66%), linear-gradient(45deg, transparent 33.33%, #fefefe 33.33%, #fefefe 66.66%, transparent 66.66%)',
        backgroundSize: '8px 8px',
        backgroundPosition: '0 0',
      }} />
    </div>
  );
}
