import React from 'react'
/**
 * Routeprofiel & settings — Handmatige routeconfiguratie tonen. (Wave 02 — read-only)
 *
 * @requirement B4C-SCR-017
 * @wave Wave02
 * @persona Consultant, Product owner
 */
import { Screen, PageHero } from '../ScreenLayout'
import { InfoCard, CardGrid, DemoPlaceholderBanner } from '../ScreenLayout'

/**
 * SCR017_Settings component.
 *
 * @requirement B4C-SCR-017
 * @wave Wave02
 */
export function SCR017_Settings(): React.JSX.Element {
  return (
    <Screen code="B4C-SCR-017" title="Routeprofiel & settings">
      <DemoPlaceholderBanner message="Wave 02 — Routeprofiel & settings. Volledige implementatie post-demo." />
      <PageHero label="ROUTEPROFIEL" title="Routeprofiel & settings" subtitle="Handmatige routeconfiguratie tonen. (Wave 02 — read-only)" />
      <CardGrid>
        <InfoCard title="Routeprofiel & settings" body="Werk dit scherm verder uit conform ROAD-003." />
      </CardGrid>
    </Screen>
  )
}

