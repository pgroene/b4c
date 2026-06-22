import React from 'react'
/**
 * Intake-invoer & broninput — klantinput invoeren als herleidbare bron.
 *
 * @requirement B4C-SCR-007
 * @wave Wave01
 * @persona Consultant
 */
import { useNavigate } from 'react-router-dom'
import { Screen, PageHero } from '../ScreenLayout'
import { AIAgentRunPanel } from '../components/AIAgentRunPanel'
import { StatusBadge } from '../components/StatusBadge'

/**
 * SCR007_Intake component.
 *
 * @requirement B4C-SCR-007
 * @wave Wave01
 */
export function SCR007_Intake(): React.JSX.Element {
  const nav = useNavigate()
  return (
    <Screen code="B4C-SCR-007" title="Intake-invoer & broninput">
      <PageHero label="INTAKE" title="Klantinput invoeren" subtitle="Klantinput invoeren als herleidbare bron." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-[18px] border border-[#DDE5EE] p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[#0E1B2A]">Intake-invoer</h3>
            <StatusBadge status="validated" label="SRC-001" />
          </div>
          <p className="text-[14px] text-[#0E1B2A] leading-relaxed">
            Besloten ledenapp voor kerkleden, met ledenprofielen, agenda, community, documenten, gebedspunten, roosters en beheeromgeving.
          </p>
          <p className="text-[12px] text-[#6B7A90]">Bron: Initiële klantvraag (SRC-001)</p>
          <div className="flex gap-2 pt-2">
            <button onClick={() => nav('/projects/kapp/questions')} className="flex-1 py-2 bg-[#E36F21] text-white rounded-lg text-sm font-medium hover:bg-[#E36F21]/90 transition-colors">
              Run AI light →
            </button>
            <button onClick={() => nav('/projects/kapp/sources')} className="flex-1 py-2 border border-[#DDE5EE] text-[#0E1B2A] rounded-lg text-sm hover:border-[#E36F21]/40 transition-colors">
              Waarheidsdossier
            </button>
          </div>
        </div>
        <AIAgentRunPanel
          inputSummary="Intake SRC-001: besloten ledenapp NGK Beverwijk"
          outputSummary="3 open vragen gedetecteerd, 3 requirements voorgesteld"
          status="mock"
        />
      </div>
    </Screen>
  )
}

