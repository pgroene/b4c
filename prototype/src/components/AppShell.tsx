import React from 'react'
/**
 * AppShell — dark B4Code SaaS shell with sidebar, topbar, and light content canvas.
 * Wraps every screen in the prototype.
 *
 * @requirement *
 * @scope shell
 */
import { NavLink } from 'react-router-dom'
import { RoleSwitcher } from './RoleSwitcher'
import type { Persona } from '../data/types'

interface NavScreen {
  code: string
  label: string
  route: string
  wave: 'Wave01' | 'Wave02'
}

const NAV_SCREENS: NavScreen[] = [
  { code: 'SCR-001', label: 'Login & toegang',              route: '/login',                          wave: 'Wave01' },
  { code: 'SCR-002', label: 'Workspace',                    route: '/workspaces',                     wave: 'Wave01' },
  { code: 'SCR-003', label: 'Klantomgeving',                route: '/customers/ngk-beverwijk',        wave: 'Wave01' },
  { code: 'SCR-004', label: 'Projectoverzicht',             route: '/projects',                       wave: 'Wave01' },
  { code: 'SCR-005', label: 'Projectdashboard',             route: '/projects/kapp/dashboard',        wave: 'Wave01' },
  { code: 'SCR-006', label: 'Classificatie',                route: '/projects/kapp/classification',   wave: 'Wave01' },
  { code: 'SCR-007', label: 'Intake',                       route: '/projects/kapp/intake',           wave: 'Wave01' },
  { code: 'SCR-008', label: 'Waarheidsdossier',             route: '/projects/kapp/sources',          wave: 'Wave01' },
  { code: 'SCR-009', label: 'Open vragen',                  route: '/projects/kapp/questions',        wave: 'Wave01' },
  { code: 'SCR-010', label: 'Requirements',                 route: '/projects/kapp/requirements',     wave: 'Wave01' },
  { code: 'SCR-011', label: 'Use cases',                    route: '/projects/kapp/use-cases',        wave: 'Wave01' },
  { code: 'SCR-012', label: 'Traceability',                 route: '/projects/kapp/traceability',     wave: 'Wave01' },
  { code: 'SCR-013', label: 'LFV',                          route: '/projects/kapp/lfv',              wave: 'Wave01' },
  { code: 'SCR-014', label: 'Documenten',                   route: '/projects/kapp/documents',        wave: 'Wave01' },
  { code: 'SCR-015', label: 'Prototypebriefing',            route: '/projects/kapp/prototype-briefing', wave: 'Wave01' },
  { code: 'SCR-016', label: 'Readiness',                    route: '/projects/kapp/readiness',        wave: 'Wave01' },
  { code: 'SCR-017', label: 'Routeprofiel',                 route: '/projects/kapp/settings',         wave: 'Wave02' },
  { code: 'SCR-018', label: 'AI-agent run',                 route: '/projects/kapp/ai-run',           wave: 'Wave02' },
  { code: 'SCR-019', label: 'Knowledge Vault',              route: '/projects/kapp/knowledge-vault',  wave: 'Wave02' },
  { code: 'SCR-020', label: 'B4Ops Handover',               route: '/projects/kapp/handover',         wave: 'Wave02' },
]

interface AppShellProps {
  children: React.ReactNode
  persona: Persona
  onPersonaChange: (p: Persona) => void
  screenCode?: string
  screenTitle?: string
}

/**
 * AppShell — dark SaaS shell wrapping all screens.
 *
 * @requirement *
 * @scope shell
 */
export function AppShell({ children, persona, onPersonaChange, screenCode, screenTitle }: AppShellProps): React.JSX.Element {
  const wave01 = NAV_SCREENS.filter(s => s.wave === 'Wave01')
  const wave02 = NAV_SCREENS.filter(s => s.wave === 'Wave02')

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0A1F35' }}>
      {/* Sidebar */}
      <aside className="flex flex-col flex-shrink-0 overflow-y-auto" style={{ width: '280px', background: '#0A1F35', borderRight: '1px solid rgba(221,229,238,0.1)' }}>
        {/* Brand */}
        <div className="p-5 flex flex-col gap-1">
          <img src="/assets/b4code-logo.jpeg" alt="B4Code" className="h-8 w-auto object-contain object-left" />
          <span className="text-[#6B7A90] text-[11px] tracking-widest uppercase mt-1">Specify before you build</span>
        </div>

        {/* Nav Wave 01 */}
        <nav className="flex-1 px-3 pb-3">
          <div className="text-[#6B7A90] text-[10px] uppercase tracking-widest px-2 mb-2 mt-2">Wave 01 — Core</div>
          {wave01.map(s => (
            <NavLink
              key={s.route}
              to={s.route}
              className={({ isActive }) =>
                `flex items-center gap-2 px-2 py-1.5 rounded-lg mb-0.5 text-[13px] transition-colors ${
                  isActive
                    ? 'bg-[#E36F21]/20 text-white'
                    : 'text-[#6B7A90] hover:text-white hover:bg-[#112B4C]'
                }`
              }
            >
              <span className="text-[10px] font-mono opacity-50 w-12 flex-shrink-0">{s.code}</span>
              <span>{s.label}</span>
            </NavLink>
          ))}

          <div className="text-[#6B7A90] text-[10px] uppercase tracking-widest px-2 mb-2 mt-4">Wave 02 — Demo+</div>
          {wave02.map(s => (
            <NavLink
              key={s.route}
              to={s.route}
              className={({ isActive }) =>
                `flex items-center gap-2 px-2 py-1.5 rounded-lg mb-0.5 text-[13px] transition-colors ${
                  isActive
                    ? 'bg-[#E36F21]/20 text-white'
                    : 'text-[#6B7A90] hover:text-white hover:bg-[#112B4C]'
                }`
              }
            >
              <span className="text-[10px] font-mono opacity-50 w-12 flex-shrink-0">{s.code}</span>
              <span>{s.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 flex-shrink-0" style={{ height: '72px', background: '#112B4C', borderBottom: '1px solid rgba(221,229,238,0.1)' }}>
          <div>
            {screenCode && <span className="text-[#6B7A90] text-xs font-mono mr-2">{screenCode}</span>}
            {screenTitle && <span className="text-white text-sm font-medium">{screenTitle}</span>}
          </div>
          <RoleSwitcher persona={persona} onChange={onPersonaChange} />
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6" style={{ background: '#F7F9FC' }}>
          {children}
          <div className="mt-8 text-center text-[11px] text-[#6B7A90]">
            B4Code clickable demo — high-fidelity prototype · not production SaaS
          </div>
        </main>
      </div>
    </div>
  )
}

