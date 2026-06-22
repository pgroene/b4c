# Phase 4 — Architecture Review

| | |
|---|---|
| **Owner** | [Orchestrator](../agents/orchestrator.md) |
| **Trigger** | Every 5 features completed, or at sprint boundary |
| **Inputs** | Last 5 merged PRs, current architecture documentation |
| **Outputs** | `architecture` issues for violations; updated architecture log |
| **Delegation** | [D-08 in delegation-playbook.md](../delegation-playbook.md#d-08--architecture-review) |
| **Previous phase** | [Phase 3 — Test Stubs](phase-3-test-stubs.md) |
| **Next phase** | [Phase 5 — Feature Implementation](phase-5-implementation.md) |

---

## Goal

Catch architectural drift early — before it compounds across many features. Ensure the codebase remains consistent with the defined architectural rules, and that new patterns introduced in recent PRs are sound.

---

## Steps

1. **Identify the last 5 merged PRs**:
   ```bash
   gh pr list --state merged --limit 5 --json number,title,mergedAt \
     --jq '.[] | "#\(.number) \(.title) (\(.mergedAt))"'
   ```

2. **Read each PR's diff**:
   ```bash
   gh pr diff <number>
   ```

3. **Check for violations** of the architectural rules in `shared-conventions.instructions.md`:
   - Dependency direction violations (inner layers depending on outer)
   - Cross-cutting concerns added directly (not via shared abstractions)
   - Repositories calling other repositories
   - N+1 query patterns
   - Missing cancellation token propagation
   - Handler logic that should be in the domain
   - Any other rules listed in your shared conventions

4. **For each violation found**, open an `architecture` issue:
   ```bash
   gh issue create \
     --title "Architecture: <description of violation>" \
     --label "architecture" \
     --body "## Violation
   Found in PR #<number> — <pr title>

   ## Description
   <What rule was violated and where>

   ## Code reference
   File: <path>
   Lines: <start>-<end>

   ## Required fix
   <How to correct it>
   "
   ```

5. **Update the architecture log** (`docs/architecture-log.md`):
   - Add a dated entry summarising findings
   - Reference all opened issues

6. **Note any patterns that should be added to `shared-conventions.instructions.md`**:
   - If the same violation occurs twice, it should become a rule.
   - Follow the [instruction feedback loop](../instructions/instruction-feedback-loop.md).

---

## Architecture Log

Maintain `docs/architecture-log.md` with dated review entries:

```markdown
## ARCH-NNN — <date> — Sprint N review

**PRs reviewed**: #<n>, #<n>, #<n>, #<n>, #<n>

**Findings**:
- Issue #<number> opened: <short description>

**Patterns noted for instruction update**:
- <pattern> → consider adding to shared-conventions
```

---

## Entry Criteria

- [ ] At least 5 features have been completed since the last architecture review
- [ ] Architecture review has not been done in the current sprint yet

## Exit Criteria

- [ ] All last 5 PRs reviewed against the architecture rules
- [ ] All violations have open `architecture` issues
- [ ] Architecture log is updated
- [ ] Instruction update proposed for any repeated violations
- [ ] If violations found: **⏸ CP-D checkpoint issue is open** and Orchestrator is waiting for remediation approval

## ⏸ CP-D — Architecture Remediation (when violations found)

If one or more significant architecture violations are found during Phase 4, the Orchestrator **must stop** before the next sprint and open a CP-D issue:

```bash
gh issue create \
  --title "⏸ CP-D: Architecture Remediation Required" \
  --label "checkpoint,needs-input" \
  --body "$(cat <<'EOF'
## ⏸ CP-D: Architecture Remediation Required

### Violations found
| Issue | Type | Severity | Proposed fix |
|-------|------|----------|-------------|
| #<n> | <type> | High/Medium/Low | <proposal> |

### Impact assessment
- Stories blocked by this: <list>
- Estimated remediation work: <estimate>
- Risk of proceeding without fixing: <risk>

### Proposed remediation sequence
1. Fix #<n> — <why first>
2. Fix #<n> — <why second>

### Questions for architect/PM
1. **Accept proposed fixes**: Approve all / reject some / alternative approach?
2. **Priority**: Fix before next sprint or defer to tech debt sprint?
3. **Sprint impact**: Should the next sprint scope be adjusted?

---
_To unblock: comment with `✅ approved` then close this issue._
EOF
)"
```

See full checkpoint protocol: [docs/checkpoints/replan-checkpoint.md](../checkpoints/replan-checkpoint.md)

---

## Common Pitfalls

| Pitfall | Remedy |
|---------|--------|
| Skipping the review | Schedule it as a hard gate every 5 features |
| Not opening issues for violations | Issues are the record — violations without issues get lost |
| Reviewing only new code | Also check that previous patterns weren't regressed |
| Not updating instructions for repeated violations | If it happens twice, it must become a rule |

---

## Related

- [Orchestrator Agent](../agents/orchestrator.md)
- [Process Overview](../process-overview.md)
- [Phase 3 — Test Stubs](phase-3-test-stubs.md)
- [Phase 5 — Feature Implementation](phase-5-implementation.md)
- [Instruction Feedback Loop](../instructions/instruction-feedback-loop.md)

