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
import { useLang } from '../contexts/LanguageContext'

/**
 * SCR010_Requirements component.
 *
 * @requirement B4C-SCR-010
 * @wave Wave01
 */
export function SCR010_Requirements(): React.JSX.Element {
  const nav = useNavigate()
  const { t } = useLang()
  return (
    <Screen code="B4C-SCR-010" title={t.requirements.title}>
      <PageHero label={t.requirements.label} title={t.requirements.title} subtitle={t.requirements.subtitle} />
      <PersonaBanner highlights={t.requirements.highlights} />
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

