import fs from 'fs'
import path from 'path'

/**
 * Slidev resolves `--out` from `slides/`. Output under `slides/dist/` keeps Vite
 * inside the deck root; then we copy to repo `dist/` for the hub (see copyDeckToHub).
 */
export function slidevOutArg(deckName) {
  return `dist/${deckName}`
}

export function slidevStagingDir(projectRoot, deckName) {
  return path.join(projectRoot, 'slides', 'dist', deckName)
}

export function distDeckDir(projectRoot, deckName) {
  return path.join(projectRoot, 'dist', deckName)
}

export function slideInput(projectRoot, fileName) {
  return path.join(projectRoot, 'slides', fileName)
}

/** Publish staged build to repo-root dist/ (hub + live-server). */
export function copyDeckToHub(projectRoot, deckName) {
  const from = slidevStagingDir(projectRoot, deckName)
  const to = distDeckDir(projectRoot, deckName)
  if (!fs.existsSync(path.join(from, 'index.html'))) {
    throw new Error(`Staging build missing: ${from}`)
  }
  fs.rmSync(to, { recursive: true, force: true })
  fs.cpSync(from, to, { recursive: true })
}