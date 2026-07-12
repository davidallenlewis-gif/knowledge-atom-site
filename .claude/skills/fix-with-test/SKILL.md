---
name: fix-with-test
description: Fix a bug by first reproducing it as a failing test, then fixing until the test passes. Use for any bug report, regression, or "X is broken" request in a repo with (or able to have) a test runner. Do not use for pure styling/copy tweaks with no testable behavior.
---

# Reproduce first, fix second

A fix without a test gets re-debugged in a future session. The failing test
is both the proof of the bug and the guard against its return.

## Step 1 — Understand and locate

Read the bug report, find the responsible code path, and state (one or two
sentences to the user) what you believe the defect is. If you can't localize
it yet, investigate until you can — don't start editing on a guess.

## Step 2 — Write the failing test

- Put it next to the code's existing tests, in the repo's test style. If the
  module has no tests yet, create the test file following the closest
  sibling's conventions (or the repo's test runner defaults).
- The test must assert the **correct** behavior, so it fails now and passes
  after the fix. Run it and confirm it fails **for the expected reason** —
  a test failing on a setup error proves nothing.
- Keep it minimal: one test for the reported bug, plus at most one or two
  adjacent edge cases if they're clearly the same defect.

If the bug is genuinely untestable in this repo (no runner, purely visual),
say so explicitly, fix it anyway, and describe how you verified it manually.

## Step 3 — Fix

Make the smallest change that makes the test pass without breaking others.
Run the module's test file, then the full test suite and typecheck.

## Step 4 — Commit together

One commit containing fix + test:
`fix(<scope>): <what was wrong>` — body notes the root cause in one line.
Never commit the fix without its test "to save time" — that discards the
main value of this workflow.
