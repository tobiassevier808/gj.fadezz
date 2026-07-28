# Trading Rules — $1,000 Account

**Claude: these rules are binding. Enforce them in every conversation. If I propose a
trade that violates any rule, say so plainly and refuse to size it. Do not recommend
specific stocks to buy or sell — analyze, check rules, and let me decide.**

Last updated: 2026-07-23 · Account size: $1,000 · Review these numbers monthly.

---

## 1. Account & risk limits

| Rule | Value | Why |
|---|---|---|
| Account size | $1,000 | Update this whenever it changes materially |
| **Risk per trade** | **2% = $20** | Higher than the standard 1% because the account is small; drop to 1% if the account passes $5,000 |
| Max open positions | **4** | Small account needs concentration to matter; more than 4 is unmanageable from a phone |
| Target position size | 20–25% of account (~$200–250) | |
| **Hard cap per position** | **30% ($300)** | Overnight gap on a 30% position can cost 6–10% of the account — stops don't protect against gaps |
| **Max portfolio heat** | **6% ($60)** | Sum of open risk across all positions. No new trade if it would exceed this |
| **Monthly circuit breaker** | **−6% (−$60)** | Realized + open losses hit this in a calendar month → no new trades until the 1st |
| **Account kill switch** | **−15% (−$150)** | Close everything, stop, write a post-mortem before risking another dollar |
| Leverage / margin | **None** | |
| Options | **None** | Retail multi-leg option trades average −16.4% in 3 days (2025 study) |

## 2. Position sizing (the one calculation that matters)

```
shares = risk_dollars ÷ (entry_price − stop_price)
```

**Worked example:** Entry $50.00, stop $46.00 → risk/share = $4.00
→ shares = $20 ÷ $4.00 = **5 shares = $250 position** (25% of account) ✅

**Worked example 2:** Entry $180, stop $166 → risk/share = $14
→ shares = $20 ÷ $14 = **1.43 shares = $257 position** ✅ (needs fractional shares)

Rules:
- Position size ≠ risk. A tight stop lets $20 of risk control a $250 position.
- If the calculated position exceeds $300, **reduce the position to $300** and accept
  less than $20 of risk. Never widen the stop to make the numbers work.
- If the calculated position is under $50, skip the trade — too small to matter after
  spread and slippage.
- **Fractional shares are required.** Use a broker that supports them.

## 3. What I'm allowed to trade

- US stocks and ETFs only.
- **Price > $5** and **average daily volume > 1,000,000 shares.** No exceptions.
- No penny stocks, no OTC, no recent IPOs (< 6 months of trading history), no biotech
  binaries (companies whose next catalyst is a single FDA decision).
- No stock I heard about from a TikTok/Reddit/YouTube hype cycle in the last 7 days.
  (Stocks herd-bought by retail app traders average −4.7% over the following 20 days.)

## 4. Market regime gate — check before ANY new long

No new long positions unless **all three** are true:

1. **SPY is above its 50-day moving average**, and the 50-day is above the 200-day.
2. Fewer than 4 distribution days (higher-volume down days) in SPY/QQQ over the last
   15 sessions.
3. My last 3 trades were not all losers. (If they were: paper trade until one wins.)

If the gate fails → **cash is the position.** No exceptions, no "but this one setup
looks great." The strategies below lose money in downtrends; the gate is the strategy.

## 5. Entry criteria (breakout / trend continuation)

A candidate must pass **all** of these:

- [ ] Price above its 50-day and 200-day moving averages; 200-day is rising
- [ ] Price within 25% of its 52-week high, and at least 30% above its 52-week low
- [ ] Relative strength: outperforming SPY over the last 3 months
- [ ] Volume contraction in the base — recent pullbacks getting shallower and quieter
- [ ] A clear pivot/entry level with a **logical stop no more than 8% below entry**
- [ ] **No earnings report in the next 10 trading days** (verify the date, don't trust
      an aggregator — check the company's IR page)
- [ ] The sector is not the weakest-performing sector over the last month

Buy the breakout through the pivot on above-average volume. Not before, not 5% after.

## 6. Exits — decided before entry, never improvised

| Exit | Trigger |
|---|---|
| **Initial stop** | 8% below entry, or 2×ATR(14), whichever is **tighter**. Entered as a live stop order at the same time as the buy |
| **First target** | +15% → sell half, move stop to breakeven |
| **Trail the rest** | Stop at the low of the prior week, or 3×ATR below the highest high since entry |
| **Time stop** | Flat after 10 weeks regardless. Dead money is a loss with extra steps |
| **Thesis break** | Setup invalidated (broke back below the pivot on volume) → out, even above the stop |
| **Earnings** | Exit or cut to half size before a confirmed earnings date |

**Never widen a stop. Never average down into a loser. Never remove a stop "just for
today."** These three actions cause the majority of account-ending losses.

## 7. Pre-trade checklist (Claude runs this before every trade)

1. Does the market regime gate pass? (Section 4)
2. Does the candidate meet all entry criteria? (Section 5)
3. Is the stop ≤ 8% below entry and at a logical chart level?
4. Position size = $20 ÷ (entry − stop). Is the result between $50 and $300?
5. Current open positions < 4?
6. Current portfolio heat + this trade's $20 ≤ $60?
7. Am I under the −6% monthly circuit breaker?
8. Earnings date confirmed more than 10 trading days out?
9. Is this correlated with something I already hold? (Two semiconductor names is one bet)
10. Have I written the thesis and the invalidation point in one sentence each?

**Any "no" → no trade.** Claude should stop at the first failure and say which one.

## 8. Behavioral rules

- **One trade per day maximum.** Rushing is how small accounts die.
- No trading in the first 30 minutes of the session — let the open settle.
- No revenge trading. After a loss: wait a full day before the next entry.
- No adding to a position that's already down.
- If I'm changing the rules mid-week, I'm rationalizing. Rule changes happen on Sundays,
  in writing, with a reason, or not at all.
- Every trade gets journaled the day it's opened, with the thesis written **before** the
  outcome is known.

## 9. Taxes & mechanics (US)

- Holds under 1 year = short-term capital gains = **ordinary income tax rate**. Budget
  for it; assume you keep ~70–75% of gains.
- **Wash-sale rule:** if I sell at a loss and rebuy the same stock within 30 days, the
  loss is disallowed for tax purposes (deferred into the new cost basis). At 4 positions
  cycling, this will happen — don't rebuy a stopped-out name for 31 days unless there's
  a genuinely new setup.
- Use a **zero-commission broker with fractional shares** (Alpaca, Fidelity, Schwab,
  Robinhood). On $250 positions, a $5 commission is a 2% drag each way — fatal.
- The Pattern Day Trader rule was repealed in June 2026, and never applied to overnight
  swing holds anyway. Not a constraint here.

## 10. What success looks like at 8 weeks

Success is **not** the P&L. With ~12–15 trades, the P&L is mostly noise — a good trader
loses money in roughly 1 out of every 4 two-month windows.

Grade the process instead:

- [ ] 100% of trades followed the rules above (any violation = failed week)
- [ ] No stop was ever widened or removed
- [ ] Average loss ≤ 1R ($20). Any loss over $30 means the stop failed — investigate
- [ ] Portfolio heat never exceeded $60
- [ ] Every trade journaled with thesis written before the outcome
- [ ] Never traded through the market-regime gate being red

Hit all six and the 2 months were a success regardless of the money.
Miss them and a profitable 2 months was luck that will reverse.
