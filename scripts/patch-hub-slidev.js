/**
 * Slidev's Goto palette keeps the full slide list visible in production builds:
 * when closed, only the input moves off-screen (-top-20) but the autocomplete
 * list still paints over the slide. Hide it unless Goto is open (input enabled).
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const PATCH_ID = 'slides-dev-goto-fix'
const PATCH = `
<style id="${PATCH_ID}">
#slidev-goto-dialog:has(#slidev-goto-input:disabled) {
  visibility: hidden !important;
  pointer-events: none !important;
}
#slidev-goto-dialog:has(#slidev-goto-input:disabled) .autocomplete-list {
  display: none !important;
}
</style>
<script id="${PATCH_ID}-init">
(function () {
  try {
    localStorage.removeItem('slidev-show-editor');
  } catch (_) {}
})();
</script>
`.trim()

/**
 * @param {string} projectRoot
 * @param {string} deckName
 */
export function patchDeckIndexHtml(projectRoot, deckName) {
  const indexPath = path.join(projectRoot, 'dist', deckName, 'index.html')
  if (!fs.existsSync(indexPath)) return

  let html = fs.readFileSync(indexPath, 'utf8')
  if (html.includes(PATCH_ID)) return

  if (html.includes('</head>')) {
    html = html.replace('</head>', `${PATCH}\n</head>`)
  } else {
    html = PATCH + html
  }
  fs.writeFileSync(indexPath, html)
}

/**
 * Patch every built deck under dist/
 * @param {string} [projectRoot]
 */
export function patchAllDecks(projectRoot = process.cwd()) {
  const distDir = path.join(projectRoot, 'dist')
  if (!fs.existsSync(distDir)) return 0

  let count = 0
  for (const ent of fs.readdirSync(distDir, { withFileTypes: true })) {
    if (!ent.isDirectory() || ent.name === 'assets') continue
    patchDeckIndexHtml(projectRoot, ent.name)
    count++
  }
  return count
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))
if (isMain) {
  const n = patchAllDecks()
  console.log(`✅ Goto fix applied to ${n} deck(s) in dist/`)
}