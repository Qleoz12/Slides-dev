<template>
  <div class="oc-bridge oc-card max-w-4xl mx-auto">
    <svg viewBox="0 0 800 220" role="img" aria-label="USDT bridge between currencies">
      <defs>
        <linearGradient id="bridge" x1="0" x2="1">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.2" />
          <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.2" />
        </linearGradient>
      </defs>
      <rect x="40" y="92" width="720" height="36" rx="18" fill="url(#bridge)" />
      <circle cx="120" cy="80" r="44" fill="#1f2937" stroke="#f97316" stroke-width="3" />
      <text x="120" y="86" text-anchor="middle" fill="#f8fafc" font-size="18" font-weight="700">COP</text>
      <circle cx="320" cy="80" r="44" fill="#1f2937" stroke="#22d3ee" stroke-width="3" />
      <text x="320" y="86" text-anchor="middle" fill="#f8fafc" font-size="18" font-weight="700">CAD</text>
      <circle cx="520" cy="80" r="44" fill="#1f2937" stroke="#a78bfa" stroke-width="3" />
      <text x="520" y="86" text-anchor="middle" fill="#f8fafc" font-size="18" font-weight="700">MXN</text>
      <g transform="translate(640,58)">
        <path d="M0,40 L55,40 L45,28 L68,40 L45,52 L55,40 Z" fill="#38bdf8" />
        <text x="34" y="84" text-anchor="middle" fill="#e2e8f0" font-size="13">USDT</text>
        <text x="34" y="102" text-anchor="middle" fill="#94a3b8" font-size="10">USD peg (not risk-free)</text>
      </g>
      <text x="400" y="168" text-anchor="middle" fill="#cbd5e1" font-size="14">
        Accumulate → Monitor rates → Convert when rules are met
      </text>
    </svg>
    <p class="oc-foot text-center">
      Personal workflow — not investment advice. Stablecoins add custody, spread, and regulatory risks (BIS, 2026).
    </p>
  </div>
</template>
