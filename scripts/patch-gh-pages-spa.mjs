/**
 * GitHub Pages serves static files only. Slidev history URLs like …/deck/5 → 404.
 * Root dist/404.html + redirect restore in each deck index.html (spa-github-pages pattern).
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.resolve(root, 'dist')
const siteBase = '/Slides-dev'

const REDIRECT_RESTORE = `<script>
(function (l) {
  var redirect = sessionStorage.getItem('slidevGhRedirect');
  sessionStorage.removeItem('slidevGhRedirect');
  if (redirect && redirect !== l.href) {
    history.replaceState(null, '', redirect);
  }
})(location);
</script>
`

const ROOT_404 = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Redirecting…</title>
  <script>
    sessionStorage.setItem('slidevGhRedirect', location.href);
    var path = location.pathname.replace(/\\/$/, '');
    var parts = path.split('/').filter(Boolean);
    if (parts.length && /^\\d+$/.test(parts[parts.length - 1])) parts.pop();
    if (!parts.length) {
      location.replace('${siteBase}/');
    } else {
      location.replace('/' + parts.join('/') + '/' + location.search + location.hash);
    }
  </script>
</head>
<body></body>
</html>
`

if (!fs.existsSync(distDir)) {
  console.warn('skip patch-gh-pages-spa: no dist/')
  process.exit(0)
}

fs.writeFileSync(path.join(distDir, '404.html'), ROOT_404)

let patched = 0
for (const ent of fs.readdirSync(distDir, { withFileTypes: true })) {
  if (!ent.isDirectory() || ent.name.startsWith('.')) continue
  const indexPath = path.join(distDir, ent.name, 'index.html')
  if (!fs.existsSync(indexPath)) continue
  let html = fs.readFileSync(indexPath, 'utf8')
  if (html.includes('slidevGhRedirect')) continue
  html = html.replace('<head>', `<head>\n${REDIRECT_RESTORE}`)
  fs.writeFileSync(indexPath, html)
  patched++
}

console.log(`✅ gh-pages SPA: dist/404.html + ${patched} deck index.html`)