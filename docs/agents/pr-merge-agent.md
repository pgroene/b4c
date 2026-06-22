# PR Merge Agent

| | |
|---|---|
| **Role** | Sequentially merges PRs, owns CI fixes and review threads |
| **Instances** | 1 (always running) |
| **Phases owned** | [7](../phases/phase-7-code-review.md) |
| **Launched by** | [Orchestrator](orchestrator.md) |
| **Receives from** | [Feature Agent](feature-agent.md) (via PR creation) |

---

## Core Responsibility

The PR Merge Agent is the **quality gate keeper**. It works sequentially — one PR fully merged before starting the next. It owns all review thread interactions, CI fixes, and merge operations.

**Exactly one instance. Always running.**

---

## Merge Flow (Per PR)

### 1. Pick the next PR
Work in this order to minimise conflicts:
1. Non-conflicting PRs first, in dependency order (infra → backend → frontend)
2. Conflicting PRs next (rebase first, then process)
3. Within each group: bug fixes → architecture → features

```bash
# List open PRs
gh pr list --state open --json number,title,isDraft,reviewDecision
```

### 2. Check CI status
```bash
gh pr checks <PR>
```

### 3. Fix CI failures
For each failing check:
- Diagnose the root cause
- Fix in the PR's working directory
- Commit and push the fix
- Wait for CI to re-run

> ⚠️ **Before changing any test to make it pass**, check whether the failing test is correctly asserting the expected behaviour. Fix the implementation, not the test, unless the specification itself changed.

### 4. Check review threads
```bash
# View all review comments
gh pr view <PR> --json reviews,reviewThreads
```

### 5. Reply to every review comment
For each comment, reply with either:
- `✅ Taking this: <reason>` — you will apply the fix
- `❌ Not taking this: <reason>` — you will not apply the fix and why

### 6. Apply accepted fixes
- Make the code changes
- Commit with a descriptive message
- Push to the branch

### 7. Resolve every thread
After applying fixes, mark all threads as resolved. All review threads must be resolved before merging.

### 8. Rebase conflicting PRs
For a PR that has merge conflicts with main:
```bash
cd <slot-directory>
git pull origin main --rebase
git push origin <branch> --force-with-lease
```

### 9. Verify all gates are green
Before merging, verify:
- [ ] All CI checks pass (`gh pr checks <PR>`)
- [ ] Zero unresolved review threads
- [ ] PR is not in draft state

### 10. Merge
```bash
# Auto-merge (sets merge when all checks pass)
gh pr merge <PR> --auto --squash --delete-branch

# Or immediate merge when all checks are already green
gh pr merge <PR> --squash --delete-branch
```

### 11. Post-merge closing work
After merge, complete the mandatory closing work:
- Close linked story/feature/epic issues if not auto-closed
- Add proof of completion (screenshots, API response examples) as issue comments
- Update story checklist in parent feature
- Update feature checklist in parent epic

```bash
# Close a story issue with proof
gh issue comment <story-number> --body "✅ Implemented in PR #<number> (merged).

**Proof:**
<screenshot or API response>
"
gh issue close <story-number>

# Update feature checklist
gh issue edit <feature-number> --body "<updated body with story checked off>"
```

### 12. Move to the next PR
Repeat from step 1.

---

## Hard Gates

These are **absolute** — never bypass them:

| Gate | Check |
|------|-------|
| All CI checks pass | `gh pr checks <PR>` — all green |
| Zero unresolved review threads | GraphQL query or GitHub UI |
| All tests in CI pass | No skipped or flaky tests masking failures |
| Branch rebased on current main | No merge conflicts |

> **Never use `--admin` to bypass CI gates.** Gates exist for a reason. Fix the root cause.

---

## PR Work Order (Conflict-Minimising Strategy)

```
1. MERGEABLE PRs first (no rebase needed)
   └── dependency order: infra → backend → frontend
   └── priority: bugs → architecture → features

2. CONFLICTING PRs next (rebase each on freshly-updated main)
   └── dependency order: infra → backend → frontend
   └── priority: bugs → architecture → features
```

---

## What the PR Merge Agent Must NOT Do

| ❌ Never | Why |
|----------|-----|
| Work on two PRs simultaneously | Creates merge conflicts between its own fix commits |
| Implement new features | Scope creep — Feature Agents own implementation |
| Fix a bug in a branch it didn't own | Opens risk of conflicting with the Feature Agent |
| Skip the mandatory post-merge proof/issue-closing step | Someone must own this |
| Use `--admin` to bypass CI gates | Always fix the root cause |
| Merge while any thread is unresolved | Hard gate |
| Mark a thread as resolved without a reply | Always reply before resolving |

---

## Deep Code Review (Phase 7)

Every 10 features merged, the PR Merge Agent performs a [deep code review](../phases/phase-7-code-review.md):
- Review the last 10 PRs holistically for systemic issues
- Open bug/architecture issues for findings
- Propose instruction updates for patterns that appear 3+ times

---

## Related

- [Process Overview](../process-overview.md)
- [Phase 7 — Deep Code Review](../phases/phase-7-code-review.md)
- [Feature Agent](feature-agent.md)
- [Orchestrator](orchestrator.md)

