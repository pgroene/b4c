import React from 'react'
/**
 * Projectoverzicht — Portfolio van specificatieprojecten tonen.
 *
 * @requirement B4C-SCR-004
 * @wave Wave01
 * @persona Consultant, Founder
 */
import { Screen, PageHero } from '../ScreenLayout'
import { InfoCard, CardGrid } from '../ScreenLayout'

/**
 * SCR004_ProjectOverview component.
 *
 * @requirement B4C-SCR-004
 * @wave Wave01
 */
export function SCR004_ProjectOverview(): React.JSX.Element {
  return (
    <Screen code="B4C-SCR-004" title="Projectoverzicht">
      <PageHero label="PROJECTOVERZICHT" title="Projectoverzicht" subtitle="Portfolio van specificatieprojecten tonen." />
      <CardGrid>
        <InfoCard title="Projectoverzicht" body="Werk dit scherm verder uit conform ROAD-003." />
      </CardGrid>
    </Screen>
  )
}

