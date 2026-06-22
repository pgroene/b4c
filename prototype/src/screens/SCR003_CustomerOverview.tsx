import React from 'react'
/**
 * Klantomgeving overzicht — klant context en projectenlijst.
 *
 * @requirement B4C-SCR-003
 * @wave Wave01
 * @persona Consultant, ProductOwner
 */
import { useNavigate } from 'react-router-dom'
import { Screen, PageHero } from '../ScreenLayout'
import { StatusBadge } from '../components/StatusBadge'
import { useLang } from '../contexts/LanguageContext'

/**
 * SCR003_CustomerOverview component.
 *
 * @requirement B4C-SCR-003
 * @wave Wave01
 */
export function SCR003_CustomerOverview(): React.JSX.Element {
  const nav = useNavigate()
  const { t } = useLang()
  const s = t.screens.scr003
  return (
    <Screen code="B4C-SCR-003" title={s.title}>
      <PageHero label={s.label} title={s.title} subtitle={s.subtitle} />
      <div className="bg-white rounded-[18px] border border-[#DDE5EE] p-5 mb-6 flex items-start gap-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style={{ background: '#E36F21' }}>N</div>
        <div className="flex-1">
          <h2 className="font-semibold text-[#0E1B2A] text-lg">NGK Beverwijk</h2>
          <p className="text-[#6B7A90] text-sm mt-0.5">Gemeente-kerk Nederland · Beverwijk · ~380 leden</p>
          <div className="flex gap-3 mt-3">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-[#DDE5EE] text-[#6B7A90]">1 actief project</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-[#DDE5EE] text-[#6B7A90]">Consultant: Piet Groen</span>
          </div>
        </div>
        <StatusBadge status="proposed" label={s.activeLabel} />
      </div>
      <h3 className="text-sm font-semibold text-[#0E1B2A] mb-3">{s.projectsHeading}</h3>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => nav('/projects/kapp/dashboard')}
          className="bg-white rounded-[18px] border border-[#DDE5EE] p-5 text-left hover:border-[#E36F21]/40 transition-colors flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: '#112B4C' }}>K</div>
          <div className="flex-1">
            <div className="font-semibold text-[#0E1B2A] text-sm">Kerkleden-app NGK Beverwijk</div>
            <div className="text-[#6B7A90] text-xs mt-0.5">{s.projectMeta}</div>
          </div>
          <StatusBadge status="proposed" label={s.inProgressLabel} />
          <span className="text-[#E36F21] text-sm ml-2">→</span>
        </button>
      </div>
    </Screen>
  )
}
