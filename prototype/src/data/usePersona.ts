/**
 * usePersona — Returns and manages the active demo persona.
 *
 * @requirement B4C-SCR-001 B4C-SCR-002 B4C-SCR-003 B4C-SCR-004 B4C-SCR-005
 * @requirement B4C-SCR-012 B4C-SCR-013 B4C-SCR-016
 */
import { useState } from 'react'
import type { Persona } from '../data/types'

export function usePersona() {
  const [persona, setPersona] = useState<Persona>('Consultant')
  return { persona, setPersona }
}
