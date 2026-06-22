# Instruction Feedback Loop

This document describes the **retrospective → instruction update cycle**: how to capture agent failures, classify them as instruction gaps, update the right file, verify the fix, and prevent regression.

The feedback loop is the most important maintenance activity for a Copilot-driven project. Instructions that aren't updated from experience become stale, and agents make the same mistakes repeatedly.

---

## Overview

```
Sprint ends
    │
    ▼
[1. Observe] Agent makes a mistake or produces unexpected output
    │
    ▼
[2. Classify] Is this an instruction gap?
    │
    ├── Yes ──► [3. Document] Open a RETRO-NNN GitHub issue
    │                │
    │                ▼
    │           [4. Update] Edit the instruction file
    │                │
    │                ▼
    │           [5. Verify] Test the fix in the next sprint
    │                │
    │                ▼
    │           [6. Close] Close the RETRO issue; add entry to router
    │
    └── No ───► [Not an instruction gap] — log as a one-off or bug
```

---

## Step 1 — Observe: Capturing Agent Failures

During a sprint, keep a list of cases where:
- An agent did something you explicitly told it not to do
- An agent missed a step it should have followed
- An agent produced output that violated a coding or process rule
- An agent was uncertain and asked for clarification it shouldn't need

Capture these during the [sprint retrospective (Phase 6)](../phases/phase-6-sprint-review.md).

**Key questions during retrospective:**
- "Did any agent violate a process step?"
- "Did any agent produce code that violated our conventions?"
- "Did any agent ask about something that should have been in the instructions?"
- "Did we have to manually correct the same type of mistake more than once?"

---

## Step 2 — Classify: Is It an Instruction Gap?

Not every agent mistake is an instruction gap. Classify first:

| Type | Description | Action |
|------|-------------|--------|
| **Instruction gap** | The rule or step does not exist in any instruction file | Add it (Steps 3–6) |
| **Unclear instruction** | The rule exists but was ambiguous — agent interpreted it differently | Rewrite it (Steps 3–6) |
| **Missing example** | The rule exists but no example made it concrete | Add an example (Steps 3–6) |
| **Wrong file** | The rule is in a file with a wrong `applyWhen` — not loaded for that surface | Move it (Steps 3–6) |
| **One-off mistake** | The model made an error not related to instructions | Log it; monitor for recurrence |
| **Tool limitation** | The mistake is a known model capability limit | Document as known limitation |
| **Bug** | The code produced a wrong result due to implementation error | Open a `bug` issue |

**Rule**: If the same type of mistake happens twice, it is always an instruction gap — even if it looked like a one-off the first time.

---

## Step 3 — Document: Open a RETRO Issue

Open a GitHub issue for every instruction gap:

```bash
gh issue create \
  --title "RETRO-NNN: <short description of the gap>" \
  --label "chore" \
  --body "## Sprint
Sprint <N>

## Observation
<What happened during the sprint — describe the agent behaviour concretely>

## Root cause
<Which instruction was missing or ambiguous, or which file had the wrong applyWhen>

## Impact
<How many times did this happen? What was the cost — rework, PR rejection, manual correction?>

## Proposed fix
<How to update the instruction — paste the new rule text or revised wording>

## File to update
\`.github/instructions/<filename>\`

## Verification plan
<How will we confirm the fix works in the next sprint — what scenario will we watch for?>
"
```

### RETRO numbering

Use sequential numbers: RETRO-001, RETRO-002, etc. The number space is shared across all retrospective and architecture notes.

---

## Step 4 — Update: Edit the Instruction File

Apply the fix to the appropriate instruction file.

### Which file to update?

Use the routing rule from [selecting-instructions.md](selecting-instructions.md):

- Universal rule → `shared-conventions.instructions.md`
- Process rule → `agent-workflow.instructions.md`
- Surface-specific rule → that surface's instruction file
- Wrong `applyWhen` → update the glob pattern

