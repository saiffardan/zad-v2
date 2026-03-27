import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { StickyHeader } from "@/components/sticky-header"

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
      <StickyHeader title="Dashboard" />

      {/* Monthly Income */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Monthly Income</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-3xl font-bold text-emerald-500">AED 29.4K</p>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Expenses</span>
              <span className="font-medium">9.1K</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Savings</span>
              <span className="font-medium">8.0K</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Debt</span>
              <span className="font-medium">3.7K</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Remaining & Savings */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-bold">AED 6,580</span>
              <Badge variant="success">44%</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-bold">AED 3,200</span>
              <Badge variant="secondary">Goal</Badge>
            </div>
          </CardContent>
        </Card>
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
