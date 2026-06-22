# Process Overview

This document maps the 8 development phases to their owning agents, inputs, outputs, and links.

---

## Phase Summary Table

| Phase | Name | Owner Agent | Trigger | Outputs | Phase Doc | Checkpoint |
|-------|------|-------------|---------|---------|-----------|------------|
| 0 | Documentation Intake | [Orchestrator](agents/orchestrator.md) | New product docs | Epic issues | [→](phases/phase-0-documentation-intake.md) | **⏸ [CP-A](checkpoints/replan-checkpoint.md#cp-a--post-intake-strategy)** |
| 1 | Feature Breakdown | [Orchestrator](agents/orchestrator.md) | CP-A approved | Feature issues | [→](phases/phase-1-feature-breakdown.md) | — |
| 2 | User Stories | [Orchestrator](agents/orchestrator.md) | All features created | Story issues + links | [→](phases/phase-2-user-stories.md) | **⏸ [CP-B](checkpoints/replan-checkpoint.md#cp-b--pre-sprint-1-kickoff)** |
| 3 | Test Stubs | [Feature Agent](agents/feature-agent.md) | CP-B/CP-C approved | Failing test specs | [→](phases/phase-3-test-stubs.md) | — |
| 4 | Architecture Review | [Orchestrator](agents/orchestrator.md) | Every 5 features | Architecture issues | [→](phases/phase-4-architecture-review.md) | **⏸ [CP-D](checkpoints/replan-checkpoint.md#cp-d--architecture-remediation)** (when violations found) |
| 5 | Feature Implementation | [Feature Agent](agents/feature-agent.md) | CP-C approved | Merged PRs | [→](phases/phase-5-implementation.md) | — |
| 6 | Sprint Review | [Orchestrator](agents/orchestrator.md) | All sprint items closed | Retro + next plan | [→](phases/phase-6-sprint-review.md) | **⏸ [CP-E](checkpoints/replan-checkpoint.md#cp-e--post-sprint-replan)** |
| 7 | Deep Code Review | [PR Merge Agent](agents/pr-merge-agent.md) | Every 10 features | Bug/arch issues | [→](phases/phase-7-code-review.md) | — |

---

## Phase Flow Diagram

```
Product Docs
     │
     ▼
[Phase 0] Documentation Intake ──────────────────────── Orchestrator
     │ Creates: Epic issues
     │
     ▼ ⏸ CP-A: Post-Intake Strategy (HUMAN CHECKPOINT)
     │ Architect/PM decides: build strategy, MVP scope, tech stack
     │ Orchestrator STOPS until CP-A issue is closed
     │
     ▼
[Phase 1] Feature Breakdown ─────────────────────────── Orchestrator
     │ Creates: Feature issues (enhancement label)
     ▼
[Phase 2] User Stories ──────────────────────────────── Orchestrator
     │ Creates: Story issues + bidirectional links
     │
     ▼ ⏸ CP-B: Pre-Sprint-1 Kickoff (HUMAN CHECKPOINT)
     │ Architect/PM approves: Sprint 1 scope and priority order
     │ Orchestrator STOPS until CP-B issue is closed
     │
     ▼
[Phase 3] Test Stubs ────────────────────────────────── Feature Agent
     │ Creates: Failing test specs (PR opened, CI red)
     │
     ▼ ⏸ CP-C: Sprint Kickoff (HUMAN CHECKPOINT — every sprint)
     │ Architect/PM confirms: sprint scope, any strategy changes
     │ Orchestrator STOPS until CP-C issue is closed
     │
     ▼
[Phase 4] Architecture Review ───────────────────────── Orchestrator  ← every 5 features
     │ Creates: Architecture issues
     │ If violations found ──► ⏸ CP-D: Arch Remediation (HUMAN CHECKPOINT)
     ▼
[Phase 5] Feature Implementation ────────────────────── Feature Agent  ← per story
     │ Creates: Passing tests, merged PR, closed issues
     ▼
[Phase 6] Sprint Review ─────────────────────────────── Orchestrator  ← end of sprint
     │ Creates: Retro notes, instruction updates
     │
     ▼ ⏸ CP-E: Post-Sprint Replan (HUMAN CHECKPOINT)
     │ Architect/PM directs: next sprint, scope/strategy changes
     │ Orchestrator STOPS until CP-E issue is closed
     │
     ▼
[Phase 7] Deep Code Review ──────────────────────────── PR Merge Agent ← every 10 features
     │ Creates: Bug/architecture issues
     └──────────────────────────── back to Phase 1 (next Epic)
```

### Legend

- `⏸ CP-X` = mandatory hard stop — Orchestrator opens a GitHub issue and waits for human decision
- Human responds by closing the issue with a comment containing `✅ approved` or `✅ approved with changes: ...`
     └──────────────────────────── back to Phase 1 (next Epic)
```

---

## Work Priority Order

At any point in time, the Orchestrator prioritises work in this order:

| Priority | Activity |
|----------|----------|
| 🔴 **1** | PR Completion — resolve open PR review threads, merge gate-green PRs |
| 🟠 **2** | Bug Fixing — address open `bug` issues |
| 🟡 **3** | Story Completion — implement current-sprint stories |
| 🟢 **4** | Sprint Completion — retro, planning, next sprint |

---

## Replan Checkpoints

Five mandatory human-in-the-loop stops. No phase transition crosses a checkpoint boundary without explicit architect/PM approval.

| Checkpoint | When | What the human decides | Doc |
|------------|------|----------------------|-----|
| ⏸ **CP-A** | After Phase 0 | Build strategy, MVP scope, tech stack | [→](checkpoints/replan-checkpoint.md#cp-a--post-intake-strategy) |
| ⏸ **CP-B** | After Phase 2 | Sprint 1 scope and priority | [→](checkpoints/replan-checkpoint.md#cp-b--pre-sprint-1-kickoff) |
| ⏸ **CP-C** | Before each sprint | Sprint scope confirmation | [→](checkpoints/replan-checkpoint.md#cp-c--sprint-kickoff) |
| ⏸ **CP-D** | After Phase 4 (if violations) | Arch remediation approval | [→](checkpoints/replan-checkpoint.md#cp-d--architecture-remediation) |
| ⏸ **CP-E** | After Phase 6 | Next sprint direction | [→](checkpoints/replan-checkpoint.md#cp-e--post-sprint-replan) |

Full protocol: [docs/checkpoints/replan-checkpoint.md](checkpoints/replan-checkpoint.md)  
Build strategy guide: [docs/checkpoints/build-strategy-guide.md](checkpoints/build-strategy-guide.md)

---

## Delegation Index

Most phase activities can be delegated to a background sub-agent. See [delegation-playbook.md](delegation-playbook.md) for complete templates:

| Phase | Delegation Entry |
|-------|-----------------|
| 0 | D-01 — Documentation Intake + Epic Creation |
| 1 | D-02 — Feature Breakdown from Epics |
| 2 | D-03 — User Story Creation, D-04 — Bidirectional Coupling |
| 3 | D-05 — Test Stub Generation, D-06 — Test Backfill |
| 4 | D-08 — Architecture Review |
| 5 | D-07 — Feature Implementation (TDD) |
| 6 | D-09 — Sprint Retrospective, D-13 — Sprint Plan Review |
| 7 | D-10 — Deep Code Review |

---

## Related Documentation

- [Agent Guide — Orchestrator](agents/orchestrator.md)
- [Agent Guide — Feature Agent](agents/feature-agent.md)
- [Agent Guide — PR Merge Agent](agents/pr-merge-agent.md)
- [Delegation Playbook](delegation-playbook.md)
- [Creating Copilot Instructions](instructions/creating-instructions.md)
- [Selecting Copilot Instructions](instructions/selecting-instructions.md)
- [Instruction Feedback Loop](instructions/instruction-feedback-loop.md)

