import React from 'react'
/**
 * Prototypebriefing / schermset view — specificatie richting UX/prototype.
 *
 * @requirement B4C-SCR-015
 * @wave Wave01
 * @persona ProductOwner
 */
import { useNavigate } from 'react-router-dom'
import { Screen, PageHero, DataTable } from '../ScreenLayout'
import { StatusBadge } from '../components/StatusBadge'
import { useLang } from '../contexts/LanguageContext'

const SCREEN_ROWS = [
  { code: 'SCR-001', priority: 'Must',   status: 'ready' as const },
  { code: 'SCR-002', priority: 'Must',   status: 'ready' as const },
  { code: 'SCR-005', priority: 'Must',   status: 'ready' as const },
  { code: 'SCR-007', priority: 'Must',   status: 'ready' as const },
  { code: 'SCR-010', priority: 'Must',   status: 'proposed' as const },
  { code: 'SCR-012', priority: 'Must',   status: 'proposed' as const },
  { code: 'SCR-013', priority: 'Should', status: 'proposed' as const },
  { code: 'SCR-016', priority: 'Must',   status: 'proposed' as const },
]

/**
 * SCR015_PrototypeBriefing component.
 *
 * @requirement B4C-SCR-015
 * @wave Wave01
 */
export function SCR015_PrototypeBriefing(): React.JSX.Element {
  const nav = useNavigate()
  const { t } = useLang()
  const s = t.screens.scr015
  return (
    <Screen code="B4C-SCR-015" title={s.title}>
      <PageHero label={s.label} title={s.title} subtitle={s.subtitle} />

      <DataTable
        headers={[s.colCode, s.colScreen, s.colPriority, s.colStatus]}
        rows={SCREEN_ROWS.map(row => [
          <span className="font-mono text-xs text-[#6B7A90]">{row.code}</span>,
          <button onClick={() => nav('/projects/kapp/dashboard')} className="text-[#E36F21] hover:underline text-left">
            {s.screenNames[row.code as keyof typeof s.screenNames] ?? row.code}
          </button>,
          <span className="text-sm">{row.priority}</span>,
          <StatusBadge status={row.status} />,
        ])}
      />

      <div className="mt-6 bg-white rounded-[18px] border border-[#DDE5EE] p-5">
        <h3 className="font-semibold text-[#0E1B2A] mb-2">{s.uxHeading}</h3>
        <p className="text-sm text-[#6B7A90]">{s.uxBody}</p>
      </div>
    </Screen>
  )
}
