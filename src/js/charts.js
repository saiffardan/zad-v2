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
