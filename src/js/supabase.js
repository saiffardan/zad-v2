// ── Supabase Client & Auth ──
// Active when BACKEND_MODE === 'supabase'

let supabase = null;
let supabaseUser = null;

function initSupabase() {
  if (BACKEND_MODE !== 'supabase') return;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('[Zad] Supabase URL or anon key not configured.');
    return;
  }
  if (typeof window.supabase === 'undefined' || !window.supabase.createClient) {
    console.warn('[Zad] Supabase JS library not loaded.');
    return;
  }
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      flowType: 'pkce',
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    }
  });

  // Listen for auth state changes
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
      supabaseUser = session?.user || null;
      if (supabaseUser) {
        userFirstName = (supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || supabaseUser.email || '').split(' ')[0];
        localStorage.setItem('userName', userFirstName);
      }
    } else if (event === 'SIGNED_OUT') {
      supabaseUser = null;
    }
  });
}

async function handleSupabaseSignIn() {
  if (!supabase) {
    showSignInError('Supabase not initialized. Check your configuration.');
    return;
  }
  const btn = document.getElementById('signInBtn');
  if (btn) btn.classList.add('loading');

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      }
    }
  });

  if (error) {
    if (btn) btn.classList.remove('loading');
    showSignInError('Sign-in failed: ' + error.message);
  }
  // On success, page redirects to Google then back — onAuthStateChange handles the rest
}

async function handleSupabaseSignOut() {
  if (supabase) {
    await supabase.auth.signOut();
  }
  supabaseUser = null;
  handleSignOut(); // Reuse existing UI cleanup
}

async function checkSupabaseSession() {
  if (!supabase) return false;
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.user) {
    supabaseUser = session.user;
    userFirstName = (session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email || '').split(' ')[0];
    localStorage.setItem('userName', userFirstName);
    return true;
  }
  return false;
}

// ── Supabase Data Layer ──
// These functions mirror the Sheets API but read/write from Supabase tables

async function sbFetchTrades() {
  const { data, error } = await supabase
    .from('trades')
    .select('*')
    .eq('user_id', supabaseUser.id)
    .order('date', { ascending: false });
  if (error) throw new Error('Failed to fetch trades: ' + error.message);
  return data || [];
}

async function sbFetchTransactions() {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', supabaseUser.id)
    .order('date', { ascending: false });
  if (error) throw new Error('Failed to fetch transactions: ' + error.message);
  return data || [];
}

async function sbFetchBudget() {
  const { data, error } = await supabase
    .from('budget')
    .select('*')
    .eq('user_id', supabaseUser.id);
  if (error) throw new Error('Failed to fetch budget: ' + error.message);
  return data || [];
}

async function sbFetchCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', supabaseUser.id)
    .order('sort_order', { ascending: true });
  if (error) throw new Error('Failed to fetch categories: ' + error.message);
  return data || [];
}

async function sbFetchNetWorth() {
  const { data, error } = await supabase
    .from('net_worth')
    .select('*')
    .eq('user_id', supabaseUser.id)
    .order('year', { ascending: true });
  if (error) throw new Error('Failed to fetch net worth: ' + error.message);
  return data || [];
}

// ── Write Operations ──

async function sbUpsertTrade(trade) {
  const row = {
    user_id: supabaseUser.id,
    date: trade.date,
    ticker: trade.ticker,
    action: trade.action,
    shares: trade.shares,
    price: trade.price,
    type: trade.type,
    total: trade.total,
  };
  if (trade.id) row.id = trade.id;
  const { data, error } = await supabase
    .from('trades')
    .upsert(row)
    .select()
    .single();
  if (error) throw new Error('Failed to save trade: ' + error.message);
  return data;
}

async function sbDeleteTrade(tradeId) {
  const { error } = await supabase
    .from('trades')
    .delete()
    .eq('id', tradeId)
    .eq('user_id', supabaseUser.id);
  if (error) throw new Error('Failed to delete trade: ' + error.message);
}

