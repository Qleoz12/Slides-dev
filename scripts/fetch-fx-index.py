#!/usr/bin/env python3
"""Build offline FX index JSON for one-currency slide deck."""
from __future__ import annotations

import csv
import io
import json
import urllib.request
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "slides" / "data" / "fx-index-usd-base100.json"


def month_end_points(daily: list[tuple[str, float]], start: str = "2020-01", end: str = "2025-12") -> dict:
    by_month: dict[str, list[float]] = defaultdict(list)
    for d, v in daily:
        by_month[d[:7]].append(v)
    months = sorted(m for m in by_month if start <= m <= end)
    if not months:
        return {"points": [], "baseMonth": None, "baseRate": None}
    base = by_month[months[0]][-1]
    pts = [
        {
            "date": m,
            "rate": round(by_month[m][-1], 4),
            "index": round(100 * base / by_month[m][-1], 2),
        }
        for m in months
    ]
    return {"baseMonth": months[0], "baseRate": base, "points": pts}


def fetch_boc_cad() -> dict:
    url = "https://www.bankofcanada.ca/valet/observations/FXUSDCAD/json?start_date=2020-01-01&end_date=2025-12-31"
    data = json.loads(urllib.request.urlopen(url, timeout=60).read())
    daily = [(o["d"], float(o["FXUSDCAD"]["v"])) for o in data["observations"]]
    out = month_end_points(daily)
    out["source"] = "Bank of Canada Valet"
    out["seriesId"] = "FXUSDCAD"
    out["quote"] = "Canadian dollars per 1 USD"
    return out


def fetch_fred_daily(series_id: str, quote: str) -> dict:
    url = f"https://fred.stlouisfed.org/graph/fredgraph.csv?id={series_id}"
    raw = urllib.request.urlopen(url, timeout=60).read().decode()
    rows = list(csv.DictReader(io.StringIO(raw)))
    daily = []
    for r in rows:
        v = r.get(series_id, "").strip()
        if not v:
            continue
        daily.append((r["observation_date"], float(v)))
    out = month_end_points(daily)
    out["source"] = "Federal Reserve Board H.10 (FRED)"
    out["seriesId"] = series_id
    out["quote"] = quote
    return out


def fetch_cop_trm() -> dict:
    cop_path = ROOT / "slides" / "data" / "cop-trm-monthly.json"
    if not cop_path.exists():
        raise FileNotFoundError("Run scripts/fetch-cop-trm.py first")
    data = json.loads(cop_path.read_text(encoding="utf-8"))
    data["seriesId"] = "Banrep-TRM"
    return data


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "meta": {
            "title": "Local currency strength vs USD (base 100 = first month in sample)",
            "indexFormula": "index_t = 100 * (rate_base / rate_t)",
            "interpretation": "Higher index = stronger local currency vs USD. If COP/USD rises, the peso weakens and index falls.",
            "disclaimer": "Educational deck data. Do not use for trading.",
            "bisVolatilityNote": "BIS WP 1340 Table 1 (Q2 2025) is a separate market; shown only on volatility slide.",
        },
        "series": {
            "CAD": fetch_boc_cad(),
            "MXN": fetch_fred_daily("DEXMXUS", "Mexican pesos per 1 USD"),
            "COP": fetch_cop_trm(),
        },
    }
    # Approximate COP from Fed alternative if Banrep empty: use IMF or embed minimal observed anchors
    # Document-only: speaker uses chart component with bundled fallback COP from BoC parallel? Skip.
    OUT.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
