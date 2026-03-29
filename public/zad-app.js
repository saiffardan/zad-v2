// === Script Block 1 ===
  // ── SUL Logo SVG generator ──
  // Zad logo — theme-aware (light logo on dark bg, dark logo on light bg)
  // Icon-only Z mark
  function zadLogo(size = 32) {
    const h = Math.round(size * (168 / 164));
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const fill = isDark ? '#F8F8F8' : '#1C1C1C';
    return `<svg viewBox="0 0 164 168" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${h}" fill="none" style="display:block;flex-shrink:0">
      <path d="M153.017 0C158.539 0 163.016 4.47658 163.017 9.99902L163.02 57.7393C163.02 60.0834 162.195 62.3392 160.713 64.125L52.7785 165.085C51.1112 166.645 48.9135 167.513 46.6304 167.513H10C4.47715 167.513 0 163.036 0 157.513V109.901C1.68797e-05 107.103 1.1728 104.432 3.2334 102.538L43.5615 65.4766C44.9034 64.2432 44.0306 62.004 42.208 62.0039H10.001C4.47815 62.0039 0.000976562 57.5267 0.000976562 52.0039V10C0.000980681 4.47718 4.47816 3.20923e-05 10.001 0H153.017Z" fill="${fill}"/>
      <path d="M163.02 118V157.513C163.02 163.036 158.542 167.513 153.02 167.513H101.65C99.8357 167.513 98.9587 165.291 100.284 164.052L159.558 108.607C160.827 107.42 162.903 108.306 162.924 110.044L163.02 118Z" fill="${fill}"/>
    </svg>`;
  }
  // Full wordmark "zad" logo
  function zadFullLogo(size = 60) {
    const h = Math.round(size * (173 / 298));
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const fill = isDark ? '#F8F8F8' : '#161616';
    return `<svg viewBox="0 0 298 173" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${h}" fill="none" style="display:block;flex-shrink:0">
      <path d="M153.017 0C158.539 0 163.016 4.47658 163.017 9.99902L163.02 57.7393C163.02 60.0834 162.195 62.3392 160.713 64.125L52.7785 165.085C51.1112 166.645 48.9135 167.513 46.6304 167.513H10C4.47715 167.513 0 163.036 0 157.513V109.901C1.68797e-05 107.103 1.1728 104.432 3.2334 102.538L43.5615 65.4766C44.9034 64.2432 44.0306 62.004 42.208 62.0039H10.001C4.47815 62.0039 0.000976562 57.5267 0.000976562 52.0039V10C0.000980681 4.47718 4.47816 3.20923e-05 10.001 0H153.017Z" fill="${fill}"/>
      <path d="M281.331 38.4572C279.212 41.8135 274.959 42.5712 271.676 40.3405C269.997 39.1997 268.145 37.8258 266.12 36.2188C263.016 33.6468 260.539 31.3116 258.69 29.2131C257.089 27.3961 256.541 24.9129 257.204 22.5835C257.645 21.0337 258.241 19.2676 258.993 17.2852C260.549 13.3416 262.319 9.81072 264.305 6.69275C266.284 3.4063 268.058 1.56199 269.627 1.15981C271.065 0.763075 273.277 1.51501 276.263 3.41563C279.381 5.31078 282.256 7.72199 284.889 10.6492C287.646 13.4026 289.191 15.6158 289.524 17.2887C290.156 19.7925 288.823 24.3173 285.525 30.863C284.029 33.867 282.631 36.3984 281.331 38.4572ZM274.693 166.939C272.814 172.095 267.03 174.409 262.451 171.383C259.94 169.724 257.26 167.756 254.411 165.48C250.102 162.218 246.571 159.106 243.82 156.144C241.378 153.516 241.128 149.658 242.599 146.385C247.566 135.333 252.367 122.602 257 108.195C261.377 94.9205 265.073 81.5724 268.089 68.1508C269.449 62.0988 275.828 58.5461 281.626 60.7514L291.622 64.5536C295.821 66.1506 298.456 70.3522 297.919 74.8117C296.145 89.5149 293.079 105.434 288.72 122.57C285.534 135.015 282.159 146.118 278.598 155.879C277.124 160.151 275.823 163.838 274.693 166.939Z" fill="${fill}"/>
      <path d="M180.181 167.386C179.515 166.845 179.153 166.015 179.206 165.159C180.158 149.833 180.634 133.951 180.634 117.511C180.634 88.1982 179.598 53.2432 177.525 12.6465C177.243 7.13147 181.47 2.41521 186.984 2.11657L216.228 0.53264C221.684 0.237168 226.37 4.37566 226.719 9.82796C228.906 44.0167 230 76.565 230 107.473C230 126.117 229.695 141.715 229.085 154.265C228.92 157.674 226.997 160.792 223.782 161.937C219.823 163.348 214.728 164.581 208.497 165.638C199.541 166.967 190.679 167.746 181.91 167.977C181.282 167.993 180.669 167.782 180.181 167.386Z" fill="${fill}"/>
      <path d="M148.036 90.44C153.555 88.1327 159.885 91.1527 161.06 97.0178C162.405 103.73 163.224 110.48 163.516 117.268C164.078 127.782 162.861 137.727 159.866 147.105C157.946 153.112 155.25 158.749 151.775 164.014C150.261 166.308 147.746 167.743 144.998 167.707C141.568 167.662 137.162 167.276 131.781 166.552C123.939 165.4 116.294 163.634 108.845 161.254C105.124 160.066 101.756 158.799 98.7424 157.454C94.438 155.533 92.6771 150.519 94.6104 146.22C96.733 141.501 99.246 136.844 102.149 132.252C104.639 128.314 109.645 126.976 113.998 128.636C117.311 129.9 120.542 131.035 123.691 132.042C128.472 133.569 133.084 134.858 137.527 135.908C137.002 126.523 135.27 117.069 132.332 107.548C130.734 102.366 133.115 96.6783 138.118 94.5866L148.036 90.44Z" fill="${fill}"/>
    </svg>`;
  }

  const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }
  const TYPE_COLORS = { 'Equity': '#5aa8f5', 'ETF': '#30d158', 'Crypto': '#ff9f0a', 'Bond': '#ac8eff', 'REIT': '#00c7be' };
  function staggerFadeIn(container, selector, delayPerItem = 0.04) {
    container.querySelectorAll(selector).forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
      el.style.transition = 'opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)';
      el.style.transitionDelay = (i * delayPerItem) + 's';
      requestAnimationFrame(() => { requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }); });
    });
  }
  const CLIENT_ID = (window.__ZAD_CONFIG && window.__ZAD_CONFIG.clientId) || '1008350848317-2pul4n12msbg606khco6h91mrnftv69j.apps.googleusercontent.com';
  const SHEET_ID = (window.__ZAD_CONFIG && window.__ZAD_CONFIG.sheetId) || '1NNOt_RCDxKyZ-E0YYN1cpvDji_bhRC8sZvoLV0pWX48';
  const SHEET_RANGE = 'Investments!G14:M';
  const TXN_RANGE = 'Transactions!B14:G';
  const BUDGET_RANGE = 'Budget Planning!C5:AZ424';
  const SCOPES = 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.profile';
  const AED_USD_RATE = 3.6725; // AED is pegged to USD

  let tokenClient;
  let accessToken = null;
  let userFirstName = '';
  let allTrades = [];
  let holdings = {};
  const getActiveHoldings = () => Object.values(holdings).filter(h => h.shares > 0.0001);
  let livePrices = {};
  let currentCurrency = 'AED'; // default
  let currentHoldingsFilter = 'all';
  let currentView = window.innerWidth <= 600 ? 'compact' : 'full';
  let tableSortCol = 'currentValue';
  let tableSortDir = 'desc';
  let tradeSortCol = 'date';
  let tradeSortDir = 'desc';
  let txnSortCol = 'date';
  let txnSortDir = 'desc';
  let demoMode = false;
  let realData = null; // stores real holdings/trades/livePrices when demo is active
  let allTransactions = [];
  let txnDataLoaded = false;
  let currentTxnYear = String(new Date().getFullYear());
  let currentTxnPeriod = String(new Date().getMonth() + 1);
  let currentTxnTypeFilter = 'all';
  let currentNavSection = 'transactions';
  let txnTrendChartInstance = null;
  let budgetData = {}; // { category: { 'YYYY-MM': budgetAmount } }
  let budgetCategories = { INCOME: [], EXPENSES: [], SAVINGS: [], DEBT: [] };
  let categoryParentMap = {}; // subcategory (D) -> parent category (C)
  let parentBudgetCategories = { INCOME: [], EXPENSES: [], SAVINGS: [], DEBT: [] };
  let budgetDataLoaded = false;

  function animateTable(container) {
    if (!container) return;
    container.classList.remove('table-animate');
    void container.offsetWidth; // force reflow
    container.classList.add('table-animate');
  }

  function animateValue(el, end, duration, formatter) {
    if (!el) return;
    const start = 0;
    const startTime = performance.now();
    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = start + (end - start) * ease;
      el.textContent = formatter(current);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const COLORS = ['#30d158', '#0a84ff', '#ff9f0a', '#a78bfa', '#34d399', '#ff453a', '#fb923c', '#a3e635', '#818cf8', '#22d3ee'];

  // Google Apps Script proxy for Yahoo Finance (no CORS issues)
  const OLD_PRICE_PROXY = 'https://script.google.com/macros/s/AKfycbxazL9nslVYwveXt5SMbA_Gv2Tbh8Isl8318n6FBbMbf11V9PFgUJH2U34llgIwuRtqsw/exec';

  // Enhanced proxy: returns 1yr daily closes + P/E + dividend yield + EPS
  // Deploy enhanced-proxy.gs to your Google account and paste URL here
  const ENHANCED_PROXY = localStorage.getItem('enhancedProxyUrl') || '';

  // Use enhanced if available, fall back to old
  const PRICE_PROXY = ENHANCED_PROXY || OLD_PRICE_PROXY;

  // ── Theme Toggle (SVG sun/moon animated) ──
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);

  function renderThemeDependentComponents() {
    // Re-render all components that bake theme colors into inline styles
    if (currentNavSection === 'transactions') {
      renderTxnSummary();
      if (!document.getElementById('txnBreakdownTab')?.classList.contains('hidden')) {
        renderBreakdown();
      }
      if (!document.getElementById('txnSummaryTab')?.classList.contains('hidden')) {
        renderInsightsPage();
        if (window.Chart) { renderTxnSummaryChart(); renderAllSectionPies(); }
      }
      if (!document.getElementById('txnListTab')?.classList.contains('hidden')) {
        renderTxnTable();
      }
    }
    // Re-render portfolio charts
    if (currentNavSection === 'portfolio' && window.Chart) {
      if (typeof renderCharts === 'function') renderCharts();
    }
  }

  function applyThemeSwitch(next) {
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateNavPill(document.querySelector('.nav-item.active'), false);
    // Update logo color immediately after theme change
    const sidebarLogoEl = document.getElementById('sidebarLogo');
    if (sidebarLogoEl) sidebarLogoEl.innerHTML = zadLogo(28);
    const mldEl = document.getElementById('mobileLogoDash');
    const mlpEl = document.getElementById('mobileLogoPort');
    if (mldEl) mldEl.innerHTML = zadLogo(28);
    if (mlpEl) mlpEl.innerHTML = zadLogo(28);
    if (window.Chart && pieChartInstance) renderCharts();
    // Re-render all theme-dependent components immediately
    if (typeof renderThemeDependentComponents === 'function') renderThemeDependentComponents();
    // Reposition animated indicators (layout may shift on theme change)
    requestAnimationFrame(() => {
      const activeTab = document.querySelector('.tabs .tab.active');
      if (activeTab) moveTabUnderline(activeTab);
      const activeChip = document.querySelector('#typeFilters .filter-chip.active');
      if (activeChip) moveFilterPill(activeChip);
      if (typeof initAllPills === 'function') initAllPills();
    });
  }

  themeToggle.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    if (document.startViewTransition) {
      document.startViewTransition(() => applyThemeSwitch(next));
    } else {
      // Fallback: add transition class briefly
      htmlEl.classList.add('theme-transitioning');
      applyThemeSwitch(next);
      setTimeout(() => htmlEl.classList.remove('theme-transitioning'), 500);
    }
  });

  // ── Demo Mode ──
  function generateDemoData() {
    const demoTickers = [
      { ticker: 'AAPL', type: 'Equity' }, { ticker: 'MSFT', type: 'Equity' },
      { ticker: 'GOOGL', type: 'Equity' }, { ticker: 'TSLA', type: 'Equity' },
      { ticker: 'AMZN', type: 'Equity' }, { ticker: 'VOO', type: 'ETF' },
      { ticker: 'QQQ', type: 'ETF' }, { ticker: 'BTC-USD', type: 'Crypto' },
      { ticker: 'ETH-USD', type: 'Crypto' }, { ticker: 'NVDA', type: 'Equity' },
    ];

    const fakePrices = {
      'AAPL': 210, 'MSFT': 430, 'GOOGL': 175, 'TSLA': 265, 'AMZN': 195,
      'VOO': 520, 'QQQ': 490, 'BTC-USD': 97500, 'ETH-USD': 3800, 'NVDA': 880
    };

    const fakeHoldings = {};
    const fakeLivePrices = {};
    const fakeTrades = [];

    demoTickers.forEach(({ ticker, type }) => {
      const price = fakePrices[ticker];
      const isCrypto = type === 'Crypto';
      const shares = isCrypto ? +(Math.random() * 2 + 0.1).toFixed(4) : Math.floor(Math.random() * 50 + 5);
      const avgCost = price * (0.7 + Math.random() * 0.5);
      const totalSpent = shares * avgCost;
      const currentValue = shares * price * AED_USD_RATE;
      const netInvested = totalSpent * AED_USD_RATE;
      const pnl = currentValue - netInvested;
      const pnlPercent = netInvested !== 0 ? (pnl / netInvested * 100) : 0;
      const changePercent = (Math.random() * 6 - 2);

      fakeHoldings[ticker] = {
        ticker, type, shares,
        totalSpent: netInvested, totalSold: 0,
        netInvested, avgCost: avgCost * AED_USD_RATE,
        currentValue, pnl, pnlPercent
      };

      fakeLivePrices[ticker] = {
        price, priceAED: price * AED_USD_RATE,
        currency: 'USD', changePercent
      };

      // Generate 1-3 fake trades per ticker
      const numTrades = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < numTrades; i++) {
        const month = Math.floor(Math.random() * 12) + 1;
        const day = Math.floor(Math.random() * 28) + 1;
        const tradePrice = avgCost * (0.9 + Math.random() * 0.2);
        const tradeShares = isCrypto ? +(shares / numTrades).toFixed(4) : Math.ceil(shares / numTrades);
        fakeTrades.push({
          date: `${day}/${month}/2025`,
          ticker, type,
          action: 'BUY',
          shares: tradeShares,
          price: tradePrice * AED_USD_RATE,
          total: tradeShares * tradePrice * AED_USD_RATE
        });
      }
    });

    return { holdings: fakeHoldings, livePrices: fakeLivePrices, trades: fakeTrades };
  }

  function toggleDemoMode() {
    demoMode = !demoMode;
    const btn = document.getElementById('privacyToggle');

    if (demoMode) {
      // Save real data
      realData = {
        holdings: JSON.parse(JSON.stringify(holdings)),
        livePrices: JSON.parse(JSON.stringify(livePrices)),
        allTrades: JSON.parse(JSON.stringify(allTrades))
      };
      // Swap in fake data
      const demo = generateDemoData();
      holdings = demo.holdings;
      livePrices = demo.livePrices;
      allTrades = demo.trades;
      btn.classList.add('demo-active');
    } else {
      // Restore real data
      holdings = realData.holdings;
      livePrices = realData.livePrices;
      allTrades = realData.allTrades;
      realData = null;
      btn.classList.remove('demo-active');
    }

    refreshCurrentView();
  }

  // ── Dashboard Demo Mode ──
  let txnDemoMode = false;
  let realTxnData = null;

  function generateDemoTxnData() {
    const year = new Date().getFullYear();
    const categories = {
      INCOME: ['Salary', 'Freelancing', 'Dividends', 'Side Business', 'Rental Income'],
      EXPENSES: ['Rent', 'Groceries', 'Dining Out', 'Utilities', 'Transport', 'Entertainment', 'Shopping', 'Subscriptions', 'Healthcare', 'Travel'],
      SAVINGS: ['Emergency Fund', 'Stock Portfolio', 'Retirement Fund', 'Vacation Fund'],
      DEBT: ['Car Loan', 'Credit Card', 'Student Loan'],
    };

    const monthlyBudgets = {
      INCOME: { 'Salary': 25000, 'Freelancing': 5000, 'Dividends': 1500, 'Side Business': 3000, 'Rental Income': 4000 },
      EXPENSES: { 'Rent': 6000, 'Groceries': 2500, 'Dining Out': 1500, 'Utilities': 800, 'Transport': 1200, 'Entertainment': 1000, 'Shopping': 2000, 'Subscriptions': 500, 'Healthcare': 600, 'Travel': 3000 },
      SAVINGS: { 'Emergency Fund': 3000, 'Stock Portfolio': 5000, 'Retirement Fund': 2000, 'Vacation Fund': 1000 },
      DEBT: { 'Car Loan': 2500, 'Credit Card': 1500, 'Student Loan': 1000 },
    };

    const fakeTxns = [];
    const fakeBudgetData = {};
    const fakeBudgetCategories = { INCOME: [], EXPENSES: [], SAVINGS: [], DEBT: [] };

    // Generate budget data and transactions for current year + next year
    const years = [year, year + 1];
    for (const [type, cats] of Object.entries(categories)) {
      cats.forEach(cat => {
        if (!fakeBudgetCategories[type].includes(cat)) fakeBudgetCategories[type].push(cat);
        if (!fakeBudgetData[cat]) fakeBudgetData[cat] = {};

        for (const yr of years) {
          for (let m = 1; m <= 12; m++) {
            const key = `${yr}-${String(m).padStart(2, '0')}`;
            const baseBudget = monthlyBudgets[type][cat];
            // Slight monthly variation, next year gets a small raise
            const yearMult = yr === year ? 1 : 1.05;
            fakeBudgetData[cat][key] = Math.round(baseBudget * yearMult * (0.9 + Math.random() * 0.2));
          }

          // Generate transactions for all 12 months
          for (let m = 1; m <= 12; m++) {
            const budget = monthlyBudgets[type][cat];
            // Spend between 40-120% of budget
            const spendRatio = 0.4 + Math.random() * 0.8;
            const totalForMonth = Math.round(budget * spendRatio);

            // Split into 1-4 transactions per month
            const numTxns = Math.floor(Math.random() * 3) + 1;
            for (let t = 0; t < numTxns; t++) {
              const day = Math.floor(Math.random() * 28) + 1;
              const amount = t === numTxns - 1
                ? Math.round(totalForMonth / numTxns + (Math.random() * 200 - 100))
                : Math.round(totalForMonth / numTxns);
              if (amount <= 0) continue;

              fakeTxns.push({
                date: `${day}/${m}/${yr}`,
                type,
                category: cat,
                account: ['HSBC', 'ENBD', 'Cash', 'ADCB'][Math.floor(Math.random() * 4)],
                amount: Math.abs(amount),
                description: `Demo ${cat.toLowerCase()} transaction`
              });
            }
          }
        }
      });
    }

    return { transactions: fakeTxns, budgetData: fakeBudgetData, budgetCategories: fakeBudgetCategories };
  }

  function toggleTxnDemoMode() {
    txnDemoMode = !txnDemoMode;
    const btn = document.getElementById('txnDemoToggle');

    if (txnDemoMode) {
      // Save real data
      realTxnData = {
        allTransactions: JSON.parse(JSON.stringify(allTransactions)),
        budgetData: JSON.parse(JSON.stringify(budgetData)),
        budgetCategories: JSON.parse(JSON.stringify(budgetCategories)),
      };
      // Swap in fake data
      const demo = generateDemoTxnData();
      allTransactions = demo.transactions;
      budgetData = demo.budgetData;
      budgetCategories = demo.budgetCategories;
      btn.classList.add('demo-active');
    } else {
      // Restore real data
      allTransactions = realTxnData.allTransactions;
      budgetData = realTxnData.budgetData;
      budgetCategories = realTxnData.budgetCategories;
      realTxnData = null;
      btn.classList.remove('demo-active');
    }

    renderTransactionsDashboard();
  }

  function handleDemoLogin() {
    // Generate fake portfolio data
    demoMode = true;
    const demoInv = generateDemoData();
    holdings = demoInv.holdings;
    livePrices = demoInv.livePrices;
    allTrades = demoInv.trades;

    // Generate fake transaction + budget data
    txnDemoMode = true;
    const demoTxn = generateDemoTxnData();
    allTransactions = demoTxn.transactions;
    budgetData = demoTxn.budgetData;
    budgetCategories = demoTxn.budgetCategories;

    txnDataLoaded = true;
    budgetDataLoaded = true;
    userFirstName = 'Demo';

    // Hide sign-in, show app
    hideSignInScreen();
    document.getElementById('appSidebar').classList.remove('hidden');
    renderDashboard();
  }

  let gisLoadFailed = false;

  function loadGIS() {
    if (!CLIENT_ID) {
      gisLoadFailed = true;
      console.warn('[Zad] No CLIENT_ID configured — Google Sign-In disabled.');
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = () => {
      try {
        tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPES,
          callback: handleTokenResponse,
        });
      } catch (e) {
        gisLoadFailed = true;
        console.error('[Zad] Failed to init Google token client:', e);
      }
    };
    script.onerror = () => {
      gisLoadFailed = true;
      console.warn('[Zad] Failed to load Google Identity Services script.');
    };
    document.head.appendChild(script);
  }

  function showSignInError(msg) {
    const el = document.getElementById('signInError');
    if (el) {
      el.textContent = msg;
      el.style.display = 'block';
      setTimeout(() => { el.style.display = 'none'; }, 5000);
    }
  }

  function handleSignIn() {
    if (tokenClient) {
      const btn = document.getElementById('signInBtn');
      if (btn) btn.classList.add('loading');
      tokenClient.requestAccessToken();
    } else if (gisLoadFailed || !CLIENT_ID) {
      showSignInError('Google Sign-In unavailable — check your Client ID configuration.');
    } else {
      showSignInError('Google Sign-In is still loading. Please try again.');
    }
  }

  function handleTokenResponse(response) {
    if (response.error) {
      const btn = document.getElementById('signInBtn');
      if (btn) btn.classList.remove('loading');
      showSignInError('Sign-in failed: ' + response.error);
      return;
    }
    accessToken = response.access_token;
    // Cache token with expiry (expires_in is in seconds)
    const expiresAt = Date.now() + (response.expires_in || 3600) * 1000;
    localStorage.setItem('cachedToken', accessToken);
    localStorage.setItem('tokenExpiresAt', expiresAt);
    // Fetch user's name from Google
    fetchUserName(accessToken);
    // Hide sign-in, show loading
    const btn = document.getElementById('signInBtn');
    if (btn) btn.classList.remove('loading');
    hideSignInScreen();
    document.getElementById('appSidebar').classList.remove('hidden');
    document.getElementById('loadingScreen').classList.remove('hidden');
    fetchSheetData();
  }

  function fetchUserName(token) {
    fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: 'Bearer ' + token }
    })
    .then(r => r.json())
    .then(info => {
      userFirstName = (info.given_name || info.name || '').split(' ')[0];
      localStorage.setItem('userName', userFirstName);
      updateDashboardGreeting();
    })
    .catch(() => {});
  }

  function updateDashboardGreeting() {
    // No-op: greeting removed when nav moved to header
  }

  function hideSignInScreen() {
    const el = document.getElementById('signInScreen');
    if (el) {
      el.classList.add('hidden');
      el.classList.remove('exiting');
      el.style.display = 'none';
    }
  }

  function handleSignOut() {
    accessToken = null;
    localStorage.removeItem('cachedToken');
    localStorage.removeItem('tokenExpiresAt');
    localStorage.removeItem('userName');
    userFirstName = '';
    // Clear demo state
    demoMode = false;
    txnDemoMode = false;
    realData = null;
    realTxnData = null;
    // Revoke the token with Google (skip if demo session)
    if (typeof google !== 'undefined' && google.accounts && google.accounts.oauth2) {
      google.accounts.oauth2.revoke && google.accounts.oauth2.revoke(accessToken);
    }
    // Hide app, show sign-in
    document.getElementById('transactionsApp').classList.add('hidden');
    document.getElementById('mainApp').classList.add('hidden');
    document.getElementById('bottomNav').classList.add('hidden');
    document.getElementById('loadingScreen').classList.add('hidden');
    document.getElementById('appSidebar').classList.add('hidden');
    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('hubPage').classList.add('hidden');
    const hubWrap = document.getElementById('bottomBarWrap');
    if (hubWrap) hubWrap.classList.add('hidden');
    const signInEl = document.getElementById('signInScreen');
    signInEl.style.display = '';
    signInEl.classList.remove('hidden');
    window.scrollTo(0, 0);
  }

  // Loading screen message rotator
  const _loadingMessages = {
    portfolio: [
      'Reading your spreadsheet...', 'Crunching the numbers...', 'Parsing your holdings...',
      'Connecting to Google Sheets...', 'Gathering your data...', 'Almost there...',
      'Loading your portfolio...', 'Fetching investment data...'
    ],
    prices: [
      'Fetching live prices...', 'Checking the markets...', 'Getting real-time quotes...',
      'Pulling latest prices...', 'Scanning the exchanges...', 'Refreshing market data...',
      'Syncing with the market...', 'One moment...'
    ],
    transactions: [
      'Loading transactions...', 'Reading your spending...', 'Sorting your activity...',
      'Processing your budget...', 'Analyzing cash flow...', 'Tallying everything up...'
    ]
  };
  let _loadingMsgInterval = null;

  function setLoadingPhase(phase) {
    const textEl = document.getElementById('loadingText');
    const msgs = _loadingMessages[phase] || _loadingMessages.portfolio;

    // Pick a random message
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    if (textEl) {
      textEl.style.opacity = '0';
      setTimeout(() => {
        textEl.textContent = msg;
        textEl.style.opacity = '1';
      }, 150);
    }

    // Rotate messages while in this phase
    clearInterval(_loadingMsgInterval);
    _loadingMsgInterval = setInterval(() => {
      const m = msgs[Math.floor(Math.random() * msgs.length)];
      if (textEl) {
        textEl.style.opacity = '0';
        setTimeout(() => {
          textEl.textContent = m;
          textEl.style.opacity = '1';
        }, 150);
      }
    }, 2800);
  }

  function stopLoadingMessages() {
    clearInterval(_loadingMsgInterval);
    _loadingMsgInterval = null;
  }

  async function fetchSheetData() {
    try {
      setLoadingPhase('portfolio');
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(SHEET_RANGE)}`;
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || 'Failed to fetch data');
      }

      const data = await res.json();
      processData(data.values || []);
      setLoadingPhase('prices');

      // Fetch live prices + transactions in parallel
      await Promise.all([
        fetchLivePrices(),
        fetchTransactions().then(() => {
          setLoadingPhase('transactions');
        }).catch(e => console.warn('Txn fetch:', e)),
        fetchBudgetData().catch(e => console.warn('Budget fetch:', e))
      ]);

      stopLoadingMessages();
      renderDashboard();
    } catch (e) {
      stopLoadingMessages();
      // Clear cached token on auth failure so next load shows sign-in
      localStorage.removeItem('cachedToken');
      localStorage.removeItem('tokenExpiresAt');
      console.error('[Zad] fetchSheetData error:', e);
      document.getElementById('loadingScreen').classList.add('hidden');
      const signInEl = document.getElementById('signInScreen');
      signInEl.style.display = '';
      signInEl.classList.remove('hidden');
      showSignInError(e.message || 'Failed to load data. Please try again.');
    }
  }

  function parseNumber(val) {
    if (!val) return 0;
    return parseFloat(String(val).replace(/[^0-9.\-]/g, '')) || 0;
  }

  function processData(rows) {
    allTrades = [];
    holdings = {};

    for (const row of rows) {
      if (!row || row.length < 3) continue;

      const date = (row[0] || '').toString().trim();
      const ticker = (row[1] || '').toString().trim().toUpperCase();
      const action = (row[2] || '').toString().trim().toUpperCase();
      const shares = parseNumber(row[3]);
      const price = parseNumber(row[4]);
      const type = (row[5] || '').toString().trim() || 'Other';
      const total = parseNumber(row[6]) || (shares * price);

      if (!ticker || !action) continue;

      allTrades.push({ date, ticker, action, shares, price, type, total });

      if (!holdings[ticker]) {
        holdings[ticker] = { ticker, type, shares: 0, totalSpent: 0, totalSold: 0, buys: 0, sells: 0 };
      }

      const isBuy = action.includes('BUY');
      if (isBuy) {
        holdings[ticker].shares += shares;
        holdings[ticker].totalSpent += Math.abs(total);
        holdings[ticker].buys++;
      } else {
        holdings[ticker].shares -= shares;
        holdings[ticker].totalSold += Math.abs(total);
        holdings[ticker].sells++;
      }
    }

    for (const h of Object.values(holdings)) {
      h.netInvested = h.totalSpent - h.totalSold;
      h.avgCost = h.shares > 0 ? h.totalSpent / h.shares : 0;
    }
  }

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
  async function fetchEnhancedData(ticker) {
    if (!ENHANCED_PROXY) return;
    try {
      const res = await fetch(`${ENHANCED_PROXY}?symbol=${encodeURIComponent(ticker)}&range=1y&interval=1d`);
      if (!res.ok) return;
      const data = await res.json();
      const result = data?.chart?.result?.[0];
      if (!result) return;
      const closesArr = result?.indicators?.quote?.[0]?.close;
      if (!closesArr || closesArr.length < 50) return;

      const dailyCloses = closesArr.filter(c => c != null);
      const existing = livePrices[ticker.toUpperCase()];
      if (!existing) return;

      existing.dailyCloses = dailyCloses;
      if (dailyCloses.length >= 200) {
        existing.ma200 = dailyCloses.slice(-200).reduce((s,v) => s+v, 0) / 200;
      }
      if (dailyCloses.length >= 15) {
        existing.rsi14 = calcRSI(dailyCloses, 14);
      }
      if (dailyCloses.length >= 126) {
        const p6m = dailyCloses[dailyCloses.length - 126];
        if (p6m > 0) existing.return6m = (existing.price - p6m) / p6m;
      }
      // Fundamental data from enhanced proxy
      const meta = result.meta;
      if (meta.trailingPE) existing.trailingPE = meta.trailingPE;
      if (meta.trailingEPS) existing.trailingEPS = meta.trailingEPS;
      if (meta.dividendYield) existing.dividendYield = meta.dividendYield;
    } catch (e) {
      // Silently fail — enhanced data is optional
    }
  }

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

  function renderHoldings(typeFilter) {
    const container = document.getElementById('holdingsList');
    let items = getActiveHoldings();

    if (typeFilter !== 'all') {
      items = items.filter(h => h.type === typeFilter);
    }

    // Sort by current value (descending)
    items.sort((a, b) => (b.currentValue || b.netInvested) - (a.currentValue || a.netInvested));

    if (items.length === 0) {
      container.innerHTML = '<p style="color: var(--text-2); text-align: center; padding: 40px 0;">No active positions</p>';
      return;
    }

    container.innerHTML = items.map(h => {
      const lp = livePrices[h.ticker];
      const hasPrice = !!lp;

      let priceDisplay = '';
      let pnlDisplay = '';

      if (hasPrice) {
        const displayPrice = currentCurrency === 'USD' ? lp.price / (lp.currency === 'AED' ? AED_USD_RATE : 1) : lp.priceAED;
        const sym = currentCurrency === 'USD' ? '$' : 'AED ';
        const changeClass = lp.changePercent >= 0 ? 'positive' : 'negative';
        const changeSign = lp.changePercent >= 0 ? '+' : '\u2212';
        priceDisplay = `<div class="live-price">${sym}${displayPrice.toFixed(2)} <span class="pnl ${changeClass}">${changeSign}${Math.abs(lp.changePercent).toFixed(2)}%</span></div>`;

        const pnlClass = h.pnl >= 0 ? 'positive' : 'negative';
        const pnlSign = h.pnl >= 0 ? '+' : '\u2212';
        pnlDisplay = `<div class="pnl ${pnlClass}">${pnlSign}${formatMoney(Math.abs(h.pnl))} (${pnlSign}${Math.abs(h.pnlPercent).toFixed(1)}%)</div>`;
      }

      return `
        <div class="holding-item">
          <div class="holding-left">
            <h3>${escapeHTML(h.ticker)}</h3>
            <span class="type-badge">${h.type}</span>
            ${priceDisplay}
          </div>
          <div class="holding-right">
            <div class="shares">${h.shares.toFixed(h.shares % 1 === 0 ? 0 : 4)} shares</div>
            <div class="value">${formatMoney(hasPrice ? h.currentValue : h.netInvested)}</div>
            <div class="avg-price">Avg: ${formatMoney(h.avgCost)}/share</div>
            ${pnlDisplay}
          </div>
        </div>
      `;
    }).join('');
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
    const convert = (v) => currentCurrency === 'USD' ? v / AED_USD_RATE : v;
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
    const convert = (v) => currentCurrency === 'USD' ? v / AED_USD_RATE : v;
    const fmt = (v) => convert(v).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const investable = results.filter(r => !r.skip);
    const skipped = results.filter(r => r.skip);
    const cashReserve = lastAdvisorOutput?.cashReserve || 0;
    const summaryText = lastAdvisorOutput?.summary || '';
    const typeColorMap = { 'Equity': '#5aa8f5', 'Stock': '#5aa8f5', 'ETF': '#30d158', 'Crypto': '#ff9f0a', 'Bond': '#ac8eff', 'REIT': '#00c7be' };

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
    const convert = (v) => currentCurrency === 'USD' ? v / AED_USD_RATE : v;
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
    const convert = (v) => currentCurrency === 'USD' ? v / AED_USD_RATE : v;
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
    const convert = (v) => currentCurrency === 'USD' ? v / AED_USD_RATE : v;
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

  function moveTabUnderline(activeTab) {
    const row = document.getElementById('tabRow');
    const underline = document.getElementById('tabUnderline');
    const rowRect = row.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();
    const tabPad = parseFloat(getComputedStyle(activeTab).paddingLeft) || 12;
    underline.style.left = (tabRect.left - rowRect.left + tabPad) + 'px';
    underline.style.width = (tabRect.width - tabPad * 2) + 'px';
  }

  function switchTab(tab, el) {
    document.querySelectorAll('.tabs .tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    document.getElementById('holdingsTab').classList.add('hidden');
    document.getElementById('tradesTab').classList.add('hidden');
    document.getElementById('chartsTab').classList.add('hidden');
    document.getElementById('advisorTab').classList.add('hidden');

    el.classList.add('active');
    el.setAttribute('aria-selected', 'true');
    moveTabUnderline(el);
    document.getElementById(tab + 'Tab').classList.remove('hidden');

    // Update header tab indicator
    const tabNames = { holdings: 'Holdings', trades: 'Trades', charts: 'Insights', advisor: 'Advisor' };
    const indicator = document.getElementById('portTabIndicator');
    if (indicator) indicator.textContent = tabNames[tab] || '';

    // Show summary cards only on Holdings tab
    // Show summary + hero only on Holdings tab
    const summaryCards = document.getElementById('summaryCardsDesktop');
    const summaryWL = document.getElementById('summaryWLDesktop');
    const summaryHero = document.getElementById('summaryHero');
    const sortBar = document.getElementById('holdingsSortBar');
    if (summaryCards) summaryCards.style.display = tab === 'holdings' ? '' : 'none';
    if (summaryWL) summaryWL.style.display = tab === 'holdings' ? '' : 'none';
    if (summaryHero) summaryHero.style.display = tab === 'holdings' ? '' : 'none';
    if (sortBar) sortBar.style.display = tab === 'holdings' ? '' : 'none';

    // Toggle mobile layout class for portfolio trades filter wrapping
    document.body.classList.toggle('port-trades-active', tab === 'trades');
    document.body.classList.toggle('port-holdings-active', tab === 'holdings');

    // Hide entire filter row on Holdings (type is inline in sort bar)
    const filterRow = document.getElementById('headerFilterRow');
    if (filterRow) filterRow.style.display = tab === 'holdings' ? 'none' : '';

    // Animate filter visibility per tab
    const filterYear = document.getElementById('filterPortYear');
    const filterPeriod = document.getElementById('filterPortPeriod');
    const tradeFilterWrap = document.getElementById('tradeFilterWrap');
    const portTypeWrap = document.getElementById('portTypeWrap');
    // Year/Period: show on Trades/Charts
    if (filterYear) filterYear.classList.toggle('filter-hidden', tab === 'holdings' || tab === 'advisor');
    if (filterPeriod) filterPeriod.classList.toggle('filter-hidden', tab === 'holdings' || tab === 'advisor');
    // Trade filter: show on Trades tab only
    if (tradeFilterWrap) tradeFilterWrap.classList.toggle('filter-hidden', tab !== 'trades');
    // Type filter: hide on Holdings (inline pills), Advisor
    if (portTypeWrap) portTypeWrap.classList.toggle('filter-hidden', tab === 'holdings' || tab === 'advisor');

    if (tab === 'charts') { renderCharts(); renderAllocation(); }
    if (tab === 'advisor') renderAdvisor();

    // Update portfolio filter spacer on mobile
    if (window.innerWidth < 768) {
      const updateSpacer = () => {
        const fr = document.getElementById('headerFilterRow');
        const sp = document.getElementById('portFiltersSpacer');
        if (fr && sp) sp.style.height = fr.offsetHeight + 'px';
      };
      requestAnimationFrame(updateSpacer);
      setTimeout(updateSpacer, 350);
    }

    // Scroll to top on tab switch
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Re-position pills now that the tab content is visible
    requestAnimationFrame(() => initAllPills());
  }

  // ── Nav Pill Slider ──
  function updateNavPill(btn, animate = true) {
    const pill = document.getElementById('navActivePill');
    if (!btn || !pill) return;
    if (!animate) {
      pill.style.transition = 'none';
    } else {
      pill.style.transition = 'transform 0.6s cubic-bezier(0.25, 1.15, 0.40, 1), width 0.6s cubic-bezier(0.25, 1.15, 0.40, 1), background 0.5s ease, box-shadow 0.5s ease';
      pill.classList.remove('gooping');
      void pill.offsetWidth;
      pill.classList.add('gooping');
    }
    pill.style.width = btn.offsetWidth + 'px';
    pill.style.transform = 'translateX(' + btn.offsetLeft + 'px)';
  }

  // Clean up goop animation
  document.getElementById('navActivePill')?.addEventListener('animationend', function() {
    this.classList.remove('gooping');
  });

  // Init nav pill on first show
  function initNavPill() {
    const active = document.querySelector('.nav-item.active');
    if (active) {
      requestAnimationFrame(() => updateNavPill(active, false));
    }
  }

  // Resize handler for nav pill
  window.addEventListener('resize', () => {
    const active = document.querySelector('.nav-item.active');
    if (active) updateNavPill(active, false);
  });

  function switchNav(section, el) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    el.classList.add('active');
    updateNavPill(el, true);
    currentNavSection = section;

    // Sync sidebar active state
    document.querySelectorAll('.sidebar-item').forEach(i => {
      i.classList.toggle('active', i.dataset.page === (section === 'portfolio' ? 'portfolio' : 'transactions'));
    });

    document.getElementById('mainApp').classList.toggle('hidden', section !== 'portfolio');
    document.getElementById('transactionsApp').classList.toggle('hidden', section !== 'transactions');
    const catApp = document.getElementById('categoriesApp');
    if (catApp) catApp.classList.add('hidden');
    const budApp = document.getElementById('budgetApp');
    if (budApp) budApp.classList.add('hidden');

    // Move nav pill to the active page's header
    const nav = document.getElementById('bottomNav');
    if (section === 'portfolio') {
      const anchor = document.getElementById('portfolioNavAnchor');
      if (anchor && nav) anchor.appendChild(nav);
    } else {
      const anchor = document.getElementById('txnNavAnchor');
      if (anchor && nav) anchor.appendChild(nav);
    }

    // Scroll to top when switching pages
    window.scrollTo(0, 0);

    if (section === 'portfolio') {
      syncPortfolioTabPlacement();
      // Re-init pills and tab underline since they were hidden
      requestAnimationFrame(() => requestAnimationFrame(() => {
        initAllPills();
        const activeTab = document.querySelector('#mainApp .tabs .tab.active');
        if (activeTab) moveTabUnderline(activeTab);
        const activeFilterChip = document.querySelector('#typeFilters .filter-chip.active');
        if (activeFilterChip) moveFilterPill(activeFilterChip);
        syncHeaderSpacer();
        syncSidebarNav();
        restartAnimations(document.getElementById('mainApp'));
        // Sync --header-h and filter spacer from portfolio header on mobile
        if (window.innerWidth < 768) {
          const ph = document.querySelector('#mainApp .header');
          if (ph) document.documentElement.style.setProperty('--header-h', ph.offsetHeight + 'px');
          const fr = document.getElementById('headerFilterRow');
          const sp = document.getElementById('portFiltersSpacer');
          if (fr && sp) sp.style.height = fr.offsetHeight + 'px';
        }
      }));
    } else if (section === 'transactions') {
      // Sync --header-h from transactions header on mobile
      requestAnimationFrame(() => {
        const th = document.querySelector('#transactionsApp .header');
        if (th && window.innerWidth < 768) {
          document.documentElement.style.setProperty('--header-h', th.offsetHeight + 'px');
        }
      });
      if (txnDataLoaded) {
        renderTransactionsDashboard();
      } else {
        fetchTransactions();
      }
    }
  }

  function sidebarNav(page, el) {
    // Update sidebar active state
    document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');

    if (page === 'settings') {
      // TODO: Settings page for V3
      return;
    }

    // Map sidebar to existing switchNav logic
    const section = page === 'portfolio' ? 'portfolio' : 'transactions';
    // Find the matching nav-item button and trigger switchNav
    const navBtn = document.querySelector(`.nav-item[onclick*="'${section}'"]`) ||
                   document.querySelectorAll('.nav-item')[section === 'portfolio' ? 1 : 0];
    if (navBtn) {
      switchNav(section, navBtn);
    }
  }

  // ── Hub & Spoke Navigation ──
  let _previousPage = 'home'; // tracks which page was open before hub
  let _hubOpen = false;

  window.openHubSettings = function openHubSettings() {
    const grid = document.getElementById('hubGrid');
    const settings = document.getElementById('hubSettings');
    const settingsBtn = document.querySelector('.hub-settings-btn');
    const hubTitle = document.querySelector('.hub-title');
    if (grid) grid.classList.add('hidden');
    if (settings) settings.classList.remove('hidden');
    if (settingsBtn) settingsBtn.style.display = 'none';
    if (hubTitle) hubTitle.style.display = 'none';
    // Sync labels
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    const tl = document.getElementById('hubThemeLabel');
    if (tl) tl.textContent = theme === 'dark' ? 'Dark' : 'Light';
    const dl = document.getElementById('hubDemoLabel');
    if (dl) dl.textContent = (typeof txnDemoMode !== 'undefined' && txnDemoMode) ? 'On' : 'Off';
    const cl = document.getElementById('hubCurrLabel');
    if (cl) cl.textContent = (typeof currentCurrency !== 'undefined') ? currentCurrency : 'AED';
  };

  window.closeHubSettings = function closeHubSettings() {
    const grid = document.getElementById('hubGrid');
    const settings = document.getElementById('hubSettings');
    const settingsBtn = document.querySelector('.hub-settings-btn');
    const hubTitle = document.querySelector('.hub-title');
    if (settings) settings.classList.add('hidden');
    if (grid) grid.classList.remove('hidden');
    if (settingsBtn) settingsBtn.style.display = '';
    if (hubTitle) hubTitle.style.display = '';
  };

  function setHubBtnState(open) {
    _hubOpen = open;
    const btn = document.getElementById('floatingHubBtn');
    if (btn) btn.classList.toggle('hub-active', open);
  }


  function showTabBar(section) {
    // Hide all floating tab bars
    ['tabRow', 'txnTabRow', 'budgetTabRow', 'nwTabRow'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('hidden');
    });
    // Show the one for the active section
    const map = { portfolio: 'tabRow', transactions: 'txnTabRow', budget: 'budgetTabRow', networth: 'nwTabRow' };
    const id = map[section];
    if (id) {
      const el = document.getElementById(id);
      if (el) el.classList.remove('hidden');
    }
  }

  function highlightActiveHubTile() {
    const tiles = document.querySelectorAll('#hubPage .hub-tile');
    tiles.forEach(t => {
      const page = t.getAttribute('data-page');
      t.classList.toggle('hub-tile-active', page === _previousPage);
    });
  }

  let _skipPageEnter = false;

  window.navigateToHome = function navigateToHome() {
    _previousPage = 'home';
    setHubBtnState(false);

    showTabBar(null);
    document.getElementById('mainApp').classList.add('hidden');
    document.getElementById('transactionsApp').classList.add('hidden');
    document.getElementById('budgetApp').classList.add('hidden');
    document.getElementById('hubPage').classList.add('hidden');
    document.getElementById('netWorthApp').classList.add('hidden');
    const catApp = document.getElementById('categoriesApp');
    if (catApp) catApp.classList.add('hidden');

    const home = document.getElementById('homePage');
    home.classList.remove('hidden');
    if (!_skipPageEnter) {
      home.classList.add('page-enter');
      setTimeout(() => home.classList.remove('page-enter'), 600);
    }
    window.scrollTo(0, 0);
    updateHomePage();
  };

  window.toggleHub = function toggleHub() {
    if (_hubOpen) {
      // Animate hub out, then navigate to destination
      const hub = document.getElementById('hubPage');
      hub.classList.add('hub-exit');
      setTimeout(() => {
        hub.classList.remove('hub-exit');
        setHubBtnState(false);
        if (_previousPage === 'home') {
          navigateToHome();
        } else {
          navigateToPage(_previousPage);
        }
      }, 300);
    } else {
      // Open hub
      // Remember current page before opening
      if (!document.getElementById('homePage').classList.contains('hidden')) {
        _previousPage = 'home';
      } else if (!document.getElementById('transactionsApp').classList.contains('hidden')) {
        _previousPage = 'transactions';
      } else if (!document.getElementById('mainApp').classList.contains('hidden')) {
        _previousPage = 'portfolio';
      } else if (!document.getElementById('budgetApp').classList.contains('hidden')) {
        _previousPage = 'budget';
      } else if (!document.getElementById('netWorthApp').classList.contains('hidden')) {
        _previousPage = 'networth';
      }
      navigateToHub();
    }
  };

  window.navigateToHub = function navigateToHub() {
    setHubBtnState(true);
    closeHubSettings();
    showTabBar(null);
    document.getElementById('mainApp').classList.add('hidden');
    document.getElementById('transactionsApp').classList.add('hidden');
    document.getElementById('budgetApp').classList.add('hidden');
    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('netWorthApp').classList.add('hidden');
    const catApp = document.getElementById('categoriesApp');
    if (catApp) catApp.classList.add('hidden');

    highlightActiveHubTile();

    const hub = document.getElementById('hubPage');
    hub.classList.remove('hidden');
    hub.classList.add('hub-enter');
    setTimeout(() => hub.classList.remove('hub-enter'), 400);
    window.scrollTo(0, 0);
  };

  window.navigateToPage = function navigateToPage(section) {
    _previousPage = section;
    setHubBtnState(false);

    showTabBar(section);
    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('hubPage').classList.add('hidden');
    document.getElementById('netWorthApp').classList.add('hidden');

    if (section === 'networth') {
      currentNavSection = 'networth';
      document.getElementById('transactionsApp').classList.add('hidden');
      document.getElementById('mainApp').classList.add('hidden');
      document.getElementById('budgetApp').classList.add('hidden');
      const nwApp = document.getElementById('netWorthApp');
      nwApp.classList.remove('hidden');
      if (!_skipPageEnter) {
        nwApp.classList.add('page-enter');
        setTimeout(() => nwApp.classList.remove('page-enter'), 600);
      }
      window.scrollTo(0, 0);
      const mlnw = document.getElementById('mobileLogoNetWorth');
      if (mlnw && !mlnw.innerHTML) mlnw.innerHTML = zadLogo(28);
      requestAnimationFrame(() => {
        const nh = document.querySelector('#netWorthApp .header');
        const spacer = document.querySelector('#netWorthApp .header-spacer');
        if (nh) {
          if (spacer) spacer.style.height = nh.offsetHeight + 'px';
          if (window.innerWidth < 768) document.documentElement.style.setProperty('--header-h', nh.offsetHeight + 'px');
        }
      });
      const nwInd = document.getElementById('nwTabIndicator');
      if (nwInd) nwInd.textContent = currentNwTab === 'dashboard' ? 'Dashboard' : 'Planning';
      renderNetWorthPage();
    } else if (section === 'budget') {
      currentNavSection = 'budget';
      document.getElementById('transactionsApp').classList.add('hidden');
      document.getElementById('mainApp').classList.add('hidden');
      const budgetApp = document.getElementById('budgetApp');
      budgetApp.classList.remove('hidden');
      if (!_skipPageEnter) {
        budgetApp.classList.add('page-enter');
        setTimeout(() => budgetApp.classList.remove('page-enter'), 600);
      }
      window.scrollTo(0, 0);
      const mlb = document.getElementById('mobileLogoBudget');
      if (mlb && !mlb.innerHTML) mlb.innerHTML = zadLogo(28);
      requestAnimationFrame(() => {
        const bh = document.querySelector('#budgetApp .header');
        const spacer = document.querySelector('#budgetApp .header-spacer');
        if (bh) {
          if (spacer) spacer.style.height = bh.offsetHeight + 'px';
          if (window.innerWidth < 768) document.documentElement.style.setProperty('--header-h', bh.offsetHeight + 'px');
        }
      });
      const budgetInd = document.getElementById('budgetTabIndicator');
      if (budgetInd) budgetInd.textContent = currentBudgetTab === 'overview' ? 'Overview' : 'Budgets';
      fetchAndRenderBudget();
    } else if (section === 'portfolio') {
      currentNavSection = 'portfolio';
      document.getElementById('transactionsApp').classList.add('hidden');
      document.getElementById('budgetApp').classList.add('hidden');
      const mainAppEl = document.getElementById('mainApp');
      mainAppEl.classList.remove('hidden');
      if (!_skipPageEnter) {
        mainAppEl.classList.add('page-enter');
        setTimeout(() => mainAppEl.classList.remove('page-enter'), 600);
      }
      window.scrollTo(0, 0);
      syncPortfolioTabPlacement();
      requestAnimationFrame(() => requestAnimationFrame(() => {
        initAllPills();
        const activeTab = document.querySelector('#mainApp .tabs .tab.active');
        if (activeTab) moveTabUnderline(activeTab);
        syncHeaderSpacer();
      }));
    } else {
      currentNavSection = 'transactions';
      document.getElementById('mainApp').classList.add('hidden');
      document.getElementById('budgetApp').classList.add('hidden');
      const txnApp = document.getElementById('transactionsApp');
      txnApp.classList.remove('hidden');
      if (!_skipPageEnter) {
        txnApp.classList.add('page-enter');
        setTimeout(() => txnApp.classList.remove('page-enter'), 600);
      }
      window.scrollTo(0, 0);
      syncHeaderSpacer();
      if (txnDataLoaded) {
        renderTransactionsDashboard();
      } else {
        fetchTransactions();
      }
    }
  };

  function updateHomePage() {
    const hour = new Date().getHours();
    let greeting = 'Good evening';
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 17) greeting = 'Good afternoon';

    const greetEl = document.getElementById('homeGreeting');
    const nameEl = document.getElementById('homeUserName');
    if (greetEl) greetEl.textContent = greeting;
    if (nameEl) nameEl.textContent = userFirstName || 'there';

    const logo = document.getElementById('homeLogo');
    if (logo && !logo.innerHTML) logo.innerHTML = zadLogo(28);

    // Portfolio glance
    const portVal = document.getElementById('homePortValue');
    const portPnl = document.getElementById('homePortPnl');
    const allPos = getActiveHoldings();
    const portfolioTotal = allPos.reduce((s, h) => s + (h.currentValue || 0), 0);
    if (portVal) {
      const total = portfolioTotal;
      const pnl = allPos.reduce((s, h) => s + (h.pnl || 0), 0);
      portVal.textContent = total > 0 ? formatMoney(total) : '--';
      if (portPnl && total > 0) {
        const invested = allPos.reduce((s, h) => s + (h.netInvested || 0), 0);
        const roi = invested > 0 ? ((pnl / invested) * 100).toFixed(1) : '0.0';
        portPnl.textContent = `${pnl >= 0 ? '+' : ''}${formatMoney(pnl)} (${roi}%)`;
        portPnl.style.color = pnl >= 0 ? 'var(--emerald)' : 'var(--red)';
      }
    }

    // Monthly spend glance
    const monthSpend = document.getElementById('homeMonthSpend');
    const monthRemaining = document.getElementById('homeMonthRemaining');
    if (monthSpend && allTransactions.length > 0) {
      const now = new Date();
      const curMonth = now.getMonth() + 1;
      const curYear = now.getFullYear();
      const monthTxns = allTransactions.filter(t => {
        const d = parseDate(t.date);
        return d.getMonth() + 1 === curMonth && d.getFullYear() === curYear;
      });
      const income = monthTxns.filter(t => t.type === 'INCOME').reduce((s, t) => s + t.amount, 0);
      const expenses = monthTxns.filter(t => t.type === 'EXPENSES').reduce((s, t) => s + t.amount, 0);
      const savings = monthTxns.filter(t => t.type === 'SAVINGS').reduce((s, t) => s + t.amount, 0);
      const debt = monthTxns.filter(t => t.type === 'DEBT').reduce((s, t) => s + t.amount, 0);
      const totalOut = expenses + savings + debt;
      const rem = income - totalOut;
      monthSpend.textContent = formatMoney(Math.abs(rem));
      monthSpend.style.color = rem >= 0 ? 'var(--emerald)' : 'var(--red)';
      const label = document.querySelector('.home-glance-budget .home-glance-label');
      if (label) label.textContent = rem >= 0 ? 'REMAINING' : 'OVER BUDGET';
      if (monthRemaining) {
        monthRemaining.textContent = `${formatMoney(Math.abs(totalOut))} total out`;
        monthRemaining.style.color = 'var(--text-3)';
      }
    }

    // Net worth = cash remaining + portfolio value
    const netWorthEl = document.getElementById('homeNetWorth');
    if (netWorthEl) {
      const totalIncome = allTransactions.filter(t => t.type === 'INCOME').reduce((s, t) => s + t.amount, 0);
      const totalExpenses = allTransactions.filter(t => t.type === 'EXPENSES').reduce((s, t) => s + t.amount, 0);
      const totalSavings = allTransactions.filter(t => t.type === 'SAVINGS').reduce((s, t) => s + t.amount, 0);
      const totalDebt = allTransactions.filter(t => t.type === 'DEBT').reduce((s, t) => s + t.amount, 0);
      const cashRemaining = totalIncome - totalExpenses - totalSavings - totalDebt;
      const netWorth = cashRemaining + portfolioTotal;
      netWorthEl.textContent = formatMoney(netWorth);
      netWorthEl.style.color = netWorth >= 0 ? 'var(--text-1)' : 'var(--red)';
    }

    // Recent activity
    const recentList = document.getElementById('homeRecentList');
    if (recentList && allTransactions.length > 0) {
      const recent = allTransactions
        .filter(t => t.type !== 'TRANSFER')
        .sort((a, b) => parseDate(b.date) - parseDate(a.date))
        .slice(0, 5);

      if (recent.length === 0) {
        recentList.innerHTML = '<div class="home-empty-state">No recent transactions</div>';
      } else {
        recentList.innerHTML = recent.map(t => {
          const isIncome = t.type === 'INCOME';
          const isRefund = t.isRefund;
          const prefix = isIncome || isRefund ? '+' : '-';
          const cls = isIncome || isRefund ? 'income' : 'expense';
          const d = parseDate(t.date);
          const dateStr = `${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`;
          return `<div class="home-recent-row">
            <div class="home-recent-left">
              <span class="home-recent-cat">${escapeHTML(t.category || t.subcategory || '--')}</span>
              <span class="home-recent-date">${dateStr}</span>
            </div>
            <span class="home-recent-amt ${cls}">${prefix}${formatMoney(Math.abs(t.amount))}</span>
          </div>`;
        }).join('');
      }
    } else if (recentList) {
      recentList.innerHTML = '<div class="home-empty-state">No transactions yet</div>';
    }
  }

  async function refreshData() {
    const btn = document.getElementById('refreshBtn');
    btn.classList.add('spinning');
    const savedSection = currentNavSection;
    livePrices = {};
    await fetchSheetData();
    btn.classList.remove('spinning');
    // Restore the page we were on (fetchSheetData→renderDashboard defaults to transactions)
    if (savedSection === 'portfolio') {
      document.getElementById('mainApp').classList.remove('hidden');
      document.getElementById('transactionsApp').classList.add('hidden');
      currentNavSection = 'portfolio';
      // Re-highlight correct nav item
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      document.querySelectorAll('.nav-item')[1].classList.add('active');
      requestAnimationFrame(() => { initAllPills(); syncHeaderSpacer(); });
    }
  }

  function showError(msg) {
    const container = document.getElementById('errorContainer');
    container.innerHTML = `<div class="error-msg">${msg}</div>`;
    setTimeout(() => container.innerHTML = '', 5000);
  }

  // ─── CHARTS ───────────────────────────────────────────────
  let pieChartInstance = null;
  let waterfallChartInstance = null;
  let histChartInstance = null;
  let currentHistMetric = 'value';

  function getThemeColors() {
    const isDark = htmlEl.getAttribute('data-theme') === 'dark';
    return {
      text: isDark ? 'rgba(240,244,241,0.5)' : 'rgba(15,31,20,0.7)',
      grid: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(15,31,20,0.12)',
      bg: isDark ? '#060a08' : '#eef3ee',
      emerald: isDark ? '#30d158' : '#16a34a',
      red: isDark ? '#ff453a' : '#dc2626',
      tooltipBg: isDark ? 'rgba(6,10,8,0.95)' : 'rgba(255,255,255,0.95)',
      tooltipText: isDark ? '#f0f4f1' : '#0f1f14',
      tooltipBody: isDark ? 'rgba(240,244,241,0.8)' : 'rgba(15,31,20,0.7)',
      tooltipBorder: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,31,20,0.1)',
    };
  }

  // ── Shared external tooltip for all Chart.js charts ──
  let _chartTipEl = null;
  function getChartTipEl() {
    if (!_chartTipEl) {
      _chartTipEl = document.createElement('div');
      _chartTipEl.className = 'chart-ext-tip';
      document.body.appendChild(_chartTipEl);
    }
    return _chartTipEl;
  }

  function externalTooltipHandler(context) {
    const { chart, tooltip } = context;
    const tip = getChartTipEl();
    if (tooltip.opacity === 0) {
      tip.classList.remove('visible');
      return;
    }
    let html = '';
    if (tooltip.title && tooltip.title.length) {
      html += `<div class="chart-tip-title">${tooltip.title.join('<br>')}</div>`;
    }
    const before = tooltip.beforeBody || [];
    const bodyLines = tooltip.body ? tooltip.body.map(b => b.lines).flat().filter(Boolean) : [];
    const allLines = [...before, ...bodyLines].filter(Boolean);
    if (allLines.length) {
      html += allLines.map(l => `<div class="chart-tip-line">${l}</div>`).join('');
    }
    tip.innerHTML = html;
    // Position above touch/hover point, clamped to viewport
    const canvasRect = chart.canvas.getBoundingClientRect();
    const tipX = canvasRect.left + tooltip.caretX;
    const tipY = canvasRect.top + tooltip.caretY;
    tip.classList.add('visible');
    const tipW = tip.offsetWidth;
    const tipH = tip.offsetHeight;
    tip.style.left = Math.max(8, Math.min(window.innerWidth - tipW - 8, tipX - tipW / 2)) + 'px';
    tip.style.top = Math.max(8, tipY - tipH - 24) + 'px';
  }

  function loadChartJS() {
    return new Promise((resolve) => {
      if (window.Chart) { resolve(); return; }
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js';
      s.onload = resolve;
      document.head.appendChild(s);
    });
  }

  async function renderCharts() {
    await loadChartJS();

    const tc = getThemeColors();
    Chart.defaults.color = tc.text;
    Chart.defaults.borderColor = tc.grid;
    Chart.defaults.font.family = "'DM Mono', monospace";
    // Bigger tooltips on mobile
    if ('ontouchstart' in window) {
      Chart.defaults.plugins.tooltip.padding = 14;
      Chart.defaults.plugins.tooltip.titleFont = { size: 14, weight: '600' };
      Chart.defaults.plugins.tooltip.bodyFont = { size: 13 };
      Chart.defaults.plugins.tooltip.caretSize = 8;
    }

    renderPieChart();
    renderWaterfallChart();
    renderHistChart();
  }

  // ── Pie Chart ──
  function renderPieChart() {
    const barEl = document.getElementById('portfolioAllocBar');
    const totalEl = document.getElementById('portfolioAllocTotal');
    const listEl = document.getElementById('portfolioAllocList');
    // Fallback if elements don't exist (old HTML)
    if (!barEl || !totalEl || !listEl) return;

    const isDark = htmlEl.getAttribute('data-theme') !== 'light';
    let active = getActiveHoldings();
    if (currentHoldingsFilter !== 'all') active = active.filter(h => h.type === currentHoldingsFilter);

    const hasLP = active.some(h => livePrices[h.ticker]);
    const getValue = (h) => hasLP && livePrices[h.ticker] ? h.currentValue : h.netInvested;
    const totalVal = active.reduce((s, h) => s + getValue(h), 0);
    const sorted = [...active].sort((a, b) => getValue(b) - getValue(a));

    const mainHoldings = [];
    let otherValue = 0;
    sorted.forEach(h => {
      const pct = totalVal > 0 ? getValue(h) / totalVal * 100 : 0;
      if (pct >= 2) mainHoldings.push({ ticker: h.ticker, value: getValue(h), pct });
      else otherValue += getValue(h);
    });
    if (otherValue > 0) mainHoldings.push({ ticker: 'Other', value: otherValue, pct: totalVal > 0 ? otherValue / totalVal * 100 : 0 });

    const sym = currentCurrency === 'USD' ? '$' : 'AED ';
    const totalConverted = convertCurrency(totalVal);
    const count = mainHoldings.length;

    function emeraldGradient(i, n) {
      const t = n <= 1 ? 0 : i / (n - 1);
      const s = Math.round(70 - t * 20);
      const l = isDark ? Math.round(35 + t * 37) : Math.round(25 + t * 40);
      return `hsl(145, ${s}%, ${l}%)`;
    }
    const colors = mainHoldings.map((_, i) => emeraldGradient(i, count));

    // Stacked bar
    barEl.innerHTML = mainHoldings.map((h, i) => {
      const val = convertCurrency(h.value).toLocaleString('en-US', { maximumFractionDigits: 0 });
      return `<div class="alloc-bar-seg" style="flex:${h.pct.toFixed(1)};background:${colors[i]}" data-alloc-tip="${escapeHTML(h.ticker)}: ${sym}${val} (${h.pct.toFixed(1)}%)"></div>`;
    }).join('');

    // Tooltip for bar
    let allocTip = document.getElementById('portfolioAllocTip');
    if (!allocTip) {
      allocTip = document.createElement('div');
      allocTip.id = 'portfolioAllocTip';
      allocTip.className = 'heatmap-tooltip';
      document.body.appendChild(allocTip);
    }
    barEl.onmouseover = (e) => {
      const seg = e.target.closest('.alloc-bar-seg[data-alloc-tip]');
      if (!seg) { allocTip.classList.remove('visible'); return; }
      allocTip.textContent = seg.getAttribute('data-alloc-tip');
      const rect = seg.getBoundingClientRect();
      allocTip.style.left = (rect.left + rect.width / 2 - allocTip.offsetWidth / 2) + 'px';
      allocTip.style.top = (rect.top - allocTip.offsetHeight - 8) + 'px';
      allocTip.classList.add('visible');
    };
    barEl.onmouseout = () => allocTip.classList.remove('visible');

    // Total
    totalEl.innerHTML = `
      <span class="alloc-total-label" id="portfolioAllocAmt">--</span>
      <span class="alloc-total-sub">${count} holding${count !== 1 ? 's' : ''}</span>
    `;
    const amtEl = document.getElementById('portfolioAllocAmt');
    if (amtEl) animateValue(amtEl, totalConverted, 1200, (v) => sym + v.toLocaleString('en-US', { maximumFractionDigits: 0 }));

    // Ranked list
    const maxVal = Math.max(...mainHoldings.map(h => convertCurrency(h.value)));
    listEl.innerHTML = mainHoldings.map((h, i) => {
      const val = convertCurrency(h.value).toLocaleString('en-US', { maximumFractionDigits: 0 });
      const barPct = maxVal > 0 ? (convertCurrency(h.value) / maxVal * 100) : 0;
      return `<div class="alloc-rank-row">
        <span class="alloc-rank-num">${i + 1}</span>
        <span class="alloc-rank-dot" style="background:${colors[i]}"></span>
        <span class="alloc-rank-name">${escapeHTML(h.ticker)}</span>
        <span class="alloc-rank-bar"><span class="alloc-rank-bar-fill" style="width:${barPct}%;background:${colors[i]}"></span></span>
        <span class="alloc-rank-val">${sym}${val}</span>
        <span class="alloc-rank-pct">${h.pct.toFixed(1)}%</span>
      </div>`;
    }).join('');
  }

  // ── Waterfall P&L Chart ──
  function renderWaterfallChart() {
    const canvas = document.getElementById('waterfallChart');
    if (waterfallChartInstance) waterfallChartInstance.destroy();

    const tc = getThemeColors();
    let active = Object.values(holdings).filter(h => h.shares > 0.0001 && livePrices[h.ticker]);
    if (currentHoldingsFilter !== 'all') {
      active = active.filter(h => h.type === currentHoldingsFilter);
    }
    if (active.length === 0) {
      waterfallChartInstance = null;
      canvas.parentElement.innerHTML = '<p style="color:var(--text-2);text-align:center;padding:40px 0;font-size:14px;">Live prices needed for P&L chart</p>';
      return;
    }

    const sorted = [...active].sort((a, b) => b.pnl - a.pnl);
    const totalPnl = convertCurrency(sorted.reduce((s, h) => s + h.pnl, 0));
    const totalNetInvested = sorted.reduce((s, h) => s + h.netInvested, 0);
    const totalRoi = totalNetInvested > 0 ? ((sorted.reduce((s, h) => s + h.pnl, 0)) / totalNetInvested * 100) : 0;

    const labels = [...sorted.map(h => h.ticker), 'TOTAL'];
    const pnlValues = [...sorted.map(h => convertCurrency(h.pnl)), totalPnl];
    const roiValues = [...sorted.map(h => h.pnlPercent), totalRoi];

    const bgColors = pnlValues.map((v, i) =>
      i === pnlValues.length - 1
        ? 'rgba(10,132,255,0.5)'
        : (v >= 0 ? 'rgba(74,222,128,0.5)' : 'rgba(248,113,113,0.5)')
    );
    const borderColors = pnlValues.map((v, i) =>
      i === pnlValues.length - 1
        ? '#0a84ff'
        : (v >= 0 ? tc.emerald : tc.red)
    );

    const dataFloating = pnlValues.map(v => v >= 0 ? [0, v] : [v, 0]);
    const barCount = labels.length;

    waterfallChartInstance = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          data: dataFloating,
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: 1,
          borderRadius: 2,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        interaction: { mode: 'nearest', axis: 'y', intersect: false },
        events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove', 'touchend'],
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: false,
            external: externalTooltipHandler,
            displayColors: false,
            callbacks: {
              label: (ctx) => {
                const sym = currentCurrency === 'USD' ? '$' : 'AED ';
                const raw = pnlValues[ctx.dataIndex];
                const sign = raw >= 0 ? '+' : '\u2212';
                const val = Math.abs(raw).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                const roi = roiValues[ctx.dataIndex];
                const roiSign = roi >= 0 ? '+' : '\u2212';
                return `${sign}${sym}${val} (${roiSign}${Math.abs(roi).toFixed(1)}%)`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: tc.grid },
            ticks: {
              font: { size: 10 },
              color: tc.text,
              callback: (v) => {
                const sym = currentCurrency === 'USD' ? '$' : 'AED';
                if (Math.abs(v) >= 1000) return sym + ' ' + (v / 1000).toFixed(0) + 'k';
                return sym + ' ' + v;
              }
            }
          },
          y: {
            grid: { display: false },
            ticks: {
              font: { size: 11, weight: '600', family: "'Outfit', sans-serif" },
              color: (ctx) => ctx.index === labels.length - 1 ? '#0a84ff' : tc.text
            }
          }
        }
      }
    });
  }

  // ── Historical Performance ──
  let currentHistRange = 'all';

  function parseDate(dateStr) {
    if (!dateStr) return new Date(0);
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      let year = parseInt(parts[2], 10);
      if (year < 100) year += 2000;
      return new Date(year, month, day);
    }
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? new Date(0) : d;
  }

  function toISOKey(dateStr) {
    const d = parseDate(dateStr);
    return d.toISOString().slice(0, 10);
  }

  function formatDateLabel(dateStr) {
    const d = parseDate(dateStr);
    const months = MONTH_NAMES;
    return `${d.getDate()} ${months[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`;
  }

  function buildHistoricalData() {
    let trades = [...allTrades];
    if (currentHoldingsFilter !== 'all') {
      trades = trades.filter(t => t.type === currentHoldingsFilter);
    }
    const sortedTrades = trades.sort((a, b) => parseDate(a.date) - parseDate(b.date));

    const snapshots = [];
    let cumulativeSpent = 0;
    let cumulativeSold = 0;
    const posMap = {};

    for (const t of sortedTrades) {
      const isBuy = t.action.includes('BUY');
      if (!posMap[t.ticker]) posMap[t.ticker] = { shares: 0, totalSpent: 0, totalSold: 0 };

      if (isBuy) {
        posMap[t.ticker].shares += t.shares;
        posMap[t.ticker].totalSpent += Math.abs(t.total);
        cumulativeSpent += Math.abs(t.total);
      } else {
        posMap[t.ticker].shares -= t.shares;
        posMap[t.ticker].totalSold += Math.abs(t.total);
        cumulativeSold += Math.abs(t.total);
      }

      let currentVal = 0;
      for (const [ticker, pos] of Object.entries(posMap)) {
        if (pos.shares > 0.0001) {
          const lp = livePrices[ticker];
          if (lp) {
            currentVal += pos.shares * lp.priceAED;
          } else {
            currentVal += pos.totalSpent - pos.totalSold;
          }
        }
      }

      const netInvested = cumulativeSpent - cumulativeSold;
      const isoKey = toISOKey(t.date);

      snapshots.push({
        date: t.date,
        isoKey,
        dateObj: parseDate(t.date),
        invested: cumulativeSpent,
        netInvested,
        currentValue: currentVal,
        pnl: currentVal - netInvested,
        roi: netInvested > 0 ? ((currentVal - netInvested) / netInvested * 100) : 0
      });
    }

    const byDate = new Map();
    for (const s of snapshots) {
      byDate.set(s.isoKey, s);
    }
    return [...byDate.values()];
  }

  let currentChartView = 'allocation';
  function switchChartView(view, el) {
    currentChartView = view;
    document.querySelectorAll('.chart-seg-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('chartViewAllocation').classList.toggle('hidden', view !== 'allocation');
    document.getElementById('chartViewPerformance').classList.toggle('hidden', view !== 'performance');
    document.getElementById('chartViewPnl').classList.toggle('hidden', view !== 'pnl');
    if (view === 'performance') {
      renderHistChart();
      updatePerfHero();
      requestAnimationFrame(() => initAllPills());
    }
    if (view === 'pnl') {
      renderWaterfallChart();
      updatePnlHero();
    }
    if (view === 'allocation') renderPieChart();
  }

  function getPortfolioTotals() {
    const positions = getActiveHoldings();
    const totalSpent = positions.reduce((s, h) => s + h.totalSpent, 0);
    const totalSold = positions.reduce((s, h) => s + h.totalSold, 0);
    const netInvested = totalSpent - totalSold;
    const totalValue = positions.reduce((s, h) => s + (h.currentValue || h.netInvested), 0);
    const totalPnl = totalValue - netInvested;
    const totalRoi = netInvested !== 0 ? (totalPnl / netInvested * 100) : 0;
    return { positions, totalSpent, totalSold, netInvested, totalValue, totalPnl, totalRoi };
  }

  function updatePerfHero() {
    const el = document.getElementById('perfHeroMetric');
    if (!el) return;
    const { positions, totalSpent, totalSold, netInvested, totalValue, totalPnl, totalRoi } = getPortfolioTotals();
    const labels = { 'value': 'Portfolio Value', 'pnl': 'Total P&L', 'roi': 'Return' };
    let num, sub, color;
    if (currentHistMetric === 'value') {
      num = formatMoney(totalValue);
      const sign = totalPnl >= 0 ? '+' : '\u2212';
      color = totalPnl >= 0 ? 'var(--emerald)' : 'var(--red)';
      sub = `<span style="color:${color}">${sign}${formatMoney(Math.abs(totalPnl))} (${totalPnl >= 0 ? '+' : '\u2212'}${Math.abs(totalRoi).toFixed(2)}%)</span>`;
    } else if (currentHistMetric === 'pnl') {
      const sign = totalPnl >= 0 ? '+' : '\u2212';
      color = totalPnl >= 0 ? 'var(--emerald)' : 'var(--red)';
      num = `<span style="color:${color}">${sign}${formatMoney(Math.abs(totalPnl))}</span>`;
      sub = `<span style="color:var(--text-3)">on ${formatMoney(netInvested)} invested</span>`;
    } else {
      const sign = totalRoi >= 0 ? '+' : '\u2212';
      color = totalRoi >= 0 ? 'var(--emerald)' : 'var(--red)';
      num = `<span style="color:${color}">${sign}${Math.abs(totalRoi).toFixed(2)}%</span>`;
      sub = `<span style="color:var(--text-3)">${formatMoney(totalValue)}</span>`;
    }
    el.innerHTML = `<div class="chart-hero-label">${labels[currentHistMetric]}</div><div class="chart-hero-number">${num}</div><div class="chart-hero-sub">${sub}</div>`;
  }

  function updatePnlHero() {
    const el = document.getElementById('pnlHeroMetric');
    if (!el) return;
    const { positions, netInvested, totalPnl } = getPortfolioTotals();
    const sign = totalPnl >= 0 ? '+' : '\u2212';
    const color = totalPnl >= 0 ? 'var(--emerald)' : 'var(--red)';
    el.innerHTML = `<div class="chart-hero-label">Total P&L</div><div class="chart-hero-number" style="color:${color}">${sign}${formatMoney(Math.abs(totalPnl))}</div><div class="chart-hero-sub"><span style="color:var(--text-3)">across ${positions.length} holdings</span></div>`;
  }

  function setHistMetric(metric, el) {
    currentHistMetric = metric;
    el.parentElement.querySelectorAll('.pill-track-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    moveSlidingPill(document.getElementById('metricTrack'), document.getElementById('metricPill'), el, true);
    renderHistChart();
    updatePerfHero();
  }

  function setHistRange(range, el) {
    currentHistRange = range;
    el.parentElement.querySelectorAll('.pill-track-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    moveSlidingPill(document.getElementById('rangeTrack'), document.getElementById('rangePill'), el, true);
    renderHistChart();
  }

  function filterByRange(data) {
    if (currentHistRange === 'all' || data.length === 0) return data;

    const now = new Date();
    let cutoff;
    if (currentHistRange === '1m') cutoff = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    else if (currentHistRange === '3m') cutoff = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
    else if (currentHistRange === '6m') cutoff = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
    else if (currentHistRange === '1y') cutoff = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    else if (currentHistRange === 'ytd') cutoff = new Date(now.getFullYear(), 0, 1);
    else return data;

    const filtered = data.filter(d => d.dateObj >= cutoff);
    return filtered.length >= 2 ? filtered : data;
  }

  function renderHistChart() {
    const canvas = document.getElementById('histChart');
    if (histChartInstance) histChartInstance.destroy();

    const tc = getThemeColors();
    const allData = buildHistoricalData();
    const data = filterByRange(allData);

    if (data.length < 2) {
      histChartInstance = null;
      const wrapper = canvas.parentElement;
      if (!wrapper.querySelector('.no-data-msg')) {
        canvas.style.display = 'none';
        const p = document.createElement('p');
        p.className = 'no-data-msg';
        p.style.cssText = 'color:var(--text-2);text-align:center;padding:40px 0;font-size:14px;';
        p.textContent = 'Not enough trade history for chart';
        wrapper.appendChild(p);
      }
      return;
    }

    canvas.style.display = '';
    const old = canvas.parentElement.querySelector('.no-data-msg');
    if (old) old.remove();

    const labels = data.map(d => formatDateLabel(d.date));
    const sym = currentCurrency === 'USD' ? '$' : 'AED ';

    let values, label, color, fillColor, isMoney = true;

    if (currentHistMetric === 'value') {
      values = data.map(d => convertCurrency(d.currentValue));
      label = 'Portfolio Value';
      color = '#0a84ff';
      fillColor = 'rgba(10,132,255,0.12)';
    } else if (currentHistMetric === 'pnl') {
      values = data.map(d => convertCurrency(d.pnl));
      label = 'P&L';
      color = values[values.length - 1] >= 0 ? tc.emerald : tc.red;
      fillColor = values[values.length - 1] >= 0 ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)';
    } else {
      values = data.map(d => d.roi);
      label = 'ROI %';
      color = values[values.length - 1] >= 0 ? tc.emerald : tc.red;
      fillColor = values[values.length - 1] >= 0 ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)';
      isMoney = false;
    }

    histChartInstance = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label,
          data: values,
          borderColor: color,
          backgroundColor: fillColor,
          fill: true,
          tension: 0.35,
          borderWidth: 2.5,
          pointRadius: data.length > 30 ? 0 : 3,
          pointHoverRadius: 5,
          pointBackgroundColor: color,
          pointBorderColor: 'transparent'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove', 'touchend'],
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: false,
            external: externalTooltipHandler,
            displayColors: false,
            callbacks: {
              title: (items) => items[0]?.label || '',
              label: (ctx) => {
                if (isMoney) {
                  const val = ctx.parsed.y;
                  const sign = val >= 0 ? '' : '\u2212';
                  const abs = Math.abs(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                  return `${label}: ${sign}${sym}${abs}`;
                }
                return `${label}: ${ctx.parsed.y.toFixed(1)}%`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: tc.grid },
            ticks: {
              font: { size: 10 },
              color: tc.text,
              maxRotation: 45,
              maxTicksLimit: 8
            }
          },
          y: {
            grid: { color: tc.grid },
            ticks: {
              font: { size: 10 },
              color: tc.text,
              callback: (v) => {
                if (!isMoney) return v.toFixed(0) + '%';
                const sym2 = currentCurrency === 'USD' ? '$' : 'AED';
                if (Math.abs(v) >= 1000000) return sym2 + ' ' + (v / 1000000).toFixed(1) + 'M';
                if (Math.abs(v) >= 1000) return sym2 + ' ' + (v / 1000).toFixed(0) + 'k';
                return sym2 + ' ' + v.toFixed(0);
              }
            }
          }
        }
      }
    });
  }

  // Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(regs => {
      regs.forEach(r => r.unregister());
    }).then(() => {
      caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
      navigator.serviceWorker.register('./sw.js?v=401', { updateViaCache: 'none' }).catch(() => {});
    });
  }

  // Init tab underline + all sliding pills after fonts/layout settle
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const activeTab = document.querySelector('.tabs .tab.active');
      if (activeTab) moveTabUnderline(activeTab);
      initAllPills();
    });
  });


  // Reposition pills & spacer on resize (mobile ↔ desktop layout shift)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const activeTab = document.querySelector('.tabs .tab.active');
      if (activeTab) moveTabUnderline(activeTab);
      const activeChip = document.querySelector('#typeFilters .filter-chip.active');
      if (activeChip) moveFilterPill(activeChip);
      initAllPills();
      syncHeaderSpacer();
      // Also handle transactions screen
      if (currentNavSection === 'transactions') {
        const activeTab = document.querySelector('#txnTabRow .tab.active');
        if (activeTab) moveTxnTabUnderline(activeTab);
        initTxnPills();
        syncTxnHeaderSpacer();
      }
    }, 100);
  });

  // ── Transactions Dashboard ──

  // themeToggle2 delegates to main toggle (SVG icons auto-update via CSS data-theme)
  const themeToggle2 = document.getElementById('themeToggle2');
  if (themeToggle2) {
    themeToggle2.addEventListener('click', () => {
      themeToggle.click();
    });
  }

  async function fetchTransactions() {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(TXN_RANGE)}?valueRenderOption=UNFORMATTED_VALUE&dateTimeRenderOption=FORMATTED_STRING`;
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      if (!res.ok) throw new Error('Failed to fetch transactions');
      const data = await res.json();
      processTransactions(data.values || []);
      txnDataLoaded = true;
      // Update home page with transaction data
      if (!document.getElementById('homePage').classList.contains('hidden')) {
        updateHomePage();
      }
      // Only render if transactions screen is visible
      if (currentNavSection === 'transactions') {
        renderTransactionsDashboard();
      }
    } catch (err) {
      console.error('Transaction fetch error:', err);
    }
  }

  async function fetchBudgetData() {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(BUDGET_RANGE)}`;
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      if (!res.ok) throw new Error('Failed to fetch budget data');
      const data = await res.json();
      processBudgetData(data.values || []);
      budgetDataLoaded = true;
    } catch (err) {
      console.error('Budget fetch error:', err);
    }
  }

  function processBudgetData(rows) {
    budgetData = {};
    categoryParentMap = {};
    if (rows.length < 6) return;

    // Range now starts at C, so: index 0=C, 1=D, 2=E, 3=F, ...
    // Row 0 = sheet row 5 (years), Row 5 = sheet row 10 (months)
    const yearRow = rows[0];
    const monthRow = rows[5];

    // Build column mapping: colIndex -> { year, month }
    // Data starts at column F (index 3)
    const colMap = {};
    const monthNames = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];

    for (let c = 3; c < Math.max(yearRow?.length || 0, monthRow?.length || 0); c++) {
      const yearVal = yearRow?.[c];
      const monthVal = monthRow?.[c];
      if (!yearVal && !monthVal) continue;

      let year = yearVal;
      if (!year) {
        for (let prev = c - 1; prev >= 3; prev--) {
          if (yearRow?.[prev]) { year = yearRow[prev]; break; }
        }
      }
      if (!year) continue;

      let monthNum = -1;
      if (monthVal) {
        const mLower = monthVal.toString().toLowerCase().trim().slice(0, 3);
        monthNum = monthNames.indexOf(mLower);
      }
      if (monthNum === -1) continue;

      colMap[c] = {
        year: parseInt(year),
        month: monthNum + 1,
        key: `${parseInt(year)}-${String(monthNum + 1).padStart(2, '0')}`
      };
    }

    // Store colMap globally for write-back
    window._budgetColMap = colMap;
    // Build reverse map: "YYYY-MM" -> sheet column letter
    window._budgetKeyToCol = {};
    for (const [idx, info] of Object.entries(colMap)) {
      // Column index in range (0=C) -> sheet column letter
      // index 0=C(3), 1=D(4), 2=E(5), 3=F(6), ...
      const sheetColNum = parseInt(idx) + 2; // +2 because range starts at C (A=0, B=1, C=2)
      const colLetter = sheetColNum < 26 ? String.fromCharCode(65 + sheetColNum) : String.fromCharCode(64 + Math.floor(sheetColNum / 26)) + String.fromCharCode(65 + (sheetColNum % 26));
      window._budgetKeyToCol[info.key] = colLetter;
    }
    // Store category -> sheet row mapping
    window._budgetCatRowMap = {};

    // Category sections (row offsets from row 5):
    // Income: rows 11-111 -> index 6-106
    // Expenses: rows 115-216 -> index 110-211
    // Savings: rows 220-320 -> index 215-315
    // Debt: rows 324-424 -> index 319-419
    const sections = [
      { start: 6, end: 106, type: 'INCOME' },
      { start: 110, end: 211, type: 'EXPENSES' },
      { start: 215, end: 315, type: 'SAVINGS' },
      { start: 319, end: 419, type: 'DEBT' },
    ];

    budgetCategories = { INCOME: [], EXPENSES: [], SAVINGS: [], DEBT: [] };
    parentBudgetCategories = { INCOME: [], EXPENSES: [], SAVINGS: [], DEBT: [] };

    // Store display name mapping: compositeKey -> displayName
    window._budgetDisplayNames = {};

    for (const sec of sections) {
      const parentCatsSet = new Set();
      for (let r = sec.start; r <= sec.end && r < rows.length; r++) {
        const row = rows[r];
        if (!row || !row[1]) continue; // column D is now index 1
        const displayName = row[1].toString().trim();
        if (!displayName) continue;

        // Use composite key to avoid collisions across types
        const category = sec.type + ':' + displayName;
        window._budgetDisplayNames[category] = displayName;

        // Column C (index 0) is the parent/wider category
        const parentCat = (row[0] || '').toString().trim();
        if (parentCat) {
          categoryParentMap[category] = parentCat;
          parentCatsSet.add(parentCat);
        }

        budgetCategories[sec.type].push(category);
        if (!budgetData[category]) budgetData[category] = {};
        // Store sheet row: range starts at row 5, so sheet row = r + 5
        window._budgetCatRowMap[category] = r + 5;

        for (const [colIdx, info] of Object.entries(colMap)) {
          const val = row[parseInt(colIdx)];
          if (val !== undefined && val !== '' && val !== null) {
            const num = parseFloat(val.toString().replace(/[^0-9.\-]/g, ''));
            if (!isNaN(num) && num !== 0) {
              budgetData[category][info.key] = num;
            }
          }
        }
      }
      parentBudgetCategories[sec.type] = [...parentCatsSet];
    }
  }

  function processTransactions(rows) {
    allTransactions = [];
    if (rows.length > 0) console.log('Txn sample row:', JSON.stringify(rows[0]));
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (!row[0] || !row[1]) continue;
      // Amount is column F (index 4) — with UNFORMATTED_VALUE, this is a raw number
      const rawVal = row[4];
      const amount = typeof rawVal === 'number' ? rawVal : parseFloat((rawVal || '0').toString().replace(/[^0-9.\-]/g, ''));
      if (isNaN(amount) || amount === 0) continue;

      const type = (row[1] || '').toUpperCase().trim();
      // For EXPENSES: positive in sheet = refund (money back), negative = normal expense (money out)
      const isExpenseRefund = (type === 'EXPENSES' && amount > 0);
      allTransactions.push({
        date: normalizeDateStr(row[0]),
        type: type,
        category: row[2] || 'Uncategorized',
        account: row[3] || '--',
        amount: isExpenseRefund ? -Math.abs(amount) : Math.abs(amount),
        isRefund: isExpenseRefund,
        description: row[5] || '',
        sheetRow: i + 14, // TXN_RANGE starts at row 14, so row index i = sheet row i+14
        rawAmount: rawVal // preserve original sign for write-back
      });
    }
    // Sort by date descending
    allTransactions.sort((a, b) => parseTxnDate(b.date) - parseTxnDate(a.date));
  }

  const _parseDateCache = new Map();
  function parseTxnDate(dateStr) {
    if (!dateStr) return new Date(0);
    if (_parseDateCache.has(dateStr)) return _parseDateCache.get(dateStr);
    const parts = dateStr.toString().split('/');
    const d = parts.length === 3 ? new Date(parts[2], parts[1] - 1, parts[0]) : new Date(dateStr);
    _parseDateCache.set(dateStr, d);
    return d;
  }

  // Normalize date string to DD/MM/YYYY with leading zeros
  function normalizeDateStr(dateStr) {
    if (!dateStr) return '';
    const d = parseTxnDate(dateStr);
    if (isNaN(d.getTime())) return dateStr.toString();
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  function getMonthKey(dateStr) {
    const d = parseTxnDate(dateStr);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  }

  function getMonthLabel(key) {
    const [y, m] = key.split('-');
    const months = MONTH_NAMES;
    return `${months[parseInt(m) - 1]} ${y.slice(2)}`;
  }

  async function refreshDashboardData() {
    if (txnDemoMode) return; // Don't refresh in demo mode
    const btn = document.getElementById('txnRefreshBtn');
    btn.classList.add('spinning');
    try {
      await Promise.all([
        fetchTransactions(),
        fetchBudgetData().catch(e => console.warn('Budget fetch:', e))
      ]);
      renderTransactionsDashboard();
    } catch (e) {
      console.error('Refresh error:', e);
    }
    btn.classList.remove('spinning');
  }

  function renderTransactionsDashboard() {
    const txnUpdEl = document.getElementById('txnLastUpdated');
    if (txnUpdEl) txnUpdEl.textContent = 'Updated ' + new Date().toLocaleTimeString();
    // Set default tab indicator
    const dashInd = document.getElementById('dashTabIndicator');
    if (dashInd && !dashInd.textContent) dashInd.textContent = 'Overview';

    // Populate year dropdown
    const years = [...new Set(allTransactions.map(t => {
      const d = parseTxnDate(t.date);
      return d.getFullYear();
    }))].sort();

    const yearSelect = document.getElementById('txnYearSelect');
    const nowYear = new Date().getFullYear();
    const earliestYear = years.length > 0 ? Math.min(years[0], nowYear) : nowYear;
    const latestYear = years.length > 0 ? Math.max(years[years.length - 1], nowYear) : nowYear;
    let yearHTML = '<option value="all">All Years</option>';
    for (let y = earliestYear; y <= Math.max(latestYear, earliestYear + 10); y++) {
      yearHTML += `<option value="${y}" ${currentTxnYear == y ? 'selected' : ''}>${y}</option>`;
    }
    yearSelect.innerHTML = yearHTML;
    if (currentTxnYear !== 'all') yearSelect.value = currentTxnYear;

    // Restore period selection
    const periodSelect = document.getElementById('txnPeriodSelect');
    periodSelect.value = currentTxnPeriod;

    renderTxnSummary();
    renderTxnTable();

    requestAnimationFrame(() => requestAnimationFrame(() => {
      const activeTab = document.querySelector('#txnTabRow .tab.active');
      if (activeTab) moveTxnTabUnderline(activeTab);
      initTxnPills();
      syncTxnHeaderSpacer();
    }));

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          const activeTab = document.querySelector('#txnTabRow .tab.active');
          if (activeTab) moveTxnTabUnderline(activeTab);
          initTxnPills();
          syncTxnHeaderSpacer();
        }));
      });
    }

    syncTabPlacement();
  }

  function applyTxnFilters() {
    currentTxnYear = document.getElementById('txnYearSelect').value;
    currentTxnPeriod = document.getElementById('txnPeriodSelect').value;
    renderTxnSummary();
    renderTxnTable();
    // Re-render breakdown if visible
    if (!document.getElementById('txnBreakdownTab').classList.contains('hidden')) {
      renderBreakdown();
    }
    // Re-render summary/insights charts if visible
    if (!document.getElementById('txnSummaryTab').classList.contains('hidden')) {
      if (window.Chart) { renderInsightsPage(); renderTxnSummaryChart(); renderAllSectionPies(); }
    }
    // Re-render full tab if visible
    syncTxnHeaderSpacer();
  }

  function getFilteredTxns() {
    let txns = [...allTransactions];

    if (currentTxnYear !== 'all') {
      const y = parseInt(currentTxnYear);
      txns = txns.filter(t => parseTxnDate(t.date).getFullYear() === y);
    }

    if (currentTxnPeriod === 'ytd') {
      const now = new Date();
      const yr = currentTxnYear !== 'all' ? parseInt(currentTxnYear) : now.getFullYear();
      txns = txns.filter(t => {
        const d = parseTxnDate(t.date);
        return d.getFullYear() === yr && d <= now;
      });
    } else if (currentTxnPeriod !== 'all') {
      const m = parseInt(currentTxnPeriod);
      txns = txns.filter(t => parseTxnDate(t.date).getMonth() + 1 === m);
    }

    return txns;
  }

  function renderTxnSummary() {
    const txns = getFilteredTxns();
    const income = txns.filter(t => t.type === 'INCOME').reduce((s, t) => s + t.amount, 0);
    const expenses = txns.filter(t => t.type === 'EXPENSES').reduce((s, t) => s + t.amount, 0);
    const savings = txns.filter(t => t.type === 'SAVINGS').reduce((s, t) => s + t.amount, 0);
    const debt = txns.filter(t => t.type === 'DEBT').reduce((s, t) => s + t.amount, 0);
    const totalOut = expenses + savings + debt;
    const remaining = income - totalOut;
    const savingsRate = income > 0 ? (remaining / income * 100) : 0;
    // Store for tab re-renders
    window.lastHeroIncome = income;
    window.lastHeroTotalOut = totalOut;

    const sym = currentCurrency === 'USD' ? '$' : 'AED ';
    const convert = (v) => currentCurrency === 'USD' ? v / AED_USD_RATE : v;
    const fmtCompact = (v) => {
      const cv = convert(v);
      if (Math.abs(cv) >= 1000) return (cv / 1000).toFixed(1) + 'K';
      return cv.toFixed(0);
    };

    // Hero income currency label + value (number only, currency on separate line)
    const incomeCurrEl = document.getElementById('heroIncomeCurrency');
    if (incomeCurrEl) incomeCurrEl.textContent = currentCurrency === 'USD' ? 'USD' : 'AED';
    const incomeEl = document.getElementById('heroIncomeValue');
    if (incomeEl) {
      animateValue(incomeEl, convert(income), 1200, (v) => {
        if (Math.abs(v) >= 1000) return (v / 1000).toFixed(1) + 'K';
        return v.toFixed(0);
      });
    }

    // Hero legend
    const legendEl = document.getElementById('heroLegend');
    if (legendEl) {
      const legendItems = [
        { color: 'var(--red)', label: 'Expenses', val: expenses },
        { color: '#ff9f0a', label: 'Debt', val: debt },
        { color: '#0a84ff', label: 'Savings', val: savings },
      ];
      legendEl.innerHTML = legendItems.map(l => `
        <div class="hero-legend-row">
          <div class="hero-legend-dot" style="background:${l.color}"></div>
          <span class="hero-legend-label">${l.label}</span>
          <span class="hero-legend-amount">${fmtCompact(l.val)}</span>
        </div>
      `).join('');
    }

    // Hero donut
    renderHeroDonut(income, expenses, savings, debt, remaining);

    // Donut center — default shows Remaining
    const remValEl = document.getElementById('heroRemainingValue');
    if (remValEl) {
      animateValue(remValEl, convert(remaining), 1200, (v) => {
        if (Math.abs(v) >= 1000) return (v / 1000).toFixed(1) + 'K';
        return v.toFixed(0);
      });
      remValEl.style.color = remaining >= 0 ? 'var(--emerald)' : 'var(--red)';
    }
    const centerLabelEl = document.querySelector('.hero-center-label');
    if (centerLabelEl) centerLabelEl.textContent = 'Remaining';
    const remSubEl = document.getElementById('heroRemainingOfTotal');
    if (remSubEl) {
      remSubEl.textContent = 'of ' + fmtCompact(income);
    }

    // Savings rate pill
    const srEl = document.getElementById('heroSavingsRate');
    if (srEl) {
      animateValue(srEl, savingsRate, 1200, (v) => v.toFixed(1) + '%');
      srEl.style.color = savingsRate >= 0 ? 'var(--emerald)' : 'var(--red)';
    }

    // Total out pill
    const toEl = document.getElementById('heroTotalOut');
    if (toEl) {
      animateValue(toEl, convert(totalOut), 1200, (v) => {
        if (Math.abs(v) >= 1000) return sym + (v / 1000).toFixed(1) + 'K';
        return sym + v.toFixed(0);
      });
      toEl.style.color = '#ff9f0a';
    }

    // Total out breakdown sub — static label
    const obEl = document.getElementById('heroOutBreakdown');
    if (obEl) obEl.textContent = 'Exp + Sav + Debt';

    // Insight cards
    renderInsightCards(income, totalOut);
  }

  let _donutAbort = null;
  function renderHeroDonut(income, expenses, savings, debt, remaining) {
    const svg = document.getElementById('heroDonut');
    if (!svg) return;
    // Abort previous listeners to prevent accumulation
    if (_donutAbort) _donutAbort.abort();
    _donutAbort = new AbortController();
    const _sig = { signal: _donutAbort.signal };

    const size = 160;
    const cx = size / 2, cy = size / 2;
    const strokeWidth = 20;
    const r = (size - strokeWidth) / 2;
    const circ = 2 * Math.PI * r;
    const GAP = 3;

    // Segments: portions of income (or total outflows if overspent)
    const totalOut = expenses + savings + debt;
    const isOverspent = totalOut > income;
    const total = isOverspent ? Math.max(totalOut, 0.01) : Math.max(income, 0.01);
    const convert = (v) => currentCurrency === 'USD' ? v / AED_USD_RATE : v;
    const sym = currentCurrency === 'AED' ? 'AED ' : '$';
    const segments = [
      { val: expenses, label: 'Expenses', color: 'var(--red)', fallback: '#ff453a' },
      { val: debt, label: 'Debt', color: '#ff9f0a', fallback: '#ff9f0a' },
      { val: savings, label: 'Savings', color: '#0a84ff', fallback: '#0a84ff' },
      { val: Math.max(remaining, 0), label: 'Remaining', color: 'var(--glass-border)', fallback: document.documentElement.getAttribute('data-theme') === 'light' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.08)', isRemaining: true },
    ];

    // Build SVG
    let circles = '';
    let cumulative = 0;
    segments.forEach((seg, i) => {
      const pct = seg.val / total;
      const dash = Math.max(0, circ * pct - GAP);
      const offset = -(circ * cumulative);
      cumulative += pct;
      circles += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none"'
        + ' stroke="' + seg.fallback + '" stroke-width="' + strokeWidth + '"'
        + ' stroke-linecap="butt"'
        + ' stroke-dasharray="0 ' + circ + '"'
        + ' data-target-dash="' + dash + '"'
        + ' data-offset="' + offset + '"'
        + ' data-seg-index="' + i + '"'
        + ' style="cursor:pointer;transform:rotate(-90deg);transform-origin:center;transition:stroke-width 0.25s ease, stroke-dasharray 1.4s cubic-bezier(0.16,1,0.3,1) ' + (i * 0.07) + 's;" />';
    });

    svg.innerHTML = circles;

    // Interaction: hover (desktop) + tap (mobile) to select segment
    const centerLabel = document.querySelector('.hero-center-label');
    const centerValue = document.getElementById('heroRemainingValue');
    const centerSub = document.getElementById('heroRemainingOfTotal');
    const centerEl = document.querySelector('.hero-donut-center');

    // Default state: show Income
    const remColor = remaining >= 0 ? '#30d158' : '#ff453a';
    const defaultSeg = { label: 'Remaining', val: remaining, fallback: remColor };
    let activeIdx = -1; // -1 = default (income)

    function showSegment(seg) {
      if (centerLabel) centerLabel.textContent = seg.label;
      if (centerValue) {
        const v = convert(seg.val);
        centerValue.textContent = Math.abs(v) >= 1000 ? (v / 1000).toFixed(1) + 'K' : v.toFixed(0);
        centerValue.style.color = seg.isRemaining
          ? (document.documentElement.getAttribute('data-theme') === 'light' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)')
          : seg.fallback;
      }
      if (centerSub) {
        if (seg === defaultSeg) {
          const ci = convert(income);
          centerSub.textContent = 'of ' + (Math.abs(ci) >= 1000 ? (ci / 1000).toFixed(1) + 'K' : ci.toFixed(0));
        } else {
          const pctVal = ((seg.val / total) * 100).toFixed(1);
          centerSub.textContent = pctVal + '% of income';
        }
      }
    }

    function resetToDefault() {
      activeIdx = -1;
      svg.querySelectorAll('circle').forEach(c => { c.style.strokeWidth = strokeWidth; });
      showSegment(defaultSeg);
    }

    function selectSegment(idx) {
      // Reset all
      svg.querySelectorAll('circle').forEach(c => { c.style.strokeWidth = strokeWidth; });
      // Grow selected
      const circles = svg.querySelectorAll('circle');
      const isMobile = 'ontouchstart' in window;
      if (circles[idx]) circles[idx].style.strokeWidth = strokeWidth + (isMobile ? 10 : 6);
      activeIdx = idx;
      showSegment(segments[idx]);
    }

    // Show default on load
    showSegment(defaultSeg);

    // Build segment angle ranges for hit-testing
    const segAngles = [];
    let angleCum = 0;
    segments.forEach((seg, i) => {
      const pct = seg.val / total;
      const startAngle = angleCum * 360;
      angleCum += pct;
      const endAngle = angleCum * 360;
      segAngles.push({ start: startAngle, end: endAngle, idx: i });
    });

    function getSegmentAtPoint(clientX, clientY) {
      const rect = svg.getBoundingClientRect();
      const svgCx = rect.left + rect.width / 2;
      const svgCy = rect.top + rect.height / 2;
      const dx = clientX - svgCx;
      const dy = clientY - svgCy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const outerR = rect.width / 2;
      const innerR = outerR * 0.5; // approximate donut hole
      if (dist < innerR || dist > outerR + 10) return -1; // outside donut ring
      // Angle from top (12 o'clock), clockwise
      let angle = Math.atan2(dx, -dy) * (180 / Math.PI);
      if (angle < 0) angle += 360;
      for (const sa of segAngles) {
        if (angle >= sa.start && angle < sa.end) return sa.idx;
      }
      return -1;
    }

    // Desktop hover
    svg.querySelectorAll('circle').forEach(c => {
      c.addEventListener('mouseenter', () => {
        const idx = parseInt(c.getAttribute('data-seg-index'));
        selectSegment(idx);
      }, _sig);
      c.addEventListener('mouseleave', () => {
        resetToDefault();
      }, _sig);
    });

    // Mobile: touch-and-drag interaction
    let touching = false;
    svg.addEventListener('touchstart', (e) => {
      e.preventDefault();
      touching = true;
      const t = e.touches[0];
      const idx = getSegmentAtPoint(t.clientX, t.clientY);
      if (idx >= 0) selectSegment(idx);
    }, { passive: false, signal: _donutAbort.signal });

    svg.addEventListener('touchmove', (e) => {
      if (!touching) return;
      e.preventDefault();
      const t = e.touches[0];
      const idx = getSegmentAtPoint(t.clientX, t.clientY);
      if (idx >= 0 && idx !== activeIdx) selectSegment(idx);
    }, { passive: false, signal: _donutAbort.signal });

    svg.addEventListener('touchend', () => {
      touching = false;
      resetToDefault();
    }, _sig);

    // Center tap detection — handled via SVG events, not overlay
    // The overlay stays pointer-events:none so SVG circles receive events
    function isCenterHit(clientX, clientY) {
      const rect = svg.getBoundingClientRect();
      const svgCx = rect.left + rect.width / 2;
      const svgCy = rect.top + rect.height / 2;
      const dx = clientX - svgCx;
      const dy = clientY - svgCy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const innerR = rect.width / 2 * 0.5;
      return dist < innerR;
    }

    svg.addEventListener('click', (e) => {
      if (isCenterHit(e.clientX, e.clientY)) {
        resetToDefault();
      }
    }, _sig);

    // Animate after a tick
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        svg.querySelectorAll('circle').forEach(c => {
          const dash = c.getAttribute('data-target-dash');
          const offset = c.getAttribute('data-offset');
          c.style.strokeDashoffset = offset;
          c.setAttribute('stroke-dasharray', dash + ' ' + circ);
        });
      });
    });
  }

  // ── Insight Cards: dynamically rendered based on filter state ──
  // State 1: Specific month → Month Progress bars + 6-month trailing sparkline
  // State 2: All Year → Year Progress (months elapsed) + 12-month sparkline with prev year overlay
  // State 3: YTD → YTD Progress (Jan → current month) + YTD sparkline
  // State 4: All Years → Year-over-Year bar chart + multi-year sparkline

  // Generate tick-bar HTML: totalTicks vertical bars, fillPct% colored
  function tickBarHTML(fillPct, color, totalTicks = 60, delay = 0) {
    const filled = Math.round((Math.min(fillPct, 100) / 100) * totalTicks);
    let html = `<div class="tick-bar" data-fill-count="${filled}" data-color="${color}" data-delay="${delay}">`;
    for (let i = 0; i < totalTicks; i++) {
      html += `<div class="tick"></div>`;
    }
    html += '</div>';
    return html;
  }

  // Animate tick bars: fill ticks one-by-one with color
  function animateTickBars(container) {
    container.querySelectorAll('.tick-bar').forEach(bar => {
      const count = parseInt(bar.dataset.fillCount || '0');
      const color = bar.dataset.color || 'var(--emerald)';
      const delay = parseInt(bar.dataset.delay || '0');
      const ticks = bar.querySelectorAll('.tick');
      ticks.forEach((t, i) => {
        if (i < count) {
          setTimeout(() => { t.style.background = color; t.classList.add('filled'); }, delay + i * 8);
        }
      });
    });
  }

  function renderInsightCards(income, totalOut) {
    const container = document.getElementById('insightCardsRow');
    if (!container) return;

    const now = new Date();
    const selYear = currentTxnYear !== 'all' ? parseInt(currentTxnYear) : now.getFullYear();
    const selPeriod = currentTxnPeriod;
    const isAllYears = currentTxnYear === 'all';

    // Currency helpers
    const sym = currentCurrency === 'USD' ? '$' : 'AED ';
    const convert = (v) => currentCurrency === 'USD' ? v / AED_USD_RATE : v;
    const fmtK = (v) => {
      const abs = Math.abs(v);
      const sign = v < 0 ? '-' : '';
      return sign + (abs >= 1000 ? (abs / 1000).toFixed(1) + 'K' : abs.toFixed(0));
    };

    // ── Build per-month data from transactions ──
    const monthMap = {};
    allTransactions.forEach(t => {
      const key = getMonthKey(t.date);
      if (!monthMap[key]) monthMap[key] = { income: 0, expenses: 0, savings: 0, debt: 0 };
      // Use t.amount directly — refunds are already negative, normal txns are positive
      if (t.type === 'INCOME') monthMap[key].income += t.amount;
      else if (t.type === 'EXPENSES') monthMap[key].expenses += t.amount;
      else if (t.type === 'SAVINGS') monthMap[key].savings += t.amount;
      else if (t.type === 'DEBT') monthMap[key].debt += t.amount;
    });
    const sortedKeys = Object.keys(monthMap).sort();
    const getSavings = (key) => {
      const m = monthMap[key];
      if (!m) return 0;
      return m.income - (m.expenses + m.savings + m.debt);
    };

    // ── Determine filter state ──
    let state;
    if (isAllYears) state = 4;
    else if (selPeriod === 'ytd') state = 3;
    else if (selPeriod === 'all') state = 2;
    else state = 1;

    // ── Card 1: Budget Progress — all bars normalized to % of budget, unified pace line ──
    let progressHTML = '';

    const filteredTxns = getFilteredTxns();
    const viewFilter = document.getElementById('txnViewSelect') ? document.getElementById('txnViewSelect').value : 'tracked';
    const isDk = document.body.classList.contains('dark');

    const typeConfigs = [
      { type: 'INCOME',   label: 'Income',   color: '#30d158', wantAhead: true  },
      { type: 'EXPENSES', label: 'Expenses', color: '#ff453a', wantAhead: false },
      { type: 'SAVINGS',  label: 'Savings',  color: '#0a84ff', wantAhead: true  },
      { type: 'DEBT',     label: 'Debt',     color: '#ff9f0a', wantAhead: false },
    ];

    // Build tracked + budget totals per type
    const typeTotals = {};
    typeConfigs.forEach(cfg => {
      const tracked = filteredTxns.filter(t => t.type === cfg.type).reduce((s, t) => s + t.amount, 0);
      const cats = budgetCategories[cfg.type] || [];
      let budget = 0;
      if (budgetDataLoaded) {
        cats.forEach(cat => { budget += getCategoryBudget(cat); });
      }
      typeTotals[cfg.type] = { tracked, budget };
    });

    // Filter types based on view mode
    let visibleTypes = typeConfigs;
    if (viewFilter === 'budget') {
      visibleTypes = typeConfigs.filter(cfg => typeTotals[cfg.type].budget > 0);
    } else if (viewFilter === 'tracked') {
      visibleTypes = typeConfigs.filter(cfg => typeTotals[cfg.type].tracked > 0);
    } else if (viewFilter === 'bt') {
      visibleTypes = typeConfigs.filter(cfg => typeTotals[cfg.type].tracked > 0 || typeTotals[cfg.type].budget > 0);
    }

    // ── Compute pace percentage (how far through the period) ──
    let pacePct = 0;
    let timeSubLabel = '';
    if (state === 1) {
      const selMonth = parseInt(selPeriod);
      const daysInMonth = new Date(selYear, selMonth, 0).getDate();
      const isCurrentMonth = (selYear === now.getFullYear() && selMonth === now.getMonth() + 1);
      const isPastMonth = (selYear < now.getFullYear()) || (selYear === now.getFullYear() && selMonth < now.getMonth() + 1);
      const day = isCurrentMonth ? now.getDate() : (isPastMonth ? daysInMonth : 0);
      pacePct = (day / daysInMonth) * 100;
      timeSubLabel = `Day ${day} of ${daysInMonth}`;
    } else if (state === 3) {
      const monthNames = MONTH_NAMES;
      const currentMonth = selYear === now.getFullYear() ? now.getMonth() + 1 : 12;
      pacePct = (currentMonth / 12) * 100;
      timeSubLabel = `Jan → ${monthNames[currentMonth - 1]}`;
    } else if (state === 2) {
      const isCurrentYear = selYear === now.getFullYear();
      const isPastYear = selYear < now.getFullYear();
      const monthsElapsed = isCurrentYear ? now.getMonth() + 1 : (isPastYear ? 12 : 0);
      pacePct = (monthsElapsed / 12) * 100;
      timeSubLabel = `Month ${monthsElapsed} of 12`;
    } else {
      pacePct = 100; // all time — no pace concept
      timeSubLabel = '';
    }

    // ── Overall status from Income + Expenses vs pace ──
    const incT = typeTotals['INCOME'], expT = typeTotals['EXPENSES'];
    const incPctOfBudget = incT.budget > 0 ? (incT.tracked / incT.budget) * 100 : 100;
    const expPctOfBudget = expT.budget > 0 ? (expT.tracked / expT.budget) * 100 : 0;
    // Income: good if ahead of pace. Expenses: good if behind pace.
    const incGood = incPctOfBudget >= pacePct;
    const expGood = expPctOfBudget <= pacePct;
    let statusText, statusColor;
    if (incGood && expGood) { statusText = 'On track'; statusColor = '#30d158'; }
    else if (!incGood && expGood) { statusText = 'Income behind'; statusColor = '#ff9f0a'; }
    else if (incGood && !expGood) { statusText = 'Watch spending'; statusColor = '#ff9f0a'; }
    else { statusText = 'Over budget pace'; statusColor = '#ff453a'; }
    // Edge: if past period, just show summary
    if (pacePct >= 100) {
      const net = incT.tracked - expT.tracked;
      statusText = net >= 0 ? 'Period complete' : 'Over budget';
      statusColor = net >= 0 ? '#30d158' : '#ff453a';
    }

    // ── Build bars — all normalized to 0–100% of budget ──
    let barsHTML = visibleTypes.map((cfg, i) => {
      const t = typeTotals[cfg.type];
      const tracked = convert(t.tracked);
      const budget = convert(t.budget);
      const pctOfBudget = budget > 0 ? (tracked / budget) * 100 : (tracked > 0 ? 100 : 0);
      const fillPct = Math.min(pctOfBudget, 100);
      const isOver = pctOfBudget > 100 && budget > 0;
      const pctLabel = budget > 0 ? pctOfBudget.toFixed(0) : (tracked > 0 ? '∞' : '0');

      // Pace-aware coloring for the percentage chip
      // Income/Savings: want pctOfBudget >= pacePct (ahead is good)
      // Expenses/Debt: want pctOfBudget <= pacePct (behind is good)
      let chipOk;
      if (cfg.wantAhead) {
        chipOk = pctOfBudget >= pacePct;
      } else {
        chipOk = pctOfBudget <= pacePct;
      }
      const chipColor = (budget <= 0) ? 'var(--text-3)' : (chipOk ? cfg.color : '#ff453a');

      return `
        <div class="insight-bar-group" style="margin-bottom:${i < visibleTypes.length - 1 ? '10' : '0'}px">
          <div class="insight-bar-label-row">
            <span class="insight-bar-label" style="color:${cfg.color}">${cfg.label}</span>
            <span class="insight-bar-pct">${sym}${fmtK(tracked)} / ${budget > 0 ? sym + fmtK(budget) : '--'} <span style="color:${chipColor};font-weight:700">${pctLabel}%</span></span>
          </div>
          ${tickBarHTML(fillPct, cfg.color, 60, i * 80)}
        </div>`;
    }).join('');

    const paceLegendHTML = '';

    progressHTML = `
      <div class="insight-card" id="progressCard">
        <div class="insight-card-header">
          <div>
            <div class="insight-card-label">Budget Progress</div>
            <div class="insight-card-status" style="color:${statusColor}">${statusText}</div>
          </div>
          ${timeSubLabel ? `<div class="insight-card-right-label">${timeSubLabel}</div>` : ''}
        </div>
        <div>
          ${barsHTML}
        </div>
        ${paceLegendHTML}
      </div>`;

    // ── Card 2: Sparkline Card ──
    let months = [];
    let prevYearMonths = [];
    let headlineValue = 0;
    let comparisonValue = null;
    let cardLabel = 'Monthly Savings';

    if (state === 1) {
      // Specific month: trailing 6 months
      const selectedKey = `${selYear}-${String(parseInt(selPeriod)).padStart(2, '0')}`;
      if (sortedKeys.includes(selectedKey)) {
        const idx = sortedKeys.indexOf(selectedKey);
        const start = Math.max(0, idx - 5);
        months = sortedKeys.slice(start, idx + 1).map(k => ({ label: getMonthLabel(k), val: getSavings(k), key: k }));
      }
      headlineValue = getSavings(selectedKey);
      const prevMonth = parseInt(selPeriod) - 1;
      if (prevMonth >= 1) {
        const prevKey = `${selYear}-${String(prevMonth).padStart(2, '0')}`;
        if (monthMap[prevKey]) comparisonValue = getSavings(prevKey);
      } else {
        const prevKey = `${selYear - 1}-12`;
        if (monthMap[prevKey]) comparisonValue = getSavings(prevKey);
      }

    } else if (state === 3) {
      // YTD: Jan → current month of selected year
      const currentMonth = selYear === now.getFullYear() ? now.getMonth() + 1 : 12;
      const yearKeys = [];
      for (let m = 1; m <= currentMonth; m++) {
        yearKeys.push(`${selYear}-${String(m).padStart(2, '0')}`);
      }
      months = yearKeys.filter(k => monthMap[k]).map(k => ({ label: getMonthLabel(k), val: getSavings(k), key: k }));
      headlineValue = months.reduce((s, m) => s + m.val, 0);
      cardLabel = 'YTD Savings';
      const prevYearKeys = yearKeys.map(k => `${selYear - 1}-${k.split('-')[1]}`);
      const prevYearTotal = prevYearKeys.reduce((s, k) => s + getSavings(k), 0);
      if (prevYearKeys.some(k => monthMap[k])) comparisonValue = prevYearTotal;

    } else if (state === 4) {
      // All Years: last 12 months
      const allKeys = sortedKeys.slice(-12);
      months = allKeys.map(k => ({ label: getMonthLabel(k), val: getSavings(k), key: k }));
      headlineValue = months.reduce((s, m) => s + m.val, 0);
      cardLabel = 'All Time Savings';

    } else {
      // All Year: Jan-Dec with prev year overlay
      const monthNames = MONTH_NAMES;
      const yearKeys = [];
      const prevKeys = [];
      for (let m = 1; m <= 12; m++) {
        yearKeys.push(`${selYear}-${String(m).padStart(2, '0')}`);
        prevKeys.push(`${selYear - 1}-${String(m).padStart(2, '0')}`);
      }
      months = yearKeys.filter(k => monthMap[k]).map(k => {
        const mIdx = parseInt(k.split('-')[1]) - 1;
        return { label: monthNames[mIdx], val: getSavings(k), key: k };
      });
      const hasPrevData = prevKeys.some(k => monthMap[k]);
      if (hasPrevData) {
        prevYearMonths = yearKeys.map((k, i) => {
          const pk = prevKeys[i];
          const mIdx = parseInt(k.split('-')[1]) - 1;
          return { label: monthNames[mIdx], val: monthMap[pk] ? getSavings(pk) : null, key: pk };
        }).filter(m => m.val !== null);
      }
      headlineValue = months.reduce((s, m) => s + m.val, 0);
      cardLabel = `${selYear} Savings`;
      if (hasPrevData) {
        comparisonValue = prevKeys.reduce((s, k) => s + getSavings(k), 0);
      }
    }

    // Sparkline colors
    const isPositive = headlineValue >= 0;
    const changePct = (comparisonValue !== null && Math.abs(comparisonValue) > 0)
      ? ((headlineValue - comparisonValue) / Math.abs(comparisonValue)) * 100 : null;
    const isUp = changePct === null ? isPositive : changePct >= 0;
    const lineColor = isPositive ? '#30d158' : '#ff453a';

    let changeHTML = '';
    if (changePct !== null) {
      const bg = isUp ? 'rgba(48,209,88,0.12)' : 'rgba(255,69,58,0.12)';
      changeHTML = `<div class="insight-card-change" style="color:${lineColor};background:${bg}">${isUp ? '▲' : '▼'} ${Math.abs(changePct).toFixed(1)}%</div>`;
    } else {
      changeHTML = `<div class="insight-card-change" style="color:var(--text-3);background:transparent">--</div>`;
    }

    const sparklineHTML = `
      <div class="insight-card" id="sparklineCard">
        <div class="insight-card-header">
          <div>
            <div class="insight-card-label">${cardLabel}</div>
            <div class="insight-card-value" id="sparklineValue">${months.length > 0 ? sym + '0' : '--'}</div>
          </div>
          <div style="text-align:right">
            ${changeHTML}
          </div>
        </div>
        <div class="sparkline-wrap">
          <svg id="sparklineSvg" viewBox="0 0 300 100" preserveAspectRatio="none"></svg>
          <div id="sparklineDots" class="sparkline-dots-overlay"></div>
          <div id="sparklineTooltip" class="sparkline-tooltip"></div>
        </div>
        <div class="sparkline-labels" id="sparklineLabels"></div>
      </div>`;

    // ── Inject HTML ──
    container.innerHTML = progressHTML + sparklineHTML;

    // ── Animate progress bars (after DOM is in place) ──
    const animateBars = () => {
      const card = document.getElementById('progressCard');
      if (!card) return;
      // Animate tick bars
      animateTickBars(card);
      // Animate pace line (legacy, kept for compatibility)
      card.querySelectorAll('.insight-pace-line[data-target-left]').forEach(line => {
        line.style.left = line.getAttribute('data-target-left');
      });
    };

    // ── Draw sparkline SVG ──
    const drawSparkline = () => {
      const svg = document.getElementById('sparklineSvg');
      const labelsEl = document.getElementById('sparklineLabels');
      if (!svg) return;

      if (labelsEl) labelsEl.innerHTML = months.map(m => `<span>${m.label}</span>`).join('');

      if (months.length === 0) {
        svg.innerHTML = '';
        return;
      }
      if (months.length < 2) {
        svg.innerHTML = `<circle cx="150" cy="50" r="5" fill="${lineColor}"/>`;
        return;
      }

      const W = 300, H = 100;
      const padX = 10, padY = 12;
      const vals = months.map(m => m.val);
      const prevVals = prevYearMonths.map(m => m.val);
      const allVals = [...vals, ...prevVals];
      const minV = Math.min(...allVals) * (Math.min(...allVals) < 0 ? 1.1 : 0.9);
      const maxV = Math.max(...allVals) * 1.05;
      const range = maxV - minV || 1;

      function buildPath(pts) {
        let p = `M ${pts[0].x} ${pts[0].y}`;
        for (let i = 1; i < pts.length; i++) {
          const p0 = pts[i - 1], p1 = pts[i];
          const dx = (p1.x - p0.x) * 0.3;
          p += ` C ${p0.x + dx} ${p0.y}, ${p1.x - dx} ${p1.y}, ${p1.x} ${p1.y}`;
        }
        return p;
      }

      const points = vals.map((v, i) => ({
        x: padX + (i / (vals.length - 1)) * (W - 2 * padX),
        y: padY + (1 - (v - minV) / range) * (H - 2 * padY),
      }));
      const d = buildPath(points);
      const lastPt = points[points.length - 1];
      const firstPt = points[0];
      const areaD = d + ` L ${lastPt.x} ${H} L ${firstPt.x} ${H} Z`;

      let prevLineSvg = '';
      if (prevVals.length >= 2) {
        const prevPoints = prevVals.map((v, i) => ({
          x: padX + (i / (prevVals.length - 1)) * (W - 2 * padX),
          y: padY + (1 - (v - minV) / range) * (H - 2 * padY),
        }));
        const prevD = buildPath(prevPoints);
        const prevLastPt = prevPoints[prevPoints.length - 1];
        prevLineSvg = `
          <path d="${prevD}" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="4 3" clip-path="url(#sparkClip)"/>
          <circle cx="${prevLastPt.x}" cy="${prevLastPt.y}" r="2.5" fill="rgba(255,255,255,0.25)" clip-path="url(#sparkClip)"/>
        `;
      }

      // Measure the path length for stroke-dasharray draw animation
      // We'll use a temporary path to get the length
      const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      tempSvg.style.position = 'absolute'; tempSvg.style.visibility = 'hidden';
      document.body.appendChild(tempSvg);
      const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      tempPath.setAttribute('d', d);
      tempSvg.appendChild(tempPath);
      const pathLen = Math.ceil(tempPath.getTotalLength()) + 1;
      document.body.removeChild(tempSvg);

      // Previous year overlay (no draw animation, just appears with fade)
      let prevSvgStr = '';
      if (prevVals.length >= 2) {
        const prevPoints2 = prevVals.map((v, i) => ({
          x: padX + (i / (prevVals.length - 1)) * (W - 2 * padX),
          y: padY + (1 - (v - minV) / range) * (H - 2 * padY),
        }));
        const prevD2 = buildPath(prevPoints2);
        const prevLastPt2 = prevPoints2[prevPoints2.length - 1];
        prevSvgStr = `
          <path d="${prevD2}" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="4 3" style="animation:sparkAreaIn 0.8s ease forwards;"/>
        `;
      }

      // Line SVG (stretched, preserveAspectRatio="none")
      svg.innerHTML = `
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${lineColor}" stop-opacity="0.18"/>
            <stop offset="100%" stop-color="${lineColor}" stop-opacity="0"/>
          </linearGradient>
        </defs>
        ${prevSvgStr}
        <path d="${areaD}" fill="url(#sparkGrad)" style="animation:sparkAreaIn 1s ease 0.6s forwards;opacity:0"/>
        <path d="${d}" fill="none" stroke="${lineColor}" stroke-width="2.5" stroke-linecap="round"
          stroke-dasharray="${pathLen}" stroke-dashoffset="${pathLen}"
          style="animation:sparkDraw 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;"/>
      `;

      // Dots overlay — HTML divs positioned with % so they're always perfect circles
      const dotsContainer = document.getElementById('sparklineDots');
      const tooltip = document.getElementById('sparklineTooltip');
      if (dotsContainer) {
        dotsContainer.innerHTML = points.map((pt, i) => {
          const isLast = i === points.length - 1;
          const size = isLast ? 10 : 6;
          const xPct = (pt.x / W) * 100;
          const yPct = (pt.y / H) * 100;
          return `<div class="spark-dot-el" data-idx="${i}"
            style="left:${xPct}%;top:${yPct}%;width:${size}px;height:${size}px;background:${lineColor};box-shadow:0 0 6px ${lineColor}55"></div>`;
        }).join('');

        // Staggered appear after line draws
        dotsContainer.querySelectorAll('.spark-dot-el').forEach((dot, i) => {
          const delay = 1000 + i * 60;
          setTimeout(() => dot.classList.add('visible'), delay);
        });

        // Hover interaction — show tooltip with amount
        dotsContainer.querySelectorAll('.spark-dot-el').forEach(dot => {
          const idx = parseInt(dot.getAttribute('data-idx'));
          const m = months[idx];
          const cv = convert(m.val);
          const formatted = sym + (Math.abs(cv) >= 1000 ? (cv / 1000).toFixed(1) + 'K' : cv.toFixed(0));

          const showTip = () => {
            if (!tooltip) return;
            tooltip.textContent = m.label + ': ' + formatted;
            tooltip.classList.add('visible');
            tooltip.style.left = dot.style.left;
            tooltip.style.top = dot.style.top;
          };
          const hideTip = () => {
            if (!tooltip) return;
            tooltip.classList.remove('visible');
          };

          dot.addEventListener('mouseenter', showTip);
          dot.addEventListener('mouseleave', hideTip);
        });

        // Touch-and-drag on sparkline dots
        let sparkTouching = false;
        dotsContainer.addEventListener('touchstart', (e) => {
          e.preventDefault();
          sparkTouching = true;
          const el = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
          if (el && el.classList.contains('spark-dot-el')) {
            const idx = parseInt(el.getAttribute('data-idx'));
            const m = months[idx];
            const cv = convert(m.val);
            const formatted = sym + (Math.abs(cv) >= 1000 ? (cv / 1000).toFixed(1) + 'K' : cv.toFixed(0));
            tooltip.textContent = m.label + ': ' + formatted;
            tooltip.classList.add('visible');
            tooltip.style.left = el.style.left;
            tooltip.style.top = el.style.top;
          }
        }, { passive: false });
        dotsContainer.addEventListener('touchmove', (e) => {
          if (!sparkTouching) return;
          e.preventDefault();
          const el = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
          if (el && el.classList.contains('spark-dot-el')) {
            const idx = parseInt(el.getAttribute('data-idx'));
            const m = months[idx];
            const cv = convert(m.val);
            const formatted = sym + (Math.abs(cv) >= 1000 ? (cv / 1000).toFixed(1) + 'K' : cv.toFixed(0));
            tooltip.textContent = m.label + ': ' + formatted;
            tooltip.classList.add('visible');
            tooltip.style.left = el.style.left;
            tooltip.style.top = el.style.top;
          }
        }, { passive: false });
        dotsContainer.addEventListener('touchend', () => {
          sparkTouching = false;
          if (tooltip) tooltip.classList.remove('visible');
        });
      }
    };

    // Trigger animations after DOM paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        animateBars();
        drawSparkline();

        // Animate the headline number (count-up like monthly income)
        if (months.length > 0) {
          const sparkValEl = document.getElementById('sparklineValue');
          if (sparkValEl) {
            animateValue(sparkValEl, convert(headlineValue), 1200, (v) => {
              if (Math.abs(v) >= 1000) return sym + (v < 0 ? '-' : '') + (Math.abs(v) / 1000).toFixed(1) + 'K';
              return sym + (v < 0 ? '-' : '') + Math.abs(v).toFixed(0);
            });
          }
        }
      });
    });
  }

  function renderTxnCategoryBreakdown() {
    const txns = getFilteredTxns().filter(t => t.type === 'EXPENSES');
    const catMap = {};
    txns.forEach(t => {
      catMap[t.category] = (catMap[t.category] || 0) + t.amount;
    });

    const total = Object.values(catMap).reduce((s, v) => s + v, 0);
    const sorted = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
    const container = document.getElementById('txnCategoryBreakdown');
    const sym = currentCurrency === 'USD' ? '$' : 'AED ';
    const convert = (v) => currentCurrency === 'USD' ? v / AED_USD_RATE : v;

    if (sorted.length === 0) {
      container.innerHTML = '<p style="color:var(--text-2);text-align:center;padding:32px 0;font-size:14px;">No expense data</p>';
      return;
    }

    container.innerHTML = sorted.map(([cat, val], i) => {
      const pct = total > 0 ? (val / total * 100) : 0;
      const converted = convert(val);
      return `
        <div class="alloc-row">
          <div class="alloc-header">
            <span class="alloc-name">${cat}</span>
            <span class="alloc-pct">${pct.toFixed(1)}%</span>
          </div>
          <div class="alloc-bar-bg">
            <div class="alloc-bar" style="width: ${pct}%; background: ${COLORS[i % COLORS.length]}"></div>
          </div>
          <div class="alloc-val">${sym}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
      `;
    }).join('');
  }

  function renderTxnTable() {
    const container = document.getElementById('txnListContainer');
    let txns = getFilteredTxns();

    if (currentTxnTypeFilter !== 'all') {
      txns = txns.filter(t => t.type === currentTxnTypeFilter);
    }

    // Search filter
    const searchVal = (document.getElementById('txnSearchInput') || {}).value || '';
    if (searchVal.trim()) {
      const q = searchVal.toLowerCase().trim();
      txns = txns.filter(t =>
        t.category.toLowerCase().includes(q) ||
        (t.description || '').toLowerCase().includes(q) ||
        t.type.toLowerCase().includes(q) ||
        (t.account || '').toLowerCase().includes(q)
      );
    }

    // Calendar date filter
    if (currentCalDate) {
      const calD = parseTxnDate(currentCalDate);
      const calTime = calD.getFullYear() * 10000 + calD.getMonth() * 100 + calD.getDate();
      txns = txns.filter(t => {
        const td = parseTxnDate(t.date);
        return td.getFullYear() * 10000 + td.getMonth() * 100 + td.getDate() === calTime;
      });
    }

    // Sort by date descending (newest first)
    txns.sort((a, b) => parseTxnDate(b.date) - parseTxnDate(a.date));

    displayedTxns = txns;

    if (txns.length === 0) {
      container.innerHTML = '<div class="txn-list-empty">No transactions found</div>';
      return;
    }

    const sym = currentCurrency === 'USD' ? '$' : 'AED ';
    const convert = (v) => currentCurrency === 'USD' ? v / AED_USD_RATE : v;

    const _isDk = htmlEl.getAttribute('data-theme') !== 'light';
    const typeColors = {
      'EXPENSES': _isDk ? '#ff453a' : '#d63031',
      'INCOME': _isDk ? '#30d158' : '#22863a',
      'TRANSFER': _isDk ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
      'DEBT': _isDk ? '#ff9f0a' : '#b08020',
      'SAVINGS': _isDk ? '#0a84ff' : '#3b82f6'
    };
    const amtColors = {
      'EXPENSES': 'var(--red)',
      'INCOME': 'var(--emerald)',
      'TRANSFER': 'var(--text-2)',
      'DEBT': '#ff9f0a',
      'SAVINGS': '#0a84ff'
    };

    // Group by date
    const groups = [];
    let currentDate = '';
    txns.forEach((t, idx) => {
      if (t.date !== currentDate) {
        currentDate = t.date;
        groups.push({ date: t.date, items: [] });
      }
      groups[groups.length - 1].items.push({ txn: t, idx });
    });

    // Format date label
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const fmtDateLabel = (dateStr) => {
      const d = parseTxnDate(dateStr);
      if (d.toDateString() === today.toDateString()) return 'Today';
      if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
      const months = MONTH_NAMES;
      return months[d.getMonth()] + ' ' + d.getDate();
    };

    const fmtAmt = (v) => {
      const cv = convert(v);
      const abs = Math.abs(cv);
      return sym + abs.toLocaleString('en-US', { minimumFractionDigits: abs >= 1000 ? 0 : 2, maximumFractionDigits: 2 });
    };

    let html = '';
    groups.forEach(group => {
      // Daily net total
      const dayNet = group.items.reduce((sum, { txn }) => {
        if (txn.type === 'INCOME') return sum + txn.amount;
        if (txn.type === 'EXPENSES') return txn.isRefund ? sum + Math.abs(txn.amount) : sum - txn.amount;
        return sum;
      }, 0);
      const dayNetStr = dayNet >= 0 ? '+' + fmtAmt(dayNet) : '-' + fmtAmt(Math.abs(dayNet));

      html += '<div class="txn-date-group">';
      html += `<div class="txn-date-header">
        <span class="txn-date-label">${fmtDateLabel(group.date)}</span>
        <span class="txn-date-total">${group.items.length} transaction${group.items.length > 1 ? 's' : ''}</span>
      </div>`;
      html += '<div class="txn-date-items">';

      group.items.forEach(({ txn, idx }) => {
        const dotColor = typeColors[txn.type] || 'rgba(255,255,255,0.2)';
        const amtColor = txn.isRefund ? 'var(--emerald)' : (amtColors[txn.type] || 'var(--text-1)');
        const cv = convert(Math.abs(txn.amount));
        const isLarge = cv >= 1000;
        const prefix = txn.isRefund ? '+' : (txn.type === 'INCOME' ? '+' : txn.type === 'EXPENSES' ? '-' : '');
        const amtStr = prefix + fmtAmt(txn.amount);
        const desc = txn.description || txn.account || txn.type.charAt(0) + txn.type.slice(1).toLowerCase();

        html += `<div class="txn-list-row" onclick="openTxnDetail(${idx})">
          <div class="txn-list-dot" style="background:${dotColor}"></div>
          <div class="txn-list-info">
            <div class="txn-list-category">${escapeHTML(txn.category)}</div>
            <div class="txn-list-desc">${escapeHTML(desc)}</div>
          </div>
          <div class="txn-list-amount ${isLarge ? 'large' : ''}" style="color:${amtColor}">${amtStr}</div>
        </div>`;
      });

      html += '</div></div>';
    });

    container.innerHTML = html;

    // Animate groups in
    container.querySelectorAll('.txn-date-group').forEach((group, i) => {
      group.style.opacity = '0';
      group.style.transform = 'translateY(12px)';
      group.style.transition = 'opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)';
      group.style.transitionDelay = (i * 0.04) + 's';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          group.style.opacity = '1';
          group.style.transform = 'translateY(0)';
        });
      });
    });
  }

  function filterTxnSearch() {
    renderTxnTable();
  }

  // ── Calendar Date Picker ──
  let currentCalDate = null; // DD/MM/YYYY string or null
  let calViewYear = new Date().getFullYear();
  let calViewMonth = new Date().getMonth(); // 0-indexed

  function toggleCalendar() {
    const popup = document.getElementById('txnCalPopup');
    if (popup.classList.contains('open')) {
      popup.classList.remove('open');
      return;
    }
    // Default to currently selected year/month from filters
    const selYear = currentTxnYear !== 'all' ? parseInt(currentTxnYear) : new Date().getFullYear();
    const selPeriod = currentTxnPeriod;
    calViewYear = selYear;
    calViewMonth = (selPeriod !== 'all' && selPeriod !== 'ytd') ? parseInt(selPeriod) - 1 : new Date().getMonth();
    renderCalendar();
    popup.classList.add('open');

    // Close on outside click, touch, or scroll
    setTimeout(() => {
      document.addEventListener('click', closeCalOnOutside);
      document.addEventListener('touchstart', closeCalOnTouch, { passive: true });
      window.addEventListener('scroll', closeCalOnScroll, { passive: true });
    }, 10);
  }

  function closeCal() {
    document.getElementById('txnCalPopup').classList.remove('open');
    document.removeEventListener('click', closeCalOnOutside);
    document.removeEventListener('touchstart', closeCalOnTouch);
    window.removeEventListener('scroll', closeCalOnScroll);
  }

  function closeCalOnOutside(e) {
    const wrap = document.getElementById('filterTxnCal');
    if (wrap && !wrap.contains(e.target)) closeCal();
  }

  function closeCalOnTouch(e) {
    const wrap = document.getElementById('filterTxnCal');
    if (wrap && !wrap.contains(e.target)) closeCal();
  }

  function closeCalOnScroll() {
    closeCal();
  }

  function renderCalendar() {
    const popup = document.getElementById('txnCalPopup');
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    // Find which days have transactions
    let txns = getFilteredTxns();
    if (currentTxnTypeFilter !== 'all') txns = txns.filter(t => t.type === currentTxnTypeFilter);
    const txnDays = new Set();
    txns.forEach(t => {
      const d = parseTxnDate(t.date);
      if (d.getFullYear() === calViewYear && d.getMonth() === calViewMonth) {
        txnDays.add(d.getDate());
      }
    });

    const today = new Date();
    const isToday = (day) => today.getFullYear() === calViewYear && today.getMonth() === calViewMonth && today.getDate() === day;

    const firstDay = new Date(calViewYear, calViewMonth, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(calViewYear, calViewMonth + 1, 0).getDate();

    // Check if selected date is in this month
    let selectedDay = 0;
    if (currentCalDate) {
      const sd = parseTxnDate(currentCalDate);
      if (sd.getFullYear() === calViewYear && sd.getMonth() === calViewMonth) {
        selectedDay = sd.getDate();
      }
    }

    let daysHTML = '';
    // Empty cells for days before the 1st
    for (let i = 0; i < firstDay; i++) {
      daysHTML += '<div class="txn-cal-day empty"></div>';
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const cls = [];
      if (isToday(d)) cls.push('today');
      if (d === selectedDay) cls.push('selected');
      if (txnDays.has(d)) cls.push('has-txn');
      daysHTML += `<div class="txn-cal-day ${cls.join(' ')}" onclick="selectCalDate(${d})">${d}</div>`;
    }

    popup.innerHTML = `
      <div class="txn-cal-nav">
        <button class="txn-cal-nav-btn" onclick="event.stopPropagation(); calNavMonth(-1)">&lsaquo;</button>
        <span class="txn-cal-month-label">${months[calViewMonth]} ${calViewYear}</span>
        <button class="txn-cal-nav-btn" onclick="event.stopPropagation(); calNavMonth(1)">&rsaquo;</button>
      </div>
      <div class="txn-cal-weekdays">
        <div class="txn-cal-weekday">S</div><div class="txn-cal-weekday">M</div><div class="txn-cal-weekday">T</div>
        <div class="txn-cal-weekday">W</div><div class="txn-cal-weekday">T</div><div class="txn-cal-weekday">F</div><div class="txn-cal-weekday">S</div>
      </div>
      <div class="txn-cal-days">${daysHTML}</div>
      ${currentCalDate ? '<button class="txn-cal-clear" onclick="event.stopPropagation(); clearCalDate()">Clear date filter</button>' : ''}
    `;
  }

  function calNavMonth(dir) {
    calViewMonth += dir;
    if (calViewMonth < 0) { calViewMonth = 11; calViewYear--; }
    if (calViewMonth > 11) { calViewMonth = 0; calViewYear++; }
    renderCalendar();
  }

  function selectCalDate(day) {
    const pad = (n) => n < 10 ? '0' + n : '' + n;
    const dateStr = pad(day) + '/' + pad(calViewMonth + 1) + '/' + calViewYear;

    if (currentCalDate === dateStr) {
      // Toggle off
      clearCalDate();
      return;
    }

    currentCalDate = dateStr;
    const btn = document.getElementById('txnCalBtn');
    const label = document.getElementById('txnCalLabel');
    if (btn) btn.classList.add('has-date');
    const months = MONTH_NAMES;
    if (label) label.textContent = months[calViewMonth] + ' ' + day;

    renderCalendar();
    renderTxnTable();

    // Close popup
    document.getElementById('txnCalPopup').classList.remove('open');
    document.removeEventListener('click', closeCalOnOutside);
  }

  function clearCalDate() {
    currentCalDate = null;
    const btn = document.getElementById('txnCalBtn');
    const label = document.getElementById('txnCalLabel');
    if (btn) btn.classList.remove('has-date');
    if (label) label.textContent = 'Date';
    renderCalendar();
    renderTxnTable();
  }

  function setCalPeriod(year, period) {
    // Clear specific date if set
    currentCalDate = null;
    const btn = document.getElementById('txnCalBtn');
    const label = document.getElementById('txnCalLabel');
    if (btn) btn.classList.remove('has-date');

    // Set year/period filters
    const yearSel = document.getElementById('txnYearSelect');
    const periodSel = document.getElementById('txnPeriodSelect');
    if (yearSel) yearSel.value = year;
    if (periodSel) periodSel.value = period;
    applyTxnFilters();

    // Update label
    const months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    if (year === 'all' && period === 'all') {
      if (label) label.textContent = 'All Time';
      if (btn) btn.classList.add('has-date');
    } else if (period === 'ytd') {
      if (label) label.textContent = year + ' YTD';
      if (btn) btn.classList.add('has-date');
    } else if (period !== 'all') {
      if (label) label.textContent = months[parseInt(period)] + ' ' + year;
      if (btn) btn.classList.add('has-date');
    } else {
      if (label) label.textContent = year;
      if (btn) btn.classList.add('has-date');
    }

    renderCalendar();
    // Close popup
    document.getElementById('txnCalPopup').classList.remove('open');
    document.removeEventListener('click', closeCalOnOutside);
  }

  let displayedTxns = [];

  function sortTxnTable(col) {
    if (txnSortCol === col) {
      txnSortDir = txnSortDir === 'desc' ? 'asc' : 'desc';
    } else {
      txnSortCol = col;
      txnSortDir = col === 'category' || col === 'type' ? 'asc' : 'desc';
    }
    renderTxnTable();
  }

  let editingTxnIdx = null;

  function getCatsForType(type) {
    // Budget categories from the sheet (strip composite key prefix), plus any extras seen in transactions
    const budgetCats = (budgetCategories[type] || []).map(c => window._budgetDisplayNames?.[c] || c.replace(/^[A-Z]+:/, '')).slice();
    const txnCats = [...new Set(allTransactions.filter(tx => tx.type === type).map(tx => tx.category))];
    // Merge: budget first, then any transaction-only cats not already in budget
    const budgetLower = new Set(budgetCats.map(c => c.toLowerCase().trim()));
    txnCats.forEach(c => {
      if (!budgetLower.has(c.toLowerCase().trim())) budgetCats.push(c);
    });
    return budgetCats.sort();
  }

  function buildCatOptions(type, selected) {
    const cats = getCatsForType(type);
    // If current selection isn't in the list, add it
    if (selected && !cats.find(c => c.toLowerCase().trim() === selected.toLowerCase().trim())) {
      cats.unshift(selected);
    }
    return cats.map(c => `<option value="${c}" ${c === selected ? 'selected' : ''}>${c}</option>`).join('')
      + '<option value="__custom__">+ Custom...</option>';
  }

  function updateTxnCategoryDropdown() {
    const typeEl = document.getElementById('txnEditType');
    const catEl = document.getElementById('txnEditCategory');
    if (!typeEl || !catEl) return;
    const currentCat = catEl.value;
    const newType = typeEl.value;
    const cats = getCatsForType(newType);
    // If current category exists in new type, keep it; otherwise pick first
    const keepCat = cats.find(c => c === currentCat) ? currentCat : (cats[0] || '');
    catEl.innerHTML = buildCatOptions(newType, keepCat);
    // Show/hide refund toggle
    const refundRow = document.getElementById('txnRefundRow');
    if (refundRow) {
      refundRow.style.display = newType === 'EXPENSES' ? '' : 'none';
      if (newType !== 'EXPENSES') {
        const cb = document.getElementById('txnRefundToggle');
        if (cb) cb.checked = false;
      }
    }
  }

  function openTxnDetail(idx) {
    const t = displayedTxns[idx];
    if (!t) return;
    editingTxnIdx = idx;

    const types = ['INCOME', 'EXPENSES', 'SAVINGS', 'DEBT', 'TRANSFER'];
    const typeOptions = types.map(tp => `<option value="${tp}" ${tp === t.type ? 'selected' : ''}>${tp}</option>`).join('');

    const catOptions = buildCatOptions(t.type, t.category);

    // Gather known accounts
    const allAccounts = [...new Set(allTransactions.filter(tx => tx.account && tx.account !== '--').map(tx => tx.account))].sort();
    const acctOptions = allAccounts.map(a => `<option value="${a}" ${a === t.account ? 'selected' : ''}>${a}</option>`).join('')
      + '<option value="__custom__">+ Custom...</option>';

    const absAmount = Math.abs(t.amount);

    document.getElementById('txnModalContent').innerHTML = `
      <div class="txn-modal-row">
        <div class="txn-modal-label">Date</div>
        <input type="text" class="txn-edit-input" id="txnEditDate" value="${t.date}" placeholder="DD/MM/YYYY">
      </div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Type</div>
        <select class="txn-edit-select" id="txnEditType" onchange="updateTxnCategoryDropdown()">${typeOptions}</select>
      </div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Category</div>
        <select class="txn-edit-select" id="txnEditCategory" onchange="if(this.value==='__custom__'){const v=prompt('Enter category name:');if(v){const o=new Option(v,v);this.add(o,this.options.length-1);this.value=v;}else{updateTxnCategoryDropdown();}}">${catOptions}</select>
      </div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Account</div>
        <select class="txn-edit-select" id="txnEditAccount" onchange="if(this.value==='__custom__'){const v=prompt('Enter account name:');if(v){const o=new Option(v,v);this.add(o,this.options.length-1);this.value=v;}else{this.value='${t.account}';}}">${acctOptions}</select>
      </div>
      <div class="txn-modal-row" id="txnRefundRow" style="${t.type === 'EXPENSES' ? '' : 'display:none'}">
        <div class="txn-modal-label">Refund</div>
        <label class="txn-refund-label"><input type="checkbox" id="txnRefundToggle" ${t.isRefund ? 'checked' : ''}> This is a refund (+)</label>
      </div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Amount</div>
        <input type="number" class="txn-edit-input" id="txnEditAmount" value="${absAmount.toFixed(2)}" step="0.01" min="0">
      </div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Description</div>
        <input type="text" class="txn-edit-input" id="txnEditDesc" value="${t.description || ''}" placeholder="Optional">
      </div>
      <div class="txn-modal-actions">
        <button class="txn-modal-btn cancel" onclick="closeTxnModal()">Cancel</button>
        <button class="txn-modal-btn delete" onclick="deleteTxnRow()">Delete</button>
        <button class="txn-modal-btn save" id="txnSaveBtn" onclick="saveTxnEdit()">Save</button>
      </div>
      <div class="txn-edit-status" id="txnEditStatus"></div>
    `;

    openModal();
  }

  async function saveTxnEdit() {
    const t = displayedTxns[editingTxnIdx];
    if (!t || !t.sheetRow || !accessToken) return;

    const statusEl = document.getElementById('txnEditStatus');
    const saveBtn = document.getElementById('txnSaveBtn');
    statusEl.textContent = 'Saving...';
    statusEl.style.color = 'var(--text-2)';
    saveBtn.disabled = true;

    const newDate = document.getElementById('txnEditDate').value.trim();
    const newType = document.getElementById('txnEditType').value;
    const newCategory = document.getElementById('txnEditCategory').value;
    const newAccount = document.getElementById('txnEditAccount').value;
    const newAmount = parseFloat(document.getElementById('txnEditAmount').value);
    const newDesc = document.getElementById('txnEditDesc').value.trim();

    if (!newDate || isNaN(newAmount) || newAmount <= 0) {
      statusEl.textContent = 'Invalid date or amount';
      statusEl.style.color = 'var(--red)';
      saveBtn.disabled = false;
      return;
    }

    // For EXPENSES: negative in sheet (money out). Positive = refund.
    const isRefund = document.getElementById('txnRefundToggle')?.checked || false;
    let sheetAmount = newAmount;
    if (newType === 'EXPENSES' && !isRefund) sheetAmount = -newAmount;

    const rowValues = [newDate, newType, newCategory, newAccount, sheetAmount, newDesc];
    const range = `Transactions!B${t.sheetRow}:G${t.sheetRow}`;

    try {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ range, majorDimension: 'ROWS', values: [rowValues] })
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || 'Update failed');
      }

      statusEl.textContent = 'Saved';
      statusEl.style.color = 'var(--emerald)';

      // Update local data
      const isExpenseRefund = (newType === 'EXPENSES' && sheetAmount > 0);
      t.date = newDate;
      t.type = newType;
      t.category = newCategory;
      t.account = newAccount;
      t.amount = isExpenseRefund ? -Math.abs(newAmount) : Math.abs(newAmount);
      t.isRefund = isExpenseRefund;
      t.description = newDesc;

      // Also update in allTransactions
      const mainIdx = allTransactions.findIndex(tx => tx.sheetRow === t.sheetRow);
      if (mainIdx >= 0) {
        Object.assign(allTransactions[mainIdx], t);
      }

      setTimeout(() => {
        closeTxnModal();
        renderTransactionsDashboard();
      }, 600);

    } catch (err) {
      console.error('Save error:', err);
      statusEl.textContent = 'Error: ' + err.message;
      statusEl.style.color = 'var(--red)';
      saveBtn.disabled = false;
    }
  }

  function openAddTxnModal() {
    editingTxnIdx = -1; // -1 means new transaction

    const types = ['INCOME', 'EXPENSES', 'SAVINGS', 'DEBT', 'TRANSFER'];
    const typeOptions = types.map(tp => `<option value="${tp}">${tp}</option>`).join('');

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const todayStr = `${dd}/${mm}/${yyyy}`;

    const catOptions = buildCatOptions('INCOME', '');

    const allAccounts = [...new Set(allTransactions.filter(tx => tx.account && tx.account !== '--').map(tx => tx.account))].sort();
    const acctOptions = allAccounts.map(a => `<option value="${a}">${a}</option>`).join('')
      + '<option value="__custom__">+ Custom...</option>';

    document.getElementById('txnModalContent').innerHTML = `
      <div style="font-size:16px;font-weight:600;color:var(--text-1);margin-bottom:12px;">New Transaction</div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Date</div>
        <input type="text" class="txn-edit-input" id="txnEditDate" value="${todayStr}" placeholder="DD/MM/YYYY">
      </div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Type</div>
        <select class="txn-edit-select" id="txnEditType" onchange="updateTxnCategoryDropdown()">${typeOptions}</select>
      </div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Category</div>
        <select class="txn-edit-select" id="txnEditCategory" onchange="if(this.value==='__custom__'){const v=prompt('Enter category name:');if(v){const o=new Option(v,v);this.add(o,this.options.length-1);this.value=v;}else{updateTxnCategoryDropdown();}}">${catOptions}</select>
      </div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Account</div>
        <select class="txn-edit-select" id="txnEditAccount" onchange="if(this.value==='__custom__'){const v=prompt('Enter account name:');if(v){const o=new Option(v,v);this.add(o,this.options.length-1);this.value=v;}else{this.value='';}}"><option value="">--</option>${acctOptions}</select>
      </div>
      <div class="txn-modal-row" id="txnRefundRow" style="display:none">
        <div class="txn-modal-label">Refund</div>
        <label class="txn-refund-label"><input type="checkbox" id="txnRefundToggle"> This is a refund (+)</label>
      </div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Amount</div>
        <input type="number" class="txn-edit-input" id="txnEditAmount" value="" step="0.01" min="0" placeholder="0.00">
      </div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Description</div>
        <input type="text" class="txn-edit-input" id="txnEditDesc" value="" placeholder="Optional">
      </div>
      <div class="txn-modal-actions">
        <button class="txn-modal-btn cancel" onclick="closeTxnModal()">Cancel</button>
        <button class="txn-modal-btn save" id="txnSaveBtn" onclick="addNewTxn()">Add</button>
      </div>
      <div class="txn-edit-status" id="txnEditStatus"></div>
    `;

    openModal();
  }

  async function addNewTxn() {
    if (!accessToken) { alert('Not signed in'); return; }

    const statusEl = document.getElementById('txnEditStatus');
    const saveBtn = document.getElementById('txnSaveBtn');
    statusEl.textContent = 'Adding...';
    statusEl.style.color = 'var(--text-2)';
    saveBtn.disabled = true;

    const newDate = document.getElementById('txnEditDate').value.trim();
    const newType = document.getElementById('txnEditType').value;
    const newCategory = document.getElementById('txnEditCategory').value;
    const newAccount = document.getElementById('txnEditAccount').value || '--';
    const newAmount = parseFloat(document.getElementById('txnEditAmount').value);
    const newDesc = document.getElementById('txnEditDesc').value.trim();

    if (!newDate || isNaN(newAmount) || newAmount <= 0) {
      statusEl.textContent = 'Invalid date or amount';
      statusEl.style.color = 'var(--red)';
      saveBtn.disabled = false;
      return;
    }

    // For EXPENSES: store as negative in sheet, unless it's a refund
    const isRefund = document.getElementById('txnRefundToggle')?.checked || false;
    let sheetAmount = newAmount;
    if (newType === 'EXPENSES' && !isRefund) sheetAmount = -newAmount;

    const rowValues = [newDate, newType, newCategory, newAccount, sheetAmount, newDesc];

    try {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent('Transactions!B:G')}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ majorDimension: 'ROWS', values: [rowValues] })
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || 'Add failed');
      }

      const result = await res.json();
      // Parse the updated range to get the new row number
      const updatedRange = result.updates?.updatedRange || '';
      const rowMatch = updatedRange.match(/(\d+)$/);
      const newSheetRow = rowMatch ? parseInt(rowMatch[1]) : allTransactions.length + 14;

      statusEl.textContent = 'Added';
      statusEl.style.color = 'var(--emerald)';

      // Add to local data
      const isExpenseRefund = (newType === 'EXPENSES' && sheetAmount > 0);
      allTransactions.push({
        date: normalizeDateStr(newDate),
        type: newType,
        category: newCategory,
        account: newAccount,
        amount: isExpenseRefund ? -Math.abs(newAmount) : Math.abs(newAmount),
        isRefund: isExpenseRefund,
        description: newDesc,
        sheetRow: newSheetRow,
        rawAmount: sheetAmount
      });

      // Re-sort so new transaction merges into correct date group
      allTransactions.sort((a, b) => parseTxnDate(b.date) - parseTxnDate(a.date));

      setTimeout(() => {
        closeTxnModal();
        renderTransactionsDashboard();
        // Recalculate spacer and scroll to top
        requestAnimationFrame(() => {
          const fr = document.getElementById('txnFiltersRow');
          const sp = document.getElementById('filtersSpacer');
          if (fr && sp && window.innerWidth < 768) sp.style.height = fr.offsetHeight + 'px';
          window.scrollTo({ top: 0, behavior: 'instant' });
        });
      }, 600);

    } catch (err) {
      console.error('Add error:', err);
      statusEl.textContent = 'Error: ' + err.message;
      statusEl.style.color = 'var(--red)';
      saveBtn.disabled = false;
    }
  }

  // ── Buy More (pre-filled from holding detail) ──
  function openBuyMoreModal(ticker) {
    openAddTradeModal();
    // Pre-fill after modal renders
    requestAnimationFrame(() => {
      const tickerEl = document.getElementById('tradeEditTicker');
      if (tickerEl) tickerEl.value = ticker;
      const h = holdings[ticker];
      if (h && h.type) {
        const typeEl = document.getElementById('tradeEditType');
        if (typeEl) typeEl.value = h.type;
      }
      // Pre-fill current price
      const lp = livePrices[ticker];
      if (lp) {
        const priceEl = document.getElementById('tradeEditPrice');
        if (priceEl) priceEl.value = lp.price.toFixed(2);
      }
      // Update action to BUY
      const actionEl = document.getElementById('tradeEditAction');
      if (actionEl) actionEl.value = 'BUY';
    });
  }

  // ── Add Trade (Portfolio) ──
  function openAddTradeModal() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const todayStr = `${dd}/${mm}/${yyyy}`;

    // Get unique tickers from existing holdings
    const existingTickers = [...new Set(Object.keys(holdings))].sort();
    const tickerOptions = existingTickers.map(t => `<option value="${t}">${t}</option>`).join('');

    // Get unique types
    const existingTypes = [...new Set(Object.values(holdings).map(h => h.type).filter(Boolean))].sort();
    const typeOptions = existingTypes.map(t => `<option value="${t}">${t}</option>`).join('');

    document.getElementById('txnModalContent').innerHTML = `
      <div style="font-size:16px;font-weight:600;color:var(--text-1);margin-bottom:12px;">New Trade</div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Date</div>
        <input type="text" class="txn-edit-input" id="tradeEditDate" value="${todayStr}" placeholder="DD/MM/YYYY">
      </div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Ticker</div>
        <select class="txn-edit-select" id="tradeEditTicker" onchange="if(this.value==='__custom__'){const v=prompt('Enter ticker symbol:');if(v){const o=new Option(v.toUpperCase(),v.toUpperCase());this.add(o,this.options.length-1);this.value=v.toUpperCase();}else{this.value='';}}">${tickerOptions}<option value="__custom__">+ New Ticker...</option></select>
      </div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Action</div>
        <select class="txn-edit-select" id="tradeEditAction">
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>
      </div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Shares</div>
        <input type="number" class="txn-edit-input" id="tradeEditShares" value="" step="0.0001" min="0" placeholder="0">
      </div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Price/Share</div>
        <input type="number" class="txn-edit-input" id="tradeEditPrice" value="" step="0.01" min="0" placeholder="0.00" oninput="updateTradeTotal()">
      </div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Type</div>
        <select class="txn-edit-select" id="tradeEditType" onchange="if(this.value==='__custom__'){const v=prompt('Enter asset type:');if(v){const o=new Option(v,v);this.add(o,this.options.length-1);this.value=v;}else{this.value='Equity';}}">${typeOptions}<option value="__custom__">+ Custom...</option></select>
      </div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Total</div>
        <input type="number" class="txn-edit-input" id="tradeEditTotal" value="" step="0.01" min="0" placeholder="Auto-calculated" style="color:var(--text-3)">
      </div>
      <div class="txn-modal-actions">
        <button class="txn-modal-btn cancel" onclick="closeTxnModal()">Cancel</button>
        <button class="txn-modal-btn save" id="tradeSaveBtn" onclick="addNewTrade()">Add Trade</button>
      </div>
      <div class="txn-edit-status" id="tradeEditStatus"></div>
    `;

    // Auto-fill type when ticker is selected
    document.getElementById('tradeEditTicker').addEventListener('change', function() {
      const h = holdings[this.value];
      if (h && h.type) {
        document.getElementById('tradeEditType').value = h.type;
      }
    });

    // Auto-calculate total when shares/price change
    document.getElementById('tradeEditShares').addEventListener('input', updateTradeTotal);

    openModal();
  }

  function updateTradeTotal() {
    const shares = parseFloat(document.getElementById('tradeEditShares')?.value) || 0;
    const price = parseFloat(document.getElementById('tradeEditPrice')?.value) || 0;
    const totalEl = document.getElementById('tradeEditTotal');
    if (totalEl && shares > 0 && price > 0) {
      totalEl.value = (shares * price).toFixed(2);
    }
  }

  async function addNewTrade() {
    if (!accessToken) { alert('Not signed in'); return; }

    const statusEl = document.getElementById('tradeEditStatus');
    const saveBtn = document.getElementById('tradeSaveBtn');
    statusEl.textContent = 'Adding...';
    statusEl.style.color = 'var(--text-2)';
    saveBtn.disabled = true;

    const date = document.getElementById('tradeEditDate').value.trim();
    const ticker = document.getElementById('tradeEditTicker').value.trim().toUpperCase();
    const action = document.getElementById('tradeEditAction').value;
    const shares = parseFloat(document.getElementById('tradeEditShares').value);
    const price = parseFloat(document.getElementById('tradeEditPrice').value);
    const type = document.getElementById('tradeEditType').value || 'Other';
    const total = parseFloat(document.getElementById('tradeEditTotal').value) || (shares * price);

    if (!date || !ticker || isNaN(shares) || shares <= 0 || isNaN(price) || price <= 0) {
      statusEl.textContent = 'Please fill in all required fields';
      statusEl.style.color = 'var(--red)';
      saveBtn.disabled = false;
      return;
    }

    const rowValues = [date, ticker, action, shares, price, type, total];

    try {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent('Investments!G:M')}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ majorDimension: 'ROWS', values: [rowValues] })
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || 'Add failed');
      }

      statusEl.textContent = 'Trade added';
      statusEl.style.color = 'var(--emerald)';

      // Update local data
      allTrades.push({ date, ticker, action, shares, price, type, total });

      // Update holdings
      if (!holdings[ticker]) {
        holdings[ticker] = { ticker, type, shares: 0, totalSpent: 0, totalSold: 0, buys: 0, sells: 0 };
      }
      const isBuy = action.includes('BUY');
      if (isBuy) {
        holdings[ticker].shares += shares;
        holdings[ticker].totalSpent += Math.abs(total);
        holdings[ticker].buys++;
      } else {
        holdings[ticker].shares -= shares;
        holdings[ticker].totalSold += Math.abs(total);
        holdings[ticker].sells++;
      }
      holdings[ticker].netInvested = holdings[ticker].totalSpent - holdings[ticker].totalSold;
      holdings[ticker].avgCost = holdings[ticker].shares > 0 ? holdings[ticker].totalSpent / holdings[ticker].shares : 0;

      // Re-render
      setTimeout(() => {
        closeTxnModal();
        renderSummary(currentHoldingsFilter);
        renderHoldingsTable(currentHoldingsFilter);
        renderTrades(currentTradeFilter);
      }, 600);

    } catch (err) {
      console.error('Add trade error:', err);
      statusEl.textContent = 'Error: ' + err.message;
      statusEl.style.color = 'var(--red)';
      saveBtn.disabled = false;
    }
  }

  // ── Sell Holding ──
  function openSellModal(ticker) {
    // If no ticker specified, default to first sellable holding
    if (!ticker || !holdings[ticker] || holdings[ticker].shares <= 0.0001) {
      const sellable = Object.values(holdings).filter(x => x.shares > 0.0001).sort((a, b) => (b.currentValue || b.netInvested) - (a.currentValue || a.netInvested));
      if (sellable.length === 0) return;
      ticker = sellable[0].ticker;
    }
    const h = holdings[ticker];

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const todayStr = `${dd}/${mm}/${yyyy}`;

    const lp = livePrices[ticker];
    const curPrice = lp ? lp.priceAED : 0;
    const curPriceOrig = lp ? lp.price : 0;
    const sharesStr = h.shares % 1 === 0 ? h.shares.toFixed(0) : h.shares.toFixed(4);
    const sym = currentCurrency === 'USD' ? '$' : 'AED ';
    const priceDisplay = curPriceOrig > 0 ? curPriceOrig.toFixed(2) : '';

    // Get all sellable holdings for the dropdown
    const sellable = Object.values(holdings).filter(x => x.shares > 0.0001).sort((a, b) => a.ticker.localeCompare(b.ticker));
    const tickerOptions = sellable.map(x => {
      const sh = x.shares % 1 === 0 ? x.shares.toFixed(0) : x.shares.toFixed(4);
      return `<option value="${escapeHTML(x.ticker)}" ${x.ticker === ticker ? 'selected' : ''}>${escapeHTML(x.ticker)} (${sh} shares)</option>`;
    }).join('');

    document.getElementById('txnModalContent').innerHTML = `
      <div style="font-size:16px;font-weight:600;color:var(--red);margin-bottom:12px;">Sell Shares</div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Date</div>
        <input type="text" class="txn-edit-input" id="sellEditDate" value="${todayStr}" placeholder="DD/MM/YYYY">
      </div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Ticker</div>
        <select class="txn-edit-select" id="sellEditTicker" onchange="updateSellInfo()">${tickerOptions}</select>
      </div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Available</div>
        <div class="txn-modal-value" id="sellAvailable" style="font-family:'DM Mono',monospace;font-size:14px;">${sharesStr} shares</div>
      </div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Shares to Sell</div>
        <div style="display:flex;align-items:center;gap:8px;flex:1;justify-content:flex-end;">
          <input type="number" class="txn-edit-input" id="sellEditShares" value="" step="0.0001" min="0" max="${h.shares}" placeholder="0" style="width:100px;text-align:right;" oninput="updateSellTotal()">
          <button style="font-size:10px;padding:4px 8px;border-radius:6px;border:1px solid var(--glass-border);background:var(--glass-bg);color:var(--text-2);cursor:pointer;" onclick="document.getElementById('sellEditShares').value=holdings[document.getElementById('sellEditTicker').value]?.shares||0;updateSellTotal();">All</button>
        </div>
      </div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Price/Share</div>
        <input type="number" class="txn-edit-input" id="sellEditPrice" value="${priceDisplay}" step="0.01" min="0" placeholder="0.00" oninput="updateSellTotal()">
      </div>
      <div class="txn-modal-row">
        <div class="txn-modal-label">Total Proceeds</div>
        <div class="txn-modal-value" id="sellTotal" style="font-family:'DM Mono',monospace;font-size:16px;font-weight:600;color:var(--emerald);">--</div>
      </div>
      <div class="txn-modal-actions">
        <button class="txn-modal-btn cancel" onclick="closeTxnModal()">Cancel</button>
        <button class="txn-modal-btn save" id="sellSaveBtn" style="background:var(--red);border-color:rgba(255,69,58,0.4);" onclick="executeSell()">Confirm Sell</button>
      </div>
      <div class="txn-edit-status" id="sellEditStatus"></div>
    `;

    updateSellTotal();
    openModal();
  }

  function updateSellInfo() {
    const ticker = document.getElementById('sellEditTicker').value;
    const h = holdings[ticker];
    if (!h) return;
    const sharesStr = h.shares % 1 === 0 ? h.shares.toFixed(0) : h.shares.toFixed(4);
    document.getElementById('sellAvailable').textContent = sharesStr + ' shares';
    document.getElementById('sellEditShares').max = h.shares;
    // Update price from live data
    const lp = livePrices[ticker];
    if (lp) document.getElementById('sellEditPrice').value = lp.price.toFixed(2);
    updateSellTotal();
  }

  function updateSellTotal() {
    const shares = parseFloat(document.getElementById('sellEditShares')?.value) || 0;
    const price = parseFloat(document.getElementById('sellEditPrice')?.value) || 0;
    const totalEl = document.getElementById('sellTotal');
    const sym = currentCurrency === 'USD' ? '$' : 'AED ';
    const convert = (v) => currentCurrency === 'USD' ? v / AED_USD_RATE : v;
    if (totalEl && shares > 0 && price > 0) {
      totalEl.textContent = sym + convert(shares * price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
      totalEl.textContent = '--';
    }
  }

  async function executeSell() {
    if (!accessToken) { alert('Not signed in'); return; }

    const statusEl = document.getElementById('sellEditStatus');
    const saveBtn = document.getElementById('sellSaveBtn');
    statusEl.textContent = '';

    const date = document.getElementById('sellEditDate').value.trim();
    const ticker = document.getElementById('sellEditTicker').value.trim().toUpperCase();
    const shares = parseFloat(document.getElementById('sellEditShares').value);
    const price = parseFloat(document.getElementById('sellEditPrice').value);

    if (!date || !ticker || isNaN(shares) || shares <= 0 || isNaN(price) || price <= 0) {
      statusEl.textContent = 'Please fill in all fields';
      statusEl.style.color = 'var(--red)';
      return;
    }

    // Validate shares available
    const h = holdings[ticker];
    if (!h || shares > h.shares + 0.0001) {
      statusEl.textContent = `Only ${h ? h.shares.toFixed(4) : 0} shares available`;
      statusEl.style.color = 'var(--red)';
      return;
    }

    statusEl.textContent = 'Selling...';
    statusEl.style.color = 'var(--text-2)';
    saveBtn.disabled = true;

    const type = h.type || 'Other';
    const total = shares * price;
    const rowValues = [date, ticker, 'SELL', shares, price, type, total];

    try {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent('Investments!G:M')}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ majorDimension: 'ROWS', values: [rowValues] })
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || 'Sell failed');
      }

      statusEl.textContent = 'Sold';
      statusEl.style.color = 'var(--emerald)';

      // Update local data
      allTrades.push({ date, ticker, action: 'SELL', shares, price, type, total });
      holdings[ticker].shares -= shares;
      holdings[ticker].totalSold += Math.abs(total);
      holdings[ticker].sells++;
      holdings[ticker].netInvested = holdings[ticker].totalSpent - holdings[ticker].totalSold;
      if (holdings[ticker].shares > 0.0001) {
        holdings[ticker].avgCost = holdings[ticker].totalSpent / holdings[ticker].shares;
      }

      // Re-render
      setTimeout(() => {
        closeTxnModal();
        renderSummary(currentHoldingsFilter);
        renderHoldingsTable(currentHoldingsFilter);
        renderTrades(currentTradeFilter);
      }, 600);

    } catch (err) {
      console.error('Sell error:', err);
      statusEl.textContent = 'Error: ' + err.message;
      statusEl.style.color = 'var(--red)';
      saveBtn.disabled = false;
    }
  }

  async function deleteTxnRow() {
    const t = displayedTxns[editingTxnIdx];
    if (!t || !t.sheetRow || !accessToken) return;

    if (!confirm('Delete this transaction? This will clear the row from your Google Sheet.')) return;

    const statusEl = document.getElementById('txnEditStatus');
    statusEl.textContent = 'Deleting...';
    statusEl.style.color = 'var(--text-2)';

    const range = `Transactions!B${t.sheetRow}:G${t.sheetRow}`;

    try {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}:clear`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || 'Delete failed');
      }

      statusEl.textContent = 'Deleted';
      statusEl.style.color = 'var(--red)';

      // Remove from local data
      const mainIdx = allTransactions.findIndex(tx => tx.sheetRow === t.sheetRow);
      if (mainIdx >= 0) allTransactions.splice(mainIdx, 1);

      setTimeout(() => {
        closeTxnModal();
        renderTransactionsDashboard();
      }, 600);

    } catch (err) {
      console.error('Delete error:', err);
      statusEl.textContent = 'Error: ' + err.message;
      statusEl.style.color = 'var(--red)';
    }
  }

  function openModal() {
    document.getElementById('txnModalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeTxnModal() {
    document.getElementById('txnModalOverlay').classList.remove('open');
    document.body.style.overflow = '';
    editingTxnIdx = null;
  }

  function filterTxnType(type, el) {
    currentTxnTypeFilter = type;
    if (el && el.parentElement) {
      el.parentElement.querySelectorAll('.pill-track-btn').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
      moveSlidingPill(document.getElementById('txnTypeTrack'), document.getElementById('txnTypePill'), el, true);
    }
    renderTxnTable();
  }

  function filterTxnTypeSelect(type) {
    currentTxnTypeFilter = type;
    renderTxnTable();
  }

  function restartAnimations(container) {
    const animated = container.querySelectorAll('.summary-card, .hero-section, .insight-card, .metric-pill, .chart-card, .holding-item, .alloc-item, .advisor-result-card, .advisor-suggest-card');
    animated.forEach(el => {
      const anim = el.style.animation || getComputedStyle(el).animation;
      el.style.animation = 'none';
      el.offsetHeight; // force reflow
      el.style.animation = '';
    });
  }

  let _prevTxnTabIdx = 0;
  const _txnTabOrder = ['overview', 'breakdown', 'summary', 'list'];

  function switchTxnTab(tab, el) {
    document.querySelectorAll('#txnTabRow .tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    el.classList.add('active');
    el.setAttribute('aria-selected', 'true');

    // Update header tab indicator
    const tabNames = { overview: 'Overview', breakdown: 'Breakdown', summary: 'Insights', list: 'All Txns' };
    const indicator = document.getElementById('dashTabIndicator');
    if (indicator) indicator.textContent = tabNames[tab] || '';
    moveTxnTabUnderline(el);
    // Toggle mobile layout classes for filter rows
    document.body.classList.toggle('txn-list-active', tab === 'list');
    document.body.classList.toggle('txn-bd-active', tab === 'breakdown');

    // Update filter spacer on tab switch — measure twice to catch animations
    if (window.innerWidth < 768) {
      const updateSpacer = () => {
        const fr = document.getElementById('txnFiltersRow');
        const sp = document.getElementById('filtersSpacer');
        if (fr && sp) sp.style.height = fr.offsetHeight + 'px';
      };
      requestAnimationFrame(updateSpacer);
      setTimeout(updateSpacer, 350); // Re-measure after filter show/hide animations
    }

    // Scroll to top on tab switch
    window.scrollTo({ top: 0, behavior: 'instant' });

    const newIdx = _txnTabOrder.indexOf(tab);
    const slideDir = newIdx > _prevTxnTabIdx ? 'slide-left' : 'slide-right';
    _prevTxnTabIdx = newIdx >= 0 ? newIdx : _prevTxnTabIdx;

    const allTabs = ['txnOverviewTab', 'txnBreakdownTab', 'txnSummaryTab', 'txnListTab'];
    const tabMap = { overview: 'txnOverviewTab', breakdown: 'txnBreakdownTab', summary: 'txnSummaryTab', list: 'txnListTab' };
    allTabs.forEach(id => { const e = document.getElementById(id); if (e) { e.classList.add('hidden'); e.style.transform = ''; e.style.opacity = ''; e.style.transition = ''; } });
    const target = document.getElementById(tabMap[tab]);
    if (target) {
      target.classList.remove('hidden');
      target.style.transform = '';
      target.style.opacity = '';
      target.style.transition = '';
      // Only restart entrance animations on overview (hero card etc.)
      // Other tabs just need their data animations (tick bars, count-ups)
      if (tab === 'overview') {
        setTimeout(() => restartAnimations(target), 50);
      }
    }

    // Show/hide extra filters based on tab (overview = only Year + Month)
    const extras = document.querySelectorAll('.txn-filter-extra');
    const typeFilter = document.getElementById('filterTxnType');
    const searchFilter = document.getElementById('filterTxnSearch');
    const calFilter = document.getElementById('filterTxnCal');
    const bdTypeFilter = document.getElementById('filterBdType');
    const hideExtras = (tab === 'overview' || tab === 'list' || tab === 'summary');
    if (hideExtras) {
      extras.forEach(el => el.classList.add('filter-hidden'));
    } else {
      extras.forEach(el => el.classList.remove('filter-hidden'));
    }
    if (tab === 'overview' || tab === 'summary') {
      if (typeFilter) typeFilter.classList.add('filter-hidden');
      if (searchFilter) searchFilter.classList.add('filter-hidden');
      if (calFilter) calFilter.classList.add('filter-hidden');
      if (bdTypeFilter) bdTypeFilter.classList.add('filter-hidden');
      if (tab === 'overview') renderTxnSummary();
    } else {
      if (typeFilter) typeFilter.classList.toggle('filter-hidden', tab !== 'list');
      if (searchFilter) searchFilter.classList.toggle('filter-hidden', tab !== 'list');
      if (calFilter) calFilter.classList.toggle('filter-hidden', tab !== 'list');
      if (bdTypeFilter) bdTypeFilter.classList.toggle('filter-hidden', tab !== 'breakdown');
    }
    if (tab === 'list') {
      renderTxnTable();
      requestAnimationFrame(() => initTxnPills());
    }
    if (tab === 'breakdown') {
      renderBreakdown();
      requestAnimationFrame(() => initBdSegPill());
    }
    if (tab === 'summary') {
      loadChartJS().then(() => { renderInsightsPage(); renderTxnSummaryChart(); renderAllSectionPies(); });
    }
  }

  function moveTxnTabUnderline(activeTab) {
    const row = document.getElementById('txnTabRow');
    const underline = document.getElementById('txnTabUnderline');
    if (!row || !underline || !activeTab) return;
    const rowRect = row.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();
    underline.style.left = (tabRect.left - rowRect.left + 16) + 'px';
    underline.style.width = (tabRect.width - 32) + 'px';
  }

  // Get budget for a category across the filtered months
  function getCategoryBudget(category) {
    // Try direct match first, then try composite keys across all types
    let catBudgets = budgetData[category];
    if (!catBudgets) {
      for (const type of ['INCOME', 'EXPENSES', 'SAVINGS', 'DEBT']) {
        const compositeKey = type + ':' + category;
        if (budgetData[compositeKey]) { catBudgets = budgetData[compositeKey]; break; }
      }
    }
    if (!catBudgets) return 0;

    // Determine which month keys to sum based on current filters
    const year = currentTxnYear !== 'all' ? parseInt(currentTxnYear) : null;
    const period = currentTxnPeriod;

    if (period !== 'all' && period !== 'ytd') {
      // Single month
      const m = parseInt(period);
      if (year) {
        const key = `${year}-${String(m).padStart(2, '0')}`;
        return catBudgets[key] || 0;
      }
      // All years, specific month: sum across all years for that month
      return Object.entries(catBudgets)
        .filter(([k]) => parseInt(k.split('-')[1]) === m)
        .reduce((s, [, v]) => s + v, 0);
    }

    if (period === 'ytd' && year) {
      const now = new Date();
      const maxMonth = year === now.getFullYear() ? now.getMonth() + 1 : 12;
      let total = 0;
      for (let m = 1; m <= maxMonth; m++) {
        const key = `${year}-${String(m).padStart(2, '0')}`;
        total += catBudgets[key] || 0;
      }
      return total;
    }

    if (year && period === 'all') {
      // All months in a specific year
      return Object.entries(catBudgets)
        .filter(([k]) => parseInt(k.split('-')[0]) === year)
        .reduce((s, [, v]) => s + v, 0);
    }

    // All years, all months
    return Object.values(catBudgets).reduce((s, v) => s + v, 0);
  }

  let currentBreakdownType = 'all';
  let bdCollapsedSections = {};

  function filterBreakdownType(type, el) {
    currentBreakdownType = type;
    if (el) {
      document.querySelectorAll('.bd-seg-btn').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
      const pill = document.getElementById('bdSegPill');
      if (pill && el) {
        pill.style.left = el.offsetLeft + 'px';
        pill.style.width = el.offsetWidth + 'px';
      }
    }
    renderBreakdown();
  }

  function filterBreakdownTypeSelect(type) {
    currentBreakdownType = type;
    renderBreakdown();
  }

  function initBdSegPill() {
    const active = document.querySelector('.bd-seg-btn.active');
    const pill = document.getElementById('bdSegPill');
    if (active && pill) {
      pill.style.left = active.offsetLeft + 'px';
      pill.style.width = active.offsetWidth + 'px';
    }
  }

  function toggleBdSection(type) {
    bdCollapsedSections[type] = !bdCollapsedSections[type];
    const isCollapsed = bdCollapsedSections[type];
    document.querySelectorAll('.bd-items-wrap[data-type="' + type + '"]').forEach(wrap => {
      wrap.classList.toggle('collapsed', isCollapsed);
      const inner = wrap.querySelector('.bd-items-inner');
      if (inner) inner.style.display = isCollapsed ? 'none' : '';
    });
    document.querySelectorAll('.bd-chevron[data-type="' + type + '"]').forEach(chev => {
      chev.classList.toggle('collapsed', isCollapsed);
    });
  }

  // Monochromatic color palettes per section type
  function getDonutPalette(type, count) {
    const palettes = {
      'INCOME': { h: 142, s: 70, lStart: 70, lEnd: 35 },
      'EXPENSES': { h: 4, s: 75, lStart: 68, lEnd: 35 },
      'SAVINGS': { h: 215, s: 80, lStart: 70, lEnd: 38 },
      'DEBT': { h: 35, s: 80, lStart: 68, lEnd: 35 },
    };
    const p = palettes[type] || palettes['INCOME'];
    const colors = [];
    for (let i = 0; i < count; i++) {
      const t = count === 1 ? 0 : i / (count - 1);
      const l = p.lStart + (p.lEnd - p.lStart) * t;
      colors.push(`hsl(${p.h}, ${p.s}%, ${l}%)`);
    }
    return colors;
  }

  let _donutId = 0;
  function miniDonutSVG(slices, type, size = 64) {
    // slices: [{value, label, formatted}]
    const total = slices.reduce((s, d) => s + Math.abs(d.value), 0);
    if (total === 0) return '';
    const id = 'bd-donut-' + (_donutId++);
    const filtered = slices.filter(d => Math.abs(d.value) > 0);
    const colors = getDonutPalette(type, filtered.length);
    // Match Overview donut proportions: thick stroke, small gaps
    const sw = 12, r = 24, cx = 36, cy = 36, vb = 72;
    const C = 2 * Math.PI * r;
    const GAP = 2; // gap in SVG units between segments
    const totalGap = filtered.length > 1 ? filtered.length * GAP : 0;
    const usable = C - totalGap;
    let offset = 0;
    const circles = filtered.map((d, i) => {
      const pct = Math.abs(d.value) / total;
      const dash = pct * usable;
      const gap = C - dash;
      const rot = (offset / C) * 360 - 90;
      offset += dash + GAP;
      const pctStr = (pct * 100).toFixed(0) + '%';
      return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${colors[i]}" stroke-width="${sw}" stroke-dasharray="${dash} ${gap}" transform="rotate(${rot} ${cx} ${cy})" stroke-linecap="butt" class="bd-donut-slice" data-donut="${id}" data-label="${d.label}" data-amount="${d.formatted}" data-pct="${pctStr}" style="cursor:pointer;transition:stroke-width 0.2s ease,opacity 0.2s ease"/>`;
    }).join('');
    return `<div class="bd-donut-wrap" id="${id}" style="position:relative;flex-shrink:0">
      <svg class="bd-mini-donut" viewBox="0 0 ${vb} ${vb}" width="${size}" height="${size}">${circles}</svg>
      <div class="bd-donut-tip" id="${id}-tip"></div>
    </div>`;
  }

  function renderBreakdown(targetId) {
    const txns = getFilteredTxns();
    const container = document.getElementById(targetId || 'breakdownContent');
    const sym = currentCurrency === 'AED' ? 'AED ' : '$';
    const convert = (v) => currentCurrency === 'USD' ? v / AED_USD_RATE : v;
    const fmtAmt = (v) => {
      const cv = convert(v);
      if (Math.abs(cv) >= 1000) return sym + (cv / 1000).toFixed(1) + 'K';
      return sym + cv.toFixed(0);
    };
    const fmtFull = (v) => sym + convert(v).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

    const _bdDk = htmlEl.getAttribute('data-theme') !== 'light';
    const typeColors = {
      'INCOME': _bdDk ? '#30d158' : '#22863a',
      'EXPENSES': _bdDk ? '#ff453a' : '#d63031',
      'SAVINGS': _bdDk ? '#0a84ff' : '#3b82f6',
      'DEBT': _bdDk ? '#ff9f0a' : '#b08020'
    };

    // ── Pace calculation ──
    const now = new Date();
    const selYear = currentTxnYear === 'all' ? now.getFullYear() : parseInt(currentTxnYear);
    const selPeriod = currentTxnPeriod;
    let pacePct = 0;
    let paceLabel = '';
    const isSpecificMonth = selPeriod !== 'all' && selPeriod !== 'ytd';

    if (isSpecificMonth) {
      const m = parseInt(selPeriod);
      const dIM = new Date(selYear, m, 0).getDate();
      const isCurrent = (selYear === now.getFullYear() && m === now.getMonth() + 1);
      const isPast = (selYear < now.getFullYear()) || (selYear === now.getFullYear() && m < now.getMonth() + 1);
      const day = isCurrent ? now.getDate() : (isPast ? dIM : 0);
      pacePct = (day / dIM) * 100;
      paceLabel = `Day ${day} of ${dIM}`;
    } else if (selPeriod === 'ytd') {
      const mo = selYear === now.getFullYear() ? now.getMonth() + 1 : 12;
      pacePct = (mo / 12) * 100;
      paceLabel = `Month ${mo} of 12`;
    } else if (currentTxnYear !== 'all') {
      const isCY = selYear === now.getFullYear();
      const isPY = selYear < now.getFullYear();
      const mo = isCY ? now.getMonth() + 1 : (isPY ? 12 : 0);
      pacePct = (mo / 12) * 100;
      paceLabel = `Month ${mo} of 12`;
    } else {
      pacePct = 100;
      paceLabel = 'All Time';
    }

    // ── Status color logic ──
    function getStatusColor(pct, type) {
      if (type === 'DEBT') {
        return pct <= 100 ? 'green' : 'amber';
      } else if (type === 'EXPENSES') {
        if (pct > 100) return 'red';
        if (pct >= 80) return 'amber';
        return 'green';
      } else {
        if (pct >= pacePct) return 'green';
        if (pct >= pacePct * 0.7) return 'amber';
        return 'red';
      }
    }

    // Status badge logic for section header
    function getSectionStatus(totalPct, type) {
      if (type === 'INCOME' || type === 'SAVINGS') {
        if (totalPct >= 100) return { text: 'Complete', color: 'green' };
        if (totalPct >= 75) return { text: 'On track', color: 'green' };
        if (totalPct >= 40) return { text: 'In progress', color: 'amber' };
        return { text: 'Behind', color: 'red' };
      } else if (type === 'EXPENSES') {
        if (totalPct > 100) return { text: 'Over budget', color: 'red' };
        if (totalPct > 90) return { text: 'Near limit', color: 'amber' };
        return { text: 'Within budget', color: 'green' };
      } else { // DEBT
        if (totalPct >= 100) return { text: 'All settled', color: 'amber' };
        return { text: 'Partial', color: 'muted' };
      }
    }

    // Item status badge logic
    function getItemBadge(pct, type) {
      if (type === 'EXPENSES') {
        if (pct > 100) return { text: 'Over budget', cls: 'red' };
        if (pct >= 90) return { text: 'At limit', cls: 'amber' };
        return null; // show raw %
      } else if (type === 'INCOME' || type === 'SAVINGS') {
        if (pct >= 100) return { text: 'Complete', cls: 'green' };
        if (pct === 0) return { text: 'Pending', cls: 'muted' };
        return null;
      } else { // DEBT
        if (pct >= 100) return { text: 'Settled', cls: 'amber' };
        return null;
      }
    }

    // Urgency score for sorting
    function urgencyScore(pct, type) {
      if (type === 'EXPENSES' || type === 'DEBT') {
        if (pct > 100) return 1000 + pct;
        if (pct > pacePct) return 500 + pct;
        return pct;
      } else {
        if (pct < pacePct * 0.5) return 1000 - pct;
        if (pct < pacePct) return 500 - pct;
        return -pct;
      }
    }

    const allSections = [
      { type: 'INCOME', label: 'Income' },
      { type: 'EXPENSES', label: 'Expenses' },
      { type: 'SAVINGS', label: 'Savings' },
      { type: 'DEBT', label: 'Debt' },
    ];
    const sections = currentBreakdownType === 'all' ? allSections : allSections.filter(s => s.type === currentBreakdownType);

    let html = '';
    const viewFilter = document.getElementById('txnViewSelect').value;
    const detailMode = document.getElementById('txnDetailSelect').value;

    sections.forEach(sec => {
      const items = txns.filter(t => t.type === sec.type);
      const sectionCats = budgetCategories[sec.type] || [];
      const budgetNameMap = {};
      sectionCats.forEach(cat => {
        // Map plain display name -> composite key for matching transactions to budgets
        const displayName = window._budgetDisplayNames?.[cat] || cat.replace(/^[A-Z]+:/, '');
        budgetNameMap[displayName.toLowerCase().trim()] = cat;
      });

      const catMap = {};
      if (detailMode === 'category') {
        if (budgetDataLoaded) {
          for (const cat of sectionCats) {
            const parent = categoryParentMap[cat] || (window._budgetDisplayNames?.[cat] || cat.replace(/^[A-Z]+:/, ''));
            if (!catMap[parent]) catMap[parent] = { tracked: 0, budget: 0 };
            catMap[parent].budget += getCategoryBudget(cat);
          }
        }
        items.forEach(t => {
          const key = t.category.toLowerCase().trim();
          const matchedComposite = budgetNameMap[key];
          const parent = matchedComposite ? (categoryParentMap[matchedComposite] || (window._budgetDisplayNames?.[matchedComposite] || matchedComposite.replace(/^[A-Z]+:/, ''))) : (categoryParentMap[t.category] || t.category);
          if (!catMap[parent]) catMap[parent] = { tracked: 0, budget: 0 };
          catMap[parent].tracked += t.amount;
        });
      } else {
        if (budgetDataLoaded) {
          for (const cat of sectionCats) {
            const displayName = window._budgetDisplayNames?.[cat] || cat.replace(/^[A-Z]+:/, '');
            if (!catMap[displayName]) catMap[displayName] = { tracked: 0, budget: 0 };
            catMap[displayName].budget += getCategoryBudget(cat);
          }
        }
        items.forEach(t => {
          const key = t.category.toLowerCase().trim();
          const matchedComposite = budgetNameMap[key];
          const displayName = matchedComposite ? (window._budgetDisplayNames?.[matchedComposite] || matchedComposite.replace(/^[A-Z]+:/, '')) : t.category;
          if (!catMap[displayName]) catMap[displayName] = { tracked: 0, budget: getCategoryBudget(displayName) };
          catMap[displayName].tracked += t.amount;
        });
      }

      // Full totals (always from all categories, regardless of view filter)
      const allEntries = Object.entries(catMap);
      const totalTracked = allEntries.reduce((s, [, v]) => s + v.tracked, 0);
      const totalBudget = allEntries.reduce((s, [, v]) => s + v.budget, 0);

      // Filter entries for display
      let entries = allEntries;
      if (viewFilter === 'budget') entries = entries.filter(([, v]) => v.budget > 0);
      else if (viewFilter === 'tracked') entries = entries.filter(([, v]) => v.tracked > 0);
      else if (viewFilter === 'bt') entries = entries.filter(([, v]) => v.tracked > 0 || v.budget > 0);

      if (entries.length === 0 && sec.type !== 'INCOME' && sec.type !== 'EXPENSES') return;
      const gap = totalBudget - totalTracked;
      const totalPct = totalBudget > 0 ? (totalTracked / totalBudget * 100) : (totalTracked > 0 ? 100 : 0);
      const summaryBarPct = Math.min(totalPct, 100);
      const accentColor = typeColors[sec.type];

      // Context-aware headline
      let headline, headlineColor, headlineAmt;
      if (totalBudget <= 0) {
        headlineAmt = totalTracked;
        headline = fmtAmt(headlineAmt) + ' tracked';
        headlineColor = accentColor;
      } else if (sec.type === 'INCOME') {
        headlineAmt = totalTracked;
        headline = fmtAmt(headlineAmt) + ' earned';
        headlineColor = '#ffffff';
      } else if (sec.type === 'EXPENSES') {
        if (gap < 0) {
          headlineAmt = Math.abs(gap);
          headline = fmtAmt(headlineAmt) + ' over budget';
          headlineColor = '#ff453a';
        } else {
          headlineAmt = totalTracked;
          headline = fmtAmt(headlineAmt) + ' spent';
          headlineColor = '#ffffff';
        }
      } else if (sec.type === 'SAVINGS') {
        headlineAmt = totalTracked;
        headline = fmtAmt(headlineAmt) + ' saved';
        headlineColor = '#ffffff';
      } else {
        headlineAmt = totalTracked;
        headline = fmtAmt(headlineAmt) + ' settled';
        headlineColor = '#ffffff';
      }

      // Subtext
      let subtext;
      if (totalBudget <= 0) {
        subtext = 'No budget set';
      } else if (sec.type === 'EXPENSES' || sec.type === 'DEBT') {
        subtext = gap >= 0 ? fmtAmt(gap) + ' remaining of ' + fmtAmt(totalBudget) : fmtAmt(Math.abs(gap)) + ' over ' + fmtAmt(totalBudget) + ' budget';
      } else {
        subtext = gap > 0 ? fmtAmt(gap) + ' remaining to target' : fmtAmt(Math.abs(gap)) + ' over target';
      }

      // Section status badge
      const sectionSt = totalBudget > 0 ? getSectionStatus(totalPct, sec.type) : { text: 'No budget', color: 'muted' };
      const badgeColorMap = {
        green: { bg: 'rgba(48,209,88,0.18)', fg: '#30d158', border: 'rgba(48,209,88,0.30)' },
        amber: { bg: 'rgba(255,159,10,0.18)', fg: '#ff9f0a', border: 'rgba(255,159,10,0.30)' },
        red: { bg: 'rgba(255,69,58,0.18)', fg: '#ff453a', border: 'rgba(255,69,58,0.30)' },
        muted: { bg: 'rgba(255,255,255,0.08)', fg: 'rgba(255,255,255,0.35)', border: 'rgba(255,255,255,0.08)' },
        blue: { bg: 'rgba(10,132,255,0.18)', fg: '#0a84ff', border: 'rgba(10,132,255,0.30)' },
      };
      const stBadge = badgeColorMap[sectionSt.color] || badgeColorMap.muted;

      // Sort by urgency
      const sorted = entries.sort((a, b) => {
        const pctA = a[1].budget > 0 ? (a[1].tracked / a[1].budget * 100) : (a[1].tracked > 0 ? 100 : 0);
        const pctB = b[1].budget > 0 ? (b[1].tracked / b[1].budget * 100) : (b[1].tracked > 0 ? 100 : 0);
        return urgencyScore(pctB, sec.type) - urgencyScore(pctA, sec.type);
      });

      const isCollapsed = !!bdCollapsedSections[sec.type];

      // Build line items
      const itemsHTML = sorted.map(([cat, v], i) => {
        const tracked = v.tracked;
        const budget = v.budget;
        const pct = budget > 0 ? (tracked / budget * 100) : (tracked > 0 ? 100 : 0);
        const barPct = Math.min(pct, 100);
        const itemGap = budget - tracked;
        const status = budget > 0 ? getStatusColor(pct, sec.type) : 'muted';
        const colorMap = { green: '#30d158', amber: '#ff9f0a', red: '#ff453a', muted: 'rgba(255,255,255,0.35)' };
        const gapAmt = Math.abs(itemGap);

        let itemGapText;
        if (budget <= 0) {
          itemGapText = fmtAmt(tracked);
        } else if (sec.type === 'INCOME' || sec.type === 'SAVINGS') {
          itemGapText = itemGap <= 0 ? '+' + fmtAmt(gapAmt) : '-' + fmtAmt(gapAmt);
        } else {
          itemGapText = itemGap >= 0 ? fmtAmt(gapAmt) + ' left' : fmtAmt(gapAmt) + ' over';
        }

        // Badge or raw %
        const badge = budget > 0 ? getItemBadge(pct, sec.type) : null;
        let chipHTML;
        if (badge) {
          const bc = badgeColorMap[badge.cls] || badgeColorMap.muted;
          chipHTML = `<span class="bd-item-chip" style="background:${bc.bg};color:${bc.fg};border:1px solid ${bc.border}">${badge.text}</span>`;
        } else if (budget > 0) {
          chipHTML = `<span style="font-size:12px;color:${accentColor};opacity:0.7;font-variant-numeric:tabular-nums">${pct.toFixed(0)}%</span>`;
        } else {
          chipHTML = `<span class="bd-item-chip bd-chip-muted">--</span>`;
        }

        // Over budget glow
        const isOver = pct > 100;
        const barShadow = isOver ? `box-shadow:0 0 8px ${accentColor}55` : '';

        const pctText = budget > 0 ? Math.round(pct) + '%' : '';
        return `
          <div class="bd-item">
            <div class="bd-item-row1">
              <span class="bd-item-name">${cat}</span>
              <span class="bd-item-gap" style="color:${colorMap[status]}">${itemGapText}</span>
            </div>
            ${tickBarHTML(barPct, accentColor, 60, 80 + i * 30)}
            <div class="bd-item-row3">
              <span class="bd-item-meta">${fmtAmt(tracked)} / ${budget > 0 ? fmtAmt(budget) : '--'}</span>
              <span style="display:flex;align-items:center;gap:6px;">
                ${pctText ? `<span class="bd-item-meta">${pctText}</span>` : ''}
                ${chipHTML}
              </span>
            </div>
          </div>`;
      }).join('');

      const chevronSvg = `<svg class="bd-chevron ${isCollapsed ? 'collapsed' : ''}" data-type="${sec.type}" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="4 6 8 10 12 6"/></svg>`;

      // Mini donut: category allocation for this section
      const donutSlices = sorted.filter(([, v]) => Math.abs(v.tracked) > 0).map(([cat, v]) => ({
        value: Math.abs(v.tracked),
        label: cat,
        formatted: fmtAmt(Math.abs(v.tracked))
      }));
      const donutSVG = miniDonutSVG(donutSlices, sec.type, 64);

      html += `
        <div class="breakdown-section" style="animation-delay:${sections.indexOf(sec) * 50}ms">
          <div class="bd-header" onclick="toggleBdSection('${sec.type}')" style="display:flex;gap:12px;align-items:center;">
            <div style="flex:1;min-width:0;">
              <div class="bd-header-top">
                <span class="bd-type-label" style="color:${accentColor}">${sec.label.toUpperCase()}</span>
                <span class="bd-status-badge" style="background:${stBadge.bg};color:${stBadge.fg};border:1px solid ${stBadge.border}">${sectionSt.text}</span>
                <span class="bd-item-count">${sorted.length} item${sorted.length !== 1 ? 's' : ''}</span>
                ${chevronSvg}
              </div>
            <div class="bd-headline" style="color:${headlineColor}" data-animate-amt="${headlineAmt}" data-suffix="${headline.replace(fmtAmt(headlineAmt), '')}">${headline}</div>
            <div class="bd-subtext">${subtext}</div>
            </div>
            ${donutSVG}
          </div>
          <div class="bd-summary-bar">
            <div class="bd-summary-fill" data-target-width="${summaryBarPct}%" style="width:0;background:${accentColor};opacity:0.65"></div>
          </div>
          <div class="bd-items-wrap ${isCollapsed ? 'collapsed' : ''}" data-type="${sec.type}">
            <div class="bd-items-inner" style="${isCollapsed ? 'display:none' : ''}">
              ${sorted.length === 0 ? `<div style="color:rgba(255,255,255,0.35);text-align:center;padding:20px 0;font-size:12px;">No ${sec.label.toLowerCase()} recorded</div>` : itemsHTML}
            </div>
          </div>
        </div>`;
    });

    container.innerHTML = html;

    // Animate bars + headline numbers
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        container.querySelectorAll('.bd-summary-fill').forEach(bar => {
          const target = bar.getAttribute('data-target-width');
          setTimeout(() => { bar.style.width = target; }, 50);
        });
        animateTickBars(container);
        // Count-up on headline amounts
        container.querySelectorAll('.bd-headline[data-animate-amt]').forEach(el => {
          const amt = parseFloat(el.getAttribute('data-animate-amt'));
          const suffix = el.getAttribute('data-suffix') || '';
          if (amt > 0) {
            animateValue(el, amt, 1200, (v) => fmtAmt(v) + suffix);
          }
        });
      });
    });

    // Donut hover + touch-and-drag tooltips
    function showAllocSliceTip(slice, touchX, touchY) {
      if (!slice) return;
      const donutId = slice.getAttribute('data-donut');
      const tip = document.getElementById(donutId + '-tip');
      if (!tip) return;
      tip.innerHTML = `<div class="bd-donut-tip-label">${slice.getAttribute('data-label')}</div>
        <div class="bd-donut-tip-row"><span class="bd-donut-tip-amount">${slice.getAttribute('data-amount')}</span><span class="bd-donut-tip-pct">${slice.getAttribute('data-pct')}</span></div>`;
      tip.classList.add('visible');
      // Clamp tooltip to viewport if touch coordinates provided
      if (touchX !== undefined) {
        const wrap = document.getElementById(donutId);
        if (wrap) {
          const wrapRect = wrap.getBoundingClientRect();
          const tipW = tip.offsetWidth;
          const rawLeft = touchX - wrapRect.left - tipW / 2;
          const maxLeft = window.innerWidth - wrapRect.left - tipW - 8;
          const minLeft = -wrapRect.left + 8;
          tip.style.left = Math.max(minLeft, Math.min(maxLeft, rawLeft)) + 'px';
          tip.style.transform = 'translateY(0)';
        }
      }
      const siblings = document.querySelectorAll(`.bd-donut-slice[data-donut="${donutId}"]`);
      siblings.forEach(s => { s.style.opacity = s === slice ? '' : '0.35'; });
    }
    function hideAllocSliceTip(slice) {
      if (!slice) return;
      const donutId = slice.getAttribute('data-donut');
      const tip = document.getElementById(donutId + '-tip');
      if (tip) tip.classList.remove('visible');
      const siblings = document.querySelectorAll(`.bd-donut-slice[data-donut="${donutId}"]`);
      siblings.forEach(s => { s.style.opacity = ''; });
    }
    container.querySelectorAll('.bd-donut-slice').forEach(slice => {
      slice.addEventListener('mouseenter', function() { showAllocSliceTip(this); });
      slice.addEventListener('mouseleave', function() { hideAllocSliceTip(this); });
    });
    // Touch-and-drag on allocation bars
    let allocTouching = false;
    let allocLastSlice = null;
    container.addEventListener('touchstart', (e) => {
      const tx = e.touches[0].clientX, ty = e.touches[0].clientY;
      const slice = document.elementFromPoint(tx, ty);
      if (slice && slice.classList.contains('bd-donut-slice')) {
        e.preventDefault();
        allocTouching = true;
        allocLastSlice = slice;
        showAllocSliceTip(slice, tx, ty);
      }
    }, { passive: false });
    container.addEventListener('touchmove', (e) => {
      if (!allocTouching) return;
      e.preventDefault();
      const tx = e.touches[0].clientX, ty = e.touches[0].clientY;
      const el = document.elementFromPoint(tx, ty);
      if (el && el.classList.contains('bd-donut-slice') && el !== allocLastSlice) {
        if (allocLastSlice) hideAllocSliceTip(allocLastSlice);
        allocLastSlice = el;
        showAllocSliceTip(el, tx, ty);
      }
    }, { passive: false });
    container.addEventListener('touchend', () => {
      allocTouching = false;
      if (allocLastSlice) { hideAllocSliceTip(allocLastSlice); allocLastSlice = null; }
    });
  }

  let summaryBarChartInstance = null;
  let summaryVisibleSections = { INCOME: true, EXPENSES: true, SAVINGS: true, DEBT: true };

  function initSummaryToggles() {
    const container = document.getElementById('summaryChartToggles');
    if (!container) return;
    const isDk = htmlEl.getAttribute('data-theme') === 'dark';
    const sections = [
      { type: 'INCOME', label: 'Income', color: isDk ? '#30d158' : '#16a34a' },
      { type: 'EXPENSES', label: 'Expenses', color: isDk ? '#ff453a' : '#dc2626' },
      { type: 'SAVINGS', label: 'Savings', color: isDk ? '#0a84ff' : '#0071e3' },
      { type: 'DEBT', label: 'Debt', color: isDk ? '#fbbf24' : '#d97706' },
    ];
    container.innerHTML = sections.map(sec => `
      <div class="chart-toggle ${summaryVisibleSections[sec.type] ? '' : 'off'}" data-type="${sec.type}" onclick="toggleSummarySection('${sec.type}', this)">
        <span class="toggle-dot" style="background:${sec.color}"></span>
        <span>${sec.label}</span>
      </div>
    `).join('');
  }

  function toggleSummarySection(type, el) {
    summaryVisibleSections[type] = !summaryVisibleSections[type];
    el.classList.toggle('off', !summaryVisibleSections[type]);
    renderTxnSummaryChart(true);
  }

  let insightsTrendsChartInstance = null;

  function renderInsightsPage() {
    const isDark = htmlEl.getAttribute('data-theme') !== 'light';
    const convert = (v) => currentCurrency === 'USD' ? v / AED_USD_RATE : v;
    const curSymbol = currentCurrency === 'USD' ? '$' : 'AED ';
    const fmtK = (v) => {
      const av = Math.abs(v);
      if (av >= 1000) return (v / 1000).toFixed(1) + 'K';
      return v.toFixed(0);
    };

    const year = currentTxnYear !== 'all' ? parseInt(currentTxnYear) : new Date().getFullYear();
    const now = new Date();

    // --- 1. Compute monthly data for the year ---
    const monthlyData = [];
    for (let m = 1; m <= 12; m++) {
      const income = allTransactions.filter(t => {
        if (t.type !== 'INCOME') return false;
        const d = parseTxnDate(t.date);
        return d.getFullYear() === year && d.getMonth() + 1 === m;
      }).reduce((s, t) => s + t.amount, 0);

      const expenses = allTransactions.filter(t => {
        if (t.type !== 'EXPENSES') return false;
        const d = parseTxnDate(t.date);
        return d.getFullYear() === year && d.getMonth() + 1 === m;
      }).reduce((s, t) => s + t.amount, 0);

      const savings = allTransactions.filter(t => {
        if (t.type !== 'SAVINGS') return false;
        const d = parseTxnDate(t.date);
        return d.getFullYear() === year && d.getMonth() + 1 === m;
      }).reduce((s, t) => s + t.amount, 0);

      const debt = allTransactions.filter(t => {
        if (t.type !== 'DEBT') return false;
        const d = parseTxnDate(t.date);
        return d.getFullYear() === year && d.getMonth() + 1 === m;
      }).reduce((s, t) => s + t.amount, 0);

      const totalOut = expenses + savings + debt;
      const netFlow = income - totalOut;
      const sr = income > 0 ? ((income - totalOut) / income * 100) : 0;
      monthlyData.push({ m, income, expenses, savings, debt, totalOut, netFlow, sr });
    }

    // Filter to months with data
    const withData = monthlyData.filter(d => d.income > 0 || d.totalOut > 0);

    // Current period data
    const txns = getFilteredTxns();
    const curIncome = convert(txns.filter(t => t.type === 'INCOME').reduce((s, t) => s + t.amount, 0));
    const curExpenses = convert(txns.filter(t => t.type === 'EXPENSES').reduce((s, t) => s + t.amount, 0));
    const curSavings = convert(txns.filter(t => t.type === 'SAVINGS').reduce((s, t) => s + t.amount, 0));
    const curDebt = convert(txns.filter(t => t.type === 'DEBT').reduce((s, t) => s + t.amount, 0));
    const curTotalOut = curExpenses + curSavings + curDebt;
    const curNetFlow = curIncome - curTotalOut;
    const curSR = curIncome > 0 ? ((curIncome - curTotalOut) / curIncome * 100) : 0;

    // --- 2. Savings Rate Card ---
    const srEl = document.getElementById('insightSrValue');
    const srSubEl = document.getElementById('insightSrSub');
    if (srEl) {
      srEl.style.color = curSR >= 0 ? 'var(--emerald)' : 'var(--red)';
      animateValue(srEl, curSR, 1200, (v) => v.toFixed(1) + '%');
    }
    if (srSubEl) {
      const prevMonths = withData.slice(-3);
      if (prevMonths.length > 1) {
        const avgSR = prevMonths.reduce((s, d) => s + d.sr, 0) / prevMonths.length;
        const diff = curSR - avgSR;
        srSubEl.textContent = (diff >= 0 ? '+' : '') + diff.toFixed(1) + '% vs 3-mo avg';
      } else {
        srSubEl.textContent = 'of gross income saved';
      }
    }

    // Savings Rate sparkline
    const srSparkEl = document.getElementById('insightSrSparkline');
    if (srSparkEl && withData.length > 1) {
      const vals = withData.map(d => d.sr);
      srSparkEl.innerHTML = buildMiniSparkline(vals, isDark ? '#30d158' : '#16a34a');
    }

    // --- 3. Net Cash Flow Card ---
    const nfEl = document.getElementById('insightNfValue');
    const nfSubEl = document.getElementById('insightNfSub');
    if (nfEl) {
      const nfConverted = curNetFlow;
      const nfSign = nfConverted >= 0 ? '+' : '-';
      nfEl.style.color = nfConverted >= 0 ? 'var(--emerald)' : 'var(--red)';
      animateValue(nfEl, Math.abs(nfConverted), 1200, (v) => nfSign + curSymbol + fmtK(v));
    }
    if (nfSubEl) {
      nfSubEl.textContent = curSymbol + fmtK(curIncome) + ' in, ' + curSymbol + fmtK(curTotalOut) + ' out';
    }

    // Net Flow sparkline
    const nfSparkEl = document.getElementById('insightNfSparkline');
    if (nfSparkEl && withData.length > 1) {
      const vals = withData.map(d => convert(d.netFlow));
      nfSparkEl.innerHTML = buildMiniSparkline(vals, isDark ? '#5aa8f5' : '#3b82f6');
    }

    // --- 4. Budget Adherence Card ---
    const bhEl = document.getElementById('insightBhValue');
    const bhSubEl = document.getElementById('insightBhSub');
    const bhBarEl = document.getElementById('insightBhBar');

    let onTrack = 0, totalCats = 0;
    ['INCOME', 'EXPENSES', 'SAVINGS', 'DEBT'].forEach(type => {
      const cats = budgetCategories[type] || [];
      cats.forEach(cat => {
        const budget = getCategoryBudget(cat);
        if (!budget || budget === 0) return;
        totalCats++;
        const tracked = txns.filter(t => t.category.toLowerCase().trim() === cat.toLowerCase().trim() && t.type === type)
          .reduce((s, t) => s + t.amount, 0);
        const pct = tracked / budget;
        if (type === 'INCOME' || type === 'SAVINGS') {
          if (pct >= 0.8) onTrack++;
        } else {
          if (pct <= 1.1) onTrack++;
        }
      });
    });

    const adherencePct = totalCats > 0 ? (onTrack / totalCats * 100) : 0;
    if (bhEl) {
      animateValue(bhEl, onTrack, 1200, (v) => Math.round(v) + '/' + totalCats);
    }
    if (bhSubEl) {
      bhSubEl.textContent = 'categories on track (' + adherencePct.toFixed(0) + '%)';
    }
    if (bhBarEl) {
      const fillColor = adherencePct >= 70 ? (isDark ? '#30d158' : '#16a34a') :
                         adherencePct >= 40 ? (isDark ? '#fbbf24' : '#d97706') :
                         (isDark ? '#ff453a' : '#dc2626');
      bhBarEl.innerHTML = `<div class="insight-metric-bar-fill" style="width:0%;background:${fillColor}"></div>`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const fill = bhBarEl.querySelector('.insight-metric-bar-fill');
          if (fill) fill.style.width = adherencePct + '%';
        });
      });
    }

    // --- 5. Spending Heatmap ---
    renderSpendingHeatmap(year);

    // --- 6. Spending Trends (stacked area chart, top 5 expense categories) ---
    renderSpendingTrends(year, withData);

    // --- 7. Top Movers ---
    renderTopMovers(year);
  }

  let _heatmapAbort = null;
  function renderSpendingHeatmap(year) {
    const container = document.getElementById('spendingHeatmap');
    if (!container) return;
    if (_heatmapAbort) _heatmapAbort.abort();
    _heatmapAbort = new AbortController();
    const _hsig = { signal: _heatmapAbort.signal };

    const isDark = htmlEl.getAttribute('data-theme') !== 'light';
    const convert = (v) => currentCurrency === 'USD' ? v / AED_USD_RATE : v;
    const curSymbol = currentCurrency === 'USD' ? '$' : 'AED ';
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Build daily spending map for the year
    const dailySpend = {};
    allTransactions.forEach(t => {
      if (t.type !== 'EXPENSES') return;
      const d = parseTxnDate(t.date);
      if (d.getFullYear() !== year) return;
      const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      dailySpend[key] = (dailySpend[key] || 0) + t.amount;
    });

    // Find max spending for color scaling
    const values = Object.values(dailySpend);
    const maxSpend = values.length > 0 ? Math.max(...values) : 1;

    // Build 53 weeks x 7 days grid (Jan 1 = first column)
    const jan1 = new Date(year, 0, 1);
    const startDow = jan1.getDay(); // 0=Sun, 1=Mon... We want Mon=0
    // Adjust so Monday = row 0
    const mondayOffset = (startDow === 0) ? 6 : startDow - 1;

    const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    // Generate all days of the year
    const daysInYear = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 366 : 365;

    // Build week columns
    const weeks = [];
    let currentWeek = new Array(mondayOffset).fill(null); // pad first week

    for (let dayNum = 0; dayNum < daysInYear; dayNum++) {
      const date = new Date(year, 0, 1 + dayNum);
      const key = `${year}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
      const spend = dailySpend[key] || 0;
      const isFuture = date > today;

      currentWeek.push({ date, key, spend, isFuture });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) currentWeek.push(null);
      weeks.push(currentWeek);
    }

    // Color function
    function cellColor(spend, isFuture) {
      if (isFuture) return isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.02)';
      if (spend === 0) return isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';
      const intensity = Math.min(spend / maxSpend, 1);
      if (isDark) {
        // Green (low) -> Yellow -> Red (high)
        if (intensity < 0.33) {
          const t = intensity / 0.33;
          const r = Math.round(48 + t * 207);
          const g = Math.round(209 - t * 50);
          const b = Math.round(88 - t * 60);
          return `rgb(${r},${g},${b})`;
        } else if (intensity < 0.66) {
          const t = (intensity - 0.33) / 0.33;
          const r = Math.round(255);
          const g = Math.round(159 - t * 80);
          const b = Math.round(28 - t * 18);
          return `rgb(${r},${g},${b})`;
        } else {
          const t = (intensity - 0.66) / 0.34;
          const r = Math.round(255);
          const g = Math.round(79 - t * 40);
          const b = Math.round(10 + t * 48);
          return `rgb(${r},${g},${b})`;
        }
      } else {
        if (intensity < 0.33) {
          const t = intensity / 0.33;
          return `rgba(34,134,58,${0.15 + t * 0.25})`;
        } else if (intensity < 0.66) {
          const t = (intensity - 0.33) / 0.33;
          return `rgba(214,48,49,${0.2 + t * 0.3})`;
        } else {
          const t = (intensity - 0.66) / 0.34;
          return `rgba(214,48,49,${0.5 + t * 0.4})`;
        }
      }
    }

    // Month labels positioned at the correct week
    const monthPositions = [];
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
      for (const cell of week) {
        if (cell && cell.date) {
          const m = cell.date.getMonth();
          if (m !== lastMonth) {
            monthPositions.push({ week: wi, label: monthNames[m] });
            lastMonth = m;
          }
          break;
        }
      }
    });

    // Build HTML
    const totalWeeks = weeks.length;
    let html = '<div class="heatmap-months">';
    let mIdx = 0;
    for (let w = 0; w < totalWeeks; w++) {
      if (mIdx < monthPositions.length && monthPositions[mIdx].week === w) {
        const spanWeeks = mIdx + 1 < monthPositions.length ? monthPositions[mIdx+1].week - w : totalWeeks - w;
        const pct = (spanWeeks / totalWeeks * 100).toFixed(2);
        html += `<span class="heatmap-month-label" style="width:${pct}%">${monthPositions[mIdx].label}</span>`;
        mIdx++;
      }
    }
    html += '</div>';

    html += '<div style="display:flex">';
    html += '<div class="heatmap-labels">';
    dayNames.forEach(d => { html += `<div class="heatmap-label">${d}</div>`; });
    html += '</div>';

    html += '<div class="heatmap-grid">';
    weeks.forEach(week => {
      html += '<div class="heatmap-col">';
      week.forEach(cell => {
        if (!cell) {
          html += '<div class="heatmap-cell" style="visibility:hidden"></div>';
        } else {
          const color = cellColor(cell.spend, cell.isFuture);
          const dateStr = cell.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          const tip = cell.isFuture ? dateStr : `${dateStr}: ${curSymbol}${convert(cell.spend).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
          const isToday = cell.date.getTime() === today.getTime();
          const todayCls = isToday ? ' heatmap-today' : '';
          const dateKey = cell.key;
          html += `<div class="heatmap-cell${todayCls}" style="background:${color}" data-tip="${tip}" data-date="${dateKey}"></div>`;
        }
      });
      html += '</div>';
    });
    html += '</div></div>';

    container.innerHTML = html;

    // Floating tooltip (avoids overflow:hidden clipping)
    let tooltip = document.getElementById('heatmapTooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'heatmapTooltip';
      tooltip.className = 'heatmap-tooltip';
      document.body.appendChild(tooltip);
    }

    function showHeatmapTip(cell) {
      if (!cell || !cell.getAttribute('data-tip')) { tooltip.classList.remove('visible'); return; }
      tooltip.textContent = cell.getAttribute('data-tip');
      const rect = cell.getBoundingClientRect();
      const isMobile = 'ontouchstart' in window;
      const offsetY = isMobile ? 40 : 8;
      tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
      tooltip.style.top = (rect.top - tooltip.offsetHeight - offsetY) + 'px';
      tooltip.classList.add('visible');
      // Highlight cell
      container.querySelectorAll('.heatmap-cell.heatmap-active').forEach(c => c.classList.remove('heatmap-active'));
      cell.classList.add('heatmap-active');
    }
    // Desktop hover
    container.addEventListener('mouseover', (e) => {
      showHeatmapTip(e.target.closest('.heatmap-cell[data-tip]'));
    }, _hsig);
    container.addEventListener('mouseout', (e) => {
      if (!e.target.closest('.heatmap-cell[data-tip]')) {
        tooltip.classList.remove('visible');
        container.querySelectorAll('.heatmap-cell.heatmap-active').forEach(c => c.classList.remove('heatmap-active'));
      }
    }, _hsig);
    // Mobile: touch-and-drag
    let heatmapTouching = false;
    container.addEventListener('touchstart', (e) => {
      const cell = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
      if (cell && cell.classList.contains('heatmap-cell')) {
        e.preventDefault();
        heatmapTouching = true;
        showHeatmapTip(cell);
      }
    }, { passive: false, signal: _heatmapAbort.signal });
    container.addEventListener('touchmove', (e) => {
      if (!heatmapTouching) return;
      e.preventDefault();
      const cell = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
      if (cell && cell.classList.contains('heatmap-cell')) {
        showHeatmapTip(cell);
      }
    }, { passive: false, signal: _heatmapAbort.signal });
    function endHeatmapTouch() {
      heatmapTouching = false;
      tooltip.classList.remove('visible');
      container.querySelectorAll('.heatmap-cell.heatmap-active').forEach(c => c.classList.remove('heatmap-active'));
    }
    container.addEventListener('touchend', endHeatmapTouch, _hsig);
    container.addEventListener('touchcancel', endHeatmapTouch, _hsig);
    document.addEventListener('touchend', () => { if (heatmapTouching) endHeatmapTouch(); }, _hsig);

    // Click to navigate to All Txns with that date filtered
    container.addEventListener('click', (e) => {
      const cell = e.target.closest('.heatmap-cell[data-date]');
      if (!cell) return;
      const dateKey = cell.getAttribute('data-date');
      if (!dateKey) return;
      const [y, m, d] = dateKey.split('-').map(Number);
      // Set year/month filters
      document.getElementById('txnYearSelect').value = String(y);
      document.getElementById('txnPeriodSelect').value = String(m);
      currentTxnYear = String(y);
      currentTxnPeriod = String(m);
      // Set calendar date filter to this specific day
      const pad = (n) => n < 10 ? '0' + n : '' + n;
      currentCalDate = pad(d) + '/' + pad(m) + '/' + y;
      calViewYear = y;
      calViewMonth = m - 1;
      const btn = document.getElementById('txnCalBtn');
      const label = document.getElementById('txnCalLabel');
      const months = MONTH_NAMES;
      if (btn) btn.classList.add('has-date');
      if (label) label.textContent = months[m - 1] + ' ' + d;
      // Switch to All Txns tab and re-render with new filters
      const listTab = document.querySelector('.txn-bottom-tabs .tab:last-child');
      if (listTab) switchTxnTab('list', listTab);
      renderTxnTable();
      // Hide tooltip
      tooltip.classList.remove('visible');
    });
  }

  function buildMiniSparkline(values, color) {
    if (!values.length) return '';
    const w = 120, h = 32, pad = 2;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const pts = values.map((v, i) => {
      const x = pad + (i / Math.max(values.length - 1, 1)) * (w - pad * 2);
      const y = h - pad - ((v - min) / range) * (h - pad * 2);
      return `${x},${y}`;
    });
    const gradId = 'sg' + Math.random().toString(36).slice(2, 8);
    const lastPt = pts[pts.length - 1];
    const areaPath = `M${pts[0]} ${pts.map((p, i) => i === 0 ? '' : `L${p}`).join(' ')} L${w - pad},${h} L${pad},${h} Z`;
    // Last point as percentage for the dot overlay
    const lastX = lastPt.split(',')[0];
    const lastY = lastPt.split(',')[1];
    const dotLeftPct = (parseFloat(lastX) / w * 100).toFixed(1);
    const dotTopPct = (parseFloat(lastY) / h * 100).toFixed(1);
    return `<div style="position:relative;width:100%;height:100%">
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%">
        <defs><linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
        </linearGradient></defs>
        <path d="${areaPath}" fill="url(#${gradId})"/>
        <polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div style="position:absolute;left:${dotLeftPct}%;top:${dotTopPct}%;width:5px;height:5px;border-radius:50%;background:${color};transform:translate(-50%,-50%)"></div>
    </div>`;
  }

  function renderSpendingTrends(year, withData) {
    const canvas = document.getElementById('insightsTrendsChart');
    if (!canvas || !window.Chart) return;
    if (insightsTrendsChartInstance) insightsTrendsChartInstance.destroy();

    const isDark = htmlEl.getAttribute('data-theme') !== 'light';
    const tc = getThemeColors();
    const convert = (v) => currentCurrency === 'USD' ? v / AED_USD_RATE : v;
    const curSymbol = currentCurrency === 'USD' ? '$' : 'AED ';
    const monthLabels = MONTH_NAMES;

    // Get top 5 expense categories by total amount
    const catTotals = {};
    allTransactions.forEach(t => {
      if (t.type !== 'EXPENSES') return;
      const d = parseTxnDate(t.date);
      if (d.getFullYear() !== year) return;
      const cat = t.category;
      catTotals[cat] = (catTotals[cat] || 0) + t.amount;
    });
    const top5 = Object.entries(catTotals).sort((a, b) => b[1] - a[1]).slice(0, 5);
    if (top5.length === 0) return;

    const colors = isDark
      ? ['#ff453a', '#ff6b6b', '#fbbf24', '#ff9f0a', '#e8a435']
      : ['#dc2626', '#ef4444', '#d97706', '#ea580c', '#b45309'];

    const datasets = top5.map(([cat], i) => {
      const data = [];
      for (let m = 1; m <= 12; m++) {
        let total = 0;
        allTransactions.forEach(t => {
          if (t.type !== 'EXPENSES' || t.category !== cat) return;
          const d = parseTxnDate(t.date);
          if (d.getFullYear() === year && d.getMonth() + 1 === m) total += t.amount;
        });
        data.push(convert(total));
      }
      return {
        label: cat,
        data,
        borderColor: colors[i % colors.length],
        backgroundColor: colors[i % colors.length] + '20',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
      };
    });

    insightsTrendsChartInstance = new Chart(canvas, {
      type: 'line',
      data: { labels: monthLabels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove', 'touchend'],
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 8, boxHeight: 8, padding: 8,
              font: { size: 9, family: "'Outfit', sans-serif" },
              color: tc.text,
              usePointStyle: true,
              pointStyle: 'circle',
            }
          },
          tooltip: {
            enabled: false,
            external: externalTooltipHandler,
            callbacks: {
              label: (ctx) => {
                const val = ctx.parsed.y;
                if (val === 0) return null;
                return `${ctx.dataset.label}: ${curSymbol}${val.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
              }
            }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 }, color: tc.text } },
          y: {
            grid: { color: tc.grid },
            ticks: {
              font: { size: 9 }, color: tc.text,
              callback: (v) => curSymbol + (v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v)
            }
          }
        }
      }
    });
  }

  function renderTopMovers(year) {
    const container = document.getElementById('insightsMoversList');
    if (!container) return;

    const convert = (v) => currentCurrency === 'USD' ? v / AED_USD_RATE : v;
    const curSymbol = currentCurrency === 'USD' ? '$' : 'AED ';
    const isDark = htmlEl.getAttribute('data-theme') !== 'light';

    // Determine current and previous month
    const now = new Date();
    let curMonth, prevMonth, curYear, prevYear;

    if (currentTxnPeriod !== 'all' && currentTxnPeriod !== 'ytd') {
      curMonth = parseInt(currentTxnPeriod);
      curYear = currentTxnYear !== 'all' ? parseInt(currentTxnYear) : now.getFullYear();
      prevMonth = curMonth === 1 ? 12 : curMonth - 1;
      prevYear = curMonth === 1 ? curYear - 1 : curYear;
    } else {
      curMonth = now.getMonth() + 1;
      curYear = currentTxnYear !== 'all' ? parseInt(currentTxnYear) : now.getFullYear();
      prevMonth = curMonth === 1 ? 12 : curMonth - 1;
      prevYear = curMonth === 1 ? curYear - 1 : curYear;
    }

    // Aggregate expenses by category for current and prev month
    const curCats = {}, prevCats = {};
    allTransactions.forEach(t => {
      if (t.type !== 'EXPENSES') return;
      const d = parseTxnDate(t.date);
      const m = d.getMonth() + 1, y = d.getFullYear();
      if (y === curYear && m === curMonth) {
        curCats[t.category] = (curCats[t.category] || 0) + t.amount;
      }
      if (y === prevYear && m === prevMonth) {
        prevCats[t.category] = (prevCats[t.category] || 0) + t.amount;
      }
    });

    // Calculate changes
    const allCats = new Set([...Object.keys(curCats), ...Object.keys(prevCats)]);
    const movers = [];
    allCats.forEach(cat => {
      const cur = curCats[cat] || 0;
      const prev = prevCats[cat] || 0;
      const diff = cur - prev;
      const pctChange = prev > 0 ? ((cur - prev) / prev * 100) : (cur > 0 ? 100 : 0);
      if (Math.abs(diff) > 0) movers.push({ cat, cur, prev, diff, pctChange });
    });

    // Sort by absolute difference
    movers.sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));
    const top5 = movers.slice(0, 5);

    if (top5.length === 0) {
      container.innerHTML = '<div style="color:var(--text-3);text-align:center;padding:40px 0;font-size:12px;">No data to compare</div>';
      return;
    }

    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    container.innerHTML = top5.map(m => {
      const isUp = m.diff > 0;
      const isNew = m.prev === 0 && m.cur > 0;
      const cls = isNew ? 'mover-new' : (isUp ? 'mover-up' : 'mover-down');
      const arrow = isNew ? '' : (isUp ? '&#x25B2; ' : '&#x25BC; ');
      const pctText = isNew ? 'NEW' : (Math.abs(m.pctChange) > 999 ? '>999%' : Math.abs(m.pctChange).toFixed(0) + '%');
      const amtText = curSymbol + convert(Math.abs(m.diff)).toLocaleString('en-US', { maximumFractionDigits: 0 });
      return `<div class="mover-row ${cls}">
        <span class="mover-name">${m.cat}</span>
        <span class="mover-amount">${isUp ? '+' : '-'}${amtText}</span>
        <span class="mover-pct">${arrow}${pctText}</span>
      </div>`;
    }).join('');
  }

  function renderTxnSummaryChart(skipToggles) {
    const canvas = document.getElementById('summaryBarChart');
    if (!canvas) return;
    if (summaryBarChartInstance) summaryBarChartInstance.destroy();
    if (!skipToggles) initSummaryToggles();

    const tc = getThemeColors();
    const year = currentTxnYear !== 'all' ? parseInt(currentTxnYear) : new Date().getFullYear();
    const period = currentTxnPeriod;
    const now = new Date();
    const monthLabels = MONTH_NAMES;

    // Determine which months are "active" (colored) vs greyed
    const activeMonths = new Set();
    if (period === 'all' || currentTxnYear === 'all') {
      for (let m = 1; m <= 12; m++) activeMonths.add(m);
    } else if (period === 'ytd') {
      const maxM = year === now.getFullYear() ? now.getMonth() + 1 : 12;
      for (let m = 1; m <= maxM; m++) activeMonths.add(m);
    } else {
      activeMonths.add(parseInt(period));
    }

    const isDark = htmlEl.getAttribute('data-theme') === 'dark';
    const allSections = [
      { type: 'INCOME', label: 'Income', color: isDark ? '#30d158' : '#16a34a' },
      { type: 'EXPENSES', label: 'Expenses', color: isDark ? '#ff453a' : '#dc2626' },
      { type: 'SAVINGS', label: 'Savings', color: isDark ? '#0a84ff' : '#0071e3' },
      { type: 'DEBT', label: 'Debt', color: isDark ? '#fbbf24' : '#d97706' },
    ];
    const sections = allSections.filter(s => summaryVisibleSections[s.type]);

    const convert = (v) => currentCurrency === 'USD' ? v / AED_USD_RATE : v;
    const greyColor = tc.text.replace(/[\d.]+\)$/, '0.12)');

    // For each section: budget bar behind, tracked bar in front
    // Use categoryPercentage/barPercentage to make tracked narrower than budget
    const datasets = [];

    sections.forEach((sec) => {
      const trackedData = [];
      const budgetData_ = [];

      for (let m = 1; m <= 12; m++) {
        const key = `${year}-${String(m).padStart(2, '0')}`;

        let tracked = 0;
        allTransactions.forEach(t => {
          if (t.type !== sec.type) return;
          const d = parseTxnDate(t.date);
          if (d.getFullYear() === year && d.getMonth() + 1 === m) {
            tracked += t.amount;
          }
        });

        let budget = 0;
        const sectionCats = budgetCategories[sec.type] || [];
        sectionCats.forEach(cat => {
          if (budgetData[cat] && budgetData[cat][key]) {
            budget += budgetData[cat][key];
          }
        });

        trackedData.push(convert(tracked));
        budgetData_.push(convert(budget));
      }

      // Budget bar (the full-height container, lighter — drawn first/behind)
      datasets.push({
        label: sec.label + ' Budget',
        data: budgetData_,
        backgroundColor: monthLabels.map((_, i) => activeMonths.has(i + 1) ? sec.color + '25' : greyColor),
        borderColor: monthLabels.map((_, i) => activeMonths.has(i + 1) ? sec.color + '50' : 'transparent'),
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
        stack: sec.type,
        order: 2,
        categoryPercentage: 0.8,
        barPercentage: 0.9,
      });

      // Tracked bar (fills up inside budget bar, solid — drawn last/in front)
      datasets.push({
        label: sec.label + ' Tracked',
        data: trackedData,
        backgroundColor: monthLabels.map((_, i) => activeMonths.has(i + 1) ? sec.color : greyColor),
        borderRadius: 4,
        borderSkipped: false,
        stack: sec.type,
        order: 1,
        categoryPercentage: 0.8,
        barPercentage: 0.9,
      });
    });

    const curSymbol = currentCurrency === 'USD' ? '$' : 'AED ';

    summaryBarChartInstance = new Chart(canvas, {
      type: 'bar',
      data: { labels: monthLabels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'nearest', axis: 'x', intersect: false },
        events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove', 'touchend'],
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: false,
            external: externalTooltipHandler,
            callbacks: {
              beforeBody: (items) => {
                if (!items.length) return [];
                const ctx = items[0];
                const stack = ctx.dataset.stack;
                const month = ctx.dataIndex;
                const paired = datasets.filter(d => d.stack === stack);
                const lines = [];
                paired.forEach(d => {
                  const v = d.data[month];
                  if (v > 0) lines.push(`${d.label}: ${curSymbol}${v.toLocaleString('en-US', { maximumFractionDigits: 0 })}`);
                });
                return lines;
              },
              label: () => null,
              title: (items) => {
                if (!items.length) return '';
                return monthLabels[items[0].dataIndex];
              }
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            grid: { display: false },
            ticks: { font: { size: 10 }, color: tc.text }
          },
          y: {
            stacked: false,
            grid: { color: tc.grid },
            ticks: {
              font: { size: 9 },
              color: tc.text,
              callback: (v) => curSymbol + (v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v)
            }
          }
        }
      }
    });
  }

  const sectionPieCharts = {};
  const sectionPieConfigs = [
    { type: 'INCOME', canvasId: 'incomePieChart', centerId: 'incomePieCenterAmount', legendId: 'incomePieLegend', hue: 142, label: 'income' },
    { type: 'EXPENSES', canvasId: 'expensesPieChart', centerId: 'expensesPieCenterAmount', legendId: 'expensesPieLegend', hue: 0, label: 'expenses' },
    { type: 'SAVINGS', canvasId: 'savingsPieChart', centerId: 'savingsPieCenterAmount', legendId: 'savingsPieLegend', hue: 217, label: 'savings' },
    { type: 'DEBT', canvasId: 'debtPieChart', centerId: 'debtPieCenterAmount', legendId: 'debtPieLegend', hue: 45, label: 'debt' },
  ];

  function renderSectionPieChart(cfg) {
    const canvas = document.getElementById(cfg.canvasId);
    if (!canvas) return;
    if (sectionPieCharts[cfg.type]) sectionPieCharts[cfg.type].destroy();

    const tc = getThemeColors();
    const isDark = htmlEl.getAttribute('data-theme') === 'dark';
    const detailMode = document.getElementById('txnDetailSelect').value;
    const txns = getFilteredTxns().filter(t => t.type === cfg.type);

    const convert = (v) => currentCurrency === 'USD' ? v / AED_USD_RATE : v;
    const curSymbol = currentCurrency === 'USD' ? '$' : 'AED ';

    const sectionCats = budgetCategories[cfg.type] || [];
    const budgetNameMap = {};
    sectionCats.forEach(cat => { budgetNameMap[cat.toLowerCase().trim()] = cat; });

    const catMap = {};
    txns.forEach(t => {
      const key = t.category.toLowerCase().trim();
      let catName = budgetNameMap[key] || t.category;
      if (detailMode === 'category') {
        catName = categoryParentMap[catName] || catName;
      }
      catMap[catName] = (catMap[catName] || 0) + t.amount;
    });

    // Filter out categories with zero or negative net amounts (e.g. fully refunded categories)
    let sorted = Object.entries(catMap).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
    let labels = [];
    let values = [];

    if (sorted.length > 10) {
      const top9 = sorted.slice(0, 9);
      const otherTotal = sorted.slice(9).reduce((s, [, v]) => s + v, 0);
      labels = top9.map(e => e[0]);
      values = top9.map(e => convert(e[1]));
      labels.push('Other');
      values.push(convert(otherTotal));
    } else {
      labels = sorted.map(e => e[0]);
      values = sorted.map(e => convert(e[1]));
    }

    if (values.length === 0) {
      canvas.style.display = 'none';
      let msg = canvas.parentElement.querySelector('.no-data-msg');
      if (!msg) {
        msg = document.createElement('p');
        msg.className = 'no-data-msg';
        msg.style.cssText = 'color:var(--text-3);text-align:center;padding:40px 0;font-size:12px;';
        msg.textContent = 'No ' + cfg.label + ' data';
        canvas.parentElement.appendChild(msg);
      }
      msg.style.display = '';
      document.getElementById(cfg.legendId).innerHTML = '';
      const ce = document.getElementById(cfg.centerId);
      if (ce) ce.textContent = '--';
      return;
    }
    canvas.style.display = '';
    const existingMsg = canvas.parentElement.querySelector('.no-data-msg');
    if (existingMsg) existingMsg.style.display = 'none';

    // Graduating hue-based colors
    const colors = values.map((_, i, arr) => {
      const t = i / Math.max(arr.length - 1, 1);
      const s = isDark ? (70 - t * 30) : (80 - t * 30);
      const l = isDark ? (35 + t * 35) : (25 + t * 40);
      return `hsl(${cfg.hue}, ${s}%, ${l}%)`;
    });

    const total = values.reduce((s, v) => s + v, 0);

    sectionPieCharts[cfg.type] = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: colors,
          borderColor: isDark ? 'rgba(22,22,22,1)' : 'rgba(255,255,255,1)',
          borderWidth: 3,
          hoverOffset: 8,
          spacing: 1,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
        onHover: (event, elements) => {
          const centerEl = document.getElementById(cfg.centerId);
          const subEl = centerEl ? centerEl.previousElementSibling : null;
          if (elements.length > 0) {
            const idx = elements[0].index;
            const val = values[idx];
            const pct = total > 0 ? (val / total * 100).toFixed(1) : '0';
            if (centerEl) centerEl.textContent = curSymbol + val.toLocaleString('en-US', { maximumFractionDigits: 0 });
            if (subEl) subEl.textContent = pct + '%';
          } else {
            if (centerEl) centerEl.textContent = curSymbol + total.toLocaleString('en-US', { maximumFractionDigits: 0 });
            if (subEl) subEl.textContent = cfg.label.toUpperCase();
          }
        }
      }
    });

    const centerEl = document.getElementById(cfg.centerId);
    if (centerEl) centerEl.textContent = curSymbol + total.toLocaleString('en-US', { maximumFractionDigits: 0 });

    // Touch-drag interaction for pie charts
    const chartInstance = sectionPieCharts[cfg.type];
    let pieTouching = false;
    let pieLastIdx = -1;

    function showPieTooltip(touchX, touchY, idx) {
      const tip = getChartTipEl();
      const val = values[idx];
      const pct = total > 0 ? (val / total * 100).toFixed(1) : '0';
      tip.innerHTML = `<div class="chart-tip-title">${labels[idx]}</div><div class="chart-tip-line">${curSymbol}${val.toLocaleString('en-US', { maximumFractionDigits: 0 })} (${pct}%)</div>`;
      tip.classList.add('visible');
      const tipW = tip.offsetWidth;
      const tipH = tip.offsetHeight;
      tip.style.left = Math.max(8, Math.min(window.innerWidth - tipW - 8, touchX - tipW / 2)) + 'px';
      tip.style.top = Math.max(8, touchY - tipH - 40) + 'px';
    }

    function updatePieHover(idx) {
      const cEl = document.getElementById(cfg.centerId);
      const sEl = cEl ? cEl.previousElementSibling : null;
      if (idx >= 0) {
        const val = values[idx];
        const pct = total > 0 ? (val / total * 100).toFixed(1) : '0';
        if (cEl) cEl.textContent = curSymbol + val.toLocaleString('en-US', { maximumFractionDigits: 0 });
        if (sEl) sEl.textContent = pct + '%';
        chartInstance.setActiveElements([{ datasetIndex: 0, index: idx }]);
      } else {
        if (cEl) cEl.textContent = curSymbol + total.toLocaleString('en-US', { maximumFractionDigits: 0 });
        if (sEl) sEl.textContent = cfg.label.toUpperCase();
        chartInstance.setActiveElements([]);
      }
      chartInstance.update('none');
    }

    function clearPieTouch() {
      pieTouching = false;
      pieLastIdx = -1;
      updatePieHover(-1);
      getChartTipEl().classList.remove('visible');
    }

    canvas.addEventListener('touchstart', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      const els = chartInstance.getElementsAtEventForMode({ x, y }, 'nearest', { intersect: true }, false);
      if (els.length > 0) {
        e.preventDefault();
        pieTouching = true;
        pieLastIdx = els[0].index;
        updatePieHover(pieLastIdx);
        showPieTooltip(e.touches[0].clientX, e.touches[0].clientY, pieLastIdx);
      }
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
      if (!pieTouching) return;
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      const els = chartInstance.getElementsAtEventForMode({ x, y }, 'nearest', { intersect: true }, false);
      if (els.length > 0 && els[0].index !== pieLastIdx) {
        pieLastIdx = els[0].index;
        updatePieHover(pieLastIdx);
        showPieTooltip(e.touches[0].clientX, e.touches[0].clientY, pieLastIdx);
      } else if (els.length > 0) {
        showPieTooltip(e.touches[0].clientX, e.touches[0].clientY, pieLastIdx);
      }
    }, { passive: false });

    canvas.addEventListener('touchend', clearPieTouch);
    canvas.addEventListener('touchcancel', clearPieTouch);

    const maxVal = Math.max(...values);
    let legendHTML = '';
    labels.forEach((label, i) => {
      const pct = total > 0 ? (values[i] / total * 100).toFixed(1) : '0.0';
      const val = values[i].toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      const barPct = maxVal > 0 ? (values[i] / maxVal * 100) : 0;
      legendHTML += `<div class="pie-legend-item">
        <span class="pie-legend-dot" style="background:${colors[i]}"></span>
        <span class="pie-legend-name">${label}</span>
        <span class="pie-legend-bar-wrap"><span class="pie-legend-bar-fill" style="width:${barPct}%;background:${colors[i]}"></span></span>
        <span class="pie-legend-val">${curSymbol}${val}</span>
        <span class="pie-legend-pct">${pct}%</span>
      </div>`;
    });
    legendHTML += `<div class="pie-legend-total">
      <span class="pie-legend-total-label">Total</span>
      <span class="pie-legend-total-val">${curSymbol}${total.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
    </div>`;
    document.getElementById(cfg.legendId).innerHTML = legendHTML;
  }

  function renderAllSectionPies() {
    sectionPieConfigs.forEach(cfg => renderSectionPieChart(cfg));
    // Also render the unified alloc card (default to current tab)
    renderAllocCard(currentAllocType);
  }

  let currentAllocType = 'INCOME';

  function switchAllocTab(type, btn) {
    currentAllocType = type;
    document.querySelectorAll('#allocTabs .alloc-tab').forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderAllocCard(type);
  }

  let _allocAbort = null;
  function renderAllocCard(type) {
    const barEl = document.getElementById('allocStackedBar');
    const totalEl = document.getElementById('allocTotalRow');
    const listEl = document.getElementById('allocRankedList');
    if (!barEl || !totalEl || !listEl) return;
    if (_allocAbort) _allocAbort.abort();
    _allocAbort = new AbortController();
    const _asig = { signal: _allocAbort.signal };

    const isDark = htmlEl.getAttribute('data-theme') !== 'light';
    const detailMode = document.getElementById('txnDetailSelect')?.value || 'granule';
    const txns = getFilteredTxns().filter(t => t.type === type);
    const convert = (v) => currentCurrency === 'USD' ? v / AED_USD_RATE : v;
    const curSymbol = currentCurrency === 'USD' ? '$' : 'AED ';

    const hueMap = { INCOME: 142, EXPENSES: 0, SAVINGS: 217, DEBT: 45 };
    const labelMap = { INCOME: 'Income', EXPENSES: 'Expenses', SAVINGS: 'Savings', DEBT: 'Debt' };
    const hue = hueMap[type] || 0;
    const label = labelMap[type] || type;

    const sectionCats = budgetCategories[type] || [];
    const budgetNameMap = {};
    sectionCats.forEach(cat => { budgetNameMap[cat.toLowerCase().trim()] = cat; });

    const catMap = {};
    txns.forEach(t => {
      const key = t.category.toLowerCase().trim();
      let catName = budgetNameMap[key] || t.category;
      if (detailMode === 'category') catName = categoryParentMap[catName] || catName;
      catMap[catName] = (catMap[catName] || 0) + t.amount;
    });

    let sorted = Object.entries(catMap).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
    let labels = [], values = [];
    if (sorted.length > 10) {
      const top9 = sorted.slice(0, 9);
      const otherTotal = sorted.slice(9).reduce((s, [, v]) => s + v, 0);
      labels = top9.map(e => e[0]); values = top9.map(e => convert(e[1]));
      labels.push('Other'); values.push(convert(otherTotal));
    } else {
      labels = sorted.map(e => e[0]); values = sorted.map(e => convert(e[1]));
    }

    if (values.length === 0) {
      barEl.innerHTML = '';
      totalEl.innerHTML = '';
      listEl.innerHTML = '<div style="color:var(--text-3);text-align:center;padding:32px 0;font-size:12px;">No ' + label.toLowerCase() + ' data</div>';
      return;
    }

    const colors = values.map((_, i, arr) => {
      const t = i / Math.max(arr.length - 1, 1);
      const s = isDark ? (70 - t * 30) : (80 - t * 30);
      const l = isDark ? (35 + t * 35) : (25 + t * 40);
      return `hsl(${hue}, ${s}%, ${l}%)`;
    });

    const total = values.reduce((s, v) => s + v, 0);
    const maxVal = Math.max(...values);

    // Stacked bar
    barEl.innerHTML = values.map((v, i) => {
      const pct = total > 0 ? (v / total * 100).toFixed(1) : '0';
      const val = values[i].toLocaleString('en-US', { maximumFractionDigits: 0 });
      return `<div class="alloc-bar-seg" style="flex:${pct};background:${colors[i]}" data-alloc-tip="${labels[i]}: ${curSymbol}${val} (${pct}%)"></div>`;
    }).join('');

    // Floating tooltip for bar segments
    let allocTip = document.getElementById('allocBarTooltip');
    if (!allocTip) {
      allocTip = document.createElement('div');
      allocTip.id = 'allocBarTooltip';
      allocTip.className = 'heatmap-tooltip';
      document.body.appendChild(allocTip);
    }
    barEl.onmouseover = (e) => {
      const seg = e.target.closest('.alloc-bar-seg[data-alloc-tip]');
      if (!seg) { allocTip.classList.remove('visible'); return; }
      allocTip.textContent = seg.getAttribute('data-alloc-tip');
      const rect = seg.getBoundingClientRect();
      allocTip.style.left = (rect.left + rect.width / 2 - allocTip.offsetWidth / 2) + 'px';
      allocTip.style.top = (rect.top - allocTip.offsetHeight - 8) + 'px';
      allocTip.classList.add('visible');
    };
    barEl.onmouseout = () => allocTip.classList.remove('visible');

    // Touch-and-drag for allocation bar segments (Insights)
    let insAllocTouching = false;
    function showInsAllocSeg(x, y) {
      const el = document.elementFromPoint(x, y);
      const seg = el && el.closest('.alloc-bar-seg[data-alloc-tip]');
      barEl.querySelectorAll('.alloc-bar-seg').forEach(s => { s.style.opacity = seg ? '0.4' : ''; s.style.transform = ''; });
      if (!seg) { allocTip.classList.remove('visible'); return; }
      seg.style.opacity = '1';
      seg.style.transform = 'scaleY(1.4)';
      allocTip.textContent = seg.getAttribute('data-alloc-tip');
      const rect = seg.getBoundingClientRect();
      allocTip.style.left = Math.max(8, Math.min(window.innerWidth - 200, rect.left + rect.width / 2 - 80)) + 'px';
      allocTip.style.top = (rect.top - allocTip.offsetHeight - 20) + 'px';
      allocTip.classList.add('visible');
    }
    barEl.addEventListener('touchstart', (e) => {
      e.preventDefault(); insAllocTouching = true;
      showInsAllocSeg(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false, signal: _allocAbort.signal });
    barEl.addEventListener('touchmove', (e) => {
      if (!insAllocTouching) return; e.preventDefault();
      showInsAllocSeg(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false, signal: _allocAbort.signal });
    function endInsAllocTouch() {
      insAllocTouching = false;
      allocTip.classList.remove('visible');
      barEl.querySelectorAll('.alloc-bar-seg').forEach(s => { s.style.opacity = ''; s.style.transform = ''; });
    }
    barEl.addEventListener('touchend', endInsAllocTouch, _asig);
    barEl.addEventListener('touchcancel', endInsAllocTouch, _asig);

    // Total row
    totalEl.innerHTML = `
      <span class="alloc-total-label" id="allocTotalAmt">--</span>
      <span class="alloc-total-sub">${values.length} categories</span>
    `;
    const allocTotalEl = document.getElementById('allocTotalAmt');
    if (allocTotalEl) {
      animateValue(allocTotalEl, total, 1200, (v) => curSymbol + v.toLocaleString('en-US', { maximumFractionDigits: 0 }));
    }

    // Ranked list
    listEl.innerHTML = labels.map((lbl, i) => {
      const pct = total > 0 ? (values[i] / total * 100).toFixed(1) : '0.0';
      const val = values[i].toLocaleString('en-US', { maximumFractionDigits: 0 });
      const barPct = maxVal > 0 ? (values[i] / maxVal * 100) : 0;
      return `<div class="alloc-rank-row">
        <span class="alloc-rank-num">${i + 1}</span>
        <span class="alloc-rank-dot" style="background:${colors[i]}"></span>
        <span class="alloc-rank-name">${lbl}</span>
        <span class="alloc-rank-bar"><span class="alloc-rank-bar-fill" style="width:${barPct}%;background:${colors[i]}"></span></span>
        <span class="alloc-rank-val">${curSymbol}${val}</span>
        <span class="alloc-rank-pct">${pct}%</span>
      </div>`;
    }).join('');
  }

  function initTxnPills() {
    const pairs = [
      ['txnTypeTrack', 'txnTypePill'],
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

  function syncTxnHeaderSpacer() {
    const h = document.querySelector('#transactionsApp .header');
    const spacer = document.getElementById('txnHeaderSpacer');
    if (h && spacer) {
      spacer.style.height = h.offsetHeight + 'px';
      if (currentNavSection === 'transactions') {
        document.documentElement.style.setProperty('--header-h', h.offsetHeight + 'px');
      }
    }
  }

  // Init
  document.getElementById('signInLogo').innerHTML = zadFullLogo(Math.min(window.innerWidth * 0.28, 120));
  document.getElementById('sidebarLogo').innerHTML = zadLogo(28);
  // Mobile header logos
  const mld = document.getElementById('mobileLogoDash');
  const mlp = document.getElementById('mobileLogoPort');
  if (mld) mld.innerHTML = zadLogo(28);
  if (mlp) mlp.innerHTML = zadLogo(28);
  // Loading screen logo (full wordmark)
  const loadLogoEl = document.getElementById('loadingLogo');
  if (loadLogoEl) loadLogoEl.innerHTML = zadFullLogo(120);
  loadGIS();

  // Tab swipe removed — users switch tabs by tapping

  // Header + bottom tabs blur on scroll (mobile: compact header on scroll)
  const isMobileView = () => window.innerWidth < 768;
  const _cachedHeaders = document.querySelectorAll('.header');
  const _cachedBottomTabs = document.querySelectorAll('.txn-bottom-tabs');
  window.addEventListener('scroll', () => {
    // Close settings popover on scroll
    if (typeof closeMobileSettings === 'function') closeMobileSettings();
    const scrollY = window.scrollY;
    const atBottom = (window.innerHeight + scrollY) >= (document.body.scrollHeight - 16);
    _cachedHeaders.forEach(h => {
      h.classList.toggle('scrolled', scrollY > 8);
      if (isMobileView()) {
        const wasCompact = h.classList.contains('header-compact');
        const isCompact = scrollY > 40;
        if (wasCompact !== isCompact) {
          h.classList.toggle('header-compact', isCompact);
          // Only update --header-h from the visible header
          if (h.offsetHeight > 0) {
            requestAnimationFrame(() => {
              document.documentElement.style.setProperty('--header-h', h.offsetHeight + 'px');
            });
          }
        }
      } else {
        h.classList.remove('header-compact');
      }
    });

    // Filters spacer is set on tab switch only, not per scroll frame
    _cachedBottomTabs.forEach(t => {
      t.classList.toggle('scrolled', !atBottom);
    });
  }, { passive: true });

  // Auto-login with cached token if still valid
  (function tryAutoLogin() {
    const cached = localStorage.getItem('cachedToken');
    const expiresAt = parseInt(localStorage.getItem('tokenExpiresAt') || '0', 10);
    // Require at least 2 min remaining to avoid mid-session expiry
    if (cached && Date.now() < expiresAt - 120000) {
      accessToken = cached;
      userFirstName = localStorage.getItem('userName') || '';
      // Hide sign-in, show loading
      hideSignInScreen();
      document.getElementById('appSidebar').classList.remove('hidden');
      document.getElementById('loadingScreen').classList.remove('hidden');
      fetchSheetData();
    }
  })();

// === Net Worth Page ===
let currentNwTab = 'dashboard';
let nwDataLoaded = false;
// Parsed data from "Net Worth Planning" sheet
let nwYears = [];        // [{ year: 2026, colOffset: 3 }, ...] colOffset relative to range start (col F)
let nwAssets = [];        // [{ category, name, row, values: { '2026-1': 300000, ... } }, ...]
let nwLiabilities = [];   // same structure
// Filter state
let nwFilterYear = new Date().getFullYear();
let nwFilterMonth = new Date().getMonth() + 1; // 1-12

const NW_MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

window.switchNwTab = function switchNwTab(tab, el) {
  currentNwTab = tab;
  const indicator = document.getElementById('nwTabIndicator');
  if (indicator) indicator.textContent = tab === 'dashboard' ? 'Dashboard' : 'Planning';
  const tabs = el.parentElement.querySelectorAll('.tab');
  tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
  el.classList.add('active');
  el.setAttribute('aria-selected', 'true');
  const underline = document.getElementById('nwTabUnderline');
  if (underline) {
    underline.style.width = el.offsetWidth + 'px';
    underline.style.transform = `translateX(${el.offsetLeft}px)`;
  }
  const dashboard = document.getElementById('nwDashboardContent');
  const planning = document.getElementById('nwPlanningContent');
  if (tab === 'dashboard') {
    dashboard.classList.remove('hidden');
    planning.classList.add('hidden');
    renderNwDashboard();
  } else {
    dashboard.classList.add('hidden');
    planning.classList.remove('hidden');
    renderNwPlanning();
  }
};

// ── Data Fetching ──
// Sheet layout:
//   Row 5: year headers at F5, S5, AF5, ... (every 13 cols: 12 months + 1 gap)
//   Rows 14-114: Assets — C=category, D=name, F-Q=Jan-Dec year1, S-AD=Jan-Dec year2, ...
//   Rows 118-219: Liabilities — same column layout
// We read starting from col C so:
//   index 0=C, 1=D, 2=E(empty), 3=F(Jan yr1), 14=Q(Dec yr1), 15=R(gap), 16=S(Jan yr2), ...

async function fetchNetWorthData() {
  if (!accessToken) return;
  try {
    const ranges = [
      'Net Worth Planning!C5:ZZ5',
      'Net Worth Planning!C14:ZZ114',
      'Net Worth Planning!C118:ZZ219'
    ].map(r => 'ranges=' + encodeURIComponent(r)).join('&');
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchGet?${ranges}&valueRenderOption=UNFORMATTED_VALUE`,
      { headers: { 'Authorization': `Bearer ${accessToken}` } }
    );
    if (!res.ok) return;
    const data = await res.json();
    const vr = data.valueRanges || [];
    const yearRow = (vr[0] && vr[0].values && vr[0].values[0]) || [];
    const assetRows = (vr[1] && vr[1].values) || [];
    const liabRows = (vr[2] && vr[2].values) || [];
    parseNwSheetData(yearRow, assetRows, liabRows);
    nwDataLoaded = true;
  } catch (err) {
    console.error('Net worth fetch error:', err);
    nwDataLoaded = true;
  }
}

function parseNwSheetData(yearRow, assetRows, liabRows) {
  // Parse year blocks from row 5
  // yearRow index 0=C5, 1=D5, 2=E5, 3=F5(year1), 16=S5(year2), 29=AF5(year3)
  // Each year block starts at offset 3 + n*13 from the range start
  nwYears = [];
  for (let i = 3; i < yearRow.length; i++) {
    if (yearRow[i] && typeof yearRow[i] === 'number') {
      nwYears.push({ year: yearRow[i], colOffset: i });
    }
  }
  nwYears.sort((a, b) => a.year - b.year);

  // Parse asset rows
  nwAssets = parseNwItemRows(assetRows, 14);
  // Parse liability rows
  nwLiabilities = parseNwItemRows(liabRows, 118);
}

function parseNwItemRows(rows, startRow) {
  const items = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row) continue;
    const name = (row[1] || '').toString().trim(); // Column D (index 1)
    if (!name) continue;
    const category = (row[0] || '').toString().trim(); // Column C (index 0)
    // Extract monthly values for each year
    const values = {};
    for (const yb of nwYears) {
      for (let m = 0; m < 12; m++) {
        const colIdx = yb.colOffset + m;
        const val = row[colIdx];
        if (val !== undefined && val !== null && val !== '') {
          const numVal = typeof val === 'number' ? val : parseFloat(val.toString().replace(/[^0-9.\-]/g, ''));
          if (!isNaN(numVal)) {
            values[yb.year + '-' + (m + 1)] = numVal;
          }
        }
      }
    }
    items.push({ category, name, sheetRow: startRow + i, values });
  }
  return items;
}

// ── Transaction-based auto-fill ──
// Calculates monthly net flow per account from allTransactions
function getMonthlyAccountFlows() {
  const flows = {}; // { 'ENBD': { '2026-3': 5000, ... } }
  allTransactions.forEach(t => {
    if (!t.account || t.account === '--') return;
    const d = parseTxnDate(t.date);
    if (!d || d.getTime() === 0) return;
    const key = d.getFullYear() + '-' + (d.getMonth() + 1);
    if (!flows[t.account]) flows[t.account] = {};
    if (!flows[t.account][key]) flows[t.account][key] = 0;
    if (t.type === 'INCOME') flows[t.account][key] += t.amount;
    else if (t.type === 'EXPENSES') flows[t.account][key] -= t.amount;
    else if (t.type === 'SAVINGS') flows[t.account][key] -= t.amount;
    else if (t.type === 'DEBT') flows[t.account][key] -= t.amount;
  });
  return flows;
}

// ── Calculation ──
function getNwValueForPeriod(item, year, month) {
  return item.values[year + '-' + month] || 0;
}

function calculateNwForPeriod(year, month) {
  const portfolioTotal = (year === new Date().getFullYear() && month === new Date().getMonth() + 1)
    ? getActiveHoldings().reduce((s, h) => s + (h.currentValue || 0), 0)
    : 0;

  let totalAssets = portfolioTotal;
  let totalLiabilities = 0;

  // Group assets by category
  const assetsByCategory = {};
  nwAssets.forEach(item => {
    const val = getNwValueForPeriod(item, year, month);
    const cat = item.category || 'Uncategorized';
    if (!assetsByCategory[cat]) assetsByCategory[cat] = [];
    assetsByCategory[cat].push({ ...item, periodValue: val });
    totalAssets += val;
  });

  // Group liabilities by category
  const liabsByCategory = {};
  nwLiabilities.forEach(item => {
    const val = getNwValueForPeriod(item, year, month);
    const cat = item.category || 'Uncategorized';
    if (!liabsByCategory[cat]) liabsByCategory[cat] = [];
    liabsByCategory[cat].push({ ...item, periodValue: val });
    totalLiabilities += Math.abs(val);
  });

  return { totalAssets, totalLiabilities, netWorth: totalAssets - totalLiabilities, assetsByCategory, liabsByCategory, portfolioTotal };
}

// ── Filter bar ──
function populateNwFilters() {
  const yearSelect = document.getElementById('nwYearSelect');
  const monthSelect = document.getElementById('nwMonthSelect');
  if (yearSelect) {
    const years = nwYears.length > 0 ? nwYears : [{ year: nwFilterYear }];
    yearSelect.innerHTML = years.map(y => `<option value="${y.year}" ${y.year === nwFilterYear ? 'selected' : ''}>${y.year}</option>`).join('');
  }
  if (monthSelect) monthSelect.value = nwFilterMonth;
}

window.changeNwFilter = function changeNwFilter() {
  const ys = document.getElementById('nwYearSelect');
  const ms = document.getElementById('nwMonthSelect');
  if (ys) nwFilterYear = parseInt(ys.value);
  if (ms) nwFilterMonth = parseInt(ms.value);
  if (currentNwTab === 'dashboard') renderNwDashboard();
  else renderNwPlanning();
};

// ── Dashboard Tab ──
function renderNwDashboard() {
  const container = document.getElementById('nwDashboardContent');
  if (!container) return;
  const data = calculateNwForPeriod(nwFilterYear, nwFilterMonth);

  const renderCategorySection = (groupedItems, colorVar, emptyMsg) => {
    const cats = Object.keys(groupedItems);
    if (cats.length === 0) return `<div class="nw-empty">${emptyMsg}</div>`;
    return cats.map(cat => {
      const items = groupedItems[cat];
      const catTotal = items.reduce((s, i) => s + Math.abs(i.periodValue), 0);
      return `<div class="nw-cat-group">
        <div class="nw-cat-header">
          <span class="nw-cat-name">${escapeHTML(cat)}</span>
          <span class="nw-cat-total" style="color: ${colorVar}">${formatMoney(catTotal)}</span>
        </div>
        ${items.map(item => `<div class="nw-item">
          <div class="nw-item-left">
            <span class="nw-item-name">${escapeHTML(item.name)}</span>
          </div>
          <span class="nw-item-value" style="color: ${colorVar}">${formatMoney(Math.abs(item.periodValue))}</span>
        </div>`).join('')}
      </div>`;
    }).join('');
  };

  container.innerHTML = `
    <div class="nw-hero">
      <div class="nw-hero-label">Net Worth · ${NW_MONTH_NAMES[nwFilterMonth - 1]} ${nwFilterYear}</div>
      <div class="nw-hero-value" style="color: ${data.netWorth >= 0 ? 'var(--text-1)' : 'var(--red)'}">${formatMoney(data.netWorth)}</div>
    </div>
    <div class="nw-summary-row">
      <div class="nw-summary-card">
        <div class="nw-summary-card-label">Total Assets</div>
        <div class="nw-summary-card-value" style="color: var(--emerald)">${formatMoney(data.totalAssets)}</div>
      </div>
      <div class="nw-summary-card">
        <div class="nw-summary-card-label">Total Liabilities</div>
        <div class="nw-summary-card-value" style="color: var(--red)">${formatMoney(data.totalLiabilities)}</div>
      </div>
    </div>
    <div class="nw-section">
      <div class="nw-section-header">
        <span class="nw-section-title">Assets</span>
        <span class="nw-section-total" style="color: var(--emerald)">${formatMoney(data.totalAssets)}</span>
      </div>
      ${data.portfolioTotal > 0 ? `<div class="nw-item">
        <div class="nw-item-left">
          <span class="nw-item-name">Portfolio</span>
          <span class="nw-item-meta">Live · Auto-tracked</span>
        </div>
        <span class="nw-item-value" style="color: var(--emerald)">${formatMoney(data.portfolioTotal)}</span>
      </div>` : ''}
      ${renderCategorySection(data.assetsByCategory, 'var(--emerald)', 'No assets for this period')}
    </div>
    <div class="nw-section">
      <div class="nw-section-header">
        <span class="nw-section-title">Liabilities</span>
        <span class="nw-section-total" style="color: var(--red)">${formatMoney(data.totalLiabilities)}</span>
      </div>
      ${renderCategorySection(data.liabsByCategory, 'var(--red)', 'No liabilities for this period')}
    </div>`;
}

// ── Planning Tab ──
function renderNwPlanning() {
  const container = document.getElementById('nwPlanningContent');
  if (!container) return;

  const periodKey = nwFilterYear + '-' + nwFilterMonth;
  const accountFlows = getMonthlyAccountFlows();

  const renderPlanItems = (items, type) => {
    if (items.length === 0) return `<div class="nw-empty">No ${type}s defined in the sheet.</div>`;
    // Group by category
    const grouped = {};
    items.forEach(item => {
      const cat = item.category || 'Uncategorized';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(item);
    });
    return Object.keys(grouped).map(cat => {
      const catItems = grouped[cat];
      return `<div class="nw-cat-group">
        <div class="nw-cat-header">
          <span class="nw-cat-name">${escapeHTML(cat)}</span>
        </div>
        ${catItems.map(item => {
          const val = item.values[periodKey] || '';
          const prevMo = nwFilterMonth === 1 ? 12 : nwFilterMonth - 1;
          const prevYr = nwFilterMonth === 1 ? nwFilterYear - 1 : nwFilterYear;
          const prevKey = prevYr + '-' + prevMo;
          const prevFlow = accountFlows[item.name] ? (accountFlows[item.name][prevKey] || 0) : null;
          const hasAccount = accountFlows[item.name] !== undefined;
          return `<div class="nw-plan-item">
            <div class="nw-plan-item-left">
              <span class="nw-plan-item-name">${escapeHTML(item.name)}</span>
              ${hasAccount ? `<span class="nw-plan-item-flow" style="color: ${prevFlow >= 0 ? 'var(--emerald)' : 'var(--red)'}">${NW_MONTH_NAMES[prevMo - 1]} flow: ${prevFlow >= 0 ? '+' : ''}${formatMoney(prevFlow)}</span>` : ''}
            </div>
            <div class="nw-plan-item-right">
              <input class="nw-plan-input" type="number" inputmode="decimal" value="${val}" placeholder="—"
                data-row="${item.sheetRow}" data-type="${type}"
                onchange="updateNwItemValue(this, '${type}', ${item.sheetRow}, ${nwFilterYear}, ${nwFilterMonth})" />
              ${hasAccount ? `<button class="nw-autofill-btn" title="Auto-fill: ${NW_MONTH_NAMES[prevMo - 1]} value + ${NW_MONTH_NAMES[prevMo - 1]} flow" onclick="autoFillNwItem(this, '${type}', ${item.sheetRow}, ${nwFilterYear}, ${nwFilterMonth})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
              </button>` : ''}
            </div>
          </div>`;
        }).join('')}
      </div>`;
    }).join('');
  };

  container.innerHTML = `
    <div class="nw-plan-section">
      <div class="nw-plan-header">
        <span class="nw-plan-title">Assets</span>
      </div>
      ${renderPlanItems(nwAssets, 'asset')}
    </div>
    <div class="nw-plan-section">
      <div class="nw-plan-header">
        <span class="nw-plan-title">Liabilities</span>
      </div>
      ${renderPlanItems(nwLiabilities, 'liability')}
    </div>`;
}

// ── Write single cell back to sheet ──
function getNwSheetCol(year, month) {
  // Find the year block and compute the column letter
  const yb = nwYears.find(y => y.year === year);
  if (!yb) return null;
  // colOffset is relative to C (index 0 in our range), so actual sheet column = C + offset
  // C=3(1-based), so sheet col = 3 + colOffset + (month-1)
  const sheetColNum = 3 + yb.colOffset + (month - 1); // 1-based column number
  return colNumToLetter(sheetColNum);
}

function colNumToLetter(num) {
  let s = '';
  while (num > 0) {
    num--;
    s = String.fromCharCode(65 + (num % 26)) + s;
    num = Math.floor(num / 26);
  }
  return s;
}

window.updateNwItemValue = async function updateNwItemValue(input, type, sheetRow, year, month) {
  const val = parseFloat(input.value) || 0;
  const items = type === 'asset' ? nwAssets : nwLiabilities;
  const item = items.find(i => i.sheetRow === sheetRow);
  if (item) item.values[year + '-' + month] = val;

  const col = getNwSheetCol(year, month);
  if (!col || !accessToken) return;
  const range = `Net Worth Planning!${col}${sheetRow}`;
  try {
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: [[val]] })
      }
    );
    input.classList.add('nw-input-saved');
    setTimeout(() => input.classList.remove('nw-input-saved'), 800);
  } catch (err) {
    console.error('Net worth write error:', err);
  }
};

