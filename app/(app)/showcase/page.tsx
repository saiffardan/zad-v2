"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ShowcasePage() {
  const [progress, setProgress] = useState(65)
  const [switchOn, setSwitchOn] = useState(true)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Component Showcase</h1>
        <p className="text-sm text-muted-foreground">All available shadcn/ui components</p>
      </div>

      {/* ── Buttons ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="xs">XS</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <Separator />

      {/* ── Cards ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Cards</h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">Card Title</CardTitle>
            <CardDescription>Card description goes here</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">This is the card content area. You can put anything here.</p>
          </CardContent>
          <CardFooter className="gap-2">
            <Button size="sm">Action</Button>
            <Button variant="outline" size="sm">Cancel</Button>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold">AED 24.5K</span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold">AED 8.2K</span>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* ── Badges ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Badges</h2>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </div>
      </section>

      <Separator />

      {/* ── Inputs & Labels ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Inputs</h2>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="amount">Amount (AED)</Label>
            <Input id="amount" type="number" placeholder="0.00" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="disabled">Disabled</Label>
            <Input id="disabled" placeholder="Can't type here" disabled />
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Progress ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Progress</h2>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span>Budget used</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="space-y-1.5">
            <span className="text-sm">25%</span>
            <Progress value={25} className="h-2" />
          </div>
          <div className="space-y-1.5">
            <span className="text-sm">50%</span>
            <Progress value={50} className="h-3" />
          </div>
          <div className="space-y-1.5">
            <span className="text-sm">90%</span>
            <Progress value={90} className="h-2" />
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setProgress(Math.max(0, progress - 10))}>
              -10
            </Button>
            <Button size="sm" variant="outline" onClick={() => setProgress(Math.min(100, progress + 10))}>
              +10
            </Button>
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Tabs ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Tabs</h2>
        <Tabs defaultValue="overview">
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
            <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardContent className="pt-4">
                <p className="text-sm">This is the overview tab content.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="details">
            <Card>
              <CardContent className="pt-4">
                <p className="text-sm">This is the details tab content.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="history">
            <Card>
              <CardContent className="pt-4">
                <p className="text-sm">This is the history tab content.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <Separator />

      {/* ── Switch ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Switch</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Enable notifications</Label>
            <Switch id="notifications" checked={switchOn} onCheckedChange={setSwitchOn} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="disabled-switch">Disabled switch</Label>
            <Switch id="disabled-switch" disabled />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Switch is {switchOn ? "ON" : "OFF"}
        </p>
      </section>

      <Separator />

      {/* ── Avatar ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Avatar</h2>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>SF</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>ZD</AvatarFallback>
          </Avatar>
          <Avatar className="h-12 w-12">
            <AvatarFallback className="text-lg">A</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">SM</AvatarFallback>
          </Avatar>
        </div>
      </section>

      <Separator />

      {/* ── Skeleton ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Skeleton (Loading states)</h2>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* ── Dialog ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Dialog (Modal)</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
              <DialogDescription>Enter the details of your transaction below.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="tx-name">Name</Label>
                <Input id="tx-name" placeholder="e.g. Carrefour" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tx-amount">Amount</Label>
                <Input id="tx-amount" type="number" placeholder="0.00" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>

      <Separator />

      {/* ── Sheet ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Sheet (Slide-over panel)</h2>
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open from Bottom</Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-2xl">
              <SheetHeader>
                <SheetTitle>Filter Transactions</SheetTitle>
                <SheetDescription>Choose categories and date range</SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-3">
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Input placeholder="Search categories..." />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Groceries</Badge>
                  <Badge variant="secondary">Transport</Badge>
                  <Badge variant="secondary">Entertainment</Badge>
                  <Badge variant="secondary">Utilities</Badge>
                </div>
                <Button className="w-full">Apply Filter</Button>
              </div>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open from Right</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Details</SheetTitle>
                <SheetDescription>Transaction details panel</SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-2 text-sm">
                <p><span className="text-muted-foreground">Name:</span> Carrefour</p>
                <p><span className="text-muted-foreground">Amount:</span> AED 245.50</p>
                <p><span className="text-muted-foreground">Category:</span> Groceries</p>
                <p><span className="text-muted-foreground">Date:</span> Mar 27, 2026</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </section>

      <Separator />

      {/* ── Scroll Area ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Scroll Area</h2>
        <Card>
          <CardContent className="p-0">
            <ScrollArea className="h-48 p-4">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="flex items-center justify-between border-b py-2 last:border-0">
                  <span className="text-sm">Transaction #{i + 1}</span>
                  <span className="text-sm tabular-nums text-muted-foreground">
                    AED {(Math.random() * 500).toFixed(2)}
                  </span>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* ── Separator ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Separator</h2>
        <p className="text-sm text-muted-foreground">You&apos;ve been seeing these between each section above.</p>
        <div className="space-y-2">
          <p className="text-sm">Horizontal separator:</p>
          <Separator />
          <div className="flex items-center gap-3 h-8">
            <span className="text-sm">Item A</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Item B</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Item C</span>
          </div>
        </div>
      </section>

      {/* ── Color Palette ── */}
      <Separator />
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Color Palette</h2>
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <div className="h-12 rounded-lg bg-primary" />
            <p className="text-[10px] text-muted-foreground text-center">Primary (Teal)</p>
          </div>
          <div className="space-y-1">
            <div className="h-12 rounded-lg bg-secondary" />
            <p className="text-[10px] text-muted-foreground text-center">Secondary</p>
          </div>
          <div className="space-y-1">
            <div className="h-12 rounded-lg bg-muted" />
            <p className="text-[10px] text-muted-foreground text-center">Muted</p>
          </div>
          <div className="space-y-1">
            <div className="h-12 rounded-lg bg-destructive" />
            <p className="text-[10px] text-muted-foreground text-center">Destructive</p>
          </div>
          <div className="space-y-1">
            <div className="h-12 rounded-lg bg-emerald-500" />
            <p className="text-[10px] text-muted-foreground text-center">Success</p>
          </div>
          <div className="space-y-1">
            <div className="h-12 rounded-lg bg-amber-500" />
            <p className="text-[10px] text-muted-foreground text-center">Warning</p>
          </div>
          <div className="space-y-1">
            <div className="h-12 rounded-lg bg-background border" />
            <p className="text-[10px] text-muted-foreground text-center">Background</p>
          </div>
          <div className="space-y-1">
            <div className="h-12 rounded-lg bg-card border" />
            <p className="text-[10px] text-muted-foreground text-center">Card</p>
          </div>
          <div className="space-y-1">
            <div className="h-12 rounded-lg bg-foreground" />
            <p className="text-[10px] text-muted-foreground text-center">Foreground</p>
          </div>
        </div>
      </section>

      <div className="h-4" />
    </div>
  )
}
