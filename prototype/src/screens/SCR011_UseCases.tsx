import React from 'react'
/**
 * Use cases workspace — requirements koppelen aan gedrag.
 *
 * @requirement B4C-SCR-011
 * @wave Wave01
 * @persona Consultant, ProductOwner
 */
import { useNavigate } from 'react-router-dom'
import { Screen, PageHero, DataTable } from '../ScreenLayout'
import { mockProject } from '../data/mockData'
import { useLang } from '../contexts/LanguageContext'

/**
 * SCR011_UseCases component.
 *
 * @requirement B4C-SCR-011
 * @wave Wave01
 */
export function SCR011_UseCases(): React.JSX.Element {
  const nav = useNavigate()
  const { t } = useLang()
  const s = t.screens.scr011
  return (
    <Screen code="B4C-SCR-011" title={s.title}>
      <PageHero label={s.label} title={s.title} subtitle={s.subtitle} />
      <DataTable
        headers={[s.colId, s.colUseCase, s.colRequirement]}
        rows={mockProject.useCases.map(u => [
          <span className="font-mono text-[12px] text-[#6B7A90]">{u.id}</span>,
          u.title,
          <span className="font-mono text-[12px] text-[#6B7A90]">{u.requirementId}</span>,
        ])}
      />
      <div className="mt-4">
        <button onClick={() => nav('/projects/kapp/traceability')} className="py-2 px-4 bg-[#E36F21] text-white rounded-lg text-sm font-medium hover:bg-[#E36F21]/90 transition-colors">
          {s.traceBtn}
        </button>
      </div>
    </Screen>
  )
}
