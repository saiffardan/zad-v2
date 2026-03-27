import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const budgets = [
  {
    category: "Housing",
    budget: 5000,
    spent: 4500,
    subcategories: [
      { name: "Rent", spent: 4000, budget: 4000 },
      { name: "Maintenance", spent: 500, budget: 1000 },
    ],
  },
  {
    category: "Food & Dining",
    budget: 2500,
    spent: 1800,
    subcategories: [
      { name: "Groceries", spent: 1200, budget: 1500 },
      { name: "Restaurants", spent: 400, budget: 600 },
      { name: "Fast Food", spent: 200, budget: 400 },
    ],
  },
  {
    category: "Transport",
    budget: 1000,
    spent: 620,
    subcategories: [
      { name: "Fuel", spent: 400, budget: 600 },
      { name: "Parking", spent: 120, budget: 200 },
      { name: "Maintenance", spent: 100, budget: 200 },
    ],
  },
  {
    category: "Entertainment",
    budget: 800,
    spent: 500,
    subcategories: [
      { name: "Streaming", spent: 150, budget: 200 },
      { name: "Movies", spent: 100, budget: 200 },
      { name: "Games", spent: 250, budget: 400 },
    ],
  },
  {
    category: "Utilities",
    budget: 500,
    spent: 400,
    subcategories: [
      { name: "Electricity", spent: 200, budget: 250 },
      { name: "Internet", spent: 200, budget: 250 },
    ],
  },
]

function getStatusBadge(spent: number, budget: number) {
  const pct = (spent / budget) * 100
  if (pct >= 90) return <Badge variant="destructive">Over</Badge>
  if (pct >= 70) return <Badge variant="warning">Caution</Badge>
  return <Badge variant="success">On Track</Badge>
}

export default function BudgetsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Budgets</h1>
          <p className="text-sm text-muted-foreground">Manage your spending limits</p>
        </div>
      </div>

      <div className="space-y-3">
        {budgets.map((budget) => {
          const pct = Math.round((budget.spent / budget.budget) * 100)
          return (
            <Card key={budget.category}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold text-foreground">
                    {budget.category}
                  </CardTitle>
                  {getStatusBadge(budget.spent, budget.budget)}
                </div>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-muted-foreground">
                    AED {budget.spent.toLocaleString()} of {budget.budget.toLocaleString()}
                  </span>
                  <span className="font-medium">{pct}%</span>
                </div>
                <Progress value={pct} className="h-2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {budget.subcategories.map((sub) => {
                    const subPct = Math.round((sub.spent / sub.budget) * 100)
                    return (
                      <div key={sub.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{sub.name}</span>
                          <span className="tabular-nums text-muted-foreground">
                            {sub.spent} / {sub.budget} ({subPct}%)
                          </span>
                        </div>
                        <Progress value={subPct} className="h-1" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
