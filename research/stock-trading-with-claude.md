# Stock Picking & Swing Trading with Claude — Deep Research Report

**Date:** July 23, 2026
**Scope:** Everything a solo retail trader needs to know to use Claude for mid-length (1–2 month hold) US equity swing trading: the Claude skills/plugins/MCP ecosystem, market data sources and databases, strategy evidence, AI automation patterns, risk management, and — most importantly — what the evidence says is realistically achievable in 1–2 months.

> **Disclaimer:** This is educational research, not financial advice. Trading involves substantial risk of loss. Nothing here is a recommendation to buy or sell any security. Only trade money you can afford to lose entirely.

---

## 0. TL;DR

1. **The goal needs reframing.** Across every serious study, 70–97% of active short-horizon retail traders lose money after costs, and ~90% of *professional* fund managers underperform the S&P 500 over 15 years. Two months is not enough time to "make something" of your wealth through trading — it *is* enough time to build a system, a process, and the start of a track record while risking very little.
2. **A good 2-month outcome for a disciplined swing trader is +2% to +6%.** +8–12% is a hot streak. Anything promising more is selling you variance, leverage, or luck. Meanwhile a genuinely skilled trader still has a ~1-in-5 to 1-in-3 chance of *losing* money in any given 8-week window — the sample is too small for edge to show up.
3. **Claude cannot pick winning stocks for you.** Every rigorous re-test of LLM trading agents (FINSABER across 20 years/100+ symbols; the ICAIF reproducibility study; live LLM trading arenas) shows LLM-generated buy/sell signals do not beat passive indexing out-of-sample. This is the single most confirmed finding in the AI-trading literature as of 2026.
4. **What Claude is genuinely excellent at:** reading and synthesizing filings/earnings calls/news at scale, building and debugging your screeners and backtest code, enforcing your risk rules before every trade, journaling and reviewing your trades, and generating daily research briefs. Use Claude as your analyst, engineer, and risk officer — you stay the portfolio manager.
5. **The tooling is cheap and real.** Claude Pro ($20/mo) + the free official `anthropics/financial-services` skills + the community `tradermonty/claude-trading-skills` pack + free MCP servers (SEC EDGAR, Alpaca paper trading, Alpha Vantage, yfinance) gives you a workflow that looked institutional two years ago. Total minimum budget: ~$20–50/month.
6. **Best-fit strategies for a 1–2 month hold:** breakout/trend systems (Minervini VCP, CAN SLIM style) and post-earnings-announcement drift are natively in this window; both have published evidence and known failure modes. Realistic profile: ~40–50% win rate with 2–3:1 winners-to-losers — the edge is asymmetry, not being right often.
7. **Risk rules are the actual product of your first 2 months:** risk 0.5–1% of the account per trade, position size = risk ÷ stop distance, 4–8 max positions, ~5–6% max total open risk, stop trading for the month at −6%, hard halt at −15%. These numbers determine survival; stock picking barely matters at this timescale.
8. **Automate the research, never the trigger.** The consensus architecture: nightly screener → Claude analyzes and ranks candidates → you decide → orders via Alpaca (paper first) → Claude journals and reviews weekly. Keep a human on every order. Paper trade for at least 2 weeks before risking a dollar.
9. **Taxes eat swing profits:** gains on holds ≤1 year are ordinary income (10–37% federal + state). Your after-tax bar for beating simple buy-and-hold is higher than it looks.
10. **The realistic 8-week plan** (Section 8) treats this period as an apprenticeship: weeks 1–2 build + backtest + paper trade, weeks 3–8 trade small with hard limits, then review honestly. You need ~70–200+ trades (1–3 years) to statistically know whether you have an edge. Two months of results — good or bad — proves nothing yet.

---

## 1. Read this first: the evidence on "making something of it in 1–2 months"

### 1.1 Base rates for active retail traders

| Study | Sample | Finding |
|---|---|---|
| Barber & Odean, *Trading Is Hazardous to Your Wealth* (J. Finance 2000) | 66,465 US households | Most-active quintile earned 11.4%/yr vs market 17.9% (−6.5pp/yr). Cost drag, not bad picks, is the main killer |
| Odean 1999 | Same brokerage data | Stocks retail investors *bought* went on to underperform the ones they *sold* by ~3.3pp over the next year |
| Barber, Lee, Liu & Odean (Taiwan, complete exchange record) | All day traders 1995–2006 | >80% lose money in a typical 6-month window; consistently profitable traders ≈ 1–5% of the population |
| Chague et al. (Brazil, 2020) | Everyone who began day trading 2013–15 | Of those persisting 300+ sessions: **97% lost money**; 1.1% earned more than minimum wage; no evidence people improve with experience |
| Barber et al., Robinhood herding (J. Finance 2022) | Robinhood users | Stocks herd-bought by app traders averaged **−4.7% abnormal return over the next 20 days** |
| SPIVA Scorecard (S&P Global) | Professional US large-cap funds | **89.5% underperformed the S&P 500 over the 15 years ending 2024**; 79% underperformed in 2025 alone |
| SEBI (India, 2024) | Retail futures & options traders | 93% lost money over FY22–24 |
| DALBAR 2025 | US equity fund investors | Average investor earned 16.54% in 2024 vs S&P 25.02% — a −8.5pp behavior gap, 15 consecutive years of underperformance |

