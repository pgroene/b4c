import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * req-diff.ts — Show requirements touched by current git changes.
 *
 * Usage:
 *   npm run req:diff                      # changes in working tree vs HEAD
 *   npm run req:diff -- --since main      # changes in current branch vs main
 *
 * Reads .reqtrack/index.json to look up which requirements each changed file implements.
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const INDEX_PATH = path.resolve(__dirname, '../../.reqtrack/index.json')
const REPO_ROOT = path.resolve(__dirname, '../..')

interface IndexEntry {
  file: string
  requirement: string
  member: string
  memberType: string
}

function getChangedFiles(since?: string): string[] {
  try {
    let cmd: string
    if (since) {
      cmd = `git --no-pager diff --name-only ${since}...HEAD`
    } else {
      // Uncommitted changes (staged + unstaged) and untracked files
      const staged = execSync('git --no-pager diff --cached --name-only', { cwd: REPO_ROOT }).toString()
      const unstaged = execSync('git --no-pager diff --name-only', { cwd: REPO_ROOT }).toString()
      return [...new Set([...staged.trim().split('\n'), ...unstaged.trim().split('\n')])].filter(Boolean)
    }
    return execSync(cmd, { cwd: REPO_ROOT }).toString().trim().split('\n').filter(Boolean)
  } catch {
    return []
  }
}

function main() {
  const sinceIdx = process.argv.indexOf('--since')
  const since = sinceIdx !== -1 ? process.argv[sinceIdx + 1] : undefined

  if (!fs.existsSync(INDEX_PATH)) {
    console.error('Index not found. Run: npm run req:index')
    process.exit(1)
  }

  const index = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf-8'))
  const entries: IndexEntry[] = index.entries || []

  const changedFiles = getChangedFiles(since)
  if (changedFiles.length === 0) {
    console.log('No changed files detected.')
    return
  }

  // Normalize paths for comparison (use forward slashes relative to repo root)
  const normalizedChanged = new Set(
    changedFiles.map(f => f.replace(/\\/g, '/'))
  )

  // Find all requirements touched by changed files
  const affectedReqs = new Set<string>()
  const affectedEntries: IndexEntry[] = []

  for (const entry of entries) {
    const entryFile = entry.file.replace(/\\/g, '/')
    if (normalizedChanged.has(entryFile)) {
      if (entry.requirement !== '*') {
        affectedReqs.add(entry.requirement)
      }
      affectedEntries.push(entry)
    }
  }

  console.log(`\nChanged files: ${changedFiles.length}${since ? ` (since ${since})` : ''}`)
  console.log(`Affected screens: ${affectedReqs.size > 0 ? [...affectedReqs].sort().join(', ') : 'none'}`)

  if (affectedEntries.length > 0) {
    console.log('\nDetail:')
    console.log('─'.repeat(72))
    const col = (s: string, w: number) => s.padEnd(w).substring(0, w)
    console.log(col('File', 48) + col('Symbol', 24) + 'Requirement')
    console.log('─'.repeat(72))
    for (const e of affectedEntries) {
      console.log(col(e.file, 48) + col(e.member, 24) + e.requirement)
    }
  }

  if (changedFiles.length > 0 && affectedEntries.length === 0) {
    console.log('\nNo @requirement-annotated files in the changed set.')
    console.log('If you added new files, run: npm run req:index first.')
  }

  console.log()
}

main()



