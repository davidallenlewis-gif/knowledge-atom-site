import { useState, useEffect, useRef, useCallback } from 'react';
import {
  CLUSTERS,
  FIELDS,
  fieldsForCluster,
  type AtomField,
  type Cluster,
} from '../data/fields';

// ─────────────────────────────────────────────────────────────
// AtomExplorer — interactive SVG diagram of one knowledge atom.
//
// Ported from Section4Atom / AtomDiagram in "The Knowledge Atom v2".
// Three interaction states, all self-contained (no props):
//   1. Spinning      — scroll offset drives rotation of the cluster ring
//   2. Cluster open  — click freezes rotation; fields fan out from centre
//   3. Field open    — detail drawer slides in from the left
// Back navigation: nucleus click or the ← button steps up one level.
// ─────────────────────────────────────────────────────────────

// Diagram geometry (matches the v2 source exactly).
const CX = 260;
const CY = 260;
const ORBIT_R = 170;
const GROUP_R = 38;
const FIELD_R = 24;
const FIELD_ORBIT_R = 100;

interface AtomDiagramProps {
  rotation: number;
  selectedCluster: 1 | 2 | 3 | 4 | null;
  selectedField: string | null;
  onClusterClick: (id: 1 | 2 | 3 | 4) => void;
  onFieldClick: (key: string) => void;
  onNucleusClick: () => void;
}

