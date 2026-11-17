<script setup lang="ts">
import { computed } from 'vue'
import BisVolatilityBars from './BisVolatilityBars.vue'
import fx from '../slides/data/fx-index-usd-base100.json'

const props = withDefaults(
  defineProps<{ clicks?: number; showVol?: boolean }>(),
  { clicks: 0, showVol: true },
)

type Pt = { date: string; rate: number; index: number }
type Series = { points: Pt[]; source?: string; quote?: string }

const colors: Record<string, string> = { COP: '#f97316', CAD: '#22d3ee', MXN: '#a78bfa' }
const order = ['COP', 'CAD', 'MXN'] as const

const allDates = computed(() => {
  const set = new Set<string>()
  for (const k of order) {
    const s = fx.series[k] as Series
    s.points?.forEach((p) => set.add(p.date))
  }
  return [...set].sort()
})

function pathFor(key: (typeof order)[number]) {
  const pts = (fx.series[key] as Series).points ?? []
  const map = new Map(pts.map((p) => [p.date, p.index]))
  const xs = allDates.value
  if (!xs.length) return ''
  const w = 700
  const h = 220
  const pad = 28
  const minY = 70
  const maxY = 115
  const coords = xs
    .map((d, i) => {
      const y = map.get(d)
      if (y === undefined) return null
      const x = pad + (i / Math.max(xs.length - 1, 1)) * (w - pad * 2)
      const yy = h - pad - ((y - minY) / (maxY - minY)) * (h - pad * 2)
      return `${x},${yy}`
    })
    .filter(Boolean)
  return coords.join(' ')
}

const visible = computed(() => ({
  COP: props.clicks >= 1,
  CAD: props.clicks >= 2,
  MXN: props.clicks >= 3,
  vol: props.showVol && props.clicks >= 4,
}))
</script>

<template>
  <div class="oc-card text-left w-full max-w-4xl mx-auto">
    <svg viewBox="0 0 700 250" class="w-full" role="img" aria-label="FX index chart base 100">
      <text x="28" y="22" fill="#94a3b8" font-size="12">Index (100 = first month in sample)</text>
      <line x1="28" y1="222" x2="672" y2="222" stroke="#334155" stroke-width="1" />
      <line x1="28" y1="28" x2="28" y2="222" stroke="#334155" stroke-width="1" />
      <template v-for="key in order" :key="key">
        <polyline
          v-show="visible[key]"
          :points="pathFor(key)"
          fill="none"
          :stroke="colors[key]"
          stroke-width="3"
          stroke-linejoin="round"
          stroke-linecap="round"
        />
      </template>
    </svg>
    <div class="flex flex-wrap gap-3 mt-2 text-sm">
      <span v-show="visible.COP" class="oc-pill" :style="{ borderColor: colors.COP }">COP (Banrep TRM)</span>
      <span v-show="visible.CAD" class="oc-pill" :style="{ borderColor: colors.CAD }">CAD (BoC)</span>
      <span v-show="visible.MXN" class="oc-pill" :style="{ borderColor: colors.MXN }">MXN (Fed H.10)</span>
    </div>
    <p class="oc-foot">
      Observed monthly indexes — not a forecast. Quote: local currency units per 1 USD.
      Higher index = stronger local currency vs USD.
    </p>
    <div v-show="visible.vol" class="mt-3">
      <BisVolatilityBars />
    </div>
  </div>
</template>