window.autoFillNwItem = async function autoFillNwItem(btn, type, sheetRow, year, month) {
  const items = type === 'asset' ? nwAssets : nwLiabilities;
  const item = items.find(i => i.sheetRow === sheetRow);
  if (!item || !accessToken) return;

  const flows = getMonthlyAccountFlows();
  const accountFlows = flows[item.name] || {};

  // Build a sorted list of all year-month periods across all available years
  const allPeriods = [];
  const sortedYears = [...nwYears].sort((a, b) => a.year - b.year);
  for (const yb of sortedYears) {
    for (let m = 1; m <= 12; m++) {
      allPeriods.push({ year: yb.year, month: m });
    }
  }

  // Find March of the first year as the default seed month
  // Walk forward from there: each month = prev value + prev month flow
  let seedIdx = -1;
  for (let i = 0; i < allPeriods.length; i++) {
    if (allPeriods[i].month === 3) {
      seedIdx = i;
      break;
    }
  }
  if (seedIdx === -1) seedIdx = 0;

  // Compute values for all months after the seed
  const writeData = []; // { range, value }
  let runningVal = item.values[allPeriods[seedIdx].year + '-' + allPeriods[seedIdx].month] || 0;

  for (let i = seedIdx + 1; i < allPeriods.length; i++) {
    const prev = allPeriods[i - 1];
    const cur = allPeriods[i];
    const prevKey = prev.year + '-' + prev.month;
    const curKey = cur.year + '-' + cur.month;
    const prevFlow = accountFlows[prevKey] || 0;
    runningVal = runningVal + prevFlow;
    item.values[curKey] = runningVal;

    const col = getNwSheetCol(cur.year, cur.month);
    if (col) {
      writeData.push({
        range: `Net Worth Planning!${col}${sheetRow}`,
        values: [[runningVal]]
      });
    }
  }

  if (writeData.length === 0) return;

  // Batch write all values to sheet
  try {
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchUpdate`,
      {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          valueInputOption: 'USER_ENTERED',
          data: writeData
        })
      }
    );
    // Flash the button green to confirm
    btn.style.color = 'var(--emerald)';
    setTimeout(() => { btn.style.color = ''; }, 1000);
    // Re-render planning to show updated values
    renderNwPlanning();
  } catch (err) {
    console.error('Net worth auto-fill write error:', err);
  }
};

window.closeNwModal = function closeNwModal() {
  const overlay = document.getElementById('nwModalOverlay');
  if (overlay) overlay.remove();
};

async function renderNetWorthPage() {
  if (!nwDataLoaded && accessToken) {
    const container = document.getElementById('nwDashboardContent');
    if (container) container.innerHTML = '<div class="nw-empty">Loading...</div>';
    await fetchNetWorthData();
  }
  populateNwFilters();
  if (currentNwTab === 'dashboard') renderNwDashboard();
  else renderNwPlanning();
  // Init tab underline
  requestAnimationFrame(() => {
    const tabRow = document.getElementById('nwTabRow');
    if (tabRow) {
      const activeTab = tabRow.querySelector('.tab.active');
      const underline = document.getElementById('nwTabUnderline');
      if (activeTab && underline) {
        underline.style.width = activeTab.offsetWidth + 'px';
        underline.style.transform = `translateX(${activeTab.offsetLeft}px)`;
      }
    }
  });
}

// === Script Block 2 ===
let _pageSwitcherTrigger = null;
function openPageSwitcher(triggerEl) {
  _pageSwitcherTrigger = triggerEl;
  triggerEl.classList.add('open');
  const dropdown = document.getElementById('pageSwitcherDropdown');
  const menu = document.getElementById('pageSwitcherMenu');
  // Position dropdown below the title
  const rect = triggerEl.getBoundingClientRect();
  menu.style.setProperty('--page-switcher-top', (rect.bottom + 6) + 'px');
  menu.style.top = (rect.bottom + 6) + 'px';
  menu.style.left = rect.left + 'px';
  // Update active states
  document.getElementById('psSwitchDash').classList.toggle('active', currentNavSection === 'transactions');
  document.getElementById('psSwitchPort').classList.toggle('active', currentNavSection === 'portfolio');
  document.getElementById('psSwitchBudget').classList.toggle('active', currentNavSection === 'budget');
  dropdown.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closePageSwitcher() {
  const dropdown = document.getElementById('pageSwitcherDropdown');
  dropdown.classList.remove('open');
  document.body.style.overflow = '';
  if (_pageSwitcherTrigger) _pageSwitcherTrigger.classList.remove('open');
  _pageSwitcherTrigger = null;
}
function pageSwitchTo(section) {
  closePageSwitcher();
  if (currentNavSection === section) return;

  // Handle budget page directly (not in switchNav)
  if (section === 'budget') {
    currentNavSection = 'budget';
    document.getElementById('mainApp').classList.add('hidden');
    document.getElementById('transactionsApp').classList.add('hidden');
    document.getElementById('budgetApp').classList.remove('hidden');
    window.scrollTo(0, 0);
    // Init logo
    const mlb = document.getElementById('mobileLogoBudget');
    if (mlb && !mlb.innerHTML) mlb.innerHTML = zadLogo(28);
    // Sync header height + spacer
    requestAnimationFrame(() => {
      const bh = document.querySelector('#budgetApp .header');
      const spacer = document.querySelector('#budgetApp .header-spacer');
      if (bh) {
        if (spacer) spacer.style.height = bh.offsetHeight + 'px';
        if (window.innerWidth < 768) document.documentElement.style.setProperty('--header-h', bh.offsetHeight + 'px');
      }
    });
    const budgetInd = document.getElementById('budgetTabIndicator');
    if (budgetInd) budgetInd.textContent = currentBudgetTab === 'overview' ? 'Overview' : 'Budgets';
    fetchAndRenderBudget();
    return;
  }

  // For dashboard/portfolio, hide budget/planner page
  document.getElementById('budgetApp').classList.add('hidden');

  // Find the nav button and call switchNav
  const navBtn = document.querySelector(`.nav-item[onclick*="'${section}'"]`) ||
                 document.querySelectorAll('.nav-item')[section === 'portfolio' ? 1 : 0];
  if (navBtn) switchNav(section, navBtn);
}

// ── Categories Page ──
const CAT_RANGES = {
  'Income':     'Categories!B8:B',
  'Expenses':   'Categories!D8:D',
  'Savings':    'Categories!F8:F',
  'Debt':       'Categories!H8:H',
  'Transfer':   'Categories!J8:J',
  'Assets':     'Categories!M8:M',
  'Liabilities':'Categories!O8:O'
};
const CAT_WRITE_COLS = { 'Income': 'B', 'Expenses': 'D', 'Savings': 'F', 'Debt': 'H', 'Transfer': 'J', 'Assets': 'M', 'Liabilities': 'O' };
const LOCKED_TRANSFERS = ['Credit Card Payment (Out)', 'Credit Card Payment (In)', 'Own Account Transfer'];
let categoriesData = {};

async function fetchAndRenderCategories(targetId) {
  if (!accessToken) return;
  const cid = targetId || 'categoriesContent';
  const container = document.getElementById(cid);
  if (container) container.innerHTML = '<div style="text-align:center;padding:40px 0;color:var(--text-3);font-size:14px;">Loading categories...</div>';

  try {
    const ranges = Object.values(CAT_RANGES).map(r => encodeURIComponent(r)).join('&ranges=');
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchGet?ranges=${ranges}`,
      { headers: { 'Authorization': `Bearer ${accessToken}` } }
    );
    if (!res.ok) throw new Error('Failed to fetch categories');
    const data = await res.json();
    const keys = Object.keys(CAT_RANGES);
    categoriesData = {};
    keys.forEach((key, i) => {
      const values = data.valueRanges?.[i]?.values || [];
      categoriesData[key] = values.map(r => (r[0] || '').trim()).filter(Boolean);
    });
    renderCategories(cid);
  } catch (err) {
    console.error('Categories fetch error:', err);
    container.innerHTML = `<div style="text-align:center;padding:40px 0;color:var(--red);font-size:14px;">Error loading categories: ${err.message}</div>`;
  }
}

