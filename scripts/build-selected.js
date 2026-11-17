/** @deprecated Use scripts/build-deck.js */
import { spawnSync } from 'child_process'
import path from 'path'

const r = spawnSync(process.execPath, ['scripts/build-deck.js', ...process.argv.slice(2)], {
  stdio: 'inherit',
  cwd: process.cwd(),
})
process.exit(r.status ?? 1)