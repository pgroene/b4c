import React from 'react'
/**
 * Levend Functioneel Verhaal view — klantleesbaar verhaal als object-view tonen.
 *
 * @requirement B4C-SCR-013
 * @wave Wave01
 * @persona Founder, ProductOwner, Investor
 */
import { useNavigate } from 'react-router-dom'
import { Screen, PageHero, InfoCard, CardGrid } from '../ScreenLayout'
import { StatusBadge } from '../components/StatusBadge'
import { useLang } from '../contexts/LanguageContext'

/**
 * SCR013_LFV component.
 *
 * @requirement B4C-SCR-013
 * @wave Wave01
 */
export function SCR013_LFV(): React.JSX.Element {
  const nav = useNavigate()
  const { t } = useLang()
  const s = t.screens.scr013
  return (
    <Screen code="B4C-SCR-013" title={s.title}>
      <PageHero label={s.label} title={s.title} />
      <div className="bg-white rounded-[18px] border border-[#DDE5EE] p-6 mb-4">
        <p className="text-[15px] text-[#0E1B2A] leading-relaxed">
          De app ondersteunt een besloten digitale omgeving voor leden, met ledeninformatie, agenda, community,
          documenten, roosters en beheerprocessen. Open punten blijven zichtbaar totdat ze gevalideerd zijn.
        </p>
        <div className="flex gap-2 mt-3">
          <StatusBadge status="proposed" label={s.lfvVersion} />
          <StatusBadge status="review" label={s.openPoints} />
        </div>
      </div>
      <CardGrid>
        <InfoCard title={s.sourceTitle} body={s.sourceBody} badge={<StatusBadge status="validated" label={s.sourceLabel} />} />
        <InfoCard title={s.openTitle} body={s.openBody} badge={<StatusBadge status="review" />} />
        <InfoCard title={s.docTitle} body={s.docBody} badge={<StatusBadge status="proposed" label={s.docLabel} />} />
      </CardGrid>
      <div className="mt-4">
        <button onClick={() => nav('/projects/kapp/readiness')} className="py-2 px-4 bg-[#E36F21] text-white rounded-lg text-sm font-medium hover:bg-[#E36F21]/90 transition-colors">
          {s.readinessBtn}
        </button>
      </div>
    </Screen>
  )
}
