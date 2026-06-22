import React from 'react'
/**
 * Klantomgeving overzicht — Klantomgeving en projecten zichtbaar maken.
 *
 * @requirement B4C-SCR-003
 * @wave Wave01
 * @persona Consultant, Product owner
 */
import { Screen, PageHero } from '../ScreenLayout'
import { InfoCard, CardGrid } from '../ScreenLayout'

/**
 * SCR003_CustomerOverview component.
 *
 * @requirement B4C-SCR-003
 * @wave Wave01
 */
export function SCR003_CustomerOverview(): React.JSX.Element {
  return (
    <Screen code="B4C-SCR-003" title="Klantomgeving overzicht">
      <PageHero label="KLANTOMGEVING" title="Klantomgeving overzicht" subtitle="Klantomgeving en projecten zichtbaar maken." />
      <CardGrid>
        <InfoCard title="Klantomgeving overzicht" body="Werk dit scherm verder uit conform ROAD-003." />
      </CardGrid>
    </Screen>
  )
}

