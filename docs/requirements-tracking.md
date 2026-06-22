# Requirement Tracking in C#

This guide explains how to use the `[Requirement]` attribute to trace C# code elements back to business requirements, and how to use the scanner and test pattern to generate coverage reports.

---

## The Hierarchy

Every `[Requirement]` attribute maps a code element into a four-level hierarchy that mirrors your GitHub issues:

```
Epic001               ← GitHub Epic issue
  └── Feature003      ← GitHub Feature issue
        └── Story007  ← GitHub Story issue (user story)
              └── RQ-042  ← specific requirement within the story
```

---

## The Attribute

### Applying to All Code Levels

The `[Requirement]` attribute can be placed on any C# code element:

```csharp
// Class level — the whole class implements something in Epic001 > Feature003
[Requirement("Epic001", "Feature003")]
public class OrderService
{
    // Method level — full hierarchy for this specific method
    [Requirement("Epic001", "Feature003", "Story007", "RQ-042")]
    public void PlaceOrder(Order order)
    {
        ValidateStock(order);   // private — no attribute needed
        SaveOrder(order);
    }

    // Property level
    [Requirement("Epic001", "Feature003", "Story007", "RQ-044")]
    public OrderStatus Status { get; private set; }
}

// Interface level
[Requirement("Epic001", "Feature003")]
public interface IOrderService
{
    [Requirement("Epic001", "Feature003", "Story007", "RQ-042")]
    void PlaceOrder(Order order);
}

// Constructor level
public class OrderService
{
    [Requirement("Epic001", "Feature003", "Story007", "RQ-042")]
    public OrderService(IRepository repository) { ... }
}
```

### Multiple Requirements on One Element

Stack the attribute when one piece of code implements multiple requirements:

```csharp
[Requirement("Epic001", "Feature003", "Story007", "RQ-042")]
[Requirement("Epic002", "Feature005", "Story012", "RQ-078")]
public void ProcessPayment(Order order, decimal amount)
{
    // This method satisfies both RQ-042 and RQ-078
}
```

### Partial Hierarchy (Class vs. Method)

At the class level, you don't need the full hierarchy. Use the most specific level that's meaningful:

```csharp
// Class: just Epic + Feature — spans multiple stories
[Requirement("Epic002")]
public class ReportingService { ... }

// Class: Epic + Feature — spans multiple stories
[Requirement("Epic001", "Feature003")]
public class OrderService { ... }

// Method: always use the full hierarchy
[Requirement("Epic001", "Feature003", "Story007", "RQ-042")]
public void PlaceOrder(Order order) { ... }
```

### The `Notes` Property

Add optional context to explain the implementation decision:

```csharp
[Requirement("Epic001", "Feature003", "Story007", "RQ-042",
    Notes = "Validates against the real-time inventory service, not local cache")]
public void PlaceOrder(Order order) { ... }
```

---

## Requirement IDs

IDs are free-form strings — use whatever naming convention matches your GitHub issues or requirements document. Recommended formats:

| Level | Format | Example |
|-------|--------|---------|
| Epic | `EpicNNN` | `Epic001` |
| Feature | `FeatureNNN` | `Feature003` |
| Story | `StoryNNN` | `Story007` |
| Requirement | `RQ-NNN` | `RQ-042` |

> **Tip**: Match the IDs to your GitHub issue numbers for direct traceability:
> `Epic001` → GitHub issue #1, `Feature003` → GitHub issue #3, etc.

---

## Roslyn Analyzer

The `Requirements.Analyzers` project adds build-time diagnostics. Add it to your project:

```xml
<!-- In your .csproj -->
<ItemGroup>
  <ProjectReference Include="path/to/Requirements.Analyzers.csproj"
                    OutputItemType="Analyzer"
                    ReferenceOutputAssembly="false" />
</ItemGroup>
```

### Diagnostics

#### REQ001 — Error: Empty requirement ID {#req001}

```csharp
// ❌ Triggers REQ001
[Requirement("", "Feature003", "Story007", "RQ-042")]
public class OrderService { }

// ✅ Fix
[Requirement("Epic001", "Feature003", "Story007", "RQ-042")]
public class OrderService { }
```

#### REQ002 — Warning: Public method missing [Requirement] {#req002}

When a class has `[Requirement]`, all its public methods should too:

