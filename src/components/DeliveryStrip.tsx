// DeliveryStrip — migrated from Section3Learner() + LearnerRightCol() in
// knowledge-atom/The Knowledge Atom v2.html.
// Scroll-jacked 4-phase horizontal strip — same mechanic as PhaseStrip
// (per-phase smoothstep easing, sticky inner, 1100px mobile fallback).
// Left column: learner transcript. Right column: LearnerRightCol (varies by phase).

import { useState, useEffect, useRef, type CSSProperties } from 'react';
import { LEARNER_PHASES, type LearnerPhase, type LearnerTurn } from '../data/learner-phases';

// ─── helpers ────────────────────────────────────────────────────────────────

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function initials(who: LearnerTurn['who']): string {
  if (who === 'lagent') return 'LA';
  if (who === 'sys') return '◇';
  return 'DL';
}

function roleLabel(who: LearnerTurn['who']): string {
  if (who === 'lagent') return 'agent';
  if (who === 'sys') return 'system';
  return 'learner';
}

// ─── right-column panel ─────────────────────────────────────────────────────

interface ScenarioCardProps {
  status: string;
}

function ScenarioCard({ status }: ScenarioCardProps) {
  return (
    <div className="scenario-card">
      <div className="scenario-card-head">
        <span>Scenario · atm_0191</span>
        <span>{status}</span>
      </div>
      <div className="scenario-body">
        <strong>It's Tuesday afternoon.</strong> Queue: 14 tickets. A customer calls —
        card declined at a restaurant. Account shows no fraud alerts. Decline cause:
        expired card.
        <div className="scenario-q">
          <span>Q1. Which severity tier does this fall into?</span>
          <span>Q2. What is your first action?</span>
        </div>
      </div>
    </div>
  );
}

interface SkillGapProps {
  compact?: boolean;
  showAssigned?: boolean;
}

function SkillGap({ compact, showAssigned }: SkillGapProps) {
  return (
    <div className="schema" style={compact ? { fontSize: 11 } : undefined}>
      <div className="schema-bracket">{'{'}</div>
      <div className="field populated">
        <span className="field-key">skill_id</span>
        <span className="field-val str">skl_0044 · Tier-1 Escalation</span>
      </div>
      <div className="field populated">
        <span className="field-key">current_level</span>
        <span className="field-val" style={{ color: 'var(--paper-fade)' }}>1</span>
      </div>
      <div className="field populated">
        <span className="field-key">expected_level</span>
        <span className="field-val" style={{ color: 'var(--amber)' }}>3 · role requirement</span>
      </div>
      <div className="field populated">
        <span className="field-key">escalation_rate</span>
        <span className="field-val" style={{ color: 'var(--warn)' }}>23% above median</span>
      </div>
      {showAssigned && (
        <div className="field populated" style={{ borderLeftColor: 'var(--signal)' }}>
          <span className="field-key">assigned_atom</span>
          <span className="field-val" style={{ color: 'var(--signal)' }}>atm_0191</span>
        </div>
      )}
      <div className="schema-bracket">{'}'}</div>
    </div>
  );
}

const progressOptionStyle: CSSProperties = {
  padding: '7px 12px',
  border: '1px solid var(--rule-2)',
  background: 'var(--ink-3)',
  fontFamily: 'var(--mono)',
  fontSize: 11,
  color: 'var(--paper-dim)',
  cursor: 'default',
};

function LearnerRightCol({ phase }: { phase: LearnerPhase }) {
  if (phase.rightCol === 'gap') {
    return <SkillGap showAssigned />;
  }

  if (phase.rightCol === 'scenario') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SkillGap compact />
        <ScenarioCard status="assigned" />
      </div>
    );
  }

  if (phase.rightCol === 'progress') {
    return (
      <div className="scenario-card">
        <div className="scenario-card-head">
          <span>Scenario · atm_0191</span>
          <span>in progress…</span>
        </div>
        <div className="scenario-body">
          <div
            style={{
              marginBottom: 12,
              fontFamily: 'var(--mono)',
              fontSize: 10,
              color: 'var(--paper-fade)',
              letterSpacing: '0.1em',
            }}
          >
            Q3 OF 5
          </div>
          A customer says their card was used fraudulently at a store yesterday. They
          are upset and demanding immediate action. Which severity tier does this fall
          into?
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
            {['Tier 1 — Low', 'Tier 2 — Medium', 'Tier 3 — High', 'Tier 4 — Critical'].map(
              (opt, i) => (
                <div key={i} style={progressOptionStyle}>
                  {opt}
                </div>
              ),
            )}
          </div>
          <div
            style={{
              marginTop: 12,
              fontFamily: 'var(--mono)',
              fontSize: 10,
              color: 'var(--paper-fade)',
              letterSpacing: '0.08em',
            }}
          >
            00:03:14 elapsed
          </div>
        </div>
      </div>
    );
  }

  if (phase.rightCol === 'mastery') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="skill-profile">
          <div className="skill-profile-head">Skill profile · updated</div>
          <div className="skill-row">
            <div className="skill-name">skl_0044 · Tier-1 Escalation Management</div>
            <div className="skill-levels">
              <span>L1</span>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ width: '10%' }} />
              </div>
              <span style={{ color: 'var(--signal)' }}>L2 · 30%</span>
            </div>
            <div className="skill-stat">
              <span>last_score</span>
              <span className="good">0.87</span>
            </div>
            <div className="skill-stat">
              <span>next_review</span>
              <span className="val">14 days</span>
            </div>
          </div>
          <div className="mastery-row">
            <span>✓</span>
            <span>mastered · skill_credit_applied</span>
          </div>
        </div>
        <ScenarioCard status="completed · 87%" />
      </div>
    );
  }

  return null;
}