The pattern is universal across countries, decades, and instruments: **the median active short-horizon retail trader loses money after costs, and the sustainably profitable share is roughly 1–5%.** If ~90% of professionals with Bloomberg terminals and research teams can't beat the index over 15 years, the base-rate assumption for any new retail trader must be underperformance — and the plan should be built to survive that assumption being true.

### 1.2 Why 2 months specifically is luck-dominated (the math)

With 2–10 week holds and 4–8 concurrent positions, you complete roughly **12–15 trades in 8 weeks**. Measure results in R (1R = the dollar amount you risk per trade):

- A *good* swing system has an expectancy around **+0.2 to +0.35R per trade** (e.g., 45% win rate, average win +2R, average loss −1R → +0.35R).
- Per-trade standard deviation is ≈ **1.5R** — 4–7× the edge.
- Over 15 trades: expected profit ≈ +3 to +5.25R, but the standard deviation of the total is 1.5 × √15 ≈ **±5.8R**. The noise is as large as the signal.
- Consequences:
  - A **genuinely skilled** trader has a ~18–30% chance of finishing an 8-week window *down*.
  - A trader with **zero edge** has a ~19% chance of finishing up +5R or more — and concluding they're talented. This is how blowups are seeded.
  - To *statistically verify* an edge at 95% confidence you need ~71 trades for a strong edge (0.35R), ~216 for a decent one (0.2R). At 12–15 trades per 2 months, that's **1–3 years**.

**The only variables you actually control in an 8-week window are how much you can lose (position sizing, stops, kill switches) and your cost/tax drag.** Edge, even if you have it, is statistically invisible at this timescale.

### 1.3 What a good 2-month outcome actually looks like

- Baseline: the S&P 500 averages roughly +1.5–2% per 2-month period.
- Disciplined swing trading, 0.5–1% risk per trade: a good result is **+2% to +6%**; an excellent hot streak is **+8–12%**.
- Calibration from the far right tail: the best *sustained* discretionary track records on earth run ~20–45%/year (≈3–6% per 2 months compounded). Buffett compounded ~20%/year. US Investing Championship winners posting +155% or +334% in a year did it with concentration, margin, and survivorship (thousands entered; you hear about one).
- After-tax: short-term gains are ordinary income. In the 24% federal bracket you keep ~72–76% of gains (before state tax), vs ~85% for long-term holdings. Active trading must beat passive by the tax wedge just to tie.

**Reframe that makes this worthwhile:** spend the 2 months building the system, the discipline, and a written track record at small size. If after 8 weeks your process metrics are good (rules followed, losses capped, journal complete), you've built something with actual long-term value — which "2 months of aggressive bets" statistically will not produce.

---

## 2. What Claude is genuinely good at in trading — and what it isn't

### 2.1 The verdict from the 2024–2026 evidence

**LLM-as-stock-picker does not work.** The load-bearing evidence:

