import React from 'react'
/**
 * AI-agent run panel — AI-run light zichtbaar maken zonder black box.
 *
 * @requirement B4C-SCR-018
 * @wave Wave02
 * @persona Consultant, Founder
 */
import { Screen, PageHero, DemoPlaceholderBanner } from '../ScreenLayout'
import { AIAgentRunPanel } from '../components/AIAgentRunPanel'
import { StatusBadge } from '../components/StatusBadge'

/**
 * SCR018_AIRunPanel component.
 *
 * @requirement B4C-SCR-018
 * @wave Wave02
 */
export function SCR018_AIRunPanel(): React.JSX.Element {
  return (
    <Screen code="B4C-SCR-018" title="AI-agent run panel">
      <DemoPlaceholderBanner message="Wave 02 — AI-agent run panel. Mock run — geen echte AI-integratie in demo." />
      <PageHero
        label="AI AGENT RUN"
        title="AI-run light / mock"
        subtitle="AI-run light zichtbaar maken zonder black box. Altijd gelabeld als proposed of mock."
      />
      <div className="flex flex-col gap-4">
        <AIAgentRunPanel
          inputSummary="Intake SRC-001 + SRC-002 + SRC-003: Kerkleden-app NGK Beverwijk"
          outputSummary="3 open vragen gedetecteerd · 3 requirements voorgesteld · 3 use cases gegenereerd"
          status="mock"
        />
        <div className="bg-white rounded-[18px] border border-[#DDE5EE] p-5">
          <h3 className="font-semibold text-[#0E1B2A] mb-3">Run timeline</h3>
          <div className="flex flex-col gap-2 text-[13px]">
            {[
              { step: '1', label: 'Inputset ontvangen', status: 'validated' as const },
              { step: '2', label: 'Open vragen voorgesteld', status: 'proposed' as const },
              { step: '3', label: 'Requirements voorgesteld', status: 'proposed' as const },
              { step: '4', label: 'Menselijke review vereist', status: 'review' as const },
            ].map(({ step, label, status }) => (
              <div key={step} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#DDE5EE] text-[#6B7A90] text-[11px] font-bold flex items-center justify-center flex-shrink-0">{step}</span>
                <span className="flex-1 text-[#0E1B2A]">{label}</span>
                <StatusBadge status={status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  )
}

