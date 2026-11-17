import { chromium } from 'playwright-chromium'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = path.join(root, 'slides', 'charts', 'six-currencies.html')
const outDir = path.join(root, 'slides', 'images')

fs.mkdirSync(outDir, { recursive: true })

const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`

async function clipChipsToChart(page) {
  const chips = await page.locator('#chips').boundingBox()
  const chart = await page.locator('#chart').boundingBox()
  if (!chips || !chart) throw new Error('#chips or #chart not found')
  return {
    x: Math.min(chips.x, chart.x),
    y: chips.y,
    width: Math.max(chips.x + chips.width, chart.x + chart.width) - Math.min(chips.x, chart.x),
    height: chart.y + chart.height - chips.y,
  }
}

async function captureRange(page, range, outFile) {
  await page.click(`[data-range="${range}"]`)
  await page.waitForTimeout(500)
  const clip = await clipChipsToChart(page)
  await page.screenshot({ path: outFile, clip })
  console.log(`✅ ${path.relative(root, outFile)}`)
}

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1100, height: 900 },
  deviceScaleFactor: 2,
})
await page.goto(fileUrl, { waitUntil: 'networkidle' })
await page.waitForTimeout(800)

await captureRange(page, '2025', path.join(outDir, 'fx-2025.png'))
await captureRange(page, '2026', path.join(outDir, 'fx-2026.png'))

await browser.close()