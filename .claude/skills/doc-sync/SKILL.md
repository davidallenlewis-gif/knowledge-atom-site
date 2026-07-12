---
name: doc-sync
description: Check documentation against the actual code, fix what has drifted, and produce a report of what was updated, why, and any remaining drift risks. Use when the user asks whether docs are accurate, after big merges/refactors, or on a periodic doc-health pass. For slimming CLAUDE.md specifically, use trim-claude-md.
---

# Verify docs against code — then report, don't just patch

The deliverable is **updated docs plus a drift report**. Every change must be
traceable: what was updated, why, and what still looks risky.

## Step 1 — Inventory the claims

Find the doc surface: `CLAUDE.md`, `README.md`, `docs/**/*.md`, `.env.example`,
and API reference files. From each, extract the **checkable claims**:

- Commands and scripts ("run `npm run X`")
- File paths, folder structures, and module names
- API endpoints, routes, and their methods
- Env vars and defaults
- Database tables/schema descriptions
- Counts and inventories ("8 components", "6 feature modules")
- Described behavior ("falls back to Claude", "auto-detects /data")

Skip design-history docs (`docs/plans/*`) — they describe a moment in time
and are supposed to stay as written; note them as excluded in the report.

## Step 2 — Verify each claim against code

Check claims cheaply and mechanically where possible: package.json scripts,
route registrations, schema files, env validation, folder listings. For
behavioral claims, read the implementing code. Classify each finding:

- **CONFIRMED** — doc matches code (no action).
- **DOC STALE** — code moved on; doc is wrong → fix the doc.
- **CODE SUSPECT** — the doc states an intent the code fails to deliver
  (e.g. documented endpoint missing, promised fallback absent). Do **not**
  silently change the code — flag it; the fix is a product decision.
- **UNVERIFIABLE** — claim too vague to check → flag, suggest rewording.

## Step 3 — Fix the doc-stale findings

Update docs to match reality. Prefer deleting brittle claims (exact counts,
file inventories) over refreshing them — they'll just drift again. Keep
edits minimal; this is a sync pass, not a rewrite.

## Step 4 — The report (required)

Present in chat, and if the pass was large, also save as
`docs/doc-sync-report-YYYY-MM-DD.md`. Structure:

1. **Updated** — each doc change: file, what it said, what it says now,
   and *why* (which code contradicted it, with `path:line`).
2. **Code drift concerns** — the CODE SUSPECT items: where docs promise
   behavior the code doesn't deliver, or code has grown features no doc
   mentions. These need a human decision, so state each as a question.
3. **Drift-prone spots** — patterns likely to rot again (inventories,
   duplicated info across files) with a one-line prevention suggestion.
4. **Coverage** — which docs were checked, which excluded and why.

Commit doc fixes as `docs: sync documentation with code` — never mix code
changes into a doc-sync commit.
