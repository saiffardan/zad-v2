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
    })
    .catch(() => {});
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

      // Fetch live prices + transactions + net worth in parallel
      await Promise.all([
        fetchLivePrices(),
        fetchTransactions().then(() => {
          setLoadingPhase('transactions');
        }).catch(e => console.warn('Txn fetch:', e)),
        fetchBudgetData().catch(e => console.warn('Budget fetch:', e)),
        fetchNetWorthData().catch(e => console.warn('NW fetch:', e))
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
