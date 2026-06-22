import React from 'react'
/**
 * ReadinessScoreCard — shows readiness percentage, blocker count, and next best action.
 *
 * @requirement B4C-SCR-005 B4C-SCR-016
 */

interface ReadinessScoreCardProps {
  score: number        // 0-100
  blockers: number
  nextAction: string
  gate: 'GO' | 'ADJUST' | 'BLOCK'
}

const gateColors = {
  GO:     { bg: 'bg-[#2A9D8F]/15', text: 'text-[#2A9D8F]', border: 'border-[#2A9D8F]/30' },
  ADJUST: { bg: 'bg-[#E36F21]/15', text: 'text-[#E36F21]', border: 'border-[#E36F21]/30' },
  BLOCK:  { bg: 'bg-[#C63B32]/15', text: 'text-[#C63B32]', border: 'border-[#C63B32]/30' },
}

/**
 * ReadinessScoreCard component.
 *
 * @requirement B4C-SCR-005 B4C-SCR-016
 */
export function ReadinessScoreCard({ score, blockers, nextAction, gate }: ReadinessScoreCardProps): React.JSX.Element {
  const c = gateColors[gate]
  return (
    <div className="bg-white rounded-[18px] border border-[#DDE5EE] p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[#6B7A90] text-sm">Readiness</span>
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase border ${c.bg} ${c.text} ${c.border}`}>{gate}</span>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-4xl font-bold text-[#0E1B2A]">{score}%</span>
        {blockers > 0 && <span className="text-sm text-[#C63B32] mb-1">{blockers} blocker{blockers > 1 ? 's' : ''}</span>}
      </div>
      <div className="w-full bg-[#DDE5EE] rounded-full h-2">
        <div className="bg-[#E36F21] h-2 rounded-full transition-all" style={{ width: `${score}%` }} />
      </div>
      <p className="text-[13px] text-[#6B7A90]">Next: {nextAction}</p>
    </div>
  )
}

