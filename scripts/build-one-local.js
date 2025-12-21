import { mkdirSync } from 'fs'
import { execSync } from 'child_process'
import path from 'path'

const fileArg = process.argv[2]
if (!fileArg) {
  console.error('Usage: node scripts/build-one-local.js slides/<deck>.md')
  process.exit(1)
}

const projectRoot = process.cwd()
const slidesDir = path.join(projectRoot, 'slides')
const distDir = path.join(projectRoot, 'dist')

mkdirSync(distDir, { recursive: true })

const absInput = path.isAbsolute(fileArg) ? fileArg : path.join(projectRoot, fileArg)
const name = path.basename(absInput, '.md')
const outputPath = path.join(distDir, name)

// IMPORTANT: trailing slash
const base = `/${name}/`

console.log(`🔨 [LOCAL] Building ${path.relative(projectRoot, absInput)} -> ${path.relative(projectRoot, outputPath)} (base: ${base})`)
execSync(`slidev build "${absInput}" --out "${outputPath}" --base "${base}"`, { stdio: 'inherit' })

console.log(`✅ Done: ${name}`)
