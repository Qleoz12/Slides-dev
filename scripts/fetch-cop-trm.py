import json
import urllib.parse
import urllib.request
from collections import defaultdict
from pathlib import Path

# Socrata dataset search — try known Banrep open-data resources
CANDIDATES = [
    ("ceyp-9c7c", "valor", "vigenciadesde"),
    ("32sa-8pi3", "valor", "vigencia_desde"),
    ("mcec-87by", "valor", "vigencia_desde"),
]

root = Path(__file__).resolve().parents[1]
out_path = root / "slides" / "data" / "cop-trm-monthly.json"


def try_dataset(resource: str, value_field: str, date_field: str) -> list | None:
    base = f"https://www.datos.gov.co/resource/{resource}.json"
    query = urllib.parse.urlencode({"$limit": 50000, "$order": date_field})
    url = f"{base}?{query}"
    try:
        rows = json.loads(urllib.request.urlopen(url, timeout=60).read())
    except Exception as exc:
        print(resource, "failed", exc)
        return None
    if not rows:
        return None
    print(resource, "sample keys", rows[0].keys())
    daily = []
    for row in rows:
        d = row.get(date_field) or row.get("vigenciadesde") or row.get("fecha")
        v = row.get(value_field) or row.get("valor")
        if not d or not v:
            continue
        try:
            daily.append((d[:10], float(str(v).replace(",", ""))))
        except ValueError:
            continue
    by_month = defaultdict(list)
    for d, v in daily:
        by_month[d[:7]].append(v)
    months = sorted(m for m in by_month if "2020-01" <= m <= "2025-12")
    if not months:
        return None
    base = by_month[months[0]][-1]
    points = [
        {
            "date": m,
            "rate": round(by_month[m][-1], 2),
            "index": round(100 * base / by_month[m][-1], 2),
        }
        for m in months
    ]
    return {
        "source": f"datos.gov.co / Banrep open data ({resource})",
        "baseMonth": months[0],
        "baseRate": base,
        "quote": "COP per 1 USD (TRM)",
        "points": points,
    }


def main():
    for resource, vf, df in CANDIDATES:
        result = try_dataset(resource, vf, df)
        if result and result["points"]:
            out_path.write_text(json.dumps(result, indent=2), encoding="utf-8")
            print("Wrote", out_path, len(result["points"]), "months from", resource)
            return
    print("No COP dataset found — manual import required")
    out_path.write_text(
        json.dumps(
            {
                "status": "MISSING",
                "instruction": "Download TRM monthly from Banrep and run merge script",
            },
            indent=2,
        ),
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
