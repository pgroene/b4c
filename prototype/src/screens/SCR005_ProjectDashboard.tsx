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

/**
 * SCR005_ProjectDashboard component.
 *
 * @requirement B4C-SCR-005
 * @wave Wave01
 */
export function SCR005_ProjectDashboard(): React.JSX.Element {
  const nav = useNavigate()
  const blockers = mockProject.questions.filter(q => q.status === 'blocked').length

  return (
    <Screen code="B4C-SCR-005" title="Projectdashboard">
      <PageHero
        label="PROJECTDASHBOARD"
        title={mockProject.name}
        subtitle="Centrale cockpit voor eerste bewijsroute: input → objecten → traceability → LFV → readiness."
      />
      <PersonaBanner highlights={{
        Consultant: ['Volg de workflow van intake naar readiness', 'Zie open vragen en blokkades'],
        Founder: ['SaaS-propositie: van chaos naar gestructureerde specificatie', 'Readiness score als verkoopargument'],
        ProductOwner: ['Use case status en scope volledigheid', 'Open vragen die scope raken'],
        Investor: ['Readiness gate: GO / ADJUST / BLOCK', 'Traceability completeness als bewijs'],
      }} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ReadinessScoreCard
          score={mockProject.readiness}
          blockers={blockers}
          nextAction="Verwerk klantinput en genereer traceability-light."
          gate="ADJUST"
        />
        <div className="bg-white rounded-[18px] border border-[#DDE5EE] p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[#6B7A90] text-sm">Open vragen</span>
            <StatusBadge status="blocked" />
          </div>
          <div className="text-4xl font-bold text-[#0E1B2A]">{mockProject.questions.length}</div>
          <p className="text-[13px] text-[#6B7A90]">{blockers} open validatiepunten gevonden.</p>
          <button onClick={() => nav('/projects/kapp/questions')} className="mt-auto text-[#E36F21] text-sm hover:underline text-left">Bekijk open vragen →</button>
        </div>
        <div className="bg-white rounded-[18px] border border-[#DDE5EE] p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[#6B7A90] text-sm">Next best action</span>
            <StatusBadge status="proposed" label="AI proposed" />
          </div>
          <p className="text-[14px] text-[#0E1B2A] font-medium">Verwerk klantinput en genereer traceability-light.</p>
          <button onClick={() => nav('/projects/kapp/intake')} className="mt-auto py-2 bg-[#E36F21] text-white rounded-lg text-sm font-medium hover:bg-[#E36F21]/90 transition-colors">
            Start intake →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Bronnen', count: mockProject.sources.length, route: '/projects/kapp/sources', status: 'validated' as const },
          { label: 'Requirements', count: mockProject.requirements.length, route: '/projects/kapp/requirements', status: 'proposed' as const },
          { label: 'Use cases', count: mockProject.useCases.length, route: '/projects/kapp/use-cases', status: 'proposed' as const },
          { label: 'Documenten', count: mockProject.documents.length, route: '/projects/kapp/documents', status: 'draft' as const },
        ].map(({ label, count, route, status }) => (
          <button key={label} onClick={() => nav(route)} className="bg-white rounded-[18px] border border-[#DDE5EE] p-4 flex flex-col gap-1 hover:border-[#E36F21]/40 transition-colors text-left">
            <span className="text-2xl font-bold text-[#0E1B2A]">{count}</span>
            <span className="text-[13px] text-[#6B7A90]">{label}</span>
            <StatusBadge status={status} />
          </button>
        ))}
      </div>
    </Screen>
  )
}

