import { useState } from 'react';

type ClusterId = 1 | 2 | 3 | 4;

interface Field { key: string; val: string; }
interface Cluster {
  id: ClusterId;
  idx: string;
  title: string;
  sub: string;
  fields: Field[];
  note: string;
}

const CLUSTERS: Cluster[] = [
  {
    id: 1, idx: '01',
    title: 'What it teaches',
    sub: 'The verified idea, in its own words',
    fields: [
      { key: 'learning_objective', val: 'Route any issue to the right tier without over-escalating.' },
      { key: 'key_concept',        val: 'The deciding question: "does fixing this need authority I lack?"' },
      { key: 'misconception',      val: '"An upset customer means high severity." / "When in doubt, escalate."' },
      { key: 'tiers',              val: 'Critical · High · Standard · Low — four, mutually exclusive.' },
    ],
    note: 'This is the only field a human must truly own. Everything else can be derived from it.',
  },
  {
    id: 2, idx: '02',
    title: "How we know it's right",
    sub: 'Versioned, sourced, auditable',
    fields: [
      { key: 'version / hash',   val: 'v4 · 9f2a·c41e — a fingerprint of the exact knowledge.' },
      { key: 'source_citation',  val: 'CFPB Regulation E (electronic-fund-transfer disputes).' },
      { key: 'status',           val: 'SME-verified, published.' },
      { key: 'reassessment',     val: 'Flags every derived view stale the moment the text changes.' },
    ],
    note: 'Change the knowledge once; the hash moves; every view that drifted is caught automatically.',
  },
  {
    id: 3, idx: '03',
    title: 'What capability it builds',
    sub: 'Tied to a real, measurable skill',
    fields: [
      { key: 'skill',               val: 'Escalation Severity Judgment.' },
      { key: 'target_proficiency',  val: 'Apply — classify live, unaided.' },
      { key: 'assessment',          val: 'Judge unlabeled cases, not recall of the tiers.' },
      { key: 'mastery_threshold',   val: '90% correct routing across mixed scenarios.' },
    ],
    note: "An atom isn't \"done\" because it was watched — it's done when the behavior shows up.",
  },
  {
    id: 4, idx: '04',
    title: 'How it reaches people',
    sub: 'Many forms, one source',
    fields: [
      { key: 'presentation_objects', val: 'Q&A answer · scenario · job aid · microlearning.' },
      { key: 'prerequisite',         val: 'Account types & access levels.' },
      { key: 'role_relevance',       val: 'Tier-1 contact-center representative.' },
      { key: 'difficulty',           val: 'Foundational.' },
    ],
    note: 'These are views, not copies. Act 04 shows the atom render itself into each one →',
  },
];

export default function ClusterTabs() {
  const [active, setActive] = useState<ClusterId>(1);
  const cluster = CLUSTERS.find(c => c.id === active)!;

  return (
    <div className="cluster-tabs">
      <p className="cluster-tabs-intro">Underneath, every atom carries 19 fields. For a decision-maker they group into four plain questions.</p>

      {/* Tab bar */}
      <div className="ctab-bar" role="tablist">
        {CLUSTERS.map(c => (
          <button
            key={c.id}
            role="tab"
            aria-selected={c.id === active}
            className={`ctab ${c.id === active ? 'ctab-active' : ''}`}
            onClick={() => setActive(c.id)}
          >
            <span className="ctab-idx">{c.idx}</span>
            <span className="ctab-label">{c.title}</span>
          </button>
        ))}
      </div>

      {/* Content panel — fixed height, no layout shift */}
      <div className="ctab-panel" role="tabpanel" key={active}>
        <div className="ctab-panel-head">
          <span className="ctab-panel-title">{cluster.title}</span>
          <span className="ctab-panel-sub">{cluster.sub}</span>
        </div>
        <div className="ctab-fields">
          {cluster.fields.map(f => (
            <div key={f.key} className="ctab-field">
              <div className="ctab-fk">{f.key}</div>
              <div className="ctab-fv">{f.val}</div>
            </div>
          ))}
        </div>
        <div className="ctab-note">{cluster.note}</div>
      </div>
    </div>
  );
}
