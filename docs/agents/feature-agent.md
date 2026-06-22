# Feature Agent

| | |
|---|---|
| **Role** | Implements one issue, creates a PR, then stops |
| **Instances** | Max 2 simultaneous |
| **Phases owned** | [3](../phases/phase-3-test-stubs.md), [5](../phases/phase-5-implementation.md) |
| **Launched by** | [Orchestrator](orchestrator.md) |
| **Hands off to** | [PR Merge Agent](pr-merge-agent.md) (via PR creation) |

---

## Core Responsibility

The Feature Agent is a **focused implementer**. It owns one issue from start to PR creation, then completely stops. It never monitors its own PR, never responds to review comments, and never merges anything.

**One instance = one issue = one branch = one PR.**

---

## Implementation Checklist (12 Steps)

### Step 1 — Read the issue
- Read the story/feature issue in full: title, body, acceptance criteria, edge cases
- Read any linked test stubs
- Do not start coding until every acceptance criterion is understood

### Step 2 — Provision a fresh working directory
```bash
BRANCH="dev/<username>/<feature-slug>"  # or fix/<issue>-<slug> for bugs
DEST="<workspaces>/parallel/<branch-as-dir>"
git clone <repo-url> "$DEST"
git -C "$DEST" checkout -b "$BRANCH"
git -C "$DEST" pull origin main --rebase
```

### Step 3 — Implement (TDD: red → green → refactor)
- Run existing test stubs first — confirm they are red
- Write minimum production code to pass one test
- Refactor before moving to the next test
- Follow all coding rules in `shared-conventions.instructions.md`
- **Do not write production code without a corresponding test**

### Step 4 — Run all unit/integration tests
```bash
# TODO: customize — your test command
# Must be 100% green before continuing
```

### Step 5 — Run the build
```bash
# TODO: customize — your build command
# Must exit 0 with zero warnings
```

### Step 6 — Run E2E tests (if applicable)
```bash
# TODO: customize — your E2E test command
```
> ⛔ **All E2E tests must pass.** If E2E was already red before your changes, stop and report the pre-existing failure to the Orchestrator. Do not open a PR.

### Step 7 — Rebase on latest main
```bash
cd "$DEST"
git fetch origin main
git rebase origin/main
# Resolve any conflicts, then:
git push origin "$BRANCH" --force-with-lease
```

### Step 8 — Re-run full test suite after rebase
A rebase can introduce regressions. Repeat Steps 4–6.

### Step 9 — Create the PR
```bash
gh pr create \
  --title "feat: <short description>" \
  --body "Closes #<issue-number>

## What was built
- <bullet list>

## Tests
- Unit: <X> passing
- E2E: all passing

## Rebase
Rebased on main at $(git rev-parse --short origin/main)
" \
  --base main \
  --head "$BRANCH"
```

### Step 10 — Request Copilot review
```bash
gh pr comment <PR> --body "@copilot please review this pr"
```

### Step 11 — Report back to the Orchestrator

```
✅ FEATURE AGENT COMPLETE
Issue:    #<number> — <title>
PR:       #<number> — <url>
Branch:   <branch-name>
Tests:    Unit: X passed | E2E: Z passed
Rebase:   Rebased on main at <short-sha>
Notes:    <anything the PR Merge Agent needs to know>
STOPPING.
```

### Step 12 — STOP
The Feature Agent's job is done. Do not:
- Monitor the PR
- Respond to review comments
- Push additional commits
- Check CI status

---

## What the Feature Agent Must NOT Do

| ❌ Never | Why |
|----------|-----|
| Merge the PR itself | PR Merge Agent owns all merges |
| Respond to PR review comments | PR Merge Agent owns review interactions |
| Push additional commits after PR is open | Coordination risk — PR Merge Agent may be rebasing |
| Work on more than one issue | Single responsibility per instance |
| Open a PR when any test is red | Red PR wastes PR Merge Agent time |
| Work directly in the main workspace | Always use a parallel slot directory |

---

## Branch Naming Convention

| Work type | Branch pattern |
|-----------|---------------|
| New feature | `dev/<username>/<feature-slug>` |
| Bug fix | `fix/<issue-number>-<slug>` |
| Test stubs | `test/stubs-<feature-slug>` |
| Chore / infrastructure | `chore/<description>` |

---

## Pre-PR Checklist

Before creating the PR:
- [ ] All tests pass (unit, integration)
- [ ] Build exits 0 with zero warnings
- [ ] E2E tests pass (if applicable)
- [ ] Rebased on latest main
- [ ] Test suite re-run after rebase
- [ ] No secrets in the diff
- [ ] PR description is complete

---

## Related

- [Process Overview](../process-overview.md)
- [Phase 3 — Test Stubs](../phases/phase-3-test-stubs.md)
- [Phase 5 — Feature Implementation](../phases/phase-5-implementation.md)
- [Orchestrator](orchestrator.md)
- [PR Merge Agent](pr-merge-agent.md)

