  // ─── ADVISOR ENGINE ──────────────────────────────────────────────

  let advisorSelectedTickers = JSON.parse(localStorage.getItem('advisorTickers') || '[]');
  let advisorDCA = parseFloat(localStorage.getItem('advisorDCA')) || 0;

  const BUFFETT_SUGGESTIONS = [
    { ticker: 'VOO', desc: 'Vanguard S&P 500 ETF', tag: 'Index ETF' },
    { ticker: 'VTI', desc: 'Vanguard Total Stock Market', tag: 'Index ETF' },
    { ticker: 'SCHD', desc: 'Schwab US Dividend Equity', tag: 'Dividend ETF' },
    { ticker: 'VIG', desc: 'Vanguard Dividend Appreciation', tag: 'Dividend ETF' },
    { ticker: 'VXUS', desc: 'Vanguard Intl Stock', tag: 'Intl ETF' },
    { ticker: 'BRK-B', desc: 'Berkshire Hathaway', tag: 'Buffett' },
    { ticker: 'AAPL', desc: 'Apple Inc.', tag: 'Blue Chip' },
    { ticker: 'MSFT', desc: 'Microsoft Corp.', tag: 'Blue Chip' },
    { ticker: 'GOOG', desc: 'Alphabet Inc.', tag: 'Blue Chip' },
    { ticker: 'JPM', desc: 'JPMorgan Chase', tag: 'Financials' },
    { ticker: 'KO', desc: 'Coca-Cola Company', tag: 'Buffett' },
    { ticker: 'JNJ', desc: 'Johnson & Johnson', tag: 'Defensive' },
    { ticker: 'PG', desc: 'Procter & Gamble', tag: 'Defensive' },
    { ticker: 'V', desc: 'Visa Inc.', tag: 'Blue Chip' },
    { ticker: 'OXY', desc: 'Occidental Petroleum', tag: 'Buffett' },
    { ticker: 'QQQ', desc: 'Invesco Nasdaq 100', tag: 'Growth ETF' },
  ];

  // ── Advisor v2 Config System ──
  const ADVISOR_DEFAULTS = {
    fairValueOverrides: {},   // { TICKER: number } manual overrides (original currency)
    convictionRatings: {},    // { TICKER: { rating: 1-5, lastUpdated: ISO string } }
    classTargets: {},         // { 'Stock': 40, 'ETF': 35, 'Crypto': 10, 'REIT': 15 }
    withinClassWeights: {},   // { TICKER: number } optional overrides (% within class)
    factorWeights: { intrinsicValue: 22, strategicRebalance: 20, technicalEntry: 16, momentumGuard: 10, conviction: 10, concentration: 10, recency: 12 },
    recencyEnabled: true,
    recencyWindows: { Stock: 30, ETF: 30, Crypto: 14, REIT: 60 },
    concentrationExponent: 2.0,    // 1.0 = linear, 2.0 = squared, 3.0 = cubic
    maxTickerAllocationPct: 35,    // max % of monthly capital per ticker
    minOrderSize: { Stock: 500, ETF: 50, Crypto: 100, REIT: 500 }, // AED (ETF in USD mapped)
    estimatedFees: { Stock: 30, ETF: 0, Crypto: 0, REIT: 30 },     // AED per trade
    convictionDecayDays: 90,       // auto-decay conviction if not reviewed
    skipThresholdCeiling: 40,        // max adaptive skip threshold
    recencyBaseDecay: 0.8,           // base recency decay constant
    sectorPEDefaults: { bank: 9, real_estate: 11, toll_utility: 16, technology: 22, consumer: 15, other: 12 },
    tickerSectorMap: { 'EMIRATESNBD.AE': 'bank', 'EMAAR.AE': 'real_estate', 'EMAARDEV.AE': 'real_estate', 'PARKIN.AE': 'toll_utility', 'SALIK.AE': 'toll_utility', 'DUBAIRESI.AE': 'real_estate' },
    etfHistoricalPE: 20,
    reitTargetYield: 0.06,
    reitTargetYieldOverrides: {},
    manualFundamentals: {},
    factorContrastStrength: 1.5,   // 1.0 = off, 1.5 = moderate, 2.0+ = aggressive
    adaptiveExponent: true,        // auto-increase exponent when scores cluster
    recommendationLog: [],         // historical recommendations
  };

  function loadAdvisorConfig() {
    try {
      const saved = JSON.parse(localStorage.getItem('advisorConfig') || '{}');
      return {
        fairValueOverrides: { ...ADVISOR_DEFAULTS.fairValueOverrides, ...(saved.fairValueOverrides || saved.fairValues || {}) },
        convictionRatings: { ...ADVISOR_DEFAULTS.convictionRatings, ...saved.convictionRatings },
        classTargets: { ...ADVISOR_DEFAULTS.classTargets, ...saved.classTargets },
        withinClassWeights: { ...ADVISOR_DEFAULTS.withinClassWeights, ...saved.withinClassWeights },
        factorWeights: { ...ADVISOR_DEFAULTS.factorWeights, ...saved.factorWeights },
        recencyEnabled: saved.recencyEnabled ?? ADVISOR_DEFAULTS.recencyEnabled,
        recencyWindows: { ...ADVISOR_DEFAULTS.recencyWindows, ...saved.recencyWindows },
        concentrationExponent: saved.concentrationExponent ?? ADVISOR_DEFAULTS.concentrationExponent,
        maxTickerAllocationPct: saved.maxTickerAllocationPct ?? ADVISOR_DEFAULTS.maxTickerAllocationPct,
        minOrderSize: { ...ADVISOR_DEFAULTS.minOrderSize, ...saved.minOrderSize },
        estimatedFees: { ...ADVISOR_DEFAULTS.estimatedFees, ...saved.estimatedFees },
        convictionDecayDays: saved.convictionDecayDays ?? ADVISOR_DEFAULTS.convictionDecayDays,
        skipThresholdCeiling: saved.skipThresholdCeiling ?? ADVISOR_DEFAULTS.skipThresholdCeiling,
        recencyBaseDecay: saved.recencyBaseDecay ?? ADVISOR_DEFAULTS.recencyBaseDecay,
        sectorPEDefaults: { ...ADVISOR_DEFAULTS.sectorPEDefaults, ...saved.sectorPEDefaults },
        tickerSectorMap: { ...ADVISOR_DEFAULTS.tickerSectorMap, ...saved.tickerSectorMap },
        etfHistoricalPE: saved.etfHistoricalPE ?? ADVISOR_DEFAULTS.etfHistoricalPE,
        reitTargetYield: saved.reitTargetYield ?? ADVISOR_DEFAULTS.reitTargetYield,
        reitTargetYieldOverrides: { ...ADVISOR_DEFAULTS.reitTargetYieldOverrides, ...saved.reitTargetYieldOverrides },
        manualFundamentals: { ...ADVISOR_DEFAULTS.manualFundamentals, ...saved.manualFundamentals },
        factorContrastStrength: saved.factorContrastStrength ?? ADVISOR_DEFAULTS.factorContrastStrength,
        adaptiveExponent: saved.adaptiveExponent ?? ADVISOR_DEFAULTS.adaptiveExponent,
        recommendationLog: saved.recommendationLog || [],
      };
    } catch (e) { return { ...ADVISOR_DEFAULTS }; }
  }

  function saveAdvisorConfig(config) {
    localStorage.setItem('advisorConfig', JSON.stringify(config));
  }

  // Auto-populate class targets from actual holdings types if not set
  function ensureClassTargets(config) {
    const types = new Set(getActiveHoldings().map(h => h.type));
    let needsSave = false;
    types.forEach(t => {
      if (config.classTargets[t] === undefined) {
        if (t === 'Stock' || t === 'Equity') config.classTargets[t] = 40;
        else if (t === 'ETF') config.classTargets[t] = 35;
        else if (t === 'Crypto') config.classTargets[t] = 10;
        else if (t === 'REIT') config.classTargets[t] = 15;
        else config.classTargets[t] = 5;
        needsSave = true;
      }
    });
    if (needsSave) saveAdvisorConfig(config);
    return config;
  }

  // Validate fair value: reject if ratio to price is extreme (> 10x or < 0.1x)
  function validateFairValue(fv, price) {
    if (!fv || !price || price <= 0) return false;
    const ratio = fv / price;
    return ratio >= 0.1 && ratio <= 10;
  }

  // Auto fair value calculation per asset class
  function autoFairValue(ticker, type, lp, config) {
    if (!lp) return { value: null, method: 'none', degraded: true };
    const price = lp.price;

    // BTC: use MA200 as value anchor
    if (type === 'Crypto') {
      if (lp.ma200) return { value: lp.ma200, method: 'auto_ma200', degraded: false };
      // Fallback: midpoint of 52w range
      if (lp.fiftyTwoWeekHigh && lp.fiftyTwoWeekLow) {
        return { value: (lp.fiftyTwoWeekHigh + lp.fiftyTwoWeekLow) / 2, method: 'auto_52w_midpoint', degraded: true };
      }
      return { value: null, method: 'none', degraded: true };
    }

    // ETFs: P/E relative to historical, then MA200 fallback
    if (type === 'ETF') {
      const etfPE = (config && config.etfHistoricalPE) || 20;
      // Check manual fundamentals
      const mf = config && config.manualFundamentals && config.manualFundamentals[ticker.toUpperCase()];
      const mfFresh = mf && mf.lastUpdated && (Date.now() - new Date(mf.lastUpdated).getTime() < 180 * 24 * 60 * 60 * 1000);
      const effectivePE = (mfFresh && mf.trailingPE) || lp.trailingPE;
      if (effectivePE && effectivePE > 0) {
        const fv = price * (etfPE / effectivePE);
        if (validateFairValue(fv, price)) return { value: fv, method: 'auto_pe', degraded: false };
      }
      if (lp.ma200) return { value: lp.ma200, method: 'auto_ma200', degraded: false };
      if (lp.fiftyTwoWeekHigh && lp.fiftyTwoWeekLow) {
        return { value: (lp.fiftyTwoWeekHigh + lp.fiftyTwoWeekLow) / 2, method: 'auto_52w_midpoint', degraded: true };
      }
      return { value: null, method: 'none', degraded: true };
    }

    // REITs: dividend yield approach (target 6% yield), then MA200 fallback
    if (type === 'REIT') {
      const targetYield = (config && config.reitTargetYieldOverrides && config.reitTargetYieldOverrides[ticker.toUpperCase()]) || (config && config.reitTargetYield) || 0.06;
      // Check manual dividend yield first
      const mf = config && config.manualFundamentals && config.manualFundamentals[ticker.toUpperCase()];
      const mfFresh = mf && mf.lastUpdated && (Date.now() - new Date(mf.lastUpdated).getTime() < 180 * 24 * 60 * 60 * 1000);
      const effectiveYield = (mfFresh && mf.dividendYield) || lp.dividendYield;
      if (effectiveYield && effectiveYield > 0) {
        const fv = (effectiveYield * price) / targetYield;
        if (validateFairValue(fv, price)) return { value: fv, method: 'auto_yield', degraded: false };
      }
      if (lp.ma200) return { value: lp.ma200, method: 'auto_ma200', degraded: false };
      if (lp.fiftyTwoWeekHigh && lp.fiftyTwoWeekLow) {
        return { value: (lp.fiftyTwoWeekHigh + lp.fiftyTwoWeekLow) / 2, method: 'auto_52w_midpoint', degraded: true };
      }
      return { value: null, method: 'none', degraded: true };
    }

    // Stocks (UAE equities etc): P/E-based if available, then MA200 fallback
    {
      const sector = (config && config.tickerSectorMap && config.tickerSectorMap[ticker.toUpperCase()]) || 'other';
      const sectorPE = (config && config.sectorPEDefaults && config.sectorPEDefaults[sector]) || (config && config.sectorPEDefaults && config.sectorPEDefaults['other']) || 12;

      // Check manual fundamentals first
      const mf = config && config.manualFundamentals && config.manualFundamentals[ticker.toUpperCase()];
      const mfFresh = mf && mf.lastUpdated && (Date.now() - new Date(mf.lastUpdated).getTime() < 180 * 24 * 60 * 60 * 1000);

      // Prefer manual EPS if fresh
      if (mfFresh && mf.trailingEPS && mf.trailingEPS > 0) {
        const fv = mf.trailingEPS * sectorPE;
        if (validateFairValue(fv, price)) return { value: fv, method: 'auto_pe', degraded: false };
      }
      // Yahoo EPS (Option A)
      if (lp.trailingEPS && lp.trailingEPS > 0) {
        const fv = lp.trailingEPS * sectorPE;
        if (validateFairValue(fv, price)) return { value: fv, method: 'auto_pe', degraded: false };
      }
      // Manual P/E if fresh
      if (mfFresh && mf.trailingPE && mf.trailingPE > 0) {
        const fv = price * (sectorPE / mf.trailingPE);
        if (validateFairValue(fv, price)) return { value: fv, method: 'auto_pe', degraded: false };
      }
      // Yahoo P/E (Option B)
      if (lp.trailingPE && lp.trailingPE > 0) {
        const fv = price * (sectorPE / lp.trailingPE);
        if (validateFairValue(fv, price)) return { value: fv, method: 'auto_pe', degraded: false };
      }
    }
    if (lp.ma200) return { value: lp.ma200, method: 'auto_ma200', degraded: false };
    if (lp.fiftyTwoWeekHigh && lp.fiftyTwoWeekLow) {
      return { value: (lp.fiftyTwoWeekHigh + lp.fiftyTwoWeekLow) / 2, method: 'auto_52w_midpoint', degraded: true };
    }
    return { value: null, method: 'none', degraded: true };
  }

  // Conviction auto-decay check with peakRating floor
  function checkConvictionDecay(config) {
    const now = Date.now();
    const decayMs = (config.convictionDecayDays || 90) * 24 * 60 * 60 * 1000;
    let changed = false;
    const decayed = [];
    Object.entries(config.convictionRatings).forEach(([ticker, data]) => {
      if (typeof data === 'object' && data.lastUpdated) {
        const age = now - new Date(data.lastUpdated).getTime();
        if (age > decayMs && data.rating > 1) {
          const oldR = data.rating;
          const peak = data.peakRating || oldR;
          const decayFloor = Math.max(1, peak - 2);
          const proposedRating = Math.max(1, data.rating - 1);
          const newRating = Math.max(proposedRating, decayFloor);
          if (newRating < oldR) {
            data.rating = newRating;
            decayed.push({ ticker, from: oldR, to: newRating, floorBlocked: proposedRating < decayFloor });
            changed = true;
          }
        }
      }
    });
    if (changed) saveAdvisorConfig(config);
    return decayed;
  }

  // Smooth linear interpolation between anchor points
  function lerpScore(value, anchors) {
    // anchors: sorted array of [input, output] pairs
    if (value <= anchors[0][0]) return anchors[0][1];
    if (value >= anchors[anchors.length - 1][0]) return anchors[anchors.length - 1][1];
    for (let i = 0; i < anchors.length - 1; i++) {
      const [x0, y0] = anchors[i];
      const [x1, y1] = anchors[i + 1];
      if (value >= x0 && value <= x1) {
        const t = (value - x0) / (x1 - x0);
        return y0 + t * (y1 - y0);
      }
    }
    return 50;
  }

  function getRecencyDecayConstant(activeTickerCount, baseDecay = 0.8) {
    const minDecay = 0.3;
    const scaleStart = 3;
    const scaleEnd = 15;
    if (activeTickerCount <= scaleStart) return minDecay;
    if (activeTickerCount >= scaleEnd) return baseDecay;
    const t = (activeTickerCount - scaleStart) / (scaleEnd - scaleStart);
    return minDecay + t * (baseDecay - minDecay);
  }

  // Sigmoid-based contrast stretch — widens factor score distribution before compositing
  function contrastStretch(score, strength) {
    if (strength <= 1.0) return score; // 1.0 = no change
    const normalized = score / 100;
    const centered = normalized - 0.5;
    const stretched = 0.5 + 0.5 * Math.sign(centered) * Math.pow(Math.abs(2 * centered), strength);
    return Math.max(0, Math.min(100, stretched * 100));
  }

  // Adaptive exponent — increases when composite scores cluster in a narrow band
  function getAdaptiveExponent(composites, baseExponent) {
    if (composites.length < 2) return baseExponent;
    const mean = composites.reduce((a, b) => a + b, 0) / composites.length;
    if (mean <= 0) return baseExponent;
    const stdDev = Math.sqrt(composites.reduce((sum, s) => sum + (s - mean) ** 2, 0) / composites.length);
    const cv = stdDev / mean;
    const cvLow = 0.05, cvHigh = 0.15;
    const maxExp = Math.min(baseExponent + 1.0, 3.5);
    if (cv <= cvLow) return maxExp;
    if (cv >= cvHigh) return baseExponent;
    const t = (cv - cvLow) / (cvHigh - cvLow);
    return maxExp - t * (maxExp - baseExponent);
  }

  function checkCircuitBreakers(selectedTickers, config) {
    const warnings = [];
    const activeHoldings = selectedTickers.map(t => holdings[t]).filter(Boolean);
    const totalPortValue = activeHoldings.reduce((s, h) => s + (h.currentValue || h.netInvested), 0);

    // Check: single holding drop >30% from 52w high
    activeHoldings.forEach(h => {
      const lp = livePrices[h.ticker];
      if (lp && lp.fiftyTwoWeekHigh) {
        const dropFromHigh = (lp.fiftyTwoWeekHigh - lp.price) / lp.fiftyTwoWeekHigh;
        if (dropFromHigh > 0.30) {
          warnings.push({ type: 'crash', severity: 'high', ticker: h.ticker, text: `${h.ticker} is ${(dropFromHigh*100).toFixed(0)}% below 52w high` });
        }
      }
    });

    // Check: portfolio-wide drawdown (>70% of positions in red)
    const redCount = activeHoldings.filter(h => h.pnl < 0).length;
    const redPct = activeHoldings.length > 0 ? redCount / activeHoldings.length : 0;
    if (redPct > 0.70) {
      warnings.push({ type: 'drawdown', severity: 'high', text: `${(redPct*100).toFixed(0)}% of holdings are in the red — consider holding more cash` });
    }

    // Check: stale prices (no live data)
    const staleCount = selectedTickers.filter(t => !livePrices[t]).length;
    if (staleCount > 0) {
      warnings.push({ type: 'data', severity: staleCount > selectedTickers.length * 0.5 ? 'high' : 'medium', text: `${staleCount} ticker${staleCount > 1 ? 's' : ''} missing live price data` });
    }

    // Confidence meter
    const fullDataCount = selectedTickers.filter(t => {
      const lp = livePrices[t];
      return lp && lp.ma200 && lp.rsi14 != null;
    }).length;
    const confidence = selectedTickers.length > 0 ? Math.round(fullDataCount / selectedTickers.length * 10) : 0;

    return { warnings, confidence, cashMultiplier: redPct > 0.70 ? 0.5 : 1.0 };
  }

  function getAdvisorPerformance(config) {
    const log = config.recommendationLog || [];
    if (log.length < 2) return null;

    const results = [];
    for (let i = 0; i < log.length - 1; i++) {
      const entry = log[i];
      const entryDate = new Date(entry.date);
      const monthsAgo = (Date.now() - entryDate.getTime()) / (30 * 24 * 60 * 60 * 1000);
      if (monthsAgo > 12) continue; // only last 12 months

      let totalReturn = 0;
      let totalAllocated = 0;

      (entry.tickers || []).forEach(pick => {
        const lp = livePrices[pick.ticker];
        if (!lp) return;
        const h = holdings[pick.ticker];
        if (!h) return;
        // Estimate return: use current price vs avg cost as proxy
        const roi = h.pnlPercent || 0;
        totalReturn += (pick.amount * roi / 100);
        totalAllocated += pick.amount;
      });

      if (totalAllocated > 0) {
        results.push({ date: entry.date, returnPct: (totalReturn / totalAllocated) * 100, picks: entry.tickers?.length || 0 });
      }
    }

    if (results.length === 0) return null;
    const avgReturn = results.reduce((s, r) => s + r.returnPct, 0) / results.length;
    return { entries: results, avgReturnPct: avgReturn, totalEntries: results.length };
  }

  function calculateAdvisorScores(selectedTickers, dcaAmount, { maxPicks = 0 } = {}) {
    const config = loadAdvisorConfig();
    ensureClassTargets(config);
    const activeHoldings = Object.values(holdings).filter(h => h.shares > 0.0001 && selectedTickers.includes(h.ticker));
    if (activeHoldings.length === 0) return { tickers: [], cashReserve: dcaAmount, summary: 'No tickers selected.' };

    const totalPortValue = activeHoldings.reduce((s, h) => s + (h.currentValue || h.netInvested), 0);

    // Pre-compute class-level data
    const classValues = {};
    activeHoldings.forEach(h => {
      const v = h.currentValue || h.netInvested;
      classValues[h.type] = (classValues[h.type] || 0) + v;
    });
    const classTickerCounts = {};
    activeHoldings.forEach(h => { classTickerCounts[h.type] = (classTickerCounts[h.type] || 0) + 1; });

    // Normalize class targets
    const classTargetSum = Object.values(config.classTargets).reduce((s, v) => s + v, 0) || 100;

    // Pre-compute recency data per asset class
    const now = new Date();
    const recentBuysMap = {};
    if (config.recencyEnabled) {
      activeHoldings.forEach(h => {
        const lookback = config.recencyWindows[h.type] || 30;
        if (lookback <= 0) return;
        const cutoff = new Date(now.getTime() - lookback * 24 * 60 * 60 * 1000);
        allTrades.forEach(t => {
          if (t.ticker !== h.ticker || !t.action.includes('BUY')) return;
          const tradeDate = new Date(t.date);
          if (isNaN(tradeDate.getTime())) return;
          if (tradeDate >= cutoff) {
            recentBuysMap[h.ticker] = (recentBuysMap[h.ticker] || 0) + 1;
          }
        });
      });
    }

    // Normalize factor weights — if recency disabled, redistribute its weight
    const fw = { ...config.factorWeights };
    if (!config.recencyEnabled) {
      const recW = fw.recency || 0;
      fw.recency = 0;
      const otherSum = Object.values(fw).reduce((s, v) => s + v, 0);
      if (otherSum > 0) {
        Object.keys(fw).forEach(k => { if (k !== 'recency') fw[k] += (fw[k] / otherSum) * recW; });
      }
    }
    const wSum = Object.values(fw).reduce((s, v) => s + v, 0) || 100;
    const W = {};
    Object.keys(fw).forEach(k => { W[k] = fw[k] / wSum; });

    // Decorrelate Factor 1 (intrinsicValue) and Factor 3 (technicalEntry) when MA200 dominates
    let ma200CorrelationAdjustment = false;
    let techMa200SubW = 0.60, techRsiSubW = 0.40; // default sub-weights for Factor 3
    const ma200FairValueCount = activeHoldings.filter(h => {
      const afv = autoFairValue(h.ticker, h.type, livePrices[h.ticker], config);
      return afv.method === 'auto_ma200';
    }).length;
    if (ma200FairValueCount > activeHoldings.length * 0.5) {
      ma200CorrelationAdjustment = true;
      techMa200SubW = 0.30;
      techRsiSubW = 0.70;
      // Shift 15% of Factor 1 weight to Factor 4 (momentum)
      const shift = W.intrinsicValue * 0.15;
      W.intrinsicValue -= shift;
      W.momentumGuard = (W.momentumGuard || 0) + shift;
      // Re-normalize weights after adjustment
      const wSumAdj = Object.values(W).reduce((s, v) => s + v, 0);
      if (wSumAdj > 0) Object.keys(W).forEach(k => { W[k] = W[k] / wSumAdj; });
    }

    const results = activeHoldings.map(h => {
      const lp = livePrices[h.ticker];
      const curPriceAED = lp ? lp.priceAED : 0;
      const curPriceOrig = lp ? lp.price : 0;
      const hasPrice = !!lp;
      const curValue = h.currentValue || h.netInvested;
      const degradedFactors = [];

      // ── Factor 1: Intrinsic Value Discount (auto + manual override) ──
      let intrinsicValueScore = 40;
      let discount = 0;
      const manualFV = config.fairValueOverrides[h.ticker] || null;
      const autoFV = autoFairValue(h.ticker, h.type, lp, config);
      const fairValue = manualFV || autoFV.value;
      const fairValueMethod = manualFV ? 'manual_override' : autoFV.method;
      let usingFairValueFallback = false;

      if (hasPrice && fairValue && fairValue > 0) {
        discount = (fairValue - curPriceOrig) / fairValue;
        intrinsicValueScore = lerpScore(discount, [[-0.25, 0], [-0.10, 20], [0.0, 40], [0.15, 75], [0.30, 100]]);
      } else if (hasPrice && h.avgCost > 0) {
        // Final fallback: cost basis
        discount = (h.avgCost - curPriceAED) / h.avgCost;
        intrinsicValueScore = lerpScore(discount, [[-0.25, 0], [-0.10, 20], [0.0, 40], [0.15, 75], [0.30, 100]]);
        usingFairValueFallback = true;
        degradedFactors.push('intrinsicValue');
      }

      // Fair value guardrail: cap factor weight contribution if using fallback
      let intrinsicValueConfidence = 1.0;
      if (usingFairValueFallback) intrinsicValueConfidence = 0.5;
      if (fairValue && curPriceOrig > 0) {
        const fvRatio = fairValue / curPriceOrig;
        if (fvRatio > 2.0 || fvRatio < 0.5) {
          intrinsicValueConfidence = Math.min(intrinsicValueConfidence, 0.3);
          degradedFactors.push('intrinsicValue_extreme');
        }
      }

      // ── Factor 2: Strategic Weight Rebalance ──
      let strategicRebalanceScore = 50;
      let targetWeight = 0, actualWeight = 0, weightDeviation = 0;
      if (totalPortValue > 0) {
        const classTarget = (config.classTargets[h.type] || 0) / classTargetSum;
        const withinClassW = config.withinClassWeights[h.ticker]
          ? config.withinClassWeights[h.ticker] / 100
          : 1 / (classTickerCounts[h.type] || 1);
        targetWeight = classTarget * withinClassW;
        actualWeight = curValue / totalPortValue;
        weightDeviation = targetWeight - actualWeight;
        strategicRebalanceScore = lerpScore(weightDeviation, [[-0.10, 0], [-0.05, 25], [0.0, 50], [0.05, 75], [0.10, 100]]);
      }

      // ── Factor 3: Technical Entry Signal ──
      let technicalEntryScore = 50;
      let rangePosition = 50;
      let techDegraded = true;
      let ma200Score = null, rsiScore = null;

      if (lp && lp.ma200 && lp.rsi14 != null) {
        // Full mode: MA200 distance (60%) + RSI(14) (40%)
        const ma200Dist = (lp.price - lp.ma200) / lp.ma200;
        ma200Score = lerpScore(ma200Dist, [[-0.20, 100], [-0.10, 80], [0.0, 50], [0.10, 30], [0.20, 10]]);
        rsiScore = lerpScore(lp.rsi14, [[30, 100], [40, 70], [50, 50], [60, 30], [70, 10]]);
        technicalEntryScore = ma200Score * techMa200SubW + rsiScore * techRsiSubW;
        techDegraded = false;
        // Also compute range position for display
        if (lp.fiftyTwoWeekHigh && lp.fiftyTwoWeekLow && lp.fiftyTwoWeekHigh > lp.fiftyTwoWeekLow) {
          rangePosition = ((lp.price - lp.fiftyTwoWeekLow) / (lp.fiftyTwoWeekHigh - lp.fiftyTwoWeekLow)) * 100;
        }
      } else if (lp && lp.fiftyTwoWeekHigh && lp.fiftyTwoWeekLow && lp.fiftyTwoWeekHigh > lp.fiftyTwoWeekLow) {
        // Fallback: sigmoid on 52-week range
        rangePosition = ((lp.price - lp.fiftyTwoWeekLow) / (lp.fiftyTwoWeekHigh - lp.fiftyTwoWeekLow)) * 100;
        technicalEntryScore = 100 / (1 + Math.exp((rangePosition - 50) / 15));
        techDegraded = true;
      }
      if (techDegraded) degradedFactors.push('technicalEntry');

      // ── Factor 4: Momentum Guard ──
      let momentumGuardScore = 50;
      let return6m = null;
      let momDegraded = true;

      if (lp && lp.return6m != null) {
        // Full mode: actual 6-month return
        return6m = lp.return6m;
        momentumGuardScore = lerpScore(return6m, [[-0.30, 5], [-0.20, 15], [-0.10, 30], [0.0, 50], [0.10, 70], [0.20, 85]]);
        momDegraded = false;
      } else if (lp && lp.fiftyTwoWeekHigh && lp.fiftyTwoWeekLow && lp.fiftyTwoWeekHigh > lp.fiftyTwoWeekLow) {
        // Fallback: distance from 52w low as momentum proxy
        const distFromLow = (lp.price - lp.fiftyTwoWeekLow) / (lp.fiftyTwoWeekHigh - lp.fiftyTwoWeekLow);
        momentumGuardScore = lerpScore(distFromLow, [[0.05, 5], [0.20, 20], [0.50, 50], [0.80, 80]]);
        return6m = distFromLow - 0.5; // rough estimate
        momDegraded = true;
      }
      if (momDegraded) degradedFactors.push('momentumGuard');

      // ── Factor 5: Auto-Conviction (replaces manual stars) ──
      // Based on: holding duration, DCA frequency, portfolio weight trend
      const convData = config.convictionRatings[h.ticker];
      const manualConviction = (typeof convData === 'object' ? convData?.rating : convData) || 0;
      const convictionLastUpdated = typeof convData === 'object' ? convData?.lastUpdated : null;

      // Auto-conviction components
      const holdingMonths = h.buys > 0 ? Math.max(1, h.buys) : 1; // proxy for holding duration
      const dcaFrequency = (recentBuysMap[h.ticker] || 0) > 0 ? 1 : 0; // bought recently = committed
      const weightTrend = totalPortValue > 0 ? (curValue / totalPortValue) : 0;

      // Holding duration score: more buys = higher conviction (caps at 10 buys)
      const durationScore = lerpScore(holdingMonths, [[1, 20], [3, 40], [5, 60], [8, 80], [10, 95]]);
      // Weight score: larger positions = higher conviction
      const weightScore = lerpScore(weightTrend * 100, [[1, 20], [5, 40], [10, 60], [15, 75], [20, 90]]);
      // DCA consistency bonus
      const dcaBonus = dcaFrequency > 0 ? 10 : 0;

      // Blend: 50% duration, 30% weight, 20% manual (if set, else duration bonus)
      let convictionScore;
      if (manualConviction > 0) {
        const manualScore = lerpScore(manualConviction, [[1, 10], [2, 30], [3, 50], [4, 75], [5, 95]]);
        convictionScore = durationScore * 0.40 + weightScore * 0.25 + manualScore * 0.35;
      } else {
        convictionScore = Math.min(95, durationScore * 0.55 + weightScore * 0.35 + dcaBonus);
      }
      const convictionRating = manualConviction || Math.round(convictionScore / 20); // 1-5 equivalent for display

      // ── Factor 6: Correlation-Aware Concentration ──
      let concentrationScore = 100;
      let classConcentration = 0, posConcentration = 0;
      if (totalPortValue > 0) {
        const classTarget = (config.classTargets[h.type] || 0) / classTargetSum;
        const actualClassWeight = (classValues[h.type] || 0) / totalPortValue;
        const classOverweight = actualClassWeight - classTarget;
        const classScore = lerpScore(classOverweight, [[0.0, 100], [0.05, 50], [0.10, 20], [0.15, 0]]);

        posConcentration = curValue / totalPortValue;
        // Tighter thresholds per spec
        const posScore = lerpScore(posConcentration, [[0.0, 100], [0.15, 100], [0.20, 60], [0.25, 30], [0.30, 0]]);

        classConcentration = actualClassWeight * 100;
        concentrationScore = classScore * 0.70 + posScore * 0.30;
      }

      // ── Factor 7: Recency Spread ──
      const lookbackDays = config.recencyEnabled ? (config.recencyWindows[h.type] || 0) : 0;
      let recencyScore = 50;
      let recentBuyCount = 0;
      if (lookbackDays > 0) {
        recentBuyCount = recentBuysMap[h.ticker] || 0;
        // Exponential decay scaled by portfolio size
        const recencyDecay = getRecencyDecayConstant(activeHoldings.length, config.recencyBaseDecay || 0.8);
        recencyScore = 100 * Math.exp(-recencyDecay * recentBuyCount);
      }

      // ── Factor Contrast Stretch ──
      const cs = config.factorContrastStrength ?? 1.5;
      const rawFactors = { intrinsicValue: intrinsicValueScore, strategicRebalance: strategicRebalanceScore, technicalEntry: technicalEntryScore, momentumGuard: momentumGuardScore, conviction: convictionScore, concentration: concentrationScore, recency: recencyScore };
      const sIV = contrastStretch(intrinsicValueScore, cs);
      const sSR = contrastStretch(strategicRebalanceScore, cs);
      const sTE = contrastStretch(technicalEntryScore, cs);
      const sMG = contrastStretch(momentumGuardScore, cs);
      const sCV = contrastStretch(convictionScore, cs);
      const sCN = contrastStretch(concentrationScore, cs);
      const sRC = contrastStretch(recencyScore, cs);

      // ── Composite (uses contrast-stretched scores) ──
      // Apply intrinsic value confidence: redistribute lost weight to other factors
      const ivWeight = W.intrinsicValue || 0;
      const ivEffectiveWeight = ivWeight * intrinsicValueConfidence;
      const ivLostWeight = ivWeight - ivEffectiveWeight;
      const otherWeightSum = (W.strategicRebalance || 0) + (W.technicalEntry || 0) + (W.momentumGuard || 0) + (W.conviction || 0) + (W.concentration || 0) + (W.recency || 0);
      const redistributionFactor = otherWeightSum > 0 ? (1 + ivLostWeight / otherWeightSum) : 1;

      const composite = Math.max(0, Math.min(100,
        (sIV * ivEffectiveWeight) +
        (sSR * (W.strategicRebalance || 0) * redistributionFactor) +
        (sTE * (W.technicalEntry || 0) * redistributionFactor) +
        (sMG * (W.momentumGuard || 0) * redistributionFactor) +
        (sCV * (W.conviction || 0) * redistributionFactor) +
        (sCN * (W.concentration || 0) * redistributionFactor) +
        (sRC * (W.recency || 0) * redistributionFactor)
      ));

      const details = {
        discount, fairValue, fairValueMethod, usingFairValueFallback,
        autoFairValue: autoFV.value, autoFairValueMethod: autoFV.method,
        targetWeight, actualWeight, weightDeviation,
        rangePosition, techDegraded, ma200Score, rsiScore,
        ma200: lp?.ma200 || null, rsi14: lp?.rsi14 || null,
        return6m, momDegraded,
        convictionRating, convictionLastUpdated,
        classConcentration, posConcentration: posConcentration * 100,
        recentBuyCount, lookbackDays,
        curPriceAED, curPriceOrig,
        avgCost: h.avgCost, shares: h.shares, curValue, netInvested: h.netInvested,
        buys: h.buys, type: h.type,
        fiftyTwoWeekHigh: lp?.fiftyTwoWeekHigh || null,
        fiftyTwoWeekLow: lp?.fiftyTwoWeekLow || null,
        exchangeRate: AED_USD_RATE,
        rawFactors, contrastStrength: cs,
      };

      // Generate signals
      const signals = [];
      if (intrinsicValueScore > 65) signals.push({ type: 'value', text: discount > 0 ? `${(discount*100).toFixed(0)}% below ${manualFV ? 'fair value' : autoFV.method !== 'none' ? 'auto FV' : 'avg cost'}` : 'Near value' });
      if (strategicRebalanceScore > 65) signals.push({ type: 'rebalance', text: `${(weightDeviation*100).toFixed(1)}pp underweight` });
      if (technicalEntryScore > 65) signals.push({ type: 'technical', text: !techDegraded && lp?.rsi14 < 35 ? `RSI ${lp.rsi14.toFixed(0)} oversold` : rangePosition < 35 ? 'Near 52w low' : 'Good entry' });
      if (momentumGuardScore > 65) signals.push({ type: 'momentum', text: 'Positive momentum' });
      if (momentumGuardScore < 25) signals.push({ type: 'hold', text: 'Weak momentum' });
      if (convictionScore > 65) signals.push({ type: 'conviction', text: `★${convictionRating} conviction` });
      if (concentrationScore < 25) signals.push({ type: 'concentration', text: 'Over-concentrated' });
      if (lookbackDays > 0 && recentBuyCount === 0) signals.push({ type: 'value', text: `Fresh — no buys in ${lookbackDays}d` });
      if (lookbackDays > 0 && recentBuyCount >= 2) signals.push({ type: 'hold', text: `Bought ${recentBuyCount}× recently` });
      if (intrinsicValueScore < 20) signals.push({ type: 'hold', text: 'Above fair value' });

      return {
        ticker: h.ticker, name: lp?.name || h.ticker,
        assetClass: h.type, composite, skip: false,
        factors: { intrinsicValue: sIV, strategicRebalance: sSR, technicalEntry: sTE, momentumGuard: sMG, conviction: sCV, concentration: sCN, recency: sRC },
        signals, details, degradedFactors, hasPrice
      };
    });

    // Sort by composite descending
    results.sort((a, b) => b.composite - a.composite);

    // Adaptive skip threshold: max(25, 20th percentile)
    const allComposites = results.map(r => r.composite).sort((a,b) => a-b);
    const p20Idx = Math.floor(allComposites.length * 0.20);
    const p20 = allComposites[p20Idx] || 0;
    const skipThresholdCeiling = config.skipThresholdCeiling || 40;
    const skipThreshold = Math.max(25, Math.min(skipThresholdCeiling, p20));

    results.forEach(r => {
      if (r.composite < skipThreshold) {
        r.skip = true;
        r.signals = [{ type: 'hold', text: `Skip — score ${r.composite.toFixed(0)} below threshold ${skipThreshold.toFixed(0)}` }];
      }
    });

    // Apply max picks (focus mode)
    if (maxPicks > 0 && maxPicks < results.length) {
      let investableCount = 0;
      results.forEach(r => {
        if (r.skip) return;
        investableCount++;
        if (investableCount > maxPicks) {
          r.skip = true;
          r.focusSkip = true;
          r.signals = [{ type: 'hold', text: 'Focus — prioritizing top picks' }];
        }
      });
    }

    // Power-law concentration with adaptive exponent
    const baseExponent = config.concentrationExponent || 2.0;
    let active = results.filter(r => !r.skip);
    const activeComposites = active.map(r => r.composite);
    const exponent = config.adaptiveExponent !== false
      ? getAdaptiveExponent(activeComposites, baseExponent)
      : baseExponent;
    const applyPowerLaw = () => {
      const powered = active.map(r => Math.pow(r.composite, exponent));
      const totalP = powered.reduce((s, v) => s + v, 0);
      active.forEach((r, i) => {
        r.allocationPct = totalP > 0 ? (powered[i] / totalP * 100) : 0;
        r.allocationAmt = totalP > 0 ? (powered[i] / totalP * dcaAmount) : 0;
      });
    };
    applyPowerLaw();

    // Max allocation cap per ticker
    const maxCapPct = config.maxTickerAllocationPct || 35;
    const maxCapAmt = dcaAmount * maxCapPct / 100;
    let cappedExcess = 0;
    let needsRedist = active.some(r => r.allocationAmt > maxCapAmt);
    let iterations = 0;
    while (needsRedist && iterations < 5) {
      cappedExcess = 0;
      const capped = [];
      const uncapped = [];
      active.forEach(r => {
        if (r.allocationAmt > maxCapAmt) {
          cappedExcess += r.allocationAmt - maxCapAmt;
          r.allocationAmt = maxCapAmt;
          r.allocationPct = maxCapPct;
          capped.push(r);
        } else {
          uncapped.push(r);
        }
      });
      if (cappedExcess > 0 && uncapped.length > 0) {
        const uncappedPowered = uncapped.map(r => Math.pow(r.composite, exponent));
        const uncappedTotal = uncappedPowered.reduce((s, v) => s + v, 0);
        uncapped.forEach((r, i) => {
          const share = uncappedTotal > 0 ? uncappedPowered[i] / uncappedTotal : 0;
          r.allocationAmt += cappedExcess * share;
          r.allocationPct = (r.allocationAmt / dcaAmount) * 100;
        });
      }
      needsRedist = active.some(r => r.allocationAmt > maxCapAmt * 1.01);
      iterations++;
    }

    // Minimum order size + fee drag check (hard-capped iterations for convergence)
    let cashReserve = 0;
    const MAX_FEE_ITERATIONS = 3;
    for (let feeIter = 0; feeIter < MAX_FEE_ITERATIONS; feeIter++) {
      const toRemove = [];
      active.forEach(r => {
        const h = activeHoldings.find(hh => hh.ticker === r.ticker);
        const type = h ? h.type : 'Stock';
        const minOrder = config.minOrderSize[type] || 50;
        const fee = config.estimatedFees[type] || 0;
        const feeDragPct = r.allocationAmt > 0 ? (fee / r.allocationAmt) : 1;
        if (r.allocationAmt < minOrder || feeDragPct > 0.05) {
          toRemove.push(r);
        }
      });

      if (toRemove.length === 0) break; // Stable
      if (toRemove.length >= active.length) {
        // Everything deferred — all to cash
        toRemove.forEach(r => {
          cashReserve += r.allocationAmt;
          r.skip = true;
          r.floorSkip = true;
          r.allocationPct = 0;
          r.allocationAmt = 0;
          r.status = 'DEFERRED';
          const h = activeHoldings.find(hh => hh.ticker === r.ticker);
          const type = h ? h.type : 'Stock';
          const minOrder = config.minOrderSize[type] || 50;
          r.signals = [{ type: 'hold', text: `Below ${type} min order (${minOrder} AED)` }];
        });
        active = [];
        break;
      }

      toRemove.forEach(r => {
        cashReserve += r.allocationAmt;
        r.skip = true;
        r.floorSkip = true;
        r.allocationPct = 0;
        r.allocationAmt = 0;
        const h = activeHoldings.find(hh => hh.ticker === r.ticker);
        const type = h ? h.type : 'Stock';
        const minOrder = config.minOrderSize[type] || 50;
        const fee = config.estimatedFees[type] || 0;
        const feeDrag = r.allocationAmt > 0 ? fee / r.allocationAmt : 0;
        r.signals = [{ type: 'hold', text: feeDrag > 0.05 ? `Fee drag ${(feeDrag*100).toFixed(0)}% > 5%` : `Below ${type} min order (${minOrder} AED)` }];
        r.status = 'DEFERRED';
      });
      active = results.filter(r => !r.skip);
      if (active.length === 0) break;
      // Redistribute
      const redistributable = dcaAmount - cashReserve;
      const powered2 = active.map(r => Math.pow(r.composite, exponent));
      const totalP2 = powered2.reduce((s, v) => s + v, 0);
      active.forEach((r, i) => {
        r.allocationPct = totalP2 > 0 ? (powered2[i] / totalP2 * 100) : 0;
        r.allocationAmt = totalP2 > 0 ? (powered2[i] / totalP2 * redistributable) : 0;
      });
    }
    // Final pass: force-defer any remaining below-minimum without re-proportioning
    if (active.length > 0) {
      active.forEach(r => {
        const h = activeHoldings.find(hh => hh.ticker === r.ticker);
        const type = h ? h.type : 'Stock';
        const minOrder = config.minOrderSize[type] || 50;
        if (r.allocationAmt < minOrder) {
          cashReserve += r.allocationAmt;
          r.skip = true;
          r.floorSkip = true;
          r.allocationPct = 0;
          r.allocationAmt = 0;
          r.signals = [{ type: 'hold', text: `Below ${type} min order (${minOrder} AED) — force deferred` }];
          r.status = 'DEFERRED';
        }
      });
      active = results.filter(r => !r.skip);
    }

    // Cash reserve: if < 2 tickers eligible, hold remainder as cash
    if (active.length < 2 && active.length > 0) {
      const maxCap2 = dcaAmount * maxCapPct / 100;
      active.forEach(r => {
        if (r.allocationAmt > maxCap2) {
          cashReserve += r.allocationAmt - maxCap2;
          r.allocationAmt = maxCap2;
          r.allocationPct = maxCapPct;
        }
      });
    }

    // Set status on all results
    results.forEach(r => {
      if (!r.skip) {
        r.allocationPct = dcaAmount > 0 ? (r.allocationAmt / dcaAmount * 100) : 0;
        r.status = 'BUY';
      } else if (!r.status) {
        r.status = r.focusSkip ? 'FOCUS_CUT' : r.floorSkip ? 'DEFERRED' : 'SKIP';
      }
    });

    // Sort: investable first (by allocation desc), then focus, then floor, then skip
    results.sort((a, b) => {
      if (a.skip !== b.skip) return a.skip ? 1 : -1;
      if (a.skip && b.skip) {
        const order = { FOCUS_CUT: 0, DEFERRED: 1, SKIP: 2 };
        if ((order[a.status] || 0) !== (order[b.status] || 0)) return (order[a.status] || 0) - (order[b.status] || 0);
      }
      return b.allocationPct - a.allocationPct || b.composite - a.composite;
    });

    // Build summary
    const buyCount = results.filter(r => r.status === 'BUY').length;
    const topPick = results[0];
    const summary = buyCount > 0
      ? `${buyCount} pick${buyCount>1?'s':''} this month. Top: ${escapeHTML(topPick.ticker)} (${topPick.allocationPct.toFixed(0)}%).${cashReserve > 0 ? ` ${formatMoney(cashReserve)} held as cash.` : ''}`
      : 'No strong buy signals. Consider holding cash this month.';

    return { tickers: results, cashReserve, summary, skipThreshold, ma200CorrelationAdjustment, effectiveExponent: exponent, baseExponent };
  }

  // Store last results for detail popup
  let lastAdvisorResults = [];
  let lastAdvisorOutput = null; // { tickers, cashReserve, summary, skipThreshold }

  function renderAdvisor() {
    document.getElementById('advisorCurrLabel').textContent = currentCurrency === 'USD' ? '$' : 'AED';

    const amountInput = document.getElementById('advisorAmountInput');
    if (advisorDCA > 0 && !amountInput.value) amountInput.value = currentCurrency === 'USD' ? Math.round(advisorDCA / AED_USD_RATE) : advisorDCA;

    amountInput.onchange = () => {
      let val = parseFloat(amountInput.value) || 0;
      advisorDCA = currentCurrency === 'USD' ? val * AED_USD_RATE : val;
      localStorage.setItem('advisorDCA', advisorDCA);
    };

    const activeHoldings = getActiveHoldings();
    advisorSelectedTickers = advisorSelectedTickers.filter(t => activeHoldings.some(h => h.ticker === t));

    renderAdvisorTickerList();
    updateAdvisorSelectorPreview();
    renderAdvisorSuggestions();
    renderAdvisorSettings();
  }

  function toggleAdvisorSettings() {
    const panel = document.getElementById('advisorSettingsPanel');
    const toggle = document.getElementById('advisorSettingsToggle');
    panel.classList.toggle('collapsed');
    toggle.classList.toggle('open');
  }

  async function saveEnhancedProxy() {
    const input = document.getElementById('enhancedProxyInput');
    const status = document.getElementById('proxyStatus');
    const url = input.value.trim();

    if (!url) {
      localStorage.removeItem('enhancedProxyUrl');
      status.innerHTML = '<span style="color:var(--text-3);">Proxy removed. Using basic mode.</span>';
      return;
    }

    status.innerHTML = '<span style="color:#ff9f0a;">Testing proxy with VOO...</span>';
    try {
      const res = await fetch(`${url}?symbol=VOO`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const result = data?.chart?.result?.[0];
      if (!result) throw new Error('Invalid response format');

      const closes = result?.indicators?.quote?.[0]?.close?.filter(c => c != null) || [];
      const meta = result.meta || {};
      const hasPE = meta.trailingPE != null;
      const hasDiv = meta.dividendYield != null;

      localStorage.setItem('enhancedProxyUrl', url);

      status.innerHTML = `<span style="color:var(--emerald);">✅ Connected!</span> <span style="color:var(--text-3);">${closes.length} daily closes, P/E: ${hasPE ? meta.trailingPE.toFixed(1) : 'N/A'}, DivYield: ${hasDiv ? (meta.dividendYield*100).toFixed(2)+'%' : 'N/A'}</span>
        <div style="font-size:9px;color:#ff9f0a;margin-top:4px;">Reload the page to use the new proxy for all data.</div>`;
    } catch (e) {
      status.innerHTML = `<span style="color:var(--red);">❌ Failed: ${e.message}</span>`;
    }
  }

  function renderAdvisorSettings() {
    const config = loadAdvisorConfig();
    ensureClassTargets(config);
    const activeHoldings = getActiveHoldings();
    const selectedHoldings = activeHoldings.filter(h => advisorSelectedTickers.includes(h.ticker));
    const tickersToShow = selectedHoldings.length > 0 ? selectedHoldings : activeHoldings;

    // ── Proxy Status ──
    const proxyInput = document.getElementById('enhancedProxyInput');
    if (proxyInput) {
      proxyInput.value = localStorage.getItem('enhancedProxyUrl') || '';
      const proxyStatus = document.getElementById('proxyStatus');
      if (ENHANCED_PROXY) {
        const anyTicker = tickersToShow[0]?.ticker;
        const lp = anyTicker ? livePrices[anyTicker] : null;
        const hasHistory = lp && lp.dailyCloses && lp.dailyCloses.length > 50;
        const hasFundamentals = lp && lp.trailingPE != null;
        if (hasHistory || hasFundamentals) {
          proxyStatus.innerHTML = `<span style="color:var(--emerald);">✅ Enhanced proxy active</span> <span style="color:var(--text-3);">${lp.dailyCloses?.length || 0} daily closes${hasFundamentals ? ', P/E data' : ''}</span>`;
        } else {
          proxyStatus.innerHTML = `<span style="color:#ff9f0a;">⚠ Proxy set but no enhanced data detected. Check URL.</span>`;
        }
      } else {
        proxyStatus.innerHTML = `<span style="color:var(--text-3);">Basic mode — 52w range only. Deploy enhanced proxy for full data.</span>`;
      }
    }

    // ── Fair Values (auto + manual override) ──
    const fvList = document.getElementById('advisorFairValueList');
    fvList.innerHTML = tickersToShow.map(h => {
      const lp = livePrices[h.ticker];
      const currSym = lp && lp.currency === 'AED' ? 'AED ' : '$';
      const curPrice = lp ? lp.price : 0;
      const manualFV = config.fairValueOverrides[h.ticker] || '';
      const auto = autoFairValue(h.ticker, h.type, lp, config);
      const autoStr = auto.value ? `${currSym}${auto.value.toFixed(2)} (${auto.method.replace('auto_','')})` : 'N/A';
      return `<div class="advisor-config-row" style="flex-wrap:wrap;">
        <div style="min-width:80px;"><div class="label">${escapeHTML(h.ticker)}</div><div class="sublabel">${currSym}${curPrice.toFixed(2)} now</div><div class="sublabel" style="color:${auto.degraded ? '#ff9f0a' : 'var(--emerald)'}">Auto: ${autoStr}</div></div>
        <input type="number" class="advisor-config-input" value="${manualFV}" placeholder="auto"
          onchange="updateAdvisorFairValue('${escapeHTML(h.ticker)}', this.value)" step="0.01" title="Manual override (leave blank for auto)">
      </div>`;
    }).join('');

    // ── Conviction Ratings (auto-calculated + optional manual override) ──
    const cvList = document.getElementById('advisorConvictionList');
    const totalPortVal = tickersToShow.reduce((s, h) => s + (h.currentValue || h.netInvested), 0);
    cvList.innerHTML = tickersToShow.map(h => {
      const convData = config.convictionRatings[h.ticker];
      const manualRating = (typeof convData === 'object' ? convData?.rating : convData) || 0;
      const lastUp = typeof convData === 'object' && convData?.lastUpdated
        ? new Date(convData.lastUpdated).toLocaleDateString() : null;

      // Calculate auto-conviction for display
      const buyCount = h.buys > 0 ? Math.max(1, h.buys) : 1;
      const curVal = h.currentValue || h.netInvested;
      const wt = totalPortVal > 0 ? (curVal / totalPortVal) : 0;
      const durScore = lerpScore(buyCount, [[1, 20], [3, 40], [5, 60], [8, 80], [10, 95]]);
      const wtScore = lerpScore(wt * 100, [[1, 20], [5, 40], [10, 60], [15, 75], [20, 90]]);
      let autoScore;
      if (manualRating > 0) {
        const ms = lerpScore(manualRating, [[1, 10], [2, 30], [3, 50], [4, 75], [5, 95]]);
        autoScore = durScore * 0.40 + wtScore * 0.25 + ms * 0.35;
      } else {
        autoScore = Math.min(95, durScore * 0.55 + wtScore * 0.35);
      }
      const autoEquiv = Math.round(autoScore / 20); // 1-5 equivalent
      const autoColor = autoScore >= 65 ? 'var(--emerald)' : autoScore >= 40 ? '#ff9f0a' : 'var(--red)';

      const stars = [1,2,3,4,5].map(n =>
        `<svg class="advisor-star ${n <= manualRating ? 'active' : ''}" viewBox="0 0 24 24" fill="${n <= manualRating ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5" width="20" height="20" onclick="updateAdvisorConviction('${escapeHTML(h.ticker)}', ${n === manualRating ? 0 : n})"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
      ).join('');

      return `<div class="advisor-config-row" style="flex-wrap:wrap;gap:4px;">
        <div style="flex:1;min-width:100px;">
          <div class="label">${escapeHTML(h.ticker)}</div>
          <div class="sublabel">Auto: <span style="color:${autoColor};font-weight:600;">${autoScore.toFixed(0)}/100</span> (${buyCount} buy${buyCount !== 1 ? 's' : ''}, ${(wt*100).toFixed(1)}% weight)</div>
          ${manualRating > 0 ? `<div class="sublabel">Manual override: ★${manualRating} ${lastUp ? '(set ' + lastUp + ')' : ''}</div>` : `<div class="sublabel" style="opacity:0.4;">No manual override — tap to set</div>`}
        </div>
        <div class="advisor-star-row">${stars}</div>
      </div>`;
    }).join('');

    // ── Asset Class Targets ──
    const types = [...new Set(activeHoldings.map(h => h.type))].sort();
    const ctList = document.getElementById('advisorClassTargetList');
    ctList.innerHTML = types.map(t => {
      const val = config.classTargets[t] || 0;
      return `<div class="advisor-config-row">
        <div class="label">${t}</div>
        <div style="display:flex;align-items:center;gap:4px;">
          <input type="number" class="advisor-config-input" value="${val}" min="0" max="100"
            onchange="updateAdvisorClassTarget('${t}', this.value)">
          <span style="font-size:12px;color:var(--text-3);">%</span>
        </div>
      </div>`;
    }).join('');
    updateClassTargetSum();

    // ── Factor Weights ──
    const fwKeys = ['intrinsicValue', 'strategicRebalance', 'technicalEntry', 'momentumGuard', 'conviction', 'concentration', 'recency'];
    const fwList = document.getElementById('advisorFactorWeightList');
    fwList.innerHTML = fwKeys.map(k => {
      const val = config.factorWeights[k] || 0;
      return `<div class="advisor-config-row">
        <div><div class="label" style="color:${FACTOR_COLORS[k]}">${FACTOR_LABELS[k]}</div></div>
        <div style="display:flex;align-items:center;gap:4px;">
          <input type="number" class="advisor-config-input" value="${val}" min="0" max="100"
            id="fw_${k}" onchange="updateAdvisorFactorWeight('${k}', this.value)">
          <span style="font-size:12px;color:var(--text-3);">%</span>
        </div>
      </div>`;
    }).join('');
    updateFactorWeightSum();

    // ── Recency Windows ──
    const rcList = document.getElementById('advisorRecencyList');
    rcList.innerHTML = types.map(t => {
      const val = config.recencyWindows[t] || 0;
      return `<div class="advisor-config-row">
        <div class="label">${t}</div>
        <div style="display:flex;align-items:center;gap:4px;">
          <select class="advisor-config-input" style="width:80px;" onchange="updateAdvisorRecencyWindow('${t}', this.value)">
            <option value="0" ${val===0?'selected':''}>Off</option>
            <option value="14" ${val===14?'selected':''}>14d</option>
            <option value="30" ${val===30?'selected':''}>30d</option>
            <option value="45" ${val===45?'selected':''}>45d</option>
            <option value="60" ${val===60?'selected':''}>60d</option>
          </select>
        </div>
      </div>`;
    }).join('');

    // ── Advanced Allocation Controls (rendered into the Focus & Recency settings group) ──
    // Concentration exponent
    const expEl = document.getElementById('advisorConcentrationExp');
    if (expEl) {
      expEl.value = config.concentrationExponent || 2.0;
      expEl.onchange = () => {
        const c = loadAdvisorConfig();
        c.concentrationExponent = Math.max(1, Math.min(3, parseFloat(expEl.value) || 2));
        saveAdvisorConfig(c);
      };
    }
    // Max ticker cap
    const maxCapEl = document.getElementById('advisorMaxCap');
    if (maxCapEl) {
      maxCapEl.value = config.maxTickerAllocationPct || 35;
      maxCapEl.onchange = () => {
        const c = loadAdvisorConfig();
        c.maxTickerAllocationPct = Math.max(10, Math.min(100, parseInt(maxCapEl.value) || 35));
        saveAdvisorConfig(c);
      };
    }
    // Contrast strength
    const csEl = document.getElementById('advisorContrastStrength');
    if (csEl) {
      csEl.value = (config.factorContrastStrength ?? 1.5).toFixed(2).replace(/0$/, '').replace(/\.$/, '.0');
      // Match closest option
      const opts = [...csEl.options].map(o => parseFloat(o.value));
      const target = config.factorContrastStrength ?? 1.5;
      const closest = opts.reduce((a, b) => Math.abs(b - target) < Math.abs(a - target) ? b : a);
      csEl.value = closest;
      csEl.onchange = () => {
        const c = loadAdvisorConfig();
        c.factorContrastStrength = Math.max(1.0, Math.min(2.5, parseFloat(csEl.value) || 1.5));
        saveAdvisorConfig(c);
      };
    }
    // Adaptive exponent
    const aeEl = document.getElementById('advisorAdaptiveExp');
    if (aeEl) {
      aeEl.value = (config.adaptiveExponent !== false).toString();
      aeEl.onchange = () => {
        const c = loadAdvisorConfig();
        c.adaptiveExponent = aeEl.value === 'true';
        saveAdvisorConfig(c);
      };
    }

    // Check for conviction decay and warn
    const decayed = checkConvictionDecay(config);
    if (decayed.length > 0) {
      const decayMsg = decayed.map(d =>
        d.floorBlocked
          ? `${d.ticker}: held at ★${d.to} (floor, was ★${d.from})`
          : `${d.ticker}: ★${d.from} → ★${d.to}`
      ).join(', ');
      const cvListEl = document.getElementById('advisorConvictionList');
      if (cvListEl) {
        cvListEl.insertAdjacentHTML('afterbegin',
          `<div style="background:rgba(255,159,10,0.08);border:1px solid rgba(255,159,10,0.2);border-radius:10px;padding:8px 10px;margin-bottom:8px;font-size:10px;color:#ff9f0a;line-height:1.4;">
            ⚠ Auto-decayed (not reviewed in ${config.convictionDecayDays}d): ${decayMsg}
          </div>`);
      }
    }

    // ── Valuation Parameters ──
    const sectorPEList = document.getElementById('advisorSectorPEList');
    if (sectorPEList) {
      const sectors = Object.keys(config.sectorPEDefaults);
      const tickersBySector = {};
      Object.entries(config.tickerSectorMap).forEach(([t, s]) => {
        if (!tickersBySector[s]) tickersBySector[s] = [];
        tickersBySector[s].push(t.replace('.AE', ''));
      });
      sectorPEList.innerHTML = sectors.map(s => {
        const pe = config.sectorPEDefaults[s] || 12;
        const tickers = tickersBySector[s] || [];
        const label = s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        return `<div class="advisor-config-row">
          <div><div class="label" style="font-size:10px;">${label}</div><div class="sublabel">${tickers.length > 0 ? tickers.join(', ') : s === 'other' ? '(all unassigned)' : '—'}</div></div>
          <div style="display:flex;align-items:center;gap:2px;">
            <input type="number" class="advisor-config-input" value="${pe}" min="1" max="100" step="1" style="width:50px;"
              onchange="updateSectorPE('${s}', this.value)">
            <span style="font-size:10px;color:var(--text-3);">×</span>
          </div>
        </div>`;
      }).join('');
    }
    // ETF Historical PE control
    const etfPEEl = document.getElementById('advisorEtfPE');
    if (etfPEEl) {
      etfPEEl.value = config.etfHistoricalPE || 20;
      etfPEEl.onchange = () => {
        const c = loadAdvisorConfig();
        c.etfHistoricalPE = Math.max(5, Math.min(50, parseFloat(etfPEEl.value) || 20));
        saveAdvisorConfig(c);
      };
    }
    // REIT Target Yield control
    const reitYieldEl = document.getElementById('advisorReitYield');
    if (reitYieldEl) {
      reitYieldEl.value = ((config.reitTargetYield || 0.06) * 100).toFixed(1);
      reitYieldEl.onchange = () => {
        const c = loadAdvisorConfig();
        c.reitTargetYield = Math.max(0.03, Math.min(0.12, parseFloat(reitYieldEl.value) / 100 || 0.06));
        saveAdvisorConfig(c);
      };
    }

    // ── Manual Fundamentals ──
    const mfList = document.getElementById('advisorManualFundamentalsList');
    if (mfList) {
      const stocksAndReits = tickersToShow.filter(h => h.type === 'Stock' || h.type === 'REIT' || h.type === 'ETF');
      mfList.innerHTML = stocksAndReits.map(h => {
        const mf = config.manualFundamentals[h.ticker] || {};
        const lastUp = mf.lastUpdated ? new Date(mf.lastUpdated).toLocaleDateString() : 'never';
        const ageDays = mf.lastUpdated ? Math.floor((Date.now() - new Date(mf.lastUpdated).getTime()) / (24*60*60*1000)) : null;
        const staleWarning = ageDays !== null ? (ageDays > 180 ? ' ❌ Expired' : ageDays > 90 ? ` ⚠ ${ageDays}d old` : ' ✓') : '';
        return `<div class="advisor-config-row" style="flex-wrap:wrap;gap:4px;">
          <div style="min-width:80px;"><div class="label">${escapeHTML(h.ticker)}</div><div class="sublabel">Updated: ${lastUp}${staleWarning}</div></div>
          <div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap;">
            <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
              <span style="font-size:9px;color:var(--text-3);">EPS</span>
              <input type="number" class="advisor-config-input" value="${mf.trailingEPS || ''}" placeholder="—" step="0.01" style="width:52px;font-size:10px;"
                onchange="updateManualFundamental('${escapeHTML(h.ticker)}', 'trailingEPS', this.value)">
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
              <span style="font-size:9px;color:var(--text-3);">P/E</span>
              <input type="number" class="advisor-config-input" value="${mf.trailingPE || ''}" placeholder="—" step="0.1" style="width:52px;font-size:10px;"
                onchange="updateManualFundamental('${escapeHTML(h.ticker)}', 'trailingPE', this.value)">
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
              <span style="font-size:9px;color:var(--text-3);">Div%</span>
              <input type="number" class="advisor-config-input" value="${mf.dividendYield ? (mf.dividendYield * 100).toFixed(2) : ''}" placeholder="—" step="0.1" style="width:52px;font-size:10px;"
                onchange="updateManualFundamental('${escapeHTML(h.ticker)}', 'dividendYield', this.value, true)">
            </div>
          </div>
        </div>`;
      }).join('');
    }
  }

  function updateAdvisorFairValue(ticker, val) {
    const config = loadAdvisorConfig();
    const num = parseFloat(val);
    if (num > 0) config.fairValueOverrides[ticker] = num;
    else delete config.fairValueOverrides[ticker];
    saveAdvisorConfig(config);
  }

  function updateAdvisorConviction(ticker, rating) {
    const config = loadAdvisorConfig();
    if (rating === 0) {
      // Clear manual override
      delete config.convictionRatings[ticker];
    } else {
      const existing = config.convictionRatings[ticker];
      const currentPeak = (typeof existing === 'object' ? existing?.peakRating : existing) || rating;
      config.convictionRatings[ticker] = {
        rating,
        lastUpdated: new Date().toISOString(),
        peakRating: Math.max(rating, currentPeak)
      };
    }
    saveAdvisorConfig(config);
    renderAdvisorSettings();
  }

  function updateAdvisorClassTarget(type, val) {
    const config = loadAdvisorConfig();
    config.classTargets[type] = parseFloat(val) || 0;
    saveAdvisorConfig(config);
    updateClassTargetSum();
  }

  function updateClassTargetSum() {
    const config = loadAdvisorConfig();
    const sum = Object.values(config.classTargets).reduce((s, v) => s + v, 0);
    const el = document.getElementById('advisorClassTargetSum');
    if (el) el.innerHTML = `<span class="advisor-sum-badge ${Math.abs(sum - 100) < 0.5 ? 'ok' : 'warn'}">${sum.toFixed(0)}% / 100%</span>`;
  }

  function updateAdvisorFactorWeight(key, val) {
    const config = loadAdvisorConfig();
    config.factorWeights[key] = parseFloat(val) || 0;
    saveAdvisorConfig(config);
    updateFactorWeightSum();
  }

  function updateFactorWeightSum() {
    const config = loadAdvisorConfig();
    const sum = Object.values(config.factorWeights).reduce((s, v) => s + v, 0);
    const el = document.getElementById('advisorFactorWeightSum');
    if (el) el.innerHTML = `<span class="advisor-sum-badge ${Math.abs(sum - 100) < 0.5 ? 'ok' : 'warn'}">${sum.toFixed(0)}% / 100%</span>`;

    // Render weight bar
    const bar = document.getElementById('advisorWeightBar');
    if (bar) {
      const fwKeys = ['intrinsicValue', 'strategicRebalance', 'technicalEntry', 'momentumGuard', 'conviction', 'concentration', 'recency'];
      bar.innerHTML = fwKeys.map(k => {
        const pct = sum > 0 ? (config.factorWeights[k] / sum * 100) : 0;
        return `<div class="advisor-weight-seg" style="width:${pct}%;background:${FACTOR_COLORS[k]}"></div>`;
      }).join('');
    }
  }

  function updateAdvisorRecencyWindow(type, val) {
    const config = loadAdvisorConfig();
    config.recencyWindows[type] = parseInt(val) || 0;
    saveAdvisorConfig(config);
  }

  function updateSectorPE(sector, val) {
    const config = loadAdvisorConfig();
    config.sectorPEDefaults[sector] = Math.max(1, Math.min(100, parseFloat(val) || 12));
    saveAdvisorConfig(config);
  }

  function updateManualFundamental(ticker, field, val, isPercent) {
    const config = loadAdvisorConfig();
    if (!config.manualFundamentals[ticker]) config.manualFundamentals[ticker] = {};
    const num = parseFloat(val);
    if (num > 0) {
      config.manualFundamentals[ticker][field] = isPercent ? num / 100 : num;
      config.manualFundamentals[ticker].lastUpdated = new Date().toISOString();
    } else {
      delete config.manualFundamentals[ticker][field];
      // If all fields empty, remove the entry
      const remaining = Object.keys(config.manualFundamentals[ticker]).filter(k => k !== 'lastUpdated');
      if (remaining.length === 0) delete config.manualFundamentals[ticker];
    }
    saveAdvisorConfig(config);
  }

  function toggleAdvisorSelector() {
    const body = document.getElementById('advisorSelectorBody');
    const chevron = document.getElementById('advisorChevron');
    body.classList.toggle('hidden');
    chevron.classList.toggle('open');
  }

  function renderAdvisorTickerList(filter = '') {
    const activeHoldings = getActiveHoldings();
    const filtered = filter ? activeHoldings.filter(h => h.ticker.toLowerCase().includes(filter.toLowerCase()) || (livePrices[h.ticker]?.name || '').toLowerCase().includes(filter.toLowerCase())) : activeHoldings;

    // Group by type
    const groups = {};
    filtered.forEach(h => {
      if (!groups[h.type]) groups[h.type] = [];
      groups[h.type].push(h);
    });

    const list = document.getElementById('advisorTickerList');
    let html = '';
    Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0])).forEach(([type, items]) => {
      html += `<div style="font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3);padding:8px 4px 4px;font-family:'DM Mono',monospace;">${type}</div>`;
      items.forEach(h => {
        const selected = advisorSelectedTickers.includes(h.ticker);
        const lp = livePrices[h.ticker];
        const name = lp?.name || '';
        html += `<div class="advisor-ticker-row" onclick="toggleAdvisorTicker('${escapeHTML(h.ticker)}')">
          <div class="advisor-ticker-row-left">
            <div class="advisor-ticker-check ${selected ? 'checked' : ''}"></div>
            <div>
              <div class="advisor-ticker-sym">${escapeHTML(h.ticker)}</div>
              <div class="advisor-ticker-name">${escapeHTML(name)}</div>
            </div>
          </div>
          <div class="advisor-ticker-type">${type}</div>
        </div>`;
      });
    });

    if (filtered.length === 0) {
      html = '<div style="color:var(--text-3);text-align:center;padding:16px;font-size:12px;">No tickers match</div>';
    }
    list.innerHTML = html;
  }

  function filterAdvisorTickers() {
    const q = document.getElementById('advisorSearch').value;
    renderAdvisorTickerList(q);
  }

  function updateAdvisorSelectorPreview() {
    const count = advisorSelectedTickers.length;
    const preview = document.getElementById('advisorSelectorPreview');
    const countEl = document.getElementById('advisorSelCount');
    if (count === 0) {
      preview.textContent = 'Tap to select tickers...';
      preview.style.color = 'var(--text-3)';
    } else if (count <= 4) {
      preview.textContent = advisorSelectedTickers.join(', ');
      preview.style.color = 'var(--text-1)';
    } else {
      preview.textContent = advisorSelectedTickers.slice(0, 3).join(', ') + ` +${count - 3} more`;
      preview.style.color = 'var(--text-1)';
    }
    countEl.textContent = count > 0 ? `(${count})` : '';
  }

  function toggleAdvisorTicker(ticker) {
    const idx = advisorSelectedTickers.indexOf(ticker);
    if (idx >= 0) advisorSelectedTickers.splice(idx, 1);
    else advisorSelectedTickers.push(ticker);
    localStorage.setItem('advisorTickers', JSON.stringify(advisorSelectedTickers));
    renderAdvisorTickerList(document.getElementById('advisorSearch')?.value || '');
    updateAdvisorSelectorPreview();
  }

  function advisorSelectAll() {
    advisorSelectedTickers = getActiveHoldings().map(h => h.ticker);
    localStorage.setItem('advisorTickers', JSON.stringify(advisorSelectedTickers));
    renderAdvisorTickerList(document.getElementById('advisorSearch')?.value || '');
    updateAdvisorSelectorPreview();
  }

  function advisorClearAll() {
    advisorSelectedTickers = [];
    localStorage.setItem('advisorTickers', JSON.stringify(advisorSelectedTickers));
    document.getElementById('advisorResults').innerHTML = '';
    renderAdvisorTickerList(document.getElementById('advisorSearch')?.value || '');
    updateAdvisorSelectorPreview();
  }

  function runAdvisor() {
    const amountInput = document.getElementById('advisorAmountInput');
    let inputVal = parseFloat(amountInput.value) || 0;
    if (inputVal <= 0) { amountInput.focus(); return; }

    const dcaAED = currentCurrency === 'USD' ? inputVal * AED_USD_RATE : inputVal;
    advisorDCA = dcaAED;
    localStorage.setItem('advisorDCA', dcaAED);

    if (advisorSelectedTickers.length === 0) {
      document.getElementById('advisorResults').innerHTML = '<div style="text-align:center;color:var(--text-3);padding:20px;font-size:14px;">Select at least one ticker above</div>';
      return;
    }

    const maxPicks = parseInt(document.getElementById('advisorMaxPicks').value) || 0;

    // Circuit breakers: check for warnings and apply cash multiplier
    const config = loadAdvisorConfig();
    const circuitBreakers = checkCircuitBreakers(advisorSelectedTickers, config);
    const effectiveDCA = dcaAED * circuitBreakers.cashMultiplier;

    const output = calculateAdvisorScores(advisorSelectedTickers, effectiveDCA, { maxPicks });
    output.circuitBreakers = circuitBreakers;
    output.originalDCA = dcaAED;
    if (circuitBreakers.cashMultiplier < 1.0) {
      output.cashReserve = (output.cashReserve || 0) + (dcaAED - effectiveDCA);
    }

    // Performance tracking
    const perfData = getAdvisorPerformance(config);
    output.performanceData = perfData;

    lastAdvisorOutput = output;
    lastAdvisorResults = output.tickers || [];
    const logEntry = {
      date: new Date().toISOString(),
      budget: dcaAED,
      tickers: lastAdvisorResults.filter(r => r.status === 'BUY').map(r => ({
        ticker: r.ticker, amount: r.allocationAmt, pct: r.allocationPct, score: r.composite
      })),
      cashReserve: output.cashReserve,
      summary: output.summary,
    };
    config.recommendationLog = (config.recommendationLog || []).slice(-50); // keep last 50
    config.recommendationLog.push(logEntry);
    saveAdvisorConfig(config);

    document.getElementById('advisorViewToggle').style.display = '';
    // Collapse hero input area to show results
    const heroArea = document.getElementById('advisorHeroArea');
    if (heroArea) heroArea.classList.add('advisor-hero-compact');
    renderCurrentAdvisorView();
    requestAnimationFrame(() => {
      const track = document.getElementById('advisorViewTrack');
      const pill = document.getElementById('advisorViewPill');
      const active = track ? track.querySelector('.pill-track-btn.active') : null;
      if (track && pill && active) moveSlidingPill(track, pill, active);
    });
  }

  let currentAdvisorView = 'cards';
  function setAdvisorView(view, el) {
    currentAdvisorView = view;
    // Support both segment control and old pill-track
    if (el.classList.contains('chart-seg-btn')) {
      el.parentElement.querySelectorAll('.chart-seg-btn').forEach(b => b.classList.remove('active'));
    } else {
      el.parentElement.querySelectorAll('.pill-track-btn').forEach(b => b.classList.remove('active'));
      moveSlidingPill(document.getElementById('advisorViewTrack'), document.getElementById('advisorViewPill'), el, true);
    }
    el.classList.add('active');
    renderCurrentAdvisorView();
  }

  function renderCurrentAdvisorView() {
    if (!lastAdvisorResults.length) return;
    if (currentAdvisorView === 'cards') renderAdvisorResults(lastAdvisorResults);
    else if (currentAdvisorView === 'table') renderAdvisorTable(lastAdvisorResults);
    else if (currentAdvisorView === 'split') renderAdvisorClassSplit(lastAdvisorResults);
  }

  const FACTOR_COLORS = {
    intrinsicValue: '#30d158', strategicRebalance: '#0a84ff', technicalEntry: '#ff9f0a',
    momentumGuard: '#fb923c', conviction: '#a78bfa', concentration: '#22d3ee', recency: '#f472b6'
  };
  const FACTOR_LABELS = {
    intrinsicValue: 'Value', strategicRebalance: 'Rebalance', technicalEntry: 'Technical',
    momentumGuard: 'Momentum', conviction: 'Conviction', concentration: 'Concentration', recency: 'Recency'
  };

  function renderAdvisorResults(results) {
    const container = document.getElementById('advisorResults');
    const sym = currentCurrency === 'USD' ? '$' : 'AED ';
    const convert = convertCurrency;
    const fmt = (v) => convert(v).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const investable = results.filter(r => !r.skip);
    const skipped = results.filter(r => r.skip);
    const cashReserve = lastAdvisorOutput?.cashReserve || 0;
    const summaryText = lastAdvisorOutput?.summary || '';
    const typeColorMap = TYPE_COLORS;

    let html = '';

    // ── Status bar: circuit breakers + confidence ──
    const cb = lastAdvisorOutput?.circuitBreakers;
    if (cb && (cb.warnings.length > 0 || cb.confidence != null)) {
      html += '<div class="advisor-status-bar">';
      if (cb.warnings.length > 0) {
        cb.warnings.forEach(w => {
          const color = w.severity === 'high' ? 'var(--red)' : '#ff9f0a';
          html += `<div class="advisor-status-warning" style="color:${color}">${w.text}</div>`;
        });
        if (cb.cashMultiplier < 1.0) {
          html += `<div class="advisor-status-note">DCA reduced ${((1 - cb.cashMultiplier) * 100).toFixed(0)}% — excess held as cash</div>`;
        }
      }
      if (cb.confidence != null) {
        const confPct = cb.confidence * 10;
        const confColor = confPct >= 70 ? 'var(--emerald)' : confPct >= 40 ? '#ff9f0a' : 'var(--red)';
        const confLabel = confPct >= 70 ? 'High' : confPct >= 40 ? 'Moderate' : 'Low';
        html += `<div class="advisor-confidence">
          <span>Confidence</span>
          <div class="advisor-confidence-bar"><div style="width:${confPct}%;background:${confColor}"></div></div>
          <span style="color:${confColor};font-weight:600;">${confLabel}</span>
        </div>`;
      }
      html += '</div>';
    }

    // ── Performance ──
    const perf = lastAdvisorOutput?.performanceData;
    if (perf) {
      const perfColor = perf.avgReturnPct >= 0 ? 'var(--emerald)' : 'var(--red)';
      const perfSign = perf.avgReturnPct >= 0 ? '+' : '';
      html += `<div class="advisor-perf-badge">Past avg: <span style="color:${perfColor};font-weight:600;">${perfSign}${perf.avgReturnPct.toFixed(1)}%</span> across ${perf.totalEntries} run${perf.totalEntries !== 1 ? 's' : ''}</div>`;
    }

    // ── Summary ──
    if (summaryText) html += `<div class="advisor-summary-text">${summaryText}</div>`;

    // ── Investable picks as list rows ──
    if (investable.length === 0) {
      html += '<div style="text-align:center;color:var(--text-3);padding:32px 0;font-size:14px;">No strong buy signals. Consider holding cash.</div>';
    } else {
      html += '<div class="advisor-picks-list">';
      investable.forEach((r, i) => {
        const dotColor = typeColorMap[r.assetClass] || 'rgba(255,255,255,0.3)';
        const lp = livePrices[r.ticker];
        const chg = lp ? lp.changePercent : 0;
        const chgColor = chg >= 0 ? 'var(--emerald)' : 'var(--red)';
        const chgStr = lp ? (chg >= 0 ? '+' : '') + chg.toFixed(1) + '%' : '';
        const shareCount = r.details.curPriceAED > 0 ? (r.allocationAmt / r.details.curPriceAED) : 0;
        const shareStr = shareCount >= 1 ? shareCount.toFixed(0) : shareCount.toFixed(4);

        // Factor bar segments
        const factorTotal = Object.values(r.factors).reduce((s, v) => s + v, 0);
        const factorSegs = Object.entries(r.factors).map(([k, v]) => {
          const pct = factorTotal > 0 ? (v / factorTotal * 100) : 14;
          return `<div style="width:${pct}%;background:${FACTOR_COLORS[k]}"></div>`;
        }).join('');

        // Top signal
        const topSignal = r.signals[0];

        html += `<div class="advisor-pick-row" style="opacity:0;transform:translateY(12px);transition:opacity 0.4s cubic-bezier(0.16,1,0.3,1),transform 0.4s cubic-bezier(0.16,1,0.3,1);transition-delay:${i * 0.03}s" onclick="openAdvisorDetail(${i})">
          <div class="trade-type-badge" style="background:${dotColor}"></div>
          <div class="advisor-pick-info">
            <div class="advisor-pick-ticker">${escapeHTML(r.ticker)}</div>
            <div class="advisor-pick-sub">Buy ~${shareStr} @ ${sym}${fmt(r.details.curPriceAED)} <span style="color:${chgColor}">${chgStr}</span></div>
          </div>
          <div class="advisor-pick-right">
            <div class="advisor-pick-amount">${sym}${fmt(r.allocationAmt)}</div>
            <div class="advisor-pick-pct">${r.allocationPct.toFixed(1)}%${topSignal ? ' · ' + topSignal.text : ''}</div>
          </div>
        </div>`;
      });
      html += '</div>';
    }

    // ── Cash reserve ──
    if (cashReserve > 0) {
      html += `<div class="advisor-cash-row">
        <span class="advisor-cash-label">Cash Reserve</span>
        <span class="advisor-cash-amount">${sym}${fmt(cashReserve)}</span>
      </div>`;
    }

    // ── Skipped (collapsed) ──
    const focusSkipped = skipped.filter(r => r.focusSkip);
    const otherSkipped = skipped.filter(r => !r.focusSkip);
    if (skipped.length > 0) {
      html += `<div class="advisor-skipped-section">
        <div class="advisor-skipped-header" onclick="this.parentElement.classList.toggle('expanded')">
          <span>${skipped.length} ticker${skipped.length !== 1 ? 's' : ''} skipped</span>
          <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>
        </div>
        <div class="advisor-skipped-body">`;
      skipped.forEach(r => {
        const reason = r.focusSkip ? 'Focus cut' : r.floorSkip ? 'Too small' : 'Low score';
        const reasonColor = r.focusSkip ? '#ff9f0a' : 'var(--text-3)';
        html += `<div class="advisor-skipped-row">
          <span class="advisor-skipped-ticker">${escapeHTML(r.ticker)}</span>
          <span style="color:var(--text-3);font-size:10px;">${r.composite.toFixed(0)}/100</span>
          <span style="color:${reasonColor};font-size:10px;margin-left:auto;">${reason}</span>
        </div>`;
      });
      html += '</div></div>';
    }

    container.innerHTML = html;

    // Animate rows in
    container.querySelectorAll('.advisor-pick-row').forEach(row => {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        row.style.opacity = '1';
        row.style.transform = 'translateY(0)';
      }));
    });
  }

  function openAdvisorDetail(idx) {
    const r = lastAdvisorResults[idx];
    if (!r) return;
    const sym = currentCurrency === 'USD' ? '$' : 'AED ';
    const convert = convertCurrency;
    const fmtP = (v) => convert(v).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const d = r.details;

    // Build detailed reasoning for v2 factors
    const factorRows = Object.entries(r.factors).map(([k, v]) => {
      let explanation = '';
      const score = v.toFixed(0);
      const lp52 = livePrices[r.ticker];
      const toAED52 = lp52 && lp52.currency !== 'AED' ? AED_USD_RATE : 1;
      switch (k) {
        case 'intrinsicValue': {
          const discPct = (d.discount * 100).toFixed(1);
          const methodLabel = d.fairValueMethod === 'manual_override' ? 'manual estimate'
            : d.fairValueMethod === 'auto_pe' ? 'P/E-based auto estimate'
            : d.fairValueMethod === 'auto_ma200' ? 'MA200 anchor'
            : d.fairValueMethod === 'auto_yield' ? 'dividend yield model'
            : d.fairValueMethod === 'auto_52w_midpoint' ? '52w midpoint estimate'
            : 'cost basis fallback';
          if (d.fairValue) {
            const fvStr = d.fairValue.toFixed(2);
            if (d.discount > 0.15) explanation = `Trading ${discPct}% below fair value (${fvStr}, ${methodLabel}). Strong margin of safety.`;
            else if (d.discount > 0) explanation = `${discPct}% below fair value (${fvStr}, ${methodLabel}). Moderate discount.`;
            else if (d.discount > -0.10) explanation = `Near fair value (${fvStr}, ${methodLabel}). Neutral.`;
            else explanation = `${Math.abs(d.discount * 100).toFixed(1)}% above fair value (${fvStr}, ${methodLabel}). Overvalued.`;
            if (d.autoFairValue && d.fairValueMethod === 'manual_override') {
              explanation += ` Auto estimate: ${d.autoFairValue.toFixed(2)} (${d.autoFairValueMethod.replace('auto_','')}).`;
            }
          } else {
            explanation = `⚠ Using avg cost (${sym}${fmtP(d.avgCost)}) as fallback — no fair value data available. ${d.discount > 0 ? `${discPct}% below cost.` : `${Math.abs(d.discount * 100).toFixed(1)}% above cost.`}`;
          }
          break;
        }
          break;
        case 'strategicRebalance':
          const targetPct = (d.targetWeight * 100).toFixed(1);
          const actualPct = (d.actualWeight * 100).toFixed(1);
          const devPct = (d.weightDeviation * 100).toFixed(1);
          if (d.weightDeviation > 0.03) explanation = `${devPct}pp underweight — actual ${actualPct}% vs target ${targetPct}%. Strategic rebalancing would direct capital here.`;
          else if (d.weightDeviation < -0.03) explanation = `${Math.abs(devPct)}pp overweight — actual ${actualPct}% vs target ${targetPct}%. Already well-represented.`;
          else explanation = `Near target weight (actual ${actualPct}% vs target ${targetPct}%). Balanced.`;
          break;
        case 'technicalEntry': {
          const lo = d.fiftyTwoWeekLow ? sym + fmtP(d.fiftyTwoWeekLow * toAED52) : '--';
          const hi = d.fiftyTwoWeekHigh ? sym + fmtP(d.fiftyTwoWeekHigh * toAED52) : '--';
          const range52w = `52w: ${lo} — ${hi}`;
          if (!d.techDegraded && d.ma200 && d.rsi14 != null) {
            const ma200Dist = ((d.curPriceOrig - d.ma200) / d.ma200 * 100).toFixed(1);
            explanation = `MA200: ${d.ma200.toFixed(2)} (${ma200Dist > 0 ? '+' : ''}${ma200Dist}% distance, score ${d.ma200Score?.toFixed(0) || '?'}). RSI(14): ${d.rsi14.toFixed(1)} (score ${d.rsiScore?.toFixed(0) || '?'}). `;
            if (d.rsi14 < 30) explanation += 'Oversold — strong buy signal.';
            else if (d.rsi14 < 50) explanation += 'Below neutral — reasonable entry.';
            else if (d.rsi14 < 70) explanation += 'Above neutral — less attractive.';
            else explanation += 'Overbought — caution.';
          } else {
            if (d.techDegraded) explanation = `⚠ Using 52-week range as proxy (MA200/RSI unavailable). `;
            if (d.rangePosition < 25) explanation += `Near 52-week low (${d.rangePosition.toFixed(0)}%). ${range52w}. Attractive entry.`;
            else if (d.rangePosition < 50) explanation += `Lower half of range (${d.rangePosition.toFixed(0)}%). ${range52w}. Reasonable entry.`;
            else if (d.rangePosition < 75) explanation += `Upper half (${d.rangePosition.toFixed(0)}%). ${range52w}. Less attractive.`;
            else explanation += `Near 52-week high (${d.rangePosition.toFixed(0)}%). ${range52w}. Low margin of safety.`;
          }
          break;
        }
        case 'momentumGuard':
          if (!d.momDegraded && d.return6m != null) {
            const ret6mPct = (d.return6m * 100).toFixed(1);
            explanation = `6-month return: ${d.return6m >= 0 ? '+' : ''}${ret6mPct}%. `;
            if (d.return6m > 0.15) explanation += 'Strong uptrend — healthy momentum.';
            else if (d.return6m > 0) explanation += 'Moderate positive trend.';
            else if (d.return6m > -0.10) explanation += 'Mild decline — watch for reversal.';
            else explanation += 'Significant downtrend — falling knife risk.';
          } else {
            if (d.momDegraded) explanation = `⚠ Estimated from 52-week range (6-month history unavailable). `;
            const distPct = d.return6m != null ? (d.return6m * 100).toFixed(0) : '?';
            if (d.return6m && d.return6m > 0.15) explanation += `Positive estimated trend. Good momentum.`;
            else if (d.return6m && d.return6m > -0.05) explanation += `Near mid-range. Neutral momentum.`;
            else explanation += `Near 52-week low. Weak momentum — possible falling knife.`;
          }
          break;
        case 'conviction':
          const stars = '★'.repeat(Math.min(5, Math.max(0, d.convictionRating))) + '☆'.repeat(Math.max(0, 5 - d.convictionRating));
          const hasManual = d.convictionRating > 0 && typeof (loadAdvisorConfig().convictionRatings[r.ticker]) === 'object' && loadAdvisorConfig().convictionRatings[r.ticker]?.rating > 0;
          explanation = hasManual
            ? `Manual override: ${stars}. Auto-conviction based on ${d.buys || 1} buy${(d.buys || 1) !== 1 ? 's' : ''} and ${((d.posConcentration || 0)).toFixed(1)}% weight. ${d.convictionRating >= 4 ? 'Core holding.' : d.convictionRating <= 2 ? 'Low conviction.' : 'Moderate conviction.'}`
            : `Auto-conviction: ${(f.conviction || 0).toFixed(0)}/100 (${d.buys || 1} buy${(d.buys || 1) !== 1 ? 's' : ''}, ${((d.posConcentration || 0)).toFixed(1)}% portfolio weight). No manual override set.`;
          break;
        case 'concentration':
          const posPct = d.posConcentration.toFixed(1);
          const classPct = d.classConcentration.toFixed(1);
          explanation = `Position is ${posPct}% of portfolio. Asset class is ${classPct}% (vs target). ${d.posConcentration > 25 ? 'Heavily concentrated — single-position risk.' : d.classConcentration > 30 ? 'Class is overweight — diversification pressure.' : 'Concentration is manageable.'}`;
          break;
        case 'recency':
          if (d.lookbackDays <= 0) { explanation = `Recency check disabled for this asset class.`; break; }
          if (d.recentBuyCount === 0) explanation = `No buys in the last ${d.lookbackDays} days. Fresh candidate — prioritized to spread your purchases over time.`;
          else if (d.recentBuyCount === 1) explanation = `Bought once in the last ${d.lookbackDays} days (score decays exponentially). Consider spreading to other tickers.`;
          else explanation = `Bought ${d.recentBuyCount}× in the last ${d.lookbackDays} days. Heavy penalty to avoid fee waste and over-concentration.`;
          break;
      }
      const rawScore = d.rawFactors ? d.rawFactors[k] : null;
      const showRaw = rawScore != null && d.contrastStrength > 1.0 && Math.abs(rawScore - v) >= 1;
      return `<div class="txn-modal-row" style="flex-direction:column;gap:4px;">
        <div style="display:flex;justify-content:space-between;width:100%;">
          <span class="txn-modal-label" style="color:${FACTOR_COLORS[k]}">${FACTOR_LABELS[k]}</span>
          <span style="font-size:14px;font-weight:700;color:${v >= 60 ? 'var(--emerald)' : v >= 35 ? 'var(--text-2)' : 'var(--red)'};font-family:'DM Mono',monospace;">${score}${showRaw ? `<span style="font-size:9px;color:var(--text-3);font-weight:400;"> (raw ${rawScore.toFixed(0)})</span>` : ''}<span style="font-size:9px;color:var(--text-3)">/100</span></span>
        </div>
        <div style="font-size:12px;color:var(--text-2);line-height:1.4;">${explanation}</div>
      </div>`;
    }).join('');

    let verdict;
    if (r.focusSkip) {
      verdict = `<div style="background:rgba(255,159,10,0.08);border:1px solid rgba(255,159,10,0.2);border-radius:12px;padding:10px 16px;margin-bottom:12px;">
          <div style="font-size:12px;font-weight:700;color:#ff9f0a;">🎯 Cut by Focus Mode</div>
          <div style="font-size:12px;color:var(--text-2);margin-top:4px;">Score ${r.composite.toFixed(0)}/100 is solid, but it didn't make the top picks cut. Your capital is better concentrated on fewer, stronger positions this month.</div>
        </div>`;
    } else if (r.floorSkip) {
      verdict = `<div style="background:rgba(255,159,10,0.08);border:1px solid rgba(255,159,10,0.2);border-radius:12px;padding:10px 16px;margin-bottom:12px;">
          <div style="font-size:12px;font-weight:700;color:#ff9f0a;">📏 Below Minimum Floor</div>
          <div style="font-size:12px;color:var(--text-2);margin-top:4px;">Allocation was too small for a practical order. Capital redistributed to stronger picks.</div>
        </div>`;
    } else if (r.skip) {
      verdict = `<div style="background:rgba(248,113,113,0.08);border:1px solid rgba(248,113,113,0.2);border-radius:12px;padding:10px 16px;margin-bottom:12px;">
          <div style="font-size:12px;font-weight:700;color:var(--red);">⛔ Not recommended this month</div>
          <div style="font-size:12px;color:var(--text-2);margin-top:4px;">Composite score ${r.composite.toFixed(0)}/100 is below the ${SKIP_THRESHOLD} threshold. Consider waiting for better entry conditions.</div>
        </div>`;
    } else {
      verdict = `<div style="background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.2);border-radius:12px;padding:10px 16px;margin-bottom:12px;">
          <div style="font-size:12px;font-weight:700;color:var(--emerald);">✅ Recommended: ${sym}${fmtP(r.allocationAmt)} (${r.allocationPct.toFixed(1)}%)</div>
          <div style="font-size:12px;color:var(--text-2);margin-top:4px;">Composite score ${r.composite.toFixed(0)}/100. ${r.composite >= 65 ? 'Strong buy signal.' : r.composite >= 45 ? 'Moderate buy signal.' : 'Weak buy signal — proceed with caution.'}</div>
        </div>`;
    }

    // Position summary
    const lp = livePrices[r.ticker];
    const pnlVal = d.curValue - d.netInvested;
    const pnlPctVal = d.netInvested > 0 ? (pnlVal / d.netInvested * 100) : 0;
    const pnlColor = pnlVal >= 0 ? 'var(--emerald)' : 'var(--red)';
    const pnlSign = pnlVal >= 0 ? '+' : '\u2212';
    const changeColor = lp && lp.changePercent >= 0 ? 'var(--emerald)' : 'var(--red)';
    const changeSign = lp && lp.changePercent >= 0 ? '+' : '';

    const toAED = lp && lp.currency !== 'AED' ? AED_USD_RATE : 1;
    const lo52 = d.fiftyTwoWeekLow ? sym + fmtP(d.fiftyTwoWeekLow * toAED) : '--';
    const hi52 = d.fiftyTwoWeekHigh ? sym + fmtP(d.fiftyTwoWeekHigh * toAED) : '--';

    const positionSummary = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
        <div class="txn-modal-row" style="padding:6px 0;">
          <div class="txn-modal-label">Current Price</div>
          <div class="txn-modal-value">${r.hasPrice ? sym + fmtP(d.curPriceAED) : '--'}</div>
        </div>
        <div class="txn-modal-row" style="padding:6px 0;">
          <div class="txn-modal-label">Today</div>
          <div class="txn-modal-value" style="color:${changeColor}">${lp ? changeSign + lp.changePercent.toFixed(2) + '%' : '--'}</div>
        </div>
        <div class="txn-modal-row" style="padding:6px 0;">
          <div class="txn-modal-label">Avg Cost</div>
          <div class="txn-modal-value">${sym}${fmtP(d.avgCost)}</div>
        </div>
        <div class="txn-modal-row" style="padding:6px 0;">
          <div class="txn-modal-label">Shares</div>
          <div class="txn-modal-value">${d.shares % 1 === 0 ? d.shares.toFixed(0) : d.shares.toFixed(4)}</div>
        </div>
        <div class="txn-modal-row" style="padding:6px 0;">
          <div class="txn-modal-label">Position Value</div>
          <div class="txn-modal-value">${sym}${fmtP(d.curValue)}</div>
        </div>
        <div class="txn-modal-row" style="padding:6px 0;">
          <div class="txn-modal-label">P&L</div>
          <div class="txn-modal-value" style="color:${pnlColor}">${pnlSign}${sym}${fmtP(Math.abs(pnlVal))} (${pnlSign}${Math.abs(pnlPctVal).toFixed(1)}%)</div>
        </div>
        <div class="txn-modal-row" style="padding:6px 0;grid-column:1/-1;">
          <div class="txn-modal-label">52-Week Range</div>
          <div class="txn-modal-value">${lo52} — ${hi52}</div>
        </div>
      </div>`;

    document.getElementById('txnModalContent').innerHTML = `
      <div style="text-align:center;margin-bottom:12px;">
        <div style="font-size:20px;font-weight:800;color:var(--text-1);font-family:'DM Mono',monospace;">${escapeHTML(r.ticker)}</div>
        <div style="font-size:12px;color:var(--text-3);">${r.name}</div>
      </div>
      ${positionSummary}
      ${verdict}
      <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3);margin-bottom:8px;font-family:'DM Mono',monospace;">Factor Breakdown</div>
      ${factorRows}
    `;

    openModal();
  }

  function renderAdvisorTable(results) {
    const container = document.getElementById('advisorResults');
    const sym = currentCurrency === 'USD' ? '$' : 'AED ';
    const convert = convertCurrency;
    const fmt = (v) => convert(v).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    const fmtD = (v) => convert(v).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    let html = `<div class="advisor-section"><div class="table-container" style="overflow-x:auto;">
      <table class="holdings-table compact-table" style="width:100%;">
        <thead><tr>
          <th style="text-align:left">Ticker</th>
          <th>Price</th>
          <th>Score</th>
          <th>Alloc</th>
          <th>Amount</th>
          <th>Signal</th>
        </tr></thead>
        <tbody>`;

    results.forEach((r, i) => {
      const scoreColor = r.skip ? 'var(--red)' : r.composite >= 60 ? 'var(--emerald)' : r.composite >= 40 ? 'var(--text-2)' : '#ff9f0a';
      const priceStr = r.hasPrice ? sym + fmtD(r.details.curPriceAED) : '--';
      const topSignal = r.signals.length > 0 ? r.signals[0].text : '';
      const signalType = r.signals.length > 0 ? r.signals[0].type : '';

      html += `<tr style="cursor:pointer;${r.skip ? 'opacity:0.45;' : ''}" onclick="openAdvisorDetail(${i})">
        <td><strong>${escapeHTML(r.ticker)}</strong></td>
        <td style="font-family:'DM Mono',monospace;font-size:12px;">${priceStr}</td>
        <td style="color:${scoreColor};font-weight:700;font-family:'DM Mono',monospace;">${r.composite.toFixed(0)}</td>
        <td>${r.skip ? '--' : r.allocationPct.toFixed(0) + '%'}</td>
        <td style="color:${r.skip ? 'var(--text-3)' : 'var(--emerald)'};font-weight:600;font-family:'DM Mono',monospace;">${r.skip ? 'SKIP' : sym + fmt(r.allocationAmt)}</td>
        <td><span class="advisor-signal ${signalType}" style="font-size:9px;">${topSignal}</span></td>
      </tr>`;
    });

    // Totals row
    const totalAmt = results.filter(r => !r.skip).reduce((s, r) => s + r.allocationAmt, 0);
    html += `</tbody><tfoot><tr>
      <td><strong>TOTAL</strong></td>
      <td></td>
      <td></td>
      <td>100%</td>
      <td style="color:var(--emerald);font-weight:700;font-family:'DM Mono',monospace;">${sym}${fmt(totalAmt)}</td>
      <td></td>
    </tr></tfoot></table></div></div>`;

    container.innerHTML = html;
  }

  function renderAdvisorClassSplit(results) {
    const container = document.getElementById('advisorResults');
    const sym = currentCurrency === 'USD' ? '$' : 'AED ';
    const convert = convertCurrency;
    const fmt = (v) => convert(v).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    const fmtD = (v) => convert(v).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const investable = results.filter(r => !r.skip);
    const totalAmt = investable.reduce((s, r) => s + r.allocationAmt, 0);
    if (totalAmt === 0) {
      container.innerHTML = '<div style="text-align:center;color:var(--text-3);padding:20px;font-size:14px;">No investable tickers. All were marked Skip.</div>';
      return;
    }

    // Group by asset type from holdings
    const classTotals = {};
    investable.forEach(r => {
      const h = Object.values(holdings).find(h => h.ticker === r.ticker);
      const type = h ? h.type : 'Other';
      if (!classTotals[type]) classTotals[type] = { score: 0, amount: 0, count: 0, tickers: [] };
      classTotals[type].score += r.composite;
      classTotals[type].amount += r.allocationAmt;
      classTotals[type].count++;
      classTotals[type].tickers.push(r);
    });

    const classEntries = Object.entries(classTotals).sort((a, b) => b[1].amount - a[1].amount);
    const classColors = { 'Stock': '#30d158', 'ETF': '#0a84ff', 'Crypto': '#ff9f0a', 'REIT': '#a78bfa', 'Bond': '#22d3ee', 'Other': '#818cf8' };

    // Recommended split bar
    let splitBarHTML = '<div style="display:flex;height:28px;border-radius:12px;overflow:hidden;margin-bottom:16px;">';
    classEntries.forEach(([type, data]) => {
      const pct = (data.amount / totalAmt * 100);
      const color = classColors[type] || '#818cf8';
      splitBarHTML += `<div style="width:${pct}%;background:${color};display:flex;align-items:center;justify-content:center;min-width:${pct > 8 ? '0' : '24px'};transition:width 0.4s ease;">
        <span style="font-size:${pct > 15 ? '11' : '9'}px;font-weight:700;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,0.4);white-space:nowrap;">${pct > 8 ? type + ' ' : ''}${pct.toFixed(0)}%</span>
      </div>`;
    });
    splitBarHTML += '</div>';

    // Class cards
    let cardsHTML = classEntries.map(([type, data]) => {
      const pct = (data.amount / totalAmt * 100);
      const color = classColors[type] || '#818cf8';
      const avgScore = data.count > 0 ? (data.score / data.count) : 0;

      const tickerRows = data.tickers.sort((a, b) => b.allocationAmt - a.allocationAmt).map(r => {
        const lp = livePrices[r.ticker];
        const priceStr = r.hasPrice ? sym + fmtD(r.details.curPriceAED) : '--';
        const chg = lp ? lp.changePercent : 0;
        const chgColor = chg >= 0 ? 'var(--emerald)' : 'var(--red)';
        const chgStr = lp ? (chg >= 0 ? '+' : '') + chg.toFixed(1) + '%' : '';
        const tickerPct = totalAmt > 0 ? (r.allocationAmt / totalAmt * 100) : 0;
        return `<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--divider);">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:12px;font-weight:700;font-family:'DM Mono',monospace;color:var(--text-1);min-width:55px;">${escapeHTML(r.ticker)}</span>
            <span style="font-size:10px;color:var(--text-3);">${priceStr}</span>
            <span style="font-size:9px;color:${chgColor};">${chgStr}</span>
          </div>
          <div style="text-align:right;">
            <span style="font-size:12px;font-weight:600;color:var(--emerald);font-family:'DM Mono',monospace;">${sym}${fmt(r.allocationAmt)}</span>
            <span style="font-size:9px;color:var(--text-3);margin-left:4px;">${tickerPct.toFixed(0)}%</span>
          </div>
        </div>`;
      }).join('');

      return `<div class="advisor-result-card" style="border-left:3px solid ${color};">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <div>
            <div style="font-size:16px;font-weight:700;color:${color};">${type}</div>
            <div style="font-size:10px;color:var(--text-3);">${data.count} ticker${data.count !== 1 ? 's' : ''} · Avg score ${avgScore.toFixed(0)}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:20px;font-weight:800;color:var(--text-1);font-family:'DM Mono',monospace;">${pct.toFixed(0)}%</div>
            <div style="font-size:12px;color:var(--emerald);font-family:'DM Mono',monospace;">${sym}${fmt(data.amount)}</div>
          </div>
        </div>
        <div class="alloc-bar-bg" style="margin-bottom:10px;">
          <div class="alloc-bar" style="width:${pct}%;background:${color};"></div>
        </div>
        ${tickerRows}
      </div>`;
    }).join('');

    // Methodology for class split
    const methHTML = `<div class="advisor-methodology">
      <div class="advisor-methodology-title">How Class Split Works</div>
      <p>The recommended split is derived from the 7-factor scoring model.
      Each ticker's allocation is grouped by asset class (${classEntries.map(e => e[0]).join(', ')}).
      Higher aggregate scores in a class mean more capital directed there.
      This reflects which classes currently offer the best intrinsic value, strategic rebalancing opportunity, technical entry, and momentum across your portfolio.</p>
    </div>`;

    container.innerHTML = `
      <div class="advisor-section">
        <div class="section-title">Recommended Class Split</div>
        ${splitBarHTML}
        ${cardsHTML}
      </div>
      ${methHTML}
    `;
  }

  function renderAdvisorSuggestions() {
    const existingTickers = new Set(Object.keys(holdings).map(t => t.toUpperCase()));
    const suggestions = BUFFETT_SUGGESTIONS.filter(s => !existingTickers.has(s.ticker.toUpperCase()));

    const container = document.getElementById('advisorSuggestions');
    if (suggestions.length === 0) {
      container.innerHTML = '<div style="color:var(--text-3);font-size:12px;padding:8px 0;">You already hold all suggested tickers!</div>';
      return;
    }

    container.innerHTML = suggestions.slice(0, 8).map((s, i) => `
      <div class="advisor-suggest-card" style="animation-delay:${i * 0.04}s">
        <div>
          <div class="advisor-suggest-ticker">${s.ticker}</div>
          <div class="advisor-suggest-desc">${s.desc}</div>
        </div>
        <div class="advisor-suggest-tag">${s.tag}</div>
      </div>
    `).join('');
  }
