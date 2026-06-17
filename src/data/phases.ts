// Ported from window.PHASES in knowledge-atom/assets/data.jsx
// JSX body fields converted to plain strings; HTML-like spans collapsed to text.

export interface TranscriptTurn {
  who: 'agent' | 'sme' | 'sys' | 'doc';
  speaker: string;
  body: string;
}

export interface PhaseField {
  key: string;
  val: string;
  type: string;
  highlight?: boolean;
}

export interface Phase {
  id: number;
  roman: string;
  arabic: string;
  name: { lead: string; em: string };
  deck: string;
  transcript: TranscriptTurn[];
  fields: PhaseField[];
  callout: { num: number; text: string };
  presentations?: boolean;
}

export const PHASES: Phase[] = [
  {
    id: 0, roman: 'I', arabic: '01',
    name: { lead: 'Skill', em: 'mapping' },
    deck: 'Before any content gets written, the builder agent locates the skill gap in the taxonomy. The atom inherits its purpose from a numbered skill — not from a course title.',
    transcript: [
      { who: 'agent', speaker: 'Builder', body: 'Before we begin — let me check the skill taxonomy for the gap this problem addresses.' },
      { who: 'sys',   speaker: 'System',  body: 'Querying skl_taxonomy.search("escalation management")' },
      { who: 'sys',   speaker: 'Match',   body: '1 result — skl_0044 · Tier-1 Escalation Management' },
      { who: 'agent', speaker: 'Builder', body: 'Target level 2 (Developing). Expected for the role is Level 3, so this atom contributes ~30% of the gap.' },
    ],
    fields: [
      { key: 'skill_id', val: '"skl_0044"', type: 'str' },
      { key: 'skill_name', val: '"Tier-1 Escalation Management"', type: 'str' },
      { key: 'skill_type', val: '"behavioral"', type: 'str' },
      { key: 'target_level', val: '2', type: 'int' },
      { key: 'role_expected_level', val: '3', type: 'int' },
    ],
    callout: { num: 1, text: 'The skill row is the north star. Every downstream field — knowledge, presentations, assessment — must justify how it serves target_level.' },
  },
  {
    id: 1, roman: 'II', arabic: '02',
    name: { lead: 'Problem', em: 'intake' },
    deck: 'A conversation, not a form. The builder asks four questions and synthesizes a structured problem statement. Highlighted spans show where the schema fields come from.',
    transcript: [
      { who: 'agent', speaker: 'Builder', body: 'What are people doing — and what should they be doing instead?' },
      { who: 'sme',   speaker: 'SME',     body: 'Reps are escalating everything. A customer calls about an unrecognized charge and they immediately escalate to Tier‑2 when they should handle it themselves.' },
      { who: 'agent', speaker: 'Builder', body: 'What does a skilled performer do differently?' },
      { who: 'sme',   speaker: 'SME',     body: 'They classify the issue first — is it actually fraud in progress, or just an unrecognized charge? Most are Tier‑2 resolvable.' },
      { who: 'agent', speaker: 'Builder', body: 'Volume and urgency?' },
      { who: 'sme',   speaker: 'SME',     body: 'About 340 unnecessary escalations / week. Massive backlog for the Tier‑2 team. Urgent.' },
    ],
    fields: [
      { key: 'audience', val: '"Tier-1 Call Center Reps"', type: 'str' },
      { key: 'gap', val: '"Over-escalating Tier-1 resolvable tickets"', type: 'str' },
      { key: 'behavior_change', val: '"Classify before escalating"', type: 'str' },
      { key: 'impact_per_week', val: '340', type: 'int' },
      { key: 'urgency', val: '"high"', type: 'str' },
    ],
    callout: { num: 2, text: 'The agent does not invent the problem statement. Every value is pulled verbatim or summarized from highlighted SME utterances — auditable upstream.' },
  },
  {
    id: 2, roman: 'III', arabic: '03',
    name: { lead: 'Knowledge', em: 'decomposition' },
    deck: 'The skill is decomposed into a small set of atoms. The agent checks the library for prior art before authorizing new work — most atoms in mature libraries already exist.',
    transcript: [
      { who: 'agent', speaker: 'Builder', body: 'Decomposing skl_0044 into the smallest meaningful units.' },
      { who: 'sys',   speaker: 'Library', body: 'Three children proposed. Two already exist — atm_0192, atm_0193. One is new — "Severity Classification".' },
      { who: 'agent', speaker: 'Builder', body: 'Reuse the two. Author the third. SME, does this map cover the skill?' },
      { who: 'sme',   speaker: 'SME',     body: 'Yes. The classification piece is the gap — the others are well-trained.' },
    ],
    fields: [
      { key: 'parent_skill', val: '"skl_0044"', type: 'str' },
      { key: 'children[0]', val: '"atm_0191" · "Severity Classification"', type: 'str', highlight: true },
      { key: 'children[1]', val: '"atm_0192" · existing · reuse', type: 'str' },
      { key: 'children[2]', val: '"atm_0193" · existing · reuse', type: 'str' },
      { key: 'authoring_load', val: '1 / 3 atoms', type: 'str' },
    ],
    callout: { num: 3, text: 'Library reuse is enforced at the schema level. New atoms must declare what existing atoms they considered and why those didn\'t fit — preventing the 10,000-course bloat at its source.' },
  },
  {
    id: 3, roman: 'IV', arabic: '04',
    name: { lead: 'Knowledge', em: 'authoring' },
    deck: 'The hinge of the entire system. The agent drafts knowledge_text — the canonical body of the atom. Everything downstream (videos, scenarios, assessments, the Q&A agent) reads from this exact string. Nothing else is the knowledge.',
    transcript: [
      { who: 'agent', speaker: 'Builder', body: 'Drafting knowledge_text for atm_0191.' },
      { who: 'doc',   speaker: 'Draft',   body: 'There are four severity tiers for incoming tickets. Tier 4 — Critical: active fraud in progress; immediate card block, escalate to fraud team. CFPB Regulation E requires prompt action. Tier 3 — High: confirmed non-active fraud, disputes > $500. Tier 2 — Medium: unrecognized charges, disputes < $500. Tier 1 — Low: balance, address.\n\nClassify before acting. The customer\'s emotional state is not the classification signal — the nature of the issue is.' },
      { who: 'sme',   speaker: 'SME',     body: 'Approved. The classification rule is exactly the language we use in the team huddle.' },
    ],
    fields: [
      { key: 'knowledge_text', val: '"There are four severity tiers… (1,247 chars)"', type: 'str', highlight: true },
      { key: 'knowledge_text_hash', val: '"sha256:xyz7k9m4..."', type: 'str' },
      { key: 'key_concepts[0]', val: '"four tiers and their definitions"', type: 'str' },
      { key: 'key_concepts[1]', val: '"classify before acting"', type: 'str' },
      { key: 'common_misconceptions[0]', val: '"classifying by customer anger"', type: 'str' },
      { key: 'citations[0]', val: '"CFPB Regulation E §1005.6(b)"', type: 'str' },
    ],
    callout: { num: 4, text: 'The atom is the knowledge. The hash is computed and stored at this moment — every later artifact references it. Change knowledge_text and every dependent presentation invalidates immediately.' },
  },
  {
    id: 4, roman: 'V', arabic: '05',
    name: { lead: 'Presentation', em: 'derivation' },
    deck: 'Three forms get derived from knowledge_text — none of them is canonical. They teach the knowledge; they are not the knowledge. The Q&A agent ignores all of them.',
    transcript: [
      { who: 'agent', speaker: 'Builder', body: 'Deriving presentation forms from approved knowledge_text.' },
      { who: 'sys',   speaker: 'System',  body: '3 forms generated · all stamped atom_body_hash: sha256:xyz7k9m4' },
      { who: 'agent', speaker: 'Builder', body: 'Each form is a view. The atom remains the source of truth.' },
    ],
    fields: [
      { key: 'presentations[0]', val: '"scenario" · interactive', type: 'str' },
      { key: 'presentations[1]', val: '"video" · 4:00', type: 'str' },
      { key: 'presentations[2]', val: '"job_aid" · printable', type: 'str' },
      { key: 'derived_from', val: '"sha256:xyz7k9m4..."', type: 'str' },
      { key: 'knowledge_current', val: 'true', type: 'bool' },
    ],
    presentations: true,
    callout: { num: 5, text: 'If knowledge_text is later edited, every row in presentations[ ] automatically flips knowledge_current → false until re-derived. Drift is impossible.' },
  },
  {
    id: 5, roman: 'VI', arabic: '06',
    name: { lead: 'Review', em: '& publish' },
    deck: 'Three reviewers — two agents, one human. Compliance, accuracy, accessibility. When all three sign, the atom commits with a published version and a hash that can be cited forever.',
    transcript: [
      { who: 'sys',   speaker: 'Compliance',    body: 'Cross-reference: CFPB Reg E cited correctly. Clear.' },
      { who: 'sys',   speaker: 'Accuracy',      body: 'Knowledge base cross-check: 4 tiers match playbook. Clear.' },
      { who: 'sme',   speaker: 'SME · J. Okonkwo', body: 'Approved. Publish.' },
      { who: 'sys',   speaker: 'System',        body: 'Atom committed — atm_0191 v1.0 · hash sha256:xyz7k9m4 · skl_0044 contribution recorded.' },
    ],
    fields: [
      { key: 'atom_id', val: '"atm_0191"', type: 'str' },
      { key: 'version', val: '"v1.0"', type: 'str' },
      { key: 'status', val: '"published"', type: 'str' },
      { key: 'published_by', val: '"usr_okonkwo_j"', type: 'str' },
      { key: 'published_at', val: '"2025-03-15T14:21Z"', type: 'str' },
      { key: 'reviews_passed', val: '3 / 3', type: 'int' },
    ],
    callout: { num: 6, text: 'Publish is a commit, not an upload. Every learner record from this point forward will reference this exact hash — making "did this person see the latest version?" a trivial query.' },
  },
];
