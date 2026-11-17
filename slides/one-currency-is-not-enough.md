---
theme: seriph
background: '#0f172a'
title: One Currency Is Not Enough
info: |
  ## One Currency Is Not Enough
  How International Students Can Protect Their Savings

  Langara College — Assignment 3 style deck
  Presenter: Leo (Colombian international student in Canada)
  Duration target: ~8:45

  Dev: `pnpm dev:deck -- one-currency-is-not-enough`
class: oc-hero
transition: slide-left
mdc: true
css: unocss
layout: cover
canvasWidth: 1120
---

<style global>
@import './styles/one-currency.css';
.slidev-layout.cover,
.slidev-layout.default,
.slidev-layout.center,
.slidev-layout.two-cols {
  background: radial-gradient(120% 90% at 10% 0%, #1e3a5f 0%, #0f172a 55%) !important;
  color: #f8fafc !important;
}
#slide-content,
.slidev-slide-content,
.slidev-page {
  filter: none !important;
}
</style>

<div class="grid grid-cols-2 gap-8 items-center h-full text-left">
<div>
<div class="oc-kicker">Langara · International students</div>

# One Currency Is Not Enough

<div class="text-xl oc-muted mt-4">How can we protect our savings across borders?</div>

<div class="mt-10 oc-muted">Leo · Colombian student in Canada</div>
</div>
<div>
<img src="./images/one-currency/budgeting.png" class="rounded-xl" style="max-height: 420px" />
</div>
</div>

<!--
Duration ~40s | Main message: personal hook + central question.
SCRIPT: Hi everyone, I'm Leo, and I'm from Colombia. When I moved to Canada for school, I learned that money in my home country does not automatically have the same purchasing power here. Today I ask: why keep all your savings in just one currency?
ANIMATION: Static cover — press Space.
NEXT: We name the currency mismatch students live with.
-->

---
layout: default
class: oc-slide
---

# Two kinds of money

<div class="grid grid-cols-2 gap-6 mt-2 text-left max-w-4xl mx-auto">
<div v-click class="oc-card oc-tight">
<img src="./images/one-currency/fiat.jpg" class="w-full rounded-lg mb-2" style="height: 150px; object-fit: cover" />
<div class="oc-kicker">Fiat money</div>
<div class="text-2xl font-bold">COP · CAD · USD</div>
<ul class="mt-2 oc-muted text-sm space-y-1 list-disc pl-4">
<li>Issued by a government and its central bank</li>
<li>Backed by trust, not gold: can lose value to inflation</li>
<li>Bank deposits can be insured (in Canada, by CDIC)</li>
</ul>
</div>
<div v-click class="oc-card oc-tight">
<img src="./images/one-currency/crypto.jpg" class="w-full rounded-lg mb-2" style="height: 150px; object-fit: cover" />
<div class="oc-kicker">Crypto money</div>
<div class="text-2xl font-bold">BTC · USDT</div>
<ul class="mt-2 oc-muted text-sm space-y-1 list-disc pl-4">
<li>Digital, on a blockchain, not issued by a government</li>
<li>USDT aims to stay at 1 US dollar; Bitcoin swings a lot</li>
<li>Not an insured deposit: you depend on the issuer</li>
</ul>
</div>
</div>

<div v-click class="mt-4 text-lg oc-accent font-semibold text-center">
Both are tools. Neither is risk-free.
</div>

<!--
Duration ~45s | Definitions so everyone shares the same words.
SCRIPT: Before we start, two definitions. Fiat money is what governments issue: pesos, Canadian dollars, US dollars. It is not backed by gold; its value depends on trust in the central bank, and it can lose value through inflation or a weaker exchange rate. Crypto money lives on a blockchain. Bitcoin moves a lot. Stablecoins like USDT try to stay at one US dollar, but they are not insured deposits. Both are tools, and neither is risk-free.
CLICKS: 3 — fiat card, crypto card, takeaway.
NEXT: A real example of what happens when everything sits in one place.
-->

---
layout: default
class: oc-slide
---

# What if your bank froze tomorrow?

<div class="grid grid-cols-5 gap-6 items-center text-left">
<div class="col-span-3 space-y-2">
<div v-click class="oc-card oc-tight"><svg width="30" height="18" viewBox="0 0 30 18" style="display:inline-block;vertical-align:-3px;margin-right:6px;border-radius:2px"><rect width="30" height="6" fill="#D52B1E"/><rect y="6" width="30" height="6" fill="#FFFFFF"/><rect y="12" width="30" height="6" fill="#0038A8"/><circle cx="15" cy="9" r="2.4" fill="none" stroke="#0038A8" stroke-width="0.8"/><circle cx="15" cy="9" r="0.9" fill="#F4C300"/></svg><span class="oc-kicker">Paraguay · November 2026</span><br/>The central bank seized <strong>Ueno Bank</strong>, a fast-growing digital bank.</div>
<div v-click class="oc-card oc-tight"><span class="oc-num-xl oc-num-down">2.9 million</span> <span class="oc-muted">customers, in a country of 6.1 million</span></div>
<div v-click class="oc-card oc-tight">Savings in limbo. Eight executives detained.</div>
<div class="oc-headline">“Paraguay seizes major digital bank tied to president, leaving millions of customers in limbo” <span class="oc-src">— AP, Nov 3, 2026</span></div>
</div>
<div class="col-span-2 flex justify-center">
<div class="oc-phone">
<div class="oc-phone-notch"></div>
<div class="oc-phone-app">My bank</div>
<div class="oc-phone-alert">⚠ ACCOUNT UNAVAILABLE</div>
<div class="oc-phone-label">Available balance</div>
<div class="oc-phone-bal">— — —</div>
<div class="oc-phone-btn">Transfer</div>
<div class="oc-phone-btn">Withdraw</div>
<div class="oc-phone-err">Suspended by the regulator.</div>
</div>
</div>
</div>

<div v-click class="mt-3 text-lg oc-accent font-semibold text-center">One bank, one currency, one app = one point of failure.</div>

<div class="oc-foot text-left">Illustration, not a real app screen. Sources: AP via KSAT (Nov 3, 2026); La Nación (Nov 2026); Forbes Argentina (Nov 2026).</div>

<!--
Duration ~45s | Hook: real, recent, close to home for Latin American students.
SCRIPT: Two weeks ago in Paraguay, the central bank took over Ueno, a digital bank with almost three million customers, about half the country. Overnight, people could not reach their savings. This was not a currency crash; it was a bank problem. But the lesson is the one I want to talk about today: when everything you own sits in one place (one bank, one currency) you have a single point of failure.
CLICKS: 4 (event, scale, consequence, lesson).
CAUTION: Stick to the facts; avoid political claims.
NEXT: The problem for international students.
-->

---
layout: default
class: oc-slide
---

# The problem: money across borders

<div class="grid grid-cols-3 gap-5 mt-4 items-center text-left">
<div class="oc-card oc-tight">
<div class="oc-kicker">I save in</div>
<div class="text-3xl font-bold mt-1">COP</div>
<div class="oc-muted text-sm mt-1">Family money, work at home, past savings.</div>
</div>
<div class="flex justify-center"><img src="./images/one-currency/money-dissolving.webp" class="rounded-xl" style="max-height: 190px" /></div>
<div class="oc-card oc-tight">
<div class="oc-kicker">I spend in</div>
<div class="text-3xl font-bold mt-1">CAD</div>
<div class="oc-muted text-sm mt-1">Rent, groceries, transit, daily costs.</div>
</div>
</div>

<div v-click class="mt-6 text-xl oc-accent font-semibold text-center">
The currency you save in may not be the currency you spend.
</div>

<div v-click class="oc-foot text-center mt-3">
<strong>Finding 1:</strong> exchange-rate moves change the real value of your savings, even if you spend nothing.
</div>

<!--
Duration ~55s | Audience: Langara international students — daily costs are in CAD.
SCRIPT: Many of us earn or hold money in one currency but pay living costs in another. That gap is called currency mismatch. Saving in pesos does not guarantee the same power when you spend in Canadian dollars here.
CLICK 1: reveal takeaway line.
CLICK 2: mention this is our first research finding — currency risk.
NEXT: Show real data for three currencies.
-->

---
layout: default
class: oc-slide
mdc: false
---

# Six currencies vs the US dollar — 2025

<div class="text-sm oc-muted mb-2">Research question: Can managing multiple currencies help protect savings from FX swings?</div>

<iframe src="./charts/six-currencies.html#slide-2025" class="block mx-auto rounded-lg border-0" style="width: 100%; max-width: 900px; height: 430px" title="Six currencies vs USD (2025)"></iframe>

<div class="oc-foot text-left max-w-4xl mx-auto">
Value of each currency in USD, index = 100 at the start of the year. Up = stronger. Source: fawazahmed0 exchange-api (daily reference rates), weekly snapshots.
</div>

<!--
Duration ~50s | Main message: currencies do not move together in 2025.
SCRIPT: Six currencies indexed against the US dollar for 2025. Each line shows whether that currency strengthened or weakened versus the dollar through the year. No click steps — walk through the chart once.
NEXT: Same view for 2026.
-->

---
layout: default
class: oc-slide
mdc: false
---

# Six currencies vs the US dollar — 2026

<div class="text-sm oc-muted mb-2">Research question: Can managing multiple currencies help protect savings from FX swings?</div>

<iframe src="./charts/six-currencies.html#slide-2026" class="block mx-auto rounded-lg border-0" style="width: 100%; max-width: 900px; height: 430px" title="Six currencies vs USD (2026)"></iframe>

<div class="oc-foot text-left max-w-4xl mx-auto">
Value of each currency in USD, index = 100 at the start of the year. Up = stronger. Source: fawazahmed0 exchange-api (daily reference rates), weekly snapshots.
</div>

<!--
Duration ~45s | Compare 2026 path to prior year.
SCRIPT: Same six currencies for 2026 so far — patterns can differ year to year.
NEXT: BIS volatility table (Q2 2025).
-->

---
layout: default
class: oc-slide
---

# How volatile is each currency?

<div class="oc-card max-w-3xl mx-auto mt-2">
<table class="oc-vol w-full">
<thead><tr><th class="text-left">Currency</th><th class="text-right">FX market<br/><span class="oc-muted text-xs">2024–2026</span></th><th></th><th class="text-right">USDT market<br/><span class="oc-muted text-xs">BIS, Q2 2025</span></th></tr></thead>
<tbody>
<tr><td><strong>CAD</strong> <span class="oc-muted">Canadian dollar</span></td><td class="text-right"><span style="color:#4ade80;font-weight:700">5.2%</span></td><td><div style="height:10px;border-radius:5px;width:62px;background:#4ade80"></div></td><td class="text-right oc-muted">7.27%</td></tr>
<tr><td><strong>CHF</strong> <span class="oc-muted">Swiss franc</span></td><td class="text-right"><span style="color:#4ade80;font-weight:700">7.9%</span></td><td><div style="height:10px;border-radius:5px;width:95px;background:#4ade80"></div></td><td class="text-right oc-muted">14.68%</td></tr>
<tr><td><strong>MXN</strong> <span class="oc-muted">Mexican peso</span></td><td class="text-right"><span style="color:#fbbf24;font-weight:700">10.9%</span></td><td><div style="height:10px;border-radius:5px;width:131px;background:#fbbf24"></div></td><td class="text-right oc-muted">11.36%</td></tr>
<tr><td><strong>CLP</strong> <span class="oc-muted">Chilean peso</span></td><td class="text-right"><span style="color:#fbbf24;font-weight:700">11.5%</span></td><td><div style="height:10px;border-radius:5px;width:138px;background:#fbbf24"></div></td><td class="text-right oc-muted">—</td></tr>
<tr><td><strong>COP</strong> <span class="oc-muted">Colombian peso</span></td><td class="text-right"><span style="color:#fbbf24;font-weight:700">11.9%</span></td><td><div style="height:10px;border-radius:5px;width:143px;background:#fbbf24"></div></td><td class="text-right oc-muted">12.25%</td></tr>
<tr><td><strong>BRL</strong> <span class="oc-muted">Brazilian real</span></td><td class="text-right"><span style="color:#f87171;font-weight:700">12.1%</span></td><td><div style="height:10px;border-radius:5px;width:145px;background:#f87171"></div></td><td class="text-right oc-muted">13.80%</td></tr>
</tbody>
</table>
<div class="oc-foot mt-2"><span style="color:#4ade80">● under 10%</span> &nbsp; <span style="color:#fbbf24">● 10–12%</span> &nbsp; <span style="color:#f87171">● over 12%</span></div>
</div>

<div class="oc-foot text-left max-w-3xl mx-auto">
FX market: annualized volatility of weekly changes vs USD, Mar 2024 – Nov 2026 (fawazahmed0 exchange-api). USDT market: Aldasoro, Beltran &amp; Grinberg (2026), BIS WP 1340, Table 1 — price of USDT on crypto exchanges, a different market.
</div>

<!--
Duration ~40s | Main message: CAD and CHF are the calm ones; Latin American currencies swing more.
SCRIPT: Volatility tells you how much a currency swings. In the normal FX market, the Canadian dollar and the Swiss franc are the calmest, under 10 percent a year. The Latin American currencies swing more. The right column is from a 2026 BIS paper that measures the price of USDT on crypto exchanges: same pattern for most, but the franc looks volatile there because that crypto market is small, not because the franc is risky.
NEXT: What research says about holding more than one currency.
-->

---
layout: default
class: oc-slide
---

# What does research say?

<div class="grid grid-cols-3 gap-4 mt-4 text-left">
<div v-click class="oc-card">
<div class="oc-kicker">IMF · 2006</div>
<div class="font-bold mt-2">Saving in dollars is rational</div>
<p class="oc-muted text-sm mt-2">In Latin America, households hold dollars as a response to inflation uncertainty, and the habit persists.</p>
<div class="oc-foot">Rennhack &amp; Nozaki, IMF WP/06/7</div>
</div>
<div v-click class="oc-card">
<div class="oc-kicker">Journal of Finance · 2010</div>
<div class="font-bold mt-2">Some currencies work as shields</div>
<p class="oc-muted text-sm mt-2">The US dollar, the euro and the Swiss franc tended to rise when world stock markets fell, so holding them lowered overall risk.</p>
<div class="oc-foot">Campbell, Serfaty-de Medeiros &amp; Viceira</div>
</div>
<div v-click class="oc-card">
<div class="oc-kicker">Our data · 2026</div>
<div class="font-bold mt-2">Timing costs real money</div>
<p class="oc-muted text-sm mt-2">Converting the same CAD 9,000 cost about <strong class="oc-num-down">COP 5.2M more</strong> in the worst week than in the best week.</p>
<div class="oc-foot">Weekly COP/CAD, Jan–Nov 2026</div>
</div>
</div>

<div v-click class="mt-6 text-lg oc-accent font-semibold text-center">
Holding more than one currency is about protection, not profit.
</div>

<!--
Duration ~60s | Evidence instead of personal strategy.
SCRIPT: This is not only my opinion. An IMF study found that Latin American families save in dollars as a rational answer to inflation uncertainty. A Journal of Finance paper showed that the dollar, the euro and the Swiss franc tended to rise when stock markets fell, so they reduce risk. And in our own data for 2026, converting the same nine thousand Canadian dollars cost five million pesos more depending on the week. Holding more than one currency is about protection, not about getting rich.
CLICKS: 3 cards + takeaway.
NEXT: Interest rates are not the whole story.
-->

---
layout: default
class: oc-slide
---

# High interest, lower value?

<div class="oc-kicker text-center mt-2">Scenario A · CAD 9,000 in a savings account during 2026 · measured in US dollars</div>

<div class="flex items-center justify-center gap-5 mt-6">
<div v-click class="oc-card text-center min-w-44">
<div class="oc-muted text-xs">January 2026</div>
<div class="oc-num-xl">CAD 9,000</div>
<div class="text-sm oc-muted">= USD 6,555</div>
</div>
<div v-click class="text-center">
<div class="oc-num-xl oc-num-up">+2.5%</div>
<div class="text-xs oc-muted">interest</div>
<div class="oc-num-xl oc-num-down mt-2">−3.8%</div>
<div class="text-xs oc-muted">CAD vs USD</div>
</div>
<div v-click class="oc-card text-center min-w-44">
<div class="oc-muted text-xs">November 2026</div>
<div class="oc-num-xl">CAD 9,225</div>
<div class="text-sm oc-num-down font-bold">= USD 6,464</div>
</div>
</div>

<div v-click class="mt-6 text-center text-lg">
More Canadian dollars, but <strong class="oc-num-down">−1.4%</strong> in US dollars.
</div>

<div v-click class="oc-foot text-center">
<strong>Finding 2:</strong> interest alone does not protect value when the currency moves. The value depends on the currency you will spend.
2.5% is a hypothetical savings rate; CAD/USD 1.373 → 1.427 (Jan 3 – Nov 14, 2026, fawazahmed0 exchange-api).
</div>

<!--
Duration ~50s | Main message: interest + FX interact.
SCRIPT: Imagine nine thousand Canadian dollars in a savings account this year. You earn two and a half percent, so you end with 9,225. Good. But the Canadian dollar lost almost four percent against the US dollar. Measured in US dollars, you went from 6,555 to 6,464: about one and a half percent less. If you will spend in Canada, that is fine. If you will spend in US dollars, you lost value. What matters is the currency you will spend.
CLICKS: 5 (start, arrows, end, result, finding).
NEXT: Scenario B — the same money, starting in US dollars.
-->

---
layout: default
class: oc-slide
---

# Scenario B: half and half, move 25%

<div class="oc-kicker text-center mt-1 text-xs">Same CAD 9,000 · rebalance 25% only at the extremes</div>

<div class="grid gap-3 max-w-4xl mx-auto mt-5">
<div v-click class="oc-card oc-tight flex items-center gap-4 text-left">
<div class="w-52"><div class="oc-kicker text-xs">Start · Jan 3</div><div class="oc-muted text-xs">rate 1.373</div></div>
<div class="text-xl font-bold w-36 text-right">CAD 4,500</div>
<div class="oc-accent text-xl">+</div>
<div class="text-xl font-bold w-36 ">USDT 3,277</div>
<div class="ml-auto oc-muted text-sm">half in each currency</div>
</div>
<div v-click class="oc-card oc-tight flex items-center gap-4 text-left">
<div class="w-52"><div class="oc-kicker text-xs">Move 1 · Feb 11</div><div class="oc-muted text-xs">CAD strong · 1.3526</div></div>
<div class="text-xl font-bold w-36 text-right">CAD 1,128</div>
<div class="oc-accent text-xl">→</div>
<div class="text-xl font-bold w-36 oc-num-up">USDT 834</div>
<div class="ml-auto oc-muted text-sm">sell 25% of the CAD</div>
</div>
<div v-click class="oc-card oc-tight flex items-center gap-4 text-left">
<div class="w-52"><div class="oc-kicker text-xs">Move 2 · Nov 14</div><div class="oc-muted text-xs">CAD weak · 1.4271</div></div>
<div class="text-xl font-bold w-36 text-right">USDT 1,028</div>
<div class="oc-accent text-xl">→</div>
<div class="text-xl font-bold w-36 oc-num-up">CAD 1,467</div>
<div class="ml-auto oc-muted text-sm">sell 25% of the USDT</div>
</div>
</div>

<div v-click class="mt-4 text-center text-lg">
Rule: <strong>sell what is expensive, buy what is cheap</strong>, a little at a time.
</div>

<div class="oc-foot text-center">
Rates: daily reference, fawazahmed0 exchange-api. Feb 11 and Nov 14 are the 2026 extremes, so this is the best case (perfect timing, known only afterwards).
2.5% interest on the CAD part, pro-rated; 0% yield on USDT; no fees or spread; USDT is not an insured deposit.
</div>

<!--
Duration ~60s | Main message: hold both currencies and move a little at the extremes.
SCRIPT: Now the balanced way. I split my nine thousand Canadian dollars: half stays in Canadian dollars in a savings account, half goes to US dollars: 3,277 USDT. My rule is simple: I only move 25 percent, and only at an extreme. On February 11 the Canadian dollar was at its strongest of the year, so I sell 25 percent of my Canadian dollars: 1,128 become 834 USDT. On November 14 it was at its weakest, so I do the opposite: I sell 25 percent of my USDT, 1,028, and get 1,467 Canadian dollars. I always sell what is expensive and buy what is cheap. To be honest: these are the extremes of the year, so this is the best case; in real life you only know the extreme afterwards.
CLICKS: 4 (start, move 1, move 2, rule).
NEXT: Compare the three strategies.
-->

---
layout: default
class: oc-slide
---

# Which strategy protects best?

<div class="oc-kicker text-center mt-1">CAD 9,000 on Jan 3 · value on Nov 14, 2026</div>

<div class="oc-card max-w-4xl mx-auto mt-5">
<table class="oc-vol w-full text-lg">
<thead><tr><th class="text-left">Strategy</th><th class="text-right">In CAD</th><th class="text-right">In USD</th></tr></thead>
<tbody>
<tr v-click><td><strong>A</strong> · All in CAD savings (2.5%)</td><td class="text-right">9,225</td><td class="text-right oc-num-down font-bold">6,464 (−1.4%)</td></tr>
<tr v-click><td><strong>B0</strong> · All in USDT, do nothing</td><td class="text-right oc-num-up font-bold">9,355 (+3.9%)</td><td class="text-right">6,555 (0%)</td></tr>
<tr v-click><td><strong>B</strong> · Half and half, 25% moves</td><td class="text-right oc-num-up font-bold">9,328 (+3.6%)</td><td class="text-right font-bold">6,536 (−0.3%)</td></tr>
</tbody>
</table>
</div>

<div v-click class="mt-5 text-center">
<div class="text-lg">This year the US dollar won, so B0 came first. If the CAD had gone up, B0 would have come last.</div>
<div class="text-xl oc-accent font-semibold mt-2">The balanced mix is never the worst, and close to the best, in either currency.</div>
</div>

<div class="oc-foot text-center">
Half and half without any moves: CAD 9,290 / USD 6,510. The 25% moves added CAD 38. Same assumptions as the previous slide.
</div>

<!--
Duration ~45s | Main message: balance beats guessing.
SCRIPT: Here are the three strategies side by side. All in Canadian dollars lost value in US dollars. All in USDT won this year, because the US dollar went up, but if the Canadian dollar had gone up instead, it would be last. The half-and-half mix beats the savings account in both currencies and stays close to the best. That is the point: you do not need to predict the market. You need a balance.
CLICKS: 4 (A, B0, B, takeaway).
NEXT: Conversion channels.
-->

---
layout: default
class: oc-slide
---

# Cheaper, legal ways to move and hold money

<div class="oc-kicker text-center mt-1 text-xs">Options available to international students in most countries</div>

<div class="oc-card oc-tight max-w-5xl mx-auto mt-3">
<table class="oc-vol w-full text-sm">
<thead><tr><th class="text-left">Option</th><th class="text-left">Best for</th><th class="text-left">Typical cost</th><th class="text-left">Protection</th></tr></thead>
<tbody>
<tr v-click><td><strong>Bank transfer</strong></td><td>Sending abroad</td><td class="oc-num-down">Most expensive: ~15% on US$200</td><td>Insured deposit</td></tr>
<tr v-click><td><strong>Digital transfer app</strong> <span class="oc-muted">(Wise, Remitly…)</span></td><td>Sending abroad</td><td>~3.5% on US$200; Wise from 0.57%</td><td class="oc-muted">Licensed, funds safeguarded</td></tr>
<tr v-click><td><strong>Multi-currency account</strong> <span class="oc-muted">(Wise, Revolut)</span></td><td>Hold USD / EUR, convert when you choose</td><td>Free to hold · ~0.5% to convert</td><td class="oc-muted">Safeguarded, not deposit insurance</td></tr>
<tr v-click><td><strong>USD bank account</strong> <span class="oc-muted">(where you study)</span></td><td>Hold dollars safely</td><td class="oc-num-up">Often no fee · can earn interest</td><td class="oc-num-up">Deposit insurance (e.g. CDIC)</td></tr>
<tr v-click><td><strong>USDC</strong> <span class="oc-muted">stablecoin</span></td><td>Dollars on crypto</td><td>Spread + network fees</td><td class="oc-muted">Not insured · authorised in EU</td></tr>
<tr v-click><td><strong>USDT</strong> <span class="oc-muted">stablecoin</span></td><td>Dollars on crypto</td><td>Spread + network fees</td><td class="oc-num-down">Not insured · off regulated exchanges in EU and Canada</td></tr>
</tbody>
</table>
</div>

<div v-click class="mt-3 text-center text-lg oc-accent font-semibold">
Legal almost everywhere, but the rules change by country. Insured first, crypto second.
</div>

<div class="oc-foot max-w-5xl mx-auto text-left">
<strong>Finding 3:</strong> the channel changes how much arrives; compare the net amount at the same moment.
World average to send US$200: 6.4%; digital-only services ~3.5% vs banks ~15% (World Bank, Remittance Prices Worldwide, 2025). Wise fees as published (2026).
USDT left MiCA-licensed EU exchanges on Jul 1, 2026, and registered Canadian platforms in 2023; USDC is authorised under MiCA. Declare crypto and foreign accounts where you pay tax.
</div>

<!--
Duration ~70s | Main message: cheaper legal channels exist everywhere; insured options first.
SCRIPT: How do you move and hold money cheaply and legally, wherever you study? A bank transfer is the most expensive: on two hundred dollars, banks charge around fifteen percent on average, according to the World Bank. Digital apps like Wise or Remitly average about three and a half percent. To hold dollars or euros and convert when the rate is good, a multi-currency account like Wise or Revolut is cheap, but it is not deposit insurance. A US dollar account at a bank where you study can be free, pay interest, and be insured. Then stablecoins: USDC and USDT. USDT is my personal reference and it is legal in most places, but it was removed from regulated exchanges in the European Union this July and in Canada in 2023. USDC is the one authorised in Europe. So my rule: insured first, crypto second, and declare it where you pay tax.
CLICKS: 7 (six rows + takeaway).
CAUTION: Fees change; check live quotes before presenting numbers as current.
NEXT: Where to keep a large amount.
-->

---
layout: default
class: oc-slide
---

# Where do people keep their savings?

<div class="grid grid-cols-5 gap-3 mt-1 text-center">
<div class="oc-card oc-tight"><div class="text-2xl">🏦</div><div class="font-bold">Nubank</div><div class="oc-muted text-xs">One bank, one currency.</div></div>
<div class="oc-card oc-tight"><div class="text-2xl">📄</div><div class="font-bold">CDT</div><div class="oc-muted text-xs">Known rate, money locked.</div></div>
<div class="oc-card oc-tight"><div class="text-2xl">🍁</div><div class="font-bold">TFSA</div><div class="oc-muted text-xs">Tax-free, in CAD.</div></div>
<div class="oc-card oc-tight"><div class="text-2xl">🐄</div><div class="font-bold">Cows</div><div class="oc-muted text-xs">Real asset, hard to sell fast.</div></div>
<div class="oc-card oc-tight"><div class="text-2xl">📱</div><div class="font-bold">iPhone</div><div class="oc-muted text-xs">Not savings: loses value.</div></div>
</div>

<div v-click class="mt-3 oc-card oc-tight max-w-4xl mx-auto text-left">
<div class="font-semibold">Class challenge: you want to move and hold <strong>CAD 9,000</strong> for a few months. Where?</div>
<div class="grid grid-cols-3 gap-3 mt-2 text-sm">
<div><strong>A. Traditional bank</strong><div class="oc-muted text-xs">Simple and insured, higher fees and spread</div></div>
<div><strong>B. USDT</strong><div class="oc-muted text-xs">Flexible, follows the US dollar, not insured</div></div>
<div><strong>C. Split</strong><div class="oc-muted text-xs">Part in each</div></div>
</div>
</div>

<div v-click class="mt-3 text-center">
<div class="text-xl oc-accent font-semibold">Match the currency you spend. Spread the rest.</div>
<div class="oc-muted text-sm mt-1">Protecting your savings beats predicting the market · Thank you! Questions?</div>
</div>

<!--
Duration ~1:20 | Closing slide with audience participation.
SCRIPT: Where do people keep savings? A digital bank like Nubank, a CDT, a TFSA here in Canada, cows back home, or, let's be honest, an iPhone, which is not savings at all. Each one has a currency, a risk and a level of liquidity. Quick challenge: you want to move and hold nine thousand Canadian dollars for a few months. A, B or C? Show of hands. A traditional bank is simple and your deposit is insured, but transfers and conversions usually cost more in fees and spread. USDT is flexible: you can convert when the rate is good, and it follows the US dollar. This year the Canadian dollar lost almost four percent against the US dollar, so a dollar-linked balance kept more value. But if the Canadian dollar gets stronger, the opposite happens, and USDT is not an insured deposit. That is why many people split. So my closing advice: match the currency you will spend, and spread the rest. Protecting your savings is more important than predicting the market. Thank you. Questions?
CLICKS: challenge, closing.
-->

---
layout: default
class: oc-slide
---

# References (APA 7)

<div class="text-xs text-left max-w-4xl mx-auto space-y-2 oc-muted">
<p>Aldasoro, I., Beltran, G. A., & Grinberg, F. (2026). <em>Stablecoin flows and spillovers to FX markets</em> (BIS Working Papers No. 1340). Bank for International Settlements. https://www.bis.org/publ/work1340.htm</p>
<p>Campbell, J. Y., Serfaty-de Medeiros, K., &amp; Viceira, L. M. (2010). Global currency hedging. <em>The Journal of Finance, 65</em>(1), 87–121.</p>
<p>Rennhack, R., &amp; Nozaki, M. (2006). <em>Financial dollarization in Latin America</em> (IMF Working Paper No. 06/7). International Monetary Fund.</p>
<p>Fawaz Ahmed. (2026). <em>exchange-api: Free currency exchange rates API</em> [Data set]. https://github.com/fawazahmed0/exchange-api</p>
<p>Associated Press. (2026, November 3). Paraguay seizes major digital bank tied to president, leaving millions of customers in limbo. KSAT.</p>
<p>DLA Piper. (2026, April 20). <em>Canada enacts framework to regulate stablecoin in Bill C-15</em>. https://www.dlapiper.com/en/insights/publications/2026/04/canada-enacts-framework-to-regulate-stablecoin-in-bill-c15</p>
<p>EQ Bank. (n.d.). <em>US Dollar Account fees &amp; features</em>. https://eqbank.ca/personal-banking/savings/usd/us-dollar-account-fees-features</p>
<p>World Bank. (2025). <em>Remittance Prices Worldwide</em> (Issue 53). https://remittanceprices.worldbank.org</p>
<p>The Paypers. (2026). <em>Tether exits EU market as MiCA rules block USDT from exchanges</em>. https://thepaypers.com/</p>
<p>Wise. (2026). <em>Pricing and fees</em>. https://wise.com/pricing</p>
<p>Bank of Canada. (n.d.). <em>FXUSDCAD — External nominal indexes, daily</em> (Valet API). https://www.bankofcanada.ca/valet/</p>
<p>Banco de la República. (n.d.). <em>Representative market exchange rate (TRM)</em> [Data set]. datos.gov.co resource ceyp-9c7c. https://www.datos.gov.co/</p>
<p>Board of Governors of the Federal Reserve System. (n.d.). <em>Foreign exchange rates — H.10</em> (FRED series DEXMXUS). https://fred.stlouisfed.org/series/DEXMXUS</p>
</div>

<!--
Optional ~30s if time remains — otherwise skip.
-->