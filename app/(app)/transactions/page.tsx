import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StickyHeader } from "@/components/sticky-header"

const transactions = [
  { name: "Carrefour", category: "Groceries", subcategory: "Food", amount: -245.50, date: "Mar 27" },
  { name: "DEWA", category: "Utilities", subcategory: "Electricity", amount: -380.00, date: "Mar 26" },
  { name: "Salary", category: "Income", subcategory: "Employment", amount: 15000.00, date: "Mar 25" },
  { name: "Netflix", category: "Entertainment", subcategory: "Streaming", amount: -54.99, date: "Mar 24" },
  { name: "Fuel - ADNOC", category: "Transport", subcategory: "Fuel", amount: -180.00, date: "Mar 23" },
  { name: "Zara", category: "Shopping", subcategory: "Clothing", amount: -320.00, date: "Mar 22" },
  { name: "McDonald's", category: "Food & Dining", subcategory: "Fast Food", amount: -45.00, date: "Mar 21" },
  { name: "Du Bill", category: "Utilities", subcategory: "Internet", amount: -399.00, date: "Mar 20" },
  { name: "Gym Membership", category: "Health", subcategory: "Fitness", amount: -250.00, date: "Mar 19" },
  { name: "Freelance Payment", category: "Income", subcategory: "Freelance", amount: 3500.00, date: "Mar 18" },
]

export default function TransactionsPage() {
  return (
    <div className="space-y-4">
      <StickyHeader title="Transactions" subtitle="Your recent spending activity" />

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-foreground">March 2026</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((tx, i) => (
              <div key={i} className="flex items-center justify-between py-1">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">{tx.name}</span>
                  <div className="flex items-center gap-1.5">
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      {tx.category}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">{tx.date}</span>
                  </div>
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
