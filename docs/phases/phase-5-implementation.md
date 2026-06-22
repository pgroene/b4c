# Phase 5 — Feature Implementation

| | |
|---|---|
| **Owner** | [Feature Agent](../agents/feature-agent.md) |
| **Trigger** | Story issue assigned to current sprint; test stubs exist (Phase 3 complete) |
| **Inputs** | Story issue, existing test stubs, current branch from Phase 3 |
| **Outputs** | All tests passing; PR created and linked to story |
| **Delegation** | [D-07 in delegation-playbook.md](../delegation-playbook.md#d-07--feature-implementation-tdd) |
| **Previous phase** | [Phase 3 — Test Stubs](phase-3-test-stubs.md) |
| **Next phase** | [Phase 6 — Sprint Review](phase-6-sprint-review.md) |

---

## Goal

Implement the feature following TDD — make the failing stubs pass, follow all coding rules, and open a clean PR with a green test suite.

---

## Implementation Checklist (12 Steps)

### Step 1 — Read the issue
- Read the story issue: acceptance criteria, edge cases, linked feature and epic
- Read the test stubs: understand what each test is asserting
- Do not start coding until you understand every acceptance criterion

### Step 2 — Provision a fresh working directory
```bash
BRANCH="dev/<username>/<feature-slug>"
DEST="<workspaces>/parallel/<branch-as-dir>"
git clone <repo-url> "$DEST"
git -C "$DEST" checkout -b "$BRANCH"
git -C "$DEST" pull origin main --rebase
```

### Step 3 — Implement (TDD: red → green → refactor)
- Run the test stubs — they should be red.
- Write the minimum production code to make one test pass.
- Refactor the implementation — keep it clean.
- Move to the next test. Repeat.
- Follow all coding rules in `shared-conventions.instructions.md`.
- Do not write production code that has no corresponding test.

### Step 4 — Run all unit/integration tests
```bash
# TODO: customize — your test command
# All tests must be 100% green before continuing
```

### Step 5 — Run the build
```bash
# TODO: customize — your build command
# Must exit 0 with zero warnings
```

### Step 6 — Run E2E tests (if applicable)
```bash
# TODO: customize — your E2E test command
# All E2E tests must pass — no exceptions
```
> ⛔ If E2E is already red before your changes, stop and report the pre-existing failure to the Orchestrator. Do not open a PR.

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
  --body "Closes #<story-number>

## What was built
- <bullet list of what was implemented>

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
Your final message must include:
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
Do not monitor the PR. Do not respond to review comments. Do not fix CI after the PR is open. That is the PR Merge Agent's responsibility.

---

## TDD Rules

- **Red first**: run the stub before writing any production code — confirm it fails
- **Green minimum**: write only enough code to pass the current failing test
- **Refactor**: clean up the implementation before moving to the next test
- **No production code without a test**: if there is no failing test for it, don't write it

---

## Entry Criteria

- [ ] Story issue has acceptance criteria
- [ ] Test stubs exist for all acceptance criteria (Phase 3 complete)
- [ ] Story is assigned to the current sprint
- [ ] No pre-existing E2E failures on main
- [ ] **⏸ CP-C (Sprint Kickoff) checkpoint is closed** — architect/PM has approved this sprint's scope

### CP-C — Sprint Kickoff (required before every sprint)

Before starting any Phase 5 work in a new sprint, the Orchestrator must open and get approval on a CP-C issue:

```bash
gh issue create \
  --title "⏸ CP-C: Sprint <N> Kickoff" \
  --label "checkpoint,needs-input" \
  --body "$(cat <<'EOF'
## ⏸ CP-C: Sprint <N> Kickoff

### Sprint context
- Sprint N of the project
- Previous sprint velocity: ~N stories
- Build strategy: <current strategy>

### Proposed Sprint <N> scope
| Story | Feature | Epic | Notes |
|-------|---------|------|-------|
| #<n> | | | |

### Open items from previous sprint
- Bugs: #<n>, ...
- Deferred stories: #<n>, ...

### Questions for architect/PM
1. **Sprint scope**: Accept, or adjust?
2. **Priority changes**: Any new priorities?
3. **Strategy change**: Any change to the current build approach?
4. **Blockers**: Any external dependencies to resolve first?

---
_To unblock: comment with `✅ approved` then close this issue._
EOF
)"
```

**Do not assign issues to Feature Agents until CP-C is closed.**

See full checkpoint protocol: [docs/checkpoints/replan-checkpoint.md](../checkpoints/replan-checkpoint.md)

## Exit Criteria

- [ ] All test stubs pass (replaced with real assertions)
- [ ] No new tests skipped or pending
- [ ] Build exits 0 with zero warnings
- [ ] **Requirement Validation Gate passed** — all acceptance criteria of every affected story are still satisfied (see below)
- [ ] PR is open with a complete description
- [ ] PR is linked to the story issue

## Requirement Validation Gate

Before opening the PR, run the full validation gate for every file changed:

```bash
# 1. Find all requirements the changed file implements
reqtrack affected --file <changed-file> --format paths

# 2. For each requirement, find its parent story
reqtrack find <RQ-ID> --format json   # look at "story" field

# 3. Read the story's acceptance criteria
gh issue view <story-issue-number> --json title,body

# 4. Verify each criterion is still met by the current implementation
#    If broken → open a bug issue and fix before creating the PR
```

**Shortcut for the whole PR:**
```bash
# Get all requirement IDs touched by this branch
reqtrack diff --since main --format ids

# Then fetch each story and check acceptance criteria
```

If any acceptance criterion is broken, open a bug issue (`gh issue create --label "bug"`) and fix it — **do not open the PR with a broken criterion**.

---

## Common Pitfalls

| Pitfall | Remedy |
|---------|--------|
| Implementing without reading the issue | Always read the issue and stubs first |
| Opening a PR with failing tests | Red PR = wasted PR Merge Agent time |
| Skipping the post-rebase test run | Rebase can break tests — always re-run |
| Monitoring the PR after creating it | Stop and report — PR Merge Agent owns this |

---

## Related

- [Feature Agent](../agents/feature-agent.md)
- [Process Overview](../process-overview.md)
- [Phase 3 — Test Stubs](phase-3-test-stubs.md)
- [Phase 6 — Sprint Review](phase-6-sprint-review.md)