const CAT_COLORS = {
  'Income': '#30d158', 'Expenses': '#ff453a', 'Savings': '#0a84ff',
  'Debt': '#ff9f0a', 'Transfer': '#ac8eff', 'Assets': '#00c7be', 'Liabilities': '#ff6961'
};

var _activeCatContainer = 'categoriesContent';

function renderCategories(targetId) {
  if (targetId) _activeCatContainer = targetId;
  const container = document.getElementById(_activeCatContainer);
  const financialTypes = ['Income', 'Expenses', 'Savings', 'Debt', 'Transfer'];
  const networthTypes = ['Assets', 'Liabilities'];

  function renderSection(type, delay) {
    const items = categoriesData[type] || [];
    const color = CAT_COLORS[type] || '#888';
    const isTransfer = type === 'Transfer';

    let html = `<div class="cat-section">
      <div class="cat-section-header">
        <div class="cat-section-dot" style="background:${color}"></div>
        <span class="cat-section-name">${type}</span>
        <span class="cat-section-count">${items.length} item${items.length !== 1 ? 's' : ''}</span>
      </div>
      <div class="cat-items">`;

    items.forEach((item, i) => {
      const isLocked = isTransfer && LOCKED_TRANSFERS.includes(item);
      html += `<div class="cat-row">
        <span class="cat-row-name">${item}</span>
        ${isLocked
          ? '<span class="cat-row-locked">Default</span>'
          : `<button class="cat-row-delete" onclick="deleteCategory('${type}', ${i})" aria-label="Delete">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>`
        }
      </div>`;
    });

    html += `<div class="cat-add-row">
        <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        <input class="cat-add-input" type="text" placeholder="Add ${type.toLowerCase()}..." onkeydown="if(event.key==='Enter'&&this.value.trim()){addCatInline('${type}',this);}">
      </div>`;

    html += '</div></div>';
    return html;
  }

  let html = '<div class="cat-group-label">Financial</div>';
  financialTypes.forEach((type, i) => { html += renderSection(type, i * 0.04); });
  html += '<div class="cat-group-label">Net Worth</div>';
  networthTypes.forEach((type, i) => { html += renderSection(type, (financialTypes.length + i) * 0.04); });

  container.innerHTML = html;
}

