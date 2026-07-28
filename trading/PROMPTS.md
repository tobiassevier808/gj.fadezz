# Copy-Paste Prompts

Use these inside the `Stock Helper` Claude project (so RULES.md is always in context).
Copy the block, paste, edit the bits in `[brackets]`.

---

## 🌙 Evening screen — the main one

> Here are tonight's screen results: `[AAPL, NVDA, ...]`
>
> For each ticker, check it against my entry criteria in RULES.md Section 5 and give me:
> - Pass/fail on each of the 7 criteria (one line each, no essays)
> - Where the pivot/entry level is and where the logical stop sits
> - Whether the stop is within 8% of entry
> - **Confirmed earnings date** — flag anything reporting in the next 10 trading days
> - Position size if it passes: $20 ÷ (entry − stop)
>
> Then rank them and tell me which ones are actually tradeable. If none qualify, say
> "no trades" — don't manufacture a candidate.

---

## ☀️ Morning market gate

> Run my market regime gate from RULES.md Section 4:
> 1. Is SPY above its 50-day MA, and is the 50-day above the 200-day?
> 2. Roughly how many distribution days in SPY/QQQ over the last 15 sessions?
> 3. My last 3 trades: `[W/L/L — or "none yet"]`
>
> Give me a one-word verdict: GREEN (may take new longs) or RED (cash only), plus one
> sentence of why.

---

## 🎯 Pre-trade check — run this before every single buy

> I want to buy `[TICKER]` at `[$XX.XX]` with a stop at `[$XX.XX]`.
>
> Current positions: `[TICKER $XXX / none]`
> Current open heat: `[$XX]`
> Month-to-date P&L: `[+/-$XX]`
>
> Run all 10 items of the pre-trade checklist in RULES.md Section 7. Stop at the first
> failure and tell me which one failed. If everything passes, give me the exact share
> count and the one-sentence thesis + invalidation to put in my journal.

---

## 🔍 Deep dive on one candidate

> Deep dive on `[TICKER]` before I risk money on it:
> - What does the company actually do, in two sentences?
> - Last quarter: revenue and EPS growth, and whether they beat or missed
> - Anything alarming in the most recent 10-Q or 8-K
> - Next confirmed earnings date
> - Who are its two closest competitors and is it winning or losing against them?
> - What would make this setup fail?
>
> Be blunt. I'm looking for reasons not to take the trade.

---

## 📉 Position check-in — when something moves

> I'm holding `[TICKER]`, entered at `[$XX]`, stop at `[$XX]`, now trading `[$XX]`.
>
> Per my exit rules (RULES.md Section 6): what's my action? Cover: first target,
> stop adjustment, time stop, thesis break, and upcoming earnings.
>
> If the answer is "do nothing," say that.

---

## 🚨 Talk me out of it

> I want to `[break rule X — e.g. widen my stop / add to a loser / take a 5th position]`.
>
> Here's my reasoning: `[...]`
>
> Tell me straight whether that's a legitimate exception or me rationalizing. Reference
> the specific rule and what usually happens to people who break it.

---

## 📊 Sunday weekly review

> Here's my journal for the week: `[paste journal entries]`
>
> Review it against the process scorecard in RULES.md Section 10:
> - Any rule violations? Name them specifically.
> - Did I widen or remove any stop?
> - Was any loss bigger than $20? Why?
> - Did I write the thesis before the outcome each time?
> - Running expectancy so far: win rate, average win in R, average loss in R
>
> Then: one thing I did well, one thing to fix next week. Don't be nice about it.

---

## 📅 Monthly reset

> End of month review. Journal: `[paste]`
>
> - Total P&L in dollars and % of account
> - Total trades, win rate, average W/L ratio, expectancy in R
> - Compare to SPY over the same period
> - Am I anywhere near the −6% monthly breaker or −15% kill switch?
> - Given the sample size, what can I actually conclude from these results? (Be honest
>   about how much is noise.)
> - Do any numbers in RULES.md need updating for my new account size?

---

## 💡 One-off: explain a setup

> Explain `[VCP / cup-with-handle / distribution day / relative strength]` to me like
> I'm new, with a concrete example of what it looks like on a chart and what would
> invalidate it.
