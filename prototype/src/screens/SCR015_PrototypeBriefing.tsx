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

const SCREENS = [
  { code: 'SCR-001', name: 'Login & toegang',           priority: 'Must',   status: 'ready' as const },
  { code: 'SCR-002', name: 'Workspace selectie',         priority: 'Must',   status: 'ready' as const },
  { code: 'SCR-005', name: 'Projectdashboard',           priority: 'Must',   status: 'ready' as const },
  { code: 'SCR-007', name: 'Intake-invoer',              priority: 'Must',   status: 'ready' as const },
  { code: 'SCR-010', name: 'Requirements workspace',     priority: 'Must',   status: 'proposed' as const },
  { code: 'SCR-012', name: 'Traceability light',         priority: 'Must',   status: 'proposed' as const },
  { code: 'SCR-013', name: 'Levend Functioneel Verhaal', priority: 'Should', status: 'proposed' as const },
  { code: 'SCR-016', name: 'PMO & readiness gate',       priority: 'Must',   status: 'proposed' as const },
]

/**
 * SCR015_PrototypeBriefing component.
 *
 * @requirement B4C-SCR-015
 * @wave Wave01
 */
export function SCR015_PrototypeBriefing(): React.JSX.Element {
  const nav = useNavigate()
  return (
    <Screen code="B4C-SCR-015" title="Prototypebriefing">
      <PageHero
        label="PROTOTYPEBRIEFING"
        title="Schermset overzicht"
        subtitle="Specificatie richting UX/prototype — welke schermen zijn in scope voor Wave 01."
      />

      <DataTable
        headers={['Code', 'Scherm', 'Prioriteit', 'Status']}
        rows={SCREENS.map(s => [
          <span className="font-mono text-xs text-[#6B7A90]">{s.code}</span>,
          <button onClick={() => nav(`/projects/kapp/dashboard`)} className="text-[#E36F21] hover:underline text-left">{s.name}</button>,
          <span className="text-sm">{s.priority}</span>,
          <StatusBadge status={s.status} />,
        ])}
      />

      <div className="mt-6 bg-white rounded-[18px] border border-[#DDE5EE] p-5">
        <h3 className="font-semibold text-[#0E1B2A] mb-2">UX-richting</h3>
        <p className="text-sm text-[#6B7A90]">
          Dark navy SaaS-shell met oranje accentkleur. Consultants werken in het linker navigatiepaneel.
          Founders en investeerders zien samenvattende dashboards en readiness scores.
          Alle schermen zijn mobile-aware maar primair desktop-geoptimaliseerd.
        </p>
      </div>
    </Screen>
  )
}

