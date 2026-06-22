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

/**
 * SCR016_Readiness component.
 *
 * @requirement B4C-SCR-016
 * @wave Wave01
 */
export function SCR016_Readiness(): React.JSX.Element {
  const nav = useNavigate()
  const blockers = mockProject.questions.filter(q => q.status === 'blocked').length
  return (
    <Screen code="B4C-SCR-016" title="PMO & readiness dashboard">
      <PageHero
        label="PMO & READINESS"
        title="Demo decision gate"
        subtitle="Advies: GO voor clickable demo review; NO-GO voor build-ready SaaS-product."
      />
      <PersonaBanner highlights={{
        Consultant: ['Check completeness voor demo-oplevering', 'Verwerk blokkades vóór de review'],
        Founder: ['Readiness = verkoopbaar bewijs naar klanten', 'GO = klaar voor demo-presentatie'],
        ProductOwner: ['Scope volledigheid en acceptatiecriteriastatus', 'Blokkades die delivery raken'],
        Investor: ['GO/ADJUST/BLOCK gate = gecontroleerde delivery', 'Score als bewijs voor methodische aanpak'],
      }} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <ReadinessScoreCard
          score={mockProject.readiness}
          blockers={blockers}
          nextAction="Review Wave 01 schermen met stakeholders."
          gate="ADJUST"
        />
        <div className="bg-white rounded-[18px] border border-[#DDE5EE] p-5 flex flex-col gap-3">
          <h3 className="font-semibold text-[#0E1B2A]">Demo decision gate advies</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <StatusBadge status="ready" label="GO" />
              <span className="text-[13px] text-[#0E1B2A]">Clickable demo review</span>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status="proposed" label="ADJUST" />
              <span className="text-[13px] text-[#0E1B2A]">Open vragen afronden voor Wave 02</span>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status="blocked" label="BLOCK" />
              <span className="text-[13px] text-[#0E1B2A]">Build-ready SaaS — niet claimen</span>
            </div>
          </div>
        </div>
      </div>
      <CardGrid>
        <InfoCard title="Scope" body="Wave 01 core compleet genoeg voor eerste review." badge={<StatusBadge status="ready" label="GO" />} />
        <InfoCard title="AI" body="AI-run light of mock toegestaan mits gelabeld." badge={<StatusBadge status="proposed" label="ADJUST" />} />
        <InfoCard title="Build-ready" body="Niet claimen; dit is prototypefase." badge={<StatusBadge status="blocked" label="BLOCK" />} />
      </CardGrid>
      <div className="mt-4">
        <button onClick={() => nav('/projects/kapp/documents')} className="py-2 px-4 bg-[#E36F21] text-white rounded-lg text-sm font-medium hover:bg-[#E36F21]/90 transition-colors">
          Bekijk documentgeneratie →
        </button>
      </div>
    </Screen>
  )
}

