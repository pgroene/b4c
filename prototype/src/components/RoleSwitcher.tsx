import React from 'react'
/**
 * RoleSwitcher — Persona selector displayed in the topbar.
 * Allows switching between Consultant, Founder, Product Owner, and Investor views.
 *
 * @requirement B4C-SCR-001 B4C-SCR-002 B4C-SCR-003 B4C-SCR-004 B4C-SCR-005
 * @requirement B4C-SCR-006 B4C-SCR-007 B4C-SCR-008 B4C-SCR-009 B4C-SCR-010
 * @requirement B4C-SCR-011 B4C-SCR-012 B4C-SCR-013 B4C-SCR-014 B4C-SCR-015
 * @requirement B4C-SCR-016 B4C-SCR-017 B4C-SCR-018 B4C-SCR-019 B4C-SCR-020
 */
import type { Persona } from '../data/types'

interface RoleSwitcherProps {
  persona: Persona
  onChange: (p: Persona) => void
}

const PERSONAS: Persona[] = ['Consultant', 'Founder', 'ProductOwner', 'Investor']
const LABELS: Record<Persona, string> = {
  Consultant: 'Consultant',
  Founder: 'Founder',
  ProductOwner: 'Product owner',
  Investor: 'Investor',
}

/**
 * RoleSwitcher component.
 *
 * @requirement B4C-SCR-001 B4C-SCR-002 B4C-SCR-003 B4C-SCR-004 B4C-SCR-005
 * @requirement B4C-SCR-006 B4C-SCR-007 B4C-SCR-008 B4C-SCR-009 B4C-SCR-010
 * @requirement B4C-SCR-011 B4C-SCR-012 B4C-SCR-013 B4C-SCR-014 B4C-SCR-015
 * @requirement B4C-SCR-016 B4C-SCR-017 B4C-SCR-018 B4C-SCR-019 B4C-SCR-020
 */
export function RoleSwitcher({ persona, onChange }: RoleSwitcherProps): React.JSX.Element {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[#6B7A90] text-xs">Demo als</span>
      <select
        value={persona}
        onChange={e => onChange(e.target.value as Persona)}
        className="bg-[#112B4C] text-white text-sm border border-[#DDE5EE]/20 rounded px-2 py-1 cursor-pointer focus:outline-none focus:border-[#E36F21]"
      >
        {PERSONAS.map(p => (
          <option key={p} value={p}>{LABELS[p]}</option>
        ))}
      </select>
    </div>
  )
}

