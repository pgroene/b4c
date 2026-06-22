# Requirements Lifecycle

This document describes how a business requirement flows from a GitHub issue (Phase 0–2) all the way to a `[Requirement]` attribute in C# code (Phase 5), and how it is tracked through changes, testing, and code reviews.

---

## The Full Lifecycle

```
Product Documentation
        │
        ▼ Phase 0
[Epic Issue #1]   ← "Epic001" in code
  gh issue create --label epic
        │
        ▼ Phase 1
[Feature Issue #3]  ← "Feature003" in code
  gh issue create --label enhancement
  Body: "Part of #1"
        │
        ▼ Phase 2
[Story Issue #7]  ← "Story007" in code
  gh issue create --label story
  Body: "Part of feature #3, Part of epic #1"
  Acceptance criteria:
    - System validates stock availability  ← becomes RQ-042
    - System calculates total with tax     ← becomes RQ-043
        │
        ▼ Phase 3 (test stubs)
[Test stubs — deliberately failing]
  [Requirement("Epic001", "Feature003", "Story007", "RQ-042")]
  public void PlaceOrder_ValidatesStock() { expect(true).toBe(false) }
        │
        ▼ Phase 5 (implementation)
[Production code]
  [Requirement("Epic001", "Feature003", "Story007", "RQ-042")]
  public void PlaceOrder(Order order) { ... }

[Test code — now passing]
  [Requirement("Epic001", "Feature003", "Story007", "RQ-042")]
  public void PlaceOrder_ValidatesStock_BeforeConfirming() { ... }
        │
        ▼ CI
[RequirementCoverageTests run]
  ✅ RQ-042 implemented + tested
  ✅ RQ-043 implemented + tested
```

---

## ID Naming Convention

Map Requirement IDs directly to GitHub issue numbers for zero-friction traceability:

| Hierarchy level | GitHub | Code attribute |
|----------------|--------|---------------|
| Epic | Issue #1 | `"Epic001"` |
| Feature | Issue #3 | `"Feature003"` |
| Story | Issue #7 | `"Story007"` |
| Requirement | Sub-item of Story | `"RQ-042"` |

> **Tip**: Requirement IDs (`RQ-NNN`) are numbered within a story. Story #7 has `RQ-042`, `RQ-043`, `RQ-044`, etc. The numbering is sequential across all stories — not per-story — so each Requirement ID is globally unique.

Alternatively, you can use a composite key:

```
"#7-01"   ← Story #7, first requirement
"#7-02"   ← Story #7, second requirement
```

Use whichever format your team prefers — as long as it is consistent and unique.

---

## Where Requirement IDs Are Defined

Requirement IDs are derived from the **acceptance criteria** in Story issues (Phase 2).

Each bullet point in the acceptance criteria becomes a Requirement ID:

```markdown
<!-- GitHub Story issue #7 body -->
Part of feature #3
Part of epic #1

## Story
As a customer, I want to place an order so that I can buy products.

## Acceptance criteria
- [ ] System validates stock availability before confirming ← RQ-042
- [ ] System calculates total including 21% VAT            ← RQ-043
- [ ] System sends a confirmation email                    ← RQ-044
```

Add the Requirement IDs to the issue body when they are assigned:

```markdown
## Acceptance criteria with RQ IDs
- [ ] [RQ-042] System validates stock availability before confirming
- [ ] [RQ-043] System calculates total including 21% VAT
- [ ] [RQ-044] System sends a confirmation email
```

---

## Applying Attributes During TDD (Phase 3 + Phase 5)

### Phase 3 — Test stubs

When creating test stubs, add `[Requirement]` to each stub method:

```csharp
// tests/OrderTests.cs
[Fact]
[Requirement("Epic001", "Feature003", "Story007", "RQ-042")]
public void PlaceOrder_ValidatesStock()
{
    // TODO: stub — intentionally fails
    Assert.True(false, "Not yet implemented");
}
```

### Phase 5 — Implementation

When implementing the production code, add `[Requirement]` at class and method level:

```csharp
// src/Domain/OrderService.cs
[Requirement("Epic001", "Feature003")]          // ← class: covers the whole feature
public class OrderService
{
    [Requirement("Epic001", "Feature003", "Story007", "RQ-042")]   // ← method: specific RQ
    public void PlaceOrder(Order order)
    {
        // TDD: make the RQ-042 test pass
    }
}
```

