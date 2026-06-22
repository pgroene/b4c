# Document Intake Folder — B4Code

Raw handover pack documents live in `v1.0/`. These are the original source of truth for Phase 0.

## What's in v1.0/

| Folder | Contents |
|--------|----------|
| `00_START_HERE/` | README.md, DEVELOPER_HANDOVER_BRIEF.md, PACKAGE_MANIFEST.txt |
| `01_Documenten_DOCX/` | ROAD-001..005 specification documents (.docx) |
| `02_Documenten_PDF/` | ROAD-001..005 specification documents (.pdf) |
| `03_Visuals_PNG/` | Visual diagrams per ROAD document |
| `04_Brand_Assets/` | B4Code brand logos, style guides |
| `05_Prototype_Specificaties/` | screen_register.csv, design_tokens.json, component_inventory.csv, acceptance_checklist.csv |
| `06_Demo_Data/` | kerkleden_app_demo_data_sanitized.json — fictitious demo data |
| `07_Frontend_Starter/` | Static HTML/JS/CSS prototype starter (reference implementation) |
| `08_Review_En_Feedback/` | Review and feedback templates |

## Phase 0 process

Per the [expert-waffle process](../phases/phase-0-documentation-intake.md):

1. Intake docs are here (`docs/intake/v1.0/`)
2. D-16 translates them → structured files in `docs/requirements/v1.0/`
3. D-01 creates GitHub epic issues from the structured files
4. CP-A checkpoint opens — Orchestrator stops for architect/PM decision

## Naming convention

```
docs/intake/
  v1.0/                     ← one subfolder per release version
    00_START_HERE/
    05_Prototype_Specificaties/
    ...
```
