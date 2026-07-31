# Phone Setup — 15 minutes, one time

Everything below is done on your phone. No laptop, no terminal, no code.

---

## Step 1 — Create the Claude Project (5 min)

A Project gives Claude permanent memory of your rules, so you never re-explain them.

1. Open the **Claude app** → tap the menu → **Projects** → **+ New Project**
2. Name it: `Stock Helper`
3. Tap **Add content / Project knowledge** and add these two files from this repo:
   - `trading/RULES.md`  ← the important one
   - `trading/templates/journal.md`

   *Easiest way to get them onto your phone:* open this repo on GitHub in your phone
   browser, tap the file, tap **Raw**, select-all, copy — then paste into the project
   knowledge as text. Or download and upload the files directly.

4. Set the Project's **custom instructions** to:

```
You are my trading analyst and risk officer. RULES.md in project knowledge is binding.

Always:
- Enforce every rule in RULES.md. If a proposed trade breaks one, say which one and refuse to size it.
- Show the position-size math explicitly: shares = $20 / (entry - stop).
- Flag earnings dates within 10 trading days as a blocker.
- Be blunt about weak setups. "No trade" is the most common correct answer.

Never:
- Tell me to buy or sell a specific stock. Analyze and check rules; I decide.
- Predict prices or targets beyond the mechanical rules in RULES.md.
- Soften a rule violation because the setup looks good.

Account: $1,000. Risk per trade: $20. Max 4 positions. Max heat $60.
```

**That's the core of the whole system.** Everything else is optional convenience.

---

## Step 2 — Add the free market data connector (3 min)

This lets Claude look up real quotes, fundamentals and earnings dates itself.

1. Get a free API key: **[alphavantage.co/support/#api-key](https://www.alphavantage.co/support/#api-key)**
   (email + name, instant, no card)
2. In your phone browser go to **claude.ai → Settings → Connectors → Add custom connector**
3. Paste this URL, with your key at the end:

```
https://mcp.alphavantage.co/mcp?apikey=YOUR_KEY_HERE
```

4. Enable it for the `Stock Helper` project.

**Free tier = 25 calls/day.** That's enough for a handful of ticker lookups per day if
you're deliberate. Don't burn it asking Claude to scan 50 stocks — screen first (Step 3),
then ask Claude about the 3–5 that survive.

*Optional upgrade later:* Massive/Polygon Starter (~$29/mo) if 25 calls/day becomes the
bottleneck. At a 1–2 month holding period you do **not** need real-time data — skip it.

---

## Step 3 — Save your screener (3 min)

Finviz free works fine in a phone browser and does the mechanical filtering, so Claude
only has to think about a handful of names.

1. Open **[finviz.com/screener.ashx](https://finviz.com/screener.ashx)** in your phone browser
2. Or just use this pre-built screen matching RULES.md Section 5 — bookmark it:

```
https://finviz.com/screener.ashx?v=111&f=cap_smallover,sh_avgvol_o1000,sh_price_o5,ta_sma200_pa,ta_sma50_pa,ta_highlow52w_b0to25h&ft=4&o=-perfytd
```

That filters for: price > $5, volume > 1M/day, above the 50-day and 200-day MAs, within
25% of the 52-week high — sorted by year-to-date performance.

3. **Add to Home Screen** so it's one tap.

The screen typically returns 20–80 names. You paste the top 10 tickers into Claude.

---

## Step 4 — Broker (5 min)

You need **zero commissions + fractional shares**. On $250 positions, commissions are fatal.

| Broker | Fractional | Notes |
|---|---|---|
| **Fidelity** | ✅ | Good phone app, solid fills, no gimmicks. Best default |
| **Schwab** | ✅ | Same tier as Fidelity |
| **Alpaca** | ✅ | Only pick this if you'll later automate — it has a free API and paper account |
| **Robinhood** | ✅ | Easiest app; no public stocks API; be aware the UI is designed to make you trade more |

**Whichever you pick: place the stop-loss order at the same time as the buy order.** Most
apps support a bracket or "buy + stop" flow. If yours doesn't, place the stop immediately
after the fill — before you close the app.

---

## Step 5 — Bookmark the calculator (1 min)

**Hosted (easiest):** open https://claude.ai/code/artifact/7d1a66b3-e609-4a91-ab9a-3c1e865b2d7a
Or open `trading/calculator.html` from this repo. Then →
**Share → Add to Home Screen.** It works offline and does the sizing math plus the
pre-trade checklist in one screen.

---

## Step 6 — Install the six skills (5 min, recommended)

Six custom skills live in this repo at `trading/skills/dist/` as ready-to-upload
zip files. They teach Claude your exact workflow so one word triggers the whole
procedure ("run the market gate", "plan NVDA", "log this trade").

1. Open this repo on GitHub in your phone browser → `trading/skills/dist/`
2. Download each `.zip` (tap the file → ⋯ menu → Download)
3. Go to **claude.ai → Settings → Skills → Upload skill** and upload all six
4. They now work in your `Stock Helper` project automatically

| Skill | Trigger it with |
|---|---|
| market-regime-gate | "run the market gate" |
| screen-candidates | "screen these: [tickers]" |
| breakout-trade-planner | "plan [TICKER]" |
| pre-trade-check | "check this trade: [entry/stop]" |
| trade-journal | "log this trade" / "I sold X" |
| weekly-review | "weekly review" + paste journal |

These are built to your RULES.md, so they enforce the $20 risk / 4 positions /
$60 heat numbers. If your account size ever changes, update RULES.md in your
project knowledge — the skills defer to it.

*Want more?* They're modeled on the community pack
[tradermonty/claude-trading-skills](https://github.com/tradermonty/claude-trading-skills)
(60+ skills, MIT license) — browse it on your phone if you want extras like the
CANSLIM screener or signal postmortems. Skip anything options- or day-trading
related; your rules ban both.

---

## You're set. The daily loop:

**Evening (5 min):** tap the Finviz bookmark → copy the top ~10 tickers → open the
Claude project → paste the "Evening screen" prompt from [PROMPTS.md](PROMPTS.md).

**Morning (5 min):** paste the "Market gate" prompt. If green and you have a setup from
last night, place the order + stop. Log it.

**Sunday (15 min):** paste the "Weekly review" prompt with your journal.

---

## First two weeks: paper trade

Do not put real money in until you've run the full loop for 10 trades on paper.
Write them in the journal exactly as if they were real — entry, stop, size, thesis,
and the actual exit. If you can't follow the rules when it's fake, real money makes it
worse, not better.

Track it in a notes app or the journal template. Alpaca's free paper account does this
automatically if you went that route.
