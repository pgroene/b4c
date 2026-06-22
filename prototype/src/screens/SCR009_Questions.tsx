import React from 'react'
/**
 * Open vragen & validatiepunten — ontbrekende informatie zichtbaar maken.
 *
 * @requirement B4C-SCR-009
 * @wave Wave01
 * @persona Consultant, ProductOwner
 */
import { useNavigate } from 'react-router-dom'
import { Screen, PageHero, DataTable } from '../ScreenLayout'
import { StatusBadge } from '../components/StatusBadge'
import { mockProject } from '../data/mockData'

/**
 * SCR009_Questions component.
 *
 * @requirement B4C-SCR-009
 * @wave Wave01
 */
export function SCR009_Questions(): React.JSX.Element {
  const nav = useNavigate()
  return (
    <Screen code="B4C-SCR-009" title="Open vragen & validatiepunten">
      <PageHero
        label="OPEN VRAGEN"
        title="AI detecteert ontbrekende specificatie-informatie"
        subtitle="Valideer of accepteer open punten voor het aanmaken van requirements."
      />
      <div className="mb-4">
        <StatusBadge status="mock" label="proposed by AI — human validation required" />
      </div>
      <DataTable
        headers={['ID', 'Vraag', 'Prioriteit', 'Status']}
        rows={mockProject.questions.map(q => [
          <span className="font-mono text-[12px] text-[#6B7A90]">{q.id}</span>,
          q.text,
          <span className={`text-sm font-medium ${q.priority === 'High' ? 'text-[#C63B32]' : 'text-[#E36F21]'}`}>{q.priority}</span>,
          <StatusBadge status={q.status} />,
        ])}
      />
      <div className="mt-4">
        <button onClick={() => nav('/projects/kapp/requirements')} className="py-2 px-4 bg-[#E36F21] text-white rounded-lg text-sm font-medium hover:bg-[#E36F21]/90 transition-colors">
          Maak requirements →
        </button>
      </div>
    </Screen>
  )
}

