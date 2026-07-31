---
name: breakout-trade-planner
description: Turn a screened stock into a complete written trade plan — pivot level, stop placement, position size, targets, and earnings check. Use when the user names a ticker they're considering buying, asks to "plan this trade", or after a screening pass produces a candidate worth acting on.
---

# Breakout Trade Planner

Convert "this stock looks good" into a complete plan with every number decided
**before** entry. A trade without a written plan is a gamble with extra steps.

## Inputs

- Ticker. Get current price, recent daily bars, moving averages, and average volume
  from the market data connector or web search — **never from memory**.
- The user's current open positions and heat (ask if not stated).
- Account basis: $1,000 account, $20 risk per trade, unless RULES.md says otherwise.

## Procedure

1. **Confirm the gate.** If the market regime gate hasn't been run today, run it
   first (market-regime-gate skill). RED gate = stop here, no plan.
2. **Find the base and pivot.** Identify the consolidation: how deep, how long, and
   whether pullbacks are tightening (e.g., 15% → 9% → 5%) on declining volume. The
   pivot is the price that clears the base's resistance. If there is no clean base
   or the stock is 5%+ past the pivot already, the answer is **"no plan — not
   buyable here"**: either the base needs more time or the entry is gone.
3. **Place the stop.** At a logical chart level below the pivot (below the handle
   low or most recent higher low) — capped at 8% below entry, or 2×ATR(14),
   whichever is tighter. If the logical level is more than 8% away, no plan —
   the base is too loose for this account.
4. **Size it.** shares = $20 ÷ (entry − stop). Position must land between $50 and
   $300; cap at $300 and state the reduced risk if needed. Show the arithmetic.
5. **Set the exits before entry:** sell half at +15% and move stop to breakeven;
   trail the rest at the prior week's low or 3×ATR below the highest high; time
   stop at 10 weeks; exit or halve before any confirmed earnings date.
6. **Verify earnings.** Confirmed date, from the company's investor-relations page
   or a primary source. Inside 10 trading days = blocker, no plan.
7. **Write the thesis.** One sentence why this, one sentence what proves it wrong.
   If these can't be written crisply, there is no trade.

## Output format

```
TRADE PLAN — TICKER (YYYY-MM-DD)

Base:     [depth/length, tightening? one line]
Pivot:    $XX.XX     Buy zone: pivot to +2%
Stop:     $XX.XX     (−X.X%, at [level])
Shares:   X.XX       ($XXX position, XX% of account, $20 risk)
Exits:    +15% sell half → stop to B/E → trail weekly low
Earnings: YYYY-MM-DD (XX trading days out) — OK/BLOCKER
Thesis:   [one sentence]
Kills it: [one sentence]

Trigger: break through $XX.XX on above-average volume.
Gaps >3% past pivot at the open: skip — the risk math no longer holds.
```

## Hard constraints

- No plan on a RED market gate, an unclear pivot, a stop wider than 8%, or an
  unconfirmed earnings date. Say which condition failed and stop.
- Never move the stop farther away to make the position size bigger.
- "Not buyable here" is a complete, successful answer. Do not manufacture a plan
  because the user is eager — being early on a half-built base is the same as
  being wrong.
- This plan is analysis against written rules, not a recommendation to buy. The
  user decides and places every order themselves, with the stop entered at the
  same time as the buy.
