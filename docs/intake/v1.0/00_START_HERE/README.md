# B4C Clickable Demo Handover Pack v0.1

Datum: 2026-06-22

## Doel
Dit pakket is bedoeld om een frontend/developmentpartner direct te laten starten met een high-fidelity clickable demo van B4Code / Specificatiefabriek.

## Antwoord op de kernvraag
Ja, er is nu voldoende informatie om een developer een clickable demo te laten maken. De set is geschikt voor een frontend-prototype/demo, niet voor een productie-MVP.

PNG-schermen zijn bruikbaar als visuele referentie, maar niet ideaal als enige implementatiebron. Daarom bevat dit pakket ook:

- schermregister met routes;
- klikbare demo-flow;
- component inventory;
- design tokens in JSON en CSS;
- sanitized/fictieve Kerkleden-app demo-data;
- statische frontend-starter zonder build-stap;
- acceptatiecriteria;
- review- en feedbacktemplates.

## Startvolgorde voor developer
1. Lees `00_START_HERE/DEVELOPER_HANDOVER_BRIEF.md`.
2. Open `07_Frontend_Starter/static-prototype/index.html` lokaal voor de demo-flow skeleton.
3. Gebruik `05_Prototype_Specificaties/screen_register_B4C_SCR_001_020.csv` als route/schermbasis.
4. Gebruik ROAD-003 voor functionele schermbriefings.
5. Gebruik ROAD-004 voor sprintplan en buildregels.
6. Gebruik ROAD-005 voor demo-script en feedback.

## Belangrijke scopegrens
De demo mag high-fidelity en volledig klikbaar zijn. Backend, echte multi-tenancy, echte documentgeneratie, echte Knowledge Vault en productie-AI zijn niet verplicht voor deze fase. AI mag als AI-run light of mock worden uitgevoerd, mits duidelijk gelabeld.
