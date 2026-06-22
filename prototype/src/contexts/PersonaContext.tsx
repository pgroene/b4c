/**
 * PersonaContext — app-level persona state persisted in sessionStorage.
 *
 * Wrap the app with <PersonaProvider>. Any component can read/write the
 * active persona via usePersonaCtx().
 *
 * @requirement *
 * @scope shell
 */
import React, { createContext, useContext, useState } from 'react'
import type { Persona } from '../data/types'

const STORAGE_KEY = 'b4c_persona'

interface PersonaContextValue {
  persona: Persona
  setPersona: (p: Persona) => void
}

const PersonaContext = createContext<PersonaContextValue>({
  persona: 'Consultant',
  setPersona: () => {},
})

export function usePersonaCtx(): PersonaContextValue {
  return useContext(PersonaContext)
}

export function PersonaProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [persona, setPersonaState] = useState<Persona>(() => {
    return (sessionStorage.getItem(STORAGE_KEY) as Persona) ?? 'Consultant'
  })

  function setPersona(p: Persona) {
    sessionStorage.setItem(STORAGE_KEY, p)
    setPersonaState(p)
  }

  return (
    <PersonaContext.Provider value={{ persona, setPersona }}>
      {children}
    </PersonaContext.Provider>
  )
}
