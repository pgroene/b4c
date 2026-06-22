---
applyWhen: "**"
---

# Shared Conventions — B4Code

> **Scope:** These conventions apply to **all files** in the repository.
> Surface-specific rules live in their own instruction files.

---

## Project Overview

B4Code is an **AI-first specification factory** — *Specify before you build*.

The `prototype/` folder contains a React + Vite + TypeScript + Tailwind CSS clickable demo (B4C-SCR-001..020). No real backend. All data is mock/sanitized.

> ⚠️ **Architecture status**: This is a demo/prototype phase. No production backend exists yet.

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### First-time setup

```bash
cd prototype
npm install
npm run dev     # → http://localhost:5173
```

---

## Requirement Tracking (frontend)

Every exported component, hook, or utility in `prototype/src/` **must** carry a JSDoc `@requirement` annotation linking it to one or more B4C-SCR screen codes.

### Before editing any `.tsx`/`.ts` file

```bash
cd prototype
npm run req:find -- B4C-SCR-007     # get exact files for a screen
npm run req:find -- REQ-001         # get files for a data requirement
```

### After adding, moving, or renaming components

```bash
cd prototype
npm run req:index                   # rebuild .reqtrack/index.json
git add .reqtrack/index.json        # always commit the updated index
```

### Annotation rules

| Case | Tag | Example |
|------|-----|---------|
| Screen component (1-to-1) | `@requirement B4C-SCR-xxx` | `@requirement B4C-SCR-007` |
| Shared component (N screens) | `@requirement B4C-SCR-xxx B4C-SCR-yyy` | `@requirement B4C-SCR-009 B4C-SCR-010` |
| Shell/global component | `@requirement *` + `@scope shell` | AppShell, RoleSwitcher in topbar |
| Data / mock files | `@requirement` for each screen that uses the data | `@requirement B4C-SCR-007 B4C-SCR-008` |

Full guide: [`docs/frontend-requirement-tracking.md`](docs/frontend-requirement-tracking.md)

**Rule**: Never scan source files manually for `@requirement` tags — always use `npm run req:find`.

---

## Known Tech Debt

| # | Area | Current approach | Risk | Action | Trigger |
|---|------|-----------------|------|--------|---------|
| TD-001 | Auth | Mock role-switcher, no real auth | Demo only, not production | Add real auth when connecting to backend | Post-demo phase |
| TD-002 | Data | Sanitized JSON mock data | Cannot test real edge cases | Replace with API layer | Post-demo phase |
| TD-003 | AI results | All AI output is mock/labeled | Stakeholders understand it's a demo | Connect to real AI-run | Post-demo phase |

---

## Coding Rules

### General

- Write only the code needed to satisfy the current screen requirement — no speculative generality.
- No inline `TODO` comments in committed code — open a GitHub issue instead.
- No secrets, connection strings, or passwords in source code.
- All mock/AI output **must** be labeled: use `proposed`, `mock`, or `accepted` badge — never hidden truth.

### Zero-warning policy

Warnings are treated as errors.

| Toolchain | Mechanism |
|-----------|-----------|
| TypeScript | `"strict": true` in tsconfig — all type errors fail the build |
| ESLint | `--max-warnings 0` — any warning fails the lint step |

---

## Branching Strategy

| Branch pattern | Purpose |
|---|---|
| `dev/{username}/{feature-slug}` | Screen / feature work |
| `fix/{issue}-{slug}` | Bug fixes |
| `chore/{description}` | Maintenance / tooling / config |
| `main` | Integration branch |

> ⚠️ **Never push directly to `main`** — always open a PR.

### Commit format

`type(scope): short description`

Examples:
- `feat(scr007): implement intake screen with AI-run trigger`
- `fix(scr012): traceability chain not rendering third node`
- `chore(req): rebuild requirement index after renaming ObjectCard`

---

## Pull Request Checklist

Before opening a PR, verify:
- [ ] `npm run build` exits 0 with zero warnings
- [ ] `npm run req:index` run and `.reqtrack/index.json` staged
- [ ] `npm run req:diff` output reviewed — requirement scope is correct
- [ ] All AI-result components have visible `proposed`/`mock`/`accepted` badge
- [ ] No real personal data in any mock data file
- [ ] New screens annotated with `@requirement` JSDoc tag

---

## CI Pipelines

| Pipeline | Trigger |
|---|---|
| PR Validation (build, lint, type-check) | Every PR |
| Requirement index staleness check | Every PR |
| Deploy prototype to GitHub Pages | Merge to `main` |

---

## Project Structure

```
.github/                  # Copilot instructions
docs/
  intake/v1.0/            # Raw handover specs (ROAD-001..005, tokens, etc.)
  requirements/v1.0/      # Structured requirement files (Phase 0 output)
  phases/                 # Development phase playbooks
  agents/                 # Agent role docs
prototype/
  src/
    screens/              # B4C-SCR-001..020 — one file per screen
    components/           # Shared components (AppShell, StatusBadge, etc.)
    data/                 # Mock data (sanitized Kerkleden-app)
    tokens/               # Design tokens → Tailwind config
  scripts/                # req:index, req:find, req:report, req:diff
  public/assets/          # Brand assets
.reqtrack/
  index.json              # Requirement-to-file index (committed, rebuilt by req:index)
```

---

## Team

| Name | GitHub login | Role |
|------|-------------|------|
| pgroene | @pgroene | Founder / Product owner |
