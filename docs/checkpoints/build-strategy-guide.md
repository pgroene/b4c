# Build Strategy Guide

This guide helps architects and PMs choose the right implementation strategy at **Checkpoint CP-A** (and revisit it at CP-E). The three canonical strategies are: **Vertical Slices**, **Horizontal Layers**, and **Hybrid**.

---

## The Three Strategies

### Option A — Vertical Slices

Build one complete feature at a time, end-to-end (database → domain → API → UI → tests).

```
Sprint 1: Feature A — full stack (DB + Domain + API + UI)
Sprint 2: Feature B — full stack
Sprint 3: Feature C — full stack
```

**Flow:**
```
┌─────────────────────────────────────────┐
│ Sprint 1                                │
│  DB schema (Feature A tables)           │
│  Domain logic (Feature A)               │
│  API endpoint (Feature A)               │
│  UI screen (Feature A)                  │
│  Tests (Feature A, all layers)          │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ Sprint 2                                │
│  DB schema (Feature B tables)           │
│  ... (Feature B, full stack)            │
└─────────────────────────────────────────┘
```

**When to choose vertical slices:**
- ✅ Requirements are uncertain — you want to validate each feature with stakeholders
- ✅ Demo-driven development — you need something shippable every sprint
- ✅ Small team — no specialization, everyone builds full-stack
- ✅ Greenfield projects with a clear "walking skeleton" first
- ❌ Avoid when: features share significant infrastructure that is wasteful to build repeatedly

---

### Option B — Horizontal Layers

Build one architectural layer at a time across all features.

```
Sprint 1: All database tables + migrations
Sprint 2: All domain logic + repositories
Sprint 3: All API endpoints
Sprint 4: All UI screens
Sprint 5: Integration + E2E tests
```

**Flow:**
```
┌─────────────────────────────────────────────┐
│ Sprint 1 — Database Layer                   │
│  All tables, migrations, seed data          │
│  Feature A tables | Feature B tables | ...  │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│ Sprint 2 — Domain + API Layer               │
│  Domain logic + repositories + endpoints   │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│ Sprint 3 — UI Layer                         │
│  All screens and components                 │
└─────────────────────────────────────────────┘
```

**When to choose horizontal layers:**
- ✅ Requirements are stable and fully defined upfront
- ✅ Team has clear specializations (DB team, backend team, frontend team)
- ✅ Architecture must be consistent across all features (shared patterns enforced in one sprint)
- ❌ Avoid when: you need early demos or stakeholder validation
- ❌ Avoid when: requirements may change — rework propagates upward through all layers

---

### Option C — Hybrid (Recommended for most projects)

**Sprint 1** builds the horizontal foundation. Subsequent sprints deliver vertical features.

```
Sprint 1: Horizontal Foundation
  - Database schema (all core tables)
  - Auth + security infrastructure
  - CI/CD pipeline
  - Project structure + shared conventions enforced
  - Walking skeleton (empty API + empty UI running together)

Sprint 2+: Vertical Features (one per sprint or grouped)
  - Feature A: Domain + API + UI (DB already exists)
  - Feature B: Domain + API + UI
  - ...
```

**Flow:**
```
┌─────────────────────────────────────────────────────┐
│ Sprint 1 — Foundation (horizontal)                  │
│  Core DB schema | Auth | CI | Shared conventions    │
│  Walking skeleton verified end-to-end               │
└─────────────────────────────────────────────────────┘
         │              │              │
         ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Sprint 2     │ │ Sprint 3     │ │ Sprint 4     │
│ Feature A    │ │ Feature B    │ │ Feature C    │
│ (vertical)   │ │ (vertical)   │ │ (vertical)   │
└──────────────┘ └──────────────┘ └──────────────┘
```

**When to choose hybrid:**
- ✅ Most projects — the foundation eliminates duplication while vertical sprints stay demo-able
- ✅ When auth/security must be rock-solid before business features are built
- ✅ When the DB schema needs to be agreed on before any implementation starts
- ✅ When CI/CD and testing infrastructure should be in place before the first feature

---

## Decision Matrix

Answer these questions to choose your strategy:

| Question | If YES → | If NO → |
|----------|----------|---------|
| Are requirements fully defined and stable? | Horizontal or Hybrid | Vertical or Hybrid |
| Do you need demos/validation every sprint? | Vertical or Hybrid | Horizontal |
| Is there shared infrastructure (auth, DB, CI) that all features depend on? | Hybrid | Vertical |
| Does the team have clear layer specializations? | Horizontal | Vertical or Hybrid |
| Is this a greenfield project? | Hybrid (foundation first) | Vertical |
| Is the DB schema complex and shared across features? | Horizontal or Hybrid | Vertical |
| Is the timeline tight and requirements may change? | Vertical | Horizontal |

**Tie-breaker**: When in doubt, choose **Hybrid** — it provides a solid technical foundation without blocking stakeholder feedback.

---

## Foundation Sprint Contents (for Hybrid)

When choosing Hybrid, Sprint 1 (the foundation sprint) typically includes:

### Must have
- [ ] Database: all core tables with migrations (or the full schema if DB-first)
- [ ] Auth: authentication + authorization infrastructure
- [ ] Project structure: folders, namespaces, shared conventions enforced
- [ ] CI/CD: pipeline running, tests green, build artifact created
- [ ] Walking skeleton: API starts → UI connects → health check passes end-to-end

### Nice to have (if time allows)
- [ ] Seed data for development/testing
- [ ] Docker Compose for local development
- [ ] Error handling middleware
- [ ] Logging and observability basics

### Not in the foundation sprint
- ❌ Business features (those go in subsequent vertical sprints)
- ❌ UI polish or styling (placeholder screens are fine)
- ❌ Comprehensive test coverage (unit tests for auth, yes; E2E for business flows, no)

---

## Questions for the Architect/PM at CP-A

At Checkpoint CP-A, the human must answer these questions in writing:

### Required decisions

1. **Build strategy**: Vertical / Horizontal / Hybrid?
2. **MVP scope**: Which Epics are in scope for the first release? (Close others as `deferred`)
3. **Tech stack**: Confirm the assumed stack or specify changes
   - Backend: `<!-- e.g. ASP.NET Core 8, PostgreSQL -->`
   - Frontend: `<!-- e.g. React + TypeScript -->`
   - Infrastructure: `<!-- e.g. Azure, Docker, Terraform -->`
4. **Foundation first**: If Hybrid — what goes in Sprint 1's foundation?
5. **Feature priority**: Which feature should be the first vertical slice (Sprint 2)?

### Optional decisions

6. **Spike required**: Is there a technical unknown that needs investigation before development?
7. **Team structure**: Are there specialist sub-teams that affect layer sequencing?
8. **Hard deadline**: Is there a date that forces a minimum viable subset?

---

## Documenting the Strategy Decision

After CP-A is approved, create a file in the repo:

```bash
# docs/architecture-decisions/ADR-001-build-strategy.md
```

Template:
```markdown
# ADR-001 — Build Strategy

**Date**: <date>
**Status**: Accepted
**Deciders**: <names>

## Decision
We will use the **<Vertical / Horizontal / Hybrid>** build strategy.

## Rationale
<why this strategy fits this project>

## Foundation scope (if Hybrid)
- <item 1>
- <item 2>

## Consequences
- Sprint 1 will deliver: <deliverable>
- First demo-able feature will be ready by: Sprint <N>
```

---

## Related

- [Replan Checkpoint Protocol](replan-checkpoint.md)
- [Process Overview](../process-overview.md)
- [Phase 0 — Documentation Intake](../phases/phase-0-documentation-intake.md)

