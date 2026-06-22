import React from 'react'
/**
 * ObjectCard — displays a requirement, use case, or source object
 * with ID, title, status badge, and optional trace links.
 *
 * @requirement B4C-SCR-008 B4C-SCR-009 B4C-SCR-010 B4C-SCR-011 B4C-SCR-012 B4C-SCR-013
 */
import { StatusBadge } from './StatusBadge'
import type { StatusState } from '../data/types'

interface ObjectCardProps {
  id: string
  title: string
  status: StatusState
  link?: string
  onClick?: () => void
}

/**
 * ObjectCard component.
 *
 * @requirement B4C-SCR-008 B4C-SCR-009 B4C-SCR-010 B4C-SCR-011 B4C-SCR-012 B4C-SCR-013
 */
export function ObjectCard({ id, title, status, link, onClick }: ObjectCardProps): React.JSX.Element {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-[18px] border border-[#DDE5EE] p-4 flex flex-col gap-2 ${onClick ? 'cursor-pointer hover:border-[#E36F21]/40 transition-colors' : ''}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono text-[#6B7A90]">{id}</span>
        <StatusBadge status={status} />
      </div>
      <p className="text-[14px] text-[#0E1B2A] font-medium leading-snug">{title}</p>
      {link && <p className="text-[12px] text-[#6B7A90]">→ {link}</p>}
    </div>
  )
}

