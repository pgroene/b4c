---
applyWhen: "prototype/**"
---

# Frontend Instructions — B4Code Prototype

> **Scope:** These rules apply to all files under `prototype/`.
> Shared rules (branching, commit format, etc.) are in `shared-conventions.instructions.md`.

---

## Tech Stack

| Layer | Choice | Version |
|-------|--------|---------|
| Framework | React | 18 |
| Build tool | Vite | 5+ |
| Language | TypeScript | 5+ (strict mode) |
| Styling | Tailwind CSS | 3+ |
| Routing | React Router | v6 |
| Runtime data | Static JSON mock | — |

---

## Requirement Tracking — The Most Important Rule

**Before editing any `.tsx`/`.ts` file, run:**

```bash
cd prototype
npm run req:find -- B4C-SCR-007     # find all files for screen 007
npm run req:find -- REQ-001         # find all files for a data requirement
```

**After adding, renaming, or moving any component:**

```bash
cd prototype
npm run req:index                   # rebuild .reqtrack/index.json
git add .reqtrack/index.json        # always commit the updated index
```

**The index is the source of truth.** Never grep source files manually.

---

## Annotation Syntax

Every exported component, hook, and utility **must** have a JSDoc block with at least one `@requirement` tag.

### Screen component (1-to-1 with B4C-SCR-xxx)

```tsx
/**
 * Intake screen — klantinput invoeren als herleidbare bron.
 * Primary proof: shows how raw customer input becomes a traceable source.
 *
 * @requirement B4C-SCR-007
 * @wave Wave01
 * @persona Consultant
 */
export function SCR007_Intake(): JSX.Element { ... }
```

### Shared component (used by specific screens)

```tsx
/**
 * ObjectCard — displays a requirement, use case, or source object
 * with ID, title, status badge, and trace links.
 *
 * @requirement B4C-SCR-008 B4C-SCR-009 B4C-SCR-010 B4C-SCR-011 B4C-SCR-012
 */
export function ObjectCard({ ... }: ObjectCardProps): JSX.Element { ... }
```

### Shell / global component (used by ALL screens)

```tsx
/**
 * AppShell — dark SaaS shell with sidebar, topbar, and light content canvas.
 * Wraps every screen in the prototype.
 *
 * @requirement *
 * @scope shell
 */
export function AppShell({ children }: AppShellProps): JSX.Element { ... }
```

### Mock data / services

```tsx
/**
 * Kerkleden-app sanitized demo data.
 * Source: docs/intake/v1.0/06_Demo_Data/kerkleden_app_demo_data_sanitized.json
 * No real personal data — all records are fictitious.
 *
 * @requirement B4C-SCR-005 B4C-SCR-007 B4C-SCR-008 B4C-SCR-009 B4C-SCR-010 B4C-SCR-011
 */
export const mockData: MockData = { ... }
```

### React hooks

```tsx
/**
 * Returns the active demo persona (Consultant | Founder | ProductOwner | Investor).
 * Used in any screen that adapts content by role.
 *
 * @requirement B4C-SCR-001 B4C-SCR-005 B4C-SCR-012 B4C-SCR-013 B4C-SCR-016
 */
export function usePersona(): Persona { ... }
```

---

## File Naming Convention

| Type | Pattern | Example |
|------|---------|---------|
| Screen | `SCR{NNN}_{Name}.tsx` | `SCR007_Intake.tsx` |
| Shared component | `{PascalCase}.tsx` | `ObjectCard.tsx` |
| Hook | `use{PascalCase}.ts` | `usePersona.ts` |
| Data/mock | `{camelCase}.ts` | `mockData.ts` |
| Type definitions | `{camelCase}.types.ts` | `screen.types.ts` |
| Design tokens | `tokens.ts` | `tokens.ts` |

---

## Design System Rules

### Colors (from `design_tokens.json`)

Always use Tailwind classes mapped to B4Code tokens — never raw hex values in JSX.

| Token name | Tailwind class | Hex | Usage |
|---|---|---|---|
| `deep_navy` | `bg-deep-navy` / `text-deep-navy` | `#0A1F35` | Sidebar background |
| `navy_panel` | `bg-navy-panel` | `#112B4C` | Sidebar hover, panels |
| `orange_control` | `bg-orange-control` / `text-orange-control` | `#E36F21` | Primary buttons, CTAs |
| `card_bg` | `bg-card-bg` | `#F7F9FC` | Content cards |
| `success` | `text-success` | `#2A9D8F` | Validated/GO state |
| `red_alert` | `text-red-alert` | `#C63B32` | Blocked/error state |
| `muted` | `text-muted` | `#6B7A90` | Secondary text |
| `border` | `border-border` | `#DDE5EE` | Card borders |

### Layout constants

- Sidebar width: `w-[280px]`
- Topbar height: `h-[72px]`
- Card border radius: `rounded-[18px]`
- Content max width: `max-w-[1440px]`

### Typography

- Font: `font-sans` (Inter, Segoe UI, Arial)
- H1: `text-[32px] font-semibold`
- H2: `text-[22px] font-semibold`
- Body: `text-[15px]`
- Small: `text-[12px]`

---

## Status Badge Rules

Every AI-generated or proposed result **must** display a `StatusBadge`. This is a hard acceptance criterion (AC-003).

| State | Badge color | When to use |
|-------|-------------|-------------|
| `validated` | green | Human-confirmed |
| `proposed` | orange | AI-suggested, awaiting review |
| `mock` | orange | Placeholder / demo-only value |
| `draft` | gray | Not yet submitted |
| `blocked` | red | Missing info / dependency |
| `review` | gray | Under review |
| `ready` | green | GO state |

**Never show AI output without a badge.**

---

## Component Structure

```tsx
// ✅ Correct — explicit props type, JSDoc with @requirement, named export
/**
 * @requirement B4C-SCR-010
 */
export function RequirementsWorkspace({ requirements }: RequirementsWorkspaceProps): JSX.Element {
  return ( ... )
}

// ❌ Wrong — no annotation, default export, inline type
export default function({ reqs }) { return <div>{reqs}</div> }
```

---

## Routing

All 20 screens are registered in `src/router.tsx`. Routes match the screen register exactly:

```tsx
// Route pattern matches docs/intake/v1.0/05_Prototype_Specificaties/screen_register_B4C_SCR_001_020.csv
<Route path="/projects/kapp/intake" element={<SCR007_Intake />} />
```

Do not add routes not in the screen register without updating the register CSV and `.reqtrack/index.json`.

---

## Mock Data Rules

- All data lives in `src/data/mockData.ts` (sourced from `docs/intake/v1.0/06_Demo_Data/`)
- No real personal data — all records are fictitious Kerkleden-app entries
- Data is typed — no `any` in mock data files
- Mock AI results always have `status: 'proposed' | 'mock'`

---

## Wave 02 Screens

SCR-017..020 are "demo-plus" — they may be read-only or show placeholder content. Mark them clearly:

```tsx
/**
 * @requirement B4C-SCR-019
 * @wave Wave02
 * @status read-only-placeholder
 */
export function SCR019_KnowledgeVault(): JSX.Element {
  return (
    <AppShell>
      <DemoPlaceholderBanner message="Wave 02 — Knowledge Vault preview. Full implementation post-demo." />
      ...
    </AppShell>
  )
}
```
