/**
 * Older builds wrote to slides/dist/ because Slidev resolves --out from slides/.
 * Copy missing deck folders into repo-root dist/.
 */
import fs from 'fs'
import path from 'path'

const projectRoot = process.cwd()
const distDir = path.join(projectRoot, 'dist')
const legacyDir = path.join(projectRoot, 'slides', 'dist')

if (!fs.existsSync(legacyDir)) process.exit(0)

mkdirMaybe(distDir)

let copied = 0
for (const ent of fs.readdirSync(legacyDir, { withFileTypes: true })) {
  if (!ent.isDirectory() || ent.name.startsWith('.') || ent.name === 'assets') continue
  const target = path.join(distDir, ent.name)
  const source = path.join(legacyDir, ent.name)
  if (!fs.existsSync(path.join(source, 'index.html'))) continue
  if (fs.existsSync(path.join(target, 'index.html'))) continue
  fs.cpSync(source, target, { recursive: true })
  copied++
  console.log(`📦 synced ${ent.name} slides/dist → dist/`)
}

if (copied) console.log(`✅ ${copied} deck(s) copied from slides/dist`)

function mkdirMaybe(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}