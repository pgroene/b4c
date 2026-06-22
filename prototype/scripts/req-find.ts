import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * req-find.ts — Find all files implementing a given requirement ID.
 *
 * Usage:
 *   npm run req:find -- B4C-SCR-007
 *   npm run req:find -- REQ-001
 *
 * Reads .reqtrack/index.json — run req:index first if it may be stale.
 */

import fs from 'fs'
import path from 'path'

const INDEX_PATH = path.resolve(__dirname, '../../.reqtrack/index.json')

interface IndexEntry {
  file: string
  line: number
  class: string | null
  member: string
  memberType: string
  screen: string | null
  wave: string | null
  requirement: string
  notes: string | null
}

function main() {
  const target = process.argv[2]
  if (!target) {
    console.error('Usage: npm run req:find -- <requirement-id>')
    console.error('Example: npm run req:find -- B4C-SCR-007')
    process.exit(1)
  }

  if (!fs.existsSync(INDEX_PATH)) {
    console.error('Index not found. Run: npm run req:index')
    process.exit(1)
  }

  const index = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf-8'))
  const entries: IndexEntry[] = index.entries || []

  // Match exact requirement, screen code, or * (shell components)
  const matches = entries.filter(e =>
    e.requirement === target ||
    e.requirement === '*' ||
    (e.screen && e.screen === target)
  )

  // Shell/global components: show separately
  const shellEntries = matches.filter(e => e.requirement === '*')
  const directEntries = matches.filter(e => e.requirement !== '*')

  if (directEntries.length === 0 && shellEntries.length === 0) {
    console.log(`No entries found for requirement: ${target}`)
    console.log('Run npm run req:report -- --missing to see unimplemented screens.')
    return
  }

  console.log(`\nRequirement: ${target}`)
  console.log('─'.repeat(72))
  const col = (s: string, w: number) => s.padEnd(w).substring(0, w)
  console.log(col('File', 48) + col('Line', 6) + col('Symbol', 28) + 'Type')
  console.log('─'.repeat(72))

  for (const e of directEntries) {
    const notes = e.notes ? `  [${e.notes}]` : ''
    console.log(col(e.file, 48) + col(String(e.line), 6) + col(e.member, 28) + e.memberType + notes)
  }

  if (shellEntries.length > 0) {
    console.log('\n  Shell/global components (rendered on every screen):')
    for (const e of shellEntries) {
      const notes = e.notes ? `  [${e.notes}]` : ''
      console.log('  ' + col(e.file, 46) + col(String(e.line), 6) + col(e.member, 28) + e.memberType + notes)
    }
  }

  console.log()
}

main()



