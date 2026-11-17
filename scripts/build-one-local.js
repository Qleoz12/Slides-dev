import { mkdirSync } from 'fs'
import { execSync } from 'child_process'
import path from 'path'
import { copyDeckToHub, distDeckDir, slidevOutArg } from './lib/paths.js'

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
const outputPath = distDeckDir(projectRoot, name)
const stagingOut = slidevOutArg(name)

// IMPORTANT: trailing slash
const base = `/${name}/`

console.log(
  `🔨 [LOCAL] Building ${path.relative(projectRoot, absInput)} -> ${path.relative(projectRoot, outputPath)} (base: ${base})`,
)
if (name === 'one-currency-is-not-enough') {
  execSync('node scripts/sync-chart-public.mjs', { cwd: projectRoot, stdio: 'inherit' })
}
execSync(`pnpm exec slidev build "${absInput}" --out "${stagingOut}" --base "${base}"`, {
  stdio: 'inherit',
  cwd: projectRoot,
})
copyDeckToHub(projectRoot, name)

if (name === 'one-currency-is-not-enough') {
  execSync(`node scripts/patch-one-currency-theme.mjs "${outputPath}"`, {
    stdio: 'inherit',
    cwd: projectRoot,
  })
}

console.log(`✅ Done: ${name}`)
