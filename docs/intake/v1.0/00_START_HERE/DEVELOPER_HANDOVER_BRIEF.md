# Developer Handover Brief - B4Code clickable demo

## Context
B4Code is de AI-first specificatiefabriek: Specify before you build. De demo moet laten zien hoe klantinput wordt omgezet naar gestructureerde specificatieobjecten, traceability, documentviews en readiness.

## Demo-case
Gebruik de Kerkleden-app NGK Beverwijk als demo-case. Gebruik alleen fictieve/geschoonde data uit `06_Demo_Data/kerkleden_app_demo_data_sanitized.json`. Geen echte persoonsgegevens opnemen.

## Gevraagde oplevering
Een high-fidelity clickable frontend demo met dark B4Code SaaS-shell en lichte contentcards. De demo moet zelfstandig te demonstreren zijn aan consultant, founder, product owner en investor.

## Minimale klikroute
Login -> Workspace -> Projectdashboard -> Intake -> Open vragen -> Requirements -> Use cases -> Traceability -> LFV -> Readiness -> Documentgeneratie -> Handover preview.

## Must-have
- B4C-SCR-001 t/m B4C-SCR-016 als Wave 01 core.
- B4C-SCR-017 t/m B4C-SCR-020 als Wave 02 demo-plus als dit zonder scopevervuiling kan.
- Role switcher: consultant, founder, product owner, investor.
- AI-run light of mock, altijd zichtbaar gelabeld.
- Traceability-light zichtbaar van bron naar requirement/use case/LFV.
- Outputdocumenten zichtbaar als previewcards.
- Readiness/dashboard met GO/ADJUST/BLOCK-signalen.

## Niet nodig voor eerste demo
- Productiebackend.
- Echte multi-tenant security.
- Echte documentgeneratie.
- Echte Knowledge Vault retrieval.
- Echte B4Ops-integratie.
- Volledige gebruikersbeheer/authenticatie.

## Aanbevolen implementatie
Voor snelheid: React/Vite of Next.js, CSS modules/Tailwind naar keuze. Gebruik design tokens als basis. De meegeleverde static prototype starter is bedoeld als functioneel en visueel startpunt, niet als eindarchitectuur.

## Acceptatie
Gebruik `05_Prototype_Specificaties/acceptance_checklist.csv` en ROAD-005 voor reviewscenario's.
