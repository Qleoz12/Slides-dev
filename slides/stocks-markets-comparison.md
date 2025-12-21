---
theme: seriph
background: https://cover.sli.dev
title: Dividend Yield vs Drawdown
info: |
  ## Dividend Yield vs Drawdown  
  A simple, reproducible way to compare income and risk across markets.

  **Dann Brown**  
  Senior Full-Stack Software Developer  
  Data Analytics · Python · Finance

  🔗 LinkedIn · GitHub · YouTube
class: text-center
transition: slide-left
mdc: true
---

# 📈 Dividend Yield vs Drawdown  
### A Simple Approach to Compare Stocks

---

## 👋 About Me

**Dann Brown**  
Senior Full-Stack Software Developer  

- Background in **systems engineering & learning data analytics**
- Focused on **financial data**, reproducible analysis, and real-world investing
- Learning and building **daily**

This presentation summarizes a **blog post + Jupyter notebook**  
that is still evolving.

---

## 🎯 Motivation

I wanted to answer a very simple question:

> **How do I compare high-dividend stocks without ignoring real risk?**

Most analyses focus on only one side:

- ✅ Dividend Yield range between 
- ❌ Ignoring how much capital can be lost also known as **drawdown**.

But as investors, **risk is experienced as drawdowns**, not averages.
also we face lose value of the capital called as Capital Erosion

#### https://www.myjar.app/blog/financial-education/what-is-capital-erosion-and-how-does-it-affect-your-savings

---

## 📉 The risk variables

Traditional risk metrics .
- Volatility (std dev) as beta
- downdrawdown peaks as maximum drawdown
- Value at Risk (VaR)
- EBITDA 

etc.

---

## 🧠 Design Philosophy

Just **real data + clear rules**.

Instead of complex models or forecasts, I chose:

- ✅ **Simple**
- ✅ **Transparent**
- ✅ **Reproducible**

No black boxes.  
No over-optimization.

---

## 🧠 Design Philosophy

Just **real data + clear rules**.

A company with high leverage but weak earnings is **fundamentally riskier** than one with stable profits and manageable debt.

As **Benjamin Graham** advises in *The Intelligent Investor*, the margin of safety comes from understanding how earnings support debt and valuation — not from short-term trading...

---

## 🧠 Design Philosophy

Just **real data + clear rules**.
- investment time horizon: small-medium (2 years) postdegree time
- search stock with average drawdown below a threshold **20%**
- search stock with high dividend yield above a threshold **6%**
- compare stocks from different exchanges with these criteria
- capture several stock/etfs in diferent sectors to have a **diversified portfolio**
  
---

## 📦 Dataset Collection

I unified datasets from three exchanges:
 
- **NYSE**  get from repo at github
- **TSX** captured at https://www.tsx.com/
- **LSE** captured at https://www.londonstockexchange.com/

For each exchange:

- `*_features.csv` → price, volatility, drawdown
- `*_div_events.csv` → dividends, payments, frequency

---

## 🔧 Data Preparation Workflow

The workflow was intentionally simple:

1. Read CSV files
2. Clean inconsistent columns (fix str add info yfinance)
3. Unify schemas but also keep separete by exchange
4. Merge into a single dataframe

* keep dividends history df separate for futher investigations
  
🎯 **Goal**:  
A *homogeneous* dataset — not perfect, but good enough to compare markets.

---
layout: image
class: text-center
image: https://raw.githubusercontent.com/Qleoz12/Slides-dev/refs/heads/master/funnyPictures/mr-robot.webp
---

<div style="background: rgba(0, 0, 0, 0.6); padding: 2rem; border-radius: 1rem; display: inline-block;">
  <div style="font-size: 2.5rem; font-weight: bold; color: #ffe600; margin-bottom: 0.5rem;">
    😅 After simple ploting
  </div>
  <div style="font-size: 2rem; font-weight: 500; color: #ffffff;">
    we can see som trends by market and after applied our rules.
  </div>
