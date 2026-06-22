import React from 'react'
/**
 * Use cases workspace — requirements koppelen aan gedrag.
 *
 * @requirement B4C-SCR-011
 * @wave Wave01
 * @persona Consultant, ProductOwner
 */
import { useNavigate } from 'react-router-dom'
import { Screen, PageHero, DataTable } from '../ScreenLayout'
import { mockProject } from '../data/mockData'

/**
 * SCR011_UseCases component.
 *
 * @requirement B4C-SCR-011
 * @wave Wave01
 */
export function SCR011_UseCases(): React.JSX.Element {
  const nav = useNavigate()
  return (
    <Screen code="B4C-SCR-011" title="Use cases workspace">
      <PageHero label="USE CASES" title="Gedrag gekoppeld aan requirements" subtitle="Requirements koppelen aan concreet gebruikersgedrag." />
      <DataTable
        headers={['ID', 'Use case', 'Requirement']}
        rows={mockProject.useCases.map(u => [
          <span className="font-mono text-[12px] text-[#6B7A90]">{u.id}</span>,
          u.title,
          <span className="font-mono text-[12px] text-[#6B7A90]">{u.requirementId}</span>,
        ])}
      />
      <div className="mt-4">
        <button onClick={() => nav('/projects/kapp/traceability')} className="py-2 px-4 bg-[#E36F21] text-white rounded-lg text-sm font-medium hover:bg-[#E36F21]/90 transition-colors">
          Toon traceability →
        </button>
      </div>
    </Screen>
  )
}

