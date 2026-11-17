import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const from = path.join(root, 'slides', 'charts', 'six-currencies.html')
const toDir = path.join(root, 'slides', 'public', 'charts')
const to = path.join(toDir, 'six-currencies.html')

fs.mkdirSync(toDir, { recursive: true })
fs.copyFileSync(from, to)
console.log('✅ synced six-currencies.html → slides/public/charts/')