import { useState } from 'react';
import { CLUSTERS, FIELDS, fieldsForCluster, type AtomField, type Cluster } from '../data/fields';

// ─────────────────────────────────────────────────────────────
// AtomFieldExplorer — unified atom nav + field panel.
//
// Left: static SVG atom. Four cluster nodes are the only
//       interactive elements — click one to make it active.
// Right: all fields for the active cluster, always visible.
//        Plain/Technical toggle switches field key labels.
//
// Default: cluster 1 active on load. No empty states.
// ─────────────────────────────────────────────────────────────

const CX = 200;
const CY = 200;
const ORBIT_R = 138;
const NODE_R = 42;

type Mode = 'plain' | 'technical';

function clusterAngle(i: number) {
  return (Math.PI * 2 * i) / CLUSTERS.length - Math.PI / 2;
}

interface AtomNavProps {
  activeCluster: 1 | 2 | 3 | 4;
  onSelect: (id: 1 | 2 | 3 | 4) => void;
}

function AtomNav({ activeCluster, onSelect }: AtomNavProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-label="Atom cluster navigator"
      style={{ width: '100%', maxWidth: 380, aspectRatio: '1' }}
    >
      <defs>
        <radialGradient id="afe-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(26,160,182,0.12)" />
          <stop offset="100%" stopColor="rgba(26,160,182,0)" />
        </radialGradient>
        <radialGradient id="afe-nucleus-fill" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#1C4A6E" />
          <stop offset="100%" stopColor="#0C1316" />
        </radialGradient>
      </defs>

      {/* Ambient glow behind nucleus */}
      <circle cx={CX} cy={CY} r={90} fill="url(#afe-glow)" />

      {/* Orbit ring */}
      <circle
        cx={CX} cy={CY} r={ORBIT_R}
        fill="none"
        stroke="rgba(12,19,22,0.12)"
        strokeWidth="1"
        strokeDasharray="3 7"
      />

      {/* Spokes */}
      {CLUSTERS.map((c, i) => {
        const a = clusterAngle(i);
        const nx = CX + ORBIT_R * Math.cos(a);
        const ny = CY + ORBIT_R * Math.sin(a);
        const isActive = c.id === activeCluster;
        return (
          <line
            key={`spoke-${c.id}`}
            x1={CX} y1={CY} x2={nx} y2={ny}
            stroke={isActive ? 'rgba(26,160,182,0.5)' : 'rgba(12,19,22,0.10)'}
            strokeWidth="1"
            style={{ transition: 'stroke 0.3s' }}
          />
        );
      })}

      {/* Cluster nodes */}
      {CLUSTERS.map((c: Cluster, i: number) => {
        const a = clusterAngle(i);
        const nx = CX + ORBIT_R * Math.cos(a);
        const ny = CY + ORBIT_R * Math.sin(a);
        const isActive = c.id === activeCluster;
        const words = c.title.split(' ');
        const midWord = Math.ceil(words.length / 2);
        const line1 = words.slice(0, midWord).join(' ');
        const line2 = words.slice(midWord).join(' ');
        const labelFill = isActive ? '#fff' : 'rgba(233,235,230,0.82)';
        const nodeFill = isActive ? '#1AA0B6' : '#0C1316';
        const nodeStroke = isActive ? '#1AA0B6' : 'rgba(12,19,22,0.55)';

        return (
          <g
            key={c.id}
            onClick={() => onSelect(c.id)}
            style={{ cursor: 'pointer' }}
            role="button"
            aria-label={c.title}
            aria-pressed={isActive}
          >
            {/* Outer ring when active */}
            {isActive && (
              <circle
                cx={nx} cy={ny} r={NODE_R + 7}
                fill="none"
                stroke="rgba(26,160,182,0.25)"
                strokeWidth="1"
                style={{ transition: 'opacity 0.3s' }}
              />
            )}
            <circle
              cx={nx} cy={ny} r={NODE_R}
              fill={nodeFill}
              stroke={nodeStroke}
              strokeWidth={isActive ? 2 : 1}
              style={{ transition: 'all 0.3s' }}
            />
            {/* Index number */}
            <text
              x={nx} y={ny - 10}
              textAnchor="middle"
              fontFamily="JetBrains Mono, monospace"
              fontSize={8}
              fill={isActive ? 'rgba(255,255,255,0.55)' : 'rgba(233,235,230,0.4)'}
              style={{ userSelect: 'none', transition: 'fill 0.3s', letterSpacing: '0.1em' }}
            >
              {String(c.id).padStart(2, '0')}
            </text>
            {/* Title line 1 */}
            <text
              x={nx} y={ny + 4}
              textAnchor="middle"
              fontFamily="JetBrains Mono, monospace"
              fontSize={line2 ? 7.5 : 8.5}
              fill={labelFill}
              style={{ userSelect: 'none', transition: 'fill 0.3s' }}
            >
              {line1}
            </text>
            {/* Title line 2 */}
            {line2 && (
              <text
                x={nx} y={ny + 16}
                textAnchor="middle"
                fontFamily="JetBrains Mono, monospace"
                fontSize={7.5}
                fill={labelFill}
                style={{ userSelect: 'none', transition: 'fill 0.3s' }}
              >
                {line2}
              </text>
            )}
          </g>
        );
      })}

      {/* Nucleus */}
      <circle
        cx={CX} cy={CY} r={52}
        fill="url(#afe-nucleus-fill)"
        stroke="rgba(26,160,182,0.4)"
        strokeWidth="1.5"
      />
      <text
        x={CX} y={CY - 7}
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize={10}
        fontWeight="500"
        fill="rgba(233,235,230,0.85)"
        style={{ userSelect: 'none', letterSpacing: '0.06em' }}
      >
        atm_0191
      </text>
      <text
        x={CX} y={CY + 9}
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize={7.5}
        fill="rgba(90,200,250,0.45)"
        style={{ userSelect: 'none', letterSpacing: '0.08em' }}
      >
        v1.1.0
      </text>
    </svg>
  );
}

