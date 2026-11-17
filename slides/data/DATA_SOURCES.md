# Data sources — One Currency deck

| File | Type | Source |
|------|------|--------|
| `fx-index-usd-base100.json` | Observed | CAD: Bank of Canada Valet `FXUSDCAD`; MXN: FRED `DEXMXUS`; COP: Banrep TRM via `cop-trm-monthly.json` |
| `cop-trm-monthly.json` | Observed | datos.gov.co resource `ceyp-9c7c` |
| `bis-volatility-q2-2025.json` | Observed (cited) | Aldasoro, Beltran & Grinberg (2026) BIS WP 1340, Table 1, Q2 2025 |
| `transfer-comparison-illustrative.json` | Illustrative template | Fill with verified quotes before presenting |

Refresh commands (from repo root):

```bash
python scripts/fetch-cop-trm.py
python scripts/fetch-fx-index.py
# or: pnpm data:fx
```

**Index formula:** `index_t = 100 × (rate_base / rate_t)` where `rate` is local currency units per 1 USD.
