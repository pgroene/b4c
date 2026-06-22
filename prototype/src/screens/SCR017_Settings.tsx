import React, { useState } from 'react'
/**
 * Routeprofiel & settings — handmatige routeconfiguratie.
 *
 * @requirement B4C-SCR-017
 * @wave Wave02
 * @persona Consultant, ProductOwner
 */
import { Screen, PageHero, DemoPlaceholderBanner } from '../ScreenLayout'
import { StatusBadge } from '../components/StatusBadge'
import { useLang } from '../contexts/LanguageContext'

/**
 * SCR017_Settings component.
 *
 * @requirement B4C-SCR-017
 * @wave Wave02
 */
export function SCR017_Settings(): React.JSX.Element {
  const [active, setActive] = useState('standard')
  const { t } = useLang()
  const s = t.screens.scr017
  return (
    <Screen code="B4C-SCR-017" title={s.title}>
      <DemoPlaceholderBanner message={s.wave02Banner} />
      <PageHero label={s.label} title={s.title} subtitle={s.subtitle} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {s.routes.map(r => (
          <button key={r.id} onClick={() => setActive(r.id)}
            className="text-left rounded-[18px] p-4 flex flex-col gap-2 transition-all border-2"
            style={{
              background: active === r.id ? '#FFF7F2' : 'white',
              borderColor: active === r.id ? '#E36F21' : '#DDE5EE',
            }}>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#0E1B2A] text-sm">{r.label}</span>
              {active === r.id && <StatusBadge status="ready" label={s.activeLabel} />}
            </div>
            <p className="text-[#6B7A90] text-xs">{r.desc}</p>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[18px] border border-[#DDE5EE] p-5">
        <h3 className="font-semibold text-[#0E1B2A] mb-3">{s.settingsHeading}</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {s.settingsFields.map(({ label, value }) => (
            <div key={label}>
              <span className="text-[#6B7A90] text-xs">{label}</span>
              <div className="text-[#0E1B2A] font-medium mt-0.5">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  )
}
