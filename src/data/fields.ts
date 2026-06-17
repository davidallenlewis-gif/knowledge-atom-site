// ─────────────────────────────────────────────────────────────
// Field catalog for the L1 Anatomy page.
//
// One real specimen atom — atm_0191 · "Severity Classification" —
// described as 19 fields across four purpose clusters. Each field
// carries a plain-language label + gloss (for non-technical readers)
// and the technical key + specimen value (for the curious).
//
// Consumed by both:
//   • AtomExplorer.tsx — the interactive SVG diagram
//   • anatomy.astro    — the static plain/technical accordion
// ─────────────────────────────────────────────────────────────

export type FieldType = 'str' | 'str[]' | 'num' | 'bool' | 'enum';

export interface AtomField {
  /** Technical schema key, e.g. "knowledge_text". */
  key: string;
  /** Plain-language label, e.g. "The core idea". */
  label: string;
  /** Schema type. */
  type: FieldType;
  /** Which of the four purpose clusters this field belongs to. */
  cluster: 1 | 2 | 3 | 4;
  /** Plain-language description of why the field exists. */
  gloss: string;
  /** The value this field holds on the specimen atom (atm_0191). */
  value: string;
}

export interface Cluster {
  id: 1 | 2 | 3 | 4;
  /** Plain-language cluster title. */
  title: string;
  /** One-line sub-heading. */
  sub: string;
}

export const CLUSTERS: Cluster[] = [
  { id: 1, title: 'What it teaches', sub: 'The verified idea, in its own words' },
  { id: 2, title: "How we know it's right", sub: 'Versioning, hashing, citations, status' },
  { id: 3, title: 'What capability it builds', sub: 'Skills, proficiency, assessment, mastery' },
  { id: 4, title: 'How it reaches people', sub: 'Presentations, prerequisites, relevance, decay' },
];

