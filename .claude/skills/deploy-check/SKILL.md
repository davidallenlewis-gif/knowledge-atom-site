---
name: deploy-check
description: Pre-push deployment verification — catch Railway/production build failures locally instead of debugging via redeploy commits. Use before pushing anything that touches dependencies, build config, env vars, or when the user says "deploy", "push to Railway", or "why did the deploy fail".
---

# Verify a deploy will succeed before pushing

Deploy-debugging via commits ("regenerate package-lock", "trigger redeploy")
burns a full session round-trip per attempt. Run this checklist locally first.

## Checks, in order — stop and fix at the first failure

1. **Lockfile in sync** (the most common Railway failure):
   ```bash
   npm install --package-lock-only --ignore-scripts
   git diff --quiet package-lock.json || echo "LOCKFILE OUT OF SYNC"
   ```
   If out of sync: commit the regenerated lockfile as its own
   `fix: sync package-lock.json` commit.

2. **Clean install works**: `npm ci` (this is what Railway/CI runs — not
   `npm install`). If the repo uses pnpm/yarn/bun, use its frozen-lockfile
   equivalent instead.

3. **Typecheck**: `npm run check` if the script exists, else `npx tsc --noEmit`.

4. **Production build**: `npm run build`. Watch for dev-only imports and
   `devDependencies` that the build actually needs at runtime.

5. **Tests**: `npm test` if a test script exists.

6. **Env vars**: diff the env vars the code reads (e.g. an `env.ts` schema or
   `process.env.` grep) against `.env.example` and note any that a fresh
   deploy environment would be missing. Report them — don't guess values.

## Report

End with a short pass/fail line per check. All green → say it's safe to push.
Any red → fix it, re-run the failed check, and only then push. Never push a
"see if it deploys now" commit.
