// scripts/build-all.js
import { readdirSync, mkdirSync } from 'fs'
import { execSync } from 'child_process'
import { join, basename, extname } from 'path'

const slidesDir = './slides'
// Slidev resolves --out from slides/ → ../dist = repo-root dist/
const distDir = '../dist'
const basePath = '/Slides-dev'

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
  const base = `${basePath}/${name}/`

  console.log(`🔨 Building ${file} -> ${outputPath} (base: ${base})`)
  if (name === 'one-currency-is-not-enough') {
    execSync('node scripts/sync-chart-public.mjs', { stdio: 'inherit' })
  }
  execSync(`pnpm exec slidev build ${inputPath} --out ${outputPath} --base ${base}`, { stdio: 'inherit' })
  if (name === 'one-currency-is-not-enough') {
    const deckOut = join(process.cwd(), 'dist', name)
    execSync(`node scripts/patch-one-currency-theme.mjs "${deckOut}"`, { stdio: 'inherit' })
  }
}
console.log('✅ All slide decks built successfully.')
execSync('node scripts/create-index.js', { stdio: 'inherit' })
execSync('node scripts/patch-gh-pages-spa.mjs', { stdio: 'inherit' })