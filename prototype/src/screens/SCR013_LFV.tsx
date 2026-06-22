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

/**
 * SCR013_LFV component.
 *
 * @requirement B4C-SCR-013
 * @wave Wave01
 */
export function SCR013_LFV(): React.JSX.Element {
  const nav = useNavigate()
  return (
    <Screen code="B4C-SCR-013" title="Levend Functioneel Verhaal">
      <PageHero label="LEVEND FUNCTIONEEL VERHAAL" title="Kerkleden-app NGK Beverwijk" />
      <div className="bg-white rounded-[18px] border border-[#DDE5EE] p-6 mb-4">
        <p className="text-[15px] text-[#0E1B2A] leading-relaxed">
          De app ondersteunt een besloten digitale omgeving voor leden, met ledeninformatie, agenda, community,
          documenten, roosters en beheerprocessen. Open punten blijven zichtbaar totdat ze gevalideerd zijn.
        </p>
        <div className="flex gap-2 mt-3">
          <StatusBadge status="proposed" label="LFV v0.1" />
          <StatusBadge status="review" label="open punten aanwezig" />
        </div>
      </div>
      <CardGrid>
        <InfoCard title="Bronstatus" body="Narratief is gekoppeld aan SRC-001, SRC-002 en SRC-003." badge={<StatusBadge status="validated" label="traceable" />} />
        <InfoCard title="Open punten" body="Bezoekverslagautorisatie en kalenderintegratie staan open." badge={<StatusBadge status="review" />} />
        <InfoCard title="Documentview" body="LFV is een view op objecten, niet de primaire waarheid." badge={<StatusBadge status="proposed" label="controlled" />} />
      </CardGrid>
      <div className="mt-4">
        <button onClick={() => nav('/projects/kapp/readiness')} className="py-2 px-4 bg-[#E36F21] text-white rounded-lg text-sm font-medium hover:bg-[#E36F21]/90 transition-colors">
          Toon readiness →
        </button>
      </div>
    </Screen>
  )
}

