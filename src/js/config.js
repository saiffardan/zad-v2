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
  const TYPE_COLORS = { 'Equity': '#5aa8f5', 'Stock': '#5aa8f5', 'ETF': '#30d158', 'Crypto': '#ff9f0a', 'Bond': '#ac8eff', 'REIT': '#00c7be' };
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
