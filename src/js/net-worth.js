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
  const tabNames = { dashboard: 'Dashboard', accounts: 'Accounts', planning: 'Planning' };
  if (indicator) indicator.textContent = tabNames[tab] || '';
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
  const accounts = document.getElementById('nwAccountsContent');
  const planning = document.getElementById('nwPlanningContent');
  dashboard.classList.toggle('hidden', tab !== 'dashboard');
  accounts.classList.toggle('hidden', tab !== 'accounts');
  planning.classList.toggle('hidden', tab !== 'planning');
  if (tab === 'dashboard') renderNwDashboard();
  if (tab === 'accounts') renderAccountsTab();
  if (tab === 'planning') renderNwPlanning();
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
    else if (t.type === 'TRANSFER') flows[t.account][key] += t.amount; // sign preserved: - = out, + = in
  });
  return flows;
}

// Calculates monthly payment totals per DEBT category (for liability matching)
function getMonthlyDebtFlows() {
  const flows = {}; // { 'HSBC Car Loan': { '2026-3': -2500, ... } }
  allTransactions.forEach(t => {
    if (t.type !== 'DEBT') return;
    const d = parseTxnDate(t.date);
    if (!d || d.getTime() === 0) return;
    const key = d.getFullYear() + '-' + (d.getMonth() + 1);
    const cat = t.category || '';
    if (!cat) return;
    if (!flows[cat]) flows[cat] = {};
    if (!flows[cat][key]) flows[cat][key] = 0;
    flows[cat][key] -= t.amount; // debt payments reduce the liability
  });
  return flows;
}

// Get the appropriate flow source for a net worth item
// Assets: match by account name
// Liabilities: match by transaction debt category first, then account name
function getItemFlows(item, type, accountFlows, debtFlows) {
  if (type === 'liability' || type === 'liabilities') {
    // Try matching liability name to a debt transaction category
    if (debtFlows[item.name]) return debtFlows[item.name];
  }
  // Default: match by account name
  return accountFlows[item.name] || {};
}

// ── Calculation ──
function getNwValueForPeriod(item, year, month) {
  const val = item.values[year + '-' + month];
  if (val !== undefined && val !== null) return val;
  // Fall back to most recent previous month's value
  for (let y = year; y >= Math.min(...nwYears.map(yb => yb.year)); y--) {
    const maxM = y === year ? month - 1 : 12;
    for (let m = maxM; m >= 1; m--) {
      const v = item.values[y + '-' + m];
      if (v !== undefined && v !== null) return v;
    }
  }
  return 0;
}

function calculateNwForPeriod(year, month) {
  const now = new Date();
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth() + 1;
  const portfolioTotal = isCurrentMonth
    ? getActiveHoldings().reduce((s, h) => s + (h.currentValue || 0), 0)
    : 0;

  const accountFlows = getMonthlyAccountFlows();
  const debtFlows = getMonthlyDebtFlows();
  const periodKey = year + '-' + month;

  let totalAssets = portfolioTotal;
  let totalLiabilities = 0;

  // Group assets by category — starting balance + transaction flow
  const assetsByCategory = {};
  nwAssets.forEach(item => {
    const startVal = getNwValueForPeriod(item, year, month);
    const itemFlow = getItemFlows(item, 'asset', accountFlows, debtFlows);
    const flow = Object.keys(itemFlow).length > 0 ? (itemFlow[periodKey] || 0) : 0;
    const val = startVal + flow;
    const cat = item.category || 'Uncategorized';
    if (!assetsByCategory[cat]) assetsByCategory[cat] = [];
    assetsByCategory[cat].push({ ...item, periodValue: val });
    // Skip "Investment Account" category — use live portfolio value instead
    if (cat.toLowerCase() !== 'investment account') {
      totalAssets += val;
    }
  });

  // Group liabilities by category — starting balance + debt payment flow
  const liabsByCategory = {};
  nwLiabilities.forEach(item => {
    const startVal = getNwValueForPeriod(item, year, month);
    const itemFlow = getItemFlows(item, 'liability', accountFlows, debtFlows);
    const flow = Object.keys(itemFlow).length > 0 ? (itemFlow[periodKey] || 0) : 0;
    const val = startVal + flow;
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
  else if (currentNwTab === 'accounts') renderAccountsTab();
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
  const debtFlows = getMonthlyDebtFlows();

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
          const rawVal = getNwValueForPeriod(item, nwFilterYear, nwFilterMonth);
          const inputVal = rawVal ? parseFloat(rawVal.toFixed(2)) : '';
          const prevMo = nwFilterMonth === 1 ? 12 : nwFilterMonth - 1;
          const prevYr = nwFilterMonth === 1 ? nwFilterYear - 1 : nwFilterYear;
          const prevKey = prevYr + '-' + prevMo;
          const itemFlow = getItemFlows(item, type, accountFlows, debtFlows);
          const prevFlow = Object.keys(itemFlow).length > 0 ? (itemFlow[prevKey] || 0) : null;
          const hasFlow = Object.keys(itemFlow).length > 0;
          return `<div class="nw-plan-item">
            <div class="nw-plan-item-left">
              <span class="nw-plan-item-name">${escapeHTML(item.name)}</span>
              <span class="nw-plan-item-display">${rawVal ? formatMoney(rawVal) : '—'}</span>
              ${hasFlow ? `<span class="nw-plan-item-flow" style="color: ${prevFlow >= 0 ? 'var(--emerald)' : 'var(--red)'}">${NW_MONTH_NAMES[prevMo - 1]} flow: ${prevFlow >= 0 ? '+' : ''}${formatMoney(prevFlow)}</span>` : ''}
            </div>
            <div class="nw-plan-item-right">
              <input class="nw-plan-input" type="number" inputmode="decimal" value="${inputVal}" placeholder="—"
                data-row="${item.sheetRow}" data-type="${type}"
                onchange="updateNwItemValue(this, '${type}', ${item.sheetRow}, ${nwFilterYear}, ${nwFilterMonth})" />
            </div>
          </div>`;
        }).join('')}
      </div>`;
    }).join('');
  };

  const now = new Date();
  const nextMo = now.getMonth() === 11 ? 1 : now.getMonth() + 2;
  const nextYr = now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();

  container.innerHTML = `
    <div class="nw-update-bar">
      <button class="nw-update-btn" id="nwProjectBtn" onclick="runProjectNextMonth()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
        Update ${NW_MONTH_NAMES[nextMo - 1]} ${nextYr}
      </button>
    </div>
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
  const val = Math.round((parseFloat(input.value) || 0) * 100) / 100;
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



