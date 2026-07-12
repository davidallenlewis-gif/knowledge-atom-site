---
name: trim-claude-md
description: Audit and slim a repo's CLAUDE.md so it stays accurate and cheap — CLAUDE.md is loaded into every session's context, so every stale or narrative line is a recurring token tax. Use when CLAUDE.md exceeds ~150 lines, after major refactors, or when the user says the docs feel stale. For checking all docs against code, use doc-sync.
---

# Keep CLAUDE.md short, true, and instructional

Target: **under ~100 lines** of things Claude must know to work correctly
in this repo. Everything else moves to `docs/` or gets deleted.

## What stays in CLAUDE.md

- Commands: dev, build, test, typecheck, db — the exact invocations.
- A compact architecture map: top-level folders and what lives where
  (aim for ~10–15 lines, not a file-by-file inventory).
- Hard rules and conventions: path aliases, commit style, patterns that
  must be followed (e.g. "no cross-feature controller calls").
- Genuine gotchas that would otherwise cost a debugging session.

## What moves out or dies

- **Changelogs / "Recent Major Changes"** → delete; git history has it.
- **Refactoring backlogs / TODO lists** → move to `docs/` or issues.
- **File-by-file component inventories** → delete; they go stale fastest
  and Claude can list files itself in seconds.
- **Narrative architecture essays, pattern tables, design rationale** →
  move to `docs/ARCHITECTURE.md` and leave a one-line pointer.
- **Anything duplicated** between sections → keep one copy.

## Procedure

1. Read the current CLAUDE.md and spot-check its claims against the code
   (do the commands exist in package.json? do the named files/folders
   exist?). Mark each section keep / move / delete / stale.
2. Show the user the proposed cut list **before** rewriting — one line per
   section with the verdict and destination.
3. On approval: write the new CLAUDE.md, create/update the `docs/` files
   receiving moved content, and fix any stale claims while relocating them.
4. Report the before/after line counts and commit as
   `docs: trim CLAUDE.md to essential instructions`.
