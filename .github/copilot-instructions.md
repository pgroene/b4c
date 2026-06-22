# Copilot Instructions — B4Code

> **These instructions are split by surface and concern.**
> Copilot loads only the file(s) relevant to the path you are editing.
> See `.github/instructions/` for the full split.

## Instruction files

| File | `applyWhen` (loaded for these paths) | ~Tokens |
|---|---|---|
| `shared-conventions.instructions.md` | `**` — all files | ~2,500 |
| `agent-workflow.instructions.md` | `**` — all files | ~10,000 |
| `frontend.instructions.md` | `prototype/**` — all frontend files | ~1,500 |

**Total loaded per agent call: ~14,000 (shared + workflow + frontend for prototype work)**

---

## Requirement tracking (frontend)

Before reading or editing TypeScript/TSX files in `prototype/src/`, agents must use the req scripts to find relevant files:

```bash
cd prototype
npm run req:find -- B4C-SCR-007        # files implementing screen 007
npm run req:find -- REQ-001            # files implementing a data requirement
npm run req:report -- --missing        # screens with no implementation yet
npm run req:diff                       # screens touched by current git changes
npm run req:index                      # rebuild index after making changes
```

Full guide: [`docs/frontend-requirement-tracking.md`](../docs/frontend-requirement-tracking.md)

**Rule**: Never manually grep source files for `@requirement` tags — use `req:find` first.

---

## reqtrack (backend/C# — if added later)

```bash
reqtrack find <RQ-ID> --format paths
reqtrack affected --file <name>
reqtrack report --missing
reqtrack diff --since main --format ids
reqtrack index
```

Install: `dotnet tool install -g reqtrack`
Full guide: [`docs/reqtrack-agent-guide.md`](../docs/reqtrack-agent-guide.md)

---

## How to change instructions

See [`docs/maintaining-instructions.md`](../docs/maintaining-instructions.md).

## Quick routing rule

> If a rule affects **one surface only** → put it in that surface's file.
> If a rule affects **two or more surfaces** → put it in `shared-conventions.instructions.md`.
> If a rule is about **the development process** (phases, PRs, issues) → put it in `agent-workflow.instructions.md`.
> If a rule is about **frontend requirement traceability** (`@requirement` JSDoc tags) → see `frontend.instructions.md` and [`docs/frontend-requirement-tracking.md`](../docs/frontend-requirement-tracking.md).

## Recent retrospective updates

<!-- Add RETRO-NNN entries here when instructions are updated from retrospective findings. -->
