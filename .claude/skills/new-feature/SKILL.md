---
name: new-feature
description: Scaffold a new feature module that matches the repo's existing conventions (server feature folders, client feature folders, registration, tests). Use when the user asks to add a new domain/feature area to an app. For planning the feature's behavior first, use plan-feature.
---

# Scaffold a feature the way this repo already does it

Never invent a new structure when the repo has one. Discover, then mirror.

## Step 1 — Discover the repo's pattern

Look for existing feature organization before writing anything:

- Server: `server/features/*/`, `src/features/*/`, `src/modules/*/` — note
  the files each feature has (e.g. `routes.ts`, `controller.ts`, tests).
- Client: `client/src/features/*/` — note the `hooks/` + `components/` split.
- How features are registered (e.g. routers mounted in `server/index.ts`,
  auth middleware applied).
- Where validation schemas and shared types live (`shared/`, `schemas/`).

Pick the **two most recently touched** existing features as the template —
they reflect current conventions, not legacy ones.

## Step 2 — Scaffold by mirroring

Create the new feature with the same file names, layering, and naming style
as the template features:

- Routes = HTTP concerns only; controller/service = business logic; no
  cross-feature controller calls.
- Register the feature wherever the others are registered, in the same style.
- Add Zod (or whatever the repo uses) validation schemas alongside the others.
- Client side: feature folder with hooks + components, using the same state
  patterns (e.g. TanStack Query keys) as sibling features.

If the repo has **no** discernible pattern, propose a minimal
routes/controller layout to the user before scaffolding.

## Step 3 — Tests and commits

- Add a test file mirroring how sibling features are tested; cover the
  controller's happy path and one failure path minimum.
- Commit in small conventional commits: schema → storage/service →
  controller/routes → registration → client hooks → client components → tests.
- Finish by running the repo's typecheck and test scripts.
