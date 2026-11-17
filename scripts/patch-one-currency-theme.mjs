/**
 * Slidev puts deck styles in lazy md-*.css; first paint on gh.io stays Seriph white.
 * Copy theme CSS into assets/oc-theme.css and link from index.html (sync load).
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const deckDir = path.resolve(process.argv[2] ?? path.join(root, 'dist', 'one-currency-is-not-enough'))

if (!fs.existsSync(path.join(deckDir, 'index.html'))) {
  console.warn(`skip patch-one-currency-theme: no index at ${deckDir}`)
  process.exit(0)
}

const themeSrc = path.join(root, 'slides', 'styles', 'one-currency.css')
const critical = `
html,
body,
#app,
#slide-container,
.slidev-slide-container {
  background: #0f172a !important;
}
.slidev-slide-content,
#slide-content,
.slidev-page {
  background: transparent !important;
  filter: none !important;
}
`

const css = `${critical}\n${fs.readFileSync(themeSrc, 'utf8')}`
const assetsDir = path.join(deckDir, 'assets')
fs.mkdirSync(assetsDir, { recursive: true })
const cssName = 'oc-theme.css'
fs.writeFileSync(path.join(assetsDir, cssName), css)

const indexPath = path.join(deckDir, 'index.html')
let html = fs.readFileSync(indexPath, 'utf8')
const link = `  <link rel="stylesheet" crossorigin href="./assets/${cssName}">`
if (!html.includes(cssName)) {
  html = html.replace('</head>', `${link}\n</head>`)
  fs.writeFileSync(indexPath, html)
}
console.log(`✅ oc-theme.css → ${path.relative(root, deckDir)}`)