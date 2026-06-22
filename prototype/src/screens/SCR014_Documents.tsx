import React from 'react'
/**
 * Documentgeneratie preview — documenttypes en exportlogica tonen.
 *
 * @requirement B4C-SCR-014
 * @wave Wave01
 * @persona Consultant, Founder
 */
import { useNavigate } from 'react-router-dom'
import { Screen, PageHero } from '../ScreenLayout'
import { DocumentPreviewCard } from '../components/DocumentPreviewCard'
import { mockProject } from '../data/mockData'
import { useLang } from '../contexts/LanguageContext'

/**
 * SCR014_Documents component.
 *
 * @requirement B4C-SCR-014
 * @wave Wave01
 */
export function SCR014_Documents(): React.JSX.Element {
  const nav = useNavigate()
  const { t } = useLang()
  const s = t.screens.scr014
  return (
    <Screen code="B4C-SCR-014" title={s.title}>
      <PageHero label={s.label} title={s.title} subtitle={s.subtitle} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockProject.documents.map(doc => (
          <DocumentPreviewCard key={doc.type} type={doc.type} status={doc.status} />
        ))}
      </div>
      <div className="mt-4">
        <button onClick={() => nav('/projects/kapp/handover')} className="py-2 px-4 bg-[#E36F21] text-white rounded-lg text-sm font-medium hover:bg-[#E36F21]/90 transition-colors">
          {s.exportBtn}
        </button>
      </div>
    </Screen>
  )
}