Replace the stub's `Assert.True(false, ...)` with a real assertion. Now:
- The test carries `[Requirement("...", "RQ-042")]` → it appears in `TestUsages`
- The production method carries `[Requirement("...", "RQ-042")]` → it appears in `ImplementationUsages`
- The scanner marks RQ-042 as **implemented + tested** ✅

---

## When a Requirement Changes

If acceptance criteria in a Story issue change:

1. **Update the GitHub issue** — edit the story body to reflect the changed criterion
2. **Find all affected code** using the scanner:
   ```csharp
   var usages = scanner.ScanForRequirement(assembly, "RQ-042");
   // Returns every class, method, property, and test that implements RQ-042
   ```
   Or from the command line (using grep):
   ```bash
   grep -r "RQ-042" src/ tests/
   ```
3. **Update each implementation** — change the code, update or add `[Requirement]` if the ID changes
4. **Update the tests** — ensure the updated acceptance criteria have new or updated test methods
5. **Run the coverage tests** — confirm `RequirementCoverageTests` passes
6. **Open a PR** linked to the story issue: `Closes #7`

---

## Tracing a Requirement Change — Worked Example

**Scenario**: RQ-042 changes from "validates stock" to "validates stock AND minimum order quantity".

1. Update Story #7 on GitHub:
   ```markdown
   - [ ] [RQ-042] System validates stock availability AND minimum order quantity
   ```

2. Find affected code:
   ```bash
   grep -rn '"RQ-042"' src/ tests/
   # Output:
   # src/Domain/OrderService.cs:12:  [Requirement("Epic001", "Feature003", "Story007", "RQ-042")]
   # tests/OrderTests.cs:24:         [Requirement("Epic001", "Feature003", "Story007", "RQ-042")]
   ```

3. Update `OrderService.PlaceOrder` to also validate minimum quantity.

4. Update the test to assert the new behaviour.

5. Run `dotnet test` — all tests pass.

6. `RequirementCoverageTests.AllKnownRequirements_AreImplemented` — still green.

---

## Retiring a Requirement

When a requirement is removed from the product:

1. Close the GitHub issue with a comment explaining why it was removed.
2. Remove the `[Requirement]` attribute from the code.
3. Remove the requirement from the `KnownRequirements` list in `RequirementCoverageTests`.
4. Remove or update any tests that carried that `[Requirement]` attribute.
5. Open a PR: `chore: remove RQ-042 (retired — no longer part of product scope)`.

---

## Coverage Report in CI

The `RequirementCoverageTests.OutputCoverageMatrix` test outputs a matrix like this to the test runner:

```
═══════════════════════════════════════════════════
  REQUIREMENT COVERAGE MATRIX
═══════════════════════════════════════════════════
  Total usages found:        8
  Production usages:         5
  Test usages:               3
  Implemented requirements:  3
  Untested requirements:     0
  Unimplemented (vs known):  0

📦 Epic: Epic001
  📋 Feature: Feature003
    📖 Story: Story007
      ✅🧪 RQ-042
           → [CODE] YourProject.Domain.OrderService (Class)
           → [CODE] YourProject.Domain.OrderService.PlaceOrder (Method)
           → [TEST] Requirements.Tests.RequirementCoverageTests.RQ042_StockValidation (Method)
      ✅🧪 RQ-043
           → [CODE] YourProject.Domain.OrderService.CalculateTotal (Method)
           → [TEST] Requirements.Tests.RequirementCoverageTests.RQ043_TotalCalculation (Method)
═══════════════════════════════════════════════════
```

Legend: ✅ = implemented | ❌ = not implemented | 🧪 = has test coverage | ⚠️ = no test coverage

---

## Related

- [Requirements Tracking (usage guide)](requirements-tracking.md)
- [Phase 2 — User Stories](phases/phase-2-user-stories.md) — where RQ IDs are assigned
- [Phase 3 — Test Stubs](phases/phase-3-test-stubs.md) — when to add [Requirement] to test stubs
- [Phase 5 — Feature Implementation](phases/phase-5-implementation.md) — when to add [Requirement] to production code
- [Process Overview](process-overview.md)

