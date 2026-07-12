---
name: plan-feature
description: Plan a non-trivial feature before writing code — design doc, implementation plan with per-task model assignments, then step-by-step execution with atomic commits. Use when the user asks to build, add, or redesign a feature that touches more than one or two files. Do not use for one-line fixes or chores.
---

# Plan a feature before building it

Codify the design → plan → execute workflow. The plan docs are the memory
between sessions, so execution can happen in a fresh (cheap) session.

## Step 1 — Design doc

Write `docs/plans/YYYY-MM-DD-<slug>-design.md` (create `docs/plans/` if missing):

- **Problem**: what's broken or missing, in 2–3 sentences.
- **Approach**: the chosen solution and one rejected alternative with the reason.
- **Affected areas**: files/modules that will change (list, not prose).
- **Out of scope**: what this deliberately does not do.
- **Risks**: anything that could break existing behavior.

Keep it under a page. If the approach is genuinely ambiguous, ask the user
to pick before continuing.

## Step 2 — Implementation plan

Write `docs/plans/YYYY-MM-DD-<slug>-implementation.md`:

- Ordered task list. Each task must be small enough for **one atomic commit**
  (one concern, conventional-commit message pre-written per task).
- Per-task **model assignment**:
  - design review / tricky architecture → strongest available model (Opus-class)
  - implementation tasks → Sonnet-class (default)
  - docs, config, lockfiles, renames → Haiku-class
- A **verification step** at the end: typecheck, tests, and how to manually
  exercise the feature.
- Every feature task list includes a task to add or update tests for the new
  logic — a feature without tests is an incomplete plan.

## Step 3 — Pause for approval

Show the user both docs and stop. Do not start implementing until they
approve. Suggest they run execution in a **fresh session** with the plan doc
as input — the planning conversation's context is no longer needed and only
costs tokens.

## Step 4 — Execute

Work through tasks in order. After each task: commit with the pre-written
message, mark the task done in the implementation doc (checkbox). If a task
turns out wrong mid-flight, update the plan doc first, then the code — the
docs must stay truthful.
