# Slidev — Multiple Presentations

This repo holds **several slide decks** under `slides/`. Each `.md` file is its own presentation.

## Quick start (all decks + index)

```bash
pnpm install
pnpm start
```

Then open **http://localhost:4000** — you should see an index listing every deck, including `time-makes-small-actions-powerful`.

## Edit one deck live (dev server)

Financial presentation:

```bash
pnpm dev
# or
pnpm dev:time-makes
```

Opens **http://localhost:3030** with hot reload for that deck only (16 slides).

Other decks:

```bash
pnpm dev:intro
pnpm dev:workshop
pnpm dev:review
```

Default Slidev template (demo):

```bash
pnpm dev:default
```

## Build only

```bash
pnpm build:all:local   # dist/ for local paths + index.html
pnpm build:all         # dist/ for GitHub Pages (/Slides-dev/...)
pnpm generate:index    # regenerate dist/index.html after a build
```

## Project layout

| Path | Purpose |
|------|---------|
| `slides/*.md` | One presentation per file |
| `slides/styles/finance.css` | Theme for the financial deck |
| `dist/<name>/` | Built static site per deck |
| `dist/index.html` | Links to all decks |

## Deploy

GitHub Actions runs `pnpm build:all` + `pnpm generate:index` on push.
