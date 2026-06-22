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
import { useLang } from '../contexts/LanguageContext'
import type { StatusState } from '../data/types'

const STEP_STATUSES: StatusState[] = ['validated', 'proposed', 'proposed', 'review']

/**
 * SCR018_AIRunPanel component.
 *
 * @requirement B4C-SCR-018
 * @wave Wave02
 */
export function SCR018_AIRunPanel(): React.JSX.Element {
  const { t } = useLang()
  const s = t.screens.scr018
  return (
    <Screen code="B4C-SCR-018" title={s.title}>
      <DemoPlaceholderBanner message={s.wave02Banner} />
      <PageHero label={s.label} title={s.title} subtitle={s.subtitle} />
      <div className="flex flex-col gap-4">
        <AIAgentRunPanel
          inputSummary={s.aiInputSummary}
          outputSummary={s.aiOutputSummary}
          status="mock"
        />
        <div className="bg-white rounded-[18px] border border-[#DDE5EE] p-5">
          <h3 className="font-semibold text-[#0E1B2A] mb-3">{s.timelineHeading}</h3>
          <div className="flex flex-col gap-2 text-[13px]">
            {s.steps.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#DDE5EE] text-[#6B7A90] text-[11px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <span className="flex-1 text-[#0E1B2A]">{step.label}</span>
                <StatusBadge status={STEP_STATUSES[i]} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  )
}
