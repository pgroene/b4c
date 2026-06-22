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
import { useLang } from '../contexts/LanguageContext'
import type { StatusState } from '../data/types'

/**
 * SCR019_KnowledgeVault component.
 *
 * @requirement B4C-SCR-019
 * @wave Wave02
 */
export function SCR019_KnowledgeVault(): React.JSX.Element {
  const { t } = useLang()
  const s = t.screens.scr019
  return (
    <Screen code="B4C-SCR-019" title={s.title}>
      <DemoPlaceholderBanner message={s.wave02Banner} />
      <PageHero label={s.label} title={s.title} subtitle={s.subtitle} />

      <div className="flex flex-col gap-3 mb-6">
        {s.vaultItems.map(item => (
          <div key={item.title} className="bg-white rounded-[18px] border border-[#DDE5EE] p-4 flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: '#112B4C' }}>
              {item.type[0]}
            </div>
            <div className="flex-1">
              <div className="font-medium text-[#0E1B2A] text-sm">{item.title}</div>
              <div className="text-[#6B7A90] text-xs mt-0.5">{item.type} · {item.date}</div>
            </div>
            <StatusBadge status={item.status as StatusState} />
          </div>
        ))}
      </div>

      <CardGrid>
        <InfoCard title={s.featureSearch.title} body={s.featureSearch.body} />
        <InfoCard title={s.featureReuse.title} body={s.featureReuse.body} />
        <InfoCard title={s.featureAnalysis.title} body={s.featureAnalysis.body} />
      </CardGrid>
    </Screen>
  )
}
