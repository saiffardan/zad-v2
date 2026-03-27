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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function ShowcasePage() {
  const [progress, setProgress] = useState(65)
  const [switchOn, setSwitchOn] = useState(true)
  const [sliderValue, setSliderValue] = useState([50])
  const [collapsibleOpen, setCollapsibleOpen] = useState(false)

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
            <Input id="disabled" placeholder="Can&apos;t type here" disabled />
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Textarea ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Textarea</h2>
        <div className="space-y-1.5">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" placeholder="Write your notes here..." />
        </div>
      </section>

      <Separator />

      {/* ── Select ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Select</h2>
        <Select>
          <SelectTrigger className="w-full">
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
      </section>

      <Separator />

      {/* ── Checkbox ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Checkbox</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="newsletter" defaultChecked />
            <Label htmlFor="newsletter">Subscribe to newsletter</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="disabled-check" disabled />
            <Label htmlFor="disabled-check" className="text-muted-foreground">Disabled checkbox</Label>
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Radio Group ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Radio Group</h2>
        <RadioGroup defaultValue="monthly">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="daily" id="daily" />
            <Label htmlFor="daily">Daily</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="weekly" id="weekly" />
            <Label htmlFor="weekly">Weekly</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="monthly" id="monthly" />
            <Label htmlFor="monthly">Monthly</Label>
          </div>
        </RadioGroup>
      </section>

      <Separator />

      {/* ── Slider ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Slider</h2>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span>Budget allocation</span>
              <span>{sliderValue[0]}%</span>
            </div>
            <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
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

      {/* ── Toggle ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Toggle</h2>
        <div className="flex flex-wrap gap-2">
          <Toggle aria-label="Toggle bold">
            <span className="font-bold">B</span>
          </Toggle>
          <Toggle aria-label="Toggle italic">
            <span className="italic">I</span>
          </Toggle>
          <Toggle aria-label="Toggle underline">
            <span className="underline">U</span>
          </Toggle>
          <Toggle variant="outline" aria-label="Toggle outline">
            Outline
          </Toggle>
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

      {/* ── Accordion ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Accordion</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Zad?</AccordionTrigger>
            <AccordionContent>
              Zad is a personal budgeting app that helps you track expenses, set budgets, and manage your finances.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How does it work?</AccordionTrigger>
            <AccordionContent>
              It reads transactions from your Google Sheets and lets you categorize, budget, and analyze your spending.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is my data secure?</AccordionTrigger>
            <AccordionContent>
              Yes, all data stays in your Google Sheets. We use OAuth2 for secure access and never store your data on our servers.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <Separator />

      {/* ── Collapsible ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Collapsible</h2>
        <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">3 subcategories</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {collapsibleOpen ? "Hide" : "Show"}
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="rounded-md border px-4 py-3 text-sm mt-2">Food & Dining</div>
          <CollapsibleContent className="space-y-2 mt-2">
            <div className="rounded-md border px-4 py-3 text-sm">Groceries</div>
            <div className="rounded-md border px-4 py-3 text-sm">Restaurants</div>
          </CollapsibleContent>
        </Collapsible>
      </section>

      <Separator />

      {/* ── Alert ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Alert</h2>
        <Alert>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You have 3 transactions that need to be categorized.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertTitle>Over budget!</AlertTitle>
          <AlertDescription>
            You&apos;ve exceeded your monthly grocery budget by AED 150.
          </AlertDescription>
        </Alert>
      </section>

      <Separator />

      {/* ── Alert Dialog ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Alert Dialog</h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Category</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the category and all its subcategories. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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

      {/* ── Table ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Table</h2>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-muted-foreground">Mar 27</TableCell>
                  <TableCell>Carrefour</TableCell>
                  <TableCell className="text-right tabular-nums">AED 245.50</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">Mar 26</TableCell>
                  <TableCell>DEWA Bill</TableCell>
                  <TableCell className="text-right tabular-nums">AED 380.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">Mar 25</TableCell>
                  <TableCell>Netflix</TableCell>
                  <TableCell className="text-right tabular-nums">AED 49.99</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">Mar 24</TableCell>
                  <TableCell>Uber</TableCell>
                  <TableCell className="text-right tabular-nums">AED 32.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* ── Dropdown Menu ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Dropdown Menu</h2>
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
      </section>

      <Separator />

      {/* ── Popover ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Popover</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Quick Add</h4>
              <div className="space-y-1.5">
                <Label htmlFor="pop-amount">Amount</Label>
                <Input id="pop-amount" type="number" placeholder="0.00" />
              </div>
              <Button size="sm" className="w-full">Add</Button>
            </div>
          </PopoverContent>
        </Popover>
      </section>

      <Separator />

      {/* ── Hover Card ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Hover Card</h2>
        <p className="text-sm text-muted-foreground">Hover (or tap on mobile) the link below:</p>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="p-0 h-auto">@groceries</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-64">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Groceries</h4>
              <p className="text-xs text-muted-foreground">Monthly budget: AED 2,000</p>
              <p className="text-xs text-muted-foreground">Spent this month: AED 1,450</p>
              <Progress value={72} className="h-1.5 mt-2" />
            </div>
          </HoverCardContent>
        </HoverCard>
      </section>

      <Separator />

      {/* ── Tooltip ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Tooltip</h2>
        <TooltipProvider>
          <div className="flex gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <span className="text-lg">+</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add transaction</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <span className="text-lg">?</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Help & support</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
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

      {/* ── Drawer ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Drawer</h2>
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
      </section>

      <Separator />

      {/* ── Breadcrumb ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Breadcrumb</h2>
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
      </section>

      <Separator />

      {/* ── Input OTP ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Input OTP</h2>
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </section>

      <Separator />

      {/* ── Pagination ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Pagination</h2>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
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
                    AED {((i + 1) * 23.5).toFixed(2)}
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

      <Separator />

      {/* ── Color Palette ── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Color Palette</h2>
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <div className="h-12 rounded-lg bg-primary" />
            <p className="text-[10px] text-muted-foreground text-center">Primary (Orange)</p>
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

      <div className="h-20" />
    </div>
  )
}
