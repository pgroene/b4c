import React from 'react'
/**
 * StatusBadge — displays object state with color-coded label.
 * Every AI-generated or proposed result must show this badge (AC-003).
 *
 * @requirement *
 * @scope component
 */
import type { StatusState } from '../data/types'

interface StatusBadgeProps {
  status: StatusState
  label?: string
}

const statusClasses: Record<StatusState, string> = {
  validated: 'bg-[#2A9D8F]/15 text-[#2A9D8F] border border-[#2A9D8F]/30',
  ready:     'bg-[#2A9D8F]/15 text-[#2A9D8F] border border-[#2A9D8F]/30',
  proposed:  'bg-[#E36F21]/15 text-[#E36F21] border border-[#E36F21]/30',
  mock:      'bg-[#E36F21]/15 text-[#E36F21] border border-[#E36F21]/30',
  blocked:   'bg-[#C63B32]/15 text-[#C63B32] border border-[#C63B32]/30',
  draft:     'bg-[#6B7A90]/15 text-[#6B7A90] border border-[#6B7A90]/30',
  review:    'bg-[#6B7A90]/15 text-[#6B7A90] border border-[#6B7A90]/30',
}

/**
 * StatusBadge component.
 *
 * @requirement *
 * @scope component
 */
export function StatusBadge({ status, label }: StatusBadgeProps): React.JSX.Element {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium uppercase tracking-wide ${statusClasses[status]}`}>
      {label ?? status}
    </span>
  )
}

