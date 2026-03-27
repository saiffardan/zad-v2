"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-provider"

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-foreground">Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Toggle light and dark theme</p>
            </div>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-foreground">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Manage your budget categories and subcategories.
          </p>
          <Separator />
          {["Housing", "Food & Dining", "Transport", "Entertainment", "Utilities", "Health", "Shopping"].map(
            (cat) => (
              <div key={cat} className="flex items-center justify-between py-1">
                <span className="text-sm">{cat}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4 text-muted-foreground"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            )
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-foreground">Google Sheets</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Connect your Google Sheets to import transactions automatically.
          </p>
          <div className="mt-3 rounded-lg border border-dashed p-4 text-center">
            <p className="text-sm text-muted-foreground">Not connected</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
