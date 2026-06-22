import React from 'react'
/**
 * Export & B4Ops handover preview — brug naar build-ready overdracht.
 *
 * @requirement B4C-SCR-020
 * @wave Wave02
 * @persona Founder, Consultant
 */
import { useNavigate } from 'react-router-dom'
import { Screen, PageHero, DemoPlaceholderBanner } from '../ScreenLayout'
import { StatusBadge } from '../components/StatusBadge'
import { TraceabilityPanel } from '../components/TraceabilityPanel'
import { mockProject } from '../data/mockData'

const EXPORT_PACKAGES = [
  { id: 'req', icon: '📋', label: 'Requirements pakket', desc: '12 requirements + bronverwijzingen', status: 'validated' as const },
  { id: 'uc', icon: '📦', label: 'Use case pakket', desc: '9 use cases + actor matrix', status: 'validated' as const },
  { id: 'lfv', icon: '📄', label: 'Levend Functioneel Verhaal', desc: 'Narratief v0.2 — volledig gebrieft', status: 'proposed' as const },
  { id: 'proto', icon: '🎨', label: 'Prototype briefing', desc: '20 schermen + component inventory', status: 'proposed' as const },
]

const CHECKLIST = [
  { label: 'Requirements gevalideerd door klant', done: true },
  { label: 'Use cases volledig en herleidbaar', done: true },
  { label: 'Traceability aantoonbaar', done: true },
  { label: 'LFV review afgerond', done: false },
  { label: 'Prototype briefing goedgekeurd', done: false },
  { label: 'B4Ops overdracht gereed', done: false },
]

/**
 * SCR020_Handover component.
 *
 * @requirement B4C-SCR-020
 * @wave Wave02
 */
export function SCR020_Handover(): React.JSX.Element {
  const nav = useNavigate()
  return (
    <Screen code="B4C-SCR-020" title="Export & B4Ops handover">
      <DemoPlaceholderBanner message="Wave 02 — exportfunctie en B4Ops-koppeling beschikbaar na productierelease." />
      <PageHero
        label="B4OPS HANDOVER"
        title="Export & overdracht"
        subtitle="Brug naar build-ready overdracht — exportpakketten samenstellen voor ontwikkelpartner."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {EXPORT_PACKAGES.map(pkg => (
          <div key={pkg.id} className="bg-white rounded-[18px] border border-[#DDE5EE] p-4 flex items-start gap-3">
            <span className="text-2xl">{pkg.icon}</span>
            <div className="flex-1">
              <div className="font-semibold text-[#0E1B2A] text-sm">{pkg.label}</div>
              <p className="text-[#6B7A90] text-xs mt-0.5">{pkg.desc}</p>
            </div>
            <StatusBadge status={pkg.status} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-[18px] border border-[#DDE5EE] p-5">
          <h3 className="font-semibold text-[#0E1B2A] mb-3">Handover checklist</h3>
          <ul className="flex flex-col gap-2">
            {CHECKLIST.map(item => (
              <li key={item.label} className="flex items-center gap-2 text-sm">
                <span className={item.done ? 'text-green-500' : 'text-[#6B7A90]'}>{item.done ? '✓' : '○'}</span>
                <span className={item.done ? 'text-[#0E1B2A]' : 'text-[#6B7A90]'}>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-[18px] border border-[#DDE5EE] p-5">
          <h3 className="font-semibold text-[#0E1B2A] mb-2">Voortgangsindicator</h3>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex-1 h-2 bg-[#DDE5EE] rounded-full overflow-hidden">
              <div className="h-2 rounded-full bg-[#E36F21]" style={{ width: '50%' }} />
            </div>
            <span className="text-sm font-semibold text-[#E36F21]">50%</span>
          </div>
          <p className="text-xs text-[#6B7A90]">3 van 6 checkpoints afgerond</p>
          <button
            className="mt-4 text-sm text-[#E36F21] hover:underline"
            onClick={() => nav('/projects/kapp/readiness')}>
            Bekijk readiness gate →
          </button>
        </div>
      </div>

      <h3 className="font-semibold text-[#0E1B2A] mb-3">Traceabilityoverzicht</h3>
      <TraceabilityPanel links={mockProject.traceability} />
    </Screen>
  )
}

