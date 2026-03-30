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