async function sbUpsertTransaction(txn) {
  const row = {
    user_id: supabaseUser.id,
    date: txn.date,
    type: txn.type,
    category: txn.category,
    account: txn.account,
    amount: txn.amount,
    description: txn.description,
  };
  if (txn.id) row.id = txn.id;
  const { data, error } = await supabase
    .from('transactions')
    .upsert(row)
    .select()
    .single();
  if (error) throw new Error('Failed to save transaction: ' + error.message);
  return data;
}

async function sbDeleteTransaction(txnId) {
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', txnId)
    .eq('user_id', supabaseUser.id);
  if (error) throw new Error('Failed to delete transaction: ' + error.message);
}

async function sbUpsertBudget(item) {
  const row = {
    user_id: supabaseUser.id,
    category: item.category,
    parent_category: item.parentCategory || null,
    type: item.type,
    month_key: item.monthKey,
    amount: item.amount,
  };
  if (item.id) row.id = item.id;
  const { data, error } = await supabase
    .from('budget')
    .upsert(row, { onConflict: 'user_id,category,month_key' })
    .select()
    .single();
  if (error) throw new Error('Failed to save budget: ' + error.message);
  return data;
}

async function sbUpsertCategory(cat) {
  const row = {
    user_id: supabaseUser.id,
    name: cat.name,
    parent_name: cat.parentName || null,
    type: cat.type,
    sort_order: cat.sortOrder || 0,
  };
  if (cat.id) row.id = cat.id;
  const { data, error } = await supabase
    .from('categories')
    .upsert(row)
    .select()
    .single();
  if (error) throw new Error('Failed to save category: ' + error.message);
  return data;
}

async function sbDeleteCategory(catId) {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', catId)
    .eq('user_id', supabaseUser.id);
  if (error) throw new Error('Failed to delete category: ' + error.message);
}

async function sbUpsertNetWorthItem(item) {
  const row = {
    user_id: supabaseUser.id,
    item_type: item.itemType, // 'asset' or 'liability'
    category: item.category,
    name: item.name,
    year: item.year,
    month: item.month,
    value: item.value,
  };
  if (item.id) row.id = item.id;
  const { data, error } = await supabase
    .from('net_worth')
    .upsert(row, { onConflict: 'user_id,name,year,month' })
    .select()
    .single();
  if (error) throw new Error('Failed to save net worth item: ' + error.message);
  return data;
}

// ── Supabase Data Loading (main entry point) ──

async function loadSupabaseData() {
  try {
    setLoadingPhase('portfolio');

    // Fetch trades and process into holdings
    const trades = await sbFetchTrades();
    processSupabaseTrades(trades);

    setLoadingPhase('prices');

    // Fetch everything else in parallel
    await Promise.all([
      fetchLivePrices(),
      sbFetchTransactions().then(txns => {
        processSupabaseTransactions(txns);
        txnDataLoaded = true;
        setLoadingPhase('transactions');
        if (!document.getElementById('homePage').classList.contains('hidden')) {
          updateHomePage();
        }
        if (currentNavSection === 'transactions') {
          renderTransactionsDashboard();
        }
      }).catch(e => console.warn('Txn fetch:', e)),
      sbFetchBudget().then(rows => {
        processSupabaseBudget(rows);
        budgetDataLoaded = true;
      }).catch(e => console.warn('Budget fetch:', e)),
      sbFetchCategories().then(cats => {
        processSupabaseCategories(cats);
      }).catch(e => console.warn('Categories fetch:', e)),
      sbFetchNetWorth().then(rows => {
        processSupabaseNetWorth(rows);
        nwDataLoaded = true;
      }).catch(e => console.warn('NW fetch:', e)),
    ]);

    stopLoadingMessages();
    renderDashboard();
  } catch (e) {
    stopLoadingMessages();
    console.error('[Zad] loadSupabaseData error:', e);
    document.getElementById('loadingScreen').classList.add('hidden');
    const signInEl = document.getElementById('signInScreen');
    signInEl.style.display = '';
    signInEl.classList.remove('hidden');
    showSignInError(e.message || 'Failed to load data. Please try again.');
  }
}

// ── Data Processors (Supabase rows → app state) ──

