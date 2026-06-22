# Replan Checkpoints

Replan Checkpoints are **mandatory hard stops** in the development process where the Orchestrator pauses, presents a structured decision document, and waits for the architect/PM to review and approve before any further work proceeds.

No autonomous agent may cross a checkpoint boundary without an explicit human decision on record.

---

## Why Checkpoints Exist

The agent pipeline is autonomous by design — but autonomy without human steering leads to:
- Building the wrong layer first (e.g. full UI before any API exists)
- Wrong MVP scope (building 20 features when 5 would validate the hypothesis)
- Architecture drift that compounds silently across sprints
- Implementation strategy misalignments discovered only after significant rework

Checkpoints give the architect/PM a **regular, structured opportunity to steer** without needing to monitor every commit or PR.

---

## Checkpoint Index

| ID | Name | Trigger | Phase transition blocked |
|----|------|---------|--------------------------|
| [CP-A](#cp-a--post-intake-strategy) | Post-Intake Architecture & Build Strategy | Phase 0 complete (all epics created) | Phase 0 → Phase 1 |
| [CP-B](#cp-b--pre-sprint-1-kickoff) | Pre-Sprint-1 Kickoff | Phase 2 complete (all stories created) | Phase 2 → Phase 5 (Sprint 1) |
| [CP-C](#cp-c--sprint-kickoff) | Sprint Kickoff | Start of every sprint (before Phase 5) | Sprint N → Phase 5 |
| [CP-D](#cp-d--architecture-remediation) | Architecture Remediation | Phase 4 with violations found | Phase 4 → implementation of fixes |
| [CP-E](#cp-e--post-sprint-replan) | Post-Sprint Replan | Phase 6 complete (retro done) | Phase 6 → next sprint planning |

---

## Checkpoint Protocol

### Orchestrator side (hard stop)

1. **Generate the checkpoint document** — fill in the template for the relevant checkpoint (see below).
2. **Open a GitHub issue**:
   ```bash
   gh issue create \
     --title "⏸ CP-X: <Checkpoint Name> — Sprint <N> / Phase <N>" \
     --label "checkpoint,needs-input" \
     --body "<checkpoint document content>"
   ```
3. **STOP** — do not proceed to the next phase. Post in the session:
   ```
   ⏸ CHECKPOINT CP-X OPEN
   Issue: #<number> — <url>
   Waiting for architect/PM decision before proceeding to <next phase/sprint>.
   STOPPING until unblocked.
   ```
4. **Wait** for the issue to be closed OR for a comment containing one of:
   - `✅ approved` — proceed as documented
   - `✅ approved with changes: <changes>` — proceed with specified modifications
   - `🔄 revised: <revised plan>` — replan and create a new checkpoint issue

### Human side (architect/PM)

1. Read the checkpoint issue.
2. Review the Orchestrator's proposed approach and options.
3. Make your decision — answer all questions in the template.
4. Comment on the issue with your decision:
   ```
   ✅ approved

   Build strategy: Hybrid (foundation first, then vertical)
   Sprint 1 scope: Epic001 / Feature003 stories (#7, #8, #9)
   Notes: Skip the reporting feature for now — focus on core order flow
   ```
5. Close the issue. The Orchestrator will resume on next check.

### Orchestrator side (resume)

1. Read the closed issue comments.
2. Extract the human's decisions.
3. Create a **Decision Record** comment on the issue:
   ```
   📋 Decision recorded:
   - Strategy: Hybrid
   - Sprint 1: #7, #8, #9
   - Notes: Skip reporting
   Proceeding to Phase <N>.
   ```
4. Continue with the approved plan.

---

## CP-A — Post-Intake Architecture & Build Strategy

**Triggered**: After Phase 0 — all Epic issues are created.  
**Blocks**: Phase 1 (Feature Breakdown).  
**Owner**: Orchestrator opens; Architect/PM decides.

### CP-A Checkpoint Document Template

```markdown
## ⏸ CP-A: Post-Intake Architecture & Build Strategy

### Context
- Epics created: N
- Epic list: #<n> <title>, #<n> <title>, ...
- Documentation source: <folder/URL>

### Summary of what we know
<2-3 sentence summary of the product scope from the documentation>

### Open architectural questions
1. <Question about tech stack, e.g. "The docs mention a 'real-time dashboard' — does this require WebSockets or is polling acceptable?">
2. <Question about scale, e.g. "Expected user count in Year 1 — does this affect infrastructure choices?">
3. <Any other ambiguity that affects how to structure the implementation>

### Proposed build strategy
<!-- See docs/checkpoints/build-strategy-guide.md for options -->
Recommendation: **Hybrid** — Sprint 1 builds the horizontal foundation (database schema, auth, CI pipeline), then subsequent sprints deliver vertical features.

Rationale: <why this recommendation>

### Alternative strategies considered
| Option | Trade-off |
|--------|-----------|
| Vertical slices | ... |
| Horizontal layers | ... |

### Questions for architect/PM
1. **Build strategy**: Vertical / Horizontal / Hybrid?
2. **MVP scope**: Which Epics are in scope for the first release?
3. **Tech stack confirmation**: <list the assumed stack — confirm or change>
4. **Spike needed**: Are there any unknowns that require a technical spike before Feature Breakdown?
5. **Timeline**: Any hard deadlines that affect sprint sizing?
```

---

## CP-B — Pre-Sprint-1 Kickoff

**Triggered**: After Phase 2 — all User Stories for all features are created.  
**Blocks**: Sprint 1 Phase 5 implementation.  
**Owner**: Orchestrator opens; Architect/PM decides.

### CP-B Checkpoint Document Template

```markdown
## ⏸ CP-B: Pre-Sprint-1 Kickoff

### Context
- Epics: N | Features: N | Stories: N total
- Build strategy approved in CP-A: <strategy>

### Proposed Sprint 1 scope
Based on the approved strategy and story dependencies:

| Priority | Story | Feature | Epic | Rationale |
|----------|-------|---------|------|-----------|
| 1 | #<n> <title> | #<n> | #<n> | Foundation / dependency for other stories |
| 2 | #<n> <title> | #<n> | #<n> | Core user flow |
| ... | | | | |

Estimated: N stories × ~X days each = Y days

### Dependencies and risks
- Story #<n> depends on Story #<n> being merged first
- <Any external dependencies>
- <Any technical unknowns>

### Questions for architect/PM
1. **Sprint 1 scope**: Accept the proposed stories, or change?
2. **Priority order**: Is this the right sequence?
3. **Any stories to defer**: Should any proposed stories move to Sprint 2?
4. **Any stories to add**: Are there missing stories from the backlog?
```

---

## CP-C — Sprint Kickoff

**Triggered**: Before each sprint's Phase 5 begins (Sprint 2, 3, ...).  
**Blocks**: Sprint N Phase 5 implementation.  
**Owner**: Orchestrator opens; Architect/PM decides.

### CP-C Checkpoint Document Template

```markdown
## ⏸ CP-C: Sprint <N> Kickoff

### Sprint context
- Sprint N of the project
- Previous sprint: N-1 stories completed, N bugs fixed, N PRs merged
- Velocity: ~N stories per sprint (based on last N sprints)

### Proposed Sprint <N> scope
| Story | Feature | Epic | Notes |
|-------|---------|------|-------|
| #<n> | #<n> | #<n> | |
| ... | | | |

### Open items from previous sprint
- Bugs from Sprint N-1: #<n>, #<n>
- Architecture issues: #<n>
- Deferred stories: #<n>

### Questions for architect/PM
1. **Sprint scope**: Accept, or adjust?
2. **Priority changes**: Any new priorities from stakeholders?
3. **Build approach for this sprint**: Any change to the current strategy?
4. **Blockers**: Any external dependencies to resolve before starting?
```

---

## CP-D — Architecture Remediation

**Triggered**: After Phase 4 when one or more architectural violations are found.  
**Blocks**: Implementation of the proposed fixes.  
**Owner**: Orchestrator opens; Architect decides.

### CP-D Checkpoint Document Template

```markdown
## ⏸ CP-D: Architecture Remediation

### Context
- Architecture review covered: PRs #<n>–#<n>
- Violations found: N

### Violations and proposed fixes
| # | Violation | File | Rule | Proposed fix | Estimated effort |
|---|-----------|------|------|-------------|-----------------|
| 1 | <description> | <file:line> | <rule from shared-conventions> | <fix> | S/M/L |
| ... | | | | | |

### Questions for architect/PM
1. **Accept all proposed fixes**: Yes / No / Review individually
2. **Sprint assignment**: Fix in current sprint or next sprint?
3. **Any violations to defer** (add to tech debt table instead)?
4. **Rule update needed**: Should any violation trigger an instruction update?
```

---

## CP-E — Post-Sprint Replan

**Triggered**: After Phase 6 — sprint retro is complete and instruction updates are done.  
**Blocks**: Next sprint planning (start of Phase 6 step 6).  
**Owner**: Orchestrator opens; Architect/PM decides.

### CP-E Checkpoint Document Template

```markdown
## ⏸ CP-E: Post-Sprint <N> Replan

### Sprint <N> summary
- Stories completed: N / N planned
- Bugs fixed: N
- PRs merged: N
- Instruction updates: N (RETRO-NNN, ...)
- Velocity: N story points / stories

### Retrospective highlights
**What went well:**
- <item>

**What was slow/blocked:**
- <item>

**Process violations (if any):**
- <item>

### Backlog state
- Stories remaining: N across N features
- Features complete: N / N
- Epics complete: N / N
- Estimated sprints remaining: N

### Proposed next sprint (Sprint <N+1>)
| Story | Feature | Epic | Priority | Notes |
|-------|---------|------|----------|-------|
| #<n> | | | | |

### Strategy review
- Current build strategy: <vertical/horizontal/hybrid>
- **Should the strategy change?** <Orchestrator's assessment>

### Questions for architect/PM
1. **Direction change**: Should the build strategy change for the next sprint?
2. **Scope change**: Any features added, removed, or reprioritized?
3. **MVP checkpoint**: Are we close enough to a releasable MVP?
4. **Next sprint scope**: Accept proposed stories, or adjust?
5. **Any new documentation** to intake (Phase 0 again)?
```

---

## Checkpoint Label Setup

Create these labels in your GitHub repository:

```bash
gh label create "checkpoint"  --color "#0052cc" --description "Human-in-the-loop replan checkpoint — agent is paused"
gh label create "needs-input" --color "#e4e669" --description "Awaiting human decision"
```

---

## Related

- [Build Strategy Guide](build-strategy-guide.md)
- [Process Overview](../process-overview.md)
- [Orchestrator Agent](../agents/orchestrator.md)
- [Phase 0 — Documentation Intake](../phases/phase-0-documentation-intake.md)
- [Phase 6 — Sprint Review](../phases/phase-6-sprint-review.md)

