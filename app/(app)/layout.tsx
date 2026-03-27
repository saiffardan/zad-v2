import { BottomNav } from "@/components/bottom-nav"
import { PageTransition } from "@/components/page-transition"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-dvh max-w-lg bg-background">
      <main className="px-4 pt-6 pb-24">
        <PageTransition>{children}</PageTransition>
      </main>
      <BottomNav />
    </div>
  )
}
