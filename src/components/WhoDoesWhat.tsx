import { useState } from 'react';

type View = 'ai' | 'human';

const CONTENT: Record<View, { role: string; title: string; items: string[]; foot: string }> = {
  ai: {
    role: 'Agent · Production',
    title: 'Speed, coverage, and first drafts.',
    items: [
      'Decomposes a 30-min course into candidate atoms',
      'Drafts the canonical knowledge_text for review',
      'Derives every presentation form — Q&A, scenario, job aid, micro',
      'Re-generates all forms when the atom changes',
      'Flags stale or contradictory content across the catalog',
    ],
    foot: 'Roughly 60% of the work — the part that used to make new content economically impossible.',
  },
  human: {
    role: 'SME + Instructional Designer · Judgment',
    title: 'The 40% that actually compounds.',
    items: [
      'Identifies which knowledge is worth atomizing',
      'Edits knowledge_text for precision and behavior-change intent',
      'Resolves edge cases and exceptions the agent flags',
      'Approves atom for publication — the only gate that counts',
      'Calibrates mastery threshold and decay schedule',
    ],
    foot: 'This is where expertise becomes infrastructure. The agent makes it durable.',
  },
};

export default function WhoDoesWhat() {
  const [view, setView] = useState<View>('ai');
  const c = CONTENT[view];
  return (
    <div className="duet">
      <div className="duet-toggle">
        <button aria-pressed={view === 'ai'} onClick={() => setView('ai')}>
          AI — the production (~60%)
        </button>
        <button aria-pressed={view === 'human'} onClick={() => setView('human')}>
          Human — the judgment (~40%)
        </button>
      </div>
      <div className={`duet-bar ${view === 'human' ? 'hu' : ''}`}>
        <div className="b-ai" />
        <div className="b-hu" />
      </div>
      <div className="duet-body">
        <div className="duet-role">{c.role}</div>
        <h4>{c.title}</h4>
        <ul>{c.items.map((item, i) => <li key={i}>{item}</li>)}</ul>
      </div>
      <div className="duet-foot">{c.foot}</div>
    </div>
  );
}