export const FIELDS: AtomField[] = [
  // ── Cluster 1 — What it teaches ──────────────────────────────
  {
    key: 'knowledge_text',
    label: 'The core idea',
    type: 'str',
    cluster: 1,
    gloss:
      'The canonical body of the atom — the single string everything else is derived from. The Q&A agent answers from this text alone, never from a presentation. Change it and every dependent view invalidates.',
    value: 'There are four severity tiers… (1,247 chars)',
  },
  {
    key: 'learning_objective',
    label: 'What you should be able to do',
    type: 'str',
    cluster: 1,
    gloss:
      'One sentence, verb first. The objective is exactly what the assessment must measure. If you cannot write it in a single sentence, the atom is too big and needs decomposing.',
    value:
      'Classify an incoming customer ticket into the correct severity tier before deciding on escalation.',
  },
  {
    key: 'key_concepts',
    label: 'The ideas it must land',
    type: 'str[]',
    cluster: 1,
    gloss:
      'The minimum set of ideas that, if absent from a learner\'s response, fails the atom. Used by the assessment generator so every question targets at least one. A checklist, not a summary.',
    value:
      '["four severity tiers and their definitions", "classify before acting", "emotional state is not a signal"]',
  },
  {
    key: 'common_misconceptions',
    label: 'The ways people get it wrong',
    type: 'str[]',
    cluster: 1,
    gloss:
      'Wrong-answer fodder. Distractors in quizzes and the Q&A agent\'s "common pitfalls" both pull from this list, so wrong answers stay grounded in real failure modes — not invented ones.',
    value:
      '["classifying by customer anger", "treating all fraud mentions as Tier-4", "skipping classification when busy"]',
  },

  // ── Cluster 2 — How we know it's right ───────────────────────
  {
    key: 'version',
    label: 'Which edition this is',
    type: 'str',
    cluster: 2,
    gloss:
      'A major bump means the core idea changed — every learner who saw the prior version is flagged for re-exposure. Minor and patch bumps are presentation-only.',
    value: '"v1.1.0"',
  },
  {
    key: 'knowledge_text_hash',
    label: 'A fingerprint of the idea',
    type: 'str',
    cluster: 2,
    gloss:
      'Computed at publish, immutable for that version. Every presentation stamps this value. A presentation whose stamp no longer matches is auto-flagged out of date — drift becomes physically impossible.',
    value: '"sha256:xyz7k9m4p2c5…"',
  },
  {
    key: 'citations',
    label: 'Where the claims come from',
    type: 'str[]',
    cluster: 2,
    gloss:
      'Every regulatory or policy claim must cite its source. The compliance reviewer rejects any atom whose text mentions a regulation without a matching citation entry.',
    value:
      '["CFPB Regulation E §1005.6(b)", "Internal playbook §4.2 — rev. 2024-12"]',
  },
  {
    key: 'status',
    label: 'Whether it is live',
    type: 'enum',
    cluster: 2,
    gloss:
      'One of draft / in-review / published / retired. The Q&A agent only reads published. The builder agent only writes draft. Status is the one field that gates visibility.',
    value: '"published"',
  },
  {
    key: 'requires_reassessment',
    label: 'Whether learners must re-test',
    type: 'bool',
    cluster: 2,
    gloss:
      'Set automatically when a major version bumps. Until learners re-encounter the new version and pass again, their mastered flag is suspended. Compliance is a fact about the world, not a snapshot.',
    value: 'true',
  },

  // ── Cluster 3 — What capability it builds ────────────────────
  {
    key: 'skill_contributions',
    label: 'Which skills it feeds',
    type: 'str[]',
    cluster: 3,
    gloss:
      'An atom is never standalone. It is always a fractional contribution to one or more skill levels — mastering it moves the learner part of the way toward a level, never 100%, never zero.',
    value:
      '["skl_0044 · weight 0.30", "skl_0061 · weight 0.15"]',
  },
  {
    key: 'target_proficiency',
    label: 'How deep it goes',
    type: 'enum',
    cluster: 3,
    gloss:
      'The cognitive demand of the objective. "Apply" means the learner must use the knowledge in a new situation, not just recall it — which determines whether the assessment can be a quiz or must be a scenario.',
    value: '"apply"',
  },
  {
    key: 'assessment_items',
    label: 'How it is tested',
    type: 'str[]',
    cluster: 3,
    gloss:
      'The questions that measure the objective. Each targets at least one key concept, so the test cannot drift away from what the atom actually teaches.',
    value:
      '["mcq_0191a · targets tiers", "scenario_0191b · targets classify-first"]',
  },
  {
    key: 'mastery_threshold',
    label: 'The bar to clear',
    type: 'num',
    cluster: 3,
    gloss:
      'The score a learner must reach to be marked "mastered". Set per atom — a Tier-4 emergency atom uses 0.95, a basic concept 0.70. Mastery is domain-aware, not a fixed bar.',
    value: '0.80',
  },

  // ── Cluster 4 — How it reaches people ────────────────────────
  {
    key: 'presentation_objects',
    label: 'The forms it can take',
    type: 'str[]',
    cluster: 4,
    gloss:
      'Scenario, video, job aid — derived views of the core idea, none of them canonical. They teach the knowledge; they are not the knowledge. The Q&A agent ignores all of them.',
    value:
      '["scenario · interactive", "video · 4:00", "job_aid · printable"]',
  },
  {
    key: 'prerequisite_atoms',
    label: 'What you need first',
    type: 'str[]',
    cluster: 4,
    gloss:
      'Hard prerequisites only. Soft "you\'ll find it easier if…" lives in related atoms. Empty here means the learning path starts at this atom.',
    value: '[] (first atom in the path)',
  },
  {
    key: 'related_atoms',
    label: 'What sits nearby',
    type: 'str[]',
    cluster: 4,
    gloss:
      'Soft, non-blocking neighbours — atoms that deepen or complement this one. Used to suggest "next" and "see also" without gating the path.',
    value: '["atm_0192", "atm_0193"]',
  },
  {
    key: 'role_relevance',
    label: 'Who it is for',
    type: 'str[]',
    cluster: 4,
    gloss:
      'The roles for which this atom matters, and how much. Lets the system surface the right atoms to the right people instead of one catalog for everyone.',
    value:
      '["Tier-1 Call Center Rep · high", "Team Lead · medium"]',
  },
  {
    key: 'difficulty',
    label: 'How hard it is',
    type: 'enum',
    cluster: 4,
    gloss:
      'A calibrated difficulty band used for path-planning and pacing, recomputed from real learner outcomes rather than guessed up front.',
    value: '"intermediate"',
  },
  {
    key: 'decay_rate',
    label: 'How fast it fades',
    type: 'num',
    cluster: 4,
    gloss:
      'How quickly mastery of this atom decays without reinforcement. Drives spaced-repetition scheduling — high-stakes, rarely-used knowledge is refreshed more often.',
    value: '0.12 / month',
  },
];

/** Fields belonging to a given cluster, in declaration order. */
export function fieldsForCluster(clusterId: 1 | 2 | 3 | 4): AtomField[] {
  return FIELDS.filter((f) => f.cluster === clusterId);
}
