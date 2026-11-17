<script setup lang="ts">
import bis from '../slides/data/bis-volatility-q2-2025.json'

const max = Math.max(...bis.rows.map((r) => r.volatilityPct))
</script>

<template>
  <div class="text-left">
    <div class="oc-kicker mb-2">BIS WP 1340 — Table 1 (Q2 2025 sample)</div>
    <div class="space-y-2">
      <div v-for="row in bis.rows" :key="row.code" class="flex items-center gap-3 text-sm">
        <span class="w-10 font-semibold">{{ row.label }}</span>
        <div class="flex-1 h-3 rounded bg-slate-800 overflow-hidden">
          <div
            class="h-full rounded"
            :style="{
              width: `${(row.volatilityPct / max) * 100}%`,
              background:
                row.code === 'CAD'
                  ? '#22d3ee'
                  : row.code === 'MXN'
                    ? '#a78bfa'
                    : row.code === 'COP'
                      ? '#f97316'
                      : '#64748b',
            }"
          />
        </div>
        <span class="w-14 text-right tabular-nums">{{ row.volatilityPct.toFixed(2) }}%</span>
      </div>
    </div>
    <p class="oc-foot">
      Volatility ≠ expected return. BIS measures relate to USDT/local trading in the study — not the same as
      interbank spot markets.
    </p>
  </div>
</template>
