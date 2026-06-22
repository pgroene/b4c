# Frontend Requirement Tracking

This document describes how B4Code tracks which frontend files implement which requirements. It mirrors the [reqtrack](reqtrack-agent-guide.md) approach used for C# backend code, adapted for TypeScript/React.

---

## Overview

Every exported component, hook, and utility in `prototype/src/` carries a JSDoc `@requirement` annotation. A lightweight scan script (`prototype/scripts/req-index.ts`) reads these annotations and writes `.reqtrack/index.json` — the **same format** as the C# reqtrack tool.

```
Source file with @requirement tag
        │
        ▼
  npm run req:index
        │
        ▼
.reqtrack/index.json  ←── committed to git, used by all req:* commands
        │
        ├── npm run req:find -- B4C-SCR-007   → which files implement screen 007?
        ├── npm run req:report                 → full coverage matrix
        ├── npm run req:report -- --missing    → screens not yet implemented
        └── npm run req:diff                   → screens touched by current git diff
```

---

## Requirement IDs in This Project

| ID type | Format | Example | Source |
|---------|--------|---------|--------|
| Screen | `B4C-SCR-NNN` | `B4C-SCR-007` | `docs/intake/v1.0/05_Prototype_Specificaties/screen_register_B4C_SCR_001_020.csv` |
| Data requirement | `REQ-NNN` | `REQ-001` | `docs/intake/v1.0/05_Prototype_Specificaties/screen_register_B4C_SCR_001_020.csv` |
| Use case | `UC-NNN` | `UC-001` | Mock data / traceability objects |
| Source | `SRC-NNN` | `SRC-001` | Mock data / waarheidsdossier |

The B4C-SCR codes are the primary tracking unit. REQ/UC/SRC codes are used in mock data and traceability components.

---

## Annotation Syntax

### Screen component (1-to-1 with B4C-SCR-xxx)

```tsx
/**
 * Intake screen — klantinput invoeren als herleidbare bron.
 *
 * @requirement B4C-SCR-007
 * @wave Wave01
 * @persona Consultant
 */
export function SCR007_Intake(): JSX.Element { ... }
```

### Shared component (used by specific screens)

List every screen that renders this component. One `@requirement` line per group of related screens is fine:

```tsx
/**
 * ObjectCard — requirement, use case, or source object card.
 *
 * @requirement B4C-SCR-008 B4C-SCR-009 B4C-SCR-010 B4C-SCR-011
 * @requirement B4C-SCR-012 B4C-SCR-013
 */
export function ObjectCard(props: ObjectCardProps): JSX.Element { ... }
```

### Shell / global component (rendered on every screen)

Use `*` to indicate all screens. Add `@scope shell` so the index can distinguish these from specific-screen components:

```tsx
/**
 * AppShell — dark SaaS shell (sidebar + topbar + content canvas).
 * Wraps every screen in the prototype.
 *
 * @requirement *
 * @scope shell
 */
export function AppShell({ children }: AppShellProps): JSX.Element { ... }
```

### Mock data / services

Annotate with every screen that reads this data:

```tsx
/**
 * Kerkleden-app sanitized demo data.
 * Source: docs/intake/v1.0/06_Demo_Data/kerkleden_app_demo_data_sanitized.json
 *
 * @requirement B4C-SCR-005 B4C-SCR-007 B4C-SCR-008 B4C-SCR-009 B4C-SCR-010
 * @requirement B4C-SCR-011 B4C-SCR-012 B4C-SCR-013 B4C-SCR-016
 */
export const mockData: MockData = { ... }
```

### React hooks

```tsx
/**
 * Returns the active demo persona.
 *
 * @requirement B4C-SCR-001 B4C-SCR-005 B4C-SCR-012 B4C-SCR-013 B4C-SCR-016
 */
export function usePersona(): Persona { ... }
```

---

## npm Scripts

