// Ported from LEARNER_PHASES in knowledge-atom/The Knowledge Atom v2.html.
// JSX in `body` and `callout.text` converted to plain strings — tags stripped,
// text content preserved. The right-column variant is a string enum.

export type RightColType = 'gap' | 'scenario' | 'progress' | 'mastery';

export interface LearnerTurn {
  who: 'learner' | 'lagent' | 'sys';
  speaker: string;
  body: string;
}

export interface LearnerPhase {
  id: number;
  roman: string;
  arabic: string;
  name: string;
  deck: string;
  transcript: LearnerTurn[];
  callout: { num: number; text: string };
  rightCol: RightColType;
}

export const LEARNER_PHASES: LearnerPhase[] = [
  {
    id: 0,
    roman: 'I',
    arabic: '01',
    name: 'Assignment',
    deck: "The learner receives a path they didn't request. Before they engage, they want to know why. The learning agent traces the full chain — business data to skill gap to this specific atom.",
    transcript: [
      {
        who: 'learner',
        speaker: 'Rep · D. Lewis',
        body: "Why am I being assigned this? I didn't request any training.",
      },
      {
        who: 'lagent',
        speaker: 'Learning Agent',
        body: 'Your team lead flagged escalation handling as a critical skill gap in the Q1 performance review. Your escalation rate is 23% above the team median. Your skill profile shows skl_0044 · Tier-1 Escalation Management at Level 1 — your role expects Level 3. The severity classification atom is the first step toward closing that gap.',
      },
    ],
    callout: {
      num: 1,
      text: 'The assignment isn’t random. It traces directly to a business outcome — 340 unnecessary escalations a week — and to this learner’s specific gap in the skill taxonomy.',
    },
    rightCol: 'gap',
  },
  {
    id: 1,
    roman: 'II',
    arabic: '02',
    name: 'Understanding',
    deck: 'The learner pushes back on generic compliance training. The agent explains exactly what this atom covers, why this format was selected for them specifically, and what the content source is.',
    transcript: [
      {
        who: 'learner',
        speaker: 'Rep · D. Lewis',
        body: 'What does it actually cover? Is this going to be another generic compliance video?',
      },
      {
        who: 'lagent',
        speaker: 'Learning Agent',
        body: 'It covers one specific decision: how to classify an incoming ticket before escalating. Four tiers, one rule. The content was authored by your team’s compliance lead and verified against CFPB Regulation E. I assigned you the scenario format — not the video — because your completion history shows you retain apply-level content better through practice than passive viewing.',
      },
    ],
    callout: {
      num: 2,
      text: 'The scenario is derived from knowledge_text. The learning agent selected it because bloom_level: apply requires practice. The format was chosen for this specific learner’s history — not assigned generically.',
    },
    rightCol: 'scenario',
  },
  {
    id: 2,
    roman: 'III',
    arabic: '03',
    name: 'Learning',
    deck: 'The learner engages. The scenario presents realistic situations drawn from actual call center cases. The Q&A agent is available but grounded — it can only answer from the atom, not improvise.',
    transcript: [
      {
        who: 'learner',
        speaker: 'Rep · D. Lewis',
        body: "Alright. Let's do it.",
      },
      {
        who: 'sys',
        speaker: 'System',
        body: 'Scenario in progress · 3 of 5 questions answered · avg response time: 42s',
      },
    ],
    callout: {
      num: 3,
      text: 'The Q&A agent is available during the scenario but grounded. It can say "that’s covered in the atom" and redirect. It cannot give away answers or answer from training data alone.',
    },
    rightCol: 'progress',
  },
  {
    id: 3,
    roman: 'IV',
    arabic: '04',
    name: 'Mastery',
    deck: 'Score: 87%. Threshold: 80%. Mastery recorded. Skill contributions applied. The gap narrows — one atom at a time, every step traceable to the exact knowledge version the learner saw.',
    transcript: [
      {
        who: 'sys',
        speaker: 'System',
        body: 'Assessment complete · score: 87% · mastery threshold: 80% · passed',
      },
      {
        who: 'lagent',
        speaker: 'Learning Agent',
        body: 'Mastery recorded. skill_contributions applied — you’re now at 30% toward Level 2 of skl_0044. Two more atoms to go. Next review scheduled in 14 days based on this atom’s decay rate.',
      },
    ],
    callout: {
      num: 4,
      text: 'Mastery is not binary. This atom contributes 0.30 toward Level 2 of skl_0044. Two more atoms complete Level 2. Every step is traceable to sha256:xyz7k9m4 — the exact knowledge version this learner saw.',
    },
    rightCol: 'mastery',
  },
];
