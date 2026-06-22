---
applyWhen: "**"
---

## Requirement MCP Server — Structured Requirement Queries

The `requirement-store` MCP server provides structured access to requirement documents. Use MCP tools **instead of reading Markdown files** in `docs/requirements/`.

```
MCP: list_versions()                              → ["v1.0", "v2.0"]
MCP: list_requirements(version="v1.0", epic="Epic001")   → requirement list
MCP: get_requirement("RQ-042")                    → {title, description, ac, epic, story}
MCP: get_acceptance_criteria("RQ-042")            → [{id, text, testable}]  ← USE IN VALIDATION GATE
MCP: find_unimplemented(version="v1.0")           → requirements with no code yet
MCP: diff_versions("v1.0", "v2.0")               → {added, removed, changed}  ← AFTER REQUIREMENT CHANGE
MCP: requirements_in_file("OrderService.cs")      → requirements this file touches
MCP: search_requirements("tax calculation")       → full-text search
```

**Start the server**: `docker-compose up -d requirement-mcp`  
**Health check**: `http://localhost:3001/health`  
Full guide: [docs/requirements/README.md](../../docs/requirements/README.md)

---

## reqtrack — Requirement Index Tool (USE BEFORE TOUCHING CODE)

`reqtrack` is the mandatory CLI tool for finding code related to a requirement **without scanning all files**. Agents must use it before reading or editing source files.

```bash
# Find all files implementing a requirement (do this FIRST — before opening any file)
reqtrack find RQ-042 --format paths

# See what requirements a file touches (before editing it)
reqtrack affected --file OrderService.cs

# Rebuild the index after making changes (do this LAST — before committing)
reqtrack index

# Check coverage at sprint kickoff
reqtrack report --missing

# See requirements affected by this PR's changes
reqtrack diff --since main --format ids
```

**Rules for agents:**
1. **Never scan `*.cs` files manually for `[Requirement]` attributes** — use `reqtrack find` instead
2. **Never read `docs/requirements/*.md` directly** — use `MCP: get_requirement()` instead
3. **Before editing any file**: run `reqtrack affected --file <name>` to know what requirements you touch
4. **Before implementing any requirement**: run `reqtrack find <RQ-ID> --format paths` to get the exact files
5. **After all code changes**: run `reqtrack index` and include `.reqtrack/index.json` in the commit

Full guide: [docs/reqtrack-agent-guide.md](../../docs/reqtrack-agent-guide.md)

Install: `dotnet tool install -g reqtrack`

---

## Requirement Validation Gate — MANDATORY AFTER EVERY CODE CHANGE

After changing any C# implementation, the agent **must verify** that all affected requirements are still satisfied. This is not optional — a passing build is not sufficient.

### The gate (run for every changed file before opening a PR)

```bash
# Step 1 — find all requirements the changed file implements
reqtrack affected --file <changed-file> --format paths
# output: requirement IDs, one per line, e.g. RQ-042, RQ-043

# Step 2 — for each requirement ID, fetch the parent Story issue and re-read its acceptance criteria
reqtrack find <RQ-ID> --format json
# extract the "story" field from the JSON output, e.g. "Story007"

# Step 3 — look up the Story issue to get the acceptance criteria
gh issue list --label "story" --search "<story-id>" --json number,title,body --limit 5
# or directly if you know the issue number:
gh issue view <issue-number> --json title,body

# Step 4 — for each acceptance criterion in the issue body, verify it is still met
# - If met: continue
# - If broken: open a bug issue before creating the PR (see below)
```

### When an acceptance criterion is no longer met

```bash
gh issue create \
  --title "Bug: <RQ-ID> — <criterion> no longer satisfied after <change description>" \
  --label "bug" \
  --body "## Broken requirement
Requirement: <RQ-ID> (<Epic> > <Feature> > <Story>)
Story issue: #<number>

## Criterion that is broken
- [ ] <exact text of the criterion from the story issue>

## What changed
<which file was modified and what changed>

## Proposed fix
<brief description>
"
```

**Do not open a PR if any acceptance criterion is broken** — fix it first or explicitly defer it with an approved bug issue.

### Summary: mandatory gate steps

