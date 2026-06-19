// TwoAgents — migrated from Section5Agents() in
// knowledge-atom/The Knowledge Atom v2.html.
// Static three-column wiring diagram (Q&A path · the atom · learning path)
// plus capability matrix and chain of integrity. No interactive state.

import type { CSSProperties } from 'react';

const pinAux: CSSProperties = {
  marginTop: 6,
  fontStyle: 'italic',
  color: 'var(--paper-dim)',
};

const amberPinNum: CSSProperties = {
  borderColor: 'var(--amber-b)',
  color: 'var(--amber)',
};

const presentationForms = ['scenario · interactive', 'video · 4:00', 'job_aid · printable'];

export default function TwoAgents({ hideChain = false }: { hideChain?: boolean }) {
  return (
    <div className="diagram-frame">
      <span className="frame-label">FIG.04 · Two-agent diagram</span>
      <span className="frame-coord">PROJ. 1:1 · LATERAL</span>
      <span className="frame-foot">REV. 2026-05-09</span>
      <span className="frame-foot-r">SHEET 04 / 04</span>

      <div className="wire">
        {/* LEFT — Q&A / Moveworks path */}
        <div className="wire-col">
          <div className="role-head">
            <div className="role-num" style={{ color: 'var(--signal)', borderColor: 'var(--signal-b)' }}>
              α
            </div>
            <div className="role-meta">
              <span className="role-eyebrow">PATH 01 · JUST-IN-TIME ANSWER</span>
              <span className="role-title">Moveworks · Q&amp;A Agent</span>
            </div>
          </div>
          <div className="pins">
            <div className="pin">
              <div className="pin-num">01</div>
              <div className="pin-body">
                <div className="pin-key">Trigger</div>
                <div className="pin-val">Employee has an immediate question in the flow of work.</div>
                <div className="pin-aux" style={pinAux}>
                  "What documentation do I need for a wire transfer over $10k?"
                </div>
              </div>
            </div>
            <div className="pin">
              <div className="pin-num">02</div>
              <div className="pin-body">
                <div className="pin-key">Retrieval</div>
                <div className="pin-val">
                  Queries <span className="mono-tag">knowledge_text</span> directly. Reads only{' '}
                  <span className="mono-tag">status: published</span> atoms. Never improvises from
                  training data.
                </div>
              </div>
            </div>
            <div className="pin">
              <div className="pin-num">03</div>
              <div className="pin-body">
                <div className="pin-key">Response</div>
                <div className="pin-val">
                  Returns a governed, cited answer — grounded in the atom's{' '}
                  <span className="mono-tag">citations[]</span>. Stamps{' '}
                  <span className="mono-tag">knowledge_text_hash</span> into the log.
                </div>
              </div>
            </div>
            <div className="pin">
              <div className="pin-num">04</div>
              <div className="pin-body">
                <div className="pin-key">Outcome</div>
                <div className="pin-val">
                  Employee gets a fast, accurate, auditable answer. If they want to go deeper, the
                  agent can offer the learning path.
                </div>
              </div>
            </div>
            <div className="pin">
              <div className="pin-num">05</div>
              <div className="pin-body">
                <div className="pin-key">Cannot</div>
                <div className="pin-val" style={{ color: 'var(--paper-fade)' }}>
                  — Edit or propose atoms
                  <br />— Answer outside <span className="mono-tag">citations[]</span>
                  <br />— Access learner skill records
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER — the atom */}
        <div className="wire-col center">
          <div className="role-head" style={{ justifyContent: 'center' }}>
            <div className="role-meta" style={{ alignItems: 'center', textAlign: 'center' }}>
              <span className="role-eyebrow" style={{ color: 'var(--signal)' }}>
                SHARED CANONICAL SOURCE
              </span>
              <span className="role-title serif">
                <em>The atom.</em>
              </span>
            </div>
          </div>
          <div className="atom-card">
            <div className="atom-card-head">
              <div className="atom-card-id">atm_0191</div>
              <div className="atom-card-status">published</div>
            </div>
            <div className="atom-card-body">
              <div className="atom-row">
                <span className="k">skill</span>
                <span className="v signal">skl_0044 · 0.30</span>
              </div>
              <div className="atom-row">
                <span className="k">objective</span>
                <span className="v">classify ticket severity</span>
              </div>
              <div className="atom-row">
                <span className="k">bloom</span>
                <span className="v">apply</span>
              </div>
              <div className="atom-knowledge-block">
                There are <strong style={{ color: 'var(--signal)' }}>four severity tiers</strong>.
                Always classify before acting.{' '}
                <em>The customer's emotional state is not the classification signal.</em>
              </div>
              <div
                className="atom-foot"
                style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6, padding: '10px 14px' }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 10.5,
                    fontFamily: 'var(--mono)',
                    color: 'var(--paper-fade)',
                  }}
                >
                  <span>presentations[]</span>
                  <span style={{ color: 'var(--signal)' }}>3 forms</span>
                </div>
                {presentationForms.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 11,
                      color: 'var(--paper-dim)',
                      paddingLeft: 8,
                      borderLeft: '1px solid var(--signal-b)',
                    }}
                  >
                    {p}
                  </div>
                ))}
              </div>
              <div className="atom-foot">
                <span className="lock">⌗</span>
                <span>sha256:xyz7k9m4…</span>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: 16,
              fontFamily: 'var(--mono)',
              fontSize: 10,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--paper-fade)',
              textAlign: 'center',
            }}
          >
            ← answers from knowledge_text · presentations[] for learning →
          </div>
        </div>

        {/* RIGHT — Learning agent path */}
        <div className="wire-col">
          <div className="role-head">
            <div className="role-num" style={{ color: 'var(--amber)', borderColor: 'var(--amber-b)' }}>
              β
            </div>
            <div className="role-meta">
              <span className="role-eyebrow">PATH 02 · SKILL BUILDING</span>
              <span className="role-title">Learning Agent</span>
            </div>
          </div>
          <div className="pins">
            <div className="pin">
              <div className="pin-num" style={amberPinNum}>06</div>
              <div className="pin-body">
                <div className="pin-key">Trigger</div>
                <div className="pin-val">Employee wants to build a skill — not just look something up.</div>
                <div className="pin-aux" style={pinAux}>
                  "I want to learn how to handle escalated customer complaints."
                </div>
              </div>
            </div>
            <div className="pin">
              <div className="pin-num" style={amberPinNum}>07</div>
              <div className="pin-body">
                <div className="pin-key">Retrieval</div>
                <div className="pin-val">
                  Reads <span className="mono-tag">knowledge_text</span> to understand what must be
                  learned. Checks <span className="mono-tag">bloom_level</span> and{' '}
                  <span className="mono-tag">mastery_threshold</span> to calibrate depth.
                </div>
              </div>
            </div>
            <div className="pin">
              <div className="pin-num" style={amberPinNum}>08</div>
              <div className="pin-body">
                <div className="pin-key">Presentation selection</div>
                <div className="pin-val">
                  Reads <span className="mono-tag">presentations[]</span>. Selects the right form for
                  the learner's context — scenario for apply-level objectives, job aid for quick
                  reference, video for first exposure.
                </div>
              </div>
            </div>
            <div className="pin">
              <div className="pin-num" style={amberPinNum}>09</div>
              <div className="pin-body">
                <div className="pin-key">Assembly</div>
                <div className="pin-val">
                  Sequences atoms into a personalized microlearning path. Every module traces to a
                  specific <span className="mono-tag">atom_id</span> — no invented content enters the
                  path.
                </div>
              </div>
            </div>
            <div className="pin">
              <div className="pin-num" style={amberPinNum}>10</div>
              <div className="pin-body">
                <div className="pin-key">Outcome</div>
                <div className="pin-val">
                  A governed, personalized learning experience. Mastery records update{' '}
                  <span className="mono-tag">contributes_to[]</span> skill weights. The library gets
                  smarter with every completion.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /wire */}

      {/* Bottom comparison strip */}
      <div className="sod">
        <div className="sod-cell">
          <span className="sod-key">What it reads</span>
          <span
            className="sod-title"
            style={{ fontFamily: 'var(--mono)', fontSize: 14, fontStyle: 'normal' }}
          >
            Q&amp;A Agent · α
          </span>
          <div className="sod-row">
            <span className="yes">knowledge_text</span>
            <span className="yes">citations[]</span>
            <span className="yes">knowledge_text_hash</span>
            <span className="no">presentations[]</span>
            <span className="no">learner records</span>
            <span className="no">skill weights</span>
          </div>
        </div>
        <div className="sod-cell">
          <span className="sod-key">Shared constraint</span>
          <span className="sod-title serif">
            <em>The atom is the only source.</em>
          </span>
          <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.55, color: 'var(--paper-dim)' }}>
            Both agents read only{' '}
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--signal)' }}>
              status: published
            </span>{' '}
            atoms. Neither can answer from training data alone. If{' '}
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--signal)' }}>
              knowledge_text
            </span>{' '}
            changes, both are instantly constrained to the new version.
          </div>
        </div>
        <div className="sod-cell">
          <span className="sod-key">What it reads</span>
          <span
            className="sod-title"
            style={{ fontFamily: 'var(--mono)', fontSize: 14, fontStyle: 'normal' }}
          >
            Learning Agent · β
          </span>
          <div className="sod-row">
            <span className="yes">knowledge_text</span>
            <span className="yes">presentations[]</span>
            <span className="yes">bloom_level</span>
            <span className="yes">contributes_to[]</span>
            <span className="yes">mastery_threshold</span>
            <span className="no">citations[] only</span>
          </div>
        </div>
      </div>

      {/* Chain of integrity */}
      {!hideChain && <section className="chain">
        <div className="chain-l">
          <div className="chain-l-num">⌗</div>
          <div className="chain-l-title">
            <em>One source.</em>
          </div>
          <div className="chain-l-eye">Why both agents stay in sync</div>
        </div>
        <div className="chain-r">
          <div className="chain-step">
            <div className="chain-step-id">[ 01 ]</div>
            <div className="chain-step-body">
              <strong>knowledge_text_hash</strong> is computed at publish and stamped into every
              answer and every assembled learning path.{' '}
              <span className="small">Immutable for that version.</span>
            </div>
          </div>
          <div className="chain-step">
            <div className="chain-step-id">[ 02 ]</div>
            <div className="chain-step-body">
              When the Q&amp;A agent answers, it logs the hash. When the learning agent assembles a
              path, it stamps each module's hash.{' '}
              <strong>Every response is traceable to the exact atom version.</strong>
            </div>
          </div>
          <div className="chain-step">
            <div className="chain-step-id">[ 03 ]</div>
            <div className="chain-step-body">
              When <span style={{ fontFamily: 'var(--mono)' }}>knowledge_text</span> changes, the hash
              changes. <strong>Both agents are immediately constrained to the new version.</strong>{' '}
              <span className="small">No manual sync. No lag. No drift.</span>
            </div>
          </div>
          <div className="chain-step">
            <div className="chain-step-id">[ 04 ]</div>
            <div className="chain-step-body">
              The atom is not a document. It is not a course.{' '}
              <strong>It is the contract both agents execute against.</strong>
            </div>
          </div>
        </div>
      </section>}
    </div>
  );
}
