# Selecting Copilot Instructions

This guide explains how to choose which instruction files to load for different situations — from `applyWhen` patterns to the monolith-vs-split decision.

---

## How Copilot Loads Instruction Files

Copilot automatically loads instruction files based on the file path you are editing:

1. Copilot reads `.github/copilot-instructions.md` (always loaded as the router)
2. For each file in `.github/instructions/`, Copilot checks the `applyWhen` glob
3. If the current file path matches the glob, the instruction file is loaded
4. All matching files are loaded — they stack

**You never manually select instruction files.** The `applyWhen` frontmatter does it automatically.

---

## The Router File

`.github/copilot-instructions.md` acts as a **router and index**. It does not contain rules — it lists which instruction files exist and what they cover. This keeps the router lightweight (~500 tokens) while the actual rules live in split files.

```markdown
## Instruction files

| File | `applyWhen` | ~Tokens |
|------|------------|---------|
| `shared-conventions.instructions.md` | `**` | ~3,000 |
| `agent-workflow.instructions.md` | `**` | ~8,000 |
| `backend.instructions.md` | `src/**` | ~5,000 |
```

---

## Choosing `applyWhen` Patterns

### Start broad, then narrow

For a new project, start with `**` (all files) and a single split later when a surface needs its own rules.

### Pattern examples by project type

#### Small / early-stage project (1-2 people)
```
shared-conventions.instructions.md   applyWhen: "**"
agent-workflow.instructions.md       applyWhen: "**"
```
Total: ~2 files, ~10,000 tokens per call.

#### Medium project with backend + frontend
```
shared-conventions.instructions.md   applyWhen: "**"
agent-workflow.instructions.md       applyWhen: "**"
backend.instructions.md              applyWhen: "src/**"
frontend.instructions.md             applyWhen: "frontend/**"
testing.instructions.md              applyWhen: "tests/**"
```
Backend call: ~3 files (~16,000 tokens). Frontend call: ~3 files (~14,000 tokens).

#### Large project with many surfaces
```
shared-conventions.instructions.md   applyWhen: "**"
agent-workflow.instructions.md       applyWhen: "**"
backend-api.instructions.md          applyWhen: "src/api/**"
backend-domain.instructions.md       applyWhen: "src/domain/**"
frontend.instructions.md             applyWhen: "frontend/**"
testing.instructions.md              applyWhen: "tests/**"
ai-features.instructions.md          applyWhen: "src/**/ai/**"
infrastructure.instructions.md       applyWhen: "infra/**"
```

---

## Monolith vs. Split: Decision Guide

### Use a monolith when:
- The project is in early exploration (rules are still forming)
- The codebase is small and has only one surface
- The team is small and context switching is rare

### Use split files when:
- Any instruction file exceeds ~10,000 tokens
- Different surfaces have different rules (e.g. backend uses C#, frontend uses TypeScript)
- You want to reduce per-call token cost
- A specific surface has many detailed rules that aren't relevant elsewhere

### Migration path: monolith → split

1. Audit your current monolithic `copilot-instructions.md`
2. Categorise each rule:
   - **Universal** → `shared-conventions.instructions.md`
   - **Process** → `agent-workflow.instructions.md`
   - **Surface-specific** → new surface file
3. Create the new files with appropriate `applyWhen`
4. Remove duplicated content from the monolith
5. Update the router to list the new files

---

## `applyWhen` Pattern Reference

| Glob | Matches |
|------|---------|
| `**` | All files in the repository |
| `src/**` | All files under `src/` |
| `src/**/*.cs` | All C# files under `src/` |
| `frontend/**` | All files under `frontend/` |
| `**/*.ts` | All TypeScript files anywhere |
| `src/**/*.{ts,tsx}` | TypeScript/TSX files under `src/` |
| `tests/**` | All files under `tests/` |
| `infra/**` | All files under `infra/` |
| `**/*.test.ts` | All TypeScript test files |
| `src/**/ai/**` | All files in any `ai` subdirectory under `src/` |

---

## What Belongs in Which File

| Content | Where it goes |
|---------|--------------|
| Branching conventions | `shared-conventions.instructions.md` |
| Commit format | `shared-conventions.instructions.md` |
| CI pipelines | `shared-conventions.instructions.md` |
| Zero-warning policy | `shared-conventions.instructions.md` |
| PR checklist | `shared-conventions.instructions.md` |
| Agent roles and pipeline | `agent-workflow.instructions.md` |
| Development phases | `agent-workflow.instructions.md` |
| Work priority order | `agent-workflow.instructions.md` |
| Delegation playbook reference | `agent-workflow.instructions.md` |
| Backend coding rules | `backend.instructions.md` |
| Frontend coding rules | `frontend.instructions.md` |
| Test naming conventions | `testing.instructions.md` |
| Infrastructure rules | `infrastructure.instructions.md` |

---

## When to Add a New Instruction File

Add a new instruction file when:
- A surface grows past ~5 specific rules that don't apply elsewhere
- A new technology is added to the stack (e.g. adding a mobile app)
- A new team works on a distinct area of the codebase

**Process**:
1. Create the file in `.github/instructions/`
2. Add `applyWhen` frontmatter
3. Move relevant rules from `shared-conventions.instructions.md`
4. Add the new file to the router in `.github/copilot-instructions.md`
5. Verify token counts in the router

---

## Verifying Your Setup

Check that your instruction files are loading correctly:

1. Open a file in a surface that should load a specific instruction file
2. Ask Copilot a question that requires knowledge from that instruction file
3. If Copilot answers correctly, the file is loading
4. If not, check the `applyWhen` pattern against the actual file path

---

## Related

- [Creating Instructions](creating-instructions.md)
- [Instruction Feedback Loop](instruction-feedback-loop.md)
- [Maintaining Instructions](../maintaining-instructions.md)

