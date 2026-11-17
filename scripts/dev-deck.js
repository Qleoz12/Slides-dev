/**
 * Slidev dev server for one deck (port ~3030). Does NOT open the browser.
 * Prefer pnpm hub in another terminal for the deck list (:4000).
 */
import { execSync } from 'child_process'
import { deckMdPath, listDecksByMtime } from './lib/decks.js'

const projectRoot = process.cwd()
const argv = process.argv.slice(2)

function resolveName() {
  if (argv.includes('--latest')) {
    const decks = listDecksByMtime(projectRoot)
    if (!decks.length) {
      console.error('No decks in slides/')
      process.exit(1)
    }
    return decks[0].name
  }
  const positional = argv.filter((a) => !a.startsWith('--'))
  if (positional.length === 0) {
    console.error('Usage: pnpm dev:deck -- <deck-name>')
    console.error('       pnpm dev:deck -- --latest')
    process.exit(1)
  }
  return positional[0]
}

const name = resolveName()
deckMdPath(projectRoot, name)
const rel = `slides/${name}.md`

console.log('')
console.log('📚 Hub (pick any built deck):  http://127.0.0.1:4000/')
console.log(`✏️  Dev (edit this deck):       http://localhost:3030/`)
console.log(`    File: ${rel}`)
console.log('    If the side overview panel covers the slide: press Esc or O to close it.')
console.log('')

execSync(`pnpm exec slidev ${rel} --force`, {
  stdio: 'inherit',
  cwd: projectRoot,
})