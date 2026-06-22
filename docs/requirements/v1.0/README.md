# Requirements Folder — v1.0

This folder contains structured requirement Markdown files produced by Phase 0 (D-16 Document Translation).

## Status

**Current state**: Phase 0 intake complete. D-16 translation pending — requirements to be extracted from `docs/intake/v1.0/` documents.

## Expected structure (after D-16)

```
docs/requirements/v1.0/
  epic-001-saas-shell.md           # Login, Workspace, Customer, Project screens
  epic-002-intake-traceability.md  # Intake, Sources, Questions, Requirements, Use Cases
  epic-003-output-readiness.md     # Traceability, LFV, Documents, Prototype Briefing, Readiness
  epic-004-wave02-demo-plus.md     # Settings, AI-run, Knowledge Vault, Handover
```

## Source documents

- `docs/intake/v1.0/01_Documenten_DOCX/B4C-ROAD-003_Functionele_Schermbriefings_*.docx`
- `docs/intake/v1.0/05_Prototype_Specificaties/screen_register_B4C_SCR_001_020.csv`
- `docs/intake/v1.0/05_Prototype_Specificaties/acceptance_checklist.csv`

## After translation

Once D-16 has run:
- Check that epics map correctly to the 20 screens (B4C-SCR-001..020)
- Use MCP: `list_requirements(version="v1.0")` to confirm all requirements were parsed
- Proceed with CP-A checkpoint
