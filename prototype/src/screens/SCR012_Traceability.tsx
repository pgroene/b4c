import React, { useState } from 'react'
/**
 * Traceability matrix — rich domain-to-test chain overview.
 *
 * @requirement B4C-SCR-012
 * @wave Wave01
 * @persona Founder, Investor, Consultant
 */
import { useNavigate } from 'react-router-dom'
import { Screen, PersonaBanner } from '../ScreenLayout'
import { mockProject } from '../data/mockData'
import { useLang } from '../contexts/LanguageContext'
import type { TraceabilityRow, CoverageLabel } from '../data/types'

/**
 * SCR012_Traceability component — v1.1 rich traceability matrix.
 *
 * @requirement B4C-SCR-012
 * @wave Wave01
 */
export function SCR012_Traceability(): React.JSX.Element {
  const nav = useNavigate()
  const { t } = useLang()
  const tr = t.traceability
  const rows = mockProject.traceabilityMatrix
  const [selected, setSelected] = useState<TraceabilityRow>(rows[2]) // Pastoraat selected by default

  return (
    <Screen code="B4C-SCR-012" title={tr.title}>
      {/* ── Page header ── */}
      <div className="mb-4">
        <span className="text-xs font-bold tracking-widest text-[#E36F21] uppercase">{tr.label}</span>
        <h1 className="text-2xl font-bold text-[#0A1F35] mt-1">{tr.title}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{tr.subtitle}</p>
      </div>

      <PersonaBanner highlights={tr.highlights} />

      {/* ── KPI bar ── */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <KpiCard label={tr.kpi.coverage}  value="82%" color="text-green-600" />
        <KpiCard label={tr.kpi.gaps}      value="6"   color="text-orange-500" />
        <KpiCard label={tr.kpi.blockers}  value="2"   color="text-red-500" />
        <KpiCard label={tr.kpi.objects}   value="43"  color="text-[#0A1F35]" />
      </div>

      {/* ── Split layout ── */}
      <div className="flex gap-4" style={{ minHeight: '420px' }}>
        {/* Matrix table — 60% */}
        <div className="flex-[3] overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#0A1F35] text-white">
                {[
                  tr.table.domein, tr.table.proces, tr.table.useCase,
                  tr.table.dataObjecten, tr.table.autorisatie,
                  tr.table.schermen, tr.table.tests, tr.table.coverage,
                ].map(col => (
                  <th key={col} className="px-3 py-2.5 text-left font-semibold whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(row => {
                const isSelected = row.id === selected.id
                return (
                  <tr
                    key={row.id}
                    onClick={() => setSelected(row)}
                    className={`cursor-pointer border-b border-gray-100 transition-colors ${
                      isSelected
                        ? 'bg-orange-50 border-l-4 border-l-[#E36F21]'
                        : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                    }`}
                  >
                    <td className="px-3 py-2.5 font-semibold text-[#0A1F35]">{row.domein}</td>
                    <td className="px-3 py-2.5 text-gray-600">{row.proces}</td>
                    <td className="px-3 py-2.5">
                      <span className="font-mono text-[#E36F21]">{row.id}</span>
                      <span className="ml-1 text-gray-500">{row.useCase}</span>
                    </td>
                    <td className="px-3 py-2.5 text-gray-600">{row.dataObjecten}</td>
                    <td className="px-3 py-2.5 text-gray-600">{row.autorisatie}</td>
                    <td className="px-3 py-2.5 font-mono text-gray-500">{row.schermen}</td>
                    <td className="px-3 py-2.5 font-mono text-gray-500">{row.tests}</td>
                    <td className="px-3 py-2.5">
                      <CoverageBadge label={row.coverageLabel} pct={row.coveragePct} t={tr.coverageLabels} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Detail panel — 40% */}
        <div className="flex-[2] rounded-xl border border-gray-200 bg-white p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0A1F35]">{tr.detail.heading}</h2>
            <StatusBadge status={selected.status} />
          </div>

          {/* Chain visualization */}
          <div className="bg-[#0A1F35] rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-2">{tr.detail.chainLabel}</p>
            <div className="flex items-center gap-1 flex-wrap">
              {tr.detail.chain.map((node, i) => (
                <React.Fragment key={node}>
                  <span className="bg-[#E36F21] text-white text-xs px-2 py-1 rounded font-medium">{node}</span>
                  {i < tr.detail.chain.length - 1 && (
                    <span className="text-gray-400 text-xs">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex flex-wrap gap-1 mt-2 text-xs text-gray-300">
              <span>{selected.domein}</span><span className="text-gray-500">→</span>
              <span>{selected.proces}</span><span className="text-gray-500">→</span>
              <span className="font-mono text-[#E36F21]">{selected.id}</span><span className="text-gray-500">→</span>
              <span>{selected.schermen}</span><span className="text-gray-500">→</span>
              <span>{selected.tests}</span>
            </div>
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
            <MetaField label={tr.detail.status}      value={selected.status} />
            <MetaField label={tr.detail.privacy}     value={selected.privacygevoelig ? tr.detail.yes : tr.detail.no} />
            <MetaField label={tr.detail.buildImpact} value={selected.buildReadyImpact} />
            <MetaField label={tr.detail.eigenaar}    value={selected.eigenaar} />
            <MetaField label={tr.detail.update}      value={selected.laatsteUpdate} />
            <MetaField label={tr.detail.vervolgactie} value={selected.gekoppeldeVervolgactie} />
          </div>

          {/* Coverage progress */}
          <div className="mt-auto">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{tr.detail.coverageProgress}</span>
              <span>{selected.coveragePct}% — <CoverageBadge label={selected.coverageLabel} pct={selected.coveragePct} t={tr.coverageLabels} inline /></span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${coverageBarColor(selected.coverageLabel)}`}
                style={{ width: `${selected.coveragePct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Actions ── */}
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={() => nav('/projects/kapp/lfv')}
          className="py-2 px-4 bg-[#E36F21] text-white rounded-lg text-sm font-medium hover:bg-[#E36F21]/90 transition-colors"
        >
          {tr.openLfv}
        </button>
      </div>

      {/* ── Footer note ── */}
      <p className="mt-5 text-xs text-gray-400 border-t border-gray-100 pt-3">{tr.footer}</p>
    </Screen>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function KpiCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  )
}

function CoverageBadge({
  label, pct, t, inline = false,
}: {
  label: CoverageLabel
  pct: number
  t: { ok: string; aandacht: string; gap: string }
  inline?: boolean
}) {
  const cfg: Record<CoverageLabel, { bg: string; text: string; display: string }> = {
    ok:       { bg: 'bg-green-100',  text: 'text-green-700',  display: `${pct}% ${t.ok}` },
    aandacht: { bg: 'bg-orange-100', text: 'text-orange-700', display: t.aandacht },
    gap:      { bg: 'bg-red-100',    text: 'text-red-700',    display: t.gap },
  }
  const { bg, text, display } = cfg[label]
  if (inline) return <span className={`font-semibold ${text}`}>{display}</span>
  return <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${bg} ${text}`}>{display}</span>
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
      {status}
    </span>
  )
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-400 text-[10px] uppercase tracking-wide">{label}</p>
      <p className="text-gray-700 font-medium mt-0.5">{value}</p>
    </div>
  )
}

function coverageBarColor(label: CoverageLabel): string {
  if (label === 'ok') return 'bg-green-500'
  if (label === 'aandacht') return 'bg-orange-400'
  return 'bg-red-500'
}