// ─── phase card ─────────────────────────────────────────────────────────────

interface DeliveryCardProps {
  phase: LearnerPhase;
  isActive: boolean;
  isDone: boolean;
}

function rightColHeadLabel(rightCol: LearnerPhase['rightCol']): string {
  if (rightCol === 'gap') return 'skill profile';
  if (rightCol === 'mastery') return 'skill profile · updated';
  return 'delivery';
}

function rightColStatus(rightCol: LearnerPhase['rightCol']): string {
  if (rightCol === 'mastery') return 'mastered ✓';
  if (rightCol === 'progress') return 'in progress';
  return 'atm_0191';
}

function DeliveryCard({ phase, isActive, isDone }: DeliveryCardProps) {
  return (
    <article className={`phase ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}>
      <header className="phase-head">
        <div className="phase-pin">
          <div className="phase-pin-dot" />
        </div>
        <div className="phase-meta">
          <div className="phase-num">
            <span className="roman serif">{phase.roman}.</span>
            <span className="small">Phase {phase.arabic} of 04</span>
          </div>
          <h3 className="phase-name serif">{phase.name}</h3>
          <p className="phase-deck">{phase.deck}</p>
        </div>
      </header>

      <div className="split">
        {/* Left: transcript + callout */}
        <div className="col">
          <div className="col-head">
            <div className="col-head-l">
              <span>conversation</span>
              <span className="filename">phase_{phase.arabic}.delivery</span>
            </div>
            <div className="col-head-r">
              <span className="pulse" />
              <span>live</span>
            </div>
          </div>
          <div className="transcript">
            {phase.transcript.map((t, i) => (
              <div key={i} className={`turn ${t.who}`}>
                <div className="turn-avatar">{initials(t.who)}</div>
                <div className="turn-stack">
                  <div className="turn-meta">
                    <span className="speaker">{t.speaker}</span>
                    <span className="role-badge">{roleLabel(t.who)}</span>
                  </div>
                  <div className="turn-bubble">{t.body}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="callout">
            <div className="callout-num">{phase.callout.num}</div>
            <div className="callout-text">{phase.callout.text}</div>
          </div>
        </div>

        <div className="split-rule" />

        {/* Right: learner record panel */}
        <div className="col">
          <div className="col-head">
            <div className="col-head-l">
              <span>{rightColHeadLabel(phase.rightCol)}</span>
              <span className="filename">learner_record.json</span>
            </div>
            <div className="col-head-r" style={{ color: 'var(--violet)' }}>
              {rightColStatus(phase.rightCol)}
            </div>
          </div>
          <LearnerRightCol phase={phase} />
        </div>
      </div>
    </article>
  );
}

// ─── scrubber ───────────────────────────────────────────────────────────────

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
            <span className="scrubber-tick-label">{LEARNER_PHASES[i].roman}</span>
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

export default function DeliveryStrip() {
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
        const phaseCount = LEARNER_PHASES.length;
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
    const target = outer.offsetTop + (idx / LEARNER_PHASES.length) * total + 4;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const innerWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const translateX = -progress * (LEARNER_PHASES.length * phaseWidth - innerWidth);
  const safeTranslate = Math.min(0, translateX);

  // ── mobile: vertical stack ────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="phase-strip-mobile">
        <Scrubber active={active} goTo={(i) => setActive(i)} total={LEARNER_PHASES.length} />
        <div className="phase-strip-mobile-cards">
          {LEARNER_PHASES.map((p, i) => (
            <DeliveryCard key={p.id} phase={p} isActive={i === active} isDone={i < active} />
          ))}
        </div>
      </div>
    );
  }

  // ── desktop: scroll-jacked horizontal strip ───────────────────────────────
  return (
    <div
      className="phase-strip-outer"
      ref={outerRef}
      style={{ height: `calc(100vh * ${LEARNER_PHASES.length})` }}
    >
      <div className="phase-strip-sticky">
        <div className="phase-strip-viewport">
          <div
            className="phase-strip"
            ref={stripRef}
            style={{ transform: `translate3d(${safeTranslate}px, 0, 0)` }}
          >
            <div className="phase-rail" />
            <div className="phase-rail-fill" style={{ width: `${progress * 100}%` }} />
            {LEARNER_PHASES.map((p, i) => (
              <DeliveryCard key={p.id} phase={p} isActive={i === active} isDone={i < active} />
            ))}
          </div>
        </div>
        <Scrubber active={active} goTo={goTo} total={LEARNER_PHASES.length} />
      </div>
    </div>
  );
}