function AtomDiagram({
  rotation,
  selectedCluster,
  selectedField,
  onClusterClick,
  onFieldClick,
  onNucleusClick,
}: AtomDiagramProps) {
  const clusterAngle = (i: number) =>
    (Math.PI * 2 * i) / CLUSTERS.length - Math.PI / 2;
  const clusterFields: AtomField[] = selectedCluster
    ? fieldsForCluster(selectedCluster)
    : [];
  const fieldAngle = (i: number) =>
    (Math.PI * 2 * i) / Math.max(clusterFields.length, 1) - Math.PI / 2;

  return (
    <svg
      viewBox="0 0 520 520"
      style={{ width: 'min(90vw,680px)', aspectRatio: '1', overflow: 'visible', cursor: 'default' }}
    >
      <defs>
        <radialGradient id="atom-ng" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(90,200,250,0.16)" />
          <stop offset="100%" stopColor="rgba(90,200,250,0)" />
        </radialGradient>
      </defs>
      <circle
        cx={CX}
        cy={CY}
        r={ORBIT_R}
        fill="none"
        stroke="rgba(232,234,237,0.06)"
        strokeWidth="1"
        strokeDasharray="4 6"
      />
      <circle cx={CX} cy={CY} r={72} fill="url(#atom-ng)" />

      {/* Cluster ring — rotates while spinning */}
      <g transform={`rotate(${(rotation * 180) / Math.PI}, ${CX}, ${CY})`}>
        {CLUSTERS.map((g: Cluster, i: number) => {
          const a = clusterAngle(i);
          const nx = CX + ORBIT_R * Math.cos(a);
          const ny = CY + ORBIT_R * Math.sin(a);
          const isSel = selectedCluster === g.id;
          const isDim = selectedCluster !== null && !isSel;
          const words = g.title.split(' ');
          const labelFill = isSel
            ? 'rgba(90,200,250,0.9)'
            : isDim
            ? 'rgba(232,234,237,0.22)'
            : 'rgba(232,234,237,0.72)';
          return (
            <g key={g.id}>
              {selectedCluster === null && (
                <line
                  x1={CX}
                  y1={CY}
                  x2={nx}
                  y2={ny}
                  stroke="rgba(232,234,237,0.07)"
                  strokeWidth="1"
                />
              )}
              <circle
                cx={nx}
                cy={ny}
                r={GROUP_R}
                fill={isSel ? 'rgba(90,200,250,0.12)' : 'rgba(20,23,29,0.92)'}
                stroke={
                  isSel
                    ? 'rgba(90,200,250,0.7)'
                    : isDim
                    ? 'rgba(232,234,237,0.10)'
                    : 'rgba(232,234,237,0.26)'
                }
                strokeWidth={isSel ? 1.5 : 1}
                style={{
                  cursor: selectedCluster ? 'default' : 'pointer',
                  opacity: isDim ? 0.3 : 1,
                  transition: 'all 0.4s',
                }}
                onClick={() => selectedCluster === null && onClusterClick(g.id)}
              />
              {words.length <= 2 ? (
                <text
                  x={nx}
                  y={ny + 3}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="JetBrains Mono,monospace"
                  fontSize={words.join('').length > 12 ? 7.5 : 9}
                  fill={labelFill}
                  style={{ userSelect: 'none', pointerEvents: 'none', transition: 'fill 0.4s' }}
                >
                  {g.title}
                </text>
              ) : (
                <>
                  <text
                    x={nx}
                    y={ny - 5}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="JetBrains Mono,monospace"
                    fontSize={8}
                    fill={labelFill}
                    style={{ userSelect: 'none', pointerEvents: 'none', transition: 'fill 0.4s' }}
                  >
                    {words.slice(0, Math.ceil(words.length / 2)).join(' ')}
                  </text>
                  <text
                    x={nx}
                    y={ny + 8}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="JetBrains Mono,monospace"
                    fontSize={8}
                    fill={labelFill}
                    style={{ userSelect: 'none', pointerEvents: 'none', transition: 'fill 0.4s' }}
                  >
                    {words.slice(Math.ceil(words.length / 2)).join(' ')}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </g>

      {/* Fields — fan out from centre once a cluster is open */}
      {selectedCluster !== null &&
        clusterFields.map((f: AtomField, i: number) => {
          const a = fieldAngle(i);
          const fx = CX + FIELD_ORBIT_R * Math.cos(a);
          const fy = CY + FIELD_ORBIT_R * Math.sin(a);
          const isAct = selectedField === f.key;
          const half = Math.ceil(f.key.length / 2);
          return (
            <g key={f.key}>
              <line
                x1={CX}
                y1={CY}
                x2={fx}
                y2={fy}
                stroke={isAct ? 'rgba(90,200,250,0.28)' : 'rgba(232,234,237,0.07)'}
                strokeWidth="1"
                style={{ transition: 'stroke 0.25s' }}
              />
              <circle
                cx={fx}
                cy={fy}
                r={FIELD_R}
                fill={isAct ? 'rgba(90,200,250,0.14)' : 'rgba(20,23,29,0.95)'}
                stroke={isAct ? 'rgba(90,200,250,0.7)' : 'rgba(232,234,237,0.20)'}
                strokeWidth={isAct ? 1.5 : 1}
                style={{ cursor: 'pointer', transition: 'all 0.25s' }}
                onClick={() => onFieldClick(f.key)}
              />
              {f.key.length <= 12 ? (
                <text
                  x={fx}
                  y={fy + 3}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="JetBrains Mono,monospace"
                  fontSize={8}
                  fill={isAct ? 'rgba(90,200,250,0.9)' : 'rgba(232,234,237,0.62)'}
                  style={{ userSelect: 'none', pointerEvents: 'none', transition: 'fill 0.25s' }}
                >
                  {f.key}
                </text>
              ) : (
                <>
                  <text
                    x={fx}
                    y={fy - 4}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="JetBrains Mono,monospace"
                    fontSize={7}
                    fill={isAct ? 'rgba(90,200,250,0.9)' : 'rgba(232,234,237,0.62)'}
                    style={{ userSelect: 'none', pointerEvents: 'none', transition: 'fill 0.25s' }}
                  >
                    {f.key.slice(0, half)}
                  </text>
                  <text
                    x={fx}
                    y={fy + 7}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="JetBrains Mono,monospace"
                    fontSize={7}
                    fill={isAct ? 'rgba(90,200,250,0.9)' : 'rgba(232,234,237,0.62)'}
                    style={{ userSelect: 'none', pointerEvents: 'none', transition: 'fill 0.25s' }}
                  >
                    {f.key.slice(half)}
                  </text>
                </>
              )}
            </g>
          );
        })}

      {/* Nucleus — also the "back" affordance once a cluster is open */}
      <circle
        cx={CX}
        cy={CY}
        r={48}
        fill="rgba(10,11,14,0.95)"
        stroke={selectedCluster ? 'rgba(90,200,250,0.5)' : 'rgba(232,234,237,0.20)'}
        strokeWidth={selectedCluster ? 1.5 : 1}
        style={{ cursor: selectedCluster ? 'pointer' : 'default', transition: 'stroke 0.3s' }}
        onClick={onNucleusClick}
      />
      <text
        x={CX}
        y={CY - 6}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="JetBrains Mono,monospace"
        fontSize={10}
        fontWeight="500"
        fill={selectedCluster ? 'rgba(90,200,250,0.9)' : 'rgba(232,234,237,0.68)'}
        style={{ userSelect: 'none', transition: 'fill 0.3s', letterSpacing: '0.06em' }}
      >
        atm_0191
      </text>
      <text
        x={CX}
        y={CY + 10}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="JetBrains Mono,monospace"
        fontSize={7.5}
        fill="rgba(90,200,250,0.42)"
        style={{ userSelect: 'none', letterSpacing: '0.1em' }}
      >
        {selectedCluster ? '← back' : 'v1.1.0'}
      </text>
    </svg>
  );
}

export default function AtomExplorer() {
  const [rotation, setRotation] = useState(0);
  const [frozenRot, setFrozenRot] = useState<number | null>(null);
  const [selectedCluster, setSelectedCluster] = useState<1 | 2 | 3 | 4 | null>(null);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const rotRef = useRef(0);

  // Scroll → rotation, gated by visibility and the frozen state.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let visible = false;
    const onScroll = () => {
      if (!visible || frozenRot !== null) return;
      const rect = section.getBoundingClientRect();
      const scrolled = Math.max(0, window.innerHeight - rect.top);
      const total = section.offsetHeight + window.innerHeight;
      const t = Math.min(1, scrolled / total);
      const r = t * (section.offsetHeight / 400) * 0.3;
      rotRef.current = r;
      setRotation(r);
    };
    const obs = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) onScroll();
      },
      { threshold: 0 }
    );
    obs.observe(section);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [frozenRot]);

  const handleClusterClick = useCallback((id: 1 | 2 | 3 | 4) => {
    setFrozenRot(rotRef.current);
    setSelectedCluster(id);
    setSelectedField(null);
    setDrawerOpen(false);
    setAnimKey((k) => k + 1);
  }, []);

  const handleFieldClick = useCallback((key: string) => {
    setSelectedField(key);
    setDrawerOpen(true);
    setAnimKey((k) => k + 1);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setSelectedField(null);
  }, []);

  const handleBack = useCallback(() => {
    if (drawerOpen) {
      closeDrawer();
    } else {
      setSelectedCluster(null);
      setSelectedField(null);
      setFrozenRot(null);
    }
  }, [drawerOpen, closeDrawer]);

  const activeRot = frozenRot !== null ? frozenRot : rotation;
  const activeField: AtomField | null = selectedField
    ? FIELDS.find((f) => f.key === selectedField) ?? null
    : null;
  const activeCluster: Cluster | null = selectedCluster
    ? CLUSTERS.find((c) => c.id === selectedCluster) ?? null
    : null;
  const stateLabel =
    drawerOpen && activeField
      ? `field · ${activeField.key}`
      : activeCluster
      ? `cluster · ${activeCluster.title} — click a field`
      : 'scroll to spin · click a cluster to explore';

  return (
    <section className="atom-explorer-wrap" ref={sectionRef}>
      <div className="atom-stage">
        {/* 3D perspective wrapper — tilts the whole diagram */}
        <div
          className="atom-perspective"
          onClick={drawerOpen ? closeDrawer : undefined}
          style={{ cursor: drawerOpen ? 'pointer' : 'default' }}
        >
          <div className="atom-tilt">
            <AtomDiagram
              rotation={activeRot}
              selectedCluster={selectedCluster}
              selectedField={selectedField}
              onClusterClick={handleClusterClick}
              onFieldClick={handleFieldClick}
              onNucleusClick={handleBack}
            />
          </div>
        </div>

        {/* Back button — top-right so it never collides with the drawer */}
        {selectedCluster && (
          <button
            type="button"
            className="atom-back-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleBack();
            }}
          >
            <span className="atom-back-arrow">←</span>
            {drawerOpen ? 'fields' : 'atom'}
          </button>
        )}

        {/* State label — bottom-center */}
        <div className="atom-state-label">{stateLabel}</div>

        {/* Backdrop — clicking it closes the drawer */}
        {drawerOpen && <div className="atom-drawer-backdrop" onClick={closeDrawer} />}

        {/* Drawer — slides in from left over the diagram */}
        <div
          className={`atom-drawer${drawerOpen ? ' open' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          {activeField && (
            <div key={`${selectedField}-${animKey}`} className="atom-drawer-inner">
              {/* Crumbs */}
              <div className="atom-crumbs">
                <span>atm_0191</span>
                <span className="sep">›</span>
                <span>{activeCluster?.title.toLowerCase()}</span>
                <span className="sep">›</span>
                <span className="here">{activeField.key}</span>
                <button type="button" className="atom-crumb-close" onClick={closeDrawer}>
                  ✕
                </button>
              </div>

              {/* WHY — primary */}
              <div className="atom-why">
                <span className="atom-why-tag">WHY</span>
                <div className="atom-why-body">{activeField.gloss}</div>
              </div>

              {/* Plain-language label + technical key */}
              <div className="atom-field-label">{activeField.label}</div>
              <div className="atom-field-key">{activeField.key}</div>
              <div className="atom-field-pills">
                <span className="atom-pill">{activeField.type}</span>
                <span className="atom-pill cluster">{activeCluster?.title}</span>
              </div>

              {/* Specimen value */}
              <div className="atom-field-value-label">Value on atm_0191</div>
              <div className="atom-field-value">{activeField.value}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
