---
name: market-regime-gate
description: Run the market regime gate before any new long position — checks SPY vs its 50-day and 200-day moving averages, counts recent distribution days, and checks the user's losing streak. Returns a GREEN or RED verdict. Use every morning, whenever the user asks "can I trade today", "market gate", "is the market healthy", or before planning any new position.
---

# Market Regime Gate

The single most important check in the system. Breakout strategies lose money in
downtrending and choppy markets — more than half of breakouts fail in bad tape.
This gate is what keeps the user in cash during those stretches.

## The three checks (RULES.md §4 — all three must pass)

1. **Trend:** SPY is above its 50-day moving average, AND the 50-day is above the
   200-day.
2. **Distribution:** fewer than 4 distribution days in SPY or QQQ over the last 15
   sessions. A distribution day = the index closes down 0.2% or more on volume
   higher than the prior session.
3. **Streak:** the user's last 3 trades were not all losers. Ask for this — it's in
   their journal. If all 3 lost: paper-trade only until one paper trade wins.

## Data rules

- Get SPY/QQQ prices, moving averages, and volume from the market data connector or
  web search. **Never estimate prices or MA levels from memory** — they're stale.
- If the data cannot be verified right now, the gate **fails closed: verdict RED**.
  Say plainly that the verdict is RED because data was unavailable, not because the
  market is bad. No data ≠ benefit of the doubt.
- If exact distribution-day counting isn't possible with available data, approximate
  from the last 15 daily bars and say the count is approximate.

## Output format

```
MARKET GATE — YYYY-MM-DD

  1. Trend ............. PASS/FAIL   SPY $XXX vs 50d $XXX / 200d $XXX
  2. Distribution ...... PASS/FAIL   X distribution days in last 15 sessions
  3. Streak ............ PASS/FAIL   last 3 trades: W/L/W

VERDICT: GREEN — new longs permitted
   or
VERDICT: RED — cash only. [which check failed, one line]
```

One line per check. No essays. The verdict word comes last and is unambiguous.

## Hard constraints

- RED means **no new long positions today**. Existing positions and their stops are
  unaffected — the gate governs new entries only.
- Never soften a RED because a setup "looks too good to miss." That sentence is how
  breakout traders lose money in bear markets. If the user pushes back, restate:
  the gate IS the strategy; missing one trade costs nothing, trading through a red
  gate costs the account.
- Do not predict when the gate will turn green. Re-check tomorrow.
- A GREEN verdict is not a buy signal. It only unlocks the rest of the process
  (screening, planning, the pre-trade checklist).
