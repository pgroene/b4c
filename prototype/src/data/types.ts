/**
 * B4Code prototype type definitions.
 *
 * @requirement *
 * @scope types
 */

export type Persona = 'Consultant' | 'Founder' | 'ProductOwner' | 'Investor'

export type StatusState = 'draft' | 'proposed' | 'validated' | 'blocked' | 'review' | 'ready' | 'mock'

export type Wave = 'Wave01' | 'Wave02'

export interface Source {
  id: string           // SRC-NNN
  title: string
  status: StatusState
}

export interface Question {
  id: string           // Q-NNN
  text: string
  priority: 'High' | 'Medium' | 'Low'
  status: StatusState
}

export interface Requirement {
  id: string           // REQ-NNN
  title: string
  status: StatusState
  sourceId: string
}

export interface UseCase {
  id: string           // UC-NNN
  title: string
  requirementId: string
}

export interface TraceabilityLink {
  sourceId: string
  requirementId: string
  useCaseId: string
  lfvSection: string
}

export type CoverageLabel = 'ok' | 'aandacht' | 'gap'

export interface TraceabilityRow {
  id: string                  // e.g. UC-012
  domein: string
  proces: string
  useCase: string
  dataObjecten: string
  autorisatie: string
  schermen: string
  tests: string
  coveragePct: number
  coverageLabel: CoverageLabel
  // Detail panel fields
  status: string
  privacygevoelig: boolean
  buildReadyImpact: string
  eigenaar: string
  laatsteUpdate: string
  gekoppeldeVervolgactie: string
}

export interface DocumentPreview {
  type: string
  status: StatusState
}

export interface MockProject {
  name: string
  tenant: string
  readiness: number    // 0-100
  sources: Source[]
  questions: Question[]
  requirements: Requirement[]
  useCases: UseCase[]
  traceability: TraceabilityLink[]
  traceabilityMatrix: TraceabilityRow[]
  documents: DocumentPreview[]
}
