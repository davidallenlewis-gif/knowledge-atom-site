import { useState } from 'react';

type View = 'ai' | 'human';

const CONTENT: Record<View, {
  role: string;
  badge: string;
  title: string;
  items: string[];
  foot: string;
  pct: string;
}> = {
  ai: {
    role: 'The Builder Agent',
    badge: 'AGENT · PRODUCTION',
    title: 'Speed, coverage, and first drafts.',
    items: [
      'Decomposes a 30-min course into candidate atoms',
      'Drafts the canonical knowledge_text for review',
      'Derives every presentation form — Q&A, scenario, job aid, micro',
      'Re-generates all forms when the atom changes',
      'Flags stale or contradictory content across the catalog',
    ],
    foot: 'Roughly 60% of the work — the part that used to make new content economically impossible.',
    pct: '~60%',
  },
  human: {
    role: 'SME + Instructional Designer',
    badge: 'HUMAN · JUDGMENT',
    title: 'The 40% that actually compounds.',
    items: [
      'Identifies which knowledge is worth atomizing',
      'Edits knowledge_text for precision and behavior-change intent',
      'Resolves edge cases and exceptions the agent flags',
      'Approves atom for publication — the only gate that counts',
      'Calibrates mastery threshold and decay schedule',
    ],
    foot: 'This is where expertise becomes infrastructure. The agent makes it durable.',
    pct: '~40%',
  },
};

export default function WhoDoesWhat() {
  const [view, setView] = useState<View>('ai');
  const c = CONTENT[view];

  return (
    <div className="duet2">
      {/* Two-column split — always visible, active side lit */}
      <div className="duet2-cols">
        {/* Agent column */}
        <button
          className={`duet2-col duet2-col-ai${view === 'ai' ? ' active' : ''}`}
          onClick={() => setView('ai')}
          aria-pressed={view === 'ai'}
        >
          <div className="duet2-col-pct">{CONTENT.ai.pct}</div>
          <div className="duet2-col-label">{CONTENT.ai.role}</div>
          <div className="duet2-col-bar">
            <div className="duet2-bar-fill" style={{ width: '60%' }} />
          </div>
        </button>

        {/* Divider */}
        <div className="duet2-divider" aria-hidden="true">
          <span className="duet2-divider-label">vs.</span>
        </div>

        {/* Human column */}
        <button
          className={`duet2-col duet2-col-hu${view === 'human' ? ' active' : ''}`}
          onClick={() => setView('human')}
          aria-pressed={view === 'human'}
        >
          <div className="duet2-col-pct">{CONTENT.human.pct}</div>
          <div className="duet2-col-label">{CONTENT.human.role}</div>
          <div className="duet2-col-bar">
            <div className="duet2-bar-fill" style={{ width: '40%' }} />
          </div>
        </button>
      </div>

      {/* Active panel */}
      <div className={`duet2-panel duet2-panel-${view}`} key={view}>
        <div className="duet2-badge">{c.badge}</div>
        <h4 className="duet2-title">{c.title}</h4>
        <ul className="duet2-list">
          {c.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <div className="duet2-foot">{c.foot}</div>
      </div>
    </div>
  );
}
