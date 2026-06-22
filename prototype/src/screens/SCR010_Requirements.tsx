import React from 'react'
/**
 * Requirements workspace — input vertalen naar requirements.
 *
 * @requirement B4C-SCR-010
 * @wave Wave01
 * @persona Consultant, ProductOwner
 */
import { useNavigate } from 'react-router-dom'
import { Screen, PageHero, DataTable, PersonaBanner } from '../ScreenLayout'
import { StatusBadge } from '../components/StatusBadge'
import { mockProject } from '../data/mockData'

/**
 * SCR010_Requirements component.
 *
 * @requirement B4C-SCR-010
 * @wave Wave01
 */
export function SCR010_Requirements(): React.JSX.Element {
  const nav = useNavigate()
  return (
    <Screen code="B4C-SCR-010" title="Requirements workspace">
      <PageHero label="REQUIREMENTS" title="Van bron naar requirement" subtitle="Input vertalen naar herleidbare requirements." />
      <PersonaBanner highlights={{
        Consultant: ['Elke requirement is herleidbaar naar een bron', 'AI-gegenereerd + handmatig gevalideerd'],
        Founder: ['Requirements = bewijs dat de klant begrepen is', 'Versnelling vs handmatig uitschrijven'],
        ProductOwner: ['Status per requirement: proposed → accepted → rejected', 'Directe koppeling met use cases'],
        Investor: ['100% herleidbaar = auditeerbaar proces', 'AI-first methodiek, human in the loop'],
      }} />
      <DataTable
        headers={['ID', 'Requirement', 'Status', 'Bron']}
        rows={mockProject.requirements.map(r => [
          <span className="font-mono text-[12px] text-[#6B7A90]">{r.id}</span>,
          r.title,
          <StatusBadge status={r.status} />,
          <span className="font-mono text-[12px] text-[#6B7A90]">{r.sourceId}</span>,
        ])}
      />
      <div className="mt-4">
        <button onClick={() => nav('/projects/kapp/use-cases')} className="py-2 px-4 bg-[#E36F21] text-white rounded-lg text-sm font-medium hover:bg-[#E36F21]/90 transition-colors">
          Koppel use cases →
        </button>
      </div>
    </Screen>
  )
}

