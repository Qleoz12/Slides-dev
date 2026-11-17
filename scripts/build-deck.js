/**
 * Build one or more Slidev decks into dist/ (hub).
 *
 * Usage:
 *   node scripts/build-deck.js <deck> [deck2 ...]
 *   node scripts/build-deck.js --latest
 *   node scripts/build-deck.js --latest --with-ref
 *   node scripts/build-deck.js --target <deck> [--with-ref]
 */
import { execSync } from 'child_process'
import path from 'path'
import { deckMdPath, listDecksByMtime } from './lib/decks.js'

const projectRoot = process.cwd()
const argv = process.argv.slice(2)

function printHelp() {
  console.log(`
Build selected decks → dist/<name>/ (then index.html)

Examples:
  node scripts/build-deck.js one-currency-is-not-enough
  node scripts/build-deck.js --latest --with-ref
  node scripts/build-deck.js --target time-makes-small-actions-powerful --with-ref
  pnpm build:deck -- --latest --with-ref
`)
}

function resolveDeckNames() {
  if (argv.length === 0) {
    printHelp()
    process.exit(1)
  }

  const withRef = argv.includes('--with-ref')
  const latest = argv.includes('--latest')
  const targetIdx = argv.indexOf('--target')
  const target = targetIdx >= 0 ? argv[targetIdx + 1] : null

  if (targetIdx >= 0 && !target) {
    console.error('--target requires a deck name')
    process.exit(1)
  }

  const positional = argv.filter(
    (a) =>
      !a.startsWith('--') &&
      (targetIdx < 0 || argv.indexOf(a) !== targetIdx + 1),
  )

  if (positional.length > 0) {
    for (const name of positional) deckMdPath(projectRoot, name)
    return [...new Set(positional)]
  }

  const byMtime = listDecksByMtime(projectRoot)
  if (byMtime.length === 0) {
    console.error('No decks in slides/')
    process.exit(1)
  }

  if (latest || target) {
    const primary = target ?? byMtime[0].name
    deckMdPath(projectRoot, primary)
    const names = [primary]
    if (withRef) {
      const ref = byMtime.find((d) => d.name !== primary)
      if (ref) names.push(ref.name)
      else console.warn('⚠ Only one deck — nothing to use as --with-ref')
    }
    return names
  }

  printHelp()
  process.exit(1)
}

const deckNames = resolveDeckNames()

for (const name of deckNames) {
  const rel = path.relative(projectRoot, deckMdPath(projectRoot, name)).replace(/\\/g, '/')
  execSync(`node scripts/build-one-local.js ${rel}`, {
    stdio: 'inherit',
    cwd: projectRoot,
    env: { ...process.env, BUILD_SKIP_INDEX: '1' },
  })
}

execSync('node scripts/create-index.js', { stdio: 'inherit', cwd: projectRoot })
console.log(`✅ Built ${deckNames.length} deck(s): ${deckNames.join(', ')}`)