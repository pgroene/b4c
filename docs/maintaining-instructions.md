# Maintaining Instruction Files

This document explains how to evolve your Copilot instruction files as the project grows — adding new rules, splitting files, archiving old content, and keeping the token budget under control.

---

## Why Instructions Need Maintenance

Instruction files are living documents. They need maintenance because:
- New patterns emerge as the project evolves
- Rules that were correct at sprint 1 may be wrong at sprint 10
- Tech debt entries get resolved and should be removed
- The project may add new surfaces (a mobile app, a CLI, an AI feature)
- Retrospective findings reveal gaps or unclear rules

Unmaintained instructions lead to agent drift — agents following outdated rules or ignoring the files because they've grown too large.

---

## Routine Maintenance (Every Sprint)

At the end of every sprint (Phase 6), do a quick instruction file review:

1. **Add new rules** from the retrospective (via the [feedback loop](instructions/instruction-feedback-loop.md))
2. **Remove outdated rules** — rules that no longer apply because the tech changed
3. **Close resolved tech debt entries** — remove rows where the linked issue is closed
4. **Update the `## Team` table** if new team members joined
5. **Check token counts** — if any file exceeds 15,000 tokens, consider splitting

---

## Adding a New Rule

1. Identify which file the rule belongs in (see [selecting-instructions.md](instructions/selecting-instructions.md))
2. Find the right section in that file
3. Write the rule following the format:
   - **Bold rule statement** — explanation
   - Optional example (correct and incorrect patterns)
4. Open a PR: `chore: add rule for <topic>`

---

## Removing an Outdated Rule

When a rule no longer applies (technology changed, pattern replaced, etc.):

1. Delete the rule from the instruction file
2. If the rule was referenced in a `RETRO-NNN` entry in the router, remove or update that entry
3. If the rule was in the tech debt table, verify the linked issue is closed
4. Commit: `chore: remove outdated rule for <topic> (now handled by <new approach>)`

---

## Splitting a Growing File

When a file exceeds ~10,000–15,000 tokens:

### Step 1 — Audit the file

Categorise every section:
- Is it universal (applies everywhere)?
- Is it surface-specific (only applies to one area)?
- Is it process-related (phases, agent roles)?

### Step 2 — Create the new file

```bash
touch .github/instructions/<surface>.instructions.md
```

Add frontmatter:
```markdown
---
applyWhen: "<surface-glob>"
---
```

### Step 3 — Move content

Move surface-specific sections to the new file. Remove them from the original.

### Step 4 — Update the router

In `.github/copilot-instructions.md`, add a row to the instruction files table:
```markdown
| `<surface>.instructions.md` | `<surface-glob>` | ~N,000 |
```

### Step 5 — Verify

Check that Copilot loads the new file correctly (see [selecting-instructions.md](instructions/selecting-instructions.md#verifying-your-setup)).

---

## Archiving Old Content

Some content shouldn't be deleted but is no longer needed in active instructions:
- Old architectural decisions that were superseded
- Resolved tech debt entries with detailed context
- Historical `RETRO-NNN` entries beyond the most recent 10

Move this content to `docs/architecture-log.md` rather than deleting it.

---

## Token Budget Monitoring

Keep a running estimate of each file's token count:

- **Rule of thumb**: 1 token ≈ 4 characters (English text)
- A 10,000-character file ≈ 2,500 tokens
- Check the router's token estimates after major edits

### Per-call token target

| Scenario | Target total |
|----------|-------------|
| Simple feature implementation | < 20,000 tokens |
| Complex architecture work | < 30,000 tokens |
| Maximum (leaves room for context) | < 40,000 tokens |

If per-call totals exceed the target, split the largest file.

---

## Instruction File Health Checklist

Run this checklist when doing a periodic review (every 3–5 sprints):

- [ ] No file exceeds 15,000 tokens
- [ ] The router's token estimates are approximately accurate
- [ ] No outdated rules remain (verify against current tech stack)
- [ ] All resolved tech debt entries are removed
- [ ] All team members are in the `## Team` table
- [ ] The last 5–10 RETRO entries are in the router
- [ ] All files have correct `applyWhen` patterns
- [ ] No rule is duplicated across two files

---

## Adding a New Surface

When the project adds a new technology surface:

1. Create a new instruction file: `.github/instructions/<surface>.instructions.md`
2. Add the `applyWhen` frontmatter with the correct glob
3. Move any existing rules that apply only to this surface from `shared-conventions.instructions.md`
4. Add project-specific rules for the new surface
5. Register in the router

---

## Related

- [Creating Instructions](instructions/creating-instructions.md)
- [Selecting Instructions](instructions/selecting-instructions.md)
- [Instruction Feedback Loop](instructions/instruction-feedback-loop.md)
- [Process Overview](process-overview.md)

