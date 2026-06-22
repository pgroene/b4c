import React from 'react'
/**
 * Projectoverzicht — portfolio van specificatieprojecten.
 *
 * @requirement B4C-SCR-004
 * @wave Wave01
 * @persona Consultant, Founder
 */
import { useNavigate } from 'react-router-dom'
import { Screen, PageHero } from '../ScreenLayout'
import { StatusBadge } from '../components/StatusBadge'

const PROJECTS = [
  { id: 'kapp', name: 'Kerkleden-app NGK Beverwijk', client: 'NGK Beverwijk', wave: 'Wave 01', readiness: 62, route: '/projects/kapp/dashboard', status: 'proposed' as const },
]

/**
 * SCR004_ProjectOverview component.
 *
 * @requirement B4C-SCR-004
 * @wave Wave01
 */
export function SCR004_ProjectOverview(): React.JSX.Element {
  const nav = useNavigate()
  return (
    <Screen code="B4C-SCR-004" title="Projectoverzicht">
      <PageHero
        label="PROJECTOVERZICHT"
        title="Specificatieprojecten"
        subtitle="Portfolio van actieve en afgeronde B4Code-trajecten."
      />
      <div className="flex flex-col gap-3">
        {PROJECTS.map(p => (
          <button
            key={p.id}
            onClick={() => nav(p.route)}
            className="bg-white rounded-[18px] border border-[#DDE5EE] p-5 text-left hover:border-[#E36F21]/40 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: '#112B4C' }}>
                {p.name[0]}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[#0E1B2A] text-sm">{p.name}</div>
                <div className="text-[#6B7A90] text-xs mt-0.5">{p.client} · {p.wave}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#0E1B2A]">{p.readiness}%</div>
                <div className="text-[11px] text-[#6B7A90]">readiness</div>
              </div>
              <StatusBadge status={p.status} label="actief" />
              <span className="text-[#E36F21] text-sm">→</span>
            </div>
          </button>
        ))}
      </div>
    </Screen>
  )
}

