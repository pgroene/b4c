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
import { useLang } from '../contexts/LanguageContext'

/**
 * SCR009_Questions component.
 *
 * @requirement B4C-SCR-009
 * @wave Wave01
 */
export function SCR009_Questions(): React.JSX.Element {
  const nav = useNavigate()
  const { t } = useLang()
  const s = t.screens.scr009
  return (
    <Screen code="B4C-SCR-009" title={s.title}>
      <PageHero label={s.label} title={s.title} subtitle={s.subtitle} />
      <div className="mb-4">
        <StatusBadge status="mock" label={s.aiLabel} />
      </div>
      <DataTable
        headers={[s.colId, s.colQuestion, s.colPriority, s.colStatus]}
        rows={mockProject.questions.map(q => [
          <span className="font-mono text-[12px] text-[#6B7A90]">{q.id}</span>,
          q.text,
          <span className={`text-sm font-medium ${q.priority === 'High' ? 'text-[#C63B32]' : 'text-[#E36F21]'}`}>{q.priority}</span>,
          <StatusBadge status={q.status} />,
        ])}
      />
      <div className="mt-4">
        <button onClick={() => nav('/projects/kapp/requirements')} className="py-2 px-4 bg-[#E36F21] text-white rounded-lg text-sm font-medium hover:bg-[#E36F21]/90 transition-colors">
          {s.makeReqBtn}
        </button>
      </div>
    </Screen>
  )
}
