# Phase 0 — Documentation Intake

| | |
|---|---|
| **Owner** | [Orchestrator](../agents/orchestrator.md) |
| **Trigger** | Product documentation folder is provided |
| **Inputs** | Raw product documents in `docs/intake/v{version}/` |
| **Outputs** | Structured requirement Markdown in `docs/requirements/v{version}/` + GitHub `epic` issues |
| **Delegation** | [D-16 Translation](../delegation-playbook.md#d-16--document-translation) → [D-01 Epic Creation](../delegation-playbook.md#d-01--documentation-intake--epic-creation) |
| **Next phase** | [Phase 1 — Feature Breakdown](phase-1-feature-breakdown.md) |

---

## Goal

Translate raw product documentation into structured, versioned requirement documents — then create GitHub epics from those documents. This two-step approach ensures requirements are queryable by the MCP server throughout the project lifetime.

---

## Steps

### Step 0 — Drop documents into the intake folder

Place raw documents (`.md`, `.txt`, or copy-pasted Word/PDF content) into:
```
docs/intake/v1.0/
  customer-spec.txt
  functional-requirements.md
  api-contracts.txt
```

See [docs/intake/README.md](../intake/README.md) for supported formats.

### Step 1 — Translate to structured Markdown (D-16)

Run D-16 to convert the intake documents into structured requirement files:

```
Delegation: D-16 — Document Translation
Input:  docs/intake/v1.0/
Output: docs/requirements/v1.0/epic-001-*.md, epic-002-*.md, ...
```

The agent will:
1. Read every intake file
2. Identify Epics / Features / Stories / Requirements
3. Assign RQ-IDs where missing
4. Infer acceptance criteria where not stated
5. Write one structured Markdown file per Epic

**Review the output before proceeding.** Check:
- Do the identified Epics match your understanding of the scope?
- Are acceptance criteria testable?
- Are any ambiguous items flagged that need human input?

Verify via MCP:
```
MCP: list_requirements(version="v1.0")   → confirm count and structure
MCP: find_unimplemented(version="v1.0")  → should show ALL as unimplemented (no code yet)
```

### Step 2 — Create GitHub Epics (D-01)

Now run D-01 using the structured requirement files as source:
- Read `docs/requirements/v1.0/` (not the raw intake docs)
- Create one GitHub `epic` issue per Epic heading found
- Link each epic issue to its requirement file

```bash
# Create an Epic issue
gh issue create \
  --title "Epic: <Name>" \
  --label "epic" \
  --body "## Overview
<What this epic covers and why it matters>

## Boundaries
<What is in scope vs. out of scope>

## Expected feature areas
- <Feature area 1>
- <Feature area 2>
- <Feature area 3>

## Features
<!-- Populated during Phase 1 -->
"
```

---

## Entry Criteria

- [ ] Raw documents are in `docs/intake/v{version}/`
- [ ] Orchestrator has read permissions on all intake files

## Exit Criteria

- [ ] D-16 ran: structured files exist in `docs/requirements/v{version}/`
- [ ] MCP `list_requirements` confirms all requirements were parsed
- [ ] All main subject areas have a corresponding `epic` GitHub issue
- [ ] Epics do not overlap
- [ ] Each Epic links to its requirement file in `docs/requirements/v{version}/`
- [ ] **⏸ CP-A checkpoint issue is open** — Orchestrator has stopped and is waiting for architect/PM decision

## ⏸ CP-A — Mandatory Stop After Phase 0

After all Epics are created, the Orchestrator **must stop** and open a CP-A checkpoint issue before starting Phase 1.

```bash
gh issue create \
  --title "⏸ CP-A: Post-Intake Architecture & Build Strategy" \
  --label "checkpoint,needs-input" \
  --body "$(cat <<'EOF'
## ⏸ CP-A: Post-Intake Architecture & Build Strategy

### Context
Epics created: <N>
Epic list: #<n> <title>, #<n> <title>, ...

### Summary
<2-3 sentence summary of the product scope>

### Open architectural questions
1. <question>

### Proposed build strategy
Recommendation: Hybrid — Sprint 1 builds horizontal foundation, then vertical features.
Rationale: <why>

### Questions for architect/PM
1. **Build strategy**: Vertical / Horizontal / Hybrid?
2. **MVP scope**: Which Epics are in scope for the first release?
3. **Tech stack confirmation**: <list assumed stack>
4. **Spike needed**: Any unknowns requiring investigation before feature breakdown?
5. **Timeline**: Any hard deadlines?

See docs/checkpoints/build-strategy-guide.md for the full decision guide.

---
_To unblock: comment with `✅ approved` (or `✅ approved with changes: ...`) then close this issue._
EOF
)"
```

**Do not proceed to Phase 1 until this issue is closed.**

See full checkpoint protocol: [docs/checkpoints/replan-checkpoint.md](../checkpoints/replan-checkpoint.md)

---

## Common Pitfalls

| Pitfall | Remedy |
|---------|--------|
| Creating an Epic for every document section | Merge related sections; epics are about product areas, not doc structure |
| Overlapping Epic boundaries | Define explicit "this epic does NOT cover X" in each body |
| Skipping the consistency pass | One overlap caught here saves many contradictions in Phase 2 |
| Moving to Phase 1 before all docs are read | Always read everything first — a later document may redefine an earlier one |

---

## Related

- [Orchestrator Agent](../agents/orchestrator.md)
- [Process Overview](../process-overview.md)
- [Phase 1 — Feature Breakdown](phase-1-feature-breakdown.md)

