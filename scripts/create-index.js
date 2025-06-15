import fs from 'fs';
import path from 'path';

const decks = ['intro', 'review', 'workshop', 'sql-hackerrank'];

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>📚 Slide Decks</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; }
    h1 { font-size: 1.8rem; }
    ul { line-height: 1.8; }
  </style>
</head>
<body>
  <h1>📚 Slidev Presentations</h1>
  <ul>
    ${decks.map(name => `<li><a href="./${name}/">${name}</a></li>`).join('\n    ')}
  </ul>
</body>
</html>`;

fs.writeFileSync(path.resolve('dist', 'index.html'), html);
console.log('✅ index.html created in dist/');
