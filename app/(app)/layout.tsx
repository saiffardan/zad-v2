import { BottomNav } from "@/components/bottom-nav"
import { PageTransition } from "@/components/page-transition"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-dvh max-w-lg bg-background">
      <main className="px-4 pb-24" style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 1.5rem)" }}>
        <PageTransition>{children}</PageTransition>
      </main>
      <BottomNav />
    </div>
  )
}
