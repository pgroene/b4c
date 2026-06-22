import React from 'react'
/**
 * PMO & readiness dashboard — voortgang, blokkades en validatiegereedheid tonen.
 *
 * @requirement B4C-SCR-016
 * @wave Wave01
 * @persona Founder, ProductOwner, Investor
 */
import { useNavigate } from 'react-router-dom'
import { Screen, PageHero, InfoCard, CardGrid, PersonaBanner } from '../ScreenLayout'
import { ReadinessScoreCard } from '../components/ReadinessScoreCard'
import { StatusBadge } from '../components/StatusBadge'
import { mockProject } from '../data/mockData'
import { useLang } from '../contexts/LanguageContext'

/**
 * SCR016_Readiness component.
 *
 * @requirement B4C-SCR-016
 * @wave Wave01
 */
export function SCR016_Readiness(): React.JSX.Element {
  const nav = useNavigate()
  const { t } = useLang()
  const r = t.readiness
  const blockers = mockProject.questions.filter(q => q.status === 'blocked').length
  return (
    <Screen code="B4C-SCR-016" title={r.title}>
      <PageHero label={r.label} title={r.title} subtitle={r.subtitle} />
      <PersonaBanner highlights={r.highlights} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <ReadinessScoreCard
          score={mockProject.readiness}
          blockers={blockers}
          nextAction={r.gate.go}
          gate="ADJUST"
        />
        <div className="bg-white rounded-[18px] border border-[#DDE5EE] p-5 flex flex-col gap-3">
          <h3 className="font-semibold text-[#0E1B2A]">{r.gate.heading}</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <StatusBadge status="ready" label="GO" />
              <span className="text-[13px] text-[#0E1B2A]">{r.gate.go}</span>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status="proposed" label="ADJUST" />
              <span className="text-[13px] text-[#0E1B2A]">{r.gate.adjust}</span>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status="blocked" label="BLOCK" />
              <span className="text-[13px] text-[#0E1B2A]">{r.gate.block}</span>
            </div>
          </div>
        </div>
      </div>
      <CardGrid>
        <InfoCard title={r.gate.scope.title} body={r.gate.scope.body} badge={<StatusBadge status="ready" label="GO" />} />
        <InfoCard title={r.gate.ai.title}    body={r.gate.ai.body}    badge={<StatusBadge status="proposed" label="ADJUST" />} />
        <InfoCard title={r.gate.build.title} body={r.gate.build.body} badge={<StatusBadge status="blocked" label="BLOCK" />} />
      </CardGrid>
      <div className="mt-4">
        <button onClick={() => nav('/projects/kapp/documents')} className="py-2 px-4 bg-[#E36F21] text-white rounded-lg text-sm font-medium hover:bg-[#E36F21]/90 transition-colors">
          {r.gate.cta}
        </button>
      </div>
    </Screen>
  )
}

