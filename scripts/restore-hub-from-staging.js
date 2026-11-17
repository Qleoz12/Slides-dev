/** Copy slides/dist/* → dist/ (staging builds that still look correct). */
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { copyDeckToHub } from './lib/paths.js'

const projectRoot = process.cwd()
const stagingRoot = path.join(projectRoot, 'slides', 'dist')
if (!fs.existsSync(stagingRoot)) {
  console.error('No slides/dist — run a build first.')
  process.exit(1)
}

const decks = fs
  .readdirSync(stagingRoot, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith('.') && d.name !== 'assets')
  .filter((d) => fs.existsSync(path.join(stagingRoot, d.name, 'index.html')))
  .map((d) => d.name)

for (const name of decks) {
  copyDeckToHub(projectRoot, name)
  console.log(`✅ restored dist/${name}`)
}

execSync('node scripts/create-index.js', { stdio: 'inherit', cwd: projectRoot })
console.log(`✅ Hub restored (${decks.length} decks)`)