interface FieldPanelProps {
  cluster: Cluster;
  fields: AtomField[];
  mode: Mode;
  animKey: number;
}

function FieldPanel({ cluster, fields, mode, animKey }: FieldPanelProps) {
  return (
    <div className="afe-panel" key={animKey}>
      {/* Cluster header */}
      <div className="afe-cluster-head">
        <span className="afe-cidx">{String(cluster.id).padStart(2, '0')}</span>
        <div className="afe-cluster-title-wrap">
          <span className="afe-cluster-title">{cluster.title}</span>
          <span className="afe-cluster-sub">{cluster.sub}</span>
        </div>
      </div>

      {/* Field rows */}
      <div className="afe-fields">
        {fields.map((f: AtomField) => (
          <div key={f.key} className="afe-field">
            <div className="afe-field-name">
              {mode === 'plain' ? f.label : f.key}
            </div>
            <div className="afe-field-value">{f.value}</div>
            <div className="afe-field-gloss">{f.gloss}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AtomFieldExplorer() {
  const [activeCluster, setActiveCluster] = useState<1 | 2 | 3 | 4>(1);
  const [mode, setMode] = useState<Mode>('plain');
  const [animKey, setAnimKey] = useState(0);

  function handleSelect(id: 1 | 2 | 3 | 4) {
    setActiveCluster(id);
    setAnimKey((k) => k + 1);
  }

  const cluster = CLUSTERS.find((c) => c.id === activeCluster)!;
  const fields = fieldsForCluster(activeCluster);

  return (
    <div className="afe-wrap">
      {/* Toggle — top right of the whole block */}
      <div className="afe-toggle-row">
        <button
          className={`afe-toggle-btn${mode === 'plain' ? ' active' : ''}`}
          onClick={() => setMode('plain')}
        >
          Plain language
        </button>
        <button
          className={`afe-toggle-btn${mode === 'technical' ? ' active' : ''}`}
          onClick={() => setMode('technical')}
        >
          Technical
        </button>
      </div>

      <div className="afe-body">
        {/* Left — atom nav */}
        <div className="afe-nav">
          <AtomNav activeCluster={activeCluster} onSelect={handleSelect} />
          <p className="afe-hint">select a cluster</p>
        </div>

        {/* Right — field panel */}
        <div className="afe-panel-wrap">
          <FieldPanel
            cluster={cluster}
            fields={fields}
            mode={mode}
            animKey={animKey}
          />
        </div>
      </div>
    </div>
  );
}
