import fs from 'fs'
import path from 'path'

const distDir = path.resolve('dist')

// Ensure dist/ exists
if (!fs.existsSync(distDir)) {
  console.error('❌ dist/ directory does not exist. Build first.')
  process.exit(1)
}

// Read only directories inside dist/
const decks = fs.readdirSync(distDir, { withFileTypes: true })
  .filter(
    d =>
      d.isDirectory() &&
      !d.name.startsWith('.') &&
      d.name !== 'assets'
  )
  .map(d => d.name)
  .sort()

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>📚 Slidev Decks</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      padding: 2rem;
      max-width: 720px;
      margin: auto;
    }
    h1 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }
    ul {
      line-height: 2;
      padding-left: 1.2rem;
    }
    a {
      text-decoration: none;
      color: #2563eb;
      font-weight: 500;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <h1>📚 Slidev Presentations</h1>
  <ul>
    ${decks.map(name => `<li><a href="./${name}/">${name}</a></li>`).join('\n    ')}
  </ul>
</body>
</html>
`

fs.writeFileSync(path.join(distDir, 'index.html'), html)
console.log(`✅ index.html created with ${decks.length} decks`)
