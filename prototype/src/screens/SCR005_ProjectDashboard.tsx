import React from 'react'
/**
 * Projectdashboard — centrale cockpit voor Kerkleden-app demo-case.
 *
 * @requirement B4C-SCR-005
 * @wave Wave01
 * @persona Consultant, Founder, ProductOwner, Investor
 */
import { useNavigate } from 'react-router-dom'
import { Screen, PageHero, PersonaBanner } from '../ScreenLayout'
import { ReadinessScoreCard } from '../components/ReadinessScoreCard'
import { StatusBadge } from '../components/StatusBadge'
import { mockProject } from '../data/mockData'
import { usePersonaCtx } from '../contexts/PersonaContext'
import { useLang } from '../contexts/LanguageContext'

function ConsultantPanel({ nav }: { nav: (r: string) => void }): React.JSX.Element {
  const steps = [
    { label: 'Intake sessie', route: '/projects/kapp/intake', done: true },
    { label: 'Waarheidsdossier', route: '/projects/kapp/sources', done: true },
    { label: 'Open vragen verwerken', route: '/projects/kapp/questions', done: false },
    { label: 'Requirements valideren', route: '/projects/kapp/requirements', done: false },
    { label: 'Use cases opstellen', route: '/projects/kapp/use-cases', done: false },
    { label: 'Traceability-light', route: '/projects/kapp/traceability', done: false },
    { label: 'LFV genereren', route: '/projects/kapp/lfv', done: false },
    { label: 'Readiness gate', route: '/projects/kapp/readiness', done: false },
  ]
  return (
    <div className="bg-white rounded-[18px] border border-[#DDE5EE] p-5">
      <h3 className="font-semibold text-[#0E1B2A] mb-4">🛠 Workflow voortgang</h3>
      <div className="flex flex-col gap-2">
        {steps.map((s, i) => (
          <button key={i} onClick={() => nav(s.route)}
            className="flex items-center gap-3 text-left hover:bg-[#F5F7FA] rounded-lg px-2 py-1.5 transition-colors">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${s.done ? 'bg-[#10B981] text-white' : 'bg-[#DDE5EE] text-[#6B7A90]'}`}>
              {s.done ? '✓' : (i + 1)}
            </span>
            <span className={`text-sm ${s.done ? 'line-through text-[#6B7A90]' : 'text-[#0E1B2A]'}`}>{s.label}</span>
            {!s.done && <span className="ml-auto text-[#E36F21] text-xs">→</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

function FounderPanel(): React.JSX.Element {
  const stats = [
    { label: 'Intake → Requirements', value: '2 uur', sub: 'vs. 2–3 dagen handmatig' },
    { label: 'Bronnen verwerkt', value: `${mockProject.sources.length}`, sub: 'interviews + docs + mails' },
    { label: 'Requirements gegenereerd', value: `${mockProject.requirements.length}`, sub: 'AI-first, human-validated' },
    { label: 'Traceability score', value: '87%', sub: 'volledig herleidbaar' },
  ]
  return (
    <div className="bg-white rounded-[18px] border border-[#3B82F6]/30 p-5">
      <h3 className="font-semibold text-[#0E1B2A] mb-1">🚀 Business case — Kerkleden-app</h3>
      <p className="text-xs text-[#6B7A90] mb-4">Van ruwe klantinput naar gedocumenteerde specificatie in één sessie.</p>
      <div className="grid grid-cols-2 gap-3">
        {stats.map(s => (
          <div key={s.label} className="bg-[#F0F7FF] rounded-xl p-3">
            <div className="text-2xl font-bold text-[#3B82F6]">{s.value}</div>
            <div className="text-xs font-medium text-[#0E1B2A] mt-0.5">{s.label}</div>
            <div className="text-[11px] text-[#6B7A90]">{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 bg-[#E36F21]/10 rounded-xl p-3 text-sm text-[#E36F21] font-medium">
        💡 Verkoopargument: klant ziet resultaat ná eerste sessie — nog vóór één regel code.
      </div>
    </div>
  )
}

function ProductOwnerPanel({ nav }: { nav: (r: string) => void }): React.JSX.Element {
  const items = [
    { label: 'Gebruikersregistratie', status: 'ready' as const, acs: 3 },
    { label: 'Ledenroosterweergave', status: 'proposed' as const, acs: 2 },
    { label: 'Beheer lidmaatschapsstatus', status: 'proposed' as const, acs: 4 },
    { label: 'Export ledenlijst', status: 'draft' as const, acs: 1 },
  ]
  return (
    <div className="bg-white rounded-[18px] border border-[#8B5CF6]/30 p-5">
      <h3 className="font-semibold text-[#0E1B2A] mb-4">📋 Scope overzicht — use cases</h3>
      <div className="flex flex-col gap-2">
        {items.map(it => (
          <button key={it.label} onClick={() => nav('/projects/kapp/use-cases')}
            className="flex items-center gap-3 text-left hover:bg-[#F5F7FA] rounded-lg px-2 py-1.5 transition-colors">
            <StatusBadge status={it.status} />
            <span className="text-sm text-[#0E1B2A] flex-1">{it.label}</span>
            <span className="text-[11px] text-[#6B7A90]">{it.acs} AC</span>
          </button>
        ))}
      </div>
      <p className="text-[11px] text-[#6B7A90] mt-3">{mockProject.useCases.length} use cases totaal · AC = acceptatiecriteria</p>
    </div>
  )
}

function InvestorPanel({ nav }: { nav: (r: string) => void }): React.JSX.Element {
  const checks = [
    { label: 'AI-run gelogd en traceerbaar', ok: true },
    { label: 'Elke requirement heeft een bron', ok: true },
    { label: 'Traceability matrix aanwezig', ok: true },
    { label: 'Open vragen geresolved', ok: false },
    { label: 'Readiness gate gepasseerd', ok: false },
    { label: 'LFV document gegenereerd', ok: true },
  ]
  const score = Math.round((checks.filter(c => c.ok).length / checks.length) * 100)
  return (
    <div className="bg-white rounded-[18px] border border-[#10B981]/30 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#0E1B2A]">📊 Governance checklist</h3>
        <div className="text-2xl font-bold text-[#10B981]">{score}%</div>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        {checks.map(c => (
          <div key={c.label} className="flex items-center gap-2 text-sm">
            <span className={c.ok ? 'text-[#10B981]' : 'text-[#E34F4F]'}>{c.ok ? '✓' : '✗'}</span>
            <span className={c.ok ? 'text-[#0E1B2A]' : 'text-[#6B7A90]'}>{c.label}</span>
          </div>
        ))}
      </div>
      <button onClick={() => nav('/projects/kapp/traceability')}
        className="text-[#10B981] text-sm hover:underline">
        Bekijk volledige traceability →
      </button>
    </div>
  )
}

/**
 * SCR005_ProjectDashboard component.
 *
 * @requirement B4C-SCR-005
 * @wave Wave01
 */
export function SCR005_ProjectDashboard(): React.JSX.Element {
  const nav = useNavigate()
  const { persona } = usePersonaCtx()
  const { t } = useLang()
  const d = t.dashboard
  const blockers = mockProject.questions.filter(q => q.status === 'blocked').length

  return (
    <Screen code="B4C-SCR-005" title={d.title}>
      <PageHero label={d.label} title={d.title} subtitle={d.subtitle} />
      <PersonaBanner highlights={t.requirements.highlights} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ReadinessScoreCard
          score={mockProject.readiness}
          blockers={blockers}
          nextAction={t.common.startIntake}
          gate="ADJUST"
        />
        <div className="bg-white rounded-[18px] border border-[#DDE5EE] p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[#6B7A90] text-sm">{t.common.openQuestions}</span>
            <StatusBadge status="blocked" />
          </div>
          <div className="text-4xl font-bold text-[#0E1B2A]">{mockProject.questions.length}</div>
          <p className="text-[13px] text-[#6B7A90]">{blockers} {t.common.blockers}.</p>
          <button onClick={() => nav('/projects/kapp/questions')} className="mt-auto text-[#E36F21] text-sm hover:underline text-left">{t.common.viewQuestions}</button>
        </div>
        <div className="bg-white rounded-[18px] border border-[#DDE5EE] p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[#6B7A90] text-sm">{t.common.nextBestAction}</span>
            <StatusBadge status="proposed" label={t.common.aiProposed} />
          </div>
          <p className="text-[14px] text-[#0E1B2A] font-medium">Verwerk klantinput en genereer traceability-light.</p>
          <button onClick={() => nav('/projects/kapp/intake')} className="mt-auto py-2 bg-[#E36F21] text-white rounded-lg text-sm font-medium hover:bg-[#E36F21]/90 transition-colors">
            Start intake →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: t.common.sources,      count: mockProject.sources.length,      route: '/projects/kapp/sources',      status: 'validated' as const },
          { label: t.common.requirements, count: mockProject.requirements.length,  route: '/projects/kapp/requirements', status: 'proposed' as const },
          { label: t.common.useCases,     count: mockProject.useCases.length,      route: '/projects/kapp/use-cases',    status: 'proposed' as const },
          { label: t.common.documents,    count: mockProject.documents.length,     route: '/projects/kapp/documents',    status: 'draft' as const },
        ].map(({ label, count, route, status }) => (
          <button key={label} onClick={() => nav(route)} className="bg-white rounded-[18px] border border-[#DDE5EE] p-4 flex flex-col gap-1 hover:border-[#E36F21]/40 transition-colors text-left">
            <span className="text-2xl font-bold text-[#0E1B2A]">{count}</span>
            <span className="text-[13px] text-[#6B7A90]">{label}</span>
            <StatusBadge status={status} />
          </button>
        ))}
      </div>

      {/* ── Persona-specific panel ── */}
      {persona === 'Consultant'    && <ConsultantPanel nav={nav} />}
      {persona === 'Founder'       && <FounderPanel />}
      {persona === 'ProductOwner'  && <ProductOwnerPanel nav={nav} />}
      {persona === 'Investor'      && <InvestorPanel nav={nav} />}
    </Screen>
  )
}

