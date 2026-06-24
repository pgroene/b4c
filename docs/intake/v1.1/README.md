# B4C Intake — v1.1

**Date**: 2026-06-24  
**Change scope**: SCR-012 Traceability screen redesign

## What changed

The traceability screen (SCR-012) is upgraded from a minimal chain view to a rich matrix dashboard based on the mockup provided via WhatsApp on 2026-06-24.

## New design (SCR012_traceability_mockup_v1.1.jpeg)

### KPI bar (4 cards)
| Card | Value |
|------|-------|
| Coverage oordeel | 82% |
| Open gaps | 6 |
| Build-ready blockers | 2 |
| Gekoppelde objecten | 43 |

### Traceability matrix table (left 60%)
Columns: **Domein · Proces · Use case · Data-objecten · Autorisatie · Schermen · Tests · Coverage**

| Domein | Row | Coverage |
|--------|-----|----------|
| Ledenbeheer | UC-012 | 92% (green) |
| Roosters | UC-021 | Aandacht (orange) |
| Pastoraat | UC-033 | Gap (red) — selected by default |
| Documentatie | UC-041 | 86% (green) |

- Clickable rows: selected row gets orange left border highlight
- Coverage shown as colored badge

### Detail panel (right 40%)
- Header: "Detailpanel geselecteerde keten" + "In review" status badge
- Chain visualisation: **Domein → Proces → Use case → Scherm → Tests**
- 6 metadata fields (2-column grid):
  - Status, Privacygevoelig, Build-ready impact, Eigenaar, Laatste update, Gekoppelde vervolgactie
- Coverage progress bar at bottom (example: 64% / Gap for Pastoraat)

## Footer note
> Demo-opmerking: B4C-SCR-010 v0.2 vervangt alleen de traceability mockup.
