# B4Code — Specificatiefabriek

> **Specify before you build.**

B4Code is an AI-first specification factory. It turns raw customer input into structured specification objects, traceability, document views, and readiness signals — before a single line of production code is written.

---

## This repository

This repo contains:

| Folder | Contents |
|--------|----------|
| `docs/intake/v1.0/` | Handover pack v0.1 specs (ROAD-001..005, design tokens, screen register, demo data) |
| `docs/requirements/v1.0/` | Structured requirement files (Phase 0 output) |
| `prototype/` | React + Vite + Tailwind clickable demo (20 screens, B4C-SCR-001..020) |
| `.github/instructions/` | Copilot agent instructions |
| `docs/phases/` | Development phase playbooks (from expert-waffle template) |

---

## Clickable demo

**Goal**: High-fidelity demo to validate design and UX with stakeholders. No real backend required.

**Demo case**: Kerkleden-app NGK Beverwijk (sanitized/fictitious data only)

**Tech stack**: React 18 + Vite + TypeScript + Tailwind CSS

```bash
cd prototype
npm install
npm run dev
# → open http://localhost:5173
```

**Minimum demo path** (11 steps):
Login → Workspace → Dashboard → Intake → Open vragen → Requirements → Use cases → Traceability → LFV → Readiness → Documentgeneratie → Handover

---

## Requirement tracking (frontend)

Every component is annotated with `@requirement` JSDoc tags linking it to B4C-SCR screen codes.

```bash
cd prototype
npm run req:index                   # rebuild .reqtrack/index.json
npm run req:find -- B4C-SCR-007    # which files implement screen 007?
npm run req:report                  # full coverage matrix (all 20 screens)
npm run req:report -- --missing     # screens not yet implemented
npm run req:diff                    # screens touched by current git changes
```

See [`docs/frontend-requirement-tracking.md`](docs/frontend-requirement-tracking.md) for the full guide.

---

## Development process

This project follows the **expert-waffle** Copilot-driven process (Phases 0–7).

See [`docs/process-overview.md`](docs/process-overview.md) for the phase map and [`docs/phases/`](docs/phases/) for per-phase playbooks.

Current status: **Phase 0 complete** — intake docs committed, CP-A checkpoint open.

---

## Team

| Name | Role |
|------|------|
| pgroene | Founder / Product owner |
