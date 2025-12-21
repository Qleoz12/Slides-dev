// scripts/build-all.js
import { readdirSync, mkdirSync } from 'fs'
import { execSync } from 'child_process'
import { join, basename, extname } from 'path'

const slidesDir = './slides'
const distDir = '../dist'
const basePath = '/Slides-dev'

const files = readdirSync(slidesDir).filter(f => extname(f) === '.md')

mkdirSync(distDir, { recursive: true })

for (const file of files) {
  const name = basename(file, '.md')
  const inputPath = join(slidesDir, file)
  const outputPath = join(distDir, name)
  const base = `${basePath}/${name}`

  console.log(`🔨 Building ${file} -> ${outputPath} (base: ${base})`)
  execSync(`slidev build ${inputPath} --out ${outputPath} --base ${base}`, { stdio: 'inherit' })
}
console.log('✅ All slide decks built successfully.')