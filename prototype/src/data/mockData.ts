/**
 * Kerkleden-app NGK Beverwijk — sanitized demo data.
 * All records are fictitious. No real personal data.
 * Source: docs/intake/v1.0/06_Demo_Data/kerkleden_app_demo_data_sanitized.json
 *
 * @requirement B4C-SCR-005 B4C-SCR-007 B4C-SCR-008 B4C-SCR-009 B4C-SCR-010
 * @requirement B4C-SCR-011 B4C-SCR-012 B4C-SCR-013 B4C-SCR-014 B4C-SCR-016
 */
import type { MockProject } from './types'

export const mockProject: MockProject = {
  name: 'Kerkleden-app NGK Beverwijk',
  tenant: 'ngk-beverwijk',
  readiness: 62,

  sources: [
    { id: 'SRC-001', title: 'Initiële klantvraag', status: 'validated' },
    { id: 'SRC-002', title: 'Functionele verdieping roosters', status: 'validated' },
    { id: 'SRC-003', title: 'Beheeromgeving uitgangspunt', status: 'proposed' },
  ],

  questions: [
    { id: 'Q-001', text: 'Welke rollen mogen bezoekverslagen lezen en beheren?', priority: 'High', status: 'blocked' },
    { id: 'Q-002', text: 'Welke technische kalenderintegratie wordt gekozen?', priority: 'High', status: 'blocked' },
    { id: 'Q-003', text: 'Welke documenten zijn in V1 beschikbaar?', priority: 'Medium', status: 'review' },
  ],

  requirements: [
    { id: 'REQ-001', title: 'Besloten toegang voor leden', status: 'validated', sourceId: 'SRC-001' },
    { id: 'REQ-002', title: 'Roosters met beschikbaarheid', status: 'proposed', sourceId: 'SRC-002' },
    { id: 'REQ-003', title: 'Aparte beheeromgeving', status: 'proposed', sourceId: 'SRC-003' },
  ],

  useCases: [
    { id: 'UC-001', title: 'Lid logt in en bekijkt profiel/agenda', requirementId: 'REQ-001' },
    { id: 'UC-002', title: 'Roosteraar beheert muziekteamrooster', requirementId: 'REQ-002' },
    { id: 'UC-003', title: 'Appbeheerder publiceert document', requirementId: 'REQ-003' },
  ],

  traceability: [
    { sourceId: 'SRC-001', requirementId: 'REQ-001', useCaseId: 'UC-001', lfvSection: 'Besloten toegang' },
    { sourceId: 'SRC-002', requirementId: 'REQ-002', useCaseId: 'UC-002', lfvSection: 'Roosterbeheer' },
    { sourceId: 'SRC-003', requirementId: 'REQ-003', useCaseId: 'UC-003', lfvSection: 'Documentpublicatie' },
  ],

  traceabilityMatrix: [
    {
      id: 'UC-012',
      domein: 'Ledenbeheer',
      proces: 'Ledenregistratie',
      useCase: 'Lid aanmaken',
      dataObjecten: 'Profiel, Rol',
      autorisatie: 'Beheerder',
      schermen: 'SCR-007, SCR-010',
      tests: 'TC-012, TC-013',
      coveragePct: 92,
      coverageLabel: 'ok',
      status: 'Validated',
      privacygevoelig: true,
      buildReadyImpact: 'Laag',
      eigenaar: 'Petra van Dijk',
      laatsteUpdate: '2026-06-18',
      gekoppeldeVervolgactie: 'REQ-001 review afronden',
    },
    {
      id: 'UC-021',
      domein: 'Roosters',
      proces: 'Roosterbeheer',
      useCase: 'Rooster publiceren',
      dataObjecten: 'Rooster, Team, Tijdslot',
      autorisatie: 'Roosteraar',
      schermen: 'SCR-008, SCR-011',
      tests: 'TC-021',
      coveragePct: 58,
      coverageLabel: 'aandacht',
      status: 'In review',
      privacygevoelig: false,
      buildReadyImpact: 'Middel',
      eigenaar: 'Mark Jansen',
      laatsteUpdate: '2026-06-20',
      gekoppeldeVervolgactie: 'TC-022 opstellen',
    },
    {
      id: 'UC-033',
      domein: 'Pastoraat',
      proces: 'Bezoekregistratie',
      useCase: 'Bezoekverslag opslaan',
      dataObjecten: 'Verslag, Lid, Bezoeker',
      autorisatie: 'Pastor, Ouderling',
      schermen: 'SCR-009, SCR-012',
      tests: 'TC-033',
      coveragePct: 64,
      coverageLabel: 'gap',
      status: 'In review',
      privacygevoelig: true,
      buildReadyImpact: 'Hoog',
      eigenaar: 'Anna Smit',
      laatsteUpdate: '2026-06-22',
      gekoppeldeVervolgactie: 'Q-001 beantwoorden',
    },
    {
      id: 'UC-041',
      domein: 'Documentatie',
      proces: 'Documentbeheer',
      useCase: 'Document publiceren',
      dataObjecten: 'Document, Categorie',
      autorisatie: 'Appbeheerder',
      schermen: 'SCR-014',
      tests: 'TC-041, TC-042',
      coveragePct: 86,
      coverageLabel: 'ok',
      status: 'Validated',
      privacygevoelig: false,
      buildReadyImpact: 'Laag',
      eigenaar: 'Johan de Boer',
      laatsteUpdate: '2026-06-19',
      gekoppeldeVervolgactie: 'Handover klaar',
    },
  ],

  documents: [
    { type: 'Levend Functioneel Verhaal', status: 'review' },
    { type: 'Validatiebriefing', status: 'draft' },
    { type: 'Functioneel ontwerp preview', status: 'draft' },
    { type: 'Scherm/prototypebriefing', status: 'proposed' },
    { type: 'PMO/readiness rapport', status: 'review' },
    { type: 'Build-ready handover preview', status: 'draft' },
  ],
}
