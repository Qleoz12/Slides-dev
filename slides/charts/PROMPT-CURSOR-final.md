# Prompt para Cursor (modo Agent) — Slides-dev

Copia todo lo que está debajo de la línea y pégalo en Cursor, con la carpeta `D:\Backup\develop\Slides-dev` abierta.

---

Trabaja solo en la presentación `slides/one-currency-is-not-enough.md`. Usa Node 20 en `"C:\Program Files\nodejs14\node.exe"` (el Node del PATH es 18 y no sirve). No instales dependencias: `playwright-chromium` ya está en `devDependencies`.

## 1. Capturar dos imágenes del gráfico HTML

Ya copié el archivo `six-currencies-offline.html` a `slides/charts/six-currencies.html`.

Crea `scripts/capture-fx-charts.mjs`. Debe usar `chromium` de `playwright-chromium` para:

- abrir ese HTML con `file://`, en un viewport de 1100×900 y `deviceScaleFactor: 2`;
- esperar 800 ms, hacer clic en `[data-range="2025"]`, esperar 500 ms y capturar el área que va desde `#chips` hasta el final de `#chart` (calcula el clip con el `boundingBox` de los dos elementos). Guárdala en `slides/images/fx-2025.png`;
- hacer lo mismo con `[data-range="2026"]` y guardar `slides/images/fx-2026.png`.

Córrelo con:

```
"C:\Program Files\nodejs14\node.exe" scripts\capture-fx-charts.mjs
```

## 2. Cambiar la diapositiva 3 por dos diapositivas con las imágenes

En la diapositiva "Three currencies, different movements":

- Quita el `<script setup>` con el import de `FxIndexChart`, la línea `<FxIndexChart ... />` y la línea `clicks: 3` del frontmatter.
- Cambia el título a `# Six currencies vs the US dollar — 2025` y pon debajo de la pregunta de investigación:
  `<img src="./images/fx-2025.png" class="mx-auto rounded-lg" style="max-height: 380px" />`
- Cambia el pie a: `Value of each currency in USD, index = 100 at the start of the year. Up = stronger. Source: fawazahmed0 exchange-api (daily reference rates), weekly snapshots.`
- Justo después, crea una diapositiva igual con título `# Six currencies vs the US dollar — 2026` y la imagen `fx-2026.png`.
- Ajusta las notas del presentador (`<!-- -->`) de las dos: ya no hay clics en el gráfico.

## 3. Tabla corta de volatilidad (diapositiva BIS)

En "How volatile is each currency? (BIS)", quita el `<script setup>` de `BisVolatilityBars` y el bloque `<div class="oc-card ..."><BisVolatilityBars /></div>`. En su lugar pon esta tabla HTML dentro de un `oc-card` (`max-w-2xl mx-auto`, texto de 18 px), ordenada de menor a mayor volatilidad, con una barra horizontal proporcional en cada fila: CAD celeste `#22d3ee`, MXN violeta `#a78bfa`, COP naranja `#f97316`, y el resto gris `#64748b`.

| Currency | Annualized volatility of USDT |
|---|---|
| PHP — Philippine peso | 5.21% |
| CAD — Canadian dollar | 7.27% |
| MXN — Mexican peso | 11.36% |
| COP — Colombian peso | 12.25% |
| BRL — Brazilian real | 13.80% |
| CHF — Swiss franc | 14.68% |

Deja el pie con la fuente (Aldasoro, Beltran & Grinberg 2026, BIS WP 1340, Table 1, Q2 2025 sample) tal como está.

## 4. Diapositiva "My strategy: USDT as a bridge"

Si todavía tiene `<UsdBridgeDiagram />`, quítalo junto con su import. Las tres tarjetas se quedan.

## 5. Validar toda la presentación

1. Exporta:
   ```
   "C:\Program Files\nodejs14\node.exe" node_modules\@slidev\cli\bin\slidev.mjs export slides\one-currency-is-not-enough.md --output final-check.pdf
   ```
2. Exporta también cada diapositiva como PNG:
   ```
   "C:\Program Files\nodejs14\node.exe" node_modules\@slidev\cli\bin\slidev.mjs export slides\one-currency-is-not-enough.md --format png --output final-check-png
   ```
   Abre cada PNG y revisa:
   - que nada esté cortado por abajo;
   - que no haya áreas vacías donde debería haber un gráfico;
   - que no haya texto gigante ni texto encimado;
   - que las imágenes se vean nítidas.
3. Escribe `slides/one-currency-is-not-enough.FINAL-QA.md` con una tabla: número de diapositiva, título, OK o problema, y qué corregiste. Si algo falla, corrígelo y vuelve a exportar antes de terminar.

## No hacer

- No tocar otras presentaciones, `package.json`, `slides/data/` ni los componentes de `components/` (que queden sin usar no importa).
- No usar `zoom` para meter contenido.
- No instalar nada.
