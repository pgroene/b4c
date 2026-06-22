# Delegation Playbook

This playbook contains **agent delegation templates** for every recurring task in the development process. Each entry (D-01 through D-15) provides: goal, inputs, an exact agent prompt template, expected output, and success criteria.

**When to use it**: before starting any delegatable task, find the matching entry and use the prompt template. Don't improvise — the templates encode lessons from real-world usage.

---

## Index

| Entry | Task | Phase | Owner |
|-------|------|-------|-------|
| [D-01](#d-01--documentation-intake--epic-creation) | Documentation Intake + Epic Creation | 0 | Orchestrator |
| [D-02](#d-02--feature-breakdown-from-epics) | Feature Breakdown from Epics | 1 | Orchestrator |
| [D-03](#d-03--user-story-creation) | User Story Creation | 2 | Orchestrator |
| [D-04](#d-04--bidirectional-issue-coupling) | Bidirectional Issue Coupling | 2 | Orchestrator |
| [D-05](#d-05--test-stub-generation) | Test Stub Generation | 3 | Feature Agent |
| [D-06](#d-06--test-backfill) | Test Backfill | Ongoing | Feature Agent |
| [D-07](#d-07--feature-implementation-tdd) | Feature Implementation (TDD) | 5 | Feature Agent |
| [D-08](#d-08--architecture-review) | Architecture Review | 4 | Orchestrator |
| [D-09](#d-09--sprint-retrospective) | Sprint Retrospective | 6 | Orchestrator |
| [D-10](#d-10--deep-code-review) | Deep Code Review | 7 | PR Merge Agent |
| [D-11](#d-11--readme-dashboard-update) | README Dashboard Update | After every PR merge | PR Merge Agent |
| [D-12](#d-12--backlog--process-issue-fix) | Backlog / Process Issue Fix | Before each sprint | Orchestrator |
| [D-13](#d-13--sprint-plan-review) | Sprint Plan Review | Every 3 sprints | Orchestrator |
| [D-14](#d-14--replan-checkpoint) | Replan Checkpoint | At each CP-A/B/C/D/E trigger | Orchestrator |
| [D-15](#d-15--requirement-validation-gate) | Requirement Validation Gate | After every implementation change | Feature Agent |
| [D-16](#d-16--document-translation) | Document Translation (intake → structured MD) | Phase 0 — before epic creation | Orchestrator |

---

## D-01 — Documentation Intake + Epic Creation

**Phase**: 0 | **Owner**: Orchestrator

### Goal
Read all product documentation and create GitHub `epic` issues for each main subject area.

### Inputs
- Path to the documentation folder
- Repository URL

### Prompt template
```
You are the Orchestrator. Your task is Phase 0 — Documentation Intake.

Documentation folder: <path>
Repository: <repo-url>

Steps:
1. Read EVERY file in the documentation folder before creating any issues.
2. Identify the main subject areas — these become Epics.
3. For each Epic, create a GitHub issue:
   - Label: epic
   - Title: Epic: <Name>
   - Body: what it covers, why it matters, its boundaries, expected feature areas
4. After creating all Epics, check for overlaps and resolve them.
5. Report back: list of all Epic issue numbers and titles created.

Follow the instructions in docs/phases/phase-0-documentation-intake.md.
```

### Expected output
- List of GitHub `epic` issues with numbers and titles
- Confirmation that all documentation was read
- Note of any overlaps found and resolved

### Success criteria
- [ ] All main subject areas have an Epic issue
- [ ] No two Epics overlap in scope
- [ ] Each Epic has a clear boundary and expected feature areas

---

## D-02 — Feature Breakdown from Epics

**Phase**: 1 | **Owner**: Orchestrator

### Goal
Decompose each Epic into concrete Feature issues.

### Inputs
- List of Epic issue numbers

### Prompt template
```
You are the Orchestrator. Your task is Phase 1 — Feature Breakdown.

Repository: <repo-url>
Epic issues to break down: #<n>, #<n>, #<n>

Steps:
1. For each Epic, read its issue body.
2. Create Feature issues (label: enhancement) linked to the Epic.
3. After each Feature, check for contradictions with existing features.
4. Mark ambiguous features with needs-input + functional and/or technical.
5. Update each Epic's ## Features checklist.
6. Report back: list of all Feature issues created, any needs-input items.

Follow the instructions in docs/phases/phase-1-feature-breakdown.md.
```

### Expected output
- List of GitHub `enhancement` issues with numbers and titles
- List of any `needs-input` issues with their questions

### Success criteria
- [ ] All features from the documentation are created
- [ ] No contradictions between features
- [ ] Each Epic's `## Features` checklist is populated

---

## D-03 — User Story Creation

**Phase**: 2 | **Owner**: Orchestrator

### Goal
Create User Story issues for each Feature.

### Inputs
- List of Feature issue numbers

### Prompt template
```
You are the Orchestrator. Your task is Phase 2 — User Story Creation.

Repository: <repo-url>
Feature issues: #<n>, #<n>, #<n>

Steps:
1. For each Feature, create User Story issues (label: story).
2. Write stories in format: As a <role>, I want <action> so that <outcome>.
3. Each story must be implementable in a single PR.
4. Add bidirectional links (story → feature + epic, feature → stories checklist).
5. Assign stories to sprint-<N> label.
6. Report back: list of all stories created with numbers and titles.

Follow the instructions in docs/phases/phase-2-user-stories.md.
```

### Expected output
- List of GitHub `story` issues with numbers, titles, and parent feature
- Confirmation that bidirectional links are in place

### Success criteria
- [ ] Every feature has at least one story
- [ ] Every story has acceptance criteria
- [ ] Bidirectional links are in place

---

## D-04 — Bidirectional Issue Coupling

**Phase**: 2 | **Owner**: Orchestrator

### Goal
Verify and repair bidirectional links between stories, features, and epics.

### Inputs
- Sprint number or list of feature issue numbers

### Prompt template
```
You are the Orchestrator. Your task is to verify bidirectional issue coupling.

Repository: <repo-url>
Features to verify: #<n>, #<n>, #<n>

For each feature:
1. Check that each linked story has "Part of feature #<number>" in its body.
2. Check that each linked story has "Part of epic #<number>" in its body.
3. Check that the feature's ## Stories checklist contains all linked stories.
4. Check that the parent epic's ## Features checklist contains this feature.
5. Fix any missing links.

Report back: list of issues fixed, list of issues already correct.
```

### Success criteria
- [ ] All stories have `Part of feature` links
- [ ] All stories have `Part of epic` links
- [ ] All features have `## Stories` checklists
- [ ] All epics have `## Features` checklists

---

## D-05 — Test Stub Generation

**Phase**: 3 | **Owner**: Feature Agent

### Goal
Create deliberately failing test stubs for all acceptance criteria.

### Inputs
- Story issue number(s)
- Test directory path

### Prompt template
```
You are a Feature Agent. Your task is to create test stubs for story #<number>.

Repository: <repo-url>
Test directory: <path>
Story: <paste full issue body>

Steps:
1. Read the story's acceptance criteria.
2. Create a test spec file for the story's feature.
3. Write test cases for each acceptance criterion — deliberately failing.
4. Use: expect(true).toBe(false) as the placeholder assertion.
5. Commit on branch: test/stubs-<feature-slug>
6. Open a PR: "test: stubs for <feature name>"
7. Report back with PR number. Then STOP.

Follow docs/phases/phase-3-test-stubs.md.
```

### Success criteria
- [ ] Every acceptance criterion has a test case
- [ ] All test cases deliberately fail
- [ ] PR is open with correct title

---

## D-06 — Test Backfill

**Phase**: Ongoing | **Owner**: Feature Agent

### Goal
Add test coverage for existing features that were implemented without test stubs.

### Inputs
- Feature name or file path
- Relevant issue numbers

### Prompt template
```
You are a Feature Agent. Your task is to backfill test coverage for <feature name>.

Repository: <repo-url>
Feature: <description>
Related issues: #<n>

Steps:
1. Read the feature's acceptance criteria from the issue(s).
2. Identify existing test coverage (if any).
3. Write tests for uncovered acceptance criteria and edge cases.
4. Tests must assert real behaviour — not stubs.
5. Run the full test suite — all must pass.
6. Commit on branch: dev/<username>/test-backfill-<slug>
7. Open a PR: "test: backfill coverage for <feature name>"
8. Report back with PR number. Then STOP.
```

### Success criteria
- [ ] All acceptance criteria have test coverage
- [ ] All tests pass
- [ ] PR is open

---

## D-07 — Feature Implementation (TDD)

**Phase**: 5 | **Owner**: Feature Agent

### Goal
Implement a feature following TDD, making the test stubs pass.

### Inputs
- Story issue number
- Working directory slot

### Prompt template
```
You are a Feature Agent. Your task is to implement GitHub issue #<number>.

Issue title: <title>
Issue body: <paste full issue body>
Working directory: <workspaces>/parallel/<slot-name>
Repository: <repo-url>
Branch: dev/<username>/<feature-slug>

Follow the Feature Agent checklist in docs/agents/feature-agent.md (steps 1-12):
1. Read the issue
2. Provision fresh working directory (clone + checkout branch)
3. Implement TDD: red → green → refactor
4. Run unit/integration tests (must be 100% green)
5. Run the build (must be 0 warnings)
6. Run E2E tests if applicable (all must pass)
7. Rebase on main
8. Re-run full test suite after rebase
9. Create the PR
10. Request Copilot review
11. Report back with FEATURE AGENT COMPLETE message
12. STOP

Do not monitor the PR after creating it. That is the PR Merge Agent's job.
```

### Expected output
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

### Success criteria
- [ ] All tests pass
- [ ] PR is open and linked to the story
- [ ] Agent stopped after reporting

---

## D-08 — Architecture Review

**Phase**: 4 | **Owner**: Orchestrator

### Goal
Review the last 5 PRs for architectural violations and update the architecture log.

### Inputs
- Sprint number or date range

### Prompt template
```
You are the Orchestrator. Your task is Phase 4 — Architecture Review.

Repository: <repo-url>

Steps:
1. List the last 5 merged PRs: gh pr list --state merged --limit 5
2. For each PR, read the full diff: gh pr diff <number>
3. Check for violations of the rules in .github/instructions/shared-conventions.instructions.md
4. For each violation, open an architecture issue (label: architecture)
5. Update docs/architecture-log.md with a dated entry
6. Note any patterns that should be added to the instruction files
7. Report back: list of violations found, issues opened, instruction update proposals.

Follow docs/phases/phase-4-architecture-review.md.
```

### Success criteria
- [ ] All 5 PRs reviewed
- [ ] All violations have open `architecture` issues
- [ ] Architecture log updated

---

## D-09 — Sprint Retrospective

**Phase**: 6 | **Owner**: Orchestrator

### Goal
Document the sprint retrospective and identify instruction gaps.

### Inputs
- Sprint number
- Closed issues count
- Any observed agent failures during the sprint

### Prompt template
```
You are the Orchestrator. Your task is a Sprint Retrospective for Sprint <N>.

Repository: <repo-url>

Steps:
1. Count closed stories, features, bugs, and merged PRs for sprint-<N>
2. Identify what went well, what was blocked, what violated process
3. For each process violation, determine if it reveals an instruction gap
4. Open RETRO-NNN issues for each gap
5. Update .github/copilot-instructions.md with RETRO entries
6. Plan next sprint: assign sprint-<N+1> labels to selected stories
7. Report back: sprint summary, RETRO issues opened, next sprint plan.

Follow docs/phases/phase-6-sprint-review.md.
```

### Success criteria
- [ ] Sprint metrics documented
- [ ] RETRO issues opened for all instruction gaps
- [ ] Next sprint stories have `sprint-N+1` labels

---

## D-10 — Deep Code Review

**Phase**: 7 | **Owner**: PR Merge Agent

### Goal
Review the last 10 PRs holistically for systemic code quality issues.

### Inputs
- Trigger: 10 features completed since last deep review

### Prompt template
```
You are the PR Merge Agent. Your task is Phase 7 — Deep Code Review.

Repository: <repo-url>

Steps:
1. List the last 10 merged PRs
2. For each PR, read the full diff
3. Check for: dead code, duplicated logic, missing tests, security issues, performance risks, architectural violations
4. Open bug or architecture issues for each finding
5. Update the tech debt table in shared-conventions.instructions.md if applicable
6. Propose instruction updates for patterns found in 3+ PRs
7. Report back: findings summary, issues opened, instruction update proposals.

Follow docs/phases/phase-7-code-review.md.
```

### Success criteria
- [ ] All 10 PRs reviewed
- [ ] All findings have open issues
- [ ] Instruction updates proposed for systemic patterns

---

## D-11 — README Dashboard Update

**Phase**: After every PR merge | **Owner**: PR Merge Agent

### Goal
Keep the README's progress dashboard current after each PR merge.

### Inputs
- Merged PR number
- Closed issue numbers

### Prompt template
```
You are the PR Merge Agent. After merging PR #<number>, update the README progress dashboard.

Steps:
1. Read the current README.md
2. Update: sprint progress, features completed count, open bugs count
3. Commit: "chore: update README dashboard after PR #<number>"
4. Push directly to main (this is a post-merge housekeeping commit)

<!-- TODO: customize — add your project's specific dashboard fields -->
```

---

## D-12 — Backlog / Process Issue Fix

**Phase**: Before each sprint | **Owner**: Orchestrator

### Goal
Clean up the backlog — close stale issues, resolve duplicates, update `needs-input` items.

### Prompt template
```
You are the Orchestrator. Your task is backlog cleanup before Sprint <N>.

Repository: <repo-url>

Steps:
1. List all open needs-input issues: gh issue list --label "needs-input"
2. For each needs-input issue, check if the question has been answered in comments
3. If answered: remove needs-input label and reopen for implementation
4. If unanswered and stale (>2 weeks): ping the relevant person
5. List duplicate issues and close the duplicates with a reference to the canonical issue
6. List stale bug issues (>3 sprints old, still open) and triage: close or reassign
7. Report back: issues resolved, issues still blocked.
```

---

## D-13 — Sprint Plan Review

**Phase**: Every 3 sprints | **Owner**: Orchestrator

### Goal
Review the overall sprint plan for coherence — are the right things in the right sprints?

### Prompt template
```
You are the Orchestrator. Your task is a Sprint Plan Review for Sprints <N>, <N+1>, <N+2>.

Repository: <repo-url>

Steps:
1. List all open stories grouped by sprint label
2. Check: are any sprints overloaded (>8 stories per sprint per agent)?
3. Check: are any dependency chains violated (story A requires story B, but B is in a later sprint)?
4. Check: are any high-priority bugs still in the backlog (not assigned to a sprint)?
5. Rebalance: move stories between sprints to fix any of the above
6. Report back: changes made, rationale for each change.
```

---

## D-14 — Replan Checkpoint

**Phase**: At each CP-A / CP-B / CP-C / CP-D / CP-E trigger | **Owner**: Orchestrator

### Goal
Generate a structured checkpoint document, open the checkpoint GitHub issue, and **stop** until the architect/PM approves.

### Inputs
- `<checkpoint-id>`: CP-A, CP-B, CP-C, CP-D, or CP-E
- Current sprint number (for CP-C/CP-E)
- List of open issues relevant to the checkpoint
- Current build strategy (from the most recent approved CP-A or CP-C)

### Prompt template
```
You are the Orchestrator. You have reached a mandatory Replan Checkpoint.

Repository: <repo-url>
Checkpoint: <checkpoint-id> — <checkpoint-name>
Current sprint: <N>
Current build strategy: <strategy>

Steps:
1. Read docs/checkpoints/replan-checkpoint.md — find the template for <checkpoint-id>
2. Gather the required context:
   - For CP-A: list all epics created (gh issue list --label "epic")
   - For CP-B: list all stories and proposed Sprint 1 scope
   - For CP-C: list stories labeled sprint-<N>, deferred stories, and open bugs
   - For CP-D: list all open issues labeled "architecture"
   - For CP-E: sprint metrics, RETRO issues opened, proposed next sprint scope
3. Fill in the checkpoint document template with real data
4. Open the GitHub issue:
   gh issue create \
     --title "⏸ <checkpoint-id>: <checkpoint-name>" \
     --label "checkpoint,needs-input" \
     --body "<filled template>"
5. Record the issue number
6. STOP. Do not proceed to the next phase. Report back: issue number opened, what you are waiting for.

Do NOT proceed until the human closes the checkpoint issue with an approval comment.
```

### Success criteria
- [ ] Checkpoint issue is open with a filled-in template
- [ ] Orchestrator has stopped and reported the issue number
- [ ] No new phase work or Feature Agent assignments started

### Resume procedure

After the human approves and closes the issue:
1. Read the issue comments: `gh issue view <number> --json comments`
2. Extract the decision (build strategy, scope, changes requested)
3. Record it: append to `docs/checkpoints/decisions.md` (create if not exists):
   ```
   ## <checkpoint-id> — Sprint <N> — <date>
   Issue: #<number>
   Decision: <human's approval text>
   Changes: <any requested changes>
   ```
4. Apply any scope or strategy changes before continuing
5. Proceed to the next phase

---

## D-15 — Requirement Validation Gate

**Phase**: After every implementation change (Phase 5 exit gate) | **Owner**: Feature Agent

### Goal
After making code changes, verify that all acceptance criteria of every story whose requirements are touched by those changes are still satisfied. Open bug issues for any broken criterion **before** creating the PR.

### Inputs
- List of changed files in this branch
- The `.reqtrack/index.json` index (must be current — run `reqtrack index` first)

### Prompt template
```
You are the Feature Agent. You have finished implementing changes and must now run the Requirement Validation Gate before opening a PR.

Repository: <repo-url>
Changed files: <list of files modified in this branch>

Steps:
1. For each changed file, run:
   reqtrack affected --file <filename> --format paths
   Record all requirement IDs returned.

2. For each unique requirement ID, run:
   reqtrack find <RQ-ID> --format json
   Extract the "story" field from each result.

3. For each unique story ID, find the GitHub issue:
   gh issue list --label "story" --search "<story-id>" --json number,title,body --limit 3
   Read the "Acceptance criteria" section in the issue body.

4. For each acceptance criterion, assess whether the current implementation satisfies it:
   - If YES: continue
   - If NO: open a bug issue using the template below and record its number

5. If any bug issues were opened: fix them before creating the PR, or get explicit approval to defer them (comment on the bug issue with "defer: <reason>").

6. Run:
   reqtrack index
   git add .reqtrack/index.json

7. Report back:
   - Requirements checked: <list of RQ-IDs>
   - Stories re-validated: <list of story issue numbers>
   - All criteria met: YES / NO
   - Bug issues opened (if any): #<n>, #<n>

Bug issue template:
gh issue create \
  --title "Bug: <RQ-ID> — <criterion text> no longer satisfied" \
  --label "bug" \
  --body "## Broken requirement
Requirement: <RQ-ID> (<Epic> > <Feature> > <Story>)
Story issue: #<number>

## Criterion that is broken
- [ ] <exact text from the story issue>

## What changed
Changed file: <path>
Change summary: <what was changed>

## Proposed fix
<description>
"
```

### Success criteria
- [ ] All requirement IDs for changed files have been found and checked
- [ ] All acceptance criteria for affected stories have been verified
- [ ] No broken criterion exists without an open bug issue
- [ ] `.reqtrack/index.json` is up to date and staged in the commit

---

## D-16 — Document Translation

**Phase**: 0 — before epic creation | **Owner**: Orchestrator

### Goal
Translate raw requirement documents dropped in `docs/intake/v{version}/` into structured Markdown files in `docs/requirements/v{version}/` that the MCP server can parse. This runs **before** D-01 (Epic Creation) so that epics are created from structured, versioned requirements.

### Inputs
- `<version>`: the release version being processed, e.g. `v1.0`
- Files in `docs/intake/<version>/` — `.md` or `.txt` format

### Prompt template
```
You are the Orchestrator. Your task is to translate intake documents into structured requirement Markdown files.

Repository: <repo-url>
Version: <version>
Intake folder: docs/intake/<version>/

Steps:
1. List all files in docs/intake/<version>/:
   Get-ChildItem docs/intake/<version>/ (or ls/dir equivalent)

2. For each file, read its full content.

3. For each file, identify the requirement structure:
   a. EPICS — top-level product areas or modules (look for: "Module", "Area", "Epic", major section headers)
   b. FEATURES — capabilities within an epic (look for: "Feature", "Capability", sub-sections, numbered items at level 2)
   c. STORIES — user-facing scenarios (look for: "As a...", "User story", "Scenario", "Use case")
   d. REQUIREMENTS — specific behaviours or rules (look for: "The system shall", "Must", "Should", numbered rules, "RQ-", functional requirements)
   e. ACCEPTANCE CRITERIA — testable conditions (look for: checkboxes, "Acceptance", "Definition of Done", "Criteria", bullet lists under a requirement)

4. Assign IDs if not present:
   - Epic: Epic001, Epic002, ... (sequential per document)
   - Feature: Feature001, Feature002, ... (sequential across all epics)
   - Story: Story001, Story002, ... (sequential across all features)
   - Requirement: RQ-001, RQ-002, ... (sequential across all stories)
   - If IDs already exist in the document (e.g. "REQ-3.2.1"), preserve them and map to the RQ- format

5. For each epic identified, write one output file:
   Output file: docs/requirements/<version>/epic-{NNN}-{kebab-title}.md
   
   Use this exact format:
   ---
   # Epic{NNN} — {Epic Title}

   {Brief epic description — 1-2 sentences}

   ## Feature{NNN} — {Feature Title}

   {Brief feature description}

   ### Story{NNN} — {Story title or "As a <role>, I want <action>"}

   {Story description or user story sentence}

   #### RQ-{NNN} — {Requirement title}

   {Requirement description — what the system must do}

   **Acceptance Criteria:**
   - [ ] {criterion 1}
   - [ ] {criterion 2}

   #### RQ-{NNN} — {Next requirement}
   ...
   ---

6. Review rules:
   - Every requirement MUST have at least one acceptance criterion
     If none is stated explicitly, infer 1-2 testable criteria from the requirement text
   - Criteria must be testable (observable, measurable outcome)
   - Do not invent requirements — only extract what is stated or clearly implied
   - If text is ambiguous, add a NOTE: comment after the requirement description

7. After writing all files, report back:
   - Files read from intake: <list>
   - Files written to docs/requirements/<version>/: <list>
   - Epics identified: <count>
   - Requirements identified: <count>
   - Requirements with inferred AC (no explicit criteria found): <list of RQ-IDs>
   - Ambiguous items needing human review: <list with notes>

8. Run the MCP validation:
   MCP: list_requirements(version="<version>")
   Confirm the count matches what was written.
```

### Output
- One Markdown file per Epic in `docs/requirements/<version>/`
- Each file follows the four-level heading hierarchy (Epic → Feature → Story → RQ)
- All requirements have at least one acceptance criterion

### Success criteria
- [ ] All intake files have been processed
- [ ] At least one output file exists in `docs/requirements/<version>/`
- [ ] Every RQ has at least one `- [ ]` acceptance criterion
- [ ] MCP `list_requirements(version="<version>")` returns the expected count
- [ ] Ambiguous items are flagged for human review before CP-A

### After translation
Run D-01 (Documentation Intake + Epic Creation) using the structured files in `docs/requirements/<version>/` as the source — **not** the raw intake files.

---

## Related

- [Process Overview](process-overview.md)
- [Agent Guide — Orchestrator](agents/orchestrator.md)
- [Agent Guide — Feature Agent](agents/feature-agent.md)
- [Agent Guide — PR Merge Agent](agents/pr-merge-agent.md)
- [Checkpoint Protocol](checkpoints/replan-checkpoint.md)
- [Build Strategy Guide](checkpoints/build-strategy-guide.md)
- [reqtrack Agent Guide](reqtrack-agent-guide.md)
- [Requirements MCP Guide](requirements-mcp-guide.md)
- [Intake Folder](intake/README.md)

