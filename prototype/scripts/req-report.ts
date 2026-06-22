import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * req-report.ts — Coverage matrix across all 20 B4C screens.
 *
 * Usage:
 *   npm run req:report               # full matrix
 *   npm run req:report -- --missing  # only screens with no files yet
 *
 * Reads .reqtrack/index.json — run req:index first if it may be stale.
 */

import fs from 'fs'
import path from 'path'

const INDEX_PATH = path.resolve(__dirname, '../../.reqtrack/index.json')
const SCREEN_REGISTER = path.resolve(__dirname, '../../docs/intake/v1.0/05_Prototype_Specificaties/screen_register_B4C_SCR_001_020.csv')

interface IndexEntry {
  file: string
  requirement: string
  screen: string | null
  wave: string | null
  member: string
}

interface Screen {
  code: string
  screen: string
  route: string
  wave: string
  persona: string
}

function parseCSV(content: string): Screen[] {
  const lines = content.trim().split('\n').slice(1) // skip header
  return lines.map(line => {
    const cols = line.split(',')
    return {
      code: cols[0]?.trim() ?? '',
      screen: cols[1]?.trim() ?? '',
      route: cols[2]?.trim() ?? '',
      wave: cols[3]?.trim() ?? '',
      persona: cols[4]?.trim() ?? '',
    }
  }).filter(s => s.code.startsWith('B4C-SCR-'))
}

function main() {
  const missingOnly = process.argv.includes('--missing')

  if (!fs.existsSync(INDEX_PATH)) {
    console.error('Index not found. Run: npm run req:index')
    process.exit(1)
  }

  const index = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf-8'))
  const entries: IndexEntry[] = index.entries || []

  // Load screen register
  let screens: Screen[] = []
  if (fs.existsSync(SCREEN_REGISTER)) {
    screens = parseCSV(fs.readFileSync(SCREEN_REGISTER, 'utf-8'))
  } else {
    // Fallback: all 20 screens
    for (let i = 1; i <= 20; i++) {
      const code = `B4C-SCR-${String(i).padStart(3, '0')}`
      screens.push({ code, screen: code, route: '', wave: i <= 16 ? 'Wave 01 - core' : 'Wave 02 - demo-plus', persona: '' })
    }
  }

  // Build coverage map: screen code → unique files
  const coverage = new Map<string, Set<string>>()
  for (const screen of screens) {
    coverage.set(screen.code, new Set())
  }
  for (const entry of entries) {
    if (entry.requirement === '*') continue // shell components cover everything
    if (entry.screen && coverage.has(entry.screen)) {
      coverage.get(entry.screen)!.add(entry.file)
    }
  }

  // Shell/global components count as +1 for all screens
  const shellCount = entries.filter(e => e.requirement === '*').length

  const col = (s: string, w: number) => s.padEnd(w).substring(0, w)
  const header = missingOnly ? 'B4C Requirement Coverage Report — MISSING ONLY' : 'B4C Requirement Coverage Report'
  console.log(`\n${header}`)
  console.log('═'.repeat(72))
  console.log(col('Screen', 14) + col('Wave', 20) + col('Direct files', 14) + col('Shell+', 8) + 'Status')
  console.log('─'.repeat(72))

  let covered = 0
  let missing = 0

  for (const screen of screens) {
    const files = coverage.get(screen.code) ?? new Set()
    const isCovered = files.size > 0
    if (isCovered) covered++; else missing++

    if (missingOnly && isCovered) continue

    const status = isCovered ? '✅ covered' : '❌ missing'
    const wave = screen.wave.replace('Wave 01 - core', 'Wave01').replace('Wave 02 - demo-plus', 'Wave02')
    console.log(
      col(screen.code, 14) +
      col(wave, 20) +
      col(String(files.size), 14) +
      col(String(shellCount), 8) +
      status
    )

    if (!missingOnly && isCovered) {
      for (const f of files) {
        console.log('  ' + f)
      }
    }
  }

  console.log('─'.repeat(72))
  console.log(`Total: ${screens.length} screens | ${covered} covered | ${missing} missing | ${shellCount} shell component(s)`)

  if (index.generated) {
    console.log(`Index generated: ${index.generated}`)
  }
  console.log()
}

main()