function addCatInline(type, input) {
  const name = input.value.trim();
  if (!name) return;
  if (categoriesData[type]?.includes(name)) { input.value = ''; return; }
  if (!categoriesData[type]) categoriesData[type] = [];
  categoriesData[type].push(name);
  input.value = '';
  renderCategories();
  writeCategoryColumn(type);
}

function addCategory(type) { renderCategories(); }

function deleteCategory(type, index) {
  const item = categoriesData[type][index];
  if (!confirm(`Delete "${item}" from ${type}?`)) return;

  categoriesData[type].splice(index, 1);
  renderCategories();

  // Write to sheet (clear + rewrite the column)
  writeCategoryColumn(type);
}

async function writeCategoryColumn(type) {
  if (!accessToken) return;
  const col = CAT_WRITE_COLS[type];
  if (!col) return;

  const items = categoriesData[type] || [];
  // Build values array — each item in its own row, starting at row 8
  const values = items.map(item => [item]);
  // Add empty rows to clear old data (up to 50 rows)
  while (values.length < 50) values.push(['']);

  try {
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(`Categories!${col}8:${col}57`)}?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ values })
      }
    );
  } catch (err) {
    console.error('Category write error:', err);
  }
}

function openMobileSettings() {
  const popup = document.getElementById('mobileSettingsPopup');
  popup.style.visibility = 'visible';
  popup.offsetHeight; // force reflow
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  const themeLabel = document.getElementById('settingsThemeLabel');
  if (themeLabel) themeLabel.textContent = theme === 'dark' ? 'Dark' : 'Light';
  const demoLabel = document.getElementById('settingsDemoLabel');
  if (demoLabel) demoLabel.textContent = (typeof txnDemoMode !== 'undefined' && txnDemoMode) ? 'On' : 'Off';
  const currLabel = document.getElementById('settingsCurrLabel');
  if (currLabel) currLabel.textContent = (typeof currentCurrency !== 'undefined') ? currentCurrency : 'AED';
  popup.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileSettings() {
  const popup = document.getElementById('mobileSettingsPopup');
  if (!popup.classList.contains('open')) return;
  popup.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => {
    if (!popup.classList.contains('open')) popup.style.visibility = 'hidden';
  }, 380);
}

