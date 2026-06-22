/**
 * B4Code design tokens — sourced from docs/intake/v1.0/05_Prototype_Specificaties/design_tokens.json
 *
 * These are the canonical values. Always use Tailwind classes derived from these
 * (e.g. bg-deep-navy, text-orange-control) — never raw hex in JSX.
 *
 * @requirement *
 * @scope tokens
 */
export const tokens = {
  colors: {
    deepNavy: '#0A1F35',
    navyPanel: '#112B4C',
    orangeControl: '#E36F21',
    redAlert: '#C63B32',
    cardBg: '#F7F9FC',
    white: '#FFFFFF',
    textDark: '#0E1B2A',
    muted: '#6B7A90',
    border: '#DDE5EE',
    success: '#2A9D8F',
  },
  layout: {
    sidebarWidth: '280px',
    topbarHeight: '72px',
    cardRadius: '18px',
    contentMaxWidth: '1440px',
  },
  typography: {
    fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
    h1: '32px',
    h2: '22px',
    body: '15px',
    small: '12px',
  },
  states: ['draft', 'proposed', 'validated', 'blocked', 'review', 'ready', 'mock'] as const,
} as const

export type TokenState = typeof tokens.states[number]
