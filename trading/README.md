# Stock Pick Helper — $1,000 Account, Phone-First

A working setup that turns Claude into your stock research analyst and risk officer.
Built to run from your phone. No coding required day-to-day.

## What this is

Claude does the research, checks your rules, and sizes your trades.
**You** make every buy/sell decision and press every button.

This is not a signal service and Claude is not a stock picker — the evidence on
LLMs generating buy/sell signals is bad (see `../research/stock-trading-with-claude.md`).
What Claude is genuinely good at: reading filings fast, checking a setup against
written criteria, doing the position-size math correctly every single time, and
reviewing your trades honestly afterward.

## Start here (15 minutes, on your phone)

1. Read **[SETUP-PHONE.md](SETUP-PHONE.md)** — wire up a Claude Project + the free
   Alpha Vantage connector. This is the only setup step.
2. Read **[RULES.md](RULES.md)** — your rulebook. Calibrated for $1,000. This is the
   part that actually determines whether you still have money in 2 months.
3. Add the **[position sizer](https://claude.ai/code/artifact/7d1a66b3-e609-4a91-ab9a-3c1e865b2d7a)**
   to your home screen (source: `calculator.html` — works offline either way).
4. Use the copy-paste prompts in **[PROMPTS.md](PROMPTS.md)** for the daily loop.

## The daily loop (10 min/day)

```
EVENING (5 min)
  Finviz mobile screen (free, saved URL)  →  paste tickers into Claude
  →  Claude ranks them against your rules, gives entry/stop/size
  →  you pick 0-1 to act on tomorrow

MORNING (5 min)
  Claude runs the market-regime check (is the market even in an uptrend?)
  →  if green and you have a setup: place the order + stop
  →  log it in the journal

SUNDAY (15 min)
  Claude reviews your journal: did you follow your own rules?
```

Zero trades on most days is the correct outcome. Cash is a position.

## Honest math for $1,000

Because the number matters more than the percentage at this size:

| Scenario | 2-month result | On $1,000 |
|---|---|---|
| Good disciplined process | +5% to +10% | **+$50 to +$100** |
| Excellent / hot streak | +12% | +$120 |
| Realistic bad stretch | −10% | −$100 |
| Rules ignored, oversized | −40%+ | −$400+ |

With ~12–15 trades in 8 weeks at $20 risk each, the math says: expected outcome
around **+$100, give or take $120**. The uncertainty is bigger than the edge. That's
not pessimism, it's just what a 15-trade sample looks like.

**So the real return on these 2 months is not the money — it's that $1,000 is
tuition-sized.** You can make every beginner mistake here and the worst case costs
less than a phone. Learn the process at this size; the process is what scales later
when there's more capital behind it. Trying to turn $1,000 into meaningful money in
8 weeks requires the kind of position sizing that reliably ends at $0.

## Files

| File | What it's for |
|---|---|
| [SETUP-PHONE.md](SETUP-PHONE.md) | One-time setup: Claude Project, connector, broker |
| [RULES.md](RULES.md) | **The rulebook.** Risk limits, sizing, entries, exits |
| [PROMPTS.md](PROMPTS.md) | Copy-paste prompts for the daily loop |
| [calculator.html](calculator.html) | Position sizer + pre-trade checklist (works offline) |
| [templates/watchlist.md](templates/watchlist.md) | Watchlist format |
| [templates/journal.md](templates/journal.md) | Trade journal format |
| [skills/](skills/) | Claude Code skills (if you ever work from a laptop) |
| [../research/stock-trading-with-claude.md](../research/stock-trading-with-claude.md) | The full research report behind all of this |

---

*Educational tooling, not financial advice. Trading risks total loss of capital.*
