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

/**
 * SCR002_Workspaces component.
 *
 * @requirement B4C-SCR-002
 * @wave Wave01
 */
export function SCR002_Workspaces(): React.JSX.Element {
  const nav = useNavigate()
  return (
    <Screen code="B4C-SCR-002" title="Workspace / tenant-keuze">
      <PageHero label="WORKSPACE" title="Kies demo-tenant" subtitle="Deze demo gebruikt geschoonde/fictieve Kerkleden-app data." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-[18px] border border-[#DDE5EE] p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-[#0E1B2A]">Kerkleden-app NGK Beverwijk</h3>
          </div>
          <p className="text-[13px] text-[#6B7A90]">Demo-tenant voor eerste clickable prototype.</p>
          <div className="flex gap-2 flex-wrap">
            <StatusBadge status="validated" label="sanitized data" />
            <StatusBadge status="proposed" label="Wave 01" />
          </div>
          <button onClick={() => nav('/projects/kapp/dashboard')} className="mt-2 py-2 bg-[#E36F21] text-white rounded-lg text-sm font-medium hover:bg-[#E36F21]/90 transition-colors">
            Open project →
          </button>
        </div>
        <InfoCard title="B4Code internal" body="Niet actief in deze demo." badge={<StatusBadge status="draft" label="placeholder" />} />
        <InfoCard title="Nieuwe klantomgeving" body="Bewust buiten prototype-scope." badge={<StatusBadge status="draft" label="later" />} />
      </div>
    </Screen>
  )
}

