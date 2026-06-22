# Phase 7 — Deep Code Review

| | |
|---|---|
| **Owner** | [PR Merge Agent](../agents/pr-merge-agent.md) |
| **Trigger** | Every 10 features completed |
| **Inputs** | Last 10 merged PRs |
| **Outputs** | Bug/architecture issues, updated tech debt table, potential instruction updates |
| **Delegation** | [D-10 in delegation-playbook.md](../delegation-playbook.md#d-10--deep-code-review) |
| **Previous phase** | [Phase 5 — Feature Implementation](phase-5-implementation.md) |
| **Next phase** | Continues into next sprint (Phase 1 of next epic or Phase 5 of next sprint) |

---

## Goal

Catch systemic issues — dead code, duplicated logic, missing tests, security gaps, performance risks — that individual PRs might miss because they are reviewed in isolation.

---

## Steps

### 1. Identify the last 10 merged PRs

```bash
gh pr list --state merged --limit 10 --json number,title,mergedAt \
  --jq '.[] | "#\(.number) \(.title) (\(.mergedAt))"'
```

### 2. For each PR, read the full diff

```bash
gh pr diff <number>
```

### 3. Check for the following issues

**Dead code:**
- Functions defined but never called
- Exported symbols with no internal or external consumers
- Feature flags / toggles that are always on or off

**Duplicated logic:**
- The same business rule implemented in more than one place
- Copy-pasted validation or transformation code
- Query patterns duplicated across repositories or services

**Missing tests:**
- Public methods with no corresponding test
- Edge cases in acceptance criteria that have no test
- Error paths that are not exercised

**Security issues:**
- Secrets or credentials in code (even in comments)
- Missing input validation on user-supplied data
- Missing authorization checks on new endpoints
- Insecure defaults

**Performance risks:**
- N+1 query patterns
- Unbounded list queries without pagination
- Synchronous blocking calls in async contexts

**Architectural violations:**
- Inner layers depending on outer layers
- Direct instantiation of concrete dependencies
- Business logic in controllers or API handlers

### 4. Re-validate requirements for all changed code

For each of the 10 PRs, check whether the code changes affected any requirements and whether those requirements' acceptance criteria are still met:

```bash
# Get requirement IDs touched by a PR's changes
reqtrack diff --since <base-sha-before-pr> --format ids

# For each requirement ID, get the parent story and re-read acceptance criteria
reqtrack find <RQ-ID> --format json   # look at "story" field
gh issue view <story-issue-number> --json title,body
```

Open a bug issue for any criterion that is no longer satisfied:

```bash
gh issue create \
  --title "Bug: <RQ-ID> — acceptance criterion broken" \
  --label "bug" \
  --body "## Broken requirement
Requirement: <RQ-ID>
Story: #<issue-number>

## Criterion that is broken
- [ ] <exact text from the story issue>

## Where it broke
PR: #<pr-number>
File: <path>, line ~<n>

## Proposed fix
<description>
"
```

### 5. Open issues for each finding

```bash
# Bug
gh issue create \
  --title "Bug: <description>" \
  --label "bug" \
  --body "## Found in deep code review (PRs #<n>–#<n>)

## Description
<what the bug is>

## Location
File: <path>
Lines: <range>

## Risk
<low/medium/high> — <why>

## Fix
<how to fix>
"

# Architecture issue
gh issue create \
  --title "Architecture: <description>" \
  --label "architecture" \
  --body "## Found in deep code review

## Violation
<which rule was violated>

## Location
<file and lines>

## Fix
<how to correct>
"
```

### 5. Update the tech debt table

If any finding represents a deliberate shortcut rather than an oversight, add it to the tech debt table in `shared-conventions.instructions.md`:

```markdown
| TD-NNN | <Area> | <Current approach> | <Risk> | <Action> | <Trigger> | #<issue> |
```

### 6. Propose instruction updates

If the same violation appears in multiple PRs (3+), it should become a rule:
- Follow the [instruction feedback loop](../instructions/instruction-feedback-loop.md)
- Open a RETRO issue and update the appropriate instruction file

---

## Entry Criteria

- [ ] 10 features have been completed since the last deep code review

## Exit Criteria

- [ ] All 10 PRs reviewed against the full checklist
- [ ] All findings have open issues
- [ ] **All affected requirements re-validated** — acceptance criteria checked for every requirement touched by the 10 PRs; bug issues opened for any broken criterion
- [ ] Tech debt table updated if applicable
- [ ] Instruction updates proposed for systemic patterns

---

## Deep Review vs. Regular Review

| | Regular PR Review | Deep Code Review (Phase 7) |
|---|---|---|
| **Trigger** | Every PR | Every 10 features |
| **Scope** | Single PR diff | Last 10 PRs holistically |
| **Reviewer** | PR Merge Agent | PR Merge Agent |
| **Focus** | Correctness + standards for this PR | Systemic patterns + accumulation of debt |
| **Output** | Review comments + merge | Issues + tech debt updates + instruction proposals |

---

## Common Pitfalls

| Pitfall | Remedy |
|---------|--------|
| Skipping the review at the 10-feature mark | Schedule it as a hard gate |
| Only reviewing the newest PRs | Read all 10 — systemic patterns span multiple PRs |
| Silently noting issues without opening GitHub issues | Issues are the record — notes without issues get lost |
| Not proposing instruction updates for patterns | If it happens in 3+ PRs, it must become a rule |

---

## Related

- [PR Merge Agent](../agents/pr-merge-agent.md)
- [Process Overview](../process-overview.md)
- [Phase 5 — Feature Implementation](phase-5-implementation.md)
- [Phase 6 — Sprint Review](phase-6-sprint-review.md)
- [Instruction Feedback Loop](../instructions/instruction-feedback-loop.md)

