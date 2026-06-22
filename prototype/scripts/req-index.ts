import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * req-index.ts — Scan @requirement JSDoc tags in prototype/src/ and write .reqtrack/index.json
 *
 * This is the TypeScript equivalent of the C# reqtrack tool from expert-waffle.
 * Run after adding, renaming, or moving any component:
 *   npm run req:index
 *
 * The index format is compatible with .reqtrack/index.json from the C# reqtrack tool.
 */

import fs from 'fs'
import path from 'path'

interface IndexEntry {
  file: string
  line: number
  class: string | null
  member: string
  memberType: 'Component' | 'Hook' | 'Data' | 'Utility' | 'Type'
  screen: string | null
  wave: string | null
  epic: string | null
  feature: string | null
  story: string | null
  requirement: string
  notes: string | null
}

interface RequirementIndex {
  generated: string
  scannedPath: string
  filesScanned: number
  entries: IndexEntry[]
}

const SRC_DIR = path.resolve(__dirname, '../src')
const INDEX_PATH = path.resolve(__dirname, '../../.reqtrack/index.json')

function walkDir(dir: string): string[] {
  const results: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...walkDir(full))
    } else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) {
      results.push(full)
    }
  }
  return results
}

/**
 * Infer the memberType from the file path / symbol name.
 */
function inferMemberType(file: string, symbol: string): IndexEntry['memberType'] {
  if (symbol.startsWith('use') && /^use[A-Z]/.test(symbol)) return 'Hook'
  if (file.includes('/data/') || file.includes('/tokens/')) return 'Data'
  if (/^[A-Z]/.test(symbol)) return 'Component'
  return 'Utility'
}

/**
 * Extract @tag value(s) from a JSDoc comment string.
 * Returns an array of space-separated values after the tag.
 */
function extractTag(jsdoc: string, tag: string): string[] {
  const regex = new RegExp(`@${tag}\\s+([^\\n@]+)`, 'g')
  const values: string[] = []
  let match: RegExpExecArray | null
  while ((match = regex.exec(jsdoc)) !== null) {
    values.push(...match[1].trim().split(/\s+/))
  }
  return values
}

function extractSingleTag(jsdoc: string, tag: string): string | null {
  const match = new RegExp(`@${tag}\\s+([^\\n@]+)`).exec(jsdoc)
  return match ? match[1].trim() : null
}

/**
 * Parse a TypeScript/TSX file and extract all @requirement-annotated exports.
 */
function parseFile(filePath: string): IndexEntry[] {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const entries: IndexEntry[] = []
  const relFile = path.relative(path.resolve(__dirname, '../..'), filePath).replace(/\\/g, '/')

  let i = 0
  while (i < lines.length) {
    const line = lines[i]

    // Look for start of JSDoc block
    if (line.trim().startsWith('/**')) {
      const jsdocStartLine = i + 1 // 1-based
      let jsdocLines = [line]

      // Collect JSDoc block
      while (i < lines.length && !lines[i].includes('*/')) {
        i++
        jsdocLines.push(lines[i] || '')
      }
      const jsdoc = jsdocLines.join('\n')

      // Only proceed if there's a @requirement tag
      const requirements = extractTag(jsdoc, 'requirement')
      if (requirements.length === 0) { i++; continue }

      const wave = extractSingleTag(jsdoc, 'wave')
      const persona = extractSingleTag(jsdoc, 'persona')
      const scope = extractSingleTag(jsdoc, 'scope')
      const status = extractSingleTag(jsdoc, 'status')
      const notes = [persona && `persona: ${persona}`, scope && `scope: ${scope}`, status && `status: ${status}`]
        .filter(Boolean).join(', ') || null

      // Find the exported symbol on the next non-blank, non-comment line
      let symbolLine = i + 1
      let symbol: string | null = null
      while (symbolLine < lines.length && symbolLine < i + 5) {
        const sl = lines[symbolLine].trim()
        // Match: export function/const/class Name, or export default function Name
        const fnMatch = sl.match(/^export\s+(?:default\s+)?(?:async\s+)?(?:function|const|class|let|var)\s+([A-Za-z_$][A-Za-z0-9_$]*)/)
        if (fnMatch) {
          symbol = fnMatch[1]
          break
        }
        // Match: export { Name } re-exports — skip
        symbolLine++
      }

      if (!symbol) { i++; continue }

      const memberType = inferMemberType(filePath, symbol)

      // One entry per requirement ID (screens can have multiple)
      for (const req of requirements) {
        entries.push({
          file: relFile,
          line: jsdocStartLine,
          class: null,
          member: symbol,
          memberType,
          screen: req === '*' ? '*' : (req.startsWith('B4C-SCR-') ? req : null),
          wave: wave,
          epic: null,
          feature: null,
          story: null,
          requirement: req,
          notes,
        })
      }
    }

    i++
  }

  return entries
}

function main() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`Source directory not found: ${SRC_DIR}`)
    process.exit(1)
  }

  const files = walkDir(SRC_DIR)
  const entries: IndexEntry[] = []

  for (const file of files) {
    entries.push(...parseFile(file))
  }

  const index: RequirementIndex = {
    generated: new Date().toISOString(),
    scannedPath: 'prototype/src',
    filesScanned: files.length,
    entries,
  }

  fs.mkdirSync(path.dirname(INDEX_PATH), { recursive: true })
  fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2), 'utf-8')

  console.log(`✅ req:index — scanned ${files.length} files, found ${entries.length} entries → .reqtrack/index.json`)
}

main()



