// PhaseStrip — migrated from Section2() in knowledge-atom/assets/components.jsx
// Scroll-jacked 6-phase horizontal strip with per-phase smoothstep easing.
// Below 1100px: vertical stack with sticky scrubber (no scroll-jack).

import { useState, useEffect, useRef } from 'react';
import { PHASES, type Phase, type TranscriptTurn } from '../data/phases';

// ─── helpers ────────────────────────────────────────────────────────────────

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function initials(turn: TranscriptTurn): string {
  if (turn.who === 'agent') return 'BA';
  if (turn.who === 'sys') return '◇';
  if (turn.who === 'doc') return '¶';
  return (turn.speaker || 'SME')
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function roleLabel(who: TranscriptTurn['who']): string {
  if (who === 'agent') return 'agent';
  if (who === 'sys') return 'system';
  if (who === 'doc') return 'draft';
  return 'sme';
}

function fakeTimestamp(i: number): string {
  return `00:0${i}:${String(i * 7 + 11).padStart(2, '0')}`;
}

// ─── sub-components ─────────────────────────────────────────────────────────

interface PhaseCardProps {
  phase: Phase;
  isActive: boolean;
  isDone: boolean;
}

function PhaseCard({ phase, isActive, isDone }: PhaseCardProps) {
  return (
    <article className={`phase ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}>
      <header className="phase-head">
        <div className="phase-pin">
          <div className="phase-pin-dot" />
        </div>
        <div className="phase-meta">
          <div className="phase-num">
            <span className="roman serif">{phase.roman}.</span>
            <span className="small">Phase {phase.arabic} of 06</span>
          </div>
          <h3 className="phase-name serif">
            {phase.name.lead} <em>{phase.name.em}</em>
          </h3>
          <p className="phase-deck">{phase.deck}</p>
        </div>
      </header>

      <div className="split">
        {/* Left: transcript */}
        <div className="col">
          <div className="col-head">
            <div className="col-head-l">
              <span>conversation</span>
              <span className="filename">phase_{phase.arabic}.transcript</span>
            </div>
            <div className="col-head-r">
              <span className="pulse" />
              <span>recording</span>
            </div>
          </div>
          <div className="transcript">
            {phase.transcript.map((t, i) => (
              <div key={i} className={`turn ${t.who}`}>
                <div className="turn-avatar">{initials(t)}</div>
                <div className="turn-stack">
                  <div className="turn-meta">
                    <span className="speaker">{t.speaker}</span>
                    <span className="role-badge">{roleLabel(t.who)}</span>
                    <span className="timestamp">{fakeTimestamp(i)}</span>
                  </div>
                  <div className="turn-bubble">{t.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="split-rule" />

        {/* Right: schema + callout */}
        <div className="col">
          <div className="col-head">
            <div className="col-head-l">
              <span>schema</span>
              <span className="filename">atm_0191.json</span>
            </div>
            <div className="col-head-r" style={{ color: 'var(--signal)' }}>
              {phase.fields.length} fields
            </div>
          </div>
          <div className="schema">
            <div className="schema-bracket">{'{'}</div>
            {phase.fields.map((f, i) => (
              <div key={i} className={`field populated ${f.highlight ? 'flash' : ''}`}>
                <span className="field-key">{f.key}</span>
                <span className={`field-val ${f.type}`}>{f.val}</span>
              </div>
            ))}
            <div className="schema-bracket">{'}'}</div>
          </div>
          <div className="callout">
            <div className="callout-num">{phase.callout.num}</div>
            <div className="callout-text">{phase.callout.text}</div>
          </div>
        </div>
      </div>
    </article>
  );
}

interface ScrubberProps {
  active: number;
  goTo: (i: number) => void;
  total: number;
}

function Scrubber({ active, goTo, total }: ScrubberProps) {
  return (
    <div className="scrubber">
      <button
        className="scrubber-btn"
        onClick={() => goTo(Math.max(0, active - 1))}
        disabled={active === 0}
      >
        ← Prev
      </button>
      <div className="scrubber-counter">
        <span className="cur">{String(active + 1).padStart(2, '0')}</span> /{' '}
        {String(total).padStart(2, '0')}
      </div>
      <div className="scrubber-track">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            className={`scrubber-tick ${i === active ? 'active' : ''} ${i < active ? 'done' : ''}`}
            style={{ left: `${(i / (total - 1)) * 100}%` }}
            onClick={() => goTo(i)}
          >
            <span className="scrubber-tick-label">{PHASES[i].roman}</span>
          </button>
        ))}
      </div>
      <button
        className="scrubber-btn primary"
        onClick={() => goTo(Math.min(total - 1, active + 1))}
        disabled={active === total - 1}
      >
        Next →
      </button>
    </div>
  );
}

// ─── main export ─────────────────────────────────────────────────────────────

export default function PhaseStrip() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [phaseWidth, setPhaseWidth] = useState(1240);
  const [isMobile, setIsMobile] = useState(false);

  const outerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  // Measure phase card width + detect mobile breakpoint
  useEffect(() => {
    const measure = () => {
      const first = stripRef.current?.querySelector<HTMLElement>('.phase');
      if (first) setPhaseWidth(first.offsetWidth);
      setIsMobile(window.innerWidth < 1100);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Scroll-jack listener (desktop only)
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer || isMobile) return;

    let raf: number;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = outer.getBoundingClientRect();
        const total = outer.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const rawP = total > 0 ? scrolled / total : 0;

        // Per-phase smoothstep easing
        const phaseCount = PHASES.length;
        const phaseIdx = Math.floor(rawP * phaseCount);
        const clampedIdx = Math.min(phaseCount - 1, phaseIdx);
        const phaseLocalT = rawP * phaseCount - phaseIdx;
        const easedLocal = smoothstep(Math.min(1, Math.max(0, phaseLocalT)));
        const p = (clampedIdx + easedLocal) / phaseCount;

        setProgress(p);
        const idx = Math.min(phaseCount - 1, Math.floor(rawP * phaseCount));
        setActive(idx);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  const goTo = (idx: number) => {
    const outer = outerRef.current;
    if (!outer) return;
    const total = outer.offsetHeight - window.innerHeight;
    const target = outer.offsetTop + (idx / PHASES.length) * total + 4;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const innerWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const translateX = -progress * (PHASES.length * phaseWidth - innerWidth);
  const safeTranslate = Math.min(0, translateX);

  // ── mobile: vertical stack ────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="phase-strip-mobile">
        <Scrubber active={active} goTo={(i) => setActive(i)} total={PHASES.length} />
        <div className="phase-strip-mobile-cards">
          {PHASES.map((p, i) => (
            <PhaseCard
              key={p.id}
              phase={p}
              isActive={i === active}
              isDone={i < active}
            />
          ))}
        </div>
      </div>
    );
  }

  // ── desktop: scroll-jacked horizontal strip ───────────────────────────────
  return (
    <div className="phase-strip-outer" ref={outerRef}>
      <div className="phase-strip-sticky">
        <div className="phase-strip-viewport">
          <div
            className="phase-strip"
            ref={stripRef}
            style={{ transform: `translate3d(${safeTranslate}px, 0, 0)` }}
          >
            <div className="phase-rail" />
            <div className="phase-rail-fill" style={{ width: `${progress * 100}%` }} />
            {PHASES.map((p, i) => (
              <PhaseCard
                key={p.id}
                phase={p}
                isActive={i === active}
                isDone={i < active}
              />
            ))}
          </div>
        </div>
        <Scrubber active={active} goTo={goTo} total={PHASES.length} />
      </div>
    </div>
  );
}
