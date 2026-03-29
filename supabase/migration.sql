-- Zad Finance App — Supabase Schema Migration
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- ══════════════════════════════════════════════
-- 1. CATEGORIES
-- ══════════════════════════════════════════════
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('INCOME', 'EXPENSES', 'SAVINGS', 'DEBT', 'TRANSFER')),
  parent_category TEXT,  -- e.g., "Food & Drink" parent for "Groceries"
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_categories_user ON categories(user_id);
CREATE UNIQUE INDEX idx_categories_unique ON categories(user_id, type, name);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own categories" ON categories FOR ALL USING (auth.uid() = user_id);

-- ══════════════════════════════════════════════
-- 2. ACCOUNTS
-- ══════════════════════════════════════════════
CREATE TABLE accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'bank' CHECK (type IN ('bank', 'credit_card', 'savings', 'wallet', 'other')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_accounts_user ON accounts(user_id);
CREATE UNIQUE INDEX idx_accounts_unique ON accounts(user_id, name);

ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own accounts" ON accounts FOR ALL USING (auth.uid() = user_id);

-- ══════════════════════════════════════════════
-- 3. TRANSACTIONS
-- ══════════════════════════════════════════════
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('INCOME', 'EXPENSES', 'SAVINGS', 'DEBT', 'TRANSFER')),
  category TEXT NOT NULL,
  account_id UUID REFERENCES accounts(id) ON DELETE SET NULL,
  amount NUMERIC(12,2) NOT NULL,  -- signed: positive=in, negative=out
  description TEXT,
  is_refund BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_txn_user ON transactions(user_id);
CREATE INDEX idx_txn_date ON transactions(user_id, date DESC);
CREATE INDEX idx_txn_type ON transactions(user_id, type);
CREATE INDEX idx_txn_category ON transactions(user_id, category);
CREATE INDEX idx_txn_account ON transactions(user_id, account_id);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own transactions" ON transactions FOR ALL USING (auth.uid() = user_id);

-- ══════════════════════════════════════════════
-- 4. PORTFOLIO TRADES
-- ══════════════════════════════════════════════
CREATE TABLE portfolio_trades (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  ticker TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('BUY', 'SELL')),
  shares NUMERIC(12,6) NOT NULL,
  price NUMERIC(12,4) NOT NULL,
  asset_type TEXT NOT NULL DEFAULT 'Stock' CHECK (asset_type IN ('Stock', 'ETF', 'Crypto', 'REIT', 'Other')),
  total NUMERIC(14,2),  -- shares * price
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_trades_user ON portfolio_trades(user_id);
CREATE INDEX idx_trades_ticker ON portfolio_trades(user_id, ticker);
CREATE INDEX idx_trades_date ON portfolio_trades(user_id, date DESC);

ALTER TABLE portfolio_trades ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own trades" ON portfolio_trades FOR ALL USING (auth.uid() = user_id);

-- ══════════════════════════════════════════════
-- 5. BUDGET ITEMS
-- ══════════════════════════════════════════════
CREATE TABLE budget_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('INCOME', 'EXPENSES', 'SAVINGS', 'DEBT')),
  category TEXT NOT NULL,
  parent_category TEXT,
  year INT NOT NULL,
  month INT NOT NULL CHECK (month BETWEEN 1 AND 12),
  amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_budget_user ON budget_items(user_id);
CREATE INDEX idx_budget_period ON budget_items(user_id, year, month);
CREATE UNIQUE INDEX idx_budget_unique ON budget_items(user_id, type, category, year, month);

ALTER TABLE budget_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own budget" ON budget_items FOR ALL USING (auth.uid() = user_id);

-- ══════════════════════════════════════════════
-- 6. NET WORTH ITEMS
-- ══════════════════════════════════════════════
CREATE TABLE net_worth_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('asset', 'liability')),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_nw_items_user ON net_worth_items(user_id);
CREATE UNIQUE INDEX idx_nw_items_unique ON net_worth_items(user_id, type, name);

ALTER TABLE net_worth_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own nw items" ON net_worth_items FOR ALL USING (auth.uid() = user_id);

-- ══════════════════════════════════════════════
-- 7. NET WORTH SNAPSHOTS (monthly values)
-- ══════════════════════════════════════════════
CREATE TABLE net_worth_snapshots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  item_id UUID REFERENCES net_worth_items(id) ON DELETE CASCADE NOT NULL,
  year INT NOT NULL,
  month INT NOT NULL CHECK (month BETWEEN 1 AND 12),
  value NUMERIC(14,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_nw_snap_user ON net_worth_snapshots(user_id);
CREATE INDEX idx_nw_snap_item ON net_worth_snapshots(item_id);
CREATE INDEX idx_nw_snap_period ON net_worth_snapshots(user_id, year, month);
CREATE UNIQUE INDEX idx_nw_snap_unique ON net_worth_snapshots(user_id, item_id, year, month);

ALTER TABLE net_worth_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own snapshots" ON net_worth_snapshots FOR ALL USING (auth.uid() = user_id);

-- ══════════════════════════════════════════════
-- 8. USER PREFERENCES
-- ══════════════════════════════════════════════
CREATE TABLE user_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT,
  currency TEXT DEFAULT 'AED' CHECK (currency IN ('AED', 'USD')),
  theme TEXT DEFAULT 'dark' CHECK (theme IN ('dark', 'light')),
  advisor_config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own preferences" ON user_preferences FOR ALL USING (auth.uid() = user_id);

-- ══════════════════════════════════════════════
-- 9. AUTO-UPDATE TIMESTAMP TRIGGER
-- ══════════════════════════════════════════════
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_transactions_updated
  BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_budget_updated
  BEFORE UPDATE ON budget_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_nw_snap_updated
  BEFORE UPDATE ON net_worth_snapshots
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_prefs_updated
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ══════════════════════════════════════════════
-- 10. AUTO-CREATE PREFERENCES ON SIGN-UP
-- ══════════════════════════════════════════════
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_preferences (user_id, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
