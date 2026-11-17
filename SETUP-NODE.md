# Node.js for Slidev (Slides-dev)

Slidev **51.x** needs **Node.js 20 or newer**. On **Node 18** you will see errors like:

- `styleText` is not exported from `node:util`
- `tracingChannel` is not exported from `node:diagnostics_channel`

You currently have **v18.17.0** on `C:\Program Files\nodejs\`.

If winget installed **Node 20** into `C:\Program Files\nodejs14\` but `node -v` still shows 18, either fix PATH or run:

```cmd
dev-one-currency.cmd
```

## Option A — Install Node 20 LTS (recommended)

### winget (Windows)

```powershell
winget install OpenJS.NodeJS.20 --accept-package-agreements --accept-source-agreements
```

Close **all** terminals, open a new one, then:

```powershell
node -v    # should show v20.x
cd D:\Backup\develop\Slides-dev
pnpm dev:one-currency
```

### Installer

Download **20 LTS** from https://nodejs.org/ and install. Reopen the terminal.

## Option B — Keep Node 18 for other projects

Use **nvm-windows** or **Volta** to switch versions per folder (`.nvmrc` in this repo says `20`).

## CMD — one command (no PowerShell)

From `D:\Backup\develop\Slides-dev`:

| Command | What it does |
|---------|----------------|
| **`start.cmd`** | **Hub (como antes):** compila todas las decks → `dist/index.html` → abre **http://127.0.0.1:4000/** con la lista |
| `start.cmd serve` | Solo sirve el hub (si ya compilaste antes) |
| `start.cmd watch` | Recompila al guardar + hub en 4000 |
| `start.cmd dev one-currency-is-not-enough` | Slidev en vivo **una** presentación (~3030), para editar |
| `start.cmd data` | Refresh FX JSON (`pnpm data:fx`) |
| `dev-one-currency.cmd` | Atajo → dev solo Langara deck |

First time only:

```cmd
cd D:\Backup\develop\Slides-dev
start.cmd
```

If pnpm warns about esbuild: run `pnpm install` once, then `start.cmd` again.

## After upgrading Node

```powershell
cd D:\Backup\develop\Slides-dev
pnpm install
pnpm approve-builds   # allow esbuild if prompted
pnpm dev:one-currency
```

## `pnpm data:fx`

Run **without** trailing comments on CMD:

```powershell
pnpm data:fx
```

Do not type `# opcional...` on the same line in CMD — it passes extra arguments to Python.
