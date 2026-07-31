---
name: trade-journal
description: Create and close out trade journal entries in the standard template, compute R-multiples, and keep the running scorecard current. Use whenever the user opens a position ("log this", "I bought X"), closes one ("I sold", "got stopped out"), or asks how their stats look.
---

# Trade Journal

The journal is the only honest record of whether the process is being followed.
Every trade gets an entry the day it's opened, with the thesis written **before**
the outcome is known. That ordering is the entire point.

## On OPEN — collect and write

Require: ticker, entry price, stop price, share count, market-gate status at entry,
positions open before this one, heat before/after, confirmed earnings date, thesis
(one sentence), invalidation (one sentence), and a setup grade (A/B/C).

Produce an entry in exactly the format of `trading/templates/journal.md`:

```
### TICKER — opened YYYY-MM-DD
Entry: $XX.XX   Stop: $XX.XX (−X.X% / 1R = $XX)
Shares: X.XX (position $XXX = XX% of account)
Target: $XX.XX (+15% → sell half, stop to breakeven)
Earnings: YYYY-MM-DD (confirmed Y/N)
Market gate: GREEN/RED   Heat: $XX → $XX   Positions: X of 4
Thesis: ...
Invalidation: ...
Grade: A/B/C
```

Flag problems at write time, don't bury them:
- Grade C → say plainly: "C-grade setups shouldn't be traded per your own template."
- Risk ≠ $20, heat > $60, position > $300, gate RED → name the violation in the
  entry as `Rules broken: ...`. The journal records what happened, not what should
  have happened.

## On CLOSE — compute and reflect

Require: exit date, exit price, exit reason (stop / first target / trail / time
stop / thesis break / earnings).

1. **Compute R:** R = (exit − entry) × shares ÷ initial risk dollars. State it
   plainly: "−1.0R, the stop did its job" or "+2.3R".
2. A loss worse than −1.2R means the stop failed or wasn't placed — ask what
   happened and record the answer.
3. Ask for two sentences: what actually happened vs the thesis, and one lesson
   (or "none — process worked").
4. **Update the running scorecard:** trades closed, win rate, avg win R, avg loss R,
   expectancy = (win% × avgWinR) − (loss% × avgLossR), largest loss, violations,
   account value.

## Sample-size honesty

Whenever reporting the scorecard, state the sample size and what it can support.
Under ~30 closed trades: "these numbers are mostly noise — track them for habit,
not judgment." Never praise a hot streak as skill or condemn a cold streak as
failure at small N. Roughly 70+ trades before expectancy means anything.

## Hard constraints

- Never write or edit a thesis after the outcome is known. If the user didn't log
  the open in time, record the entry with `Thesis: [written post-hoc]` — visible
  and slightly embarrassing, which is the incentive to log on time.
- Never soften a rule violation in the record. The Sunday review depends on the
  journal being true.
- Don't suggest position-size increases based on journal results. Sizing changes
  need 70+ trades and happen in RULES.md, on a Sunday, in writing.
