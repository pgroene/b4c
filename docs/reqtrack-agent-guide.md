# reqtrack — Agent Usage Guide

`reqtrack` is the mandatory tool for finding and tracking code before making changes related to a requirement.
**Agents must use `reqtrack` instead of scanning source files** — this keeps LLM token usage low and change impact clear.

---

## Installation

```bash
# Install as a .NET global tool (one-time, per machine)
dotnet tool install -g reqtrack

# Or update to the latest version
dotnet tool update -g reqtrack

# Verify installation
reqtrack --help
```

---

## The Index

All commands query `.reqtrack/index.json` — a pre-built source index committed to the repository.

```bash
# Rebuild the index after making code changes (always run this at the end of a feature branch)
reqtrack index

# Scan a specific directory instead of cwd
reqtrack index --path /path/to/repo
```

**When to rebuild the index:**
- After adding or removing `[Requirement]` attributes
- After renaming files or classes
- At the start of a feature branch (to ensure the index is fresh)
- As part of your CI pipeline (see below)

---

## Command Reference

### `reqtrack find <id>` — Find code by requirement ID

Use this **before editing any code** related to a requirement. It tells you exactly which files to open.

```bash
# Find all code implementing an Epic
reqtrack find Epic001

# Find by Story
reqtrack find Story007

# Find by specific Requirement ID
reqtrack find RQ-042

# Get just the file paths (for use with other tools)
reqtrack find RQ-042 --format paths

# Get JSON (for programmatic processing)
reqtrack find RQ-042 --format json

# Use a non-default index location
reqtrack find RQ-042 --index /path/to/.reqtrack/index.json
```

**Example output (table):**
```
File                                      Line  Class          Member         Type    Requirement
tests/.../SampleBusinessLogic.cs           29   OrderService   PlaceOrder     Method  Epic001 > Feature003 > Story007 > RQ-042
src/Orders/OrderService.cs                 55   OrderService   PlaceOrder     Method  Epic001 > Feature003 > Story007 > RQ-042
```

**Agent workflow:**
```
1. reqtrack find RQ-042 --format paths   → get the list of files
2. Read only those files                  → no full-codebase scan needed
3. Make changes
4. reqtrack index                         → update the index
```

---

### `reqtrack affected --file <path>` — See what requirements a file touches

Use this **before editing a file** to understand what requirements you might impact.

```bash
# Check a file by name (partial match)
reqtrack affected --file OrderService.cs

# Check by path segment
reqtrack affected --file src/Orders/

# Get just the requirement IDs
reqtrack affected --file OrderService.cs --format paths
```

**Example output:**
```
File                        Line  Member       Requirement
src/Orders/OrderService.cs   55   PlaceOrder   Epic001 > Feature003 > Story007 > RQ-042
src/Orders/OrderService.cs   72   Calculate    Epic001 > Feature003 > Story007 > RQ-043
```

---

### `reqtrack report` — Coverage matrix

Use this at **sprint kickoff** to verify all sprint requirements have code, and at **code review** to spot uncovered requirements.

```bash
# Full coverage report
reqtrack report

# Show only requirements with zero implementations
reqtrack report --missing

# JSON output for CI dashboards
reqtrack report --format json
```

---

### `reqtrack diff [--since <ref>]` — Requirements affected by git changes

Use this during **PR review** to understand the requirement surface of a change set.

```bash
# See requirements affected by the last commit
reqtrack diff

# Compare against a branch
reqtrack diff --since main

# Compare against a specific commit
reqtrack diff --since abc1234

# Get just the requirement IDs (for PR description generation)
reqtrack diff --since main --format ids
```

**Example output:**
```
Changed files since 'main': 3  Affected annotations: 5

File                        Line  Member       Requirement
src/Orders/OrderService.cs   55   PlaceOrder   Epic001 > Feature003 > Story007 > RQ-042
```

---

## Standard Agent Workflows

### Before implementing a requirement (Feature Agent)

```bash
# 1. Find all existing code for the requirement
reqtrack find RQ-042 --format paths

# 2. Read the affected files (only those files — not the whole codebase)
# ... read and understand the files ...

# 3. Implement changes

# 4. Rebuild the index
reqtrack index

# 5. Verify the new annotations are indexed
reqtrack find RQ-042
```

### Before editing any source file (Feature Agent)

```bash
# Always check what requirements a file touches before modifying it
reqtrack affected --file <filename>

# This tells you: if you change this file, which requirements may be affected
```

---

## Requirement Validation Gate

