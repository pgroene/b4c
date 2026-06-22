# Phase 3 — Test Stubs (TDD-First)

| | |
|---|---|
| **Owner** | [Feature Agent](../agents/feature-agent.md) |
| **Trigger** | User stories exist for a feature |
| **Inputs** | `story` issues with acceptance criteria |
| **Outputs** | Failing test specs committed to a branch; PR opened with red CI |
| **Delegation** | [D-05](../delegation-playbook.md#d-05--test-stub-generation), [D-06](../delegation-playbook.md#d-06--test-backfill) |
| **Previous phase** | [Phase 2 — User Stories](phase-2-user-stories.md) |
| **Next phase** | [Phase 5 — Feature Implementation](phase-5-implementation.md) |

---

## Goal

Define the **acceptance tests** before writing any production code. This ensures:
- The team agrees on what "done" looks like before implementation starts
- Implementation is driven by observable outcomes
- No feature ships without a verifiable test

---

## Steps

1. **For each story, create a test spec file** in your test directory.

2. **Write the test structure** — describe/it blocks, setup, navigation, assertions — but leave the assertions **deliberately failing**:
   ```typescript
   // example using a test framework
   describe('User can reset password', () => {
     it('sends a reset email when a valid email is submitted', async () => {
       // TODO: implement — stub intentionally fails
       expect(true).toBe(false)
     })

     it('shows an error when the email is not registered', async () => {
       // TODO: implement — stub intentionally fails
       expect(true).toBe(false)
     })
   })
   ```

3. **Commit these failing tests** on a feature branch.

4. **Open a PR** titled `test: stubs for <feature>`:
   ```bash
   gh pr create \
     --title "test: stubs for <feature name>" \
     --body "Closes #<story-number>

   ## Test stubs
   Placeholder tests for the following stories:
   - #<story-number> — <story title>

   CI is expected to be red at this stage — stubs are intentionally failing." \
     --base main \
     --head test/stubs-<feature-slug>
   ```

5. **The CI build is expected to fail at this stage** — that is correct behaviour.

---

## Test Naming Convention

Name tests so they directly map to acceptance criteria:

```
<subject> <condition> <expected outcome>
```

Examples:
- `password reset form submits when email is valid`
- `password reset form shows error when email is not registered`
- `login redirects to dashboard after successful authentication`

---

## Stub Placeholder Pattern

Always use a deliberately obvious failure — never skip or mark as pending in a way that could be accidentally left as passing:

```typescript
// ✅ Good — obviously failing
expect(true).toBe(false)

// ✅ Good — throws explicitly
throw new Error('Test stub — not yet implemented')

// ❌ Bad — could be accidentally ignored
test.skip('...')
```

---

## Entry Criteria

- [ ] Story issues exist with acceptance criteria
- [ ] Test framework is set up in the repository

## Exit Criteria

- [ ] Every acceptance criterion has a corresponding test case
- [ ] All test stubs are deliberately failing
- [ ] PR is open with a clear description of which stories are covered
- [ ] CI fails as expected (not due to syntax errors — only assertion failures)

---

## Backfill (D-06)

If stories were implemented before test stubs were created (e.g. during initial setup), use D-06 from the delegation playbook to backfill test coverage. Backfill tests should be written to the same standard — no passing stubs, no skipped tests.

---

## Common Pitfalls

| Pitfall | Remedy |
|---------|--------|
| Writing passing stubs | Stubs must fail — passing stubs mask missing implementation |
| Syntax errors in stubs | Fix syntax errors — only assertion failures are acceptable |
| Missing test cases for edge cases | Each acceptance criterion = at least one test case |
| Stubs without story references | Add story numbers in test file comments for traceability |

---

## Related

- [Feature Agent](../agents/feature-agent.md)
- [Process Overview](../process-overview.md)
- [Phase 2 — User Stories](phase-2-user-stories.md)
- [Phase 5 — Feature Implementation](phase-5-implementation.md)

