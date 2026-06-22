import React from 'react'
/**
 * Login screen — inloggen, demo-rol kiezen, SaaS-gevoel tonen.
 *
 * @requirement B4C-SCR-001
 * @wave Wave01
 * @persona Consultant, Founder, Investor
 */
import { useNavigate } from 'react-router-dom'
import { StatusBadge } from '../components/StatusBadge'

/**
 * SCR001_Login component.
 *
 * @requirement B4C-SCR-001
 * @wave Wave01
 * @persona Consultant, Founder, Investor
 */
export function SCR001_Login(): React.JSX.Element {
  const nav = useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8" style={{ background: '#0A1F35' }}>
      <div className="w-full max-w-lg">
        <img src="/assets/b4code-logo.jpeg" alt="B4Code" className="h-10 mb-6 object-contain object-left" />
        <div className="text-[11px] font-mono text-[#E36F21] uppercase tracking-widest mb-2">AI-FIRST SPECIFICATION FACTORY</div>
        <h1 className="text-4xl font-bold text-white mb-3">Specify before you build.</h1>
        <p className="text-[#6B7A90] mb-8">Clickable frontend demo — kies een demo-rol en start de Kerkleden-app case.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { role: 'Consultant', desc: 'Voert intake uit en bouwt specificatieobjecten op.', badge: 'primary persona' as const },
            { role: 'Founder', desc: 'Ziet SaaS-propositie, schaalbaarheid en bewijswaarde.', badge: 'demo view' as const },
            { role: 'Investor', desc: 'Ziet traceability, readiness en controlled AI.', badge: 'evidence' as const },
          ].map(({ role, desc, badge }) => (
            <div key={role} className="bg-[#112B4C] rounded-[18px] border border-white/10 p-4 flex flex-col gap-2">
              <div className="font-semibold text-white text-sm">{role}</div>
              <p className="text-[#6B7A90] text-xs">{desc}</p>
              <StatusBadge status="proposed" label={badge} />
            </div>
          ))}
        </div>

        <button
          onClick={() => nav('/workspaces')}
          className="w-full py-3 bg-[#E36F21] text-white font-semibold rounded-xl text-sm hover:bg-[#E36F21]/90 transition-colors"
        >
          Start demo →
        </button>
      </div>
    </div>
  )
}

