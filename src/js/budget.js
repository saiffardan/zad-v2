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