function processSupabaseTrades(rows) {
  allTrades = [];
  holdings = {};

  for (const row of rows) {
    const trade = {
      id: row.id,
      date: row.date,
      ticker: (row.ticker || '').toUpperCase(),
      action: (row.action || '').toUpperCase(),
      shares: parseFloat(row.shares) || 0,
      price: parseFloat(row.price) || 0,
      type: row.type || 'Other',
      total: parseFloat(row.total) || 0,
    };
    if (!trade.total) trade.total = trade.shares * trade.price;
    if (!trade.ticker || !trade.action) continue;

    allTrades.push(trade);

    if (!holdings[trade.ticker]) {
      holdings[trade.ticker] = { ticker: trade.ticker, type: trade.type, shares: 0, totalSpent: 0, totalSold: 0, buys: 0, sells: 0 };
    }

    const isBuy = trade.action.includes('BUY');
    if (isBuy) {
      holdings[trade.ticker].shares += trade.shares;
      holdings[trade.ticker].totalSpent += Math.abs(trade.total);
      holdings[trade.ticker].buys++;
    } else {
      holdings[trade.ticker].shares -= trade.shares;
      holdings[trade.ticker].totalSold += Math.abs(trade.total);
      holdings[trade.ticker].sells++;
    }
  }

  for (const h of Object.values(holdings)) {
    h.netInvested = h.totalSpent - h.totalSold;
    h.avgCost = h.shares > 0 ? h.totalSpent / h.shares : 0;
  }
}

function processSupabaseTransactions(rows) {
  allTransactions = [];
  for (const row of rows) {
    const rawAmount = parseFloat(row.amount) || 0;
    const type = (row.type || '').toUpperCase();
    const isExpenseRefund = (type === 'EXPENSES' && rawAmount > 0);
    allTransactions.push({
      id: row.id,
      date: row.date,
      type: type,
      category: row.category || '',
      account: row.account || '',
      amount: isExpenseRefund ? -Math.abs(rawAmount) : Math.abs(rawAmount),
      isRefund: isExpenseRefund,
      description: row.description || '',
    });
  }
  allTransactions.sort((a, b) => parseTxnDate(b.date) - parseTxnDate(a.date));
}

function processSupabaseBudget(rows) {
  budgetData = {};
  for (const row of rows) {
    const cat = row.category;
    const key = row.month_key; // 'YYYY-MM'
    if (!budgetData[cat]) budgetData[cat] = {};
    budgetData[cat][key] = parseFloat(row.amount) || 0;
  }
}

function processSupabaseCategories(rows) {
  budgetCategories = { INCOME: [], EXPENSES: [], SAVINGS: [], DEBT: [] };
  parentBudgetCategories = { INCOME: [], EXPENSES: [], SAVINGS: [], DEBT: [] };
  categoryParentMap = {};

  for (const row of rows) {
    const type = (row.type || '').toUpperCase();
    if (!budgetCategories[type]) continue;

    if (row.parent_name) {
      // Subcategory
      budgetCategories[type].push(row.name);
      categoryParentMap[row.name] = row.parent_name;
    } else {
      // Parent category
      parentBudgetCategories[type].push(row.name);
    }
  }
}

function processSupabaseNetWorth(rows) {
  nwYears = [];
  nwAssets = [];
  nwLiabilities = [];

  // Group by item name
  const itemMap = {};
  for (const row of rows) {
    const key = `${row.item_type}:${row.name}`;
    if (!itemMap[key]) {
      itemMap[key] = {
        category: row.category,
        name: row.name,
        itemType: row.item_type,
        values: {},
      };
    }
    itemMap[key].values[`${row.year}-${row.month}`] = parseFloat(row.value) || 0;

    // Track years
    if (!nwYears.find(y => y.year === row.year)) {
      nwYears.push({ year: row.year, colOffset: 0 });
    }
  }

  nwYears.sort((a, b) => a.year - b.year);

  for (const item of Object.values(itemMap)) {
    if (item.itemType === 'asset') {
      nwAssets.push(item);
    } else {
      nwLiabilities.push(item);
    }
  }
}
