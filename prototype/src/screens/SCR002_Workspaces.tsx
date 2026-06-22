import React from 'react'
/**
 * Workspace / tenant-keuze — demo-tenant en stakeholdercontext selecteren.
 *
 * @requirement B4C-SCR-002
 * @wave Wave01
 * @persona Consultant, Founder
 */
import { useNavigate } from 'react-router-dom'
import { Screen, PageHero, InfoCard } from '../ScreenLayout'
import { StatusBadge } from '../components/StatusBadge'
import { useLang } from '../contexts/LanguageContext'

/**
 * SCR002_Workspaces component.
 *
 * @requirement B4C-SCR-002
 * @wave Wave01
 */
export function SCR002_Workspaces(): React.JSX.Element {
  const nav = useNavigate()
  const { t } = useLang()
  const s = t.screens.scr002
  return (
    <Screen code="B4C-SCR-002" title={s.title}>
      <PageHero label={s.label} title={s.title} subtitle={s.subtitle} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-[18px] border border-[#DDE5EE] p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-[#0E1B2A]">Kerkleden-app NGK Beverwijk</h3>
          </div>
          <p className="text-[13px] text-[#6B7A90]">{s.tenantDesc}</p>
          <div className="flex gap-2 flex-wrap">
            <StatusBadge status="validated" label="sanitized data" />
            <StatusBadge status="proposed" label="Wave 01" />
          </div>
          <button onClick={() => nav('/projects/kapp/dashboard')} className="mt-2 py-2 bg-[#E36F21] text-white rounded-lg text-sm font-medium hover:bg-[#E36F21]/90 transition-colors">
            {s.openBtn}
          </button>
        </div>
        <InfoCard title={s.internalTitle} body={s.internalDesc} badge={<StatusBadge status="draft" label={s.placeholderLabel} />} />
        <InfoCard title={s.newEnvTitle} body={s.newEnvDesc} badge={<StatusBadge status="draft" label={s.laterLabel} />} />
      </div>
    </Screen>
  )
}