All scripts live in `prototype/scripts/`. Run them from the `prototype/` directory.

### `req:index` — Rebuild the index

```bash
cd prototype
npm run req:index
```

**When to run:**
- After adding a new component or screen
- After adding/changing `@requirement` tags
- After renaming or moving a file
- At the start of a feature branch (ensure index is fresh)
- In CI (the pipeline checks the index is not stale)

Always commit the updated index:

```bash
git add .reqtrack/index.json
git commit -m "chore(req): rebuild requirement index"
```

---

### `req:find` — Find files for a requirement

```bash
cd prototype
npm run req:find -- B4C-SCR-007
```

**Example output:**

```
Requirement: B4C-SCR-007
─────────────────────────────────────────────────────────────
File                                   Line   Symbol              Type
prototype/src/screens/SCR007_Intake.tsx    5    SCR007_Intake       Component
prototype/src/data/mockData.ts            12    mockData            Data
prototype/src/components/AppShell.tsx      4    AppShell            Component  [scope: shell]
```

**Agent workflow:**

```bash
# 1. Find files for the screen you're working on
npm run req:find -- B4C-SCR-007        # → get the list of files

# 2. Read only those files                # no full-codebase scan needed

# 3. Make your changes

# 4. Rebuild the index
npm run req:index

# 5. Verify the new annotations are indexed
npm run req:find -- B4C-SCR-007
```

---

### `req:report` — Coverage matrix

```bash
cd prototype
npm run req:report               # full matrix — all 20 screens
npm run req:report -- --missing  # only screens with zero implementation files
```

**Example output (full report):**

```
B4C Requirement Coverage Report
═══════════════════════════════════════════════════════════
Screen          Wave    Files   Status
──────────────────────────────────────────────────────────
B4C-SCR-001     Wave01    3     ✅ covered
B4C-SCR-002     Wave01    2     ✅ covered
B4C-SCR-003     Wave01    2     ✅ covered
B4C-SCR-007     Wave01    3     ✅ covered
B4C-SCR-008     Wave01    0     ❌ missing
B4C-SCR-009     Wave01    0     ❌ missing
...
──────────────────────────────────────────────────────────
Total: 20 screens | 7 covered | 13 missing
```

---

### `req:diff` — Requirements touched by current changes

```bash
cd prototype
npm run req:diff                    # requirements in current uncommitted changes
npm run req:diff -- --since main    # requirements changed versus main branch
```

Use this in PR descriptions to clearly state which screens a PR touches.

**Example output:**

```
Changed files: 3
Affected screens: B4C-SCR-007, B4C-SCR-008
```

---

## `.reqtrack/index.json` Format

The index is committed to git and used by all `req:*` scripts. Format is compatible with the expert-waffle C# reqtrack tool:

```json
{
  "generated": "2026-06-22T19:00:00.000Z",
  "scannedPath": "prototype/src",
  "filesScanned": 30,
  "entries": [
    {
      "file": "prototype/src/screens/SCR007_Intake.tsx",
      "line": 5,
      "class": null,
      "member": "SCR007_Intake",
      "memberType": "Component",
      "screen": "B4C-SCR-007",
      "wave": "Wave01",
      "epic": null,
      "feature": null,
      "story": null,
      "requirement": "B4C-SCR-007",
      "notes": null
    },
    {
      "file": "prototype/src/components/AppShell.tsx",
      "line": 4,
      "class": null,
      "member": "AppShell",
      "memberType": "Component",
      "screen": "*",
      "wave": null,
      "epic": null,
      "feature": null,
      "story": null,
      "requirement": "*",
      "notes": "scope: shell"
    }
  ]
}
```

---

## CI Integration

The CI pipeline verifies the index is not stale:

```yaml
- name: Verify requirement index is up to date
  run: |
    cd prototype
    npm run req:index
    git diff --exit-code .reqtrack/index.json \
      || (echo "Index is stale — run 'npm run req:index' and commit the result" && exit 1)
```

