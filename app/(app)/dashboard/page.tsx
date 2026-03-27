import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { StickyHeader } from "@/components/sticky-header"

const stats = [
  { label: "Total Budget", value: "AED 15,000", badge: "Monthly", badgeVariant: "secondary" as const },
  { label: "Spent", value: "AED 8,420", badge: "56%", badgeVariant: "warning" as const },
  { label: "Remaining", value: "AED 6,580", badge: "44%", badgeVariant: "success" as const },
  { label: "Savings", value: "AED 3,200", badge: "Goal", badgeVariant: "secondary" as const },
]

const budgetCategories = [
  { name: "Housing", spent: 4500, budget: 5000 },
  { name: "Food & Dining", spent: 1800, budget: 2500 },
  { name: "Transport", spent: 620, budget: 1000 },
  { name: "Entertainment", spent: 500, budget: 800 },
  { name: "Utilities", spent: 400, budget: 500 },
]

const recentTransactions = [
  { name: "Carrefour", category: "Groceries", amount: -245.50, date: "Today" },
  { name: "DEWA", category: "Utilities", amount: -380.00, date: "Yesterday" },
  { name: "Salary", category: "Income", amount: 15000.00, date: "Mar 25" },
  { name: "Netflix", category: "Entertainment", amount: -54.99, date: "Mar 24" },
  { name: "Fuel", category: "Transport", amount: -180.00, date: "Mar 23" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <StickyHeader title="Dashboard" subtitle="Your financial overview" />

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardTitle>{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-bold">{stat.value}</span>
                <Badge variant={stat.badgeVariant}>{stat.badge}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Budget Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-foreground">Budget Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {budgetCategories.map((cat) => (
            <div key={cat.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{cat.name}</span>
                <span className="text-muted-foreground">
                  {cat.spent.toLocaleString()} / {cat.budget.toLocaleString()}
                </span>
              </div>
              <Progress value={(cat.spent / cat.budget) * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-foreground">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((tx, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{tx.name}</span>
                  <span className="text-xs text-muted-foreground">{tx.category} &middot; {tx.date}</span>
                </div>
                <span
                  className={`text-sm font-semibold tabular-nums ${tx.amount > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}
                >
                  {tx.amount > 0 ? "+" : ""}
                  {tx.amount.toLocaleString("en-AE", { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
