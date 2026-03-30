
  // Fetch live prices from Yahoo Finance via v8 chart API
  async function fetchLivePrices() {
    const activeTickers = Object.values(holdings)
      .filter(h => h.shares > 0.0001)
      .map(h => h.ticker);

    if (activeTickers.length === 0) return;

    const promises = activeTickers.map(ticker => fetchSinglePrice(ticker));
    await Promise.allSettled(promises);
  }

  async function fetchSinglePrice(ticker) {
    try {
      const proxyUrl = `${PRICE_PROXY}?symbol=${encodeURIComponent(ticker)}`;
      const res = await fetch(proxyUrl);
      if (!res.ok) throw new Error('Proxy request failed');
      const data = await res.json();

      const result = data?.chart?.result?.[0];
      if (!result) return;

      const meta = result.meta;
      const price = meta.regularMarketPrice;
      const prevClose = meta.chartPreviousClose || meta.previousClose || price;
      const currency = (meta.currency || 'USD').toUpperCase();

      if (price == null) return;

      const changePercent = prevClose ? ((price - prevClose) / prevClose * 100) : 0;

      let priceInAED;
      if (currency === 'AED') {
        priceInAED = price;
      } else if (currency === 'USD') {
        priceInAED = price * AED_USD_RATE;
      } else {
        priceInAED = price * AED_USD_RATE;
      }

      // 52-week range from Yahoo meta (always available)
      const fiftyTwoWeekHigh = meta.fiftyTwoWeekHigh || null;
      const fiftyTwoWeekLow = meta.fiftyTwoWeekLow || null;

      // Try to extract daily closes from chart response (if proxy returns them)
      let dailyCloses = null;
      let ma200 = null;
      let rsi14 = null;
      let return6m = null;
      const closesArr = result?.indicators?.quote?.[0]?.close;
      if (closesArr && closesArr.length > 50) {
        dailyCloses = closesArr.filter(c => c != null);
        if (dailyCloses.length >= 200) {
          ma200 = dailyCloses.slice(-200).reduce((s,v) => s+v, 0) / 200;
        } else if (dailyCloses.length >= 50) {
          ma200 = dailyCloses.slice(-dailyCloses.length).reduce((s,v) => s+v, 0) / dailyCloses.length;
        }
        if (dailyCloses.length >= 15) {
          rsi14 = calcRSI(dailyCloses, 14);
        }
        if (dailyCloses.length >= 126) {
          const p6m = dailyCloses[dailyCloses.length - 126];
          if (p6m > 0) return6m = (price - p6m) / p6m;
        }
      }

      livePrices[ticker.toUpperCase()] = {
        price, priceAED: priceInAED, currency,
        name: meta.shortName || meta.longName || ticker,
        changePercent,
        fiftyTwoWeekHigh, fiftyTwoWeekLow,
        // Enhanced data (null if proxy doesn't return historical)
        dailyCloses, ma200, rsi14, return6m,
        // Fundamental data from meta (some proxies include this)
        trailingPE: meta.trailingPE || null,
        trailingEPS: meta.trailingEPS || null,
        dividendYield: meta.dividendYield || null,
      };
    } catch (e) {
      console.warn(`Failed to fetch price for ${ticker}:`, e);
    }
  }

  // Also try enhanced proxy for historical data if configured

  // Wilder's RSI calculation
  function calcRSI(closes, period = 14) {
    if (closes.length < period + 1) return null;
    const changes = [];
    for (let i = 1; i < closes.length; i++) changes.push(closes[i] - closes[i-1]);

    let avgGain = 0, avgLoss = 0;
    for (let i = 0; i < period; i++) {
      if (changes[i] > 0) avgGain += changes[i];
      else avgLoss += Math.abs(changes[i]);
    }
    avgGain /= period;
    avgLoss /= period;

    for (let i = period; i < changes.length; i++) {
      const gain = changes[i] > 0 ? changes[i] : 0;
      const loss = changes[i] < 0 ? Math.abs(changes[i]) : 0;
      avgGain = (avgGain * (period - 1) + gain) / period;
      avgLoss = (avgLoss * (period - 1) + loss) / period;
    }

    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  }

  function convertCurrency(aedAmount) {
    if (currentCurrency === 'USD') {
      return aedAmount / AED_USD_RATE;
    }
    return aedAmount;
  }

  function formatMoney(aedAmount, { noSymbol = false } = {}) {
    const amount = convertCurrency(aedAmount);
    const symbol = noSymbol ? '' : (currentCurrency === 'USD' ? '$' : 'AED ');
    const abs = Math.abs(amount);

    if (abs >= 1000000) {
      return symbol + (amount / 1000000).toFixed(2) + 'M';
    }
    if (abs >= 1000) {
      return symbol + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return symbol + amount.toFixed(2);
  }

  const isMobile = () => window.innerWidth <= 600;

  function setCurrency(currency, el) {
    currentCurrency = currency;
    if (el && el.parentElement) {
      el.parentElement.querySelectorAll('.pill-track-btn').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
    }
    const toggle = document.getElementById('currencyToggle');
    if (toggle) toggle.textContent = currency;
    refreshCurrentView();
  }

  function toggleCurrency() {
    const next = currentCurrency === 'AED' ? 'USD' : 'AED';
    currentCurrency = next;
    const toggle = document.getElementById('currencyToggle');
    if (toggle) toggle.textContent = next;
    refreshCurrentView();
  }

  function refreshCurrentView() {
    if (currentNavSection === 'portfolio') {
      renderSummary(currentHoldingsFilter);
      renderHoldingsTable(currentHoldingsFilter);
      renderTrades('all');
      renderAllocation();
    } else if (currentNavSection === 'transactions') {
      renderTransactionsDashboard();
    }
  }

  function renderDashboard() {
    document.getElementById('loadingScreen').classList.add('hidden');
    hideSignInScreen();
    document.getElementById('mainApp').classList.add('hidden');
    document.getElementById('transactionsApp').classList.add('hidden');
    document.getElementById('budgetApp').classList.add('hidden');
    document.getElementById('hubPage').classList.add('hidden');
    // Show floating hub button and Home page on initial load
    const hubWrap = document.getElementById('bottomBarWrap');
    if (hubWrap) {
      hubWrap.classList.remove('hidden');
    }
    document.getElementById('homePage').classList.remove('hidden');
    document.getElementById('homePage').classList.add('page-enter');
    setTimeout(() => document.getElementById('homePage').classList.remove('page-enter'), 600);
    const bottomNavEl = document.getElementById('bottomNav');
    if (bottomNavEl) bottomNavEl.classList.remove('hidden');
    window.scrollTo(0, 0);
    syncHeaderSpacer();
    syncTabPlacement();
    // Re-render transactions now that the container is visible (layout requires visibility)
    if (txnDataLoaded) renderTransactionsDashboard();
    updateDashboardGreeting();
    // Update home page with latest data
    updateHomePage();
    requestAnimationFrame(() => requestAnimationFrame(() => { initNavPill(); syncSidebarNav(); }));

    // Calculate live price data for all holdings
    const allPositions = getActiveHoldings();
    for (const h of allPositions) {
      const lp = livePrices[h.ticker];
      if (lp) {
        h.currentValue = h.shares * lp.priceAED;
        h.pnl = h.currentValue - h.netInvested;
        h.pnlPercent = h.netInvested !== 0 ? (h.pnl / h.netInvested * 100) : 0;
      } else {
        h.currentValue = h.netInvested;
        h.pnl = 0;
        h.pnlPercent = 0;
      }
    }

    const updEl = document.getElementById('lastUpdated');
    if (updEl) updEl.textContent = 'Updated ' + new Date().toLocaleTimeString();

    renderTypeFilters();
    document.body.classList.add('port-holdings-active');
    // Set default tab indicator
    const portInd = document.getElementById('portTabIndicator');
    if (portInd) portInd.textContent = 'Holdings';
    renderSummary(currentHoldingsFilter);
    renderHoldingsTable(currentHoldingsFilter);
    renderTrades('all');
    renderAllocation();

    // Position tab underline + all sliding pills after layout + fonts settle
    function positionAllIndicators() {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const activeTab = document.querySelector('.tabs .tab.active');
        if (activeTab) moveTabUnderline(activeTab);
        initAllPills();
        syncHeaderSpacer();
      }));
    }
    positionAllIndicators();
    syncPortfolioTabPlacement();
    // Also re-position after fonts load (fixes first-load underline issue)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => positionAllIndicators());
    }
  }

  function renderSummary(typeFilter) {
    let positions = getActiveHoldings();
    if (typeFilter !== 'all') {
      positions = positions.filter(h => h.type === typeFilter);
    }

    const hasLivePrices = positions.some(h => livePrices[h.ticker]);

    const totalSpent = positions.reduce((s, h) => s + h.totalSpent, 0);
    const totalSold = positions.reduce((s, h) => s + h.totalSold, 0);
    const totalNetInvested = totalSpent - totalSold;
    const totalCurrentValue = positions.reduce((s, h) => s + (h.currentValue || h.netInvested), 0);
    const totalPnl = totalCurrentValue - totalNetInvested;
    const totalRoi = totalNetInvested !== 0 ? (totalPnl / totalNetInvested * 100) : 0;
    const displayValue = hasLivePrices ? totalCurrentValue : totalNetInvested;

    // ── Desktop summary cards ──
    const investedElD = document.getElementById('totalInvestedD');
    if (investedElD) animateValue(investedElD, totalNetInvested, 1200, (v) => formatMoney(v));

    const valueElD = document.getElementById('portfolioValueD');
    if (valueElD) animateValue(valueElD, displayValue, 1200, (v) => formatMoney(v));

    const totalPnlElD = document.getElementById('totalPnlD');
    const pnlCardD = document.getElementById('pnlCardD');
    if (totalPnlElD && pnlCardD) {
      if (hasLivePrices) {
        const pnlSign = totalPnl >= 0 ? '+' : '\u2212';
        totalPnlElD.className = 'summary-value ' + (totalPnl >= 0 ? 'green' : 'red');
        pnlCardD.className = totalPnl < 0 ? 'summary-card loss-card' : 'summary-card';
        animateValue(totalPnlElD, Math.abs(totalPnl), 1200, (v) => pnlSign + formatMoney(v));
      } else { totalPnlElD.textContent = '--'; totalPnlElD.className = 'summary-value'; pnlCardD.className = 'summary-card'; }
    }

    const roiElD = document.getElementById('totalRoiD');
    const roiCardD = document.getElementById('roiCardD');
    if (roiElD && roiCardD) {
      if (hasLivePrices) {
        const roiSign = totalRoi >= 0 ? '+' : '\u2212';
        roiElD.className = 'summary-value ' + (totalRoi >= 0 ? 'green' : 'red');
        roiCardD.className = totalRoi < 0 ? 'summary-card loss-card' : 'summary-card';
        animateValue(roiElD, Math.abs(totalRoi), 1200, (v) => roiSign + v.toFixed(2) + '%');
      } else { roiElD.textContent = '--'; roiElD.className = 'summary-value'; roiCardD.className = 'summary-card'; }
    }

    // ── Desktop winners/losers ──
    const withPrices = positions.filter(h => livePrices[h.ticker] && h.netInvested > 0);
    const renderWL = (winCard, loseCard) => {
      if (!winCard || !loseCard) return;
      if (withPrices.length >= 1) {
        const sorted = [...withPrices].sort((a, b) => a.pnlPercent - b.pnlPercent);
        const loser = sorted[0], winner = sorted[sorted.length - 1];
        const winSign = winner.pnlPercent >= 0 ? '+' : '\u2212';
        const loseSign = loser.pnlPercent >= 0 ? '+' : '\u2212';
        const winClass = winner.pnlPercent >= 0 ? 'winner' : 'loser';
        winCard.className = `summary-card wl-card ${winClass}`;
        winCard.innerHTML = `<div class="wl-inner"><div class="wl-left"><div class="wl-label">${winner.pnlPercent >= 0 ? '\u25B2' : '\u25BC'} Best</div><div class="wl-ticker">${escapeHTML(winner.ticker)}</div></div><div class="wl-right"><div class="wl-roi">${winSign}${Math.abs(winner.pnlPercent).toFixed(1)}%</div><div class="wl-pnl">${winner.pnl >= 0 ? '+' : '\u2212'}${formatMoney(Math.abs(winner.pnl))}</div></div></div>`;
        loseCard.className = 'summary-card wl-card loser';
        loseCard.innerHTML = `<div class="wl-inner"><div class="wl-left"><div class="wl-label">\u25BC Worst</div><div class="wl-ticker">${escapeHTML(loser.ticker)}</div></div><div class="wl-right"><div class="wl-roi">${loseSign}${Math.abs(loser.pnlPercent).toFixed(1)}%</div><div class="wl-pnl">${loser.pnl >= 0 ? '+' : '\u2212'}${formatMoney(Math.abs(loser.pnl))}</div></div></div>`;
      } else {
        winCard.className = 'summary-card wl-card hidden-card'; winCard.innerHTML = '';
        loseCard.className = 'summary-card wl-card hidden-card'; loseCard.innerHTML = '';
      }
    };
    renderWL(document.getElementById('winnerCardD'), document.getElementById('loserCardD'));

    // ── Mobile hero card ──
    const heroValue = document.getElementById('heroValue');
    if (heroValue) animateValue(heroValue, displayValue, 1200, (v) => formatMoney(v));

    const heroPnl = document.getElementById('heroPnl');
    if (heroPnl) {
      if (hasLivePrices) {
        const pnlSign = totalPnl >= 0 ? '+' : '\u2212';
        const roiSign = totalRoi >= 0 ? '+' : '\u2212';
        const color = totalPnl >= 0 ? 'var(--emerald)' : 'var(--red)';
        heroPnl.innerHTML = `<span style="color:${color}">${pnlSign}${formatMoney(Math.abs(totalPnl))}</span><span style="color:${color}">${roiSign}${Math.abs(totalRoi).toFixed(2)}%</span>`;
      } else { heroPnl.innerHTML = ''; }
    }

    const heroInvested = document.getElementById('heroInvested');
    if (heroInvested) heroInvested.textContent = 'Invested ' + formatMoney(totalNetInvested);

    const heroWL = document.getElementById('heroWL');
    if (heroWL) {
      if (withPrices.length >= 1) {
        const sorted = [...withPrices].sort((a, b) => a.pnlPercent - b.pnlPercent);
        const loser = sorted[0], winner = sorted[sorted.length - 1];
        const wSign = winner.pnlPercent >= 0 ? '+' : '\u2212';
        const lSign = loser.pnlPercent >= 0 ? '+' : '\u2212';
        heroWL.innerHTML = `
          <span class="port-hero-wl-item" style="color:var(--emerald)"><span class="port-hero-wl-ticker">${escapeHTML(winner.ticker)}</span> ${wSign}${Math.abs(winner.pnlPercent).toFixed(1)}%</span>
          <span class="port-hero-wl-item" style="color:var(--red)"><span class="port-hero-wl-ticker">${escapeHTML(loser.ticker)}</span> ${lSign}${Math.abs(loser.pnlPercent).toFixed(1)}%</span>
        `;
      } else { heroWL.innerHTML = ''; }
    }
  }

  function moveSlidingPill(trackEl, pillEl, activeBtn, animate) {
    if (!trackEl || !pillEl || !activeBtn) return;
    const trackRect = trackEl.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    pillEl.style.left = (btnRect.left - trackRect.left) + 'px';
    pillEl.style.width = btnRect.width + 'px';
    if (animate) {
      pillEl.classList.remove('gooping');
      void pillEl.offsetWidth;
      pillEl.classList.add('gooping');
    }
  }

  // Auto-cleanup goop class on all pills
  document.addEventListener('animationend', (e) => {
    if (e.target.classList.contains('gooping')) e.target.classList.remove('gooping');
  });

  function moveFilterPill(activeChip, animate) {
    moveSlidingPill(
      document.getElementById('typeFilters'),
      document.getElementById('filterPill'),
      activeChip,
      animate
    );
  }

  function initAllPills() {
    // Set view pill active state based on currentView
    const fullBtn = document.getElementById('viewFullBtn');
    const compactBtn = document.getElementById('viewCompactBtn');
    if (fullBtn && compactBtn) {
      fullBtn.classList.toggle('active', currentView === 'full');
      compactBtn.classList.toggle('active', currentView === 'compact');
    }

    const pairs = [
      ['viewTrack', 'viewPill'],
      ['metricTrack', 'metricPill'],
      ['rangeTrack', 'rangePill'],
      ['advisorViewTrack', 'advisorViewPill'],
    ];
    pairs.forEach(([tId, pId]) => {
      const track = document.getElementById(tId);
      const pill = document.getElementById(pId);
      if (track && pill) {
        const active = track.querySelector('.pill-track-btn.active');
        if (active) moveSlidingPill(track, pill, active);
      }
    });
  }

  function syncHeaderSpacer() {
    const h = document.querySelector('.header');
    const spacer = document.querySelector('.header-spacer');
    if (h && spacer) spacer.style.height = h.offsetHeight + 'px';
  }

  // Move txn tabs into header on desktop; on mobile they stay as top-level fixed elements
  function syncTabPlacement() {
    const tabRow = document.getElementById('txnTabRow');
    const headerAnchor = document.getElementById('headerTabsAnchor');
    if (!tabRow) return;
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop && headerAnchor) {
      tabRow.classList.remove('hidden');
      headerAnchor.appendChild(tabRow);
    } else {
      // On mobile, move back to body if it was in the header
      if (tabRow.parentElement === headerAnchor) {
        document.body.appendChild(tabRow);
      }
    }
    // Re-sync underline after move
    requestAnimationFrame(() => {
      const activeTab = tabRow.querySelector('.tab.active');
      if (activeTab && typeof moveTabUnderline === 'function') moveTabUnderline(activeTab);
      syncHeaderSpacer();
      syncSidebarNav();
    });
  }
  // Consolidated resize — debounce via rAF
  let _resizeRaf = 0;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(_resizeRaf);
    _resizeRaf = requestAnimationFrame(() => {
      syncTabPlacement();
      syncPortfolioTabPlacement();
      syncSidebarNav();
    });
  });

  function syncPortfolioTabPlacement() {
    const tabRow = document.getElementById('tabRow');
    if (!tabRow) return;
    // Portfolio tabs are always fixed at bottom — just sync underline
    requestAnimationFrame(() => {
      const activeTab = tabRow.querySelector('.tab.active');
      if (activeTab && typeof moveTabUnderline === 'function') moveTabUnderline(activeTab);
      syncHeaderSpacer();
    });
  }
  // syncPortfolioTabPlacement handled in consolidated resize above

  // Align sidebar nav top with the year/month filters row
  function syncSidebarNav() {
    if (window.innerWidth < 768) return;
    const sidebarNav = document.querySelector('.sidebar-nav');
    if (!sidebarNav) return;
    // Use the visible filter row (Dashboard or Portfolio)
    const filters = currentNavSection === 'portfolio'
      ? document.getElementById('headerFilterRow')
      : document.getElementById('txnFiltersRow');
    if (!filters || filters.offsetParent === null) return;
    const filtersRect = filters.getBoundingClientRect();
    // Reset and measure
    sidebarNav.style.paddingTop = '0px';
    requestAnimationFrame(() => {
      const navRect = sidebarNav.getBoundingClientRect();
      const offset = filtersRect.top - navRect.top;
      sidebarNav.style.paddingTop = Math.max(0, offset) + 'px';
    });
  }
  // syncSidebarNav handled in consolidated resize above

  function renderTypeFilters() {
    const types = [...new Set(Object.values(holdings).map(h => h.type))];
    // Populate the type dropdown
    const typeSelect = document.getElementById('portTypeSelect');
    if (typeSelect) {
      let html = '<option value="all">All Types</option>';
      types.forEach(t => { html += `<option value="${t}" ${currentHoldingsFilter === t ? 'selected' : ''}>${t}</option>`; });
      typeSelect.innerHTML = html;
    }
    // Populate mobile type pills
    const typePills = document.getElementById('holdingsTypePills');
    if (typePills) {
      typePills.innerHTML = types.map(t =>
        `<button class="holdings-sort-btn type-btn${currentHoldingsFilter === t ? ' active' : ''}" onclick="filterHoldingsType('${t}', this)">${t}</button>`
      ).join('');
    }
    // Populate year dropdown from trades (handles multiple date formats)
    const yearSelect = document.getElementById('portYearSelect');
    if (yearSelect && allTrades.length > 0) {
      const _mi = {'jan':0,'feb':1,'mar':2,'apr':3,'may':4,'jun':5,'jul':6,'aug':7,'sep':8,'oct':9,'nov':10,'dec':11};
      const parseYear = (s) => {
        if (!s) return null;
        const slash = s.split('/');
        if (slash.length === 3) { const y = parseInt(slash[2]); return y < 100 ? 2000 + y : y; }
        const space = s.trim().split(/\s+/);
        if (space.length === 3 && _mi[(space[1] || '').toLowerCase().slice(0,3)] !== undefined) { const y = parseInt(space[2]); return y < 100 ? 2000 + y : y; }
        const d = new Date(s);
        return isNaN(d) ? null : d.getFullYear();
      };
      const years = [...new Set(allTrades.map(t => parseYear(t.date)).filter(Boolean))].sort((a, b) => b - a);
      let html = '<option value="all">All Years</option>';
      years.forEach(y => { html += `<option value="${y}">${y}</option>`; });
      yearSelect.innerHTML = html;
    }
    syncHeaderSpacer();
  }

  function filterHoldingsType(val, el) {
    // Update mobile type pill active state
    document.querySelectorAll('#holdingsSortBar .type-btn, #holdingsSortBar .holdings-sort-btn:not(.sort-btn):not(.type-btn)').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    // Sync the dropdown too
    const typeSelect = document.getElementById('portTypeSelect');
    if (typeSelect) typeSelect.value = val;
    applyPortfolioTypeFilter(val);
  }

  function applyPortfolioTypeFilter(val) {
    currentHoldingsFilter = val;
    renderSummary(val);
    renderHoldingsTable(val);
    renderTrades(currentTradeFilter);
    renderAllocation();
  }

  function applyPortfolioFilters() {
    // Year/Period filters for portfolio trades view
    // These are cosmetic for now — trades don't have year/month filtering yet
    // but we set the selects so the UI matches dashboard
    renderTrades(currentTradeFilter);
  }

  function applyFilter(filter, el) {
    currentHoldingsFilter = filter;
    el.parentElement.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    moveFilterPill(el, true);
    renderSummary(filter);
    renderHoldingsTable(filter);
    renderTrades(currentTradeFilter);
    renderAllocation();
    // Re-render charts if they've been loaded
    if (typeof renderCharts === 'function' && pieChartInstance !== undefined) {
      renderCharts();
    }
  }


  function setView(view, el) {
    currentView = view;
    el.parentElement.querySelectorAll('.pill-track-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    moveSlidingPill(document.getElementById('viewTrack'), document.getElementById('viewPill'), el, true);
    renderHoldingsTable(currentHoldingsFilter);
  }

  function sortTable(col) {
    if (tableSortCol === col) {
      tableSortDir = tableSortDir === 'desc' ? 'asc' : 'desc';
    } else {
      tableSortCol = col;
      tableSortDir = col === 'ticker' ? 'asc' : 'desc';
    }
    renderHoldingsTable(currentHoldingsFilter);
  }

  function sortHoldingsBy(col, el) {
    document.querySelectorAll('.holdings-sort-btn.sort-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    tableSortCol = col;
    tableSortDir = 'desc';
    renderHoldingsTable(currentHoldingsFilter);
  }

  function renderHoldingsTable(typeFilter) {
    // Always use card layout — desktop and mobile
    const table = document.getElementById('holdingsTable');
    if (table) table.style.display = 'none';
    renderHoldingsCards(typeFilter);
    return;
  }

  function renderHoldingsCards(typeFilter) {
    const container = document.getElementById('holdingsTableContainer');
    let items = getActiveHoldings();
    if (typeFilter !== 'all') items = items.filter(h => h.type === typeFilter);

    const totalPortfolioValue = items.reduce((sum, h) => sum + (h.currentValue || h.netInvested), 0);
    const _isDk = htmlEl.getAttribute('data-theme') !== 'light';

    const rows = items.map(h => {
      const lp = livePrices[h.ticker];
      const hasPrice = !!lp;
      const curPrice = hasPrice ? lp.priceAED : 0;
      const changePercent = hasPrice ? (lp.changePercent || 0) : 0;
      const curValue = hasPrice ? h.currentValue : h.netInvested;
      const pnl = hasPrice ? h.pnl : 0;
      const roi = hasPrice && h.netInvested !== 0 ? h.pnlPercent : 0;
      const weight = totalPortfolioValue > 0 ? (curValue / totalPortfolioValue * 100) : 0;
      return { ticker: h.ticker, type: h.type, shares: h.shares, spent: h.totalSpent, avgCost: h.avgCost, curPrice, changePercent, currentValue: curValue, pnl, roi, weight, hasPrice };
    });

    rows.sort((a, b) => {
      let va = a[tableSortCol], vb = b[tableSortCol];
      if (typeof va === 'string') { va = va.toLowerCase(); vb = vb.toLowerCase(); }
      return tableSortDir === 'asc' ? (va < vb ? -1 : va > vb ? 1 : 0) : (va > vb ? -1 : va < vb ? 1 : 0);
    });
    window._holdingsRows = rows;

    const sym = currentCurrency === 'USD' ? '$' : 'AED ';
    const fm = (v) => formatMoney(v);
    const typeBadgeColors = {
      'Equity': _isDk ? 'rgba(48,209,88,0.12)' : 'rgba(34,134,58,0.12)',
      'ETF': _isDk ? 'rgba(10,132,255,0.12)' : 'rgba(59,130,246,0.12)',
      'Crypto': _isDk ? 'rgba(255,159,10,0.12)' : 'rgba(176,128,32,0.12)',
      'REIT': _isDk ? 'rgba(175,82,222,0.12)' : 'rgba(147,51,234,0.12)',
    };
    const typeBadgeText = {
      'Equity': _isDk ? '#30d158' : '#22863a',
      'ETF': _isDk ? '#0a84ff' : '#3b82f6',
      'Crypto': _isDk ? '#ff9f0a' : '#b08020',
      'REIT': _isDk ? '#bf5af2' : '#9333ea',
    };

    // Hide the table, render cards instead
    document.getElementById('holdingsTable').style.display = 'none';
    let cardsEl = container.querySelector('.holdings-cards');
    if (!cardsEl) {
      cardsEl = document.createElement('div');
      cardsEl.className = 'holdings-cards';
      container.appendChild(cardsEl);
    }
    const isMobLayout = window.innerWidth < 768;
    if (isMobLayout) cardsEl.classList.add('holdings-cards-mobile');
    else cardsEl.classList.remove('holdings-cards-mobile');

    if (rows.length === 0) {
      cardsEl.innerHTML = '<div class="txn-list-empty">No holdings found</div>';
      return;
    }

    const isMob = window.innerWidth < 768;
    const typeColorMap = TYPE_COLORS;

    cardsEl.innerHTML = rows.map((r, i) => {
      const pnlColor = r.pnl >= 0 ? 'var(--emerald)' : 'var(--red)';
      const pnlSign = r.pnl >= 0 ? '+' : '\u2212';
      const roiSign = r.roi >= 0 ? '+' : '\u2212';
      const badgeBg = typeBadgeColors[r.type] || 'rgba(255,255,255,0.06)';
      const badgeFg = typeBadgeText[r.type] || 'var(--text-3)';
      const sharesStr = r.shares % 1 === 0 ? r.shares.toFixed(0) : r.shares.toFixed(2);
      const dotColor = typeColorMap[r.type] || 'rgba(255,255,255,0.3)';

      if (isMob) {
        return `<div class="txn-list-row" onclick="openHoldingDetail(${i})" style="opacity:0;transform:translateY(12px);transition:opacity 0.4s cubic-bezier(0.16,1,0.3,1),transform 0.4s cubic-bezier(0.16,1,0.3,1);transition-delay:${i * 0.03}s">
          <div class="trade-type-badge" style="background:${dotColor}"></div>
          <div class="txn-list-info">
            <div class="txn-list-category">${escapeHTML(r.ticker)}</div>
            <div class="txn-list-desc">${sharesStr} shares &middot; ${r.weight.toFixed(1)}%</div>
          </div>
          <div class="holding-card-right">
            <span class="holding-card-value">${fm(r.currentValue)}</span>
            <div class="holding-card-pnl">
              <span style="color:${pnlColor}">${r.hasPrice ? pnlSign + fm(Math.abs(r.pnl)) : '--'}</span>
              <span style="color:${pnlColor}">${r.hasPrice ? roiSign + Math.abs(r.roi).toFixed(1) + '%' : ''}</span>
            </div>
          </div>
        </div>`;
      }

      return `<div class="holding-card" style="animation-delay:${i * 30}ms" onclick="openHoldingDetail(${i})">
        <div class="holding-card-left">
          <div class="holding-card-ticker-row">
            <span class="holding-card-ticker">${escapeHTML(r.ticker)}</span>
            <span class="holding-card-badge" style="background:${badgeBg};color:${badgeFg}">${r.type}</span>
          </div>
          <span class="holding-card-sub">${sharesStr} shares &middot; ${r.weight.toFixed(1)}% of portfolio</span>
        </div>
        <div class="holding-card-right">
          <span class="holding-card-value">${fm(r.currentValue)}</span>
          <div class="holding-card-pnl">
            <span style="color:${pnlColor}">${r.hasPrice ? pnlSign + fm(Math.abs(r.pnl)) : '--'}</span>
            <span style="color:${pnlColor}">${r.hasPrice ? roiSign + Math.abs(r.roi).toFixed(1) + '%' : ''}</span>
          </div>
        </div>
        <div class="holding-card-weight-bar" style="width:${r.weight}%;background:${badgeFg}"></div>
      </div>`;
    }).join('');

    // Animate mobile rows in
    if (isMob) {
      cardsEl.querySelectorAll('.txn-list-row').forEach(row => {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          row.style.opacity = '1';
          row.style.transform = 'translateY(0)';
        }));
      });
    }
  }

  function openHoldingDetail(idx) {
    const r = window._holdingsRows && window._holdingsRows[idx];
    if (!r) return;
    const sym = currentCurrency === 'USD' ? '$' : 'AED ';
    const convert = convertCurrency;
    const pnlColor = r.pnl >= 0 ? 'var(--emerald)' : 'var(--red)';
    const pnlSign = r.pnl >= 0 ? '+' : '\u2212';
    const roiSign = r.roi >= 0 ? '+' : '\u2212';

    const fields = [
      { label: 'Ticker', value: `<strong>${escapeHTML(r.ticker)}</strong>` },
      { label: 'Shares', value: r.shares % 1 === 0 ? r.shares.toFixed(0) : r.shares.toFixed(4) },
      { label: 'Total Invested', value: sym + convert(r.spent).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}) },
      { label: 'Avg Cost', value: sym + convert(r.avgCost).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}) },
      { label: 'Current Price', value: r.hasPrice ? sym + convert(r.curPrice).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}) : '<span style="color:var(--text-3)">--</span>' },
      { label: 'Current Value', value: sym + convert(r.currentValue).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}) },
      { label: 'P&L', value: r.hasPrice ? `<span style="color:${pnlColor};font-weight:600;">${pnlSign}${sym}${convert(Math.abs(r.pnl)).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>` : '<span style="color:var(--text-3)">--</span>' },
      { label: 'ROI', value: r.hasPrice ? `<span style="color:${pnlColor};font-weight:600;">${roiSign}${Math.abs(r.roi).toFixed(2)}%</span>` : '<span style="color:var(--text-3)">--</span>' },
      { label: 'Weight', value: r.weight.toFixed(1) + '%' },
    ];

    document.getElementById('txnModalContent').innerHTML = fields.map(f =>
      `<div class="txn-modal-row">
        <div class="txn-modal-label">${f.label}</div>
        <div class="txn-modal-value">${f.value}</div>
      </div>`
    ).join('') + `<div class="txn-modal-actions" style="margin-top:12px;gap:8px;">
      <button class="txn-modal-btn save" onclick="closeTxnModal();openBuyMoreModal('${escapeHTML(r.ticker)}')">Buy More</button>
      <button class="txn-modal-btn save" style="background:var(--red);border-color:rgba(255,69,58,0.4);" onclick="closeTxnModal();openSellModal('${escapeHTML(r.ticker)}')">Sell</button>
    </div>`;

    openModal();
  }

  let currentTradeFilter = 'all';

  function renderTrades(filter) {
    currentTradeFilter = filter;
    document.getElementById('tradesTable').style.display = 'none';
    renderTradeCards(filter);
  }

  function renderTradeCards(filter) {
    const container = document.getElementById('tradesTableContainer');
    let trades = [...allTrades];
    const _isDk = htmlEl.getAttribute('data-theme') !== 'light';

    if (currentHoldingsFilter !== 'all') trades = trades.filter(t => t.type === currentHoldingsFilter);
    if (filter === 'buy') trades = trades.filter(t => t.action.includes('BUY'));
    if (filter === 'sell') trades = trades.filter(t => !t.action.includes('BUY'));

    let cardsEl = container.querySelector('.trades-cards');
    if (!cardsEl) {
      cardsEl = document.createElement('div');
      cardsEl.className = 'trades-cards';
      container.appendChild(cardsEl);
    }

    if (trades.length === 0) {
      cardsEl.innerHTML = '<div class="txn-list-empty">No trades found</div>';
      return;
    }

    // Sort by date descending (newest first)
    const _monthIdx = {'jan':0,'feb':1,'mar':2,'apr':3,'may':4,'jun':5,'jul':6,'aug':7,'sep':8,'oct':9,'nov':10,'dec':11};
    const parseTradeDate = (s) => {
      if (!s) return new Date(0);
      // Try DD/MM/YYYY
      const slashParts = s.split('/');
      if (slashParts.length === 3) {
        const y = parseInt(slashParts[2]);
        return new Date(y < 100 ? 2000 + y : y, slashParts[1] - 1, slashParts[0]);
      }
      // Try "29 Sep 25" or "29 Sep 2025"
      const spaceParts = s.trim().split(/\s+/);
      if (spaceParts.length === 3) {
        const mi = _monthIdx[(spaceParts[1] || '').toLowerCase().slice(0, 3)];
        if (mi !== undefined) {
          const y = parseInt(spaceParts[2]);
          return new Date(y < 100 ? 2000 + y : y, mi, parseInt(spaceParts[0]));
        }
      }
      const d = new Date(s);
      return isNaN(d) ? new Date(0) : d;
    };
    trades.sort((a, b) => parseTradeDate(b.date) - parseTradeDate(a.date));

    // Apply year/period filters
    const selYear = document.getElementById('portYearSelect')?.value || 'all';
    const selPeriod = document.getElementById('portPeriodSelect')?.value || 'all';
    if (selYear !== 'all') {
      const yr = parseInt(selYear);
      trades = trades.filter(t => parseTradeDate(t.date).getFullYear() === yr);
    }
    if (selPeriod === 'ytd') {
      const now = new Date();
      trades = trades.filter(t => {
        const d = parseTradeDate(t.date);
        return d.getFullYear() === now.getFullYear() && d.getMonth() <= now.getMonth();
      });
    } else if (selPeriod !== 'all') {
      const mo = parseInt(selPeriod) - 1;
      trades = trades.filter(t => parseTradeDate(t.date).getMonth() === mo);
    }

    if (trades.length === 0) {
      cardsEl.innerHTML = '<div class="txn-list-empty">No trades found</div>';
      return;
    }

    // Group by date (using parsed date key for correct grouping)
    const groups = [];
    const _months = MONTH_NAMES;
    let lastKey = '';
    trades.forEach(t => {
      const pd = parseTradeDate(t.date);
      const key = pd.getFullYear() + '-' + pd.getMonth() + '-' + pd.getDate();
      if (key !== lastKey) {
        lastKey = key;
        groups.push({ date: t.date, parsed: pd, items: [] });
      }
      groups[groups.length - 1].items.push(t);
    });

    const fm = (v) => formatMoney(v);
    let html = '';

    groups.forEach(group => {
      const d = group.parsed;
      const yr = d.getFullYear() % 100;
      const dateLabel = `${d.getDate()} ${_months[d.getMonth()]} ${yr.toString().padStart(2, '0')}`;

      html += '<div class="txn-date-group">';
      html += `<div class="txn-date-header">
        <span class="txn-date-label">${dateLabel}</span>
        <span class="txn-date-total">${group.items.length} trade${group.items.length !== 1 ? 's' : ''}</span>
      </div>`;
      html += '<div class="txn-date-items">';

      group.items.forEach(t => {
        const isBuy = t.action.includes('BUY');
        const amtColor = isBuy ? 'var(--emerald)' : 'var(--red)';
        const prefix = isBuy ? '+' : '-';
        const desc = `${t.shares % 1 === 0 ? t.shares.toFixed(0) : t.shares.toFixed(4)} shares @ ${fm(t.price)}`;
        const badgeColor = TYPE_COLORS[(t.type || 'Other')] || 'rgba(255,255,255,0.3)';

        html += `<div class="txn-list-row">
          <div class="trade-type-badge" style="background:${badgeColor}"></div>
          <div class="txn-list-info">
            <div class="txn-list-category">${escapeHTML(t.ticker)}</div>
            <div class="txn-list-desc">${escapeHTML(desc)}</div>
          </div>
          <div class="txn-list-amount" style="color:${amtColor}">${prefix}${fm(Math.abs(t.total))}</div>
        </div>`;
      });

      html += '</div></div>';
    });

    cardsEl.innerHTML = html;

    staggerFadeIn(cardsEl, '.txn-date-group');
  }

  function sortTradeTable(col) {
    if (tradeSortCol === col) {
      tradeSortDir = tradeSortDir === 'desc' ? 'asc' : 'desc';
    } else {
      tradeSortCol = col;
      tradeSortDir = col === 'ticker' || col === 'type' || col === 'side' ? 'asc' : 'desc';
    }
    renderTrades(currentTradeFilter);
  }

  function filterTradesSelect(val) {
    renderTrades(val);
  }

  function renderAllocation() {
    let activeHoldings = getActiveHoldings();
    if (currentHoldingsFilter !== 'all') {
      activeHoldings = activeHoldings.filter(h => h.type === currentHoldingsFilter);
    }
    const hasAnyLivePrices = activeHoldings.some(h => livePrices[h.ticker]);

    const getValue = (h) => hasAnyLivePrices && livePrices[h.ticker] ? h.currentValue : h.netInvested;
    const totalValue = activeHoldings.reduce((sum, h) => sum + getValue(h), 0);

    // By type
    const typeMap = {};
    activeHoldings.forEach(h => {
      typeMap[h.type] = (typeMap[h.type] || 0) + getValue(h);
    });

    const typeContainer = document.getElementById('typeAllocation');
    const typeEntries = Object.entries(typeMap).sort((a, b) => b[1] - a[1]);
    typeContainer.innerHTML = typeEntries.map(([type, val], i) => {
      const pct = totalValue > 0 ? (val / totalValue * 100) : 0;
      return `
        <div class="alloc-item">
          <div class="alloc-header">
            <span>${type}</span>
            <span>${pct.toFixed(1)}% &middot; ${formatMoney(val)}</span>
          </div>
          <div class="alloc-bar-bg">
            <div class="alloc-bar" style="width: ${pct}%; background: ${COLORS[i % COLORS.length]}"></div>
          </div>
        </div>
      `;
    }).join('');

    // By ticker
    const tickerContainer = document.getElementById('tickerAllocation');
    const tickerEntries = activeHoldings
      .map(h => [h.ticker, getValue(h)])
      .sort((a, b) => b[1] - a[1]);

    tickerContainer.innerHTML = tickerEntries.map(([ticker, val], i) => {
      const pct = totalValue > 0 ? (val / totalValue * 100) : 0;
      return `
        <div class="alloc-item">
          <div class="alloc-header">
            <span>${escapeHTML(ticker)}</span>
            <span>${pct.toFixed(1)}% &middot; ${formatMoney(val)}</span>
          </div>
          <div class="alloc-bar-bg">
            <div class="alloc-bar" style="width: ${pct}%; background: ${COLORS[i % COLORS.length]}"></div>
          </div>
        </div>
      `;
    }).join('');
  }