- **FINSABER** (KDD 2026, [arXiv:2505.07078](https://arxiv.org/abs/2505.07078)): re-backtested the famous LLM agent frameworks (FinMem, FinAgent, FinRobot, FinCon, TradingAgents, MarketSenseAI) over **two decades and 100+ symbols** instead of their cherry-picked short windows. Result: the reported advantages "deteriorate significantly" — LLMs are too conservative in bull markets and too aggressive in bears, netting out below passive benchmarks.
- **ICAIF 2026 reproducibility study** ([ACM](https://dl.acm.org/doi/10.1145/3800973.3801029)): reran TradingAgents and found that "without cherry-picking, the stochastic configurations underperform simple passive benchmarks," and temperature-driven nondeterminism means results don't even reproduce run-to-run.
- **Lookahead bias is structural:** an LLM trained through 2024 has memorized 2018–2023 price history, so *any historical backtest of an LLM strategy is contaminated*. Formal benchmarks (Look-Ahead-Bench, Jan 2026) now measure this. **Only forward tests and paper trading count as evidence for LLM-in-the-loop strategies.**
- **Live forward tests show noise, not alpha:** Nof1's Alpha Arena S1 (real $10k per model, Oct–Nov 2025) — only ~2 of 6 frontier models finished profitable, with one down 60–75% at points. AI Trade Arena's 8-month paper test showed huge dispersion between models and no consistent winner.
- The famous open-source agent repos — TradingAgents (~94k stars), ai-hedge-fund (~62k stars) — are **explicitly educational**; their own authors say they've never been live-deployed.

### 2.2 Where Claude earns its keep (practitioner consensus)

| Use | Why it works | Value |
|---|---|---|
| **Coding copilot for strategy/backtest development** | Claude writes and debugs your Python screeners, backtests, and Pine Script far faster than you can | The #1 reported concrete win on trading forums |
| **Document compression** | Summarizing 10-Ks, 10-Qs, 8-Ks, earnings-call transcripts, guidance-language changes vs prior quarter | Real research lineage; LLM earnings-call NLP shows weak-but-real signal |
| **Screening & ranking with reasoning** | Nightly job: screen output → Claude scores each candidate against *your written criteria* and explains why | Turns a 50-stock screen into a 5-stock reviewed watchlist |
| **Pre-trade discipline gate** | Claude checks a proposed trade against your written rules (sizing, heat, earnings date, correlation) before you place it | Prevents the errors that actually kill accounts |
| **Trade journaling + weekly review** | Claude critiques your executed trades vs your own rules: revenge trading, sizing drift, moved stops | Consistently described as the highest-value, lowest-risk LLM use |
| **Risk reporting** | Daily brief on exposure, concentration, open heat, upcoming earnings dates across positions | Cheap institutional hygiene |

**Operating principle: Claude is your analyst, engineer, and risk officer. It is not your portfolio manager. Information processing — yes. Prediction — no. And keep a human on every order.**

---

## 3. The Claude toolkit: skills, plugins, and MCP servers (July 2026)

### 3.1 What subscription you need

**Claude Pro ($20/mo) is sufficient.** As of mid-2026 it includes Claude Code, Cowork (GA since ~July 2026) with plugin support, Claude for Excel (GA since May 2026), and custom connectors. The enterprise "Claude for Financial Services" product (Bridgewater, Norges Bank, AIG are customers) is sales-led and its premium data connectors (FactSet, S&P Capital IQ/Kensho, PitchBook, Moody's, Morningstar, Daloopa, LSEG, Aiera) authenticate against institutional subscriptions typically $10k+/year — **but its skills are open source and free** (next section).

### 3.2 Official finance skills — free, Apache-2.0

Repo: **[github.com/anthropics/financial-services](https://github.com/anthropics/financial-services)** (~34k stars).

```
claude plugin marketplace add anthropics/financial-services
claude plugin install financial-analysis@claude-for-financial-services
```
(Also installable in Cowork via Settings → Plugins.)

Most relevant pieces for a swing trader:

- **financial-analysis (core):** `/dcf` (DCF model with WACC + sensitivity tables), `/comps` (comparable-company analysis), 3-statement-model, `/debug-model` (Excel formula tracing, hardcode detection), clean-data-xls, competitive-analysis.
- **equity-research vertical:** `/earnings` (earnings analysis), earnings-preview, `/initiate` (initiating coverage), morning-note, `/sector` (sector overview), `/thesis` (thesis tracker), `/catalysts` (catalyst calendar), `/screen` (idea generation).
- May 2026 added 10 prebuilt agent templates (Market Researcher, Earnings Reviewer, Model Builder, Valuation Reviewer, etc.) as Cowork/Claude Code plugins and Managed-Agent cookbooks.

Note the design constraint stated in the repo: outputs are **drafts for human review** — the agents "do not make investment recommendations, execute transactions, or perform binding actions." Anthropic's usage policy treats finance as high-risk and expects a human in the loop. Plan your workflow around that; it happens to match what the performance evidence says anyway.

### 3.3 The best community skill pack for this exact use case

**[github.com/tradermonty/claude-trading-skills](https://github.com/tradermonty/claude-trading-skills)** (~2.5k stars, MIT) — 60+ skills built for individual swing traders:

- **Market regime:** breadth analyzer, distribution-day monitor, uptrend analyzer (an O'Neil-style "is the market even in an uptrend?" gate).
- **Swing opportunity:** VCP screener, CAN SLIM screener, breakout trade planner.
- **Discipline:** position sizer, pre-trade discipline gate, trade-memory journaling (YAML), signal postmortem, backtest expert.
- Data: yfinance (free), FMP free tier, optional Finviz Elite, Alpaca paper. **Five core skills need no API keys at all.** Ships as Claude Code folders and `.skill` ZIPs for the Claude web app. Explicitly "not a signal service."

### 3.4 MCP servers worth installing

| MCP server | What it gives Claude | Key/cost | Notes |
|---|---|---|---|
| **[alpacahq/alpaca-mcp-server](https://github.com/alpacahq/alpaca-mcp-server)** (official) | 60+ tools: account, positions, order placement (stocks/ETFs/options/crypto), watchlists, bars/quotes, options chains with Greeks/IV, news | Free Alpaca account | **Paper trading is the default** (`ALPACA_PAPER_TRADE=True`). The only official broker MCP with full order lifecycle. `uvx alpaca-mcp-server` |
| **[Massive](https://github.com/polygon-io/mcp_polygon)** (official; Polygon.io rebranded to Massive.com Oct 2025) | Meta-tools: search_endpoints, call_api, query_data (SQL over results), built-in technical indicators, Greeks, returns analysis | Free key = ~5 calls/min EOD; Stocks Starter ~$29/mo | Best paid-data MCP for a DIY pipeline |
| **[Alpha Vantage](https://github.com/alphavantage/alpha_vantage_mcp)** (official, in Claude's connectors directory) | Quotes, fundamentals, earnings calendar, 50+ indicators | Free key = 25 calls/day | Hosted — paste `https://mcp.alphavantage.co/mcp?apikey=KEY` into Claude.ai Settings → Connectors; zero install |
| **[stefanoamorelli/sec-edgar-mcp](https://github.com/stefanoamorelli/sec-edgar-mcp)** (community) | 10-K/10-Q/8-K retrieval + section extraction, XBRL financials, Form 3/4/5 insider transactions | **Free, no key** | Ground-truth filings straight from the SEC |
| **yfinance MCPs** ([Alex2Yang97](https://github.com/Alex2Yang97/yahoo-finance-mcp), [hachecito](https://github.com/hachecito/yfinance-market-mcp)) | Prices, statements, options chains, screener, news | Free, no key | Scraping-based — breaks periodically; fine for research, never for alerting |
| **[Tradier MCP](https://docs.tradier.com/docs/tradier-mcp)** (official) | Real-time data, options chains, order placement | Free sandbox | The alternative broker MCP |
| [tradingview-mcp](https://github.com/atilaahmettaner/tradingview-mcp) (community, ~3.6k stars) | TradingView screener/TA data | Free | |
| Financial Datasets MCP (official) | Clean fundamentals JSON (powers ai-hedge-fund) | 2026 pricing moved upmarket: PAYG $0.01–0.10/req, Build $200/mo | Skip unless you outgrow EDGAR+FMP |

### 3.5 Other Claude surfaces that matter

- **Claude for Excel** (GA on Pro since May 2026): reads/edits real workbooks; since March 2026 can pull MCP connector data directly into Excel. The sleeper feature — maintain your position tracker and earnings models in a spreadsheet Claude can operate.
- **Claude Code Routines / scheduled triggers:** run the nightly screen and morning market-regime check automatically (see architecture in Section 7).
- **CLAUDE.md as your investment policy:** put your written trading rules, risk limits, and checklists in the project's CLAUDE.md so every Claude session enforces them (example in Section 6.3).

---

## 4. Data sources & databases (verified pricing, July 2026)

### 4.1 The rule that saves you money

**At a 1–2 month holding period, end-of-day or 15-minute-delayed data is fully sufficient. Never pay for real-time SIP feeds at this horizon.** Everything can run as a nightly batch.

### 4.2 Recommended stacks by budget

**$0/month (fully workable):**
- Screening: **Finviz free** (70+ filters, EOD).
- Price history/backtests: **yfinance** + **Tiingo free** (1k req/day, 500 symbols/mo, cleanest free adjusted EOD) as the reliable fallback.
- Quotes/news/earnings dates: **Finnhub free** (60 calls/min — most generous free limit; note: no OHLC candles on free) + **Alpha Vantage free** (earnings calendar CSV works on the free key).
- Fundamentals/filings: **SEC EDGAR** (free, 10 req/s, use `edgartools` Python lib or the MCP) — this is the ground truth everything else re-sells.
- Insider buys: **OpenInsider** (free Form 4 screener). 13F ideas: **Dataroma**, 13f.info (45-day-stale — idea generation only).
- Sentiment: **Reddit API** (free non-commercial via PRAW). X/Twitter API is effectively dead for retail budgets ($0.005/post read as of Feb 2026).
- Charts/alerts: **TradingView free** (3 alerts) + StockCharts free.

**~$30/month (one anchor purchase):**
- **Finviz Elite annual ($24.96/mo)** — realtime/premarket screening, CSV export straight into your Python pipeline, backtesting, email alerts. Biggest single workflow upgrade for a swing trader.
- *Or* API-first: **EODHD All World $19.99/mo** (100k calls/day, 30+ yrs clean EOD) or **Massive/Polygon Starter $29/mo** (unlimited calls, 15-min delay, 10 yrs minute bars).
- *Or* alert-first: **TradingView Plus $29.95/mo** (100 alerts + webhooks → automation).

**~$100/month (diminishing returns beyond this):**
- TradingView Plus ($29.95) + Finviz Elite ($24.96) + Tiingo Power ($30, cleanest adjusted EOD + IEX realtime) + FMP Starter annual (~$19–22, deep fundamentals API) ≈ **$105/mo**.
- Deliberately skip at this budget: Alpaca Algo Trader Plus $99 (SIP realtime — unnecessary), Unusual Whales ~$50 (options flow — different game), TrendSpider ~$149, Benzinga Pro $147+, Databento $199 (institutional-grade; its $125 free signup credit is nice for one-off clean historical pulls).

### 4.3 Full pricing reference

| Source | Free tier | Paid entry | Best for |
|---|---|---|---|
| yfinance | Unlimited-ish, no key; breaks periodically | n/a | Prototyping, bulk EOD |
| Alpha Vantage | 25 req/day | $49.99/mo | Free earnings calendar; hosted MCP |
| Finnhub | 60 calls/min (no candles) | ~$12–100/mo (verify) | Free quotes + news + earnings dates |
| Massive (ex-Polygon) | 5 calls/min, EOD | **$29/mo Starter** | Best paid API value; official MCP |
| Tiingo | 1k req/day, 500 symbols/mo | $30/mo Power | Cleanest adjusted EOD data |
| FMP | 250 req/day | ~$22–29/mo (verify) | Cheap broad fundamentals |
| EODHD | 20 calls/day | **$19.99/mo All World** | Cheapest serious EOD pipeline |
| Alpaca Data | IEX realtime + 15-min delayed SIP | $99/mo (skip) | Pairs with free execution API |
| SEC EDGAR | **Fully free** | n/a | Ground-truth filings + XBRL |
| SimFin | Free w/ registration | ~$15–35/mo | Bulk fundamentals CSVs |
| OpenInsider | **Fully free** | n/a | Insider cluster-buy screening |
| Finviz | Strong free screener | $299.50/yr Elite | Screening + CSV export |
| TradingView | Free, 3 alerts | $14.95/mo; webhooks at $29.95 | Charts, Pine alerts, webhooks |
| Koyfin | Good free tier | $39/mo | Fundamentals dashboards |
| StockCharts | Basic free | $19.95/mo | Classic TA + scan engine |
| Reddit API | Free (non-commercial) | $0.24/1k calls | Free retail sentiment |
| X API | None | $0.005/post read | Out of budget — use Reddit |
| StockTwits API | Closed to new registrations | n/a | Unavailable |
| Unusual Whales | None | ~$50/mo | Options flow (different game) |
| Databento | $125 signup credit | $199/mo live | Institutional; overkill |

*(Items marked "verify": vendor pages blocked automated checks; confirm before subscribing.)*

**Earnings-date hygiene:** aggregator earnings dates are provisional until the company confirms. At a 1–2 month hold you will hold through earnings windows — re-verify the date for every open position (Alpha Vantage/Finnhub calendar + company IR page), and decide *in advance* whether your rules allow holding through the print.

---

## 5. Strategy playbook for 2–10 week holds (what has published evidence)

Every strategy below has real published evidence *and* real failure modes. Note the pattern: **published edges are annual, portfolio-level, a few percent, smaller since publication, and punctuated by crashes.** Nothing here prints money in any given 8-week window.

### 5.1 The five families

| Strategy | Core rules | Published evidence | Failure modes |
|---|---|---|---|
| **Breakout / trend (Minervini VCP, CAN SLIM)** — *best native fit for 2–10 wk holds* | Trend Template gate (price > 150d & 200d MA, 200d MA rising, ≥30% above 52-wk low, within 25% of 52-wk high, RS ≥ 70) → volatility contraction pattern (pullbacks tightening 18%→12%→6% on shrinking volume) → buy pivot breakout. Stop 5–10%, never wider. Sell into strength at +20–25% | O'Neil/AAII CAN SLIM screen ~19.2%/yr since 1998 vs S&P 5.7% — but frictionless paper portfolio at ~2× market volatility. Minervini won the 2021 US Investing Championship with an audited +334.8% (concentrated, levered, survivor-selected — do not anchor on it) | >50% of breakouts fail in choppy/bear tape (death by whipsaw). Requires a confirmed market uptrend — the "M" gate is the strategy |
| **Post-earnings-announcement drift (PEAD)** — *natively 60-trading-day* | After a large positive earnings surprise (top SUE decile) + positive announcement-day reaction, buy and hold ~60 trading days | Bernard & Thomas (1989): ~18% annualized abnormal on extreme deciles (2–4%/quarter) | Has decayed toward insignificance in large caps since the 2000s; survives mainly in small/illiquid names where costs eat much of it; gap risk at the *next* earnings |
| **Intermediate momentum (12-1)** | Rank on trailing 12-month return skipping the last month; buy top decile; rebalance monthly | Jegadeesh & Titman (1993): ~1%/month abnormal. Post-publication decay ~26–58% (McLean & Pontiff) | **Momentum crashes:** −73% in 3 months in 2009 (Daniel & Moskowitz). Crashes hit in high-vol rebounds after declines |
| **Short-term mean reversion (Connors RSI-2)** | Above 200d MA; buy RSI(2) < 10; exit on close above 5d MA. Hold 3–10 days | SPY: ~75–79% win rate, ~9% CAGR while invested only ~28% of the time | Negatively skewed: many small wins, occasional huge loss (stops make it worse — tail risk is structural); index/ETF strategy, unreliable on single stocks |
| **Sector rotation / relative strength** | Rank sector ETFs by trailing return; hold top 1–3; rebalance monthly; trend filter (exit below 10-mo MA) | Faber: beat buy-and-hold ~70% of the time since the 1920s; Fidelity: +3.6pp/yr over 15 yrs. Antonacci dual momentum: book claimed 15.8%/yr, out-of-sample replication ~6.75%/yr — a textbook lesson in live decay | Whipsaws at V-bottoms; edge accrues over years, not weeks. Better as "where's the tailwind" context than a 2-month vehicle |

### 5.2 Practical synthesis for your window

1. **Trade the trend/breakout playbook as the core** (Minervini/CAN SLIM style): it's designed for weeks-to-months holds, has explicit risk rules baked in (7–10% hard stops, sell-into-strength targets, market-uptrend gate), and the tradermonty skill pack implements its screens directly.
2. **Layer PEAD awareness on top:** the strongest candidates often *are* recent positive-surprise stocks; earnings season (which you'll hit at least once in any 2-month window) is both your opportunity set and your biggest risk.
3. **Use sector relative strength as context, not signal** — fish in the strongest 2–3 sectors.
4. **Expectancy realism:** a good implementation of this style runs **~40–50% win rate with average winners 2–3× average losers**. You will be wrong half the time; the asymmetry is the entire edge. If you can't emotionally tolerate 5+ consecutive losses (75–80% probability somewhere in your first 100 trades), the position size is too big.
5. **The market-regime gate is non-negotiable:** these strategies lose money in downtrending/choppy markets. "No valid setups + weak market = sit in cash" is a position.

---

## 6. Risk management: the non-negotiables

This section matters more than everything else in this document combined. At a 2-month horizon, sizing and stops determine survival; picks barely matter yet.

### 6.1 The rule stack

1. **Risk 0.5–1% of account equity per trade** (1–2% only after you have a verified track record). "Risk" = (entry − stop) × shares, not position size.
2. **Position sizing formula:** `shares = (account × risk%) ÷ (entry − stop)`.
   *Worked example:* $30,000 account, 1% risk = $300 risk budget. Entry $50, ATR(14) = $2, stop 2×ATR below entry = $46 → risk/share $4 → **75 shares ≈ $3,750 position (12.5% of account)**.
3. **Hard cap on position size too** (≤ 20–25% of account) — stops don't protect against overnight gaps through the stop.
4. **ATR-based stops:** initial 2–3× ATR(14) below entry (or the 7–8% O'Neil hard stop, whichever is tighter); trail winners with a chandelier exit (3× ATR below the highest high since entry). Never widen a stop.
5. **4–8 concurrent positions max.** Fewer is concentration; more is index-hugging you can't monitor.
6. **Portfolio heat ≤ 5–6%:** the sum of open risk across all positions. New trades wait until heat frees up.
7. **Monthly circuit breaker (Elder's 6% rule):** when realized + open losses hit −6% for the calendar month, stop initiating trades until next month.
8. **Account kill switch:** −15% from starting equity → flat everything, halt, full written post-mortem before another dollar is risked.
9. **Earnings rule decided in advance:** either exit/trim before every earnings print, or accept (and size for) gap risk. No improvising on the day.
10. **No leverage, no options, while learning.** Margin interest runs ~10–12% APR at retail brokers, and the retail options evidence is brutal (multi-leg retail option trades average −16.4% in 3 days in the 2025 UFla study).

### 6.2 Expectancy math you should internalize

- Expectancy = (win% × avg win in R) − (loss% × avg loss in R). E.g., 45% × 2R − 55% × 1R = **+0.35R per trade** — a *good* system.
- At 1% risk and ~15 trades per 2 months, that compounds to roughly +5% *expected* — with a standard deviation of similar size (Section 1.2). Both the +2–6% "good outcome" and the "skilled trader down 1-in-5 windows" fall straight out of this arithmetic.
- Losing streaks are certain, not possible: at 45% win rate, a 7-loss streak somewhere in 100 trades has ~75–80% probability. At 1% risk that's a routine −7% stretch. At 5% risk per trade it's −30% and a blown account. **This is the entire quantitative case for small size.**

### 6.3 Enforce it with Claude: example CLAUDE.md risk block

Put your rules where Claude can't miss them, and make the pre-trade gate a habit:

```markdown
# Trading rules (Claude: enforce these on every trade discussion)
- Account: $X. Max risk per trade: 0.75% ($Y). Position size = risk ÷ (entry − stop).
- Max 6 open positions. Max portfolio heat 5%. Max single position 20% of account.
- Stops: 2×ATR(14) or −8%, whichever is tighter. Never widened. Entered with the order.
- Market gate: no new longs unless SPY > 50d MA and my uptrend checklist passes.
- Earnings: exit or trim to half size before any confirmed earnings date. Verify dates weekly.
- Monthly circuit breaker: −6% month = no new trades until the 1st. −15% total = full halt.
- Claude must refuse to size a trade that violates any rule above, and must ask for
  ticker, entry, stop, and current heat before giving any position size.
- Claude never recommends buys/sells; it analyzes, checks rules, and journals.
```

---

## 7. AI automation architecture that actually works

### 7.1 The consensus pipeline (semi-automated: automate research, never the trigger)

```
[Nightly, scheduled via Claude Code Routines / cron]
1. SCREEN     Finviz export or Massive/EODHD API → mechanical filters
              (trend template, volume, liquidity, sector RS)
2. ANALYZE    Claude reads each candidate: chart stats, latest 10-Q/8-K (EDGAR MCP),
              earnings date check, news (Finnhub), writes a 5-line brief + score
              against YOUR written criteria
3. WATCHLIST  Ranked top ~5 with reasoning + suggested entry/stop/size
              (sized by the CLAUDE.md rules) → markdown/Excel/Sheets
[Morning, 10 minutes, HUMAN]
4. DECIDE     You review the watchlist and market-regime brief. You place any orders.
5. EXECUTE    Alpaca MCP — paper account first (the default), limit orders,
              stop entered with the position
[Continuous]
6. MONITOR    Daily risk brief: open heat, distance to stops, earnings proximity
7. JOURNAL    Every entry/exit logged with thesis and R-multiple
[Weekly]
8. REVIEW     Claude critiques the journal vs your rules: sizing drift, moved stops,
              revenge trades, and computes your actual expectancy to date
```

Why semi-automated: fully autonomous LLM order flow is the most-agreed failure mode among practitioners (hallucinated tickers, nondeterministic repeats, no accountability). A human approval gate caps the blast radius, matches Anthropic's human-in-the-loop policy for finance, and costs you nothing at a 1–2 month horizon. If you ever automate execution, it needs idempotency keys, webhook secret validation, hard position/loss limits, a kill switch — and weeks of paper trading first.

### 7.2 Backtesting (for the mechanical parts only)

- **Start with [backtesting.py](https://github.com/kernc/backtesting.py)** — simplest API, actively maintained again, built-in optimizer. Graduate to **vectorbt** for large parameter sweeps. (backtrader is effectively unmaintained; QuantConnect/LEAN is production-grade but a steep curve.)
- Backtest the *mechanical* screen/entry/exit rules. **Do not backtest "Claude's judgment"** — the model has memorized historical prices, so historical LLM backtests are structurally invalid (lookahead). Claude's contribution is evaluated only by forward/paper results.
- Classic pitfalls that fake good results: parameter overfitting without walk-forward/out-of-sample splits, survivorship bias (testing on today's index members), same-bar fills, ignoring slippage/costs, and single-regime test windows (a 2020–2021 backtest proves nothing about 2022).

### 7.3 Open-source projects: learn from, don't deploy

| Project | Stars (7/2026) | Use it for |
|---|---|---|
| [TradingAgents](https://github.com/TauricResearch/TradingAgents) | ~94k | Reading: how multi-agent bull/bear/risk debate is structured. Never live-deployed |
| [OpenBB](https://github.com/OpenBB-finance/OpenBB) | ~71k | Actually production-quality **data platform** for Python research + AI agents |
| [ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) | ~62k | Reading: persona-agent architecture (Buffett/Burry/etc.). Educational only |
| [microsoft/qlib](https://github.com/microsoft/qlib) | ~47k | Serious factor research if you go quant later |
| [claude-trading-skills](https://github.com/tradermonty/claude-trading-skills) | ~2.5k | **Install this one** — it's the practical toolkit for exactly your workflow |
| [awesome-trading-agents](https://github.com/LLMQuant/awesome-trading-agents) | — | Curated index of the space |

### 7.4 Cost sanity

Agent frameworks burn 10–30 LLM+tool calls per decision. Run Claude as **nightly batch jobs on a fixed watchlist**, not an intraday loop. On Claude Pro, the nightly-scan + journaling workflow fits comfortably; practitioners who persist restrict LLM use to batch research and optimize/cache prompts.

---

## 8. A realistic 8-week plan

**Total budget: ~$20–50/month** (Claude Pro $20 + optionally Finviz Elite ~$25 or Massive Starter $29). Broker: Alpaca (commission-free, free paper account) or your existing broker with Alpaca paper for the pipeline.

**Week 0–1 — Build (no real money):**
- Open Alpaca account; set up paper trading. Install `anthropics/financial-services` (equity-research) + `tradermonty/claude-trading-skills` + MCPs: Alpaca (paper), SEC EDGAR, Alpha Vantage hosted, yfinance.
- Write your rules into CLAUDE.md (Section 6.3 template). Pick ONE strategy family (recommend the breakout/trend playbook, Section 5.2).
- Backtest the mechanical rules on 10+ years including 2008/2020/2022. Build the nightly Routine (screen → analyze → watchlist).

**Week 1–2 — Paper trade the full loop:**
- Run the pipeline daily; place every trade in the paper account exactly per rules; journal everything. Goal: ≥10 paper trades and zero rule violations before any real dollar moves.

**Week 3–8 — Trade small, if and only if the paper loop ran clean:**
- Real money at **0.5% risk per trade**, 4–6 positions max, all rules live. Expect ~10–15 trades.
- Weekly Claude review of the journal. Success is measured by **process metrics** — rules followed 100%, average loss ≤ 1R, heat never exceeded, earnings dates never missed — *not* by P&L, which Section 1.2 shows is mostly noise at this sample size.
- Circuit breakers armed: −6% month = stop for the month; −15% = full halt.

**End of week 8 — Honest review:**
- Compute actual expectancy, win rate, average W/L ratio, max drawdown. Compare against SPY over the same window.
- Decide: continue at same size (default), adjust the system, or stop. Do **not** size up on 8 weeks of results — you need 70–200+ trades for the numbers to mean anything.
- What you own at this point regardless of P&L: a tested pipeline, a written rulebook, a journal, and calibrated expectations. That's the asset the 2 months can actually buy.

**And keep the boring anchor:** whatever portion of your wealth you aren't actively trading with this system belongs in something diversified (index funds) or in your own business — both have better base rates than active trading. Cap the trading account at money whose total loss would not change your life.

---

## 9. US practicalities (as of July 2026)

- **Pattern Day Trader rule: repealed.** FINRA's amendments were approved April 14, 2026 and effective **June 4, 2026** — the PDT designation and $25,000 minimum are gone, replaced by an intraday-margin standard (18-month phase-in to Oct 2027; some brokers still enforce legacy policies during transition). Mostly irrelevant to you anyway: PDT only ever applied to same-day round trips in margin accounts — overnight swing holds never counted.
- **Settlement/margin:** T+1 settlement since May 2024 (cash recycles next day). Reg T margin: 50% initial / 25% maintenance; retail margin interest ~10–12% APR — avoid.
- **Taxes:** holds ≤1 year = short-term capital gains = **ordinary income (10–37% federal, 2026 brackets)** + state tax + possible 3.8% NIIT above $200k MAGI. Holds >1 year = 0/15/20%. Track everything; your broker's 1099-B will, too.
- **Wash-sale rule:** a loss is disallowed if you buy substantially identical securities within 30 days before/after the sale (61-day window; includes IRAs and spousal accounts). The loss defers into the replacement shares' basis. Swing traders cycling the same names hit this constantly — mind December especially.

---

## 10. Sources

**Retail performance evidence:** Barber & Odean 2000 ([paper](http://faculty.haas.berkeley.edu/odean/papers/returns/individual_investor_performance_final.pdf)) · Taiwan day traders ([paper](https://faculty.haas.berkeley.edu/odean/papers/Day%20Traders/Day%20Trade%20040330.pdf)) · Brazil, Chague et al. ([SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3423101)) · Robinhood herding ([SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3715077)) · [SPIVA scorecards](https://www.spglobal.com/spdji/en/spiva/article/us-persistence-scorecard/)

**Strategies:** Jegadeesh & Titman momentum ([SSRN](https://ssrn.com/abstract=299107)) · momentum crashes, Daniel & Moskowitz ([JFE](https://www.kentdaniel.net/papers/published/jfe_16.pdf)) · PEAD review ([Fink 2020](https://static.uni-graz.at/fileadmin/sowi/Working_Paper/2020-04_Fink.pdf)) · [AAII CAN SLIM screen](https://www.aaii.com/stocks/screens/78) · [RSI-2 stats](https://www.quantifiedstrategies.com/rsi-2-strategy/) · [Faber sector rotation](https://chartschool.stockcharts.com/table-of-contents/trading-strategies-and-models/trading-strategies/fabers-sector-rotation-trading-strategy)

**LLM trading evidence:** FINSABER ([arXiv:2505.07078](https://arxiv.org/abs/2505.07078)) · TradingAgents reproduction ([ACM](https://dl.acm.org/doi/10.1145/3800973.3801029)) · TradingAgents paper ([arXiv:2412.20138](https://arxiv.org/pdf/2412.20138)) · [StockBench](https://stockbench.github.io/) · Alpha Arena S1 ([explainer](https://www.datawallet.com/crypto/alpha-arena-nof1-ai-explained)) · [AI Trade Arena 8-month test](https://www.aitradearena.com/research/we-ran-llms-for-8-months)

**Claude ecosystem:** [Claude for Financial Services](https://www.anthropic.com/news/claude-for-financial-services) · [finance agents May 2026](https://www.anthropic.com/news/finance-agents) · [anthropics/financial-services](https://github.com/anthropics/financial-services) · [tradermonty/claude-trading-skills](https://github.com/tradermonty/claude-trading-skills) · [alpaca-mcp-server](https://github.com/alpacahq/alpaca-mcp-server) + [tutorial](https://alpaca.markets/learn/mcp-trading-with-claude-alpaca-google-sheets) · [sec-edgar-mcp](https://github.com/stefanoamorelli/sec-edgar-mcp) · [Massive MCP](https://github.com/polygon-io/mcp_polygon)

**Regulation/tax:** [FINRA Notice 26-10 (PDT repeal)](https://www.finra.org/rules-guidance/notices/26-10) · [Schwab explainer](https://www.schwab.com/learn/story/sec-approves-scrapping-25000-day-trader-minimum) · [2026 capital-gains treatment](https://ustax.tools/tax-insights/short-term-vs-long-term-capital-gains-2026/)

*Prices and availability verified July 2026 where vendor pages permitted; items flagged "(verify)" had conflicting secondary sources — confirm before subscribing.*
