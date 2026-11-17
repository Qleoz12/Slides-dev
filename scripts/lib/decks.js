import fs from 'fs'
import path from 'path'

/** @typedef {{ name: string, file: string, mtimeMs: number }} DeckInfo */

const DECK_SKIP = ['.README.', '.QA.']

export function isDeckMarkdown(fileName) {
  if (!fileName.endsWith('.md')) return false
  return !DECK_SKIP.some((token) => fileName.includes(token))
}

/**
 * All presentation decks in slides/, newest first by mtime.
 * @param {string} projectRoot
 * @returns {DeckInfo[]}
 */
export function listDecksByMtime(projectRoot) {
  const slidesDir = path.join(projectRoot, 'slides')
  const entries = fs.readdirSync(slidesDir, { withFileTypes: true })
  const decks = []

  for (const ent of entries) {
    if (!ent.isFile() || !isDeckMarkdown(ent.name)) continue
    const file = path.join(slidesDir, ent.name)
    const stat = fs.statSync(file)
    decks.push({
      name: path.basename(ent.name, '.md'),
      file,
      mtimeMs: stat.mtimeMs,
    })
  }

  decks.sort((a, b) => b.mtimeMs - a.mtimeMs)
  return decks
}

export function deckMdPath(projectRoot, deckName) {
  const base = deckName.endsWith('.md') ? deckName : `${deckName}.md`
  const abs = path.join(projectRoot, 'slides', base)
  if (!fs.existsSync(abs)) {
    throw new Error(`Deck not found: slides/${base}`)
  }
  if (!isDeckMarkdown(base)) {
    throw new Error(`Not a presentation deck: slides/${base}`)
  }
  return abs
}

export function relSlidePath(projectRoot, deckName) {
  return path.relative(projectRoot, deckMdPath(projectRoot, deckName)).replace(/\\/g, '/')
}