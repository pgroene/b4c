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

/**
 * SCR008_Sources component.
 *
 * @requirement B4C-SCR-008
 * @wave Wave01
 */
export function SCR008_Sources(): React.JSX.Element {
  return (
    <Screen code="B4C-SCR-008" title="Waarheidsdossier light">
      <PageHero label="WAARHEIDSDOSSIER LIGHT" title="Bronnen" subtitle="Bronnen als gecontroleerde waarheid tonen." />
      <DataTable
        headers={['ID', 'Bron', 'Status']}
        rows={mockProject.sources.map(s => [
          <span className="font-mono text-[12px] text-[#6B7A90]">{s.id}</span>,
          s.title,
          <StatusBadge status={s.status} />,
        ])}
      />
    </Screen>
  )
}