// ── Budget Management Page ──
var currentBudgetYear = new Date().getFullYear();
var currentBudgetMonth = new Date().getMonth() + 1;
var currentBudgetTab = 'overview';

function switchBudgetTab(tab, el) {
  currentBudgetTab = tab;
  document.querySelectorAll('#budgetTabRow .tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
  el.classList.add('active');
  el.setAttribute('aria-selected', 'true');

  document.getElementById('budgetOverviewContent').classList.toggle('hidden', tab !== 'overview');
  document.getElementById('budgetEditContent').classList.toggle('hidden', tab !== 'budgets');
  document.getElementById('budgetCategoriesContent').classList.toggle('hidden', tab !== 'categories');

  // Update header tab indicator
  const tabNames = { overview: 'Overview', budgets: 'Budgets', categories: 'Categories' };
  const indicator = document.getElementById('budgetTabIndicator');
  if (indicator) indicator.textContent = tabNames[tab] || '';

  if (tab === 'overview') renderBudgetOverview();
  if (tab === 'budgets') renderBudgetPage();
  if (tab === 'categories') renderCategoriesInPlanner();
}

function renderCategoriesInPlanner() {
  if (Object.keys(categoriesData).length === 0) {
    // Fetch then render into planner container
    fetchAndRenderCategories('budgetCategoriesContent');
    return;
  }
  renderCategories('budgetCategoriesContent');
}

var budgetOverviewScope = 'month';

function renderBudgetOverview() {
  const container = document.getElementById('budgetOverviewContent');
  if (!container || !budgetDataLoaded) {
    if (container) container.innerHTML = '<div style="text-align:center;padding:40px 0;color:var(--text-3);">Loading...</div>';
    return;
  }

  const monthNamesShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const monthNamesFull = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const isYear = budgetOverviewScope === 'year';

  function getTypeTotal(type) {
    const cats = budgetCategories[type] || [];
    if (isYear) return cats.reduce((s, c) => { let y = 0; for (let m = 1; m <= 12; m++) y += budgetData[c]?.[currentBudgetYear + '-' + String(m).padStart(2,'0')] || 0; return s + y; }, 0);
    return cats.reduce((s, c) => s + (budgetData[c]?.[currentBudgetYear + '-' + String(currentBudgetMonth).padStart(2,'0')] || 0), 0);
  }

  function getItems(type) {
    const cats = budgetCategories[type] || [];
    const key = currentBudgetYear + '-' + String(currentBudgetMonth).padStart(2,'0');
    return cats.map(c => ({
      name: window._budgetDisplayNames?.[c] || c.replace(/^[A-Z]+:/, ''),
      parent: categoryParentMap[c] || '',
      amount: isYear ? (() => { let s = 0; for (let m = 1; m <= 12; m++) s += budgetData[c]?.[currentBudgetYear + '-' + String(m).padStart(2,'0')] || 0; return s; })() : (budgetData[c]?.[key] || 0)
    })).filter(x => x.amount > 0).sort((a, b) => b.amount - a.amount);
  }

  const incomeTotal = getTypeTotal('INCOME');
  const expenseTotal = getTypeTotal('EXPENSES');
  const savingsTotal = getTypeTotal('SAVINGS');
  const debtTotal = getTypeTotal('DEBT');
  const totalAllocated = expenseTotal + savingsTotal + debtTotal;
  let remaining = incomeTotal - totalAllocated;
  if (Math.abs(remaining) < 1 && incomeTotal > 0) remaining = 0;
  const remColor = remaining > 0 ? 'var(--emerald)' : remaining < 0 ? 'var(--red)' : 'var(--text-3)';

  let html = '<div class="budget-month-wrapper">';
  html += '<div class="budget-month-bar">';
  html += '<select class="budget-year-select" onchange="currentBudgetYear=parseInt(this.value);renderBudgetOverview();">';
  const years = [...new Set(Object.values(budgetData).flatMap(d => Object.keys(d).map(k => parseInt(k.split('-')[0]))))].sort();
  if (!years.includes(currentBudgetYear)) years.push(currentBudgetYear);
  years.sort((a,b) => a-b).forEach(y => { html += '<option value="' + y + '"' + (y===currentBudgetYear?' selected':'') + '>' + y + '</option>'; });
  html += '</select><div class="budget-months-scroll">';
  html += '<button class="budget-month-pill ' + (isYear ? 'active' : '') + '" onclick="budgetOverviewScope=\'year\';renderBudgetOverview();">Year</button>';
  monthNamesShort.forEach((m, i) => {
    const isActive = !isYear && (i + 1) === currentBudgetMonth;
    html += '<button class="budget-month-pill ' + (isActive ? 'active' : '') + '" onclick="budgetOverviewScope=\'month\';currentBudgetMonth=' + (i+1) + ';renderBudgetOverview();">' + m + '</button>';
  });
  html += '</div></div></div>';
  html += '<div class="budget-month-spacer" style="height:48px"></div>';

  const scopeLabel = isYear ? currentBudgetYear + ' Annual Budget' : monthNamesFull[currentBudgetMonth - 1] + ' ' + currentBudgetYear;
  html += '<div style="text-align:center;padding:4px var(--content-px) 12px;">';
  html += '<div style="font-size:12px;color:var(--text-3);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">' + scopeLabel + '</div>';
  html += '<div style="font-family:\'SF Mono\',\'DM Mono\',monospace;font-size:36px;font-weight:700;color:var(--text-1);letter-spacing:-0.02em;line-height:1.1;">' + formatMoney(incomeTotal) + '</div>';
  html += '<div style="font-family:\'SF Mono\',\'DM Mono\',monospace;font-size:14px;font-weight:600;margin-top:6px;">';
  html += '<span style="color:' + remColor + '">' + (remaining >= 0 ? '' : '−') + formatMoney(Math.abs(remaining)) + ' ' + (remaining > 0 ? 'left' : remaining < 0 ? 'over' : 'allocated') + '</span>';
  html += '</div></div>';

  const sections = [
    { key: 'INCOME', label: 'Income', color: '#30d158', total: incomeTotal },
    { key: 'EXPENSES', label: 'Expenses', color: '#ff453a', total: expenseTotal },
    { key: 'SAVINGS', label: 'Savings', color: '#0a84ff', total: savingsTotal },
    { key: 'DEBT', label: 'Debt', color: '#ff9f0a', total: debtTotal },
  ];

  html += '<div style="padding:0 var(--content-px) 20px;display:flex;flex-direction:column;gap:16px;">';
  sections.forEach((sec, si) => {
    const pct = incomeTotal > 0 ? (sec.total / incomeTotal * 100) : 0;
    const items = getItems(sec.key);
    const sectionId = 'budgetOvSec_' + sec.key;

    html += '<div class="budget-ov-card" style="opacity:0;transform:translateY(12px);transition:opacity 0.4s cubic-bezier(0.16,1,0.3,1),transform 0.4s cubic-bezier(0.16,1,0.3,1);transition-delay:' + (si * 0.05) + 's">';
    html += '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">';
    html += '<span style="font-size:14px;font-weight:600;color:' + sec.color + '">' + sec.label + '</span>';
    html += '<span style="font-family:\'SF Mono\',\'DM Mono\',monospace;font-size:16px;font-weight:700;color:var(--text-1);">' + formatMoney(sec.total) + '</span>';
    html += '</div>';
    html += '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px;">';
    html += '<span style="font-size:10px;color:var(--text-3);">' + (sec.key === 'INCOME' ? (items.length + ' source' + (items.length !== 1 ? 's' : '')) : pct.toFixed(0) + '% of income') + '</span>';
    html += '<span style="font-size:10px;color:var(--text-3);">' + (sec.key === 'INCOME' ? '' : items.length + ' item' + (items.length !== 1 ? 's' : '')) + '</span>';
    html += '</div>';
    html += tickBarHTML(pct, sec.color, 50, si * 100);

    if (items.length > 0) {
      html += '<div class="budget-ov-items-toggle" onclick="document.getElementById(\'' + sectionId + '\').classList.toggle(\'hidden\');this.querySelector(\'svg\').classList.toggle(\'rotated\');">';
      html += '<span>Details</span>';
      html += '<svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>';
      html += '</div>';
      html += '<div class="hidden" id="' + sectionId + '">';
      items.forEach(item => {
        const itemPct = sec.total > 0 ? (item.amount / sec.total * 100) : 0;
        html += '<div class="budget-ov-item">';
        html += '<div class="budget-ov-item-info">';
        html += '<span class="budget-ov-item-name">' + item.name + '</span>';
        if (item.parent) html += '<span class="budget-ov-item-parent">' + item.parent + '</span>';
        html += '</div>';
        html += '<div class="budget-ov-item-right">';
        html += '<span class="budget-ov-item-amount">' + formatMoney(item.amount) + '</span>';
        html += '<span class="budget-ov-item-pct">' + itemPct.toFixed(0) + '%</span>';
        html += '</div></div>';
      });
      html += '</div>';
    }
    html += '</div>';
  });

  if (isYear) {
    html += '<div class="budget-ov-card" style="opacity:0;transform:translateY(12px);transition:opacity 0.4s cubic-bezier(0.16,1,0.3,1),transform 0.4s cubic-bezier(0.16,1,0.3,1);transition-delay:0.2s">';
    html += '<div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.15);font-family:\'SF Mono\',\'DM Mono\',monospace;margin-bottom:12px;">Allocation by Month</div>';
    monthNamesShort.forEach(function(m, i) {
      var k = currentBudgetYear + '-' + String(i+1).padStart(2,'0');
      var mInc = (budgetCategories['INCOME'] || []).reduce(function(s, c) { return s + (budgetData[c]?.[k] || 0); }, 0);
      var mAlloc = ['EXPENSES','SAVINGS','DEBT'].reduce(function(s, t) { return s + (budgetCategories[t] || []).reduce(function(s2, c) { return s2 + (budgetData[c]?.[k] || 0); }, 0); }, 0);
      var mRem = mInc - mAlloc;
      if (Math.abs(mRem) < 1 && mInc > 0) mRem = 0;
      var isCur = (i + 1) === new Date().getMonth() + 1 && currentBudgetYear === new Date().getFullYear();
      var isEmpty = mInc === 0;
      var isDone = mRem === 0 && mInc > 0;
      var isOver = mRem < 0;
      var isLeft = mRem > 0;

      var statusColor = isEmpty ? 'var(--text-3)' : isDone ? '#5aa8f5' : isLeft ? 'var(--emerald)' : 'var(--red)';
      var statusText = isEmpty ? '-' : isDone ? 'Allocated' : isLeft ? formatMoney(mRem) + ' left' : formatMoney(Math.abs(mRem)) + ' over';
      var deviationPct = mInc > 0 ? Math.min(Math.abs(mRem) / mInc * 100, 50) : 0;

      html += '<div style="margin-bottom:8px;' + (isCur ? 'font-weight:600;' : '') + '">';
      html += '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">';
      html += '<span style="font-size:12px;color:' + (isCur ? 'var(--text-1)' : 'var(--text-2)') + ';">' + m + (isCur ? ' (now)' : '') + '</span>';
      html += '<span style="font-size:12px;color:' + statusColor + ';font-family:\'SF Mono\',\'DM Mono\',monospace;">' + statusText + '</span>';
      html += '</div>';

      // Center-origin tick bar
      var totalTicks = 41;
      var centerTick = 20;
      var greenTicks = mInc > 0 && isLeft ? Math.round((mRem / mInc) * centerTick) : 0;
      var redTicks = mInc > 0 && isOver ? Math.min(Math.round((Math.abs(mRem) / mInc) * centerTick), centerTick) : 0;

      html += '<div class="tick-bar" style="margin-bottom:2px;" data-fill-count="0">';
      for (var t = 0; t < totalTicks; t++) {
        var isC = t === centerTick;
        var bg = 'rgba(255,255,255,0.06)';

        if (isEmpty) {
          if (isC) bg = 'rgba(255,255,255,0.12)';
        } else if (isDone) {
          if (isC) bg = '#5aa8f5';
          else bg = 'rgba(90,168,245,0.3)';
        } else if (isOver) {
          if (isC) bg = '#ff453a';
          else if (t >= (centerTick - redTicks) && t < centerTick) bg = '#ff453a';
        } else {
          if (isC) bg = '#30d158';
          else if (t > centerTick && t <= (centerTick + greenTicks)) bg = '#30d158';
        }
        html += '<div class="tick" style="background:' + bg + '"></div>';
      }
      html += '</div>';
      html += '</div>';
    });
    html += '</div>';
  }

  html += '</div>';
  container.innerHTML = html;

  container.querySelectorAll('.budget-ov-card').forEach(el => {
    requestAnimationFrame(() => requestAnimationFrame(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }));
  });
  animateTickBars(container);
  requestAnimationFrame(() => {
    const activeBtn = container.querySelector('.budget-month-pill.active');
    if (activeBtn) activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  });
}

