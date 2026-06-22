# Phase 1 — Feature Breakdown

| | |
|---|---|
| **Owner** | [Orchestrator](../agents/orchestrator.md) |
| **Trigger** | All Epic issues are created (Phase 0 complete) |
| **Inputs** | `epic` issues |
| **Outputs** | GitHub `enhancement` (feature) issues linked to epics |
| **Delegation** | [D-02 in delegation-playbook.md](../delegation-playbook.md#d-02--feature-breakdown-from-epics) |
| **Previous phase** | [Phase 0 — Documentation Intake](phase-0-documentation-intake.md) |
| **Next phase** | [Phase 2 — User Stories](phase-2-user-stories.md) |

---

## Goal

Decompose each Epic into concrete, implementable Features — each small enough to be broken into user stories that fit in a single sprint.

---

## Steps

1. **For each Epic, derive its Features** from the documentation:
   - One GitHub issue per Feature
   - Label: `enhancement`
   - Reference parent Epic: `Part of #<epic-issue-number>`
   - Description: what the feature does, acceptance criteria, edge cases

2. **After adding each Feature**, scan all existing feature issues for contradictions:
   - Does this feature conflict with another feature's scope?
   - Do data models overlap in an inconsistent way?
   - Fix contradictions immediately — don't defer.

3. **Mark ambiguous features** with `needs-input` plus:
   - `functional` — the question is about **what** the feature should do (product/UX question)
   - `technical` — the question is about **how** to implement it (architecture/impl question)
   - Both if the question spans both concerns

4. **Write exact, numbered questions** for any `needs-input` feature.
   Each question must be self-contained and answerable directly.

5. **If a `needs-input` feature blocks the parent Epic**, add `blocker` to both.

6. **Update the parent Epic's `## Features` checklist** after creating each feature.

---

## GitHub Commands

```bash
# Create a Feature issue
gh issue create \
  --title "Feature: <Name>" \
  --label "enhancement" \
  --body "Part of #<epic-number>

## Overview
<What this feature does>

## Acceptance criteria
- [ ] <criterion 1>
- [ ] <criterion 2>

## Edge cases
- <edge case 1>

## Stories
<!-- Populated during Phase 2 -->
"

# Mark as needing input (product/UX question)
gh issue edit <number> --add-label "needs-input,functional"

# Mark as needing input (architecture/impl question)
gh issue edit <number> --add-label "needs-input,technical"

# Add exact questions as a comment
gh issue comment <number> --body "⚠️ **needs-input** — please answer the following before implementation can begin:

1. <Exact question>
2. <Exact question>

Blocked until all questions above are answered in this thread."

# If this blocks the parent Epic
gh issue edit <feature-number> --add-label "blocker"
gh issue edit <epic-number> --add-label "blocker"

# Update parent Epic's Features checklist
gh issue edit <epic-number> --body "$(gh issue view <epic-number> --json body -q .body)
- [ ] #<feature-number> — <short description>"
```

---

## Entry Criteria

- [ ] All `epic` issues exist (Phase 0 complete)
- [ ] Each Epic has a clear boundary

## Exit Criteria

- [ ] All features from the documentation are created
- [ ] No two features have contradictory scope
- [ ] All `needs-input` features have exact numbered questions
- [ ] Each Epic's `## Features` checklist is up to date

---

## Consistency Rule

> The application must be internally consistent at all times. A feature that contradicts another is a defect in the plan — resolve it before moving on.

---

## Common Pitfalls

| Pitfall | Remedy |
|---------|--------|
| Features that are too large | A feature that can't be done in one sprint should be split |
| Skipping the contradiction check | Run it after every new feature — it gets harder to fix retroactively |
| Vague acceptance criteria | Write criteria in observable terms: "user can do X", "system returns Y" |
| Moving on with unresolved `needs-input` | Blocked features must be resolved before implementation |

---

## Related

- [Orchestrator Agent](../agents/orchestrator.md)
- [Process Overview](../process-overview.md)
- [Phase 0 — Documentation Intake](phase-0-documentation-intake.md)
- [Phase 2 — User Stories](phase-2-user-stories.md)

