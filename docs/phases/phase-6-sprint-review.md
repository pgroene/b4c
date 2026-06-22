# Phase 6 — Sprint Review + Retrospective

| | |
|---|---|
| **Owner** | [Orchestrator](../agents/orchestrator.md) |
| **Trigger** | All sprint stories AND bugs are closed; all sprint PRs are merged |
| **Inputs** | Closed issues, merged PRs, previous sprint data |
| **Outputs** | Retrospective notes, instruction updates, next sprint plan |
| **Delegation** | [D-09](../delegation-playbook.md#d-09--sprint-retrospective), [D-13](../delegation-playbook.md#d-13--sprint-plan-review) |
| **Previous phase** | [Phase 5 — Feature Implementation](phase-5-implementation.md) |
| **Next phase** | [Phase 1 — Feature Breakdown](phase-1-feature-breakdown.md) (next epic/sprint) |

---

## Goal

Learn from the sprint, update instructions to prevent repeated failures, and plan the next sprint with clear priorities.

---

## Entry Criteria

Before starting Phase 6, verify:
- [ ] All stories in the sprint are closed
- [ ] All bugs in the sprint are closed
- [ ] All PRs from the sprint are merged

> If any item is not closed, do not proceed. Fix it first.

---

## Sprint Review Steps

### 1. Count the sprint outcomes

```bash
# Stories closed this sprint
gh issue list --state closed --label "story,sprint-N" --json number,title \
  --jq 'length'

# Features closed (all stories done)
gh issue list --state closed --label "enhancement,sprint-N" --json number,title

# Bugs fixed
gh issue list --state closed --label "bug,sprint-N" --json number,title

# PRs merged
gh pr list --state merged --json number,title,mergedAt \
  --jq '[.[] | select(.mergedAt >= "<sprint-start-date>")] | length'
```

### 2. Sprint Retrospective (D-09)

Answer these three questions:

**What went well?**
- Stories completed on time?
- Agent pipeline ran smoothly?
- No major rework?

**What was blocked or slow?**
- `needs-input` issues that delayed work?
- CI failures that required multiple fix cycles?
- Merge conflicts?
- Agent mistakes that required manual correction?

**What violated the process?**
- Feature Agent opened a PR with failing tests?
- PR Merge Agent merged with unresolved threads?
- Orchestrator assigned overlapping issues?
- Instructions were misunderstood or ignored?

### 3. Identify instruction gaps

For each process violation from step 2:
- Is there a rule in the instruction files that covers this? If yes — was it unclear? Rewrite it.
- Is there no rule covering this? This is an instruction gap.
- Follow the [instruction feedback loop](../instructions/instruction-feedback-loop.md) for each gap.

### 4. Open RETRO issues

For each instruction gap, open a GitHub issue:

```bash
gh issue create \
  --title "RETRO-NNN: <short description of the instruction gap>" \
  --label "chore" \
  --body "## Observation
<What happened during the sprint>

## Root cause
<Which instruction was missing or unclear>

## Proposed fix
<How to update the instruction file>

## File to update
<path to the instruction file>
"
```

See [instruction-feedback-loop.md](../instructions/instruction-feedback-loop.md) for the complete process.

### 5. Update the copilot-instructions.md header

Add a `## Recent retrospective updates` entry for each instruction change made this sprint:

```markdown
- **RETRO-NNN** — short description of what changed and why.
```

### 6. Plan the next sprint (D-13)

```bash
# List unstarted stories in the backlog
gh issue list --state open --label "story" --json number,title,labels

# Assign the next sprint label to selected stories
gh issue edit <number> --add-label "sprint-N+1"
```

Sprint sizing guidance:
- A sprint is typically 1–2 weeks
- Include 2–4 stories per Feature Agent slot per week
- Leave 20% capacity for bugs and architecture work
- Prioritize: bugs → architecture → features

---

## Exit Criteria

- [ ] Retrospective notes documented (in `docs/` or as GitHub issue comments)
- [ ] All instruction gaps have RETRO issues opened
- [ ] All instruction files updated for the sprint's gaps
- [ ] Next sprint stories have `sprint-N+1` label
- [ ] Architecture review scheduled if 5+ features completed
- [ ] **⏸ CP-E checkpoint issue is open** — Orchestrator has stopped and is waiting for next-sprint direction

## ⏸ CP-E — Post-Sprint Replan (after every Sprint Review)

After Phase 6 completes, the Orchestrator **must stop** and open a CP-E issue before kicking off the next sprint's CP-C:

```bash
gh issue create \
  --title "⏸ CP-E: Post-Sprint <N> Replan" \
  --label "checkpoint,needs-input" \
  --body "$(cat <<'EOF'
## ⏸ CP-E: Post-Sprint <N> Replan

### Sprint <N> summary
- Stories completed: <N>
- Stories deferred: <N> (#<n>, ...)
- Bugs opened: <N>
- RETRO issues opened: <N>

### Velocity and health
- Actual vs. planned: <actual>/<planned>
- Recurring blockers: <list>
- Instruction updates made: <list>

### Current build strategy
<strategy from CP-A/CP-C — still valid?>

### Proposed Sprint <N+1> direction
| Priority | Item | Type | Rationale |
|----------|------|------|-----------|
| 1 | <> | story/bug/spike | <why> |

### Questions for architect/PM
1. **Strategy change**: Should the current build approach change for next sprint?
2. **Scope adjustment**: Any epics/features to add, drop, or reprioritize?
3. **Team/capacity changes**: Anything affecting next sprint's capacity?
4. **Release decision**: Is the current build releasable? Plan a release?

---
_To unblock: comment with `✅ approved` then close this issue. A CP-C will follow to confirm the sprint scope._
EOF
)"
```

**Do not open CP-C for the next sprint until CP-E is closed.**

See full checkpoint protocol: [docs/checkpoints/replan-checkpoint.md](../checkpoints/replan-checkpoint.md)

---

## Common Pitfalls

| Pitfall | Remedy |
|---------|--------|
| Skipping the retro when the sprint went well | Even good sprints have lessons — document what worked |
| Not updating instructions | Retro without instruction updates = same mistakes next sprint |
| Over-planning the next sprint | Leave buffer for bugs and unplanned work |
| Starting Phase 6 before all issues are closed | Close or defer remaining work first |

---

## Related

- [Orchestrator Agent](../agents/orchestrator.md)
- [Process Overview](../process-overview.md)
- [Phase 5 — Feature Implementation](phase-5-implementation.md)
- [Instruction Feedback Loop](../instructions/instruction-feedback-loop.md)

