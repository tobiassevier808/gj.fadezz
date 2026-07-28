---
name: screen-candidates
description: Evaluate a list of stock tickers against the swing-trading entry criteria and return a ranked, tradeable shortlist with entry, stop, and position size. Use when the user pastes screener output, a list of tickers, or asks which stocks on a list are worth watching.
---

# Screen Candidates

Turn a raw screener list into a short, honest watchlist. Most names should be rejected.

## Procedure

1. Read `trading/RULES.md` §4 and §5 for the current gate and entry criteria.
2. **Check the market regime gate first.** If RED, say so up front — the correct output
   is a watchlist with a note that no new longs are permitted, not a list of buys.
3. For each ticker, verify the 7 entry criteria. Use the Alpha Vantage connector or web
   search for real data; **never estimate a price, moving average, or earnings date from
   memory.** If you can't get real data for a ticker, mark it UNVERIFIED and exclude it.
4. Reject aggressively. Typical output from a 10-ticker input is 1–3 survivors, often 0.
5. For survivors, identify the pivot (the level a breakout would clear), the logical stop
   below it, and compute size: `shares = 20 ÷ (entry − stop)`.

## Output format

Keep it phone-readable. One block per ticker, no essays.

```
MARKET GATE: GREEN/RED — [one line]

── READY ──────────────────────
TICKER  $XX.XX
  ✅ Above 50d/200d, 200d rising
  ✅ 12% below 52w high, 68% above low
  ✅ RS: +14% vs SPY (3mo)
  ✅ Base: 3 tightening pullbacks, volume drying up
  ✅ Pivot $XX.XX, stop $XX.XX (−7.1%)
  ✅ Earnings 2026-09-12 (42 days out)
  ✅ Sector: semis, #2 of 11 this month
  → 5.13 sh / $268 / risk $20.  Grade A

── BUILDING ───────────────────
TICKER — base needs another week of tightening

── REJECTED ───────────────────
TICKER — earnings in 6 days
TICKER — stop would be 14% away
TICKER — avg volume 400k, below the 1M floor
```

Close with a one-line verdict: how many are actually tradeable, and if zero, say
"No trades tonight" plainly.

## Hard constraints

- Do not manufacture candidates to fill the list. Zero is a valid and common answer.
- Do not rank on "potential" or narrative — rank on how cleanly the criteria pass.
- Flag any ticker that has been in a retail hype cycle (Reddit/TikTok/YouTube) in the
  last week as an automatic reject per RULES.md §3.
- You are not recommending purchases. You are filtering a list against written criteria.
