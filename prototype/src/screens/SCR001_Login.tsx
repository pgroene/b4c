import React, { useState } from 'react'
/**
 * Login screen — inloggen, demo-rol kiezen, SaaS-gevoel tonen.
 *
 * @requirement B4C-SCR-001
 * @wave Wave01
 * @persona Consultant, Founder, Investor
 */
import { useNavigate } from 'react-router-dom'
import { usePersonaCtx } from '../contexts/PersonaContext'
import type { Persona } from '../data/types'

const ROLES: { persona: Persona; label: string; desc: string; badge: string; color: string }[] = [
  {
    persona: 'Consultant',
    label: 'Consultant',
    desc: 'Voert intake uit en bouwt specificatieobjecten op.',
    badge: 'Primary persona',
    color: '#E36F21',
  },
  {
    persona: 'Founder',
    label: 'Founder',
    desc: 'Ziet SaaS-propositie, schaalbaarheid en bewijswaarde.',
    badge: 'Demo view',
    color: '#3B82F6',
  },
  {
    persona: 'Investor',
    label: 'Investor',
    desc: 'Ziet traceability, readiness en controlled AI.',
    badge: 'Evidence',
    color: '#10B981',
  },
]

/**
 * SCR001_Login component.
 *
 * @requirement B4C-SCR-001
 * @wave Wave01
 * @persona Consultant, Founder, Investor
 */
export function SCR001_Login(): React.JSX.Element {
  const nav = useNavigate()
  const { persona: savedPersona, setPersona } = usePersonaCtx()
  const [selected, setSelected] = useState<Persona>(savedPersona)

  function startDemo() {
    setPersona(selected)
    nav('/workspaces')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8" style={{ background: '#0A1F35' }}>
      <div className="w-full max-w-lg">
        <img src="/assets/b4code-logo.jpeg" alt="B4Code" className="h-10 mb-6 object-contain object-left" />
        <div className="text-[11px] font-mono text-[#E36F21] uppercase tracking-widest mb-2">AI-FIRST SPECIFICATION FACTORY</div>
        <h1 className="text-4xl font-bold text-white mb-3">Specify before you build.</h1>
        <p className="text-[#6B7A90] mb-8">Kies een demo-rol om de Kerkleden-app case te bekijken vanuit jouw perspectief.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {ROLES.map(({ persona, label, desc, badge, color }) => {
            const isSelected = selected === persona
            return (
              <button
                key={persona}
                onClick={() => setSelected(persona)}
                className="text-left rounded-[18px] p-4 flex flex-col gap-2 transition-all cursor-pointer"
                style={{
                  background: isSelected ? '#1A3A5C' : '#112B4C',
                  border: `2px solid ${isSelected ? color : 'rgba(255,255,255,0.10)'}`,
                  boxShadow: isSelected ? `0 0 0 1px ${color}33` : 'none',
                  outline: 'none',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white text-sm">{label}</span>
                  {isSelected && (
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ background: color }}
                    >✓</span>
                  )}
                </div>
                <p className="text-[#6B7A90] text-xs">{desc}</p>
                <span
                  className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded self-start"
                  style={{
                    color: isSelected ? color : '#6B7A90',
                    border: `1px solid ${isSelected ? color : 'rgba(255,255,255,0.15)'}`,
                    background: isSelected ? `${color}18` : 'transparent',
                  }}
                >
                  {badge}
                </span>
              </button>
            )
          })}
        </div>

        <button
          onClick={startDemo}
          className="w-full py-3 text-white font-semibold rounded-xl text-sm transition-opacity"
          style={{ background: '#E36F21' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Start demo als {ROLES.find(r => r.persona === selected)?.label} →
        </button>
      </div>
    </div>
  )
}


