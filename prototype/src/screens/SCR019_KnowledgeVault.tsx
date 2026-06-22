import React from 'react'
/**
 * Knowledge Vault preview — toekomstige kennislaag.
 *
 * @requirement B4C-SCR-019
 * @wave Wave02
 * @persona Founder, Investor
 */
import { Screen, PageHero, DemoPlaceholderBanner, CardGrid, InfoCard } from '../ScreenLayout'
import { StatusBadge } from '../components/StatusBadge'

const VAULT_ITEMS = [
  { title: 'NGK Beverwijk — Kerkleden-app intake', type: 'Intake sessie', date: 'jun 2025', status: 'validated' as const },
  { title: 'Roosterlogica — functionele verdieping', type: 'Verdiepingssessie', date: 'jun 2025', status: 'validated' as const },
  { title: 'Requirements — wave 01 finaal', type: 'Requirements set', date: 'jun 2025', status: 'proposed' as const },
  { title: 'LFV — Kerkleden-app v0.1', type: 'LFV document', date: 'jun 2025', status: 'draft' as const },
]

/**
 * SCR019_KnowledgeVault component.
 *
 * @requirement B4C-SCR-019
 * @wave Wave02
 */
export function SCR019_KnowledgeVault(): React.JSX.Element {
  return (
    <Screen code="B4C-SCR-019" title="Knowledge Vault preview">
      <DemoPlaceholderBanner message="Wave 02 — zoek- en filterfunctionaliteit beschikbaar na productierelease." />
      <PageHero
        label="KNOWLEDGE VAULT"
        title="Kennislaag — projectarchief"
        subtitle="Alle intake-sessies, requirements en documenten gecentraliseerd per klant."
      />

      <div className="flex flex-col gap-3 mb-6">
        {VAULT_ITEMS.map(item => (
          <div key={item.title} className="bg-white rounded-[18px] border border-[#DDE5EE] p-4 flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: '#112B4C' }}>
              {item.type[0]}
            </div>
            <div className="flex-1">
              <div className="font-medium text-[#0E1B2A] text-sm">{item.title}</div>
              <div className="text-[#6B7A90] text-xs mt-0.5">{item.type} · {item.date}</div>
            </div>
            <StatusBadge status={item.status} />
          </div>
        ))}
      </div>

      <CardGrid>
        <InfoCard title="🔍 Zoeken & filteren" body="Doorzoek alle projectartefacten op trefwoord, klant of type. Beschikbaar in Wave 02." />
        <InfoCard title="🔗 Hergebruik" body="Importeer bestaande requirements of use cases naar een nieuw project. Beschikbaar in Wave 02." />
        <InfoCard title="📊 Analyse" body="Patronen herkennen over projecten heen. AI-geassisteerde gap-analyse. Beschikbaar in Wave 02." />
      </CardGrid>
    </Screen>
  )
}

