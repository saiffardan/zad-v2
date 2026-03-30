
  // ── Transactions Dashboard ──

  // themeToggle2 delegates to main toggle (SVG icons auto-update via CSS data-theme)
  const themeToggle2 = document.getElementById('themeToggle2');
  if (themeToggle2) {
    themeToggle2.addEventListener('click', () => {
      themeToggle.click();
    });
  }

  async function fetchTransactions() {
    if (BACKEND_MODE === 'supabase') return; // Handled by loadSupabaseData
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(TXN_RANGE)}?valueRenderOption=UNFORMATTED_VALUE&dateTimeRenderOption=FORMATTED_STRING`;
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      if (!res.ok) throw new Error('Failed to fetch transactions');
      const data = await res.json();
      processTransactions(data.values || []);
      txnDataLoaded = true;
      if (!document.getElementById('homePage').classList.contains('hidden')) {
        updateHomePage();
      }
      if (currentNavSection === 'transactions') {
        renderTransactionsDashboard();
      }
    } catch (err) {
      console.error('Transaction fetch error:', err);
    }
  }

  async function fetchBudgetData() {
    if (BACKEND_MODE === 'supabase') return; // Handled by loadSupabaseData
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
      const isTransfer = (type === 'TRANSFER');
      allTransactions.push({
        date: normalizeDateStr(row[0]),
        type: type,
        category: row[2] || 'Uncategorized',
        account: row[3] || '--',
        amount: isTransfer ? amount : (isExpenseRefund ? -Math.abs(amount) : Math.abs(amount)),
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
    const convert = convertCurrency;
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
    const convert = convertCurrency;
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
    const convert = convertCurrency;
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
    const convert = convertCurrency;

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
    const convert = convertCurrency;

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
        const isTransferIn = txn.type === 'TRANSFER' && txn.amount > 0;
        const isTransferOut = txn.type === 'TRANSFER' && txn.amount < 0;
        const amtColor = txn.isRefund ? 'var(--emerald)' : isTransferIn ? 'var(--emerald)' : isTransferOut ? 'var(--red)' : (amtColors[txn.type] || 'var(--text-1)');
        const cv = convert(Math.abs(txn.amount));
        const isLarge = cv >= 1000;
        const prefix = txn.isRefund ? '+' : (txn.type === 'INCOME' ? '+' : txn.type === 'EXPENSES' ? '-' : isTransferIn ? '+' : isTransferOut ? '-' : '');
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
    // Show/hide transfer direction
    const transferDirRow = document.getElementById('txnTransferDirRow');
    if (transferDirRow) {
      transferDirRow.style.display = newType === 'TRANSFER' ? '' : 'none';
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
      <div class="txn-modal-row" id="txnTransferDirRow" style="${t.type === 'TRANSFER' ? '' : 'display:none'}">
        <div class="txn-modal-label">Direction</div>
        <select class="txn-edit-select" id="txnTransferDir">
          <option value="out" ${t.amount < 0 ? 'selected' : ''}>Out (−)</option>
          <option value="in" ${t.amount >= 0 ? 'selected' : ''}>In (+)</option>
        </select>
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
    if (!t) return;
    if (BACKEND_MODE === 'sheets' && (!t.sheetRow || !accessToken)) return;

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

    const isRefund = document.getElementById('txnRefundToggle')?.checked || false;
    const transferDir = document.getElementById('txnTransferDir')?.value || 'out';
    let sheetAmount = newAmount;
    if (newType === 'EXPENSES' && !isRefund) sheetAmount = -newAmount;
    if (newType === 'TRANSFER' && transferDir === 'out') sheetAmount = -newAmount;

    try {
      if (BACKEND_MODE === 'supabase') {
        await sbUpsertTransaction({
          id: t.id,
          date: newDate,
          type: newType,
          category: newCategory,
          account: newAccount,
          amount: sheetAmount,
          description: newDesc,
        });
      } else {
        const rowValues = [newDate, newType, newCategory, newAccount, sheetAmount, newDesc];
        const range = `Transactions!B${t.sheetRow}:G${t.sheetRow}`;
        const res = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`,
          {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ range, majorDimension: 'ROWS', values: [rowValues] })
          }
        );
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error?.message || 'Update failed');
        }
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

      const mainIdx = allTransactions.findIndex(tx =>
        BACKEND_MODE === 'supabase' ? tx.id === t.id : tx.sheetRow === t.sheetRow
      );
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
      <div class="txn-modal-row" id="txnTransferDirRow" style="display:none">
        <div class="txn-modal-label">Direction</div>
        <select class="txn-edit-select" id="txnTransferDir">
          <option value="out">Out (−)</option>
          <option value="in">In (+)</option>
        </select>
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
    if (BACKEND_MODE === 'sheets' && !accessToken) { alert('Not signed in'); return; }
    if (BACKEND_MODE === 'supabase' && !supabaseUser) { alert('Not signed in'); return; }

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
    // For TRANSFER: direction determines sign
    const isRefund = document.getElementById('txnRefundToggle')?.checked || false;
    const transferDir = document.getElementById('txnTransferDir')?.value || 'out';
    let sheetAmount = newAmount;
    if (newType === 'EXPENSES' && !isRefund) sheetAmount = -newAmount;
    if (newType === 'TRANSFER' && transferDir === 'out') sheetAmount = -newAmount;

    try {
      let newId = null;
      let newSheetRow = null;

      if (BACKEND_MODE === 'supabase') {
        const result = await sbUpsertTransaction({
          date: newDate,
          type: newType,
          category: newCategory,
          account: newAccount,
          amount: sheetAmount,
          description: newDesc,
        });
        newId = result.id;
      } else {
        const rowValues = [newDate, newType, newCategory, newAccount, sheetAmount, newDesc];
        const res = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent('Transactions!B:G')}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
          {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ majorDimension: 'ROWS', values: [rowValues] })
          }
        );
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error?.message || 'Add failed');
        }
        const result = await res.json();
        const updatedRange = result.updates?.updatedRange || '';
        const rowMatch = updatedRange.match(/(\d+)$/);
        newSheetRow = rowMatch ? parseInt(rowMatch[1]) : allTransactions.length + 14;
      }

      statusEl.textContent = 'Added';
      statusEl.style.color = 'var(--emerald)';

      // Add to local data
      const isExpenseRefund = (newType === 'EXPENSES' && sheetAmount > 0);
      allTransactions.push({
        id: newId,
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
    if (BACKEND_MODE === 'sheets' && !accessToken) { alert('Not signed in'); return; }
    if (BACKEND_MODE === 'supabase' && !supabaseUser) { alert('Not signed in'); return; }

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

    try {
      if (BACKEND_MODE === 'supabase') {
        await sbUpsertTrade({ date, ticker, action, shares, price, type, total });
      } else {
        const rowValues = [date, ticker, action, shares, price, type, total];
        const res = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent('Investments!G:M')}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
          {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ majorDimension: 'ROWS', values: [rowValues] })
          }
        );
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error?.message || 'Add failed');
        }
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
    const convert = convertCurrency;
    if (totalEl && shares > 0 && price > 0) {
      totalEl.textContent = sym + convert(shares * price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
      totalEl.textContent = '--';
    }
  }

  async function executeSell() {
    if (BACKEND_MODE === 'sheets' && !accessToken) { alert('Not signed in'); return; }
    if (BACKEND_MODE === 'supabase' && !supabaseUser) { alert('Not signed in'); return; }

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

    try {
      if (BACKEND_MODE === 'supabase') {
        await sbUpsertTrade({ date, ticker, action: 'SELL', shares, price, type, total });
      } else {
        const rowValues = [date, ticker, 'SELL', shares, price, type, total];
        const res = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent('Investments!G:M')}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
          {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ majorDimension: 'ROWS', values: [rowValues] })
          }
        );
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error?.message || 'Sell failed');
        }
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

  function renderAccountsTab() {
    const container = document.getElementById('accountsContainer');
    if (!container) return;

    const now = new Date();
    const year = nwFilterYear || now.getFullYear();
    const month = nwFilterMonth || (now.getMonth() + 1);
    const isCurrentMonth = year === now.getFullYear() && month === now.getMonth() + 1;

    // Use NW sheet data if available
    if (nwDataLoaded && nwAssets.length > 0) {
      const accountFlows = getMonthlyAccountFlows();
      const debtFlows = getMonthlyDebtFlows();
      const periodKey = year + '-' + month;
      const grouped = {};
      let grandTotal = 0;
      nwAssets.forEach(item => {
        const cat = item.category || 'Uncategorized';
        // Skip investment categories — live portfolio covers it
        if (cat.toLowerCase().includes('investment')) return;
        if (!grouped[cat]) grouped[cat] = { items: [], total: 0 };
        const startVal = getNwValueForPeriod(item, year, month);
        const itemFlow = getItemFlows(item, 'asset', accountFlows, debtFlows);
        const flow = Object.keys(itemFlow).length > 0 ? (itemFlow[periodKey] || 0) : 0;
        const val = startVal + flow;
        grouped[cat].items.push({ name: item.name, balance: val });
        grouped[cat].total += val;
        grandTotal += val;
      });

      // Add live portfolio only for current month
      if (isCurrentMonth) {
        const portfolioTotal = getActiveHoldings().reduce((s, h) => s + (h.currentValue || 0), 0);
        if (portfolioTotal > 0) {
          if (!grouped['Portfolio']) grouped['Portfolio'] = { items: [], total: 0 };
          grouped['Portfolio'].items.push({ name: 'Live Portfolio', balance: portfolioTotal });
          grouped['Portfolio'].total += portfolioTotal;
          grandTotal += portfolioTotal;
        }
      }

      let html = `<div class="acct-hero">
        <div class="acct-hero-label">Total Balance</div>
        <div class="acct-hero-value">${formatMoney(grandTotal)}</div>
      </div>`;

      Object.keys(grouped).forEach(cat => {
        const group = grouped[cat];
        html += `<div class="acct-group">
          <div class="acct-group-header">
            <span class="acct-group-name">${escapeHTML(cat)}</span>
            <span class="acct-group-total">${formatMoney(group.total)}</span>
          </div>
          ${group.items.map(a => `<div class="acct-item">
            <span class="acct-item-name">${escapeHTML(a.name)}</span>
            <span class="acct-item-balance">${formatMoney(a.balance)}</span>
          </div>`).join('')}
        </div>`;
      });

      container.innerHTML = html;
      return;
    }

    // Fallback: from transactions
    const accounts = {};
    allTransactions.forEach(t => {
      if (!t.account || t.account === '--') return;
      if (!accounts[t.account]) accounts[t.account] = 0;
      if (t.type === 'INCOME') accounts[t.account] += t.amount;
      else if (t.type === 'TRANSFER') accounts[t.account] += t.amount;
      else accounts[t.account] -= t.amount;
    });

    const sorted = Object.entries(accounts).sort((a, b) => b[1] - a[1]);
    const total = sorted.reduce((s, [, v]) => s + v, 0);

    let html = `<div class="acct-hero">
      <div class="acct-hero-label">Total Balance</div>
      <div class="acct-hero-value">${formatMoney(total)}</div>
    </div>
    <div class="acct-group">
      <div class="acct-group-header">
        <span class="acct-group-name">All Accounts</span>
        <span class="acct-group-total">${formatMoney(total)}</span>
      </div>
      ${sorted.map(([name, val]) => `<div class="acct-item">
        <span class="acct-item-name">${escapeHTML(name)}</span>
        <span class="acct-item-balance">${formatMoney(val)}</span>
      </div>`).join('')}
    </div>`;

    container.innerHTML = html;
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
    const convert = convertCurrency;
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
    const convert = convertCurrency;
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
    const convert = convertCurrency;
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
    const convert = convertCurrency;
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

    const convert = convertCurrency;
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

    const convert = convertCurrency;
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

    const convert = convertCurrency;
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
    const convert = convertCurrency;
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
  // Initialize auth based on backend mode
  if (BACKEND_MODE === 'supabase') {
    initSupabase();
  } else {
    loadGIS();
  }

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

  // Auto-login: check for existing session
  (async function tryAutoLogin() {
    if (BACKEND_MODE === 'supabase') {
      // Check for existing Supabase session (handles OAuth redirect callback too)
      const hasSession = await checkSupabaseSession();
      if (hasSession) {
        hideSignInScreen();
        document.getElementById('appSidebar').classList.remove('hidden');
        document.getElementById('loadingScreen').classList.remove('hidden');
        loadSupabaseData();
      }
    } else {
      // Google Sheets: check cached token
      const cached = localStorage.getItem('cachedToken');
      const expiresAt = parseInt(localStorage.getItem('tokenExpiresAt') || '0', 10);
      if (cached && Date.now() < expiresAt - 120000) {
        accessToken = cached;
        userFirstName = localStorage.getItem('userName') || '';
        hideSignInScreen();
        document.getElementById('appSidebar').classList.remove('hidden');
        document.getElementById('loadingScreen').classList.remove('hidden');
        fetchSheetData();
      }
    }
  })();