After every implementation change, before opening a PR, run the full validation gate to confirm all affected requirements' acceptance criteria are still satisfied.

```bash
# Step 1 — find every requirement the changed files implement
reqtrack affected --file <changed-file-1> --format paths
reqtrack affected --file <changed-file-2> --format paths
# collect all unique RQ-IDs

# Step 2 — for each RQ-ID, find the parent story
reqtrack find <RQ-ID> --format json
# look at the "story" field in each result, e.g. "Story007"

# Step 3 — read the story issue and check acceptance criteria
gh issue list --label "story" --search "Story007" --json number,title,body --limit 3
# or if you know the issue number:
gh issue view <story-number> --json title,body

# Step 4 — for each acceptance criterion listed in the issue, verify it is still met
# If broken: open a bug issue before creating the PR
gh issue create \
  --title "Bug: <RQ-ID> — <criterion> no longer satisfied" \
  --label "bug" \
  --body "..."

# Step 5 — rebuild the index and stage it
reqtrack index
git add .reqtrack/index.json
```

**Do not open a PR if any acceptance criterion is broken** — fix it first or open a bug issue and get explicit approval to defer.

**Shortcut — get all requirements for the entire branch at once:**
```bash
reqtrack diff --since main --format ids
# then fetch stories and check criteria for each ID
```

See [D-15 in the delegation playbook](delegation-playbook.md#d-15--requirement-validation-gate) for the full agent prompt template.

---

### Sprint kickoff (Orchestrator)

```bash
# Check which sprint requirements are already implemented
reqtrack find Sprint1 --format table

# Check which requirements have no code yet (missing)
reqtrack report --missing
```

### PR review (PR Merge Agent)

```bash
# Understand the requirement scope of this PR
reqtrack diff --since main --format ids

# Include the output in the PR review summary
```

### After merging a PR (PR Merge Agent)

```bash
# Regenerate the index so it reflects the merged changes
reqtrack index

# Commit the updated index
git add .reqtrack/index.json
git commit -m "chore: update requirement index after merge"
```

---

## CI Integration

Add to your CI pipeline (GitHub Actions example):

```yaml
- name: Rebuild requirement index
  run: |
    dotnet tool install -g reqtrack
    reqtrack index
    git diff --exit-code .reqtrack/index.json || (echo "Index is stale — run 'reqtrack index' and commit the result" && exit 1)
```

This ensures the committed index always matches the source.

---

## Annotating Code

Place `[Requirement]` attributes at every level where traceability matters:

```csharp
using Requirements;

// Class level — this class implements something in Epic001 / Feature003
[Requirement("Epic001", "Feature003")]
public class OrderService
{
    // Method level — full hierarchy
    [Requirement("Epic001", "Feature003", "Story007", "RQ-042")]
    public void PlaceOrder(Order order)
    {
        // Private helpers do not need [Requirement] — they're covered by the parent
        ValidateOrder(order);
        SaveOrder(order);
    }

    // A method can implement multiple requirements
    [Requirement("Epic001", "Feature003", "Story007", "RQ-042")]
    [Requirement("Epic002", "Feature005", "Story012", "RQ-078")]
    public decimal ProcessPayment(Payment payment) { ... }
}
```

See [docs/requirements-tracking.md](requirements-tracking.md) for the full attribute reference.

---

## Requirement ID Format

Use consistent IDs that match your GitHub issues:

| Level | Format | Example |
|-------|--------|---------|
| Epic | `EpicNNN` | `Epic001` |
| Feature | `FeatureNNN` | `Feature003` |
| Story | `StoryNNN` | `Story007` |
| Requirement | `RQ-NNN` | `RQ-042` |

These IDs should correspond to GitHub issue numbers or labels in your project.

---

## Why This Matters for Agents

Without `reqtrack`, an agent must:
1. Search all `*.cs` files for `[Requirement]` attributes — **thousands of lines, high token cost**
2. Manually identify which files are relevant — **error-prone**
3. Risk missing cross-cutting code — **incomplete changes**

With `reqtrack`:
1. Run `reqtrack find RQ-042 --format paths` — **instant, zero file reading**
2. Read only the 2-5 files returned — **minimal token cost**
3. The index guarantees completeness — **no missed files**

**Rule**: Agents must never scan source files for requirement attributes. Always use `reqtrack find` first.

---

## Related Documentation

- [Requirements Tracking Guide](requirements-tracking.md)
- [Requirements Lifecycle](requirements-lifecycle.md)
- [Process Overview](process-overview.md)
- [Delegation Playbook](delegation-playbook.md)