```csharp
[Requirement("Epic001", "Feature003")]
public class OrderService
{
    // ⚠️ REQ002: class has [Requirement] but this public method does not
    public void PlaceOrder(Order order) { ... }

    // ✅ Fix: add [Requirement] to the method
    [Requirement("Epic001", "Feature003", "Story007", "RQ-042")]
    public void PlaceOrder(Order order) { ... }
}
```

To suppress REQ002 for infrastructure methods (e.g. `ToString` overrides), use:

```csharp
#pragma warning disable REQ002
public override string ToString() => _id.ToString();
#pragma warning restore REQ002
```

#### REQ003 — Info: Containing class missing [Requirement] {#req003}

```csharp
// ℹ️ REQ003: method has [Requirement] but class does not
public class OrderService
{
    [Requirement("Epic001", "Feature003", "Story007", "RQ-042")]
    public void PlaceOrder(Order order) { ... }
}

// ✅ Fix: add class-level [Requirement]
[Requirement("Epic001", "Feature003")]
public class OrderService { ... }
```

---

## Scanning at Runtime

Use `RequirementScanner` to find all `[Requirement]` usages via reflection:

```csharp
var scanner = new RequirementScanner();

// Find all usages of a specific requirement
var usages = scanner.ScanForRequirement(
    typeof(OrderService).Assembly,
    "RQ-042");

foreach (var usage in usages)
    Console.WriteLine($"{usage.DisplayName} ({usage.Kind}) — {usage.Attribute}");

// Build a full coverage report
var report = scanner.BuildCoverageReport(
    typeof(OrderService).Assembly,   // production assembly
    typeof(OrderServiceTests).Assembly);  // test assembly

Console.WriteLine($"Implemented: {report.ImplementedRequirements.Count}");
Console.WriteLine($"Untested:    {report.UntestedRequirements.Count}");
Console.WriteLine($"Unimplemented (vs known): {report.UnimplementedRequirements.Count}");
```

---

## Test Coverage Pattern

Add `[Requirement]` to your test methods for reverse traceability — the scanner will mark those requirements as "tested":

```csharp
[Fact]
[Requirement("Epic001", "Feature003", "Story007", "RQ-042")]
public void PlaceOrder_ValidatesStock_BeforeConfirming()
{
    // When this test passes, RQ-042 is both implemented AND tested.
    // The scanner will include it in TestUsages, not UntestedRequirements.
    var service = new OrderService(_mockRepo);
    var order   = new Order { ... };

    service.PlaceOrder(order);

    _mockRepo.Verify(r => r.CheckStock(order), Times.Once);
}
```

See `tests/Requirements.Tests/RequirementCoverageTests.cs` for the full test pattern that:
- Asserts all known requirements are implemented
- Asserts all implementations have test coverage
- Outputs a full coverage matrix to the test runner output

---

## CI Integration

Add a step to your CI pipeline to run the coverage tests and capture the matrix output:

```yaml
# Example: GitHub Actions
- name: Run requirement coverage tests
  run: dotnet test tests/Requirements.Tests --logger "console;verbosity=detailed"

- name: Upload coverage matrix
  uses: actions/upload-artifact@v3
  with:
    name: requirement-coverage
    path: test-results/
```

When the **"Requirement coverage matrix"** test runs, it prints the full Epic → Feature → Story → RQ matrix with ✅/❌/🧪 markers to the test output.

---

## Quick Reference

| Attribute usage | When to use |
|----------------|-------------|
| `[Requirement("Epic001")]` | Class covers an entire Epic |
| `[Requirement("Epic001", "Feature003")]` | Class covers a Feature |
| `[Requirement("Epic001", "Feature003", "Story007")]` | Class or method covers a Story |
| `[Requirement("Epic001", "Feature003", "Story007", "RQ-042")]` | Method implements a specific requirement |
| Stacked `[Requirement]` | Method/class implements multiple requirements |

---

## Related

- [Requirements Lifecycle](requirements-lifecycle.md) — how GitHub issues map to code attributes
- [Process Overview](process-overview.md) — where requirement tracking fits in the development process
- [Phase 2 — User Stories](phases/phase-2-user-stories.md) — where Requirement IDs are defined
- [Phase 5 — Feature Implementation](phases/phase-5-implementation.md) — when to add [Requirement] during TDD

