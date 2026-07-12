---
name: wrap-session
description: End-of-session handoff — commit or park work in progress, update plan checkboxes, and write a short handoff note so the next session can start fresh instead of resuming a long, expensive context. Use when the user says they're done for the day, wrapping up, or wants to pause mid-feature.
---

# Close the session so tomorrow starts cheap

A long session's context is expensive to keep resuming. Capture the state in
the repo, then the next session needs only the handoff note.

## Step 1 — Settle the working tree

- Completed, coherent work → commit it now with a proper conventional
  message (split into atomic commits if it's several concerns).
- Half-done work that compiles and doesn't break tests → commit as
  `wip(<scope>): <what's mid-flight>` on the feature branch (never on main).
- Broken or exploratory work → `git stash push -m "<description>"` and
  record the stash name in the handoff note.
- Never leave uncommitted changes silently — they're invisible to the next
  session until it stumbles on them.

## Step 2 — Update the plan

If a `docs/plans/` implementation doc is in play, check off finished tasks
and add any new tasks discovered during the session.

## Step 3 — Write the handoff note

Overwrite `docs/plans/HANDOFF.md` (it's a scratchpad, not a log) with at
most ~10 lines:

- **Done this session**: 2–3 bullets.
- **Next step**: the single most concrete next action, specific enough to
  start cold ("implement X in file Y per task 4 of <plan doc>").
- **Gotchas**: anything non-obvious learned the hard way (flaky test,
  ordering constraint, env quirk).
- **State**: branch name, and any stash or wip commit to know about.

## Step 4 — Verify and report

Run the quick checks (typecheck, tests) so the note can honestly say the
tree is green — or record exactly what's red. Commit the handoff note and
plan updates (`chore: session handoff`), tell the user the branch/state in
two lines, and remind them: start the next session fresh and just say
"read docs/plans/HANDOFF.md and continue".
