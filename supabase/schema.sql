-- Zad Finance Dashboard — Supabase Schema
-- Run this in your Supabase SQL editor to set up the database

-- ── Trades (Portfolio) ──
create table if not exists trades (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  date text not null,                -- DD/MM/YYYY format (matches sheet format)
  ticker text not null,
  action text not null,              -- 'BUY' or 'SELL'
  shares numeric not null default 0,
  price numeric not null default 0,
  type text not null default 'Other', -- 'Equity', 'ETF', 'Crypto', 'Bond', 'REIT'
  total numeric not null default 0,
  created_at timestamptz default now()
);

create index if not exists trades_user_id_idx on trades(user_id);
create index if not exists trades_ticker_idx on trades(user_id, ticker);

-- ── Transactions ──
create table if not exists transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  date text not null,                -- DD/MM/YYYY format
  type text not null,                -- 'INCOME', 'EXPENSES', 'SAVINGS', 'DEBT', 'TRANSFER'
  category text not null default '',
  account text not null default '',
  amount numeric not null default 0, -- Negative for expenses/outflows
  description text default '',
  created_at timestamptz default now()
);

create index if not exists transactions_user_id_idx on transactions(user_id);
create index if not exists transactions_date_idx on transactions(user_id, date);

-- ── Categories ──
create table if not exists categories (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  parent_name text,                  -- NULL for parent categories, parent name for subcategories
  type text not null,                -- 'INCOME', 'EXPENSES', 'SAVINGS', 'DEBT'
  sort_order int default 0,
  created_at timestamptz default now()
);

create index if not exists categories_user_id_idx on categories(user_id);
create unique index if not exists categories_unique_idx on categories(user_id, name, type);

-- ── Budget ──
create table if not exists budget (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  category text not null,
  parent_category text,
  type text not null,                -- 'INCOME', 'EXPENSES', 'SAVINGS', 'DEBT'
  month_key text not null,           -- 'YYYY-MM' format
  amount numeric not null default 0,
  created_at timestamptz default now()
);

create index if not exists budget_user_id_idx on budget(user_id);
create unique index if not exists budget_unique_idx on budget(user_id, category, month_key);

-- ── Net Worth ──
create table if not exists net_worth (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  item_type text not null,           -- 'asset' or 'liability'
  category text not null,
  name text not null,
  year int not null,
  month int not null,                -- 1-12
  value numeric not null default 0,
  created_at timestamptz default now()
);

create index if not exists net_worth_user_id_idx on net_worth(user_id);
create unique index if not exists net_worth_unique_idx on net_worth(user_id, name, year, month);

-- ── Row Level Security ──
-- Each user can only access their own data

alter table trades enable row level security;
alter table transactions enable row level security;
alter table categories enable row level security;
alter table budget enable row level security;
alter table net_worth enable row level security;

-- Trades policies
create policy "Users can view own trades"
  on trades for select using (auth.uid() = user_id);
create policy "Users can insert own trades"
  on trades for insert with check (auth.uid() = user_id);
create policy "Users can update own trades"
  on trades for update using (auth.uid() = user_id);
create policy "Users can delete own trades"
  on trades for delete using (auth.uid() = user_id);

-- Transactions policies
create policy "Users can view own transactions"
  on transactions for select using (auth.uid() = user_id);
create policy "Users can insert own transactions"
  on transactions for insert with check (auth.uid() = user_id);
create policy "Users can update own transactions"
  on transactions for update using (auth.uid() = user_id);
create policy "Users can delete own transactions"
  on transactions for delete using (auth.uid() = user_id);

-- Categories policies
create policy "Users can view own categories"
  on categories for select using (auth.uid() = user_id);
create policy "Users can insert own categories"
  on categories for insert with check (auth.uid() = user_id);
create policy "Users can update own categories"
  on categories for update using (auth.uid() = user_id);
create policy "Users can delete own categories"
  on categories for delete using (auth.uid() = user_id);

-- Budget policies
create policy "Users can view own budget"
  on budget for select using (auth.uid() = user_id);
create policy "Users can insert own budget"
  on budget for insert with check (auth.uid() = user_id);
create policy "Users can update own budget"
  on budget for update using (auth.uid() = user_id);
create policy "Users can delete own budget"
  on budget for delete using (auth.uid() = user_id);

-- Net Worth policies
create policy "Users can view own net worth"
  on net_worth for select using (auth.uid() = user_id);
create policy "Users can insert own net worth"
  on net_worth for insert with check (auth.uid() = user_id);
create policy "Users can update own net worth"
  on net_worth for update using (auth.uid() = user_id);
create policy "Users can delete own net worth"
  on net_worth for delete using (auth.uid() = user_id);
