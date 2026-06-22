import React from 'react'
/**
 * TraceabilityPanel — shows the proof chain from source to output.
 *
 * @requirement B4C-SCR-012 B4C-SCR-020
 */
import type { TraceabilityLink } from '../data/types'

interface TraceabilityPanelProps {
  links: TraceabilityLink[]
}

/**
 * TraceabilityPanel component.
 *
 * @requirement B4C-SCR-012 B4C-SCR-020
 */
export function TraceabilityPanel({ links }: TraceabilityPanelProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-3">
      {links.map(link => (
        <div key={link.requirementId} className="bg-white rounded-[18px] border border-[#DDE5EE] p-4">
          <div className="flex items-center flex-wrap gap-2 text-sm">
            <Node label={link.sourceId} color="orange" />
            <Arrow />
            <Node label={link.requirementId} color="blue" />
            <Arrow />
            <Node label={link.useCaseId} color="blue" />
            <Arrow />
            <Node label={`LFV: ${link.lfvSection}`} color="green" />
          </div>
        </div>
      ))}
    </div>
  )
}

function Node({ label, color }: { label: string; color: 'orange' | 'blue' | 'green' }): React.JSX.Element {
  const colors = {
    orange: 'bg-[#E36F21]/15 text-[#E36F21] border border-[#E36F21]/30',
    blue:   'bg-[#112B4C]/10 text-[#0A1F35] border border-[#0A1F35]/20',
    green:  'bg-[#2A9D8F]/15 text-[#2A9D8F] border border-[#2A9D8F]/30',
  }
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded text-[12px] font-medium ${colors[color]}`}>
      {label}
    </span>
  )
}

function Arrow(): React.JSX.Element {
  return <span className="text-[#6B7A90] font-bold">→</span>
}

