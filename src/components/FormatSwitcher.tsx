import { useState } from 'react';

type Format = 'qa' | 'scenario' | 'jobaid' | 'micro';
export type Mode = 'static' | 'live';

interface Props {
  mode?: Mode;
}

const FORMATS: { id: Format; label: string }[] = [
  { id: 'qa', label: 'Q&A answer' },
  { id: 'scenario', label: 'Branching scenario' },
  { id: 'jobaid', label: 'Job aid' },
  { id: 'micro', label: 'Microlearning' },
];

const STATIC_CONTENT: Record<Format, { heading: string; body: React.ReactNode }> = {
  qa: {
    heading: 'Instant answer, in the flow of work',
    body: (
      <div className="qa">
        <div className="q">"Caller's furious about one duplicate $12 charge from yesterday — escalate?"</div>
        <div className="a"><b>No — that's Standard (Tier 3).</b> One disputed charge inside the dispute window is yours to resolve. Anger isn't severity. Escalate only if the fix needs authority, access, or expertise you don't have.</div>
      </div>
    ),
  },
  scenario: {
    heading: 'Practice the decision, not the definition',
    body: (
      <div className="scn">
        <p>It's 2pm on a Friday. A customer calls — their card has been used at three stores in a different city in the last hour. They didn't make those purchases.</p>
        <p style={{ marginTop: '12px' }}><strong>Which severity tier, and what is your immediate action?</strong></p>
        <span className="verdict">Tier 1 — Critical. Active unauthorized use. Escalate now.</span>
      </div>
    ),
  },
  jobaid: {
    heading: 'One-page reference for the desk',
    body: (
      <table className="aid">
        <thead><tr><th>Tier</th><th>Condition</th><th>Action</th></tr></thead>
        <tbody>
          <tr><td className="t">Critical</td><td>Active harm, ongoing fraud, legal exposure</td><td>Escalate immediately</td></tr>
          <tr><td className="t">High</td><td>Needs supervisor authority or system access</td><td>Warm transfer</td></tr>
          <tr><td className="t">Standard</td><td>Complex but within rep's tools</td><td>Handle at desk</td></tr>
          <tr><td className="t">Low</td><td>Routine, self-service resolution possible</td><td>Guide to self-service</td></tr>
        </tbody>
      </table>
    ),
  },
  micro: {
    heading: 'A 90-second reinforcement',
    body: (
      <div className="micro">
        <p className="prompt">Quick check — what triggers an escalation?</p>
        <div className="flip">The fix requires <b>something you don't have</b>: authority, system access, or expertise. <b>Not</b> an upset customer — emotion is a service cue, not a severity signal.</div>
      </div>
    ),
  },
};

export default function FormatSwitcher({ mode = 'static' }: Props) {
  const [active, setActive] = useState<Format>('qa');
  const content = STATIC_CONTENT[active];

  return (
    <div className="switcher">
      <div className="formats">
        <div className="src-atom mono">SOURCE<br /><b>atm_0191</b> · v4 · 9f2a·c41e</div>
        {FORMATS.map(f => (
          <button
            key={f.id}
            className={`fbtn${active === f.id ? ' active' : ''}`}
            aria-pressed={active === f.id}
            onClick={() => setActive(f.id)}
          >
            <span className="dot" />
            {f.label}
          </button>
        ))}
      </div>
      <div className="render">
        <div className="rlabel">Rendered as · {FORMATS.find(f => f.id === active)?.label}</div>
        <h4>{content.heading}</h4>
        <div className="render-pane show" key={active}>{content.body}</div>
        <div className="stamp mono">derived from <b>atm_0191</b> · hash <b>9f2a·c41e</b></div>
        {/* v2: when mode='live', fetch /api/generate-variation and render response */}
      </div>
    </div>
  );
}
