<script setup lang="ts">
import data from '../slides/data/transfer-comparison-illustrative.json'
</script>

<template>
  <div class="oc-card text-left max-w-4xl mx-auto">
    <div class="oc-kicker mb-2">{{ data.status.replaceAll('_', ' ') }}</div>
    <p class="text-sm oc-muted mb-3">{{ data.disclaimer }}</p>
    <table class="w-full text-xs sm:text-sm border-collapse">
      <thead>
        <tr class="text-left oc-muted">
          <th class="py-1 pr-2">Method</th>
          <th class="py-1 pr-2">Fees</th>
          <th class="py-1 pr-2">Net CAD received</th>
          <th class="py-1">Limits / notes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="m in data.methods" :key="m.name" class="border-t border-slate-700">
          <td class="py-2 pr-2 font-semibold">{{ m.name }}</td>
          <td class="py-2 pr-2">Fill at time T</td>
          <td class="py-2 pr-2">Fill at time T</td>
          <td class="py-2 oc-muted">{{ m.limitations }}</td>
        </tr>
      </tbody>
    </table>
    <p class="oc-foot">
      Compare the <strong>amount that arrives</strong>, not only the headline exchange rate. Scenario:
      {{ data.scenario.sendAmountUsd }} USD equivalent · {{ data.scenario.from }} → {{ data.scenario.to }}.
    </p>
  </div>
</template>
