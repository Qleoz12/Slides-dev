// scripts/build-all-local.js
import { readdirSync, mkdirSync } from 'fs'
import { execSync } from 'child_process'
import { join, basename, extname } from 'path'

const slidesDir = './slides'
const distDir = '../dist'

const files = readdirSync(slidesDir).filter(
  (f) =>
    extname(f) === '.md' &&
    !f.includes('.README') &&
    !f.includes('.QA'),
)

mkdirSync(distDir, { recursive: true })

for (const file of files) {
  const name = basename(file, '.md')
  const inputPath = join(slidesDir, file)
  const outputPath = join(distDir, name)

  console.log(`🔨 [LOCAL] Building ${file} -> ${outputPath}`)
  const base = `/${name}/`
  const strcommand = `slidev build ${inputPath} --out ${outputPath} --base ${base}`
  console.log(`🔨 ${strcommand}`)
  execSync(strcommand, { stdio: 'inherit' })
  if (name === 'one-currency-is-not-enough') {
    const deckOut = join(process.cwd(), 'dist', name)
    execSync(`node scripts/patch-one-currency-theme.mjs "${deckOut}"`, { stdio: 'inherit' })
  }
}

console.log('✅ All slide decks built for LOCAL successfully.')
execSync('node scripts/create-index.js', { stdio: 'inherit' })
