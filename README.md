# Slides-dev — referencia rápida

Presentaciones [Slidev](https://sli.dev/) en `slides/*.md`. Build → `dist/<deck>/`. **Menú:** `dist/index.html` en el puerto **4000**.

**Git / commit:** solo `D:\Backup\develop\Slides-dev-repo` (rama `master`).  
**Edición local:** `D:\Backup\develop\Slides-dev` — sincronizar desde el repo al terminar.

**Node ≥ 20** (en Windows: `set PATH=C:\Program Files\nodejs14;%PATH%`)

**Flujo corto**

| Qué | Comando |
|-----|---------|
| Compilar 1–2 decks | `pnpm build:deck -- one-currency-is-not-enough` (o `--latest --with-ref`) |
| Hub local :4000 | `pnpm hub` |
| Dev con recarga :3030 | `pnpm dev:deck -- one-currency-is-not-enough` |
| GitHub Pages (CI) | `pnpm build:all` — no uses esto a mano salvo prueba de Pages |

---

## Día a día (recomendado)

**1. Compilar lo que trabajas** (sin quemar nombres en `package.json`):

```cmd
cd /d D:\Backup\develop\Slides-dev
set PATH=C:\Program Files\nodejs14;%PATH%
pnpm build:deck -- --latest --with-ref
```

- `--latest`: la `.md` más reciente en `slides/`
- `--with-ref`: también la siguiente más reciente (para comparar en el hub)

O decks concretas:

```cmd
pnpm build:deck -- one-currency-is-not-enough time-makes-small-actions-powerful
```

**2. Abrir siempre el menú (hub):**

```cmd
pnpm hub
```

→ http://127.0.0.1:4000/ — elige la deck; entra **sin** número al final (`.../one-currency-is-not-enough/`, no `.../2`).

**3. Editar en vivo** (terminal aparte; no abre el navegador):

```cmd
pnpm dev:deck -- one-currency-is-not-enough
```

→ http://localhost:3030/ — con el hub abierto en :4000.

**Atajo:** `start.cmd` = `pnpm hub`. `start.cmd build -- --latest --with-ref`

---

## Menú lateral con “1 Goal, 2 Features…” encima del slide

Eso es el **Goto** de Slidev (atajo **G**): la lista de diapositivas se quedaba visible en builds del hub. Los builds nuevos llevan un parche CSS automático (`scripts/patch-hub-slidev.js`). Si aún lo ves en un deck viejo:

```cmd
node -e "import('./scripts/patch-hub-slidev.js').then(m=>m.patchAllDecks())"
```

Luego recarga el navegador (Ctrl+F5). También: **Esc** o **G** dos veces para cerrar Goto; **O** / **Esc** para el overview (rejilla de miniaturas).

---

## Comandos extra

| Comando | Uso |
|---------|-----|
| `pnpm start` | Igual que `pnpm hub` |
| `pnpm build:all:local` | Todas las decks (lento) |
| `pnpm start:local` | Todas + watch + :4000 |
| `pnpm start:hub` | Build todas + servir |
| `pnpm restore:hub` | Copiar builds viejos desde `slides/dist/` |
| `node scripts/build-one-local.js slides/X.md` | Una sola deck |

---

## Build técnico

Slidev escribe en `slides/dist/<deck>/` y el script copia a `dist/<deck>/` para el hub ([`scripts/lib/paths.js`](scripts/lib/paths.js)).

Repo de referencia: [Qleoz12/Slides-dev](https://github.com/Qleoz12/Slides-dev) (GitHub Pages usa base `/Slides-dev/...`; local usa `/deck-name/`).

---

## Exportar a PDF

En el **hub** (`pnpm hub`, build estático) **no** sale el botón “Browser Exporter” por defecto: Slidev deja `browserExporter: dev` (solo en `pnpm dev:*`).

**Playwright (solo si usas `download: true` en el frontmatter):**

Ese flag hace que **cada `slidev build` genere** `slidev-exported.pdf` al final. Requiere:

```cmd
pnpm add -D playwright-chromium
pnpm exec playwright install chromium
```

(Sin eso verás: `please install it via npm i -D playwright-chromium` y el build falla aunque Vite haya terminado.)

**Opción A — CLI (sin `download: true` en la deck):**

```cmd
pnpm exec slidev export slides/workshop.md --output workshop.pdf
```

**Opción B — botón en el build del hub:** en el frontmatter de la deck:

```yaml
browserExporter: true
```

Vuelve a compilar (`pnpm build:deck -- workshop`) y en la barra de controles verás el icono PDF → ruta `/export`.

Para descarga directa en build: `download: true` (otro mecanismo de Slidev).

---

## GitHub Pages vs `homepage` en package.json

El workflow [deploy.yml](https://github.com/Qleoz12/Slides-dev/blob/main/.github/workflows/deploy.yml) ejecuta `pnpm build:all` + `generate:index`. **No lee** el campo `homepage` del `package.json`.

Lo que define las URLs en GitHub es el **`--base`** de cada build:

| Entorno | Script | `base` típica |
|---------|--------|----------------|
| CI / Pages | `build-all.js` | `/Slides-dev/<deck>/` |
| Local hub | `build-one-local.js` | `/<deck>/` |

Sitio publicado: **https://qleoz12.github.io/Slides-dev/** (no `/slides`). El `homepage` del JSON es solo metadato npm; lo alineamos con esa URL.

---

## Deck `one-currency-is-not-enough`

Presentación de asignación (Langara): ahorro multi-moneda para estudiantes internacionales. Archivo: [`slides/one-currency-is-not-enough.md`](slides/one-currency-is-not-enough.md).

### Cambios recientes (gráficos estáticos + QA)

Para evitar componentes Vue pesados en export/PDF, la diapositiva interactiva de FX se sustituyó por **imágenes PNG** generadas desde el mismo HTML del gráfico:

| Qué | Dónde |
|-----|--------|
| HTML del gráfico (offline) | [`slides/charts/six-currencies.html`](slides/charts/six-currencies.html) |
| Capturas 2025 / 2026 | [`slides/images/fx-2025.png`](slides/images/fx-2025.png), [`slides/images/fx-2026.png`](slides/images/fx-2026.png) |
| Script Playwright | [`scripts/capture-fx-charts.mjs`](scripts/capture-fx-charts.mjs) |
| Checklist por diapositiva | [`slides/one-currency-is-not-enough.FINAL-QA.md`](slides/one-currency-is-not-enough.FINAL-QA.md) |

**En el `.md`:**

- Dos slides «Six currencies vs the US dollar — 2025 / 2026» con `<img src="./images/fx-….png">` (antes `FxIndexChart` + `clicks`).
- Slide BIS: tabla HTML con barras de volatilidad (antes `BisVolatilityBars`).
- Slide USDT: solo las tres tarjetas + pie (se quitó `UsdBridgeDiagram`).
- Sigue usando `TransferComparePanel` en la slide de remesas.

Los componentes en `components/` pueden quedar sin uso en esta deck; no hace falta borrarlos para compilar.

**Regenerar imágenes** (usa `playwright-chromium` ya en `devDependencies`; Node 20 explícito en Windows):

```cmd
cd /d D:\Backup\develop\Slides-dev
"C:\Program Files\nodejs14\node.exe" scripts\capture-fx-charts.mjs
```

El script abre el HTML con `file://`, viewport 1100×900, `deviceScaleFactor: 2`, hace clic en `[data-range="2025"]` / `2026` y recorta desde `#chips` hasta el final de `#chart`.

**Export de control (PDF + PNG por slide):**

```cmd
"C:\Program Files\nodejs14\node.exe" node_modules\@slidev\cli\bin\slidev.mjs export slides\one-currency-is-not-enough.md --output final-check.pdf
"C:\Program Files\nodejs14\node.exe" node_modules\@slidev\cli\bin\slidev.mjs export slides\one-currency-is-not-enough.md --format png --output final-check-png
```

Salidas en la raíz del repo: `final-check.pdf`, carpeta `final-check-png/` (solo cuando corras el export a mano; el build del hub **no** genera PDF automático en esta deck).

### Datos FX (Python)

Para refrescar JSON usados por otros flujos / componentes:

```cmd
pnpm data:fx
```

Requiere Python.

---

## Instalación

```cmd
cd /d D:\Backup\develop\Slides-dev
pnpm install
```