function openAddBudgetModal() {
  const types = ['INCOME', 'EXPENSES', 'SAVINGS', 'DEBT'];
  const typeLabels = { INCOME: 'Income', EXPENSES: 'Expenses', SAVINGS: 'Savings', DEBT: 'Debt' };
  const typeOptions = types.map(t => `<option value="${t}">${typeLabels[t]}</option>`).join('');

  const firstType = types[0];
  const catLabel = 'Income';
  const parentCats = (categoriesData && categoriesData[catLabel]) ? categoriesData[catLabel] : (parentBudgetCategories[firstType] || []);
  const catOptions = parentCats.map(c => `<option value="${c}">${c}</option>`).join('');

  document.getElementById('txnModalContent').innerHTML = `
    <div style="font-size:16px;font-weight:600;color:var(--text-1);margin-bottom:12px;">New Budget Item</div>
    <div class="txn-modal-row">
      <div class="txn-modal-label">Type</div>
      <select class="txn-edit-select" id="budgetAddType" onchange="updateBudgetAddCategories()">
        ${typeOptions}
      </select>
    </div>
    <div class="txn-modal-row">
      <div class="txn-modal-label">Category</div>
      <select class="txn-edit-select" id="budgetAddCategory">
        <option value="">None</option>${catOptions}
      </select>
    </div>
    <div class="txn-modal-row">
      <div class="txn-modal-label">Name</div>
      <input type="text" class="txn-edit-input" id="budgetAddName" placeholder="e.g. Groceries">
    </div>
    <div class="txn-modal-row">
      <div class="txn-modal-label">Amount</div>
      <input type="number" class="txn-edit-input" id="budgetAddAmount" placeholder="0.00" step="0.01" min="0">
    </div>
    <div class="txn-modal-row">
      <div class="txn-modal-label">Apply to</div>
      <select class="txn-edit-select" id="budgetAddScope">
        <option value="month">${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][currentBudgetMonth-1]} ${currentBudgetYear} only</option>
        <option value="year">All months in ${currentBudgetYear}</option>
      </select>
    </div>
    <div class="txn-modal-actions">
      <button class="txn-modal-btn cancel" onclick="closeTxnModal()">Cancel</button>
      <button class="txn-modal-btn save" onclick="addNewBudgetItem()">Add</button>
    </div>
    <div class="txn-edit-status" id="budgetAddStatus"></div>
  `;

  openModal();
}

