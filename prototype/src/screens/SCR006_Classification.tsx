import React from 'react'
/**
 * Projectstart & classificatie — Projecttype, route en scopebasis kiezen.
 *
 * @requirement B4C-SCR-006
 * @wave Wave01
 * @persona Consultant, Product owner
 */
import { Screen, PageHero } from '../ScreenLayout'
import { InfoCard, CardGrid } from '../ScreenLayout'

/**
 * SCR006_Classification component.
 *
 * @requirement B4C-SCR-006
 * @wave Wave01
 */
export function SCR006_Classification(): React.JSX.Element {
  return (
    <Screen code="B4C-SCR-006" title="Projectstart & classificatie">
      <PageHero label="CLASSIFICATIE" title="Projectstart & classificatie" subtitle="Projecttype, route en scopebasis kiezen." />
      <CardGrid>
        <InfoCard title="Projectstart & classificatie" body="Werk dit scherm verder uit conform ROAD-003." />
      </CardGrid>
    </Screen>
  )
}

