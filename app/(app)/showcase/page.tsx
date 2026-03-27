"use client"

import { useState } from "react"
import { StickyHeader } from "@/components/sticky-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet, SheetContent, SheetDescription, SheetHeader,
  SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  HoverCard, HoverCardContent, HoverCardTrigger,
} from "@/components/ui/hover-card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover"
import {
  Drawer, DrawerClose, DrawerContent, DrawerDescription,
  DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

/* ─── Section wrapper with consistent styling ─── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">{title}</h2>
      {children}
    </section>
  )
}

export default function ShowcasePage() {
  const [progress, setProgress] = useState(65)
  const [switchOn, setSwitchOn] = useState(true)
  const [sliderValue, setSliderValue] = useState([50])
  const [collapsibleOpen, setCollapsibleOpen] = useState(false)

  return (
    <div className="space-y-10">
      <StickyHeader title="Design System" subtitle="Zad component library & design language" />

      {/* ══════════════════════════════════════════════
          SECTION: DESIGN FOUNDATIONS
          ══════════════════════════════════════════════ */}

      {/* ── Color Palette ── */}
      <Section title="Color Palette">
        <div className="grid grid-cols-3 gap-3">
          {[
            { bg: "bg-[#151419]", label: "Dark Void", hex: "#151419" },
            { bg: "bg-[#F56E0F]", label: "Liquid Lava", hex: "#F56E0F" },
            { bg: "bg-[#1B1B1E]", label: "Gluon Grey", hex: "#1B1B1E" },
            { bg: "bg-[#262626]", label: "Slate Grey", hex: "#262626" },
            { bg: "bg-[#878787]", label: "Dusty Grey", hex: "#878787" },
            { bg: "bg-[#FBFBFB]", label: "Snow", hex: "#FBFBFB" },
          ].map((c) => (
            <div key={c.hex} className="space-y-1.5">
              <div className={`h-16 rounded-xl ${c.bg} shadow-depth border border-white/5`} />
              <p className="text-xs font-medium">{c.label}</p>
              <p className="text-[10px] text-muted-foreground font-mono">{c.hex}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2 mt-3">
          {[
            { bg: "bg-primary", label: "Primary" },
            { bg: "bg-destructive", label: "Destructive" },
            { bg: "bg-emerald-500", label: "Success" },
            { bg: "bg-amber-500", label: "Warning" },
          ].map((c) => (
            <div key={c.label} className="space-y-1">
              <div className={`h-10 rounded-lg ${c.bg}`} />
              <p className="text-[10px] text-muted-foreground text-center">{c.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      {/* ── Gradients ── */}
      <Section title="Gradients">
        <div className="space-y-3">
          <div className="h-20 rounded-2xl bg-gradient-to-br from-[#F56E0F] to-[#FF9F43] shadow-depth-lg" />
          <div className="h-20 rounded-2xl bg-gradient-to-br from-[#F56E0F] via-[#e85d04] to-[#dc2f02] shadow-depth-lg" />
          <div className="h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 shadow-depth-lg" />
          <div className="h-20 rounded-2xl bg-gradient-to-br from-[#1B1B1E] to-[#262626] shadow-depth border border-white/5" />
        </div>
      </Section>

      <Separator />

      {/* ── Card Styles ── */}
      <Section title="Card Styles">
        {/* Flat */}
        <div className="rounded-2xl bg-card p-4 border border-border">
          <p className="text-xs text-muted-foreground mb-1">Flat Card</p>
          <p className="text-sm">Basic card with border, no depth.</p>
        </div>

        {/* Elevated */}
        <div className="rounded-2xl bg-card p-4 shadow-depth border border-white/5">
          <p className="text-xs text-muted-foreground mb-1">Elevated Card</p>
          <p className="text-sm">Layered shadow for realistic depth.</p>
        </div>

        {/* Glass */}
        <div className="rounded-2xl glass p-4 shadow-depth border-t-highlight">
          <p className="text-xs text-muted-foreground mb-1">Glass Card</p>
          <p className="text-sm">Frosted glass with backdrop blur.</p>
        </div>

        {/* Gradient border */}
        <div className="rounded-2xl bg-card p-4 border-gradient shadow-depth">
          <p className="text-xs text-muted-foreground mb-1">Gradient Border Card</p>
          <p className="text-sm">Subtle gradient edge for emphasis.</p>
        </div>

        {/* Glowing */}
        <div className="rounded-2xl bg-card p-4 border border-primary/20 glow-primary">
          <p className="text-xs text-muted-foreground mb-1">Glowing Card</p>
          <p className="text-sm">Soft glow for highlighted states.</p>
        </div>

        {/* Stat cards — like the dashboard would use */}
        <p className="text-xs text-muted-foreground pt-2">Stat Cards (Dashboard style)</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-[#F56E0F] to-[#FF9F43] p-4 shadow-depth-lg text-white">
            <p className="text-xs opacity-80">Total Budget</p>
            <p className="text-2xl font-bold mt-1">15,000</p>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="inline-block rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium">Monthly</span>
            </div>
          </div>
          <div className="rounded-2xl glass p-4 shadow-depth border-t-highlight">
            <p className="text-xs text-muted-foreground">Spent</p>
            <p className="text-2xl font-bold mt-1">8,420</p>
            <div className="mt-2">
              <span className="inline-block rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-semibold">56%</span>
            </div>
          </div>
          <div className="rounded-2xl glass p-4 shadow-depth border-t-highlight">
            <p className="text-xs text-muted-foreground">Remaining</p>
            <p className="text-2xl font-bold mt-1">6,580</p>
            <div className="mt-2">
              <span className="inline-block rounded-full bg-emerald-500/10 text-emerald-500 px-2 py-0.5 text-[10px] font-semibold">44%</span>
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 p-4 shadow-depth-lg text-white">
            <p className="text-xs opacity-80">Savings</p>
            <p className="text-2xl font-bold mt-1">3,200</p>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="inline-block rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium">Goal</span>
            </div>
          </div>
        </div>
      </Section>

      <Separator />

      {/* ── Budget Progress (with depth) ── */}
      <Section title="Budget Progress">
        <div className="rounded-2xl glass p-5 shadow-depth border-t-highlight space-y-4">
          {[
            { name: "Housing", spent: 4500, budget: 5000, color: "bg-primary" },
            { name: "Food & Dining", spent: 1800, budget: 2500, color: "bg-primary" },
            { name: "Transport", spent: 620, budget: 1000, color: "bg-amber-500" },
            { name: "Entertainment", spent: 500, budget: 800, color: "bg-emerald-500" },
            { name: "Utilities", spent: 400, budget: 500, color: "bg-primary" },
          ].map((item) => {
            const pct = Math.round((item.spent / item.budget) * 100)
            const isOver = pct > 80
            return (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {item.spent.toLocaleString()} / {item.budget.toLocaleString()}
                  </span>
                </div>
                <div className="relative h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 rounded-full ${item.color} progress-animated ${isOver ? "glow-primary" : ""}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      <Separator />

      {/* ── Transaction List (with depth) ── */}
      <Section title="Transaction List">
        <div className="rounded-2xl glass shadow-depth border-t-highlight overflow-hidden">
          {[
            { name: "Carrefour", category: "Groceries", amount: -245.50, icon: "🛒" },
            { name: "DEWA Bill", category: "Utilities", amount: -380.00, icon: "⚡" },
            { name: "Netflix", category: "Entertainment", amount: -49.99, icon: "🎬" },
            { name: "Salary", category: "Income", amount: 15000.00, icon: "💰" },
            { name: "Uber", category: "Transport", amount: -32.00, icon: "🚗" },
          ].map((tx, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[var(--surface-overlay)] border-b border-border/50 last:border-0"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-lg">
                {tx.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{tx.name}</p>
                <p className="text-xs text-muted-foreground">{tx.category}</p>
              </div>
              <span className={`text-sm font-semibold tabular-nums ${tx.amount > 0 ? "text-emerald-500" : ""}`}>
                {tx.amount > 0 ? "+" : ""}{tx.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      {/* ══════════════════════════════════════════════
          SECTION: ALL COMPONENTS
          ══════════════════════════════════════════════ */}

      {/* ── Buttons ── */}
      <Section title="Buttons">
        <div className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
        {/* Gradient button */}
        <button className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#F56E0F] to-[#FF9F43] px-6 py-2.5 text-sm font-semibold text-white shadow-depth transition-all hover:shadow-depth-lg active:scale-[0.98]">
          Gradient Button
        </button>
      </Section>

      <Separator />

      {/* ── Badges ── */}
      <Section title="Badges">
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
        {/* Custom styled badges */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-semibold">Spent</span>
          <span className="inline-flex items-center rounded-full bg-emerald-500/10 text-emerald-500 px-2.5 py-0.5 text-xs font-semibold">Income</span>
          <span className="inline-flex items-center rounded-full bg-amber-500/10 text-amber-500 px-2.5 py-0.5 text-xs font-semibold">Pending</span>
          <span className="inline-flex items-center rounded-full bg-destructive/10 text-destructive px-2.5 py-0.5 text-xs font-semibold">Over Budget</span>
        </div>
      </Section>

      <Separator />

      {/* ── Inputs ── */}
      <Section title="Inputs">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="s-name">Name</Label>
            <Input id="s-name" placeholder="Enter your name" className="shadow-depth" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="s-amount">Amount (AED)</Label>
            <Input id="s-amount" type="number" placeholder="0.00" className="shadow-depth" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="s-notes">Notes</Label>
            <Textarea id="s-notes" placeholder="Write your notes here..." className="shadow-depth" />
          </div>
        </div>
      </Section>

      <Separator />

      {/* ── Select ── */}
      <Section title="Select">
        <Select>
          <SelectTrigger className="w-full shadow-depth">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="groceries">Groceries</SelectItem>
            <SelectItem value="transport">Transport</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
            <SelectItem value="utilities">Utilities</SelectItem>
            <SelectItem value="rent">Rent</SelectItem>
          </SelectContent>
        </Select>
      </Section>

      <Separator />

      {/* ── Checkbox & Radio ── */}
      <Section title="Checkbox & Radio">
        <div className="rounded-2xl glass p-4 shadow-depth border-t-highlight space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="s-terms" />
            <Label htmlFor="s-terms">Accept terms</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="s-news" defaultChecked />
            <Label htmlFor="s-news">Subscribe to newsletter</Label>
          </div>
        </div>
        <RadioGroup defaultValue="monthly" className="rounded-2xl glass p-4 shadow-depth border-t-highlight">
          {["Daily", "Weekly", "Monthly"].map((v) => (
            <div key={v} className="flex items-center space-x-2">
              <RadioGroupItem value={v.toLowerCase()} id={`s-${v.toLowerCase()}`} />
              <Label htmlFor={`s-${v.toLowerCase()}`}>{v}</Label>
            </div>
          ))}
        </RadioGroup>
      </Section>

      <Separator />

      {/* ── Slider ── */}
      <Section title="Slider">
        <div className="rounded-2xl glass p-4 shadow-depth border-t-highlight">
          <div className="flex justify-between text-sm mb-3">
            <span>Budget allocation</span>
            <span className="font-semibold tabular-nums">{sliderValue[0]}%</span>
          </div>
          <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
        </div>
      </Section>

      <Separator />

      {/* ── Progress ── */}
      <Section title="Progress">
        <div className="rounded-2xl glass p-4 shadow-depth border-t-highlight space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span>Budget used</span>
              <span className="font-semibold tabular-nums">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2.5" />
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setProgress(Math.max(0, progress - 10))}>-10</Button>
            <Button size="sm" variant="outline" onClick={() => setProgress(Math.min(100, progress + 10))}>+10</Button>
          </div>
        </div>
      </Section>

      <Separator />

      {/* ── Switch ── */}
      <Section title="Switch">
        <div className="rounded-2xl glass p-4 shadow-depth border-t-highlight space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="s-notif">Enable notifications</Label>
            <Switch id="s-notif" checked={switchOn} onCheckedChange={setSwitchOn} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="s-dark">Dark mode</Label>
            <Switch id="s-dark" defaultChecked />
          </div>
        </div>
      </Section>

      <Separator />

      {/* ── Toggle ── */}
      <Section title="Toggle">
        <div className="flex flex-wrap gap-2">
          <Toggle aria-label="Bold"><span className="font-bold">B</span></Toggle>
          <Toggle aria-label="Italic"><span className="italic">I</span></Toggle>
          <Toggle aria-label="Underline"><span className="underline">U</span></Toggle>
          <Toggle variant="outline" aria-label="Outline">Outline</Toggle>
        </div>
      </Section>

      <Separator />

      {/* ── Tabs ── */}
      <Section title="Tabs">
        <Tabs defaultValue="overview">
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
            <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="rounded-2xl glass p-4 shadow-depth border-t-highlight">
              <p className="text-sm">Overview tab with glass card styling.</p>
            </div>
          </TabsContent>
          <TabsContent value="details">
            <div className="rounded-2xl glass p-4 shadow-depth border-t-highlight">
              <p className="text-sm">Details tab content here.</p>
            </div>
          </TabsContent>
          <TabsContent value="history">
            <div className="rounded-2xl glass p-4 shadow-depth border-t-highlight">
              <p className="text-sm">History tab content here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </Section>

      <Separator />

      {/* ── Accordion ── */}
      <Section title="Accordion">
        <div className="rounded-2xl glass shadow-depth border-t-highlight overflow-hidden">
          <Accordion type="single" collapsible className="px-4">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Zad?</AccordionTrigger>
              <AccordionContent>
                A personal budgeting app that helps you track expenses and manage finances.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How does it work?</AccordionTrigger>
              <AccordionContent>
                Reads transactions from Google Sheets and lets you categorize and budget.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is my data secure?</AccordionTrigger>
              <AccordionContent>
                All data stays in your Google Sheets via OAuth2. Nothing stored on our servers.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Section>

      <Separator />

      {/* ── Collapsible ── */}
      <Section title="Collapsible">
        <div className="rounded-2xl glass p-4 shadow-depth border-t-highlight">
          <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">3 subcategories</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">{collapsibleOpen ? "Hide" : "Show"}</Button>
              </CollapsibleTrigger>
            </div>
            <div className="rounded-lg bg-muted px-3 py-2 text-sm mt-2">Food &amp; Dining</div>
            <CollapsibleContent className="space-y-2 mt-2">
              <div className="rounded-lg bg-muted px-3 py-2 text-sm">Groceries</div>
              <div className="rounded-lg bg-muted px-3 py-2 text-sm">Restaurants</div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </Section>

      <Separator />

      {/* ── Alerts ── */}
      <Section title="Alerts">
        <Alert className="shadow-depth">
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>You have 3 uncategorized transactions.</AlertDescription>
        </Alert>
        <Alert variant="destructive" className="shadow-depth">
          <AlertTitle>Over budget!</AlertTitle>
          <AlertDescription>Grocery budget exceeded by AED 150.</AlertDescription>
        </Alert>
      </Section>

      <Separator />

      {/* ── Alert Dialog ── */}
      <Section title="Alert Dialog">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Category</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the category and all subcategories.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Section>

      <Separator />

      {/* ── Avatar ── */}
      <Section title="Avatar">
        <div className="flex items-center gap-3">
          <Avatar className="ring-2 ring-primary/20">
            <AvatarFallback className="bg-gradient-to-br from-primary to-[#FF9F43] text-white">SF</AvatarFallback>
          </Avatar>
          <Avatar className="ring-2 ring-emerald-500/20">
            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-400 text-white">ZD</AvatarFallback>
          </Avatar>
          <Avatar className="h-12 w-12 ring-2 ring-primary/20">
            <AvatarFallback className="bg-gradient-to-br from-primary to-[#FF9F43] text-white text-lg">A</AvatarFallback>
          </Avatar>
        </div>
      </Section>

      <Separator />

      {/* ── Skeleton ── */}
      <Section title="Skeleton (Loading)">
        <div className="rounded-2xl glass p-4 shadow-depth border-t-highlight">
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
        </div>
      </Section>

      <Separator />

      {/* ── Table ── */}
      <Section title="Table">
        <div className="rounded-2xl glass shadow-depth border-t-highlight overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { date: "Mar 27", name: "Carrefour", amount: "245.50" },
                { date: "Mar 26", name: "DEWA Bill", amount: "380.00" },
                { date: "Mar 25", name: "Netflix", amount: "49.99" },
                { date: "Mar 24", name: "Uber", amount: "32.00" },
              ].map((r, i) => (
                <TableRow key={i} className="transition-colors hover:bg-[var(--surface-overlay)]">
                  <TableCell className="text-muted-foreground">{r.date}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell className="text-right tabular-nums">{r.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Section>

      <Separator />

      {/* ── Dropdown Menu ── */}
      <Section title="Dropdown Menu">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit transaction</DropdownMenuItem>
            <DropdownMenuItem>Change category</DropdownMenuItem>
            <DropdownMenuItem>Add note</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Section>

      <Separator />

      {/* ── Popover ── */}
      <Section title="Popover">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Quick Add</h4>
              <div className="space-y-1.5">
                <Label htmlFor="pop-amt">Amount</Label>
                <Input id="pop-amt" type="number" placeholder="0.00" />
              </div>
              <Button size="sm" className="w-full">Add</Button>
            </div>
          </PopoverContent>
        </Popover>
      </Section>

      <Separator />

      {/* ── Hover Card ── */}
      <Section title="Hover Card">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="p-0 h-auto">@groceries</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-64">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Groceries</h4>
              <p className="text-xs text-muted-foreground">Budget: AED 2,000</p>
              <p className="text-xs text-muted-foreground">Spent: AED 1,450</p>
              <Progress value={72} className="h-1.5 mt-2" />
            </div>
          </HoverCardContent>
        </HoverCard>
      </Section>

      <Separator />

      {/* ── Tooltip ── */}
      <Section title="Tooltip">
        <TooltipProvider>
          <div className="flex gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon"><span className="text-lg">+</span></Button>
              </TooltipTrigger>
              <TooltipContent><p>Add transaction</p></TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon"><span className="text-lg">?</span></Button>
              </TooltipTrigger>
              <TooltipContent><p>Help &amp; support</p></TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </Section>

      <Separator />

      {/* ── Dialog ── */}
      <Section title="Dialog (Modal)">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
              <DialogDescription>Enter the details of your transaction.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="d-name">Name</Label>
                <Input id="d-name" placeholder="e.g. Carrefour" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="d-amount">Amount</Label>
                <Input id="d-amount" type="number" placeholder="0.00" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      <Separator />

      {/* ── Sheet ── */}
      <Section title="Sheet (Slide-over)">
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">From Bottom</Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-2xl">
              <SheetHeader>
                <SheetTitle>Filter Transactions</SheetTitle>
                <SheetDescription>Choose categories and date range</SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-3">
                <Input placeholder="Search categories..." />
                <div className="flex flex-wrap gap-2">
                  {["Groceries", "Transport", "Entertainment", "Utilities"].map((c) => (
                    <span key={c} className="inline-flex rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-semibold">{c}</span>
                  ))}
                </div>
                <Button className="w-full">Apply Filter</Button>
              </div>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">From Right</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Details</SheetTitle>
                <SheetDescription>Transaction details</SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-2 text-sm">
                <p><span className="text-muted-foreground">Name:</span> Carrefour</p>
                <p><span className="text-muted-foreground">Amount:</span> AED 245.50</p>
                <p><span className="text-muted-foreground">Category:</span> Groceries</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Section>

      <Separator />

      {/* ── Drawer ── */}
      <Section title="Drawer">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Set Budget</DrawerTitle>
              <DrawerDescription>Set your monthly budget for this category.</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 space-y-3">
              <div className="space-y-1.5">
                <Label>Monthly Budget (AED)</Label>
                <Input type="number" placeholder="0.00" />
              </div>
            </div>
            <DrawerFooter>
              <Button>Save</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Section>

      <Separator />

      {/* ── Breadcrumb ── */}
      <Section title="Breadcrumb">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/budgets">Budgets</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Groceries</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Section>

      <Separator />

      {/* ── Scroll Area ── */}
      <Section title="Scroll Area">
        <div className="rounded-2xl glass shadow-depth border-t-highlight overflow-hidden">
          <ScrollArea className="h-48 p-4">
            {Array.from({ length: 15 }, (_, i) => (
              <div key={i} className="flex items-center justify-between border-b border-border/50 py-2.5 last:border-0">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm">Transaction #{i + 1}</span>
                </div>
                <span className="text-sm tabular-nums text-muted-foreground">
                  AED {((i + 1) * 23.5).toFixed(2)}
                </span>
              </div>
            ))}
          </ScrollArea>
        </div>
      </Section>

      <Separator />

      {/* ── Separator showcase ── */}
      <Section title="Separator">
        <div className="space-y-2">
          <Separator />
          <div className="flex items-center gap-3 h-8">
            <span className="text-sm">Item A</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Item B</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Item C</span>
          </div>
        </div>
      </Section>

      <div className="h-20" />
    </div>
  )
}
