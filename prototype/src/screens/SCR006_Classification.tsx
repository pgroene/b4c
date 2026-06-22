import React, { useState } from 'react'
/**
 * Projectstart & classificatie — Projecttype, route en scopebasis kiezen.
 *
 * @requirement B4C-SCR-006
 * @wave Wave01
 * @persona Consultant, ProductOwner
 */
import { useNavigate } from 'react-router-dom'
import { Screen, PageHero } from '../ScreenLayout'
import { StatusBadge } from '../components/StatusBadge'
import { useLang } from '../contexts/LanguageContext'

/**
 * SCR006_Classification component.
 *
 * @requirement B4C-SCR-006
 * @wave Wave01
 */
export function SCR006_Classification(): React.JSX.Element {
  const nav = useNavigate()
  const [selected, setSelected] = useState('mvp')
  const { t } = useLang()
  const s = t.screens.scr006

  return (
    <Screen code="B4C-SCR-006" title={s.title}>
      <PageHero label={s.label} title={s.title} subtitle={s.subtitle} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {s.routes.map(r => (
          <button key={r.id} onClick={() => setSelected(r.id)}
            className="text-left rounded-[18px] p-5 flex flex-col gap-2 transition-all border-2"
            style={{
              background: selected === r.id ? '#FFF7F2' : 'white',
              borderColor: selected === r.id ? '#E36F21' : '#DDE5EE',
            }}>
            <div className="text-2xl">{r.icon}</div>
            <div className="font-semibold text-[#0E1B2A] text-sm">{r.label}</div>
            <p className="text-[#6B7A90] text-xs">{r.desc}</p>
            {selected === r.id && <StatusBadge status="ready" label={s.selectedLabel} />}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[18px] border border-[#DDE5EE] p-5 mb-6">
        <h3 className="font-semibold text-[#0E1B2A] mb-3">{s.scopeHeading}</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {s.scopeFields.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span className="text-[#6B7A90] text-xs">{label}</span>
              <span className="text-[#0E1B2A] font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => nav('/projects/kapp/intake')}
        className="py-2.5 px-6 bg-[#E36F21] text-white rounded-xl text-sm font-semibold hover:bg-[#E36F21]/90 transition-colors">
        {s.startBtn}
      </button>
    </Screen>
  )
}
