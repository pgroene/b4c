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

  documents: [
    { type: 'Levend Functioneel Verhaal', status: 'review' },
    { type: 'Validatiebriefing', status: 'draft' },
    { type: 'Functioneel ontwerp preview', status: 'draft' },
    { type: 'Scherm/prototypebriefing', status: 'proposed' },
    { type: 'PMO/readiness rapport', status: 'review' },
    { type: 'Build-ready handover preview', status: 'draft' },
  ],
}
