import React from 'react'
/**
 * AIAgentRunPanel — shows AI run state with labeled mock/proposed output.
 * All AI output must be labeled — never hidden truth (AC-003).
 *
 * @requirement B4C-SCR-018 B4C-SCR-007 B4C-SCR-009
 */
import { StatusBadge } from './StatusBadge'

interface AIAgentRunPanelProps {
  inputSummary: string
  outputSummary: string
  status: 'running' | 'done' | 'mock'
}

/**
 * AIAgentRunPanel component.
 *
 * @requirement B4C-SCR-018 B4C-SCR-007 B4C-SCR-009
 */
export function AIAgentRunPanel({ inputSummary, outputSummary, status }: AIAgentRunPanelProps): React.JSX.Element {
  return (
    <div className="bg-white rounded-[18px] border border-[#DDE5EE] p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-medium text-[#0E1B2A]">AI-agent run</span>
        <StatusBadge status="mock" label="mock — proposed by AI" />
      </div>
      <div className="flex flex-col gap-2 text-[13px]">
        <div className="flex gap-2">
          <span className="text-[#6B7A90] w-20 flex-shrink-0">Inputset</span>
          <span className="text-[#0E1B2A]">{inputSummary}</span>
        </div>
        <div className="border-l-2 border-[#E36F21]/30 pl-3 ml-10">
          <div className="flex gap-2">
            <span className="text-[#6B7A90] w-14 flex-shrink-0">Output</span>
            <span className="text-[#0E1B2A]">{outputSummary}</span>
          </div>
          <p className="text-[11px] text-[#6B7A90] mt-1">Human validation required before accepting</p>
        </div>
      </div>
      <div className="flex gap-2 mt-1">
        <StatusBadge status="proposed" label="proposed by AI" />
        <StatusBadge status={status === 'mock' ? 'mock' : 'review'} />
      </div>
    </div>
  )
}