function updateBudgetAddCategories() {
  const type = document.getElementById('budgetAddType').value;
  const catLabel = type === 'INCOME' ? 'Income' : type === 'EXPENSES' ? 'Expenses' : type === 'SAVINGS' ? 'Savings' : 'Debt';
  const parentCats = (categoriesData && categoriesData[catLabel]) ? categoriesData[catLabel] : (parentBudgetCategories[type] || []);
  const catSelect = document.getElementById('budgetAddCategory');
  catSelect.innerHTML = '<option value="">None</option>' + parentCats.map(c => `<option value="${c}">${c}</option>`).join('');
}

async function addNewBudgetItem() {
  const statusEl = document.getElementById('budgetAddStatus');
  const type = document.getElementById('budgetAddType').value;
  const parentCat = document.getElementById('budgetAddCategory').value;
  const name = document.getElementById('budgetAddName').value.trim();
  const amount = parseFloat(document.getElementById('budgetAddAmount').value) || 0;
  const scope = document.getElementById('budgetAddScope').value;

  if (!name) { statusEl.textContent = 'Please enter a name'; statusEl.style.color = 'var(--red)'; return; }

  const compositeKey = type + ':' + name;
  if (budgetCategories[type]?.includes(compositeKey)) {
    statusEl.textContent = 'Already exists'; statusEl.style.color = 'var(--red)'; return;
  }

  statusEl.textContent = 'Adding...'; statusEl.style.color = 'var(--text-2)';

  if (!budgetCategories[type]) budgetCategories[type] = [];
  budgetCategories[type].push(compositeKey);
  if (!budgetData[compositeKey]) budgetData[compositeKey] = {};
  if (parentCat) categoryParentMap[compositeKey] = parentCat;
  if (!window._budgetDisplayNames) window._budgetDisplayNames = {};
  window._budgetDisplayNames[compositeKey] = name;

  // Find next empty row
  const sec = BUDGET_SECTION_ROWS[type];
  if (sec && accessToken) {
    const usedRows = Object.values(window._budgetCatRowMap || {});
    let newRow = sec.start;
    for (let r = sec.start; r <= sec.end; r++) {
      if (!usedRows.includes(r)) { newRow = r; break; }
    }
    window._budgetCatRowMap[compositeKey] = newRow;

    // Write category + name
    try {
      await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(`'Budget Planning'!C${newRow}:D${newRow}`)}?valueInputOption=USER_ENTERED`,
        { method: 'PUT', headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ values: [[parentCat, name]] }) }
      );

      // Write amount(s)
      if (scope === 'year') {
        for (let m = 1; m <= 12; m++) {
          const k = `${currentBudgetYear}-${String(m).padStart(2, '0')}`;
          budgetData[compositeKey][k] = amount;
          if (amount > 0) writeBudgetCell(compositeKey, k, amount);
        }
      } else {
        const k = `${currentBudgetYear}-${String(currentBudgetMonth).padStart(2, '0')}`;
        budgetData[compositeKey][k] = amount;
        if (amount > 0) writeBudgetCell(compositeKey, k, amount);
      }

      statusEl.textContent = 'Added'; statusEl.style.color = 'var(--emerald)';
      setTimeout(() => { closeTxnModal(); renderBudgetPage(); }, 400);
    } catch (err) {
      statusEl.textContent = 'Error: ' + err.message; statusEl.style.color = 'var(--red)';
    }
  }
}

async function fetchAndRenderBudget() {
  if (budgetDataLoaded) {
    if (currentBudgetTab === 'overview') renderBudgetOverview();
    else renderBudgetPage();
    return;
  }
  const overview = document.getElementById('budgetOverviewContent');
  const edit = document.getElementById('budgetEditContent');
  const loadingMsg = '<div style="text-align:center;padding:40px 0;color:var(--text-3);font-size:14px;">Loading budget data...</div>';
  if (overview && !overview.classList.contains('hidden')) overview.innerHTML = loadingMsg;
  if (edit && !edit.classList.contains('hidden')) edit.innerHTML = loadingMsg;
  if (!accessToken) return;
  try {
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent('Budget Planning!C5:AZ424')}?valueRenderOption=UNFORMATTED_VALUE`,
      { headers: { 'Authorization': `Bearer ${accessToken}` } }
    );
    if (!res.ok) throw new Error('Failed to fetch budget data');
    const data = await res.json();
    processBudgetData(data.values || []);
    budgetDataLoaded = true;
    if (currentBudgetTab === 'overview') renderBudgetOverview();
    else renderBudgetPage();
  } catch (err) {
    console.error('Budget page fetch error:', err);
    const errMsg = `<div style="text-align:center;padding:40px 0;color:var(--red);font-size:14px;">Error loading budget: ${err.message}</div>`;
    if (overview) overview.innerHTML = errMsg;
    if (edit) edit.innerHTML = errMsg;
  }
}

