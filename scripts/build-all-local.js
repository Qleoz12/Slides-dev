// scripts/build-all-local.js
import { readdirSync, mkdirSync } from 'fs'
import { execSync } from 'child_process'
import { join, basename, extname } from 'path'

const slidesDir = './slides'
const distDir = '../dist'

const files = readdirSync(slidesDir).filter(f => extname(f) === '.md')

mkdirSync(distDir, { recursive: true })

for (const file of files) {
  const name = basename(file, '.md')
  const inputPath = join(slidesDir, file)
  const outputPath = join(distDir, name)

  console.log(`🔨 [LOCAL] Building ${file} -> ${outputPath}`)
  const strcommand=`slidev build ${inputPath} --out ${outputPath} --base /${name}`
   console.log(`🔨 ${strcommand}`)
//   slidev build slides/intro.md --out ../dist/intro --base /intro
  execSync(`slidev build ${inputPath} --out ${outputPath} --base /${name}`, { stdio: 'inherit' })
}

console.log('✅ All slide decks built for LOCAL successfully.')
execSync('node scripts/create-index.js', { stdio: 'inherit' })
