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

