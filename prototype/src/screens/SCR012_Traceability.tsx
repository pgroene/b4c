import React from 'react'
/**
 * Traceability light view — bron-naar-output keten aantonen.
 *
 * @requirement B4C-SCR-012
 * @wave Wave01
 * @persona Founder, Investor, Consultant
 */
import { useNavigate } from 'react-router-dom'
import { Screen, PageHero, PersonaBanner } from '../ScreenLayout'
import { TraceabilityPanel } from '../components/TraceabilityPanel'
import { mockProject } from '../data/mockData'
import { useLang } from '../contexts/LanguageContext'

/**
 * SCR012_Traceability component.
 *
 * @requirement B4C-SCR-012
 * @wave Wave01
 */
export function SCR012_Traceability(): React.JSX.Element {
  const nav = useNavigate()
  const { t } = useLang()
  return (
    <Screen code="B4C-SCR-012" title={t.traceability.title}>
      <PageHero
        label={t.traceability.label}
        title={t.traceability.title}
        subtitle={t.traceability.subtitle}
      />
      <PersonaBanner highlights={t.traceability.highlights} />
      <TraceabilityPanel links={mockProject.traceability} />
      <div className="mt-4">
        <button onClick={() => nav('/projects/kapp/lfv')} className="py-2 px-4 bg-[#E36F21] text-white rounded-lg text-sm font-medium hover:bg-[#E36F21]/90 transition-colors">
          {t.common.openLfv}
        </button>
      </div>
    </Screen>
  )
}