| Step | Command | When |
|------|---------|------|
| 1 | `reqtrack affected --file <f> --format paths` | After changing any file |
| 2 | `reqtrack find <RQ-ID> --format json` | For each requirement ID found |
| 3 | `gh issue view <story-number>` | For each story linked to the requirement |
| 4 | Verify each acceptance criterion | Before opening a PR |
| 5 | Open bug issue if broken | If any criterion fails |
| 6 | `reqtrack index` | After all changes, before commit |

Full guide: [docs/reqtrack-agent-guide.md](../../docs/reqtrack-agent-guide.md#requirement-validation-gate)

---

## Delegation Playbook Reference

> 📋 **`docs/delegation-playbook.md`** is the single source of truth for all tasks that can be delegated to a background sub-agent.
>
> Every recurring phase task has an entry (D-01 through D-14) with: goal, inputs, exact agent prompt template, expected output, and success criteria.
>
> **When to use it**: before starting any delegatable task, read the matching entry. Use the prompt template — don't improvise.
>
> | Entry | Task | Phase |
> |-------|------|-------|
> | D-01 | Documentation Intake + Epic Creation | Phase 0 |
> | D-02 | Feature Breakdown from Epics | Phase 1 |
> | D-03 | User Story Creation | Phase 2 |
> | D-04 | Bidirectional Issue Coupling | Phase 2 |
> | D-05 | Test Stub Generation | Phase 3 |
> | D-06 | Test Backfill | Ongoing |
> | D-07 | Feature Implementation (TDD) | Phase 5 per feature |
> | D-08 | Architecture Review | Phase 4 every 5 features |
> | D-09 | Sprint Retrospective | Phase 6 every sprint |
> | D-10 | Deep Code Review | Phase 7 every 10 features |
> | D-11 | README Dashboard Update | After every PR merge |
> | D-12 | Backlog / Process Issue Fix | Before each sprint |
> | D-13 | Sprint Plan Review | Every 3 sprints |
> | D-14 | Replan Checkpoint | At each CP-A/B/C/D/E trigger |

---

## Checkpoint Protocol — MANDATORY STOPS

The Orchestrator **must stop** at five checkpoints and wait for architect/PM approval before proceeding. These are hard gates — no autonomous phase transitions across a checkpoint boundary.

| Checkpoint | Trigger | Blocks |
|------------|---------|--------|
| ⏸ **CP-A** | After Phase 0 (all Epics created) | Phase 1 |
| ⏸ **CP-B** | After Phase 2 (all Stories created) | Phase 5 Sprint 1 |
| ⏸ **CP-C** | Before each sprint's Phase 5 | Feature Agent assignment |
| ⏸ **CP-D** | After Phase 4 when violations found | Next sprint |
| ⏸ **CP-E** | After Phase 6 (Sprint Review done) | Next CP-C |

### Stop / Wait / Resume Loop

1. **Generate** the checkpoint document (use D-14)
2. **Open** a GitHub issue: `gh issue create --label "checkpoint,needs-input" --title "⏸ CP-X: <name>"`
3. **STOP** — do not proceed to the next phase, do not assign any new work
4. **Wait** for the human to comment with `✅ approved` or `✅ approved with changes: ...` and close the issue
5. **Read** the decision from the issue comments, record it in `docs/checkpoints/decisions.md`, continue

```bash
# Check if a checkpoint is resolved
gh issue view <checkpoint-issue-number> --json state,comments

# Issue is unblocked when state == "closed"
```

Full protocol and decision templates: [docs/checkpoints/replan-checkpoint.md](../../docs/checkpoints/replan-checkpoint.md)  
Build strategy guide (for CP-A/CP-C): [docs/checkpoints/build-strategy-guide.md](../../docs/checkpoints/build-strategy-guide.md)

---

## Agent Pipeline — Separation of Responsibilities

This project uses a **three-role pipeline** (two agent roles plus an orchestrator) to keep the PR process smooth and conflict-free. Every agent must know exactly which role it is playing and must **never cross into another role's territory**.

```
┌─────────────────────────────────────────────────────────────────────┐
│  ORCHESTRATOR (main session)                                        │
│  · Reads open issues (bugs → arch → features, in priority order)   │
│  · Assigns exactly 2 non-overlapping issues to Feature Agents       │
│  · Receives completion reports; immediately assigns new work        │
│  · Keeps the PR Merge Agent running at all times                    │
└────────────────┬───────────────────────────────┬────────────────────┘
                 │                               │
        assigns work                     monitors & merges
                 │                               │
                 ▼                               ▼
┌───────────────────────────┐   ┌───────────────────────────────────┐
│  FEATURE AGENT (×2)       │   │  PR MERGE AGENT (×1, always on)   │
│  Implements ONE issue      │   │  Works PRs sequentially            │
│  Writes tests              │   │  One PR fully merged before next  │
│  Creates PR, then STOPS    │   │  Handles review threads, CI fixes │
└───────────────────────────┘   └───────────────────────────────────┘
```

Full documentation:
- [docs/agents/orchestrator.md](../../docs/agents/orchestrator.md)
- [docs/agents/feature-agent.md](../../docs/agents/feature-agent.md)
- [docs/agents/pr-merge-agent.md](../../docs/agents/pr-merge-agent.md)

---

## Work Priority Order

At any point in time, work is prioritized in this order. **Always resolve higher-priority items before picking up lower-priority ones.**

| Priority | Activity | When to do it |
|----------|----------|---------------|
| 🔴 **1 — PR Completion** | Respond to review comments, resolve threads, merge open PRs that are gate-green | Before starting any new work |
| 🟠 **2 — Bug Fixing** | Fix open bugs (`bug` label; critical bugs also carry `blocker`) | After all open PRs are merged or unblocked |
| 🟡 **3 — Story Completion** | Implement features/stories in the current sprint | After bugs are cleared |
| 🟢 **4 — Sprint Completion** | Retrospective, sprint plan review, next sprint planning | After all current-sprint stories are done |

> **Rule**: If a PR has open review comments, respond and resolve them before writing any new code.
> **Rule**: Bugs in the current sprint block story promotion to Done — fix bugs before claiming sprint complete.
> **Rule**: Sprint completion activities (retro, planning) happen only after all stories AND bugs in the sprint are closed.

---

## Development Loop — Phase Overview

This is the **mandatory end-to-end workflow** for every development cycle. Follow it in order. Do not skip phases.

| Phase | Name | Owner | See |
|-------|------|-------|-----|
| 0 | Documentation Intake | Orchestrator | [Phase 0](../../docs/phases/phase-0-documentation-intake.md) |
| 1 | Feature Breakdown | Orchestrator | [Phase 1](../../docs/phases/phase-1-feature-breakdown.md) |
| 2 | User Stories | Orchestrator | [Phase 2](../../docs/phases/phase-2-user-stories.md) |
| 3 | Test Stubs | Feature Agent | [Phase 3](../../docs/phases/phase-3-test-stubs.md) |
| 4 | Architecture Review | Orchestrator | [Phase 4](../../docs/phases/phase-4-architecture-review.md) |
| 5 | Feature Implementation | Feature Agent | [Phase 5](../../docs/phases/phase-5-implementation.md) |
| 6 | Sprint Review | Orchestrator | [Phase 6](../../docs/phases/phase-6-sprint-review.md) |
| 7 | Deep Code Review | PR Merge Agent | [Phase 7](../../docs/phases/phase-7-code-review.md) |

---

## Role 1 — Feature Agent

**One instance per issue. Stops as soon as the PR is created.**

### What a Feature Agent does (in order)

1. **Read the issue** — understand acceptance criteria and edge cases.
2. **Provision a fresh working directory**:
   ```bash
   BRANCH="dev/<username>/<feature-slug>"
   DEST="<workspaces>/parallel/<branch-as-dir>"
   git clone <repo-url> "$DEST"
   git -C "$DEST" checkout -b "$BRANCH"
   git -C "$DEST" pull origin main --rebase
   ```
3. **Implement** — TDD (red → green → refactor). Follow all coding rules.
4. **Run all tests** — must be 100% green before continuing.
5. **Run the build** — must exit 0 with zero warnings.
6. **Run E2E tests** (if applicable) — all must pass.
7. **Rebase on latest main**:
   ```bash
   git fetch origin main
   git rebase origin/main
   git push origin "$BRANCH" --force-with-lease
   ```
8. **Re-run the full test suite after rebase**.
9. **Create the PR**:
   ```bash
   gh pr create \
     --title "feat: ..." \
     --body "Closes #<issue>..." \
     --base main \
     --head "$BRANCH"
   ```
10. **Request Copilot review**:
    ```bash
    gh pr comment <PR> --body "@copilot please review this pr"
    ```
11. **Report back to the Orchestrator** with PR number, issue closed, test summary.
12. **STOP** — do not monitor the PR or respond to review comments.

### What a Feature Agent must NOT do

| ❌ Never | Why |
|----------|-----|
| Merge the PR itself | PR Merge Agent owns all merges |
| Respond to review comments on the PR | PR Merge Agent owns all review interactions |
| Push a fix after the PR is open | PR Merge Agent coordinates pushes to avoid race conditions |
| Work on more than one issue | Single responsibility — one branch, one PR |
| Create a PR when any test is red | Red PR = wasted PR Merge Agent time |

---

## Role 2 — PR Merge Agent

**Exactly one instance. Always running. Works sequentially — one PR fully merged before starting the next.**

### What the PR Merge Agent does

For each open PR, in order (non-conflicting first, conflicting last):

1. **Check CI status**: `gh pr checks <PR>`
2. **Fix any CI failures** in the PR's slot.
3. **Check review threads**.
4. **Reply to every review comment**: `✅ Taking this: <reason>` or `❌ Not taking this: <reason>`
5. **Apply accepted fixes**, commit, push to the branch.
6. **Resolve every thread**.
7. **Wait for all CI gates to be green**.
8. **Rebase conflicting PRs** on updated main before working on them.
9. **Merge**:
   ```bash
   gh pr merge <PR> --squash --delete-branch
   # or for auto-merge:
   gh pr merge <PR> --auto --squash --delete-branch
   ```
10. **Complete post-merge closing work** (update story/feature/epic issues, proof screenshots/API calls, closing comments).
11. **Move to the next PR**.

### PR work order (conflict-minimising)

1. MERGEABLE PRs first (no rebase needed) — process in dependency order
2. CONFLICTING PRs next — rebase each on freshly-updated main
3. Within each group: bug fixes → architecture → features

### What the PR Merge Agent must NOT do

| ❌ Never | Why |
|----------|-----|
| Work on two PRs simultaneously | Creates merge conflicts between its own fix commits |
| Implement new features or fix bugs in a branch it didn't own | Scope creep |
| Skip the mandatory post-merge proof/issue-closing step | Someone must own Step 10 |
| Use `--admin` to bypass CI gates | Gates exist for a reason; fix the root cause |
| Merge while any thread is unresolved | Hard gate |

---

## Role 3 — Orchestrator (main session)

**Assigns work. Never implements. Monitors both agent types.**

### Orchestrator loop

```
1. Check PR Merge Agent status — is it stuck? Unblock it if needed.
2. Check which Feature Agents have completed (reported back).
3. For each completed/available slot (max 2 active at a time):
   a. Pick the highest-priority unstarted issue:
      Bugs (bug label) → Architecture (architecture label) → Sprint features (sprint-N label)
   b. Verify the issue doesn't overlap with any in-flight branch
   c. Launch a Feature Agent with full context (issue body, slot path)
4. Record what was assigned in the session plan.
5. Wait for completion notifications; repeat from step 1.
```

### Overlap check before assigning

Before assigning an issue to a Feature Agent, check that no in-flight PR touches the same files:

```bash
# List files changed in all open PRs
gh pr list --state open --json number,headRefName | \
  jq -r '.[] | "PR #\(.number) (\(.headRefName)):"' | \
  while read pr; do echo "$pr"; gh pr diff "${pr##*#}" --name-only 2>&1; echo; done
```

If two issues touch the same file, assign them sequentially.

### Max concurrency rules

| Agent type | Max simultaneous | Reason |
|-----------|-----------------|--------|
| Feature Agents | 2 | More = merge conflicts |
| PR Merge Agent | 1 | Sequential by design |
| Orchestrator | 1 | One session manages the pipeline |

---

## Handoff Protocol

When a Feature Agent completes, its final message must include:

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

---

## Phase 0 — Documentation Intake

When a folder with product documentation is provided:

1. Read **every document** in the folder before doing anything else.
2. Identify the **main subject areas** — these become Epics.
3. For each Epic: create a GitHub issue using the `epic` label with a detailed description.
4. Move to Phase 1 only after all Epics are created.

```bash
gh issue create --title "Epic: <Name>" --label "epic" --body "<detailed description>"
```

---

## Phase 1 — Feature Breakdown

For each Epic, derive its **Features**:

1. Create one GitHub issue per Feature, linked to its parent Epic.
   - Label: `enhancement`
   - Reference: `Part of #<epic-issue-number>`
2. After adding each Feature, scan for contradictions with existing features.
3. Mark ambiguous features with `needs-input` + `functional` and/or `technical`.
4. Write exact, numbered questions for any `needs-input` feature.

```bash
gh issue create --title "Feature: <Name>" --label "enhancement" \
  --body "Part of #<epic-number>\n\n<description, acceptance criteria, edge cases>"
```

---

## Phase 2 — User Stories

For each Feature issue, add **User Stories**:

1. Write short, concrete stories: *As a `<role>`, I want `<action>` so that `<outcome>`.*
2. Each story must be small enough to implement in a single PR.
3. **Bidirectional coupling is mandatory**:
   - Story body: `Part of feature #<number>` and `Part of epic #<number>`
   - Feature body: `## Stories` checklist with `- [ ] #<story-number> — description`
   - Epic body: `## Features` checklist with `- [ ] #<feature-number> — description`

---

## Phase 3 — Test Stubs (TDD-first)

Before any implementation begins, define the **acceptance tests** for every User Story:

1. For each story, create a test spec file in your test directory.
2. Write the test structure (describe/it blocks, navigation steps, assertions) but leave assertions **deliberately failing**.
3. Commit these failing tests on a branch and open a PR titled `test: stubs for <feature>`.
4. The CI build is expected to fail at this stage — that is correct.

---

## Phase 4 — Architecture Review

Every 5 features (or at sprint boundaries), review the architecture:

1. Read the last 5 PRs merged to main.
2. Check for violations of the architectural rules in `shared-conventions.instructions.md`.
3. Open `architecture` issues for each violation found.
4. Update `docs/architecture-log.md` with findings.

See delegation template D-08 in `docs/delegation-playbook.md`.

---

## Phase 5 — Feature Implementation

See [Feature Agent — Role 1](#role-1--feature-agent) above.

The Feature Agent implements issues one at a time following the 12-step checklist.

---

## Phase 6 — Sprint Review + Retrospective

After all current-sprint stories and bugs are closed:

1. Count: stories closed, features closed, bugs fixed, PRs merged.
2. Identify: what went well, what was blocked, what violated process.
3. For each process violation: check if it reveals an instruction gap.
4. Open `RETRO-NNN` issues for instruction updates. See [docs/instructions/instruction-feedback-loop.md](../../docs/instructions/instruction-feedback-loop.md).
5. Plan next sprint: pick features from the backlog, create `sprint-N+1` labels.

See delegation templates D-09 and D-13 in `docs/delegation-playbook.md`.

---

## Phase 7 — Deep Code Review

Every 10 features, the PR Merge Agent performs a deep code review:

1. Read the last 10 PRs merged to main.
2. Check for: dead code, duplicated logic, missing tests, security issues.
3. Open bug/architecture issues for each finding.
4. Update the tech debt table in `shared-conventions.instructions.md` if appropriate.

See delegation template D-10 in `docs/delegation-playbook.md`.

---

## GitHub Issue Labels Reference

| Label | Purpose |
|-------|---------|
| `epic` | High-level feature grouping |
| `enhancement` | Feature issue |
| `story` | User story |
| `bug` | Defect |
| `blocker` | Blocking item |
| `needs-input` | Awaiting clarification |
| `functional` | Product/UX question (used with `needs-input`) |
| `technical` | Architecture/impl question (used with `needs-input`) |
| `architecture` | Architecture work item |
| `sprint-N` | Sprint assignment |