window.runProjectNextMonth = async function runProjectNextMonth() {
  const btn = document.getElementById('nwProjectBtn');
  if (btn) { btn.disabled = true; btn.style.opacity = '0.5'; }
  await projectNextMonth();
  if (btn) { btn.disabled = false; btn.style.opacity = ''; btn.style.color = 'var(--emerald)'; setTimeout(() => { btn.style.color = ''; }, 1200); }
  renderNwPlanning();
  renderNwDashboard();
};

window.closeNwModal = function closeNwModal() {
  const overlay = document.getElementById('nwModalOverlay');
  if (overlay) overlay.remove();
};

// ── Monthly auto-refresh ──
// On the 1st of a new month (or first visit that month), auto-fill current month
// for all account-linked items: prev month value + prev month flow
// Projects next month's values based on current month's starting value + current month's flow so far.
// e.g. During March: April = March value + March flow. Once April starts, May = April value + April flow.
async function projectNextMonth() {
  if (!accessToken || nwYears.length === 0) return;

  const now = new Date();
  const curYear = now.getFullYear();
  const curMonth = now.getMonth() + 1;
  const curKey = curYear + '-' + curMonth;
  const nextMonth = curMonth === 12 ? 1 : curMonth + 1;
  const nextYear = curMonth === 12 ? curYear + 1 : curYear;
  const nextKey = nextYear + '-' + nextMonth;

  // Only project if next month's year exists in the sheet
  if (!nwYears.find(y => y.year === nextYear)) return;

  const accountFlows = getMonthlyAccountFlows();
  const debtFlows = getMonthlyDebtFlows();
  const writeData = [];

  const processItems = (items, type) => {
    items.forEach(item => {
      // Use current month value, or fall back to most recent available value
      let curVal = item.values[curKey];
      if (curVal === undefined || curVal === null) {
        // Find the most recent month with a value
        for (let y = curYear; y >= Math.min(...nwYears.map(yb => yb.year)); y--) {
          const maxM = y === curYear ? curMonth : 12;
          for (let m = maxM; m >= 1; m--) {
            const v = item.values[y + '-' + m];
            if (v !== undefined && v !== null) { curVal = v; break; }
          }
          if (curVal !== undefined && curVal !== null) break;
        }
      }
      if (curVal === undefined || curVal === null) return; // truly no data at all
      const itemFlow = getItemFlows(item, type, accountFlows, debtFlows);
      const curFlow = Object.keys(itemFlow).length > 0 ? (itemFlow[curKey] || 0) : 0;
      const newVal = parseFloat((curVal + curFlow).toFixed(2));
      item.values[nextKey] = newVal;
      const col = getNwSheetCol(nextYear, nextMonth);
      if (col) writeData.push({ range: `Net Worth Planning!${col}${item.sheetRow}`, values: [[newVal]] });
    });
  };

  processItems(nwAssets, 'asset');
  processItems(nwLiabilities, 'liability');

  if (writeData.length === 0) return;

  try {
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchUpdate`,
      {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ valueInputOption: 'USER_ENTERED', data: writeData })
      }
    );
  } catch (err) {
    console.error('NW projection error:', err);
  }
}

async function renderNetWorthPage() {
  if (!nwDataLoaded && accessToken) {
    const container = document.getElementById('nwDashboardContent');
    if (container) container.innerHTML = '<div class="nw-empty">Loading...</div>';
    await fetchNetWorthData();
    await projectNextMonth();
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

