/**
 * Hub local en :4000. live-server CLI no acepta rutas middleware fuera de su paquete;
 * aquí pasamos la función directamente (deep links /deck/5, etc.).
 */
import { createRequire } from 'module'
import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)
const liveServer = require('live-server')
const spaHubMiddleware = require('./spa-hub-middleware.cjs')

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const watch = process.argv.includes('--watch')
const port = Number(process.env.HUB_PORT || 4000)

execSync('node scripts/create-index.js', { cwd: root, stdio: 'inherit' })

liveServer.start({
  port,
  host: '127.0.0.1',
  root: dist,
  open: '/',
  ignore: 'node_modules',
  middleware: [spaHubMiddleware],
  logLevel: 2,
  ...(watch ? { watch: [dist] } : {}),
})

console.log(`✅ Hub → http://127.0.0.1:${port}/`)