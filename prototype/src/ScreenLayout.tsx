import React from 'react'
/**
 * ScreenLayout — context provider for persona state + AppShell wrapper.
 * Used by all screen components to avoid prop drilling.
 *
 * @requirement *
 * @scope shell
 */
import { createContext, useContext, useState } from 'react'
import { AppShell } from './components/AppShell'
import type { Persona } from './data/types'

interface PersonaContextValue {
  persona: Persona
  setPersona: (p: Persona) => void
}

const PersonaContext = createContext<PersonaContextValue>({
  persona: 'Consultant',
  setPersona: () => {},
})

export function usePersonaContext(): PersonaContextValue {
  return useContext(PersonaContext)
}

interface ScreenProps {
  code: string
  title: string
  children: React.ReactNode
}

/**
 * Screen — AppShell wrapper with persona context for individual screens.
 *
 * @requirement *
 * @scope shell
 */
export function Screen({ code, title, children }: ScreenProps): React.JSX.Element {
  const [persona, setPersona] = useState<Persona>('Consultant')
  return (
    <PersonaContext.Provider value={{ persona, setPersona }}>
      <AppShell persona={persona} onPersonaChange={setPersona} screenCode={code} screenTitle={title}>
        {children}
      </AppShell>
    </PersonaContext.Provider>
  )
}

/** Reusable page hero header */
export function PageHero({ label, title, subtitle }: { label: string; title: string; subtitle?: string }): React.JSX.Element {
  return (
    <div className="mb-6">
      <div className="text-[11px] font-mono text-[#E36F21] uppercase tracking-widest mb-1">{label}</div>
      <h1 className="text-2xl font-bold text-[#0E1B2A] mb-1">{title}</h1>
      {subtitle && <p className="text-[#6B7A90] text-sm">{subtitle}</p>}
    </div>
  )
}

/** Reusable card grid */
export function CardGrid({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>
}

/** Simple info card */
export function InfoCard({ title, body, badge }: { title: string; body: string; badge?: React.ReactNode }): React.JSX.Element {
  return (
    <div className="bg-white rounded-[18px] border border-[#DDE5EE] p-5 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[15px] font-semibold text-[#0E1B2A]">{title}</h3>
        {badge}
      </div>
      <p className="text-[13px] text-[#6B7A90]">{body}</p>
    </div>
  )
}

/** Data table */
export function DataTable({ headers, rows }: { headers: string[]; rows: (string | React.ReactNode)[][] }): React.JSX.Element {
  return (
    <div className="bg-white rounded-[18px] border border-[#DDE5EE] overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: '1px solid #DDE5EE' }}>
            {headers.map(h => (
              <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-[#6B7A90] uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid #DDE5EE' : undefined }}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-[#0E1B2A]">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Wave 02 placeholder banner */
export function DemoPlaceholderBanner({ message }: { message: string }): React.JSX.Element {
  return (
    <div className="mb-6 bg-[#E36F21]/10 border border-[#E36F21]/30 rounded-[12px] px-4 py-3 text-[13px] text-[#E36F21]">
      ⚡ {message}
    </div>
  )
}

/** Primary action button */
export function PrimaryButton({ label, to }: { label: string; to: string }): React.JSX.Element {
  return (
    <a href={to} className="inline-flex items-center px-4 py-2 bg-[#E36F21] text-white rounded-lg text-sm font-medium hover:bg-[#E36F21]/90 transition-colors no-underline">
      {label} →
    </a>
  )
}