### Writing the updated rule

Follow the rule-writing guidelines from [creating-instructions.md](creating-instructions.md):

```markdown
## <Section name>

- **<Rule in bold>** — <explanation of what the rule means and why it exists>.
  ```
  // Example of the WRONG pattern
  ...

  // Example of the CORRECT pattern
  ...
  ```
```

### Commit message format

```
chore: RETRO-NNN — <short description of what changed>
```

Example: `chore: RETRO-012 — add rule against per-row repository calls in handlers`

---

## Step 5 — Verify: Test the Fix in the Next Sprint

After updating the instruction file, watch for the behaviour in the next sprint:

1. **Set up the scenario**: assign work that exercises the updated rule.
2. **Observe**: did the agent follow the updated rule?
3. **Document the result** on the RETRO issue:
   ```
   Observed in Sprint <N+1>: agent correctly applied the rule in PR #<number>.
   Marking as verified.
   ```

If the fix didn't work (agent still violates the rule):
- Was the rule in the right file? Check `applyWhen`.
- Was the rule clear enough? Add an example.
- Is the rule contradicted by another rule? Resolve the conflict.

---

## Step 6 — Close: Record in the Router

After successful verification:

1. **Close the RETRO issue**:
   ```bash
   gh issue close <retro-issue-number> \
     --comment "Verified in Sprint <N+1>. Agent correctly applied the updated rule."
   ```

2. **Add to `.github/copilot-instructions.md`** under `## Recent retrospective updates`:
   ```markdown
   - **RETRO-NNN** — <short description of what changed and why>.
   ```
   Keep the most recent 5–10 entries. Archive older ones to `docs/architecture-log.md`.

---

## Instruction Log Template

Maintain a table of all RETRO issues in `docs/architecture-log.md`:

```markdown
## Instruction Updates Log

| # | Sprint | Observation | File updated | Status |
|---|--------|-------------|--------------|--------|
| RETRO-001 | 1 | Agent merged PR with failing tests | agent-workflow.instructions.md | ✅ Verified |
| RETRO-002 | 2 | Agent used DateTime.Now | shared-conventions.instructions.md | ✅ Verified |
| RETRO-003 | 3 | Agent created per-row DB inserts | backend.instructions.md | 🔄 In progress |
```

---

## Fast-Track: When to Update Immediately (Not in Retrospective)

Some issues are severe enough to update instructions immediately rather than waiting for the sprint end:

| Severity | Description | Action |
|----------|-------------|--------|
| 🔴 **Critical** | Instruction caused a security issue (secret committed, auth bypassed) | Update immediately; open RETRO issue for tracking |
| 🔴 **Critical** | Instruction caused data loss or irreversible state | Update immediately |
| 🟠 **High** | Instruction caused a blocker (can't merge any PRs) | Update same day |
| 🟡 **Medium** | Instruction caused rework or wasted agent time | Update in retrospective |
| 🟢 **Low** | Instruction was slightly unclear but agent recovered | Update in retrospective |

---

## Anti-Patterns

| ❌ Anti-pattern | Why it fails |
|----------------|-------------|
| Running the retrospective without checking for instruction gaps | Gaps that aren't captured will recur |
| Opening a RETRO issue without a proposed fix | Issues without fixes never get closed |
| Updating instructions without a verification plan | You won't know if the fix worked |
| Closing RETRO issues without verifying in a real sprint | The fix may be wrong or in the wrong file |
| Only updating instructions for catastrophic failures | Small recurring mistakes compound into big problems |

---

## Related

- [Creating Instructions](creating-instructions.md)
- [Selecting Instructions](selecting-instructions.md)
- [Maintaining Instructions](../maintaining-instructions.md)
- [Phase 6 — Sprint Review](../phases/phase-6-sprint-review.md)
- [Phase 7 — Deep Code Review](../phases/phase-7-code-review.md)

