---
name: weekly-review
description: Review a trade journal against the process scorecard, compute running expectancy, and identify rule violations and behavioral drift. Use for weekly or monthly trading reviews, when the user pastes journal entries, or asks how their trading is going.
---

# Weekly Review

Audit the process, not the P&L. At fewer than ~70 closed trades the P&L is mostly noise;
rule adherence is the only thing that's actually measurable this early.

## Procedure

1. Read `trading/RULES.md` §10 for the process scorecard.
2. Parse the journal entries the user provides.
3. **Hunt for rule violations first.** These matter more than any winner:
   - Stop widened, moved down, or removed
   - Any loss larger than 1R ($20) — means the stop failed or wasn't placed
   - Position taken while the market gate was RED
   - More than 4 concurrent positions, or heat above $60
   - Added to a losing position
   - Traded after hitting the −6% monthly breaker
   - Thesis written after the outcome was known (check for hindsight language)
   - More than one trade in a day
4. Compute running stats: win rate, average win in R, average loss in R, expectancy
   `(win% × avgWinR) − (loss% × avgLossR)`, largest loss, max heat reached.
5. Compare account performance to SPY over the same window.
6. **Calibrate the conclusion to the sample size.** With N closed trades, state plainly
   how much can be concluded. Under ~30 trades: essentially nothing. Say so — don't let
   a good week read as proof of skill or a bad week as proof of failure.

## Output format

```
WEEK OF YYYY-MM-DD  ·  N trades closed

RULE ADHERENCE
  ❌ VIOLATION — TICKER: stop moved from $46.00 to $44.50 on 7/22
  ✅ No position exceeded 4 / heat stayed under $60
  ✅ All theses written at entry

NUMBERS (running, N=X)
  Win rate      XX%     (40-50% is normal for this style)
  Avg win       X.XR    (target ≥ 2.0R)
  Avg loss      X.XR    (target ≤ 1.0R)
  Expectancy    +X.XXR
  Largest loss  $XX
  Account       $X,XXX  (X.X%)   SPY same period: X.X%

WHAT THE NUMBERS MEAN
  [Honest statement about sample size and how much is noise]

ONE THING DONE WELL:  [specific]
ONE THING TO FIX:     [specific, actionable this week]
```

## Hard constraints

- Be direct about violations. Naming them is the entire value of this review.
- Do not congratulate a profitable week that broke rules — say explicitly that the
  profit was luck riding on a process failure, and that it will reverse.
- Do not suggest increasing position size based on a good week. RULES.md sizing changes
  require a verified track record (70+ trades), not a hot streak.
- Do not propose new strategies or tickers here. This is an audit, not idea generation.
