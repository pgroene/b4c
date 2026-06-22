# Phase 2 — User Stories

| | |
|---|---|
| **Owner** | [Orchestrator](../agents/orchestrator.md) |
| **Trigger** | All Feature issues are created (Phase 1 complete) |
| **Inputs** | `enhancement` (feature) issues |
| **Outputs** | `story` issues with bidirectional links to features and epics |
| **Delegation** | [D-03](../delegation-playbook.md#d-03--user-story-creation), [D-04](../delegation-playbook.md#d-04--bidirectional-issue-coupling) |
| **Previous phase** | [Phase 1 — Feature Breakdown](phase-1-feature-breakdown.md) |
| **Next phase** | [Phase 3 — Test Stubs](phase-3-test-stubs.md) |

---

## Goal

Decompose each Feature into concrete, implementable User Stories — each small enough to be implemented in a single PR and verified by a single acceptance test.

---

## Story Format

Write stories in the standard format:

> As a `<role>`, I want `<action>` so that `<outcome>`.

Examples:
- *As a user, I want to reset my password via email so that I can regain access to my account.*
- *As an admin, I want to export data to CSV so that I can share reports with stakeholders.*

---

## Steps

1. **For each Feature, add User Stories** as child issues:
   - Label: `story`
   - Title: `Story: <short description>`
   - Body: story sentence + acceptance criteria + edge cases

2. **Each story must be small enough** to implement in a single PR.
   If a story would require more than one PR, split it further.

3. **After adding each story, re-check consistency**:
   - Does this story assume behaviour defined elsewhere?
   - Does it introduce a data field or rule not covered by the domain model?
   - Update other stories/features if needed.

4. **Bidirectional coupling is mandatory** (see below).

5. Continue marking `needs-input` where stories reveal ambiguity — always with exact numbered questions.

---

## Bidirectional Coupling (Mandatory)

Every story must be bidirectionally linked:

### In the story body:
```markdown
Part of feature #<feature-number>
Part of epic #<epic-number>

## Story
As a <role>, I want <action> so that <outcome>.

## Acceptance criteria
- [ ] <criterion 1>
- [ ] <criterion 2>

## Edge cases
- <edge case 1>
```

### In the parent feature body — add to `## Stories` checklist:
```markdown
## Stories
- [ ] #<story-number> — short description
- [ ] #<story-number> — short description
```

### In the parent epic body — `## Features` checklist already exists from Phase 1.
Check off a feature when all its stories are implemented and merged.

---

## GitHub Commands

```bash
# Create a story issue
gh issue create \
  --title "Story: <description>" \
  --label "story" \
  --body "Part of feature #<feature-number>
Part of epic #<epic-number>

## Story
As a <role>, I want <action> so that <outcome>.

## Acceptance criteria
- [ ] <criterion 1>

## Edge cases
- <edge case>
"

# Update the parent feature's Stories checklist
# (edit the feature issue body to add the new story)
gh issue edit <feature-number> --body "<updated body with new story in checklist>"
```

---

## Entry Criteria

- [ ] All `enhancement` (feature) issues exist (Phase 1 complete)
- [ ] All `needs-input` features are resolved
- [ ] CP-A has been approved (build strategy is decided)

## Exit Criteria

- [ ] Every feature has at least one story
- [ ] Every story has acceptance criteria
- [ ] Bidirectional links are in place (story → feature, story → epic, feature → stories checklist)
- [ ] No story assumes undefined behaviour
- [ ] **⏸ CP-B checkpoint issue is open** — Orchestrator has stopped and is waiting for Sprint 1 kickoff approval

## ⏸ CP-B — Mandatory Stop After Phase 2

After all stories are created, the Orchestrator **must stop** and open a CP-B checkpoint issue before starting any Phase 5 implementation.

```bash
gh issue create \
  --title "⏸ CP-B: Pre-Sprint-1 Kickoff" \
  --label "checkpoint,needs-input" \
  --body "$(cat <<'EOF'
## ⏸ CP-B: Pre-Sprint-1 Kickoff

### Context
- Build strategy (from CP-A): <strategy>
- Total stories created: <N> across <N> features and <N> epics

### Proposed Sprint 1 scope
| Priority | Story | Feature | Epic | Rationale |
|----------|-------|---------|------|-----------|
| 1 | #<n> <title> | #<n> | #<n> | Foundation / dependency |
| 2 | #<n> <title> | #<n> | #<n> | Core user flow |

### Dependencies and risks
- <list any story ordering dependencies>

### Questions for architect/PM
1. **Sprint 1 scope**: Accept, or change?
2. **Priority order**: Is this the right sequence?
3. **Stories to defer**: Any proposed stories to move to Sprint 2?
4. **Stories to add**: Any missing stories?

---
_To unblock: comment with `✅ approved` (or `✅ approved with changes: ...`) then close this issue._
EOF
)"
```

**Do not start Phase 5 (implementation) until this issue is closed.**

See full checkpoint protocol: [docs/checkpoints/replan-checkpoint.md](../checkpoints/replan-checkpoint.md)

---

## Sprint Assignment

After stories are created, the Orchestrator assigns them to a sprint:

```bash
# Assign a story to a sprint
gh issue edit <story-number> --add-label "sprint-1"
```

Stories within a sprint are the unit of work for Feature Agents in Phase 5.

---

## Common Pitfalls

| Pitfall | Remedy |
|---------|--------|
| Stories that span multiple PRs | Split into smaller stories |
| Missing acceptance criteria | Every story must have at least one testable criterion |
| Skipping bidirectional links | The progress view depends on these — always update both sides |
| Role-less stories | Always specify who benefits from the story |

---

## Related

- [Orchestrator Agent](../agents/orchestrator.md)
- [Process Overview](../process-overview.md)
- [Phase 1 — Feature Breakdown](phase-1-feature-breakdown.md)
- [Phase 3 — Test Stubs](phase-3-test-stubs.md)

