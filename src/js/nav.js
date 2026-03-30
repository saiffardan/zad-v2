
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

    // Net worth — use Net Worth Planning sheet data if available, else fall back to transaction-based
    const netWorthEl = document.getElementById('homeNetWorth');
    if (netWorthEl) {
      let netWorth;
      if (nwDataLoaded && (nwAssets.length > 0 || nwLiabilities.length > 0)) {
        const now = new Date();
        const data = calculateNwForPeriod(now.getFullYear(), now.getMonth() + 1);
        netWorth = data.netWorth;
      } else {
        const totalIncome = allTransactions.filter(t => t.type === 'INCOME').reduce((s, t) => s + t.amount, 0);
        const totalExpenses = allTransactions.filter(t => t.type === 'EXPENSES').reduce((s, t) => s + t.amount, 0);
        const totalSavings = allTransactions.filter(t => t.type === 'SAVINGS').reduce((s, t) => s + t.amount, 0);
        const totalDebt = allTransactions.filter(t => t.type === 'DEBT').reduce((s, t) => s + t.amount, 0);
        netWorth = totalIncome - totalExpenses - totalSavings - totalDebt + portfolioTotal;
      }
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