</div>
```python
df = df[df["max_drawdown"] >= -0.20]  #max drawdown less than 20%
yield_cut = df["div_yield_ttm"].quantile(0.50) # cut yield over median
df = df[df["div_yield_ttm"] >= yield_cut]
df.sort_values("score").head(100)

```
---

## 🧩 Visualization by market

<div class="grid grid-cols-1 gap-6 items-center">
  <div class="text-center">
    <img src="https://qleoz12.github.io/assets/images/graphs/zscores.png" style="max-height: 380px; width: 100%; object-fit: contain;" />
    <div class="mt-2 font-bold">Z-Scores</div>
  </div>
</div>

---


## 🧩 Visualization by drawdown

<div class="grid grid-cols-1 gap-6 items-center">
  <div class="text-center">
    <img src="https://qleoz12.github.io/assets/images/graphs/violines.png" style="max-height: 380px; width: 100%; object-fit: contain;" />
    <div class="mt-2 font-bold">Z-Scores</div>
  </div>
</div>

---

## 📊 Visualization — Drawdowns

### Max Drawdown Distribution by Exchange

This chart shows:

- Where risk is concentrated
- Which markets have longer loss tails
- How often high yield comes with deep drawdowns


---


## 🧩 Visualization market vs drawdown by Market

<div class="grid grid-cols-2 gap-6 items-center">
  <div class="text-center">
    <img src="https://qleoz12.github.io/assets/images/graphs/zscores.png" style="max-height: 380px; width: 100%; object-fit: contain;" />
    <div class="mt-2 font-bold">Z-Scores</div>
  </div>

  <div class="text-center">
    <img src="https://qleoz12.github.io/assets/images/graphs/ddmaxdrawdown.png" style="max-height: 380px; width: 100%; object-fit: contain;" />
    <div class="mt-2 font-bold">Max Drawdown</div>
  </div>
</div>

---

## 📈 Visualization — Yield vs Risk

This second chart reinforces a key idea:

- ❌ Not all high yields are equal
- 📊 Market context matters
- ⚖️ Risk is priced differently across exchanges

---

## NYSE — Key Findings

- Highest **average dividend yield**
- Controlled dispersion (not driven by outliers)
- Lower average drawdowns

➡️ Strong balance between **income and capital protection**

---

## TSX — A Different Role

TSX showed:

- Lower average yields
- Higher structural stability
- Exposure to defensive sectors:
  - Financials
  - Energy
  - Infrastructure

➡️ Less growth, but **useful as a risk anchor**

---

## LSE — Higher Risk Tails

LSE data revealed:

- Longer drawdown tails
- Higher exposure to adverse scenarios
- More dispersion in outcomes

➡️ Attractive cases exist, but **selection matters more**

---

## 🧠 Practical Investor Insights

From a realistic perspective:

- NYSE works well for **short & medium-term income**
- Liquidity and market depth matter
- No single market should dominate a portfolio satellites-cores

Diversification is not optional — it’s **structural**.

---

## 🧱 Portfolio Construction Insight

- 🇺🇸 **NYSE** → Income engine
- 🇨🇦 **TSX** → Stability anchor
- 🇬🇧 **LSE** → Selective opportunities

Each market plays a **different role**, not a competition.

---

## ✅ Final Takeaways

- NYSE combines **higher income + lower losses**
- TSX sacrifices yield for **defensive stability**
- LSE requires **careful filtering**

There is no “best exchange” — only **appropriate allocation**.

---

## 📓 Reference Notebook

The full analysis is fully reproducible.

👉 **Notebook on GitHub**  
https://github.com/Qleoz12/pythonKnowledge/blob/main/dataAnalitics/tsx.ipynb

---

## 📚 References

- *Python for Finance & Algorithmic Trading* — Quantreo  
- Yves Hilpisch — *Python for Finance* (O’Reilly)
- Personal analysis & datasets

---