If this step fails: run `npm run req:index` locally, commit `.reqtrack/index.json`, and push again.

---

## Comparison with C# reqtrack

| Aspect | C# (expert-waffle) | TypeScript (B4Code prototype) |
|--------|-------------------|-------------------------------|
| Annotation | `[Requirement("Epic001", "Feature003", "Story007", "RQ-042")]` | `/** @requirement B4C-SCR-007 */` |
| Scan tool | `dotnet tool: reqtrack` | `npm run req:index` (scripts/req-index.ts) |
| Index location | `.reqtrack/index.json` | `.reqtrack/index.json` (same) |
| Find command | `reqtrack find RQ-042 --format paths` | `npm run req:find -- B4C-SCR-007` |
| Coverage report | `reqtrack report --missing` | `npm run req:report -- --missing` |
| Diff command | `reqtrack diff --since main` | `npm run req:diff -- --since main` |
| Index format | Same JSON schema | Same JSON schema |
| Committed to git | ✅ Yes | ✅ Yes |
| CI staleness check | ✅ Yes | ✅ Yes |

---

## Screen Register Reference

All 20 screens and their codes are in:
`docs/intake/v1.0/05_Prototype_Specificaties/screen_register_B4C_SCR_001_020.csv`

| Code | Screen | Route | Wave |
|------|--------|-------|------|
| B4C-SCR-001 | Login & toegang | `/login` | Wave01 |
| B4C-SCR-002 | Workspace / tenant-keuze | `/workspaces` | Wave01 |
| B4C-SCR-003 | Klantomgeving overzicht | `/customers/ngk-beverwijk` | Wave01 |
| B4C-SCR-004 | Projectoverzicht | `/projects` | Wave01 |
| B4C-SCR-005 | Projectdashboard | `/projects/kapp/dashboard` | Wave01 |
| B4C-SCR-006 | Projectstart & classificatie | `/projects/kapp/classification` | Wave01 |
| B4C-SCR-007 | Intake-invoer & broninput | `/projects/kapp/intake` | Wave01 |
| B4C-SCR-008 | Waarheidsdossier light | `/projects/kapp/sources` | Wave01 |
| B4C-SCR-009 | Open vragen & validatiepunten | `/projects/kapp/questions` | Wave01 |
| B4C-SCR-010 | Requirements workspace | `/projects/kapp/requirements` | Wave01 |
| B4C-SCR-011 | Use cases workspace | `/projects/kapp/use-cases` | Wave01 |
| B4C-SCR-012 | Traceability light view | `/projects/kapp/traceability` | Wave01 |
| B4C-SCR-013 | Levend Functioneel Verhaal view | `/projects/kapp/lfv` | Wave01 |
| B4C-SCR-014 | Documentgeneratie preview | `/projects/kapp/documents` | Wave01 |
| B4C-SCR-015 | Prototypebriefing / schermset view | `/projects/kapp/prototype-briefing` | Wave01 |
| B4C-SCR-016 | PMO & readiness dashboard | `/projects/kapp/readiness` | Wave01 |
| B4C-SCR-017 | Routeprofiel & settings | `/projects/kapp/settings` | Wave02 |
| B4C-SCR-018 | AI-agent run panel | `/projects/kapp/ai-run` | Wave02 |
| B4C-SCR-019 | Knowledge Vault preview | `/projects/kapp/knowledge-vault` | Wave02 |
| B4C-SCR-020 | Export & B4Ops handover preview | `/projects/kapp/handover` | Wave02 |

---

## Related Documentation

- [reqtrack Agent Guide (C# backend)](reqtrack-agent-guide.md)
- [Frontend Instructions](./../.github/instructions/frontend.instructions.md)
- [Shared Conventions](./../.github/instructions/shared-conventions.instructions.md)
- [Process Overview](process-overview.md)
