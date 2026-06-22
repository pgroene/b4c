# Creating Copilot Instruction Files

This guide explains how to write effective Copilot instruction files for your project — from structure and frontmatter to content strategy and token budgets.

---

## What Are Instruction Files?

Copilot instruction files (`.github/instructions/*.instructions.md`) provide context to Copilot agents when they work in your repository. They define:
- Coding conventions and rules
- Architecture patterns
- Development process steps
- Project-specific knowledge

**Key characteristic**: Copilot loads instruction files based on the file path being edited (`applyWhen`). This means you can give Copilot the right context for every surface without overwhelming it with irrelevant details.

---

## File Structure

Every instruction file follows this structure:

```markdown
---
applyWhen: "<glob pattern>"
---

# <Title>

> **Scope:** Brief description of when this file is loaded.

---

## Section 1

Content...

## Section 2

Content...
```

---

## The `applyWhen` Frontmatter

The `applyWhen` field is a **glob pattern** that determines when Copilot loads this instruction file.

### Common patterns

| Pattern | Loads when editing... |
|---------|----------------------|
| `**` | Any file in the repository |
| `src/**/*.cs` | C# files in the src directory |
| `frontend/**` | Any file in the frontend directory |
| `tests/**` | Any file in the tests directory |
| `infra/**` | Any file in the infra directory |
| `**/*.ts` | Any TypeScript file anywhere |
| `src/**/*.{ts,tsx}` | TypeScript/TSX files in src |

### Rules for `applyWhen`

- Use `**` only for truly universal rules (conventions that apply everywhere)
- Be specific: `src/backend/**` is better than `src/**` if the rules only apply to backend
- Overlapping patterns are fine — Copilot will load all matching files
- Order doesn't matter; all matching files are loaded for a given path

---

## Token Budget

Every instruction file loaded for an agent call consumes tokens from the context window. Design your instruction files with this in mind.

### Typical token counts by file type

| File type | Expected size | Why |
|-----------|-------------|-----|
| Shared conventions | ~2,000–4,000 | Applies to everything — keep concise |
| Agent workflow | ~5,000–15,000 | Detailed process steps — worth the tokens |
| Surface-specific (backend, frontend) | ~3,000–8,000 | Patterns and rules for one surface |
| Testing conventions | ~2,000–5,000 | Test patterns and naming rules |

### Total per agent call

- A well-designed split: ~10,000–20,000 tokens per call
- A monolithic file: 30,000–60,000 tokens per call (for the same content)
- Context window for most models: ~128,000–200,000 tokens

**Recommendation**: Keep the total below 30,000 tokens for a typical call. Reserve context for the task itself.

---

## Content Strategy

### What to include

- **Concrete rules**: "Never call `DateTime.Now` — use injected `TimeProvider`."
- **Examples**: Code snippets showing the right pattern.
- **Anti-patterns**: What NOT to do, and why.
- **Commands**: Exact shell commands for recurring operations.
- **Tables**: Quick reference for labels, pipelines, branch names.

### What to avoid

- **Vague guidance**: "Write clean code" is not actionable.
- **Background context**: Project history, design rationale (belongs in ADRs).
- **Information that changes frequently**: Links to external resources that may go stale.
- **Duplication**: If the same rule appears in two files, it will conflict when updated.

---

## Splitting an Instruction File

Split when a single file exceeds ~10,000 tokens OR when different rules apply to different surfaces.

### Before splitting (monolithic)

```
.github/copilot-instructions.md  ← everything in one file (40,000 tokens)
```

### After splitting

```
.github/instructions/
├── shared-conventions.instructions.md    ← applyWhen: "**"      (~3,000 tokens)
├── agent-workflow.instructions.md        ← applyWhen: "**"      (~8,000 tokens)
├── backend.instructions.md              ← applyWhen: "src/**"  (~5,000 tokens)
├── frontend.instructions.md             ← applyWhen: "frontend/**" (~4,000 tokens)
└── testing.instructions.md              ← applyWhen: "tests/**" (~3,000 tokens)
```

**Total per backend call**: ~3,000 + ~8,000 + ~5,000 = ~16,000 tokens (vs. 40,000 monolithic)

### Split decision guide

| Rule applies to... | Where to put it |
|-------------------|----------------|
| All files | `shared-conventions.instructions.md` |
| 2+ surfaces | `shared-conventions.instructions.md` |
| One surface only | That surface's instruction file |
| Development process / PRs / GitHub | `agent-workflow.instructions.md` |

---

## Writing Effective Rules

### Rule format

Every rule should answer: **what**, **where**, **why** (and optionally **how**).

```markdown
## Repository rules

- **Repositories must be aggregate repositories** — load and save the full aggregate root.
  Querying individual table rows directly in handlers bypasses the aggregate boundary.
  **Exception: read models.** Read models must be thin single-query projections in a
  dedicated read repository, not the same aggregate repository.
```

### Anti-pattern with explanation

```markdown
### What NOT to do

| ❌ Anti-pattern | ✅ Correct pattern | Reason |
|----------------|-------------------|--------|
| `new ConcreteService()` in a handler | Inject `IConcreteService` via constructor | Enables testing, DI, and abstraction |
| `DateTime.Now` | `timeProvider.GetUtcNow()` | Enables deterministic testing |
| Return all records from a list query | Add `Page`/`PageSize` parameters | Prevents unbounded queries in production |
```

---

## Adding Your First Surface File

When your project grows and you need surface-specific rules:

1. Create the file:
   ```
   .github/instructions/backend.instructions.md
   ```

2. Add the frontmatter:
   ```markdown
   ---
   applyWhen: "src/**"
   ---
   ```

3. Register it in `.github/copilot-instructions.md`:
   ```markdown
   | File | `applyWhen` | ~Tokens |
   |------|------------|---------|
   | `shared-conventions.instructions.md` | `**` | ~3,000 |
   | `agent-workflow.instructions.md` | `**` | ~8,000 |
   | `backend.instructions.md` | `src/**` | ~5,000 |   ← add this row
   ```

---

## Versioning Your Instructions

Instructions should evolve as your project learns. Track changes:

1. When you update an instruction file due to a retrospective finding, add a `RETRO-NNN` entry in `.github/copilot-instructions.md`.
2. Keep a history in the instruction file's comments or `docs/architecture-log.md`.
3. Follow the full feedback loop in [instruction-feedback-loop.md](instruction-feedback-loop.md).

---

## Related

- [Selecting Instructions](selecting-instructions.md)
- [Instruction Feedback Loop](instruction-feedback-loop.md)
- [Maintaining Instructions](../maintaining-instructions.md)
- [Process Overview](../process-overview.md)