function renderBudgetPage() {
  const container = document.getElementById('budgetEditContent');
  if (!container) return;
  const key = `${currentBudgetYear}-${String(currentBudgetMonth).padStart(2, '0')}`;
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  // Month selector — year pinned, months scroll
  let html = '<div class="budget-month-wrapper">';
  html += '<div class="budget-month-bar">';
  html += `<select class="budget-year-select" onchange="currentBudgetYear=parseInt(this.value);renderBudgetPage();">`;
  const years = [...new Set(Object.values(budgetData).flatMap(d => Object.keys(d).map(k => parseInt(k.split('-')[0]))))].sort();
  if (!years.includes(currentBudgetYear)) years.push(currentBudgetYear);
  years.sort((a, b) => a - b).forEach(y => {
    html += `<option value="${y}" ${y === currentBudgetYear ? 'selected' : ''}>${y}</option>`;
  });
  html += '</select>';
  html += '<div class="budget-months-scroll">';
  monthNames.forEach((m, i) => {
    const isActive = (i + 1) === currentBudgetMonth;
    html += `<button class="budget-month-pill ${isActive ? 'active' : ''}" onclick="currentBudgetMonth=${i+1};renderBudgetPage();">${m}</button>`;
  });
  html += '</div></div>';

  // Calculate totals for zero-budget remaining
  const types = [
    { key: 'INCOME', label: 'Income', color: '#30d158' },
    { key: 'EXPENSES', label: 'Expenses', color: '#ff453a' },
    { key: 'SAVINGS', label: 'Savings', color: '#0a84ff' },
    { key: 'DEBT', label: 'Debt', color: '#ff9f0a' },
  ];

  let incomeTotal = 0;
  let outflowTotal = 0;
  types.forEach(type => {
    const cats = budgetCategories[type.key] || [];
    const total = cats.reduce((s, c) => s + (budgetData[c]?.[key] || 0), 0);
    if (type.key === 'INCOME') incomeTotal = total;
    else outflowTotal += total;
  });
  const remaining = incomeTotal - outflowTotal;

  // Remaining allocation banner (inside wrapper so it stays fixed)
  const remClass = remaining > 0 ? 'positive' : remaining < 0 ? 'negative' : 'zero';
  const remColor = remaining > 0 ? 'var(--emerald)' : remaining < 0 ? 'var(--red)' : 'var(--text-3)';
  const remLabel = remaining > 0 ? 'Left to allocate' : remaining < 0 ? 'Over-allocated' : 'Fully allocated';
  const remSign = remaining >= 0 ? '' : '\u2212';
  html += `<div class="budget-remaining ${remClass}" id="budgetRemaining">
    <span class="budget-remaining-label" style="color:${remColor}">${remLabel}</span>
    <span class="budget-remaining-amount" style="color:${remColor}">${remSign}${formatMoney(Math.abs(remaining))}</span>
  </div>`;
  html += '</div>'; // close budget-month-wrapper
  html += '<div class="budget-month-spacer"></div>';

  // Sections
  types.forEach((type, ti) => {
    const cats = budgetCategories[type.key] || [];
    let total = cats.reduce((s, c) => s + (budgetData[c]?.[key] || 0), 0);

    html += `<div class="budget-section" style="opacity:0;transform:translateY(12px);transition:opacity 0.4s cubic-bezier(0.16,1,0.3,1),transform 0.4s cubic-bezier(0.16,1,0.3,1);transition-delay:${ti * 0.04}s">`;
    html += `<div class="budget-section-header">
      <div class="cat-section-dot" style="background:${type.color}"></div>
      <span class="budget-section-name">${type.label}</span>
      <span class="budget-section-total">${formatMoney(total)}</span>
    </div>`;
    html += '<div class="budget-items">';

    cats.forEach((cat, ci) => {
      const amt = budgetData[cat]?.[key] || 0;
      const parent = categoryParentMap[cat] || '';
      const displayName = window._budgetDisplayNames?.[cat] || cat.replace(/^[A-Z]+:/, '');
      const escapedCat = cat.replace(/'/g, "\\'");
      html += `<div class="budget-row">
        <div class="budget-row-info" onclick="editBudgetCategory('${type.key}','${escapedCat}')" style="cursor:pointer;">
          <div class="budget-row-name">${displayName}</div>
          ${parent ? `<div class="budget-row-parent">${parent}</div>` : `<div class="budget-row-parent" style="opacity:0.3;">Tap to set category</div>`}
        </div>
        <input type="number" class="budget-row-amount" value="${amt || ''}" placeholder="0"
          data-cat="${cat}" data-key="${key}" data-type="${type.key}"
          oninput="updateBudgetAmountLive(this)" onchange="updateBudgetAmount(this)" onfocus="this.select()">
        <button class="budget-row-delete" onclick="removeBudgetEntry('${type.key}','${escapedCat}')" aria-label="Remove">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>`;
    });


    html += '</div>';
    html += `<div class="budget-section-footer">Total: <span class="budget-footer-amount">${formatMoney(total)}</span></div>`;
    html += '</div>';
  });

  // FAB button
  html += `<button class="fab-add-txn" onclick="openAddBudgetModal()" aria-label="Add budget item" style="position:fixed;bottom:calc(80px + env(safe-area-inset-bottom, 0px));right:20px;z-index:90;">
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  </button>`;

  container.innerHTML = html;

  // Animate sections
  container.querySelectorAll('.budget-section').forEach(el => {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }));
  });

  // Scroll active month into view
  requestAnimationFrame(() => {
    const activeBtn = container.querySelector('.budget-month-pill.active');
    if (activeBtn) activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  });
}

function updateBudgetAmountLive(input) {
  const cat = input.dataset.cat;
  const key = input.dataset.key;
  const val = parseFloat(input.value) || 0;

  if (!budgetData[cat]) budgetData[cat] = {};
  budgetData[cat][key] = val;

  // Update section total
  const type = input.dataset.type;
  const cats = budgetCategories[type] || [];
  let total = 0;
  cats.forEach(c => { total += budgetData[c]?.[key] || 0; });
  const totalEl = input.closest('.budget-section')?.querySelector('.budget-footer-amount');
  if (totalEl) totalEl.textContent = formatMoney(total);
  const headerTotal = input.closest('.budget-section')?.querySelector('.budget-section-total');
  if (headerTotal) headerTotal.textContent = formatMoney(total);

  // Update remaining banner
  updateBudgetRemaining(key);
}

function updateBudgetAmount(input) {
  const cat = input.dataset.cat;
  const key = input.dataset.key;
  const val = parseFloat(input.value) || 0;
  writeBudgetCell(cat, key, val);
}

async function writeBudgetCell(category, key, value) {
  if (!accessToken) return;
  const sheetRow = window._budgetCatRowMap?.[category];
  const colLetter = window._budgetKeyToCol?.[key];
  if (!sheetRow || !colLetter) {
    console.warn('Budget write: no mapping for', category, key);
    return;
  }
  const cellRef = `'Budget Planning'!${colLetter}${sheetRow}`;
  try {
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(cellRef)}?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: [[value || 0]] })
      }
    );
  } catch (err) {
    console.error('Budget write error:', err);
  }
}

function updateBudgetRemaining(key) {
  let incomeTotal = 0, outflowTotal = 0;
  (budgetCategories['INCOME'] || []).forEach(c => { incomeTotal += budgetData[c]?.[key] || 0; });
  ['EXPENSES', 'SAVINGS', 'DEBT'].forEach(t => {
    (budgetCategories[t] || []).forEach(c => { outflowTotal += budgetData[c]?.[key] || 0; });
  });
  let remaining = incomeTotal - outflowTotal;
  if (Math.abs(remaining) < 1 && incomeTotal > 0) remaining = 0;
  const el = document.getElementById('budgetRemaining');
  if (!el) return;
  const remClass = remaining > 0 ? 'positive' : remaining < 0 ? 'negative' : 'zero';
  const remColor = remaining > 0 ? 'var(--emerald)' : remaining < 0 ? 'var(--red)' : 'var(--text-3)';
  const remLabel = remaining > 0 ? 'Left to allocate' : remaining < 0 ? 'Over-allocated' : 'Fully allocated';
  el.className = 'budget-remaining ' + remClass;
  el.innerHTML = `<span class="budget-remaining-label" style="color:${remColor}">${remLabel}</span><span class="budget-remaining-amount" style="color:${remColor}">${remaining < 0 ? '\u2212' : ''}${formatMoney(Math.abs(remaining))}</span>`;
}

const BUDGET_SECTION_ROWS = {
  'INCOME': { start: 11, end: 111 },
  'EXPENSES': { start: 115, end: 216 },
  'SAVINGS': { start: 220, end: 320 },
  'DEBT': { start: 324, end: 424 },
};

function addBudgetEntry(type) {
  const nameInput = document.getElementById('budgetAddName_' + type);
  const catSelect = document.getElementById('budgetAddCat_' + type);
  if (!nameInput) return;
  const name = nameInput.value.trim();
  const parentCat = catSelect ? catSelect.value : '';
  if (!name) return;
  const compositeKey = type + ':' + name;
  if (budgetCategories[type]?.includes(compositeKey)) { nameInput.value = ''; return; }

  if (!budgetCategories[type]) budgetCategories[type] = [];
  budgetCategories[type].push(compositeKey);
  if (!budgetData[compositeKey]) budgetData[compositeKey] = {};
  if (parentCat) categoryParentMap[compositeKey] = parentCat;
  if (!window._budgetDisplayNames) window._budgetDisplayNames = {};
  window._budgetDisplayNames[compositeKey] = name;

  // Find next empty row in the section
  const sec = BUDGET_SECTION_ROWS[type];
  if (sec) {
    const usedRows = Object.values(window._budgetCatRowMap || {});
    let newRow = sec.start;
    for (let r = sec.start; r <= sec.end; r++) {
      if (!usedRows.includes(r)) { newRow = r; break; }
    }
    window._budgetCatRowMap[compositeKey] = newRow;

    // Write category + subcategory to sheet
    if (accessToken) {
      const range = `'Budget Planning'!C${newRow}:D${newRow}`;
      fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`,
        {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ values: [[parentCat, name]] })
        }
      ).catch(err => console.error('Budget add write error:', err));
    }
  }

  nameInput.value = '';
  renderBudgetPage();
}

function removeBudgetEntry(type, cat) {
  if (!confirm(`Remove "${cat}" from budget?`)) return;
  const idx = budgetCategories[type]?.indexOf(cat);
  if (idx > -1) budgetCategories[type].splice(idx, 1);

  // Clear the row on the sheet — write empty values across C:AZ
  const sheetRow = window._budgetCatRowMap?.[cat];
  if (sheetRow && accessToken) {
    const emptyRow = new Array(50).fill('');
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(`'Budget Planning'!C${sheetRow}:AZ${sheetRow}`)}?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: [emptyRow] })
      }
    ).catch(err => console.error('Budget remove write error:', err));
  }

  if (window._budgetCatRowMap) delete window._budgetCatRowMap[cat];
  delete budgetData[cat];
  delete categoryParentMap[cat];
  renderBudgetPage();
}

function editBudgetCategory(type, cat) {
  const parentCats = (categoriesData && categoriesData[type === 'INCOME' ? 'Income' : type === 'EXPENSES' ? 'Expenses' : type === 'SAVINGS' ? 'Savings' : 'Debt']) || parentBudgetCategories[type] || [];
  const current = categoryParentMap[cat] || '';

  // Build a select in the modal
  const options = parentCats.map(c => `<option value="${c}" ${c === current ? 'selected' : ''}>${c}</option>`).join('');
  document.getElementById('txnModalContent').innerHTML = `
    <div style="font-size:16px;font-weight:600;color:var(--text-1);margin-bottom:12px;">Edit Category</div>
    <div class="txn-modal-row">
      <div class="txn-modal-label">Item</div>
      <div class="txn-modal-value" style="font-weight:600;">${cat}</div>
    </div>
    <div class="txn-modal-row">
      <div class="txn-modal-label">Category</div>
      <select class="txn-edit-select" id="editBudgetCatSelect"><option value="">None</option>${options}</select>
    </div>
    <div class="txn-modal-actions">
      <button class="txn-modal-btn cancel" onclick="closeTxnModal()">Cancel</button>
      <button class="txn-modal-btn save" onclick="saveBudgetCategory('${type}','${cat}')">Save</button>
    </div>
    <div class="txn-edit-status" id="editBudgetStatus"></div>
  `;
  openModal();
}

async function saveBudgetCategory(type, cat) {
  const newParent = document.getElementById('editBudgetCatSelect').value;
  const statusEl = document.getElementById('editBudgetStatus');

  categoryParentMap[cat] = newParent;

  // Write to sheet
  const sheetRow = window._budgetCatRowMap?.[cat];
  if (sheetRow && accessToken) {
    statusEl.textContent = 'Saving...';
    statusEl.style.color = 'var(--text-2)';
    try {
      await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(`'Budget Planning'!C${sheetRow}`)}?valueInputOption=USER_ENTERED`,
        {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ values: [[newParent]] })
        }
      );
      statusEl.textContent = 'Saved';
      statusEl.style.color = 'var(--emerald)';
      setTimeout(() => { closeTxnModal(); renderBudgetPage(); }, 400);
    } catch (err) {
      statusEl.textContent = 'Error: ' + err.message;
      statusEl.style.color = 'var(--red)';
    }
  } else {
    closeTxnModal();
    renderBudgetPage();
  }
}

