import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { StickyHeader } from "@/components/sticky-header"

function DonutChart({
  slices,
  size,
  strokeWidth,
  gap = 4,
}: {
  slices: { value: number; color: string }[]
  size: number
  strokeWidth: number
  gap?: number
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const total = slices.reduce((sum, s) => sum + s.value, 0)
  // Gap in circumference units per slice
  const gapSize = (gap / 360) * circumference * slices.length
  const usable = circumference - gapSize
  const sliceGap = (gap / 360) * circumference

  let offset = 0
  const segments = slices.map((slice) => {
    const pct = slice.value / total
    const dash = pct * usable
    const space = circumference - dash
    const rotation = (offset / circumference) * 360 - 90
    offset += dash + sliceGap
    return { dash, space, rotation, color: slice.color }
  })

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {segments.map((seg, i) => (
        <circle
          key={i}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={seg.color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${seg.dash} ${seg.space}`}
          strokeLinecap="round"
          transform={`rotate(${seg.rotation} ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dasharray 0.5s ease" }}
        />
      ))}
    </svg>
  )
}

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
        <CardContent>
          <p className="text-3xl font-bold text-emerald-500 mb-4">AED 29.4K</p>
          <div className="flex gap-4">
            {/* Left: breakdown list */}
            <div className="flex-1 space-y-2.5">
              {[
                { label: "Expenses", value: "9.1K", color: "#F56E0F" },
                { label: "Savings", value: "8.0K", color: "#10B981" },
                { label: "Debt", value: "3.7K", color: "#EF4444" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm">
                  <span
                    className="size-2 rounded-full shrink-0"
                    style={{ background: item.color }}
                  />
                  <span className="text-muted-foreground flex-1">{item.label}</span>
                  <span className="font-medium tabular-nums">{item.value}</span>
                </div>
              ))}
            </div>
            {/* Right: donut chart */}
            <div className="relative shrink-0 flex items-center justify-center">
              <DonutChart
                slices={[
                  { value: 9.1, color: "#F56E0F" },
                  { value: 8.0, color: "#10B981" },
                  { value: 3.7, color: "#EF4444" },
                  { value: 8.6, color: "#878787" },
                ]}
                size={120}
                strokeWidth={14}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Remaining</span>
                <span className="text-lg font-bold leading-tight">8.6K</span>
              </div>
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
