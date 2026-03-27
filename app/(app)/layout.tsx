import { BottomNav } from "@/components/bottom-nav"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-dvh max-w-lg bg-background">
      <main className="px-4 pt-6 pb-20">{children}</main>
      <BottomNav />
    </div>
  )
}
