import React from 'react'
/**
 * DocumentPreviewCard — shows a document type with preview excerpt and export status.
 *
 * @requirement B4C-SCR-014 B4C-SCR-020
 */
import { StatusBadge } from './StatusBadge'
import type { StatusState } from '../data/types'

interface DocumentPreviewCardProps {
  type: string
  status: StatusState
  excerpt?: string
}

/**
 * DocumentPreviewCard component.
 *
 * @requirement B4C-SCR-014 B4C-SCR-020
 */
export function DocumentPreviewCard({ type, status, excerpt }: DocumentPreviewCardProps): React.JSX.Element {
  return (
    <div className="bg-white rounded-[18px] border border-[#DDE5EE] p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <span className="text-[14px] font-medium text-[#0E1B2A] leading-snug">{type}</span>
        <StatusBadge status={status} />
      </div>
      {excerpt && <p className="text-[12px] text-[#6B7A90] line-clamp-2">{excerpt}</p>}
      <div className="flex items-center gap-2 mt-1">
        <span className="text-[11px] text-[#6B7A90]">Preview beschikbaar als gecontroleerde object-view</span>
      </div>
    </div>
  )
}

