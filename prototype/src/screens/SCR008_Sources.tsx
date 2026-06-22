import React from 'react'
/**
 * Waarheidsdossier light — bronnen als gecontroleerde waarheid tonen.
 *
 * @requirement B4C-SCR-008
 * @wave Wave01
 * @persona Consultant, ProductOwner
 */
import { Screen, PageHero, DataTable } from '../ScreenLayout'
import { StatusBadge } from '../components/StatusBadge'
import { mockProject } from '../data/mockData'
import { useLang } from '../contexts/LanguageContext'

/**
 * SCR008_Sources component.
 *
 * @requirement B4C-SCR-008
 * @wave Wave01
 */
export function SCR008_Sources(): React.JSX.Element {
  const { t } = useLang()
  const s = t.screens.scr008
  return (
    <Screen code="B4C-SCR-008" title={s.title}>
      <PageHero label={s.label} title={s.title} subtitle={s.subtitle} />
      <DataTable
        headers={[s.colId, s.colSource, s.colStatus]}
        rows={mockProject.sources.map(src => [
          <span className="font-mono text-[12px] text-[#6B7A90]">{src.id}</span>,
          src.title,
          <StatusBadge status={src.status} />,
        ])}
      />
    </Screen>
  )
}
