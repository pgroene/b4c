import React from 'react'
/**
 * Traceability light view — bron-naar-output keten aantonen.
 *
 * @requirement B4C-SCR-012
 * @wave Wave01
 * @persona Founder, Investor, Consultant
 */
import { useNavigate } from 'react-router-dom'
import { Screen, PageHero, PersonaBanner } from '../ScreenLayout'
import { TraceabilityPanel } from '../components/TraceabilityPanel'
import { mockProject } from '../data/mockData'

/**
 * SCR012_Traceability component.
 *
 * @requirement B4C-SCR-012
 * @wave Wave01
 */
export function SCR012_Traceability(): React.JSX.Element {
  const nav = useNavigate()
  return (
    <Screen code="B4C-SCR-012" title="Traceability light view">
      <PageHero
        label="TRACEABILITY LIGHT"
        title="Bron → Requirement → Use case → LFV"
        subtitle="Aantoonbare herleidbaarheid van klantinput tot output."
      />
      <PersonaBanner highlights={{
        Consultant: ['Volledige keten van klantinput naar deliverable', 'Gebruik als kwaliteitscheck'],
        Founder: ['Klantbewijs: elke beslissing is traceerbaar', 'Differentiator vs traditioneel requirements-traject'],
        ProductOwner: ['Scope impact: wat raakt wat?', 'Basis voor change management'],
        Investor: ['End-to-end audit trail', 'Geen black-box AI: alles herleidbaar en verklaarbaar'],
      }} />
      <TraceabilityPanel links={mockProject.traceability} />
      <div className="mt-4">
        <button onClick={() => nav('/projects/kapp/lfv')} className="py-2 px-4 bg-[#E36F21] text-white rounded-lg text-sm font-medium hover:bg-[#E36F21]/90 transition-colors">
          Open LFV →
        </button>
      </div>
    </Screen>
  )
}

